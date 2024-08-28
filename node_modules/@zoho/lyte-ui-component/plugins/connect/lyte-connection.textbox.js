;( function(){

	var checking;

	function find_position( points ){
		var index = Math.floor( points.length / 2 ),
		pos = {},
		pt1 = points[ index ], 
        pt2 = points[ index - 1 ];

		if( points.length % 2 == 0 ){
           pos.x = ( pt1.x + pt2.x ) / 2;
           pos.y = ( pt1.y + pt2.y ) / 2;

        } else {
           var pt3 = points[ index + 1 ],
           fn = function( x, y ){
           		if( Math.abs( pt1[ y ] - pt2[ y ] ) > Math.abs( pt1[ x ] - pt3[ x ] ) ){
                     pos[ x ] = pt1[ x ];
                     pos[ y ] = ( pt1[ y ] + pt2[ y ] ) / 2;
                  } else {
                     pos[ y ] = pt1[ y ];
                     pos[ x ] = ( pt3[ x ] + pt1[ x ] ) / 2;
                  }
           };

           if( pt1.x == pt2.x ){
             fn( 'x', 'y' );
           } else {
              fn( 'y', 'x' );
           }
        }
        return pos;
	}

	function create_range_frm_pt( bcr, points ){
		var __len = points.length - 1,
		__arr = [],
		__width = bcr.width + 20,
		__height = bcr.height + 20,
		max = Math.max( __width, __height ),
		buff = max / 2;

		for( var i = 0; i < __len; i++ ){
			var pt1 = points[ i ],
			pt2 = points[ i + 1 ],
			is_hori = pt1.y == pt2.y,
			hori_buff = is_hori ? 0 : buff,
			vert_buff = is_hori ? buff : 0,
			obj = {
				left : Math.min( pt1.x, pt2.x ) - hori_buff,
				top : Math.min( pt1.y, pt2.y ) - vert_buff,
				right : Math.max( pt1.x, pt2.x ) + hori_buff,
				bottom : Math.max( pt1.y, pt2.y ) + vert_buff,
				_left : [],
				_right : []
			},
			cur_width,
			cur_height;

			if( ( cur_width = obj.width = obj.right - obj.left ) < __width ){
				obj.width = __width;
				obj.left -= ( __width - cur_width ) / 2;
				obj.right += ( __width - cur_width ) / 2;
			}

			if( ( cur_height = obj.height = obj.bottom - obj.top ) < __height ){
				obj.height = __height;
				obj.top -= ( __height - cur_height ) / 2;
				obj.bottom += ( __height - cur_height ) / 2;
			}

			obj.mid_x = ( obj.left + obj.right ) / 2;
			obj.mid_y = ( obj.top + obj.bottom ) / 2;
			obj.is_hori = is_hori;

			__arr.push( obj );
		}

		return __arr;
	}

	function getAll_dim( data ){
		var arr = [],
		elem = data.wrapperElement.closest( 'lyte-connect' ),
		details = elem.getData( 'details' ),
		textbox = Array.from( elem.querySelectorAll( 'lyte-textbox.lyteConnectTextbox' ) );

		for( var key in details ){
			var cur = details[ key ].position;
			arr.push({
				position : {
					left : cur.left,
					top : cur.top
				},
				dimension : {
					width : cur.width,
					height : cur.height
				}
			});
		}

		textbox.forEach( function( item ){
			var bcr = item.getBoundingClientRect(),
			pos = $L( item ).data( 'position' ) || {},
			__width = bcr.width,
			__height = bcr.height;

			arr.push( item.__bcr = {
				position : {
					left : pos.x - __width * 0.5,
					top : pos.y - __height * 0.5
				},
				dimension : {
					width : __width,
					height : __height
				},
				bcr : bcr
			});
		});

		return arr;
	}

	function find_nearest( ranges, pos, bcr ){
		var __width = bcr.width + 10,
		__height = bcr.height + 10,
		__dist = Infinity,
		selected;		

		ranges.forEach( function( item ){
			var item_width = item.width,
			item_height = item.height,
			is_hori = item.is_hori,
			mid_x = is_hori ? item.left + item_width * 0.5 : item.mid_x,
			mid_y = is_hori ? item.mid_y : item.top + item_height * 0.5,
			dist = Math.sqrt( Math.pow( mid_x - pos.x, 2 ) + Math.pow( mid_y - pos.y, 2 ) );

			if( __width > Math.min( mid_x - item.left, item.right - mid_x ) * 2 || __height > Math.min( mid_y - item.top, item.bottom - mid_y ) * 2 ){
				return;
			}

			if( dist < __dist ){
				__dist = dist;
				selected = item;
			}
		});

		if( selected ){
			var is_hori = selected.is_hori;

			pos.x = is_hori ? selected.left + selected.width * 0.5 : selected.mid_x;
			pos.y = is_hori ? selected.mid_y : selected.top + selected.height * 0.5;
		}
	}

	function check_avoid( exp_pos, points, data, textbox ){ 

		if( checking == void 0) {

			checking = getAll_dim( data );

			setTimeout( function(){
				checking = void 0;
			});
		}

		var bcr_obj = textbox.__bcr,
		bcr = bcr_obj.bcr,
		ranges = create_range_frm_pt( bcr, points ),
		__width = bcr.width,
		__height = bcr.height,
		min_dim = Math.min( __width, __height ) + 10,
		position = bcr_obj.position;

		checking.forEach( function( item ){

			if( bcr == item.bcr ){
				return;
			}

			data.splitIndiv( ranges, item );
		});

		find_nearest( data.join_ranges( ranges ), exp_pos, bcr );

		position.left = exp_pos.x - __width / 2;
		position.top = exp_pos.y - __height / 2;
	}

	function reset_pts( points ){
		var len = points.length - 2;

		for( var i = 0; i < len; i++ ){
			var cur = points[ i ],
			next = points[ i + 1 ],
			next_after = points[ i + 2 ],
			is_vert = cur.x == next.x,
			is_next_vert = next.x == next_after.x;

			if( is_vert == is_next_vert ){
				points.splice( i-- + 1, 1 );
				len--;
			}
		}

		return points;
	}

	$L.elbow.textbox = function( points, data, textbox ){
		var pos = find_position( points );

		if( data.textbox_avoidance && !data.ignore_break ){
			check_avoid( pos, reset_pts( Array.from( points ) ), data, textbox );
		}

		return pos;
	}
})();
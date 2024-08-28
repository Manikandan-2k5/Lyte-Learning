;( function(){
	if( window.$L ){

		function relative_pts( arr, ref_x, ref_y ){
			var ref = arr[ 0 ];

			arr.forEach( function( item ){
				item.x -= ref_x;
				item.y -= ref_y;
			});

			return arr;
		}

		function check_max_length( arr, data ){

			var max_width = data.max_width,
			max_height = data.max_height,
			__length = arr.length - 1;

			for( var i = 0; i < __length; i++ ){
				var pt1 = arr[ i ],
				pt2 = arr[ i + 1 ],
				__line_width = Math.abs( pt2.x - pt1.x ),
				__line_height = Math.abs( pt2.y - pt1.y ),
				to_split = 0,
				incre,
				is_hori = pt1.y == pt2.y,
				__y = is_hori ? 'y' : 'x',
				__x = is_hori ? 'x' : 'y';

				if( __line_height > max_height ){
					to_split = parseInt( __line_height / max_height );
					incre = __line_height / ( to_split + 1 );
				} else if( __line_width > max_width ){
					to_split = parseInt( __line_width / max_width );
					incre = __line_width / ( to_split + 1 );
				}

				if( to_split ){
					var is_neg = pt1[ __x ] > pt2[ __x ];

					for( var j = 0; j < to_split; j++ ){
						var new_obj = {};
						new_obj[ __x ] = pt1[ __x ] + ( incre * ( j + 1 ) ) * ( is_neg ? -1 : 1 );
						new_obj[ __y ] = pt1[ __y ];
						arr.splice( ++i, 0, new_obj );
					}
				}
			}	

			return arr;
		}

		function split_pts( arr, arcs, vert_arcs, data ){
			var keys = Object.keys( arcs ).concat( Object.keys( vert_arcs ) ).sort( function( a, b ){
				return b - a;
			}),
			__length = keys.length - 1;

			keys.forEach( function( item ){
				var line_index = parseInt( item ),
				__arcs = arcs[ line_index ] || vert_arcs[ line_index ],
				pt1 = arr[ line_index ] || {},
				pt2 = arr[ line_index + 1 ] || {},
				is_hori = pt1.y == pt2.y,
				__x = is_hori ? 'x' : 'y',
				is_neg = pt1[ __x ] > pt2[ __x ];

				if( __arcs.length ){

					__arcs = Array.from( __arcs ).sort( function( a, b ){
					    return ( b.point[ __x ] - a.point[ __x ] ) * ( is_neg ? -1 : 1 );
					});

					__arcs.forEach( function( __cur ){
						var pt = __cur.point;
						arr.splice( line_index + 1, 0, { x : pt.x, y : pt.y, arc : true } );
					});
				}
			});

			return check_max_length( arr, data );
		}

		function draw_marker( marker, __width, __height, line_marker, pts, data ){
			var __len = pts.length - 1,
			str = "",
			min_width = Math.max( data.min_width, 2 * __width ),
			min_height = Math.max( data.min_height, 2 * __height ),
			__fn = function( is_hori, is_neg, item, index ){
				if( index ){
					if( is_hori ){
						str += ( ( item[ 0 ] * ( is_neg ? -1 : 1 ) + mid_x ) + " " + ( item[ 1 ] + mid_y ) + " " );
					} else {
						str += ( ( item[ 1 ] + mid_x ) + " " + ( item[ 0 ] * ( is_neg ? -1 : 1 ) + mid_y ) + " " );
					}
				}
			};

			for( var i = 0; i < __len; i++ ){
				var first = pts[ i ],
				next = pts[ i + 1 ],
				is_hori = first.y == next.y,
				line_width = Math.abs( first.x - next.x ),
				line_height = Math.abs( first.y - next.y );

				if( ( is_hori && line_width < min_width ) || ( !is_hori && line_height < min_height ) ){
					continue;
				}

				var is_neg,
				is_arc = first.arc || next.arc;

				if( is_arc ){
					if( ( is_hori && line_width < 100 ) || ( !is_hori && line_height < 100 ) ){
						continue;
					}
				}

				if( is_hori ){
					is_neg = first.x > next.x;
				} else {
					is_neg = first.y > next.y;
				}

				var mid_x = ( first.x + next.x ) / 2 + ( is_hori ? __width / 2 * ( is_neg ? 1 : -1 ) : 0 ),
				mid_y = ( first.y + next.y ) / 2 + ( is_hori ? 0 : __width / 2 * ( is_neg ? 1 : -1 ) ),
				first_pt = line_marker[ 0 ];

				if( is_hori ){
					str += ( "M " + ( first_pt[ 0 ] + mid_x ) + " " + ( first_pt[ 1 ] + mid_y ) + " L " );
				} else {
					str += ( "M " + ( first_pt[ 1 ] + mid_x ) + " " + ( first_pt[ 0 ] + mid_y ) + " L " );
				}

				line_marker.forEach( __fn.bind( this, is_hori, is_neg ) );
			}

			marker.setAttribute( 'd', str.trim() );
		}

		$L.elbow.marker = function( svg, line_marker, ref_x, ref_y, data, allow ){
			var marker = svg.children[ 2 ];

			if( !allow ){
				return marker.setAttribute( 'd', "" );
			}

			var min_x = Infinity,
			max_x = -min_x,
			min_y = min_x,
			max_y = -min_x,
			__width,
			__height,
			$svg = $L( svg ), 
			pts = relative_pts( split_pts( $L.extend( true, [], $svg.data( 'absolute_points' ) ), $svg.data( 'arcs' ) || {}, $svg.data( 'vert_arcs' ) || {}, data ), ref_x, ref_y );

			line_marker.forEach( function( item ){
				var __x = item[ 0 ],
				__y = item[ 1 ];

				min_x = Math.min( min_x, __x );
				max_x = Math.max( max_x, __x );
				min_y = Math.min( min_y, __y );
				max_y = Math.max( max_y, __y );
			});

			__width = max_x - min_x;
			__height = max_y - min_y;

			draw_marker( marker, __width, __height, line_marker, pts, data );
		}
	}
})();
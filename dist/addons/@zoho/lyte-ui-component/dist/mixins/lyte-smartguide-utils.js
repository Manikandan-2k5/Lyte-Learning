;Lyte.Mixin.register( 'lyte-smartguide-utils', {
	
	smart_guide : function( elem, xInc, yInc, details, buff, scale_x, scale_y ){
		var position = details[ elem.id ],
		hori = this.smart_guide_check( buff, position, details, xInc, yInc, 'left', 'right', 'top', 'bottom', 'hori_mid', 'width', 'height', innerHeight ),
		vert = this.smart_guide_check( buff, position, details, yInc, xInc, 'top', 'bottom', 'left', 'right', 'vert_mid', 'height', 'width', innerWidth ),
		addClass1 = 'addClass',
		addClass2 = addClass1,
		style1 = {},
		style2 = {},
		fn = function( vert, lt, wd, tp, hgt, xInc, style2, __scale_x, __scale_y ){
			var item = vert.item,
			top_to_be,
			inner_item = item.cur,
			mid1x = position[ lt ] + position[ wd ] / 2 + xInc,
			mid2x = inner_item[ lt ] + inner_item[ wd ] / 2;

			style2[ wd ] = ( Math.abs( mid2x - mid1x ) / __scale_x ) + 'px';
			style2[ hgt ] = '1px';
			style2[ lt ] = ( Math.min( mid2x, mid1x ) / __scale_x ) + 'px';

			switch( item.prop ){
				case 'vert_mid' : 
				case "hori_mid" : {
					top_to_be = inner_item[ tp ] + inner_item[ hgt ] / 2;
				}
				break;
				case 'top' : 
				case "left" : {
					top_to_be = inner_item[ tp ];
				}
				break;
				case 'bottom' : 
				case "right" : {
					top_to_be = inner_item[ tp ] + inner_item[ hgt ];
				}
			}

			style2[ tp ] = ( top_to_be / __scale_y ) + 'px';
		};

		scale_x = scale_x || 1;
		scale_y = scale_y || 1;

		if( vert ){
			fn( vert, 'left', 'width', 'top', 'height', xInc, style2, scale_x, scale_y );
			yInc += vert.dist;
			addClass2 = 'removeClass';
		} 

		if( hori ){
			fn( hori, 'top', 'height', 'left', 'width', yInc, style1, scale_y, scale_x );
			xInc += hori.dist;
			addClass1 = 'removeClass';
		} 

		var ret_obj = {
			xInc : xInc,
			yInc : yInc
		};

		if( xInc ){
			ret_obj.hori = {
				fn : addClass1,
				style : style1
			}
		}

		if( yInc ){
			ret_obj.vert = {
				fn : addClass2,
				style : style2
			}
		}

		return ret_obj;
	},

	smart_guide_check : function( buff, position, details, xInc, yInc, __left, __right, __top, __bottom, __mid, __width, __height, __limit ){
		
		if( !xInc ){
			return;
		}

		var __inf = Infinity,
		obj = {},
		new_left = position[ __left ] + xInc,
		new_top = position[ __top ] + yInc,
		new_right = new_left + position[ __width ],
		new_bottom = new_top + position[ __height ],
		new_hori_mid = ( new_left + new_right ) / 2,
		new_vert_mid = ( new_top + new_bottom ) / 2,
		is_inc = xInc > 0,

		get_distance = function( __left, __top, __bottom, value, sub_dist ){
			if( Math.abs( value - __left ) > buff ){
				return __inf;
			}
			return sub_dist;
		},

		check_fn = function( cur_left, new_left, prop, cur_top, cur_bottom, new_top, new_bottom, cur, other_prop ){
			var sub_dist = Math.min( Math.abs( cur_top - new_bottom ), Math.abs( cur_bottom - new_top ) ),
			dist = get_distance( cur_left, cur_top, cur_bottom, new_left, sub_dist ),
			new_obj = obj[ prop ],
			__extdist = new_obj.dist,
			__ext_sub = new_obj.sub_dist;

			if( dist < __extdist ){
				new_obj = obj[ prop ] = {
					dist : dist,
					prop : prop,
					cur : cur,
					diff : cur_left - new_left,
					other_prop : other_prop,
					sub_dist : __ext_sub = sub_dist
				};
			}

			if( __ext_sub > sub_dist ){
				obj[ prop ] = {
					dist : __inf,
					sub_dist : __inf
				};
			}

		},
		best_point = function(){
			var __dist = __inf,
			vert_dist = __inf,
			selected,
			__fn = function( __value, ns ){
				var act_val = __value[ ns ],
				prop = act_val.prop,
				item = act_val.item;

				if( act_val.dist < __dist ){
					var diff = Math.max( act_val.diff );

					if( diff < vert_dist ){
						vert_dist = diff;
						__dist = act_val.dist;
						selected = act_val;
					}
				}
			};

			__fn( obj, __mid );
			__fn( obj, __left );
			__fn( obj, __right );

			if( selected ){
				return {
					item : selected,
					dist : vert_dist
				};
			}
		};

		[ __left, __right, __mid ].forEach( function( item ){
			obj[ item ] = {
				dist : __inf,
				sub_dist : __inf
			};
		});


		for( var key in details ){
			var __cur = details[ key ];

			if( __cur == position ){
				continue;
			}

			var cur_left = __cur[ __left ],
			cur_top = __cur[ __top ],
			cur_right = __cur[ __width ] + cur_left,
			cur_bottom = cur_top + __cur[ __height ],
			cur_hori_mid = ( cur_left + cur_right ) / 2,
			cur_vert_mid = ( cur_bottom + cur_top ) / 2;

			if( __limit < Math.min( Math.abs( cur_bottom - new_top ), Math.abs( cur_top - new_bottom ) ) ){
				continue;
			}

			if( cur_left - new_right > buff || new_left - cur_right > buff ){
				continue;
			}

			check_fn( cur_left, new_left, __left, cur_top, cur_bottom, new_top, new_bottom, __cur, __left );
			check_fn( cur_left, new_hori_mid, __left, cur_top, cur_bottom, new_top, new_bottom, __cur, __mid );
			check_fn( cur_left, new_right, __left, cur_top, cur_bottom, new_top, new_bottom, __cur, __right );

			check_fn( cur_hori_mid, new_left, __mid, cur_top, cur_bottom, new_top, new_bottom, __cur, __left );
			check_fn( cur_hori_mid, new_hori_mid, __mid, cur_top, cur_bottom, new_top, new_bottom, __cur, __mid );
			check_fn( cur_hori_mid, new_right, __mid, cur_top, cur_bottom, new_top, new_bottom, __cur, __right );

			check_fn( cur_right, new_left, __right, cur_top, cur_bottom, new_top, new_bottom, __cur, __left );
			check_fn( cur_right, new_hori_mid, __right, cur_top, cur_bottom, new_top, new_bottom, __cur, __mid );
			check_fn( cur_right, new_right, __right, cur_top, cur_bottom, new_top, new_bottom, __cur, __right );
		}

		return best_point();
	}
});
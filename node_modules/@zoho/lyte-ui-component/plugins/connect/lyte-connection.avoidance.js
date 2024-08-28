;( function(){
	if( window.$L ){

		// function draw_line( item ){

		// }

		function modify_range( obj, details ){
			for( var key in details ){
				var __details = details[ key ],
				__cur = __details.position,
				__left = __cur.left + ( __details.x_diff || 0 ),
				__top = __cur.top + ( __details.y_diff || 0 ),
				__right = __left + __cur.width,
				__bottom = __top + __cur.height,
				is_hori = obj.is_hori,
				obj_right = obj.right,
				obj_left = obj.left,
				obj_top = obj.top,
				obj_bottom = obj.bottom,
				__mid = obj.mid;

				if( is_hori ){
					if( __left >= obj_right || __right <= obj_left ){
						continue;
					}

					if( __top < obj_top && __bottom > obj_bottom ){
						obj.top = obj.bottom = obj.mid;
					}

					if( __bottom <= __mid ){
						obj.top = Math.max( obj_top, __bottom );
					}
					if( __top >= __mid ){
						obj.bottom = Math.min( obj_bottom, __top );
					}

				} else {
					if( __top >= obj.bottom || __bottom <= obj.top ){
						continue;
					}

					if( __left < obj_left && __right > obj_right ){
						obj.left = obj.right = obj.mid;
					}

					if( __right <= __mid ){
						obj.left = Math.max( obj_left, __right );
					}
					if( __left >= __mid ){
						obj.right = Math.min( obj_right, __left );
					}
				}
			}
		}

		function check_boundary_with_shape( pt1, pt2, details ){
			var x1 = pt1.x,
			x2 = pt2.x,
			y1 = pt1.y,
			y2 = pt2.y,
			is_hori = y1 == y2,
			obj = {
				is_hori : is_hori
			},
			inf = Infinity,
			x = 'x',
			y = 'y',
			__left = 'left',
			__right = 'right',
			__top = 'top',
			__bottom = 'bottom';

			if( !is_hori ){
				y = 'x';
				x = 'y';
				__left = 'top';
				__right = 'bottom';
				__top = 'left';
				__bottom = 'right';
				var temp1 = x1,
				temp2 = x2;

				x1 = y1;
				x2 = y2;

				y1 = temp1;
				y2 = temp2;
			}

			obj.mid = pt1[ y ];
			obj[ __left ] = Math.min( x1, x2 );
			obj[ __right ] = Math.max( x1, x2 );
			obj[ __top ] = -inf;
			obj[ __bottom ] = inf;

			modify_range( obj, details );

			return obj;
		}

		function check_with_other_line( boundary, is_hori, connections, redraw ){

			var ranges = [ boundary ],
			__mid = boundary.mid;

			connections.forEach( function( __item ){
				var pts = __item.points,
				stroke = __item.stroke / 2;

				pts.forEach( function( item, index ){
					if( !index ){
						return;
					}
					var pt1 = pts[ index - 1 ],
					pt2 = item,
					__is_hori = pt1.y == pt2.y,
					y = is_hori ? 'y' : 'x',
					x = is_hori ? 'x' : 'y',
					__top = is_hori ? 'top' : 'left',
					__bottom = is_hori ? 'bottom' : 'right',
					__left = is_hori ? 'left' : 'top',
					__right = is_hori ? 'right' : 'bottom';

					if( is_hori != __is_hori ){
						return;
					}

					var max_x = Math.max( pt1[ x ], pt2[ x ] ),
					min_x = Math.min( pt1[ x ], pt2[ x ] ),
					__len = ranges.length;

					for( var i = 0; i < __len; i++ ){
						var __cur = ranges[ i ],
						top_val = __cur[ __top ],
						bottom_val = __cur[ __bottom ],
						left_val = __cur[ __left ],
						right_val = __cur[ __right ],
						hit_pt = pt1[ y ];

						if( hit_pt < top_val || hit_pt > bottom_val || left_val >= max_x || right_val <= min_x ){
							continue;
						}

						var obj1 = {
							mid :  __mid
						},
						obj2 = {
							mid : __mid
						},
						fn = function( obj ){
							obj[ __left ] = __cur[ __left ];
							obj[ __right ] = __cur[ __right ];

							if( obj[ __top ] != obj[ __bottom ] ){
								ranges.splice( ++i, 0, obj );
								__len++;
							}
						};

						obj1[ __bottom ] = Math.max( obj1[ __top ] = __cur[ __top ], hit_pt - stroke );
						obj2[ __top ] = Math.min( obj2[ __bottom ] = __cur[ __bottom ], hit_pt + stroke );

						ranges.splice( i--, 1 );
						__len--;

						fn( obj1 );
						fn( obj2 );

						push_if_not( redraw, __item.elem );
					}
				});	
			});

			return ranges;
		}

		function push_if_not( arr, value ){
			if( arr.indexOf( value ) == -1 ){
				arr.push( value );
			}
		}

		function find_nearest( ranges, is_hori ){
			var distance = Infinity,
			selected,
			__left = is_hori ? 'top' : 'left',
			__right = is_hori ? 'bottom' : 'right';

			ranges.forEach( function( item ){
				var mid = item.mid,
				__dist;

				if( item[ __left ] <= mid && item[ __right ] >= mid ){
					__dist = 0;
				} else {
					__dist = Math.min( Math.abs( item[ __left ] - mid ), Math.abs( item[ __right ] - mid ) );
				}

				if( __dist < distance ){
					distance = __dist;
					selected = item;
				}
			});

			return {
				selected : selected,
				distance : distance
			}
		}

		function check_avoidance( points, details, connections, svg, i, redraw, offset, stroke ){
			if( connections.length == 0 ){
				return;
			}

			var check_other =  i == 0 || i == points.length - 2,
			pt1 = points[ i ],
			pt2 = points[ i + 1 ], 
			is_hori = pt1.y == pt2.y,
			boundary = check_boundary_with_shape( pt1, pt2, details ),
			__redraw = [],
			ranges = check_with_other_line( boundary, is_hori, connections, __redraw );

			if( ranges.length > 1 ){
				var near = find_nearest( ranges, is_hori ),
				__near = near.selected,
				x = is_hori ? 'x' : 'y',
				y = is_hori ? 'y' : 'x',
				__left = is_hori ? 'left' : 'top',
				__top = is_hori ? 'top' : 'left',
				__right = is_hori ? 'right' : 'bottom',
				__bottom = is_hori ? 'bottom' : 'right';

				if( !near.distance ){
					var diff = Math.min( Math.abs( __near[ __top ] - __near.mid ), Math.abs( __near[ __bottom ] - __near.mid ) );
					if( diff >= offset ){
						return;
					}
				}

				if( check_other ){
					__redraw.forEach( push_if_not.bind( this,redraw ) );
				} else {
					var cur_height = __near[ __bottom ] - __near[ __top ],
					inf = Infinity,
					fn = function(){
						var to_top = __near[ __top ],
						to_bottom = __near[ __bottom ],
						__diff = to_bottom - to_top,
						__value_to_be,
						to_mid = __near.mid;

						if( to_top == -inf ){
							__value_to_be = to_bottom - offset;
						} else {
							if( cur_height == inf ){
								__value_to_be = to_top + offset;
							} else {
								if( __diff > 2 * offset ){
									if( Math.abs( to_top - to_mid ) > Math.abs( to_bottom - to_mid ) ){
										__value_to_be = to_bottom - offset;
									} else {
										__value_to_be = to_top + offset;
									}
								} else {
									__value_to_be = to_top + cur_height * 0.5;
								}
							}
						}

						pt1[ y ] = pt2[ y ] = __value_to_be;
					};

					if( cur_height >= offset ){
						fn();
					} else {
						ranges.sort( function( a, b ){
						    return ( b[ __bottom ] - b[ __top ] ) - ( a[ __bottom ] - a[ __top ] );
						}); 

						__near = ranges[ 0 ];
						cur_height = __near[ __bottom ] - __near[ __top ];
						fn();
					}

					svg.__modified = true;
				}
			}


		}

		$L.elbow.avoidLine = function( svg, data, ignore, ref_x, ref_y ){
			var points,
			connections = [],
			__ns = 'lyteConnect';

			Array.from( svg.parentNode.getElementsByClassName( __ns + 'ionContainer' ) ).forEach( function( item ){
				var $elem = $L( item ),
				__data = $elem.data(),
				__points = __data.absolute_points;

				if( !__points || $elem.hasClass( __ns + 'HiddenElem' ) ){
					return;
				}

				if( item == svg ){
					points = __points;
					return;
				}

				connections.push({
					elem : item,
					points : __points,
					data : __data,
					stroke : 2,
					dom : $elem
				});
			});

			var _len = points.length - 1,
			redraw = [],
			offset = 20,
			stroke = 2,
			connect = svg.closest( 'lyte-connect' ),
			details = connect ? connect.getData( 'details' ) : void 0,
			__path;

			if( !connect ){
				return;
			};

			for( var i = 0; i < _len; i++ ){
				check_avoidance( points, details, connections, svg, i, redraw, offset, stroke );
			}

			if( svg.__modified ){
				$L( svg ).data( 'absolute_points', $L.extend( true, [], points ) );
				!ignore && ( __path = $L.elbow.draw_line( points, data.connector_radius, ref_x, ref_y ) );
				delete svg.__modified;
			}

			if( ignore ){
				return;
			}

			// redraw.forEach( function( item ){
			// 	draw_line( item );
			// });

			return __path;
		}
	}
})();
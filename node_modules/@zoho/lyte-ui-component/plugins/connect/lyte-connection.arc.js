;(function(){
	if( window.$L ){

		/*
			returns two vertical lines meeting point if any
		*/

		function meet_point( start, end, _start, _end, y, _y, radius ){
			var other_y1 = Math.min( _end[ y ], _start[ y ] ),
			other_y2 = Math.max( _end[ y ], _start[ y ] ),
			vert_radius = Math.min( radius * 2, ( other_y2 - other_y1 ) / 2 );

			if( start[ y ] >= ( other_y2 - vert_radius ) || start[ y ] <= ( other_y1 + vert_radius ) ){
				return;
			}

			var x1 = Math.min( end[ _y ], start[ _y ] ),
			x2 = Math.max( end[ _y ], start[ _y ] ),
			hori_radius = Math.min( radius * 2, ( x2 - x1 ) / 2 );

			if( _start[ _y ] >= ( x2 - hori_radius ) || _start[ _y ] <= ( x1 + hori_radius ) ){
				return;
			}

			var obj = {};

			obj[ _y ] = _end[ _y ];
			obj[ y ] = end[ y ];

			return obj;
		}

		/*
			It will add arcs on intersection
		*/

		function add_arcs( start, end, connections, svg, line_index, redraw, radius ){
			var is_hori = start.y == end.y,
			x = is_hori ? 'x' : 'y',
			y = is_hori ? 'y' : 'x',
			is_incre = end[ x ] > start[ x ],
			$act_elem = $L( svg ),
			act_arc = $act_elem.data( 'arcs' ),
			act_vert = $act_elem.data( 'vert_arcs' );

			connections.forEach( function( item ){
				var points = item.points,
				_len = points.length - 1;

				for( var i = 0; i < _len; i++ ){
					var _start = points[ i ],
					_end = points[ i + 1 ],
					is_other_hori = _start.y == _end.y;

					if( is_hori == is_other_hori ){
						continue;
					}

					var _x = is_other_hori ? 'x' : 'y',
					_y = is_other_hori ? 'y' : 'x',
					is_other_incre = _end[ _x ] > _start[ _y ],
					meet = meet_point( start, end, _start, _end, y, _y, radius ),
					arc,
					index,
					act_elem,
					elem_id,
					other_id,
					other_index,
					other_arc,
					inc,
					other_inc;

					if( meet ){
						if( is_hori ){
							arc = act_arc;
							act_elem = svg;
							index = line_index;
							elem_id = svg.id;
							other_id = item.elem.id;
							other_index = i;
							other_arc = item.data.vert_arcs;
							inc = is_incre;
							other_inc = is_other_incre;
						} else{
							act_elem = item.elem;
							var $elem = item.dom,
							arc = item.data.arcs;
							index = i;
							elem_id = act_elem.id;
							other_id = svg.id;
							other_index = line_index;
							other_arc = act_vert;
							inc = is_other_incre;
							other_inc = is_incre;
						}

						var __index = redraw.indexOf( act_elem ),
						line_arc = arc[ index ],
						other_line_arc = other_arc[ other_index ],
						to_push = {
							point : meet,
							index : index,
							other_index : other_index,
							id : elem_id,
							other_id : other_id,
							inc : inc,
							other_inc : other_inc
						};

						if( line_arc == void 0 ){
							line_arc = arc[ index ] = [];
						}

						if( other_line_arc == void 0 ){
							other_line_arc = other_arc[ other_index ] = [];
						}

						line_arc.push( to_push );
						other_line_arc.push( to_push );

						if( __index == -1 ){
							redraw.push( act_elem );
						}
					}
				}

			});
		}

		/*
			It will remove one connector's arc from other vertical connectors.
			Arcs will be placed only on horizontal lines
		*/

		function remove_arcs( svg, obj_form, marker_draw ){
			var arc = $L( svg ).data( 'arcs' ) || {};

			for( var key in arc ){
				var lines = arc[ key ],
				len = lines.length;

				for( var i = 0; i < len; i++ ){
					var item = lines[ i ],
					other_elem = $L( '#' + item.other_id, svg.parentNode );

					lines.splice( i--, 1 );
					len--;

					remove_single_arc( other_elem, item.other_index, item, 'vert_arcs' );

					marker_draw && push_if_not( marker_draw, other_elem.get( 0 ) );
				}
			}
		}

		/*
			It will remove one connector's arc from other horizontal connectors
		*/

		function remove_other_arcs( svg, redraw, obj_form, marker_draw ){
			var arc = $L( svg ).data( 'vert_arcs' ) || {};

			marker_draw && push_if_not( marker_draw, svg );

			for( var key in arc ){
				var lines = arc[ key ],
				len = lines.length;

				for( var i = 0; i < len; i++ ){
					var item = lines[ i ],
					other_elem = $L( '#' + item.id, svg.parentNode );

					lines.splice( i--, 1 );
					len--;

					if( remove_single_arc( other_elem, item.index, item, 'arcs' ) ){
						var other_elem_dom = other_elem.get( 0 );
						__index = redraw.indexOf( other_elem_dom );

						if( __index == -1 ){
							redraw.push( other_elem_dom );
						}
					}
				}
			}
		}

		/*
			removes single arc
		*/

		function remove_single_arc( elem, index, item, ns ){
			var arcs = ( elem.data( ns ) || {} )[ index ] || [],
			idx = arcs.indexOf( item );

			if( idx + 1 ){
				arcs.splice( idx, 1 );
				return true;
			}
		}

		/*
			It will merge multiple nearby arcs into a single arc 
		*/

		function merge_arcs( arr, radius ){
			var len = arr.length - 1;

			for( var i = 0; i < len; i++ ){
				var cur = arr[ i ],
				next = arr[ i + 1 ],
				cur_point = cur.point,
				next_point = next.point,
				sum_radius = ( cur.radius || radius ) + ( next.radius || radius ),
				diff = Math.abs( cur_point.x + cur_point.y - next_point.x - next_point.y );

				if( diff > 2 * radius ){
					continue;
				}

				arr.splice( i--, 1 );
				len--;

				next_point.x = ( cur_point.x + next_point.x ) / 2;
				next_point.y = ( cur_point.y + next_point.y ) / 2;

				next.radius = ( sum_radius + diff ) / 2;
			}

			return arr;
		}

		/*
			Sorts arcs in the same line for placing it in order
		*/

		function sort_arcs( item, radius, __fn, data ){
			var $item = $L( item ),
			jdata = $item.data(),
			data = jdata.arcs,
			points = $L.elbow.add_radius( $L.extend( true, [], $item.data( 'absolute_points' ) ), radius ),
			obj = {},
			keys = Object.keys( data ).map( Number ).sort( function( a, b ){
				return b - a;
			}),
			len = keys.length,
			fn = function( a, b ){
				var point_1 = a.point,
				point_2 = b.point;

				return ( point_1.x + point_1.y ) - ( point_2.x + point_2.y );
			};

			if( points.length == 0 ){
				return;
			}

			for( var i = 0; i < len; i++ ){
				var index = keys[ i ],
				arr = data[ index ],
				new_arr;

				arr.sort( fn );

				if( arr.length ){
					new_arr = insert_arcs( points, index, merge_arcs( $L.extend( true, [], arr ), radius ), radius );

					if( new_arr.length ){
						new_arr.unshift( 2 * index + 1, 0 );
						points.splice.apply( points, new_arr );
					}
				}
			}

			var __new_value = $L.elbow.draw_line( points, radius, jdata.ref_x, jdata.ref_y, true ).trim();

			if( __fn ){
				return Array.from( $item.children() ).every( function( item, index ){
					__fn( item, 'd', __new_value );
					return index == 0;
				});
			}

			$item.children().attr( 'd', __new_value );
		}

		// adds arcs to line points

		function insert_arcs( points, key, arr, radius ){
			var index = key * 2,
			pt1 = points[ index ],
			pt2 = points[ index + 1 ];

			if( !pt1 || !pt2 ){
				return [];
			}

			var is_inc = ( pt1.x + pt1.y ) < ( pt2.x + pt2.y ),
			arcs = [],
			fact1 = is_inc ? 1 : -1,
			fact2 = is_inc ? -1 : 1,
			is_hori = pt1.y == pt2.y,
			hori_fact = is_hori ? 1 : 0,
			vert_fact = is_hori ? 0 : 1;

			if( !is_inc ){
				arr.reverse();
			}

			arr.forEach( function( item ){

				var point = item.point,
				__radius = item.radius || radius,
				arc = {
					x : point.x + __radius * fact1 * hori_fact,
					y : point.y + __radius * fact1 * vert_fact,
					name : "A",
					radius : radius,
					neg : is_inc ? 1 : 0
				},
				new_pt = {
					x : point.x + __radius * fact2 * hori_fact,
					y : point.y + __radius * fact2 * vert_fact
				};
				arcs.push( new_pt, arc );
			});

			return arcs;
		}

		function push_if_not( arr, elem ){
			if( arr.indexOf( elem ) == -1 ){
					arr.push( elem );
			}
		}

		$L.elbow.arc = function( svg, data, frm_delete, __fn ){
			var points,
			obj_form = {},
			connections = Array.from( svg.parentNode.getElementsByClassName( 'lyteConnectionContainer' ) ).map( function( item ){
				var $elem = $L( item ),
				data = $elem.data();

				if( $elem.hasClass( 'lyteConnectHiddenElem' ) ){
					return {};
				}

				obj_form[ item.id ] = item;

				return{
					elem : item,
					points : data.absolute_points,
					data : data,
					dom : $elem
				}
			}).filter( function( item ){
				return item.points && ( item.elem == svg ? ( ( points = item.points ) && false ) : true );
			}),
			radius = data.connector_radius,
			_len = ( points || [] ).length - 1,
			redraw = [],
			line_marker = data.line_marker,
			offset = data.offset,
			marker_draw = line_marker ? [] : void 0;

			remove_arcs( svg, obj_form, marker_draw );
			remove_other_arcs( svg, redraw, obj_form, marker_draw );

			if( !frm_delete ){
				for( var i = 0; i < _len; i++ ){
					add_arcs( points[ i ], points[ i + 1 ], connections, svg, i, redraw, radius );
				}
			}

			push_if_not( redraw, svg );

			redraw.forEach( function( item ){
				sort_arcs( item, radius, __fn, data );
				marker_draw && push_if_not( marker_draw, item );
			});

			( marker_draw || [] ).forEach( function( item ){
				if( item == svg ){
					return;
				}
				var pts = $L( item ).data( 'absolute_points' ),
				first = pts[ 0 ],
				last = pts[ pts.length - 1 ],
				ref_x = Math.min( first.x, last.x ) - offset.left,
				ref_y = Math.min( first.y, last.y ) - offset.top;

				$L.elbow.marker( item, line_marker, ref_x, ref_y, data, true );
			});
		}
	}
})();
Lyte.Mixin.register("lyte-shape-positioning", {

  /*
    * try network kind of arrangement
    * find left_sibling, left_children, direct_children ( vertical originated from both top and bottom ), right_children, right_sibling
    * give preference for children than sibling
    * for multiple 
  */

  find_sibling : function( obj_format, connected_shapes, seperate_shapes, _render_with_arrange ){

    var __this = this,
    check_type = function( src, target ){
        var x1 = src.x,
        y1 = src.y,
        x2 = target.x,
        y2 = target.y,
        modify_vert1 = y1 > 0 && y1 < 1,
        modify_vert2 = y2 > 0 && y2 < 1,
        modify_hori1 = x1 > 0 && x1 < 1,
        modify_hori2 = x2 > 0 && x2 < 1,
        is_src_side = modify_vert1 && !modify_hori1,
        is_target_side = modify_vert2 && !modify_hori2;

        if( is_src_side ){
           if( is_target_side ){
              if( x1 ){
                  return "right_sibling";
              }
              return "left_sibling";
           } else {
              if( x1 ){
                return "right_children";
              }
              return "left_children";
           }
        } else{
           if( is_target_side ){
              if( !x2 ){
                return "right_children";
              }
              return "left_children";
           }
        }

        if( y1 == 0 ){
            if( x1 >= 0.5 ){
              if( y2 == 0 ){
                return 'right_sibling';
              }
              return "right_children";
            }
            if( y2 == 0 ){
              return 'left_sibling';
            }
            return "left_children";
        }

        return "direct_children"
    },
    fn = function( arr1, arr2, key, item, src_pos, tar_pos ){
        arr1.push({
          id : item,
          src_pos : src_pos,
          target_pos : tar_pos
        });

        arr2.push({
          id : key,
          src_pos : src_pos,
          target_pos : tar_pos
        });
    },

    dist = function( pt1, pt2 ){
        return Math.sqrt( Math.pow( pt1.x - pt2.x, 2 ) + Math.pow( pt1.y - pt2.y, 2 ) );
    },

    sort = function( arr, __ref ){
       
        arr.sort( function( a, b ){

            var __diff = dist( a.src_pos, __ref ) - dist( b.src_pos, __ref );

            if( __diff == 0 ){
               return b.target_pos.x - a.target_pos.x;
            }

            return __diff;
        });
    };

    for( var key in obj_format ){
        var __cur = obj_format[ key ],
        __from = __cur.from,
        __from_position = __cur.from_position;

        if( !__from.length &&  !__cur.to.length ){
           seperate_shapes.push( key );
           continue;
        } else {
           connected_shapes.push( key );
        }

        __from.forEach( function( item, index ){
            var other = obj_format[ item ],
            __to = other.to,
            __index = __to.indexOf( key ),
            src_pos = _render_with_arrange ? { x : 0.5, y : 1 } : __from_position[ index ],
            tar_pos = _render_with_arrange ? { x : 0.5, y : 0 } : other.to_position[ __index ],
            type,
            __sibling;

            if( __this.data.ltPropIgnoreSibling ){
              __sibling = "children";
              type = "direct_children";
            } else {
                switch( type = check_type( src_pos, tar_pos ) ){
                 case 'right_sibling' : 
                 case 'left_sibling' : {
                   __sibling = 'sibling';
                 }
                 break;
                 case 'right_children' : 
                 case 'left_children' : 
                 case 'direct_children' : {
                    __sibling = 'children';
                 }
                 break;
              }
            }

            fn( __cur[ type ], other[ __sibling ], key, item, src_pos, tar_pos );
        });

        sort( __cur.left_sibling, { x : 0, y : 0 } );
        sort( __cur.right_children, { x : 0.5, y : 1 } );
        sort( __cur.left_children, { x : 0.5, y : 1 } );
        sort( __cur.direct_children, { x : 0, y : 1 } );
        sort( __cur.right_sibling, { x : 1, y : 0 } );
    }
  },

  set_final_positions : function( obj_format, shapes, seperate_shapes, to_move ){
      var processed = {},
      width = 0,
      height = 0,
      hori_spacing = this.data.ltPropHorizontalSpacing,
      vert_spacing = this.data.ltPropVerticalSpacing,
      initial_offset = 0,
      ini_top = 0,
      is_hori = this.data.ltPropAlignDirection == "horizontal",
      move_construct = function( obj ){
        var __id = obj.id;

        to_move[ __id ] = {
            id : __id,
            position : {
              left : obj.left,
              top : obj.top
            },
            dimension : {
              width : obj.original_width,
              height : obj.original_height
            },
            old_position : obj_format[ __id ].position
        };

        [ 'left_sib', 'left_child', 'direct_child', 'right_child', 'right_sib' ].forEach( function( item ){
            obj[ item ].forEach( function( new_obj ){
                move_construct( new_obj );
            });
        });
      };

      seperate_shapes.forEach( function( item ){

        var __cur = obj_format[ item ],
        __dim = __cur.dimension;

        to_move[ item ] = {
            id : item,
            position : {
               left : initial_offset,
               top : ini_top
            },
            dimension : __dim,
            old_position : __cur.position
        };

        width = Math.max( __dim.width, width );

        ini_top += ( __dim.height + vert_spacing );
      });

      if( width ){
         width += hori_spacing;
      }

      shapes.forEach( function( item ){
          var ret = this.set_indiv_pos( obj_format, item, processed )

          if( ret ){
            width && this.nested_modify( ret, 'left', width );
            height && this.nested_modify( ret, 'top', height );

            move_construct( ret );

            if( is_hori ){
              width += ( ret.width + hori_spacing );
            } else {
              height += ( ret.height + vert_spacing );
            }
          }
      }.bind( this ) );
  },

  nested_modify : function( ret, ns, value ){

      if( !value ){
        return;
      }

      ret[ ns ] += value;
      ret[ 'min_' + ns ] += value;

      var __this = this,
      fn = function( item ){
          __this.nested_modify( item, ns, value );
      };

      ret.left_sib.forEach( fn );

      ret.right_sib.forEach( fn );

      ret.left_child.forEach( fn );

      ret.right_child.forEach( fn );

      ret.direct_child.forEach( fn );
  },

  set_indiv_pos : function( obj_format, item, processed ){
      if( processed[ item ] ){
         return;
      }
      processed[ item ] = true;

      var  __this = this,
      __data = __this.data,
      config = {
          hori_spacing : __data.ltPropHorizontalSpacing,
          vert_spacing : __data.ltPropVerticalSpacing,
          hori_align : "start",
          vert_align : "start",
          other_child_align : "horizontal",
          is_downward : __data.ltPropDownwardPosition,
          id : item,
          align_mid_children : __data.ltPropAlignMidChildren
      },
      cb = "onBeforeProcess",
      __cur = obj_format[ item ];

      __this.getMethods( cb ) && __this.executeMethod( cb, this.data.details[ item ].data, __cur, config, __this.$node );

      var total__width = 0,
      total__height = 0,
      vert_spacing = config.vert_spacing,
      hori_spacing = config.hori_spacing,
      align_mid_children = config.align_mid_children,
      __dim = __cur.dimension,
      __width = __dim.width,
      __height = __dim.height,
      hori_align = config.hori_align,
      vert_align = config.vert_align,
      other_child_align = config.other_child_align,
      is_other_vert = other_child_align == "vertical",
      is_downward = config.is_downward,
      hgt_find = function( arr ){
          var acc = 0,
          __arr = [],
          width = 0,
          deduct = 0;

          arr.forEach( function( __item, __index ){
              var ret = __this.set_indiv_pos( obj_format, __item.id, processed );

              if( !ret ){
                deduct++;
                return;
              }

              if( __index - deduct ){
                  acc += vert_spacing;
              }

              __this.nested_modify( ret, 'top', acc  );

              acc += ret.height;
              width = Math.max( width, ret.width );

              __arr.push( ret );
          });

          if( hori_align == "middle" ){
            __arr.forEach( function( __item ){
                __this.nested_modify( __item, 'left', ( width - __item.width ) / 2 );
            });
          }

          return {
             arr : __arr,
             width : width,
             height : acc
          };
      },
      wdt_find = function( arr ){
         var acc = 0,
          __arr = [],
          height = 0,
          deduct = 0;

          arr.forEach( function( __item, __index ){
              var ret = __this.set_indiv_pos( obj_format, __item.id, processed );

              if( !ret ){
                deduct++;
                return;
              }

              if( __index - deduct ){
                  acc += hori_spacing;
              }

              __this.nested_modify( ret, 'left', acc );

              acc += ret.width;
              height = Math.max( height, ret.height );

              __arr.push( ret );
          });

          if( vert_align == "middle" ){
              __arr.forEach( function( __item ){
                __this.nested_modify( __item, 'top', ( height - __item.height ) / 2 );
              });
          }

          return {
             arr : __arr,
             width : acc,
             height : height
          };
      },
      adjust_top = function( ns, diff, arr ){
        var __min = 0,
        __max = 0,
        other = ( { left : "width", top : "height" } )[ ns ];

        diff && arr.forEach( function( item ){
          __this.nested_modify( item, ns, diff );

          var modified_ns = "min_" + ns,
          __arr = [ __min, item[ modified_ns ] ],
          __arr1 = [ __max, item[ modified_ns ] + item[ other ] ],
          fn = function( __item ){
            __arr.push( __item[ modified_ns ] );
          },
          fn1 = function( __item ){
            __arr1.push( __item[ modified_ns ] + __item[ other ] );
          };

          item.left_sib.forEach( fn );
          item.left_child.forEach( fn );
          item.direct_child.forEach( fn );

          item.right_sib.forEach( fn1 );
          item.right_child.forEach( fn1 );
          item.direct_child.forEach( fn1 );

          __min = Math.min.apply( Math, __arr );
          __max = Math.max.apply( Math, __arr1 );
        });

        return {
          min : __min,
          max : __max
        };
      },
      adjust_hgt = function( hgt, __item, extra, sibling ){
          var arr = __item.arr,
          diff = ( extra == void 0 ? ( hgt - __item.height ) / 2 : 0 ) + ( extra || 0 );

          if( sibling && arr.length == 1 ){
            diff = ( hgt - arr[ 0 ].original_height ) / 2;
          }

          if( diff ){
            adjust_top( 'top', diff, arr );
          }
      },
      left_sib = hgt_find( __cur.left_sibling ),
      right_sib = hgt_find( __cur.right_sibling ),
      left_child = ( is_other_vert ? hgt_find : wdt_find )( __cur.left_children ),
      right_child = ( is_other_vert ? hgt_find : wdt_find )( __cur.right_children ),
      direct_child = wdt_find( __cur.direct_children ),
      children_hgt = Math.max( left_child.height, right_child.height, direct_child.height ),
      sibling_hgt = Math.max( __height, left_sib.height, right_sib.height ),
      sib_hgt_to_move = vert_spacing + sibling_hgt,
      left_sib_width = left_sib.width,
      right_sib_width = right_sib.width,
      left_child_width = left_child.width,
      right_child_width = right_child.width,
      direct_child_width = direct_child.width,
      min_left = 0,
      min_top = 0,
      max_top = __height,
      max_left = __width,
      sib_left = 0,
      height_diff_due_to_sibling = 0;

      adjust_hgt( sibling_hgt, left_sib, void 0, true );
      adjust_hgt( sibling_hgt, right_sib, void 0, true );
      adjust_hgt( children_hgt, left_child, sib_hgt_to_move );
      adjust_hgt( children_hgt, right_child, sib_hgt_to_move );
      adjust_hgt( children_hgt, direct_child, sib_hgt_to_move );

      if( left_sib_width ){
          var __left_arr = left_sib.arr,
          ret1 = adjust_top( 'left', - left_sib_width - hori_spacing, __left_arr ),
          ret2 = adjust_top( 'top', ( __height - left_sib.height ) / 2, __left_arr );

          min_left = Math.min( min_left, ret1.min );
          min_top = Math.min( min_top, ret2.min );
          max_top = Math.max( max_top, ret2.max );
      }

      if( right_sib_width ){
          var __right_arr = right_sib.arr,
          ret1 = adjust_top( 'left', hori_spacing + __width, __right_arr ),
          ret2 = adjust_top( 'top', ( __height - right_sib.height ) / 2, __right_arr );

          max_left = Math.max( max_left, ret1.max );
          min_top = Math.min( min_top, ret2.min );
          max_top = Math.max( max_top, ret2.max );
      }

      height_diff_due_to_sibling = sibling_hgt - max_top;

      if( !height_diff_due_to_sibling && ( direct_child_width || left_child_width || right_child_width ) ){
          max_top += ( vert_spacing + children_hgt );
      }

      if( direct_child_width ){
          var __direct_arr = direct_child.arr,
          ret1,
          final_value,
          __direct_arr_len = __direct_arr.length;

          if( /*__data.ltPropIgnoreSibling &&*/ __direct_arr_len ){
             // var __min_value = Infinity,
             // __max_value = -Infinity,
             // __mid;

             // __direct_arr.forEach( function( item ){
             //    __min_value = Math.min( item.left, __min_value );
             //    __max_value = Math.max( __max_value, item.left + item.original_width );
             // });
            
            var mid_index = parseInt( __direct_arr_len / 2 );

             if( /*( align_mid_children || true ) &&*/ ( __direct_arr_len > 1 ) && ( __direct_arr_len % 2 == 1 ) ){
                var mid_shape = __direct_arr[ mid_index ],
                __mid = mid_shape.left + mid_shape.original_width / 2;

                final_value = __width / 2 - __mid;
             } else {
                var left_mid = __direct_arr[ mid_index ? ( mid_index - 1 ) : mid_index ],
                right_mid = __direct_arr[ mid_index ],
                __mid;

                if( __direct_arr_len == 1 ){
                  __mid = ( right_mid.left + right_mid.original_width - left_mid.left );
                  final_value = ( __width - __mid ) / 2 - left_mid.left;
                } else {
                  __mid = ( left_mid.left + left_mid.original_width + right_mid.left ) / 2;

                  final_value = __width / 2 - __mid;
                }
             }

          } else {
             final_value = ( __width - direct_child_width ) / 2;
          }

          ret1 = adjust_top( 'left', final_value, __direct_arr );

          min_left = Math.min( min_left, sib_left = Math.min( sib_left, ret1.min ) );
          max_left = Math.max( max_left, ret1.max );

          if( height_diff_due_to_sibling ){
            var __ret = adjust_top( 'top', - height_diff_due_to_sibling, __direct_arr );
            min_top = Math.min( min_top, __ret.min );
            max_top = Math.max( max_top, __ret.max );
          }
      }

      if( right_child_width ){
          var __right_arr = right_child.arr,
          ret1 = adjust_top( 'left', Math.max( sib_left + direct_child_width + hori_spacing, __width + hori_spacing ), __right_arr );
          max_left = Math.max( max_left, ret1.max );

          if( height_diff_due_to_sibling ){
            var to_deduct = height_diff_due_to_sibling + ( sibling_hgt - right_sib.height ) / 2,
            __ret = adjust_top( 'top', -to_deduct, __right_arr );
            min_top = Math.min( min_top, __ret.min );
            max_top = Math.max( max_top, __ret.max );
          }
      }

      if( left_child_width ){
          var __left_arr = left_child.arr;

          min_left = Math.min( min_left, adjust_top( 'left', sib_left - hori_spacing - left_child_width, __left_arr ).min );

          if( height_diff_due_to_sibling ){
            var to_deduct = height_diff_due_to_sibling + ( sibling_hgt - left_sib.height ) / 2,
            __ret = adjust_top( 'top', -to_deduct, __left_arr );

            min_top = Math.min( min_top, __ret.min );
            max_top = Math.max( max_top, __ret.max );
          }
      }

      var children_width = ( left_child_width + ( left_child_width ? hori_spacing : 0 ) + Math.max( direct_child_width, __width ) + ( right_child_width ? hori_spacing : 0 ) + right_child_width ),
      sibling_width = ( left_sib_width + ( left_sib_width ? hori_spacing : 0 ) + __width + ( right_sib_width ? hori_spacing : 0 ) + right_sib_width ),
      __final = {
        id : item,
        left : 0,
        top : 0,
        original_width : __width,
        original_height : __height,
        width : max_left - min_left,
        height : max_top - min_top,
        left_sib : left_sib.arr,
        right_sib : right_sib.arr,
        left_child : left_child.arr,
        right_child : right_child.arr,
        direct_child : direct_child.arr,
        min_left : min_left,
        min_top : min_top,
        max_left : max_left
      };

      __cur.ret = ret;

      __this.nested_modify( __final, 'left', -min_left );
      __this.nested_modify( __final, 'top', -min_top );

      return __final;
  },

   sibling_arrange : function( obj_format, dimension, frm_didConnect ){
      var level_arr = {},
      to_move = {},
      seperate_shapes = [],
      connected_shapes = [],
      is_render_with_arrange = frm_didConnect && this.data.ltPropRenderWithArrange,
      cb = "onArrange";

      this.find_sibling( obj_format, connected_shapes, seperate_shapes, is_render_with_arrange );
      this.set_final_positions( obj_format, connected_shapes, seperate_shapes, to_move );

      this.set_positions( to_move, dimension, frm_didConnect, is_render_with_arrange );

      this.getMethods( cb ) && this.executeMethod( cb, to_move, !!frm_didConnect, this.$node );
   }
});
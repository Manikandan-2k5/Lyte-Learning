Lyte.Mixin.register("lyte-connect-positioning", {

   pushArr: function pushArr(arr, value) {
      if (arr.indexOf(value) == -1) {
         arr.push(value);
      }
   },

   sort_object: function sort_object(obj, modify_key) {
      var new_obj = {},
          keys = Object.keys(obj).sort(function (a, b) {
         var a_data = obj[a],
             b_data = obj[b],
             a_from = a_data.from.length,
             b_from = b_data.from.length;

         return b_data.from.length + b_data.to.length - (a_data.from.length + a_data.to.length);
      });

      if (modify_key) {
         var mod_key = [],
             len = keys.length,
             mod_len = 0,
             count = 0;

         while (len > mod_len) {
            if (mod_len) {
               for (var i = 1; i <= mod_len; i += 2) {
                  var value_to_push = keys[count++];

                  if (value_to_push) {
                     mod_key.splice(i, 0, value_to_push);
                  } else {
                     break;
                  }
               }
            } else {
               mod_key.push(keys[count++]);
            }
            mod_len = mod_key.length;

            if (count >= len) {
               break;
            }
         }

         keys = mod_key;
      }

      keys.forEach(function (item) {
         new_obj[item] = obj[item];
      });

      return new_obj;
   },

   arrangeShapes: function arrangeShapes(obj_format, dimension, frm_didConnect) {

      var separateShapes = [],
          shapeDetails = {},
          shake = this.data.ltPropShakeArrange,
          to_move = [],
          fn = function () {
         this.set_individual_pos(to_move);
      }.bind(this);

      // this.setData({
      //    ltPropScrollLeft : 0,
      //    ltPropScrollTop : 0,
      //    ltPropScale : 1
      // });

      if (shake || this.data.ltPropArrangeType == "random") {
         obj_format = this.sort_object(obj_format, !shake);
         this[shake ? 'double_overlap' : 'randomArrange'](separateShapes, obj_format, to_move, frm_didConnect);
         return fn();
      }

      for (var key in obj_format) {
         this.calculateRecursively(obj_format[key], obj_format, shapeDetails, 0, [], separateShapes);
      }

      var orderedShapes = this.adjust_level(shapeDetails);

      this.setPositions(this.arrangedOrder(orderedShapes, shapeDetails), separateShapes, shapeDetails, obj_format, to_move);

      fn();
   },

   double_overlap: function double_overlap(nonConnected, posDetails, to_move) {
      var $node = this.$node,
          origin = {
         x: $node.offsetWidth / 2,
         y: $node.offsetHeight / 2
      },
          data = this.data,
          inf = Infinity,
          range_IV = [{ _left: [], _right: [], left: -inf, right: origin.x, top: -inf, bottom: origin.y, width: inf, height: inf }],
          range_I = [{ _left: [], _right: [], left: origin.x, right: inf, top: -inf, bottom: origin.y, width: inf, height: inf }],
          range_II = [{ _left: [], _right: [], left: origin.x, right: inf, top: origin.y, bottom: inf, width: inf, height: inf }],
          range_III = [{ _left: [], _right: [], left: -inf, right: origin.x, top: origin.y, bottom: inf, width: inf, height: inf }],
          keys = Object.keys(posDetails),
          first = keys.splice(0, 4),
          _left = inf,
          _top = inf,
          _right = -inf,
          _bottom = -inf;

      keys.forEach(function (item, index) {
         var range;

         switch (index % 4) {
            case 0:
               {
                  range = range_I;
               }
               break;
            case 1:
               {
                  range = range_II;
               }
               break;
            case 2:
               {
                  range = range_III;
               }
               break;
            case 3:
               {
                  range = range_IV;
               }
         }

         var ret = this.process_double_overlap(range, posDetails, to_move, origin, item),
             ret_pos = ret.pos,
             ret_dim = ret.dim;

         _left = Math.min(_left, ret_pos.left);
         _top = Math.min(_top, ret_pos.top);
         _right = Math.max(_right, ret_pos.left + ret_dim.width);
         _bottom = Math.max(_bottom, ret_pos.top + ret_dim.height);
      }.bind(this));

      function fn(width_fact, height_fact, id) {
         to_move.push({
            id: id,
            pos: {
               left: _left + (_right - _left) * width_fact,
               top: _top + (_bottom - _top) * height_fact
            }
         });
      }

      fn(0.5, 1, first[0]);
      fn(0.5, 0, first[1]);
      fn(0, 0.5, first[2]);
      fn(1, 0.5, first[3]);
   },

   process_double_overlap: function process_double_overlap(ranges, posDetails, to_move, origin, item) {
      var dim = posDetails[item].dimension,
          _width = dim.width,
          _height = dim.height,
          value = Infinity,
          _pos1 = this.find_position(ranges, origin, {
         width: value,
         height: _height
      }),
          _pos2 = this.find_position(ranges, origin, {
         width: _width,
         height: value
      }),
          pos = {
         left: _pos2.left,
         top: _pos1.top
      };

      this.split_ranges(ranges, {
         position: {
            left: -value,
            right: value,
            top: _pos1.top
         },
         dimension: {
            width: value,
            height: _height
         }
      });

      this.split_ranges(ranges, {
         position: {
            left: _pos2.left,
            top: -value,
            bottom: value
         },
         dimension: {
            width: _width,
            height: value
         }
      });

      to_move.push({
         id: item,
         pos: pos
      });

      return {
         pos: pos,
         dim: dim
      };
   },

   modify_for_shake: function modify_for_shake(shapeDetails) {
      this.find_max_min(shapeDetails);

      this.remove_wrong_parent(shapeDetails);
   },

   remove_wrong_parent: function remove_wrong_parent(shapeDetails) {

      var fn = function fn(cur) {
         var children = cur.children,
             len = children.length;

         for (var i = 0; i < len; i++) {
            var item = children[i],
                __child = shapeDetails[item];
            if (__child.parent.indexOf(cur.id) == -1) {
               children.splice(i--, 1);
               len--;
            }
         }
      };

      for (var key in shapeDetails) {
         fn(shapeDetails[key]);
      }
   },

   find_max_min: function find_max_min(shapeDetails) {

      var fn = function fn(value) {
         var cur_level = value.level,
             parent = value.parent,
             inf = Infinity,
             min_level = inf,
             max_level = -inf,
             min_id,
             max_id,
             id = value.id,
             par_len = parent.length,
             _children = value.children;

         parent.forEach(function (item) {
            var par_level = shapeDetails[item].level,
                idx = _children.indexOf(item);

            if (min_level > par_level) {
               min_level = par_level;
               min_id = item;
            }

            if (max_level < par_level && id != item) {
               max_level = par_level;
               max_id = item;
            }

            if (idx + 1) {
               _children.splice(idx, 1);
            }
         });

         if (max_level == -inf) {
            max_level = cur_level - 1;
         }
         if (min_level == inf) {
            min_level = cur_level - 1;
         }

         value.level = Math.max(min_level + 1, cur_level);

         value.min_id = min_id;
         value.max_id = max_id;

         for (var i = 0; i < par_len; i++) {
            var item = shapeDetails[parent[i]],
                comm = item.commonChildren,
                __id = item.id,
                idx = comm.indexOf(id),
                __child = item.children;
            if (idx + 1) {
               comm.splice(idx, 1);
            }
            if (__id == min_id) {
               continue;
            }

            __child.splice(__child.indexOf(id), 1);
            value.parent.splice(i--, 1);
            par_len--;
         }
      };

      for (var key in shapeDetails) {
         fn(shapeDetails[key]);
      }
   },

   setPositions: function setPositions(arrshapes, nonConnected, shapeDetails, posDetails) {

      var ww = this.$node.offsetWidth,
          wh = this.$node.offsetHeight,
          data = this.data,
          arrange_off = data.ltPropArrangeOffset,
          LeftOff = 0,
          offset = { left: 0, top: 0 },
          offLeft = offset.left + LeftOff,
          offTop = offset.top,
          shapes = arrshapes.neworder,
          roundOrder = arrshapes.roundOrder,
          nonTop = 20,
          topPos = 20,
          max_height,
          scrollLeft = 0,
          scrollTop = 0,
          scale = data.ltPropScale,
          invert = data.ltPropDownwardPosition,
          is_center = !arrshapes.roundOrder.length,
          arrange_type = data.ltPropArrangeType,
          boundary = data.ltPropBoundary,
          b_width = boundary.right - boundary.left,
          is_shake = data.ltPropShakeArrange;

      for (var j = 0; j < nonConnected.length; j++) {
         var cur = nonConnected[j],
             obj = {
            top: nonTop - scrollTop
         },
             __dim = posDetails[cur].dimension;

         if (/horizontal/i.test(arrange_type)) {
            obj.left = LeftOff;
            LeftOff = LeftOff + __dim.width + 100;

            topPos = Math.max(topPos - scrollTop, obj.top + __dim.height - scrollTop);
         } else {

            if (is_center) {
               obj.left = (ww - __dim.width) * 0.5;
            } else {
               obj.left = offLeft - scrollLeft + arrange_off;
               LeftOff = Math.max(LeftOff, __dim.width + obj.left);
            }

            nonTop += (__dim.height + 100) * (invert ? -1 : 1);
         }

         to_move.push({
            id: cur,
            pos: obj
         });
      }

      if (/^tree$/i.test(arrange_type)) {
         var max_width = 0,
             blockWidth1 = this.blockWidth(shapes, shapeDetails, posDetails),
             max_width_occupied = 0,
             old_off = LeftOff,
             offdiff = 0,
             vert_gape = is_shake ? 300 : 100,
             deduct_size = vert_gape / 4,
             dependencies = {},
             done = {},
             inf = Infinity,
             ranges = [{ _left: [], _right: [], left: -inf, right: inf, top: -inf, bottom: inf, width: inf, height: inf }];

         (arrshapes.neworder.index_0 || []).forEach(function (item) {
            max_width_occupied += blockWidth1[item].width;
         });

         LeftOff += 0.5 * Math.max(0, ww - LeftOff - max_width_occupied);

         offdiff = LeftOff - old_off;

         to_move.forEach(function (item) {
            item.offdiff = offdiff;
         });

         for (var key in shapes) {
            var levelShapes = shapes[key],
                length = levelShapes.length,
                half = Math.round(length / 2),
                parsed = parseInt(length / 2),
                max_height = 0,
                left = 0,
                sign = -1,
                shaky_height = is_shake ? deduct_size * 3 : 0;

            for (var i = 0; i < length; i++) {
               var id = levelShapes[i],
                   detail = posDetails[id],
                   __detail = shapeDetails[id],
                   det_dim = detail.dimension;

               var new_pos = { top: topPos - scrollTop + shaky_height, left: LeftOff + offLeft - scrollLeft + blockWidth1[id].left + blockWidth1[id].width * 0.5 - det_dim.width * 0.5 + left };

               to_move.push({
                  id: id,
                  pos: new_pos
               });

               max_height = Math.max(max_height, det_dim.height);

               if (is_shake) {
                  shaky_height += deduct_size * sign;

                  if (sign == -1) {
                     if (shaky_height < 0) {
                        sign = 1;
                        shaky_height = deduct_size;
                     }
                  } else {
                     if (shaky_height > vert_gape) {
                        sign = -1;
                        shaky_height = vert_gape - deduct_size;
                     }
                  }

                  var max_id = __detail.max_id;

                  if (!max_id) {
                     done[id] = {
                        pos: this.check_shake_pos(new_pos, ranges, det_dim),
                        dim: det_dim
                     };
                  } else {
                     var exst = done[max_id];
                     if (exst) {
                        new_pos.top = exst.pos.top + exst.dim.height + vert_gape - shaky_height;

                        done[id] = {
                           pos: this.check_shake_pos(new_pos, ranges, exst.dim),
                           dim: detail.dimension
                        };

                        this.dep_check(dependencies, done, vert_gape, id, ranges);
                     } else {
                        var dep = dependencies[max_id] || (dependencies[max_id] = []);
                        dep.push({
                           id: id,
                           pos: new_pos,
                           dim: det_dim,
                           shaky_height: shaky_height
                        });
                     }
                  }
               }
            }

            topPos = topPos + (max_height + vert_gape) * (invert ? -1 : 1);
         }
         if (invert) {
            this.scroll_to(scrollLeft, scrollTop - topPos - max_height - vert_gape);
         }
      } else if (/^circle$/i.test(arrange_type)) {

         var length = roundOrder.length,
             radius = length * (Math.max(100, b_width) + 40) / (2 * Math.PI);

         for (var j = 0; j < length; j++) {
            var angle = j * 360 / length;
            var vertDist = Math.cos(angle * Math.PI / 180) * radius,
                horiDist = Math.sin(angle * Math.PI / 180) * radius,
                detail = posDetails[roundOrder[j]];

            to_move.push({
               id: roundOrder[j],
               pos: { left: ww * 0.5 - horiDist - detail.dimension.width * 0.5 - scrollLeft + LeftOff + 100, top: wh * 0.5 - vertDist - detail.dimension.height * 0.5 - scrollTop }
            });
         }
      } else if (/^ltrtree$/i.test(arrange_type)) {
         var maxspace = 100;
         for (var key in shapes) {
            var levelShapes = shapes[key],
                length = levelShapes.length,
                max_height = 0,
                leftVal = nonConnected.length ? maxspace : 0;

            for (var i = 0; i < length; i++) {
               var detail = posDetails[levelShapes[i]];

               to_move.push({
                  id: levelShapes[i],
                  pos: { left: LeftOff + offLeft - scrollLeft + leftVal, top: topPos - scrollTop }
               });

               leftVal += maxspace + detail.dimension.width;
               max_height = Math.max(max_height, detail.dimension.height);
            }
            topPos = topPos + (max_height + 100) * (invert ? -1 : 1);
         }
         if (invert) {
            this.scrollTo(scrollLeft, scrollTop - topPos - max_height - 100);
         }
      } else if (/^rtltree$/i.test(arrange_type)) {
         var maxspace = 100,
             max_width = 0,
             minLeft = 0;
         for (var key in shapes) {
            var levelShapes = shapes[key],
                length = levelShapes.length,
                max_height = 0,
                leftVal = nonConnected.length ? -maxspace : 0;
            for (var i = 0; i < length; i++) {
               var detail = posDetails[levelShapes[i]];

               to_move.push({
                  id: levelShapes[i],
                  pos: { left: -offLeft - scrollLeft + leftVal - detail.dimension.width, top: topPos - scrollTop }
               });

               leftVal -= maxspace + detail.dimension.width;
               max_height = Math.max(max_height, detail.dimension.height);
            }
            minLeft = Math.min(minLeft, leftVal);
            topPos = topPos + (max_height + 100) * (invert ? -1 : 1);
         }
         this.scrollTo(-maxspace - minLeft, invert ? scrollTop - topPos - max_height - 100 : scrollTop);
      } else if (/^horizontal$/i.test(arrange_type)) {

         var left_value = 0,
             blockWidth1 = this.blockWidth(shapes, shapeDetails, posDetails, true);

         for (var key in shapes) {
            var levelShapes = shapes[key],
                length = levelShapes.length,
                half = Math.round(length / 2),
                parsed = parseInt(length / 2),
                max_width = 0;

            for (var i = 0; i < length; i++) {
               var id = levelShapes[i],
                   detail = posDetails[id];

               var new_pos = {
                  left: left_value,
                  top: topPos + blockWidth1[id].top + 0.5 * (blockWidth1[id].height - detail.dimension.height) + offTop - scrollTop
               };

               to_move.push({
                  id: id,
                  pos: new_pos
               });

               max_width = Math.max(max_width, detail.dimension.width + 100);
            }

            left_value += max_width;
         }
      }
   },

   check_shake_pos: function check_shake_pos(pos, ranges, dim) {

      var origin = {
         x: pos.left + dim.width / 2,
         y: pos.top + dim.height / 2
      },
          new_position = this.find_position(ranges, origin, dim);

      $L.extend(pos, new_position);

      this.split_ranges(ranges, {
         position: pos,
         dimension: dim
      });

      return pos;
   },

   dep_check: function dep_check(dependencies, done, vert_gape, item, ranges) {
      var __dep = dependencies[item] || [],
          __done = done[item];
      if (__done) {
         __dep.forEach(function (__item) {
            var new_id = __item.id,
                _pos = __item.pos,
                _dim = __done.dim;

            _pos.top = __done.pos.top + _dim.height + vert_gape - __item.shaky_height;

            done[new_id] = {
               pos: this.check_shake_pos(_pos, ranges, _dim),
               dim: __item.dim
            };

            this.dep_check(dependencies, done, vert_gape, new_id, ranges);
         }.bind(this));
         delete dependencies[item];
      }
   },

   set_individual_pos: function set_individual_pos(to_move) {
      var details = this.data.details,
          fastdom = $L.fastdom;

      to_move.forEach(function (item) {
         var id = item.id,
             new_position = item.pos,
             data = details[id].data,
             old_position = data.position || {},
             is_same = old_position.left == new_position.left && old_position.top == new_position.top;

         if (!is_same) {
            this.pushToQueue({
               type: "positionUpdate",
               id: id,
               oldValue: this.stringify(old_position),
               newValue: this.stringify(new_position)
            });
            Lyte.objectUtils(data, 'add', 'position', new_position);
            setTimeout(this.update_position.bind(this, this.get_element(id)), 0);
         }
      }.bind(this));

      // setTimeout( function(){
      //    this._boundary();
      //    fastdom.measure( function(){
      //       fastdom.mutate( function(){
      //          this.moveToCenter();
      //       }.bind( this ));
      //    }.bind( this ));
      // }.bind( this ), 10 );
   },

   blockWidth: function blockWidth(shapes, shapeDetails, posDetails, vertical) {
      var final = {};
      for (var key in shapes) {
         var levelShapes = shapes[key],
             length = levelShapes.length;

         for (var i = 0; i < length; i++) {
            var id = levelShapes[i];
            if (final[id]) {
               continue;
            }
            this._blockWidth(final, id, shapeDetails, posDetails, 0, levelShapes[i - 1], vertical);
         }
      }

      return final;
   },

   _blockWidth: function _blockWidth(final, id, shapeDetails, posDetails, left, prev, vertical) {
      if (final[id]) {
         return;
      }
      var cur_detail = shapeDetails[id],
          children = cur_detail.children,
          common = cur_detail.commonChildren,
          width_val = vertical ? 'height' : 'width',
          left_val = vertical ? 'top' : 'left',
          obj = {},
          previous = final[prev],
          isNearest = function isNearest(child) {
         var detail = shapeDetails[child],
             level = detail.level,
             __diff = Infinity,
             _nearest,
             parent = detail.parent;
         parent.forEach(function (item) {
            var par_detail = shapeDetails[item];
            if (level - par_detail.level < __diff) {
               __diff = level - par_detail.level;
               _nearest = item;
            }
         });
         return _nearest;
      },
          is_shake = this.data.ltPropShakeArrange;

      obj[width_val] = 0;
      obj[left_val] = left;

      if (previous) {
         obj[left_val] += previous[width_val] + previous[left_val];
      }

      final[id] = obj;

      children.forEach(function (child, index) {
         var leftToSet;
         if (previous) {
            leftToSet = previous[width_val] + previous[left_val];
         } else {
            leftToSet = left;
         }

         this._blockWidth(final, child, shapeDetails, posDetails, leftToSet, void 0, vertical);
         obj[width_val] += final[child][width_val];

         if (is_shake && children.length == 1 && !shapeDetails[child].modified) {
            obj[width_val] *= 1.5;
            // cur_detail.modified = true;
         }

         previous = obj;
      }.bind(this));

      previous = void 0;

      common.forEach(function (child, index) {
         if (isNearest(child) != id || children.indexOf(child) != -1) {
            return;
         }
         var leftToSet;
         if (previous) {
            leftToSet = previous[width_val] + previous[left_val];
         } else {
            leftToSet = obj[width_val];
         }
         this._blockWidth(final, child, shapeDetails, posDetails, leftToSet, void 0, vertical);
         obj[width_val] += final[child].width /* * 0.5*/;
         previous = obj;
      }.bind(this));

      obj[width_val] = Math.max(obj[width_val], posDetails[id].dimension[width_val] + 100);
   },

   arrangedOrder: function arrangedOrder(orderedShapes, shapeDetails) {
      var neworder = {},
          values = [],
          keysLen,
          roundOrder = [],
          initial;

      $L.map(shapeDetails, function (obj) {
         values.push(obj);
      });

      keysLen = values.length;

      values.sort(function (a, b) {
         return a.level - b.level;
      });

      initial = values.length ? values[0].level : 0;

      for (var k = initial; k < keysLen + initial; k++) {
         var shp = "index_" + k;
         if (!orderedShapes[shp]) {
            continue;
         }
         var currentshapes = orderedShapes[shp],
             relationship = {},
             handled = {},
             shapedata = shapeDetails[currentshapes[0]];
         neworder[shp] = neworder[shp] || [];
         if (shapedata.level == initial) {
            this.reducing(shapeDetails, currentshapes, relationship, shp, neworder, handled, [], roundOrder, undefined, orderedShapes[shp]);
         } else {
            var prev = neworder['index_' + (parseInt(shp.match(/index_(\d+)/i)[1]) - 1)];
            if (!prev) {
               continue;
            }
            for (var zz = 0; zz < prev.length; zz++) {
               var _current = prev[zz],
                   cur_shape = shapeDetails[_current],
                   curChildren = cur_shape.children,
                   comChildren = cur_shape.commonChildren,
                   toAppend = [];
               toAppend._common = true;
               if (comChildren.length) {
                  var next = shapeDetails[prev[zz + 1]];
                  if (next) {
                     var nextCommon = next.commonChildren;
                     for (var comm = 0; comm < comChildren.length; comm++) {
                        var comm_name = comChildren[comm],
                            index = curChildren.indexOf(comm_name),
                            nextIndex = next.children.indexOf(comm_name),
                            nextCommonIndex = nextCommon.indexOf(comm_name);

                        if (nextCommonIndex != -1) {
                           toAppend.push(comm_name);
                           next.commonChildren.splice(nextCommonIndex, 1);
                           next.children.splice(nextIndex, 1);
                           curChildren.splice(index, 1);
                        }
                     }
                  }
               }
               this.reducing(shapeDetails, curChildren, relationship, shp, neworder, handled, toAppend, roundOrder, shapeDetails[prev[zz]], orderedShapes[shp]);
               this.reducing(shapeDetails, toAppend, relationship, shp, neworder, handled, curChildren, roundOrder, shapeDetails[prev[zz]], orderedShapes[shp]);
            }

            var cur_ordered = orderedShapes[shp],
                __length = cur_ordered.length,
                new_ordered = neworder[shp];

            for (var m = 0; m < __length; m++) {
               var item = cur_ordered[m];
               new_ordered.indexOf(item) == -1 && new_ordered.push(item);
               roundOrder.indexOf(item) == -1 && roundOrder.push(item);
            }
         }
      }
      return {
         neworder: neworder,
         roundOrder: roundOrder
      };
   },

   adjust_level: function adjust_level(shapeDetails) {
      var orderedShapes = {};

      for (var key in shapeDetails) {
         var cur = shapeDetails[key],
             order = orderedShapes['index_' + cur.level];
         if (!order) {
            order = [];
            orderedShapes['index_' + cur.level] = order;
         }
         order.push(key);
      }

      var __keys = Object.keys(orderedShapes).map(function (item) {
         return Number(item.replace('index_', ''));
      }).sort(function (a, b) {
         return a - b;
      }),
          new_obj = {},
          deduct = 0;

      __keys.forEach(function (item, index) {
         var __value = orderedShapes['index_' + item];

         if (__value.length) {
            var new_level = index - deduct;

            new_obj['index_' + new_level] = __value;

            __value.forEach(function (__id) {
               shapeDetails[__id].level = new_level;
            });
         } else {
            --deduct;
         }
      });

      return new_obj;
   },

   _isDef: function _isDef(arg) {
      return arg != void 0;
   },

   reducing: function reducing(shapeDetails, current, relationship, shp, neworder, handled, ignore, roundOrder, parentLevel, onlyCurrent) {
      var ordered;

      for (var i = 0; i < current.length; i++) {
         var cur = current[i];
         if (onlyCurrent.indexOf(cur) == -1) {
            current.splice(i, 1);
            i--;
            continue;
         }

         var curData = shapeDetails[cur],
             obj = relationship[cur],
             commonChildren = curData.commonChildren;
         if (this._isDef(parentLevel) && curData.level - 1 != parentLevel.level) {
            continue;
         }

         if (!obj) {
            obj = { total: 0, children: curData.children.length, shapes: {} };
            relationship[cur] = obj;
         }
         for (var j = i + 1; j < current.length; j++) {
            var next_cur = current[j],
                nextData = shapeDetails[next_cur],
                nextobj = relationship[next_cur];

            if (!nextobj) {
               nextobj = { total: 0, children: nextData.children.length, shapes: {} };
               relationship[next_cur] = nextobj;
            }

            for (var k = 0; k < commonChildren.length; k++) {
               var commonParent = shapeDetails[commonChildren[k]].parent;
               if (commonParent.indexOf(next_cur) != -1) {
                  obj.shapes[next_cur] = this._isDef(obj.shapes[next_cur]) ? obj.shapes[next_cur] + 1 : 1;
                  obj.total += 1;
                  obj.children--;

                  nextobj.shapes[cur] = this._isDef(nextobj.shapes[cur]) ? nextobj.shapes[cur] + 1 : 1;
                  nextobj.total += 1;
                  nextobj.children--;
               }
            }
         }
      }

      ordered = this.reorder(relationship, shapeDetails, ignore, neworder[shp], onlyCurrent);

      neworder[shp] = neworder[shp].concat(ordered);

      ordered = ordered.slice();

      ordered.unshift((parentLevel ? roundOrder.indexOf(parentLevel.id) : -1) + 1 + (current._common ? ignore.length : 0), 0);

      roundOrder.splice.apply(roundOrder, ordered);
   },

   reorder: function reorder(relationship, shapeDetails, ignore, neworder, onlyCurrent) {
      var retObj = this.findMax(ignore, neworder, relationship, void 0, onlyCurrent),
          rearrange = [];
      if (this._isDef(retObj.max)) {
         if (ignore.indexOf(retObj.maxIndex) != -1 || neworder.indexOf(retObj.maxIndex) != -1) {
            return [];
         }
         rearrange.push(retObj.maxIndex);
         secondBest = this.findMax(ignore, neworder, relationship, relationship[retObj.maxIndex].shapes, onlyCurrent);
         if (this._isDef(secondBest.max)) {
            this.appendRecursively(retObj.maxIndex, secondBest.maxIndex, relationship, shapeDetails, rearrange, 0, ignore);
            var thirdBest = this.findMax(ignore, neworder, relationship, relationship[retObj.maxIndex].shapes, onlyCurrent);
            if (this._isDef(thirdBest.max)) {
               this.appendRecursively(retObj.maxIndex, thirdBest.maxIndex, relationship, shapeDetails, rearrange, 1, ignore);
            }
         }
         for (var key in relationship) {
            if (rearrange.indexOf(key) == -1 && ignore.indexOf(key) == -1 && neworder.indexOf(key) == -1 && onlyCurrent.indexOf(key) != -1) {
               rearrange.push(key);
            }
         }
      }
      return rearrange;
   },

   appendRecursively: function appendRecursively(mI1, mI2, relationship, shapeDetails, rearrange, bool, ignore) {
      var successive = relationship[mI2].shapes,
          prev = mI1;
      if (ignore.indexOf(mI2) != -1) {
         return;
      }
      if (rearrange.indexOf(mI2) == -1) {
         rearrange[bool || ignore.length ? 'unshift' : 'push'](mI2); // No i18N
      }
      delete relationship[mI1].shapes[mI2];
      relationship[mI1].total--;
      delete relationship[mI2].shapes[mI1];
      relationship[mI2].total--;
      for (var key in successive) {
         this.appendRecursively(mI2, key, relationship, shapeDetails, rearrange, 0, ignore);
      }
   },

   calculateRecursively: function calculateRecursively(shape, object, shapeDetails, level, frmInitial, separateShapes) {

      var start = shape.from,
          end = shape.to,
          id = shape.id;

      if (!start.length && !end.length) {
         separateShapes.push(id);
      } else {
         var obj = shapeDetails[id];
         if (!obj) {
            obj = {};
            shapeDetails[id] = obj;
            obj.children = [];
            obj.parent = [];
            obj.commonChildren = [];
            obj.relationship = { total: 0 };
            obj.level = 0;
            obj.id = id;
         }
         if (frmInitial.length) {
            var last = $L(frmInitial).get(-1);
            if (obj.parent.indexOf(last) == -1) {
               if (obj.parent.length) {
                  this.pushArr(shapeDetails[obj.parent[obj.parent.length - 1]].commonChildren, id);
                  this.pushArr(shapeDetails[last].commonChildren, id);
               }
               obj.parent.push(last);
            }
         }
         if (frmInitial.length) {
            var last = $L(frmInitial).get(-1);
            if (obj.parent.indexOf(last) == -1) {
               if (obj.parent.length) {
                  this.pushArr(shapeDetails[obj.parent[obj.parent.length - 1]].commonChildren, id);
                  this.pushArr(shapeDetails[last].commonChildren, id);
               }
               obj.parent.push(last);
            }
         }
         if (obj.level < level) {
            obj.level = level;
            obj.children = [];
         } else {
            var __length = obj.parent.length;

            for (var k = 0; k < __length; k++) {
               var parentDetail = shapeDetails[obj.parent[k]];
               if (parentDetail.parent.length == 0) {
                  if (parentDetail.level == 0) {
                     var min = Infinity,
                         next_len = parentDetail.children.length;

                     for (var minLen = 0; minLen < next_len; minLen++) {
                        min = Math.min(min, (shapeDetails[parentDetail.children[minLen]] || { level: 0 }).level);
                     }
                     parentDetail.level = min - 1;
                  } else {
                     parentDetail.level = Math.min(obj.level - 1, parentDetail.level);
                  }
               }
            }
         }

         var __length = start.length;

         for (var i = 0; i < __length; i++) {
            var __id = start[i];
            if (obj.children.indexOf(__id) != -1) {
               continue;
            }
            obj.children.push(__id);
            if (frmInitial.indexOf(__id) != -1) {
               continue;
            }
            var newinitial = frmInitial.slice();
            newinitial.push(id);
            this.calculateRecursively(object[__id], object, shapeDetails, obj.level + 1, newinitial, separateShapes);
         }
      }
   },

   findMax: function findMax(ignore, neworder, relationship, frm, onlyCurrent) {
      frm = frm || relationship;
      var maxIndex, max;
      for (var key in frm) {
         if (ignore.indexOf(key) != -1 || neworder.indexOf(key) != -1 || onlyCurrent.indexOf(key) == -1) {
            continue;
         }
         if (this._isDef(max)) {
            if (relationship[key].total > max) {
               max = relationship[key].total;
               maxIndex = key;
            }
         } else {
            max = relationship[key].total;
            maxIndex = key;
         }
      }
      return {
         maxIndex: maxIndex,
         max: max
      };
   },

   randomArrange: function randomArrange(separateShapes, posDetails, to_move, frm_didConnect) {

      var $node = this.$node,
          origin = {
         x: $node.offsetWidth / 2,
         y: $node.offsetHeight / 2
      },
          data = this.data,
          inf = Infinity,
          ranges = [{ _left: [], _right: [], left: -inf, right: inf, top: -inf, bottom: inf, width: inf, height: inf }],
          to_extra = [],
          fn = this.process_random_double_overlap.bind(this, ranges, posDetails, to_move, origin);

      this._ignore_merge = true;

      for (var key in posDetails) {

         if (frm_didConnect) {
            if (this.is_exist(frm_didConnect, key)) {
               to_extra.push(key);
            } else {
               this.split_ranges(ranges, posDetails[key]);
               setTimeout(this.update_position.bind(this, this.get_element(key), true), 0);
            }
         } else {
            fn(key);
         }
      }

      to_extra.forEach(function (item) {
         fn(item);
      }.bind(this));

      delete this._ignore_merge;
   },

   process_random_double_overlap: function process_random_double_overlap(ranges, posDetails, to_move, origin, item) {
      var dim = posDetails[item].dimension,
          _width = dim.width,
          _height = dim.height,
          value = Math.max(_width, _height) * 2,
          half_value = value / 2,
          pos = this.find_position(ranges, origin, dim);

      to_move.push({
         id: item,
         pos: pos
      });

      this.split_ranges(ranges, {
         position: {
            left: pos.left - half_value,
            top: pos.top
         },
         dimension: {
            width: _width + value,
            height: _height
         }
      });

      this.split_ranges(ranges, {
         position: {
            left: pos.left,
            top: pos.top - half_value
         },
         dimension: {
            width: _width,
            height: _height + value
         }
      });
   }
});

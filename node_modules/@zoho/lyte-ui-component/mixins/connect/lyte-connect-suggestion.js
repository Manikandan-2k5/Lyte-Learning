; Lyte.Mixin.register('lyte-connect-suggestion', {
    create_conn: function (side, src_id, trg_id, svg_id, check_overlap,undo_bool) {
        var positions={"id": svg_id},
            src_pos,
            trg_pos;
        switch(side){
            case "left":
                src_pos={ "x": 0, "y": 0.5 }, 
                trg_pos= { "x": 1, "y": 0.5 };
                break;
            case "right":
                src_pos={ "x": 1, "y": 0.5 }, 
                trg_pos= { "x": 0, "y": 0.5};
                break;
            case "top":
                src_pos={ "x": 0.5, "y": 0 }, 
                trg_pos= { "x": 0.5, "y": 1 };
                break;
            case "down":
                src_pos={ "x": 0.5, "y": 1 }, 
                trg_pos= { "x": 0.5, "y": 0 };
                break;
        };
        positions.src_position=src_pos;
        positions.target_position=trg_pos;
        this.$node.connect(("#"+src_id), ("#"+trg_id), positions,undo_bool);
        if (check_overlap && this.getData("ltPropSuggestionMore") && this.getData("ltPropConnectionType")=="elbow") {
            var _this = this;
            $L.fastdom.measure(function () {
                $L.fastdom.mutate(function () {
                    _this.update_ignore(false);
                    _this._ranges = _this.overall_split([]);
                    _this.update_position(_this.get_element( trg_id ));
                    _this.refresh_other_connectors([trg_id]);
                });
            });
        }
    },
    remove_data : function (position,avail_pos) {
        position.forEach(item => {
            index = avail_pos.indexOf(item);
            if (index == -1){ 
                return;
            }
            avail_pos.splice(index, 1);
        });
    },
    avail_dec : function (__this, element) {
        var data = __this.$node.getConnections(element),
            return_arr = [],
            return_func=function(param1,param2){
                data[param1].forEach(item => {
                    var x = item[param2].x,
                        y = item[param2].y,
                        ret;
                    if (x >= 0 && x < 1 && y == 0) {
                        ret="top";
                    } else if (x > 0 && x <= 1 && y == 1) {
                        ret="down";
                    } else if (x == 0 && y > 0 && y <= 1) {
                        ret="left";
                    } else if (x == 1 && y >= 0 && y < 1) {
                        ret="right";
                    }
                    return_arr.push(ret);
                });
            };
        return_func("src","src_position");
        return_func("target","target_position");
        return return_arr;
    },
    _element_selections: function (_this, cur_id, cur_element, type) {
        var avail_pos = $L.extend([], _this.getData('ltPropSuggestionData')),
            elements = _this.getData('suggestionData'),
            conn_type = {},
            suggest_more = this.getData("ltPropSuggestionMore"),
            overlap_check = function (__this) {
                //remove directions from avail_pos when it returns true
                avail_pos = avail_pos.filter(function (item) {
                    var all_positions = $L.extend({}, __this.get_details()),
                        distance = __this.getData("ltPropSuggestionDistance"),
                        min_diff = __this.getData("ltPropMinDiff") / 2,
                        cur_pos = all_positions[cur_id].position,
                        nearest_val = undefined,
                        nearest_id = undefined,
                        dimensions=__this.getData("ltPropSuggestionDimensions"),
                        has_connection = function () {
                            var corr = { "right": "left", "left": "right", "top": "down", "down": "top" };
                            if (nearest_id) {
                                if (__this.avail_dec(__this, __this.get_element(nearest_id)).includes(corr[item])) {
                                    return false;
                                } else {
                                    conn_type[item] = { "connect": nearest_id };
                                }
                            } else {
                                conn_type[item] = "create";
                            }
                            return true;
                        };
                    for (key in all_positions) {
                        if (key != cur_id) {
                            var new_pos = all_positions[key].position,
                                new_left = new_pos.left,
                                new_top = new_pos.top,
                                new_right = new_left + new_pos.width,
                                new_down = new_top + new_pos.height,
                                max_down = (cur_pos.top + cur_pos.height) + min_diff,
                                max_top = cur_pos.top - min_diff,
                                max_right = cur_pos.left + cur_pos.width + min_diff,
                                max_left = cur_pos.left - min_diff,
                                sideObject = {
                                    left: function () {
                                        //only chnge width
                                        max_left = cur_pos.left - distance - (dimensions.width || cur_pos.width) - min_diff,
                                        // max_left = cur_pos.left - distance - cur_pos.width - min_diff,
                                        max_right = cur_pos.left;
                                        if ((new_right > max_left) && (new_left < max_right) && (new_top < max_down) && (new_down > max_top)) {
                                            nearest_val ? new_right > nearest_val ? (nearest_val = new_right, nearest_id = key) : false : (nearest_val = new_right, nearest_id = key);
                                        }
                                    },
                                    right: function () {
                                        //only chnge width
                                        max_left = cur_pos.left + cur_pos.width,
                                        max_right = max_left + distance + (dimensions.width || cur_pos.width) + min_diff;
                                        // max_right = max_left + distance + cur_pos.width + min_diff;
                                        if ((new_right > max_left) && (new_left < max_right) && (new_top < max_down) && (new_down > max_top)) {
                                            nearest_val ? new_left < nearest_val ? (nearest_val = new_left, nearest_id = key) : false : (nearest_val = new_left, nearest_id = key);
                                        }
                                    },
                                    top: function () {
                                        //only chnge height
                                        max_top = cur_pos.top - distance - (dimensions.height || cur_pos.height) - min_diff,
                                        // max_top = cur_pos.top - distance - cur_pos.height - min_diff,
                                        max_down = cur_pos.top;
                                        if ((new_left < max_right) && (new_right > max_left) && (new_top < max_down) && (new_down > max_top)) {
                                            nearest_val ? new_down > nearest_val ? (nearest_val = new_down, nearest_id = key) : false : (nearest_val = new_down, nearest_id = key);
                                        }
                                    },
                                    down: function () {
                                        //only chnge height
                                        max_top = cur_pos.top + cur_pos.height,
                                        max_down = max_top + distance + (dimensions.height || cur_pos.height) + min_diff;
                                        // max_down = max_top + distance + cur_pos.height + min_diff;
                                        if ((new_left < max_right) && (new_right > max_left) && (new_top < max_down) && (new_down > max_top)) {
                                            nearest_val ? new_top < nearest_val ? (nearest_val = new_top, nearest_id = key) : false : (nearest_val = new_top, nearest_id = key);
                                        }
                                    }
                                }
                            sideObject[item]();
                        }
                    };
                    return has_connection();
                });
            };
        if (type == "add") {
            this.remove_data(this.avail_dec(this, cur_element),avail_pos);
            overlap_check(this);
        }
        elements.forEach((item, index) => {
            if (type == "add" && avail_pos.includes(item.direction)) {
                this.alter_class(item, ["class", "type"], [(item.class + " lyteElementSuggestedDisplay"), conn_type[item.direction]]);
                this.remove_data([item.direction],avail_pos);
            } else if (type == "remove" && item.class.includes("lyteElementSuggestedDisplay")) {
                if (item.svg_id != "none") {
                    this.remove_connection(_this, index, _this);
                }
                this.alter_class(item, ["class", "type", "svg_id"], [(item.class.replace(" lyteElementSuggestedDisplay", "")), "none", "none"]);
            } else if (type == "add" && suggest_more) {
                this.alter_class(item, ["class", "type"], [(item.class + " lyteElementSuggestedDisplay"), "create_more"]);
            }
        })
    },
    alter_class: function (object, param, class_css) {
        for (var i = 0; i < param.length; i++) {
            Lyte.objectUtils(object, "add", param[i], class_css[i]);
        }
    },
    remove_connection: function (_this, index, conn_item) {
        var suggest_data = _this.getData("suggestionData")[index],
            svg_id = suggest_data.svg_id,
            svg_el = this.$node.querySelector("svg>#" + svg_id);
        suggest_data && this.alter_class(suggest_data, ["class"], [(suggest_data.class.replace(" lyteElementSuggestedHover", ""))]);
        if (svg_id == "none" || !conn_item.classList.contains("lyteConnectionSelected")) {
            return;
        }
        if (!suggest_data.type.connect && this.getData('fakeData').length > 0) {
            Lyte.arrayUtils(this.getData('fakeData'), 'pop');
        }
        this.$node.disConnect(svg_el,false,true);
        this.alter_class(suggest_data, ["svg_id"], ["none"]);
    },
    actions: {
        element_selection: function (_this, type) {
            this._element_selections(_this, _this.$node.id, _this.$node, type);
        },
        suggest_enter: function (_this, index, touch_type) {
            var suggest_data = _this.getData("suggestionData")[index],
                type = suggest_data.type,
                trg_id = type.connect,
                side = suggest_data.direction,
                src_el = _this.$node,
                src_id = src_el.id;
            if (touch_type != "touch") {
                this.alter_class(suggest_data, ["class"], [(suggest_data.class + " lyteElementSuggestedHover")]);
            }
            this.alter_class(suggest_data, ["svg_id"], [("random_connect_id_" + src_id + "_" + side + "_" + Date.now() + parseInt(Math.random() * 1000))]);
            var svg_id = suggest_data.svg_id;
            if (type == "create" || type == "create_more") {
                trg_id = "random_connect_item_id_" + Date.now() + parseInt(Math.random() * 1000);
                var src_positions = $L.extend({}, this.get_details()[src_id].position),
                    suggest_more = this.getData("ltPropSuggestionMore"),
                    distance = this.getData("ltPropSuggestionDistance"),
                    dimensions=this.getData("ltPropSuggestionDimensions"),
                    //set width for left and height for top
                    elem_width=(dimensions.width || src_positions.width),
                    elem_height=(dimensions.height || src_positions.height),
                    sideObject = {
                        left: function () { 
                            src_positions.left -= (elem_width + distance);
                            src_positions.top += ((src_positions.height/2)-(elem_height/2));
                        },
                        right: function () { 
                            src_positions.left += (src_positions.width + distance);
                            src_positions.top += ((src_positions.height/2)-(elem_height/2));
                        },
                        top: function () { 
                            src_positions.top -= (elem_height + distance);
                            src_positions.left += ((src_positions.width/2)-(elem_width/2));
                        },
                        down: function () { 
                            src_positions.top += (src_positions.height + distance);
                            src_positions.left += ((src_positions.width/2)-(elem_width/2));
                        }
                    }
                sideObject[side] && sideObject[side]();
                src_positions.width=elem_width;
                src_positions.height=elem_height;
                suggest_more && this.check_overlap(src_positions, null, this.overall_split([]), src_positions);
                Lyte.arrayUtils(this.getData('fakeData'), 'push', [{ "id": trg_id, "position": src_positions, "class": 'lyteConnectFakeElementBlur' }]);
            }
            this.create_conn(side, src_id, trg_id, svg_id,false,true);
            this.$node.querySelector('svg>#' + svg_id).classList.add('lyteConnectFakeElementBlur');
        },
        suggest_leave: function (_this, index) {
            this.remove_connection(_this, index, _this.$node);
        },
        suggest_click: function (_this, index) {
            var suggest_data = _this.getData("suggestionData")[index],
                src_el = _this.$node,
                side = suggest_data.direction,
                src_id = src_el.id,
                svg_id = suggest_data.svg_id,
                svg_el = this.$node.querySelector("svg>#" + svg_id);
            if (suggest_data.type.connect) {
                svg_el.classList.remove('lyteConnectFakeElementBlur');
            } else {
                this.$node.disConnect(svg_el,false,true);
                var trg_element = Lyte.arrayUtils(this.getData('fakeData'), 'pop');
                delete trg_element.class;
                this.insert(trg_element);
                // Lyte.arrayUtils(this.getData('ltPropData'), 'push', trg_element);
                this.create_conn(side, src_id, trg_element.id, svg_id, true,false);
            }
            this.alter_class(suggest_data, ["class", "svg_id"], [(suggest_data.class.replace(" lyteElementSuggestedHover", "")), "none"]);
            this.setup_boundary();
            this.unselect(null, src_el);
        }
    }

});
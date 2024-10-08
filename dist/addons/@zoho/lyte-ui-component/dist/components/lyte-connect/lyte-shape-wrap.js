/*
	download code ==>
	width = 1596 - 0 + 200,
	height = 1300 - 0 + 200;
	$L.screenGrab({
	  getDimension : function(){
	      return {
	          width : width,
	          height : height
	      }
	  },
	  dom : $0,
	  background : "white",
	  styles : ['width','height','transform'],
	  styles_replace : [ width + 'px', height + 'px', 'translate(100px, 100px)']
	}).then( ( result ) =>{
		var a = document.createElement( 'a' );
		a.download = 'sample_screen'; // file name
		a.href = result.canvas.toDataURL( "image/png" );
		document.body.appendChild( a );
		a.click();
		a.remove();
	});

*/


Lyte.Component.register("lyte-shape-wrap", {
_template:"<template tag-name=\"lyte-shape-wrap\"> <lyte-connect lt-prop=\"{{ltPropConnect}}\" lt-prop-select-mode=\"{{ltPropSelectMode}}\" lt-prop-data=\"{{ltPropData}}\" lt-prop-connection-type=\"{{ltPropConnectionType}}\" lt-prop-connector-radius=\"{{ltPropConnectorRadius}}\" lt-prop-avoid-with-module=\"{{ltPropAvoidWithModule}}\" lt-prop-check-line-break=\"{{ltPropCheckLineBreak}}\" lt-prop-elbow-arc=\"{{ltPropElbowArc}}\" lt-prop-avoid-line=\"{{ltPropAvoidLine}}\" lt-prop-smart-guide=\"{{ltPropSmartGuide}}\" lt-prop-text-box=\"{{ltPropTextBox}}\" lt-prop-offset=\"{{ltPropOffset}}\" lt-prop-scroll-left=\"{{lbind(ltPropScrollLeft)}}\" lt-prop-scroll-top=\"{{lbind(ltPropScrollTop)}}\" lt-prop-contextual-zoom-level=\"{{lbind(ltPropContextualZoomLevel)}}\" lt-prop-contextual-break-points=\"{{ltPropContextualBreakPoints}}\" lt-prop-contextual-zoom-data=\"{{ltPropContextualZoomData}}\" lt-prop-boundary=\"{{lbind(ltPropBoundary)}}\" lt-prop-readonly=\"{{ltPropReadonly}}\" lt-prop-default-anchors=\"{{ltPropDefaultAnchors}}\" lt-prop-ignore-corner-points=\"{{ltPropIgnoreCornerPoints}}\" lt-prop-render-points=\"{{ltPropRenderPoints}}\" lt-prop-arrange-type=\"{{ltPropArrangeType}}\" lt-prop-magnetiser=\"{{ltPropMagnetiser}}\" lt-prop-render-connectors-in-preview=\"{{ltPropRenderConnectorsInPreview}}\" lt-prop-reconnect-handling=\"{{ltPropReconnectHandling}}\" lt-prop-animation-duration=\"{{ltPropAnimationDuration}}\" lt-prop-line-marker=\"{{ltPropLineMarker}}\" lt-prop-undo=\"{{ltPropUndo}}\" lt-prop-id-prefix=\"{{ltPropIdPrefix}}\" lt-prop-render-with-arrange=\"{{ltPropRenderWithArrange}}\" lt-prop-ignore-sibling=\"{{ltPropIgnoreSibling}}\" on-create=\"{{method('shapecreate')}}\" on-connect=\"{{method('connectCreate')}}\" after-render=\"{{method('afterRender')}}\" on-connection-create=\"{{method('onconnect')}}\" on-before-connection-creation=\"{{method('beforeAnchorSelect')}}\" on-drop=\"{{method('drop')}}\" on-drag=\"{{method('drag')}}\" on-drag-end=\"{{method('dragend')}}\" on-before-unselect=\"{{method('unselect')}}\" on-delete=\"{{method('delete')}}\" on-shape-hover=\"{{method('hover')}}\" on-after-contextual=\"{{method('aftercontext')}}\" on-connection-disconnect=\"{{method('disconnect')}}\" on-before-disconnect=\"{{method('beforedisconnect')}}\" on-move=\"{{method('move')}}\" on-reconnect=\"{{method('beforeReconnect')}}\" on-custom-undo=\"{{method('customundo')}}\" on-arrange=\"{{method('arrange')}}\" on-scroll=\"{{method('commonMethod','onScroll')}}\" on-zoom=\"{{method('commonMethod','onZoom')}}\" on-preview-drag-select=\"{{method('commonMethod','onPreviewDragSelect')}}\" on-preview-drag-move=\"{{method('commonMethod','onPreviewDragMove')}}\" on-preview-drag-end=\"{{method('commonMethod','onPreviewDragEnd')}}\" on-drag-start=\"{{method('commonMethod','onDragStart')}}\" on-select=\"{{method('commonMethod','onSelect')}}\" on-click-select=\"{{method('commonMethod','onClickSelect')}}\" on-click-select-end=\"{{method('commonMethod','onClickSelectEnd')}}\" on-before-delete=\"{{method('commonMethod','onBeforeDelete')}}\" on-undo-redo-queue-update=\"{{method('commonMethod','onUndoRedoQueueUpdate')}}\" on-connection-hover=\"{{method('commonMethod','onConnectionHover')}}\" on-connection-leave=\"{{method('commonMethod','onConnectionLeave')}}\" on-shape-leave=\"{{method('commonMethod','onShapeLeave')}}\" on-before-reconnect-select=\"{{method('commonMethod','onBeforeReconnectSelect')}}\" on-textbody-click=\"{{method('commonMethod','onTextbodyClick')}}\" on-keydown=\"{{method('commonMethod','onKeydown')}}\" on-before-select=\"{{method('commonMethod','onBeforeSelect')}}\" on-shape-select=\"{{method('commonMethod','onShapeSelect')}}\" on-shape-unselect=\"{{method('commonMethod','onShapeUnselect')}}\"> <template is=\"registerYield\" yield-name=\"connection\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"preview\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"textbox\" from-parent=\"\"></template> </lyte-connect> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"registerYield","position":[1,3],"dynamicNodes":[]},{"type":"registerYield","position":[1,5],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropData","ltPropConnections","ltPropConnect","ltPropConnectionType","ltPropConnectorRadius","ltPropAvoidWithModule","ltPropCheckLineBreak","ltPropElbowArc","ltPropAvoidLine","ltPropOffset","ltPropScrollLeft","ltPropScrollTop","ltPropTextBox","ltPropSmartGuide","ltPropBoundary","ltPropContextualZoomLevel","ltPropContextualBreakPoints","ltPropContextualZoomData","ltPropReadonly","ltPropDefaultAnchors","ltPropIgnoreCornerPoints","ltPropRenderPoints","ltPropArrangeType","ltPropMagnetiser","ltPropRenderConnectorsInPreview","ltPropReconnectHandling","ltPropSelectMode","ltPropAnimationDuration","ltPropLineMarker","ltPropUndo","ltPropIdPrefix","ltPropArrangeOffset","ltPropArrangeOffsetVertical","ltPropVerticalArrangeOffset","ltPropDownwardPosition","ltPropRenderWithArrange","ltPropIgnoreSibling"],


	didConnect : function(){
		var $node = this.$node,
		elem = this.__wrapper = $L( 'lyte-connect', $node ).get( 0 );

		[ 'undo', 'redo', 'getConnectorTextbody', 'updateConnectorId', 'getConnectorFromTextbody', 'hasConnected', 'disConnect', 'selectShape', 'unSelectShapes', 'unSelectShape', 'arrange', 'scroll_to', 'deleteShape', 'insertShape', 'getSelected', 'resetSelected', 'groupSelected', 'moveToShape', 'moveToCenter', 'resetQueue', 'hideShape', 'showShape', 'getConnectionDetails', 'getAllConnections', 'refreshConnectors', 'resizeView', 'addText', 'updateText', 'removeText' ].forEach( function( item ){
			$node[ item ] = elem[ item ];
		});

		[ 'getConnectorData', 'connect', 'getConnectorText', 'getLoops', 'getConnections', 'getConnectorById', 'getConnectorByConnectorId', 'getShapes', 'getAll', 'getMatchedConnectors', 'getUnreachableNodes', 'isIsolated', 'getIsolatedNodes', 'getNodesInSeries', 'getNodesNotInSeries' ].forEach( function( item ){
			$node[ item ] = this[ item ].bind( this );
		}.bind( this ) );
	},

	didDestroy : function(){
		delete this.__wrapper;
	},

	data : function(){
		var array = 'array',
		string = 'string',
		boolean = 'boolean',
		number = 'number',
		object = 'object';

		return {
			ltPropData : Lyte.attr( array, { default : [] } ),
			ltPropConnections : Lyte.attr( array, { default : [] } ),

			ltPropConnect : Lyte.attr( string, { default : '{ "lazyLoading" : 0, "selectors":{"selector":".lyteConnectAnchorPoint","markerEnd":"url(#lyteConnectionTailMarker)","markerStart":"url(#lyteConnectionHeadMarker)"}}' } ),
			ltPropConnectionType : Lyte.attr( string, { default : "elbow" } ),
			ltPropConnectorRadius : Lyte.attr( number, { default : 5 } ),
			ltPropAvoidWithModule : Lyte.attr( boolean, { default : true } ),
			ltPropCheckLineBreak : Lyte.attr( boolean, { default : true } ),
			ltPropElbowArc : Lyte.attr( boolean, { default : true } ),
			ltPropAvoidLine : Lyte.attr( boolean, { default : true } ),
			ltPropOffset : Lyte.attr( number, { default : 50 } ),

			ltPropScrollLeft : Lyte.attr( number, { default : 0 } ),
			ltPropScrollTop : Lyte.attr( number, { default : 0 } ),

			ltPropTextBox : Lyte.attr( boolean, { default : true } ),

			ltPropSmartGuide : Lyte.attr( boolean, { default : false } ),

			ltPropBoundary : Lyte.attr( object, { default : {} } ),
			ltPropContextualZoomLevel : Lyte.attr( number, { default : 100 } ),
			ltPropContextualBreakPoints : Lyte.attr( array, { default : [ 100, 75, 50, 25, 0 ] } ),
			ltPropContextualZoomData : Lyte.attr( object, { default : {
				90 : {
					left : 80,
					top : 80
				},
				80 : {
					left : 80,
					top : 80
				},
				70 : {
					left : 80,
					top : 80
				},
				60 : {
					left : 80,
					top : 80
				},
				50 : {
					left : 80,
					top : 80
				},
				40 : {
					left : 80,
					top : 80
				},
				30 : {
					left : 80,
					top : 80
				},
				20 : {
					left : 80,
					top : 80
				},
				10 : {
					left : 100,
					top : 100
				},
				0 : {
					left : 100,
					top : 100
				}
			} } ),

			ltPropReadonly : Lyte.attr( boolean ),
			ltPropDefaultAnchors : Lyte.attr( array, { default : [ { type : "continuous" } ] } ),
			ltPropIgnoreCornerPoints : Lyte.attr( boolean, { default : true } ),
			ltPropRenderPoints : Lyte.attr( boolean, { default : false } ),

			ltPropArrangeType : Lyte.attr( string, { default : "siblingtree" } ),

			ltPropMagnetiser : Lyte.attr( boolean, { default : false } ),

			ltPropRenderConnectorsInPreview : Lyte.attr( boolean, { default : true } ),

			ltPropReconnectHandling : Lyte.attr( boolean, { default : true } ),

			ltPropSelectMode : Lyte.attr( boolean, { default : false } ),

			ltPropAnimationDuration : Lyte.attr( string, { default : "0.4s" } ),

			ltPropLineMarker : Lyte.attr( array ),

			ltPropUndo : Lyte.attr( boolean, { default : false } ),

			ltPropIdPrefix : Lyte.attr( string, { default : '' } ),

			ltPropArrangeOffset : Lyte.attr( number, { default : 0 } ),
			ltPropArrangeOffsetVertical : Lyte.attr( number, { default : 20 } ),
			ltPropVerticalArrangeOffset : Lyte.attr( object, { default : {
	            non_connected : 100,
	            connected : 100
	        } } ),
			ltPropDownwardPosition : Lyte.attr( boolean, { default : false } ),

			ltPropRenderWithArrange : Lyte.attr( boolean, { default : false } ),
			ltPropIgnoreSibling : Lyte.attr( boolean, { default : false } )
		}		
	},

	refresh_connector : function( obj, occupied ){
		var $connector = $L( document.getElementById( obj.id ) ),
		data = $connector.data(),
		src = data.src,
		target = data.target,
		src_data = src.get( 0 ).ltProp( 'item' ),
		target_data = target.get( 0 ).ltProp( 'item' ),
		src_ref = { x : 0.5, y : 1 },
		target_ref = { x : 0.5, y : 0 },
		fn = function( elem ){
			var __elem = elem.get( 0 ),
			pts = __elem.getData( 'points' );

            if( pts.length == 0 ){
              pts = __elem.getData( 'fake_pts' );
            }
            return pts;
		},
		__index = function( ref, pts, __id, occupied_count, ignore ){
			var distance = Infinity,
			selected,
			__occupied = occupied[ __id ];

			if( !__occupied ){
				occupied[ __id ] = __occupied = {};
			}


			pts.forEach( function( item, index ){
				var __dist = __distance( ref, item ),
				pt_occupied = __occupied[ index ] || [];

				if( pt_occupied.length > occupied_count || item.top == ignore ){
					return;
				}
 
				if( __dist < distance ){
					distance = __dist;
					selected = index;
				}
			});

			if( selected == void 0 ){
				return __index( ref, pts, __id, ++occupied_count, ignore );
			}

			var pt_occ = __occupied[ selected ];

			if( !pt_occ ){
				__occupied[ selected ] = pt_occ = [];
			}

			pt_occ.push( obj.id );

			return selected;
		},
		__distance = function( ref, pt ){
			return Math.sqrt( Math.pow( ref.x - pt.left, 2 ) + Math.pow( ref.y - pt.top, 2 ) );
		},
		src_pts = fn( src ),
		target_pts = fn( target ),
		start_index = __index( src_ref, src_pts, obj.start.id, 0, 0 ),
		end_index = __index( target_ref, target_pts, obj.end.id, 0, 1 ),
		start_pt = src_pts[ start_index ],
		end_pt = target_pts[ end_index ],
		options = data.options;

		data.src_position = $L.extend( true, {}, options.src_position = {
			x : start_pt.left,
			y : start_pt.top
		});

		data.target_position = $L.extend( true, {}, options.target_position = {
			x : end_pt.left,
			y : end_pt.top
		});

	},

	methods : {

		commonMethod : function( cb ){
			var args = Array.from( arguments )
			args.push( this.$node );

			return this.getMethods( cb ) && this.executeMethod.apply( this, args );
		},

		arrange : function( to_move, frm_didConnect ){
			var __data = this.data;

			if( frm_didConnect && __data.ltPropRenderWithArrange ){

				var connectors = __data.ltPropConnections,
				occupied = {};

				connectors.forEach( function( item ){
					this.refresh_connector( item, occupied );
				}.bind( this ) );

				window.requestAnimationFrame( function(){
					window.requestAnimationFrame( function(){
						var wrapper = this.__wrapper.component;
						wrapper.__allow_same = true;
						this.$node.arrange();
						delete wrapper.__allow_same;
					}.bind( this ));
				}.bind( this ));
			}
		},

		connectCreate : function( src, target, wrapper, evt, pos, connector ){ 
			var $src = $L( src ),
			wrapper = this.__wrapper,
			src_position = {
				x : pos.left,
				y : pos.top
			},
			target_position,
			src_elem = src.parentNode,
			src_index = this.add_anchors( src_elem, src_position ),
			target_index,
			cls_name = 'lyteConnectAnchorPoint',
			cb = "onBeforeConnect";

			if( $src.hasClass( cls_name ) ){
				var $target = $L( evt.target ),
				prefix = this.data.ltPropIdPrefix || '',
				__id = connector.id || "connection" + parseInt( Math.random() * 10000 );

				if( $target.hasClass( cls_name ) ){

					target_position = {
						y : Number( $target.attr( 'top' ) ),
						x : Number( $target.attr( 'left' ) )
					};

					target_index = this.add_anchors( target, target_position );

					if( this.getMethods( cb ) && this.executeMethod( cb, src_elem, target, src_index, target_index, connector, this.$node ) == false ){
						
						this.remove_anchor( src_elem.component, src_index );
						this.remove_anchor( target.component, target_index );

						return;
					}

					wrapper.connect( '#' + prefix + src_elem.id, '#' + prefix + target.id, {
						id : __id,
						class : connector.getAttribute( 'class' ).replace( 'lyteConnectionContainer', '' ).trim(),
						src_position : src_position,
						target_position : target_position
					});
				} else {

					if( this.getMethods( cb ) && this.executeMethod( cb, src_elem, target, src_index, target_index, connector ) == false ){
						this.remove_anchor( src_elem.component, src_index );
						return;
					}

					this.connect( src_elem.id, target.id, src_index, void 0, void 0, __id );
				}
			}
		},

		afterRender : function( node ){
			var cb = "onReady",
			__data = this.data,
			connections = __data.ltPropConnections,
			elems = __data.ltPropData,
			__wrapper = this.__wrapper;

			elems.forEach( function( item ){
				this.call_shape_create( item );
			}.bind( this ));

			if( __data.ltPropRenderWithArrange ){
				__wrapper.__ignore_update = true;
			}

			connections.forEach( function( item ){
				this.__connect( item );
			}.bind( this ) );

			delete __wrapper.__ignore_update;

			this.getMethods( cb ) && this.executeMethod( cb, node, this.$node );
		},

		shapecreate : function( __id, group_id, data, isundo, $node ){
			this.call_shape_create( data );
		},

		onconnect : function( node ){
			var cb = "onConnect";

			this.getMethods( cb ) && this.executeMethod( cb, node, this.getConnections( void 0, node.id ), {}, this.$node );
		},

		beforeAnchorSelect : function( evt ){
			var span = evt.target,
			shape = span.parentNode,
			shape_index = Number( shape.getAttribute( 'index' ) ),
			span_index = Number( span.getAttribute( 'index' ) ),
			cb = "onBeforeAnchorSelect";

			return this.getMethods( cb ) && this.executeMethod( cb, span, shape, this.data.ltPropData[ shape_index ], span_index, this.$node );
		},

		drop  : function( elem, old_pos, new_pos, $node, evt ){
			var cb = "onShapeModify";
			return this.getMethods( cb ) && this.executeMethod( cb, elem, this.data.ltPropData[ Number( elem.getAttribute( 'index' ) ) ], evt, this.$node );
		},

		drag : function( evt, $node ){
			var cb = "onDragMove";
			return this.getMethods( cb ) && this.executeMethod( cb, evt, !$L( $node ).hasClass( 'lyteDragSelection' ), this.$node );
		},

		dragend : function( evt, $node ){
			var cb = "onDragEnd";
			return this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node ); 
		},

		unselect : function( evt, elem ){
			var cb = "onBeforeUnselect";
			return this.getMethods( cb ) && this.executeMethod( cb, elem, evt, this.$node );
		},

		delete : function( __id, grp_id, data, frm_undo, $node ){
			var cb = "onDelete";
			this.getMethods( cb ) && this.executeMethod( cb, data, frm_undo, $node, this.$node );
		},

		hover : function( evt, elem ){
			var cb = "onShapeHover";
			this.getMethods( cb ) && this.executeMethod( cb, elem, evt, this.$node );
		},

		aftercontext : function( $node ){
			var cb = "onAfterContextual";
			this.getMethods( cb ) && this.executeMethod( cb, $node, this.$node );
		},

		shapecreate : function(){
			this.call_shape_create( arguments[ 2 ] );
		},

		disconnect : function( data, $node ){
			var cb = "onDisconnect";
			this.getMethods( cb ) && this.executeMethod( cb, data.options, $node );
		},

		beforedisconnect : function( elem, $node ){
			var cb = "onBeforeDisconnect",
			details = this.getConnections( void 0, elem.id )[ 0 ],
			ret = this.getMethods( cb ) && this.executeMethod( cb, details, $node, elem, this.$node );

			if( ret == false ){
				return ret;
			}
		},

		move : function( __moving, evt, $node ){
			var cb = "onShapeMove";

			if( this.getMethods( cb ) ){
				__moving.forEach( function( item ){
					var elem = item.get( 0 );
					this.executeMethod( cb, elem, this.data.ltPropData[ Number( elem.getAttribute( 'index' ) ) ], evt, this.$node );
				}.bind( this ) );
			}
		},

		beforeReconnect : function( src, old_target, new_target, $node, evt, connection, new_pos, old_pos, ns ){
			
			if( ns == "src" ){
				new_target = old_target;
				old_target = src;
			}

			var cb = "onBeforeReconnect",
			old_index = this.get_index( old_target, old_pos ),
			new_index = this.add_anchors( new_target, new_pos ),
			__id = connection.id,
			prefix = this.data.ltPropIdPrefix,
			ret = this.getMethods( cb ) && this.executeMethod( cb, old_target.id.replace( prefix, '' ), old_index, new_target.id.replace( prefix, '' ), new_index, ({ src : "start", target : "end" })[ ns ], __id, this.$node );

			if( ret == false ){
				this.remove_anchor( new_target.component, new_index );
				return ret;
			}

			this.remove_anchor( old_target.component, old_index, 1 );

			if( this.getMethods( cb = "onReconnect" ) ){
				setTimeout( function(){
					this.executeMethod( cb, this.getConnections( void 0, __id )[ 0 ], this.$node );
				}.bind( this ), 0 );
			}

			return new_target;
		},

		customundo : function( sub_type, value, is_undo, connect ){
			if( is_undo ){
				sub_type = ({
					insert_anchor : "remove_anchor",
					remove_anchor : "insert_anchor"
				})[ sub_type ];
			}

			var prefix = this.data.ltPropIdPrefix,
			elem = this.__wrapper.component.get_element( value.id.replace( prefix, '' ) ).component,
			index = value.index;

			switch( sub_type ){
				case 'insert_anchor' : {
					this.insert_anchor( index, value.main_index, elem, value.pt );
				}
				break;
				case 'remove_anchor' : {
					this.remove_anchor( elem, index );
				}
				break;
			}
		}
	},

	call_shape_create : function( data ){
		var cb = "onShapeCreate";
		this.getMethods( cb ) && this.executeMethod( cb, this.__wrapper.component.get_element( data.id ), data, {}, this.$node );
	},

	find_both_index : function( start_fake, end_fake, pos1, pos2 ){
		var __dist = Infinity,
		start,
		end;

		start_fake.forEach( function( item, index ){
			var ret = this.find_index( item, pos1, end_fake, pos2 ),
			dist = ret.dist;

			if( dist < __dist ){
				start = index;
				end = ret.index;
				__dist = dist;
			}

		}.bind( this ) );

		return{
			start : start,
			end : end
		};
	},

	find_index : function( pt, pos1, arr, pos2 ){
		var __pt1 = this.convert_abs( pt, pos1 ),
		selected,
		__dist = Infinity;

		arr.forEach( function( item, index ){
			var __pt2 = this.convert_abs( item, pos2 ),
			dist = Math.sqrt( Math.pow( __pt1.x - __pt2.x, 2 ) + Math.pow( __pt1.y - __pt2.y, 2 ) );

			if( dist < __dist ){
				__dist = dist;
				selected = index;
			}
		}.bind( this ) );

		return {
			index : selected,
			dist : __dist
		};
	},

	convert_abs : function( pt, obj ){
		var __left = obj.left,
		__top = obj.top,
		__width = obj.width,
		__height = obj.height;

		return {
			x : __left + pt.left * __width,
			y : __top + pt.top * __height
		};
	},

	connect : function( id1, id2, start, end, textbox, __id ){
		if( typeof id1 == "object" ){
			return this.__connect( id1 );
		}

		return this.__connect({
			id : __id,
			start : {
				id : id1,
				index : start
			},
			end : {
				id : id2,
				index : end
			},
			textBody : textbox
		});
	},

	__connect : function( item ){
		var wrapper = this.__wrapper,
		__this = wrapper.component,
		start = item.start,
		end = item.end,
		strat_id = start.id,
		end_id = end.id,
		start_data = __this.get_element( strat_id ).component.data,
		start_fake = start_data.fake_pts,
		end_data = __this.get_element( end_id ).component.data,
		end_fake = end_data.fake_pts,
		start_index = start.index,
		end_index = end.index,
		__void = void 0,
		is_start_void = start_index == __void,
		is_end_void = end_index == __void,
		prefix = this.data.ltPropIdPrefix;

		if( !start_fake.length ){
			start_fake = start_data.points;
		}

		if( !end_fake.length ){
			end_fake = end_data.points;
		}

		var start_pt = start_fake[ start_index ],
		end_pt = end_fake[ end_index ],
		start_pos = start_data.ltPropItem.position,
		end_pos = end_data.ltPropItem.position,
		obj;

		if( is_start_void && is_end_void ){
			var ret = this.find_both_index( start_fake, end_fake, start_pos, end_pos );

			start_pt = start_fake[ ret.start ];
			end_pt = end_fake[ ret.end ];
		} else if( is_start_void ){
			start_pt = start_fake[ this.find_index( end_pt, end_pos, start_fake, start_pos ).index ];
		} else if( is_end_void ){
			end_pt = end_fake[ this.find_index( start_pt, start_pos, end_fake, end_pos ).index ];
		}

		wrapper.connect( '#' + prefix + strat_id, '#' + prefix + end_id, obj = {
			id : item.id,
			src_position : {
				x : start_pt.left,
				y : start_pt.top
			},
			target_position : {
				x : end_pt.left,
				y : end_pt.top
			},
			textBox : item.textBody
		});

		item.id = obj.id;
	},

	add_anchors : function( elem, pos ){
		var __arr = elem.getData( 'points' ) || [],
		__index,
		__x = pos.x,
		__y = pos.y,
		anywhere = elem.ltProp( 'anywhere' ),
		__this = elem.component;

		if( __arr.length == 0 ){
			elem.setData( 'points', __arr = elem.getData( 'fake_pts' ).splice( 0 ) );
		}
		
		__arr.forEach( function( item, index ){
			if( item[ 0 ] == __x && item[ 1 ] == __y ){
				__index = index;
			}
		});

		if( __index + 1 ){
			return __index;
		}
		__index = __arr.length;

		if( anywhere ){
			__index--;
		}

		this.insert_anchor( __index, elem.ltProp( 'defaultAnchors' ).length, __this, [ __x, __y ] );

		return __index;
	},

	insert_anchor : function( __index, main_index, __this, pt ){
		var Lo = Lyte.arrayUtils,
		clss_name = 'lyteConnectCustomlyCreated',
		__pt = {
			class : clss_name
		},
		obj = __this.enum( {
			class : clss_name,
			point : [ pt[ 0 ], pt[ 1 ] ]
		}, 'ref', [ __pt ] ),
		wrapper_this = this.__wrapper.component,
		__arr =  __this.$node.ltProp( 'defaultAnchors' ),
		sub_arr = __this.getData( 'points' );

		if( sub_arr.length == 0 ){
			__this.setData( 'points', sub_arr = __this.getData( 'fake_pts' ).splice( 0 ) );
		}

		__this.enum( __pt, 'ref', obj );

		Lo( __arr, 'insertAt', main_index, obj );
		Lo( sub_arr, 'insertAt', __index, __this.update_value( __pt, pt ) );

		if( !wrapper_this.isUndo() ){
			var prefix = this.data.ltPropIdPrefix;

			wrapper_this.pushToQueue({
				type : "custom",
				sub_type : "insert_anchor",
				value : JSON.stringify({
					index : __index,
					main_index : main_index,
					pt : pt,
					id : __this.$node.id.replace( prefix, '' )
				})
			})
		}
	},

	remove_anchor : function( __this, __index, __count ){

		if( __index == void 0 ){
			return;
		}


		var points = __this.getData( 'points' );

		if( points.length == 0 ){
			__this.setData( 'points', points = __this.getData( 'fake_pts' ).splice( 0 ) );
		}

		var __cur = points[ __index ],
		def_pts = __this.$node.ltProp( 'defaultAnchors' ),
		ref_pt = __cur.ref,
		ref_arr = ref_pt.ref,
		def_index = def_pts.indexOf( ref_pt ),
		La = Lyte.arrayUtils,
		wrapper_this = this.__wrapper.component,
		prefix = this.data.ltPropIdPrefix,
		__id = __this.$node.id.replace( prefix, '' ),
		connectors = this.getMatchedConnectors( __id, __index ),
		total = connectors.start.length + connectors.end.length;

		__count = __count || 0;

		if( total > __count || ref_arr.length > 1 ){
			return;
		}

		La( points, 'removeAt', __index );
		La( def_pts, 'removeAt', def_index );

		if( !wrapper_this.isUndo() ){
			wrapper_this.pushToQueue({
				type : "custom",
				sub_type : "remove_anchor",
				value : JSON.stringify({
					index : __index,
					main_index : def_index,
					pt : __cur,
					id : __id
				})
			})
		}
	},	

	getMatchedConnectors : function( id, index, target, targetIndex ){
         var ret = this.getConnections( id ),
         start = [],
         end = [],
         undef = void 0;

         ret.forEach( function( item ){
            var __start = item.start,
            __end = item.end;

            if( __start.id == id ){
               if( ( index == undef || __start.index == index ) && ( target == undef || target == __end.id ) && ( targetIndex == undef || __end.index == targetIndex ) ){
                  start.push( item );
               }
            } else {
               if( ( index == undef || __end.index == index ) && ( target == undef || target == __start.id ) && ( targetIndex == undef || __start.index == targetIndex ) ){
                  end.push( item );
               }
            }
         })
         return { 
         	start : start, 
         	end : end 
         };
     },

     get_index : function( node, pos ){
     	var __data = node.component.data,
     	fake_pts = __data.fake_pts,
     	points = __data.points,
     	index;

     	( fake_pts.length ? fake_pts : points ).every( function( item, __index ){
     		if( item.left == pos.x && item.top == pos.y ){
     			index = __index;
     			return false;
     		}	
     		return true;
     	});

     	return index;
     },

     getConnections : function( arg, connector_id ){
     	var connections = $L( '.lyteConnectionContainer', this.$node ),
     	len = connections.length,
     	matched = [],
     	__this = this.__wrapper.component,
     	__data = __this.data.textBoxArray,
     	to_break,
     	replace = this.data.ltPropIdPrefix;

     	for( var i = 0; i < len; i++ ){
     		var cur = connections.eq( i ),
     		data = cur.data(),
     		src = data.active_src,
     		src_id = src.id.replace( replace, '' ),
     		target = data.active_target,
     		target_id = target.id.replace( replace, '' ),
     		src_position = data.src_position,
     		target_position = data.target_position,
     		text_box = data.text_box,
     		__id = cur.attr( 'id' );

     		if( connector_id ){
     			if( connector_id != __id ){
     				continue;
     			} 
     			to_break = true;
     		}

     		if( typeof arg == 'string' ){
     			if( arg != src_id && arg != target_id ){
     				continue;
     			}
     		} else if( arg ) {
     			var __src = arg.start,
     			__target = arg.end;

     			if( ( __src && src_id != __src ) || ( __target && __target != target_id ) ){
     				continue;
     			}
     		}

     		var start_index = this.get_index( src, src_position ),
     		end_index = this.get_index( target, target_position );

     		if( arg ){
     			var s_index = arg.startIndex,
     			e_index = arg.endIndex;

     			if( ( s_index != void 0 && s_index != start_index ) || ( e_index != void 0 && e_index != end_index_index ) ){
     				continue;
     			}
     		}

     		matched.push({
     			id : __id,
     			start : {
     				id : src_id,
     				index : start_index
     			},
     			end : {
     				id : target_id,
     				index : end_index
     			},
     			textBody : __data[ Number( $L( text_box ).attr( 'index' ) ) ]
     		});

     		if( to_break ){
     			break;
     		}
     	}

     	return matched;
     },

    getLoops : function( id ){
      var connectors = this.getConnections( id ),
      final = [];

      if( connectors.length < 1 ){
         return [];
      }

      var __length = connectors.length;

      for( var i = 0; i < __length; i++ ){
         var current = connectors[ i ];
         for( var j = i + 1; j < __length; j++ ){
            var next = connectors[ j ];
            if( current.start.id == next.end.id && current.end.id == next.start.id ){
               final.push( next );
               connectors.splice( j, 1 );
               j--;
               __length--;
            }
         }
      }
      return final;
   },

   getUnreachableNodes : function( id ){
      var shapes = this.getShapes(),
      final = [];
      for( var i = 0; i < shapes.length; i++ ){

        var __cur = shapes[ i ];

         if( __cur.id == id ){
            continue;
         }
         var current = __cur.connectors;
         if( current ){
            var allow = false, 
            start = current.start,
            end = current.end;

            for( var j = 0; j < start.length; j++ ){
               allow = start[ j ].end.id == id;
               if( allow ){
                  break;
               }
            }
            if( !allow ){
               for( var j = 0; j < end.length; j++ ){
                   allow = end[ j ].start.id == id;
                  if( allow ){
                     break;
                  }
               }
            }
            if( !allow ){
               final.push( __cur );
            }
         }
      }
      return final;
   },

   isIsolated :function( id ){
      return !this.getConnections( id ).length;
   },

   getIsolatedNodes : function(){
      var shapes = this.getShapes(),
      final = [],
      __length = shapes.length;

      for( var i = 0; i < __length; i++ ){
         var current = shapes[ i ],
         __connectors = current.connectors;

         if( __connectors && !__connectors.start.length && !__connectors.end.length ){
             final.push( current );
         }
      }
      return final;
   },

   getNodesInSeries : function( id, option ){
      var shapes = ( function( shapes ){
         var obj = {};

         shapes.forEach( function( item ){
          	obj[ item.id ] = item;
         });

         return obj;
      } )( this.getShapes() ),
      arr = [];

      option = option || { start : true, end : true };

      if( option == 'fromcode' ){
         option = { start : true, end : true };
         arr._shapes = shapes;
      } 

      this.nodesInSeries( id, shapes, option, arr );

      arr.splice( arr.indexOf( id ), 1 );

      return arr;
   },

   nodesInSeries : function( id, shapes, option, arr ){
      var obj = shapes[ id ].connectors || {},
      other = {
        start : "end",
        end : "start"
      },
      __this = this;

      [ 'start', 'end' ].forEach( function( opt ){
          if( option[ opt ] ){
              obj[ opt ].forEach( function( item ){
	                var new_id = item[ other[ opt ] ].id,
	                index = arr.indexOf( new_id );
	                if( index == -1 ){
	                  arr.push( new_id );
	                  __this.nodesInSeries( new_id, shapes, option, arr );
	                }
              });
          }
      });

      return arr;
   },

   getNodesNotInSeries : function( id ){
      var arr = this.getNodesInSeries( id, 'fromcode' ),
      to_return = [],
      shapes = arr._shapes;

      for( var key in shapes ){
          var index = arr.indexOf(  key );
          if( index == -1 && key != id ){
             to_return.push( key );
          }
      }
      return to_return;
   },

   getShapes : function( __id ){
   		var arr = this.data.ltPropData,
   		__this = this.__wrapper.component,
   		__arr = [];

   		arr.forEach( function( item ){
   			var id = item.id;

   			if( __id && id != __id ){
   				return;
   			}

   			__arr.push( $L.extend( true, { connectors : this.getMatchedConnectors( id ) }, item ) );
   		}.bind( this ) );

   		return __arr;
   },

   getAll : function( arg1, arg2 ){
   		return{
   			shapes : this.getShapes( arg1 ),
   			connectors:  this.getConnections( arg2 )
   		};
   },

   getConnectorById : function( id ){
   		return id;
   },

   getConnectorByConnectorId : function( id, is_dom ){
   		if( is_dom ){
   			return $L( '#' + id, this.$node ).get( 0 );
   		}
   		return this.getConnections( void 0, id );
   },

   getConnectorText : function( __id ){
   		var tbody = this.$node.getConnectorTextbody( __id ),
   		data = this.__wrapper.component.data.textBoxArray;

   		return data[ Number( $L( tbody ).attr( 'index' ) ) ].text;
   },

   getConnectorData : function( __id ){
   	  return this.getConnections( void 0, __id );	
   }
});

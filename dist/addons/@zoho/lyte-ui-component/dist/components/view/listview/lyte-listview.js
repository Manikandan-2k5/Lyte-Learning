Lyte.Component.register("lyte-listview", {
_template:"<template tag-name=\"lyte-listview\"> <div class=\"lyteListviewWrapper\"> <lyte-table lt-prop=\"{{stringify(ltPropTable)}}\" lt-prop-yield=\"true\" lt-prop-content=\"{{ltPropContent}}\" lt-prop-header=\"{{headerData}}\" lt-prop-data=\"{{ltPropData}}\" lt-prop-width=\"{{overallWidth}}\" on-fix=\"{{method('fix')}}\" on-un-fix=\"{{method('unfix')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{ltPropSubHeaders}}\"><template case=\"true\"> <div class=\"lyteListFakeHeader\" style=\"width:{{overallWidth}}\"> <template is=\"for\" items=\"{{fakeHeaderData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListFakeCell {{if(item.data.pinned,'lyteListFixed','')}}\" index=\"{{index}}\" style=\"{{listStyle(item)}}\" data-name=\"fakeHeaderData\"> <template is=\"if\" value=\"{{item.hasChildren}}\"><template case=\"true\"><template is=\"if\" value=\"{{item.render}}\"><template case=\"true\"> <lyte-yield yield-name=\"topHeader\" cell-data=\"{{item.data}}\"></lyte-yield> <template is=\"if\" value=\"{{checkListResize(item.data)}}\"><template case=\"true\"> <div class=\"lyteListResizeHandler\" ontouchstart=\"{{action('resize',event)}}\" __mousedown=\"{{action('resize',event)}}\"></div> </template></template></template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{item.data.resizable}}\"><template case=\"true\"> <div class=\"lyteListResizeHandler\" ontouchstart=\"{{action('resize',event)}}\" __mousedown=\"{{action('resize',event)}}\"></div> </template></template></template></template> </div> </template> </div> </template></template> <lyte-table-structure> <lyte-thead> <lyte-tr> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"index\"><template is=\"if\" value=\"{{cell.columns}}\"><template case=\"true\"><template is=\"for\" items=\"{{cell.columns}}\" item=\"inner\" index=\"inner_index\"> <lyte-th id=\"{{inner.data.id}}\" class=\"{{inner.data.class}}\" index=\"{{index}}\" inner_index=\"{{inner_index}}\" data-name=\"headerData\" fixed=\"{{if(inner.data.pinned,'enable','')}}\" style=\"{{listStyle(inner.data)}}\" sticky-position=\"{{item.data.pinnedPosition}}\"> <template is=\"if\" value=\"{{inner.render}}\"><template case=\"true\"> <lyte-yield yield-name=\"header\" cell-data=\"{{inner.data}}\"></lyte-yield> <template is=\"if\" value=\"{{inner.data.resizable}}\"><template case=\"true\"> <div class=\"lyteListResizeHandler\" ontouchstart=\"{{action('resize',event)}}\" __mousedown=\"{{action('resize',event)}}\"></div> </template></template></template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template> </lyte-th> </template></template><template case=\"false\"> <lyte-th id=\"{{cell.data.id}}\" class=\"{{cell.data.class}}\" index=\"{{index}}\" data-name=\"headerData\" fixed=\"{{if(cell.data.pinned,'enable','')}}\" style=\"{{listStyle(cell.data)}}\" sticky-position=\"{{item.data.pinnedPosition}}\"> <template is=\"if\" value=\"{{cell.render}}\"><template case=\"true\"><template is=\"if\" value=\"{{cell.data.hasCheckbox}}\"><template case=\"true\"> <lyte-checkbox lt-prop-checked=\"{{lbind(checkAll)}}\" on-checked=\"{{method('onHeaderCheck')}}\" on-unchecked=\"{{method('onHeaderUnCheck')}}\"></lyte-checkbox> </template></template> <lyte-yield yield-name=\"header\" cell-data=\"{{cell.data}}\"></lyte-yield> <template is=\"if\" value=\"{{cell.data.resizable}}\"><template case=\"true\"> <div class=\"lyteListResizeHandler\" ontouchstart=\"{{action('resize',event)}}\" __mousedown=\"{{action('resize',event)}}\"></div> </template></template></template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template> </lyte-th> </template></template></template> </lyte-tr> </lyte-thead> <lyte-tbody> <template is=\"if\" value=\"{{ltPropTable.infiniteScroll}}\"><template case=\"true\"><template is=\"if\" value=\"{{renderTable}}\"><template case=\"true\"><template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"rowindex\"> <lyte-tr index=\"{{rowindex}}\" row-index=\"{{item.index}}\" class=\"{{item.body.class}}\"> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"index\"><template is=\"if\" value=\"{{cell.columns}}\"><template case=\"true\"><template is=\"for\" items=\"{{cell.columns}}\" item=\"inn_item\" index=\"inn_index\"> <lyte-td class=\"{{inn_item.data.class}}\" index=\"{{index}}\" data-name=\"ltPropContent\" row-index=\"{{item.index}}\" inner_index=\"{{inn_index}}\"> <template is=\"if\" value=\"{{renderingBoolean[item.index][index][inn_index]}}\"><template case=\"true\"> <lyte-yield yield-name=\"{{expHandlers(inn_item.data.id,'||',cell.data.yield)}}\" row-data=\"{{item.body}}\" cell-data=\"{{inn_item.data}}\" cell-id=\"{{inn_item.data.id}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template> </lyte-td> </template></template><template case=\"false\"> <lyte-td class=\"{{cell.data.class}}\" index=\"{{index}}\" data-name=\"ltPropContent\" row-index=\"{{item.index}}\"> <template is=\"if\" value=\"{{renderingBoolean[item.index][index]}}\"><template case=\"true\"><template is=\"if\" value=\"{{cell.data.hasCheckbox}}\"><template case=\"true\"> <lyte-checkbox on-checked=\"{{method('onCheck')}}\" on-unchecked=\"{{method('onUnCheck')}}\" lt-prop-checked=\"{{lbind(item.body.checked)}}\"></lyte-checkbox> </template></template> <lyte-yield yield-name=\"{{expHandlers(cell.data.id,'||',cell.data.yield)}}\" row-data=\"{{item.body}}\" cell-data=\"{{cell.data}}\" cell-id=\"{{cell.data.id}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template> </lyte-td> </template></template></template> </lyte-tr> </template></template></template></template><template case=\"false\"><template is=\"for\" items=\"{{ltPropContent}}\" item=\"item\" index=\"rowindex\"> <lyte-tr index=\"{{rowindex}}\" class=\"{{item.data.class}}\"> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"index\"><template is=\"if\" value=\"{{cell.columns}}\"><template case=\"true\"><template is=\"for\" items=\"{{cell.columns}}\" item=\"inn_cell\" index=\"inn_index\"> <lyte-td class=\"{{inn_cell.data.class}}\" index=\"{{index}}\" data-name=\"ltPropContent\" row-index=\"{{rowindex}}\" inner_index=\"{{inn_index}}\"> <template is=\"if\" value=\"{{renderingBoolean[rowindex][index][inn_index]}}\"><template case=\"true\"> <lyte-yield yield-name=\"{{expHandlers(inn_item.data.id,'||',cell.data.yield)}}\" row-data=\"{{item.body}}\" cell-data=\"{{inn_item.data}}\" cell-id=\"{{inn_item.data.id}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template> </lyte-td> </template></template><template case=\"false\"> <lyte-td class=\"{{cell.data.class}}\" index=\"{{index}}\" data-name=\"ltPropContent\" row-index=\"{{rowindex}}\"> <template is=\"if\" value=\"{{renderingBoolean[rowindex][index]}}\"><template case=\"true\"> <lyte-yield yield-name=\"{{expHandlers(cell.data.id,'||',cell.data.yield)}}\" row-data=\"{{item}}\" cell-data=\"{{cell.data}}\" cell-id=\"{{cell.data.id}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListviewIntersection\"></div> </template></template> </lyte-td> </template></template></template> </lyte-tr> </template></template></template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> <template is=\"if\" value=\"{{ltPropPagination}}\"><template case=\"true\"> <div class=\"lyteListPagination\"> <div class=\"\">{{listDisplay(ltPropDisplayMessage,ltPropContent.length,startRecord,endRecord)}}</div> <div class=\"lyteListPages\"> <span>Pages:</span> <span class=\"lyteListMaxPages\">{{pageLimit}}</span> </div> <div class=\"lyteListPaginationArrow\"> <span class=\"lyteListFirst {{if(disableLeft,'lyteListDisabled','')}}\" __click=\"{{action('first')}}\">F</span> <span class=\"lyteListPrevious {{if(disableLeft,'lyteListDisabled','')}}\" __click=\"{{action('prev')}}\">P</span> <span class=\"lyteListCurrentPage\"> <lyte-number lt-prop-value=\"{{lbind(currentPage)}}\" lt-prop-max=\"{{pageLimit}}\" lt-prop-min=\"1\"></lyte-number> </span> <span class=\"lyteListNext {{if(disableRight,'lyteListDisabled','')}}\" __click=\"{{action('next')}}\">N</span> <span class=\"lyteListLast {{if(disableRight,'lyteListDisabled','')}}\" __click=\"{{action('last')}}\">L</span> </div> </div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","overallWidth"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"listStyle","args":["item"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[3,1,1,1]},{"type":"for","position":[3,1,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"listStyle","args":["inner.data"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"listStyle","args":["cell.data"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"insertYield","position":[2]},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[3,1,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"insertYield","position":[2]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,3,0]},{"type":"attr","position":[1,5,1]},{"type":"attr","position":[1,5,3]},{"type":"attr","position":[1,5,5,1]},{"type":"componentDynamic","position":[1,5,5,1]},{"type":"attr","position":[1,5,7]},{"type":"attr","position":[1,5,9]}]}},"default":{}}],
_observedAttributes :["ltPropContent","ltPropHeader","ltPropColumnLazyLoading","ltPropTable","ltPropData","ltPropSelected","ltPropSubHeaders","ltPropPagination","ltPropDisplayMessage","ltPropPerpage","fakeHeaderData","overallWidth","headerData","renderingBoolean","checkAll","pageLimit","currentPage","startRecord","endRecord","disableLeft","disableRight","renderTable"],


	modify_content : function( arr, ignore ){
		var final = [],
		obj,
		__data = this.data,
		__fake_data = __data.fakeHeaderData,
		fake_enabled = __data.ltPropSubHeaders,
		overall = 0;

		arr.forEach( function( item ){
			final.push( obj = {} );
			obj.data = item;

			var __column = item.columns;

			if( __column ){
				obj.columns = this.modify_content( __column, true );

				var sum = 0,
				min_sum = 0;

				if( !ignore ){
					__column.forEach( function( __item ){
						var __minWidth = __item.minWidth,
						__width = Math.max( __item.width, __minWidth );

						sum += __width;
						min_sum += __minWidth;
					});

					if( fake_enabled ){
						__fake_data.push( {
							width : sum,
							minWidth : min_sum,
							data : item,
							hasChildren : true
						});
					}
					overall += sum;
				}
			} else if( !ignore ){
				var __minWidth = item.minWidth,
				__width = Math.max( item.width, __minWidth );

				overall += __width;

				if( fake_enabled ){
					__fake_data.push({
						width : __width,
						minWidth : __minWidth,
						data : item
					});
				}
			}

		}.bind( this ));

		if( !ignore ){
			this.setData( 'overallWidth', overall + 'px' );
		}

		return final;
	},

	init : function( ignore_header ){
		var __data = this.data,
		fn = this.modify_content.bind( this );

		if( __data.ltPropPagination ){
			var perpage = __data.ltPropPerpage,
			content = __data.ltPropContent.length;
			__data.pageLimit = Math.ceil( content / perpage );
		} else {
			__data.renderContent = __data.ltPropContent;
		}

		if( !ignore_header ){
			var new_header = fn( __data.ltPropHeader );

			this.reset_content_boolean();
			this.setData( 'headerData', new_header );
		}

		this.currentPage();
	},

	reset_content_boolean : function(){
		var __data = this.data,
		headerData = __data.ltPropHeader,
		final = [];

		__data.ltPropContent.forEach( function(){
			var row_data = [];
			headerData.forEach( function( item ){
				var columns = item.columns;
				if( columns ){
					var __inn = [];

					columns.forEach( function(){
						__inn.push( false );
					});

					row_data.push( __inn );
				} else {
					row_data.push( false );
				}
			});
			final.push( row_data );

		});

		this.setData( 'renderingBoolean', final );
	},

	reset : function( index ){
		var __data = this.data,
		renderingBoolean = __data.renderingBoolean,
		row_data = [];

		__data.headerData.forEach( function( item ){
			var columns = item.columns;
			if( columns ){
				var __inn = [];

				columns.forEach( function(){
					__inn.push( false );
				});

				row_data.push( __inn );
			} else {
				row_data.push( false );
			}
		});

		Lyte.arrayUtils( renderingBoolean, 'replaceAt', index, [ row_data ] );
	},

	headerObs : function( arg ){
		this.init( true );
		this.destroy_ins();
		this.create_ins();
	}.observes( 'ltPropHeader' ),

	contentObs : function(){
		this.reset_content_boolean();
		this.destroy_ins();
		this.create_ins();
	}.observes( 'ltPropContent', 'ltPropContent.[]' ),

	data : function(){

		var __array = "array",
		__string = "string",
		__boolean = "boolean",
		__object = "object",
		__number = "number";

		return {
			ltPropContent : Lyte.attr( __array, { default : [] } ),
			ltPropHeader : Lyte.attr( __array, { default : [] } ),
			ltPropColumnLazyLoading : Lyte.attr( __boolean, { default : false } ),
			ltPropTable : Lyte.attr( __object, { default : { 
					infiniteScroll : true,
					preventScrollbar : false, 
					contentLength : 10,
					stickyTable : true
				}
			}),

			ltPropData : Lyte.attr( __array, { default : [] } ),
			ltPropSelected : Lyte.attr( __array, { default : [] } ),
			ltPropSubHeaders : Lyte.attr( __boolean, { default : false } ),
			ltPropPagination : Lyte.attr( __boolean, { default : false } ),

			ltPropDisplayMessage : Lyte.attr( __string, { default : "Showing {0} - {1} of {2}" } ),

			ltPropPerpage : Lyte.attr( __number, { default : 5 } ),

			fakeHeaderData : Lyte.attr( __array, { default : [] } ),
			overallWidth : Lyte.attr( __string, { default : "auto" } ),

			headerData : Lyte.attr( __array, { default : [] } ),
			renderingBoolean  : Lyte.attr( __array, { default : [] } ),

			checkAll : Lyte.attr( __boolean, { default : false } ),
			pageLimit : Lyte.attr( __number, { default : 1 } ),
			currentPage : Lyte.attr( __number, { default : 1 } ),
			startRecord : Lyte.attr( __number, { default : 0 } ),
			endRecord : Lyte.attr( __number, { default : 0 } ),

			disableLeft : Lyte.attr( __boolean, { default : true } ),
			disableRight : Lyte.attr( __boolean, { default : false } ),

			renderTable : Lyte.attr( __boolean, { default : true } )
		}		
	},

	fix_unfix : function( cell, __add ){
		var __index = parseInt( cell.getAttribute( 'index' ) ),
		__elem = this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ];

		__elem.children[ __index ].classList[ __add ]( 'lyteListFixed' );
	},

	methods : {
		fix : function( cell ){
			this.fix_unfix( cell, 'add' );
		},

		unfix : function( cell ){
			this.fix_unfix( cell, 'remove' );
		},

		onHeaderCheck : function( input, comp, evt ){
			if( this.__ignore ){
				return;
			}
			if( evt && evt.type ){
				var __data = this.data,
				content = __data.ltPropContent,
				selected = __data.ltPropSelected;

				content.forEach( function( item, index ){
					if( !item.checked ){
						Lyte.objectUtils( item, 'add', 'checked', true );

						var __index = selected.indexOf( index );
						if( __index == -1 ){
							Lyte.arrayUtils( selected, 'push', index );
						}
					}
				}.bind( this ));
			}
		},

		onHeaderUnCheck : function( input, comp, evt ){
			if( this.__ignore ){
				return;
			}
			if( evt && evt.type ){
				var __data = this.data,
				content = __data.ltPropContent,
				selected = __data.ltPropSelected;

				content.forEach( function( item, index ){
					if( item.checked ){
						Lyte.objectUtils( item, 'add', 'checked', false );
						
						var __index = selected.indexOf( index );
						if( __index + 1 ){
							Lyte.arrayUtils( selected, 'removeAt', __index );
						}
					}
				}.bind( this ));
			}
		},

		onCheck :  function( input, comp, evt ){
			var node = comp.$node,
			__data = this.data,
			selected = __data.ltPropSelected,
			cell = node.closest( 'lyte-td' ),
			rowIndex = parseFloat( cell.getAttribute( "row-index" ) ) + __data.startRecord - 1;

			if( selected.indexOf( rowIndex ) == -1 ){
				Lyte.arrayUtils( selected, 'push', rowIndex );
			}

			if( selected.length == __data.ltPropContent.length ){
				this.__ignore = true;
				this.setData( 'checkAll', true );
				delete this.__ignore;
			}
		},

		onUnCheck : function( input, comp, evt ){
			var node = comp.$node,
			__data = this.data,
			selected = __data.ltPropSelected,
			cell = node.closest( 'lyte-td' ),
			rowIndex = parseFloat( cell.getAttribute( "row-index" ) ) + __data.startRecord - 1,
			__index = selected.indexOf( rowIndex );

			( __index + 1 ) && Lyte.arrayUtils( selected, 'removeAt', __index );

			var cell_index = parseFloat( cell.getAttribute( 'index' ) );
			this.__ignore = true;
			this.setData( 'checkAll', false );
			delete this.__ignore;
		}	
	},

	resize_move : function( evt ){
		this.__moved = true;

		var clientX = evt.clientX,
		cell = this.__cell,
		xInc = clientX - this.__clientX,
		__index = parseInt( cell.getAttribute( 'index' ) ),
		fake_cell,
		list,
		fake_data = this.data.fakeHeaderData[ __index ],
		cells = Array.from( this.$node.getElementsByTagName( 'lyte-th' ) ).filter( function( item ){
			return parseInt( item.getAttribute( 'index' ) ) == __index;
		}),
		call_raf,
		__bcr = this.$node.getBoundingClientRect(),
		is_rtl = _lyteUiUtils.getRTL(),
		scroll_elem = this.$node.getElementsByClassName( 'lyteTableScroll' )[ 0 ],
		table = scroll_elem.parentNode.component;

		if( cell.classList.contains( 'lyteListFakeCell' ) ){
			fake_cell = cell;
			if( fake_data.hasChildren ){
				list = cells;
			} else {
				cell = cells[ 0 ];
			}
		} else {
			fake_cell = this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ].children[ __index ];
		}

		if( xInc > 0 && Math.abs( clientX - ( __bcr[ is_rtl ? 'left' : 'right' ] - ( table._rightFixedWidth || 0 ) ) ) <= 1 ){
			call_raf = 1;
		} else if( xInc < 0 && Math.abs( clientX - ( __bcr[ is_rtl ? 'right' : 'left' ] + ( table._fixedWidth || 0 ) ) ) <= 1 ){
			call_raf = -1;
		}

		var fn = function( __cell ){
			var __style = __cell.style,
			__minWidth = parseFloat( __style.minWidth ),
			__maxWidth = parseFloat( __style.maxWidth ),
			__width = parseFloat( __style.width ),
			__newWidth = __width + xInc;

			if( __newWidth > __maxWidth ){
				xInc = __width - __maxWidth;
				__newWidth = __maxWidth;
			}

			if( __newWidth < __minWidth ){
				xInc =  __minWidth - __width;
				__newWidth = __minWidth;
			}

			return __newWidth;
		},
		raf = window.requestAnimationFrame,
		sL = scroll_elem ? scroll_elem.scrollLeft : 0;

		if( list ){
			cells.forEach( fn );

			var new_inc = xInc / cells.length;

			cells.forEach( function( item ){
				var __style = item.style;
				__style.width = ( parseFloat( __style.width ) + new_inc ) + 'px';
			});
		} else {
			cell.style.width = fn( cell ) + 'px';
		}

		fake_cell.style.width = ( parseFloat( fake_cell.style.width ) + xInc ) + 'px';
		this.setData( 'overallWidth', parseFloat( this.data.overallWidth ) + xInc + 'px' );

		window.cancelAnimationFrame( this._raf );

		if( call_raf ){
			scroll_elem.scrollLeft = sL + 10 * call_raf;
			this._raf = raf( this.resize_move.bind( this, { clientX : clientX } ) );

			clientX -= ( 10 * call_raf );
		}

		this.__clientX = clientX;
	},

	resize_up : function( evt ){
		var doc = document,
		__remove = "removeEventListener",
		isTch = evt.type == "touchend";

		doc[ __remove ]( isTch ? 'touchmove' : 'mousemove', this.__move, true );
		doc[ __remove ]( isTch ? 'touchend' : 'mouseup', this.__up, true );

		if( this.__moved ){
			var cb = "onResizeEnd";
			this.getMethods( cb ) && this.executeMethod( cb, evt, this.__cell );

			window.cancelAnimationFrame( this._raf );
			delete this._raf;
			delete this.__moved;
		}

		delete this.__clientY;
		delete this.__cell;
		delete this.__move;
		delete this.__up;
	},

	currentObs : function( arg ){
		this.currentPage();
	}.observes( 'currentPage' ),

	currentPage : function(){
		var __data = this.data,
		__new = __data.currentPage,
		left = false,
		right = false,
		perpage = __data.ltPropPerpage,
		finishedCount = ( __new - 1 ) * perpage,
		table = this.$node.getElementsByTagName( 'lyte-table' )[ 0 ];

		if( __new == 1 ){
			left = true;
		} else if( __new == __data.pageLimit ) {
			right = true;
		}

		table && table.scrollTable( 0, 0 );

		this.setData({
			disableLeft : left,
			disableRight : right,
			startRecord : finishedCount + 1,
			endRecord : Math.min( finishedCount + perpage, __data.ltPropContent.length )
		});
	},

	actions : {

		first : function(){
			this.setData( 'currentPage', 1 );
		},

		last : function(){
			this.setData( 'currentPage', this.data.pageLimit );
		},

		prev : function(){
			this.setData( 'currentPage', this.data.currentPage - 1 );
		},

		next : function(){
			this.setData( 'currentPage', this.data.currentPage + 1 );
		},

		resize : function( evt ){
			var target = evt.target,
			doc = document,
			__add = "addEventListener",
			isTch = evt.type == "touchstart",
			cb = "onResizeSelect";

			if( this.getMethods( cb ) && this.executeMethod( cb, evt, this.__cell ) == false ){
				return;
			}

			this.__clientX = evt.clientX;
			this.__clientY = evt.clientY;

			this.__cell = target.closest( 'lyte-th,.lyteListFakeCell' );

			doc[ __add ]( isTch ? 'touchmove' : 'mousemove', this.__move = this.resize_move.bind( this ), true );
			doc[ __add ]( isTch ? 'touchend' : 'mouseup', this.__up = this.resize_up.bind( this ), true );

			evt.preventDefault();
		},

		rowUpdate : function( index ){
			var tbody = this.$node.getElementsByTagName( "lyte-tbody" )[ 0 ],
			tr = tbody.children[ index ],
			elems = tr.getElementsByClassName( 'lyteListviewIntersection' ),
			row_index = parseInt( tr.getAttribute( 'row-index' ) );
			
			this.reset( row_index );

			Array.from( elems ).forEach( this.addToIntersection.bind( this ) );
		},

		intersectionSet : function( cell, left, accumulatedWidth ){
			if( this.data.ltPropSubHeaders ){
				var __index = parseInt( cell.getAttribute( 'index' ) ),
				__elem = this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ];
				__elem.children[ __index ].style[ left ] = accumulatedWidth + 'px';
			}
		}
	},

	renderNode : function( elem ){
		var cell = elem.parentNode;

		if( !cell ){
			return;
		}

		var index = parseInt( cell.getAttribute( "index" ) ),
		row_index = parseInt( cell.getAttribute( "row-index" ) ),
		data_name = cell.getAttribute( 'data-name' ),
		inner_index = parseInt( cell.getAttribute( "inner_index" ) ),
		__data = this.data;

		switch( data_name ){
			case 'headerData' : 
			case 'fakeHeaderData' :{
				var __cell = __data[ data_name ][ index ];

				if( !isNaN( inner_index ) ){
					__cell = __cell.columns[ inner_index ];
				}

				Lyte.objectUtils( __cell, 'add', 'render', true );
			}
			break;
			case "ltPropContent" : { 
				var __cell = __data.renderingBoolean[ row_index ];

				if( !isNaN( inner_index ) ){
					__cell = __cell[ index ];
					index = inner_index;
				}

				Lyte.arrayUtils( __cell, 'replaceAt', index, true );
			}
			break;
		}
	}
}, { mixins : [ 'lyte-listview-utils' ] } );

Lyte.Component.registerHelper( 'listStyle', function( __data ){
	var str = '',
	__width = __data.width,
	__minWidth = __data.minWidth;

	if( __width != void 0 ){
		if( __width < __minWidth ){
			__width = __minWidth;
		}
		str += ( "width:" + __width + 'px;' );
	}

	if( __minWidth != void 0 ){
		str += ( "min-width:" + __minWidth + 'px;' );
	}

	if( __data.maxWidth != void 0 ){
		str += ( "max-width:" + __data.maxWidth + 'px;' );
	}

	return str;
});

Lyte.Component.registerHelper( 'checkListResize', function( __data ){
	var ret = false;

	__data.columns.every( function( item ){
		return !( ret = !!item.resizable );
	});

	return ret;
});

Lyte.Component.registerHelper( 'listDisplay', function( msg, total, start, end ){
	return msg.replace( '{0}', start ).replace( '{1}', end ).replace( '{2}', total );
});
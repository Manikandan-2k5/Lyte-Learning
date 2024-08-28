Lyte.Component.register("lyte-edit-element", {
_template:"<template tag-name=\"lyte-edit-element\" __focusout=\"{{action('editBlur',event)}}\"> <div class=\"lyteEditElementWrapper\" style=\"{{styleValue}}\"> <template is=\"if\" value=\"{{ltPropEditYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"edit\" lt-prop-cell-data=\"{{ltPropCellData}}\" lt-prop-row-data=\"{{ltPropRowData}}\" style=\"display: block;\"></lyte-yield> </template><template case=\"false\"> <template is=\"switch\" value=\"{{ltPropCellData.dataType}}\"> <template case=\"text\"> <lyte-input lt-prop-appearance=\"box\" lt-prop-update-delay=\"\" class=\"lyteTextEditElement lyteListviewEditElement\" lt-prop-value=\"{{lbind(ltPropValue)}}\"></lyte-input> </template> <template case=\"number\"> <lyte-number lt-prop-appearance=\"box\" lt-prop-update-delay=\"\" class=\"lyteNumberEditElement lyteListviewEditElement\" lt-prop-value=\"{{lbind(ltPropValue)}}\"></lyte-number> </template> <template case=\"date\"> <lyte-datetime-input lt-prop-appearance=\"box\" class=\"lyteDateEditElement lyteListviewEditElement\" lt-prop-dropdown=\"true\" lt-prop-value=\"{{lbind(ltPropValue)}}\"> </lyte-datetime-input> </template> <template case=\"boolean\"> <lyte-dropdown class=\"lyteBooleanEditElement lyteListviewEditElement\" lt-prop-selected=\"{{lbind(ltPropValue)}}\" lt-prop-is-open=\"{{lbind(isOpen)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteEditElementDropdown\"> <lyte-drop-body> <lyte-drop-item data-value=\"true\">True</lyte-drop-item> <lyte-drop-item data-value=\"false\">False</lyte-drop-item> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template> <template case=\"multiselect\"> <lyte-dropdown class=\"lyteMultiselectEditElement lyteListviewEditElement\" lt-prop-selected=\"{{lbind(ltPropValue)}}\" lt-prop-is-open=\"{{lbind(isOpen)}}\" on-option-selected=\"{{method('dropSelected')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <span class=\"lyteMarginRight lyteDropdownLabel\">{{displayValue}}</span> </lyte-drop-button> <lyte-drop-box class=\"lyteEditElementDropdown\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.length,'>',8)}}\"><template case=\"true\"> <lyte-drop-head> <lyte-search lt-prop-placeholder=\"Search here...\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.lyteEditElementDropdown:not(.lyteDropdownHidden)&quot;,&quot;search&quot; : &quot;lyte-drop-item&quot;}\" on-search=\"{{method('search')}}\"></lyte-search> </lyte-drop-head> </template></template> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-label=\"{{item.label}}\" data-value=\"{{item.value}}\"> <lyte-drop-label>{{item.label}}</lyte-drop-label> <template is=\"if\" value=\"{{item.email}}\"><template case=\"true\"> <lyte-drop-email>{{item.email}}</lyte-drop-email> </template></template> </lyte-drop-item> </template> </lyte-drop-body> <lyte-drop-footer class=\"{{noResult}}\">{{ltPropNoResult}}</lyte-drop-footer> </lyte-drop-box> </template> </lyte-dropdown> </template> <template case=\"tags\"> <lyte-number lt-prop-appearance=\"box\" class=\"lyteNumberEditElement lyteListviewEditElement\" value=\"{{lbind(ltPropValue)}}\"></lyte-number> </template> <template case=\"custom\"> <lyte-yield yield-name=\"lyte-custom-edit-yield\" lt-prop-cell-data=\"{{ltPropCellData}}\" lt-prop-row-data=\"{{ltPropRowData}}\" lt-prop-value=\"{{lbind(ltPropValue)}}\"></lyte-yield> </template> </template> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"styleValue"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"text":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"number":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"date":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"boolean":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"multiselect":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"text","position":[3,5,0]},{"type":"componentDynamic","position":[3,5]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]},"tags":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"custom":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropCellData","ltPropRowData","ltPropFormat","ltPropEditYield","ltPropEditMode","ltPropCellIndex","ltPropRowIndex","ltPropValue","ltPropOptions","ltPropNoResult","isOpen","styleValue","displayValue","noResult"],

	data : function(){

		var __string = "string",
		__boolean = "boolean",
		__object = "object",
		__number = "number";

		return {
			ltPropCellData : Lyte.attr( __object, { default : {} } ),
			ltPropRowData : Lyte.attr( __object, { default : {} } ),
			ltPropFormat : Lyte.attr( __string, { default : "MM-DD-YYYY" } ),

			ltPropEditYield : Lyte.attr( __boolean, { default : false } ),
			ltPropEditMode : Lyte.attr( __boolean, { default : false } ),

			ltPropCellIndex : Lyte.attr( __number ),
			ltPropRowIndex : Lyte.attr( __number ),

			ltPropValue : Lyte.attr( __string, { default : "" } ),
			ltPropOptions : Lyte.attr( __array, { default : [] } ),

			ltPropNoResult : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),

			isOpen : Lyte.attr( __boolean, { default : false } ),

			styleValue:  Lyte.attr( __string, { default : "display:none" } ),
			displayValue : Lyte.attr( __string, { default : "" } ),
			noResult : Lyte.attr( __string, { default : "lyteSearchHidden" } )
		}		
	},

	cell_obs : function(){
		clearTimeout( this.__datachange );

		this.__datachange = setTimeout( function(){
			var __data = this.data,
			cellData = __data.ltPropCellData || {},
			rowData = __data.ltPropRowData || {},
			cb = "onValueConstruct",
			newValue = rowData[ cellData.prop ];

			if( this.getMethods( cb ) ){
				newValue = this.executeMethod( cb ) || newValue;
			}

			this.setData({
				isOpen : false,
				ltPropValue : newValue
			});
		}.bind( this ), 0 );	

	}.observes( 'ltPropCellData', 'ltPropRowData' ).on( 'init' ),

	edit_obs : function( arg ){
		var final = "display:none";

		if( arg.newValue ){
			var __data = this.data,
			cellData = ( __data.ltPropCellData || {} );

			this.setData( arg.item, ( __data.ltPropRowData || {} )[ cellData.prop ] || "" )

			if( cellData.dataType == "multiselect" ){
				var cb = "onPicklistConstruct",
				fn = function( arr ){
					this.setData( 'ltPropOptions', arr );

					if( arr.length == 0 ){
						this.setData( 'noResult', '' );
					}

					switch( cellData.dataType ){
						case 'multiselect' : {
							var __filter = arr.filter( function( item ){
								return item.value == __data.ltPropValue;
							})[ 0 ];

							if( __filter ){
								this.setData( 'displayValue', __filter.label || '' );
							}
						}
						break;
					}
				}.bind( this );

				if( this.getMethods( cb ) ){
					var ret = this.executeMethod( cb, "", __data.ltPropCellData, __data.ltPropOptions );

					if( ret == false ){
						return fn( [] );
					} else if( ret ){
						if( ret.then ){
						  ret.then( fn );
						} else {
						  fn( ret );
						}
					}
				}
			}

			var __elem = this.$node.getElementsByClassName( 'lyteListviewEditElement' )[ 0 ];

			if( __elem ){
				window.requestAnimationFrame( function(){
					__elem.focus();
				});
			}

			final = "";
		} else {
			this.call_blur( {} );
		}

		this.setData( 'styleValue', final );

	}.observes( 'ltPropEditMode' ),

	didDestroy : function(){
		clearTimeout( this.__raf );
		clearTimeout( this.__timeout );
	},

	call_blur : function( evt ){
		var __this = this,
		$node = __this.$node,
		__data = __this.data;

		if( __data.isOpen || ( evt.type && !__data.ltPropEditMode ) ){
			return;
		}

		var cellData = __data.ltPropCellData,
		rowData = __data.ltPropRowData,
		cellIndex = __data.ltPropCellIndex,
		rowIndex = __data.ltPropRowIndex,
		__value = __data.ltPropValue,
		cb = "onBlur";

		__this.getMethods( cb ) && __this.executeMethod( cb, evt, __value, cellData, rowData, cellIndex, rowIndex, $node );
	},	

	actions : {
		editBlur : function( evt ){

			var r_target = evt.relatedTarget,
			doc = document;

			if( r_target && ( !this.$node.parentNode.contains( r_target ) || r_target == this.$node || this.$node.contains( r_target ) ) ){
				this.__timeout = setTimeout( function(){
					if( this.$node.contains( doc.activeElement ) ){
						return;
					}
					this.call_blur( evt );
				}.bind( this ), 500 );
			} else if( !this.$node.contains( doc.activeElement ) ) {
				this.call_blur( evt );
			}
		}
	},

	methods : {
		dropSelected : function(){
			this.setData( 'displayValue', arguments[ 3 ].getAttribute( 'data-label' ) );
		},

		search : function( arr ){
			this.setData( 'noResult', arr.length ? 'lyteSearchHidden' : "" );
		}
	}
});

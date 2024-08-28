Lyte.Component.register("lyte-text-filter", {
_template:"<template tag-name=\"lyte-text-filter\"> <lyte-dropdown lt-prop-selected=\"{{lbind(selected)}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteTextFilterDropdown\"> <template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{ &quot;scope&quot; : &quot;.lyteTextFilterDropdown:not(.lyteDropdownHidden)&quot;, &quot;search&quot; : &quot;lyte-drop-item&quot; }\" on-search=\"{{method('search')}}\"></lyte-search> </template></template> <lyte-drop-body> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <lyte-drop-item data-value=\"{{key}}\">{{value}}</lyte-drop-item> </template><template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <div class=\"{{if(noResult,'lyteTextFilterNoResult','lyteTextFilterNoResult lyteSearchHidden')}}\">{{ltPropNoMatch}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <div class=\"lyteTextFilterWrapper\"> <template is=\"if\" value=\"{{renderFirst}}\"><template case=\"true\"> <lyte-input lt-prop-appearance=\"box\" class=\"lyteTextFilterFirst\" lt-prop-input-wrapper-class=\"{{hideFirst}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-value=\"{{lbind(ltPropCondition.input)}}\" lt-prop-bind-to-body=\"false\"></lyte-input> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"forIn","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,2]},{"type":"if","position":[1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropCondition","ltPropPlaceholder","ltPropOptions","ltPropNoMatch","ltPropSearchCount","ltPropReset","selected","renderFirst","noResult","isSearch","hideFirst"],


	init : function(){
		var __data = this.data;
		__data.isSearch = Object.keys( __data.ltPropOptions ).length >= __data.ltPropSearchCount;

		this.setData( 'ltPropCondition', { input : "", isNeg : false, isValid : false, value : "", label : "", type : "text" } );
	},

	data : function(){
		var __string = "string",
		__array = "array",
		__object = "object",
		__boolean = "boolean",
		__number = 'number';

		return {
			ltPropCondition : Lyte.attr( __object ),
			ltPropPlaceholder : Lyte.attr( __string, { default : "None" } ),
			ltPropOptions : Lyte.attr( __object, { default : {
					set : _lyteUiUtils.i18n( 'set', 'listview.filter', "Set" ),
					not_set : _lyteUiUtils.i18n( 'not.set', 'listview.filter', "Not set" ),
					equal : _lyteUiUtils.i18n( "equal", "listview.filter", "Equal" ),
					not_equal : _lyteUiUtils.i18n( "not.equal", "listview.filter", "Not equal" ),
					begins_with : _lyteUiUtils.i18n( 'bigins', 'listview.filter', "Starts with" ),
					contains : _lyteUiUtils.i18n( "contains", 'listview.filter', "Contains" ),
					does_not_contains : _lyteUiUtils.i18n( "not.contains", "listview.filter", "Does not contains" )
				} 
			} ),

			ltPropNoMatch : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),

			ltPropSearchCount : Lyte.attr( __number, { default : 8 } ),

			ltPropReset : Lyte.attr( __boolean, { default : false } ),

			selected : Lyte.attr( __string, { default : "" } ),
			renderFirst : Lyte.attr( __boolean ),
			noResult : Lyte.attr( __boolean ),

			isSearch : Lyte.attr( __boolean ),
			hideFirst : Lyte.attr( __string, { default : "lyteSearchHidden" } )
		}		
	},

	reset_obs : function( arg ){
		if( arg.newValue ){
			this.setData( arg.item, false );
			this.setData( 'selected', "" );
		}
	}.observes( 'ltPropReset' ),

	condn_obs : function( arg ){
		this.setData( 'selected', arg.newValue.value || "" );
	}.observes( 'ltPropCondition' ),

	selected_obs : function( arg ){
		var selected = arg.newValue,
		renderFirst = true,
		isNeg = false,
		__data = this.data,
		hiddenclass = 'lyteSearchHidden',
		condition = __data.ltPropCondition,
		Lc = Lyte.objectUtils,
		ns = "lyteTextFilter_";

		$L( this.$node ).addClass( ns + selected ).removeClass( ns + arg.oldValue );

		switch( selected ){
			case 'set' : {
				renderFirst = false; 
			}
			break;
			case 'not_set' : {
				renderFirst = false;
				isNeg = true;
			}
			break;
			case 'does_not_contains' : 
			case 'not_equal' : {
				isNeg = true;
			}
			break;
			case '' : {
				renderFirst  = false;
			}
			break;
		}

		this.setData({
			renderFirst : __data.renderFirst || renderFirst,
			hideFirst : renderFirst ? '' : hiddenclass
		});

		Lc( condition, 'add', 'isNeg', isNeg );
		Lc( condition, 'add', 'input', '' );

		if( !renderFirst ){
			Lc( condition, 'add', 'isValid', !!selected );
		}

		Lc( condition, 'add', 'value', selected );
		Lc( condition, 'add', 'label', __data.ltPropOptions[ selected ] || "" );

	}.observes( 'selected' ),

	obs : function(){
		var __data = this.data,
		condition = __data.ltPropCondition,
		value = condition.input,
		isValid = true;

		if( !value && !__data.hideFirst ){
			isValid = false;
		} 

		Lyte.objectUtils( condition, 'add', 'isValid', isValid );

	}.observes( 'hideFirst', 'ltPropCondition.input' ),

	methods : {
		search : function( arg ){
			this.setData( 'noResult', arg.length == 0 );
		}
	}
});

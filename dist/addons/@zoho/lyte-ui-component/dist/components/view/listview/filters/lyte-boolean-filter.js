Lyte.Component.register("lyte-boolean-filter", {
_template:"<template tag-name=\"lyte-boolean-filter\"> <lyte-dropdown lt-prop-selected=\"{{lbind(selected)}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteBooleanFilterDropdown\"> <template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{ &quot;scope&quot; : &quot;.lyteBooleanFilterDropdown:not(.lyteDropdownHidden)&quot;, &quot;search&quot; : &quot;lyte-drop-item&quot; }\" on-search=\"{{method('search')}}\"></lyte-search> </template></template> <lyte-drop-body> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <lyte-drop-item data-value=\"{{key}}\">{{value}}</lyte-drop-item> </template><template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <div class=\"{{if(noResult,'lyteBooleanFilterNoResult','lyteBooleanFilterNoResult lyteSearchHidden')}}\">{{ltPropNoMatch}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"forIn","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,2]},{"type":"if","position":[1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropCondition","ltPropPlaceholder","ltPropOptions","ltPropNoMatch","ltPropSearchCount","ltPropReset","selected","noResult","isSearch"],

	init : function(){
		var __data = this.data;
		__data.isSearch = Object.keys( __data.ltPropOptions ).length >= __data.ltPropSearchCount;
		this.setData( 'ltPropCondition', { isValid : false, isNeg : false, value : "", label : "", type : "boolean" } );
	},

	condn_obs : function( arg ){
		this.setData( 'selected', arg.newValue.value || "" );
	}.observes( 'ltPropCondition' ),

	data : function(){
		var __string = "string",
		__array = "array",
		__object = "object",
		__boolean = "boolean",
		__number = 'number';

		return {
			ltPropCondition : Lyte.attr( __object ),
			ltPropPlaceholder : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'none', "listview.filter", "None" ) } ),
			ltPropOptions : Lyte.attr( __object, { default : {
					is : _lyteUiUtils.i18n( "selected", void 0, "Selected" ),
					is_not : _lyteUiUtils.i18n( "not.selected", "listview.filter", "Not selected" )
				} 
			} ),

			ltPropNoMatch : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),

			ltPropSearchCount : Lyte.attr( __number, { default : 8 } ),

			ltPropReset : Lyte.attr( __boolean, { default : false } ),

			selected : Lyte.attr( __string, { default : "" } ),
			noResult : Lyte.attr( __boolean ),

			isSearch : Lyte.attr( __boolean )
		}		
	},

	reset_obs : function( arg ){
		if( arg.newValue ){
			this.setData( arg.item, false );
			this.setData( 'selected', "" );
		}
	}.observes( 'ltPropReset' ),

	selected_obs : function( arg ){
		var selected = arg.newValue,
		__data = this.data,
		condition = __data.ltPropCondition,
		Lc = Lyte.objectUtils,
		ns = "lyteTextFilter_";

		$L( this.$node ).addClass( ns + selected ).removeClass( ns + arg.oldValue );

		Lc( condition, 'add', 'isNeg', selected == "is_not" );
		Lc( condition, 'add', 'isValid', !!selected );
		Lc( condition, 'add', 'value', selected );
		Lc( condition, 'add', 'label', __data.ltPropOptions[ selected ] || "" );

	}.observes( 'selected' ),

	methods : {
		search : function( arg ){
			this.setData( 'noResult', arg.length == 0 );
		}
	}
});

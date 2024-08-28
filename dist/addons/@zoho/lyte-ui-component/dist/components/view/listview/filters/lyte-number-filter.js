Lyte.Component.register("lyte-number-filter", {
_template:"<template tag-name=\"lyte-number-filter\"> <lyte-dropdown lt-prop-selected=\"{{lbind(selected)}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteNumberFilterDropdown\"> <template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{ &quot;scope&quot; : &quot;.lyteNumberFilterDropdown:not(.lyteDropdownHidden)&quot;, &quot;search&quot; : &quot;lyte-drop-item&quot; }\" on-search=\"{{method('search')}}\"></lyte-search> </template></template> <lyte-drop-body> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <lyte-drop-item data-value=\"{{key}}\">{{value}}</lyte-drop-item> </template><template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <div class=\"{{if(noResult,'lyteNumberFilterNoResult','lyteNumberFilterNoResult lyteSearchHidden')}}\">{{ltPropNoMatch}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <div class=\"lyteNumberFilterWrapper\"> <template is=\"if\" value=\"{{renderFirst}}\"><template case=\"true\"> <lyte-number class=\"lyteNumberFilterFirst\" lt-prop-input-wrapper-class=\"{{hideFirst}}\" lt-prop-value=\"{{lbind(first)}}\" lt-prop-min=\"{{ltPropMin}}\" lt-prop-max=\"{{ltPropMax}}\"> </lyte-number></template></template><template is=\"if\" value=\"{{renderSecond}}\"><template case=\"true\"> <lyte-number class=\"lyteNumberFilterSecond\" lt-prop-input-wrapper-class=\"{{hideSecond}}\" lt-prop-value=\"{{lbind(second)}}\"> </lyte-number></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"forIn","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,2]},{"type":"if","position":[1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,2]},{"type":"if","position":[3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropCondition","ltPropPlaceholder","ltPropOptions","ltPropNoMatch","ltPropMin","ltPropMax","ltPropSearchCount","ltPropReset","selected","renderFirst","renderSecond","noResult","isSearch","first","second","isNeg","hideFirst","hideSecond"],


	init : function(){
		var __data = this.data;
		__data.isSearch = Object.keys( __data.ltPropOptions ).length >= __data.ltPropSearchCount;
		__data.hideFirst = __data.hideSecond = 'lyteSearchHidden';

		this.setData( 'ltPropCondition', { input : "", start_diff : 0, end_diff : 0, start : -Infinity, end : Infinity, isNeg : false, isValid : false, value : "", label : "", type : "number" } );
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
			ltPropPlaceholder : Lyte.attr( __string, { default : "None" } ),
			ltPropOptions : Lyte.attr( __object, { default : {
				is : _lyteUiUtils.i18n( 'equal', 'listview.filter', "Equals to" ),
				is_not : _lyteUiUtils.i18n( 'not.equal', 'listview.filter', "Not equals to" ),
				between : _lyteUiUtils.i18n( "between", "listview.filter", "Between" ),
				less_than : _lyteUiUtils.i18n( "less.than", "listview.filter", "Less than" ),
				greater_than : _lyteUiUtils.i18n( "greater.than", "listview.filter", "Greater than" ),
				less_than_or_equal : _lyteUiUtils.i18n( "less.than.or.equal", "listview.filter", "Less than or equal" ),
				greater_than_or_equal : _lyteUiUtils.i18n( "greater.than.or.equal", "listview.filter", "Greater than or equal" ),
				not_between : _lyteUiUtils.i18n( "not.between", "listview.filter", "Not between" ),
				is_empty : _lyteUiUtils.i18n( 'is.empty', 'listview.filter', "Is empty" ),
				is_not_empty : _lyteUiUtils.i18n( 'is.not.empty', 'listview.filter', "Is not empty" )
			} } ),

			ltPropNoMatch : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),
			ltPropMin : Lyte.attr( __number ),
			ltPropMax : Lyte.attr( __number ),

			ltPropSearchCount : Lyte.attr( __number, { default : 8 } ),

			ltPropReset : Lyte.attr( __boolean, { default : false } ),

			selected : Lyte.attr( __string, { default : "" } ),
			renderFirst : Lyte.attr( __boolean ),
			renderSecond : Lyte.attr( __boolean ),
			noResult : Lyte.attr( __boolean ),

			isSearch : Lyte.attr( __boolean ),

			first : Lyte.attr( __string, { default : "" } ),
			second : Lyte.attr( __string, { default : "" } ),
			isNeg : Lyte.attr( __boolean, { default : false } ),
			hideFirst : Lyte.attr( __string ),
			hideSecond : Lyte.attr( __string )
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
		renderFirst = false,
		renderSecond = false,
		isNeg = false,
		__data = this.data,
		hiddenclass = 'lyteSearchHidden',
		condition = __data.ltPropCondition,
		Lc = Lyte.objectUtils,
		inf = Infinity,
		ns = "lyteNumberFilter_";

		$L( this.$node ).addClass( ns + selected ).removeClass( ns + arg.oldValue );

		switch( selected ){
			case 'is' : {
				renderFirst = true;
			}
			break;
			case 'is_not' : {
				renderFirst = true;
				isNeg = true;
			}
			break;
			case 'is_empty' : {
				isNeg = true;
			}
			break;
			case 'between' : {
				renderFirst = renderSecond = true;
			}
			break;
			case 'not_between' : {
				isNeg = renderFirst = renderSecond = true;
			}
			break;
			case 'less_than' :
			case 'greater_than' :
			case 'less_than_or_equal' :
			case 'greater_than_or_equal' : {
				renderFirst = true;
			}
			break;
			case 'in_the_last' : {
				render_drop = true;
			}
			break;
		}

		this.setData({
			renderFirst : __data.renderFirst || renderFirst,
			renderSecond : __data.renderSecond || renderSecond,
			first : "",
			second : "",
			hideFirst : renderFirst ? '' : hiddenclass,
			hideSecond : renderSecond ? '' : hiddenclass
		});

		Lc( condition, 'add', 'isNeg', isNeg );

		Lc( condition, 'add', 'value', selected );
		Lc( condition, 'add', 'label', __data.ltPropOptions[ selected ] || "" );

		this.update_value( '', '' );
	}.observes( 'selected' ),

	start_end_obs : function( arg ){
		var __data = this.data;

		this.update_value(__data.first, __data.second );
	}.observes( 'first', 'second' ),

	update_value : function( __first, __second ){
		var __data = this.data,
		condition = __data.ltPropCondition,
		hideFirst = __data.hideFirst,
		hideSecond = __data.hideSecond,
		isValid = false,
		inf = Infinity,
		startValue = "",
		endValue = "",
		Lc = Lyte.objectUtils,
		start_diff = 0,
		end_diff = 0,
		input = "";

		if( hideFirst && hideSecond ){
			isValid = __first == "";
		} else if( hideSecond ){
			isValid = !!__first;
		} else {
			isValid = !!__first && !!__second;
		}

		if( isValid ){
			switch( __data.selected ){
				case 'is' : 
				case 'is_not' : {
					input = startValue = endValue = __first;
				}
				break;
				case 'greater_than' : {
					startValue = __first;
					endValue = inf;
					end_diff = 1;

					input = "> " + __first;
				}
				break;
				case 'greater_than_or_equal' : {
					startValue = __first;
					endValue = inf;

					input = ">= " + __first;
				}
				break;
				case 'less_than' : {
					endValue = __first;
					startValue = -inf;
					start_diff = 1;

					input = "< " + __first;
				}
				break;
				case 'less_than_or_equal' : {
					endValue = __first;
					startValue = inf;

					input = "<= " + __first;
				}
				break;
				case 'between' : 
				case 'not_between' : {
					startValue = __first;
					endValue = __second;

					input = __first + " <= && " + __second + " >=" 
				}
				break;
				case 'is_empty' : 
				case 'is_not_empty' : {
					startValue = -inf;
					endValue = inf;
				}
				break;
			}
		} else {
			startValue = endValue = '';
		}

		Lc( condition, 'add', 'start', startValue );
		Lc( condition, 'add', 'end', endValue );
		Lc( condition, 'add', 'isValid', isValid );
		Lc( condition, 'add', 'start_diff', start_diff );
		Lc( condition, 'add', 'end_diff', end_diff );
		Lc( condition, 'add', 'input', input );
	},

	methods : {
		search : function( arg ){
			this.setData( 'noResult', arg.length == 0 );
		}
	}
});

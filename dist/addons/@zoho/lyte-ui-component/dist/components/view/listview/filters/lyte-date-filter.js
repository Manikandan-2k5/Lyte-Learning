Lyte.Component.register("lyte-date-filter", {
_template:"<template tag-name=\"lyte-date-filter\"> <lyte-dropdown lt-prop-selected=\"{{lbind(selected)}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteDateFilterDropdown\"> <template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{ &quot;scope&quot; : &quot;.lyteDateFilterDropdown:not(.lyteDropdownHidden)&quot;, &quot;search&quot; : &quot;lyte-drop-item&quot; }\" on-search=\"{{method('search')}}\"></lyte-search> </template></template> <lyte-drop-body> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <lyte-drop-item data-value=\"{{key}}\">{{value}}</lyte-drop-item> </template><template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <div class=\"{{if(noResult,'lyteDateFilterNoResult','lyteDateFilterNoResult lyteSearchHidden')}}\">{{ltPropNoMatch}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <div class=\"lyteDateFilterWrapper\"> <template is=\"if\" value=\"{{renderFirst}}\"><template case=\"true\"> <lyte-input lt-prop-type=\"date\" lt-prop-appearance=\"box\" class=\"lyteDateFilterFirst\" lt-prop-input-wrapper-class=\"{{hideFirst}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-current-date=\"{{lbind(first)}}\" lt-prop-bind-to-body=\"false\"></lyte-input> </template></template><template is=\"if\" value=\"{{renderSecond}}\"><template case=\"true\"> <lyte-input lt-prop-type=\"date\" lt-prop-appearance=\"box\" class=\"lyteDateFilterSecond\" lt-prop-input-wrapper-class=\"{{hideSecond}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-current-date=\"{{lbind(second)}}\" lt-prop-bind-to-body=\"false\"></lyte-input> </template></template><template is=\"if\" value=\"{{display}}\"><template case=\"true\"> <div class=\"lyteDateFilterDisabledElement\">{{display}}</div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"forIn","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,2]},{"type":"if","position":[1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,2]},{"type":"if","position":[3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}],
_observedAttributes :["ltPropCondition","ltPropPlaceholder","ltPropOptions","ltPropFormat","ltPropNoMatch","ltPropSearchCount","ltPropReset","selected","renderFirst","renderSecond","display","noResult","isSearch","first","second","isNeg","hideFirst","hideSecond"],


	init : function(){
		var __data = this.data;
		__data.isSearch = Object.keys( __data.ltPropOptions ).length >= __data.ltPropSearchCount;
		__data.hideFirst = __data.hideSecond = 'lyteSearchHidden';

		this.setData( 'ltPropCondition', { input : "", start : -Infinity, end : Infinity, isNeg : false, isValid : false, value : "", label : "", type : "date" } );
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
				today : _lyteUiUtils.i18n( 'today', 'listview.filter', "Today" ),
				till_yesterday : _lyteUiUtils.i18n( 'till.yesterday', 'listview.filter', "Till yesterday" ),
				unscheduled : _lyteUiUtils.i18n( 'unscheduled', 'listview.filter', "Unscheduled" ),
				yesterday : _lyteUiUtils.i18n( 'yesterday', 'listview.filter', "Yesterday" ),
				tomorrow : _lyteUiUtils.i18n( 'tomorrow', 'listview.filter', "Tomorrow" ),
				next_7_days : _lyteUiUtils.i18n( 'next.7.days', 'listview.filter', "Next 7 days" ),
				this_week : _lyteUiUtils.i18n( 'this.week', 'listview.filter', "This week" ),
				this_month : _lyteUiUtils.i18n( 'this.month', 'listview.filter', "This month" ),
				last_week : _lyteUiUtils.i18n( 'last.week', 'listview.filter', "Last week" ),
				last_month : _lyteUiUtils.i18n( 'last.month', 'listview.filter', "Last month" ),
				is : _lyteUiUtils.i18n( 'is', 'listview.filter', "Is" ),
				is_not : _lyteUiUtils.i18n( 'not.is', 'listview.filter', "Is not" ),
				between : _lyteUiUtils.i18n( "between", "listview.filter", "Between" ),
				less_than : _lyteUiUtils.i18n( 'less.than', 'listview.filter', "Less than" ),
				greater_than : _lyteUiUtils.i18n( 'greater.than', 'listview.filter', "Greater than" ),
				less_than_or_equal : _lyteUiUtils.i18n( "less.than.or.equal", "listview.filter", "Less than or equal" ),
				greater_than_or_equal : _lyteUiUtils.i18n( "greater.than.or.equal", "listview.filter", "Greater than or equal" ),
				not_between : _lyteUiUtils.i18n( "not.between", "listview.filter", "Not between" ),
				is_empty : _lyteUiUtils.i18n( "is.empty", "listview.filter", "Is empty" ),
				is_not_empty : _lyteUiUtils.i18n( "is.not.empty", "listview.filter", "Is not empty" )
			} } ),

			ltPropFormat : Lyte.attr( __string, { default : "MM-DD-YYYY" } ),
			ltPropNoMatch : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),

			ltPropSearchCount : Lyte.attr( __number, { default : 8 } ),

			ltPropReset : Lyte.attr( __boolean, { default : false } ),

			selected : Lyte.attr( __string, { default : "" } ),
			renderFirst : Lyte.attr( __boolean ),
			renderSecond : Lyte.attr( __boolean ),
			display : Lyte.attr( __string ),
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
		display = selected ? "${" + selected.toUpperCase() + "}" : "",
		__data = this.data,
		hiddenclass = 'lyteSearchHidden',
		condition = __data.ltPropCondition,
		Lc = Lyte.objectUtils,
		inf = Infinity,
		ns = "lyteDateFilter_";

		$L( this.$node ).addClass( ns + selected ).removeClass( ns + arg.oldValue );

		switch( selected ){
			case 'is' : {
				renderFirst = true;
				display = "";
			}
			break;
			case 'is_not' : {
				renderFirst = true;
				isNeg = true;
				display = "";
			}
			break;
			case 'is_empty' : {
				isNeg = true;
			}
			break;
			case 'between' : {
				renderFirst = renderSecond = true;
				display = "";
			}
			break;
			case 'not_between' : {
				isNeg = renderFirst = renderSecond = true;
				display = "";
			}
			break;
			case 'less_than' :
			case 'greater_than' :
			case 'less_than_or_equal' :
			case 'greater_than_or_equal' : {
				renderFirst = true;
				display = "";
			}
			break;
			case 'in_the_last' : {
				render_drop = true;
				display = "";
			}
			break;
		}

		Lc( condition, 'add', 'start', -inf );
		Lc( condition, 'add', 'end', inf );
		Lc( condition, 'add', 'isValid', !!selected );

		this.setData({
			renderFirst : __data.renderFirst || renderFirst,
			renderSecond : __data.renderSecond || renderSecond,
			display : display,
			first : "",
			second : "",
			hideFirst : renderFirst ? '' : hiddenclass,
			hideSecond : renderSecond ? '' : hiddenclass
		});

		if( display ){
			this.update_value( -inf, inf );
		}

		Lc( condition, 'add', 'isNeg', isNeg );

		Lc( condition, 'add', 'value', selected );
		Lc( condition, 'add', 'label', __data.ltPropOptions[ selected ] || "" );

	}.observes( 'selected' ),

	start_end_obs : function( arg ){
		var item = arg.item,
		value = arg.newValue,
		__data = this.data,
		format = __data.ltPropFormat,
		condition = __data.ltPropCondition,
		inf = Infinity,
		is_first = item == "first",
		newValue = is_first ? -inf : inf;

		if( __data.display ){
			return;
		}

		if( value ){
			var moment = $L.moment( value, format );

			if( moment.validate() ){
				newValue = moment.format();
			}
		}

		this.update_value( is_first ? newValue : condition.start, is_first ? condition.end : newValue );
	}.observes( 'first', 'second' ),

	update_value : function( startValue, endValue ){
		var __data = this.data,
		condition = __data.ltPropCondition,
		moment = $L.moment(),
		fns = {},
		Lc = Lyte.objectUtils,
		selected = __data.selected,
		inf = Infinity,
		isValid = !!selected,
		input = "",
		__format = __data.ltPropFormat;

		switch( selected ){
			case 'is' : 
			case 'is_not' : {
				moment = $L.moment( new Date( startValue ) )
				input = "{{start}}";
			}
			case 'today' : {
				fns.end = [ { name : "endOf", args : [ 'day' ] } ];
				fns.start = [ { name : "startOf", args : [ 'day' ] } ];
			}
			break;
			case 'till_yesterday' : {
				fns.end = [ 
					{ name : "startOf", args : [ 'day' ] },
					{ name : "subtract", args : [ 1, 'milliseconds' ] } 
				];
			}
			break;
			case 'yesterday' : {
				fns.end = [ 
					{ name : "startOf", args : [ 'day' ] },
					{ name : "subtract", args : [ 1, 'milliseconds' ] } 
				];

				fns.start = [ { name : "startOf", args : [ 'day' ] } ];

			}
			break;
			case 'tomorrow' : {
				fns.start = [ 
					{ name : "endOf", args : [ 'day' ] },
					{ name : "add", args : [ 1, 'milliseconds' ] } 
				];

				fns.end = [ { name : "endOf", args : [ 'day' ] } ];
			}
			break;
			case 'next_7_days' : {
				fns.start = [ 
					{ name : "endOf", args : [ 'day' ] },
					{ name : "add", args : [ 1, 'milliseconds' ] } 
				];

				fns.end = [ { name : "add", args : [ 7, 'day' ] } ];
			}
			break;
			case 'this_week' : {
				fns.start = [ 
					{ name : "startOf", args : [ 'week' ] }
				];
				
				fns.end = [ { name : "endOf", args : [ 'week' ] } ];
			}
			break;
			case 'this_month' : {
				fns.start = [ 
					{ name : "startOf", args : [ 'month' ] }
				];
				
				fns.end = [ { name : "endOf", args : [ 'month' ] } ];
			}
			break;
			case 'last_week' : {
				fns.end = [ 
					{ name : "startOf", args : [ 'week' ] },
					{ name : "subtract", args : [ 1, 'milliseconds' ] } 
				];
				
				fns.start = [ { name : "startOf", args : [ 'week' ] } ];
			}
			break;
			case 'last_month' : {
				fns.end = [ 
					{ name : "startOf", args : [ 'month' ] },
					{ name : "subtract", args : [ 1, 'milliseconds' ] } 
				];
				
				fns.start = [ { name : "startOf", args : [ 'month' ] } ];
			}
			break;
			case 'less_than' : {
				moment = $L.moment( new Date( startValue ) )
				fns.end = [ { name : "subtract", args : [ 1, 'milliseconds' ] } ];
				startValue = -inf;

				input = "< {{start}}";
			}
			break;
			case 'greater_than' : {
				moment = $L.moment( new Date( startValue ) )
				fns.end = [ { name : "add", args : [ 1, 'seconds' ] } ];
				endValue = inf;
				input = "> {{start}}";
			}
			case 'less_than_or_equal' : {
				endValue = startValue;
				startValue = -inf;
				input = "<= {{start}}";
			}
			break;
			case 'greater_than_or_equal' : {
				endValue = inf;
				input = " >= {{start}}";
			}
			break;
			case 'between' : 
			case 'not_between' : {
				if( !( isValid = ( startValue != -inf && endValue != inf ) ) ){
					moment = $L.moment( new Date( 'invalid' ) );
				}
				input = "{{start}} < && {{end}} >";
			}
			break;
		}

		if( !moment.validate() ){
			startValue = startValue == -inf ? -inf : startValue;
			endValue = endValue == inf ? inf : endValue;
			isValid = false;
		} else {
			for( var key in fns ){
				var __value = fns[ key ],
				__length = __value.length,
				final;

				for( var i = 0; i < __length; i++ ){
					var __cur = __value[ i ];
					 moment[ __cur.name ].apply( moment, __cur.args );
				}

				final = moment.format();

				if( key == 'start' ){
					startValue = final;
				} else {
					endValue = final;
				}

				input = input.replace( '{{' + key + "}}", moment.format( __format ) );
			}
		}

		Lc( condition, 'add', 'start', startValue );
		Lc( condition, 'add', 'end', endValue );
		Lc( condition, 'add', 'isValid', isValid );
		Lc( condition, 'add', 'input', input );
	},

	methods : {
		search : function( arg ){
			this.setData( 'noResult', arg.length == 0 );
		}
	}
});

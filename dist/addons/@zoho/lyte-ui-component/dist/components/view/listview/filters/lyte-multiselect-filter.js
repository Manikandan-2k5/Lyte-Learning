Lyte.Component.register("lyte-multiselect-filter", {
_template:"<template tag-name=\"lyte-multiselect-filter\"> <template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <lyte-input class=\"lyteFiltersMultiselectSearch\" lt-prop-type=\"search\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"Search\" lt-prop-value=\"{{lbind(first)}}\"></lyte-input> </template></template> <div class=\"lyteMultiselectFilterOptions\"> <lyte-table class=\"lyteMultiselectFilterTable\" lt-prop-yield=\"true\" lt-prop-infinite-scroll=\"true\" lt-prop-content-length=\"25\" lt-prop-content=\"{{picklistOptions}}\" scroll-end=\"{{method('scrollEnd')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"> <lyte-tr> <lyte-td> <lyte-checkbox lt-prop-label=\"{{item.body.label}}\" lt-prop-value=\"{{item.body.value}}\" lt-prop-name=\"multifilter\" on-changed=\"{{method('change',item.body)}}\" lt-prop-checked=\"{{lbind(item.body.checked)}}\"></lyte-checkbox> <template is=\"if\" value=\"{{item.body.email}}\"><template case=\"true\"> <div class=\"lyteMultipleEmail\">{{item.body.email}}</div> </template></template> </lyte-td> </lyte-tr> </template> <template is=\"if\" value=\"{{isSearch}}\"><template case=\"true\"> <div class=\"{{if(noResult,'lyteMultipleFilterNoResult','lyteMultipleFilterNoResult lyteSearchHidden')}}\">{{ltPropNoMatch}}</div> </template></template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]}],
_observedAttributes :["ltPropCondition","ltPropSearchCount","ltPropReset","ltPropNoMatch","ltPropData","ltPropPicklistOptions","ltPropDynamic","picklistOptions","noResult","isSearch","first"],


	init_obs : function(){
		var __data = this.data,
		picklistOptions = __data.ltPropPicklistOptions || [];

		this.setData({
			isSearch : picklistOptions.length >= __data.ltPropSearchCount,
			picklistOptions : picklistOptions,
			noResult : picklistOptions.length == 0,
			ltPropCondition : {
				type : "multiselect",
				value : [],
				isValid : false,
				selected : []
			}
		});

		if( __data.ltPropDynamic ){
			this.call_valueobs();
		}

	}.observes( 'ltPropPicklistOptions' ).on( 'init' ),

	data : function(){
		var __string = "string",
		__array = "array",
		__object = "object",
		__boolean = "boolean",
		__number = 'number';

		return {
			ltPropCondition : Lyte.attr( __object ),
			ltPropSearchCount : Lyte.attr( __number, { default : 8 } ),
			ltPropReset : Lyte.attr( __boolean, { default : false } ),
			ltPropNoMatch : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),

			ltPropData : Lyte.attr( __object, { default : {} } ),

			ltPropPicklistOptions : Lyte.attr( __array, { default : [] } ),

			ltPropDynamic : Lyte.attr( __boolean, { default : true } ),

			picklistOptions : Lyte.attr( __array ),
			noResult : Lyte.attr( __boolean ),
			isSearch : Lyte.attr( __boolean ),
			first : Lyte.attr( __string, { default : "" } )

		}		
	},

	value_obs : function(){
		this.call_valueobs();
	}.observes( 'first' ),

	cond_obs : function( arg ){
		var new_arr = ( ( arg.newValue || {} ).value || [] ).slice(),
		old_arr = ( ( arg.oldValue || {} ).value || [] ),
		__this = this;

		( ( arg.oldValue || {} ).value || [] ).forEach( function( item ){
			if( new_arr.indexOf( item ) == -1 ){
				__this.uncheck( item, false );
			}
		});

		new_arr.forEach( function( item ){
			if( old_arr.indexOf( item ) == -1 ){
				__this.uncheck( item, true );
			}
		});
	}.observes( 'ltPropCondition' ),

	call_valueobs : function(){
		var __data = this.data,
		value = __data.first.toLowerCase(),
		picklistOptions = __data.ltPropPicklistOptions,
		fn = function( __arr ){
			var table = this.$node.getElementsByTagName( "lyte-table" )[ 0 ];

			table && table.scrollTable( 0, 0 );

			this.setData({
				isSearch : __data.isSearch || __arr.length >= __data.ltPropSearchCount,
				noResult : __arr.length == 0,
				picklistOptions : __arr
			});
		}.bind( this );

		if( __data.ltPropDynamic ){
			var cb = "onPicklistConstruct";

			if( this.getMethods( cb ) ){
				var ret = this.executeMethod( cb, __data.first, __data.ltPropData, __data.picklistOptions );

				if( ret == false ){
					return;
				} else if( ret ){
					if( ret.then ){
					 	return ret.then( fn );
					}
					return fn( ret );
				}
			}
		}
		
		fn( value ? picklistOptions.filter( function( item ){
			var __name = ( item.name || '' ).toLowerCase(),
			__email = ( item.email || '' ).toLowerCase();

			return __name.indexOf( value ) != -1 || __email.indexOf( value ) != -1;

		}) : picklistOptions );
	},

	reset_obs : function( arg ){
		if( arg.newValue ){

			var __data = this.data,
			Lc = Lyte.objectUtils,
			ns = 'checked',
			value = __data.ltPropCondition.value,
			__length = value.length - 1;

			this.setData( arg.item, false );
			this.setData( 'first', "" );
			
			for( var i = __length; i >= 0; i-- ){
				var __cur = value[ i ];
				this.uncheck( __cur, false );
			}
		}
	}.observes( 'ltPropReset' ),

	uncheck : function( value, to_value ){
		var __data = this.data,
		picklistOptions = __data.picklistOptions,
		index = picklistOptions.findIndex( function( item ){
			return item.value == value;
		});

		if( index != -1 ){
			var cur = picklistOptions[ index ];

			if( cur.checked != to_value ){
				Lyte.objectUtils( cur, 'add', 'checked', to_value );
			}
		}
	},

	methods : {
		change : function( item, input ){
			var condition = this.data.ltPropCondition,
			arr = condition.value,
			selected = condition.selected
			/*,
			args = [ arr ],
			args1 = [ selected ]*/;

			if( input.checked ){
				// args.push( 'push', item.value );
				// args1.push( 'push', item );
				Lyte.arrayUtils( arr, 'push', item.value );
				Lyte.arrayUtils( selected, 'push', item );
			} else {
				var __index = arr.indexOf( item.value );
				// args.push( 'removeAt', __index );
				// args1.push( 'removeAt', __index );
				Lyte.arrayUtils( arr, 'removeAt', __index );
				Lyte.arrayUtils( selected, 'removeAt', __index );

			}

			// Lyte.arrayUtils.apply( __Lyte, args );
			// Lyte.arrayUtils.apply( __Lyte, args1 );
			
			Lyte.objectUtils( condition, 'add', 'isValid', !!arr.length );
		},

		scrollEnd : function(){
			var cb = 'fetchMoreData',
			__data = this.data;

			return this.getMethods( cb ) && this.executeMethod( cb, __data.first, __data.ltPropData, __data.picklistOptions );
		}
	}
});

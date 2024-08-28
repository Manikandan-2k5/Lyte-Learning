Lyte.Component.register("lyte-list-filter", {
_template:"<template tag-name=\"lyte-list-filter\"> <lyte-modal lt-prop=\"{{ltPropModal}}\" lt-prop-show=\"{{lbind(ltPropShow)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <div class=\"lyteFilterHeader\"> <div class=\"lyteFilterName\">Filter</div> </div> <div class=\"lyteFilterType\"> <lyte-radiobutton lt-prop-type=\"primary\" lt-prop-name=\"filter_type\" lt-prop-label=\"Any of these Condition(s)\" lt-prop-value=\"any_of_these\" lt-prop-checked=\"{{lbind(ltPropAny)}}\"></lyte-radiobutton> <lyte-radiobutton lt-prop-type=\"primary\" lt-prop-name=\"filter_type\" lt-prop-label=\"All of these Condition(s)\" lt-prop-value=\"all_of_these\" lt-prop-checked=\"{{expHandlers(ltPropAny,'!')}}\"></lyte-radiobutton> </div> <lyte-search lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.lyteFilterContent&quot;,&quot;search&quot; : &quot;lyte-accordion-header&quot;,&quot;target&quot; : &quot;lyte-accordion-item&quot;}\" lt-prop-search-delay=\"\" on-search=\"{{method('search')}}\"></lyte-search> </lyte-modal-header> <lyte-modal-content class=\"lyteFilterContent\"> <lyte-accordion lt-prop-dynamic=\"true\" on-before-open=\"{{method('beforeOpen')}}\" on-before-close=\"{{method('beforeClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"for\" items=\"{{fields}}\" item=\"item\" index=\"index\"> <lyte-accordion-item index=\"{{index}}\"> <lyte-accordion-header> {{item.data.name}} <lyte-icon class=\"lyteAccordionArrow\"></lyte-icon> </lyte-accordion-header> <lyte-accordion-body> <template is=\"if\" value=\"{{item.render}}\"><template case=\"true\"> <template is=\"component\" class=\"lyteFilterElement\" component-name=\"{{concat('lyte-',item.data.dataType,'-filter')}}\" lt-prop-condition=\"{{lbind(item.selected)}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-picklist-options=\"{{item.picklistOptions}}\" lt-prop-min=\"{{item.min}}\" lt-prop-max=\"{{item.max}}\" lt-prop-data=\"{{item.data}}\" on-picklist-construct=\"{{method('picklistData')}}\" fetch-more-data=\"{{method('fetchMoreData')}}\" lt-prop-reset=\"{{lbind(item.reset)}}\" on-custom-filter-reset=\"{{method('customReset')}}\"> <template is=\"registerYield\" yield-name=\"lyte-custom-filter\" from-parent=\"\"></template> </template> </template></template> </lyte-accordion-body> </lyte-accordion-item> </template> </template> </lyte-accordion> <div class=\"lyteFilterNoResult {{noResult}}\">{{ltPropNoResult}}</div> </lyte-modal-content> <lyte-modal-footer> <span class=\"lyteFilterReset\" __click=\"{{action('reset')}}\">Reset</span> <div class=\"lyteListButtons\"> <lyte-button class=\"lyteFilterCancel\" __click=\"{{action('cancel')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Cancel </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" class=\"lyteFilterApply\" __click=\"{{action('apply')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Apply </template> </lyte-button> </div> </lyte-modal-footer> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"componentDynamic","position":[1,3,3]},{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"text","position":[3,3,0]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"attr","position":[5,3,1]},{"type":"registerYield","position":[5,3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,3,1]},{"type":"attr","position":[5,3,3]},{"type":"registerYield","position":[5,3,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,3,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropModal","ltPropFields","ltPropContent","ltPropShow","ltPropAny","ltPropReset","ltPropFormat","ltPropConditions","ltPropNoResult","fields","finalStatus","noResult"],


	init : function(){
		var __data = this.data,
		fields = __data.ltPropFields,
		final = [],
		obj = {};

		fields.forEach( function( item ){
			var __data = item.data;

			if( __data.dataType ){
				final.push({
					data : __data,
					render : false,
					selected : {},
					reset : false
				});

				obj[ __data.prop ] = {};
			}
		});
			
		this.$node.reset = function( key ){
			this.reset( this.data.fields.filter( function( item ){
			    return key == item.data.prop   
			}) );
		}.bind( this );

		this.setData({
			fields : final,
			ltPropConditions : obj,
			noResult : fields.length ? 'lyteSearchHidden' : ''
		});
	},

	data : function(){

		var __array = "array",
		__string = "string",
		__boolean = "boolean";

		return {
			ltPropModal : Lyte.attr( __string, { default : '{"wrapperClass" : "lyteListModalWrapper", "maxHeight" : "70%", "animation" : "slideFromRight","offset" : { "right" : 0 } }' } ),

			ltPropFields : Lyte.attr( __array, { default : [] } ),
			ltPropContent : Lyte.attr( __array, { default : [] } ),

			ltPropShow : Lyte.attr( __boolean, { default : false } ),

			ltPropAny : Lyte.attr( __boolean, { default : true } ),
			ltPropReset : Lyte.attr( __boolean, { default : false } ),

			ltPropFormat : Lyte.attr( __string, { default : "MM-DD-YYYY" } ),

			ltPropConditions : Lyte.attr( 'object', { default : {}, watch : true } ),
			ltPropNoResult : Lyte.attr( __string, { default : _lyteUiUtils.i18n( 'no.results.found', void 0, 'No Results Found' ) } ),

			fields : Lyte.attr( __array, { default : [] } ),

			finalStatus : Lyte.attr( __boolean, { default : true } ),
			noResult : Lyte.attr( __string, { default : '' } )
		}		
	},

	execute : function( cb ){
		return this.getMethods( cb ) && this.executeMethod.apply( this, arguments );
	},

	methods : {

		search : function( arr ){
			this.setData( 'noResult', arr.length ? 'lyteSearchHidden' : '' );
		},

		customReset : function( data, condition, node ){
			return this.execute( 'onCustomFilterReset', data, condition, node );
		},

		fetchMoreData : function( first, data, picklistOptions ){
			return this.execute( 'fetchMoreData', first, data, picklistOptions );
		},

		picklistData : function( value, cell_data, old_value ){
			return this.execute( 'onPicklistConstruct', value, cell_data, old_value );
		},	

		beforeOpen : function(){
			var __elem = arguments[ 1 ],
			index = parseInt( __elem.getAttribute( 'index' ) ),
			__data = this.data.fields[ index ];

			Lyte.objectUtils( __data, 'add', 'render', true );
			return this.execute( 'onBeforeFilterOpen', __data.data, __data.selected, __elem.querySelector( '.lyteFilterElement' ) );
		},

		reset : function( item ){
			Lyte.objectUtils( item, 'add', 'value', '' );
		},

		beforeClose : function(){
			var elem = arguments[ 2 ].$node.querySelector( '.lyteAccordionActive .lyteFilterElement' ),
			__data = ( ( elem || {} ).component || {} ).data;

			__data && this.execute( 'onBeforeFilterClose', __data.ltPropData, __data.ltPropCondition, elem );

			if( __data && !__data.ltPropCondition.isValid ){
				elem.ltProp( 'reset', true );
			}
		}
	},

	cond_obs : function(){

		var cb = "onConditionChange";

		if( this.getMethods( cb ) ){
			clearTimeout( this.__timeout );
			this.__timeout = setTimeout( function(){
				var __data = this.data;
				this.executeMethod( cb, __data.ltPropConditions, __data.ltPropAny, this.$node );
			}.bind( this ), 0 );
		}
	}.observes( 'ltPropConditions.*', 'finalStatus' ),

	first_extn : function( obj ){
		return $L.extend( true, {}, obj );
	},

	reset : function( fields ){
		var __data = this.data,
		conditions = __data.ltPropConditions,
		Lc = Lyte.objectUtils,
		__this = this;

		fields = fields || __data.fields;

		fields.forEach( function( item ){
			var f_data = item.data,
			__prop = f_data.prop;

			Lc( item, 'add', 'reset', true );
			Lc( conditions, 'add', __prop, __this.first_extn( item.selected ) );
		});

		this.setData( 'ltPropAny', __data.finalStatus );
	},

	apply : function(){
		var __data = this.data,
		conditions = __data.ltPropConditions,
		fields = __data.fields,
		Lc = Lyte.objectUtils,
		__this = this;

		fields.forEach( function( item ){
			var f_data = item.data;
			Lc( conditions, 'add', f_data.prop, __this.first_extn( item.selected ) );
		});

		this.setData( 'finalStatus', __data.ltPropAny );
	},

	cancel : function(){
		var __data = this.data,
		conditions = __data.ltPropConditions,
		fields = __data.fields,
		Lc = Lyte.objectUtils,
		__this = this;

		fields.forEach( function( item ){
			Lc( item, 'add', 'selected', __this.first_extn( conditions[ item.data.prop ] ) );
		});
	},

	reset_obs : function( arg ){
		if( arg.newValue ){
			this.reset();
			this.setData( arg.item, false );
		}
	}.observes( 'ltPropReset' ),

	show_obs : function( arg ){
		if( !arg.newValue ){
			this.cancel();
		} 
	}.observes( 'ltPropShow' ),

	actions : {
		reset : function(){
			this.reset();
			this.setData( 'ltPropShow', false );
		},

		apply : function(){
			this.apply();
			this.setData( 'ltPropShow', false );
		},

		cancel : function(){
			this.setData( 'ltPropShow', false );
		}
	}
});
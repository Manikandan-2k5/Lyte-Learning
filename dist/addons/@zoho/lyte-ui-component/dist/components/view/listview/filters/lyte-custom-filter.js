Lyte.Component.register("lyte-custom-filter", {
_template:"<template tag-name=\"lyte-custom-filter\"> <lyte-yield yield-name=\"lyte-custom-filter\" lt-prop-data=\"{{ltPropData}}\" lt-prop-condition=\"{{ltPropCondition}}\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropCondition","ltPropReset","ltPropData"],


	init : function(){
		this.setData( 'ltPropCondition', { isValid : false, value : "", label : "", type : "custom" } );
	},

	data : function(){

		return {
			ltPropCondition : Lyte.attr( 'object' ),
			ltPropReset : Lyte.attr( 'boolean', { default : false } ),
			ltPropData : Lyte.attr( 'object', { default : {} } )
		}		
	},

	reset_obs : function( arg ){
		if( arg.newValue ){
			var cb = "onCustomFilterReset",
			__data = this.data,
			Lc = Lyte.objectUtils,
			condition = __data.ltPropCondition;

			Lc( condition, 'add', 'isValid', false );
			Lc( condition, 'add', 'label', "" );
			Lc( condition, 'add', 'value', "" );

			this.getMethods( cb ) && this.executeMethod( cb, __data.ltPropData, condition, this.$node );
			this.setData( arg.item, false );
		}
	}.observes( 'ltPropReset' )
});

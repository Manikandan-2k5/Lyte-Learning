/**
 * This component is used to select user desired items from the list of available items
 * @component  lyte-column-chooser
 * @version 3.64.0
 * @dependency lyte-checkbox
 *  /components/lyte-checkbox
 *  /theme/compiledCSS/default/ltr/lyte-ui-checkbox.css 
 */

Lyte.Component.register("lyte-column-chooser", {
_template:"<template tag-name=\"lyte-column-chooser\"> <div class=\"lyteColumnChooser\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{item.columnChooser}}\"><template case=\"true\"> <lyte-checkbox lt-prop-checked=\"{{lbind(item.columnChooser.selected)}}\" lt-prop-label=\"{{expHandlers(item.name,'||',item.children[0].name)}}\" lt-prop-disabled=\"{{item.columnChooser.disabled}}\" on-checked=\"{{method('checked',item,index)}}\" on-unchecked=\"{{method('unchecked',item,index)}}\"></lyte-checkbox> </template></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}],
_observedAttributes :["ltPropHeader"],

	data : function(){
		return {
			/**
			 * @componentProperty {array} ltPropHeader
			 * @default []
			 */
			ltPropHeader : Lyte.attr( 'array', { default : [] } )
		}		
	},

	execute : function( cb, args ){
		if( this.getMethods( cb ) ){
			args = Array.from( args );
			args.unshift( cb );
			this.executeMethod.apply( this, args );
		}
	},

	methods : {
		checked : function(){
			/**
			  * @method onChecked
			  * @version 3.64.0
			  */
			this.execute( "onChecked", arguments );
		},

		unchecked : function(){
			/**
			  * @method onChecked
			  * @version 3.64.0
			  */
			this.execute( "onUnchecked", arguments );
		}
	}
});


/**
 * @syntax Non Yielded
 * <lyte-column-chooser></lyte-column-chooser>
 */
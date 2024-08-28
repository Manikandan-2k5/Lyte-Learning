/**
 * Renders a tour hint component
 * @component lyte-tour-hint
 * @version 3.1.0
 */


Lyte.Component.register("lyte-tour-hint", {
_template:"<template tag-name=\"lyte-tour-hint\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourTargetBackground\"></div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropBackgroundAnimation","ltPropBindToBody","tourStepIndex","ltPropArrowPosition","ltPropAppendBackground","ltPropLabel"],

	data : function(){
		return {

			/**
			 * @componentProperty {boolean} ltPropBackgroundAnimation
			 * @default false
			 * 
			 */

			 'ltPropBackgroundAnimation' : Lyte.attr('boolean' , { default : false }),

			'ltPropBindToBody' : Lyte.attr('boolean' , { default : false }),
			'tourStepIndex'			: Lyte.attr('number' , { default : 0 }),
			'ltPropArrowPosition'	: Lyte.attr('string' , { default : 'start' }),
			'ltPropAppendBackground' : Lyte.attr('boolean' , { default : false }),
			'ltPropLabel'	: Lyte.attr('string' , { default : '' })
		}
	},
	init : function(){

	}
});

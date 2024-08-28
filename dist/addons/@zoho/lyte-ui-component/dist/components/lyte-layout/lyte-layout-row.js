Lyte.Component.register("lyte-layout-row", {
_template:"<template tag-name=\"lyte-layout-row\"> <template is=\"for\" items=\"{{ltPropColarray}}\" item=\"col\" index=\"index\"> <template is=\"if\" value=\"{{lyteUiRowLength(col)}}\"><template case=\"true\"> <div class=\"lyte-{{ltPropDivsize[ltPropColsize]}}-{{col}} lyterow-yield\"> <lyte-yield yield-name=\"col\" col-index=\"{{index}}\" class=\"lytecol-yield\"> </lyte-yield> </div> </template><template case=\"false\"> <div class=\"lyte-col lyterow-yield\"> <lyte-yield yield-name=\"col\" col-index=\"{{index}}\" style=\"width: 100%;\"> </lyte-yield> </div> </template></template> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]}],
_observedAttributes :["ltPropColarray","ltPropDivision","sum","ltPropColsize","ltPropDivsize"],

	data : function(){
		return {
			'ltPropColarray' : Lyte.attr('array',{'default':[]}),
			'ltPropDivision' : Lyte.attr('array'),
			'sum' : Lyte.attr('number',{'default':0}),
			'ltPropColsize' : Lyte.attr('string',{'default':'fluid'}),
			'ltPropDivsize' : Lyte.attr('object',{'default':{'fluid':'col','small':'smcol','medium':'mdcol','large':'lgcol','xlarge':'xlcol','default':'col'}})
		}		
	}


});
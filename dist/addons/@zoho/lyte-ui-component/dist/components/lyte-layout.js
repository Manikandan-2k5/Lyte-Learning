Lyte.Component.register("lyte-layout", {
_template:"<template tag-name=\"lyte-layout\"> <template is=\"for\" items=\"{{ltPropDivision}}\" item=\"row\" index=\"rowindex\"> <lyte-layout-row lt-prop-colarray=\"{{row}}\" class=\"lyte-row\" lt-prop-colsize=\"{{ltPropSize}}\"> <template is=\"registerYield\" yield-name=\"col\"> <template is=\"for\" items=\"{{row}}\" item=\"col\" index=\"colindex\"><template is=\"if\" value=\"{{expHandlers(colIndex,'==',colindex)}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyte-row{{rowindex}}-col{{colindex}}\" class=\"lytecol-yield\"></lyte-yield> </template></template> </template> </template> </lyte-layout-row> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[1]}]}],
_observedAttributes :["ltPropDivision","ltPropSize","ltPropContainerClass"],

	data : function(){
		return {
			
			'ltPropDivision' : Lyte.attr('array',{'default' : [] }),
			'ltPropSize' : Lyte.attr('string',{'default':'small'}),
			'ltPropContainerClass' : Lyte.attr('object',{'default':{'small':'lyte-container-sm','medium':'lyte-container-md','large':'lyte-container-lg','xlarge':'lyte-container-xl','fluid':'lyte-container-fluid'}})		
		}		
	},
	init : function(){
		
		this.$node.style.display = 'block';
		

	},
	onChangeSize: function(){
		var size =  this.getData('ltPropSize');
		this.removesizeclass();
		if(size === "fluid"){
			this.$node.classList.add('lyte-container-fluid');
		}else if(size === 'medium'){
			this.$node.classList.add('lyte-container-md');
		}else if(size === 'large'){
			this.$node.classList.add('lyte-container-lg');
		}else if(size === 'xlarge'){
			this.$node.classList.add('lyte-container-xl');
		}else if(size === 'small'){
			this.$node.classList.add('lyte-container-sm');
		}else{
			this.$node.classList.add('lyte-container');
			this.setData('ltPropSize','default');
		}
	}.observes('ltPropSize').on('init'),
	removesizeclass : function(){
		var sizeclass = this.$node.className;
		var regex =  /lyte-container-(lg|md|fuild|md|xl|sm)/i;
		var size = sizeclass.match(regex) || [];
		switch(size[size.length-1]){
			case 'fuild':
				this.$node.classList.remove('lyte-container-fluid');
				break;
			case 'lg':
				this.$node.classList.remove('lyte-container-lg');
				break;
			case 'md':
				this.$node.classList.remove('lyte-container-md');
				break;
			case 'sm':
				this.$node.classList.remove('lyte-container-sm');
				break;
			case 'xl':
				this.$node.classList.remove('lyte-container-xl');
				break;
			default:
				this.$node.classList.remove('lyte-container');
		}
	}
	
});



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
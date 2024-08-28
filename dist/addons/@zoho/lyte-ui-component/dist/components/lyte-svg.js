Lyte.Component.register( 'lyte-svg', {
_template:"<template tag-name=\"lyte-svg\"> <svg class=\"{{ltPropClass}}\" viewBox=\"{{ltPropViewBox}}\"> <use id=\"{{ltPropId}}\" xlink:href=\"{{lyteUiSetURL(ltPropPath,flag)}}\"></use> </svg> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}],
_observedAttributes :["ltPropViewBox","ltPropClass","ltPropPath","ltPropId","flag"],

	data: function() {
		return {
			ltPropViewBox: Lyte.attr( 'string', { 'default': '' } ),
			ltPropClass: Lyte.attr( 'string', { 'default': '' } ),
			ltPropPath: Lyte.attr( 'string' ),
			ltPropId: Lyte.attr( 'string', { 'default': '' } ),
			flag: Lyte.attr( 'boolean', { default: false } )
		}		
	},

	didConnect: function() {
		this.setData( 'flag', true );
	}
} );
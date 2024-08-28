Lyte.Component.register("menu-portal", {
_template:"<template tag-name=\"menu-portal\"> <lyte-yield yield-name=\"menu-list\" icon-element=\"{{icon}}\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}],
_observedAttributes :["icon"],

	data : function(){
		return {
			icon:Lyte.attr("string", {default:"☰"})
		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

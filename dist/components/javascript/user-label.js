Lyte.Component.register("user-label", {
_template:"<template tag-name=\"user-label\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div style=\"display:flex; width:300px; height:25px; justify-content:space-around; border:1px solid black; margin:0.3rem;\"> <p style=\"margin:0.4rem; background-color: black; border:1px solid black; width:100px; height:12.5px;\"></p> <p style=\"margin:0.4rem; background-color: black; border:1px solid black; width:100px; height:12.5px;\"></p> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div style=\"display:flex; width:300px; height:25px; justify-content:space-around; border:1px solid black; margin:0.3rem;\"> <p style=\"margin:0.4rem; border:1px solid black; width:100px; height:12.5px; line-height:12.5px; text-align:center;\">{{userName}}</p> <p style=\"margin:0.4rem; border:1px solid black; width:100px; height:12.5px; line-height:12.5px; text-align:center;\">{{userId}}</p> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}},"default":{}}],
_observedAttributes :["userName","userId","lyteViewPort"],

	data : function(){
		return {
			userName:Lyte.attr("string"),
			userId:Lyte.attr("number"),
			lyteViewPort : Lyte.attr("boolean")
		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

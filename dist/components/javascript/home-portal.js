Lyte.Component.register("home-portal", {
_template:"<template tag-name=\"home-portal\"> <h1>Hello All. Lyte-Test</h1> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Enter your name\" lt-prop-value=\"{{lbind(personName)}}\"> </lyte-input> <lyte-button lt-prop-appearance=\"primary\" __click=\"{{action('routeTransition')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Go to your Website </template> </lyte-button> <template is=\"component\" component-name=\"menu-portal\"></template> </template>",
_dynamicNodes : [{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5]},{"type":"component","position":[7],"dynamicNodes":[]}],
_observedAttributes :["personName"],

	data : function(){
		return {
			personName:Lyte.attr("string")
		}		
	},
	actions : {
		routeTransition:function(){
			console.log("Hello");
			if(this.getData("personName")==undefined || this.getData("personName")==""){
				Lyte.Router.transitionTo("home.user", "anonymous")
			}
			else{	
				Lyte.Router.transitionTo("home.user", this.getData("personName"));
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

Lyte.Component.register("home-portal", {
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

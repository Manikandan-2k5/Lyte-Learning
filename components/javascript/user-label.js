Lyte.Component.register("user-label", {
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

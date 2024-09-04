Lyte.Component.register("user-form", {
	data : function(){
		return {
			userName:Lyte.attr("string", {mandatory:true}),
			place:Lyte.attr("string", {mandatory:true}),
			phoneNumber:Lyte.attr("string", {mandatory:true}),
			customArray:Lyte.attr("customArray"),
			customObject:Lyte.attr("customObject")
		}	
	},
	actions : {
		submit:async function(){
			this.setData("customArray", ["hello",2,3,4]);
			this.setData("customObject", {age:18});
			console.log(this.getData("errors"));
			let rec = store.peekRecord("user", 15);
			rec.$.triggerAction("action");
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});	
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
		submit:function(){
			store.createRecord("user", {userName:"Manikandan", place:"Chennai", phoneNumber:"8610045338", age:18});
			this.setData("customArray", ["hello",2,3,4]);
			this.setData("customObject", {age:18});
			console.log(this.getData("errors"));
			if(this.getData("errors").userName!=undefined || this.getData("errors").phoneNumber!=undefined || this.getData("errors").place!=undefined){
				for (error in this.getData("errors")){
					console.log(error+": "+this.getData("errors")[error].message);
				}
			}
			else{
				let record = store.createRecord("user", {userName:this.getData("userName"), place:this.getData("place"), phoneNumber:this.getData("phoneNumber")});
				console.log(record.$.error);
				if(record.$.isError){
					for (error in record.$.error){
						console.log(error+": "+record.$.error[error].message);
					}
				}
				else{
					this.setData("price", store.peekAll("user")[0].price);
					alert("Record Added.");
				}
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});
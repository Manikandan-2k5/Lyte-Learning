Lyte.Component.register("user-form", {
_template:"<template tag-name=\"user-form\"> <div style=\"display:flex; flex-direction:column; width:500px; height:200px; justify-content:space-around;\"> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Name\" lt-prop-value=\"{{lbind(userName)}}\"></lyte-input> <lyte-input lt-prop-type=\"number\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"Phone number\" lt-prop-value=\"{{lbind(phoneNumber)}}\"></lyte-input> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Place\" lt-prop-value=\"{{lbind(place)}}\"></lyte-input> <lyte-button __click=\"{{action('submit',event)}}\"> <template is=\"registerYield\" yield-name=\"text\">Submit</template> </lyte-button> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7]},{"type":"registerYield","position":[1,7,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,7]}],
_observedAttributes :["userName","place","phoneNumber","customArray","customObject"],

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
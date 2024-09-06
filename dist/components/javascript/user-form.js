Lyte.Component.register("user-form", {
_template:"<template tag-name=\"user-form\"> <div style=\"display:flex; flex-direction:column; width:500px; height:200px; justify-content:space-around;\"> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Name\" lt-prop-value=\"{{lbind(userName)}}\"></lyte-input> <lyte-input lt-prop-type=\"number\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"Phone number\" lt-prop-value=\"{{lbind(phoneNumber)}}\"></lyte-input> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Place\" lt-prop-value=\"{{lbind(place)}}\"></lyte-input> <lyte-button __click=\"{{action('submit',event)}}\"> <template is=\"registerYield\" yield-name=\"text\">Submit</template> </lyte-button> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7]},{"type":"registerYield","position":[1,7,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,7]}],
_observedAttributes :["userName","place","phoneNumber","customArray","customObject","listenerIds"],

	data : function(){
		return {
			userName:Lyte.attr("string", {mandatory:true}),
			place:Lyte.attr("string", {mandatory:true}),
			phoneNumber:Lyte.attr("string", {mandatory:true}),
			customArray:Lyte.attr("customArray"),
			customObject:Lyte.attr("customObject"),
			listenerIds:Lyte.attr("array")
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
	},
	init:function(){
		let modelAddRecordListenerId = store.modelFor("user").addEventListener("add", function(record){console.log("record added"); console.log(record);});
		let modelUpdateRecordListenerId = store.modelFor("user").addEventListener("change", function(record, attr){console.log("record changed"); console.log(record); console.log(attr)});
		let modelRemoveRecordListenerId = store.modelFor("user").addEventListener("remove", function(record){console.log("record deleted"); console.log(record);});
		let beforeRequestListenerId = store.addEventListener("beforeRequest", function(XHR , modelName , type , key, queryParams){console.log("Request type: "+type+" is made for Model: "+modelName);});
		let afterRequestListenerId = store.addEventListener("afterRequest", function(XHR , modelName , type , key, queryParams){console.log("Request type: "+type+" is completed for Model: "+modelName);});
		this.setData("listenerIds", [modelAddRecordListenerId, modelRemoveRecordListenerId, modelUpdateRecordListenerId, beforeRequestListenerId, afterRequestListenerId]);
	},

	didDestroy:function(){
		for(let id of this.getData("listenerIds")){
			console.log(id);
			store.modelFor("user").removeEventListener(id);
		}
	}
});	
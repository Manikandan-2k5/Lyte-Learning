store.registerSerializer("user",{
	normalize : function(modelName , type , snapshot, customData, opts ){
        console.log("normalize");
        console.log(snapshot);
        return snapshot;
    },
    normalizeResponse : function(modelName , type , payLoad , pkValue , status , headers , queryParams , customData, opts){
        console.log("normalizeResponse");
        if(type.toLowerCase()=="createrecord" || type.toLowerCase()=="findrecord"){
            return {user:payLoad[0]};
        }
        else{
            return {user:payLoad};
        }
    },
    serialize:function(type , payLoad , records , customData , modelName, queryParams , actionName){
        console.log("serialize");
        console.log(payLoad);
        if(type.toLowerCase()=="createrecord" || type.toLowerCase()=="updaterecord"){
            return [payLoad.user];
        }
        else{
            return payLoad.user;
        }
    }
});
Lyte.registerValidator("checkEmpty",
    function(fieldName, fieldValue){
        if(fieldValue==undefined || fieldValue==null){  
            console.log("hello")  
            return {message:"Validation failed."};
        }
        else{
            return true;
        }
    }
);

Lyte.registerDataType("currency", 
	{
		extends:"number",
		serialize:function(deserialized){
            console.log("hello");
			return deserialized*83;
		},
		deserialize:function(serialized){
            console.log("hello");
			return serialized/83;
		}
	}
);

Lyte.registerDataType("customObject",
    {
        extends:"object",
        properties:{
            userName:Lyte.attr("string", {mandatory:true, validation:"checkEmpty"}),
            place:Lyte.attr("string", {mandatory:true, validation:"checkEmpty"}),
            phoneNumber:Lyte.attr("number", {mandatory:true, validation:"checkEmpty"})
        }
    }
);


Lyte.registerDataType("customArray",
    {
        extends:"array",
        items:Lyte.attr("string")
    }
);

Lyte.registerPattern( "phoneNumberRegex" , /^[6-9]{1}\d{9}$/ );

store.registerModel("user",
    {

        STD_ID: Lyte.attr("number", {primaryKey:true}),
        STD_NAME: Lyte.attr("string", {mandatory:true}),
        LAST_NAME: Lyte.attr("string", {mandatory:true}),
        COURSE_ID: Lyte.attr("number", {mandatory:true}),
        STD_DOB: Lyte.attr("string", {mandatory:true}),
        STD_ADDR: Lyte.attr("string", {mandatory:true}),
        STD_DOJ: Lyte.attr("string", {mandatory:true}),
        STD_GENDER: Lyte.attr("string", {mandatory:true})

    },
    
    {
        actions:{
            invokeAction:{}
        }
    }
);

store.registerModel("profile",
    {
        id:Lyte.attr("number", {primaryKey:true}),
        status:Lyte.attr("string", {mandatory:true}),
        user:Lyte.belongsTo("user")
    }
);

store.registerModel("badge",
    {
        id:Lyte.attr("number", {primaryKey:true}),
        badgeName:Lyte.attr("string", {mandatory:true}),
        collectedUsers:Lyte.hasMany("user"),
        earnedUsers:Lyte.hasMany("user")
    }
);
store.registerAdapter("user", {

	host : "http://localhost:8080/",

    namespace : "web_app",

    withCredentials: true,

    delayPersistence:{delete:true},

    buildURL : function(modelName , type , queryParams , payLoad , url , actionName , customData ){
        switch(type){
            case "updateRecord" || "findRecord":
                url.replace("user");
        }
        url = url.replace("user", "users");
        console.log(url);
        return url;
    },

    headersForRequest : function(type , queryParams , customData, actionName, key ){
        console.log("headers");
        return {
            "Accept":"application/json"
        };
    },

    methodForRequest : function(method , type , queryParams , customData, actionName, key){
        console.log("requestMethod");
        if( method == "PATCH" ){
            return "PUT";
        }
        return method;
    }

});


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
        else if(type.toLowerCase()=="updaterecord" || type.toLowerCase()=="update"){
            return payLoad;
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
        else if(type.toLowerCase()=="action"){
            return payLoad;
        }
        else{
            return payLoad.user;
        }
    }
});
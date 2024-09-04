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


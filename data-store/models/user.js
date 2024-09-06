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
        STD_GENDER: Lyte.attr("string", {mandatory:true}),
        didLoad:function(){
            console.log("Records got loaded from server", this);
        }

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
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
        userName: Lyte.attr("string", {mandatory:true}),
        place: Lyte.attr("string", {mandatory:true}),
        phoneNumber: Lyte.attr("string", {mandatory:true, pattern:Lyte.patterns.phoneNumberRegex}),
        profile:Lyte.belongsTo("profile"),
        collectedBadges:Lyte.hasMany("badge", {inverse:"collectedUsers"}),
        earnedBadges:Lyte.hasMany("badge", {inverse:"earnedUsers"}),
        bestFriend:Lyte.belongsTo("user", {inverse:"bestFriend"})
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
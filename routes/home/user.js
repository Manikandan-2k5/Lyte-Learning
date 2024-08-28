Lyte.Router.registerRoute("home.user",{
    getResources  : function (paramsObject ){ 
        console.log("In getResources");
        console.log(paramsObject);
    },
    getDependencies  : function (paramsObject ){ 
        console.log("In getDependencies");
        console.log(paramsObject);
    },
    beforeModel  : function (paramsObject ){ 
        console.log("In beforeModel");
        console.log(paramsObject);
    },
    model  : function (paramsObject ){ 
        console.log("In model");
        console.log(paramsObject);
        return {name:paramsObject.dynamicParam}
    },
    afterModel  : function (model, paramsObject ){
        console.log("In afterModel"); 
        console.log(model);
        this.currentModel.name = this.currentModel.name.toUpperCase();
        console.log(paramsObject);
    },
    redirect  : function (model, paramsObject ){ 
        if(paramsObject.dynamicParam=="anonymous"){
            Lyte.Router.transitionTo("home");
        }
        console.log("In redirect");
        console.log(model);
        console.log(paramsObject);
    },
    renderTemplate  : function (model, paramsObject ){ 
        console.log("In renderTemplate");
        console.log(model);
        console.log(paramsObject);
        return {outlet:"#outlet", component:"user-portal"}
    },
    afterRender  : function (model, paramsObject ){ 
        console.log("In afterRender");
        console.log(model);
        console.log(paramsObject);
        this.setTitle("User Portal");
    },
    beforeExit  : function (model, paramsObject ){ 
        console.log("In beforeExit");
        console.log(model);
        console.log(paramsObject);
    },
    didDestroy  : function (model, paramsObject ){ 
        console.log("In didDestroy");
        console.log(model);
        console.log(paramsObject);
    },
    actions  : { 
        onBeforeLoad  : function (paramsObject ){ 
            console.log("In onBeforeLoad");
            console.log(paramsObject);
        },
        onError  : function (error, pausedTrans, paramsObject ){
            console.log("In onError"); 
            console.log(error);
            console.log(pausedTrans);
            console.log(paramsObject);
        },
        willTransition  : function (transition ){ 
            console.log("In willTransition");
            console.log(transition);
        },
        didTransition  : function (paramsObject ){ 
            console.log("In didTransition");
            console.log(paramsObject);
        },
    }
});
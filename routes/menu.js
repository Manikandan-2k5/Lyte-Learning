Lyte.Router.registerRoute("menu",{
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
    },
    afterModel  : function (model, paramsObject ){
        console.log("In afterModel"); 
        console.log(model);
        console.log(paramsObject);
    },
    redirect  : function (model, paramsObject ){ 
        console.log("In redirect");
        console.log(model);
        console.log(paramsObject);
    },
    renderTemplate  : function (model, paramsObject ){ 
        console.log("In renderTemplate");
        console.log(model);
        console.log(paramsObject);
    },
    afterRender  : function (model, paramsObject ){ 
        console.log("In afterRender");
        console.log(model);
        console.log(paramsObject);
        this.setTitle("Home Portal");
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
            let pausedTrans = transition.pause();
            console.log("In willTransition");
            console.log(transition);    
            let choice = confirm("Are you sure to leave ?");
            if(!choice){
                pausedTrans.abort();
            }
            else{
                pausedTrans.resume();
            }
        },
        didTransition  : function (paramsObject ){ 
            console.log("In didTransition");
            console.log(paramsObject);
        },
    }
});

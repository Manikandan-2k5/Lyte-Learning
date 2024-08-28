Lyte.Router.registerRoute("home.form",{
	getResources  : function (paramsObject ){ 
        return [
            "/addons/@zoho/lyte-ui-component/dist/components/lyte-number.js",
            "/addons/@zoho/lyte-ui-component/dist/theme/compiledCSS/default/ltr/lyte-ui-number.css",
        ];
    },
    getDependencies  : function (paramsObject ){ 
            /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
    },
    beforeModel  : function (paramsObject ){ 
            /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
    },
    model  : function (paramsObject ){ 
            /* Initiate data request that are necessary for the current page. */
    },
    afterModel  : function (model, paramsObject ){ 
            /* Manipulating data before returning data to component. */
    },
    redirect  : function (model, paramsObject ){ 
            /* Redirections based on data fetched. */
    },
    renderTemplate  : function (model, paramsObject ){ 
            return {component:"user-form", outlet:"#outlet"}
    },
    afterRender  : function (model, paramsObject ){ 
            /* Post processing of rendered page. */
    },
    beforeExit  : function (model, paramsObject ){ 
            /* Will be invoked before a route is removed from view. */
    },
    didDestroy  : function (model, paramsObject ){ 
            /* Will be invoked when a route is completly destroyed(remove residues of route. eg: file cache removal). */
    },
    actions  : { 
           onBeforeLoad  : function (paramsObject ){ 
                    /* Triggered once route transition starts. */
            },
           onError  : function (error, pausedTrans, paramsObject ){ 
                    /* Triggered by error on file load or on data request. */
            },
           willTransition  : function (transition ){ 
                    /* Triggered before a transition is going to change. */
            },
           didTransition  : function (paramsObject ){ 
                    /* Triggered after completion of transition. */
            },
}
});

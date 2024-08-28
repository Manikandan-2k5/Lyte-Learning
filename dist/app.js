Lyte.Router.configureDefaults({baseURL:'',history : "html5"});

Lyte.Router.configureRoutes(function(){
	this.route('index',{path:'/'});
	this.route("home",{ path :"/home"},function(){
		this.route("user",{path :"/:name"});
		this.route("form",{path :"/form"});
	});
	this.route("menu",{ path :"/menu"});
});

Lyte.Router.beforeRouteTransition = function() {
	//console.log('before Route Change');
}

Lyte.Router.afterRouteTransition = function() {
	//console.log('after Route Change');
}


Lyte.Router.registerRoute("home",{
    getResources  : function (paramsObject ){ 
        return [
            "/addons/@zoho/lyte-ui-component/dist/components/lyte-input.js",
            "/addons/@zoho/lyte-ui-component/dist/components/lyte-button.js",
            "/addons/@zoho/lyte-ui-component/dist/theme/compiledCSS/default/ltr/lyte-ui-input.css",
            "/addons/@zoho/lyte-ui-component/dist/theme/compiledCSS/default/ltr/lyte-ui-button.css",
       ];
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
        return {outlet:"#outlet", component:"home-portal"}
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

Lyte.Router.registerRoute('index',{
// 	getResources  : function (paramsObject ){ 
//         /* View related files should be returned as resources(HTML, CSS, components etc). It will be available before 'renderTemplate' hook. */
// },
// getDependencies  : function (paramsObject ){ 
//         /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
// },
// beforeModel  : function (paramsObject ){ 
//         /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
// },
	model : function()	{
		return {
			features : [
				{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
				{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
				{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
				{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
			]
		}
				
	},
// afterModel  : function (model, paramsObject ){ 
//         /* Manipulating data before returning data to component. */
// },
// redirect  : function (model, paramsObject ){ 
//         /* Redirections based on data fetched. */
// },
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "welcome-comp"}
	}
// afterRender  : function (model, paramsObject ){ 
//         /* Post processing of rendered page. */
// },
// beforeExit  : function (model, paramsObject ){ 
//         /* Will be invoked before a route is removed from view. */
// },
// didDestroy  : function (model, paramsObject ){ 
//         /* Will be invoked when a route is completly destroyed(remove residues of route. eg: file cache removal). */
// },
// actions  : { 
//        onBeforeLoad  : function (paramsObject ){ 
//                 /* Triggered once route transition starts. */
//         },
//        onError  : function (error, pausedTrans, paramsObject ){ 
//                 /* Triggered by error on file load or on data request. */
//         },
//        willTransition  : function (transition ){ 
//                 /* Triggered before a transition is going to change. */
//         },
//        didTransition  : function (paramsObject ){ 
//                 /* Triggered after completion of transition. */
//         },
// }	
});

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
Lyte.Component.register("home-portal", {
_template:"<template tag-name=\"home-portal\"> <h1>Hello All. Lyte-Test</h1> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Enter your name\" lt-prop-value=\"{{lbind(personName)}}\"> </lyte-input> <lyte-button lt-prop-appearance=\"primary\" __click=\"{{action('routeTransition')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Go to your Website </template> </lyte-button> <template is=\"component\" component-name=\"menu-portal\"></template> </template>",
_dynamicNodes : [{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5]},{"type":"component","position":[7],"dynamicNodes":[]}],
_observedAttributes :["personName"],

	data : function(){
		return {
			personName:Lyte.attr("string")
		}		
	},
	actions : {
		routeTransition:function(){
			console.log("Hello");
			if(this.getData("personName")==undefined || this.getData("personName")==""){
				Lyte.Router.transitionTo("home.user", "anonymous")
			}
			else{	
				Lyte.Router.transitionTo("home.user", this.getData("personName"));
			}
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

Lyte.Component.register("menu-portal", {
_template:"<template tag-name=\"menu-portal\"> <lyte-yield yield-name=\"menu-list\" icon-element=\"{{icon}}\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}],
_observedAttributes :["icon"],

	data : function(){
		return {
			icon:Lyte.attr("string", {default:"☰"})
		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

Lyte.Component.register("user-label", {
_template:"<template tag-name=\"user-label\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div style=\"display:flex; width:300px; height:25px; justify-content:space-around; border:1px solid black; margin:0.3rem;\"> <p style=\"margin:0.4rem; background-color: black; border:1px solid black; width:100px; height:12.5px;\"></p> <p style=\"margin:0.4rem; background-color: black; border:1px solid black; width:100px; height:12.5px;\"></p> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div style=\"display:flex; width:300px; height:25px; justify-content:space-around; border:1px solid black; margin:0.3rem;\"> <p style=\"margin:0.4rem; border:1px solid black; width:100px; height:12.5px; line-height:12.5px; text-align:center;\">{{userName}}</p> <p style=\"margin:0.4rem; border:1px solid black; width:100px; height:12.5px; line-height:12.5px; text-align:center;\">{{userId}}</p> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}},"default":{}}],
_observedAttributes :["userName","userId","lyteViewPort"],

	data : function(){
		return {
			userName:Lyte.attr("string"),
			userId:Lyte.attr("number"),
			lyteViewPort : Lyte.attr("boolean")
		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

Lyte.Component.register("user-portal", {
_template:"<template tag-name=\"user-portal\"> <template is=\"if\" value=\"{{if(expHandlers(name,'==','MANIKANDAN'),true,false)}}\"><template case=\"true\"><h1>Hi {{name}}</h1></template><template case=\"false\"><h1>Bye Bye</h1></template></template> <link-to lt-prop-route=\"home\"> <span>Home</span> </link-to> Hi {{name}} <div>{{unescape(htmlContent)}}</div> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Change your name\" lt-prop-value=\"{{lbind(name)}}\"> </lyte-input> <menu-portal> <template is=\"yield\" yield-name=\"menu-list\"> <ol> <template items=\"{{operations}}\" item=\"item\" index=\"index\" is=\"for\"><li> <lyte-button __click=\"{{action('menu',item)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{item}} {{iconElement}}</template> </lyte-button> </li></template> </ol> </template> </menu-portal> <lyte-button __click=\"{{action('changeArray')}}\"> <template is=\"registerYield\" yield-name=\"text\">Change Array</template> </lyte-button> <lyte-input lt-prop-appearance=\"box\" lt-prop-placeholder=\"Change your phone_no\" lt-prop-value=\"{{lbind(details.personal_info.phone_number)}}\"> </lyte-input> <div style=\"margin:1rem; display:flex; flex-direction:column; overflow:scroll; justify-content: space-around; align-items:center; width:400px; height:1000px; border:1px solid black;\"> <template items=\"{{usersLabel}}\" item=\"item\" index=\"index\" is=\"for\"><user-label lyte-view-port=\"true\" user-name=\"{{item.userName}}\" user-id=\"{{item.userId}}\"></user-label></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"text","position":[5]},{"type":"text","position":[7,0]},{"type":"attr","position":[9]},{"type":"componentDynamic","position":[9]},{"type":"registerYield","position":[11,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"text","position":[0]},{"type":"text","position":[2]}]},{"type":"componentDynamic","position":[0,1]}]}]},{"type":"componentDynamic","position":[11]},{"type":"attr","position":[13]},{"type":"registerYield","position":[13,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[13]},{"type":"attr","position":[15]},{"type":"componentDynamic","position":[15]},{"type":"attr","position":[17,1]},{"type":"for","position":[17,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}],
_observedAttributes :["name","htmlContent","operations","details","usersLabel"],

	data : function(){
		return {
			name:Lyte.attr("string", {default:"User"}),
			htmlContent:Lyte.attr("string", {default:"<p>Hi I'm from Chennai.</p>"}),
			operations:Lyte.attr("array", {default:["Logout", "Search"]}),
			details:Lyte.attr("object", {default:{age:18, personal_info:{phone_number:8610045338, location:{country:{name:"India", continent:"Asia"}, code:91}}, gender:"male"}}),
			usersLabel:Lyte.attr("array", 
				{
					default:[
						{"userName": "User1", "userId": 1},
    					{"userName": "User2", "userId": 2},
    					{"userName": "User3", "userId": 3},
    					{"userName": "User4", "userId": 4},
    					{"userName": "User5", "userId": 5},
    					{"userName": "User6", "userId": 6},
    					{"userName": "User7", "userId": 7},
    					{"userName": "User8", "userId": 8},
    					{"userName": "User9", "userId": 9},
    					{"userName": "User10", "userId": 10},
    					{"userName": "User11", "userId": 11},
    					{"userName": "User12", "userId": 12},
    					{"userName": "User13", "userId": 13},
    					{"userName": "User14", "userId": 14},
    					{"userName": "User15", "userId": 15},
    					{"userName": "User16", "userId": 16},
    					{"userName": "User17", "userId": 17},
    					{"userName": "User18", "userId": 18},
    					{"userName": "User19", "userId": 19},
    					{"userName": "User20", "userId": 20},
    					{"userName": "User21", "userId": 21},
    					{"userName": "User22", "userId": 22},
    					{"userName": "User23", "userId": 23},
    					{"userName": "User24", "userId": 24},
    					{"userName": "User25", "userId": 25},
    					{"userName": "User26", "userId": 26},
    					{"userName": "User27", "userId": 27},
    					{"userName": "User28", "userId": 28},
    					{"userName": "User29", "userId": 29},
    					{"userName": "User30", "userId": 30},
    					{"userName": "User31", "userId": 31},
    					{"userName": "User32", "userId": 32},
    					{"userName": "User33", "userId": 33},
    					{"userName": "User34", "userId": 34},
    					{"userName": "User35", "userId": 35},
    					{"userName": "User36", "userId": 36},
    					{"userName": "User37", "userId": 37},
    					{"userName": "User38", "userId": 38},
    					{"userName": "User39", "userId": 39},
    					{"userName": "User40", "userId": 40},
    					{"userName": "User41", "userId": 41},
    					{"userName": "User42", "userId": 42},
    					{"userName": "User43", "userId": 43},
    					{"userName": "User44", "userId": 44},
    					{"userName": "User45", "userId": 45},
    					{"userName": "User46", "userId": 46},
    					{"userName": "User47", "userId": 47},
    					{"userName": "User48", "userId": 48},
    					{"userName": "User49", "userId": 49},
    					{"userName": "User50", "userId": 50},
    					{"userName": "User51", "userId": 51},
    					{"userName": "User52", "userId": 52},
    					{"userName": "User53", "userId": 53},
    					{"userName": "User54", "userId": 54},
    					{"userName": "User55", "userId": 55},
    					{"userName": "User56", "userId": 56},
    					{"userName": "User57", "userId": 57},
    					{"userName": "User58", "userId": 58},
    					{"userName": "User59", "userId": 59},
    					{"userName": "User60", "userId": 60},
    					{"userName": "User61", "userId": 61},
    					{"userName": "User62", "userId": 62},
    					{"userName": "User63", "userId": 63},
    					{"userName": "User64", "userId": 64},
    					{"userName": "User65", "userId": 65},
    					{"userName": "User66", "userId": 66},
    					{"userName": "User67", "userId": 67},
    					{"userName": "User68", "userId": 68},
    					{"userName": "User69", "userId": 69},
    					{"userName": "User70", "userId": 70},
    					{"userName": "User71", "userId": 71},
    					{"userName": "User72", "userId": 72},
    					{"userName": "User73", "userId": 73},
    					{"userName": "User74", "userId": 74},
    					{"userName": "User75", "userId": 75},
    					{"userName": "User76", "userId": 76},
    					{"userName": "User77", "userId": 77},
    					{"userName": "User78", "userId": 78},
    					{"userName": "User79", "userId": 79},
    					{"userName": "User80", "userId": 80},
    					{"userName": "User81", "userId": 81},
    					{"userName": "User82", "userId": 82},
    					{"userName": "User83", "userId": 83},
    					{"userName": "User84", "userId": 84},
    					{"userName": "User85", "userId": 85},
    					{"userName": "User86", "userId": 86},
    					{"userName": "User87", "userId": 87},
    					{"userName": "User88", "userId": 88},
    					{"userName": "User89", "userId": 89},
    					{"userName": "User90", "userId": 90},
    					{"userName": "User91", "userId": 91},
    					{"userName": "User92", "userId": 92},
    					{"userName": "User93", "userId": 93},
    					{"userName": "User94", "userId": 94},
    					{"userName": "User95", "userId": 95},
    					{"userName": "User96", "userId": 96},
    					{"userName": "User97", "userId": 97},
    					{"userName": "User98", "userId": 98},
    					{"userName": "User99", "userId": 99},
    					{"userName": "User100", "userId": 100},
    					{"userName": "User101", "userId": 101},
    					{"userName": "User102", "userId": 102},
    					{"userName": "User103", "userId": 103},
    					{"userName": "User104", "userId": 104},
    					{"userName": "User105", "userId": 105},
    					{"userName": "User106", "userId": 106},
    					{"userName": "User107", "userId": 107},
    					{"userName": "User108", "userId": 108},
    					{"userName": "User109", "userId": 109},
    					{"userName": "User110", "userId": 110},
    					{"userName": "User111", "userId": 111},
    					{"userName": "User112", "userId": 112},
    					{"userName": "User113", "userId": 113},
    					{"userName": "User114", "userId": 114},
    					{"userName": "User115", "userId": 115},
    					{"userName": "User116", "userId": 116},
    					{"userName": "User117", "userId": 117},
    					{"userName": "User118", "userId": 118},
    					{"userName": "User119", "userId": 119},
    					{"userName": "User120", "userId": 120},
    					{"userName": "User121", "userId": 121},
    					{"userName": "User122", "userId": 122},
    					{"userName": "User123", "userId": 123},
    					{"userName": "User124", "userId": 124},
    					{"userName": "User125", "userId": 125},
    					{"userName": "User126", "userId": 126},
    					{"userName": "User127", "userId": 127},
    					{"userName": "User128", "userId": 128},
    					{"userName": "User129", "userId": 129},
    					{"userName": "User130", "userId": 130},
    					{"userName": "User131", "userId": 131},
    					{"userName": "User132", "userId": 132},
    					{"userName": "User133", "userId": 133},
    					{"userName": "User134", "userId": 134},
    					{"userName": "User135", "userId": 135},
    					{"userName": "User136", "userId": 136},
    					{"userName": "User137", "userId": 137},
    					{"userName": "User138", "userId": 138},
    					{"userName": "User139", "userId": 139},
    					{"userName": "User140", "userId": 140},
    					{"userName": "User141", "userId": 141},
    					{"userName": "User142", "userId": 142},
    					{"userName": "User143", "userId": 143},
    					{"userName": "User144", "userId": 144},
    					{"userName": "User145", "userId": 145},
    					{"userName": "User146", "userId": 146},
    					{"userName": "User147", "userId": 147},
    					{"userName": "User148", "userId": 148},
    					{"userName": "User149", "userId": 149},
    					{"userName": "User150", "userId": 150},
    					{"userName": "User151", "userId": 151},
    					{"userName": "User152", "userId": 152},
    					{"userName": "User153", "userId": 153},
    					{"userName": "User154", "userId": 154},
    					{"userName": "User155", "userId": 155},
    					{"userName": "User156", "userId": 156},
    					{"userName": "User157", "userId": 157},
    					{"userName": "User158", "userId": 158},
    					{"userName": "User159", "userId": 159},
    					{"userName": "User160", "userId": 160},
    					{"userName": "User161", "userId": 161},
    					{"userName": "User162", "userId": 162},
    					{"userName": "User163", "userId": 163},
    					{"userName": "User164", "userId": 164},
    					{"userName": "User165", "userId": 165},
    					{"userName": "User166", "userId": 166},
    					{"userName": "User167", "userId": 167},
    					{"userName": "User168", "userId": 168},
    					{"userName": "User169", "userId": 169},
    					{"userName": "User170", "userId": 170},
    					{"userName": "User171", "userId": 171},
    					{"userName": "User172", "userId": 172},
    					{"userName": "User173", "userId": 173},
    					{"userName": "User174", "userId": 174},
    					{"userName": "User175", "userId": 175},
    					{"userName": "User176", "userId": 176},
    					{"userName": "User177", "userId": 177},
    					{"userName": "User178", "userId": 178},
    					{"userName": "User179", "userId": 179},
    					{"userName": "User180", "userId": 180},
    					{"userName": "User181", "userId": 181},
    					{"userName": "User182", "userId": 182},
    					{"userName": "User183", "userId": 183},
    					{"userName": "User184", "userId": 184},
    					{"userName": "User185", "userId": 185},
    					{"userName": "User186", "userId": 186},
    					{"userName": "User187", "userId": 187},
    					{"userName": "User188", "userId": 188},
    					{"userName": "User189", "userId": 189},
    					{"userName": "User190", "userId": 190},
    					{"userName": "User191", "userId": 191},
    					{"userName": "User192", "userId": 192},
    					{"userName": "User193", "userId": 193},
    					{"userName": "User194", "userId": 194},
    					{"userName": "User195", "userId": 195},
    					{"userName": "User196", "userId": 196},
    					{"userName": "User197", "userId": 197},
    					{"userName": "User198", "userId": 198},
    					{"userName": "User199", "userId": 199},
    					{"userName": "User200", "userId": 200},
    					{"userName": "User201", "userId": 201},
    					{"userName": "User202", "userId": 202},
    					{"userName": "User203", "userId": 203},
    					{"userName": "User204", "userId": 204},
    					{"userName": "User205", "userId": 205},
    					{"userName": "User206", "userId": 206},
    					{"userName": "User207", "userId": 207},
    					{"userName": "User208", "userId": 208},
    					{"userName": "User209", "userId": 209},
    					{"userName": "User210", "userId": 210},
    					{"userName": "User211", "userId": 211},
    					{"userName": "User212", "userId": 212},
    					{"userName": "User213", "userId": 213},
    					{"userName": "User214", "userId": 214},
    					{"userName": "User215", "userId": 215},
    					{"userName": "User216", "userId": 216},
    					{"userName": "User217", "userId": 217},
    					{"userName": "User218", "userId": 218},
    					{"userName": "User219", "userId": 219},
    					{"userName": "User220", "userId": 220},
    					{"userName": "User221", "userId": 221},
    					{"userName": "User222", "userId": 222},
    					{"userName": "User223", "userId": 223},
    					{"userName": "User224", "userId": 224},
    					{"userName": "User225", "userId": 225},
    					{"userName": "User226", "userId": 226},
    					{"userName": "User227", "userId": 227},
    					{"userName": "User228", "userId": 228},
    					{"userName": "User229", "userId": 229},
    					{"userName": "User230", "userId": 230},
    					{"userName": "User231", "userId": 231},
    					{"userName": "User232", "userId": 232},
    					{"userName": "User233", "userId": 233},
    					{"userName": "User234", "userId": 234},
    					{"userName": "User235", "userId": 235},
    					{"userName": "User236", "userId": 236},
    					{"userName": "User237", "userId": 237},
    					{"userName": "User238", "userId": 238},
    					{"userName": "User239", "userId": 239},
    					{"userName": "User240", "userId": 240},
    					{"userName": "User241", "userId": 241},
    					{"userName": "User242", "userId": 242},
    					{"userName": "User243", "userId": 243},
    					{"userName": "User244", "userId": 244},
    					{"userName": "User245", "userId": 245},
    					{"userName": "User246", "userId": 246},
    					{"userName": "User247", "userId": 247},
    					{"userName": "User248", "userId": 248},
    					{"userName": "User249", "userId": 249},
    					{"userName": "User250", "userId": 250},
    					{"userName": "User251", "userId": 251},
    					{"userName": "User252", "userId": 252},
    					{"userName": "User253", "userId": 253},
    					{"userName": "User254", "userId": 254},
    					{"userName": "User255", "userId": 255},
    					{"userName": "User256", "userId": 256},
    					{"userName": "User257", "userId": 257},
    					{"userName": "User258", "userId": 258},
    					{"userName": "User259", "userId": 259},
    					{"userName": "User260", "userId": 260},
    					{"userName": "User261", "userId": 261},
    					{"userName": "User262", "userId": 262},
    					{"userName": "User263", "userId": 263},
    					{"userName": "User264", "userId": 264},
    					{"userName": "User265", "userId": 265},
    					{"userName": "User266", "userId": 266},
    					{"userName": "User267", "userId": 267},
    					{"userName": "User268", "userId": 268},
    					{"userName": "User269", "userId": 269},
    					{"userName": "User270", "userId": 270},
    					{"userName": "User271", "userId": 271},
    					{"userName": "User272", "userId": 272},
    					{"userName": "User273", "userId": 273},
    					{"userName": "User274", "userId": 274},
    					{"userName": "User275", "userId": 275},
    					{"userName": "User276", "userId": 276},
    					{"userName": "User277", "userId": 277},
    					{"userName": "User278", "userId": 278},
    					{"userName": "User279", "userId": 279},
    					{"userName": "User280", "userId": 280},
    					{"userName": "User281", "userId": 281},
    					{"userName": "User282", "userId": 282},
    					{"userName": "User283", "userId": 283},
    					{"userName": "User284", "userId": 284},
    					{"userName": "User285", "userId": 285},
    					{"userName": "User286", "userId": 286},
    					{"userName": "User287", "userId": 287},
    					{"userName": "User288", "userId": 288},
    					{"userName": "User289", "userId": 289},
    					{"userName": "User290", "userId": 290},
    					{"userName": "User291", "userId": 291},
    					{"userName": "User292", "userId": 292},
    					{"userName": "User293", "userId": 293},
    					{"userName": "User294", "userId": 294},
    					{"userName": "User295", "userId": 295},
    					{"userName": "User296", "userId": 296},
    					{"userName": "User297", "userId": 297},
    					{"userName": "User298", "userId": 298},
    					{"userName": "User299", "userId": 299},
    					{"userName": "User300", "userId": 300},
    					{"userName": "User301", "userId": 301},
    					{"userName": "User302", "userId": 302},
    					{"userName": "User303", "userId": 303},
    					{"userName": "User304", "userId": 304},
    					{"userName": "User305", "userId": 305},
    					{"userName": "User306", "userId": 306},
    					{"userName": "User307", "userId": 307},
    					{"userName": "User308", "userId": 308},
    					{"userName": "User309", "userId": 309},
    					{"userName": "User310", "userId": 310},
    					{"userName": "User311", "userId": 311},
    					{"userName": "User312", "userId": 312},
    					{"userName": "User313", "userId": 313},
    					{"userName": "User314", "userId": 314},
    					{"userName": "User315", "userId": 315},
    					{"userName": "User316", "userId": 316},
    					{"userName": "User317", "userId": 317},
    					{"userName": "User318", "userId": 318},
    					{"userName": "User319", "userId": 319},
    					{"userName": "User320", "userId": 320},
    					{"userName": "User321", "userId": 321},
    					{"userName": "User322", "userId": 322},
    					{"userName": "User323", "userId": 323},
    					{"userName": "User324", "userId": 324},
    					{"userName": "User325", "userId": 325},
    					{"userName": "User326", "userId": 326},
    					{"userName": "User327", "userId": 327},
    					{"userName": "User328", "userId": 328},
    					{"userName": "User329", "userId": 329},
    					{"userName": "User330", "userId": 330},
    					{"userName": "User331", "userId": 331},
    					{"userName": "User332", "userId": 332},
    					{"userName": "User333", "userId": 333},
    					{"userName": "User334", "userId": 334},
    					{"userName": "User335", "userId": 335},
    					{"userName": "User336", "userId": 336},
    					{"userName": "User337", "userId": 337},
    					{"userName": "User338", "userId": 338},
    					{"userName": "User339", "userId": 339},
    					{"userName": "User340", "userId": 340},
    					{"userName": "User341", "userId": 341},
    					{"userName": "User342", "userId": 342},
    					{"userName": "User343", "userId": 343},
    					{"userName": "User344", "userId": 344},
    					{"userName": "User345", "userId": 345},
    					{"userName": "User346", "userId": 346},
    					{"userName": "User347", "userId": 347},
    					{"userName": "User348", "userId": 348},
    					{"userName": "User349", "userId": 349},
    					{"userName": "User350", "userId": 350},
    					{"userName": "User351", "userId": 351},
    					{"userName": "User352", "userId": 352},
    					{"userName": "User353", "userId": 353},
    					{"userName": "User354", "userId": 354},
    					{"userName": "User355", "userId": 355},
    					{"userName": "User356", "userId": 356},
    					{"userName": "User357", "userId": 357},
    					{"userName": "User358", "userId": 358},
    					{"userName": "User359", "userId": 359},
    					{"userName": "User360", "userId": 360},
    					{"userName": "User361", "userId": 361},
    					{"userName": "User362", "userId": 362},
    					{"userName": "User363", "userId": 363},
    					{"userName": "User364", "userId": 364},
    					{"userName": "User365", "userId": 365},
    					{"userName": "User366", "userId": 366},
    					{"userName": "User367", "userId": 367},
    					{"userName": "User368", "userId": 368},
    					{"userName": "User369", "userId": 369},
    					{"userName": "User370", "userId": 370},
    					{"userName": "User371", "userId": 371},
    					{"userName": "User372", "userId": 372},
    					{"userName": "User373", "userId": 373},
    					{"userName": "User374", "userId": 374},
    					{"userName": "User375", "userId": 375},
    					{"userName": "User376", "userId": 376},
    					{"userName": "User377", "userId": 377},
    					{"userName": "User378", "userId": 378},
    					{"userName": "User379", "userId": 379},
    					{"userName": "User380", "userId": 380},
    					{"userName": "User381", "userId": 381},
    					{"userName": "User382", "userId": 382},
    					{"userName": "User383", "userId": 383},
    					{"userName": "User384", "userId": 384},
    					{"userName": "User385", "userId": 385},
    					{"userName": "User386", "userId": 386},
    					{"userName": "User387", "userId": 387},
    					{"userName": "User388", "userId": 388},
    					{"userName": "User389", "userId": 389},
    					{"userName": "User390", "userId": 390},
    					{"userName": "User391", "userId": 391},
    					{"userName": "User392", "userId": 392},
    					{"userName": "User393", "userId": 393},
    					{"userName": "User394", "userId": 394},
    					{"userName": "User395", "userId": 395},
    					{"userName": "User396", "userId": 396},
    					{"userName": "User397", "userId": 397},
    					{"userName": "User398", "userId": 398},
    					{"userName": "User399", "userId": 399},
    					{"userName": "User400", "userId": 400},
    					{"userName": "User401", "userId": 401},
    					{"userName": "User402", "userId": 402},
    					{"userName": "User403", "userId": 403},
    					{"userName": "User404", "userId": 404},
    					{"userName": "User405", "userId": 405},
    					{"userName": "User406", "userId": 406},
    					{"userName": "User407", "userId": 407},
    					{"userName": "User408", "userId": 408},
    					{"userName": "User409", "userId": 409},
    					{"userName": "User410", "userId": 410},
    					{"userName": "User411", "userId": 411},
    					{"userName": "User412", "userId": 412},
    					{"userName": "User413", "userId": 413},
    					{"userName": "User414", "userId": 414},
    					{"userName": "User415", "userId": 415},
    					{"userName": "User416", "userId": 416},
    					{"userName": "User417", "userId": 417},
    					{"userName": "User418", "userId": 418},
    					{"userName": "User419", "userId": 419},
    					{"userName": "User420", "userId": 420},
    					{"userName": "User421", "userId": 421},
    					{"userName": "User422", "userId": 422},
    					{"userName": "User423", "userId": 423},
    					{"userName": "User424", "userId": 424},
    					{"userName": "User425", "userId": 425},
    					{"userName": "User426", "userId": 426},
    					{"userName": "User427", "userId": 427},
    					{"userName": "User428", "userId": 428},
    					{"userName": "User429", "userId": 429},
    					{"userName": "User430", "userId": 430},
    					{"userName": "User431", "userId": 431},
    					{"userName": "User432", "userId": 432},
    					{"userName": "User433", "userId": 433},
    					{"userName": "User434", "userId": 434},
    					{"userName": "User435", "userId": 435},
    					{"userName": "User436", "userId": 436},
    					{"userName": "User437", "userId": 437},
    					{"userName": "User438", "userId": 438},
    					{"userName": "User439", "userId": 439},
    					{"userName": "User440", "userId": 440},
    					{"userName": "User441", "userId": 441},
    					{"userName": "User442", "userId": 442},
    					{"userName": "User443", "userId": 443},
    					{"userName": "User444", "userId": 444},
    					{"userName": "User445", "userId": 445},
    					{"userName": "User446", "userId": 446},
    					{"userName": "User447", "userId": 447},
    					{"userName": "User448", "userId": 448},
    					{"userName": "User449", "userId": 449},
    					{"userName": "User450", "userId": 450},
    					{"userName": "User451", "userId": 451},
    					{"userName": "User452", "userId": 452},
    					{"userName": "User453", "userId": 453},
    					{"userName": "User454", "userId": 454},
    					{"userName": "User455", "userId": 455},
    					{"userName": "User456", "userId": 456},
    					{"userName": "User457", "userId": 457},
    					{"userName": "User458", "userId": 458},
    					{"userName": "User459", "userId": 459},
    					{"userName": "User460", "userId": 460},
    					{"userName": "User461", "userId": 461},
    					{"userName": "User462", "userId": 462},
    					{"userName": "User463", "userId": 463},
    					{"userName": "User464", "userId": 464},
    					{"userName": "User465", "userId": 465},
    					{"userName": "User466", "userId": 466},
    					{"userName": "User467", "userId": 467},
    					{"userName": "User468", "userId": 468},
    					{"userName": "User469", "userId": 469},
    					{"userName": "User470", "userId": 470},
    					{"userName": "User471", "userId": 471},
    					{"userName": "User472", "userId": 472},
    					{"userName": "User473", "userId": 473},
    					{"userName": "User474", "userId": 474},
    					{"userName": "User475", "userId": 475},
    					{"userName": "User476", "userId": 476},
    					{"userName": "User477", "userId": 477},
    					{"userName": "User478", "userId": 478},
    					{"userName": "User479", "userId": 479},
    					{"userName": "User480", "userId": 480},
    					{"userName": "User481", "userId": 481},
    					{"userName": "User482", "userId": 482},
    					{"userName": "User483", "userId": 483},
    					{"userName": "User484", "userId": 484},
    					{"userName": "User485", "userId": 485},
    					{"userName": "User486", "userId": 486},
    					{"userName": "User487", "userId": 487},
    					{"userName": "User488", "userId": 488},
    					{"userName": "User489", "userId": 489},
    					{"userName": "User490", "userId": 490},
    					{"userName": "User491", "userId": 491},
    					{"userName": "User492", "userId": 492},
    					{"userName": "User493", "userId": 493},
    					{"userName": "User494", "userId": 494},
    					{"userName": "User495", "userId": 495},
    					{"userName": "User496", "userId": 496},
    					{"userName": "User497", "userId": 497},
    					{"userName": "User498", "userId": 498},
    					{"userName": "User499", "userId": 499},
    					{"userName": "User500", "userId": 500},
						{"userName": "User501", "userId": 501},
    					{"userName": "User502", "userId": 502},
    					{"userName": "User503", "userId": 503},
    					{"userName": "User504", "userId": 504},
    					{"userName": "User505", "userId": 505},
    					{"userName": "User506", "userId": 506},
    					{"userName": "User507", "userId": 507},
    					{"userName": "User508", "userId": 508},
    					{"userName": "User509", "userId": 509},
    					{"userName": "User510", "userId": 510},
    					{"userName": "User511", "userId": 511},
    					{"userName": "User512", "userId": 512},
    					{"userName": "User513", "userId": 513},
    					{"userName": "User514", "userId": 514},
    					{"userName": "User515", "userId": 515},
    					{"userName": "User516", "userId": 516},
    					{"userName": "User517", "userId": 517},
    					{"userName": "User518", "userId": 518},
    					{"userName": "User519", "userId": 519},
    					{"userName": "User520", "userId": 520},
    					{"userName": "User521", "userId": 521},
    					{"userName": "User522", "userId": 522},
    					{"userName": "User523", "userId": 523},
    					{"userName": "User524", "userId": 524},
    					{"userName": "User525", "userId": 525},
    					{"userName": "User526", "userId": 526},
    					{"userName": "User527", "userId": 527},
    					{"userName": "User528", "userId": 528},
    					{"userName": "User529", "userId": 529},
    					{"userName": "User530", "userId": 530},
    					{"userName": "User531", "userId": 531},
    					{"userName": "User532", "userId": 532},
    					{"userName": "User533", "userId": 533},
    					{"userName": "User534", "userId": 534},
    					{"userName": "User535", "userId": 535},
    					{"userName": "User536", "userId": 536},
    					{"userName": "User537", "userId": 537},
    					{"userName": "User538", "userId": 538},
    					{"userName": "User539", "userId": 539},
    					{"userName": "User540", "userId": 540},
    					{"userName": "User541", "userId": 541},
    					{"userName": "User542", "userId": 542},
    					{"userName": "User543", "userId": 543},
    					{"userName": "User544", "userId": 544},
    					{"userName": "User545", "userId": 545},
    					{"userName": "User546", "userId": 546},
    					{"userName": "User547", "userId": 547},
    					{"userName": "User548", "userId": 548},
    					{"userName": "User549", "userId": 549},
    					{"userName": "User550", "userId": 550},
    					{"userName": "User551", "userId": 551},
    					{"userName": "User552", "userId": 552},
    					{"userName": "User553", "userId": 553},
    					{"userName": "User554", "userId": 554},
    					{"userName": "User555", "userId": 555},
    					{"userName": "User556", "userId": 556},
    					{"userName": "User557", "userId": 557},
    					{"userName": "User558", "userId": 558},
    					{"userName": "User559", "userId": 559},
    					{"userName": "User560", "userId": 560},
    					{"userName": "User561", "userId": 561},
    					{"userName": "User562", "userId": 562},
    					{"userName": "User563", "userId": 563},
    					{"userName": "User564", "userId": 564},
    					{"userName": "User565", "userId": 565},
    					{"userName": "User566", "userId": 566},
    					{"userName": "User567", "userId": 567},
    					{"userName": "User568", "userId": 568},
    					{"userName": "User569", "userId": 569},
    					{"userName": "User570", "userId": 570},
    					{"userName": "User571", "userId": 571},
    					{"userName": "User572", "userId": 572},
    					{"userName": "User573", "userId": 573},
    					{"userName": "User574", "userId": 574},
    					{"userName": "User575", "userId": 575},
    					{"userName": "User576", "userId": 576},
    					{"userName": "User577", "userId": 577},
    					{"userName": "User578", "userId": 578},
    					{"userName": "User579", "userId": 579},
    					{"userName": "User580", "userId": 580},
    					{"userName": "User581", "userId": 581},
    					{"userName": "User582", "userId": 582},
    					{"userName": "User583", "userId": 583},
    					{"userName": "User584", "userId": 584},
    					{"userName": "User585", "userId": 585},
    					{"userName": "User586", "userId": 586},
    					{"userName": "User587", "userId": 587},
    					{"userName": "User588", "userId": 588},
    					{"userName": "User589", "userId": 589},
    					{"userName": "User590", "userId": 590},
    					{"userName": "User591", "userId": 591},
    					{"userName": "User592", "userId": 592},
    					{"userName": "User593", "userId": 593},
    					{"userName": "User594", "userId": 594},
    					{"userName": "User595", "userId": 595},
    					{"userName": "User596", "userId": 596},
    					{"userName": "User597", "userId": 597},
    					{"userName": "User598", "userId": 598},
    					{"userName": "User599", "userId": 599},
    					{"userName": "User600", "userId": 600},
    					{"userName": "User601", "userId": 601},
    					{"userName": "User602", "userId": 602},
    					{"userName": "User603", "userId": 603},
    					{"userName": "User604", "userId": 604},
    					{"userName": "User605", "userId": 605},
    					{"userName": "User606", "userId": 606},
    					{"userName": "User607", "userId": 607},
    					{"userName": "User608", "userId": 608},
    					{"userName": "User609", "userId": 609},
    					{"userName": "User610", "userId": 610},
    					{"userName": "User611", "userId": 611},
    					{"userName": "User612", "userId": 612},
    					{"userName": "User613", "userId": 613},
    					{"userName": "User614", "userId": 614},
    					{"userName": "User615", "userId": 615},
    					{"userName": "User616", "userId": 616},
    					{"userName": "User617", "userId": 617},
    					{"userName": "User618", "userId": 618},
    					{"userName": "User619", "userId": 619},
    					{"userName": "User620", "userId": 620},
    					{"userName": "User621", "userId": 621},
    					{"userName": "User622", "userId": 622},
    					{"userName": "User623", "userId": 623},
    					{"userName": "User624", "userId": 624},
    					{"userName": "User625", "userId": 625},
    					{"userName": "User626", "userId": 626},
    					{"userName": "User627", "userId": 627},
    					{"userName": "User628", "userId": 628},
    					{"userName": "User629", "userId": 629},
    					{"userName": "User630", "userId": 630},
    					{"userName": "User631", "userId": 631},
    					{"userName": "User632", "userId": 632},
    					{"userName": "User633", "userId": 633},
    					{"userName": "User634", "userId": 634},
    					{"userName": "User635", "userId": 635},
    					{"userName": "User636", "userId": 636},
    					{"userName": "User637", "userId": 637},
    					{"userName": "User638", "userId": 638},
    					{"userName": "User639", "userId": 639},
    					{"userName": "User640", "userId": 640},
    					{"userName": "User641", "userId": 641},
    					{"userName": "User642", "userId": 642},
    					{"userName": "User643", "userId": 643},
    					{"userName": "User644", "userId": 644},
    					{"userName": "User645", "userId": 645},
    					{"userName": "User646", "userId": 646},
    					{"userName": "User647", "userId": 647},
    					{"userName": "User648", "userId": 648},
    					{"userName": "User649", "userId": 649},
    					{"userName": "User650", "userId": 650},
    					{"userName": "User651", "userId": 651},
    					{"userName": "User652", "userId": 652},
    					{"userName": "User653", "userId": 653},
    					{"userName": "User654", "userId": 654},
    					{"userName": "User655", "userId": 655},
    					{"userName": "User656", "userId": 656},
    					{"userName": "User657", "userId": 657},
    					{"userName": "User658", "userId": 658},
    					{"userName": "User659", "userId": 659},
    					{"userName": "User660", "userId": 660},
    					{"userName": "User661", "userId": 661},
    					{"userName": "User662", "userId": 662},
    					{"userName": "User663", "userId": 663},
    					{"userName": "User664", "userId": 664},
    					{"userName": "User665", "userId": 665},
    					{"userName": "User666", "userId": 666},
    					{"userName": "User667", "userId": 667},
    					{"userName": "User668", "userId": 668},
    					{"userName": "User669", "userId": 669},
    					{"userName": "User670", "userId": 670},
    					{"userName": "User671", "userId": 671},
    					{"userName": "User672", "userId": 672},
    					{"userName": "User673", "userId": 673},
    					{"userName": "User674", "userId": 674},
    					{"userName": "User675", "userId": 675},
    					{"userName": "User676", "userId": 676},
    					{"userName": "User677", "userId": 677},
    					{"userName": "User678", "userId": 678},
    					{"userName": "User679", "userId": 679},
    					{"userName": "User680", "userId": 680},
    					{"userName": "User681", "userId": 681},
    					{"userName": "User682", "userId": 682},
    					{"userName": "User683", "userId": 683},
    					{"userName": "User684", "userId": 684},
    					{"userName": "User685", "userId": 685},
    					{"userName": "User686", "userId": 686},
    					{"userName": "User687", "userId": 687},
    					{"userName": "User688", "userId": 688},
    					{"userName": "User689", "userId": 689},
    					{"userName": "User690", "userId": 690},
    					{"userName": "User691", "userId": 691},
    					{"userName": "User692", "userId": 692},
    					{"userName": "User693", "userId": 693},
    					{"userName": "User694", "userId": 694},
    					{"userName": "User695", "userId": 695},
    					{"userName": "User696", "userId": 696},
    					{"userName": "User697", "userId": 697},
    					{"userName": "User698", "userId": 698},
    					{"userName": "User699", "userId": 699},
    					{"userName": "User700", "userId": 700},
    					{"userName": "User701", "userId": 701},
    					{"userName": "User702", "userId": 702},
    					{"userName": "User703", "userId": 703},
    					{"userName": "User704", "userId": 704},
    					{"userName": "User705", "userId": 705},
    					{"userName": "User706", "userId": 706},
    					{"userName": "User707", "userId": 707},
    					{"userName": "User708", "userId": 708},
    					{"userName": "User709", "userId": 709},
    					{"userName": "User710", "userId": 710},
    					{"userName": "User711", "userId": 711},
    					{"userName": "User712", "userId": 712},
    					{"userName": "User713", "userId": 713},
    					{"userName": "User714", "userId": 714},
    					{"userName": "User715", "userId": 715},
    					{"userName": "User716", "userId": 716},
    					{"userName": "User717", "userId": 717},
    					{"userName": "User718", "userId": 718},
    					{"userName": "User719", "userId": 719},
    					{"userName": "User720", "userId": 720},
    					{"userName": "User721", "userId": 721},
    					{"userName": "User722", "userId": 722},
    					{"userName": "User723", "userId": 723},
    					{"userName": "User724", "userId": 724},
    					{"userName": "User725", "userId": 725},
    					{"userName": "User726", "userId": 726},
    					{"userName": "User727", "userId": 727},
    					{"userName": "User728", "userId": 728},
    					{"userName": "User729", "userId": 729},
    					{"userName": "User730", "userId": 730},
    					{"userName": "User731", "userId": 731},
    					{"userName": "User732", "userId": 732},
    					{"userName": "User733", "userId": 733},
    					{"userName": "User734", "userId": 734},
    					{"userName": "User735", "userId": 735},
    					{"userName": "User736", "userId": 736},
    					{"userName": "User737", "userId": 737},
    					{"userName": "User738", "userId": 738},
    					{"userName": "User739", "userId": 739},
    					{"userName": "User740", "userId": 740},
    					{"userName": "User741", "userId": 741},
    					{"userName": "User742", "userId": 742},
    					{"userName": "User743", "userId": 743},
    					{"userName": "User744", "userId": 744},
    					{"userName": "User745", "userId": 745},
    					{"userName": "User746", "userId": 746},
    					{"userName": "User747", "userId": 747},
    					{"userName": "User748", "userId": 748},
    					{"userName": "User749", "userId": 749},
    					{"userName": "User750", "userId": 750},
    					{"userName": "User751", "userId": 751},
    					{"userName": "User752", "userId": 752},
    					{"userName": "User753", "userId": 753},
    					{"userName": "User754", "userId": 754},
    					{"userName": "User755", "userId": 755},
    					{"userName": "User756", "userId": 756},
    					{"userName": "User757", "userId": 757},
    					{"userName": "User758", "userId": 758},
    					{"userName": "User759", "userId": 759},
    					{"userName": "User760", "userId": 760},
    					{"userName": "User761", "userId": 761},
    					{"userName": "User762", "userId": 762},
    					{"userName": "User763", "userId": 763},
    					{"userName": "User764", "userId": 764},
    					{"userName": "User765", "userId": 765},
    					{"userName": "User766", "userId": 766},
    					{"userName": "User767", "userId": 767},
    					{"userName": "User768", "userId": 768},
    					{"userName": "User769", "userId": 769},
    					{"userName": "User770", "userId": 770},
    					{"userName": "User771", "userId": 771},
    					{"userName": "User772", "userId": 772},
    					{"userName": "User773", "userId": 773},
    					{"userName": "User774", "userId": 774},
    					{"userName": "User775", "userId": 775},
    					{"userName": "User776", "userId": 776},
    					{"userName": "User777", "userId": 777},
    					{"userName": "User778", "userId": 778},
    					{"userName": "User779", "userId": 779},
    					{"userName": "User780", "userId": 780},
    					{"userName": "User781", "userId": 781},
    					{"userName": "User782", "userId": 782},
    					{"userName": "User783", "userId": 783},
    					{"userName": "User784", "userId": 784},
    					{"userName": "User785", "userId": 785},
    					{"userName": "User786", "userId": 786},
    					{"userName": "User787", "userId": 787},
    					{"userName": "User788", "userId": 788},
    					{"userName": "User789", "userId": 789},
    					{"userName": "User790", "userId": 790},
    					{"userName": "User791", "userId": 791},
    					{"userName": "User792", "userId": 792},
    					{"userName": "User793", "userId": 793},
    					{"userName": "User794", "userId": 794},
    					{"userName": "User795", "userId": 795},
    					{"userName": "User796", "userId": 796},
    					{"userName": "User797", "userId": 797},
    					{"userName": "User798", "userId": 798},
    					{"userName": "User799", "userId": 799},
    					{"userName": "User800", "userId": 800},
    					{"userName": "User801", "userId": 801},
    					{"userName": "User802", "userId": 802},
    					{"userName": "User803", "userId": 803},
    					{"userName": "User804", "userId": 804},
    					{"userName": "User805", "userId": 805},
    					{"userName": "User806", "userId": 806},
    					{"userName": "User807", "userId": 807},
    					{"userName": "User808", "userId": 808},
    					{"userName": "User809", "userId": 809},
    					{"userName": "User810", "userId": 810},
    					{"userName": "User811", "userId": 811},
    					{"userName": "User812", "userId": 812},
    					{"userName": "User813", "userId": 813},
    					{"userName": "User814", "userId": 814},
    					{"userName": "User815", "userId": 815},
    					{"userName": "User816", "userId": 816},
    					{"userName": "User817", "userId": 817},
    					{"userName": "User818", "userId": 818},
    					{"userName": "User819", "userId": 819},
    					{"userName": "User820", "userId": 820},
    					{"userName": "User821", "userId": 821},
    					{"userName": "User822", "userId": 822},
    					{"userName": "User823", "userId": 823},
    					{"userName": "User824", "userId": 824},
    					{"userName": "User825", "userId": 825},
    					{"userName": "User826", "userId": 826},
    					{"userName": "User827", "userId": 827},
    					{"userName": "User828", "userId": 828},
    					{"userName": "User829", "userId": 829},
    					{"userName": "User830", "userId": 830},
    					{"userName": "User831", "userId": 831},
    					{"userName": "User832", "userId": 832},
    					{"userName": "User833", "userId": 833},
    					{"userName": "User834", "userId": 834},
    					{"userName": "User835", "userId": 835},
    					{"userName": "User836", "userId": 836},
    					{"userName": "User837", "userId": 837},
    					{"userName": "User838", "userId": 838},
    					{"userName": "User839", "userId": 839},
    					{"userName": "User840", "userId": 840},
    					{"userName": "User841", "userId": 841},
    					{"userName": "User842", "userId": 842},
    					{"userName": "User843", "userId": 843},
    					{"userName": "User844", "userId": 844},
    					{"userName": "User845", "userId": 845},
    					{"userName": "User846", "userId": 846},
    					{"userName": "User847", "userId": 847},
    					{"userName": "User848", "userId": 848},
    					{"userName": "User849", "userId": 849},
    					{"userName": "User850", "userId": 850},
    					{"userName": "User851", "userId": 851},
    					{"userName": "User852", "userId": 852},
    					{"userName": "User853", "userId": 853},
    					{"userName": "User854", "userId": 854},
    					{"userName": "User855", "userId": 855},
    					{"userName": "User856", "userId": 856},
    					{"userName": "User857", "userId": 857},
    					{"userName": "User858", "userId": 858},
    					{"userName": "User859", "userId": 859},
    					{"userName": "User860", "userId": 860},
    					{"userName": "User861", "userId": 861},
    					{"userName": "User862", "userId": 862},
    					{"userName": "User863", "userId": 863},
    					{"userName": "User864", "userId": 864},
    					{"userName": "User865", "userId": 865},
    					{"userName": "User866", "userId": 866},
    					{"userName": "User867", "userId": 867},
    					{"userName": "User868", "userId": 868},
    					{"userName": "User869", "userId": 869},
    					{"userName": "User870", "userId": 870},
    					{"userName": "User871", "userId": 871},
    					{"userName": "User872", "userId": 872},
    					{"userName": "User873", "userId": 873},
    					{"userName": "User874", "userId": 874},
    					{"userName": "User875", "userId": 875},
    					{"userName": "User876", "userId": 876},
    					{"userName": "User877", "userId": 877},
    					{"userName": "User878", "userId": 878},
    					{"userName": "User879", "userId": 879},
    					{"userName": "User880", "userId": 880},
    					{"userName": "User881", "userId": 881},
    					{"userName": "User882", "userId": 882},
    					{"userName": "User883", "userId": 883},
    					{"userName": "User884", "userId": 884},
    					{"userName": "User885", "userId": 885},
    					{"userName": "User886", "userId": 886},
    					{"userName": "User887", "userId": 887},
    					{"userName": "User888", "userId": 888},
    					{"userName": "User889", "userId": 889},
    					{"userName": "User890", "userId": 890},
    					{"userName": "User891", "userId": 891},
    					{"userName": "User892", "userId": 892},
    					{"userName": "User893", "userId": 893},
    					{"userName": "User894", "userId": 894},
    					{"userName": "User895", "userId": 895},
    					{"userName": "User896", "userId": 896},
    					{"userName": "User897", "userId": 897},
    					{"userName": "User898", "userId": 898},
    					{"userName": "User899", "userId": 899},
    					{"userName": "User900", "userId": 900},
    					{"userName": "User901", "userId": 901},
    					{"userName": "User902", "userId": 902},
    					{"userName": "User903", "userId": 903},
    					{"userName": "User904", "userId": 904},
    					{"userName": "User905", "userId": 905},
    					{"userName": "User906", "userId": 906},
    					{"userName": "User907", "userId": 907},
    					{"userName": "User908", "userId": 908},
    					{"userName": "User909", "userId": 909},
    					{"userName": "User910", "userId": 910},
    					{"userName": "User911", "userId": 911},
    					{"userName": "User912", "userId": 912},
    					{"userName": "User913", "userId": 913},
    					{"userName": "User914", "userId": 914},
    					{"userName": "User915", "userId": 915},
    					{"userName": "User916", "userId": 916},
    					{"userName": "User917", "userId": 917},
    					{"userName": "User918", "userId": 918},
    					{"userName": "User919", "userId": 919},
    					{"userName": "User920", "userId": 920},
    					{"userName": "User921", "userId": 921},
    					{"userName": "User922", "userId": 922},
    					{"userName": "User923", "userId": 923},
    					{"userName": "User924", "userId": 924},
    					{"userName": "User925", "userId": 925},
    					{"userName": "User926", "userId": 926},
    					{"userName": "User927", "userId": 927},
    					{"userName": "User928", "userId": 928},
    					{"userName": "User929", "userId": 929},
    					{"userName": "User930", "userId": 930},
    					{"userName": "User931", "userId": 931},
    					{"userName": "User932", "userId": 932},
    					{"userName": "User933", "userId": 933},
    					{"userName": "User934", "userId": 934},
    					{"userName": "User935", "userId": 935},
    					{"userName": "User936", "userId": 936},
    					{"userName": "User937", "userId": 937},
    					{"userName": "User938", "userId": 938},
    					{"userName": "User939", "userId": 939},
    					{"userName": "User940", "userId": 940},
    					{"userName": "User941", "userId": 941},
    					{"userName": "User942", "userId": 942},
    					{"userName": "User943", "userId": 943},
    					{"userName": "User944", "userId": 944},
    					{"userName": "User945", "userId": 945},
    					{"userName": "User946", "userId": 946},
    					{"userName": "User947", "userId": 947},
    					{"userName": "User948", "userId": 948},
    					{"userName": "User949", "userId": 949},
    					{"userName": "User950", "userId": 950},
    					{"userName": "User951", "userId": 951},
    					{"userName": "User952", "userId": 952},
    					{"userName": "User953", "userId": 953},
    					{"userName": "User954", "userId": 954},
    					{"userName": "User955", "userId": 955},
    					{"userName": "User956", "userId": 956},
    					{"userName": "User957", "userId": 957},
    					{"userName": "User958", "userId": 958},
    					{"userName": "User959", "userId": 959},
    					{"userName": "User960", "userId": 960},
    					{"userName": "User961", "userId": 961},
    					{"userName": "User962", "userId": 962},
    					{"userName": "User963", "userId": 963},
    					{"userName": "User964", "userId": 964},
    					{"userName": "User965", "userId": 965},
    					{"userName": "User966", "userId": 966},
    					{"userName": "User967", "userId": 967},
    					{"userName": "User968", "userId": 968},
    					{"userName": "User969", "userId": 969},
    					{"userName": "User970", "userId": 970},
    					{"userName": "User971", "userId": 971},
    					{"userName": "User972", "userId": 972},
    					{"userName": "User973", "userId": 973},
    					{"userName": "User974", "userId": 974},
    					{"userName": "User975", "userId": 975},
    					{"userName": "User976", "userId": 976},
    					{"userName": "User977", "userId": 977},
    					{"userName": "User978", "userId": 978},
    					{"userName": "User979", "userId": 979},
    					{"userName": "User980", "userId": 980},
    					{"userName": "User981", "userId": 981},
    					{"userName": "User982", "userId": 982},
    					{"userName": "User983", "userId": 983},
    					{"userName": "User984", "userId": 984},
    					{"userName": "User985", "userId": 985},
    					{"userName": "User986", "userId": 986},
    					{"userName": "User987", "userId": 987},
    					{"userName": "User988", "userId": 988},
    					{"userName": "User989", "userId": 989},
    					{"userName": "User990", "userId": 990},
    					{"userName": "User991", "userId": 991},
    					{"userName": "User992", "userId": 992},
    					{"userName": "User993", "userId": 993},
    					{"userName": "User994", "userId": 994},
    					{"userName": "User995", "userId": 995},
    					{"userName": "User996", "userId": 996},
    					{"userName": "User997", "userId": 997},
    					{"userName": "User998", "userId": 998},
    					{"userName": "User999", "userId": 999},
    					{"userName": "User1000", "userId": 1000}
					]

				}
			)
		}
	},
	actions : {
		menu:function(option){
			if(option=="Logout"){
				console.log("Logged Out!!!");
			}
			if(option=="Search"){
				console.log("Searching...");
			}
		},
		changeArray:function(){
			Lyte.arrayUtils(this.getData("operations"), "replaceAt", 1, "Menu");
			this.setData("details.personal_info.location.country.continent", "Europe");
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	},
	nameObserver:function(change){
		console.log(change);
	}.observes("name"),
	operationsObserver:function(change){
		console.log(change);
	}.observes("operations.[]"),
	detailsObserver:function(change){
		console.log(change);
	}.observes("$.details.*")
});

Lyte.Component.register("welcome-comp",{
_template:"<template tag-name=\"welcome-comp\"> <h1>Available features of LYTE</h1> <ul> <template items=\"{{features}}\" item=\"item\" index=\"index\" is=\"for\"><li> <a href=\"{{item.url}}\" target=\"_blank\">{{item.module}}</a> </li></template> </ul> </template>",
_dynamicNodes : [{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]}]}],
_observedAttributes :["features"],

	data : function(){
		return {
			features : Lyte.attr("array")
		}
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

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
        profile: Lyte.belongsTo("profile")
    }
);

store.registerModel("profile",
    {
        id:Lyte.attr("number", {primaryKey:true}),
        user:Lyte.belongsTo("user")
    }
)
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
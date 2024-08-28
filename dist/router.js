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


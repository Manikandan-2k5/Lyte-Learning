store.registerModel("navigation",{
	"id" : Lyte.attr("string"),
	"range" : Lyte.attr("array",{default:[25,50,75,100,200,300,400,500]}),
	"type" : Lyte.attr("string",{default:"select",pattern:/select|range|input/}),
	"paginationAt" : Lyte.attr("array",{default:["top","bottom"]}),
	"perPage" : Lyte.attr("number",{default:25}),
	"view" : Lyte.belongsTo("view")
});
/**
 * Renders a Drawer
 * @component lyte-drawer
 * @version  4.0.0
 * @methods onBeforeShow,onShow,onBeforeClose,onClose,onSelected
 */
if(!_LyteDrawer_){
	var _LyteDrawer_ =  [];
}
Lyte.Component.register("lyte-drawer", {
_template:"<template tag-name=\"lyte-drawer\" class=\"{{if(expHandlers(ltPropLayout,'===','overlay'),'lyteDrawerModal')}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropLayout,'==',&quot;overlay&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowOpenButton}}\"><template case=\"true\"><div class=\"lyteDrawerOpenElem lyteDrawerOpenElemLeft\" __click=\"{{action('openDrawer')}}\"> <div class=\"lyteDrawerToggleIcon\"></div> </div></template></template> <lyte-modal lt-prop-allow-multiple=\"true\" lt-prop-show-close-button=\"{{ltPropShowCloseButton}}\" lt-prop-close-on-escape=\"{{ltPropCloseOnEscape}}\" lt-prop-overlay-close=\"{{ltPropOverlayClose}}\" lt-prop-width=\"{{ltPropWidth}}\" lt-prop-wrapper-class=\"lyteDrawerModal {{ltPropWrapperClass}}\" lt-prop-height=\"{{ltPropHeight}}\" lt-prop-freeze=\"{{ltPropFreeze}}\" lt-prop-show=\"{{lbind(ltPropShow)}}\" on-before-show=\"{{method(&quot;modalOnBeforeShow&quot;)}}\" on-show=\"{{method(&quot;modalOnShow&quot;)}}\" on-before-close=\"{{method(&quot;modalOnBeforeClose&quot;)}}\" on-close=\"{{method(&quot;modalOnClose&quot;)}}\" lt-prop=\"{{stringify(modalAttr)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content class=\"lyteDrawerModal\" tabindex=\"0\" __click=\"{{action(&quot;selectedItem&quot;,event,&quot;overlay&quot;)}}\" __keydown=\"{{action(&quot;makeDrawerItemActive&quot;,event,&quot;overlay&quot;)}}\" __mousemove=\"{{action(&quot;selectActiveItem&quot;,event)}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"drawerPanel\"></lyte-yield> </template><template case=\"false\"> <lyte-drawer-body> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drawer-group> <lyte-drawer-label> {{lyteUiReturnOnlyKey(item)}} </lyte-drawer-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\"> <template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{subitem[ltPropSystemValue]}}\"> <template is=\"if\" value=\"{{ltPropMiniVariant}}\"><template case=\"true\"> <span class=\"lyteDrawerMiniIcon\" style=\"background-image:{{subitem.icon}};\"></span> <span class=\"lyteDrawerMiniLabel\">{{subitem[ltPropUserValue]}}</span> </template><template case=\"false\"> {{subitem[ltPropUserValue]}} </template></template> </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{subitem}}\"> {{subitem}} </lyte-drawer-item> </template></template></template> </lyte-drawer-group> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{item[ltPropSystemValue]}}\"> <template is=\"if\" value=\"{{ltPropMiniVariant}}\"><template case=\"true\"> <span class=\"lyteDrawerMiniIcon\" style=\"background:{{item.icon}};\"></span> <span class=\"lyteDrawerMiniLabel\">{item[ltPropUserValue]}}</span> </template><template case=\"false\"> {{item[ltPropUserValue]}} </template></template> </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{item}}\"> {{item}} </lyte-drawer-item> </template></template></template></template></template> </lyte-drawer-body> </template></template> </lyte-modal-content> </template> </lyte-modal> </template><template case=\"false\"> <div class=\"lyteDrawerInlineBody {{if(expHandlers(currentPosition,'===','left'),'lyteDrawerPanelLeft','lyteDrawerPanelRight')}} {{if(ltPropShow,'lyteDrawerShown','lyteDrawerHidden')}} {{if(expHandlers(ltPropLayout,'===','inlineOverlay'),'lyteDrawerInlineOverlay','lyteDrawerInlineDisplace')}} {{if(ltPropMiniVariant,'lyteDrawerMiniVariant')}}\" style=\"height:{{ltPropHeight}};\"> <div class=\"lyteDrawerPanel {{ltPropWrapperClass}}\" tabindex=\"0\" __click=\"{{action(&quot;selectedItem&quot;,event,&quot;inline&quot;)}}\" __keydown=\"{{action(&quot;makeDrawerItemActive&quot;,event,&quot;inline&quot;)}}\" __mousemove=\"{{action(&quot;selectActiveItem&quot;,event)}}\"> <div class=\"drawerWrapper\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"drawerPanel\"> </lyte-yield> </template><template case=\"false\"> <lyte-drawer-actions> <template is=\"if\" value=\"{{expHandlers(ltPropShowOpenButton,'&amp;&amp;',expHandlers(ltPropShow,'!'))}}\"><template case=\"true\"><div class=\"lyteDrawerOpenElem lyteDrawerOpenElemLeft\" __click=\"{{action('openDrawer')}}\"> <div class=\"lyteDrawerToggleIcon\"></div> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropShowCloseButton,'&amp;&amp;',ltPropShow)}}\"><template case=\"true\"><div class=\"lyteDrawerCloseIconWrap\" __click=\"{{action('closeDrawer')}}\"> <div class=\"lyteDrawerToggleIcon\"></div> </div></template></template> </lyte-drawer-actions> <lyte-drawer-body> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drawer-group> <lyte-drawer-label> {{lyteUiReturnOnlyKey(item)}} </lyte-drawer-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\"> <template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{subitem[ltPropSystemValue]}}\"> <template is=\"if\" value=\"{{ltPropMiniVariant}}\"><template case=\"true\"> <span class=\"lyteDrawerMiniIcon\" style=\"background:{{subitem.icon}};\"></span> <span class=\"lyteDrawerMiniLabel\">{{subitem[ltPropUserValue]}}</span> </template><template case=\"false\"> {{subitem[ltPropUserValue]}} </template></template> </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{subitem}}\"> {{subitem}} </lyte-drawer-item> </template></template></template> </lyte-drawer-group> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{item[ltPropSystemValue]}}\"> <template is=\"if\" value=\"{{ltPropMiniVariant}}\"><template case=\"true\"> <span class=\"lyteDrawerMiniIcon\" style=\"background-image:{{item.icon}};\"></span> <span class=\"lyteDrawerMiniLabel\">{{item[ltPropUserValue]}}</span> </template><template case=\"false\"> {{item[ltPropUserValue]}} </template></template> </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{item}}\"> {{item}} </lyte-drawer-item> </template></template></template></template></template> </lyte-drawer-body> </template></template> </div> </div> <div class=\"lyteDrawerContent\"> <lyte-yield yield-name=\"drawerContent\"> </lyte-yield> </div> <template is=\"if\" value=\"{{ltPropFreeze}}\"><template case=\"true\"> <lyte-drawer-freeze ontransitionend=\"{{action('updateFreezeLayerStyle',this)}}\"> </lyte-drawer-freeze> </template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-image:'","subitem.icon","';'"]}}}},{"type":"text","position":[3,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","item.icon","';'"]}}}}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height:'","ltPropHeight","';'"]}}}},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background:'","subitem.icon","';'"]}}}},{"type":"text","position":[3,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background-image:'","item.icon","';'"]}}}},{"type":"text","position":[3,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"insertYield","position":[1,3,1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropPosition","ltPropWidth","ltPropHeight","ltPropModal","ltPropFreeze","ltPropAnimationDuration","ltPropMiniVariant","ltPropUserValue","ltPropSystemValue","ltPropOptions","ltPropShow","ltPropSelectedClass","ltPropSelected","ltPropCloseOnSelect","ltPropOverlayClose","ltPropShowOpenButton","ltPropShowCloseButton","ltPropCloseOnEscape","ltPropDisabledList","ltPropWrapperClass","ltPropLayout","ltPropExpandMiniVariant","ltPropMiniVariantWidth","ltPropYield","returnedFalse","currentPosition","config","isMouseEvent","modalAttr"],

	data : function(){
		return {
			/** 
			 * @componentProperty  {left | right} ltPropPosition=left
			 */
			ltPropPosition:Lyte.attr("string",{"default":"left"}),
			/** 
			 * @componentProperty  {string} ltPropWidth=200px
			 */
			ltPropWidth:Lyte.attr("string",{"default":"200px"}),
			/** 
			 * @componentProperty  {string} ltPropHeight=100%
			 */
			ltPropHeight:Lyte.attr("string",{"default":"100%"}),
			/** 
			 * @componentProperty  {object} ltPropModal={}
			 */
			ltPropModal:Lyte.attr("object",{"default":{}}),
			/** 
			 * @componentProperty  {boolean} ltPropFreeze=true
			 */
			ltPropFreeze:Lyte.attr("boolean",{"default":true}),
			/** 
			 * @componentProperty  {string} ltPropAnimationDuration=0.3s
			 */
			ltPropAnimationDuration:Lyte.attr("string",{"default":"0.3s"}),
			/** 
			 * @componentProperty  {boolean} ltPropMiniVariant=false
			 */
			ltPropMiniVariant:Lyte.attr("boolean",{"default":false}),
			/** 
			 * @componentProperty  {string} ltPropUserValue=name
			 */
			ltPropUserValue: Lyte.attr("string",{default:"name"}),
			/** 
			 * @componentProperty  {string} ltPropSystemValue=value
			 */
			ltPropSystemValue:Lyte.attr("string",{default:"value"}),
			/** 
			 * @componentProperty {array} ltPropOptions
			 * @default []
			 */
			ltPropOptions:Lyte.attr("array",{default:[]}),
			/** 
			 * @componentProperty  {boolean} ltPropShow=false
			 */
			ltPropShow:Lyte.attr("boolean",{"default":false}),
			/** 
			 * @componentProperty  {string} ltPropSelectedClass
			 */
			ltPropSelectedClass:Lyte.attr("string"),
			/** 
			 * @componentProperty  {string} ltPropSelected
			 */
			ltPropSelected:Lyte.attr("string"),
			/** 
			 * @componentProperty  {boolean} ltPropCloseOnSelect=false
			 */
			ltPropCloseOnSelect:Lyte.attr("boolean",{"default":false}),
			/** 
			 * @componentProperty  {boolean} ltPropOverlayClose=true
			 */
			ltPropOverlayClose : Lyte.attr("boolean",{"default":true}),
			/** 
			 * @componentProperty  {boolean} ltPropShowOpenButton=true
			 */
			 ltPropShowOpenButton : Lyte.attr("boolean",{"default":true}),
			/** 
			 * @componentProperty  {boolean} ltPropShowCloseButton=true
			 */
			 ltPropShowCloseButton : Lyte.attr("boolean",{"default":true}),
			 /** 
			 * @componentProperty  {boolean} ltPropCloseOnEscape=true
			 */
			ltPropCloseOnEscape : Lyte.attr("boolean",{"default":true}),
			/** 
			 * @componentProperty  {array} ltPropDisabledList=[]
			 */
			 ltPropDisabledList:Lyte.attr("array",{"default":[]}),
			/** 
			 * @componentProperty  {string} ltPropWrapperClass
			 */
			ltPropWrapperClass:Lyte.attr("string"),
			/** 
			 * @componentProperty  {inline | overlay |  inlineOverlay} ltPropLayout=overlay
			 */
			ltPropLayout: Lyte.attr("string",{"default":"overlay"}),
			/** 
			 * @componentProperty  {string} ltPropExpandMiniVariant="click"
			 */
			ltPropExpandMiniVariant: Lyte.attr("string",{
				"default": "click"
			}),
			/** 
			 * @componentProperty  {string} ltPropMiniVariantWidth=50px
			 */
			ltPropMiniVariantWidth : Lyte.attr("string",{"default": "50px"}),
			/** 
			 * @componentProperty  {boolean} ltPropYield=false
			 */
			ltPropYield:Lyte.attr("boolean",{default:false}),

			returnedFalse : Lyte.attr("boolean",{"default" : false}),
			currentPosition : Lyte.attr("string"),
			config : Lyte.attr("object",{
				"default" : {}
			}),
			isMouseEvent : Lyte.attr("boolean",{"default":false}),
			modalAttr : Lyte.attr("object",{"default": {}})
		}		
	},

	// methods calling start
	selected : function( selectedValue, lyteDrawerItem ) {
		if(this.getMethods("onSelected")){
			this.executeMethod("onSelected",selectedValue,lyteDrawerItem,this); 
		}
	},

	beforeShow : function(skip){
		if(!skip && this.getMethods("onBeforeShow")){
			return this.executeMethod("onBeforeShow", this); 
		}
	},

	show : function(skip){
		if(!skip && this.getMethods("onShow")){
			this.executeMethod("onShow", this); 
		}
	},

	beforeClose : function(skip){
		if(!skip && this.getMethods("onBeforeClose")){
			return this.executeMethod("onBeforeClose", this); 
		}
	},

	close : function(skip){
		if(!skip && this.getMethods("onClose")){
			this.executeMethod("onClose", this); 
		}
	},

	getDrawerForModal : function(){
		var actualModalDiv = this.$node.querySelector("lyte-modal").component.actualModalDiv;
		if(actualModalDiv) {
			return actualModalDiv.querySelector("lyte-modal-content");
		}
	},

	getParentElement : function(){
		/* 
			get parent element based on layout
		*/
		var layout = this.data.ltPropLayout;
		if(layout == "overlay"){
			return this.getDrawerForModal();
		}
		return this.$node.querySelector(".lyteDrawerInlineBody");
	},

	getDrawerPanel : function() {
		var layout = this.data.ltPropLayout;
		if(layout == "overlay"){
			return this.getDrawerForModal();
		}
		return this.$node.querySelector(".lyteDrawerPanel");
	},

	getLyteDrawerItem : function(parentElement, drawerItemvalue) {
		/* 
			get lyte drawer item from parent element
		*/
		return parentElement.querySelector("[data-value ='"+window._lyteUiUtils.escape(drawerItemvalue)+"']");
	},

	getActiveDrawerItem : function(parentElement){
		/* 
			get active drawer item using active class
		*/
		return parentElement.querySelector(".lyteDrawerActiveItem");
	},

	activeClassActionForDrawerItem : function(element, action){
		/*
		function used to add or remove activeClass from a element
		*/ 
		if(element){
			var selectedClass = this.data.ltPropSelectedClass;
			element.classList[action]("lyteDrawerActiveItem");
			if(selectedClass){
				element.classList[action](selectedClass);
			}
		}
	},

	removePreviouslySelected : function(parent){
		/* 
			removing the selected class from the previously selected element
		*/
		var prevActiveDrawerItem = this.getActiveDrawerItem(parent);
		this.activeClassActionForDrawerItem(prevActiveDrawerItem, "remove");
	},

	addDisableClassForDrawerItem : function(parentElement, value){
		/* 
			adding disabled class to drawerItem
		*/
		var element = this.getLyteDrawerItem(parentElement, value);
		if(element){
			element.classList.add("lyteDrawerDisabledItem");
		}
	},

	removeDisableClassFromDrawerItem : function(element){
		/* 
			remove disabled class from lyte drawer item
		*/
		element.classList.add("lyteDrawerDisabledItem");
	},

	selectDrawerItem : function(){
		/* 
			selecting drawerItem using ltPropSelected
		*/
		var close = this.data.ltPropCloseOnSelect,
		parent = this.getDrawerPanel();
		if(parent){
			var selected = this.data.ltPropSelected;
			var curActiveDrawerItem = this.getLyteDrawerItem(parent, selected);
			this.removePreviouslySelected(parent);
			this.activeClassActionForDrawerItem(curActiveDrawerItem, "add");
			if(curActiveDrawerItem){
				if(close){
					this.setData("ltPropShow",false);
				}
			}
		}
		else {
			this.setData("config.selection",true);
		}
	},

	disableDrawerItems : function(){
		/* 
			disabling drawerItem using ltPropDisableList
		*/
		var array = this.getData("ltPropDisabledList"),
		parent = this.getDrawerPanel();
		if(parent){
			var disabledlist = parent.querySelectorAll(".lyteDrawerDisabledItem");
			for(var index = 0 ; index<disabledlist.length;index++){
				this.removeDisableClassFromDrawerItem(disabledlist[index]);
			}
			for(var index = 0 ; index<array.length;index++){
				this.addDisableClassForDrawerItem(parent, array[index]);
			}
		}
		else {
			this.setData("config.disable",true);
		}
	},

	removeDrawerFromStore : function(){
		/* 
		removing the lyteDrawer node from global variable(_LyteDrawer_)
		*/
		var drawer = this.$node;
		var lyteDrawers =  _LyteDrawer_;
		var drawerlength = lyteDrawers.length;
		for(var index=0; index<drawerlength; index++) {
			if(lyteDrawers[index] === drawer) {
				lyteDrawers.splice(index,1);
				break;
			}
		}
	},

	getPosition: function(){
		/* checking the rtl direction and getting correct position */

		// var position = this.data.ltPropPosition,
		// rtl = _lyteUiUtils.getRTL();
		// if(rtl){
		// 	return position === "right"?"left": "right";
		// }
		// else{
		// 	return position;
		// }

		return this.data.ltPropPosition;
	},

	initializeDataForModal : function(){
		/* setting initial data for modal like slideFromLeft or slideFromRight*/
		var lyteModal = this.$node.querySelector("lyte-modal");
		var offset = lyteModal.ltProp("offset"),
		currentPosition = this.getPosition(),
		seconds =  (this.data.ltPropAnimationDuration || '').replace(/s/g, '');
		// offset[currentPosition] = "0px";
		lyteModal.ltProp("transition",{
			"animation": "slideFrom"+_lyteUiUtils.capitalize(currentPosition),
			"duration":seconds
		});
		lyteModal.ltProp("offset",{[currentPosition] : "0px", top: offset.top});
	},

	getFreezeLayer : function() {
		/* To get freeze layer element from dom*/
		return this.$node.querySelector("lyte-drawer-freeze");
	},

	showFreezeLayer : function(){
		/* To show freeze layer for inline and inlineOverlay drawer*/
		if(this.data.ltPropFreeze) {
			var freezeLayer = this.getFreezeLayer();
			freezeLayer.style.display = "block";
			setTimeout(function(){
				freezeLayer.classList.add('lyteDrawerFreezeLayerShown');
			},0);
		}
	},

	hideFreezeLayer : function(initialStage){
		/* To hide freeze layer for inline and inlineOverlay drawers*/
		if(this.data.ltPropFreeze) {
			var freezeLayer = this.getFreezeLayer();
			freezeLayer.classList.remove('lyteDrawerFreezeLayerShown');
		}
	},

	focusDrawerPanel : function() {
		this.getDrawerPanel().focus();
	},

	showInlineDrawer : function() {
		/* Used to open inline and inlineOverlay drawer*/
		var returnValue =  this.beforeShow();
		if(returnValue === false){
			this.setData({
				"returnedFalse": true,
				"ltPropShow": false
			});
		}
		else{
			this.showFreezeLayer();
			this.show();
			_LyteDrawer_.push(this.$node);
		}
	},

	closeInlineDrawer : function() {
		/* close the opened inline and inlineOverlay drawer*/
		var returnValue = this.beforeClose();
		if(returnValue === false){
			this.setData({
				"returnedFalse": true,
				"ltPropShow": true
			});
		}
		else{
			this.hideFreezeLayer();
			this.close();
			this.removeDrawerFromStore();	
		}
	},

	isFocusedLyteDrawerItem : function(element) {
		var focusClassName = "lyteDrawerItemFocused";
		return element.classList.contains(focusClassName);
	},

	isActiveLyteDrawerItem : function(element) {
		var activeClassName = "lyteDrawerActiveItem";
		return element.classList.contains(activeClassName);
	},

	isDisabledLyteDrawerItem : function(element) {
		var disabledClassname = "lyteDrawerDisabledItem";
		return element.classList.contains(disabledClassname);
	},

	isLyteDrawerItem : function(element){
		if(element && element.tagName == "LYTE-DRAWER-ITEM" && 
		!this.isDisabledLyteDrawerItem(element)) {
			return true;
		}
	},

	getActiveOrFocusedItem : function(elements){
		var len = elements.length,
		activeIndex;
		for(var index=0; index<len; index++) {
			if(this.isFocusedLyteDrawerItem(elements[index])){
				return index;
			}
			else if(this.isActiveLyteDrawerItem(elements[index])) {
				activeIndex =  index;
			}
		}
		return activeIndex;
	},

	isNotActiveElement : function(element){
		if(element) {
			return !element.classList.contains("lyteDrawerActiveItem");
		}
	},

	isValidFocusableItem : function(element){
		return !element.classList.contains("lyteDrawerDisabledItem");
	},

	findNextActive: function( elements, index, forward ) {
		var increment = forward ? 1 : -1,
		eleLen = elements.length;
		if(index === undefined){
			index = forward ? 0 : eleLen-1;
		}
		else {
			index = index + increment;
		}
		for( ;  forward ? index < eleLen : index > -1; index = index + increment ) {
			if( this.isValidFocusableItem(elements[index])) {
				return elements[index];
			}
		}
	},

	getAllDrawerItems : function(){
		var parentElement = this.getDrawerPanel();
		return parentElement.querySelectorAll("lyte-drawer-item");
	},

	isValidateElement :  function(element){
		return element != document 
		&& element != document.body
		&& element != document.documentElement 
		 && element.tagName != 'LYTE-DRAWER-BODY';
	},

	elementsFromPoint: function (x, y) {
        var elements = [], 
		element = document.elementFromPoint(x, y), 
		prevElement;
        while (this.isValidateElement(element)) {
            element._pointerEvents = element.style.pointerEvents;
            element.style.pointerEvents = 'none';
            elements.push(element);
            prevElement = element;
            element = document.elementFromPoint(x, y);
            if (prevElement === element) {
                break
            }
        }
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.pointerEvents = elements[i]._pointerEvents;
            delete elements[i]._pointerEvents;
        }
        return elements;
    },

	openDrawer : function(){
		var parentElement = this.getDrawerPanel();
		var expandMiniVariant =  this.data.ltPropExpandMiniVariant;
		var eventName = this.data.isMouseEvent?"mouseenter":expandMiniVariant;
		this.setData("ltPropShow",true);
		if(this.data.ltPropShow) {
			parentElement.removeEventListener( eventName, this._bindedDrawerOpen, true);
			if(this.data.isMouseEvent) {
				document.addEventListener( "mousemove", this._bindedDrawerClose, true);
			}
		}
	},

	closeOnHover: function (event) {
        if (this.$node) {
            var elements = document.elementsFromPoint ? document.elementsFromPoint(event.clientX, event.clientY) 
			: this.elementsFromPoint(event.clientX, event.clientY);
			var parentElement = this.getDrawerPanel();
            if (elements.indexOf(parentElement) == -1 ) {
				this.setData("ltPropShow", false);
				if(!this.data.ltPropShow) {
					document.removeEventListener( "mousemove", this._bindedDrawerClose, true);
					parentElement.addEventListener( "mouseenter", this._bindedDrawerOpen, true);
				}
            }
        }
    },

	isMiniVariant : function(){
		return this.data.ltPropMiniVariant;
	},

	isMouseEvent : function(eventName){
		return /^(mouseenter|mousemove|mouseover|hover)$/.test(eventName);
	},

	initializeEvent : function() {
		if(this.isMiniVariant()) {
			var parentElement = this.getDrawerPanel();
			if(parentElement) {
				var expandMiniVariant = this.data.ltPropExpandMiniVariant;
				var eventName = expandMiniVariant;
				if(eventName) {
					var isMouseEvent =  this.isMouseEvent(eventName);
					this._bindedDrawerOpen = this.openDrawer.bind(this);
					if(isMouseEvent) {
						this._bindedDrawerClose = this.closeOnHover.bind(this);
						eventName = "mouseenter";
					}
					parentElement.addEventListener(eventName,this._bindedDrawerOpen,true);
					this.setData("isMouseEvent", isMouseEvent);
				}
			}
		}
	},

	checkAndUpdateSelectedValue : function(config) {
		if(config.selection) {
			this.selectDrawerItem();
			Lyte.objectUtils(config, "delete", "selection");
		}
	},

	checkAndUpdateDisbaleList : function(config) {
		if(config.disable) {
			this.disableDrawerItems();
			Lyte.objectUtils(config, "delete", "disable");
		}
	},

	initializeDrawerDefaultData : function() {
		var config = this.data.config;
		this.checkAndUpdateSelectedValue(config);
		this.checkAndUpdateDisbaleList(config);
	},

	moveIntoView: function( element ) {
		var panel = this.getDrawerPanel(),
		panelScrollTop = panel.scrollTop,
		elementTop = element.offsetTop;

		if( elementTop <= panelScrollTop ) {
			panel.scrollTop = elementTop;
		}
		else {
			panel.scrollTop =elementTop + element.offsetHeight - panel.offsetHeight;
		}
	},

	updateModalAttr : function(){
		var modalAttr =  Lyte.deepCopyObject(this.data.ltPropModal);
		var notAllowed = ["width", "height","showCloseButton","closeOnEscape", 
		"allowMultiple", "overlayClose","freeze", "wrapperClass"];
		notAllowed.forEach(function(item){
			if(modalAttr.hasOwnProperty(item)) {
				delete modalAttr[item]
			}
		});
		this.setData("modalAttr",  modalAttr);
	},

	removeAttachedEvents : function() {
		if(this.isMiniVariant()){
			var parentElement = this.getDrawerPanel();
			var	expandMiniVariant = this.data.ltPropExpandMiniVariant;
			if(expandMiniVariant) {
				var eventName = this.data.isMouseEvent?"mouseenter":expandMiniVariant; 
				if(this.data.isMouseEvent){
					document.removeEventListener( "mousemove", this._bindedDrawerClose, true);
				}
				parentElement.addEventListener( eventName, this._bindedDrawerOpen, true);
				delete this._bindedDrawerClose;
				delete this._bindedDrawerOpen;
			}
		}
	},

	initializeShow : function() {
		var show  = this.data.ltPropShow;
		if(show) {
			var layout = this.data.ltPropLayout;
			if(layout === "inline" ||  layout === "inlineOverlay"){
				this.showInlineDrawer(!changes);
			}
		}
	},

	// lifecycle hooks start

	init : function() {
		this.initializeShow();
	},
	
	didConnect : function(){
		this.initializeEvent();
	},

	didDestroy:function(){
		//remove documnet event listener
		this.removeDrawerFromStore();
		this.removeAttachedEvents();
	},

	// lifecycle hooks end

	//observers start
	selectedObserver : function(changes){
		this.selectDrawerItem();
	}.observes("ltPropSelected").on('didConnect'),

	disabledListObserver : function(){
		this.disableDrawerItems();
	}.observes("ltPropDisabledList").on('didConnect'),

	showChanges:function(changes){
		if(this.data.returnedFalse){
            this.setData('returnedFalse',false);
            return;
        }
		var  show  = this.data.ltPropShow,
		layout = this.$node.ltProp("layout"),
		position = this.getPosition();
		this.setData("currentPosition",position);
		if(show){
			if(layout === "inline" ||  layout === "inlineOverlay"){
				this.showInlineDrawer(!changes);
			}
		}
		else {
			if(layout == "inline" || layout === "inlineOverlay"){
				this.closeInlineDrawer(!changes);
				if(this.isMiniVariant()) {
					var parentElement = this.getDrawerPanel();
					var eventName =  this.data.ltPropExpandMiniVariant;
					if(!this.isMouseEvent(eventName)) {
						parentElement.addEventListener(eventName,this._bindedDrawerOpen,true);
					}
				}
			}
		}
	}.observes("ltPropShow").on('didConnect'),

	styleObserver : function(observerChange){
		// all animation are handled using css variable in css
		if(this.data.ltPropLayout != "overlay"){
			var drawerPanel =  this.getDrawerPanel();
			var compData =  this.data;
			var cssVarMapping  =  {
				ltPropWidth : "--lyte-drawer-width",
				ltPropMiniVariantWidth : "--lyte-drawer-mini-variant-width",
				ltPropAnimationDuration : "--lyte-drawer-transition-duration"
			}
			if(observerChange) {
				var key = observerChange.item;
				drawerPanel.style.setProperty( cssVarMapping[key], compData[key]);
			}
			else {
				for(var key in cssVarMapping) {
					drawerPanel.style.setProperty( cssVarMapping[key], compData[key]);
				}
			}
		}
	}.observes("ltPropWidth","ltPropAnimationDuration","ltPropMiniVariantWidth").on("didConnect"),

	modalAttrObserver :  function(){
		this.updateModalAttr();
	}.observes("ltPropModal"),

	//observers end

	actions:{

		selectedItem:function(event,type){
			var closestItem = $L(event.target).closest("lyte-drawer-item", this.$node)[0];
			if(this.isLyteDrawerItem(closestItem)) {
				var value = closestItem.getAttribute("data-value");
				this.setData("ltPropSelected",value);
				this.selected( this.data.ltPropSelected, closestItem);
			}
		},

		makeDrawerItemActive : function(event) {
			
			var keyCode = event.keyCode;
			var drawerItems = this.getAllDrawerItems();
			var activeIndex = this.getActiveOrFocusedItem(drawerItems);
			var activeItem =  drawerItems[activeIndex];
			if(this.data.ltPropShow){
				if( keyCode === 38  || keyCode === 40 ) {
					var forward = keyCode === 40;
					var nextActiveItem = this.findNextActive(drawerItems, activeIndex, forward);
					if(nextActiveItem) {
						if(activeItem){
							activeItem.classList.remove("lyteDrawerItemFocused");
						}
						nextActiveItem.classList.add("lyteDrawerItemFocused");
						this.moveIntoView(nextActiveItem);
						event.preventDefault();
					}
				}
				else if(keyCode === 13 && this.isNotActiveElement(activeItem)) {
					var value = activeItem.getAttribute("data-value");
					activeItem.classList.remove("lyteDrawerItemFocused");
					this.setData("ltPropSelected",value);
					this.selected( this.data.ltPropSelected, activeItem);
					event.preventDefault();
				}
			}

		},

		selectActiveItem : function(event){
			var closestItem = $L(event.target).closest("lyte-drawer-item", this.$node)[0];
			var drawerPanel = this.getDrawerPanel();
			var focusedItem = drawerPanel.querySelector(".lyteDrawerItemFocused");
			if(focusedItem) {
				focusedItem.classList.remove("lyteDrawerItemFocused");
			}
			if(closestItem) {
				closestItem.classList.add("lyteDrawerItemFocused");
			}
		},

		openDrawer : function() {
			this.setData("ltPropShow",true);
		},
		
		closeDrawer : function() {
			this.setData("ltPropShow",false);
		},

		updateFreezeLayerStyle : function(node) {
			if(this.data.ltPropShow ===  false) {
				node.style.setProperty("display", "none");
			}
		}

	},

	methods:{
		/* These below methods will work for overlay drawer only*/

		modalOnBeforeShow:function(component){
			this.initializeDataForModal(component.$node);
			return this.beforeShow();
		},

		modalOnShow:function(component){
			this.initializeDrawerDefaultData();
			this.show();
			this.focusDrawerPanel();
			_LyteDrawer_.push(this.$node);
		},

		modalOnBeforeClose:function(event,component){
			return this.beforeClose();
		},

		modalOnClose:function(component){
			if(this.isMiniVariant()) {
				return;
			}
			this.removeDrawerFromStore();
			this.close();
		}

	}
});
if (document.readyState === "complete" || document.readyState === "interactive"){
    addCloseEvent();
}
else{
    document.addEventListener("DOMContentLoaded", function(){
        addCloseEvent();
    });
}
function  addCloseEvent(){

	document.addEventListener('click',function(event){
		var ele = event.target;
		while(!$L(ele).hasClass('modalWrapper') && ele.tagName != "LYTE-DRAWER-BODY" && ele.tagName != "LYTE-DRAWER" && ele.tagName !="LYTE-DRAWER-FREEZE" && ele.tagName != "LYTE-MODAL-FREEZE" && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'HTML'){
            ele = ele.parentElement;
            if(!ele){
                return
            }
        }
		if(ele.tagName == 'HTML' || ele.tagName == "LYTE-MODAL-FREEZE" || ele.tagName == "LYTE-DRAWER-FREEZE"){
			var last = _LyteDrawer_.length-1;
			if(last > -1){
				if(_LyteDrawer_[last].tagName == "LYTE-DRAWER" && _LyteDrawer_[last].ltProp('show') && _LyteDrawer_[last].ltProp("overlayClose")){
					if(_LyteDrawer_[last]){
						_LyteDrawer_[last].ltProp('show',false);
					}
				}
			}
		}
	},true);
	document.addEventListener('keydown',function(event){
			event = event || window.event;
            var isEscape = false;
            if ("key" in event) {
                isEscape = (event.key == "Escape" || event.key == "Esc");
            } else {
                isEscape = (event.keyCode == 27);
            }
            if (isEscape) {
				var last = _LyteDrawer_.length-1;
				if(last > -1){
					if(_LyteDrawer_[last].tagName == "LYTE-DRAWER" && _LyteDrawer_[last].ltProp('show') && _LyteDrawer_[last].ltProp("closeOnEscape")){
						if(_LyteDrawer_[last]){
							_LyteDrawer_[last].ltProp('show',false);
						}
					}
				}
            }
	},true);
}
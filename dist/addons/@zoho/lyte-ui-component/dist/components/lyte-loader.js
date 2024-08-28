/**
 * Renders a loader
 * @component lyte-loader
 * @version 3.1.0
 * @methods onBeforeShow,onShow,onBeforeHide,onHide,onTimeout
 */
Lyte.Component.register("lyte-loader", {
_template:"<template tag-name=\"lyte-loader\"> <template is=\"if\" value=\"{{ltPropShowLoader}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropInLine}}\"><template case=\"true\"> <div class=\"ltLoaderContainer {{ltPropShowClass}}\"> <div class=\"ltLoader\"> <div class=\"ltexitdiv\"> <template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span class=\"lyteLoaderExit\" __click=\"{{action(&quot;lyteLoadCloser&quot;,event)}}\"></span> </template></template> </div> <div class=\"ltspindiv\"> <div class=\"ltLoaderSpin\"></div> </div> <template is=\"if\" value=\"{{ltPropProgressBar.show}}\"><template case=\"true\"> <div class=\"ltLoaderProgressBar {{ltPropProgressBar.class}} {{ltPropProgressBar.mode}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropProgressBar.mode,'definite')}}\"><template case=\"true\"> <span class=\"lyteLoaderProgressed\" style=\"width: {{ltPropProgressed}}%\"></span> </template></template> </div> <div class=\"lyteLoaderProgressMessage\">{{ltPropMessage}}</div> </template></template> <div class=\"lyteLoaderTimeoutMessage\">{{ltPropTimeoutMessage}}</div> </div> <lyte-loader-freeze class=\"lyteLoaderFreeze\"></lyte-loader-freeze> </div> </template><template case=\"false\"> <lyte-wormhole lt-prop-query=\"{{ltPropSelector}}\" on-before-append=\"{{method('beforeWormholeAppend')}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"ltLoaderContainer {{ltPropShowClass}}\"> <div class=\"ltLoader\"> <div class=\"ltexitdiv\"> <template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span class=\"lyteLoaderExit\" __click=\"{{action(&quot;lyteLoadCloser&quot;,event)}}\"></span> </template></template> </div> <div class=\"ltspindiv\"> <div class=\"ltLoaderSpin\"></div> </div> <template is=\"if\" value=\"{{ltPropProgressBar.show}}\"><template case=\"true\"> <div class=\"ltLoaderProgressBar {{ltPropProgressBar.class}} {{ltPropProgressBar.mode}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropProgressBar.mode,'definite')}}\"><template case=\"true\"> <span class=\"lyteLoaderProgressed\" style=\"width: {{ltPropProgressed}}%\"></span> </template></template> </div> <div class=\"lyteLoaderProgressMessage\">{{ltPropMessage}}</div> </template></template> <div class=\"lyteLoaderTimeoutMessage\">{{ltPropTimeoutMessage}}</div> </div> <lyte-loader-freeze class=\"lyteLoaderFreeze \"></lyte-loader-freeze> </div> </template> </lyte-wormhole> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropProgressed","'%'"]}}}}]}},"default":{}},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"text","position":[1,1,7,0]},{"type":"componentDynamic","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropProgressed","'%'"]}}}}]}},"default":{}},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"text","position":[1,1,7,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropSelector","ltPropProgressBar","ltPropShowClass","ltPropOnTimeout","ltPropMessage","ltPropProgressed","ltPropCloseIcon","ltPropTimeout","ltPropInLine","ltPropDimmer","ltPropTimeoutMessage","ltPropShowLoader","ltPropCloseOnEscape"],

	data : function(){
		return {
			/** 
			 * @prop {boolean} ltPropShow
			 * @default false
			 * @options true,false
			 */
			'ltPropShow' : Lyte.attr( 'boolean' , { 'default' : false } ),
			/** 
			 * @prop {string} ltPropSelector
			 */
			'ltPropSelector' : Lyte.attr( 'string' ),
			/** 
			 * @prop {object} ltPropProgressBar
			 */
			'ltPropProgressBar' : Lyte.attr( 'object' , { 'default' : {} } ),
			/** 
			 * @prop {string} ltPropShowClass
			 */
			'ltPropShowClass' : Lyte.attr( 'string' , { 'default' : '' } ),
			/** 
			 * @prop {object} ltPropOnTimeout
			 */
			'ltPropOnTimeout' : Lyte.attr( 'object' , { 'default' : {} } ),
			/** 
			 * @prop {string} ltPropMessage
			 */
			'ltPropMessage' : Lyte.attr( 'string' ,{ 'default' : 'body' }),
			/** 
			 * @prop {number} ltPropProgressed
			 * @default 0
			 */
			'ltPropProgressed' : Lyte.attr( 'number' , { 'default' : 0 } ),
			/** 
			 * @prop {boolean} ltPropCloseIcon
			 * @default true
			 * @options true,false
			 */
			'ltPropCloseIcon' : Lyte.attr( 'boolean' , { 'default' : true } ),
			/** 
			 * @prop {number} ltPropTimeout
			 * @default 5000
			 */
			'ltPropTimeout' : Lyte.attr( 'number' , { 'default' : 5000 } ),
			/** 
			 * @prop {boolean} ltPropInLine
			 * @default true
			 * @options true,false
			 */
			'ltPropInLine' : Lyte.attr( 'boolean' , { 'default' : false } ),
			/** 
			 * @prop {object} ltPropDimmer
			 * @default true
			 */
			'ltPropDimmer' : Lyte.attr( 'object' , { 'default' : {} } ),
			/** 
			 * @prop {boolean} ltPropTimeoutMessage
			 */
			'ltPropTimeoutMessage' : Lyte.attr( 'string' ),
			/** 
			 * @prop {boolean} ltPropShowLoader
			 * @default true
			 * @options true,false
			 */
			'ltPropShowLoader' : Lyte.attr( 'boolean' , { 'default' : false } ),
			/** 
			 * @prop {boolean} ltPropCloseOnEscape
			 * @default true
			 * @options true,false
			 */
			'ltPropCloseOnEscape' : Lyte.attr( 'boolean' , { 'default' : true } )
		}		
	},
	SetProgressData : function() {
		var progress_data = this.data.ltPropProgressBar;
		var displayMsg = progress_data.displayMsg ? progress_data.displayMsg : {};
		var msg_arr = Object.keys(displayMsg)||[];
		this.sorted_arr = [];
		for (var index = 0; index <= msg_arr.length - 1; index++) {
			this.sorted_arr.push(parseInt(msg_arr[index]));
		}
		progress_data.mode = progress_data.mode ? progress_data.mode : 'indefinite';
		
		if(progress_data.mode === 'indefinite'){
			progress_data.value = -1;
		}else{
			progress_data.value =  progress_data.value ? progress_data.value : 0;
		}
		
		progress_data.show =  progress_data.show === false ? false : true;
		progress_data.class = progress_data.class ? progress_data.class : "";
	},
	CallOnshow : function(){
		if(this.getMethods( "onShow" )){
            this.executeMethod( "onShow" , this.$node ); 
        }
        this.addListener();
		this.AppendValue();
		this.set_timeout();
	},
	CallOntimeout : function(){
		if(this.getMethods("onTimeout")){
            this.executeMethod("onTimeout",this.$node); 
        }
	},
	CallOnberforeshow : function(){

		if(this.getMethods('onBeforeShow')){
			var return_val = this.executeMethod( 'onBeforeShow' , this.$node ) === false ? false : true;
			return return_val;
		}
		return true;
	},
	CallOnhide : function(){
		if(this.getMethods("onHide")){
            if(this.executeMethod("onHide",this.$node) !== false){
            	this.deleteLoaderData();
            } 
        }else{
        	this.deleteLoaderData();
        }

	},
	CallOnberforehide : function(){
		if(this.getMethods('onBeforeHide')){
			var return_val = this.executeMethod( 'onBeforeHide' , this.$node ) === false ? false : true;
			return return_val;
		}
		return true;
	},
	initial_setup : function() {
		var show = this.data.ltPropShow;
		if(show){
			this.ShowLoader();
		}else{
			this.HideLoader();
		}
	}.observes('ltPropShow'),

	ShowLoader : function(){
		this.SetProgressData();
		if(this.CallOnberforeshow()){
			this.setData('ltPropShowLoader' , true);
			var Load_ref =  this.childComp ? this.childComp : this.$node;
			var parent = Load_ref.parentNode;
			Load_ref.classList.add('lyteLoaderElement');
			if( window.getComputedStyle(parent).position !== 'absolute' && parent.nodeName !== 'BODY' ){
				parent.classList.add('lyteLoaderParent');
			}
			this.CallOnshow();
			var freezeStyle = Load_ref.querySelector("lyte-loader-freeze").style;
            if(this.getData('ltPropDimmer') && this.getData('ltPropDimmer').color){
                freezeStyle.background = this.getData('ltPropDimmer').color;
            }
            freezeStyle.opacity = this.getData('ltPropDimmer') && this.getData('ltPropDimmer').opacity ? this.getData('ltPropDimmer').opacity : 0.4;
           
        }else{
        	this.data.ltPropShow = false;
        	this.setData('ltPropShowLoader' , false);
			return;
		}

		
	},
	addListener : function(){
		var closeOnEscape = this.data.ltPropCloseOnEscape;
		if(closeOnEscape){
			document.addEventListener('keyup',this.close_loader.bind(this));
			
		}
	},
	HideLoader : function(){
		var Load_ref = this.childComp || this.$node;
		Load_ref.classList.remove('lyteLoaderElement')

		window.clearTimeout(this.Timeout);
		this.data.ltPropTimer = undefined;
		document.removeEventListener("keyup", this.close_loader );
		if(this.CallOnberforehide()){
			this.CallOnhide();
			this.setData('ltPropShowLoader' , false);
		}else{
        	this.data.ltPropShow = true;
        	this.setData('ltPropShowLoader' , true);
			return;
		}
		
	},
	set_timeout : function(){
		var that = this;
		var delayTime = this.getData('ltPropTimeout.delayTime') ;
		delayTime = delayTime ? delayTime : this.getData('ltPropTimeout');
		if(delayTime >= 0){
			this.$node.ltProp('timeoutMessage',' ');
			
			var timeout = setTimeout(function(){  that.timeout()},delayTime);
			this.setData('ltPropTimeout',delayTime);
			this.Timeout = timeout;
		}
	},
	DisplayMessage : function(){
		if(this.data.ltPropShow){
			this.AppendValue();
		}
		
	}.observes('ltPropProgressBar.value'),

	timeout : function(){
		var Load_ref = this.childComp || this.$node;
		
		var errMsg = this.data.ltPropOnTimeout.errorMsg || 'some unkown error has occured';
		this.setData('ltPropTimeoutMessage', errMsg);
		this.CallOntimeout();
	},
	AppendValue : function(){
		if( this.data.ltPropShow ){
			
			if(this.data.ltPropProgressBar.mode === 'definite' ){
				var value = this.data.ltPropProgressBar.value;
				var displayMsg = this.data.ltPropProgressBar.displayMsg;
				var msg_arr =  this.sorted_arr;
				
				if( msg_arr.length ){
					var val =  msg_arr[0];
					var com_index ,index;
					for(index =0 ; index < msg_arr.length ; index++){
						if( value < msg_arr[index]){
							break;
						}
					}
					com_index = index-1;
					val = msg_arr[index-1] || 0;
					val = parseInt(val);
					this.setData('ltPropMessage',displayMsg[val]);
					this.setData('ltPropProgressed', val);
				}else{
					
					var msg = this.data.ltPropProgressBar.displayMsg||{};
					this.setData('ltPropProgressed',value);
					this.setData('ltPropMessage',msg[0]);
				}
			}else{
				var msg = this.data.ltPropProgressBar.displayMsg||{};
				this.setData('ltPropProgressed',-1);
				this.setData('ltPropMessage',msg[-1]);
			}
		}
	},
	close_loader : function(event){
		if(event.code === 'Escape' ){
			if(this.getMethods( "onCancel" )){
				this.executeMethod('onCancel',this.$node);
			}
			this.$node.setData('ltPropShow',false);
		}
	},
	deleteLoaderData : function(){
		document.removeEventListener("keyup", this.close_loader );
		delete this.childComp;
		delete this.sorted_arr;
		this.$node.ltProp('progressBar.value',0);
		if(this.Timeout){
			window.clearTimeout(this.Timeout);
			delete this.Timeout;
		}
	},
	didDestroy : function(){
		this.deleteLoaderData();
	},
	actions : {
		lyteLoadCloser : function(event){
			if(this.getMethods( "onCancel" )){
				this.executeMethod('onCancel',this.$node);
			}
			this.$node.setData( 'ltPropShow' , false );
		}
	},
	methods : {
		beforeWormholeAppend : function( wormhole , outlet ){
			this.childComp = wormhole;
		}
	}
});
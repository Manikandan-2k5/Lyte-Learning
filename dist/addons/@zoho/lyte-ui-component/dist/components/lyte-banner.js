if(!_LyteBanner_){
	var _LyteBanner_ =  {};
}
/**
 * Renders a banner
 * @component lyte-banner
 * @version 3.1.0
 * @methods onBeforeShow,onShow,onBeforeClose,onClose
 * @dependency lyte-modal
 * @condition ltPropFloating true
 */
Lyte.Component.register("lyte-banner",{
_template:"<template tag-name=\"lyte-banner\" style=\"{{if(ltPropInline,concat(ltPropPosition,':0;'))}}\" class=\"{{if(ltPropInline,'lyteBannerInlineFloating','')}}\"> <template is=\"if\" value=\"{{ltPropFloating}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropInline}}\"><template case=\"true\"> <div class=\"lyteBannerFloating {{ltPropClass}}\" style=\"display:none;width:{{ltPropWidth}}; height:{{ltPropHeight}};{{if(expHandlers(ltPropPosition,'===','top'),'top:-100%','bottom:-100%')}};\" aria-live=\"polite\"> <lyte-yield yield-name=\"yield\"></lyte-yield> <template is=\"if\" value=\"{{ltPropShowCloseButton}}\"><template case=\"true\"> <span class=\"lyteModalClose lyteBannerClose\" role=\"button\" __click=\"{{action('close')}}\"></span> </template></template> </div> </template><template case=\"false\"> <lyte-modal id=\"_lyteBannerModal\" lt-prop=\"{{stringify(ltPropModal)}}\" lt-prop-height=\"{{ltPropHeight}}\" lt-prop-width=\"{{ltPropWidth}}\" lt-prop-show=\"{{lbind(ltPropShow)}}\" lt-prop-freeze=\"false\" lt-prop-allow-multiple=\"true\" lt-prop-close-on-escape=\"false\" lt-prop-re-render-modal=\"{{lbind(ltPropReRenderModal)}}\" lt-prop-bind-to-body=\"{{lbind(ltPropBindToBody)}}\" lt-prop-show-close-button=\"{{ltPropShowCloseButton}}\" lt-prop-overlay-close=\"false\" lt-prop-wrapper-class=\"lyteBannerModal {{if(ltPropModal.wrapperClass,ltPropModal.wrapperClass,'')}}\" on-show=\"{{method(&quot;modalOnShow&quot;)}}\" on-before-show=\"{{method(&quot;modalOnBeforeShow&quot;)}}\" on-close=\"{{method(&quot;modalOnClose&quot;)}}\" on-before-close=\"{{method(&quot;modalOnBeforeClose&quot;)}}\" lt-prop-transition=\"{{ltPropTransition}}\" lt-prop-offset=\"{{if(ltPropModal.offset,ltPropModal.offset,ltPropOffset)}}\" lt-prop-aria=\"true\" lt-prop-aria-attributes=\"{{ltPropAriaAttributes}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content class=\"lyteBannerModalContent {{ltPropClass}}\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </lyte-modal-content> </template> </lyte-modal> </template></template> </template><template case=\"false\"> <div class=\"lyteBannerNonFloating {{ltPropClass}}\" style=\"display:none;width:{{ltPropWidth}}; height:{{ltPropHeight}};\" aria-live=\"polite\"> <lyte-yield yield-name=\"yield\"></lyte-yield> <template is=\"if\" value=\"{{ltPropShowCloseButton}}\"><template case=\"true\"> <span tabindex=\"0\" aria-label=\"{{lyteUiI18n(ariaCloseLabel)}}\" role=\"button\" class=\"lyteModalClose lyteBannerClose\" __click=\"{{action('close')}}\"></span> </template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'display:none;width:'","ltPropWidth","'; height:'","ltPropHeight","';'",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"expHandlers","args":["ltPropPosition","'==='","'top'"]}},"'top:-100%'","'bottom:-100%'"]}},"';'"]}}}},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'display:none;width:'","ltPropWidth","'; height:'","ltPropHeight","';'"]}}}},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropInline",{"type":"helper","value":{"name":"concat","args":["ltPropPosition","':0;'"]}}]}}}},
_observedAttributes :["ltPropModal","ltPropFloating","ltPropInline","ltPropTransition","ltPropOffset","ltPropShow","ltPropShowCloseButton","ltPropPosition","ltPropInitialSpacing","ltPropBannerSpacing","ltPropWidth","ltPropHeight","ltPropClass","ltPropReRenderModal","ltPropBindToBody","ltPropAriaAttributes","ariaCloseLabel","returnFalse","handleLbind"],

	data:function(){
		return {
			/** 
			 * @componentProperty {object} ltPropModal
			 * @default {}
			 * @component lyte-modal
			 * @ignore-props ltPropShow,ltPropTransition,ltPropOffset,ltPropShowCloseButton,ltPropWidth,ltPropHeight,ltPropReRenderModal,ltPropBindToBody
			 */
			"ltPropModal":Lyte.attr("object",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-banner', 'modal', {} )
			}),
			/** 
			 * @componentProperty {boolean} ltPropFloating=true
			 */
			"ltPropFloating":Lyte.attr("boolean",{"default":true}),
			/** 
			 * @componentProperty {boolean} ltPropInline=false
			 */
			"ltPropInline":Lyte.attr("boolean",{"default":false}),
			/** 
			 * @typedef {object} transitionObject
			 * @property {slideFromTop|slideFromBottom|slideFromLeft|slideFromRight|fadeIn} animation=slideFromTop
			 * @property {string} duration=0.5
			*/
			/** 
			 * @componentProperty {transitionObject} ltPropTransition
			 * @default {"animation":"slideFromTop","duration":"0.5"}
			 */
			"ltPropTransition":Lyte.attr("object",{"default":{animation:"slideFromTop",duration:"0.5"}}),
			/**
			 * @typedef {object} offset
			 * @property {string} left
			 * @property {string} top
			 * @property {string} right
			 * @property {string} bottom
			 */
			/** 
			 * @componentProperty {offset} ltPropOffset
			 * @default {}
			 */
			"ltPropOffset" : Lyte.attr("object",{"default":{}}),
			/** 
			 * @componentProperty {boolean} ltPropShow=false
			 */
			"ltPropShow":Lyte.attr("boolean",{"default":false}),
			/** 
			 * @componentProperty {boolean} ltPropShowCloseButton=true
			 */
			"ltPropShowCloseButton":Lyte.attr("boolean",{"default":true}),
			/** 
			 * @componentProperty {top|bottom} ltPropPosition=top
			 */
			"ltPropPosition":Lyte.attr("string",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-banner', 'position', "top" )
			}),
			/** 
			 * @componentProperty {string} ltPropInitialSpacing=0px
			 * @suffix px
			 */
			"ltPropInitialSpacing":Lyte.attr("string",{"default":"0px"}),
			/** 
			 * @componentProperty {string} ltPropBannerSpacing=2px
			 * @suffix px
			 */
			"ltPropBannerSpacing":Lyte.attr("string",{"default":"2px"}),
			/** 
			 * @componentProperty {string} ltPropWidth=100%
			 */
			"ltPropWidth":Lyte.attr("string",{"default":"100%"}),
			/** 
			 * @componentProperty {string} ltPropHeight=auto
			 */
			"ltPropHeight":Lyte.attr("string",{"default":"auto"}),
			/** 
			 * @componentProperty {string} ltPropClass=""
			 */
			"ltPropClass":Lyte.attr("string",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-banner', 'class', "" )
			}),
			/** 
			 * @componentProperty {boolean} ltPropReRenderModal=false
			 */
			"ltPropReRenderModal" : Lyte.attr("string",{"default":false}),
			/** 
			 * @componentProperty {boolean} ltPropBindToBody=false
			 */
			"ltPropBindToBody" : Lyte.attr("string",{"default":false}),
			/**
             * @componentProperty {object} ltPropAriaAttributes
             * @version 3.42.0
             * @default{}
            */
			"ltPropAriaAttributes" : Lyte.attr( 'object', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-banner', 'ariaAttributes', {
					role : "banner",
					"close-label": "Close"
				}), 
				'watch' : true 
			}),
			"ariaCloseLabel" : Lyte.attr("string"),
			"returnFalse" : Lyte.attr("boolean",{"default":false}),
			"handleLbind" : Lyte.attr("boolean",{"default":false})
		}		
	},
	getBannerElement: function(){
		var floatingBanner = this.data.ltPropFloating;
		var inlineBanner = this.data.ltPropInline;
		if(floatingBanner) {
			if(inlineBanner) {
				return this.$node.querySelector(".lyteBannerFloating");
			}
			// else {
			// 	var lyteModal = this.$node.querySelector("lyte-modal");
			// 	if(lyteModal.component.actualModalDiv) {
			// 		return lyteModal.component.actualModalDiv;
			// 	}
			// }
		}
		else {
			return this.$node.querySelector(".lyteBannerNonFloating");
		}
	},
	addAriaValues: function( oldAria, newAria ) {
		var banner = this.getBannerElement();
		if(banner) {
			var closeLabelKey = "close-label";
			if(newAria.hasOwnProperty(closeLabelKey)) {
				this.setData("ariaCloseLabel", newAria[closeLabelKey]);
				delete newAria[closeLabelKey];
			}
			_lyteUiUtils.setAttribute( banner, newAria, oldAria );
		}
	},
	ariaObserver: function( change ) {
		var oldAria = change? change.oldValue : {},
		newAria = this.data.ltPropAriaAttributes;
		if(!newAria.hasOwnProperty("role")){
			newAria.role = "banner";
		}
		this.addAriaValues( oldAria, newAria );
	}.observes( 'ltPropAriaAttributes.*' ).on('didConnect'),
	onBeforeShow : function(){
		if(this.getMethods('onBeforeShow')){
			return this.executeMethod("onBeforeShow",this);
		}
	},
	onShow : function(){
		if(this.getMethods('onShow')){
			this.executeMethod("onShow",this);
		}
	},
	onBeforeClose : function(){
		if(this.getMethods('onBeforeClose')){
			return this.executeMethod("onBeforeClose",this);
		}
	},
	onClose : function(){
		if(this.getMethods('onClose')){
			this.executeMethod("onClose",this);
		}
	},
	isCheckedLbound: function() {
		if( !this.$node._attributeDetails ) {
			return false;
		}
		return this.$node._attributeDetails[ 'lt-prop-show' ] ? !!this.$node._attributeDetails[ 'lt-prop-show' ].isLbind : false;
	},
	showBanner : function(banner){
		if(this.data.ltPropInline){
			this.calculateOffset(banner);
			this.transitionForOpen(banner);
		}
		else{
			banner.style.display = "block";
			this.onShow();
		}
	},
	closeBanner : function(banner){
		if(this.data.ltPropInline){
			this.transitionForClose(banner);
		}
		else{
			banner.style.display = "none";
			this.onClose();
		}
	},
	calculateOffset : function(banner){
		var offset = this.data.ltPropOffset;
		if(offset.left == "center"){
			var width = banner.offsetWidth/2;
			offset.left = "calc( 50% - "+width+"px)";
	    }
		for(var key in offset){
			banner.style[key] = offset[key];
		}
	},
	transitionForOpen : function(banner){
		var transition = this.data.ltPropTransition,
		offset = this.data.ltPropOffset,
		position = this.data.ltPropPosition,
		value = offset[position]?offset[position]:0,
		percent,bannerHeight;
		banner.style.display = "block";
		this._transitionEnd = this.transitionEnd.bind(this,"onShow");
		bannerHeight = banner.offsetHeight;
		if(value){
			percent = value.indexOf('%')>=0
		}
		this.$node.style.height = percent? "100%":( bannerHeight + value) +"px";
		banner.style.transitionDuration = transition.duration+"s";
		if(transition.duration){
			setTimeout(function(){
				banner.addEventListener("transitionend",this._transitionEnd,true);
				banner.style[position] = value;
			}.bind(this),10);
		}
	},
	transitionForClose :function(banner){
		var position = this.data.ltPropPosition;
		this._transitionEnd = this.transitionEnd.bind(this,"onClose");
		if(banner.style.display != "none"){
			banner.addEventListener("transitionend",this._transitionEnd,true);
			banner.style[position] = "-100%";
		}
	},
	transitionEnd : function(callback){
		var banner = event.target;
		banner.removeEventListener("transitionend",this._transitionEnd,true);
		this.getMethods(callback) && this.executeMethod(callback,this);
		if(callback === "onClose"){
			banner.style.display = "none";
		}
		delete this._transitionEnd;
	},
	getBannerIndex : function(position) {
		var banners  = _LyteBanner_[position],
		bannerLength = banners.length,
		bannerIndex;
		for(var index=0;index<bannerLength;index++){
			if(this === banners[index]){
				bannerIndex =  index;
				break;
			}
		}
		return bannerIndex;
	},
	getTotalHeight : function(bannerIndex) {
		var currentModal = this.$node.querySelector("lyte-modal").component,
		compPosition = currentModal.actualModalDiv.getBoundingClientRect(),
		initDiff = parseFloat(this.$node.ltProp("InitialSpacing")),
		bannerDiff = parseFloat(this.$node.ltProp("BannerSpacing")),
		height = bannerIndex-1<0?initDiff:bannerDiff;
		height = height + compPosition.height;
		return height;
	},
	rearrangeBanner : function(){
		var position = this.$node.ltProp("Position");
		if(position != "" && _LyteBanner_[position] && _LyteBanner_[position].length){
			var bannerIndex = this.getBannerIndex(position);
			var height = this.getTotalHeight(bannerIndex);
			var banners  = _LyteBanner_[position],
			bannerLength = banners.length;
			for(var index=bannerIndex+1;index<bannerLength;index++){
				var modal = banners[index].$node.querySelector("lyte-modal"),
				bannerDiff = parseFloat(banners[index].$node.ltProp("BannerSpacing")),
				initDiff = parseFloat(banners[index].$node.ltProp("InitialSpacing")),
				tempHeight=0;
				var modal_pos = modal.component.actualModalDiv.getBoundingClientRect();
				var offset = modal.ltProp("offset");
				tempHeight = (position == "top")? modal_pos.top - height:parseInt(offset.bottom) - height;
				if(parseInt(tempHeight)-bannerDiff <= 0){
					height = height + bannerDiff - initDiff;
					tempHeight = tempHeight - bannerDiff;
					tempHeight = tempHeight + initDiff;
				}
				if(position === "top"){
					offset.top = tempHeight+"";
				}
				else{
					offset.bottom = tempHeight+"";
				}
				modal.component.computeOffsetImpl();
			}
			_LyteBanner_[position].splice(bannerIndex,1);
			this.$node.ltProp("offset", {top:"center",left:"center"});
		}else{
			this.$node.ltProp("position","top");
		}
	},
	isNotCustomOffset : function(component) {
		var obj = {top:"center",left:"center"},
		keys = Object.keys(component.$node.ltProp("offset")),
		keysLength = keys.length,
		offsetFlag=true;
		for(var index=0;index<keysLength;index++){
			var key = keys[index];
			if(obj[key] != component.$node.ltProp("offset")[key]){
				offsetFlag = false;
			}
		}
		return offsetFlag;
	},
	didDestroy : function(){
		this.data.ltPropFloating && this.rearrangeBanner();
	},
	actions:{
        close:function(){
			this.setData('ltPropShow',false);
        }
    },
	methods:{
		modalOnBeforeShow:function(component){
			if(this.onBeforeShow() === false){
				this.setData("returnFalse",true);
				return false;
			}
			var height=0,
			offsetFlag=this.isNotCustomOffset(component);
			if(offsetFlag){
				var position = this.$node.ltProp("Position"),
				init_diff = parseFloat(this.$node.ltProp("InitialSpacing")),
				banner_diff = parseFloat(this.$node.ltProp("BannerSpacing"));
				if(position){
					_LyteBanner_[position] = _LyteBanner_[position] || [];
					var banners =  _LyteBanner_[position];
					if(banners.length){
						var index = banners.length-1;
						var modal = banners[index].$node.querySelector("lyte-modal");
						var modal_pos = modal.component.actualModalDiv.getBoundingClientRect();
						height =  modal_pos.height;
						if(modal.ltProp("offset")){
							if(modal.ltProp("offset")[position]){
								height = height + parseInt(modal.ltProp("offset")[position],10);
							}
						}
						if(banner_diff){
							height = height + banner_diff;
						}
						if(position == "top"){
							component.$node.ltProp("offset",{top:height+"px",left:"0px"});
						}
						else{
							this.$node.ltProp("transition",{"animation":"slideFromBottom"});
							this.$node.ltProp("offset",{bottom:height+"px",left:"0px"});
						}
					}
					else{
						if(init_diff){
							height = height + init_diff;
						}
						if(position !="top"){
							this.$node.ltProp("transition",{"animation":"slideFromBottom"});
							this.$node.ltProp("offset",{bottom:height+"px",left:"0px"});
						}
						else{
							this.$node.ltProp("offset",{top:height+"px",left:"0px"});
						}
					}
					_LyteBanner_[position].push(this);
				}
			}
			else{
				this.$node.ltProp("position","");
			}
		},
		modalOnShow:function(component){ 
			this.onShow();
		},
		modalOnBeforeClose:function(event,component){
			if(this.onBeforeClose() === false){
				this.setData("returnFalse",true);
				return false;
			}
			this.rearrangeBanner();
		},
		modalOnClose:function(component){
			this.onClose();
		}
	},
	showChanges:function(change){
		var show = this.$node.ltProp("Show");
		var floating = this.$node.ltProp("Floating"),
		inline = this.data.ltPropInline;
		if(this.data.returnFalse){
			this.setData("returnFalse",false);
			return;
		}
		if( this.getData( 'handleLbind' ) ) {
			this.setData( 'returnFalse', true );
			this.setData( 'ltPropShow', !this.getData( 'ltPropShow' ) );
			this.setData( 'handleLbind', false );
			return ;
		}
		if(!floating || (floating && inline)){
			var banner = this.$node.querySelector(inline?".lyteBannerFloating":".lyteBannerNonFloating"),
			returnValue;
			if(show){
				returnValue = this.onBeforeShow();
				if(returnValue == false){
					if(change && this.isCheckedLbound()){
						this.setData( 'handleLbind', true );
						this.data.ltPropShow = false;
					}
					else{
						this.setData("returnFalse",true);
						this.setData('ltPropShow',false);
					}
					return;
				}
				this.showBanner(banner);
			}
			else if(change && change.item === "ltPropShow"){ //to prevent closeCallback on didConnect
				returnValue = this.onBeforeClose();
				if(returnValue == false){
					if(this.isCheckedLbound()){
						this.setData( 'handleLbind', true );
						this.data.ltPropShow = true;
					}
					else{
						this.setData("returnFalse",true);
						this.setData('ltPropShow',true);
					}
					return;
				}
				this.closeBanner(banner);
			}
		}
	}.observes('ltPropShow','ltPropFloating').on("didConnect")
	
});
/**
 * @syntax yielded 
 *	<lyte-banner>
 * 		<template is = "registerYield" yield-name = "yield">
 *       	<div>
 *				Example Banner
 *         	</div>
 *   	</template>
 *	</lyte-banner>
 */
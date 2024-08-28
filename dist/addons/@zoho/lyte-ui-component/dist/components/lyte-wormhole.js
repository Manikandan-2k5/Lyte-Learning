/**
 * This component is used to append a dom anywhere in the document
 * @component lyte-wormhole
 * @version 2.2.6
 * @methods onBeforeAppend,onAppend
 */


 Lyte.Component.register("lyte-wormhole",{
_template:"<template tag-name=\"lyte-wormhole\"> <lyte-yield yield-name=\"lyte-content\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropQuery","ltPropAppendOnCreation","ltPropAppend","ltPropShow"],


	data : function(){
		return {
			/**
			 * @componentProperty {string} ltPropQuery
			 * @version 2.2.6
			 */
			'ltPropQuery' : Lyte.attr( 'string' ),

			'ltPropAppendOnCreation': Lyte.attr( 'boolean', { 'default': true } ),

			'ltPropAppend': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropShow' : Lyte.attr('boolean' , {	'default' : false })
		}
	},

	didDestroy: function() {
		this.parent = null;
		_lyteUiUtils.popupStack=null;
	},

	initFunc: function() {

		if(!_lyteUiUtils.popupStack){
            _lyteUiUtils.popupStack = {
				globalStack:[],
				modalStack:[],
				newModalStack:[],
				popoverStack:[],
				alertStack:[],
				messageboxStack:[]
			};
        }
		
		let utilObj={},lastActiveElement;

		if(this.parent){
			utilObj.parentElement=this.parent;
		} else {
			utilObj.parentElement=this.$node.parentElement;
		}
		utilObj.focusedElement=document.activeElement;

		if(this.$node.getData('ltPropShow')){
			Lyte.arrayUtils( _lyteUiUtils.popupStack.globalStack, 'push', utilObj);
			if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-MODAL'){
				Lyte.arrayUtils( _lyteUiUtils.popupStack.modalStack, 'push', utilObj);
			}
			if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-NEW-MODAL'){
				Lyte.arrayUtils( _lyteUiUtils.popupStack.newModalStack, 'push', utilObj);
			}
			else if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-POPOVER'){
				Lyte.arrayUtils( _lyteUiUtils.popupStack.popoverStack, 'push', utilObj);
			}
			else if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-ALERT'){
				Lyte.arrayUtils( _lyteUiUtils.popupStack.alertStack, 'push', utilObj);
			}
			else if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-MESSAGEBOX'){
				Lyte.arrayUtils( _lyteUiUtils.popupStack.messageboxStack, 'push', utilObj);
			}
		}
		else {
			if(_lyteUiUtils.popupStack.globalStack.length >= 1){
				if(utilObj.parentElement && utilObj.parentElement.tagName == 'LYTE-MODAL' && _lyteUiUtils.popupStack.modalStack.length>=1){
					_lyteUiUtils.popupStack.modalStack.forEach(function(ele,ind){
							if(ele.parentElement==utilObj.parentElement){
								Lyte.arrayUtils( _lyteUiUtils.popupStack.modalStack , 'removeAt' , ind , 1 );
								return;
							}
					}.bind(this));
				}
				if(utilObj.parentElement && utilObj.parentElement.tagName == 'LYTE-NEW-MODAL' && _lyteUiUtils.popupStack.newModalStack.length>=1){
					_lyteUiUtils.popupStack.newModalStack.forEach(function(ele,ind){
						if(ele.parentElement==utilObj.parentElement){
							Lyte.arrayUtils( _lyteUiUtils.popupStack.newModalStack , 'removeAt' , ind , 1 );
							return;
						}
				}.bind(this));
				}
				else if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-POPOVER'&& _lyteUiUtils.popupStack.popoverStack.length>=1){
					_lyteUiUtils.popupStack.popoverStack.forEach(function(ele,ind){
						if(ele.parentElement==utilObj.parentElement){
							Lyte.arrayUtils( _lyteUiUtils.popupStack.popoverStack, 'removeAt' , ind , 1 );
							return;
						}
				}.bind(this));
				}
				else if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-ALERT'&& _lyteUiUtils.popupStack.alertStack.length>=1){
					_lyteUiUtils.popupStack.alertStack.forEach(function(ele,ind){
						if(ele.parentElement==utilObj.parentElement){
							Lyte.arrayUtils( _lyteUiUtils.popupStack.alertStack, 'removeAt' , ind , 1 );
							return;
						}
				}.bind(this));
				}
				else if(utilObj.parentElement && utilObj.parentElement.tagName=='LYTE-MESSAGEBOX' && _lyteUiUtils.popupStack.messageboxStack.length>=1){
					_lyteUiUtils.popupStack.messageboxStack.forEach(function(ele,ind){
						if(ele.parentElement==utilObj.parentElement){
							Lyte.arrayUtils( _lyteUiUtils.popupStack.messageboxStack , 'removeAt' , ind , 1 );
							return;
						}
				}.bind(this));
				}
				var focusElement, changeFocus=true;
				_lyteUiUtils.popupStack.globalStack.forEach(function(ele,ind){
					if(ele.parentElement==utilObj.parentElement){
						if(ind<_lyteUiUtils.popupStack.globalStack.length-1){
							changeFocus=false;
							_lyteUiUtils.popupStack.globalStack[ind+1].focusedElement =	_lyteUiUtils.popupStack.globalStack[ind].focusedElement;
						}
						focusElement=Lyte.arrayUtils( _lyteUiUtils.popupStack.globalStack , 'removeAt' , ind , 1 );
						return;
					}
				}.bind(this));
				if(focusElement && focusElement[0]){
					lastActiveElement= focusElement[0].focusedElement;
				}
				if(changeFocus && lastActiveElement){
						lastActiveElement.focus();	
				}
			}
		}

	}.observes( 'ltPropQuery','ltPropShow' ).on('init'),

	didConnectFunc :function(){
		var appendOnCreation = this.getData( 'ltPropAppendOnCreation' );

		if( !appendOnCreation ) {
			return ;
		}

		this.appendContent();
	}.observes( 'ltPropQuery' ).on( 'didConnect' ),

	appendObserver: function() {
		var append = this.getData( 'ltPropAppend' );

		if( append ) {
			this.appendContent();
		}
		else {
			this.bringContentBack();
		}
	}.observes( 'ltPropAppend' ),

	appendContent: function() {
		var ret, 
		outlet = this.data.ltPropQuery ? document.querySelector( this.data.ltPropQuery ) : document.body;

		if( !outlet ) {
			console.error( 'Provide valid outlet to append' );
			return;
		}

		if( this.getMethods( 'onBeforeAppend' ) && this.executeMethod( 'onBeforeAppend', this.$node, outlet ) == false ) {
			return;
		}
		this.parent = this.$node.parentElement;
		_lyteUiUtils.appendChild( outlet, this.$node );
		this.appended = true;

		if( this.getMethods( 'onAppend' ) ) {
			this.executeMethod( 'onAppend', this.$node, outlet )
		}
	},

	bringContentBack: function() {
		_lyteUiUtils.appendChild( this.parent, this.$node );
	}
});

/**
 * @syntax yielded
 * <lyte-wormhole>
 * 	  <template is = "registerYield" yield-name = "lyte-content">
 * 		 Some wormhole content
 *	  </template>
 * </lyte-wormhole>
 */
/**
 * Renders a navigator
 * @component lyte-navigator
 * @version  1.0.0
 * @methods onNext,onPrevious,onHome,onEnd,onSelect,beforeRender,afterRender
 */
Lyte.Component.register('lyte-navigator', {
_template:"<template tag-name=\"lyte-navigator\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;default&quot;)}}\"><template case=\"true\"> <div class=\"lyteNavigator\" role=\"navigation\" __click=\"{{action('clickEvent',event)}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <div class=\"lyteDoubleBack lyteIconDoubleBack\" role=\"button\" aria-label=\"start\"></div> <div class=\"lyteSingleBack lyteIconSingleBack\" role=\"button\" aria-label=\"previous\"></div> <template is=\"if\" value=\"{{expHandlers(ltPropShowOnlyIcon,'!')}}\"><template case=\"true\"> <div class=\"lyteNavigatorMidPoint\">{{startRecord}} <span class=\"lyteNavigatorText\">{{ltPropMiddleText}}</span> {{endRecord}}</div> </template></template> <div class=\"lyteSingleFront lyteIconSingleFront\" role=\"button\" aria-label=\"next\"></div> <div class=\"lyteDoubleFront lyteIconDoubleFront\" role=\"button\" aria-label=\"end\"></div> </template><template case=\"false\"> <lyte-yield yield-name=\"navigatorYield\" start-record=\"{{startRecord}}\" end-record=\"{{endRecord}}\"></lyte-yield> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;simple&quot;)}}\"><template case=\"true\"> <div class=\"lyteNavigator\" role=\"navigation\" __click=\"{{action('clickEvent',event)}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <div class=\"lytepagination\"> <div class=\"lyteNavArrow lyteDoubleBack hover\" role=\"button\" aria-label=\"start\"></div> <div class=\"lyteNavArrow lyteSingleBack hover\" role=\"button\" aria-label=\"previous\"> </div> <template is=\"if\" value=\"{{expHandlers(ltPropShowOnlyIcon,'!')}}\"><template case=\"true\"> <div class=\"lytepage\"> <template is=\"for\" items=\"{{paginationRange}}\" item=\"page\" indexval=\"pageno\"> <div data-value=\"{{page}}\" class=\"lytesimple\" role=\"button\" aria-label=\"{{page}}\">{{unescape(page)}}</div> </template> </div> </template></template> <div class=\"lyteNavArrow lyteSingleFront hover\" role=\"button\" aria-label=\"next\"> </div> <div class=\"lyteNavArrow lyteDoubleFront hover\" role=\"button\" aria-label=\"end\"></div> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"navigatorYield\" pagination-range=\"{{paginationRange}}\"></lyte-yield> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;border&quot;)}}\"><template case=\"true\"> <div class=\"lyteNavigator\" role=\"navigation\" __click=\"{{action('clickEvent',event)}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <div class=\"lytepagination\"> <div class=\"lyteNavArrowBorder lyteDoubleBack hover lyteborder\" role=\"button\" aria-label=\"home\"></div> <div class=\"lyteNavArrowBorder lyteSingleBack hover lyteborder\" role=\"button\" aria-label=\"previous\"> </div> <template is=\"if\" value=\"{{expHandlers(ltPropShowOnlyIcon,'!')}}\"><template case=\"true\"> <div class=\"lytepage\"> <template is=\"for\" items=\"{{paginationRange}}\" item=\"page\" indexval=\"pageno\"> <div data-value=\"{{page}}\" class=\"lyteborder\" role=\"button\" aria-label=\"{{page}}\">{{unescape(page)}}</div> </template> </div> </template></template> <div class=\"lyteNavArrowBorder lyteSingleFront hover lyteborder\" role=\"button\" aria-label=\"next\"> </div> <div class=\"lyteNavArrowBorder lyteDoubleFront hover lyteborder\" role=\"button\" aria-label=\"end\"></div> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"navigatorYield\" pagination-range=\"{{paginationRange}}\"></lyte-yield> </template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[1,4]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropPerpage","ltPropValue","ltPropRecords","ltPropMoreRecords","ltPropMiddleText","ltPropType","paginationRange","ltPropSelected","ltPropShowOnlyIcon","ltPropShowText","ltPropYield","ltPropAdjustStart","ltPropAria","ltPropAriaNavigator","ltPropAriaNext","ltPropAriaPrev","ltPropAriaHome","ltPropAriaEnd"],

	init : function(){

		if(this.getMethods('beforeRender'))
            {
            	
                this.executeMethod('beforeRender', this.$node);
            }

	},
	didConnect:function(){

		this.buttonDisable.call(this);
		this.checkButton.call(this);
		if(this.getData( "ltPropType")!="default" ) {   
			 var elems=this.$node.querySelectorAll('lyte-nav-arrow');
			 if(this.getData('ltPropShowText')){
			 	this.$node.querySelector('.lytepagination').classList.add('textNavLink');
			 }
			if( elems.length == 4 ){   
        		this.$node.querySelector( '.lyteDoubleBack' ).appendChild(elems[0]);
        		this.$node.querySelector( '.lyteSingleBack' ).appendChild(elems[1]);
        		this.$node.querySelector( '.lyteSingleFront' ).appendChild(elems[2]);
        		this.$node.querySelector( '.lyteDoubleFront' ).appendChild(elems[3]);
        		
        	}
        	if( elems.length == 2 ) {   
        		this.$node.querySelector( '.lyteDoubleBack' ).style.display = "none";
        		this.$node.querySelector( '.lyteSingleBack' ).appendChild(elems[0]);
        		this.$node.querySelector( '.lyteSingleFront' ).appendChild(elems[1]);
        		this.$node.querySelector( '.lyteDoubleFront' ).style.display = "none";
        	}
        }
		if(this.getMethods('afterRender')) {  
			
            this.executeMethod('afterRender', this.$node);
        }
       	$L.fastdom.measure( function(){
			var fg = window.getComputedStyle( this.$node ).getPropertyValue( 'direction' ) == 'rtl';
			$L.fastdom.mutate( function(){
				if( fg ) {
					this.$node.classList.add( 'lyteRTL' )
				}
			}.bind( this ) )
		}.bind( this ) )	
       	
	}, 
	data: function(){
		return {
			/**
             * @componentProperty {number} ltPropPerpage=10
             * @minValue 0
             */
			ltPropPerpage:Lyte.attr("number", {"default": _lyteUiUtils.resolveDefaultValue( 'lyte-navigator', 'perPage', 10 ) }), 
			/**
             * @componentProperty {number} ltPropValue=0
             * @minValue 0
             */
			ltPropValue:Lyte.attr("number", {"default":0}), 
			/** @componentProperty {number} ltPropRecords
            */
			ltPropRecords:Lyte.attr("number", {"default":undefined}),
			/**
             * @componentProperty {boolean} ltPropMoreRecords=false
             * 
             */
			ltPropMoreRecords:Lyte.attr("boolean", {"default":false}),
			/**
             * @componentProperty {string} ltPropMiddleText='to'
             */
			ltPropMiddleText : Lyte.attr('string', {'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-navigator', 'middleText', 'to' ) }),
			/**
             * @componentProperty {default | simple | border} ltPropType='default'
             */
			ltPropType:Lyte.attr("string", {"default":_lyteUiUtils.resolveDefaultValue( 'lyte-navigator', 'type', 'default' ) }),
			paginationRange:Lyte.attr("array",{"default":undefined}),
			/**
             * @componentProperty {number} ltPropSelected=0
             */
			ltPropSelected:Lyte.attr("number",{"default":0}),
			/**
             * @componentProperty {boolean} ltPropShowOnlyIcon=false
             */
			ltPropShowOnlyIcon:Lyte.attr("boolean",{"default":_lyteUiUtils.resolveDefaultValue( 'lyte-navigator', 'showOnlyIcon', false ) }),
			/**
             * @componentProperty {boolean} ltPropShowText=false
             */
			ltPropShowText:Lyte.attr("boolean",{"default":_lyteUiUtils.resolveDefaultValue( 'lyte-navigator', 'showText', false ) }),
			/**
             * @componentProperty {boolean} ltPropYield=false
             */
			ltPropYield:Lyte.attr("boolean",{"default":false}),
			/**
             * @componentProperty {boolean} ltPropAdjustStart=false
             * @version 3.0.0
             */
			ltPropAdjustStart : Lyte.attr( "boolean", { "default" : false } ),
			/**
             * @componentProperty {boolean} ltPropAria=false
             * @version 3.1.0
             */
			ltPropAria : Lyte.attr('boolean', {'default': true}),
			/**
             * @componentProperty {object} ltPropAriaNavigator={}
             * @version 3.1.0
             */
			ltPropAriaNavigator : Lyte.attr('object', { 
				'default':{}
			}),
			/**
             * @componentProperty {object} ltPropAriaNext={}
             * @version 3.1.0
             */
			ltPropAriaNext : Lyte.attr('object', {
				'default':{}
			}),
			/**
             * @componentProperty {object} ltPropAriaPrev={}
             * @version 3.1.0
             */
			ltPropAriaPrev : Lyte.attr('object', {
				'default':{}
			}),
			/**
             * @componentProperty {object} ltPropAriaHome={}
             * @version 3.1.0
             */
			ltPropAriaHome : Lyte.attr('object',{
				'default':{}
			}),
			/**
             * @componentProperty {object} ltPropAriaEnd={}
             * @version 3.1.0
             */
			ltPropAriaEnd : Lyte.attr('object',{
			'default':{}
			})
		}
	}, 
	ariaObserver: function( change ) {
		if(this.getData('ltPropAria')){
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteNavigator'), this.getData( 'ltPropAriaNavigator' ) || {}, {} );
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteSingleFront'), this.getData( 'ltPropAriaNext' ) || {}, {} );
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteSingleBack'), this.getData( 'ltPropAriaPrev' ) || {}, {} );
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteDoubleFront'), this.getData( 'ltPropAriaEnd' ) || {}, {} );
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteDoubleBack'), this.getData( 'ltPropAriaHome' ) || {}, {} );

		}

	}.observes( 'ltPropAriaNavigator','ltPropAriaNext','ltPropAriaPrev','ltPropAriaHome','ltPropAriaEnd' ).on( 'didConnect' ),
	buttonDisable:function(){
		if( !this.data.ltPropYield ) {
			var next = this.$node.querySelector('.lyteSingleFront' ).style,
			prev = this.$node.querySelector( '.lyteSingleBack' ).style,
			hme = this.$node.querySelector('.lyteDoubleBack' ).style,
			end = this.$node.querySelector('.lyteDoubleFront' ).style;
			if( next ) {
				
				next.display = this.getMethods('onNext') ? '' : 'none';
			}
			if( prev ) {
				
				prev.display = this.getMethods('onPrevious') ? '' : 'none';
			}
			if( hme ) {
				
				hme.display = this.getMethods('onHome') ? '' : 'none';
			}
	        if( end ) {
	        	
	        	end.display = this.getMethods('onEnd') ? '' : 'none';
	        }
        }     
	}, 
	setAriaDisabled : function(item){
		item.setAttribute('aria-disabled',true)
	},
	removeAriaDisabled : function(item){
		item.removeAttribute('aria-disabled')
	},
	activeAdd : function(){

		if( this.getData( "ltPropType" ) != 'default' && !this.getData( 'ltPropShowOnlyIcon' ) ){
			var a = this.$node.querySelector( '[data-value="'+ this.getData( 'ltPropSelected' ) +'"]' );
			if( a!=null ){
				a.classList.add( 'lyteActiveAdd' );
				if(this.getData('ltPropAria')){
					a.tabIndex=0
					a.focus()
				}
				
			}
		}
	},
	onForward : function( evt ){
		var firstIndex = this.getData( 'ltPropValue' ), perPage = this.getData( 'ltPropPerpage' ), MaxRecords = this.getData( 'ltPropRecords' );
		firstIndex += perPage
		var z = (firstIndex) > MaxRecords ? MaxRecords : firstIndex;
		var actionName = this.getMethods('onNext');
		if(actionName ){
			this.executeMethod( 'onNext', z, this.$node, evt )
		}
	},
	onBackward : function(evt){
		var firstIndex = parseInt(this.getData('ltPropValue')), perPage = parseInt(this.getData('ltPropPerpage'))
		firstIndex -= perPage
		var z = (firstIndex) < 0 ? 0 : firstIndex;
		if( this.getMethods( 'onPrevious' ) ){
			this.executeMethod( 'onPrevious', z, this.$node, evt )
		}
				    
	}, 
	goFirst : function( evt ){
		this.setData( 'ltPropValue', 0, this.$node, evt );
		if( this.getMethods( 'onHome' ) ){
			this.executeMethod('onHome', this.getData('ltPropValue'), this.$node, evt);
			var singleFront = this.$node.querySelector( '.lyteSingleFront' );
			if(singleFront){
				singleFront.classList.remove('lyteDisabled')
				this.removeAriaDisabled(singleFront)
			}
		}
		if( this.getData( 'ltPropType' ) != "default" ){
			if( this.getData( 'ltPropSelected' ) >= 1 ){   
				this.setData( 'ltPropSelected',1 );
			}
			this.activeAdd();
		}
	}, 
	goLast : function( evt ){
		var firstIndex = this.getData( 'ltPropValue' ), perPage = this.getData( 'ltPropPerpage' ), MaxRecords = this.getData( 'ltPropRecords' )
		var x = Math.floor( MaxRecords / perPage ) * perPage >= MaxRecords ? MaxRecords - perPage : Math.floor(MaxRecords / perPage) * perPage;
		if( this.getMethods( 'onEnd' ) ){
			this.executeMethod( 'onEnd', x, this.$node, evt );
		}
	},
	onSelect : function( evt ){
		var firstIndex = this.getData( 'ltPropValue' ), perPage = this.getData( 'ltPropPerpage' ), MaxRecords = this.getData( 'ltPropRecords' )
			       		
		firstIndex += perPage
		var x = ( parseInt( evt.target.getAttribute( 'data-value' ) ) * perPage )- perPage >= MaxRecords ? MaxRecords - perPage : ( parseInt( evt.target.getAttribute( 'data-value' ) ) * perPage ) - perPage;
		var actionName = this.getMethods( 'onSelect' );
		if( actionName ){
			this.executeMethod( 'onSelect', x, this.$node, evt )
		}
	},
	pagination : function(){
		var current = this.getData('ltPropSelected'),
        propRecord = this.getData('ltPropRecords'),
        delta = 1,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l,last;
        last = Math.ceil(propRecord/this.getData('ltPropPerpage'));

        if( last>5){
        	if( current == 1 && current != last ){
        		right+=1;
        	}
        	if(current==last&&current!=1){
        		left-=1;
        	}
	    	for( var i = 1; i < last; i++){
	        	if(i == 1 || i == last || i >= left && i < right){
	            	range.push(i); 
	        	}
	        	else if( i>1 && i<left ){
	        		i=left-1;
	        	}
	        	else if( i >= right && i < last ){
	        		i=last-1;
	        	}
	    }
	    range.push(last);
		for (var i=0;i<range.length;i++){
			var val=range[i];
	        if (l){
	           	if (val - l !== 1){
	               	 	rangeWithDots.push("...");
	            	}
	        	}
		        rangeWithDots.push(val);
		        l = val;
	    	}
	}
    else{
    	for( var i=1; i <= last; i++ ){
    		rangeWithDots.push(i);
    	}	
    }
    	this.setData("paginationRange",rangeWithDots);
    	this.activeAdd();
},
paginationObs:function(){
this.pagination();
}.observes('ltPropSelected','ltPropPerpage','ltPropRecords'),
	
	checkButtonObs : function(){
		this.checkButton.call(this);
	}.observes('ltPropPerpage', 'ltPropValue', 'ltPropRecords', 'ltPropMoreRecords'),

	checkButton:function(){
		var firstIndex = this.getData('ltPropValue'), perPage = this.getData('ltPropPerpage'), MaxRecords = this.getData('ltPropRecords')
		var singleFront =this.$node.querySelector( '.lyteSingleFront' ), singleBack = this.$node.querySelector( '.lyteSingleBack' ), doubleBack = this.$node.querySelector('.lyteDoubleBack' ), doubleFront = this.$node.querySelector( '.lyteDoubleFront' );
	$L.fastdom.mutate( function() {
		if( doubleBack && firstIndex <= 0 ){
			doubleBack.classList.add('lyteDisabled')
			this.setAriaDisabled(doubleBack)

		}
		else if( doubleBack ){
			doubleBack.classList.remove('lyteDisabled')
			this.removeAriaDisabled(doubleBack)
		}
				
		if( singleBack && firstIndex <= 0 ){
			singleBack.classList.add('lyteDisabled')
			this.setAriaDisabled(singleBack)
		}
		else if( singleBack ){
			singleBack.classList.remove('lyteDisabled')
			this.removeAriaDisabled(singleBack)
		}	
		if( singleFront && ( firstIndex + perPage >= MaxRecords ) && !this.getData( 'ltPropMoreRecords' ) ){
			singleFront.classList.add('lyteDisabled')
			this.setAriaDisabled(singleFront)
		}
		else if( singleFront ){
			singleFront.classList.remove('lyteDisabled')
			this.removeAriaDisabled(singleFront)
		}

		if( doubleFront && ( firstIndex + perPage >= MaxRecords ) ){
					doubleFront.classList.add('lyteDisabled')
					this.setAriaDisabled(doubleFront)
		}
		else if( doubleFront ){
			doubleFront.classList.remove('lyteDisabled')
			this.removeAriaDisabled(doubleFront)
		}
				
		if( this.getData("ltPropType") != "default" &&! this.getMethods('onSelect') && !this.getData('ltPropYield')){
			var lytePageDiv = this.$node.querySelector('.lytepage' )  
			lytePageDiv.classList.add("lyteDisabled");
			   
	    }
			// if(this.getData('ltPropMoreRecords'))
			// 	{
					this._settingStartEndValue();
					if( this.getData( "ltPropType" ) != "default" ) {
						this.setData( "ltPropSelected", Math.ceil( this.getData( 'startRecord' ) / this.getData( 'ltPropPerpage' ) ) );
						var ele = this.$node.querySelectorAll( '[data-value="..."]' );
						for( var i = 0; i < ele.length; i++ ) {   
							ele[ i ].classList.add( "lyteDisabled" );
							ele[ i ].classList.add( "dots3" );
							this.setAriaDisabled(ele[ i ])
						}
					}
				// }
			// else
			// 	{	
			// 		this.setData('startRecord', Math.ceil((firstIndex + 1) / perPage))
			// 		this.setData('endRecord', Math.ceil(MaxRecords / perPage))
			// 		this.setData('middleText', 'of')
			// 	}
		}.bind(this))

				
	}, 

	settineStartEndValue : function(){
		this._settingStartEndValue();
	}.on( 'init' ) ,


	_settingStartEndValue : function(){
		var firstIndex = this.getData( 'ltPropValue' ),
		perPage = this.getData( 'ltPropPerpage' ),
		MaxRecords = this.getData( 'ltPropRecords' ),
		startRecord = this.getData( 'startRecord' ),
		endRecord = this.getData( 'endRecord' ),
		newstart = ( firstIndex + 1 ) > MaxRecords ? MaxRecords : ( firstIndex + 1 ),
		newend = ( firstIndex + perPage ) > MaxRecords ? MaxRecords : firstIndex + perPage;

		if( this.getData('ltPropAdjustStart') && this.getData('ltPropType') == 'default' && startRecord && endRecord && (endRecord-startRecord != perPage-1) && endRecord > perPage){
			newend = endRecord ? (endRecord < perPage ? perPage : endRecord ): perPage
			newstart = endRecord ? (endRecord-perPage+1 < 1 ? 1 : endRecord-perPage+1) : 1
			if( this.getMethods( 'onPerpageChange' ) ){
				this.executeMethod( 'onPerpageChange', newstart-1, this.$node)
			}
		}
		startRecord != newstart && this.setData( 'startRecord', newstart );
		endRecord != newend && this.setData( 'endRecord', newend );
		// if(this.getData('ltPropAria') && this.getData('ltPropType') == 'default'){
		// 	var midpoint = this.$node.querySelector('.lyteNavigatorMidPoint')
		// 	if(midpoint){
		// 		midpoint.tabIndex=0
		// 		midpoint.focus()
		// 	}
		// }
		
	},

	actions : {
			 
			'clickEvent' : function(evt){
				var elm=evt.target;
				if(elm.getAttribute('data-value')){
					if(elm.getAttribute('data-value')!="..."){
						this.onSelect(evt);
					}
					
				}
				else{
					while(elm&&(!elm.className||(elm.className.indexOf("lyteNavigator")==-1&&elm.className.indexOf("lyteDoubleFront")==-1&&elm.className.indexOf("lyteSingleFront")==-1&&elm.className.indexOf("lyteDoubleBack")==-1&&elm.className.indexOf("lyteSingleBack")==-1))){
						elm=elm.parentNode;
					}
					if(elm&&elm.className.indexOf("lyteDoubleFront")!=-1){
						this.goLast(evt);
					}
					else if(elm&&elm.className.indexOf("lyteSingleFront")!=-1){
						this.onForward(evt);
					}
					else if(elm&&elm.className.indexOf("lyteDoubleBack")!=-1){
						this.goFirst(evt);
					}
					else if(elm&&elm.className.indexOf("lyteSingleBack")!=-1){
						this.onBackward(evt)
					}
					else{
						evt.preventDefault();
					}
				}
				
			}	
	}
});

/**
 * @syntax nonYielded 
 *  <lyte-navigator> </lyte-navigator>  
 */

/**
 * @syntax 
 * @attribute ltPropType=simple
 * @attribute ltPropYield=false
 * <lyte-navigator lt-prop-type="simple" > 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 * </lyte-navigator>  
 */

 /**
 * @syntax
 * @attribute ltPropType=border
 * @attribute ltPropYield=false
 * <lyte-navigator lt-prop-type="border" > 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 *	  <lyte-nav-arrow> </lyte-nav-arrow> 
 * </lyte-navigator>  
 */

 /**
 * @syntax 
 * @attribute ltPropType=border 
 * @attribute ltPropYield=true
 *  <lyte-navigator lt-prop-type="border"> 
 *	  <template is = "registerYield" yield-name = "navigatorYield"> 
 *	  	  <div class="lyteDoubleBack"> Home </div> 
 *	  	  <div class="lyteSingleBack"> Prev </div> 
 *	  	  <div> {{startRecord}} to {{endRecord}} </div> 
 *	  	  <div class="lyteSingleFront"> Next </div> 
 *	  	  <div class="lyteDoubleFront"> End </div> 
 *	  </template> 
 *	</lyte-navigator>  
 */

 /**
 * @syntax  
 * @attribute ltPropType=simple 
 * @attribute ltPropYield=true
 * <lyte-navigator lt-prop-type="simple"> 
 *	 <template is = "registerYield" yield-name = "navigatorYield"> 
 *	  	 <div class="lyteDoubleBack"> Home </div> 
 *	  	 <div class="lyteSingleBack"> Prev </div> 
*	  	   <div data-value="1"> 1</div> 
*	  	   <div data-value="10"> 10</div>
 *	  	 <div class="lyteSingleFront"> Next </div> 
 *	  	 <div class="lyteDoubleFront"> End </div> 
 *	 </template> 
 * </lyte-navigator>   
 */

 /**
 * @syntax 
 * @attribute ltPropType=border 
 * @attribute ltPropYield=true
 * <lyte-navigator lt-prop-type="border"> 
 *	 <template is = "registerYield" yield-name = "navigatorYield"> 
 *	  	 <div class="lyteDoubleBack"> Home </div> 
 *	  	 <div class="lyteSingleBack"> Prev </div> 
 *	  		<div data-value="1"> 1</div> 
*	  	   <div data-value="10"> 10</div>
 *	  	 <div class="lyteSingleFront"> Next </div> 
 *	  	 <div class="lyteDoubleFront"> End </div> 
 *	 </template> 
 * </lyte-navigator>   
 */
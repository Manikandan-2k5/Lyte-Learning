/**
 * Renders a Carousel
 * @component lyte-carousel
 * @version  3.0.0
 * @methods onBeforePrev,onBeforeNext,onAfterNext,onAfterPrev
 * @utility moveSlideByIndex,reset,getActiveSlideIndex
 */
Lyte.Component.register( 'lyte-carousel', {
_template:"<template tag-name=\"lyte-carousel\"> <div class=\"lyteCarouselWrapper\"> <lyte-yield yield-name=\"carouselBoxYield\"></lyte-yield> </div> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1,1]}],
_observedAttributes :["ltPropAutoPlay","ltPropEffect","ltPropActiveIndex","ltPropMoreRecords","ltPropRecords","ltPropAutoPlayDuration","ltPropAutoPlayPause","ltPropData","ltPropAria","ltPropAriaAttributes","ltPropOrientation","ltPropTabIndex","coordinates","currentActiveIndex","prev","start"],

	data : function(){
		return {
			/** 
			 * @componentProperty {boolean} ltPropAutoPlay=false
			 * @version 3.0.0
			 */
			ltPropAutoPlay : Lyte.attr( 'boolean', {
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'autoPlay', false )
			  }),
			/** 
			 * @componentProperty {slide | fade} ltPropEffect=slide
			 * @version 3.0.0
			 */
			ltPropEffect : Lyte.attr( 'string', { 
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'effect', 'slide' ) 
			}),
			/** 
			 * @componentProperty {number} ltPropActiveIndex=0
			 * @version 3.0.0
			 */

			ltPropActiveIndex : Lyte.attr( 'number', {
			 'default' : 0
			}),
			/** 
			 * @componentProperty {boolean} ltPropMoreRecords=false
			 * @version 3.0.0
			 */
			ltPropMoreRecords : Lyte.attr( 'boolean', {
			 'default' : false
			}),
			/** 
			 * @componentProperty {number} ltPropRecords
			 * @version 3.0.0
			 */
			ltPropRecords : Lyte.attr( 'number', {
			 'default' : undefined
			}),
			/** 
			 * @componentProperty {number} ltPropAutoPlayDuration=3000
			 * @version 3.0.0
			 */
			ltPropAutoPlayDuration : Lyte.attr('number',{
			'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'autoPlayDuration', 3000 )
			}),
			/** 
			 * @componentProperty {boolean} ltPropAutoPlayPause=false
			 * @version 3.0.0
			 */
			ltPropAutoPlayPause : Lyte.attr( 'boolean', {
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'autoPlayPause', false )
			}),
			/** 
			 * @componentProperty {array} ltPropData=[]
			 * @version 3.0.0
			 */
			ltPropData : Lyte.attr( 'array', {
			 'default' : []
			}),
			/**
			 * @componentProperty {boolean} ltPropAria=false
			 * @version 3.1.0
			 */
			ltPropAria : Lyte.attr( 'boolean', {
				'default':true
			}),
			/**
			 * @componentProperty {object} ltPropAriaAttributes = {}
			 * @version 3.1.0
			 */
			ltPropAriaAttributes : Lyte.attr( 'object', { 
				'default': {}
			}),
			/**
			 * @componentProperty {horizontal | vertical} ltPropOrientation = horizontal
			 * @version 3.82.0
			 */
			ltPropOrientation : Lyte.attr( 'string', { 
				'default': "horizontal"
			}),
			/**
			 * @componentProperty {string} ltPropTabIndex = 0
			 * @version 3.82.0
			 */
			ltPropTabIndex : Lyte.attr( 'string', {
				'default' : '3'
			}),
			coordinates : Lyte.attr( 'object',{
				'default': {}
			}),
			currentActiveIndex : Lyte.attr( 'number', {
			 'default' : 0
			}),
			prev : Lyte.attr( 'boolean',{
				'default' : false
			}),
			'start': Lyte.attr( 'number' )

		}		
	},
	didConnect: function () {
		var carouselContent = this.$node.querySelector('lyte-carousel-content');
		var activeIndex = this.getData( 'ltPropActiveIndex' );

		if(this.getData('ltPropAria') && carouselContent){
			carouselContent.setAttribute('aria-live', this.getData('ltPropAutoPlay') ? 'off' : 'polite') 
		}
		if( activeIndex ) {
			this.setData( 'currentActiveIndex', activeIndex )
		}
		if( this.getData( 'ltPropRecords' ) >= 1 ) {
			this.setActiveItem()
		}
		if( this.getData( 'ltPropRecords' ) > 1 ) {
			this.setMethod();
		}
		this.$node.moveSlideByIndex = function(index){
			var activeIndex = this.getData( 'currentActiveIndex' ),
			itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
			if( activeIndex >= 0 && activeIndex < itemList.length ){
				itemList[activeIndex].classList.remove('lyteActive')
				itemList[activeIndex].setAttribute('tabindex', -1)
				itemList[activeIndex].setAttribute('aria-hidden', false)
				if(indicatorList) {
					indicatorList.classList.remove('lyteActive')
					indicatorList.setAttribute('tabindex',-1)

				}
			}
			clearTimeout( this._nextTimeout )
			clearTimeout( this._nextFadeTimeout )
			this.setData( 'currentActiveIndex', index )
			this.setActiveItem()
		}.bind( this ) 
		this.$node.reset = function(){
			setTimeout( function() {
				var activeIndex = this.getData( 'currentActiveIndex' ),
				itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
			 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
				if( activeIndex >= 0 && activeIndex < itemList.length ){
					itemList[activeIndex].classList.remove('lyteActive')
					itemList[activeIndex].setAttribute('tabindex',-1)
					itemList[activeIndex].setAttribute('aria-hidden', false)

					if(indicatorList) {
						indicatorList.classList.remove('lyteActive')
						indicatorList.setAttribute('tabindex',-1)

					}
				}
				clearTimeout( this._nextTimeout )
				clearTimeout( this._nextFadeTimeout )
				this.setData( 'currentActiveIndex',this.getData( 'ltPropActiveIndex' ) )
				this.setActiveItem()
				this.setMethod();
			}.bind( this ) )
		}.bind( this ) 
		this.$node.getActiveSlideIndex =function(){
			return this.getData('currentActiveIndex')
		}
		if( this.getData('ltPropEffect') === "swipe" ){
			this._carouselTochStart = this.carouselTouchStart.bind(this,carouselContent)
			carouselContent.addEventListener( 'touchstart', this._carouselTochStart)
		}
		
	},
	didDestroy : function() {
		clearInterval( this._autoId )
		delete this._autoId
	},
	setOrientation: function () { 
		var orientation = this.getData("ltPropOrientation");
		if (orientation && orientation === "vertical") {
			this.$node.classList.add('lyteCarouselVertical');
		}
		else if (orientation && orientation === "horizontal") {
			this.$node.classList.remove('lyteCarouselVertical');
		}
	}.observes("ltPropOrientation").on("didConnect"),
	ariaObserver: function( change ) {
		if(this.getData('ltPropAria')){
			_lyteUiUtils.setAttribute( this.getCarouselWidget(), this.getData( 'ltPropAriaAttributes' ) || {}, {} );

		}

	}.observes( 'ltPropAriaAttributes' ).on( 'didConnect' ),
	carouselTouchStart : function(carouselContent , event){
		this.setData( 'prev', false );

		if( event.touches.length > 1 ) {
				this.setData( 'prev', true );

				return ;
		}

		var touch = event.targetTouches[ 0 ],
		cords = {
				x: touch.clientX,
				y: touch.clientY
		}
		this.setData('coordinates',cords)
		start = new Date().getTime();
		this.setData('start', start)
		this._carouselTouchEnd = this.carouselTouchEnd.bind(this,carouselContent)
		// carouselContent.addEventListener('touchmove',this._carouselTouchMove )
		carouselContent.addEventListener('touchend',this._carouselTouchEnd)
	},
	carouselTouchMove : function(carouselContent,event){
		event.preventDefault()
	},
	carouselTouchEnd : function(carouselContent,event){
		var prev = this.getData( 'prev' );

			// prev will be false only when you do a single finger swipe
			// Multi finger swipes return out of execution
			if( prev ) {
				return ;
			}

			var start = this.getData( 'coordinates' ),
			x = start.x, y = start.y,
			touch = event.changedTouches[ 0 ],
			diffX = x - touch.clientX
			diffY = y - touch.clientY
			parent = this.$node.querySelector( 'lyte-carousel-content' ),
			rect = parent.getBoundingClientRect(),
			width = rect.width,
			height = rect.height,
			xTolerance = width * 0.2,
			yTolerance = height * 0.15,
			begin = this.getData('start'),
			delay = (new Date().getTime()) - begin;
			var orientation = this.getData("ltPropOrientation");
				if (!orientation || orientation === "horizontal" || orientation !== "vertical") {
					if (delay < 1000 && Math.abs(diffX) > 150) {
						if (diffX < 0) {
							this.prevClick();
						}
						else if (diffX > 0) {
							this.nextClick();
						}
					}
				}
				else if (orientation && orientation === "vertical") { 
					if (delay < 1000 && Math.abs(diffY) > 120) {
						if (diffY < 0) {
							this.prevClick();
						}
						else if (diffY > 0) {
							this.nextClick();
						}
					}
				}
	},
	getCarouselWidget: function() {
		return this.$node.querySelector( '.lyteCarouselWrapper' );
	},
	setMethod : function() {
		var prev =this.$node.getElementsByTagName( 'lyte-carousel-prev' )[ 0 ],
			next = this.$node.getElementsByTagName( 'lyte-carousel-next' )[ 0 ],
			indicator = this.$node.getElementsByTagName( 'lyte-carousel-indicator' )[ 0 ];
			if( this.getData( 'ltPropEffect' ).toLowerCase() ==  "fade" ) {
				this.$node.classList.add( 'lyteFade' )
				if( prev ) {
					this._prevFadeClick = this.prevFadeClick.bind( this )
					prev.addEventListener( 'click', this._prevFadeClick )
				}
				if( next ) {
					this._nextFadeClick = this.nextFadeClick.bind( this )
					next.addEventListener( 'click', this._nextFadeClick )
				}
				if( indicator ) {
					this._indicatorFadeClick = this.indicatorFadeClick.bind( this )
					indicator.addEventListener( 'click', this._indicatorFadeClick )
				}
				this._zeroOpacityTransition = this.zeroOpacityTransition.bind( this )
			}
			else{
				this.$node.classList.add( 'lyteScroll' )
				if( prev ) {
					this._prevClick = this.prevClick.bind( this )
					prev.addEventListener( 'click', this._prevClick )
				}
				if( next ) {
					this._nextClick = this.nextClick.bind( this )
					next.addEventListener( 'click', this._nextClick )
				}
				if( indicator ) {
					this._indicatorClick = this.indicatorClick.bind( this );
					indicator.addEventListener( 'click', this._indicatorClick )
				}
				this._removePrevClass = this.removePrevClass.bind( this )
				this._removeNextClass = this.removeNextClass.bind( this )
			}
	},
	dataObs : function() {
		setTimeout( function() {
				clearTimeout( this._nextTimeout )
				clearTimeout( this._nextFadeTimeout )
				this.setData( 'currentActiveIndex',this.getData( 'ltPropActiveIndex' ) )
				this.setActiveItem()
				this.setMethod();
		}.bind( this ) )
	}.observes( 'ltPropData' ),
	currentActiveObs : function() {
		// this.checkButton();
		this.setActiveItem();
		
	    
	}.observes( 'currentActiveIndex' ),
	activeIndexObs : function() {
		// this.checkButton();
		var activeIndex = this.getData( 'currentActiveIndex' ),
			itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
		if( activeIndex >= 0 && activeIndex < itemList.length ){
			itemList[activeIndex].setAttribute('tabindex',-1)

			itemList[activeIndex].classList.remove('lyteActive')
			itemList[activeIndex].setAttribute('aria-hidden', false)

			if(indicatorList) {
				indicatorList.setAttribute('tabindex',-1)

				indicatorList.classList.remove('lyteActive')

			}
			this.setData( 'currentActiveIndex', this.getData( 'ltPropActiveIndex' ) )
		}
	    
	}.observes( 'ltPropActiveIndex' ),
	autoPlayPauseObs : function() {
		var carouselContent = this.$node.querySelector( '.lyteCarouselWrapper' );
		this._carouselContentFocus= this.carouselContentFocus.bind(this)
		if( this.getData( 'ltPropAutoPlayPause' ) && this.getData( 'ltPropAutoPlayDuration' ) ) {
			if( carouselContent ) {
				carouselContent.addEventListener( 'mouseenter', this._carouselContentFocus )
			}
		}
		else{
			if( carouselContent ) {
				carouselContent.removeEventListener( 'mouseenter', this._carouselContentFocus )
			}
		}
	}.observes( 'ltPropAutoPlayPause' ).on( 'didConnect' ),
	carouselContentFocus : function(  ){
		var carouselWrapper = this.$node.querySelector( '.lyteCarouselWrapper' );
		var carouselContent = this.$node.querySelector('lyte-carousel-content')
		if(this.getData('ltPropAria')){
			carouselContent.querySelector('lyte-carousel-item.lyteActive').focus()
		}
		carouselContent.setAttribute('aria-live','polite')
		clearInterval( this._autoId );
		this._autoId = false
		this._carouselContentFocusOut = this.carouselContentFocusOut.bind( this, carouselWrapper, carouselContent )
		carouselWrapper.addEventListener( 'mouseleave',  this._carouselContentFocusOut)
	},
	carouselContentFocusOut : function( carouselWrapper, carouselContent  ) {
		carouselContent.setAttribute('aria-live','off')

		carouselWrapper.removeEventListener( 'mouseleave', this._carouselContentFocusOut )
		if(this.getData('ltPropAutoPlay'))	{
			this.autoPlayFunc();
		}
			
	},
	autoPlayObs : function() {
		if( !this.getData( 'ltPropAutoPlay' ) && this._autoId ) {
			clearInterval( this._autoId );
			this._autoId = false
		}
		if(this.getData( 'ltPropAutoPlay' ) && this.getData( 'ltPropRecords' ) > 1 ) {
			this.autoPlayFunc();
		}
	}.observes( 'ltPropAutoPlay' ).on( 'didConnect' ),
	setActiveItem : function(){
		var activeIndex = this.getData( 'currentActiveIndex' ),
			itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
			if( activeIndex >= 0 && activeIndex < itemList.length ){
				itemList[activeIndex].setAttribute('tabindex', this.getData('ltPropTabIndex'))

				itemList[ activeIndex ].classList.add( 'lyteActive' );
				itemList[activeIndex].setAttribute('aria-hidden', true)

				if(!this.getData('ltPropAutoPlay') && this.getData('ltPropAria')){
					itemList[ activeIndex ].focus()
				}
				if( indicatorList ) {
					indicatorList.setAttribute('tabindex', this.getData('ltPropTabIndex'))

					indicatorList.classList.add( 'lyteActive' ) ;
				}
	
			}
	},
	prevClick : function(event) {
		if( this._prevTrans ) {
			// event.preventDefault();
			// event.stopPropagation();
			return;
		}
		else{
			var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
			 indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="' +currentActive+ '"] ' );
			 res=true;
			if( this.getMethods( 'onBeforePrev' ) ){
				res = this.executeMethod( 'onBeforePrev' , event , this , currentActive ,records);
			}
			if(res){
				if( currentActive >= 1 ){
					this.previous( currentActive, currentActive-1, itemList, indicatorList, event )
				}
				else if(currentActive==0){
					this.previous( currentActive, records-1, itemList, indicatorList, event )
	
				}
			}
			
		}
	},
	nextClick : function( event ) {
		
		var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
		 	res=true,that = this,index;
		if( this._nextTrans) {
			// event.preventDefault();
			// event.stopPropagation();
				return;			
		}
		else{
			if( this._autoId ) {
				clearInterval( this._autoId )
				this._autoId = false;
			}
			if( this.getMethods( 'onBeforeNext' ) ){
						res = this.executeMethod( 'onBeforeNext' , event , this , currentActive ,records);
			}

			if(res && res.then ) {
				res.then( function( arg ) {
					if( currentActive >= 0 &&  currentActive < that.getData( 'ltPropRecords' ) ) {
						if( currentActive < that.getData( 'ltPropRecords' ) - 1 ) {
							that.next( currentActive, currentActive+1, itemList, indicatorList, event )

						}
						else if( currentActive == that.getData( 'ltPropRecords' ) - 1 ) {
							that.next( currentActive, 0, itemList, indicatorList, event )
						}
					}
					if( that.getData('ltPropAutoPlay')  ) {
							that.autoPlayFunc();
					}
					
				}).catch( function( err ) {
					console.error( err );
				} );
			}
			else if( res !== false ) {
				if( currentActive >= 0 && currentActive < records-1 ) {
					this.next( currentActive, currentActive+1, itemList, indicatorList, event )
							
				}
				else if( currentActive == records-1 ) {
					this.next( currentActive, 0, itemList, indicatorList, event )
				}
				if( this.getData( 'ltPropAutoPlay' )  ) {
					setTimeout( function() {
						this.autoPlayFunc();
					}.bind( this ), 100 )
				}
			}
		}
			
	},	
	next : function( currentActive, nextIndex, itemList, indicatorList, event ) {
		var res = true, records = this.getData('ltPropRecords')

		if(event && event.currentTarget && event.currentTarget.tagName == "LYTE-CAROUSEL-INDICATOR"){
			if( this.getMethods( 'onBeforeNext' ) ){
				res = this.executeMethod( 'onBeforeNext' , event , this , currentActive ,records);
			}
		}
		if(res){
			this._nextTrans = true
			var duration = parseFloat( getComputedStyle( itemList[ currentActive ] ).transitionDuration )
				duration = ( duration * 1000 ) +200
			setTimeout( function() {
					
					if( this._nextTrans ) {
						var itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
						indicatorList = this.$node.getElementsByTagName( 'lyte-carousel-indicator-item' ),
						activeItemList = this.$node.querySelectorAll( 'lyte-carousel-item.lyteActive' )
						for( var i=0 ; i<itemList.length; ++i ) {
							if( $L(itemList[ i ] ).hasClass( 'lyteActivePrev' ) ) {
								itemList[ i ].classList.remove( 'lyteActivePrev' )
							}
						}
						if( activeItemList.length > 1 ) {
							for( var i=0 ; i < itemList.length; ++i ) {
								if( i != this.getData( 'ltPropActiveIndex' ) && $L( itemList[ i ] ).hasClass( 'lyteActive' ) ) {
									itemList[ i ].setAttribute('tabindex',-1)

									itemList[ i ].classList.remove( 'lyteActive' )
									itemList[i].setAttribute('aria-hidden', false)

									indicatorList[i].setAttribute('tabindex',-1)

									indicatorList[ i ].classList.remove( 'lyteActive' )

								}
							}
						}
						delete this._nextTrans
					}
			}.bind( this ), duration )
	
			itemList[ nextIndex].classList.add( 'lyteActiveNext' ) 
			this._nextTimeout = setTimeout( function() {
				if( this._nextTrans ) {
					itemList[ currentActive ].addEventListener( 'transitionend', this._removePrevClass )
					itemList[ currentActive ].classList.add( 'lyteActivePrev' ) 
					itemList[ currentActive ].setAttribute('tabindex',-1)

					itemList[ currentActive ].classList.remove( 'lyteActive' ) 
					itemList[currentActive].setAttribute('aria-hidden', false)

					if( indicatorList ) {
						indicatorList.setAttribute('tabindex',-1)

						indicatorList.classList.remove( 'lyteActive' )
 
					}
					itemList[ nextIndex].classList.remove( 'lyteActiveNext' ) 
					// this.setData( 'ltPropActiveIndex',	nextIndex ) ;
					this.setData( 'currentActiveIndex', nextIndex ) ;
					if( this.getMethods( 'onAfterNext' ) ){
						this.executeMethod( 'onAfterNext' , event , this , nextIndex ) ;
					}
				}
			}.bind( this ), 100 )
		}
		
	},
	previous : function( currentActive, prevIndex, itemList, indicatorList, event ) {
		var res = true, records = this.getData('ltPropRecords')
		if(event && event.currentTarget && event.currentTarget.tagName == "LYTE-CAROUSEL-INDICATOR"){
			if( this.getMethods( 'onBeforePrev' ) ){
				res = this.executeMethod( 'onBeforePrev' , event , this , currentActive ,records);
			}
		}
		if(res){

			this._prevTrans=true

			itemList[ prevIndex ].classList.add( 'lyteActivePrev' ) 
			setTimeout( function() {
				itemList[ currentActive ].addEventListener( 'transitionend', this._removeNextClass )
				itemList[ currentActive ].classList.add( 'lyteActiveNext' ) 
				itemList[ currentActive ].setAttribute('tabindex',-1)

				itemList[ currentActive ].classList.remove( 'lyteActive' ) 
				itemList[ currentActive ].setAttribute('aria-hidden', false)

				itemList[ prevIndex ].classList.remove('lyteActivePrev') 

				if( indicatorList ) {
					indicatorList.setAttribute('tabindex',-1)

					indicatorList.classList.remove( 'lyteActive' ) 

				}
				// this.setData( 'ltPropActiveIndex', prevIndex )
				this.setData( 'currentActiveIndex', prevIndex )
				if( this.getMethods( 'onAfterPrev' ) ){
					this.executeMethod( 'onAfterPrev' , event , this , prevIndex ) 
				}
			}.bind( this ) )
		}
	},
	removePrevClass: function( event ) {
		
			// if(currentActive-1>=0){
				event.currentTarget.classList.remove( 'lyteActivePrev' ) 
				event.currentTarget.removeEventListener( 'transitionend', this._removePrevClass )

			// }

			delete this._nextTrans 
	},
	removeNextClass: function(event){
		

		event.currentTarget.classList.remove('lyteActiveNext') ;
		event.currentTarget.removeEventListener('transitionend',this.removeNextClass);
		
		delete this._prevTrans 
	},
	autoPlayFunc : function(){
		if(this._autoId){
			clearInterval(this._autoId)
			this._autoId = false
		}
		var duration = this.getData('ltPropAutoPlayDuration')
		if(duration && this.getData('ltPropRecords') > 1 ){
			this._autoId=setInterval(function(){
				var effect = this.getData('ltPropEffect') ?  this.getData('ltPropEffect') :'';
				if( effect.toLowerCase() == "fade" && !this._nextFadeTrans ){
					this.nextFadeClick();
				}
				else if( effect.toLowerCase() !== "fade" &&!this._nextTrans ){
					this.nextClick();
				}
			}.bind(this),duration);
		}
	},
	indicatorClick : function(event){

		var index, e = event.target,
		target= $L(e).closest('lyte-carousel-indicator-item')[ 0 ];

	
		if( target && target.tagName.toLowerCase() == 'lyte-carousel-indicator-item' ){
			index = target.getAttribute('data-value');
			var currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
			res=true,that = this;

			if( index < currentActive ){
				this.previous( currentActive, index, itemList, indicatorList ,event );
			}
			else if(index > currentActive ){
				this.next( currentActive, index, itemList, indicatorList ,event );

			}
		}
	},
	prevFadeClick : function( event ) {
		if( this._prevFadeTrans ) {
			// event.preventDefault()
			// event.stopPropagation()
			return;
		}
		else{
			var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
			indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="' +currentActive+ '"] ' ),
			res=true;
			if( this.getMethods( 'onBeforePrev' ) ){
				res = this.executeMethod( 'onBeforePrev' , event , this , currentActive ,records );
			}
			if(res){
				if( currentActive >= 1 ){
					this.previousFade( currentActive, currentActive-1, itemList, indicatorList, event )
				}
				else if( currentActive==0 ) {
					this.previousFade( currentActive, records-1, itemList, indicatorList, event )
	
				}
			}
			
		}
	},
	previousFade : function( currentActive, prevIndex, itemList, indicatorList, event ) {
			this._prevFadeTrans=true

			setTimeout( function() {
				itemList[ prevIndex ].addEventListener( 'transitionend', this._zeroOpacityTransition )
				itemList[ currentActive ].classList.remove( 'lyteActive' ) ;
				itemList[ currentActive ].setAttribute('tabindex',-1)
				itemList[ currentActive ].setAttribute('aria-hidden', false)

				itemList[ prevIndex ].classList.add('lyteActive') ;
				itemList[ prevIndex ].setAttribute('tabindex', this.getData('ltPropTabIndex'))
				itemList[ prevIndex ].setAttribute('aria-hidden', true)

				if(!this.getData('ltPropAutoPlay') && this.getData('ltPropAria')){
					itemList[ prevIndex ].focus()
				}
				if( indicatorList ) {
					indicatorList.classList.remove( 'lyteActive' ) ;
					indicatorList.setAttribute('tabindex',-1)

				}
				this.setData( 'currentActiveIndex', prevIndex );
				if( this.getMethods( 'onAfterPrev' ) ){
					this.executeMethod( 'onAfterPrev' , event , this , prevIndex ) 
				}
			}.bind( this ) )
	},
	zeroOpacityTransition : function( event ){
		event.currentTarget.removeEventListener( 'transitionend', this._zeroOpacityTransition )
		
		delete this._prevFadeTrans ;
		delete this._nextFadeTrans ;
	},
	nextFadeClick : function( event ) {
		
		var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
		 	res=true,that = this,index;
		if( this._nextTrans ) {
				// event.preventDefault();
				// event.stopPropagation();
				return;			
		}
		else{
			if( this._autoId ) {
				clearInterval( this._autoId )
				this._autoId = false;
			}
			if( this.getMethods( 'onBeforeNext' ) ){
						res = this.executeMethod( 'onBeforeNext' , event , this , currentActive ,records );
			}

			if( res && res.then ) {
				res.then(function( arg ) {
					if( currentActive >= 0 &&  currentActive < that.getData( 'ltPropRecords' ) ) {
						if( currentActive < that.getData( 'ltPropRecords' )-1 ) {
							that.nextFade( currentActive, currentActive+1, itemList, indicatorList, event )

						}
						else if( currentActive == that.getData( 'ltPropRecords' ) - 1 ) {
							that.nextFade( currentActive, 0, itemList, indicatorList, event )
						}
					}
					if( that.getData( 'ltPropAutoPlay' ) ) {
						// setTimeout(function(){
							that.autoPlayFunc();
						// }.bind(that),100)
					}
				} ).catch( function( err ) {
					console.error( err );
				} );
			}
			else if( res !== false ) {
				if( currentActive >= 0 && currentActive < records-1 ){
					this.nextFade( currentActive, currentActive+1, itemList, indicatorList, event )
							
				}
				else if( currentActive == records-1 ) {
					this.nextFade( currentActive, 0, itemList, indicatorList, event )
				}
				if( this.getData( 'ltPropAutoPlay' ) ) {
					setTimeout( function() {
						this.autoPlayFunc();
					}.bind( this ),100 )
				}
			}
		}
		
	},
	nextFade : function( currentActive, nextIndex, itemList, indicatorList, event ) {
		this._nextFadeTrans = true
		var duration = parseFloat( getComputedStyle( itemList[ currentActive ] ).transitionDuration )
			duration = ( duration * 1000 ) +20
			
		setTimeout( function() {
				if( this._nextFadeTrans ) {
					delete this._nextFadeTrans
				}
		}.bind( this ), duration )

		this._nextFadeTimeout = setTimeout( function() {
			itemList[ currentActive ].addEventListener( 'transitionend', this._zeroOpacityTransition)
			itemList[ currentActive ].classList.remove( 'lyteActive' ) ;
			itemList[ currentActive ].setAttribute('tabindex',-1)
			itemList[ currentActive ].setAttribute('aria-hidden', false)

			if( indicatorList ) {
				indicatorList.classList.remove( 'lyteActive' ) ;
				indicatorList.setAttribute('tabindex',-1)

			}
			this.setData( 'currentActiveIndex', nextIndex ) ;
			if( this.getMethods( 'onAfterNext' ) ){
				this.executeMethod( 'onAfterNext' , event , this , nextIndex ) 
			}
		}.bind( this ), 100 )
	},
	indicatorFadeClick : function() {
		var index, e = event.target,
		target= $L( e ).closest( 'lyte-carousel-indicator-item' )[ 0 ];

	
		if( target && target.tagName.toLowerCase() == 'lyte-carousel-indicator-item' ) {
			index = target.getAttribute( 'data-value' );
			var currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
			res=true,that = this;

			if( index < currentActive ){
				this.previousFade( currentActive, index, itemList, indicatorList ,event );
			}
			else if(index > currentActive ){
				this.nextFade( currentActive, index, itemList, indicatorList ,event );

			}
		}
	}
});
if( !_lyteUiUtils.registeredCustomElements[ 'lyte-carousel-item' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-carousel-item' ] = true; 
	
	Lyte.createCustomElement( "lyte-carousel-item", {
		static: {
			"observedAttributes" : {
				get : function() {
					return [ ];
				}
			}
		},

		"connectedCallback": function() {

			this.setAttribute( 'aria-hidden', false );

			if( !this.hasAttribute( 'tabindex' ) ) {
				this.setAttribute( 'tabindex', '-1' );
			}

		}
	} );
}

/**
 * 
 * @syntax yielded 
 *	<lyte-carousel>
 *	<template is="registerYield" yield-name="carouselBoxYield">
 *       <lyte-carousel-prev> </lyte-carousel-prev>
 *       <lyte-carousel-content>
 *          <lyte-carousel-item> Content 1 </lyte-carousel-item>
 *          <lyte-carousel-item> Content 2 </lyte-carousel-item>
 *       </lyte-carousel-content>
 *       <lyte-carousel-indicator>
 *           <lyte-indicator-item data-value="0"> 1 </lyte-indicator-item>
 *           <lyte-indicator-item data-value="1"> 2 </lyte-indicator-item>
 *       </lyte-carousel-indicator>
 *      <lyte-carousel-next> </lyte-carousel-next>
 *   </template>
 *	</lyte-carousel> 
 */

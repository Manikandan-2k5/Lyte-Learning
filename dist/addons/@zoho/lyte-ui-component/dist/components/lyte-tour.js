// Convert most functions to this.

/**
 * Renders a tour component
 * @component lyte-tour
 * @version 3.1.0
 * @utility startTour, closeStep, nextStep, prevStep, goToStep, changeHint, skipTour
 * @methods onStart, onEnd, onBeforeNext, onNext, onBeforePrev, onPrev, onHintChange, onStepClose
 * @dependencies lyte-shortcut
 */


 Lyte.Component.register("lyte-tour", {
_template:"<template tag-name=\"lyte-tour\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourWrap\"> <template is=\"if\" value=\"{{ltPropFreezeLayer}}\"><template case=\"true\"> <div class=\"lyteTourFreezeLayer\"></div> </template></template> <template is=\"if\" value=\"{{expHandlers(closeStepFlag,'!')}}\"><template case=\"true\"><div class=\"lyteTourContainer {{ltPropWrapperClass}}\"> <div class=\"lyteTourLeftArrow lyteTourArrow lyteTourDefaultArrow\"></div> <div class=\"lyteTourTopArrow lyteTourArrow\"></div> <div class=\"lyteTourRightArrow lyteTourArrow\"></div> <div class=\"lyteTourBottomArrow lyteTourArrow\"></div> </div></template></template> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropTakeTour","ltPropBindToBody","ltPropWrapperClass","ltPropCreateDummy","ltPropHeight","ltPropWidth","ltPropArrowWidth","ltPropArrowHeight","ltPropArrowPosition","ltPropFixedArrow","ltPropFreezeLayer","ltPropSmartPlacement","ltPropResumeHint","ltPropResumeStep","ltPropIgnoreTabKey","isStepClosed","isResizeEventOn","windowDimension","tourHintIndex","hintElements","tourStepIndex","totalHints","totalSteps","localSteps","scrollTop","closeStepFlag","arrowDiagonalLength"],

	data : function(){
		return {
			'ltPropTakeTour' 			: Lyte.attr('boolean' , { default : false }),
			'ltPropBindToBody' 			: Lyte.attr("boolean" , { default : false }),

			'ltPropWrapperClass'		: Lyte.attr("string" , {default : 'lyteTourWrapper'}),
			'ltPropCreateDummy'			: Lyte.attr("boolean" , {default : false}),

			/**
			 * @componentProperty {number} ltPropHeight
			 * @default 500
			 */

			'ltPropHeight'				: Lyte.attr('number' , { default : 'auto' }),

			/**
 			 * @componentProperty {number} ltPropWidth
 			 * @default 500
 			 */

			'ltPropWidth'				: Lyte.attr('number' , { default : 'auto' }),
			'ltPropArrowWidth'			: Lyte.attr('number' , { default : 10 }),
			'ltPropArrowHeight'			: Lyte.attr('number' , { default : 10 }),
			'ltPropArrowPosition'		: Lyte.attr('string' , { default : 'start' }),
			'ltPropFixedArrow'			: Lyte.attr('boolean' , { default : false }),

				/**
			 * @componentProperty {boolean} ltPropFreezeLayer
			 * @default true
			 *
			 */

			'ltPropFreezeLayer'			: Lyte.attr('boolean' , { default : true }),
			'ltPropSmartPlacement'		: Lyte.attr('boolean' , { default : true }),
			'ltPropResumeHint'			: Lyte.attr('number' , {default : 0}),
			'ltPropResumeStep'			: Lyte.attr('number' , {default : 0}),
			'ltPropIgnoreTabKey'		: Lyte.attr('boolean' , {default : false}),

			'isStepClosed'				: Lyte.attr('boolean' , {default : false}),
			'isResizeEventOn'			: Lyte.attr('boolean' , {default : false}),

			'windowDimension'			: Lyte.attr('object' , {default : {height : window.innerHeight,width : window.innerWidth}}),

			'tourHintIndex' 			: Lyte.attr('number' , { default : 0 }),
			'hintElements'				: Lyte.attr('array' , { default : [ ] }),
			'tourStepIndex'				: Lyte.attr('number' , { default : 0 }),
			'totalHints'				: Lyte.attr('number' , { default : 0 }),
			'totalSteps'				: Lyte.attr('number' , { default : 0 }),
			'localSteps'				: Lyte.attr('number' , { default : 0 }),
			'scrollTop'					: Lyte.attr('number' , { default : 0 }),
			'closeStepFlag'				: Lyte.attr('boolean' , { default : false }),
			'arrowDiagonalLength' 		: Lyte.attr('number' , {default : 0})
		}
	},

	setTourDimensions : function(){
	 $L(this.$node).find('.lyteTourContainer').css({
			'width' : this.getData('ltPropWidth'),
			'height' : this.getData('ltPropHeight')
	 });
		$L(this.$node).find('.lyteTourArrow').css({
			'width' : this.getData('ltPropArrowWidth'),
			'height' : this.getData('ltPropArrowHeight')
	 });
	},

	startLyteTour : function(){

		this.setData('ltPropBindToBody' , true)

		this.setData('closeStepFlag' , false);

		// this.setData('isStepClosed' , false);

		this.setTourDimensions();

		var totalSteps = $L(this.$node).find('lyte-tour-step');
		var tourHints = $L(this.$node).find('lyte-tour-hint');

		var tourArr = [];

		// FIX: Make this forloop another function -  calculate variables inside that function and store hintElements in that function
		// Also there is probably an easier way to push values into a dummy array - .concat() for eg.
		for(var i=0;i < tourHints.length;i++){
			tourArr.push( tourHints[i].getData('ltPropLabel') )
		}
		this.setData('hintElements' , tourArr);
		// FIX: this can be a function - this.getCurrentHint()
		var currentHint = tourHints[this.getData('tourHintIndex')];
		var tourSteps = $L(currentHint).find('lyte-tour-step');

		// FIX: this can be a function - this.getCurrentStep()
		var currentStep = tourSteps[this.getData('tourStepIndex')]

		// FIX: these can be moved to a function - this.setTourParameters()
		this.setData('totalHints' , tourHints.length);


		if(this.getData('ltPropResumeHint') && (this.getData('ltPropResumeHint') !== 0)){
			if(!(this.getData('ltPropResumeHint') > tourHints.length)){
					this.setData('tourHintIndex' , this.getData('ltPropResumeHint'))
			}
		}
		var currentHint = tourHints[this.getData('tourHintIndex')];

		var tourSteps = $L(currentHint).find('lyte-tour-step');
		this.setData('localSteps' , tourSteps.length);
		this.setData('totalSteps' , totalSteps.length);

		if(this.getData('ltPropResumeStep') && (this.getData('ltPropResumeStep') !== 0)){
			if(!(this.getData('ltPropResumeStep') > tourSteps.length)){
				this.setData('tourStepIndex' , this.getData('ltPropResumeStep'))
			}
		}
		var currentStep = tourSteps[this.getData('tourStepIndex')]
		if(currentHint.component.getData('ltPropBackgroundAnimation')){
			currentHint.component.setData('ltPropBindToBody' , true);
			currentHint.classList.add('activeAnimation');
		}

		var arrow = $L('.lyteTourArrow')[0];

		arrow.style.transform = "rotate(0deg)";
		this.setData('arrowDiagonalLength' , arrow.getBoundingClientRect().width);
		arrow.style.transform = "rotate(45deg)";

		$L(currentStep).addClass('lyteTourCStep')

		if(!this.getData('ltPropIgnoreTabKey')){
			document.addEventListener('keydown' , this.tabKeydownFun)
		}

		if(!this.getData('isResizeEventOn')){

			this.setData('isResizeEventOn' , true)

			window.addEventListener('resize' , this.$node.moveContainer)

		}

		currentStep.component.startLyteStep( currentStep );

	},
	methods : {
		onStart : function(){},
		onEnd : function(){},
		onStepClose : function(){},
		onBeforeNext : function(){},
		onNext : function(){},
		onBeforePrev : function(){},
		onPrev : function(){},
		onHintChange : function(){},
		onPause : function(){},
		onResume : function(){}
	},
	init : function(){

		// FIX: All of these can have single var definitions var _this = this, lyteTourComp = _this.$node....
		var _this = this , lyteTourComp = _this.$node , currentHint , currentStep , pastHint , nextStepEle , prevStepEle;

		shortcut.register('left' , this.leftKeyFunction.bind(this))
	  	shortcut.register('right' , this.rightKeyFunction.bind(this))
	  	shortcut.register('esc' , this.escKeyFunction.bind(this))

		 this.$node.startTour = function(){
			 _this.startLyteTour();
		 }

		this.$node.closeStep = function(){

			_this.executeMethod('onStepClose')

			// DOUBT: Why are we setting ltPropBindToBody false for the first step of the document?
			$L('lyte-tour-step')[0].component.setData('ltPropBindToBody' , false);

			setCurrentHint();
			setCurrentStep();
			closeStep();


			if(_this.getData('closeStepFlag')){
				_this.$node.skipTour();
			}

			_this.setData('closeStepFlag' , true);


		}

		this.$node.nextStep = function(){


			_this.setData('scrollTop' , document.documentElement.scrollTop);

			setCurrentHint();
			setCurrentStep();
			setNextStep();
			closeStep();
			_this.upDateIndex( '+' , 'tourStepIndex');

			// FIX: may need to be in if
			var returnedValue = currentStep.component.executeMethod('onBeforeChange');

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			if( returnedValue ) {

				// Make this a function
				returnedValue.then(function(){

					// FIX: Add a check here to see if the component exists

					var beforeNext = _this.executeMethod('onBeforeNext' , currentStep , nextStepEle);

					if(beforeNext !== false){

						// FIX: this.isLastStep()
						if(_this.getData('localSteps')-1 < _this.getData('tourStepIndex')){

							// FIX: this.updateHintIndex( 1 );
							_this.updateHintIndex( '+' );
							_this.updateLocalSteps();
							pastHint = currentHint;
							// FIX: setCurrentHint
							setCurrentHint();
							_this.setData('tourStepIndex' , 0);

							// FIX: this.areHintsDone()
							if(_this.getData('totalHints')-1 < _this.getData('tourHintIndex')){

								_this.resetTourData();
								// FIX: May need an if
								_this.executeMethod('onEnd')
								return;

							}
						}

						// setCurrentStep
						setCurrentStep();

						// FIX: Should be pass currentStep?
						currentStep.component.startLyteStep( currentStep );

						// FIX: setPreviousStep
						setPrevStep();
						_this.executeMethod('onNext' , prevStepEle ,currentStep)
					}

				})

			}
			else {


				var beforeNext = _this.executeMethod('onBeforeNext' , currentStep , nextStepEle);

				if(beforeNext !== false){
					if(_this.getData('localSteps')-1 < _this.getData('tourStepIndex')){

						_this.updateHintIndex( '+' );
						_this.updateLocalSteps();
						pastHint = currentHint;
						setCurrentHint();
						_this.setData('tourStepIndex' , 0);
	
						if(_this.getData('totalHints')-1 < _this.getData('tourHintIndex')){
	
	
							if($L('.lyteTourDummyWrap').length){
								$L('.lyteTourDummyWrap')[0].remove();
							}
	
							if(this.getData('isResizeEventOn')){
	
								this.setData('isResizeEventOn' , false)
	
								window.removeEventListener('resize' , _this.$node.moveContainer)
	
							}
	
							_this.resetTourData();
							_this.executeMethod('onEnd')
							return;
	
						}
					}
					setCurrentStep();
					currentStep.component.startLyteStep( currentStep );
					setPrevStep();
					_this.executeMethod('onNext' , prevStepEle ,currentStep)
				}

			}

		}


		// FIX: This needs the same fixes as previous function
		this.$node.prevStep = function(){

			_this.setData('scrollTop' , document.documentElement.scrollTop);

			setCurrentHint();
			setCurrentStep();
			setPrevStep();
			closeStep();
			_this.updateStepIndex( '-' );

			var returnedValue = currentStep.component.executeMethod('onBeforeChange');

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			if( returnedValue ) {



				_this.executeMethod('onBeforePrev' , currentStep , prevStepEle);

				if(_this.getData('tourStepIndex') < 0 ){

					_this.updateHintIndex( '-' );
					pastHint = currentHint;

					if(_this.getData('tourHintIndex') < 0 ){

						_this.setData('tourHintIndex' , 0 );
						_this.setData('tourStepIndex' , 0 );
						pastHint = "";

					} else {

						_this.updateLocalSteps();
						_this.setData('tourStepIndex' , _this.getData('localSteps') - 1 );

					}

				}
				setCurrentHint();
				setCurrentStep();
				currentStep.component.startLyteStep( currentStep );

				_this.executeMethod('onPrev' , nextStepEle , currentStep)

			} else {



				_this.executeMethod('onBeforePrev' , currentStep , prevStepEle);

				if(_this.getData('tourStepIndex') < 0 ){

					_this.updateHintIndex( '-' );
					pastHint = currentHint;

					if(_this.getData('tourHintIndex') < 0 ){

						_this.setData('tourHintIndex' , 0 );
						_this.setData('tourStepIndex' , 0 );
						pastHint = "";

					} else {

						_this.updateLocalSteps();
						_this.setData('tourStepIndex' , _this.getData('localSteps') - 1 );

					}

				}
				setCurrentHint();
				setCurrentStep();
				currentStep.component.startLyteStep( currentStep );

				_this.executeMethod('onPrev' , nextStepEle , currentStep)

			}

		}

		// FIX: Change function names of the functions below
		this.$node.goToStep = function(ind){

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			setCurrentHint();
			setCurrentStep();
			closeStep();

			_this.setData('tourStepIndex' , ind );

			setCurrentHint();
			setCurrentStep();

			currentStep.component.startLyteStep( currentStep );

		}



		// FIX: Change function names of the functions below
		this.$node.changeHint = function(str){

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			_this.setData('closeStepFlag' , false);

			var tourArr = _this.getData('hintElements');

			// setCurrentHint
			setCurrentHint();

			// setCurrentStep
			setCurrentStep();

			// removeCurrentStep
			closeStep();

			_this.setData('tourHintIndex' , tourArr.indexOf(str) );
			_this.setData('tourStepIndex' , 0 );
			pastHint = currentHint;

			// setCurrentHint
			setCurrentHint();

			// setCurrentStep
			setCurrentStep();
			currentStep.component.startLyteStep( currentStep );

			_this.executeMethod('onHintChange' , pastHint , currentHint)

			/* This code can be simplied i guess
				removeCurrentStep();
				pastHint = currentHint;
				this.setData()
				this.setData();
				setCurrentHint();
				setCurrentStep();
			*/

		}

		this.$node.skipTour = function(){

			// FIX: this.closeCurrentStep();


			if($L('.lyteTourActiveStep')[0]){
				$L('.lyteTourActiveStep')[0].classList.remove('lyteTourActiveStep')
			}
			if($L('.lyteTourActiveTarget')[0]){
				$L('.lyteTourActiveTarget')[0].classList.remove('lyteTourActiveTarget')
			}

			if($L('.lyteTourDummyWrap').length){
				$L('.lyteTourDummyWrap')[0].remove();
			}

			if(!currentStep || !currentStep.component){
				setCurrentHint();
				setCurrentStep();
			}
			currentStep.component.setData('ltPropBindToBody' , false)
			_this.resetTourData();

			document.removeEventListener('keydown' , this.tabKeydownFun)

			// FIX: Should this be a global selector?
			if($L('.activeAnimation')[0]){
				$L('.activeAnimation')[0].component.setData('ltPropBindToBody' , false);
			}

			if(this.getData('isResizeEventOn')){

				this.setData('isResizeEventOn' , false)

				window.removeEventListener('resize' , _this.$node.moveContainer)

			}

			// This might need to be inside an if block
			_this.executeMethod('onEnd')

		}
		this.$node.pauseTour = function(){
			$L('.lyteTourWrap').addClass('lyteTourStepHidden')
			document.removeEventListener('keydown' , this.tabKeydownFun)
			// This might need to be inside an if block
			_this.executeMethod('onPause')
		}
		this.$node.resumeTour = function(){
			$L('.lyteTourStepHidden').removeClass('lyteTourStepHidden')
			setCurrentHint()
			setCurrentStep()
			closeStep();
			_this.executeMethod('onResume')
			_this.setData('tourHintIndex' , _this.getData('ltPropResumeHint'))
			_this.setData('tourStepIndex' , _this.getData('ltPropResumeStep'))
			setCurrentHint()
			setCurrentStep()
			currentStep.component.startLyteStep( currentStep );
		}

		function setCurrentHint(){
			currentHint = $L(lyteTourComp).find('lyte-tour-hint')[_this.getCurrentHintIndex()];

			// FIX: Change this to a function - this.animateCurrentHint()
			if(currentHint){
				if(currentHint.component.getData('ltPropBackgroundAnimation')){
					// DOUBT: Should this bindToBody be inside the if block
					currentHint.component.setData('ltPropBindToBody' , true);
					currentHint.classList.add('activeAnimation');
				}
			}

			// FIX: Change this to a function = this.animatePreviousHint()
			if(pastHint){
				if(pastHint.component.getData('ltPropBackgroundAnimation')){
					// DOUBT: should this ltPropBindToBody be inside the if block
					pastHint.component.setData('ltPropBindToBody' , false);
					pastHint.classList.remove('activeAnimation');
				}
			}
		}

		function setCurrentStep(){
			if($L('.lyteTourCStep')){
				$L('.lyteTourCStep').removeClass('lyteTourCStep')
			}
			currentStep = $L(currentHint).find('lyte-tour-step')[_this.getCurrentStepIndex()];

			$L(currentStep).addClass('lyteTourCStep')

		}

		function setNextStep(){


			// FIX: change this if condition to -> !this.isCurrentHintDone()
			// nextStepEle = this.getNextStep();
			if(_this.getCurrentStepIndex()+1 < $L(currentHint).find('lyte-tour-step').length){

				nextStepEle = $L(currentHint).find('lyte-tour-step')[_this.getCurrentStepIndex() + 1]

			} else {

				// FIX: This should be an else if( !this.areHintsDone() )
				// var hint = this.getNextHint();
				// nextStepEle = ..
				if(_this.getCurrentHintIndex()+1 < $L(lyteTourComp).find('lyte-tour-hint').length){

					var nextHint = $L(lyteTourComp).find('lyte-tour-hint')[_this.getCurrentHintIndex()+1]

					nextStepEle = $L(nextHint).find('lyte-tour-step')[0]

				}

			}

		}

		function setPrevStep(){

			// FIX: if( !this.atStartOfHint() )
			// prevStepEle = this.getPreviousStep()
			if(_this.getCurrentStepIndex()-1>=0){

				prevStepEle = $L(currentHint).find('lyte-tour-step')[_this.getCurrentStepIndex() - 1]

			} else {

				// FIX: if( !this.isFirstHint() )
				// prevHint = this.getPreviousHint();
				// prevStepEle = ...
				if(_this.getCurrentHintIndex() - 1 >= 0){

					var prevHint = $L(lyteTourComp).find('lyte-tour-hint')[_this.getCurrentHintIndex()-1]

					prevStepEle = $L(prevHint).find('lyte-tour-step')[$L(prevHint).find('lyte-tour-step').length-1]

				}

			}

		}

		function closeStep(){
			currentStep.component.setData('ltPropBindToBody' , false);
		}

		this.$node.moveContainer = function(){

			setCurrentHint();
			setCurrentStep();

			$L('.lyteTourContainer').addClass('lyteTourContainerNoTransition')

			currentStep.component.startLyteStep( currentStep );

		}

	},

	leftKeyFunction : function(){
		if((!(this.getData('closeStepFlag')))&&(this.getData('ltPropBindToBody'))){
			this.$node.prevStep();
	  	}
	},
	rightKeyFunction : function(){
		if((!(this.getData('closeStepFlag')))&&(this.getData('ltPropBindToBody'))){
			this.$node.nextStep();
	  	}
	},
	escKeyFunction : function(){
		if((this.getData('closeStepFlag'))&&(this.getData('ltPropBindToBody'))){
			this.$node.skipTour();
		}
	},

	// Tab keydown event function

	tabKeydownFun : function(event){
		if((event.keyCode === 9) && (event.keyCode === 16)){
			document.activeElement.blur()
			event.preventDefault();
		} else {
			$L(this).trigger('keydown')
		}
	},

	// FIX: v is number which is either 1 or -1 so add number to tourStepIndex
	updateStepIndex : function(v){
		if( v === '+' ){
			this.setData('tourStepIndex' , this.getData('tourStepIndex') + 1 );
		} else if( v === '-' ){
			this.setData('tourStepIndex' , this.getData('tourStepIndex') - 1 );
		}
	},

	// FIX: Same as previous function
	updateHintIndex : function(v){
		if( v === '+' ){
			this.setData('tourHintIndex' , this.getData('tourHintIndex') + 1 );
		} else if( v === '-' ){
			this.setData('tourHintIndex' , this.getData('tourHintIndex') - 1 );
		}
	},

	upDateIndex : function(v , str){
		if( v === '+' ){
			this.setData(str , this.getData(str) + 1 );
		} else if( v === '-' ){
			this.setData(str , this.getData(str) - 1 );
		}
	},

	updateLocalSteps : function(){

		var lyteTour = this.$node;
		var currentHint = $L(lyteTour).find('lyte-tour-hint')[this.getCurrentHintIndex()];
		var currentHintSteps = $L(currentHint).find('lyte-tour-step');

		this.setData('localSteps' , currentHintSteps.length);

	},

	getCurrentStepIndex : function(){
		return this.getData('tourStepIndex');
	},



	getCurrentHintIndex : function(){
		return this.getData('tourHintIndex');
	},

	resetTourData : function(){
		this.setData('totalHints' , 0);
		this.setData('totalSteps' , 0);
		this.setData('localSteps' , 0);
		this.setData('tourStepIndex' , 0);
		this.setData('tourHintIndex' , 0);
		this.setData('ltPropBindToBody' , false)
	},

	actions : {
		nextStep : function(){
			this.setData('tourStepIndex' , this.getData('tourStepIndex')+1);
			var currentHint = $L(this.$node).find('lyte-tour-hint')[this.getData('tourHintIndex')];
			var currentStep = $L(currentHint).find('lyte-tour-step')[this.getData('tourStepIndex')];


			currentStep.component.setData('ltPropBindToBody' , true);
			$L('.lyteTourStep')[0].style.display = "block";
		}
	},

	didDestroy : function(){
		shortcut.unregister('left' , this.leftKeyFunction)
		shortcut.unregister('right' , this.rightKeyFunction)
		shortcut.unregister('esc' , this.escKeyFunction)
		document.removeEventListener('keydown' , this.tabKeydownFun)
	}
});


if(!_lyteUiUtils.registeredCustomElements['lyte-tour-next-button']){

	_lyteUiUtils.registeredCustomElements['lyte-tour-next-button'] = true;

	Lyte.createCustomElement('lyte-tour-next-button' , {

		connectedCallback : function(){

			if(!this.lyteTourComponent){
				this.lyteTourComponent = $L(this).closest('lyte-tour')[0];
			}

		},

		constructor : function(){

			var _this = this
			$L(this).addClass('lyteTourButtons')

			this.addEventListener('click' , function(){


				if(_this.hasAttribute('lyte-tour-finish-button')){
					if($L('.lyteTourDummyWrap').length){
						$L('.lyteTourDummyWrap')[0].remove();
					}
				}
				_this.lyteTourComponent.nextStep();

			} . bind(this))

		},
		static : {"observedAttributes" : {}}

	})

}

if(!_lyteUiUtils.registeredCustomElements['lyte-tour-prev-button']){

	_lyteUiUtils.registeredCustomElements['lyte-tour-prev-button'] = true;

	Lyte.createCustomElement('lyte-tour-prev-button' , {

		connectedCallback : function(){

			if(!this.lyteTourComponent){
				this.lyteTourComponent = $L(this).closest('lyte-tour')[0];
			}

		},

		constructor : function(){

			var _this = this
			$L(this).addClass('lyteTourButtons')

			this.addEventListener('click' , function(){

				_this.lyteTourComponent.prevStep();

			} . bind(this))

		},
		static : {"observedAttributes" : {}}

	})

}

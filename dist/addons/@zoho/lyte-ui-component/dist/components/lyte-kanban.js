/**
 * Renders an board
 * @component lyte-board
 * @version 3.1.0
 * @methods onBoardScroll
 */
Lyte.Component.register( 'lyte-board', {
_template:"<template tag-name=\"lyte-board\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <template is=\"if\" value=\"{{expHandlers(ltPropLoadingYield,'!')}}\"><template case=\"true\"> <div class=\"lyteBoardWrapper\"> <div class=\"lyteKVLoadingHeaderPlaceholder\"></div> <div class=\"lyteBoardContainer\"> <div class=\"lyteKVLoadingPlaceholder\"></div> <div class=\"lyteKVLoadingPlaceholder\"></div> <div class=\"lyteKVLoadingPlaceholder\"></div> </div> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"loading\"></lyte-yield> </template></template> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div class=\"lyteBoardWrapper {{ltPropClass}}\"> <div class=\"lyteBoardHeader\"> <lyte-yield yield-name=\"headerItem\" board-detail=\"{{ltPropBoardDetail}}\" index=\"{{ltPropIndex}}\"></lyte-yield> </div> <div class=\"lyteBoardContainer\"> <div class=\"lyteKanbanNestedSortable {{ltPropKanbanId}}\" id=\"{{ltPropBoardDetail.id}}\" index=\"{{ltPropIndex}}\" data-loaded=\"{{dataLoaded}}\" cards-length=\"{{cardArray.length}}\" __scroll=\"{{action('boardScroll',event,this)}}\"> <template is=\"for\" items=\"{{cardArray}}\" item=\"itemContent\" index=\"index1\"> <div class=\"lyteBoardItemContentData {{lyteUiConcat(lyteUiAddSortableClass(ltPropBoardSortable,this),itemContent[ltPropCardClassName])}}\"> <lyte-yield yield-name=\"contentItem\" lyte-card-item=\"{{itemContent}}\" lyte-card-index=\"{{index1}}\"></lyte-yield> </div> </template> </div> <template is=\"if\" value=\"{{expHandlers(cardArray.length,'==',0)}}\"><template case=\"true\"> <div class=\"lyteKanbanNoResultMsg\">{{ltPropNoResultMessage}}</div> </template></template> </div> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["lyteViewPort","ltPropBoardDetail","ltPropIndex","ltPropBoardSortable","ltPropClass","ltPropKanbanId","ltPropMoreStageRecord","ltPropNoResultMessage","ltPropLoadingYield","ltPropCardClassName","ltPropAria","ltPropBoardAria","ltPropCardAria","dummyId","cardArray"],

	data : function() {
		return {
		 	/**
            * @componentProperty {object} ltPropBoardDetail
            * @version 3.1.0
            */ 
			lyteViewPort : Lyte.attr("boolean", {"default" : true}),//No I18n
			'ltPropBoardDetail' : Lyte.attr( 'object' ), 
			/**
            * @componentProperty {number} ltPropIndex
            * @version 3.1.0
            */ 
			'ltPropIndex' : Lyte.attr( 'number' ),
			/**
            * @componentProperty {boolean} ltPropBoardSortable=true
            * @version 3.1.0
            */
            'ltPropBoardSortable' : Lyte.attr( 'boolean', {
				'default':  _lyteUiUtils.resolveDefaultValue( 'lyte-board', 'boardSortable', true )
			} ),
			/**
            * @componentProperty {string} ltPropClass
            * @version 3.1.0
            */
			'ltPropClass' : Lyte.attr('string',{
				'default':  _lyteUiUtils.resolveDefaultValue( 'lyte-board', 'class', '' )
			}),
			/**
            * @componentProperty {string} ltPropKanbanId=''
            * @version 3.1.0
            */
			'ltPropKanbanId' : Lyte.attr( 'string', {
				'default' : ''
			} ) ,
			/**
            * @componentProperty {boolean} ltPropMoreStageRecord=false
            * @version 3.1.0
            */
			'ltPropMoreStageRecord' : Lyte.attr( 'boolean', {
				'default': false
			} ),
			/**
            * @componentProperty {string} ltPropNoResultMessage=''
            * @version 3.1.0
            */
			'ltPropNoResultMessage' : Lyte.attr('string',{'default': _lyteUiUtils.resolveDefaultValue( 'lyte-dropdown', 'noResultMessage', _lyteUiUtils.i18n( 'no.results.found' ) )}),
			/**
            * @componentProperty {boolean} ltPropLoadingYield=true
            * @version 3.1.0
            */
			'ltPropLoadingYield' : Lyte.attr( 'boolean',{
				'default':true
			}),
			/**
            * @componentProperty {string} ltPropCardClassName
            * @version 3.1.0
            */
			'ltPropCardClassName' : Lyte.attr('string',{'default':undefined}),
			/**
            * @componentProperty {boolean} ltPropAria
            * @version 3.1.0
            */
		   'ltPropAria' : Lyte.attr('boolean',{
			   'default':false
		   }),
		   /**
            * @componentProperty {object} ltPropBoardAria
            * @version 3.1.0
            */
		   'ltPropBoardAria' : Lyte.attr('object',{
				default:{}
			}), 
			/**
            * @componentProperty {object} ltPropCardAria
            * @version 3.1.0
            */
			'ltPropCardAria' : Lyte.attr('object',{
				default:{}
			}), 
			/**
            * @experimental dummyId
            */
			'dummyId' : Lyte.attr( 'string', {
				'default' : ''
			} ),
			/**
            * @experimental cardArray
            */
			'cardArray' : Lyte.attr( 'array', {
				'default':[]
			} )
		}		
	},
	init : function(){

		this.setCardArray()
	},
	didConnect : function(){
		this.$node.getVisibleCard =function(){
			    var scrollDiv = this.$node.getElementsByClassName('lyteKanbanNestedSortable')[0]
			    if(scrollDiv.scrollHeight>scrollDiv.clientHeight){
			    	return this.getVisibleNode()

			    }
			return (this.getData('ltPropBoardDetail').cards ? this.getData('ltPropBoardDetail').cards  : [])

		}.bind(this)
	},
	ariaObs : function(){
		this.addAria()
	}.observes('ltPropBoardAria','ltPropCardAria').on('didConnect'),
	addAria : function(){
		if(this.getData('ltPropAria')){
			var self = this
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteBoardWrapper'), this.getData( 'ltPropBoardAria' ) || {}, {} );
			this.$node.querySelectorAll('.lyteBoardItemContentData').forEach(function(item){
				_lyteUiUtils.setAttribute( item, self.getData( 'ltPropCardAria' ) || {}, {} );
			})

		}
	},
	viewPortObs : function(){
			if( !this.getData('lyteViewPort') && this.getData('ltPropBoardSortable')) {
				var kanbanview = $L(this.$node ).closest( 'lyte-kanbanview' )[ 0 ]
				if(kanbanview){
					kanbanview.component.addSortableForCard()
				} 
				this.addAria()
			}
		

	}.observes('lyteViewPort'),
	didDestroy: function() {
		clearTimeout( this.timeout1 );
		clearTimeout(this.debounceTimeout)
	},
	getVisibleNode : function(){
        // return;
        var bcr=this.$node.getBoundingClientRect(),
        originalRows = Array.from( this.$node.getElementsByClassName( 'lyteBoardItemContentData' ) ),
        tValue = Math.max( bcr.top + 10 , -10 ),
        bValue = Math.min( window.innerWidth + 10, bcr.bottom),
        visible = [], boardDetails = this.getData('ltPropBoardDetail').cards;
        


       
        for( var i = 0; i < originalRows.length; i++ ){
            var row = originalRows[ i ],
            _bcr = row.getBoundingClientRect();
            if( _bcr.bottom > tValue && _bcr.top <bValue ){
                visible.push( boardDetails[i] );
                
            }
        }

        
        return visible;
    
	},
	contentObs : function(){
		this.setCardArray()
		if(this.getData('ltPropBoardSortable') && !this.getData('lyteViewPort')){
			this.addSortableForNewRecords()
		}
		
	}.observes( 'ltPropBoardDetail.cards.[]' ),
	setCardArray : function(){
		var boardDetail = this.getData('ltPropBoardDetail')
		if( boardDetail && boardDetail.cards ){
			this.setData( 'cardArray', boardDetail.cards )
		}
	},
	addSortableForNewRecords : function() {
		var div = this.$node.querySelectorAll( '.lyteKanbanNestedSortable.'+this.getData('ltPropKanbanId') )[0]
		if(div.classList.contains('sortable-parent')){
			var sortableClass = div.getSortableClass(),
			cardWithoutSortable = this.$node.querySelectorAll( '.lyteBoardItemContentData:not(.'+sortableClass+')' )
			$L(cardWithoutSortable).map(function(index,element){
				element.parentElement.addToSortable(element);
			})
		}
		
		
	},
	addShadow : function() {
		this.$node.querySelector( '.lyteBoardHeader' ).classList.add( 'lyteKanbanviewHeaderShadow' ); 
	},
	hasScrollHeightReached : function(event) {
		if ( event.target.scrollHeight - 10 <= ( Math.ceil( event.target.offsetHeight ) + Math.ceil( event.target.scrollTop ) ) ) {
			if ( this.getData( 'ltPropMoreStageRecord' ) && this.getMethods( 'onBoardScroll' ) ) {
				this.executeMethod( 'onBoardScroll' , this.getData( 'ltPropBoardDetail' ), this, event  ); //NO i18n
			}
		}
	},
	removeShadow : function(){
		this.$node.querySelector('.lyteBoardHeader').classList.remove('lyteKanbanviewHeaderShadow'); // No I18n
	},
	executeScrollStop : function(event){
		if( this.getMethods( 'onBoardScrollStop' ) ) {
			var visible,boardDetail = this.getData('ltPropBoardDetail'),
			 scrollDiv = this.$node.getElementsByClassName('lyteKanbanNestedSortable')[0]
			if(scrollDiv.scrollHeight>scrollDiv.clientHeight){
			    	visible = this.getVisibleNode()
			 } else{
			 	visible = boardDetail.cards
			 }
			this.executeMethod( 'onBoardScrollStop', boardDetail, visible, this, scrollDiv.scrollTop, event );
		}
	},
	actions :{
		boardScroll : function( event ) {
			if ( event.target.scrollTop != 0 ) {
				this.addShadow();
			}

			this.timeout1 = setTimeout(function() {
				
				this.hasScrollHeightReached(event)
			}.bind( this ), 10 );

			if ( event.target.scrollTop == 0 ){
				this.removeShadow()
			}
			//debounce
			clearTimeout(this.debounceTimeout)
			this.debounceTimeout = setTimeout( function(){
				this.executeScrollStop(event)
			}.bind(this),100)
			// event.preventDefault()
			// event.stopPropagation();
		}
	}
});
Lyte.Component.registerHelper('lyteUiAddSortableClass',function(sortable,item ){
	if(sortable && item.parentElement && item.parentElement.getSortableClass){
		return "sortable-element "+item.parentElement.getSortableClass()+(item.classList.contains("sortable-element-selected") > -1 ? "sortable-element-selected ":" ")
	}
	return ''	
});
/**
 * Renders a kanbanview
 * @component lyte-kanbanview
 * @version 3.1.0
 * @dependencies lyte-card,lyte-board
 * /components/lyte-card.js
 * /theme/compiledCSS/default/ltr/lyte-ui-card.css
 * /components/lyte-board.js
 * /theme/compiledCSS/default/ltr/lyte-ui-board.css
 * @methods onDragSelectForBoard, onDragSelectBoards, onBodyScroll, onDragSelectForCard, onRecordDropForBoard, onRecordDrop,onDragSelectCard
 */
 Lyte.Component.register( 'lyte-kanbanview' , {
_template:"<template tag-name=\"lyte-kanbanview\"> <div class=\"lyteKanbanviewScrollDivSelector {{dummyId}}\" __scroll=\"{{action('onBodyScroll',event)}}\"> <template is=\"for\" items=\"{{ltPropBoardDetails}}\" item=\"item\" index=\"dataIndex\"> <div class=\"lyteKanbanViewItem\"> <lyte-yield yield-name=\"kanbanYield\" lyte-board-item=\"{{item}}\" lyte-index=\"{{dataIndex}}\" lyte-kanban-id=\"{{dummyId}}\"></lyte-yield> </div> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}],
_observedAttributes :["ltPropBoardDetails","ltPropSortable","ltPropMoreStageRecord","ltPropId","ltPropPreventBoardDetailObserver","ltPropViewPort","ltPropBoardScrollStopDuration","ltPropAria","ltPropAriaAttributes","ltPropSortableCancel","dummyId"],

	data : function(){
		return {
			/** 
			 * @componentProperty {array} ltPropBoardDetails=[]
			 * @version 3.1.0
			 */

			'ltPropBoardDetails' : Lyte.attr( 'array', {
				'default': []
			} ), 
			/** 
			 * @typedef {object} sortable
			 * @property {boolean} board
			 * @property {boolean} card
			*/
			/** 
			 * @componentProperty {sortable} ltPropSortable={"board" : true, "card" : true }
			 * @version 3.1.0
			 */
			'ltPropSortable' : Lyte.attr( 'object', {
				'default': {"board" : true, "card" : true }

			} ) ,
			/** 
			 * @componentProperty {boolean} ltPropMoreStageRecord=false
			 * @version 3.1.0
			 */
			'ltPropMoreStageRecord' : Lyte.attr( 'boolean', {
				'default': false
			} ),
			/** 
			 * @componentProperty {string} ltPropId
			 * @version 3.1.0
			 */
			'ltPropId' : Lyte.attr( 'string'),
			/** 
			 * @componentProperty {boolean} ltPropPreventBoardDetailObserver
			 * @version 3.1.0
			 */
			'ltPropPreventBoardDetailObserver' : Lyte.attr('boolean',{
				'default':false
			}),
			/** 
			 * @componentProperty {boolean} ltPropViewPort
			 * @version 3.1.0
			 */
			'ltPropViewPort' : Lyte.attr('boolean',{
				'default':true
			}),
			/** 
			 * @componentProperty {number} ltPropBoardScrollStopDuration=250
			 * @version 3.1.0
			 */
			'ltPropBoardScrollStopDuration' : Lyte.attr('number',{
				'default':250
			}),
			/** 
			 * @componentProperty {boolean} ltPropAria
			 * @version 3.1.0
			 */
			'ltPropAria' : Lyte.attr('boolean',{
				'default':false
			}),
			/** 
			 * @componentProperty {object} ltPropAriaAttributes
			 * @version 3.1.0
			 */
			'ltPropAriaAttributes' : Lyte.attr('object',{
				default:{}
			}), 
			/**
            * @componentProperty string ltPropSortableCancel
			* @version 3.1.0
            */
			'ltPropSortableCancel' : Lyte.attr('string'),
			/**
            * @experimental dummyId
            */
			'dummyId' : Lyte.attr( 'string', {
				'default' : ''
			} )
		}		
	},
	didDestroy : function() {
		clearTimeout(this.timeout2);
		clearTimeout(this.debounceTimeout)
		clearTimeout(this.viewPortTimeOut)

	},
	didConnect : function() {
		var kanbanviewList = document.querySelectorAll('lyte-kanbanview')
		this._dir = _lyteUiUtils.getRTL();

		if(this.getData('ltPropId') == undefined){
			var pos = Object.values(kanbanviewList).indexOf(this.$node)
			this.setData('dummyId', 'dummyId'+pos)
		}
		else{
			this.setData('dummyId',this.getData('ltPropId'))
		}
		this.doBoardSortable()
		if(!this.getData('ltPropViewPort')){
			this.doCardSortable()
		}
		this.$node.getVisibleBoard =function(){
			var scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )
			if(scrollDiv.scrollWidth<scrollDiv.clientWidth){
				return this.getData('ltPropBoardDetails')
			}
			return this.getVisibleNode()
		}.bind(this)
	},
	ariaObs : function(){
		if(this.getData('ltPropAria')){
			_lyteUiUtils.setAttribute( this.$node.querySelector('.lyteKanbanviewScrollDivSelector'), this.getData( 'ltPropAriaAttributes' ) || {}, {} );
		}
	}.observes('ltPropAriaAttributes').on('didConnect'),
	getVisibleNode : function(){
        // return;
        var bcr=this.$node.getBoundingClientRect(),
        originalRows = Array.from( this.$node.getElementsByTagName( 'lyte-board' ) ),
        tValue = Math.max( bcr.left + (this._dir?0:10) , -10 ),
        bValue = Math.min( window.innerWidth + 10, bcr.right  - (this._dir?10:0)),
        visible = [],boardDetails = this.getData('ltPropBoardDetails');


        for( var i = 0; i < originalRows.length; i++ ){
            var row = originalRows[ i ],
            _bcr = row.getBoundingClientRect();
            if( _bcr.right > tValue && _bcr.left <bValue ){
				if(originalRows[i].component.getMethods('onBoardVisible')){
					originalRows[i].component.executeMethod('onBoardVisible', boardDetails,boardDetails[i])
				}

                visible.push( boardDetails[i] );
                
            }
        }

        return visible;
    
	},
	callOnBoardVisible : function(){

		var originalRows = Array.from( this.$node.getElementsByTagName( 'lyte-board' ) )
		for( var i = 0 ; i < originalRows.length ; i++) {
			if( originalRows[i].component.getMethods( 'onBoardVisible' ) ) {
				originalRows[i].component.executeMethod( 'onBoardVisible' , this.getData('ltPropBoardDetails') ,  this.getData('ltPropBoardDetails')[i])
			}
		}
	},
	boardObs : function() {
		if( this.getData('ltPropSortable').board ) {
			this.addSortableForNewBoards()
		}
		if(!this.getData('ltPropPreventBoardDetailObserver') && this.getData('ltPropSortable').card){
			// $L( '.lyteKanbanviewScrollDivSelector ', this.$node ).sortable("destroy")
			clearTimeout(this._sortableTimeout)
			this._sortableTimeout = setTimeout(function(){
				this.setupSortableForCard()
			}.bind(this),100)
			
		}
	}.observes( 'ltPropBoardDetails.[]' ),
	doCardSortable : function() {
		clearTimeout(this._cardSortableTimeout)
		this._cardSortableTimeout =setTimeout( function(){
			if( this.getData( 'ltPropBoardDetails' ).length > 0 && this.getData( 'ltPropSortable' ).card ) {
				this.setupSortableForCard()
			}
		}.bind(this),100)
		
	},
	doBoardSortable : function() {
		if( this.getData( 'ltPropBoardDetails' ).length > 0 && this.getData( 'ltPropSortable' ).board ) {
			this.setupSortableForBoard()
		}
	},
	hasSameColumnReordered : function( source, destination ) {
		var sourceIndex = source.getAttribute( 'index' ),
		destinationIndex = destination.getAttribute( 'index' )

		if( sourceIndex == destinationIndex ) {
			return true
		}
		return false
	},
	onRecordDropForBoard : function( boardDetails, droppedElement, fromIndex, toIndex, source, destination, draggedElement ){
		
		if( this.getMethods( 'onRecordDropForBoard') ) {
			this.executeMethod( 'onRecordDropForBoard', droppedElement, source, destination, fromIndex, toIndex ,boardDetails ,draggedElement[0] )
		}
	},
	onRecordDrop : function( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination,droppedElement) {
		var sourceIndex = source.getAttribute( 'index' ),
		destinationIndex = destination.getAttribute( 'index' ),
		board,card


		board = this.$node.querySelectorAll( 'lyte-board' );
		card = droppedElement.querySelector( 'lyte-card' )
		if( !this.hasSameColumnReordered( source, destination ) ) {
			boardDetails[ sourceIndex ].cards = sourceArray; 
			board[ sourceIndex ].setData( 'ltPropContent' , sourceArray );
		}
		boardDetails[ destinationIndex ].cards = destArray; 
		board[ destinationIndex ].setData('ltPropContent' , destArray);

		if( this.getMethods( 'onRecordDrop') ) {
			this.executeMethod( 'onRecordDrop', card, board[ sourceIndex ], board[ destinationIndex ], fromIndex, toIndex,parseInt(sourceIndex),parseInt(destinationIndex),boardDetails,draggedElement[0] ) 
		}
	},
	addSortableForCard : function(){
		//debounce
		clearTimeout(this.viewPortTimeOut)
		this.viewPortTimeOut = setTimeout(function(){
			// this.setupSortableForCard()
			
			this.setUpCard()
		}.bind(this),250)
	},
	setUpCard : function(){
		var boardWithoutSortable = this.$node.querySelectorAll( '.lyteKanbanNestedSortable:not(.sortable-parent)' )
		var boardWithSortable = this.$node.querySelectorAll( '.lyteKanbanNestedSortable.sortable-parent' )

		if( boardWithoutSortable.length > 0 && boardWithSortable.length > 0 ){
			var self=this  ;
			var sortableObject = {
				scrollDivX  :  '.lyteKanbanviewScrollDivSelector.'+self.getData('dummyId') , 
				isSameClass : true, 
				dblTouchEvent : true,
				onReady : function(sortableElem) {
					var board = $L(sortableElem)[0].closest("lyte-board")
					if( self.getMethods( 'onReadyForCard' ) ){
						return self.executeMethod( 'onReadyForCard', sortableElem, board); 
					}
				},
				onSelect  : function( currentElem, fromIndex, source, event ) { 
					if($L(currentElem).hasClass('lyteKanbanNoResultMsg')){
						return false;
					}
					var	card = currentElem.querySelector( 'lyte-card' )

					if( self.getMethods( 'onDragSelectForCard' ) ){
						return self.executeMethod( 'onDragSelectForCard', card, fromIndex, source, event ); 
					}
					
					return true;
				},
				onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
					self.prevent =true
					var	card = draggableElement.querySelector( 'lyte-card' )
					if( self.getMethods( 'onDragForCard' ) ){
							self.executeMethod( 'onDragForCard', card, belowElem, event, placeholder ); 
					}
				},
				onEnter : function(event, obj){
					console.log("onEnter")
					var element = arguments[1].sortable,
					boardDetails=self.getData( 'ltPropBoardDetails' )

					if(element.getAttribute('cards-length')==0){
						var div=element.nextElementSibling
						if($L(div).hasClass('lyteKanbanNoResultMsg')){
							div.classList.add('lyteHide')
						}
					}
					if( self.getMethods( 'onEnterForCard' ) ){
						return self.executeMethod( 'onEnterForCard', boardDetails, event, obj); 
					}
				},
				onLeave : function ( event , obj) {
					var element = arguments[1].sortable,
					boardDetails=self.getData( 'ltPropBoardDetails' )

					if(element.getAttribute('cards-length')==0){
						var div=element.nextElementSibling
						if($L(div).hasClass('lyteKanbanNoResultMsg')){
							div.classList.remove('lyteHide')
						}
					}
					if( self.getMethods( 'onLeaveForCard' ) ){
						return self.executeMethod( 'onLeaveForCard',boardDetails, event, obj); 
					}
				},
				onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
					var sourceIndex = source.getAttribute( 'index' ),
					destinationIndex = destination.getAttribute( 'index' ),
					boardDetails=self.getData( 'ltPropBoardDetails' ),
					sourceArray=boardDetails[ sourceIndex ].cards,
					destArray=boardDetails[ destinationIndex ].cards,
					flag = true;
					if( self.getMethods( 'onBeforeDropForCard' ) ){
						flag = self.executeMethod( 'onBeforeDropForCard', boardDetails, sourceArray, destArray, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
					}
					return flag;
				},
				onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
					var sourceIndex = source.getAttribute( 'index' ),
					destinationIndex = destination.getAttribute( 'index' ),
					boardDetails=self.getData( 'ltPropBoardDetails' ),
					sourceArray=boardDetails[ sourceIndex ].cards,
					destArray=boardDetails[ destinationIndex ].cards,
					draggedElement
					if(destArray.length==0){
						toIndex=0;
					}
					draggedElement = ( self.hasSameColumnReordered( source, destination ) ? Lyte.arrayUtils( destArray, 'splice', fromIndex, 1 ) : Lyte.arrayUtils( sourceArray, 'splice', fromIndex, 1 ) )
					Lyte.arrayUtils( destArray, 'splice', toIndex, 0, draggedElement[ 0 ] )
					delete self.prevent

					self.onRecordDrop( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination ,droppedElement)

				}  
			}
			if( this.getData('ltPropSortableCancel') ){
				sortableObject.cancel = this.getData('ltPropSortableCancel')

			}
			boardWithSortable.forEach(function(element){
				element.addToConnectedWith(
					boardWithoutSortable,sortableObject);
			})
			
		} 
		if(boardWithSortable.length == 0){
			this.setupSortableForCard()
		}
	},
	setupSortableForBoard : function() {
		var self=this  ;
		var sortableObject =  {  
			scrollDivX  :  '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ,  
			dblTouchEvent: true ,
			onReady : function(sortableElem) {
				if( self.getMethods( 'onReadyForBoard' ) ){
					return self.executeMethod( 'onReadyForBoard', sortableElem, this); 
				}
			},
			onSelect  : function( currentElem, fromIndex, source, event ) { 
					var	board = currentElem.querySelector( 'lyte-board' )
					
					if( self.getMethods( 'onDragSelectForBoard' ) ){
						return self.executeMethod( 'onDragSelectForBoard', board, fromIndex, source, event ); 
					}
					
					return true;
			},
			onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
				self.prevent =true
				var	board = draggableElement.querySelector( 'lyte-board' )

				if( self.getMethods( 'onDragForBoard' ) ){
						 self.executeMethod( 'onDragForBoard', board, belowElem, event, placeholder ); 
				}
			},
			onEnter : function ( event , obj) {
				var boardDetails=self.getData( 'ltPropBoardDetails' )

				if( self.getMethods( 'onEnterForBoard' ) ){
					self.executeMethod( 'onEnterForBoard',boardDetails, event, obj); 
		   		}
			},
			onLeave : function ( event , obj) {
				var boardDetails=self.getData( 'ltPropBoardDetails' )

				if( self.getMethods( 'onLeaveForBoard' ) ){
					self.executeMethod( 'onLeaveForBoard', boardDetails, event, obj); 
		   		}
			},
			onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
				var boardDetails=self.getData( 'ltPropBoardDetails' ),
				board = droppableElement.querySelector( 'lyte-board' ),
				flag = true;
				if( self.getMethods( 'onBeforeDropForBoard' ) ){
					flag = self.executeMethod( 'onBeforeDropForBoard', boardDetails, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
				}
				return flag;
			},
			onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
				var boardDetails=self.getData( 'ltPropBoardDetails' ),
				draggedElement, board = droppedElement.querySelector( 'lyte-board' )



				draggedElement = Lyte.arrayUtils( boardDetails, 'splice', fromIndex, 1 )
				Lyte.arrayUtils( boardDetails, 'splice', toIndex, 0, draggedElement[ 0 ] )
				delete self.prevent

				self.setData('ltPropBoardDetails',boardDetails)
				self.onRecordDropForBoard( boardDetails, board , fromIndex, toIndex, source, destination, draggedElement)

				
		 	} 
 		}
		if( this.getData('ltPropSortableCancel') ){
			sortableObject.cancel = this.getData('ltPropSortableCancel')

		}
		$L( '.lyteKanbanviewScrollDivSelector ', this.$node ).sortable(sortableObject); 
	},
	setupSortableForCard : function(){
		var self=this;
		// if($L( '.lyteKanbanNestedSortable', this.$node )){
		var sortableObject = {  
			scrollDivX  : '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ,  
			connectedWith  : '.lyteKanbanNestedSortable.'+this.getData('dummyId') , 
			isSameClass : true,
			dblTouchEvent: true ,
			onReady : function(sortableElem) {
				var board = $L(sortableElem)[0].closest("lyte-board")
				if( self.getMethods( 'onReadyForCard' ) ){
					return self.executeMethod( 'onReadyForCard', sortableElem, board); 
				}
			},
			onSelect  : function( currentElem, fromIndex, source, event ) { 
					if($L(currentElem).hasClass('lyteKanbanNoResultMsg')){
						return false;
					}
					var	card = currentElem.querySelector( 'lyte-card' )

					if( self.getMethods( 'onDragSelectForCard' ) ){
						return self.executeMethod( 'onDragSelectForCard', card, fromIndex, source, event ); 
					}
					
					return true;
			},
			onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
				self.prevent =true
				var	card = draggableElement.querySelector( 'lyte-card' )
				if( self.getMethods( 'onDragForCard' ) ){
						 self.executeMethod( 'onDragForCard', card, belowElem, event, placeholder ); 
				}
			},
			onEnter : function(event, obj){
				var element = arguments[1].sortable,
				boardDetails=self.getData( 'ltPropBoardDetails' )

				if(element.getAttribute('cards-length')==0){
					var div=element.nextElementSibling
					if($L(div).hasClass('lyteKanbanNoResultMsg')){
						div.classList.add('lyteHide')
					}
				}
				if( self.getMethods( 'onEnterForCard' ) ){
					return self.executeMethod( 'onEnterForCard', boardDetails, event, obj); 
				}
			},
			onLeave : function ( event , obj) {
				var element = arguments[1].sortable,
				boardDetails=self.getData( 'ltPropBoardDetails' )

				if(element.getAttribute('cards-length')==0){
					var div=element.nextElementSibling
					if($L(div).hasClass('lyteKanbanNoResultMsg')){
						div.classList.remove('lyteHide')
					}
				}
				if( self.getMethods( 'onLeaveForCard' ) ){
					return self.executeMethod( 'onLeaveForCard',boardDetails, event, obj); 
				}
			},
			onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
				var sourceIndex = source.getAttribute( 'index' ),
				destinationIndex = destination.getAttribute( 'index' ),
				boardDetails=self.getData( 'ltPropBoardDetails' ),
				sourceArray=boardDetails[ sourceIndex ].cards,
				destArray=boardDetails[ destinationIndex ].cards,
				flag = true;
				if( self.getMethods( 'onBeforeDropForCard' ) ){
					flag = self.executeMethod( 'onBeforeDropForCard', boardDetails, sourceArray, destArray, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
				}
				return flag;
			},
			onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
				var sourceIndex = source.getAttribute( 'index' ),
				destinationIndex = destination.getAttribute( 'index' ),
				boardDetails=self.getData( 'ltPropBoardDetails' ),
				sourceArray=boardDetails[ sourceIndex ].cards,
				destArray=boardDetails[ destinationIndex ].cards,
				draggedElement
				if(destArray.length==0){
					toIndex=0;
				}
				draggedElement = ( self.hasSameColumnReordered( source, destination ) ? Lyte.arrayUtils( destArray, 'splice', fromIndex, 1 ) : Lyte.arrayUtils( sourceArray, 'splice', fromIndex, 1 ) )
				Lyte.arrayUtils( destArray, 'splice', toIndex, 0, draggedElement[ 0 ] )
				delete self.prevent

				self.onRecordDrop( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination ,droppedElement)

			 } 
		 }
		 if(this.getData('ltPropSortableCancel')){
			sortableObject.cancel =this.getData('ltPropSortableCancel')

		}
			$L( '.lyteKanbanNestedSortable', this.$node ).sortable( sortableObject );
		// }
		 
	},
	isDragging : function(){
		if(this.prevent){
			return true
		}
		return false
	},
	hasScrollEndReached : function(event) {
		var scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ),
			boardDetails = this.getData( 'ltPropBoardDetails' ),
			clientRect=this.$node.getBoundingClientRect(),
			lastClient=scrollDiv.lastElementChild.getBoundingClientRect()
			if((!this._dir && lastClient.right-3 < clientRect.right)||(this._dir&& lastClient.left+3>Math.min(window.innerWidth,clientRect.left))){
					if( this.getMethods( 'onBodyScroll' ) ) {
					this.executeMethod( 'onBodyScroll', this, boardDetails,event );
					
					}
			}
         
	},
	addSortableForNewBoards : function() {
		var sortableClass = this.$node.querySelectorAll( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )[ 0 ].getSortableClass(),
		boardWithoutSortable = this.$node.querySelectorAll( '.lyteKanbanViewItem:not(.'+sortableClass+')' )

		$L(boardWithoutSortable).addClass("sortable-element "+sortableClass );
	},
	executeScrollStop : function(event){
		
		var visible,boardDetails=this.getData('ltPropBoardDetails'),
		scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )
		if(scrollDiv.scrollWidth > scrollDiv.clientWidth){
			visible = this.getVisibleNode()
		}
		else{
			visible = boardDetails
			this.callOnBoardVisible()

		}	
		if( this.getMethods( 'onBodyScrollStop' ) ) {
			this.executeMethod( 'onBodyScrollStop', boardDetails, visible, this, scrollDiv.scrollLeft,event );
		}
	},
	actions :{
		onBodyScroll : function( ev ) {
			this.timeout2 = setTimeout( function() {
				this.hasScrollEndReached(ev)
			}.bind( this ), 10 );
			clearTimeout(this.debounceTimeout)
			this.debounceTimeout = setTimeout( function(){
				this.executeScrollStop(ev)
			}.bind(this),this.getData('ltPropBoardScrollStopDuration'))
		}
	}
});
/**
 * 
 * @syntax yielded 
 *	<lyte-kanbanview lt-prop-id="kanbanview">
 *   <template is="registerYield" yield-name="kanbanYield">
 *      <lyte-board lt-prop-kanban-id="kanbanview">
 *           <template is="registerYield" yield-name="headerItem">
 *           Board 1
 *           </template>
 *           <template is="registerYield" yield-name="contentItem">
 *               <lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 1
 *                       </lyte-card-body>
 *                   </template>
 *				</lyte-card>
 *				<lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 2
 *                       </lyte-card-body>
 *                   </template>
 *               </lyte-card>
 *          </template>
 *       </lyte-board>
 *       <lyte-board lt-prop-kanban-id="kanbanview">
 *           <template is="registerYield" yield-name="headerItem">
 *           Board 2
 *           </template>
 *           <template is="registerYield" yield-name="contentItem">
 *               <lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 1
 *                       </lyte-card-body>
 *                   </template>
 *				</lyte-card>
 *				<lyte-card >
 *                   <template is="registerYield" yield-name="yield">
 *                       <lyte-card-body>
 *		    					Card 2
 *                       </lyte-card-body>
 *                   </template>
 *               </lyte-card>
 *          </template>
 *       </lyte-board>
 *   </template>
 *   </lyte-kanbanview>
 */

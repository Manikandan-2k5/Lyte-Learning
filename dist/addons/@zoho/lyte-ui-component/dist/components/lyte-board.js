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
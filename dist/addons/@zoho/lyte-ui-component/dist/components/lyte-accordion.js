/**
 * Renders an accordion
 * @component lyte-accordion
 * @version 1.0.0
 * @methods onChanged,onOpen,onClose,onBeforeClose,onBeforeOpen,afterRender
 */

Lyte.Component.register( 'lyte-accordion', {
_template:"<template tag-name=\"lyte-accordion\"> <lyte-yield yield-name=\"yield\"> </lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropDuration","ltPropHeight","ltPropExclusive","ltPropYield","ltPropDynamic","ltPropNested","ltPropPreventAutoScroll"],

	data: function() {
		return {
			/**
			 * @componentProperty {string} ltPropDuration=0.2s
			 * @suffix s,ms
			 */

			'ltPropDuration': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-accordion', 'duration', '0.2s' ) 
			} ),

			/**
			 * @componentProperty {string} ltPropHeight
			 * @suffix px,pt,cm,mm,vh,vm,em
			 */

			'ltPropHeight': Lyte.attr( 'string' ),

			/**
			 * @componentProperty {boolean} ltPropExclusive=true
			 */

			'ltPropExclusive': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-accordion', 'exclusive', true ) 
			} ),

			'ltPropYield': Lyte.attr( 'boolean', { 
				'default': true 
			} ),

			/**
			 * @componentProperty {boolean} ltPropDynamic=false
			 * @version 2.2.0
			 */

			'ltPropDynamic': Lyte.attr( 'boolean', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-accordion', 'dynamic', true ) 
			} ),

			/**
			 * @componentProperty {boolean} ltPropNested=false
			 * @version 3.12.0
			 */

			'ltPropNested': Lyte.attr( 'boolean', {
				'default': false
			} ),

			'ltPropPreventAutoScroll': Lyte.attr( 'boolean', {
				'default': false
			} )
		}
	},

	toggleCurrentPanel: function( header ) {
		header.click();
	},

	execAndCheck: function( name, event ) {
		var arg, ret;

		arg = _lyteAccordion.findProperParent( event.target ).parentElement;
	 	ret = this.executeMethod( name, event, arg, this );
	 	ret = ret == undefined ? true : ret;
	 	return ret;
	},

	initiateClose: function( activeElement, cb, event ) {
		var accordionItem = activeElement.parentElement,
		header = accordionItem.querySelector( 'lyte-accordion-header' ),
		isImmediate = accordionItem._immediate;

		if( !isImmediate ) {
			// Requires two rAFs to do this which is totally weird - https://jsfiddle.net/6dLnwyef/1/
			window.requestAnimationFrame( function() {
				activeElement.style.height = activeElement.getBoundingClientRect().height + 'px';
				window.requestAnimationFrame( function() {
					activeElement.style.height = '0px';
				} );
			} );
		}
		else {
			this.closeImmediately( activeElement );
		}
		
			
		activeElement.style.overflow = 'hidden';	
		activeElement._close = true;
		activeElement.parentElement.classList.remove( 'lyteAccordionActive' );
		header.setAttribute( 'aria-expanded', 'false' );
		activeElement.setAttribute( 'aria-hidden', 'true' );

		if( cb ) {
			cb.call( this, event );
		}
	},

	closeImmediately: function( accordionBody ) {

		accordionBody.style.transitionDuration = '0s';
		accordionBody.style.height = '0px';
		// TODO: Find a way to add onAfterClose callback
		// this.execNonRetCalls( [ 'onAfterClose', this ] );
	},

	execNonRetCalls: function( arr ) {
		if( this.getMethods( arr[ 0 ] ) ) {
			this.executeMethod.apply( this, arr );
	 	}
	},

	isVisible: function( item ) {
		return !!( item.offsetWidth || item.offsetHeight || item.getClientRects().length );
	},

	scrollIntoView: function( body ) {
		var isVisible = body && this.isVisible( body );

		if( !isVisible || !body ) {
			return ;
		}

		var height = this.$node.getBoundingClientRect().height, 
 		scrollTop = this.$node.scrollTop,
 		visibleBound = scrollTop + height,
 		offTop = body.offsetTop,
 		map = body.getAttribute( 'map' ),
 		elemBound = offTop + body.getBoundingClientRect().height, id,
 		preventAutoScroll = this.getData( 'ltPropPreventAutoScroll' );

 		if( visibleBound < elemBound && !preventAutoScroll ) {
 			this.$node.scrollTop = this.$node.scrollTop + ( elemBound - visibleBound );
 		}

 		id = window.requestAnimationFrame( this.scrollIntoView.bind( this, body ) );
 		Lyte.objectUtils( this.getData( 'rAFMap' ), 'add', map, id );
	},

	dynamic: function( body ) {
		/**
		 * body is definitely defined over here
		 *
		 */

		var final;

		body.style.height = 'auto';
		// Issue in CRM - opening the accordion caused flickering
		body.style.opacity = '0';
		final = body.getBoundingClientRect().height;

		// This requires two rAFs just like initiateClose. Dk why -> https://jsfiddle.net/6dLnwyef/2/
		window.requestAnimationFrame( function() {

			/**
		 	 * Gotta put it inside a rAF else it just joins the previous 0px and the 
		 	 * current final height So the transition looks like auto -> final instead of 0 -> final
		 	 *
		 	 */

		 	body.style.height = '0px';
		 	body.style.opacity = '1';
			window.requestAnimationFrame( function() {
				body.style.height = final + 'px';
			} );

		} )
		

		
	},

	static: function( sibling, configuration ) {

		/**
		 * The sibling is definitely always present
		 *
		 */

		var heightToSet = configuration.height;

		if( this.getData( 'heights' )[ sibling.getAttribute( 'map' ) ].conf 
	 		&& heightToSet 
	 	) {
	 		sibling.style.height = heightToSet;
	 	}
	 	else {
	 		sibling.style.height = this.getData( 'heights' )[ sibling.getAttribute( 'map' ) ].height;
	 	}
	},

	calculate: function( sibling, configuration ) {
		var dynamic = this.getData( 'ltPropDynamic' );
	 	
	 	sibling.parentElement.classList.add( 'lyteAccordionActive' );

		if( dynamic ) {
			this.dynamic( sibling );
		}
		else {
			this.static( sibling, configuration );
		}
	},

	initiateOpen: function( sibling, configuration, event ) {
		var ret;

		this.calculate( sibling, configuration );
	 	sibling._close = false;
	 	sibling.style.overflow = 'hidden';
	 	sibling.parentElement.classList.add( 'lyteAccordionActive' );
	 	ret = _lyteAccordion.findProperParent( event.target );
	 	ret.setAttribute( 'aria-expanded', 'true' );
	 	sibling.setAttribute( 'aria-hidden', 'false' );
	 	
 		this.scrollIntoView( sibling );
		this.execNonRetCalls( [  'onOpen', event, ret.parentElement, this ] );
		this.execNonRetCalls( [ 'onChanged', event, ret.parentElement, this ] );
	 		
	},

	didDestroy: function() {
		var allNodes = this.$node.querySelectorAll( 'lyte-accordion-item' ), i = 0, curValue;

		for( ; i < allNodes.length; i++ ) {
			curValue = allNodes[ i ].getAttribute( 'lyte-shortcut' );
			if( curValue ) {
				allNodes[ i ].setAttribute( 'lyte-shortcut', JSON.stringify( {} ) );
			}
		}
	},

	cancelFrame: function( body, event ) {

		if( event.target !== body ) {
			return ;
		}
		
		var map = body.getAttribute( 'map' ),
		close = body._close,
		dynamic = this.getData( 'ltPropDynamic' );

		window.cancelAnimationFrame( this.getData( 'rAFMap' )[ map ] );
		body.style.overflow = close ? 'hidden' : 'auto';

		if( dynamic && !close ) {
			body.style.height = 'auto';
		}

		window.clearTimeout( body._callbackId );

		body._callbackId = setTimeout( function() {
			if( close ) {
				this.execNonRetCalls( [ 'onAfterClose', this ] );
			}
			else {
				this.execNonRetCalls( [ 'onAfterOpen', this ] );
			}
		}.bind( this ), 100 );
		
	},

	setEvent: function( body ) {
		if( body ) {
			body.addEventListener( 'transitionend', this.cancelFrame.bind( this, body ) );
		}
	},

	calculateHeight: function( body, index ) {
		var isStyle = body.style.height;

		this.getData( 'heights' )[ index ] = {};

		if( !isStyle ) {
			this.getData( 'heights' )[ index ].height = body.getBoundingClientRect().height - parseFloat( window.getComputedStyle( body ).paddingTop ) - parseFloat( window.getComputedStyle( body ).paddingBottom ) + 'px';
			this.getData( 'heights' )[ index ].conf = true;
		}
		else {
			this.getData( 'heights' )[ index ].height = isStyle;
			this.getData( 'heights' )[ index ].conf = false;
		}
	},

	getYieldElement: function() {
		var item = this.$node.querySelector( 'lyte-accordion-item' ),
		res;

		if( item ) {
			res = item.parentElement;
		}

		return res || this.$node.querySelector( 'lyte-yield' );
	},

	readHeights: function() {
		var node = this.getYieldElement(), 
		nodes = node.children, i = 0, body,
		dynamic = this.getData( 'ltPropDynamic' );

		for( ; i < nodes.length; i++ ) {
			if( nodes[ i ].tagName !== 'LYTE-ACCORDION-ITEM' ) {
				continue;
			}

			body = nodes[ i ].querySelector( 'lyte-accordion-body' );
			if( !body ) {
				continue;
			}

			this.setEvent( body );
			// For now it looks like all the accordion-items must be specified at the start
			if( !dynamic ) {
				this.calculateHeight( body, i );
			}

			if( 
				nodes[ i ].classList.contains( 'lyteAccordionActive' ) 
				&& this.getData( 'ltPropExclusive' ) 
			) {
				this.flag = i;
			}
		}
	},

	maintainHeightOrder: function( body, index ) {
		var dynamic = this.getData( 'ltPropDynamic' );

		/* When setting height transitionend was fired in safari but not in other browsers */
		body._close = false;
		body.style.height = dynamic ? 
								'auto' : 
								!this.getData( 'heights' )[ index ].conf ? 
									this.getData( 'heights' )[ index ].height :
									this.getData( 'ltPropHeight' ) ? 
										this.getData( 'ltPropHeight' ) : 
										this.getData( 'heights' )[ index ].height
	},

	writeHeights: function() {
		var node = this.getYieldElement(), nodes = node.children,
		exclusive = this.getData( 'ltPropExclusive' ), i = 0, body, header, ariaValue;

		for( ; i < nodes.length; i++ ) {
			if( nodes[ i ].tagName !== 'LYTE-ACCORDION-ITEM' ) {
				continue;
			}

			body = nodes[ i ].querySelector( 'lyte-accordion-body' );
			if( !body ) {
				continue;
			}
			
			// No point setting this for dynamic but we are letting it go for now
			// because we may want to introduce an attribute to open the accordion from
			// the html
			body.setAttribute( 'map', i );

			if( !nodes[ i ].classList.contains( 'lyteAccordionActive' ) ) {
				/* When setting height transitionend was fired in safari but not in other browsers */
				body._close = true;
				body.style.height = '0px';
			}
			else if( exclusive ) {
				if( this.flag != i ) {
					/* When setting height transitionend was fired in safari but not in other browsers */
					body._close = true;
					nodes[ i ].classList.remove( 'lyteAccordionActive' );
					body.style.height = '0px';
				}
				else {
					// Doing this to achieve this precedence: inline style > ltPropHeight > boundingClientRect
					this.maintainHeightOrder( body, i );
				}
			}
			else {
				this.maintainHeightOrder( body, i );
			}

			header = _lyteAccordion.findHeader( body );

			if( header ) {
				header.setAttribute( 'aria-expanded', !body._close );
			}

			body.setAttribute( 'aria-hidden', !!body._close );
		}

		this.didConnectCalled = true;
	},

	executeAfterRender: function() {
		this.execNonRetCalls( [ 'afterRender', this ] );
	},

	attachScrolls: function( item ) {
		var node = this.getYieldElement(), nodes = item ? [ item ] : node.children,
		i = 0, body;

		for( ; i < nodes.length; i++ ) {
			if( nodes[ i ].tagName !== 'LYTE-ACCORDION-ITEM' ) {
				continue;
			}

			body = nodes[ i ].querySelector( 'lyte-accordion-body' );
			if( !body ) {
				continue;
			}

			body.style.overflow = 'auto';
		}
	},

	getAllHeights: function() {
		this.setData( 'heights', {} );

		// A hack to make sure our attachScrolls happens before readHeights	
		$L.fastdom.measure( this.attachScrolls, this );
		$L.fastdom.measure( this.readHeights, this );
		$L.fastdom.mutate( this.writeHeights, this );
		$L.fastdom.measure( this.executeAfterRender, this );
		
	},

	didConnect: function() {
		this.setData( 'rAFMap', {} );		
		this.getAllHeights()
	},

	nestedClassObserver: function() {
		var accordion = this.$node,
		nested = this.getData( 'ltPropNested' );

		if( nested ) {
			accordion.classList.add( 'lyteAccordionNested' );
		}
		else {
			accordion.classList.remove( 'lyteAccordionNested' );
		}
	}.observes( 'ltPropNested' ).on( 'didConnect' ),

	initializeItem: function( item ) {
		this.flag = undefined;

		if( !this.getData( 'rAFMap' ) ) {
			this.setData( 'rAFMap', {} );
		}

		this.attachScrolls( item );
		this.readItemHeight( item );
		this.writeItemHeight( item );

	},

	readItemHeight: function( item ) {
		var index = this.getItemIndex( item ),
		dynamic = this.getData( 'ltPropDynamic' ),
		body = item.querySelector( 'lyte-accordion-body' );

		if( !body ) {
			return ;
		}

		this.setEvent( body );
		// For now it looks like all the accordion-items must be specified at the start
		if( !dynamic ) {
			this.calculateHeight( body, index );
		}

		// if( 
		// 	item.classList.contains( 'lyteAccordionActive' ) 
		// 	&& this.getData( 'ltPropExclusive' ) && this.isAlreadyOpen()
		// ) {
		// 	this.flag = index;
		// }
	},

	writeItemHeight: function( item ) {
		var body = item.querySelector( 'lyte-accordion-body' ),
		index = this.getItemIndex( item ),
		exclusive = this.getData( 'ltPropExclusive' ),
		openAccordion;

		if( !body ) {
			return ;
		}

		body.setAttribute( 'map', index );

		if( !item.classList.contains( 'lyteAccordionActive' ) ) {
			/* When setting height transitionend was fired in safari but not in other browsers */
			body._close = true;
			body.style.height = '0px';
		}
		// else if( exclusive ) {
		// 	// if( this.flag != index ) {
		// 		/* When setting height transitionend was fired in safari but not in other browsers */
		// 		body._close = true;
		// 		item.classList.remove( 'lyteAccordionActive' );
		// 		body.style.height = '0px';
		// 	// }
		// 	// else {
		// 	// 	// Doing this to achieve this precedence: inline style > ltPropHeight > boundingClientRect
		// 	// 	this.maintainHeightOrder( body, index );
		// 	// }
		// }
		else /* if( !exclusive ) */ {
			if( exclusive ) {
				openAccordion = this.getOpenAccordion();

				if( openAccordion ) {
					openAccordion.close();
				}

				this.maintainHeightOrder( body, index );
			}
			else {
				this.maintainHeightOrder( body, index );
			}
			
		}
	},

	getOpenAccordion: function() {
		var items = this.getYieldElement().children,
		body;

		for( var i = 0; i < items.length; i++ ) {
			body = items[ i ].querySelector( 'lyte-accordion-body' )
			if( body && body._close === false  ) {
				return items[ i ];
			}
		}
	},

	isAlreadyOpen: function() {
		var items = this.getYieldElement().children,
		body;

		for( var i = 0; i < items.length; i++ ) {
			body = items[ i ].querySelector( 'lyte-accordion-body' )
			if( body && body._close === false  ) {
				return true;
			}
		}

		return false;
	},

	getItemIndex: function( item ) {
		var index = 0;

		while( item.previousElementSibling ) {
			item = item.previousElementSibling;

			if( item.tagName === 'LYTE-ACCORDION-ITEM' ) {
				index++;
			}
		}

		return index;
	},

	getConfiguration: function() {
		var config = {};
		
		config.transition = this.getData( 'ltPropDuration' )
		config.height = this.getData( 'ltPropHeight' )
		config.exclusive = this.getData( 'ltPropExclusive' )
		return config;
	}
} );

var _lyteAccordion = {

	_lyteAccordionHeaderID: 0,

	_lyteAccordionBodyID: 0,

	generateHeaderID: function() {
		return 'lyte_accordion_header_' + _lyteAccordion._lyteAccordionHeaderID++;
	},

	generateBodyID: function() {
		return 'lyte_accordion_body_' + _lyteAccordion._lyteAccordionBodyID++;
	},

	findHeader: function( body ) {
		while( body 
			&& body.tagName !== 'LYTE-ACCORDION-HEADER' 
		) {
			body = body.previousElementSibling;
		}

		return body;
	},

	findProperParentS: function( elm ) {
		var properparent, stack = [], found = false, i;

		while( elm.tagName != "LYTE-YIELD" && elm.tagName != 'HTML' ) {
			properparent = elm;
			stack.push( elm );
			elm = elm.parentElement;

			// Clicking on a node and it gets detached by one of the bottom event listeners before it comes here
			if( !elm ) {
				return null;
			}
		}

		for( i = stack.length - 1; i > -1; i-- ) {
			if( stack[ i ].tagName === 'LYTE-ACCORDION-HEADER' 
				|| ( stack.length === 1 && stack[ i ].tagName === 'LYTE-ACCORDION-ITEM' ) 
			) {
				found = true;
				break;
			}
		}

		if( !found ) {
			return null;
		}

		// May need to add a check here
		return properparent.children[ 0 ];

	},

	findProperParent: function( element ) {
		var properparent;

		if( !element ) {
			return ;
		}

		while( element.tagName != "LYTE-YIELD" && element.tagName != 'HTML' ) {
			properparent = element;
			element = element.parentElement;

			// Clicking on a node and it gets detached by one of the bottom event listeners before it comes here
			if( !element ) {
				return {};
			}
		}

		// May need to add a check here
		if( ( properparent.children[ 0 ] || {} ).tagName === 'LYTE-ACCORDION-HEADER' ) {
			return properparent.children[ 0 ];
		}

	}
}

document.addEventListener( 'click', function( event ) {
	var elementClicked = _lyteAccordion.findProperParentS( event.target ), 
	parent, temp, childs, flag, i = 0, sibling, component, configuration, transition,
	openElement, bodyElement, returnval, itsStyle, activeElement;

	if( !elementClicked ) {
		return ;
	}

	parent  = elementClicked;

	while(
		parent.tagName != 'HTML' 
		&& parent.tagName != 'LYTE-ACCORDION'
	) {
		parent = parent.parentElement;

		if( !parent ) {
			return ;
		}
	}

	// This is a safety check because it is generally guaranteed to be a LYTE-ACCORDION Element
	if( parent.tagName == 'HTML' ) {
		return ;
	}

	temp  = parent.querySelector( 'lyte-accordion-item' ).parentElement || parent.querySelector( 'lyte-yield' );
	childs = temp.children;
	flag = true;

	// why is this here??
	for( ; i < childs.length; i++ ) {
		if( childs[ i ].querySelector( 'lyte-accordion-header' ) == elementClicked ) {
			flag = false
			break;
		}
	}

	if( flag ) {
		return ;
	}

	/* sibling - The lyte-accordion-body tag of current clicked accordion item */

	sibling = temp.children[ i ].querySelector( 'lyte-accordion-body' );
	component = temp.closest( 'lyte-accordion' ).component;
	configuration = component.getConfiguration();
	transition = configuration.transition;

	/* When they haven't provided a lyte-accordion-body tag */
	if(
		!sibling 
		|| sibling.tagName != 'LYTE-ACCORDION-BODY'
	) {
		// Close accordion
 		if( 
 			configuration 
 			&& configuration.exclusive 
 			&& ( openElement = component.getOpenAccordion() )
 			&& ( bodyElement = openElement.querySelector( 'lyte-accordion-body' ) )
 		 ) {
 			
 			bodyElement.style.transitionDuration = transition;
 			if( component.getMethods( 'onBeforeClose' ) ) {
 				returnval = component.execAndCheck( 'onBeforeClose', event );
	 			if( returnval ){
	 				component.initiateClose( bodyElement, function( e ) {
	 					this.execNonRetCalls( [ 'onClose', e, _lyteAccordion.findProperParent( e.target ).parentElement, this ] );
	 				}, event );
	 			}
	 			else {
	 				return ;
	 			} 			
	 		}
	 		else {
	 			component.initiateClose( bodyElement, function( e ) {
	 				this.execNonRetCalls( [ 'onClose', e, _lyteAccordion.findProperParent( e.target ).parentElement, this ] );
	 			}, event );		
	 		}
 		}


 		if( temp.children[ i ].classList.contains( 'lyteAccordionActive' ) ) {
 			temp.children[ i ].classList.remove( 'lyteAccordionActive' )
 		}
 		else {
 			temp.children[ i ].classList.add( 'lyteAccordionActive' )
 		}

 		$L.fastdom.measure( function() {
 			component.execNonRetCalls( [ 'onChanged', event, _lyteAccordion.findProperParent( event.target ).parentElement, component ] );
 		} )
 		
		return ;
	}

	itsStyle = window.getComputedStyle( sibling ).height;
 	if( transition ) {
 		sibling.style.transitionDuration = transition;

 		// Added so that it slides the first time as well
 		if( ( openElement = component.getOpenAccordion() )
 			&& ( bodyElement = openElement.querySelector( 'lyte-accordion-body' ) ) ) {
 			 	bodyElement.style.transitionDuration = transition;
 		}
 	}

 	activeElement = component.getOpenAccordion();

 	// Close the already opened accordion-item in exclusive accordion. 
	if( 
		configuration 
		&& configuration.exclusive 
		&& activeElement 
		&& activeElement != sibling.parentElement
	) {	
		if( 
			( bodyElement = activeElement.querySelector( 'lyte-accordion-body' ) )
			&& component.getMethods( 'onBeforeClose' ) 
		) {
			returnval = component.execAndCheck( 'onBeforeClose', event );
	 		if( returnval ) {
	 			component.initiateClose( bodyElement, function( e ) {
	 				this.execNonRetCalls( [ 'onClose', e, _lyteAccordion.findProperParent( e.target ).parentElement, this ] );
	 			}, event );
	 		}
	 		else {
	 			return ;
	 		} 			
		}
	 	else if( ( bodyElement = activeElement.querySelector( 'lyte-accordion-body' ) ) ) {
	 		component.initiateClose( bodyElement, function( e ) {
	 			this.execNonRetCalls( [ 'onClose', e, _lyteAccordion.findProperParent( e.target ).parentElement, this ] );
	 		}, event );
	 	}

	 	// If the element has no bodyelement you still need to remove it.
 		if( activeElement.classList.contains( 'lyteAccordionActive' ) ) {
 			activeElement.classList.remove( 'lyteAccordionActive' )
 		}
		
	}
	
	// itsStyle.height = '0px' -> Meaning it is closed
	if( itsStyle == '0px' ) {
	 	
	 	if( component.getMethods( 'onBeforeOpen' ) ) {
	 		returnval = component.execAndCheck( 'onBeforeOpen', event );

	 		// Get configuration again incase user sets height in onBeforeOpen
	 		configuration = component.getConfiguration();
	 		if( returnval ) {
	 			component.initiateOpen( sibling, configuration, event );
	 		}
	 		else {
	 			return ;
	 		}	 		
	 	}
	 	else {
	 		component.initiateOpen( sibling, configuration, event );
	 	}
	 }

	 // It is opened so close it
	 else {
	 	if( component.getMethods( 'onBeforeClose' ) ) {
	 		returnval = component.execAndCheck( 'onBeforeClose', event );
	 		if( returnval ) {
	 			component.initiateClose( sibling, function( e ) {
	 				var ret =  _lyteAccordion.findProperParent( e.target );
	 				this.execNonRetCalls( [ 'onClose', e, ret.parentElement, this ] );
	 				this.execNonRetCalls( [ 'onChanged', e, ret.parentElement, this ] );
	 			}, event );
	 		}
	 		else{
	 			return;
	 		}
	 	}
	 	else {
	 		component.initiateClose( sibling, function( e ) {
	 			var ret =  _lyteAccordion.findProperParent( e.target );
	 			this.execNonRetCalls( [ 'onClose', e, ret.parentElement, this ] );
	 			this.execNonRetCalls( [ 'onChanged', e, ret.parentElement, this ] );
	 		}, event );
	 	}
	 }
}, true );

document.addEventListener( 'keydown', function( event ) {
	var keyCode = event.keyCode, header = document.activeElement,
	accordion = header, comp;

	if( header.tagName !== 'LYTE-ACCORDION-HEADER' ) {
		return ;
	}

	if( keyCode === 13
		|| keyCode === 32
	) {

		while( accordion
			&& accordion.tagName !== 'LYTE-ACCORDION'
			&& accordion.tagName !== 'HTML' 
		) {
			accordion = accordion.parentElement;
		}

		if( accordion.tagName !== 'LYTE-ACCORDION' ) {
			return ;
		}

		comp = accordion.component;
		event.preventDefault();

		switch( keyCode ) {
			case 13:
			case 32:
				comp.toggleCurrentPanel( header );
				break;
		}
	}
	
} );

/**
 * @customElement lyte-accordion-item
 */
/**
 * @customElement lyte-accordion-header
 */
/**
 * @customElement lyte-accordion-body
 */

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-accordion-item' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-accordion-item' ] = true; 
	
	Lyte.createCustomElement( "lyte-accordion-item", {
		static: {
			"observedAttributes": {
				get: function() {
					return [ 'lyte-shortcut' ]; 
				}
			}
		},

		"connectedCallback": function() {
			var that = this , comp = this;

			if( this._hasConnectedCallbackFired ) {
				return ;
			}

			this._hasConnectedCallbackFired = true;

			while(
				comp.tagName != 'HTML' 
				&& comp.tagName != 'LYTE-ACCORDION'
			) {
				comp = comp.parentElement;

				if( !comp ) {
					return ;
				}
			}

			// This is a safety check because it is generally guaranteed to be a LYTE-ACCORDION Element
			if( comp.tagName == 'HTML' ) {
				return ;
			}

			comp = comp.component;

			this.open = function() {
				if( !that.classList.contains( 'lyteAccordionActive' ) ) {
					that.click();
				}
			}

			this.close = function( immediate ) {

				that._immediate = immediate;

				if( that.classList.contains( 'lyteAccordionActive' ) ) {
					that.click();
				}

				that._immediate = false;
			}

			if( comp.didConnectCalled ) {
				comp.initializeItem( this );
			}
		},

		"attributeChangedCallback": function( attributeName, oldValue, newValue, namespace ) {
			if( typeof shortcut == "function" ){
	         	if( !newValue ) {
	            	return ;
	          	}

	          	newValue = JSON.parse( newValue )
	          	if( !newValue.key ){
	            	return ;
	          	}

	          	var newKey = newValue.key, type = newValue.type, wait = newValue.wait;
	          	if( !oldValue ){
	            	oldValue = {};
	          	}

	          	shortcut.push( {
	            	newKey: newKey,
	            	type: type,
	            	wait: wait,
	            	oldKey: oldValue.key,
	            	value: this
	         	} )
	      	}
		}
	} );
}

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-accordion-header' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-accordion-header' ] = true; 
	
	Lyte.createCustomElement( "lyte-accordion-header", {
		static: {
			"observedAttributes" : {
				get : function() {
					return [ ];
				}
			}
		},

		"connectedCallback": function() {
			var id = this.getAttribute( 'id' );

			this.setAttribute( 'role', 'button' );

			if( !this.hasAttribute( 'tabindex' ) ) {
				this.setAttribute( 'tabindex', '0' );
			}

			if( !id ) {
				this.setAttribute( 'id', _lyteAccordion.generateHeaderID() );
			}
		}
	} );
}

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-accordion-body' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-accordion-body' ] = true; 
	
	Lyte.createCustomElement( "lyte-accordion-body", {
		static: {
			"observedAttributes" : {
				get : function() {
					return [ ];
				}
			}
		},

		"connectedCallback": function() {
			var id = this.getAttribute( 'id' ), 
			head = _lyteAccordion.findHeader( this );

			this.setAttribute( 'role', 'region' );
 
			if( !id ) {
				id = _lyteAccordion.generateBodyID();
				this.setAttribute( 'id', id );
			}

			if( head ) {
				head.setAttribute( 'aria-controls', id );
				this.setAttribute( 'aria-labelledby', head.getAttribute( 'id' ) );
			}
		}
	} );
}

/**
 * @syntax yielded
 * <lyte-accordion>
 *     <template is="registerYield" yield-name="yield">
 *         <lyte-accordion-item>
 *             <lyte-accordion-header>
 *                 HEADER 1
 *             </lyte-accordion-header>
 *             <lyte-accordion-body>
 *                 CONTENT 1
 *             </lyte-accordion-body>
 *         </lyte-accordion-item>
 *         <lyte-accordion-item>
 *             <lyte-accordion-header>
 *                 HEADER 2
 *             </lyte-accordion-header>
 *             <lyte-accordion-body>
 *                 CONTENT 2
 *             </lyte-accordion-body>
 *         </lyte-accordion-item>
 *     </template>
 * </lyte-accordion>
 */

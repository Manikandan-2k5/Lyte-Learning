Lyte.Component.register( "lyte-datemultiselect", {
_template:"<template tag-name=\"lyte-datemultiselect\"> <div class=\"lyteDMSButton\" tabindex=\"0\" __click=\"{{action('openCalendar',event)}}\"> <template is=\"for\" items=\"{{ltPropSelectedDates}}\" item=\"item\" index=\"index\"> <lyte-dms-item data-value=\"{{item}}\"> {{item}} <lyte-dms-remove></lyte-dms-remove> </lyte-dms-item> </template> </div> <template is=\"if\" value=\"{{show}}\"><template case=\"true\"> <lyte-wormhole class=\"lyteDMSContainer lyteDMSWormhole\" on-before-append=\"{{method('setFlags')}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <lyte-calendar lt-prop=\"{{stringify(ltPropCalendar)}}\" lt-prop-current-dates=\"{{lbind(ltPropSelectedDates)}}\" lt-prop-multiple=\"true\" on-before-add=\"{{method('beforeAdd')}}\" on-before-remove=\"{{method('beforeRemove')}}\" on-date-selected=\"{{method('handleAddition')}}\" on-date-removed=\"{{method('handleRemoval')}}\" on-navigate=\"{{method('reposition')}}\"></lyte-calendar> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropSelectedDates","ltPropBoundary","ltPropCalendar","ltPropIsOpen","show"],

	data : function() {
		return {
			'ltPropSelectedDates': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropBoundary': Lyte.attr( 'object', { 'default': {} } ),

			'ltPropCalendar': Lyte.attr( 'object', { 'default': {} } ),

			'ltPropIsOpen': Lyte.attr( 'boolean', { 'default': false } ),

			'show': Lyte.attr( 'boolean', { 'default': false } )
		}		
	},

	getCalendar: function() {
		var child = this.childComp,
		calendar = child.querySelector( 'lyte-calendar' );

		return calendar;
	},

	didDestroy: function() {
		if( this.$node === _lyteDMS.activeDMS ) {
			_lyteDMS.activeDMS = null;
		}

		if( this.$node === _lyteDMS.closedDMS ) {
			_lyteDMS.closedDMS = null;
		}
	},

	didConnect: function() {
		var that = this;

		this.$node.close = function( event ) {
			that.close( event );
		}

		this.$node.open = function( event ) {
			that.open( event );
		}
	},

	close: function( event ) {
		var ret = this.fireBeforeCallback( 'onBeforeHide', event );

		if( ret ) {
			return ;
		}

		this.childComp.classList.add( 'lyteDMSHide' );

		this.setData( 'ltPropIsOpen', false );

		if( this.getMethods( 'onHide' ) ) {
			this.executeMethod( 'onHide', event );
		}

		_lyteDMS.activeDMS = null;
	},

	openWormhole: function() {
		this.setData( 'show', true );
	},

	fireBeforeCallback: function() {
		var callbackName = arguments[ 0 ], ret;

		if( this.getMethods( callbackName ) ) {
			ret = this.executeMethod.apply( this, arguments ) === false;
		}

		return ret;
	},

	showCalendar: function() {
		this.childComp.classList.remove( 'lyteDMSHide' );

		this.position();

		_lyteDMS.activeDMS = this.$node;

		this.getCalendar().revertToToday();
	},

	position: function() {
		$L( this.childComp ).placement( {
			append: false,
			originElement: this.$node
		} );
	},

	remove: function( item, event ) {
		var dataValue = item.getAttribute( 'data-value' ),
		selectedDates = this.getData( 'ltPropSelectedDates' ) || [],
		indexToRemove = selectedDates.indexOf( dataValue ),
		ret = this.fireBeforeCallback( 'onBeforeRemove', event, dataValue );

		if( ret || indexToRemove === -1 ) {
			return ;
		} 

		Lyte.arrayUtils( selectedDates, 'removeAt', indexToRemove );

		this.position();

		if( this.getMethods( 'onRemove', event ) ) {
			this.executeMethod( 'onRemove', event, dataValue );
		}
	},

	exceedsBoundary: function() {
		var boundary = this.getBoundary(),
		button = this.$node,
		buttonBoundingClients = button.getBoundingClientRect();

		if( buttonBoundingClients.left < boundary.left 
			|| buttonBoundingClients.right > boundary.right 
			|| buttonBoundingClients.top < boundary.top 
			|| buttonBoundingClients.bottom > boundary.bottom ) {
			return true;
		}
	},

	getBoundary: function() {
		var bounds = this.getData( 'ltPropBoundary' );

		return {
			left: bounds.left ||  0,
			right: bounds.right || window.innerWidth,
			top: bounds.top || 0,
			bottom: bounds.bottom || window.innerHeight
		};
	},

	open: function( event ) {
		var ret = this.fireBeforeCallback( 'onBeforeOpen', event );

		if( ret ) {
			return ;
		}

		this.openWormhole();
		
		this.showCalendar();
		this.setData( 'ltPropIsOpen', true );

		if( this.getMethods( 'onShow' ) ) {
			this.executeMethod( 'show', event );
		}
	},

	actions: {
		openCalendar: function( event ) {
			this.open( event );
		}
	},

	methods: {
		beforeRemove: function( event, date ) {
			var ret = this.fireBeforeCallback( 'onBeforeRemove', event, date );

			if( ret ) {
				return false;
			}
		},

		beforeAdd: function( event, date ) {
			var ret = this.fireBeforeCallback( 'onBeforeAdd', event, date );

			if( ret ) {
				return false;
			}
		},
		setFlags: function( wormhole ) {
			this.childComp = wormhole;
		},

		handleAddition: function( event, date ) {
			this.position();

			if( this.getMethods( 'onAdd' ) ) {
				this.executeMethod( 'onAdd', event, date );
			}
		},

		handleRemoval: function( event, date ) {
			this.position();

			if( this.getMethods( 'onRemove' ) ) {
				this.executeMethod( 'onRemove', event, date );
			}
		},

		reposition: function() {
			this.position();
		}
	}
} );

var _lyteDMS = {
	closeDMS: function() {
		if( !_lyteDMS.activeDMS ) {
			return ;
		}

		_lyteDMS.activeDMS.close();
	},

	isFocusedOpen: function() {
		var focusedDMS = _lyteDMS.getFocusedDMS();

		if( focusedDMS ) {
			return focusedDMS.ltProp( 'isOpen' );
		}
	},

	getFocusedDMS: function() {
		var activeElement = document.activeElement;

		if( activeElement.classList.contains( 'lyteDMSButton' ) ) {
			activeElement = $L( activeElement ).closest( 'lyte-datemultiselect' ).get( 0 );

			return activeElement;
		}
	},

	openFocused: function( event ) {
		var focusedDMS = _lyteDMS.getFocusedDMS();

		if( focusedDMS ) {
			focusedDMS.open( event );
		}
	}
};

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-dms-remove' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-dms-remove' ] = true;

	/**
 	 * @customElement lyte-dms-remove
 	 */

 	Lyte.createCustomElement( "lyte-dms-remove", {
		static : {
			"observedAttributes": {
				get : function() {
					return [];
				}
			}
		},
		"connectedCallback": function() {
			this.addEventListener( 'click', function( event ) {
				var dms = $L( this ).closest( 'lyte-datemultiselect' ).get( 0 );

				dms.component.remove( this.closest( 'lyte-dms-item' ), event );
			} );
		}
	} ); 
}


document.addEventListener( 'click', function( event ) {
	var target = event.target,
	parent = $L( target ).closest( '.lyteDMSContainer, html, lyte-datemultiselect' );

	if( parent.get( 0 ) && parent.get( 0 ).tagName === 'HTML' ) {
		_lyteDMS.closeDMS();
	}
} );

window.addEventListener( 'scroll', function( event ) {
	var activeDMS = _lyteDMS.activeDMS, comp,
	closedDMS = _lyteDMS.closedDMS;

	if( activeDMS ) {
		comp = activeDMS.component;

		comp.position();

		if( comp.exceedsBoundary() ) {
			activeDMS.close( event );
			_lyteDMS.closedDMS = activeDMS;
		}

		return ;
	}

	if( closedDMS ) {
		comp = closedDMS.component;

		if( !comp.exceedsBoundary() ) {
			closedDMS.open( event );
			_lyteDMS.closedDMS = null;
		}
	}
}, true );

document.addEventListener( 'keydown', function( event ) {
	var key = event.code,
	spaceKey = 'Space',
	escapeKey = 'Escape',
	tabKey = 'Tab';

	if( key === spaceKey && !_lyteDMS.isFocusedOpen() ) {
		_lyteDMS.openFocused( event );
		event.preventDefault();
	}
	else if( ( key === escapeKey || key === tabKey ) && _lyteDMS.activeDMS ) {
		_lyteDMS.activeDMS.close();
	}
} );

window.addEventListener( 'resize', function() {
	window.clearTimeout( _lyteDMS.debounceId );

	_lyteDMS.debounceId = setTimeout( function() {
		var activeDMS = _lyteDMS.activeDMS, comp;

		if( activeDMS ) {
			comp = activeDMS.component;
			comp.position();
		}
	}, 100 );
} );



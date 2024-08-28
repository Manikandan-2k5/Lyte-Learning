Lyte.Component.register( 'lyte-checkbox-group', {
_template:"<template tag-name=\"lyte-checkbox-group\" role=\"group\"> <div class=\"{{alignmentClass}}\" role=\"list\"> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"> <lyte-checkbox role=\"listitem\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-label=\"{{item[ltPropUserValue]}}\" lt-prop-value=\"{{item[ltPropSystemValue]}}\" lt-prop-fire-on-init=\"{{ltPropFireOnInit}}\" lt-prop-label-class=\"{{ltPropLabelClass}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-checked=\"{{unbound(lyteUiIsInArray(item,ltPropSelected,ltPropSystemValue))}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-disabled=\"{{lyteUiIsInArray(item,ltPropDisabledList,ltPropSystemValue)}}\" on-checked=\"{{method('fireCallback','onChecked',item)}}\" ,=\"\" on-unchecked=\"{{method('fireCallback','onUnchecked',item)}}\" on-before-checked=\"{{method('fireCallback','onBeforeChecked',item)}}\" on-before-unchecked=\"{{method('fireCallback','onBeforeUnchecked',item)}}\" on-changed=\"{{method('fireCallback','onChanged',item)}}\" data-value=\"{{item[ltPropSystemValue]}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" lyte-item=\"{{item}}\"></lyte-yield> </template> </template></template> </lyte-checkbox> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}],
_observedAttributes :["ltPropType","ltPropName","ltPropUserValue","ltPropSystemValue","ltPropFireOnInit","ltPropClass","ltPropOptions","ltPropSelected","ltPropAlignment","ltPropFocus","ltPropDisabledList","ltPropYield"],

	data: function() {
		return {

			/**
			 * @prop {string} ltPropType
			 * @default default
			 * @options default,primary,switch,slider
			 */

			'ltPropType': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'type', 'default' )
			} ),

			/**
			 * @prop {string} ltPropName
			 */

			'ltPropName': Lyte.attr( 'string', { 
				'default': undefined 
			} ),

			/**
			 * @prop {string} ltPropUserValue
			 * @default name
			 */

			'ltPropUserValue': Lyte.attr( 'string', { 
				'default': 'name' 
			} ),

			/**
			 * @prop {string} ltPropSystemValue
			 * @default value
			 */

			'ltPropSystemValue': Lyte.attr( 'string', { 
				'default': 'value' 
			} ),

			/**
			 * @prop {boolean} ltPropFireOnInit
			 * @default false
			 */

			'ltPropFireOnInit': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'fireOnInit', false ) 
			} ),

			/**
			 * @prop {string} ltPropClass
			 */

			'ltPropClass': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'class', '' ) 
			} ),

			/**
			 * @prop {array} ltPropOptions
			 * @default []
			 */

			'ltPropOptions': Lyte.attr( 'array', { 'default': [] } ),

			/**
			 * @prop {array} ltPropSelected
			 * @default []
			 */

			'ltPropSelected': Lyte.attr( 'array', { 
				'default': [] 
			} ),

			/**
			 * @prop {string} ltPropAlignment
			 * @default horizontal
			 * @options horizontal,vertical
			 */

			'ltPropAlignment': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'alignment', 'horizontal' )  
			} ),

			/**
			 * @prop {boolean} ltPropFocus
			 * @default false
			 */

			'ltPropFocus': Lyte.attr( 'boolean', { 
				'default': false 
			} ),

			/**
			 * @prop {array} ltPropDisabledList
			 * @default []
			 */

			'ltPropDisabledList': Lyte.attr( 'array', { 
				'default': [] 
			} ),

			/**
			 * @prop {boolean} ltPropYield
			 * @default false
			 */

			'ltPropYield': Lyte.attr( 'boolean', { 
				'default': false 
			} )
		}
	},

	init: function() {
		var alignment = this.getData( 'ltPropAlignment' );

		this.setData( 'alignmentClass', 'lyteCBoxGroup' + alignment[ 0 ].toUpperCase() + alignment.substring( 1 ) );
	},

	methods: {
		fireCallback: function( callbackName, item ) {

			if(!this.preventMutation) {

				if( callbackName === 'onChecked' ) {
					this.add( item );
				}
				else if( callbackName === 'onUnchecked' ) {
					this.remove( item );
				}
			}

			if( this.getMethods( callbackName ) ) {
				return this.executeMethod.apply( this, this.constructArgs(callbackName, item, arguments ) );
			}
		}
	},

	add: function( item ) {
		this.preventObserver = true;
		Lyte.arrayUtils( this.getData( 'ltPropSelected' ), 'push', item );
		this.preventObserver = false;
	},

	getIndex : function(array, item) {
		var sysValue = this.getData( 'ltPropSystemValue' );
		for(var index=0; index < array.length; index++) {
			if(array[index][sysValue] ===  item[sysValue]) {
				return index;
			}
		}
	},

	remove: function( item ) {
		this.preventObserver = true;

		var sel = this.getData( 'ltPropSelected' ) || [],
		ind = this.getIndex(sel, item);

		if( ind !== -1 ) {
			Lyte.arrayUtils( sel, 'removeAt', ind, 1 );
		}

		this.preventObserver = false;
	},

	selectedObserver: function( changeObj ) {

		if( this.preventObserver ) {
			return ;
		}

		var oldValue = changeObj.oldValue,
		newValue = changeObj.newValue,
		addedValues = this.getAddedValues( oldValue, newValue ),
		removedValues = this.getRemovedValues( oldValue, newValue ),
		that = this;
		
		this.preventMutation = true;

		addedValues.forEach( function( cbox ) {
			that.check( cbox );
		} );

		removedValues.forEach( function( cbox ) {
			that.uncheck( cbox );
		} );

		this.preventMutation = false;

	}.observes( 'ltPropSelected.[]' ),

	getAddedValues: function( oldValue, newValue ) {
		return this.setSubtract( newValue, oldValue );
	},

	getRemovedValues: function( oldValue, newValue ) {
		return this.setSubtract( oldValue, newValue );
	},

	setSubtract: function( arrA, arrB ) {
		var sysValue = this.getData( 'ltPropSystemValue' );

		arrA = arrA || [];
		arrB = arrB || [];

		return arrA.filter( function( obj ) {
			for( var i = 0; i < arrB.length; i++ ) {
				if( obj[ sysValue ] === arrB[ i ][ sysValue ] ) {
					return false;
				}
			}

			return true;
		} );
	},

	constructArgs: function( methodName, item, args ) {
		var arr = [].slice.call( args );

		arr.shift();
		arr.shift();
		arr.unshift( methodName );
		arr.push(item);

		return arr; 
	},

	check: function( item ) {
		this.changeToState( item, true );
	},

	uncheck: function( item ) {
		this.changeToState( item, false );
	},

	changeToState: function( item, newState ) {
		var sysValue = this.getData( 'ltPropSystemValue' ),
		dataValue = item[ sysValue ],
		checkbox = this.$node.querySelector( '[data-value="' + dataValue + '"]' );

		if( checkbox ) {
			checkbox.ltProp( 'checked', newState );
		}
	},

	focusObserver: function() {
		var focus = this.getData( 'ltPropFocus' );

		if( focus ) {
			this.focusCBox();
		}
	}.observes( 'ltPropFocus' ).on( 'didConnect' ),

	focusCBox: function() {
		var cbox;

		this.setData( 'ltPropFocus', false );
		cbox = this.getFirstEnabledCheckbox();

		if( cbox ) {
			cbox.ltProp( 'focus', true );
		}
	},

	getFirstEnabledCheckbox: function() {
		var cboxes = this.$node.querySelectorAll( 'lyte-checkbox' );

		for( var i = 0; i < cboxes.length; i++ ) {
			if( !cboxes[ i ].ltProp( 'disabled' ) ) {
				return cboxes[ i ];
			}
		}
	}
} );
/**
 * Renders a card
 * @component lyte-card
 * @version  3.12.0
 */
Lyte.Component.register( 'lyte-card', {
_template:"<template tag-name=\"lyte-card\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <template is=\"if\" value=\"{{expHandlers(ltPropLoadingYield,'!')}}\"><template case=\"true\"> <div class=\"lyteCardRenderPlaceholder\"> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"loading\"></lyte-yield> </template></template> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <lyte-card-box style=\"{{finalStyle}}\" class=\"{{finalClass}}\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </lyte-card-box> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"finalStyle"}}},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropSize","ltPropBackgroundColor","ltPropAlignment","ltPropBoxShadow","lyteViewPort","ltPropViewPort","ltPropLoadingYield","finalClass","finalStyle"],

	data: function() {
		return {
			
			/**
			 * @componentProperty {small | medium | large} ltPropSize=medium
			 */

			'ltPropSize': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-card', 'size', 'medium' ) } ),

			/**
			 * @componentProperty {colorString} ltPropBackgroundColor
			 */

			'ltPropBackgroundColor': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-card', 'backgroundColor', '' ) } ),

			/**
			 * @componentProperty {horizontal | vertical} ltPropAlignment=vertical
			 */

			'ltPropAlignment': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-card', 'alignment', 'vertical' ) } ),

			/**
			 * @componentProperty {string} ltPropBoxShadow
			 */

			'ltPropBoxShadow': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-card', 'boxShadow', '' ) } ),
			'lyteViewPort' : Lyte.attr( 'boolean', { 'default': false } ),

			/**
			 * @componentProperty {boolean} ltPropViewPort=false
			 */

			'ltPropViewPort': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropLoadingYield' : Lyte.attr( 'boolean',{
				'default' : true
			}),

			'finalClass': Lyte.attr( 'string', { 'default': '' } ),
			'finalStyle': Lyte.attr( 'string', { 'default': '' } )
		};
	},

	init: function() {
		var useViewPortFeature = this.getData( 'ltPropViewPort' );

		if( useViewPortFeature ) {
			this.setData( 'lyteViewPort', true );
		}
	},

	didConnect: function() {
		var isInViewPort = !this.getData( 'lyteViewPort' );

		if( isInViewPort ) {
			this.setup();
		}
	},

	setup: function() {
		this.setYieldClass();
		this.setStyle();
		this.align();
		this.size();
	},
	
	setYieldClass: function() {
		this.$node.querySelector( 'lyte-yield' ).classList.add( 'lyteCardYield' );
	},

	setStyle: function() {
		var boxShadow = this.getData( 'ltPropBoxShadow' ),
		bg = this.getData( 'ltPropBackgroundColor' ), res = '';

		if( boxShadow ) {
			res += 'box-shadow:' + boxShadow + ';';
		}

		if( bg ) {
			res += 'background-color:' + bg + ';';
		}

		this.setData( 'finalStyle', res );
	},

	align: function( old ) {
		var align = this.getData( 'ltPropAlignment' );

		align = align ? align : 'vertical';
		this.setClass( old, align );
	},

	size: function( old ) {
		var size = this.getData( 'ltPropSize' );

		size = size ? size : 'medium';
		this.setClass( old, size );
	},

	setClass: function( oldValue, newValue ) {
		var newCls, oldCls, cur = this.getData( 'finalClass' ), ind;

		newCls = 'lyteCard' + newValue[ 0 ].toUpperCase() + newValue.substring( 1 );
		cur = cur ? cur.split( ' ' ) : [];

		if( oldValue ) {
			oldCls = 'lyteCard' + oldValue[ 0 ].toUpperCase() + oldValue.substring( 1 );
			ind = cur.indexOf( oldCls );

			if( ind !== -1 ) {
				cur.splice( ind, 1 );
			}
			
		}

		cur.push( newCls );
		this.setData( 'finalClass', cur.join( ' ' ) );
	},

	box: function() {
		return this.$node.querySelector( 'lyte-card-box' );
	},

	styleObserver: function() {
		this.setStyle();
	}.observes( 'ltPropBackgroundColor', 'ltPropBoxShadow' ),

	alignmentObserver: function( change ) {
		this.align( change.oldValue );
	}.observes( 'ltPropAlignment' ),

	sizeObserver: function( change ) {
		this.size( change.oldValue );
	}.observes( 'ltPropSize' ),

	viewPortObserver: function() {
		this.setup();
	}.observes( 'lyteViewPort' )
} );

/** 
 *
 * @syntax yielded
 * <lyte-card>
 * 		<template is="registerYield" yield-name="yield">
 *			<lyte-card-header>
 *				Header
 *			</lyte-card-header>
 *			<lyte-card-body>
 *				Body
 *			</lyte-card-body>
 *			<lyte-card-footer>
 *				Footer
 *			</lyte-card-footer>
 *		</template>
 * </lyte-card>
 *
 *
 */

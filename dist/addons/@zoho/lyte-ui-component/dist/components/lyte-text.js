/**
 * This component is used to show tooltip when its content exceeds
 * @component lyte-text
 * @version 2.2.0
 */

Lyte.Component.register("lyte-text", {
_template:"<template tag-name=\"lyte-text\" lt-prop-title=\"\" __mouseenter=\"{{action('mouse')}}\" __mouseover=\"{{action('over',event)}}\"><template is=\"if\" value=\"{{ltPropText}}\"><template case=\"true\"><template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteTextYield\" yield-name=\"lyte-text\" lt-prop-value=\"{{ltPropValue}}\"></lyte-yield> </template><template case=\"false\">{{ltPropValue}}</template></template></template><template case=\"false\"> <span class=\"lyteTextWrapper\" lt-prop-tooltip-class=\"lyteTextTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" __mouseenter=\"{{action('submouse',this)}}\">{{ltPropValue}}</span> <template is=\"if\" value=\"{{suffix}}\"><template case=\"true\"> <span class=\"lyteTextSuffix\">{{unescape(suffix)}}</span> </template></template><template is=\"if\" value=\"{{renderHover}}\"><template case=\"true\"> <lyte-hovercard lt-prop=\"{{ltPropHovercard}}\" lt-prop-origin-elem=\"{{originElem}}\" lt-prop-show=\"{{lbind(show)}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <template is=\"for\" items=\"{{hoverCardArray}}\" item=\"item\" index=\"index\"> <div class=\"lyteTextHovercardList\">{{item}}</div> </template> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template></template></template><template is=\"if\" value=\"{{render}}\"><template case=\"true\"> <div class=\"lyteTextRenderDiv\"> <template is=\"for\" items=\"{{ltPropArray}}\" item=\"item\" index=\"index\"> <div class=\"lyteTextIndividual\"> <span class=\"lyteTextWord\">{{item}}</span> <span class=\"lyteTextComma\">{{unescape(ltPropSeparator)}}</span> </div> </template> </div> <div class=\"lyteTextSuffix\"> <span>{{unescape(ltPropSuffix)}}</span> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]},{"type":"text","position":[3,1,0]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropValue","ltPropShow","ltPropYield","ltPropText","ltPropArray","ltPropSuffix","ltPropHovercard","ltPropSeparator","ltPropWidth","ltPropMinCount","ltPropTooltipConfig","renderHover","lyteUnbound","hoverCardArray","render","show","originElem","suffix"],

	data : function(){
		return {
			/**
			 * @componentProperty {string} ltPropValue=''
			 * @version 2.2.0
			 */
			ltPropValue : Lyte.attr( 'string', { default : '' } ),
			/**
			 * @componentProperty {boolean} ltPropShow=true
			 * @version 2.2.0
			 */
			ltPropShow : Lyte.attr( 'boolean', { default : true } ),
			/**
			 * @componentProperty {boolean} ltPropYield=false
			 * @version 2.2.20
			 */
			ltPropYield : Lyte.attr( 'boolean', { default : false } ),
			/**
			 * @componentProperty {Boolean} ltPropText
			 * @version 3.50.0
			 */
			ltPropText : Lyte.attr( 'boolean', { default : true } ),
			/**
			 * @componentProperty {array} ltPropArray
			 * @version 3.50.0
			 */
			ltPropArray : Lyte.attr( 'array' ),
			/**
			 * @componentProperty {string} ltPropSuffix=""
			 * @version 3.50.0
			 */
			ltPropSuffix : Lyte.attr( 'string', { default : "" } ),
			/**
			 * @componentProperty {string} ltPropHovercard='{}'
			 * @component lyte-hovercard
			 * @version 3.50.0
			 */
			ltPropHovercard : Lyte.attr( 'string', { default : '{}' } ),
			/**
			 * @componentProperty {string} ltPropSeparator=', '
			 * @version 3.50.0
			 */
			ltPropSeparator : Lyte.attr( 'string', { default : ", " } ),
			/**
			 * @componentProperty {number} ltPropWidth=0
			 * @version 3.50.0
			 */
			ltPropWidth : Lyte.attr( 'number', { default : 0 } ),
			/**
			 * @componentProperty {number} ltPropMinCount=0
			 * @version 3.50.2
			 */
			ltPropMinCount : Lyte.attr( 'number', { default : 0 } ),
			/**
			 * @componentProperty {string} ltPropTooltipConfig='{}'
			 * @component lyte-tooltip ltPropTooltipConfig
			 * @version 3.52.0
			 */
			ltPropTooltipConfig : Lyte.attr( "string", { default : '{}' } ),

			renderHover : Lyte.attr( 'boolean', { default : false } ),
			lyteUnbound : Lyte.attr( 'boolean', { default : false } ),
			hoverCardArray : Lyte.attr( 'array', { default : [] } ),
			render : Lyte.attr( 'boolean' ),
			show : Lyte.attr( 'boolean', { default : false } ),
			originElem : Lyte.attr( 'string', { default : "" } ),
			suffix : Lyte.attr( 'string', { default : "" } )
		}		
	},

	init : function(){
		var __data = this.data,
		arr = __data.ltPropArray;

		if( arr ){
			var $node = this.$node,
			hovercard = JSON.parse( __data.ltPropHovercard );

			__data.ltPropText = !arr;

			__data.originElem = hovercard.originElem || ( function(){
				var id = $node.id;
				if( !id ){
					id = $node.id = 'lyteText_' + parseInt( Math.random() * 10000 );
				}
				return "#" + id + ' .lyteTextSuffix>span';
			})();
		}
	},

	didCnt : function(){
		if( this.data.ltPropArray ){
			this.render_array();
		}
	}.observes( 'ltPropSuffix', 'ltPropArray', 'ltPropArray.[]', 'ltPropWidth' ).on( 'didConnect' ),

	render_array : function(){
		var __this = this,
		__data = __this.data,
		array = __data.ltPropArray,
		suffix = __data.ltPropSuffix,
		fastdom = $L.fastdom,
		__length = array.length,
		arr = [],
		separator = __data.ltPropSeparator,
		fns = 'prev_fast';

		__this.setData( 'render', true );
		
		fastdom.clear( __this[ fns ] );

		__this[ fns ] = fastdom.measure( function(){

			delete __this[ fns ];

			var $node = __this.$node,
			elem = $node.getElementsByClassName( 'lyteTextRenderDiv' )[ 0 ];

			if( !elem ){
				return;
			}

			var __child = elem.children,
			ns = 'getBoundingClientRect',
			__width = 'width',
			suffix_width = elem.nextElementSibling.children[ 0 ][ ns ]()[ __width ],
			act_width = __data.ltPropWidth || $node.offsetWidth,
			sum = 0,
			break_point,
			i = 0;

			for( ; i < __length; i++ ){
				var __div = __child[ i ],
				spans = __div.children,
				span_wid = spans[ 0 ][ ns ]()[ __width ],
				comma_wid = spans[ 1 ][ ns ]()[ __width ];

				arr.push({
					width : span_wid,
					comma : comma_wid
				});

				sum += ( span_wid + comma_wid );

				if( sum > act_width ){
					break_point = true;
					act_width -= suffix_width;
					while( sum > act_width ){
						var __last = arr.pop();
						if( __last ){
							sum -= ( __last.width + __last.comma );
							i--;
						} else {
							break;
						}
					}
					break;
				}
			}

			fastdom.mutate( function(){
				var str = '',
				h_arr = [],
				suffixText = "";

				if( break_point ){

					var fn = "remove";
					if( i == -1 ){
						i = __data.ltPropMinCount - 1;
						fn = "add";
					}

					$L( $node )[ fn + 'Class' ]( 'lyteTextNoSpace' );

					for( var k = 0; k < __length; k++ ){
						var __cur = array[ k ];
						if( k <= i ){
							str += ( ( k ? separator : "" ) + __cur );
						} else {
							h_arr.push( __cur );
						}
					}

					if( i + 1 != __length ){
						suffixText = ( suffix.replace( '{0}', ( __length - ++i ) ) );
					}

				} else {
					str = array.join( separator );
				}

				__this.setData({
					ltPropValue : str,
					suffix : suffixText,
					render : false,
					hoverCardArray : h_arr,
					renderHover : break_point && __data.ltPropShow
				});

			});
		});
	},

	reset : function( __node, __value ){
		var $node = __node || this.$node,
		data = this.data;

		if( data.ltPropText || __node ){
			var tooltip = $node.scrollWidth > $node.offsetWidth,
			value_to = "";

			if( tooltip && data.ltPropShow ){
				value_to = __value || data.ltPropValue;
			}
			$node.setAttribute( 'lt-prop-title', value_to );
		} 
	},

	over : function( evt ){

		if( !evt.target.closest( '.lyteTextSuffix' ) ){
			return;
		}

		this.setData( 'show', this.data.ltPropShow );
	},

	actions : {
		mouse : function(){
			this.reset();
		},

		over : function( evt ){
			this.data.ltPropArray && this.over( evt );
		},

		submouse : function( __this ){
			var data = this.data;

			if( $L( this.$node ).hasClass( 'lyteTextNoSpace' ) && data.ltPropMinCount ){
				this.reset( __this, data.ltPropValue );
			}
		}
	}
});

/**
 * @syntax nonYielded
 * <lyte-text lt-prop-value = "some long text having higher width"></lyte-text>
 */

/**
 * @syntax yielded
 * <lyte-text lt-prop-yield = true lt-prop-value = "some long text having higher width">
 * 	 <template is = "registerYield" yield-name = "lyte-text">
 *		your value
 *	 </template>
 * </lyte-text>
 */

 /**
  * @syntax Array of text
  *	<lyte-text lt-prop-array = '[ "Text1", "Text2", "Text3" ]'></lyte-text>
  */
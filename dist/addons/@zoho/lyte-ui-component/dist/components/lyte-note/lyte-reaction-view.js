Lyte.Component.register("lyte-reaction-view", {
_template:"<template tag-name=\"lyte-reaction-view\"> <lyte-modal id=\"lyteNoteReactionModal\" lt-prop-show=\"{{lbind(show)}}\" lt-prop-height=\"70%\" lt-prop-offset=\"{&quot;top&quot; : &quot;center&quot;, &quot;left&quot; : &quot;center&quot;}\" lt-prop-wrapper-class=\"lyteNoteReactionViewModal\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <div class=\"lyteNoteReactionTabHeader\"> <template is=\"for\" items=\"{{emojiArray}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{item.reacted.length}}\"><template case=\"true\"> <span class=\"lyteReactionTab {{if(ifEquals(item.value,selected),'lyteReactionActive','')}}\" __click=\"{{action('reaction',index)}}\"> <span class=\"lyteReactionEmoji {{item.class}}\">{{unescape(item.value)}}</span> <span class=\"lyteReactionCount\">{{item.reacted.length}}</span> </span> </template></template></template> </div> <div class=\"lyteNoteReactionSearchWrapper\"> <input class=\"lyteNoteReactionSearchInput\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\" value=\"{{lbind(inputValue)}}\" __input=\"{{action('searchInTable',this)}}\"> </div> </lyte-modal-header> <lyte-modal-content> <lyte-table class=\"lyteNoteReactionTable\" lt-prop-yield=\"true\" lt-prop-infinite-scroll=\"true\" lt-prop-content=\"{{renderArray}}\" lt-prop-content-length=\"50\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"> <lyte-tr __click=\"{{action('rowclick',this,event,item)}}\"> <lyte-td> <div class=\"lyteReactionAvatar\" data-reaction-value=\"{{item.body.value}}\"> <img src=\"{{item.body.item.avatar}}\"> </div> <div class=\"lyteReactionDetailWrapper\"> <div class=\"lyteReactionDetail\"> <lyte-text class=\"lyteReactionName\" lt-prop-tooltip-class=\"lyteNoteReactionTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-value=\"{{item.body.item.name}}\"></lyte-text> <span class=\"lyteReactionTime\" lt-prop-title=\"{{item.body.createdTime.tooltip}}\" lt-prop-tooltip-class=\"lyteReactionTimeTooltip\">{{item.body.createdTime.display}}</span> </div> <lyte-text class=\"lyteReactionEmail\" lt-prop-tooltip-class=\"lyteNoteReactionTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-value=\"{{item.body.item.email}}\"></lyte-text> </div> </lyte-td> </lyte-tr> </template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> <template is=\"if\" value=\"{{expHandlers(renderArray.length,'==',0)}}\"><template case=\"true\"> <div class=\"lyteReactionNoResult\">{{ltPropText.noResult}}</div> </template></template> </lyte-modal-content> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}},"default":{}}]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"attr","position":[1,1,3,1,1]},{"type":"componentDynamic","position":[1,1,3,1,1]},{"type":"attr","position":[1,1,3,1,3]},{"type":"text","position":[1,1,3,1,3,0]},{"type":"attr","position":[1,1,3,3]},{"type":"componentDynamic","position":[1,1,3,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropComment","ltPropMethod","ltPropCaseSensitive","ltPropTrim","ltPropShow","ltPropTooltipConfig","ltPropText","ltPropPlaceholder","emojiArray","renderArray","show","selected","inputValue"],


	data : function(){
		return {
			ltPropComment : Lyte.attr( 'object' ),
			
			ltPropMethod : Lyte.attr( 'string', { default : "indexOf" }),
			ltPropCaseSensitive : Lyte.attr( 'boolean', { default : true }),
			ltPropTrim : Lyte.attr( 'boolean', { default : true } ),

			ltPropShow : Lyte.attr( 'boolean', { default : false } ),

			ltPropTooltipConfig : Lyte.attr( 'string', { default : '{}' } ),

			ltPropText : Lyte.attr( 'object', { 
				all : _lyteUiUtils.i18n( "all", "note", "All" ),
				noResult : _lyteUiUtils.i18n( "no.results.found", void 0, "No results found" )
			}),

			ltPropPlaceholder : Lyte.attr( 'string', { default : _lyteUiUtils.i18n( "placeholder", "note", "Search by name or email address" ) } ),

			// system data

			emojiArray : Lyte.attr( 'array', { default : [] } ),
			renderArray  : Lyte.attr( 'array', { default : [] } ),
			show : Lyte.attr( 'boolean', { default : false } ),
			selected : Lyte.attr( 'string' ),
			inputValue : Lyte.attr( 'string', { default : '' } )
		}
	},

	obs : function( arg ){
		if( arg.newValue ){
			this.setup();
			this.setData( 'show', true );
		}
	}.observes( 'ltPropShow' ),

	modal_close : function( arg ){
		if( !arg.newValue ){
			this.setData( 'ltPropShow', false );
			this.reset_scroll();
			this.setData( 'ltPropComment', void 0 );
		}
	}.observes( 'show' ),

	setup : function(){
		var _this = this,
		data = _this.data,
		comment = data.ltPropComment,
		emoji = comment.emoji;


		_this.setData( 'emojiArray', this.merge_reactions( emoji ) );
	},

	merge_reactions : function( emoji ){
		var arr = [],
		utils = Lyte.arrayUtils,
		final = [],
		all = this.data.ltPropText.all;

		emoji.forEach( function( item ){
			var formatted = this.format_reactions( item.reacted || [], item.value );

			arr.push({
				reacted : formatted,
				value : item.value,
				class : item.class
			});

			utils( final, 'push', formatted );
		}.bind( this ));

		final = final.sort( function( a, b ){
			return b.timeStamp - a.timeStamp;
		});

		arr.unshift({
			reacted : final,
			value : all
		});

		this.setData( 'selected', all );
		this.setData( 'renderArray', final );

		return arr;
	},

	format_reactions : function( array, value ){	

		var _this = this,
		span = $L( '<span></span>' ).get( 0 );

		return array.map( function( item ){
			var callback = 'onTimeConversion',
			str = {},
			time = item.createdTime;

			if( time && _this.getMethods( callback ) ){
				str = _this.executeMethod( callback, time, 'reaction' );
			}

			span.innerHTML = value;

			return {
				value : span.innerText,
				item : item,
				createdTime : str,
				timeStamp : time ? $L.moment( time ).format( 'x' ) : 0
			}
		});
	},

	reset_scroll : function( modal ){

		modal = modal || $L( 'lyte-modal', this.$node ).get( 0 );

		var element = $L( modal.component.actualModalDiv ).find( 'lyte-table' );

		element.get( 0 ).scrollTop = 0;
		element.resetScrollbar();

		this.setData( 'inputValue', '' );
	},

	actions : {

		rowclick : function( _this, evt, item ){
			this.throwEvent( 'common_action', "onReactionClick", evt, _this, $L( this.$node ).parent().find( '#' + this.data.ltPropComment.id ).get( 0 ), item.body );
		},

		reaction : function( index ){

			var _this = this,
			data = _this.data,
			emoji = data.emojiArray,
			utils = Lyte.objectUtils,
			to_be = emoji[ index ];

			if( data.selected == to_be.value && to_be.reacted.length == data.renderArray.length ){
				return;
			}

			_this.setData( 'selected', to_be.value ); 

			_this.reset_scroll();
			_this.setData( 'renderArray', to_be.reacted );
		},

		searchInTable : function( input ){
			var value = input.value,
			_this = this,
			selected = _this.data.selected;

			clearTimeout( _this._timeout );
			_this._timeout = setTimeout( function(){
				var current = _this.data.emojiArray.filter( function( item ){
					return item.value == selected;
				})[ 0 ], 
				arr = current.reacted,
				final = arr.filter( function( item ){
					return _this.is_contains( item, value );
				});

				_this.reset_scroll();
				_this.setData( 'renderArray', final );

			}, 250 );
		}
	},  

	is_contains : function( item, value ){
		var _this = this,
		data = _this.data,
		_case = function( str ){
			if( !data.ltPropCaseSensitive ){
				return str.toLowerCase();
			}
			return str;
		},
		_trim = function( str ){
			if( data.ltPropTrim ){
				return str.trim();
			}
			return str;
		},
		is_present = function( str ){
			var index = _trim( _case( str ) ).indexOf( _case( value ) );

			switch( data.ltPropMethod ){
				case 'startsWith' : {
					return index == 0;
				}
				break;
				case 'endsWith' : {
					return index + value.length == _trim( str ).length;
				}
				break;
				default : {
					return index != -1;
				}
			} 
		};

		return is_present( item.item.name || '' ) || is_present( item.item.email || '' );
	}

});

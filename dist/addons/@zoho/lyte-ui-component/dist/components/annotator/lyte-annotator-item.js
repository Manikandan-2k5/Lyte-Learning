Lyte.Component.register("lyte-annotator-item", {
_template:"<template tag-name=\"lyte-annotator-item\"> <div class=\"lyteAnnotatorIcon\" lt-prop-title=\"{{ltPropItem.value}}\"> <span class=\"{{itemClass}}\" style=\"{{itemStyle}}\"></span> <template is=\"if\" value=\"{{expHandlers(type,'!=',&quot;outline&quot;)}}\"><template case=\"true\"> <lyte-popover lt-prop=\"{{ltPropPopover}}\" lt-prop-origin-elem=\"{{className}}\" lt-prop-show=\"{{lbind(show)}}\" on-show=\"{{method('show')}}\" on-before-show=\"{{method('beforeShow')}}\" on-before-close=\"{{method('beforeClose')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <template is=\"switch\" value=\"{{type}}\"><template case=\"fill\"></template><template case=\"stroke\"></template><template case=\"color\"> <lyte-popover-content class=\"lyteAnnotatorColorsWrapper\"> <template is=\"for\" items=\"{{ltPropItem.colors}}\" item=\"item\" index=\"index\"> <span class=\"{{lyteAnnotatorColor(item,item.active)}}\" lt-prop-title=\"{{item.name}}\" style=\"{{lyteAnnotatorStyle(item)}}\" __click=\"{{action('applyfill',item)}}\"></span> </template><template is=\"if\" value=\"{{opacity}}\"><template case=\"true\"> <lyte-popover-footer class=\"lyteAnnotatorOpacityWrapper {{opacityDisable}} {{opacity.hide}}\"> <span class=\"lyteAnnotatorTitle\">{{opacity.text}}</span> <div class=\"lyteAnnotatorSliderWrapper\"> <span class=\"lyteAnnotatorOutput\" style=\"{{opacityStyle}}\"></span> <lyte-multislider lt-prop-rerender=\"{{lbind(refresh)}}\" class=\"lyteAnnotatorOpacitySlider\" lt-prop-width=\"100%\" lt-prop-mix=\"0\" lt-prop-max=\"1\" lt-prop-digits=\"1\" lt-prop-yield=\"true\" lt-prop-value=\"{{sliderArr}}\" on-before-select=\"{{method('beforeSelect')}}\" on-select=\"{{method('select')}}\" on-change=\"{{method('change')}}\"></lyte-multislider> </div> </lyte-popover-footer> </template></template> </lyte-popover-content> </template><template case=\"border\"></template><template case=\"dashed\"> <lyte-popover-content class=\"lyteAnnotatorBorder\"> <template is=\"for\" items=\"{{ltPropItem.values}}\" item=\"item\" index=\"index\"> <span class=\"{{lyteAnnotatorOther(item,item.active)}}\" lt-prop-title=\"{{item.name}}\" style=\"{{lyteAnnotatorStyle(item)}}\" __click=\"{{action('applyfill',item)}}\"></span> </template> </lyte-popover-content> </template><template case=\"font\"> <lyte-popover-content class=\"lyteAnnotatorFont\"> <lyte-multislider lt-prop-rerender=\"{{lbind(refresh)}}\" class=\"lyteAnnotatorFontSlider\" lt-prop-width=\"100%\" lt-prop-mix=\"{{fontMin}}\" lt-prop-max=\"{{fontMax}}\" lt-prop-digits=\"0\" lt-prop-yield=\"true\" lt-prop-value=\"{{sliderArr}}\" on-before-select=\"{{method('beforeSelect')}}\" on-select=\"{{method('select')}}\" on-change=\"{{method('change')}}\"></lyte-multislider> </lyte-popover-content> </template></template> </template> </lyte-popover> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","dynamicValue":"itemStyle"}}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"fill":{"dynamicNodes":[],"additional":{"next":"stroke"}},"stroke":{"dynamicNodes":[],"additional":{"next":"color"}},"color":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteAnnotatorStyle","args":["item"]}}}}]},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1],"attr":{"style":{"name":"style","dynamicValue":"opacityStyle"}}},{"type":"attr","position":[1,3,3]},{"type":"componentDynamic","position":[1,3,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"border":{"dynamicNodes":[],"additional":{"next":"dashed"}},"dashed":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteAnnotatorStyle","args":["item"]}}}}]},{"type":"componentDynamic","position":[1]}]},"font":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropItem","className","show","hasSubmenu","opacity","itemClass","itemStyle","showElem","opacityStyle","opacityDisable","refresh","type","active","sliderArr","fontMin","fontMax"],


	init : function(){
		var __data = this.data,
		opacity,
		item = __data.ltPropItem;

		__data.className =  '.' + this.$node.className.split( ' ' )[ 0 ];
		if( opacity = ( __data.opacity = item.opacity ) ){
			this.update_opacity();
			__data.sliderArr[ 0 ].value = opacity.value;
		}

		if( __data.type == "font" ){
			var values = item.values;

			this.setData({
				fontMin : values[ 0 ],
				fontMax : $L( values ).get( -1 )
			});
		}

		this.check_selected( item.selected );
	},

	check_selected : function( selected ){
		var arr,
		__data = this.data,
		ns = "values";

		switch( __data.type ){
			case 'fill' : 
			case 'stroke' : {
				ns = "colors";
			}	
			break;
		}

		arr = __data.ltPropItem[ ns ];

		( arr || [] ).forEach( function( item ){
			var __value = item.value;
			
			if( __value == selected || ( !selected && __value == "none" ) ){
				this.active( item );
			}
		}.bind( this ) );
	},

	obs : function(){
		var __data = this.data,
		selected = __data.ltPropItem.selected,
		op_class = 'lyteAnnotatorOpacityDisabled';

		this.setData( {
			itemClass : 'lyteAnnotatorInnerSpan' + ( __data.hasSubmenu ? ' lyteAnnotatorHasSubMenu' : '' ) + ( selected ? ' lyteAnnotatorSelected' : '' ),
			itemStyle : this.get_style( selected ),
			opacityDisable :  selected ? '' : op_class
		});

		$L( this.$node )[ ( selected ? 'remove' : 'add' ) + 'Class' ]( op_class );

		if( __data.opacity ) {
			this.update_opacity();
		}

		if( __data.type == 'font'&& selected  ){
			Lyte.objectUtils( __data.sliderArr[ 0 ], 'add', 'value', parseFloat( selected ) )
		}

	}.observes( 'ltPropItem.selected' ).on( 'init' ),

	get_style : function( selected ){
		if( selected ){
			switch( this.data.type ){
				case 'fill' : 
				case 'stroke' : 
				case 'color' : {
					return 'background:' + selected;
				}
				break;
				case 'border' : {
					return 'border-top-width:' + selected + 'px';
				}
				case 'dashed' : {
					return 'border-top-width:' + parseFloat( selected.split( ',' )[ 0 ] ) / 2 + 'px';
				}
				break;
			}
		} 
		return "";
	},

	update_opacity : function(){
		var __data = this.data,
		opacity = __data.opacity.value,
		selected = __data.ltPropItem.selected;

		this.setData( 'opacityStyle', ( selected ? 'background:' + selected + ";" : "" ) + ( "opacity:" + opacity + ";" ) );
	},

	opacity_obs : function( arg ){
		var data = this.data.sliderArr[ 0 ],
		__new = arg.newValue;

		if( data != __new ){
			Lyte.objectUtils( data, 'add', 'value', parseFloat( __new ) );
		}

		this.update_opacity();
		this.setData( 'refresh', true );
	}.observes( 'opacity.value' ),

	data : function(){
		var boolean = 'boolean',
		object = 'object',
		string = 'string',
		boolean = 'boolean',
		array = 'array',
		number = 'number';

		return {
			ltPropItem : Lyte.attr( object ),
			className : Lyte.attr( string ),
			show : Lyte.attr( boolean ),
			hasSubmenu : Lyte.attr( boolean, true ),
			opacity : Lyte.attr( object ),
			itemClass : Lyte.attr( string ),
			itemStyle : Lyte.attr( string ),
			showElem : Lyte.attr( string ),
			opacityStyle : Lyte.attr( string ),
			opacityDisable : Lyte.attr( string ),

			refresh : Lyte.attr( boolean, false ),

			type : Lyte.attr( string ),

			active : Lyte.attr( object ),

			sliderArr : Lyte.attr( array, { default : [{
				value : 0
			}] } ),

			fontMin : Lyte.attr( number ),
			fontMax : Lyte.attr( number )
		}		
	},

	toggle : function( ns ){
		$L( this.$node ).parent()[ ns + 'Class' ]( 'lyteAnnotatorPopOpened' );
	},

	active : function( item ){
		var prev = this.data.active,
		Lo = Lyte.objectUtils;

		if( prev ){
			Lo( prev, 'add', 'active', '' );
		}

		Lo( item, 'add', 'active', 'lyteEditorAnnotatorActive' );

		this.setData( 'active', item );
	},

	actions : {
		applyfill : function( item ){
			this.executeMethod( 'onApply', item );
			this.active( item );
			return false;
		}
	},
	methods : {

		beforeSelect : function(){
			var __data = this.data,
			newValue;

			if( __data.type == "font" ){
				newValue = __data.ltPropItem.selected;
				this.throwEvent( 'fontSelect' );
			} else {
				newValue = __data.opacity.value;
			}

			this.__value = newValue;
		},

		select : function( hand, value ){
			var prev = this.__value,
			cur = value.value,
			__data = this.data,
			item = __data.ltPropItem,
			is_text = __data.type == "font";

			if( prev == void 0 ){
				if( is_text ){
					prev = item.selected;
					this.throwEvent( 'fontSelect' );
				} else {
					prev = __data.opacity.value;
				}
			}

			if( is_text ){
				cur += ( item.suffix || "px" );
			}

			if( prev == cur ){
				return;
			}

			this.throwEvent( 'opacityUpdate', __data.type, prev, cur );
			delete this.__value;
		},

		change : function( hand, value ){
			var data = this.data,
			prev = data.opacity,
			cur = value.value,
			__type = data.type,
			is_text = __type == "font",
			ns = "opacity";

			if( prev == cur ){
				return;
			}

			if( is_text ){
				ns = 'font';
			} else {
				Lyte.objectUtils( data.opacity, 'add', 'value', cur );
			}

			this.throwEvent( ns + 'Change', __type, cur );
		},

		beforeShow : function(){
			this.toggle('add' );
		},

		beforeClose : function(){
			this.toggle('remove' );
		},

		show : function(){
			window.requestAnimationFrame( function(){
				this.setData( 'refresh', true );
			}.bind( this ) );
		}
	}
});

Lyte.Component.registerHelper( 'lyteAnnotatorColor', function( item, is_active ){
	return 'lyteAnnotatorColorContainer ' + ( is_active ? is_active + ' ' : '' ) + 'lyteAnnotator_' + item.name.replace( /\s/g, '_' ).toLowerCase();
});

Lyte.Component.registerHelper( 'lyteAnnotatorOther', function( item, is_active ){
	return 'lyteAnnotator' + this.component.data.type + 'Container ' + ( is_active ? is_active + ' ' : '' ) + 'lyteAnnotator_' + ( item.name || '' ).replace( /\s/g, '_' ).toLowerCase();
});

Lyte.Component.registerHelper( 'lyteAnnotatorStyle', function( item ){
	return this.component.get_style( item.value );
});

/**
 * This is used to indicate the current position in a page
 * @component lyte-breadcrumb
 * @version 1.0.0
 * @methods onClick
 * @utility modifyCrumbItems
 */


Lyte.Component.register('lyte-breadcrumb',{
_template:"<template tag-name=\"lyte-breadcrumb\"> <div __click=\"{{action('divClick',event,this)}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <lyte-breadcrumb-structure class=\"{{ltPropClass}}\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"array\" index=\"indexVal\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(array),'==',false)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteBreadcrumbBullet')}}\"><template case=\"true\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" __click=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> <lyte-breadcrumb-head>{{indexVal}}</lyte-breadcrumb-head> </lyte-breadcrumb-item> </template><template case=\"false\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" __click=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> </lyte-breadcrumb-item> </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteBreadcrumbBullet')}}\"><template case=\"true\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" __click=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> <lyte-breadcrumb-head>{{array[ltPropOption]}}</lyte-breadcrumb-head> </lyte-breadcrumb-item> </template><template case=\"false\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" __click=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> </lyte-breadcrumb-item> </template></template></template></template></template> </lyte-breadcrumb-structure> </template><template case=\"false\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropClass","ltPropData","ltPropActiveClass","ltPropCompletedClass","ltPropYield","ltPropLabel","ltPropOption","ltPropAria","ltPropAriaValue"],

	init : function(){
	   /**
        * @method beforeRender
        * @version 1.0.1
        */
		this.getMethods('beforeRender') && this.executeMethod('beforeRender', this.$node);
	},	

	didDestroy : function(){
		clearTimeout( this._timeout );
		delete this.$node.modifyCrumbItems;
	},

	didConnect : function(){
		this.ArrayContentChange();
		this.$node.modifyCrumbItems = function( property, arg1, arg2 ){
			if( !this.data.ltPropYield ){
				Lyte.arrayUtils( this.data.ltPropData, property, arg1, arg2 );
			} else {
				this.ArrayContentChange();
			}
		}.bind( this );

		this.breadcrumbClass();

		$L.fastdom.measure( function(){
			var is_rtl = _lyteUiUtils.getRTL();
			$L.fastdom.mutate( function(){
				if( is_rtl ){
					$L( this.$node ).addClass( 'lyteRTL' );
				}
			}.bind( this ));
		}.bind( this ));

		var cb = "afterRender";
		/**
        * @method afterRender
        * @version 1.0.1
        */
       if( this.getMethods( cb ) ){
       		this.executeMethod( cb, this.$node );
       }
	},

	ArrayContentChangeObs : function(){
		clearTimeout( this._timeout );
		this._timeout = setTimeout( this.ArrayContentChange.bind( this ), 0 );
	}.observes( 'ltPropData.[]', 'ltPropData' ),

	ArrayContentChange : function(){
		var data = this.data,
		active = data.ltPropActiveClass,
		completed = data.ltPropCompletedClass,
		aria = data.ltPropAria,
		innerElements = $L( 'lyte-breadcrumb-item', this.$node ),
		__length = innerElements.length - 1,
		last = innerElements.eq( -1 );

		for( var i = 0; i < __length; i++ ){
			var cur = innerElements.eq( i );
			cur.addClass( completed ).removeClass( active );
			if( aria ){
				cur.find( 'a' ).removeAttr( 'aria-current' );
			}
		}

		last.removeClass( completed ).addClass( active );
		if( aria ){
			last.find( 'a' ).attr( 'aria-current', data.ltPropAriaValue );
		}
	},

	aria_obs : function(){
		 $L( 'lyte-breadcrumb-item', this.$node ).eq( -1 ).find( "a" ).attr( "aria-current", this.data.ltPropAriaValue );
	}.observes( 'ltPropAriaValue' ),

	breadcrumbClassObs : function(){
		this.breadcrumbClass();
	}.observes('ltPropClass'),

	breadcrumbClass : function(){
		if( this.data.ltPropYield ) {
			$L( 'lyte-breadcrumb-structure', this.$node ).addClass( this.data.ltPropClass );
		}
	},
	data : function(){
        return {
			//  user data
		   /**
			* @componentProperty {string} ltPropClass=lyteBreadcrumbSlash
			* @version 1.0.0
			*/
			ltPropClass : Lyte.attr("string",{"default":'lyteBreadcrumbSlash'}),
		   /**
			* @componentProperty {string[] | object[]} ltPropData
			* @version 1.0.0
			* @default []
			*/
			ltPropData : Lyte.attr("array",{"default":[]}),
		   /**
			* @componentProperty {string} ltPropActiveClass=lyteActive
			* @version 1.0.0
			*/
			ltPropActiveClass : Lyte.attr("string",{"default":'lyteActive'}),
		   /**
			* @componentProperty {string} ltPropCompletedClass=lyteCompleted
			* @version 1.0.0
			*/
			ltPropCompletedClass : Lyte.attr("string",{"default":'lyteCompleted'}),
		   /**
			* @componentProperty {boolean} ltPropYield=false
			* @version 1.0.0
			*/
			ltPropYield : Lyte.attr("boolean",{"default":false}),
		   /**
			* @componentProperty {string} ltPropLabel=''
			* @version 1.0.0
			*/
			ltPropLabel : Lyte.attr('string', {'default': ''}),
		   /**
			* @componentProperty {string} ltPropOption=''
			* @version 1.0.0
			*/			
            ltPropOption : Lyte.attr('string', {'default': ''}),

            // aria
		   /**
			* @componentProperty {boolean} ltPropAria=false
			* @version 3.1.0
			*/
            ltPropAria : Lyte.attr( 'boolean', { default : false } ),
           /**
			* @componentProperty {string} ltPropAriaValue=page
			* @version 3.1.0
			*/
            ltPropAriaValue : Lyte.attr( 'string', { default : "page" } )
		}
	},
	actions : {
	   'onclick' : function ( event, Component, data ){
		   	var target = event.target,
		   	cb = 'onClick';

			if( ( event.ctrlKey == true || event.metaKey == true || event.which == 2 ) && event.target.href != undefined && target.href.indexOf( 'javascript:' ) != -1 && target.target == '_blank' ){
				return false;
			}

			if( this.getMethods( cb ) ){
				this.executeMethod( cb, Component, this.$node, event, data );
				event.stopPropagation();	
			}
		},
        divClick : function( event, div ){
        	var target = event.target,
        	cb = "onClick";

			if( ( event.ctrlKey == true || event.metaKey == true || event.which == 2 ) && target.href != undefined && target.href.indexOf( 'javascript:' ) != -1 && target.target == '_blank' ){
				return false;
			}
            if( this.getMethods( cb ) && this.data.ltPropYield ) {

            	var node = $L( target.correspondingElement || target ).closest( 'lyte-breadcrumb-item', div );

            	if( node.length ){
            		this.executeMethod( cb, node.get( 0 ), this.$node, event, node.attr( 'data-value' ) );
            	}
            }
        }
	}
});

/**
 * @syntax Yielded
 *  <lyte-breadcrumb lt-prop-yield="true">
 *		<template is="registerYield" yield-name="yield">
 *			<lyte-breadcrumb-structure>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Home 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Menu 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Edit 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Save 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *			</lyte-breadcrumb-structure>
 *		</template>
 *	</lyte-breadcrumb>
 */

/**
 * @syntax Non Yielded
 * <lyte-breadcrumb lt-prop-data='["home","works",{"name": "Leads"},{"name": "Contacts"},{"name": "Services"}]' lt-prop-label="name">
 * </lyte-breadcrumb>
 */
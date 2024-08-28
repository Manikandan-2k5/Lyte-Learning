/**
 * This component is used to select a date or a range of date from the given options
 * @component lyte-dateselect
 * @version 1.0.5
 * @dependency lyte-dropdown
 *  components/lyte-dropdown.js
 *  theme/compiledCSS/default/ltr/lyte-ui-dropdown.css
 * @dependency lyte-calendar
 *  components/lyte-calendar.js
 *  theme/compiledCSS/default/ltr/lyte-ui-calendar.css
 * 	plugins/lyte-moment.js
 * @dependency lyte-daterangepicker
 *  components/lyte-daterangepicker.js
 *  theme/compiledCSS/default/ltr/lyte-ui-daterangepicker.css
 * @methods beforeRender,afterRender,onBeforeShow,onShow,onBeforeHide,onHide,onSelect
 * @import lyte-dropdown
 * @ignoreMethods
 * @ignoreProperties
 * @ignoreUtilities
 */

Lyte.Component.register("lyte-dateselect", {
_template:"<template tag-name=\"lyte-dateselect\"> <lyte-dropdown lt-prop=\"{{stringify(ltPropDropdown)}}\" on-before-show=\"{{method('bfSw')}}\" on-show=\"{{method('sw')}}\" on-before-hide=\"{{method('bfHde')}}\" on-hide=\"{{method('hde')}}\" on-option-selected=\"{{method('optSel')}}\" lt-prop-selected=\"{{lbind(ltPropSelected)}}\" on-position-changed=\"{{method('posChange')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button id=\"{{randomId}}\"> <template is=\"if\" value=\"{{ltPropButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"buttonYield\" lt-prop-display-value=\"{{ltPropDisplayValue}}\" lt-prop-selected=\"{{ltPropSelected}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(ltPropSelected,'&amp;&amp;',ltPropDisplayValue)}}\"><template case=\"true\"> {{ltPropDisplayValue}} </template><template case=\"false\"> <span class=\"lyteDropPlaceholderMultiple\">{{ltPropDropdown.placeholder}}</span> </template></template> <lyte-icon class=\"dropdown\"></lyte-icon> </template></template> </lyte-drop-button> <lyte-drop-box class=\"{{ltPropDropdownWrapperClass}}\" id=\"lyteDateSelect\"> <lyte-drop-body class=\"lyteList\"> <template is=\"forIn\" object=\"{{ltPropOptions}}\" value=\"value\" key=\"key\"> <lyte-drop-item data-value=\"{{key}}\" class=\"{{key}}\" aria-controls=\"{{randomId}}_{{key}}\"> <template is=\"if\" value=\"{{ltPropItemYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"item\" item-value=\"{{ltPropOptions[key]}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(value,'==',true)}}\"><template case=\"true\"> {{lyteUiI18n(key)}} </template><template case=\"false\"> {{value}} </template></template></template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(key,'==','specificDate'),'||',expHandlers(key,'==','customRange'))}}\"><template case=\"true\"> <span class=\"{{if(ifEquals(pos,'left'),'dateArrow arrowLeft','dateArrow arrowRight')}}\"></span> </template></template> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <div class=\"dateSelectcal lyteDropdownHidden {{ltPropCalendarWrapperClass}}\" aria-modal=\"true\"> <template is=\"if\" value=\"{{opend}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropOptions.specificDate}}\"><template case=\"true\"> <div class=\"specificDate lyteDropdownHidden\" id=\"{{randomId}}_specificDate\"> <lyte-calendar lt-prop=\"{{stringify(ltPropCalendar)}}\" lt-prop-current-date=\"{{lbind(ltPropCurrentDate)}}\" on-date-selected=\"{{method('dateselected1')}}\" on-navigate=\"{{method('rangenavigate','onNavigate')}}\" lt-prop-activate-navigation=\"{{lbind(calNavigation)}}\"> <template is=\"if\" value=\"{{ltPropCalendarYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"footer\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> </template></template> </lyte-calendar> <template is=\"if\" value=\"{{ltPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"dateselect-footer\" selected=\"{{ltPropSelected}}\" current-date=\"{{ltPropCurrentDate}}\"></lyte-yield> </template></template> </div> </template></template> <template is=\"if\" value=\"{{ltPropOptions.customRange}}\"><template case=\"true\"> <div class=\"customRange lyteDropdownHidden\" id=\"{{randomId}}_customRange\"> <lyte-daterangepicker lt-prop=\"{{stringify(ltPropDateRangePicker)}}\" lt-prop-start-date=\"{{lbind(ltPropStartDate)}}\" lt-prop-end-date=\"{{lbind(ltPropEndDate)}}\" short-month-names=\"{{shortMonthNames}}\" long-month-names=\"{{longMonthNames}}\" cal-view-date1=\"{{lbind(ltPropStartDateObject)}}\" cal-view-date2=\"{{lbind(ltPropEndDateObject)}}\" on-date-selected=\"{{method('dateselected')}}\" on-navigation=\"{{method('rangenavigate','onNavigation')}}\" on-start-date-changed=\"{{method('startChange')}}\" date-selected=\"{{lbind(dateSelected)}}\" lt-prop-activate-navigation=\"{{lbind(rangeNavigation)}}\" lt-prop-navigation=\"true\" prevent-keydown=\"{{preventKeydown}}\"> </lyte-daterangepicker> <template is=\"if\" value=\"{{ltPropFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"dateselect-footer\" selected=\"{{ltPropSelected}}\" start-date=\"{{ltPropStartDate}}\" end-date=\"{{ltPropEndDate}}\"></lyte-yield> </template></template> </div> </template></template></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"forIn","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["shortMonthNames","longMonthNames","ltPropStartDateObject","ltPropEndDateObject","ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropCalendarYield","ltPropCalendar","ltPropDateRangePicker","ltPropItemYield","ltPropSelected","ltPropOptions","ltPropDropdownWrapperClass","ltPropDropdown","ltPropDisplayValue","ltPropButtonYield","ltPropCalendarWrapperClass","ltPropFooterYield","ltPropI18n","ltPropAnimation","ltPropNavigation","pos","prevSel","opend","randomId","dateSelected","calNavigation","rangeNavigation","preventKeydown"],

	init : function(){
		this.getMethods( 'beforeRender' ) && this.executeMethod( 'beforeRender', this.$node )
		this.$node.toggle = function(){
			this._drop.toggle();
		}.bind( this );
	},
	data : function(){
		return {
			// data for date range picker and calendar
		   /**
			* @experimental shortMonthNames
			*/
			shortMonthNames : Lyte.attr( "array" , { "default" : [ 'Jan', 'Feb', 'Mar', 'Apr', 'short.may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]}),
		   /**
			* @experimental longMonthNames
			*/
			longMonthNames : Lyte.attr( 'array', { 
				'default': [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December' 
				]
			} ),
		   /**
			* @componentProperty {object} ltPropStartDateObject
			* @version 1.0.5
			*/			
			ltPropStartDateObject : Lyte.attr( "object" ),
		   /**
			* @componentProperty {object} ltPropEndDateObject
			* @version 1.0.5
			*/
			ltPropEndDateObject : Lyte.attr("object"),
		   /**
			* @componentProperty {dateString} ltPropStartDate=''
			* @version 1.0.5
			*/
			ltPropStartDate : Lyte.attr( "string", { "default" : "" } ),
		   /**
			* @componentProperty {dateString} ltPropEndDate=''
			* @version 1.0.5
			*/
			ltPropEndDate : Lyte.attr( "string", { "default" : "" } ),
		   /**
			* @componentProperty {dateString} ltPropCurrentDate=''
			* @version 1.0.5
			*/
			ltPropCurrentDate : Lyte.attr( "string", { "default" : "" } ),
		   /**
			* @componentProperty {boolean} ltPropCalendarYield=false
			* @version 1.0.5
			*/
			ltPropCalendarYield : Lyte.attr( 'boolean', { default : false } ),
		   /**
			* @componentProperty {object} ltPropCalendar={"headerType":"dropdown","fillRows":false}
			* @version 1.0.5
			* @component lyte-calendar
			*/
			ltPropCalendar : Lyte.attr( 'object', { default : { headerType : "dropdown", fillRows : false } } ),
		   /**
			* @componentProperty {object} ltPropDateRangePicker={"monthHeaderFormat":"MMMM YYYY"}
			* @version 1.0.5
			* @component lyte-daterangepicker
			*/
			ltPropDateRangePicker : Lyte.attr( 'object', { default : { monthHeaderFormat : "MMMM YYYY" } } ),
		   /**
			* @componentProperty {boolean} ltPropItemYield=false
			* @version 1.0.5
			*/
			ltPropItemYield : Lyte.attr( 'boolean', { default : false } ),

			// dateselect props
		   /**
			* @componentProperty {string} ltPropSelected=today
			* @version 1.0.5
			*/
			ltPropSelected : Lyte.attr('string', { default : 'today'}),
		   /**
		    * @typedef {object} dateSelectOptions
		    * @property {boolean} today=true
		    * @property {boolean} yesterday=true
		    * @property {boolean} last7days=true
		    * @property {boolean} last30days=true
		    * @property {boolean} thisWeek=true
		    * @property {boolean} thisMonth=true
		    * @property {boolean} specificDate=true
		    * @property {boolean} customRange=true
		    */
		   /**
			* @componentProperty {dateSelectOptions} ltPropOptions
			* @version 1.0.5
			*/
			ltPropOptions : Lyte.attr( 'object', { default : {
				today :  true,
				yesterday : true,
				last7days : true,
				last30days : true,
				thisWeek : true,
				thisMonth : true,
				specificDate : true,
				customRange : true
			}}),
		   /**
			* @componentProperty {string} ltPropDropdownWrapperClass=''
			* @version 1.0.5
			*/
			ltPropDropdownWrapperClass : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @componentProperty {object} ltPropDropdown
			* @version 1.0.5
			* @default {}
			* @component lyte-dropdown
			*/
			ltPropDropdown : Lyte.attr( 'object', { default : {} } ),
		   /**
			* @componentProperty {string} ltPropDisplayValue=''
			* @version 1.0.5
			*/
			ltPropDisplayValue : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @componentProperty {boolean} ltPropButtonYield=false
			* @version 1.0.5
			*/
			ltPropButtonYield : Lyte.attr( 'boolean', { default : false } ),
		   /**
			* @componentProperty {string} ltPropCalendarWrapperClass=''
			* @version 1.0.5
			*/
			ltPropCalendarWrapperClass : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @componentProperty {boolean} ltPropFooterYield=false
			* @version 3.10.0
			*/			
			ltPropFooterYield : Lyte.attr( 'boolean', { default : false } ),
		   /**
			* @componentProperty {boolean} ltPropI18n=false
			* @version 3.10.0
			*/
			ltPropI18n : Lyte.attr( 'boolean', { default : false } ),
		   /**
		    * @typedef animeDef
		    * @property {Fade|Scale|Slide} dropdown=Fade
		    * @property {Fade|Scale|Slide} calendar=Fade
		    */

		   /**
			* @componentProperty {animeDef} ltPropAnimation
			* @version 3.14.0
			*/
			ltPropAnimation : Lyte.attr( 'object', { default : {
				dropdown : "Fade", // Scale, Slide
				calendar : "Fade"
			} } ),
		   /**
			* @componentProperty {boolean} ltPropNavigation=false
			* @version 3.50.0
			*/
			ltPropNavigation : Lyte.attr( 'boolean', { default : false } ),

			// system data

		   /**
			* @experimental pos
			*/
			pos : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @experimental prevSel
			*/
			prevSel : Lyte.attr( 'string', { default : '' } ),
		   /**
			* @experimental opend
			*/
			opend : Lyte.attr( 'boolean',  { default : false } ),

			randomId : Lyte.attr( 'string', { default : "lyteDateSelect_" + parseInt( Math.random() * 1e6 ) } ),

			dateSelected : Lyte.attr( 'boolean', { default : false } ),

			calNavigation : Lyte.attr( 'boolean', { default : false } ),
			rangeNavigation : Lyte.attr( 'boolean', { default : false } ),
			preventKeydown : Lyte.attr( 'boolean' )

		}		
	},

	selectValue : function( dat ){
		// if( !this.data.ltPropButtonYield ){
			// var val = this.data.ltPropOptions[ dat ];
			// var oriDisp = val.constructor == Boolean ? _lyteUiUtils.i18n( dat ) : val;
			this.setData( 'ltPropDisplayValue', this.getVal( dat ) )
		// }
	},

	didConnect : function(){
		this._drop = this.$node.querySelector( 'lyte-dropdown' );
		this._drop.parent = this.$node;
		
		var com = this._drop.component,
		data = this.data;

		this._cmp = com.childComp ? com.childComp : this._drop.querySelector( 'lyte-drop-box' )
		this._end = this.tranEnd.bind( this );
		this._indend = this.tranEnd1.bind( this );

		this._opentrans = this.opentrans.bind( this );

		this._caldiv = this.$node.querySelector( '.dateSelectcal' ) 
		_lyteUiUtils.appendChild( document.body, this._caldiv )
		// if( !data.ltPropButtonYield ){
			this.setData( 'ltPropDisplayValue', this.getVal( data.ltPropSelected ) )
		// }
		if( !document._dateselectResize ){
			document._dateselectResize = true;

			[ 'resize', 'scroll', 'orientationchange' ].forEach( function( item ){
				window.addEventListener( item, dtslctscroll );
			});
		}
		this.$node.toggle = function( ev, tp ){
			this._drop.toggle( ev, tp )
		}.bind( this );

		this._drop.updateButtonAria( 'aria-labelledby', data.randomId );

		this.getMethods( 'afterRender' ) && this.executeMethod( 'afterRender', this.$node );

		$L.fastdom.measure( function(){
			this._dir = _lyteUiUtils.getRTL();
			if( this._dir ) {
				$L.fastdom.mutate( function(){
						this._caldiv.classList.add( 'lyteRTL' )
				}.bind( this ) )
			}
		}.bind( this ) )
	},

	didDestroy : function(){
		document.body.removeChild( this._caldiv );
		if( document._dateselectResize && document.querySelectorAll( 'lyte-dateselect' ).length == 0 ){
			delete document._dateselectResize;
			[ 'resize', 'scroll', 'orientationchange' ].forEach( function( item ){
				window.removeEventListener( item, dtslctscroll );
			});
		}
		delete this._caldiv; delete this._cmp; delete this._drop; delete this.$node.toggle;
	},

	getVal : function( sel ){
		if( !sel ){
			return "";
		}
		var val = this.data.ltPropOptions[ sel ], oridisp = val.constructor == Boolean ? _lyteUiUtils.i18n( sel ) :  val ;
 		if( [ 'specificDate', 'customRange' ].indexOf( sel ) == -1 ){
			return oridisp;
		} else if( sel == 'specificDate' ){
			return this.i18_date( this.data.ltPropCurrentDate, this.data.ltPropCalendar.format || "MM/DD/YYYY" ) || oridisp;
		} else if( sel == 'customRange' ) {
			var format = this.data.ltPropDateRangePicker.format || "MM/DD/YYYY",
			s = this.i18_date( this.data.ltPropStartDate, format ), e = this.i18_date( this.data.ltPropEndDate, format );
			return ( s && e ) ? ( s + ' - ' + e ): oridisp;
		} 
		// return _lyteUiUtils.i18n( s );
	},

	resolveConflicts: function( format ) {
		var match = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/.exec( format ),
		index = ( match || {} ).index,
		matchLength = ( match || [] )[ 0 ].length || 0;

		if( !isNaN( index ) ) {
			return format.substring( 0, index + matchLength ) + ( format.substring( index + matchLength ) || '' ).toUpperCase();
		}

		return format.toUpperCase();
	},

	isConflictingFormat: function( format ) {
		var rdate = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/ig,
		match = format.match( rdate ) || [];

		return match.length > 1;
	},

	getRelevantFormat: function( format ) {

		if( this.isConflictingFormat( format ) ) {
			return this.resolveConflicts( format );
		}

		return format.toUpperCase();
	},

	i18_date : function( date, format ){

		format = this.getRelevantFormat( format );

		if( date && $L.moment && this.data.ltPropI18n ){
			var cb = function( value, converted, format ){
				if( this.getMethods( 'onI18n' ) ){
					/**
					  * @methods onI18n
					  * @version 3.10.0
					  */
					return this.executeMethod( 'onI18n', value, converted, format );
				}
				return converted;
			}.bind( this );
			return $L.moment( date, format ).i18N( format, cb );
		}
		return date;
	},

	selectedObs : function( arg ){

		this.hidedropdown();

		var __newvalue = arg.newValue;

		if( __newvalue && this._cmp && !this._cmp.classList.contains( 'lyteDropdownHidden' ) ) {
			 var oldAn = [ 'specificDate', 'customRange' ].indexOf( arg.oldValue ) != -1 ? this._caldiv.querySelector( '.' + arg.oldValue ) : null,
			 newAn = [ 'specificDate', 'customRange' ].indexOf( arg.newValue ) != -1 ? this._caldiv.querySelector( '.' + __newvalue ) : null;
			 if( newAn ) {
			 	if( oldAn ) {
			 		var prm = new Promise( function( res, rej ){
			 			this._new = res;
			 			this.hideele( oldAn );
			 		}.bind( this ) );
			 		Promise.resolve( prm ).then( function(){
			 			$L.fastdom.mutate( this.openele.bind( this ) );
			 		}.bind( this ))
			 	} else{
			 		this.openele()
			 	}
			 	this.data.prevSel = this.data.prevSel || arg.oldValue
			 }
		} else if( __newvalue && ( ( this._cmp && this._cmp.classList.contains( 'lyteDropdownHidden' ) ) || [ 'specificDate', 'customRange' ].indexOf( __newvalue ) != -1 ) ){
			this.selectValue( __newvalue );
		} else if( !__newvalue ){
			this.selectValue( "" );
			this.$node.ltProp({
				startDate : "",
				endDate : "",
				currentDate : ""
			});
		}

		this._callonchange = true;

		// this.resetValue();
	}.observes( 'ltPropSelected' ), 

	opentrans : function( evt ){
		$L( this._cmp ).removeClass( 'lyteDateselectAnimationHappening' );
		this._cmp.removeEventListener( 'transitionend', this._opentrans, true );
		delete this._drop.component._preventSetcss;

		this.setup_navigation();

		if( this.getMethods( 'onAnimationEnd' ) ){
			this.executeMethod( 'onAnimationEnd', this.$node );
		}
	},

	setup_navigation : function(){
		var __data = this.data,
		__selected = __data.ltPropSelected;

		if( __data.ltPropNavigation ){
			if( __selected == "specificDate" ){
				this.setData( 'calNavigation', true );
			} else if( __selected == "customRange" ){
				this.setData( 'rangeNavigation', true );
			}
		}
	},

	tranEnd : function( evt ){
		if( this._cmp ){
			this._cmp.removeEventListener( 'transitionend', this._end, true );
			$L( this._cmp ).removeClass( 'lyteDateselectAnimationHappening' ).css( this.getValue( 1, 'dropdown', this._cmp ) );
		}

		if( this._el ){
			this._el.classList.add( 'lyteDropdownHidden' );
			delete this._el;
		}
		if( this._res ){
			this._res( true );
			this._caldiv.classList.add( 'lyteDropdownHidden' );
			this.callRevert();
			delete this._res;
		}
		// this.hidedropdown();
	},

	tranEnd1 : function( evt ){
		if( this._el ){
			this._el.removeEventListener( 'transitionend', this._indend, true );
			$L( this._el ).removeClass( 'lyteDateselectAnimationHappening' );
			this._el.classList.add( 'lyteDropdownHidden' );
			delete this._el;
		}
		if( this._new ){
			this._new( true );
			delete this._new;
		}

		// this.hidedropdown();
	},

	hidedropdown : function(){
		var caldiv = this._caldiv;
		if( caldiv ){
			var dropdown = Array.from( caldiv.getElementsByTagName( 'lyte-dropdown' ) );

			dropdown.forEach( function( item ){
				item.close();
			});
		}
	},

	hideele : function( elem ){
		elem.addEventListener( 'transitionend', this._indend, true );
		$L( elem ).addClass( 'lyteDateselectAnimationHappening' );

		this._el = elem;
		
		if( this.data.ltPropAnimation.dropdown ){
			$L( elem ).css( this.getValue( 0, 'calendar', elem ) );
		} else{
			this._indend();
		}
	},

	getValue : function( value, type, elem ){
		var animation = this.data.ltPropAnimation[ type ];

		if( animation == 'Fade' ){
			return {
				opacity : value
			}
		} else if( animation == 'Scale' ){
			return{
				transform : "scaleY(" + value + ')'
			}
		} else if(  animation == 'Slide' ){
			var obj = {
				height : value ? ( elem.__height ) : 0,
				transform : ""
			};

			if( $L( this._caldiv ).hasClass( 'lyteDateselectUp' ) ){
				// obj.transform = 'translateY(' + ( !value ? elem.__height : 0 ) + 'px)';

				// obj.transform = value ? '' : ( 'translateY(' + elem.__height + 'px)' );
			}

			return obj;
		}
		return {};
	},

	openele : function(){
		var sel = this.data.ltPropSelected,
		fn = function(){
			this.setCss();
			this.setup_navigation();
		}.bind( this );

		if( [ 'specificDate', 'customRange' ].indexOf( sel ) != -1 ) {
			this._caldiv.classList.remove( 'lyteDropdownHidden' );
			var el = this._caldiv.querySelector( '.' + sel );
			el.classList.remove( 'lyteDropdownHidden' );
			if( this.data.ltPropAnimation.calendar == 'Slide' ){
				$L.fastdom.measure( function(){
					el.__height = this._caldiv.__height = el.children[ 0 ].getBoundingClientRect().height;
					$L.fastdom.mutate( function(){
						$L( el ).css( 'transitionDuration', '0s' ).css( this.getValue( 0, 'calendar', el ) );
						// $L.fastdom.measure( this.setCss.bind( this ) );
						setTimeout( function(){
							$L( el ).css( 'transitionDuration', '' );
							fn();
						}.bind( this ), 20 );
					}.bind( this ) );
				}.bind( this ));
			} else {
				$L( el ).css( this.getValue( 0, 'calendar', el ) );
				$L.fastdom.measure( fn );
			}
		}
	},

	animation_obs : function(){
		var animation = this.data.ltPropAnimation;
		
		$L( this._caldiv )
		.removeClass( 'lyteDateselectAnimate' )
		.addClass( animation.calendar != 'Fade' ? 'lyteDateselectAnimate' : '' )
		.css( {
			transform : "",
			opacity : ""
		} );

		$L( this._cmp )
		.removeClass( 'lyteDateselectAnimate' )
		.addClass( animation.dropdown != 'Fade' ? 'lyteDateselectAnimate' : '' )
		.css( {
			transform : "",
			opacity : ""
		} );

	}.observes( 'ltPropAnimation.{}, ltPropAnimation' ).on( 'didConnect' ),

	methods : {

		rangenavigate : function( cb ){

			var args = arguments;

			if( this.getMethods( cb ) ){
				this.executeMethod.apply( this, args );
			}

			if( this.data.ltPropAnimation.calendar == 'Slide' ){
				var datepicker = args[ 3 ].$node;
				$L.fastdom.measure( function(){
					var height = datepicker.getBoundingClientRect().height;
					$L.fastdom.mutate( function(){
						$L( datepicker.parentNode ).css( 'height', height );
					});
				});
			}
		},

		bfSw : function( arg1, arg2 ){
			var ret;
			if( this.getMethods( 'onBeforeShow' ) ){
				ret = this.executeMethod( 'onBeforeShow', arg1, arg2 )
			}
			if( !this.data.opend && ret != false ) {
				this.setData( 'opend', true );
				return new Promise( function( res ){
					window.requestAnimationFrame( res );
				})
			}
			return ret;
		},
		sw : function( arg1, arg2 ){

			this._drop.component._preventSetcss = !this._drop.ltProp( 'freeze' );

			this.getMethods( 'onShow' ) && this.executeMethod( 'onShow', arg1, arg2 );

			var body = arg2.childComp;
			
			$L( body ).addClass( 'lyteDateselectAnimationHappening' ).css( 'transitionDuration', '0s' ).css( this.getValue( 0, 'dropdown', body ) );

			this.setData( 'preventKeydown', true );
			
			setTimeout( function(){ // request animation frame causes issue in ff
				$L( body ).css( 'transitionDuration', '' );
				this.openele();

				body.addEventListener( 'transitionend', this._opentrans, true );

				$L.fastdom.mutate( function(){
					$L( body ).css( this.getValue( 1, 'dropdown', body ) );	
				}.bind( this ) ); 
			}.bind( this ), 20 );
		},
	
		bfHde : function( arg1, arg2 ){

			delete this._callonchange;

			if( this._prevent || this._caldiv.contains( ( arg1 || {} ).target ) ){
				delete this._prevent;
				return false;
			}
			var ret;
			if( this.getMethods( 'onBeforeHide' ) ){
				ret = this.executeMethod( 'onBeforeHide', arg1, arg2 )
			}
			if( ret != false ){
				return new Promise( function( res, rej ){
					this._res = res;
					var animation = this.data.ltPropAnimation || {},
					el = this._caldiv.querySelector('.specificDate:not(.lyteDropdownHidden),.customRange:not(.lyteDropdownHidden)');

					this._el = el;

					// this.hidedropdown();

					if( animation.dropdown ){
						arg2.childComp.addEventListener( 'transitionend', this._end, true );
						$L( arg2.childComp ).addClass( 'lyteDateselectAnimationHappening' );
						if( el ) {
							$L( el ).css( this.getValue( 0, 'calendar', el ) );
						}
						$L( arg2.childComp ).css( this.getValue( 0, 'dropdown', arg2.childComp ) );
					} else{
						this._end();
					}
				}.bind( this ) )
			}
			return ret;
		},
		
		hde : function( arg1, arg ){
			var data = this.data,
			__rest = this._rest,
			__selected = data.ltPropSelected,
			fn = function(){
				var rangepicker = data.ltPropDateRangePicker,
				cal_div = this._caldiv;

				if( rangepicker.maxDiff != void 0 && cal_div ){
					var dom = cal_div.getElementsByTagName( 'lyte-daterangepicker' )[ 0 ];
					dom.ltProp({
						minDate : rangepicker.minDate || "",
						maxDate : rangepicker.maxDate || ""
					});
				}
			}.bind( this );

			this.setData( 'preventKeydown', false );

			if( !__rest && data.prevSel ){
				this.setData( 'ltPropSelected', __selected = data.prevSel );
				// if( !this.data.ltPropButtonYield ){
					this.setData( 'ltPropDisplayValue', this.getVal( __selected ) );
				// }
			} else if( __rest && /customRange/i.test( __selected ) ){
				fn();
			}

			if( data.dateSelected ){
				this.setData( 'dateSelected', false );
				fn();
			}

			delete this._rest;
			data.prevSel = ''; 
			this.resetValue();
			if( data.ltPropAnimation.dropdown == 'Slide' ){
				$L( this._cmp ).css( 'height', '' );
			}

			if( this.getMethods( 'onHide' ) ){
				return this.executeMethod( 'onHide', arg1, arg )
			}
			
		},
		dateselected : function( event ){
			this.selected( event, true )
		},

		dateselected1 : function( event ){
			this.selected( event )
		},
		optSel : function( evt, dat, com, itm ){
			if( [ 'specificDate', 'customRange' ].indexOf( dat ) != -1 ){
				this._prevent = true;
				return
			}
			this.selectValue( dat );
			this.getMethods('onSelect') && this.executeMethod( 'onSelect', evt, this.$node, dat, itm );

			if( this._callonchange ){
				var cb = "onChange";

				/**
				  * @methods onChange
				  * @version 3.40.0
				  */

				this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node, dat, itm );
			}

			this._rest = true;
		},
		posChange : function( pos ){
			var addClass = 'removeClass'
			if( /up/i.test( pos ) ){
				addClass = 'addClass';
			}
			$L( this._cmp )[ addClass ]( 'lyteDateselectUp' );
			$L( this._caldiv )[ addClass ]( 'lyteDateselectUp' );
		},

		startChange : function( arg ){
			var cb = 'onStartDateChanged';

			if( this.getMethods( cb ) ){
				this.executeMethod( cb, arg );
			}
		}
	},

	resetValue : function(){
		if( this.data.ltPropSelected != 'specificDate' ) {
			this.setData( 'ltPropCurrentDate', '' );
		}
		if( this.data.ltPropSelected != 'customRange' ){
			this.setData( 'ltPropStartDate', '' );
			this.setData( 'ltPropEndDate', '' );
		}
	},

	callRevert : function(){
		var selected = this.data.ltPropSelected,
		calendar = this._caldiv.querySelector( '.specificDate lyte-calendar' ),
		daterange = this._caldiv.querySelector( '.customRange lyte-daterangepicker' );

		if( selected == 'customRange' ){
			daterange.revertToSelected();
			if( calendar ){
				calendar.revertToToday();
			}
		} else {
			if( selected == 'specificDate' ){
				calendar.revertToSelected();
			} else {
				if( calendar ){
					calendar.revertToToday();
				}
			}
			if( daterange ){
				daterange.revertToToday();
			}
		}
	},

	setCss : function( obj ) {
		function rtlfunc( lft, bcr, ww ){
			if( this._dir ) {
				if( bcr ) {
					if( lft == 'right' ) {
						return ww - bcr.left;
					}
					return ww - bcr.right;
				} else if( lft == 'left' ) {
					return 'right';
				} 
			}
			return bcr ? bcr[ lft ] : 'left';
		}
		var y = window.pageYOffset || document.documentElement.scrollTop,
		body = this._caldiv, par = this._cmp,
		bbcr = body.getBoundingClientRect(),
		bcr = { left : bbcr.left, right : bbcr.right, width : bbcr.width, height : body.__height || bbcr.height }, 
		__bcr = par.getBoundingClientRect(),
		parcr = { left : __bcr.left, right : __bcr.right, width : __bcr.width, height : par.__height, top : parseFloat( par.style.top ) - y, bottom : parseFloat( par.style.top ) - y + par.__height },
		wwidth = window.innerWidth,
		x = ( window.pageXOffset || document.documentElement.scrollLeft ) * ( this._dir ? - 1: 1 ),
		selEl = par.querySelector( 'lyte-drop-item[selected = "true"]' ),
		__selBcr = selEl.getBoundingClientRect(),
		selBcr = { bottom : __selBcr.bottom - ( __bcr.top - parcr.top ) },
		arrow = selEl.querySelector( '.dateArrow' ),
		arbcr = arrow ? arrow.getBoundingClientRect() : { width : 0 },

		newLeft = rtlfunc.call( this, 'left', parcr, wwidth ) + parcr.width + arbcr.width / 2 + x,
		rgtLft = rtlfunc.call( this, 'left', parcr, wwidth ) - arbcr.width / 2 - bcr.width + x,
		newTop = par.style.top,
		newBottom = par.style.bottom,
		pos;

		if( parseFloat( newTop ) + bcr.height < selBcr.bottom + y ){
			newTop = ( y + selBcr.bottom - bcr.height ) + 'px';
		}
		if( newLeft + bcr.width < wwidth + x ) {
			pos = 'right';
		} else {
			if( rgtLft > x ){
				newLeft = rgtLft;
				pos = 'left';
			} else {
				if( wwidth - rtlfunc.call( this, 'right', parcr, wwidth ) > rtlfunc.call( this, 'left', parcr, wwidth ) ){
					pos = 'right'
				} else {
					newLeft = rgtLft;
					pos = 'left'
				}
			}
		}
		$L.fastdom.mutate( function(){
			body.style[ rtlfunc.call( this, 'left' ) ] = newLeft + 'px';
			body.style.top = newTop;
			body.style.bottom = newBottom;
			var elem = this._caldiv.getElementsByClassName( this.data.ltPropSelected )[ 0 ];
			if( elem ){
				$L( elem ).css( this.getValue( 1, 'calendar', elem ) );
			}
			this.setData( 'pos', pos )
		}.bind( this ))
	},

	selected : function( evt, flag ){

		var data = this.data;

		// if( !data.ltPropButtonYield ){
			this.setData( 'ltPropDisplayValue', this.getVal( data.ltPropSelected ) );
		// }

		var cb = 'onSelect',
		cb1 = 'onChange',
		args = [ cb, evt, this.$node ]


		if( flag ){
			args.push( "customRange", data.ltPropStartDate, data.ltPropEndDate );
		} else{
			args.push( 'specificDate', data.ltPropCurrentDate );
		}

		if( this.getMethods( cb ) ){
			this.executeMethod.apply( this, args ); 
		}

		if( this._callonchange  && this.getMethods( cb1 ) ){
			args.shift();
			args.unshift( cb1 );
			this.executeMethod.apply( this, args );
		}

		this._rest = true
		this._drop.toggle()
	},

	calendar_obs : function( arg ){
		this._callonchange = true;
	}.observes( 'ltPropStartDate', 'ltPropEndDate', 'ltPropCurrentDate' )

});

function dtslctscroll( evt ){
	if( evt && evt.type == 'resize' && _lyteUiUtils.isMobile ) {
		return;
	}
	var drops = document.querySelectorAll( 'lyte-drop-box:not(.lyteDropdownHidden)' )
	for( var i = 0; i < drops.length; i++ ){
		var opendrop = drops[ i ];
		if( opendrop && opendrop.origindd && opendrop.origindd.parent ){
			var cmp = opendrop.origindd.parent.component;
			evt.type == "orientationchange" ?  setTimeout( cmp.setCss.bind( cmp ), 500 ) : $L.fastdom.measure( cmp.setCss.bind( cmp ) );
		}
	}
}

/**
 * @syntax nonYielded
 * <lyte-dateselect></lyte-dateselect>
 */

/**
 * @syntax Button Yield
 * @attribute ltPropButtonYield=true
 * <lyte-dateselect lt-prop-button-yield = true>
 * 	<template is = "registerYield" yield-name = "buttonYield">
 * 		Drop button name
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Item yield
 * @attribute ltPropItemYield=true
 * <lyte-dateselect lt-prop-item-yield = true>
 * 	<template is = "registerYield" yield-name = "item">
 * 		Item yield {{itemValue}}
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Calendar yield
 * @attribute ltPropCalendarYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Footer and item yield
 * @attribute ltPropCalendarYield=true
 * @attribute ltPropItemYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true lt-prop-item-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * 	<template is = "registerYield" yield-name = "item">
 * 		Item yield {{itemValue}}
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Footer and button yield
 * @attribute ltPropCalendarYield=true
 * @attribute ltPropButtonYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true lt-prop-button-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * 	<template is = "registerYield" yield-name = "buttonYield">
 * 		Drop button name
 * 	</template>
 * </lyte-dateselect>
 */

/**
 * @syntax Button, item and calendar yield
 * @attribute ltPropCalendarYield=true
 * @attribute ltPropButtonYield=true
 * @attribute ltPropItemYield=true
 * <lyte-dateselect lt-prop-calendar-yield = true lt-prop-item-yield = true lt-prop-button-yield = true>
 * 	<template is = "registerYield" yield-name = "footer">
 * 		calendar footer yield
 * 	</template>
 * 	<template is = "registerYield" yield-name = "buttonYield">
 * 		Drop button name
 * 	</template>
 * 	<template is = "registerYield" yield-name = "item">
 * 		Item yield {{itemValue}}
 * 	</template>
 * </lyte-dateselect>
 */

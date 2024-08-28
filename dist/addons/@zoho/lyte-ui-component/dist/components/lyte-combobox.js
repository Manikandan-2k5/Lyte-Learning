/**
 * Renders a combobox
 * @component lyte-combobox
 * @version  3.0.0
 * @dependencies lyte-dropdown,lyte-input,lyte-tooltip
 * /plugins/lyte-search.js
 * /theme/compiledCSS/default/ltr/lyte-ui-scrollbar.css
 * /components/lyte-input.js
 * /theme/compiledCSS/default/ltr/lyte-ui-input.css
 * /components/lyte-dropdown.js
 * /theme/compiledCSS/default/ltr/lyte-ui-dropdown.css
 * /components/lyte-tooltip.js
 * /theme/compiledCSS/default/ltr/lyte-ui-tooltip.css
 * @methods onOptionSelect,onSearch,onShow,onBeforeShow,onHide,onBeforeHide,onUserScroll,onClear
 * @utility toggle,open,close
 * @import lyte-dropdown
 * @ignoreProperties ltPropYield, ltPropType, ltPropShow, ltPropOptions, ltPropDisabledList,ltPropSelected, ltPropTooltip
 * @ignoreUtility toggle,open,close
 */
Lyte.Component.register('lyte-combobox', {
_template:"<template tag-name=\"lyte-combobox\"> <lyte-dropdown class=\"{{ltPropDropdownClass}} {{if(ifEquals(ltPropType,'buttonSearch'),'lyteComboboxButtonSearch','lyteComboboxBoxSearch')}} {{if(isSearch,'lyteComboboxSearchPresent')}}\" lt-prop-selected=\"{{lbind(ltPropDropdownSelected)}}\" lt-prop-options=\"{{ltPropOptions}}\" lt-prop-disabled-list=\"{{ltPropDisabledList}}\" on-option-selected=\"{{method('optionSelect')}}\" on-show=\"{{method('dropBoxOpen')}}\" on-animation-end=\"{{method('onAnimateEnd')}}\" on-key-navigation=\"{{method('keyNavigation')}}\" on-before-show=\"{{method('beforeDropboxShow')}}\" on-hide=\"{{method('hideDropbox')}}\" on-before-hide=\"{{method('beforeHideDropbox')}}\" on-scroll=\"{{method('scrollDropBox')}}\" lt-prop-yield=\"true\" lt-prop=\"{{stringify(ltPropDropdown)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'!')}}\"><template case=\"true\"> <lyte-drop-button> <template is=\"if\" value=\"{{expHandlers(selectValue,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropDropdown.displayValue}}\"><template case=\"true\"> <span class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-title=\"{{if(showToolTip,ltPropDropdown.displayValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltip}}\" __mouseenter=\"{{action('toolTipConfig',this)}}\">{{ltPropDropdown.displayValue}}</span> </template><template case=\"false\"><template is=\"if\" value=\"{{ltPropDropdown.placeholder}}\"><template case=\"true\"> <span class=\"lyteDropPlaceholderNormal\">{{ltPropDropdown.placeholder}}</span> </template><template case=\"false\"> <span class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-title=\"{{if(showToolTip,initialValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltip}}\" __mouseenter=\"{{action('toolTipConfig',this)}}\">{{initialValue}}</span> </template></template></template></template> </template><template case=\"false\"> <span class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-title=\"{{if(showToolTip,selectValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltip}}\" __mouseenter=\"{{action('toolTipConfig',this)}}\">{{selectValue}}</span> <template is=\"if\" value=\"{{expHandlers(selectValue,'&amp;&amp;',ltPropShowRemoveIcon)}}\"><template case=\"true\"> <lyte-drop-remove class=\"lyteDropdownDeselectIcon\"></lyte-drop-remove> </template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','buttonSearch'))}}\"><template case=\"true\"> <lyte-input class=\"lyteComboboxBtnSearchInput\" lt-prop-type=\"search\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-close-icon=\"true\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-class=\"lyteComboboxBtnSearchOrigIpt\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" on-clear=\"{{method('onSearchClear')}}\" __input=\"{{action('oninput',this)}}\"></lyte-input> </template></template> <lyte-icon class=\"dropdown\"></lyte-icon> </lyte-drop-button> <lyte-drop-box class=\"{{ltPropBoxClass}}\"> <template is=\"if\" value=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','boxSearch'))}}\"><template case=\"true\"> <lyte-drop-header> <lyte-input lt-prop-close-icon=\"true\" lt-prop-type=\"search\" lt-prop-aria=\"{{ltPropAria}}\" class=\"lyteComboboxDropboxSearch\" lt-prop-class=\"lyteComboboxDropboxSearchOrigIpt\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" on-clear=\"{{method('onSearchClear')}}\"></lyte-input> </lyte-drop-header> </template></template> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\"> <template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\"> <lyte-drop-item data-value=\"{{subitem[ltPropDropdown.systemValue]}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,subitem[ltPropDropdown.systemValue])}}\">{{subitem[ltPropDropdown.userValue]}}</lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item data-value=\"{{subitem}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,subitem)}}\">{{subitem}}</lyte-drop-item> </template></template> </template> </lyte-drop-group> </template><template case=\"false\"> <template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\"> <lyte-drop-item data-value=\"{{item[ltPropDropdown.systemValue]}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,item[ltPropDropdown.systemValue])}}\">{{item[ltPropDropdown.userValue]}}</lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item data-value=\"{{item}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,item)}}\">{{item}}</lyte-drop-item> </template></template> </template></template> </template> <template is=\"if\" value=\"{{showNoResult}}\"><template case=\"true\"> <div class=\"lyteDropdownNoResult lyteComboboxNoResult\"> {{ltPropNoResultMessage}} </div> </template></template> </lyte-drop-body> </lyte-drop-box> </template><template case=\"false\"> <lyte-drop-button> <lyte-yield is=\"registerYield\" yield-name=\"headerYield\"> </lyte-yield> <template is=\"if\" value=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','buttonSearch'))}}\"><template case=\"true\"> <lyte-input class=\"lyteComboboxBtnSearchInput\" lt-prop-close-icon=\"true\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-type=\"search\" lt-prop-class=\"lyteComboboxBtnSearchOrigIpt\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" on-clear=\"{{method('onSearchClear')}}\"></lyte-input> </template></template> </lyte-drop-button> <lyte-drop-box class=\"{{ltPropBoxClass}}\"> <template is=\"if\" value=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','boxSearch'))}}\"><template case=\"true\"> <lyte-drop-header> <lyte-input class=\"lyteComboboxDropboxSearch\" lt-prop-close-icon=\"true\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-class=\"lyteComboboxDropboxSearchOrigIpt\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" lt-prop-type=\"search\" on-clear=\"{{method('onSearchClear')}}\"></lyte-input> </lyte-drop-header> </template></template> <lyte-drop-body> <lyte-yield is=\"registerYield\" yield-name=\"bodyYield\"> </lyte-yield> <template is=\"if\" value=\"{{showNoResult}}\"><template case=\"true\"> <div class=\"lyteDropdownNoResult lyteComboboxNoResult\"> {{ltPropNoResultMessage}} </div> </template></template> </lyte-drop-body> <lyte-yield is=\"registerYield\" yield-name=\"footerYield\"> </lyte-yield> </lyte-drop-box> </template></template> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"insertYield","position":[3,3,1]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"insertYield","position":[3,5]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropDropdown","ltPropOptions","ltPropDropdownSelected","ltPropNoResultMessage","ltPropDisabledList","ltPropYield","ltPropType","ltPropDropboxSearchAppearance","ltPropSearchplaceholder","ltPropMinSearchValue","ltPropTooltip","ltPropBoxClass","ltPropDropdownClass","ltPropAria","ltPropShowRemoveIcon","selectValue","initialValue","showNoResult","isSearch"],

	data : function(){
		return {
			/** 
			 * @componentProperty {object} ltPropDropdown={}
			 * @version 3.0.0
			 */
			'ltPropDropdown' : Lyte.attr( 'object', {
			 	'default' : {}
			} ),
			/** 
			 * @componentProperty {array} ltPropOptions=[]
			 * @version 3.0.0
			 */
			'ltPropOptions' : Lyte.attr( 'array', {
				'default' : []
			} ),
			/** 
			 * @componentProperty {string} ltPropDropdownSelected
			 * @version 3.0.0
			 */
			'ltPropDropdownSelected' : Lyte.attr( 'string' ),
			/** 
			 * @componentProperty {string} ltPropNoResultMessage=No Results Found
			 * @version 3.0.0
			 */
			'ltPropNoResultMessage' : Lyte.attr( 'string', {
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'noResultMessage', _lyteUiUtils.i18n( 'no.results.found' ) ) 


			} ),
			/** 
			 * @componentProperty {array} ltPropDisabledList=[]
			 * @version 3.0.0
			 */
			'ltPropDisabledList': Lyte.attr('array',{"default":[]}),
			/** 
			 * @componentProperty {boolean} ltPropYield=false
			 * @version 3.0.0
			 */
			'ltPropYield' : Lyte.attr( 'boolean', {
			 'default' : false 
			} ),
			/** 
			 * @componentProperty {boxSearch | buttonSearch} ltPropType=boxSearch
			 * @version 3.0.0
			 */
			'ltPropType' : Lyte.attr( 'string' ,{
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'type', 'boxSearch' )
			} ),
			/** 
			 * @componentProperty {flat | box} ltPropDropboxSearchAppearance=flat
			 * @version 3.0.0
			 */
			'ltPropDropboxSearchAppearance' : Lyte.attr( 'string', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'dropboxSearchAppearance', 'flat' )
			} ),
			/** 
			 * @componentProperty {string} ltPropSearchplaceholder=''
			 * @version 3.0.0
			 */
			'ltPropSearchplaceholder' : Lyte.attr( 'string', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'searchplaceholder', '' )
			} ),
			/** 
			 * @componentProperty {number} ltPropMinSearchValue
			 * @version 3.0.0
			 */
			'ltPropMinSearchValue' : Lyte.attr( 'number' ),
			/**
   			 * @componentProperty {object} ltPropTooltip
   			 * @component lyte-tooltip ltPropTooltipConfig
   			 * @default {'position': 'bottom', 'appearance': 'box', 'margin': 5, 'keeptooltip': true} 
			 */
			'ltPropTooltip': Lyte.attr( 'object', { 'default':_lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'tooltip', { 
	   				'position': 'bottom', 
	   				'appearance': 'box',
	   				'margin': 5,
	   				'keeptooltip': true 
   				} )
			   } ),
			   /**
   			 * @componentProperty {object} ltPropBoxClass=''
   			 * @version 3.1.0 
			 */
   			'ltPropBoxClass' :	Lyte.attr('string',{'default':_lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'boxClass', '' )}),
			 /**
   			 * @componentProperty {object} ltPropDropdownClass=''
   			 * @version 3.1.0 
			 */
			'ltPropDropdownClass' :	Lyte.attr('string',{'default':_lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'dropdownClass', '' )}),
			/**
			 * @componentProperty {boolean} ltPropAria = false
			 * @version 3.1.0
			 */
			'ltPropAria' : Lyte.attr( 'boolean', {
				'default':true
			}) ,
			/**
			 * @componentProperty {boolean} ltPropShowRemoveIcon = false
			 * @version 3.77.0
			 */
			'ltPropShowRemoveIcon': Lyte.attr( 'boolean', { 'default': false } ),

			'selectValue' : Lyte.attr( 'string' ), 
			'initialValue': Lyte.attr( 'string' ), 
			'showNoResult' : Lyte.attr( 'boolean', {
				'default' : false
			} ),
			'isSearch' : Lyte.attr('boolean', {
			 'default' : false 
			} )
		}		
	},
	init : function() {
		var options = this.getData( 'ltPropOptions' ),
			dropDown = this.getData('ltPropDropdown')
		if( options && options.length >0 ) {
			this.checkForSearch()
		}
		this._currentDisplay = dropDown.displayValue
	},
	didConnect : function() {
		var dropBody = this.$node.querySelector( 'lyte-drop-body' ),
		 dropBox = this.$node.querySelector( 'lyte-drop-button' ),
		 disabledList = this.getData( 'ltPropDisabledList' );

		if( this.getData( 'isSearch') ) {
			var searchEle = this.$node.querySelector( 'lyte-input' )
			var dropBody = this.$node.querySelector('lyte-drop-body')
			var dropDown = this.$node.querySelector( 'lyte-dropdown' )

			if( this.getData( 'ltPropType' ) == 'boxSearch' ) {
				dropBox = dropDown.component.childComp || dropDown.querySelector( 'lyte-drop-box' )
				searchEle = dropBox.querySelector( 'lyte-input' )
				dropBody = dropBox.querySelector('lyte-drop-body')
			} else{
				dropDown.setData('ltPropFreeze', false)
			}
			if( searchEle ){
				$L( searchEle ).search( { 'scope' : dropBody, 'search' : 'lyte-drop-item', 'related' : 'lyte-drop-group' ,'onSearch' : this.Search.bind( this ),trim : true } )
			}
		if(dropBody && this.getData('ltPropAria')){
				var dropBodyId = dropBody.getAttribute('id')
				var attr={}
				attr['aria-autocomplete'] ='list';
				attr['aria-controls'] = dropBodyId ? dropBodyId : false;
				if( searchEle ){
					searchEle.setData('ltPropAria',true);
					searchEle.setData('ltPropAriaAttributes',attr)

				}
			}
			this._searchEle = searchEle
		}
		var options = this.getData( 'ltPropOptions' )
		if( options && options.length >0 ) {
			if( !this.getData( 'ltPropYield' ) ) {
				this.setDropdownValue()
			}
			
		}
		this.$node.open = function() {
			var dropDown = this.querySelector('lyte-dropdown')
			dropDown.open();

		}

		this.$node.close = function() {
			var dropDown = this.querySelector('lyte-dropdown')
			dropDown.close();


		}
		this.$node.toggle = function() {
			var dropDown = this.querySelector('lyte-dropdown')
			dropDown.toggle();

		}

	},
	checkForSearch : function(){
		var option = this.getData('ltPropOptions'),
		minValue = this.getData('ltPropMinSearchValue'),
		count = 0,
		options = this.getData('ltPropOptions'),
		firstElement = options[ 0 ]

		if( firstElement.constructor == Object ){
			if( Object.keys( firstElement ).length == 1 ) {
	              	value = firstElement[ Object.keys( firstElement )[ 0 ] ];
	              	if( value.constructor == Array ) {
	                   	for(var i =0;i<option.length;i++){
	                   		for(var key in option[i]){
								count += option[i][key].length
								if(count >= minValue){
											this.setData('isSearch',true)
											return
								}
							}
						}
					}
	        } else {
				if(options.length >= minValue){
					this.setData('isSearch',true)
					return
				}
			}
		} else{
			if(options.length >= minValue){
					this.setData('isSearch',true)
					return
			}
		}
		
	},
	setDropdownValue : function() {
		var dropDown = this.getData( 'ltPropDropdown' ),
		name = dropDown.userValue,
		value = dropDown.systemValue,
		drop = this.$node.querySelector( 'lyte-dropdown' )
		if(	 dropDown.placeholder == undefined  && dropDown.displayValue == undefined  && (!this.getData( 'ltPropDropdownSelected')) )  {
			var displayName = drop.getInitialSelected();
			this.setData( 'ltPropDropdownSelected', displayName )
		}
		if(dropDown.placeholder==undefined && dropDown.displayValue && !this.getData('ltPropDropdownSelected')){
			var displayName = drop.getInitialSelected();
			this.setData( 'ltPropDropdownSelected', displayName )
			this.setData( 'selectValue', dropDown.displayValue )

		}
		if( this.getData( 'ltPropDropdownSelected' ) && dropDown.displayValue == undefined ) {
			var displayName = drop.getDisplayValue();
			this.setData( 'selectValue', displayName )
		}
		
	},
	displayObs : function(){
		if( this._currentDisplay != this.getData('ltPropDropdown').displayValue ){
			this.setData('selectValue',this.getData('ltPropDropdown').displayValue)
			this._currentDisplay = this.getData('ltPropDropdown').displayValue
		}
	}.observes('ltPropDropdown.displayValue'),
	addComboboxClass : function(dropBox){
		dropBox.classList.add('lyteComboboxFiltering')
	},
	removeComboboxClass : function(dropBox){
		dropBox.classList.remove('lyteComboboxFiltering')
	},
	optionObs : function() {
		var options = this.getData( 'ltPropOptions' ),
		 dropDown = this.$node.querySelector('lyte-dropdown')
		this.setData( 'isSearch', false )
		this._searchEle = null
		this.setData('selectValue',undefined)
		this.setData('showNoResult',false)
		if( dropDown ) {
			dropDown.component.showNoResultDiv()
		}
		if( options && options.length >0 ){
			if( !this.getData( 'ltPropYield' ) ) {
				this.setDropdownValue()
			}
			this.checkForSearch()
		}
		if( this.getData( 'isSearch' ) && dropDown ) {
			
			 var searchEle = this.$node.querySelector( 'lyte-input' ),
			 dropBox = dropDown.component.childComp || dropDown.querySelector( 'lyte-drop-box' ),
			 dropBody = dropBox.querySelector( 'lyte-drop-body' )

			if( this.getData( 'ltPropType' ) == 'boxSearch' ) {
				searchEle = dropBox.querySelector( 'lyte-input' )

			}
			this._searchEle = searchEle
			$L( searchEle ).search( { 'scope' : dropBody, 'search' : 'lyte-drop-item', 'related' : 'lyte-drop-group' ,'onSearch' : this.Search.bind( this ),trim:true } )
		}
		
	}.observes( 'ltPropOptions.[]' ),
	disabledListObs : function() {
		var dropDown = this.$node.querySelector(' lyte-dropdown' )
		dropDown.setData( 'ltPropDisabledList', this.getData( 'ltPropDisabledList' ) )
	}.observes('ltPropDisabledList.[]'),
	dropDownSelectedObs : function(){
		if( this.getData('ltPropDropdownSelected') != "" && this.getData('ltPropDropdownSelected') != undefined ){
			var dropDown = this.$node.querySelector( 'lyte-dropdown' ) 
			this.setData( 'selectValue', dropDown.getDisplayValue())
		} else{
			this.setData( 'selectValue', undefined )
		}
	}.observes( 'ltPropDropdownSelected'),
	Search  : function( visibleList, event, value ) {
		this.setData( "showNoResult", visibleList.length == 0 );
		if( this.getMethods( "onSearch" ) ) {
			return this.executeMethod( "onSearch", visibleList, event, value );
		}
	},
	isVisible: function( item ) {
		return !!( item.offsetWidth || item.offsetHeight || item.getClientRects().length );
	},
	isEmpty: function( obj ) {
		for( var key in obj ) {
			return false;
		}

		return true;
	},

	methods : {
		keyNavigation : function( component, item ) {
			if( !this.getData('ltPropAria') ){
				return
			}
			var id = item.getAttribute('id')
			if( !this._searchEle ) {
				if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
					 this._searchEle = this.$node.querySelector( 'lyte-input' ); 
				} else {
					var dropBox = component.childComp
					 this._searchEle = dropBox.querySelector( 'lyte-input' ); 
				}
			}
			if( this._searchEle ) {
					if( item.tabIndex <= -1 ) {
						item.setAttribute('tabindex',0)
						Lyte.objectUtils(this._searchEle.getData('ltPropAriaAttributes'), 'add', 'aria-activedescendant', id );
						setTimeout(function(){
							item.tabIndex = -1
						}, 250 )
					}
					item.focus()

			}
		},
		optionSelect : function( event, value, component, item ) {

			this.setData( 'ltPropDropdownSelected', value )
			// this.setData( 'selectValue', item.innerText )
			var dropButton = component.$node.querySelector('lyte-drop-button')
			dropButton.classList.remove('lyteComboboxFiltering')
			if( !this._searchEle ){
				if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
					  this._searchEle = this.$node.querySelector( 'lyte-input' ); 
				} else {
					var dropBox = component.childComp

					 this._searchEle = dropBox.querySelector( 'lyte-input' ); 
				}
			}
			 
			if(  this._searchEle !==null ) {
				$L( this._searchEle )[0].setValue('');
			}
			if( this.getMethods( 'onOptionSelect' ) ) {
				this.executeMethod( 'onOptionSelect', event, value, component, item )
			}
		},
		dropBoxOpen : function( event, component ) {

			if( !this._searchEle ) {
				if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
					 this._searchEle = this.$node.querySelector( 'lyte-input' ); 
				} else {
					var dropBox = component.childComp
					 this._searchEle = dropBox.querySelector( 'lyte-input' ); 
				}
			}
			 
			if( this._searchEle!==null && !this.getData('ltPropDropdown').animate) {
				 this._searchEle.focus();
				$L( this._searchEle)[0].setValue('');
				
			}
			if( this._searchEle!==null && this.getData('ltPropAria') ){
				Lyte.objectUtils(this._searchEle.getData('ltPropAriaAttributes'), 'add', 'aria-activedescendant',false);
			}
			if( this.getMethods( 'onShow' ) ) {
				this.executeMethod( 'onShow', event, component );
			}
			
		},
		onAnimateEnd : function(event,component){
			if( !this._searchEle ) {
				if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
					 this._searchEle = this.$node.querySelector( 'lyte-input' ); 
				} else {
					var dropBox = component.childComp
					 this._searchEle = dropBox.querySelector( 'lyte-input' ); 
				}
			}
			 
			if( this._searchEle!==null  ) {
				 this._searchEle.focus();
				$L( this._searchEle)[0].setValue('');
			}
			if( this.getMethods( 'onAnimationEnd' ) ) {
				this.executeMethod( 'onAnimationEnd', event, component );
			}
		},
		searchList : function( object , input){
			var dropDown = this.$node.querySelector( 'lyte-dropdown' ),
				dropButton = dropDown.querySelector( 'lyte-drop-button' ),
				dropBox = dropDown.component.childComp || dropDown.querySelector( 'lyte-drop-box' )
			// if(object.newValue != ""){
			// 	dropButton.classList.add('lyteComboboxFiltering')
			// }
			// else{
			// 	dropButton.classList.remove('lyteComboboxFiltering')
			// }
			if(dropBox){
				var elems = dropBox.querySelectorAll( 'lyte-drop-item:not(.lyteSearchHidden):not(.lyteDropdownActive)' ),
				cur = dropBox.querySelector( '.lyteDropdownSelection' ),elem
				for(var i=0 ; i < elems.length; i++ ) {
					if( this.isVisible( elems[ i ] )
						&& elems[ i ].getAttribute( 'disabled' ) !== "true" 
					) {
						elem = elems[ i ];
						break;
					}
				}

				if( cur ) {
					cur.classList.remove( 'lyteDropdownSelection' );
				}

				if( elem ) {
					elem.classList.add( 'lyteDropdownSelection' );
					return ;
				}
			}
		},
		beforeDropboxShow:function( event, component ) {
			if( this.getMethods( 'onBeforeShow' ) ) {
				return this.executeMethod( 'onBeforeShow', event, component )
			};
		},
		hideDropbox:function( event, component ) {
			if( !this._searchEle ) {
				if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
					 this._searchEle = this.$node.querySelector( 'lyte-input' ); 
				} else {
					var dropBox = component.childComp
					 this._searchEle = dropBox.querySelector( 'lyte-input' ); 
				}
			}
			 
			if( this._searchEle!==null ) {
				$L(this._searchEle)[0].setValue('');
			}
			if( this._searchEle!==null && this.getData('ltPropAria') ){
				Lyte.objectUtils(this._searchEle.getData('ltPropAriaAttributes'), 'add', 'aria-activedescendant',false);
			}
			if( this.getMethods( 'onHide' ) ) {
				return this.executeMethod( 'onHide', event, component );
			};

		},
		beforeHideDropbox:function( event, component ) {
			// debugger
			var dropButton = this.$node.querySelector( 'lyte-drop-button' )
			dropButton.classList.remove('lyteComboboxFiltering')
			if(this._preventClose){
				delete this._preventClose
				return false;

			}
			if( this.getMethods( 'onBeforeHide' ) ) {
				return	this.executeMethod( 'onBeforeHide', event, component )
			};
		},
		scrollDropBox : function( event, dropdownComp ) {
			if( this.getMethods( 'onUserScroll' ) ) { 
				this.executeMethod( 'onUserScroll', event, dropdownComp ); 
			}
		},
		onSearchClear : function( event, element ){
			
			if( element!==null ) {
				$L(element)[0].setValue('');
			}
			if( this.getMethods( 'onClear' ) ) {
				return this.executeMethod( 'onClear', event, component );
			};
			this._preventClose = true
		}
	},
	actions : {
		toolTipConfig: function( button ) {
			var width = button.offsetWidth,
			scrollWidth = button.scrollWidth,
			config = this.getData( 'ltPropTooltip' );

			this.setData( 'showToolTip', ( width < scrollWidth ) && !this.isEmpty( config ) );
		},
		oninput: function(self){
			var dropButton = this.$node.querySelector( 'lyte-drop-button' ),
			input = self.querySelector('input')
			if(input.value != ""){
				dropButton.classList.add('lyteComboboxFiltering')
			}
			else{
				dropButton.classList.remove('lyteComboboxFiltering')
			}
		}
	}
});
/**
 * @syntax nonYielded
 * <lyte-combobox lt-prop-options='[{"name": "Option 1", "value": "1"}, {"name": "Option 2", "value": "2"}]' lt-prop-user-value="name" lt-prop-system-value="value"></lyte-combobox>
 */

 /**
 * @syntax yielded
 * <lyte-combobox>
 *     <template is = 'registerYield'  yield-name = 'headerYield'>
 *         <span>  Option 1   </span>
 *     </template>
 * 	   <template is = 'registerYield' yield-name = 'bodyYield'>
 *             <lyte-drop-body>
 *                 <lyte-drop-item data-value="1">Option 1</lyte-drop-item>
 *                 <lyte-drop-item data-value="2">Option 2</lyte-drop-item>
 *             </lyte-drop-body>
 *      </template>
 * </lyte-combobox>
 */
/**
 * Renders a radiobutton group
 * @component lyte-radiobutton-group
 * @version 3.22.0
 * @methods onBeforeChecked,onBeforeUnchecked,onChecked,onUnchecked,onChanged
 */
Lyte.Component.register("lyte-radiobutton-group", {
_template:"<template tag-name=\"lyte-radiobutton-group\" role=\"group\"> <div class=\"{{concat('lyteRadioBtnGroup',lyteUiCapitalizeName(ltPropAlignment))}}\" role=\"list\"> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"> <lyte-radiobutton lt-prop-label=\"{{item[ltPropUserValue]}}\" lt-prop-value=\"{{item[ltPropSystemValue]}}\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-fire-on-init=\"{{ltPropFireOnInit}}\" lt-prop-label-class=\"{{ltPropLabelClass}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-checked=\"{{unbound(if(ifEquals(item[ltPropSystemValue],ltPropSelected[ltPropSystemValue]),true))}}\" lt-prop-aria-radio=\"{{ltPropAriaAttributes[index]}}\" lt-prop-yield=\"{{ltPropYield}}\" on-before-unchecked=\"{{method('rdbBeforeUnchecked')}}\" on-unchecked=\"{{method('rdbUnchecked')}}\" on-changed=\"{{method('rdbChanged')}}\" on-before-checked=\"{{method('rdbBeforeChecked')}}\" on-checked=\"{{method('rdbChecked')}}\" index=\"{{concat('',index)}}\" data-value=\"{{item[ltPropSystemValue]}}\" role=\"listitem\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" lt-item=\"{{item}}\"></lyte-yield> </template> </template></template> </lyte-radiobutton> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}],
_observedAttributes :["ltPropType","ltPropName","ltPropAlignment","ltPropOptions","ltPropSelected","ltPropLabelClass","ltPropClass","ltPropFireOnInit","ltPropUserValue","ltPropSystemValue","ltPropDisabledList","ltPropFocus","ltPropAriaAttributes","ltPropYield","prevSelectedValue","preventFocusSet","selThroScript"],

	data : function(){
		return {
			/**
			 * @componentProperty {default|primary|secondary|switch|slider} ltPropType
			 * @default default
			 */
			ltPropType : Lyte.attr("string",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'type', 'default' )
			}),
			/**
			 * @componentProperty {string} ltPropName
			 */
			ltPropName : Lyte.attr("string",{"default":undefined}),
			/** 
			 * @componentProperty {horizontal | vertical} ltPropAlignment=vertical
			 */
			ltPropAlignment : Lyte.attr("string",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'alignment', "Vertical" )
			}),
			/**
			 * @componentProperty {array} ltPropOptions
			 * @default []
			 */

			ltPropOptions : Lyte.attr("array",{"default":[]}),
			/** 
			 * @componentProperty {object} ltPropSelected={}
			 */
			ltPropSelected : Lyte.attr("object",{"default":{}}),
			/** 
			 * @componentProperty {string} ltPropLabelClass=""
			 */
			ltPropLabelClass : Lyte.attr("string",{
				"default":  _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'labelClass', "" )
			}),
			/** 
			 * @componentProperty {string} ltPropClass=""
			 */
			ltPropClass: Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'class', "" )
			}),
			/** 
			 * @componentProperty {boolean} ltPropFireOnInit=false
			 */
			ltPropFireOnInit : Lyte.attr("boolean",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton-group', 'fireOnInit', false )
			}),
			/**
			 * @componentProperty {string} ltPropUserValue=name
			 */
			ltPropUserValue : Lyte.attr("string",{"default":"name"}),
			/**
			 * @componentProperty {string} ltPropSystemValue=value
			 */
			ltPropSystemValue : Lyte.attr("string",{"default":"value"}),
			/**
			 * @componentProperty {array} ltPropDisabledList
			 * @default []
			 */
			ltPropDisabledList : Lyte.attr("array",{"default":[]}),
			/** 
			 * @componentProperty {boolean} ltPropFocus=false
			 */
			ltPropFocus : Lyte.attr("boolean",{"default":false}),
			/** 
			 * @componentProperty {array} ltPropAriaAttributes
			 * @default []
			 */
			ltPropAriaAttributes : Lyte.attr("array",{"default":[]}),
			/** 
			 * @componentProperty {boolean} ltPropYield=false
			 */
			ltPropYield : Lyte.attr("boolean",{"default":false}),

			prevSelectedValue : Lyte.attr("object",{"default":{}}),//used to store previous selected value
			preventFocusSet : Lyte.attr("boolean",{"default":false}),
			selThroScript : Lyte.attr("boolean",{"default":false})
			//selThroScript is used to prevent the recursive while setting the ltPropSelected through script.
		}		
	},
	getAllRadiobuttons : function(){
		//return this.$node.querySelectorAll("lyte-radiobutton");
		return $L("lyte-radiobutton",this.$node);
	},
	makeRadiobuttonFocus : function(){//need to be tested
		var radiobuttons = this.getAllRadiobuttons();
		for(var iterator=0;iterator<radiobuttons.length;iterator++){
			var radiobutton = radiobuttons[iterator];
			if(!radiobutton.ltProp("disabled")){
				radiobutton.focus();
				break;
			}
		}
	},
	updateDisabledValue :  function(array,value){
		if(array){
			var comp = this;
			array.forEach(function(item){
				var radiobutton = comp.getRadiobuttonFromSystemValue(item);
				if(radiobutton){
					radiobutton.ltProp("disabled",value);
				}
			});
		}
	},
	radiobuttonStateChange : function(radiobutton,value){
		this.setData("selThroScript",true);
		radiobutton.ltProp("checked",value);
		this.setData("selThroScript",false);
	},
	didConnect : function(){
		this.updateDisabledValue(this.getData("ltPropDisabledList"),true);
		this.$node.updateAriaArray = function(index, value) {
			var ltPropAriaAttributes = this.component.data.ltPropAriaAttributes;
			Lyte.arrayUtils(ltPropAriaAttributes, "replaceAt", index, value)
		};
	},
	didDestroy : function() {
		delete this.$node.updateAriaArray;
	},
	isNotEmpty : function(object){
		var systemValue = this.getData("ltPropSystemValue");
		if(object && object[systemValue] !=  undefined){
			return true;
		}
		return false;
	},
	getRadiobutton : function(radioButtonvalue){
		var systemValue = this.getData("ltPropSystemValue");
		if(this.isNotEmpty(radioButtonvalue)){
			return $L('[data-value="'+radioButtonvalue[systemValue]+'"]',this.$node)[0];
		} 
	},
	getRadiobuttonFromSystemValue : function(systemValue){
		return $L('[data-value="'+systemValue+'"]',this.$node)[0];
	},
	selectedChanges : function(oldValue,newValue){
		var radiobutton =  this.getRadiobutton(newValue);
		this.setPreviousValue(oldValue);
		if(radiobutton){
			this.radiobuttonStateChange(radiobutton,true);
		}
		else if(!this.isNotEmpty(newValue)){
			var oldRadiobutton = this.getRadiobutton(oldValue);
			if(oldRadiobutton){
				this.radiobuttonStateChange(oldRadiobutton,false);
			}
			this.setPreviousValue(newValue);
			/* if the newValue is empty then we also making prevSelectedValue as empty 
			because if they again select radiobutton by click, there prevSelectedValue will be different.
			basically we are reseting the prevSelectedValue.
			*/
		}
	},
	selectedObserver : function(changes){
		if(this.getData("selThroScript")){
			return;
		}
		this.selectedChanges(changes.oldValue,changes.newValue);
	}.observes("ltPropSelected"),
	disabledValueObserver : function(changes){// need to be tested
		this.updateDisabledValue(changes.oldValue,false);
		this.updateDisabledValue(changes.newValue,true);
	}.observes('ltPropDisabledList'),
	focusObserver : function(){
		var focus = this.getData("ltPropFocus");
		if(focus){
			this.makeRadiobuttonFocus();
		}
		this.setData("ltPropFocus",false);
	}.observes("ltPropFocus").on('didConnect'),
	getPreviousValue : function(bypass){
		if(this.getData("selThroScript") || !bypass){
			/* Here if the selThroScript is true then the prevSelectedValue is setted 
			through selectedObserver so we can use current prevSelectedValue
			if bypass is true, the prevSelectedValue is not yet set and 
			considering the ltPropSelcted as previous value.
			In all cases,if the selThroScript is true then the value is setted and
			we can get the currentValues of prevSelectedValue and ltPropSelected respectively.
			*/
			return this.getData("prevSelectedValue");
		}
		return this.getSelectedValue();
	},
	setPreviousValue : function(value){
		if(value){
			this.setData("prevSelectedValue",value);
		}
		else if(!this.getData("selThroScript")){
			//Here if selThroScript is false, we setting current ltPropSelected as prevSelectedValue.
			//This will be done before updating the current selected value.
			this.setData("prevSelectedValue",this.getSelectedValue());
		}
	},
	getSelectedValue : function(radiobutton){
		if(this.getData("selThroScript") || !radiobutton){
			return this.getData("ltPropSelected");
		}
		return this.getCurrentSelectedValue(radiobutton);
	},
	setSelectedValue : function(radiobutton){
		if(!this.getData("selThroScript")){
			var oldValue = this.getData("ltPropSelected");
			var newValue = this.getCurrentSelectedValue(radiobutton);
			var systemValue = this.data.ltPropSystemValue;
			if(!oldValue || oldValue[systemValue] != newValue[systemValue]){
				//Above check is used to prevent the from setting the value in ltPropOnInit
				this.setData("selThroScript",true);
				this.setData("ltPropSelected",this.getCurrentSelectedValue(radiobutton));
				this.setData("selThroScript",false);
			}
		}
	},
	getCurrentSelectedValue : function(radiobutton){
		var options = this.getData("ltPropOptions");
		var index  = radiobutton.getAttribute("index");
		return options[index];
	},
	rollbackSelectedValue : function(){
		if(this.getData("selThroScript")){
			this.setData("ltPropSelected",this.getPreviousValue());
		}
	},
	methods : {
		rdbBeforeUnchecked : function(input,component){
			var previousValue = this.getPreviousValue(true);
			var prevRadiobutton = this.getRadiobutton(previousValue);
			if(this.getMethods('onBeforeUnchecked')){
				if(this.executeMethod('onBeforeUnchecked', this, previousValue, prevRadiobutton) === false){
					this.rollbackSelectedValue();
					return false;
				}
			}
		},
		rdbUnchecked : function(input,component){
			this.setPreviousValue();
			var previousValue = this.getPreviousValue();
			var prevRadiobutton = this.getRadiobutton(previousValue);
			if(this.getMethods('onUnchecked')){
				this.executeMethod('onUnchecked', this, previousValue, prevRadiobutton);
			}
		},
		rdbBeforeChecked : function(input,component){
			if(this.getMethods('onBeforeChecked')){
			 	if(this.executeMethod('onBeforeChecked', this, this.getSelectedValue(component.$node), component.$node) === false){
					this.rollbackSelectedValue();
					return false;
				}
			}
		},
		rdbChecked : function(input,component){
			var radiobutton = component.$node;
			this.setSelectedValue(radiobutton);
			if(this.getMethods('onChecked')){
				this.executeMethod('onChecked', this, this.getSelectedValue(), radiobutton);
			}
		},
		rdbChanged : function(input,component){
			var prevSelectedValue = this.getPreviousValue(),
			curSelectedValue =  this.getSelectedValue(),
			prevRadiobutton = this.getRadiobutton(prevSelectedValue),
			curRadioButton =  this.getRadiobutton(curSelectedValue);
			if(this.getMethods('onChanged')){
				this.executeMethod('onChanged', this, prevSelectedValue, curSelectedValue, prevRadiobutton, curRadioButton);
			}
		}
	}
});
//TODO: window._lyteUiUtils.escape() check.
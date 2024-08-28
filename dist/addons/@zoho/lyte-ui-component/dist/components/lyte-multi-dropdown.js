/**
 * Renders a multi-dropdown
 * @component lyte-multi-dropdown
 * @version 3.0.0
 * @methods onShow,onBeforeShow,onScroll,onPositionChanged,onChange,beforeSelect,onHide,onBeforeHide,onAdd,onBeforeAdd,onRemove,onBeforeRemove,onOptionSelected
 * @dependencies lyte-dropdown,lyte-checkbox,lyte-text,lyte-hovercard
 */

Lyte.Component.register("lyte-multi-dropdown", {
_template:"<template tag-name=\"lyte-multi-dropdown\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==','checkbox')}}\"><template case=\"true\"> <lyte-dropdown lt-prop-options=\"{{ltPropData}}\" lt-prop-user-value=\"{{ltPropUserValue}}\" lt-prop-system-value=\"{{ltPropSystemValue}}\" lt-prop-selected-list=\"{{ltPropSelected}}\" lt-prop-type=\"multiple\" lt-prop-no-result=\"\" on-before-add=\"{{method('defaultBeforeAdd')}}\" on-add=\"{{method('defaultAdd')}}\" on-option-selected=\"{{method('onOptionSelected')}}\" on-show=\"{{method('onShow')}}\" on-before-show=\"{{method('onBeforeShow')}}\" on-hide=\"{{method('onHide')}}\" on-before-hide=\"{{method('onBeforeHide')}}\" on-before-remove=\"{{method('onBeforeRemove')}}\" on-position-changed=\"{{method('onPositionChanged')}}\" before-select=\"{{method('beforeSelect')}}\" on-change=\"{{method('onChange')}}\" on-scroll=\"{{method('onScroll')}}\" on-search=\"{{method('onSearch')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"><lyte-yield yield-name=\"yield\"></lyte-yield></template><template case=\"false\"><lyte-drop-button> <span class=\"lyteDropPlaceholderMultiple\">Select value</span> <div class=\"lyteMultiDropSelectedText\"> <template is=\"if\" value=\"{{ltPropShowCount}}\"><template case=\"true\"> <lyte-text lt-prop-array=\"{{multiTextArray}}\" lt-prop-hovercard=\"{&quot;placement&quot;:&quot;right&quot;}\" lt-prop-suffix=\" and <span class ='prefixClass'>{0} others</span>\" lt-prop-min-count=\"1\"></lyte-text> </template><template case=\"false\"> {{multiText}} </template></template> </div> </lyte-drop-button></template></template> <lyte-hovercard lt-prop-auto-show=\"true\" lt-prop-max-width=\"250px\" lt-prop-placement=\"right\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"lyteMultiDropdownHovercardContent\"> {{multiTextForHovercard}} </lyte-hovercard-content> </template> </lyte-hovercard> <lyte-drop-box class=\"lyteMultiDropdownCheckBoxTypeDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subItem\" index=\"indexval\"> <lyte-drop-item data-value=\"{{subItem[ltPropSystemValue]}}\"> <lyte-checkbox lt-prop-label=\"{{subItem[ltPropUserValue]}}\" on-unchecked=\"{{method('defaultBeforeUnchecked')}}\"></lyte-checkbox> </lyte-drop-item> </template> </lyte-drop-group> </template><template case=\"false\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> <lyte-checkbox lt-prop-label=\"{{item[ltPropUserValue]}}\" on-unchecked=\"{{method('defaultBeforeUnchecked')}}\"></lyte-checkbox> </lyte-drop-item> </template></template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"> <lyte-dropdown lt-prop-type=\"multiple\" lt-prop-options=\"{{ltPropData}}\" lt-prop-user-value=\"{{ltPropUserValue}}\" lt-prop-system-value=\"{{ltPropSystemValue}}\" lt-prop-selected-list=\"{{ltPropSelected}}\" lt-prop-no-result=\"\" on-before-add=\"{{method('multiBeforeAdd')}}\" on-add=\"{{method('multiAdd')}}\" on-option-selected=\"{{method('onOptionSelected')}}\" on-show=\"{{method('onShow')}}\" on-before-show=\"{{method('onBeforeShow')}}\" on-hide=\"{{method('onHide')}}\" on-before-hide=\"{{method('onBeforeHide')}}\" on-before-remove=\"{{method('onBeforeRemove')}}\" on-position-changed=\"{{method('onPositionChanged')}}\" before-select=\"{{method('beforeSelect')}}\" on-change=\"{{method('onChange')}}\" on-scroll=\"{{method('onScroll')}}\" on-search=\"{{method('onSearch')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"><lyte-yield yield-name=\"yield\"></lyte-yield></template><template case=\"false\"><lyte-drop-button> <span class=\"lyteDropPlaceholderMultiple\">Select value</span> <div class=\"lyteMultiDropSelectedText\"> <template is=\"if\" value=\"{{ltPropShowCount}}\"><template case=\"true\"> <lyte-text lt-prop-array=\"{{multiTextArray}}\" lt-prop-hovercard=\"{&quot;placement&quot;:&quot;right&quot;}\" lt-prop-suffix=\" and <span class ='prefixClass'>{0} others</span>\" lt-prop-min-count=\"1\"></lyte-text> </template><template case=\"false\"> {{multiText}} </template></template> </div> </lyte-drop-button></template></template> <lyte-hovercard lt-prop-auto-show=\"true\" lt-prop-max-width=\"250px\" lt-prop-placement=\"right\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"lyteMultiDropdownHovercardContent\"> {{multiTextForHovercard}} </lyte-hovercard-content> </template> </lyte-hovercard> <lyte-drop-box class=\"lyteMultiDropdownDropbox\" __click=\"{{action('multiRemoveitem')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subItem\" index=\"indexval\"> <lyte-drop-item data-value=\"{{subItem[ltPropSystemValue]}}\">{{subItem[ltPropUserValue]}}</lyte-drop-item> </template> </lyte-drop-group> </template><template case=\"false\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> {{item[ltPropUserValue]}} </lyte-drop-item> </template></template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1,1]},{"type":"for","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[5,1]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"attr","position":[5,1,1]},{"type":"for","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[5,1]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropData","ltPropMaxCount","ltPropSelected","ltPropYield","ltPropType","multiTextArray","multiText","multiTextForHovercard","numInText","ltPropUserValue","ltPropSystemValue","ltPropShowCount"],


	data : function(){
		return {

				/**
				 * @componentProperty {array} ltPropData
				 * @default []
				 * @version 3.0.0
				 */

				'ltPropData': Lyte.attr('array',{'default': []}),

				/**
				 * @componentProperty {number} ltPropMaxCount
				 * @default undefined
				 * @version 3.0.0
				 */

				'ltPropMaxCount': Lyte.attr('number', {'default' : undefined}),

				/**
				 * @componentProperty {array} ltPropSelected
				 * @default []
				 * @version 3.0.0
				 */

				'ltPropSelected': Lyte.attr('array',{'default':[]}),

				/**
				 * @componentProperty {boolean} ltPropYield
				 * @default false
				 * @version 3.0.0
				 */

				'ltPropYield': Lyte.attr('boolean',{'default': false}),

				/**
				 * @componentProperty {string} ltPropType
				 * @default 'default'
				 * @version 3.0.0
				 */

				'ltPropType': Lyte.attr('string',{ "default": 'default'}),

				'multiTextArray': Lyte.attr('array',{'default': []}),

				'multiText': Lyte.attr('string',{'default':""}),

				// 'ltPropClear': Lyte.attr('boolean',{'default':true}),

				'multiTextForHovercard': Lyte.attr('string',{'default':""}),
				
				'numInText': Lyte.attr('number',{'default': 0}),

				/**
				 * @componentProperty {string} ltPropUserValue
				 * @default ''
				 * @version 3.0.0
				 */

				'ltPropUserValue': Lyte.attr('string',{'default':''}),

				/**
				 * @componentProperty {string} ltPropSystemValue
				 * @default ''
				 * @version 3.0.0
				 */

				'ltPropSystemValue': Lyte.attr('string',{'default':''}),

				/**
				 * @componentProperty {boolean} ltPropShowCount
				 * @default false
				 * @version 3.0.0
				 */

				'ltPropShowCount': Lyte.attr('boolean',{'default':false})
		}		
	},
	actions: {
		multiRemoveitem: function(){
			if(event.target.tagName=="LYTE-DROP-ITEM" && event.target.classList.contains('lyteDropdownActive')){
				if(event && event.stopPropagation ){
					event.stopPropagation();
				}

	
				let selList=$L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList');
					let currValue=(event.target.getAttribute('data-value'));
					let itemToBeRemoved;
					selList.forEach(function(listItem,index){
						if(listItem.value===currValue){
								itemToBeRemoved=listItem;
								ind=index;
						};
					});
				if(itemToBeRemoved){
					Lyte.arrayUtils($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList'),'removeObjects',itemToBeRemoved);
				}

				let namevalueToRemove=event.target.innerText.trim();
					for( let i = 0; i < this.getData( 'multiTextArray' ).length; i++ ) {
						if( this.getData( 'multiTextArray' )[ i ] == namevalueToRemove ) {
							Lyte.arrayUtils( this.getData( 'multiTextArray' ), 'removeAt', i, 1 );
							break;
						}
					}
					let text=this.getData('multiTextArray').join(", ");

					this.setData('multiText',text);
					this.setData('multiTextForHovercard',text); 
					if(!this.getData('ltPropShowCount')){
						let buttonWidth=$L(this.$node).find('lyte-drop-button')[0].offsetWidth;
						if(parseInt(buttonWidth)>=330){
							$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','true');
							// this.checkForCount();
						}
						else{
							$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','');
						}
					}

					let dropCtxt=$L(this.$node).find('lyte-dropdown')[0].component;

					if(selList.length==0){
						$L(this.$node).find('.lyteDropPlaceholderMultiple').css('display','inline');
					}
					if(this.getMethods('onRemove')){
						this.executeMethod('onRemove',event,currValue,dropCtxt.getData('ltPropSelected'),dropCtxt,'click',$L(this.$node).find('span.multiText')[0]);
					}

				
			}
		},
		clearAll: function(){
			while($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList').length>0){
				Lyte.arrayUtils($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList'),'pop');
				Lyte.arrayUtils(this.getData('multiTextArray'),'pop');
			};
			this.setData('multiText','');
		}
	},
	
	methods : {

		defaultBeforeAdd: function(event,selected,ltSelected,cthis,item){

			if(event.target.tagName==="LYTE-DROP-ITEM"){
				if($L(event.target).find('lyte-checkbox')[0].getData('ltPropChecked')){
					$L(event.target).find('lyte-checkbox')[0].setData('ltPropChecked','false');
					return false;
				}
				else
				{
					$L(item).find('lyte-checkbox')[0].setData('ltPropChecked','true') ;
				}
			}

			let selList=cthis.$node.getData('ltPropSelectedList');
			let count=(selList.length);

			if(count>=parseInt(this.getData('ltPropMaxCount'))){
				$L(item).find('lyte-checkbox')[0].setData('ltPropChecked','false') ;
				return false;
			}
			if(this.getMethods('onBeforeAdd')){
				this.executeMethod('onBeforeAdd',event,selected,ltSelected,cthis,item);
			}
		},
		defaultAdd: function(event,selected,ltSelected,cthis,item){

			$L(this.$node).find('.lyteDropPlaceholderMultiple').css('display','none');
			
			let namevalueToAdd=$L(item).find('lyte-checkbox')[0].getAttribute('lt-prop-label');			
			Lyte.arrayUtils( this.getData( 'multiTextArray' ), 'push', namevalueToAdd );
			let text=this.getData('multiTextArray').join(', ');
			this.setData('multiText',text);
			this.setData('multiTextForHovercard',text);

			if(!this.getData('ltPropShowCount')){
				let buttonWidth=$L(cthis.$node).find('lyte-drop-button')[0].offsetWidth;
				if(parseInt(buttonWidth)>=330){
					$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','true');
					// this.checkForCount();
				}
				else{
					$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','');
				}
			}

			let nextElement=item.nextElementSibling,parent=$L(cthis.childComp).find('lyte-drop-body')[0];
			if(nextElement && nextElement.classList &&nextElement.classList.contains('lyteDropdownSelection')){
				nextElement.classList.remove('lyteDropdownSelection');
				item.classList.add('lyteDropdownSelection');
			}

			if(this.getMethods('onAdd')){ 
				this.executeMethod('onAdd',event,selected,ltSelected,cthis,item);
			}
		},

		defaultBeforeUnchecked: function(input,cthis,event,action){

			if(event && event.stopPropagation){
				event.stopPropagation();
			}

			
			let selList=$L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList');
			let currValue=($L(cthis.$node).closest('lyte-drop-item')[0].getAttribute('data-value'));
			let itemToBeRemoved;
			selList.forEach(function(listItem,index){
				if(listItem.value===currValue){
						itemToBeRemoved=listItem;
						ind=index;
				};
			});

			if(itemToBeRemoved){
				Lyte.arrayUtils($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList'),'removeObjects',itemToBeRemoved);
			}

			let namevalueToRemove=cthis.$node.getAttribute('lt-prop-label');
			let calbckItem=$L(cthis.$node).closest('lyte-drop-item')[0];

			for( let i = 0; i < this.getData( 'multiTextArray' ).length; i++ ) {
				if( this.getData( 'multiTextArray' )[ i ] == namevalueToRemove ) {
					Lyte.arrayUtils( this.getData( 'multiTextArray' ), 'removeAt', i, 1 );
					break;
				}
			}
			let text=this.getData('multiTextArray').join(", ");
			this.setData('multiText',text);
			this.setData('multiTextForHovercard',text); 

			if(!this.getData('ltPropShowCount')){
				let buttonWidth=$L(this.$node).find('lyte-drop-button')[0].offsetWidth;
				if(parseInt(buttonWidth)>=330){
					$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','true');
					// this.checkForCount();
				}
				else{
					$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','');
				}
			}

			let dropCtxt=$L(this.$node).find('lyte-dropdown')[0].component;

			//to stop calling callback when item is not even added,
			// but control is here because of unchecking the checkbox when manually unchecking the box due to reaching maxcount.
			let count=(selList.length);
			if(count>=parseInt(this.getData('ltPropMaxCount'))){
				return ;
			}
			if(count==0){
				$L(this.$node).find('.lyteDropPlaceholderMultiple').css('display','inline');
			}
			
			//when not clicked in label or checkbox of drop-item the event attribute becomes empty
			if(this.getMethods('onRemove')){
				this.executeMethod('onRemove',event,currValue,dropCtxt.getData('ltPropSelected'),dropCtxt,'click',calbckItem);
			}

		},

		multiBeforeAdd: function(event,selected,ltSelected,cthis,item){
			let selList=cthis.$node.getData('ltPropSelectedList');
			let count=(selList.length);

			if(count>=parseInt(this.getData('ltPropMaxCount'))){
				return false;
			}

			if(this.getMethods('onBeforeAdd')){ 
				this.executeMethod('onBeforeAdd',event,selected,ltSelected,cthis,item);
			}
			
		},

		multiAdd: function(event,selected,ltSelected,cthis,item){

			$L(this.$node).find('.lyteDropPlaceholderMultiple').css('display','none');

			let namevalueToAdd=item.innerText.trim();
			Lyte.arrayUtils( this.getData( 'multiTextArray' ), 'push', namevalueToAdd );
			let text=this.getData('multiTextArray').join(', ');
			this.setData('multiText',text);
			this.setData('multiTextForHovercard',text);


			let nextElement=item.nextElementSibling;
			if(nextElement && nextElement.classList && nextElement.classList.contains('lyteDropdownSelection')){
				nextElement.classList.remove('lyteDropdownSelection');
				item.classList.add('lyteDropdownSelection');
			}

			if(!this.getData('ltPropShowCount')){
				let buttonWidth=$L(cthis.$node).find('lyte-drop-button')[0].offsetWidth;
				if(parseInt(buttonWidth)>=330){
					$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','true');
					// this.checkForCount();
				}
				else{
					$L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','');
				}
			}

			if(this.getMethods('onAdd')){ 
				this.executeMethod('onAdd',event,selected,ltSelected,cthis,item);
			}

		},

		onOptionSelected: function(){},
		onShow: function(){},
		onBeforeShow: function(){},
		onHide: function(){},
		onBeforeHide: function(){},
		onBeforeRemove: function(){},
		onPositionChanged: function(){},
		beforeSelect: function(){},
		onChange: function(){},
		onScroll: function(){},
		onSearch: function(){}
		
	},

	didConnect: function(){

		let cthis=this;
		if(!_lyteUiUtils.multiDropGlobe){
			_lyteUiUtils.multiDropGlobe={'ind':0};
		}
		else{
			_lyteUiUtils.multiDropGlobe.ind+=1;
		}

		$L(this.$node).find('lyte-drop-button')[0].setAttribute('id','lyteMultiDropButton'+_lyteUiUtils.multiDropGlobe.ind);
		$L(this.$node).find('lyte-hovercard')[0].setAttribute('lt-prop-origin-elem','#lyteMultiDropButton'+_lyteUiUtils.multiDropGlobe.ind);

			if(this.getData('ltPropSelected').length>0){

				let arr=Array.from($L(this.$node).find('lyte-dropdown')[0].querySelectorAll('lyte-drop-item'));
				let arrOfKeys=[];
				$L(this.$node).find('.lyteDropPlaceholderMultiple').css('display','none');
				cthis.getData('ltPropSelected').forEach(function(item){
					arrOfKeys.push(item[cthis.getData('ltPropSystemValue')]);
				});
				if(this.getData('ltPropType')=='checkbox'){
					arr.forEach(function(item){
						let checkbox=$L(item).find('lyte-checkbox')[0];
						let namevalueToAdd=checkbox.getAttribute('lt-prop-label');
						let datavalueToAdd=item.getAttribute('data-value');
						if(arrOfKeys.includes(datavalueToAdd) ){
									checkbox.setData('ltPropChecked','true');
									Lyte.arrayUtils( cthis.getData( 'multiTextArray' ), 'push', namevalueToAdd );

						}
					});
				}
				else{
					arr.forEach(function(item){
						let namevalueToAdd=item.innerText.trim();
						let datavalueToAdd=item.getAttribute('data-value');
						if(arrOfKeys.includes(datavalueToAdd) ){
									Lyte.arrayUtils( cthis.getData( 'multiTextArray' ), 'push', namevalueToAdd );

						}
					});
				}
				let text=this.getData('multiTextArray').join(', ');
				this.setData('multiText',text);
				this.setData('multiTextForHovercard',text);
			}

	}
	//to manually replace functionality of lyte-text
	// checkForCount: function(){
	// 	if(this.getData('ltPropShowCount')){
	// 		let dupMultiTextArray=Array.from(this.getData('multiTextArray'));
	// 		while($L(this.$node).find('lyte-drop-button')[0].offsetWidth>=330){
	// 			dupMultiTextArray.pop();
	// 			this.setData('multiText',dupMultiTextArray.join(",")+'dummy text.....');
	// 		}
	// 		let dupText=dupMultiTextArray.join(', ');
	// 		this.setData('numInText',($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList').length)-(dupMultiTextArray.length));
	// 		this.setData('multiText',dupText+`  &${this.getData('numInText')} more...`);
	// 	}
	// }

	
});



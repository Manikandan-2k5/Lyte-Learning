/**
 * Renders a progressbar
 * @component lyte-progressbar
 * @version 1.0.0
 */
Lyte.Component.register('lyte-progressbar', {
_template:"<template tag-name=\"lyte-progressbar\"> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropType,'circle')}}\"><template case=\"true\"> <div class=\"lyteProgressBar lyteCircle\" style=\"{{lyteUiConcat('width:',lyteUiSetWH(ltPropRadius),'px; height:',lyteUiSetWH(ltPropRadius),'px;')}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\" aria-live=\"polite\"> <div class=\"lyteCircleType\"> <svg class=\"svgValueEle\" width=\"{{lyteUiSetWH(ltPropRadius)}}\" height=\"{{lyteUiSetWH(ltPropRadius)}}\"> <circle style=\"{{lyteUiConcat('transition:','stroke-dashoffset ',duration,' ',timingfn,';')}} \" class=\"ltProgressCircle\" cx=\"{{ltPropRadius}}\" cy=\"{{ltPropRadius}}\" r=\"{{lyteUiSetRadius(ltPropRadius,ltPropStroke)}}\" fill=\"none\" stroke=\"#DCE0E3\" stroke-width=\"{{ltPropStroke}}\"></circle> <circle style=\"{{lyteUiConcat('transition:','stroke-dashoffset ',duration,' ',timingfn,';')}}\" class=\" ltProgressFillCircle\" cx=\"{{ltPropRadius}}\" cy=\"{{ltPropRadius}}\" r=\"{{lyteUiSetRadius(ltPropRadius,ltPropStroke)}}\" fill=\"none\" stroke=\"{{ltPropBackground}}\" stroke-width=\"{{ltPropStroke}}\" stroke-dasharray=\"{{lyteUiSetDashArray(ltPropRadius,ltPropStroke)}}\" stroke-dashoffset=\"{{lyteUiSetOffset(ltPropRadius,ltPropStroke,percentage)}}\"></circle> </svg> <template is=\"if\" value=\"{{ltPropShowPercentage}}\"><template case=\"true\"> <svg width=\"{{lyteUiSetWH(ltPropRadius)}}\" height=\"{{lyteUiSetWH(ltPropRadius)}}\" style=\"transform:{{lyteUiTextTransform(ltPropRadius)}}\" viewBox=\"{{lyteUiConcat('0 ','0 ',lyteUiSetWH(ltPropRadius),' ',lyteUiSetWH(ltPropRadius))}}\" fill=\"{{if(ltPropLabelColor,ltPropLabelColor,'#333')}}\" aria-hidden=\"true\"> <text font-size=\"{{if(ltPropFontSize,ltPropFontSize,'1.5rem')}}\" text-anchor=\"middle\" dy=\".2em\" x=\"50%\" y=\"50%\"> {{lyteUiProgressbarLabel(ltPropLabel,percentageDisplay,ltPropPercentage)}} </text> </svg> </template></template> </div> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIfEquals(ltPropType,'stacked')}}\"><template case=\"true\"> <div class=\"{{lyteUiConcat('lyteProgressBar',' lyteHorizontal',' lyteStacked')}} \" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\"> <template is=\"for\" items=\"{{chunks}}\" item=\"item\" index=\"index\"> <span class=\"lyteProgressStatusStack\" style=\"{{lyteUiConcat('width: ','0% ;','transition: ','width ',duration,' ',timingfn,';','background:',lyteUiGetStackValue(ltPropStack,index,'color'),';')}}\"> <template is=\"if\" value=\"{{lyteUiGetStackValue(ltPropStack,index,'animated')}}\"><template case=\"true\"> <span class=\"ltPropProgressAnimated progressMovingObj\"></span> </template></template> <template is=\"if\" value=\"{{ltPropShowPercentage}}\"><template case=\"true\"> <span case=\"true\" class=\"lyteProgressPercentageStack\" style=\"{{lyteUiConcat('line-height:',ltPropHeight,'; font-size: ',if(ltPropFontSize,ltPropFontSize,'12px'),'; color: ',if(lyteUiGetStackValue(ltPropStack,index,'labelColor'),lyteUiGetStackValue(ltPropStack,index,'labelColor'),'#fff'),';')}}\" aria-hidden=\"true\"> {{lyteUiProgressbarLabel(lyteUiGetStackValue(ltPropStack,index,'label'),'')}} </span> </template></template> </span> </template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIfEquals(ltPropType,'vertical')}}\"><template case=\"true\"> <div class=\"lyteProgressBar lyteVertical\" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\"> <span class=\"{{lyteUiConcat('lyteProgressStatusVertical ',ltPropDirection)}}\" style=\"{{lyteUiConcat('height: ',percentage,'% ;','transition:','height ',duration,' ',timingfn,';','background: ',ltPropBackground,';','display: block')}}\"> <template is=\"if\" value=\"{{ltPropShowPercentage}}\"><template case=\"true\"> <span case=\"true\" class=\"lyteProgressPercentage\" style=\"{{lyteUiConcat('line-height:',ltPropHeight,'; font-size: ',if(ltPropFontSize,ltPropFontSize,'12px'),'; color: ',if(ltPropLabelColor,ltPropLabelColor,'#fff'),';')}}\" aria-hidden=\"true\"> {{lyteUiProgressbarLabel(ltPropLabel,percentageDisplay,ltPropPercentage)}} </span> </template></template> </span> </div> </template><template case=\"false\"> <div class=\"{{lyteUiConcat('lyteProgressBar',' lyteHorizontal',if(ltPropIndeterminate,' lyteIndeterminate',''))}} \" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropAnimated,'!'),'&amp;&amp;',ltPropIndeterminate)}}\"><template case=\"true\"> <span class=\"inc\" style=\"{{lyteUiConcat('position: absolute; height: 100%; background: ',ltPropProgressFillColor)}}\"></span> <span class=\"dec\" style=\"{{lyteUiConcat('position: absolute; height: 100%; background: ',ltPropProgressFillColor)}}\"></span> </template><template case=\"false\"> <span class=\"lyteProgressStatus\" style=\"{{lyteUiConcat('width: ',percentage,'% ;','transition: ','width ',duration,' ',timingfn,';','background:',ltPropBackground)}}\"> <template is=\"if\" value=\"{{ltPropAnimated}}\"><template case=\"true\"> <span class=\"ltPropProgressAnimated progressMovingObj\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropIndeterminate,'!'),'&amp;&amp;',ltPropShowPercentage)}}\"><template case=\"true\"> <span case=\"true\" class=\"lyteProgressPercentage\" style=\"{{lyteUiConcat('line-height:',ltPropHeight,'; font-size: ',if(ltPropFontSize,ltPropFontSize,'12px'),'; color: ',if(ltPropLabelColor,ltPropLabelColor,'#fff'),';')}}\" aria-hidden=\"true\"> {{lyteUiProgressbarLabel(ltPropLabel,percentageDisplay,ltPropPercentage)}} </span> </template></template> </span> </template></template> </div> </template></template></template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'",{"type":"helper","value":{"name":"lyteUiSetWH","args":["ltPropRadius"]}},"'px; height:'",{"type":"helper","value":{"name":"lyteUiSetWH","args":["ltPropRadius"]}},"'px;'"]}}}},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'transition:'","'stroke-dashoffset '","duration","' '","timingfn","';'"]}}}},{"type":"attr","position":[1,1,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'transition:'","'stroke-dashoffset '","duration","' '","timingfn","';'"]}}}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'transform:'",{"type":"helper","value":{"name":"lyteUiTextTransform","args":["ltPropRadius"]}}]}}}},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width: '","'0% ;'","'transition: '","'width '","duration","' '","timingfn","';'","'background:'",{"type":"helper","value":{"name":"lyteUiGetStackValue","args":["ltPropStack","index","'color'"]}},"';'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'line-height:'","ltPropHeight","'; font-size: '",{"type":"helper","value":{"name":"if","args":["ltPropFontSize","ltPropFontSize","'12px'"]}},"'; color: '",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"lyteUiGetStackValue","args":["ltPropStack","index","'labelColor'"]}},{"type":"helper","value":{"name":"lyteUiGetStackValue","args":["ltPropStack","index","'labelColor'"]}},"'#fff'"]}},"';'"]}}}},{"type":"text","position":[1,1]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}}},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'height: '","percentage","'% ;'","'transition:'","'height '","duration","' '","timingfn","';'","'background: '","ltPropBackground","';'","'display: block'"]}}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'line-height:'","ltPropHeight","'; font-size: '",{"type":"helper","value":{"name":"if","args":["ltPropFontSize","ltPropFontSize","'12px'"]}},"'; color: '",{"type":"helper","value":{"name":"if","args":["ltPropLabelColor","ltPropLabelColor","'#fff'"]}},"';'"]}}}},{"type":"text","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'position: absolute; height: 100%; background: '","ltPropProgressFillColor"]}}}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'position: absolute; height: 100%; background: '","ltPropProgressFillColor"]}}}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width: '","percentage","'% ;'","'transition: '","'width '","duration","' '","timingfn","';'","'background:'","ltPropBackground"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'line-height:'","ltPropHeight","'; font-size: '",{"type":"helper","value":{"name":"if","args":["ltPropFontSize","ltPropFontSize","'12px'"]}},"'; color: '",{"type":"helper","value":{"name":"if","args":["ltPropLabelColor","ltPropLabelColor","'#fff'"]}},"';'"]}}}},{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropProgressFillColor","ltPropCompletedFillColor","ltPropWidth","ltPropHeight","ltPropRadius","ltPropStroke","ltPropValueCopy","ltPropAnimated","ltPropShowPercentage","ltPropProgressProperty","ltPropLabel","ltPropFontSize","ltPropLabelColor","ltPropIndeterminate","ltPropStack","ltPropDirection","ltPropPercentage","lyteUnbound","ltPropAriaLabel","percentage","duration","timingfn","percentageDisplay","checkIndeterminate","chunks","prevValues"],

	init: function () {
		if (!(this.getData('ltPropWidth'))) {
			this.setData('ltPropWidth', this.getData('ltPropType') == "vertical" ? '20px' : '100%');
		}
		if (!(this.getData('ltPropHeight'))) {
			this.setData('ltPropHeight', this.getData('ltPropType') == "vertical" ? '200px' : '12px');
		}
	},
	didConnect: function () {
		// this.setData('ltPropValueCopy',this.getData('ltPropValue'));
		if (this.getData('ltPropIndeterminate')) {
			this.setData('checkIndeterminate', this.getData('checkIndeterminate') + 1);
		}
		else {
			if (this.getData('ltPropType') == "stacked") {
				this.stackId = [];
			}
			$L.fastdom.mutate(this.setBackground.bind(this));
		}

		this.$node.value = function(value){
			this.component.data.ltPropProgressProperty.value = value;
			this.component.ChangePercentage();
			var radius = this.component.data.ltPropRadius;
			var stroke =this.component.data.ltPropStroke;
			var r = (radius)-(stroke)/2;
			var strokeDash =  2 * 3.14159 * r;
			var circle = this.querySelector('.ltProgressFillCircle');
			var per = strokeDash * (1 - (value)/100);
			circle.setAttribute('stroke-dashoffset', per);
		}
	},
	
	setChunks: function () {
		if (this.getData('ltPropType') != "stacked") {
			return;
		}
		var chunks = this.getData('chunks');
		var prop = this.getData('ltPropStack');
		var prevValues = this.getData('prevValues');
		if (chunks.length != prop.length) {
			chunks = [];
			for (var i = 0; i < prop.length; i++) {
				chunks.push(i);
			}
			this.setData('chunks', chunks);
			if (prevValues.length == 0) {
				for (var i = 0; i < prop.length; i++) {
					prevValues.push(0);
				}
			}
			else if (prevValues.length > prop.length) {
				prevValues.splice(prop.length);
			}
			else if (prevValues < prop.length) {
				for (var i = prevValues.length; i < prop.length; i++) {
					prevValues.push(0);
				}
			}
			this.setData('prevValues', prevValues);
		}
	}.observes('ltPropStack.[]').on('init'),
	data: function () {
		return {
			// ltPropValue : Lyte.attr("string",{"default":'0'}),

			/**
						 * @componentProperty {string} ltPropType
						 * @version 1.0.0
						 * @default bar
						 * @options bar,circle,stacked,vertical
						 */
			ltPropType: Lyte.attr("string", { "default": 'bar' }),	//circle,vertical,stacked,bar

			/**
						 * @componentProperty {colorString} ltPropProgressFillColor
						 * @version 1.0.0
						 * @default #42a2eb
						 */
			ltPropProgressFillColor: Lyte.attr("string", { "default": '#42a2eb' }),

			/**
						 * @componentProperty {colorString} ltPropCompletedFillColor
						 * @version 1.0.0
						 * @default #3fbd5f
						 */
			ltPropCompletedFillColor: Lyte.attr("string", { "default": '#3fbd5f' }),

			/**
						 * @componentProperty {string} ltPropWidth
						 * @version 1.0.0
						 * @default 100%
						 * @suffix px,pt,cm,mm,vh,vm,em,%
						 */
			ltPropWidth: Lyte.attr("string"/*,{"default":'100%'}*/),

			/**
						 * @componentProperty {string} ltPropHeight
						 * @version 1.0.0
						 * @default 12px
						 * @suffix px,pt,cm,mm,vh,vm,em
						 */
			ltPropHeight: Lyte.attr("string"/*,{"default":'12px'}*/),

			/**
						 * @componentProperty {string} ltPropRadius
						 * @version 1.0.0
						 * @default 50
						 */
			ltPropRadius: Lyte.attr("string", { "default": '50' }),

			/**
						 * @componentProperty {string} ltPropStroke
						 * @version 1.0.0
						 * @default 5
						 */
			ltPropStroke: Lyte.attr("string", { "default": '5' }),

			/**
						 * @experimental ltPropValueCopy
						 */
			ltPropValueCopy: Lyte.attr("string", { "default": '0' }),

			/**
						 * @componentProperty {boolean} ltPropAnimated
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			ltPropAnimated: Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropShowPercentage
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			ltPropShowPercentage: Lyte.attr("boolean", { "default": true }),
			/**
			 * @typedef {object} progressProperty
			 * @property {string} value
			 * @property {string} duration
			 */
			/**
						 * @componentProperty {object} ltPropProgressProperty
						 * @version 1.0.0
						 * @default {"value":"0","duration" : "0s"}
						 */
			ltPropProgressProperty: Lyte.attr('object', { "default": { "value": "0", "duration": "0s" } }),

			/**
						 * @componentProperty {string} ltPropLabel
						 * @version 1.0.0
						 */
			ltPropLabel: Lyte.attr("string"),

			/**
						 * @componentProperty {string} ltPropFontSize
						 * @version 2.2.8
						 */
			ltPropFontSize: Lyte.attr("string"),

			/**
						 * @componentProperty {colorString} ltPropLabelColor
						 * @version 3.1.0
						 */
			ltPropLabelColor: Lyte.attr("string"),

			/**
						 * @experimental ltPropIndeterminate
						 */
			ltPropIndeterminate: Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {array} ltPropStack
						 * @version 3.1.0
						 */
			ltPropStack: Lyte.attr("array", { "default": [] }),

			/**
						 * @componentProperty {up|down} ltPropDirection
						 * @version 3.1.0
						 * @default up
						 */
			ltPropDirection: Lyte.attr("string", { "default": "up" }),		//up,down

			/**
						 * @componentProperty {boolean} ltPropPercentage
						 * @version 3.1.0
						 * @default true
						 * 
						 */
			ltPropPercentage: Lyte.attr("boolean", { "default": true }),
			lyteUnbound : Lyte.attr("boolean", {"default" : false } ),
			ltPropAriaLabel: Lyte.attr("string",{"default":'loading'}),
			percentage: Lyte.attr('string', { "default": '0' }),
			duration: Lyte.attr('string', { "default": '2s' }),
			timingfn: Lyte.attr('string', { "default": 'linear' }),
			percentageDisplay: Lyte.attr('string', { "default": '0' }),
			checkIndeterminate: Lyte.attr("number", { "default": 0 }),
			chunks: Lyte.attr("array", { "default": [] }),
			prevValues: Lyte.attr("array", { "default": [] })
		}
	},
	didDestroy: function () {
		if (this.sid) {
			window.clearTimeout(this.sid);
			this.sid = false;
		}
		if (this.iId) {
			window.clearInterval(this.iId);
			this.iId = false;
		}
		if (this.stackId) {
			this.stackId.forEach(function (item, index) {
				if (item) {
					window.clearTimeout(this.sid);
					item = false;
				}
			});
		}

	},
	PerValue : function (value){
		this.component.data.ltPropProgressProperty.value = value;
			this.component.ChangePercentage();
			var radius = this.component.data.ltPropRadius;
			var stroke =this.component.data.ltPropStroke;
			var r = (radius)-(stroke)/2;
			var strokeDash =  2 * 3.14159 * r;
			var circle = this.querySelector('.ltProgressFillCircle');
			var per = strokeDash * (1 - (value)/100);
			circle.setAttribute('stroke-dashoffset', per);
	},
	observeIndeterminate: function () {
		if (this.getData('ltPropType') == "bar") {
			if (this.getData('ltPropIndeterminate') && this.getData('ltPropAnimated')) {
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('duration', '0s');
				this.setData('percentage', '100');
			}
		}
	}.observes('ltPropIndeterminate', 'checkIndeterminate'),
	ChangePercentage : function(){
		if (this.getData('ltPropIndeterminate')) {
			return;
		}
		this.setBackground();
	},
	percentageChange: function (obj) {
		this.ChangePercentage();
	}.observes('ltPropProgressProperty', 'ltPropStack.[]', 'ltPropProgressProperty.value'),
	setBackground: function () {
		// this.setData('ltPropValue',Math.round(this.getData('ltPropValue')));
		// this.setData('ltPropValueCopy',this.getData('ltPropValue'));
		var value = parseFloat(this.getData('ltPropProgressProperty').value);
		var duration = this.getData('ltPropProgressProperty').duration ? this.getData('ltPropProgressProperty').duration : this.getData('duration');
		if (this.getData('ltPropProgressProperty').timingfn) {
			this.setData('timingfn', this.getData('ltPropProgressProperty').timingfn);
		}
		if (this.getData('ltPropType') === 'circle') {
			if (parseInt(value) >= 100) {
				this.setData('duration', duration);
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('percentage', '100');
				duration = parseFloat(duration) * 1000;
				var self = this;
				if (this.sid) {
					window.clearTimeout(this.sid);
					this.sid = false;
				}
				this.sid = setTimeout(function () {
					self.sid = false;
					if (!self.node) {
						clearTimeout(self.sid);
						return;
					}
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground', self.getData('ltPropCompletedFillColor'));
				}, duration);
			}
			else {
				if (this.sid) {
					clearTimeout(this.sid);
					this.sid = false;
				}
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('duration', duration);
				this.setData('percentage', value + "");
			}
		}
		else if (this.getData('ltPropType') === 'stacked') {
			// this.setChunks();
			var stacks = this.getData('ltPropStack');
			var bars = this.$node.querySelectorAll('.lyteProgressStatusStack');
			var prevValues = this.getData('prevValues');
			var left = 0;
			this.setData('duration', duration);
			for (var i = 0; i < stacks.length; i++) {
				value = parseFloat(stacks[i].value);
				bars[i].style.width = value + "%";
				if (stacks[i].animated) {
					var animatedSpan = bars[i].querySelector('.ltPropProgressAnimated');
					animatedSpan.classList.add('progressMovingObj');
					animatedSpan.style.transition = 'left ' + duration + ' linear, width ' + duration + ' linear';
					animatedSpan.style.left = left + '%';
					animatedSpan.style.width = value + '%';
				}
				left += value;
				if (stacks[i].label) {
					bars[i].querySelector('.lyteProgressPercentageStack').innerHTML = stacks[i].label;
				}
				else {
					dur = parseFloat(stacks[i].duration || duration);
					if (this.stackId[i]) {
						clearInterval(this.stackId[i]);
						this.stackId[i] = false;
					}
					var p = prevValues[i] || 0,
						self = this,
						curr = { ind: i, value: value, ele: bars[i].querySelector('.lyteProgressPercentageStack'), p: p, stack: stacks[i] };
					if (dur == 0) {
						prevValues[i] = value;
						if (this.getData('ltPropShowPercentage')) {
							curr.ele.textContent = value + (this.getData('ltPropPercentage') ? "%" : "");
						}
					}
					else if (p > value) {
						var diff = p - value;
						curr.margin = ((diff / (dur * 1000)) * 100);
						this.stackId[i] = setInterval(this.changePercentageDisplay, 100, "dec", curr, this);
					}
					else if (p < value) {
						var diff = value - p;
						curr.margin = ((diff / (dur * 1000)) * 100);
						this.stackId[i] = setInterval(this.changePercentageDisplay, 100, "inc", curr, this);
					}
				}
			}
			return;
		}
		else if (this.getData('ltPropType') === 'vertical') {
			if (parseInt(value) >= 100) {
				this.setData('duration', duration);
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('percentage', '100');
				// this.$node.querySelector('.lyteProgressStatus').style.width = "100%";
				duration = parseFloat(duration) * 1000;
				var self = this;
				if (this.sid) {
					window.clearTimeout(this.sid);
					this.sid = false;
				}
				this.sid = setTimeout(function () {
					self.sid = false;
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground', self.getData('ltPropCompletedFillColor'));
					// if(self.getData('ltPropAnimated')){
					// 	self.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.remove('progressMovingObj');	
					// }
				}, duration);
			}
			else {
				if (this.sid) {
					clearTimeout(this.sid);
					this.sid = false;
				}
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				// if(this.getData('ltPropAnimated')){
				// 	this.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.add('progressMovingObj');	
				// }
				this.setData('duration', duration);
				this.setData('percentage', value + "");

				// this.$node.querySelector('.lyteProgressStatus').style.width = value + "%";
			}
		}
		else {
			if (parseInt(value) >= 100) {
				this.setData('duration', duration);
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('percentage', '100');
				// this.$node.querySelector('.lyteProgressStatus').style.width = "100%";
				duration = parseFloat(duration) * 1000;
				var self = this;
				if (this.sid) {
					window.clearTimeout(this.sid);
					this.sid = false;
				}
				this.sid = setTimeout(function () {
					self.sid = false;
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground', self.getData('ltPropCompletedFillColor'));
					if (self.getData('ltPropAnimated')) {
						self.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.remove('progressMovingObj');
					}
				}, duration);
			}
			else {
				if (this.sid) {
					clearTimeout(this.sid);
					this.sid = false;
				}
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				if (this.getData('ltPropAnimated')) {
					this.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.add('progressMovingObj');
				}
				this.setData('duration', duration);
				this.setData('percentage', value + "");

				// this.$node.querySelector('.lyteProgressStatus').style.width = value + "%";
			}
		}
		if (this.iId) {
			clearInterval(this.iId);
			this.iId = false;
		}
		var p = parseFloat(this.getData('percentageDisplay')),
			self = this;
		if (parseInt(this.getData('duration')) == 0) {
			this.setData('percentageDisplay', value + "");
		}
		else if (p > value) {
			var diff = p - value;
			var margin = ((diff / (parseInt(this.getData('duration')) * 1000)) * 100);
			this.iId = setInterval(function () {
				p -= margin;
				if (!self.$node) {
					clearInterval(self.iId);
					self.iId = false;
					return;
				}
				self.setData('percentageDisplay', Math.max(parseFloat(p.toFixed(2)), value) + "");
				if (parseFloat(p) == value) {
					clearInterval(self.iId);
					self.iId = false;
				}
			}, 100)
		}
		else if (p < value) {
			var diff = value - p;
			var margin = ((diff / (parseInt(this.getData('duration')) * 1000)) * 100);
			this.iId = setInterval(function () {
				p += margin;
				if (!self.$node) {
					clearInterval(self.iId);
					self.iId = false;
					return;
				}
				self.setData('percentageDisplay', Math.min(parseFloat(p.toFixed(2)), value) + "");
				if (parseFloat(p) >= value) {
					clearInterval(self.iId);
					self.iId = false;
				}
			}, 100)
		}

	},
	changePercentageDisplay: function (cond, chunk, comp) {
		if (cond == "inc") {
			chunk.p += chunk.margin;
		}
		else {
			chunk.p -= chunk.margin
		}
		if (!comp.$node) {
			clearInterval(comp.stackId[chunk.ind]);
			comp.stackId[chunk.ind] = false;
			return;
		}
		var pd = cond == "inc" ? Math.min(parseFloat(chunk.p.toFixed(2)), chunk.value) : Math.max(parseFloat(chunk.p.toFixed(2)), chunk.value);
		if (comp.getData('ltPropShowPercentage')) {
			chunk.ele.textContent = pd + (comp.getData('ltPropPercentage') ? "%" : "");
		}
		if ((cond == "inc" && parseFloat(pd) >= chunk.value) || (cond == "dec" && parseFloat(pd) == chunk.value)) {
			clearInterval(comp.stackId[chunk.ind]);
			Lyte.arrayUtils(comp.getData('prevValues'), 'replaceAt', chunk.ind, chunk.value);
			comp.stackId[chunk.ind] = false;
		}
	},
	setCircleStroke: function (circle, val) {
		debugger
		var per = circle.getAttribute('stroke-dasharray') * (1 - parseInt(val) / 100);
		circle.setAttribute('stroke-dashoffset', per);
	},
	actions: {

	}
});

/**
 * @syntax nonYielded 
 * @attribute ltPropType=circle
 * <lyte-progressbar lt-prop = '{"type":"circle","progressProperty" : {"value" : "20", "duration" : "2s"}}'>
 * </lyte-progressbar>
 */

/**
* @syntax nonYielded 
* @attribute ltPropType=bar
* <lyte-progressbar lt-prop = '{"progressProperty" : {"value": "25.89", "duration" : "2s"}}'>
* </lyte-progressbar>
*/
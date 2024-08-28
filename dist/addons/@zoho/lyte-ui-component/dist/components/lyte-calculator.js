/**
 * Renders a calculator
 * @component lyte-calculator
 * @version  1.0.0
 * @dependencies lyte-scrollbar
 */
Lyte.Component.register("lyte-calculator", {
_template:"<template tag-name=\"lyte-calculator\"> <div class=\"lyteCalculator basic\" tabindex=\"0\" __keydown=\"{{action('keydown',event)}}\" __keyup=\"{{action('keyup',event)}}\"> <div class=\"calculatorDisplay\" role=\"presentation\" tabindex=\"0\"> <template is=\"if\" value=\"{{ltPropEditable}}\"><template case=\"true\"> <input type=\"text\" class=\"lyteCalculatorTextField\" autocomplete=\"off\" spellcheck=\"false\" __mousedown=\"{{action('mdwnTextField',event)}}\" __mouseup=\"{{action('mupTextField',event)}}\"> </template><template case=\"false\"> <div> <div class=\"lyteCalculatorTextField\" tabindex=\"0\"></div> </div> </template></template> <div class=\"calculatorDispspan\" tabindex=\"1\">0</div> <div class=\"calculatorrad\"></div> </div> <div class=\"calculatorbuttons\" __mousedown=\"{{action('mousedown',event)}}\" __mouseup=\"{{action('mouseup',event)}}\"> <div class=\"calculatorToggle\"> <span class=\"calculatorsmaller\"></span> </div> <div class=\"advancedCalculator\"> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"inverse\">2<sup>nd</sup></span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"memory plus\">m+</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"memory minus\">m-</span> <span class=\"CalculatorBtn15 memorymr\" role=\"button\" tabindex=\"0\" aria-label=\"memory recall\">mr</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"memory clear\">mc</span> <span class=\"CalculatorBtn14 Deg\" role=\"button\" tabindex=\"0\" aria-label=\"switch between radians and degrees\">Deg</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"left parenthesis\">(</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"right parenthesis\">)</span> <span class=\"CalculatorBtn14\" role=\"button\" tabindex=\"0\" aria-label=\"random\">Rand</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"1 divide by X\">1/x</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"logarithm of y\">log<sub>y</sub></span> <span class=\"CalculatorBtn16 pieButton\" role=\"button\" tabindex=\"0\" aria-label=\"pi\">p</span> <span class=\"CalculatorBtn14\" role=\"button\" tabindex=\"0\" aria-label=\"exponential\">E</span> <span class=\"CalculatorBtn16\" role=\"button\" tabindex=\"0\" aria-label=\"euler's number\">e</span> <span class=\"CalculatorBtn15\" role=\"button\" tabindex=\"0\" aria-label=\"factorial\">!</span> <span class=\"CalculatorBtn17 toggleBtns squareroot\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;X to the power of 2&quot;,&quot;squareroot&quot;)}}\">x<sup>2</sup></span> <span class=\"CalculatorBtn15 toggleBtns logbtn\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;logarithm&quot;,&quot;ten to the power of X&quot;)}}\">log</span> <span class=\"CalculatorBtn14 toggleBtns trignometry\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;sine&quot;,&quot;arcsine&quot;)}}\">sin</span> <span class=\"CalculatorBtn14 toggleBtns trignometry\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;cosine&quot;,&quot;arccosine&quot;)}}\">cos</span> <span class=\"CalculatorBtn14 toggleBtns trignometry\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;tangent&quot;,&quot;arctangent&quot;)}}\">tan</span> <span class=\"CalculatorBtn17 toggleBtns calcLeft lastrow cuberoot\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;X to the power of Y&quot;,&quot;Y root of X&quot;)}}\">x<sup>y</sup></span> <span class=\"CalculatorBtn16 toggleBtns lastrow naturallog\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;natural logarithm&quot;,&quot;E to the power of X&quot;)}}\">ln</span> <span class=\"CalculatorBtn14 toggleBtns lastrow hyperbolic\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;hyperbolic sine&quot;,&quot;hyperbolic arcsine&quot;)}}\">sinh</span> <span class=\"CalculatorBtn14 toggleBtns lastrow hyperbolic\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;hyperbolic cosine&quot;,&quot;hyperbolic arccosine&quot;)}}\">cosh</span> <span class=\"CalculatorBtn14 toggleBtns lastrow hyperbolic\" role=\"button\" tabindex=\"0\" aria-label=\"{{if(expHandlers(secondActive,'!'),&quot;hyperbolic tangent&quot;,&quot;hyperbolic arctangent&quot;)}}\">tanh</span> </div> <div class=\"basicCalculator\"> <span class=\"calcBackspace\" role=\"button\" tabindex=\"0\" aria-label=\"clear\">C</span> <span class=\"calcClearAc\" role=\"button\" tabindex=\"0\" aria-label=\"all clear\">AC</span> <span class=\"calcPercent\" role=\"button\" tabindex=\"0\" aria-label=\"percentage\">%</span> <span class=\"basicOp calcDivide\" role=\"button\" tabindex=\"0\" aria-label=\"divide\">/</span> <span role=\"button\" tabindex=\"0\">7</span> <span role=\"button\" tabindex=\"0\">8</span> <span role=\"button\" tabindex=\"0\">9</span> <span class=\"basicOp calcMultiply\" role=\"button\" tabindex=\"0\" aria-label=\"multiply\">*</span> <span role=\"button\" tabindex=\"0\">4</span> <span role=\"button\" tabindex=\"0\">5</span> <span role=\"button\" tabindex=\"0\">6</span> <span class=\"basicOp calcAdd\" role=\"button\" tabindex=\"0\" aria-label=\"plus\">+</span> <span role=\"button\" tabindex=\"0\">1</span> <span role=\"button\" tabindex=\"0\">2</span> <span role=\"button\" tabindex=\"0\">3</span> <span class=\"basicOp calcSub\" role=\"button\" tabindex=\"0\" aria-label=\"minus\">-</span> <span class=\"lastrow doubleWidth calcLeft\" role=\"button\" tabindex=\"0\">0</span> <span class=\"calzero lastrow\" role=\"button\" tabindex=\"0\" aria-label=\"point\">.</span> <span class=\"basicOp lastrow calcRight calcEqual\" role=\"button\" tabindex=\"0\" aria-label=\"equals\">=</span> </div> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,3,31]},{"type":"attr","position":[1,3,3,33]},{"type":"attr","position":[1,3,3,35]},{"type":"attr","position":[1,3,3,37]},{"type":"attr","position":[1,3,3,39]},{"type":"attr","position":[1,3,3,41]},{"type":"attr","position":[1,3,3,43]},{"type":"attr","position":[1,3,3,45]},{"type":"attr","position":[1,3,3,47]},{"type":"attr","position":[1,3,3,49]}],
_observedAttributes :["bigger","equation","previous","numstack","opstack","rank","secondLayer","operator","check_error","deg","memory","secondLayer","secondKeySet","secondActive","secondValue","cursor","cursorIndex","ltPropEditable","ltPropAutoFocus","ltPropAria","ltPropAriaAttributes"],

	data : function(){
		return {
			'bigger' : Lyte.attr("boolean",{"default":false}),
			'equation' : Lyte.attr("string"),
			'previous' : Lyte.attr("string"),
			'numstack' : Lyte.attr("array",{"default" : []}),
			'opstack' : Lyte.attr("array",{"default":[]}),
			'rank' : Lyte.attr("object",{"default":undefined}),
			'secondLayer' : Lyte.attr("array",{"default" : []}),
			'operator' : Lyte.attr("string",{"default" : ''}),
			'check_error' : Lyte.attr("boolean",{"default" : false}),
			'deg' : Lyte.attr("boolean",{"default":false}),
			'memory' : Lyte.attr("number",{"default":0}),
			'secondLayer' : Lyte.attr('array',{"default":[]}),
			'secondKeySet' : Lyte.attr("array",{"default" : []}),
			'secondActive' : Lyte.attr("boolean",{"default" : false}),
			'secondValue' : Lyte.attr("array",{"default" : []}),
			'cursor' : Lyte.attr("boolean",{"default" : false}),
			'cursorIndex' : Lyte.attr("number",{"default":0}),
			/**
			 * @componentProperty {boolean} ltPropEditable=false
			 */

			'ltPropEditable' : Lyte.attr("boolean",{"default" :  _lyteUiUtils.resolveDefaultValue( 'lyte-calculator', 'editable', false )}),
			/**
			 * @componentProperty {boolean} ltPropAutoFocus=false
			 */

			'ltPropAutoFocus' : Lyte.attr("boolean",{"default" :  _lyteUiUtils.resolveDefaultValue( 'lyte-calculator', 'autoFocus', false )}),
			/**
			 * @componentProperty {boolean} ltPropAria=false
			 * @version 3.1.0
			 */
			'ltPropAria' : Lyte.attr('boolean',{'default':false}),
			/**
			 * @componentProperty {object} ltPropAriaAttributes = {}
			 * @version 3.1.0
			 */
			'ltPropAriaAttributes': Lyte.attr('object',{'default':{}})
		}
	},
	init : function(){
		var secondLayer = [
			['x<sup>2</sup>','log','sin', 'cos', 'tan','x<sup>y</sup>', 'ln', 'sinh', 'cosh', 'tanh'],
			[
				'sqrt','10<sup>x</sup>','sin<sup>-1</sup>','cos<sup>-1</sup>','tan<sup>-1</sup>','xry','e<sup>x</sup>',
				'sinh<sup>-1</sup>', 'cosh<sup>-1</sup>', 'tanh<sup>-1</sup>'
			]
		];
		var rank={'=': 0,'+': 1, '-': 1,'/': 2, '*': 2,'~':6 , 'N': 5, '^': 5,'E':4,'s':7,'c':7,'t':7,'l':7,'S':7,'C':7,'T':7,'L':7,'i':7,'o':7
		,'a':7,'I':7,'O':7,'A':7,'G':7,'Q':7,'%':3,'!':3};
		this.setData('secondLayer', secondLayer);
		this.setData('rank',rank);
	},
	didConnect: function() {
		var calc=this.$node.querySelector('.calculatorbuttons'),keyBoard=[],secondLayer=this.getData('secondLayer'),brackets=this.getData('brackets'),calcObj={};
		var secondKeySet=[].slice.call(calc.querySelector('.advancedCalculator').children, 15, 25);
		this.setData('secondKeySet',secondKeySet);
		// colloect all keys...

		for (var k = 2; k>=0;k-- ) {

			for (var l = calc.children[k], m = l.children, n = m.length; n--; ) {
				keyBoard[l.children[n].textContent.replace(/\s*/g, '')] = l.children[n];
			}
		}
		
		for (var m = secondLayer[0], n = m.length; n--; ) {
			var val=m[n];
			if(val==='x<sup>2</sup>'){
				val='x2';
			}
			else if(val==='x<sup>y</sup>'){
				val='xy';
			}

			keyBoard[secondLayer[1][n].replace(/<\/*\w+>/g, '')] = keyBoard[val];
		}
		keyBoard.Rad= keyBoard.Deg;
		this.setData('keyBoard',keyBoard);
		if(!this.getData('ltPropEditable')){
			$L('.lyteCalculatorTextField',this.$node).scroll({preventVertical : true, preventHorizontal : true});
		}
		if(this.getData('ltPropAutoFocus')){
			this.$node.querySelector('.lyteCalculatorTextField').focus();
		}
	},
	ariaObserver: function( change ) {
	
		if( this.getData('ltPropAria') ){
			var calculator = this.$node.querySelector('.lyteCalculator')
			_lyteUiUtils.setAttribute( calculator, this.getData( 'ltPropAriaAttributes' ) || {}, {} );
		}
		
	}.observes( 'ltPropAriaAttributes' ).on('didConnect'),
	render:function(val,inp){
		var regx = /(\d+)(\d{3})/,
			hasComma = val.match(/\./),
			tmp,display=this.$node.querySelector('.calculatorDispspan'),inputField=this.$node.querySelector('.lyteCalculatorTextField'),
			valAbs = Math.abs(+val),
			displayStyle = display.style,
			displayParentStyle = display.parentNode.style;
		if (val.match(/NaN|Inf/)) {
			tmp = 'NaN';
		} 
		else if(val!=="Error"){
			if (valAbs >= 1e+16) {
				val = (+val).toExponential(13) + '';
			}
			if (((!inp || inp === '+/-') && valAbs !== 0)) {
				val = (+val).toPrecision(12);
			}
			tmp = (val + '').split('.');
			if (tmp[1]) {
				tmp[2] = tmp[1].split('e');
				if (tmp[2][1]) {
					tmp[1] = tmp[2][0];
				}
				if (!inp || inp === '+/-') {
					tmp[1] = (((+('1.' + tmp[1])).toPrecision(12)) + '');
					if (tmp[1] >= 2) {
						tmp[0] = (+tmp[0] + 1) + '';
					}
					tmp[1] = tmp[1].substr(2).replace(/0+$/, '');
				}
			}
			tmp = tmp[0] + ((tmp[1] || hasComma) ? '.' + tmp[1] : '').
				replace('.undefined', '').
				replace(inp ? '' : /\.$/, '') + (tmp[2] && tmp[2][1] ? 'e' + tmp[2][1] : '');
		}
		else{
			tmp=val;
			display.innerHTML = ' ';
			return;
		}
		tmp = tmp.replace(/\./g, '#').replace(/\s/g,  ',').replace(/#/g, '.');
		display.innerHTML = tmp;
		// var calculatorDisplay = this.$node.querySelector('.calculatorDisplay')
		
		setTimeout(function(){
			inputField.focus()

		},250)
	},
	getTargetKey: function (elm) {
		var calc=this.$node.querySelector('.lyteCalculator');
		while (elm !== calc && elm.className.indexOf("calculatorToggle")===-1&&elm.className.indexOf("lyteCalculatorTextField")===-1&&elm.className.indexOf("calculatorsmaller")===-1 && elm.parentNode  &&elm.parentNode.className.indexOf("basicCalculator")===-1&&elm.parentNode.className.indexOf("advancedCalculator")===-1){
			elm = elm.parentNode;
		}
		return elm;
	},
	 keyUp:function() {
	 	var pressedKey=this.getData('pressedKey'),secondActive=this.getData('secondActive');
		if (pressedKey && pressedKey !== secondActive) {
			pressedKey.className = pressedKey.className.replace(' calc-press', '');
			pressedKey = null;
			this.setData('pressedKey',pressedKey);
		}
	},
	keyDown: function (e, obj) { // works for mouse and key
		var event = e || window.event,
			target = obj || this.getTargetKey(event.target),
			keyText = target.textContent.replace(/\s*/g, ''),keyBoard=this.getData('keyBoard'),
			key = keyBoard[keyText],pressedKey=this.getData('pressedKey');
		if (key) {
			this.keyUp();
			pressedKey = key;this.setData('pressedKey',pressedKey);
			key.className =key.className+ ' calc-press';
		}
		return false;
	},
	preformMouseUp: function(e){

			var inputField=this.$node.querySelector('.lyteCalculatorTextField'),elementMath=[],value,edit=this.getData('ltPropEditable'),equation;
			if(edit){
				value=inputField.value;
			}
			else{
				value=inputField.innerHTML;
			}
			equation=value;
			var a=this.convertequation(equation);
			var value1=a.split(/([0-9.]+|\(|\)|\+|\-|\/|\*|\^|~|N|s|c|t|l|S|C|T|!|%|L|i|o|a|I|O|A|G|E|p|R|e|Q)/g).filter(function(x) {return x!=""} );
			if(value1.length>=2 && !value1[value1.length-1].match(/[!|%|^]/)&&this.isOperator(value1[value1.length-1])&&value1[value1.length-2].match(/[0-9!pe%)]/))
			{	value1=value.split(/(p|Rand|e|arcsinh\(|arccosh\(|arctanh\(|arcsin\(|ln\(|arccos\(|arctan\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|logy\(|log\(|sqrt\(|N\(|\(|\)|\+|\-|\|*|\^|!|%)/g).filter(function(x) {return x!=""} );
				value1=value1.splice(0,value1.length-1);
				equation=value1.join("");
			}
			else if(value1.length>=2 && !value1[value1.length-1].match(/[!|%]/)&& this.isOperator(value1[value1.length-1])){
				this.render('Error');this.keyUp();
				return ;
			}
			equation=this.standardizeString(equation);
			if(!this.getData('check_error')){
				elementMath=this.processString(equation);
			}
			if(!this.getData('check_error')){
				elementMath=this.postfix(elementMath);
			}
			if(!this.getData('check_error')){
				equation=this.valueMath(elementMath);
			}
			if(this.getData('check_error')){
				this.render('Error');
				return ;
			}
			this.render(equation);
			this.keyUp();
	},
	processString : function(e){
		var s=e.split(/([0-9.]+|\(|\)|\+|\-|\/|\*|\^|~|N|s|c|t|l|S|C|T|!|%|L|i|o|a|I|O|A|G|E|p|R|e|Q)/g).filter(function(x) {return x!=""} );
		for(var i=0;i<s.length;i++){
			if(i<s.length-1&&(s[i]==='p'||s[i]==='R'||s[i]==='e')&& !this.isOperator(s[i+1])){
				this.setData('check_error',true);
				return null;
			}
			if(i==0 && !s[0].match(/[0-9a-zA-Zpe(.~]/)){
				this.setData('check_error',true);
				return null;
			}
			if(i===0 && s[0]==='G'){
				this.setData('check_error',true);
				return null;
			}
			if(i<s.length-1&& !s[i].match(/[(|)|%|!]/) && !s[i+1].match(/[(]/) && (this.isOperator(s[i]) && !this.isOneMath(s[i])) && (this.isOperator(s[i+1]) && !this.isOneMath(s[i+1]))){
				this.setData('check_error',true);
				return null;
			}
			if(i<s.length-1&& !s[i]==='!' && s[i+1].match(/[E]/) ){
				this.setData('check_error',true);
				return null;
			}
			if(i<s.length-1&& s[i].match(/[(]/) && (this.isOperator(s[i+1]) && !this.isOneMath(s[i+1]))){
				this.setData('check_error',true);
				return null;
			}
			if(i<s.length-1&& this.isOneMath(s[i])&& (this.isOperator(s[i+1]) && !this.isOneMath(s[i+1])) ){
				this.setData('check_error',true);
				return null;
			}
		}
		return s;
	},
	postfix : function(elementMath){
			var s1='',s=[],stack=[],rank=this.getData('rank'),j=0;
			if(elementMath.length===1){
				return elementMath;
			}
  			for(var i=0;i<elementMath.length;i++){
				var c=elementMath[i];
				if(!this.isOperator(c)){
					s[j]=c;j++;
				}
				else{
					if(c==='('){
						stack.push(c);
					}
					else{
						if(c===')'){
							var c1;
							do{
								c1=stack[stack.length-1][0];
								if(c1!=='('){
									s[j]=stack[stack.length-1];j++;
								}
								stack.pop();
							}while(c1!=='(');
						}
						else{
							while(stack.length!==0&&rank[stack[stack.length-1]+""]>=rank[c+""]){
								s[j]=stack.pop();j++;
							}
							stack.push(c);
						}
					}
				}
			}
			while(stack.length!=0){
				
					s[j]=stack.pop();j++;
				
				
			}
			return s;
	},
	factorial : function(n){
		return n < 0 || n > 170 ? NaN : n <= 1 ? 1 : n * this.factorial(n - 1);
	},
	valueMath : function(elementMath){
		var stack=[],num,deg=this.getData('deg'),_PI=Math.PI;
		for(var i=0;i<elementMath.length;i++){
			var c=elementMath[i];
			if(c==='p'){
				stack.push(Math.PI);
			}
			else if(c==='e'){
				stack.push(Math.exp(1));
			}
			else if(this.isOperator(c)||c.match(/^(\d*\.)?\d+$/)){
				if(!this.isOperator(c)){
					
					stack.push(parseFloat(c));
				}
				else if(stack.length!==0){
					 var num1=stack.pop();
					switch(c){
						case '~':{
									num=-num1;
									break;
								}
						case 's':{
									num=(!deg && Math.abs(num1) === _PI ? '0' :Math.sin(num1 * (deg ? _PI / 180 : 1)) + '');
									break;
								}
						case 'c':{
									num=(Math.cos(num1 * (deg ? _PI / 180 : 1)) + '');
									break;
								}
						case 't':{
									num=(!deg && Math.abs(num1) === _PI ? '0' :Math.tan(num1 * (deg ? _PI / 180 : 1)) + '');
									break;
								}
						case '%':{
									num=num1/100;break;
								}
						case '!':{
									if(num1>=0&&parseInt(num1)===num1){
									num=this.factorial(Math.round(+num1));
									}
									else{
										return 'NaN';
									}
									break;
								}
						case 'l':{
									num=Math.log(num1) / Math.log(10);
									break;
								}
						case 'L':{
									num=Math.log(num1);
									break;
								}
						case 'S':{
									num=((Math.pow(Math.E, num1) - Math.pow(Math.E, -1 * num1)) / 2) ;
									break;
								}
						case 'C':{
									num=((Math.pow(Math.E, num1) + Math.pow(Math.E, -1 * num1)) / 2);
									break;
								}
						case 'T':{
									var e1=Math.pow(Math.E, num1),e2=Math.pow(Math.E, -1 *num1);
									num=(e1 == Infinity ? 1 : e2 == Infinity ? -1 :(e1 - e2) / (e1 + e2));
									break;
								}
						case 'i':{
									num=Math.asin(num1) * (deg ? 180 / _PI : 1);
									break;
								}
						case 'o':{
									num=Math.acos(num1) * (deg ? 180 / _PI : 1)
									break;
								}
						case 'a':{
									num=Math.atan(num1) * (deg ? 180 / _PI : 1);
									break;
								}
						case 'I':{
									num=Math.log(+num1 + Math.sqrt(1 + Math.pow(num1, 2)));
									break;
								}
						case 'O':{
									num=2 * Math.log(Math.sqrt((+num1 + 1) / 2) + Math.sqrt((+num1 - 1) / 2));
									break;
								}
						case 'A':{
									num=(Math.log(+num1 + 1) - Math.log(1 - num1)) / 2;
									break;
								}
						case 'Q':{
									num=Math.pow(num1, 1 / 2);
									break;
								}
						
					}
					if(stack.length!==0){
						var num2=stack[stack.length-1];
						switch(c){
							case '+':{ 	num=parseFloat(num2)+parseFloat(num1);
									 	stack.pop();
									  	break;
									}
							case '-':{ 
										num=num2-num1;
									 	stack.pop();
										break;
									}
							case '*':{ 
										num=num2*num1;
									  	stack.pop();
									  	break;
									}
							case '/':{ if(num1!=0){
											num=num2/num1;
									  	}
									  	else{
									  		return 'NaN';
									  	}
									 	stack.pop();
									 	 break;
									}
							case '^':{
										num=Math.pow(num2,num1);
									 	stack.pop();
									  	break;
									}
							case 'N':{ 
										num=Math.pow(num1, 1 / num2);
										 stack.pop();
										 break;
									}
							case 'E':{
										num=num2 * Math.pow(10, num1);
									 	stack.pop();
										 break;
									}
							case 'G':{
										num=Math.log(num1) / Math.log(num2); stack.pop();
										break;
									}
						}
						
					}
					stack.push(num);
				}
				else{
					return "Error";
				}
			}
			else{
				return "Error";
			}
		}
		return stack.pop()+"";
	},
	checkrank : function(key){
		var opstack=this.getData(opstack),rank=this.getData('rank');
		if(opstack.length>0){
			return true;
		}
		else if(opstack.length>0&&rank[opstack.length-1]<rank[key]){
			return true;
		}
		return false;
	},
	isOperator : function(op){
		if(op.match(/^[+|\-|/|*|^|~|N|s|c|t|l|S|C|T|!|%|(|L|)|i|o|a|I|O|A|E|G|Q]+$/)){
			return true;
		}
		return false;
	},
	isOneMath :function(op){
		if(op.match(/^[s|c|t|l|S|C|T|(|L|i|o|a|I|O|A|Q|~]+$/)){
			return true;
		}
		return false;
	},
	convertequation : function(s){
		s=this.convertToPiandRoot(s);
		s=s.trim();
		s=s.replace("\\s+"," ");
		s=s.replace(/sqrt/g,"Q");
		s=s.replace(/logy/g,"G");
		s=s.replace(/arcsinh/g,"I");
		s=s.replace(/arccosh/g,"O");
		s=s.replace(/arctanh/g,"A");
		s=s.replace(/arcsin/g,"i");
		s=s.replace(/arccos/g,"o");
		s=s.replace(/arctan/g,"a");
		s=s.replace(/log/g,"l");
		s=s.replace(/sinh/g,"S");
		s=s.replace(/cosh/g,"C");
		s=s.replace(/tanh/g,"T");
		s=s.replace(/sin/g,"s");
		s=s.replace(/cos/g,"c");
		s=s.replace(/tan/g,"t");
		s=s.replace(/Rand/g,"R");
		s=s.replace(/ln/g,"L");
		return s;
	},
	convertToPiandRoot : function(s){
		var r=String.fromCharCode(parseInt('221A',16));
		var pi=String.fromCharCode(parseInt('03C0',16));
		var re = new RegExp(pi, 'g');
		s=s.replace(re,"p");
		re = new RegExp(r, 'g');
		s=s.replace(re,"N");
		return s;
	},
	standardizeString : function(s){
		var newString='',open=0,close=0;
		s=this.convertequation(s);
		open=s.split("(").length;
		close=s.split(")").length;
		if(close>open){
			this.setData('check_error',true);
			return null;
		}
		for(var i=0;i<(open-close);i++){
			s+=')';
		}
		for(var i=0;i<s.length;i++){
			if(i>0 && this.isOneMath(s[i])&&(s[i-1]==')'||s[i-1].match(/^[\d|\.|!|%|p|R|e]$/))){
				newString=newString+ "*";
			}
			if((i===0||(i>0&& !s[i-1].match(/^[\d|\.|%|!]$/)))&& s[i]==='-' && s[i+1]&&(s[i+1].match(/^[\d|\.]$/)||s[i+1]==='R'||s[i+1]==='e'||s[i+1]==='p'||s[i+1]==='('||this.isOneMath(s[i+1]))){
				newString = newString+"~";
			}
			else if((i===0||(i>0&& s[i-1]==='('))&& s[i]==='+' && s[i+1]&&(s[i+1].match(/^[\d|\.]$/)||s[i+1]==='R'||s[i+1]==='e'||s[i+1]==='p'||s[i+1]==='(')){
				newString = newString+'';
			}
			else if(i>0&& (s[i-1].match(/^[\d|\.]$/)||s[i-1]===')'||s[i-1]==='R'||s[i-1]==='e'||s[i-1]==='p')&&s[i]==='p'){
				newString =newString+"*"+s[i];
			}
			else if(i>0&& (s[i-1].match(/^[\d|\.]$/)||s[i-1]===')'||s[i-1]==='p'||s[i-1]==='e'||s[i-1]==='R')&&s[i]==='R'){
				newString =newString+"*"+s[i];
			}
			else if(i>0&& (s[i-1].match(/^[\d|\.]$/)||s[i-1]===')'||s[i-1]==='p'||s[i-1]==='R'||s[i-1]==='e')&&s[i]==='e'){
				newString =newString+"*"+s[i];
			}
			else if(i>0&& (s[i-1]==='%')&&(s[i].match(/^[\d|\.]$/)||s[i]==='p'||s[i]==='R'||s[i]==='e')){
				newString =newString+"*"+s[i];
			}
			else if(i>0&& (s[i-1]==='!')&&(s[i].match(/^[\d|\.]$/)||s[i]==='p'||s[i]==='R'||s[i]==='e')){
				newString =newString+"*"+s[i];
			}
			else if(i>0&& (s[i-1]===')'||s[i-1]==='p'||s[i-1]==='R'||s[i-1]==='e')&&s[i].match(/^[\d|\.]$/)){
				newString =newString+"*"+s[i];
			}
			else{
				newString=newString+s[i];
			}
		}
		return newString;
	},
	clearValue : function(){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField');
		this.setData('check_error',false);this.setData('cursorIndex',0);
		if(this.getData('ltPropEditable')){
			inputField.value="";
		}
		else{
			inputField.innerHTML="";
		}
		this.$node.querySelector('.calculatorDispspan').innerHTML='0';
	},
	memoryoperations : function(key){
		var memory=this.getData('memory'),dispVal=this.$node.querySelector('.calculatorDispspan').innerHTML,inputField=this.$node.querySelector('.lyteCalculatorTextField');
		if(key==='mc'){
			memory = 0;
			this.$node.querySelector('.memorymr').classList.remove('active');
		}
		else if(key==='m+'){
			memory += parseFloat(dispVal);
			this.$node.querySelector('.memorymr').classList.add('active');
		}
		else if(key==='m-'){
			memory -= parseFloat(dispVal);
			this.$node.querySelector('.memorymr').classList.add('active');
		}
		else if(key==='mr')
		{	var index=this.getData('cursorIndex'), value,val;
			if(this.getData("ltPropEditable")){
				value=inputField.value;
			}
			else{
				value=inputField.innerHTML;
			}
			val=this.convertToPiandRoot(value);
			if(!this.getData('check_error')){
				if((value.length==0||index==0)||(val[index-1]&& !val[index-1].match(/[0-9.]/))){
					if(value.length>index&&val[index].match(/[0-9.]/)){
						return;
					}
					var val=value.substring(0, index)+memory+value.substring(index, value.length);
					if(this.getData('ltPropEditable')){
						inputField.value=val;
					}
					else{
						inputField.innerHTML=val;
					}
					this.setData('cursorIndex',index+(memory+'').length);
				}
				this.setData('check_error',false);
				this.preformMouseUp();
			}
			
		}
		this.setData('memory',memory);
	},
	getSelectionIndex : function(){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField');
		if (document.selection) {
			inputField.focus();
			var range = document.selection.createRange();
			var rangelen = range.text.length;
			range.moveStart('character', -inputField.value.length);
			var start = range.text.length - rangelen;
			return start + rangelen;
		}
		else if (inputField.selectionStart || inputField.selectionStart == '0') {
			return inputField.selectionEnd ;
		} else {
			return 0;
		}
	},
	operationForBackspace : function(){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField'),value,index,edit=this.getData('ltPropEditable');
		if(edit){
			value=inputField.value;
			inputField.focus();
			index=this.getSelectionIndex();
		}
		else{
			value=inputField.innerHTML;
			index=value.length;
		}
		var val=this.convertToPiandRoot(value);
		index=value.length-index;
		var value1=val.split(/(p|Rand|e|arcsinh\(|arccosh\(|arctanh\(|arcsin\(|ln\(|arccos\(|arctan\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|logy\(|log\(|sqrt\(|N\(|\(|\)|\+|\-|\|*|\^|!|%)/g).filter(function(x) {return x!=""} );
		var sum=0,i;
		for( i=value1.length-1;i>=0;i--){
			if(sum===index){
				break;
			}
			else{
				sum+=value1[i].length;
			}
		}
		if(i>=0){
			if(edit){
				this.setData('cursorIndex',this.getData('cursorIndex')-value1[i].length);
			}
			value1.splice(i,1);
			value1=value1.join("");
			var r=String.fromCharCode(parseInt('221A',16));
			var pi=String.fromCharCode(parseInt('03C0',16));
			value1=value1.replace(/p/g,pi);
			value1=value1.replace(/N/g,r);
			if(edit){
				inputField.value=value1;
			}
			else{
				inputField.innerHTML=value1;
			}
		}
	},
	operationForDot : function(e){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField'),value,index,edit=this.getData('ltPropEditable');
		if(edit){
			value=inputField.value;inputField.focus();
			index=this.getSelectionIndex();
		}
		else{
			value=inputField.innerHTML;
			index=value.length;
		}
		var val=this.convertToPiandRoot(value);
		index=value.length-index;
		var value1=val.split(/([0-9.]+|p|Rand|e|arcsinh\(|arccosh\(|arctanh\(|arcsin\(|ln\(|arccos\(|arctan\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|logy\(|log\(|sqrt\(|N\(|\(|\)|\+|\-|\|*|\^|!|%)/g).filter(function(x) {return x!=""} );
		var sum=0,i;
		for( i=value1.length-1;i>=0;i--){
			if(sum>=index){
				break;
			}
			else{
				sum+=value1[i].length;
			}
		}
		if(i+1===value1.length && sum===index){
			if(value1[i].match(/[.]/g)){
			  	return true;
			}
		}
		else if(i>=1 && sum===index && value1[i+1].match(/([0-9])/)){
			if(value1[i+1].match(/[.]/g)){
			  	return true;
			}
		}
		else if(i>=0 && sum===index && !value1[i+1].match(/([0-9])/)){
			if(value1[i].match(/[.]/g)){
			  	return true;
			}
		}
		else if(sum>index){
			if(value1[i+1].match(/[.]/g)){
			 	return true;
			}
		}
		else if(i===0 && sum===index){
			if(value1[i].match(/[.]/g)){
				return true;
			}
		}
		return false;
	},
	operationForZero : function(e){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField'),value,index,edit=this.getData('ltPropEditable');
		if(edit){
			value=inputField.value;
			inputField.focus();
			index=this.getSelectionIndex();
		}
		else{
			value=inputField.innerHTML;
			index=value.length;
		}
 		var val=this.convertToPiandRoot(value);
		index=value.length-index;
		var value1=val.split(/([0-9.]+|p|Rand|e|arcsinh\(|arccosh\(|arctanh\(|arcsin\(|ln\(|arccos\(|arctan\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|logy\(|log\(|sqrt\(|N\(|\(|\)|\+|\-|\|*|\^|!|%)/g).filter(function(x) {return x!=""} );
		var sum=0,i;
		for( i=value1.length-1;i>=0;i--){
			if(sum>=index){
				break;
			}
			else{
				sum+=value1[i].length;
			}
		}
		if(i>=0 && sum===index){
			if(parseInt(value1[i])+''==='0' && !value1[i].match(/[.]/g)){
				return true;
			}
		}
		else if(index>0&&sum>index){
			if(parseInt(value1[i+1])+''==='0' && !value1[i+1].match(/[.]/g)){
				return true;
			}
		}
		return false;
	},
	operationForArrowLeft : function(e){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField'),index,value=inputField.value;
		inputField.focus();
		index=this.getSelectionIndex();
		var val=this.convertToPiandRoot(value);
		var value1=val.split(/([0-9.]|p|Rand|e|arcsinh\(|arccosh\(|arctanh\(|arcsin\(|ln\(|arccos\(|arctan\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|logy\(|log\(|sqrt\(|N\(|\(|\)|\+|\-|\|*|\^|!|%)/g).filter(function(x) {return x!=""} );
		var sum=0,i;
		for(i=0;i<value1.length-1;i++){
			if(value1[i+1]&&sum+value1[i].length<index){
				sum+=value1[i].length;
			}
			else{
				break;
			}
		}
		if(i==0){
			sum=0;
		}
		this.setData('cursorIndex',sum+1);
		inputField.setSelectionRange(this.getData('cursorIndex'),this.getData('cursorIndex'));
		return;
	},
	operationForArrowRight : function(e){
		var inputField=this.$node.querySelector('.lyteCalculatorTextField'),index,value=inputField.value;
		inputField.focus();
		index=this.getSelectionIndex();
		var val=this.convertToPiandRoot(value);
		var value1=val.split(/([0-9.]|p|Rand|e|arcsinh\(|arccosh\(|arctanh\(|arcsin\(|ln\(|arccos\(|arctan\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|logy\(|log\(|sqrt\(|N\(|\(|\)|\+|\-|\|*|\^|!|%)/g).filter(function(x) {return x!=""} );
		var sum=0,i;
		for(i=0;i<value1.length;i++){
			if(sum+value1[i].length<=index){
				sum+=value1[i].length;
			}
			else{
				break;
			}
		}
		if(i==value1.length){
			sum=val.length;
		}
		else{
			sum+=value1[i].length;
		}
		this.setData('cursorIndex',sum-1);
		inputField.setSelectionRange(this.getData('cursorIndex'),this.getData('cursorIndex'));
		return;
	},
	preformMouseDown : function(e){
			this.keyDown( e );
			var pressedKey=this.getData('pressedKey');
			if (!pressedKey){
			 	return false;
			}
			var r=String.fromCharCode(parseInt('221A',16));
			var pi=String.fromCharCode(parseInt('03C0',16));
			var inputField=this.$node.querySelector('.lyteCalculatorTextField'),index;
			var event = e || window.event,
			target = this.getTargetKey(event.target),
			keyText = target.textContent.replace(/\s*/g, ''),keyBoard=this.getData('keyBoard'),
			key = keyBoard[keyText],secondKeySet=this.getData('secondKeySet'),secondLayer=this.getData('secondLayer'),
			secondValue=this.getData('secondValue'),value,flag=0,cursorIndex,val,edit=this.getData('ltPropEditable'),text;
			if(edit){
				inputField.focus();
				index=this.getSelectionIndex();
				value=inputField.value;
			}
			else{
				value=inputField.innerHTML;
				index=value.length;
				$L.fastdom.measure(function(){
					//scroll for non-editable calculator
					if( inputField)
						{
							var offWidth = inputField.offsetWidth;
							var sWidth = inputField.scrollWidth;
							$L.fastdom.mutate(function(){
								inputField.scrollLeft = sWidth-offWidth;
							}.bind(this))
						}
					}.bind(this));	
				
			}
			cursorIndex=this.getData('cursorIndex');
			val=this.convertToPiandRoot(value);
			if(key!==null||key!=="undefined"){
				text=key.innerText;this.setData('previous',text);
			}
			if(this.$node.querySelector('.calculatorDisplay').className.indexOf('equalBtn')!==-1){
				this.$node.querySelector('.calculatorDisplay').classList.remove('equalBtn');
			}
			if(key.className.indexOf('calculatorsmaller')!==-1||key.className.indexOf('calculatorToggle')!==-1){
				this.setData('bigger',!this.getData('bigger'));
				if(this.getData('bigger')){
					this.$node.querySelector('.basicCalculator').classList.add('anim');
					this.$node.querySelector('.lyteCalculator').classList.remove('basic');
					this.$node.querySelector('.lyteCalculator').classList.add('advanced');

				}
				else{
					this.$node.querySelector('.basicCalculator').classList.remove('anim');
					this.$node.querySelector('.lyteCalculator').classList.remove('advanced');
					this.$node.querySelector('.lyteCalculator').classList.add('basic');
				}
				
				this.$node.querySelector('.calculatorrad').innerHTML = this.getData('bigger') ? "Rad" : "";
				if( !this.getData('bigger')){
					this.setData('deg',false);
				}
				this.keyUp();return;
			}
			if(value.length>0 && (!text.match(/[0-9|.]/)||(text=='1/x' || text=='10x')) &&text!='C' && text!='AC'  && value[value.length-1]=='.'){
				value=value+'0';
				if(edit){
					inputField.value=value;
				}
				else{
					inputField.innerHTML=value;
				}
				val=this.convertToPiandRoot(value);
				this.setData('cursorIndex',this.getData('cursorIndex')+1);
				cursorIndex+=1;
				index+=1;
				this.preformMouseUp();
			}
			else if(text=='10x'&& value!==''&& value[index-1]&&value[index-1].match(/([0-9])/g)){
				value+='*';
				if(edit){
					inputField.value=value;
					}
					else{
						inputField.innerHTML=value;
					}
				val=this.convertToPiandRoot(value);
				this.setData('cursorIndex',this.getData('cursorIndex')+1);
				cursorIndex+=1;
				index+=1;
				this.preformMouseUp();
			}
			 if(text==='Rand'&& index!==0 && value.length>index && val[index-1].match(/([0-9|e|p|.])/) && (val[index].match(/([0-9|e|p])/)||value[index]===pi)){
				var v=Math.random().toPrecision(11)+'';this.setData('cursorIndex',cursorIndex+v.length+1);
				value=value.substring(0, index) +'*'+ v+ '*'+value.substring(index, value.length+2);
				if(edit){
					inputField.value=value;
				}
				else{
					inputField.innerHTML=value;
				}
				this.preformMouseUp();
				this.keyUp();
				return;
			}
			else if(text==='Rand' && index!==0 && value.length>=1 &&  val[index-1] && val[index-1].match(/([0-9|e|p|.])/)){
				var v=Math.random().toPrecision(11)+'';this.setData('cursorIndex',cursorIndex+v.length+1);
				value=value.substring(0, index) +'*'+ v+ value.substring(index, value.length+1);
				if(edit){
					inputField.value=value;
				}
				else{
					inputField.innerHTML=value;
				}
				this.preformMouseUp();
				this.keyUp();
				return;
			}
			else if(text==='Rand'&& value.length>index &&  value[index] && val[index].match(/([0-9|e|p|.])/)){
				var v=Math.random().toPrecision(11)+'';this.setData('cursorIndex',cursorIndex+v.length+1);
				value=value.substring(0, index) + v+ '*'+value.substring(index, value.length+1);
				if(edit){
					inputField.value=value;
				}
				else{
					inputField.innerHTML=value;
				}
				this.preformMouseUp();
					this.keyUp();
				return;
			}
			else if(text==='Rand'){
				var v=Math.random().toPrecision(11)+'';
				value=value.substring(0, index) + v+ value.substring(index, value.length);
				if(edit){
					inputField.value=value;
				}
				else{
					inputField.innerHTML=value;
				}
				this.preformMouseUp();
				this.setData('cursorIndex',cursorIndex+v.length);
				this.keyUp();
				return;
			}
			else if(text==='1/x' && value.length>=1 &&  value[index-1] && val[index-1].match(/([0-9|e|p])/)){
				text='*1/'
				value=value.substring(0, index) + text+ value.substring(index, value.length);
				if(edit){
					inputField.value=value;
				}
				else{
					inputField.innerHTML=value;
				}
				this.preformMouseUp();
				this.setData('cursorIndex',cursorIndex+text.length);
				this.keyUp();
				return;
			}
			var value1=this.convertequation(value);
			value1=value1.replace(/^[a-z][(]/,'');
			value1=value1.split(/([0-9.]+|\(|\)|\+|\-|\/|\*|\^|~|N|s|c|t|l|S|C|T|!|%|L|i|o|a|I|O|A|G|E|p|R|e|Q)/g).filter(function(x) {return x!=""} );
			if(value.length!=0 && text==='.'){
				
				if(this.operationForDot()){
					this.keyUp();return;
				}
			}
			else if(value.length!=0 && text==='0'){
				
				if(this.operationForZero()){
					this.keyUp();return;
				}
			}
			else if(text==='='){
				this.$node.querySelector('.calculatorDisplay').classList.add('equalBtn');
				var displaySpan = this.$node.querySelector('.calculatorDispspan')
				if(displaySpan.innerHTML==' '){
					displaySpan.innerHTML='Error';
				}
				if(inputField.className.indexOf('hideCursor')==-1){
					inputField.classList.add('hideCursor');
				}
				if(this.getData('ltPropAria')){
					setTimeout(function(){
						displaySpan.focus()
					},250)
				}
				this.keyUp();
				return;
			}
			if(text==='C'){
				this.operationForBackspace();
				var inputField=this.$node.querySelector('.lyteCalculatorTextField'),value;
				if(edit){
					value=inputField.value;
				}
				else{
					value=inputField.innerHTML;
				}
				if(value.length>=1){
					this.preformMouseUp();
				}
				else if(value.length<1){
					this.clearValue();
				}
				this.keyUp();
			}
			else if(text==='AC'){
				this.clearValue();this.keyUp();return;
			}
			else if(text==="-"&&value1.length>=2&& value[index-2] && value[index-1]==="-" && !val[index-2].match(/[0-9|p|e]/)){
				this.keyUp(); return;
			}
			else if(text==="E"&&value1.length>=1 && value[index-1]&& val[index-1].match(/[!||p|e]/)){
				this.keyUp(); return;
			}
			if(index===0 && (text.match(/^[+|/|*|!|E|%|.]+$/)||text==='logy'||text==='xry'||text==='x2'||text=='xy')){
				this.keyUp();return;
			}
			else if(value!=='' && index-1!==-1 && value[index-1]==='.' && text==='.'){
				this.preformMouseUp();this.keyUp();return;
			}
			else if(value!=='' && index-1!==-1 && (value[index-1]==='E')&&text.match(/([^0-9])/g)){
				this.keyUp();return;
			}
			else if(index==1&&value[index-1]=='-' && (text.match(/^[+|-|/|*|!|%|E]+$/)||text==='logy'||text=='xy')){
				this.keyUp();return;
			}
			else if(value!=='' && index-1!==-1 && value[index-1] && (val[index-1].match(/^[+|\-|/|*|E|^]+$/)||value.substring(index-5,index)==='logy(')&&(text.match(/^[+|-|/|*|!|%|E]+$/)||text==='logy'||text=='xy')){
				if(text=='logy'){
					text+='(';
				}
				if(text=='xy'){
					text='^';
				}
				if(value.substring(index-5,index)==='logy(' && text!=='logy('){
					value=value.substring(0, index-5) + text+ value.substring(index, value.length);
					if(edit){
					inputField.value=value;
					}
					else{
						inputField.innerHTML=value;
					}
					this.preformMouseUp();this.keyUp();this.setData('cursorIndex',cursorIndex-5);
				}
				else if(value.substring(index-5,index)!=='logy(')
				{
					value=value.substring(0, index-1) + text+ value.substring(index, value.length);
					if(edit){
					inputField.value=value;
					}
					else{
						inputField.innerHTML=value;
					}
					this.preformMouseUp();this.keyUp();this.setData('cursorIndex',cursorIndex-1);
				}
				this.setData('cursorIndex',this.getData('cursorIndex')+text.length);
			}
			else if(value!=='' && index-1!==-1 &&  value[index-1] && (val[index-1].match(/([^0-9-%ep!)])/g)||value.substring(index-4,index)==='Rand') &&(text.match(/^[+|-|/|*|!|%|E]+$/)||text==='logy'||text==='xry'||text==='x2'||text==='xy')){
					this.keyUp();return;
			}
			else if(text==="="){

				this.keyUp();return;
			}
			else if(!text.match(/^m[c|+|-|r]/)&&text!='AC'&&text!='C'&&text!='2nd'&&text!='Deg'&&text!='Rad'&&text!='='&&text!='m-'&&text!='>'){
				if(text==="xry"){
					text=r;
				}
				else if(text==='p'){
					text=pi;
				}
				else if(text==='1/x'){
					text="1/"
				}
				else if(text==="10x"){
					text="10^";
				}
				else if(text==="ex"){
					text="e^";
				}
				else if(text==="xy"){
					text="^";
				}
				else if(text==="x2"){
					text="^2";
				}
				else if(text==="sin-1"){
					text="arcsin";
				}
				else if(text==="cos-1"){
					text="arccos";
				}
				else if(text==="tan-1"){
					text="arctan";
				}
				else if(text==="sinh-1"){
					text="arcsinh";
				}
				else if(text==="cosh-1"){
					text="arccosh";
				}
				else if(text==="tanh-1"){
					text="arctanh";
				}
				if(text.match(/^[sin|cos|tan|sinh|cosh|tanh|logy|log|ln|arcsin|arccos|arctan|arcsinh|arccosh|arctanh|sqrt|N]+$/)||text==r){
					text+='(';
				}
				if(value.length===index){
					if(edit){
						inputField.value+=text;
					}
					else{
						inputField.innerHTML+=text;
					}
				}
				else{
					value=value.substring(0, index) + text + value.substring(index, value.length);
					if(edit){
						inputField.value=value;
					}
					else{
						inputField.innerHTML=value;
					}
				}
				this.setData('cursorIndex',cursorIndex+text.length);
				if(flag===0){
					this.setData('check_error',false);
				}
				this.preformMouseUp();
				this.keyUp();return;
			}
			else if(text.match(/^m[c|+|-|r]/)||text==='m-'){
				this.memoryoperations(text);
				this.keyUp();return;
			}
			else if(text==='Deg'||text==='Rad'){
				this.$node.querySelector('.calculatorrad').innerHTML=this.getData('deg') ? 'Rad' : 'Deg';
				this.$node.querySelector('.Deg').innerHTML=this.getData('deg') ? 'Deg' : 'Rad';
				this.setData('deg',!this.getData('deg'));
				if(edit){
					value=this.$node.querySelector('.lyteCalculatorTextField').value;
				}
				else{
					value=this.$node.querySelector('.lyteCalculatorTextField').innerHTML;
				}
				if(value!==''){
					this.preformMouseUp();
				}
				this.keyUp();return;
			}
			else if(text==='2nd'){
				var secondActive=this.getData('secondActive');
				secondActive = secondActive ? false : true;this.setData('secondActive',secondActive);
				key.className = secondActive ? 'calc-second' : ''; // !!!
				for (var n = secondKeySet.length; n--; ) {
					secondKeySet[n].innerHTML = secondLayer[secondActive ? 1 : 0][n];
					if(secondActive){
						secondKeySet[n].classList.add('inverse');
					}
					else{
						secondKeySet[n].classList.remove('inverse');
					}
				}
				this.setData('secondKeySet',secondKeySet);this.keyUp();return;
			}
			
			this.keyUp();
		},
	actions : {
		"mousedown": function(e){ 
			var inputField=this.$node.querySelector('.lyteCalculatorTextField'),index,edit=this.getData('ltPropEditable');
			if(inputField.className.indexOf('hideCursor')!=-1){
				inputField.classList.remove('hideCursor');
			}
			if(!this.getData('ltPropEditable')){
				inputField.classList.add('hideCursorNonEditable');
			}
			this.setData('check_error',false);
			if(edit){
				inputField.focus();
				index=this.getSelectionIndex();
			}
			else{
				index=inputField.innerHTML.length;
			}
			this.setData('cursorIndex',index);
			this.preformMouseDown(e);
		},
		"mouseup": function(e){
			var inputField=this.$node.querySelector('.lyteCalculatorTextField'),index,value,edit=this.getData('ltPropEditable');
			if(edit){
				value=inputField.value;inputField.focus();
			}
			else{
				value=inputField.innerHTML;
			}
			if(edit&&e.key!='Rand'){
				inputField.setSelectionRange(this.getData('cursorIndex'), this.getData('cursorIndex'));
				inputField.focus();
			}
			
		},
		"keydown":function(e){
			var key = e.key,inputField=this.$node.querySelector('.lyteCalculatorTextField'),index,value,edit=this.getData('ltPropEditable');
			if(edit){
				value=inputField.value;inputField.focus();
				index=this.getSelectionIndex();
				inputField.classList.add('hideCursor');
			}
			else{
				value=inputField.innerHTML;
				index=value.length;
				$L.fastdom.measure(function(){
					//scroll for non-editable calculator
					if( inputField)
						{
							var offWidth = inputField.offsetWidth;
							var sWidth = inputField.scrollWidth;
							$L.fastdom.mutate(function(){
								inputField.scrollLeft = sWidth-offWidth;
							}.bind(this))
						}
					}.bind(this));	
			}
			this.setData('check_error',false);
			this.setData('cursorIndex',index);
			if(key==="Backspace"){
				this.operationForBackspace();
				e.preventDefault();return;
			}
			if(this.getData('ltPropEditable')&&(e.which===37)){
				this.operationForArrowLeft();
				return;
			}
			else if(this.getData('ltPropEditable')&&(e.which===39)){
				this.operationForArrowRight();
				return;
			}
			else if(!this.getData('bigger')&& (key==="^"|| key.match(/([^0-9/%*+-.])/g)||key===',') && key!="Backspace" && key!=='Enter' && (e.which!==38||e.which!==40)){
				e.preventDefault();return;
			}
			else if(this.getData('bigger')&& (key.match(/([^0-9/()%^!*+-.])/g)||key===',')&&key!=="Backspace" && key!=='Enter' &&(e.which!==38||e.which!==40)){
				e.preventDefault();return;
			}
			else if(key!="Backspace" && key!="Enter"){
				var value1=this.convertequation(value),val=this.convertToPiandRoot(value);
				value1=value1.replace(/^[a-zA-Z][(]/,'');
				value1=value1.split(/([0-9.]+|\(|\)|\+|\-|\/|\*|\^|~|N|s|c|t|l|S|C|T|!|%|L|i|o|a|I|O|A|G|E|p|R|e|Q)/g).filter(function(x) {return x!=""} );
				if(value.length>0 && (!key.match(/[0-9|.]/)||(key=='1/x' || key=='10x')) && key!='C' && key!='AC'  && value[value.length-1]=='.'){
					value=value+'0';
					if(edit){
						inputField.value=value;
					}
					else{
						inputField.innerHTML=value;
					}
					val=this.convertToPiandRoot(value);
					this.setData('cursorIndex',this.getData('cursorIndex')+1);
					cursorIndex+=1;
					index+=1;
					this.preformMouseUp();
				}
				if(value.length!==0 && key==='.'){
					if(this.operationForDot()){
						e.preventDefault();return;
					}
				}
				else if(value.length!==0 && key==='0'){
					if(this.operationForZero()){
						e.preventDefault();return;
					}
				}
				else if(index==1&&value[index-1]=='-' && (key.match(/^[+|-|/|*|!|%|E]+$/)||key==='logy'||key=='xy')){
					e.preventDefault();return;
				}
				else if(key==="-"&&value1.length>=2 && value[index-1]==="-" && !val[index-2].match(/[0-9|p|e]/)){
					e.preventDefault();return;
				}
				if((value.length===0||index===0)&& key.match(/^[+|/|*|!|%|.|^]+$/)){
					e.preventDefault();return;
				}
				else if(value!=='' && index-1!==-1 && value[index-1]==='.'&& key==='.'){
					e.preventDefault();return;
				}
				else if(value!=='' && index-1!==-1 && (value[index-1].match(/^[+|\-|/|*|E|\^]+$/)||value.substring(index-5,index)==='logy(')&&(key.match(/^[+|-|/|*|!|%|E|\^]+$/)||key==='logy')){
					if(key==='logy'){
						key+='(';
					}
					if(value.substring(index-5,index)==='logy(' && key!=='logy('){
						value=value.substring(0, index-5) + key+ value.substring(index, value.length);
						if(edit){
							inputField.value=value;
						}
						else{
							inputField.innerHTML=value;
						}
						this.setData('cursorIndex',this.getData('cursorIndex')-5);
						e.preventDefault();
					}
					else if(value.substring(index-5,index)!=='logy(')
					{
						value=value.substring(0, index-1) + key+ value.substring(index, value.length);
						if(edit){
							inputField.value=value;
						}
						else{
							inputField.innerHTML=value;
						}
						this.setData('cursorIndex',this.getData('cursorIndex')-1);
						e.preventDefault();
					}
				}
				else if(!edit){
						inputField.innerHTML+=key;
					
				}
					
					this.setData('cursorIndex',this.getData('cursorIndex')+key.length);
				
			}

			// inputField.blur();
		},
		"keyup":function(e){
			var key = e.key,inputField=this.$node.querySelector('.lyteCalculatorTextField'),value,edit=this.getData('ltPropEditable');
			this.setData('check_error',false);	
			if(this.getData('ltPropEditable')){
				value=inputField.value;
			}
			else{
				value=inputField.innerHTML;
			}
			if(this.getData('ltPropEditable')&&(e.which==37)){
				e.preventDefault();
				inputField.classList.remove('hideCursor');
				return;
			}
			else if(this.getData('ltPropEditable')&&(e.which==37)){
				e.preventDefault();
				inputField.classList.remove('hideCursor');
				return;
			}
			if(!this.getData('bigger')&&(key==="^"|| key.match(/([^0-9/%*+-=.])/g))&&key!=="Backspace"&& key!=='Enter' &&( e.which!=37||e.which!=39||e.which!==38||e.which!==40)){
				if(edit){
					inputField.classList.remove('hideCursor');
				}
				this.setData('cursorIndex',this.getData('cursorIndex'));
				e.preventDefault();
				return;
			}
			else if(this.getData('bigger')&& (key.match(/([^0-9/()%^!*+-=.])/g)&&((e.keyCode === 187||e.keyCode!==61)&&!(e.shiftKey)))&&key!=="Backspace" && key!=='Enter' &&( e.which!=37||e.which!=39||e.which!==38||e.which!==40)){
				inputField.classList.remove('hideCursor');this.setData('cursorIndex',this.getData('cursorIndex'));e.preventDefault();return;
			}
			else if(value.length>=1){
				// var key = e.key,inputField=this.$node.querySelector('.lyteCalculatorTextField');
				if(this.$node.querySelector('.calculatorDisplay').className.indexOf('equalBtn')!=-1){
					this.$node.querySelector('.calculatorDisplay').classList.remove('equalBtn');
				}
				if(key==='Backspace'){
					if(edit){
						inputField.setSelectionRange(this.getData('cursorIndex'), this.getData('cursorIndex'));
						inputField.classList.remove('hideCursor');
					}
					this.preformMouseUp();
				}
				else if(key==='='||key==='Enter'){
					var value1=this.convertequation(value);
					value1=value1.replace(/^[a-zA-Z][(]/,'');
					value1=value1.split(/([0-9.]+|\(|\)|\+|\-|\/|\*|\^|~|N|s|c|t|l|S|C|T|!|%|L|i|o|a|I|O|A|G|E|p|R|e|Q)/g).filter(function(x) {return x!=""} );
					this.$node.querySelector('.calculatorDisplay').classList.add('equalBtn');
					this.$node.querySelector('.calculatorDisplay').classList.add('equalBtn');
					if(this.$node.querySelector('.calculatorDispspan').innerHTML==' '){
						this.$node.querySelector('.calculatorDispspan').innerHTML='Error';
					}
					return;
				}
				else if(edit){

					inputField.setSelectionRange(this.getData('cursorIndex'), this.getData('cursorIndex'));
					inputField.classList.remove('hideCursor');
				}
				this.setData('previous',key);
				this.preformMouseUp();
			}
			else{
				if(edit){
					inputField.classList.remove('hideCursor');
				}
				this.clearValue();
			}
		},
		"mupTextField" : function(e){
			var inputField=this.$node.querySelector('.lyteCalculatorTextField'),value=inputField.value,val=this.convertToPiandRoot(value);
			if(this.$node.querySelector('.calculatorDisplay').className.indexOf('equalBtn')!=-1){
				this.$node.querySelector('.calculatorDisplay').classList.remove('equalBtn');
			}
			if(! this.getData('ltPropEditable')){
				inputField.setSelectionRange(value.length, value.length);  
				e.preventDefault();return;
			}
			if(inputField.value.length>=1){
				inputField.focus();
				index=this.getSelectionIndex();
				if((index!==0&&!val[index-1].match(/^[+|\-|/|*|!|^|(|e|p|)|E|%]+$/)&&!val[index-1].match(/[0-9.]/g))&&value.length!==index){
					inputField.setSelectionRange(value.length, value.length);  
						inputField.classList.remove('hideCursor');  
					e.preventDefault();return;
				}
				inputField.classList.remove('hideCursor');  
			}
			inputField.classList.remove('hideCursor');
			 
			
		},
		"mdwnTextField" : function(e){
			var inputField=this.$node.querySelector('.lyteCalculatorTextField');
			inputField.classList.add('hideCursor');
			if(!this.getData('ltPropEditable')&& inputField.className.indexOf('hideCursorNonEditable')===-1){
				inputField.classList.add('hideCursorNonEditable');
			}
			
		}
	}
});
/**
 * @syntax nonYielded 
 * <lyte-calculator> </lyte-calculator> 
 */
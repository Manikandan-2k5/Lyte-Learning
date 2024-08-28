/*------------------------   NOTES   ------------------------*/
/*
  
*/


;(function( window ) {

	var lyteCaretHelper = {
		isPlainObject : function(obj){
			if (typeof obj == 'object' && obj !== null) {
				if (typeof Object.getPrototypeOf == 'function') {	// If Object.getPrototypeOf supported, use it
					var proto = Object.getPrototypeOf(obj);
					return proto === Object.prototype || proto === null;
				}
				// Otherwise, use internal class
			    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
				return Object.prototype.toString.call(obj) == '[object Object]';
			}
			return false;
		},

		contentEditable : function(inputElem){
			return !!(inputElem.contentEditable && inputElem.contentEditable === 'true');
		}
	}

	if(lyteDomObj){	
		
		lyteDomObj.prototype.caret = function(query,value,iframe) {
			var settings;

			var InputFn = function(){
				return{
					contentEditable : false,
					getIEPos : function(){
						var endRange, inputElem, len, msg, pos, range, textRange;
					    inputElem = settings.element;
					    range = settings.document.selection.createRange();
					    pos = 0;
					    if (range && range.parentElement() === inputElem) {
					    	msg = inputElem.value.replace(/\r\n/g, "\n");
					    	len = msg.length;
					    	textRange = inputElem.createTextRange();
					    	textRange.moveToBookmark(range.getBookmark());
					    	endRange = inputElem.createTextRange();
					    	endRange.collapse(false);
					    	if (textRange.compareEndPoints("StartToEnd", endRange) > -1) {
					    		pos = len;
					    	}
					    	else{
					    		pos = -textRange.moveStart("character", -len);
					    	}
					    }
					    return pos;
					},

					getPos : function() {
						if (settings.document.selection) {
							return this.getIEPos();
						} else {
							return settings.element.selectionStart;
						}
					},

					setPos : function(pos){
						var inputElem, range;
					    inputElem = settings.element;
					    if (settings.document.selection) {
					    	range = inputElem.createTextRange();
    						range.move("character", pos);
    						range.select();
					    } else if (inputElem.setSelectionRange) {
					    	inputElem.setSelectionRange(pos, pos);
					    }
					    return inputElem;
					},

					getIEOffset : function(pos){
						var h, textRange, x, y;
					    textRange = settings.element.createTextRange();
					    pos || (pos = this.getPos());
					    textRange.move('character', pos);
					    x = textRange.boundingLeft;
					    y = textRange.boundingTop;
					    h = textRange.boundingHeight;
					    return {
    						left: x,
    						top: y,
    						height: h
    					};
					},

					getOffset : function(pos){
						var inputElem, offset, position;
					    inputElem = settings.element;
					    if (settings.document.selection) {
					    	offset = this.getIEOffset(pos);
					    	offset.top += $L(settings.window).scrollTop() + settings.domObj.scrollTop();
					    	return offset;
					    } else {
					    	offset = settings.domObj.offset();
    						position = this.getPosition(pos);
    						return offset = {
    							left: offset.left + position.left - settings.domObj.scrollLeft(),
    							top: offset.top + position.top - settings.domObj.scrollTop(),
    							height: position.height
    						};
					    }
					},

					getPosition : function(pos){
						var inputElem, startString, endString, html, cloneObj;
					    inputElem = settings.element;
					    if (pos === undefined) {
					    	pos = this.getPos();
					    }
					    startString = settings.domObj.val().slice(0, pos);
					    endString = settings.domObj.val().slice(pos);
					    cloneObj = new Clone();
					    return cloneObj.createClone(this.createHTML(startString,endString)).getPosition();
					},

					getIEPosition : function(pos) {
					    var h, inputOffset, offset, x, y;
					    offset = this.getIEOffset(pos);
					    inputOffset = settings.domObj.offset();
					    x = offset.left - inputOffset.left;
					    y = offset.top - inputOffset.top;
					    h = offset.height;
					    return {
					    	left: x,
					    	top: y,
					    	height: h
					    };
					},

					createHTML : function(startString, endString){
						return ("<span style='position: relative; display: inline;'>" + this.htmlEncode(startString) + "</span>"+
								"<span id='caret' style='position: relative; display: inline;'>|</span>" +
								"<span style='position: relative; display: inline;'>" + this.htmlEncode(endString) + "</span>");
					},

					htmlEncode : function(value) {	//To replace special characters, break and space iwth their respective tags
				    	value = value.replace(/<|>|`|"|&/g, '?').replace(/\r\n|\r|\n/g, "<br/>");
				    	if (/firefox/i.test(navigator.userAgent)) {
					        value = value.replace(/\s/g, '&nbsp;');
					    }
					    return value;
				    }
				};
			};

			var Clone = function(){
				return{
					css_attr : ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap","wordSpacing"],

					copyCss : function() {
					    var css;
					    css = {
					    	position: 'absolute',
					    	left: -9999,
					    	top: 0,
					    	zIndex: -20000
					    };
					    if (settings.domObj.prop('tagName') === 'TEXTAREA') {
					    	this.css_attr.push('width');
					    }
					    $L(this.css_attr).each(function(i, p) {
					    	return css[p] = settings.domObj.css(p);
					    });
					    return css;
					},

					createClone : function(html){
						this.clone = $L('<div></div>');
					    this.clone.css(this.copyCss());
					    this.clone.html(html);
					    _lyteUiUtils.insertAfter(settings.element,this.clone[0]);
					    return this;
					},

					getPosition : function() {
					    var flag, pos, rect;
					    flag = this.clone.find("#caret");
					    pos = flag.position();
					    rect = {
					    	left: pos.left,
					    	top: pos.top,
					    	height: flag.height()
					    };
					    this.clone[0].remove();
					    return rect;
					}
				};
			};

			var EditableFn = function(){
				return{
					contentEditable : true,
					setPos : function(pos) {
						var offset, found, result, fun, sel = settings.window.getSelection();
						if(sel){
							offset = 0;
							found = false;
							fun = function(pos, parent){
								var node, range, i, len, childNodes, result;
						        childNodes = parent.childNodes;
						        result = [];
						        for (i = 0, len = childNodes.length; i < len; i++) {
						        	node = childNodes[i];
							        if (found) {
							            break;
							        }
							        if (node.nodeType === 3) {
							            if (offset + node.length >= pos) {
							            	found = true;
							            	range = settings.document.createRange();
							            	range.setStart(node, pos - offset);
							            	sel.removeAllRanges();
							            	sel.addRange(range);
							            	break;
							            } else {
							            	result.push(offset += node.length);
							            }
							        } else {
							            result.push(fun(pos, node));
							        }
						        }
						        return result;
							}
							result = fun.call(this,pos,settings.element);
						}
						return settings.element;
					},

					getIEPosition : function() {
					    return this.getPosition();
					},

					/*
						* get the caret offset 
						* subtract the content editable element's offset from that will give the position.
					*/
					getPosition : function() {
					    var inputElemffset, offset;
					    offset = this.getOffset();
					    inputElemffset = settings.domObj.offset();
					    offset.left -= inputElemffset.left;
					    offset.top -= inputElemffset.top;
					    return offset;
					},

					getIEPos : function() {
					    var preCaretTextRange, textRange;
					    textRange = settings.document.selection.createRange();
					    preCaretTextRange = settings.document.body.createTextRange();
					    preCaretTextRange.moveToElementText(settings.element);
					    preCaretTextRange.setEndPoint("EndToEnd", textRange);
					    return preCaretTextRange.text.length;
					},

					/*
						* if range available
							* clone range
							* make cloned range to contain the contents of the contentEditable element
							* set the end of the cloned range to the value of the endContainer's end offset (ie. caret position)
							* get the cloned range's string length which will be the position of the caret
							* detach (used to disable the Range object and enable the browser to release associated resources) it.
						* else its IE browser and call the respective getPos method.
					*/
					getPos : function() {
					    var clonedRange, pos, range;
					    if (range = this.getRange()) {
					    	clonedRange = range.cloneRange();
					    	clonedRange.selectNodeContents(settings.element);
					    	clonedRange.setEnd(range.endContainer, range.endOffset);
					    	pos = clonedRange.toString().length;
					    	clonedRange.detach();
					    	return pos;
					    } else if (settings.document.selection) {
					    	return this.getIEPos();
					    }
					},

					getIEOffset : function() {
					    var range, rect;
					    range = settings.document.selection.createRange().duplicate();
					    range.moveStart("character", -1);
					    rect = range.getBoundingClientRect();
					    return {
					    	height: rect.bottom - rect.top,
					    	left: rect.left,
					    	top: rect.top
					    };
					},

					/*
						* get the range Object - fragment of document that can contain nodes and parts of text nodes
						* if (caret is not at the strating position ie. 0)
							* clone the range object and set its start (=> start = end-1) and end
							* calculate the client rect of the clone
							* detach (used to disable the Range object and enable the browser to release associated resources) it.
						* else if (caret position == 0)
							* clone the range object
							* create a text node with pipe character('|') and insert it in the range node.
							* select the created node and calculate the client rect.
							* remove the created node 
							* detach (used to disable the Range object and enable the browser to release associated resources) it.
					*/
					getOffset : function(pos) {
					    var clonedRange, offset, range, rect, shadowCaret;
					    if (settings.window.getSelection && (range = this.getRange())) {
					    	if (range.endOffset - 1 > 0 && range.endContainer !== settings.element) {
						        clonedRange = range.cloneRange();
						        clonedRange.setStart(range.endContainer, range.endOffset - 1);
						        clonedRange.setEnd(range.endContainer, range.endOffset);
						        rect = clonedRange.getBoundingClientRect();
						        offset = {
						          height: rect.height,
						          left: rect.left + rect.width,
						          top: rect.top
						        };
						        clonedRange.detach();
					    	}
					    	if (!offset || (offset != null ? offset.height : undefined) === 0) {
						        clonedRange = range.cloneRange();
						        shadowCaret = settings.document.createTextNode("|");
						        clonedRange.insertNode(shadowCaret);
						        clonedRange.selectNode(shadowCaret);
						        rect = clonedRange.getBoundingClientRect();
						        offset = {
						          height: rect.height,
						          left: rect.left,
						          top: rect.top
						        };
						        shadowCaret.remove();
						        clonedRange.detach();
					    	}
					    } else if (settings.document.selection) {
					    	offset = this.getIEOffset();
					    }
					    if (offset) {
					    	offset.top += $L(settings.window).scrollTop();
					    	offset.left += $L(settings.window).scrollLeft();
					    }
					    return offset;
					},

					/*
						* if window.getSelection available
							* get the selection object and return the range object from that
						* else return null
					*/
					getRange : function() {
					    var sel;
					    if (!settings.window.getSelection) {
					      return;
					    }
					    sel = settings.window.getSelection();
					    if (sel.rangeCount > 0) {
					      return sel.getRangeAt(0);
					    } else {
					      return null;
					    }
					}
				};
			};

			var setContextBy = function(mode){
				if (!!mode) {
					var iframe = mode != null ? mode.iframe : undefined;
					var fWindow = iframe.contentWindow;
					return{
						iframe : iframe,
						window : fWindow,
						document : iframe.contentDocument || fWindow.document
					}
				} else {
					return{
						iframe : undefined,
						window : window,
						document : document
					}
				}
			};

			if(lyteCaretHelper.isPlainObject(value)){
				settings = setContextBy(value);
				value = undefined;
			}
			else{
				settings = setContextBy(iframe);
			}
			if(this[0].tagName == "LYTE-INPUT"){
				if(this[0].ltProp('type') == "textarea"){
					settings.element = this[0].querySelector('textarea');
				}
				if(this[0].ltProp('type') == "text"){
					settings.element = this[0].querySelector('text');
				}
				settings.domObj = $L(settings.element);
			}
			else{
				settings.element = this[0];
				settings.domObj = this;
			}
			
			var executableObj = lyteCaretHelper.contentEditable(this[0]) ? new EditableFn() : new InputFn();

			if(query === "pos"){
				if (value || value === 0) {
			    	return executableObj.setPos(value);
			    } else {
			    	return executableObj.getPos();
			    }
			} else if(query === "position"){
				if (settings.document.selection) {
			    	return executableObj.getIEPosition(value);
			    } else {
			    	return executableObj.getPosition(value);
			    }
			}else if(query === "offset"){
				var offset;
			    offset = executableObj.getOffset(value);
			    return offset;
			} else{
				console.error("Sorry! The method ",query," doesn\'t match the predefined set of methods. Kindly check.");
				return null;
			}

	    	return this;
		}
		
	}

})( window );

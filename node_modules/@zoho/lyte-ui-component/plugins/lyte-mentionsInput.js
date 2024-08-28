/*------------------------   NOTES   ------------------------*/
/*
  1. Added dropbody attribute
  2. Added displayMentions attribute
*/


;(function( window ) {

	if(lyteDomObj){	
		var postpone = (function () {
		    var fnMap = new Map(), idMap = new Map(), fnId = 0;
		    var msg = { fnId: 0 };
		    function _postpone(fn) {
		        if (!fnMap[fn]) {
		            fnId++;
		            fnMap[fn] = fnId;
		            idMap[fnId] = fn;
		        }
		        msg.fnId = fnMap[fn];
		        postMessage(msg, '*');
		    }
		    function _postponeListener(e) {
		        var fnId = e.data.fnId;
		        if (fnId) {idMap[fnId]()};
		    }
		    window.addEventListener("message", _postponeListener);
		    return _postpone;
		}());
		
		lyteDomObj.prototype.mIManager = {
			KEY : { BACKSPACE : 8, TAB : 9, RETURN : 13, ESC : 27, LEFT : 37, UP : 38, RIGHT : 39, DOWN : 40, COMMA : 188, SPACE : 32, HOME : 36, END : 35 }, // Keys "enum"
			inputBuffer : [],
			currentDataQuery : null,
			textarea : null,
			escapeMap : { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;'},
			bindResize : false,
			id : null,
			bindScroll : false,
			bindClick : false,
			searchTriggeredId : false,
			mentionRegex : new RegExp("\\@\\[\\d+\\:\\w+\\]","gi"),
			encodeMsg : function(str, mentionsArray){
				var mIManager = lyteDomObj.prototype.mIManager, newStr = "", pos = 0;
				mentionsArray.forEach(function(mention){
					if(str.indexOf(mention) != -1){
						newStr += mIManager.htmlEncode(str.substring(0, str.indexOf(mention))) + mention;
						pos = str.indexOf(mention) + mention.length;
						str = str.substring(pos);
					}
				});
				newStr += mIManager.htmlEncode(str);
				return newStr;
			},
			htmlEncode : function (str) {
			  var mIManager = lyteDomObj.prototype.mIManager;
			  var escaper = function(match){
			  	return mIManager.escapeMap[match];
			  }
			  var src = '(?:' + Object.keys(mIManager.escapeMap).join('|') + ')';
			  var testRegexp = RegExp(src);
    		  var replaceRegexp = RegExp(src, 'g');
    		  str = str == null ? '' : '' + str;
		      return testRegexp.test(str) ? str.replace(replaceRegexp, escaper) : str;
		    },
		    mentionsSyntax : function(mention){
		    	return "["+mention.value+":"+mention.id+"]";
		    },
			createElement : function(tagName,id,className){
				var element = document.createElement(tagName);
				if (id) {
					element.id = id;
				}
				if (className) {
					$L(element).addClass(className);
				}
				return element;
			},
			setCaratPosition : function (domNode, caretPos) {
		      if (domNode.createTextRange) {
		        var range = domNode.createTextRange();
		        range.move('character', caretPos);
		        range.select();
		      } else {
		        if (domNode.selectionStart) {
				  domNode.setSelectionRange(caretPos, caretPos);
		          domNode.focus();
		        //   domNode.setSelectionRange(caretPos, caretPos);
		        } else {
		          domNode.focus();
		        }
		      }
		    },
			init : function(element){
				var mIManager = lyteDomObj.prototype.mIManager;
				var ele1 = mIManager.createElement("div",null,"lyteMIWrapper");
				_lyteUiUtils.insertBefore(element,ele1);
				_lyteUiUtils.appendChild(ele1,element);
				// ele1.append(element);
				var ele = mIManager.createElement("div",null,"lyteMIDropdown");
				_lyteUiUtils.insertAfter(element,ele);
				mIManager.copyTextarea(element);
				var cs = window.getComputedStyle(element);
				var ele2 = mIManager.createElement("div",null,"lyteMentions");
				ele2.style.fontFamily = cs.fontFamily;
				ele2.style.fontSize = cs.fontSize;
				ele2.style.fontWeight = cs.fontWeight;
				var ele3 = mIManager.createElement("div",null,"lyteMentionsInnerDiv");
				_lyteUiUtils.appendChild(ele2,ele3);
				// ele2.append(mIManager.createElement("div",null,"lyteMentionsInnerDiv"));
				_lyteUiUtils.insertBefore(element,ele2);
				return ele;
			},
			rtrim : function(string) {
    			return string.replace(/\s+$/,"");
  			},
  			ltrim : function(string) {
    			return string.replace(/^\s+/,"");
  			},
  			highlightContent : function (value, term) {
			    if (!term && !term.length) {
			      return value;
			    }
			    return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
		    },
		    copyTextarea : function(element) {
		      var mIManager = lyteDomObj.prototype.mIManager;
		      //	We will create a div clone of the textarea
		      //	by copying these attributes from the textarea to the div.
		      var attrs = [ 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'fontSize', 'lineHeight', 'fontFamily', 'width', 'fontWeight', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'borderTopStyle', 'borderTopColor', 'borderRightStyle', 'borderRightColor', 'borderBottomStyle', 'borderBottomColor', 'borderLeftStyle', 'borderLeftColor', 'box-sizing', '-moz-box-sizing', '-webkit-box-sizing'];

		        // CopyTextarea only works on textareas
		        if (element.type !== 'textarea') {
		          return false;
		        }
		        var mITextarea = $L(element),
		          cloneTextarea = $L(mIManager.createElement('div')).css({'display':'none','word-wrap':'break-word'}),
		          lineHeight = parseInt(mITextarea.css('line-height'), 10) || parseInt(mITextarea.css('font-size'), '10'),
		          minheight = parseInt(mITextarea.css('height'), 10) || lineHeight * 3,
		          maxheight = parseInt(mITextarea.css('max-height'), 10) || Number.MAX_VALUE,
		          goalheight = 0;

		          cloneTextarea.addClass('lyteMIOffsetDiv');
		        // Updates the width of the twin. (solution for textareas with widths in percent)
		        function setCloneDivWidth(textareaWidth, cloneWidth) {
		          var curatedWidth = Math.floor(parseInt((textareaWidth || mITextarea.outerWidth()), 10));

		          if(mITextarea[0]._mIData && mITextarea[0]._mIData._overlayDiv){
		          	$L(mITextarea[0].previousElementSibling).css("fontSize",mITextarea.css("fontSize"));
		          }
		          if ((cloneWidth || cloneTextarea.outerWidth()) !== curatedWidth) {
		            cloneTextarea.css({'width': curatedWidth + 'px', 'fontSize': mITextarea.css("fontSize")});

		            if(cloneTextarea[0].getAttribute('setHeight') === "true"){
		            	cloneTextarea[0].setAttribute('setHeight',"false");
		            }
		            else{
		            	// Update height of textarea
		            	updateTextarea(true);
		            }
		            
		          }
		        }

		        // Sets a given height and overflow state on the textarea
		        function setHeightAndOverflow(height, overflow, textareaHeight) {

		          var curratedHeight = Math.floor(parseInt(height, 10));
		          if (textareaHeight !== curratedHeight) {
		            mITextarea.css({'height': curratedHeight + 'px','overflow':overflow});

		            // // Fire the custom event resize
		            setCloneDivWidth();

		          }
		        }

		        // This function will update the height of the textarea if necessary
		        var updateTextarea = function(forced) {
		        	cloneTextarea[0].style.display = "block";
		        	
		        	// Get curated content from the textarea.

			        var textareaContent = mITextarea[0].value.replace(/&/g, '&amp;').replace(/ {2}/g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');
			        
			        // Compare curated content with curated twin.

			        
			        var cloneContent = (cloneTextarea[0].innerHTML).replace(/<br>/ig, '<br />');

			        if (forced || mITextarea[0].value + '&nbsp;' !== cloneContent) {
			        		
			            // Add an extra white space so new rows are added when you are at the end of a row.
			            cloneTextarea.html('');

			            cloneTextarea[0].innerHTML = textareaContent +'&nbsp;';
			           

			            var cloneHeight = cloneTextarea.outerHeight(), 
			            	textareaHeight = mITextarea.outerHeight();
			            // Change textarea height if twin plus the height of one line differs more than 3 pixel from textarea height
			            if (Math.abs(cloneHeight + lineHeight - textareaHeight) >= 3 || textareaContent === "") {

			            	cloneTextarea[0].setAttribute('setHeight',"true");
				            var goalheight = cloneHeight;
				            if (goalheight >= maxheight) {
				                setHeightAndOverflow(maxheight, 'auto', textareaHeight);
				            } else if (goalheight <= minheight) {
				                setHeightAndOverflow(minheight, 'hidden', textareaHeight);
				            } else {
				                setHeightAndOverflow(goalheight, 'hidden', textareaHeight);
				            }
			            }

			            var cloneWidth = cloneTextarea.outerWidth(),
			            	textareaWidth = mITextarea.outerWidth();
			            //Check for the width changes in textarea
			            if(textareaWidth != cloneWidth){
			            	cloneTextarea[0].setAttribute('setHeight',"true");
			            	setCloneDivWidth(textareaWidth, cloneWidth);
			            }
			            cloneTextarea[0].style.display = "";
			        }

		        };

		        // Opera returns max-height of -1 if not set
		        if (maxheight < 0) {
		          maxheight = Number.MAX_VALUE;
		        }

		        // Append the twin to the DOM
		        // We are going to meassure the height of this, not the textarea.

		        _lyteUiUtils.insertAfter(mITextarea[0],cloneTextarea[0]);

		        // Copy the essential styles (attrs) from the textarea to the twin
		        var i = attrs.length;
		        while (i--) {

		          if (attrs[i].toString() === 'width' && mITextarea.css(attrs[i].toString()) === '0px') {
		            setCloneDivWidth();
		          } else {
		            cloneTextarea.css(attrs[i].toString(), mITextarea.css(attrs[i].toString()));
		            // console.log(attrs[i].toString() +"===" + mITextarea.css(attrs[i].toString()))
		          }
		        }
		        updateTextarea(true);

		        // Update textarea size on keyup, change, cut and paste
		        mITextarea[0]._closureEvnt = updateTextarea;
		        mITextarea[0].addEventListener('input', mITextarea[0]._closureEvnt);
		        mITextarea[0].addEventListener('change', mITextarea[0]._closureEvnt);

		    },

		    //Call setCloneDivWidth function at the end of the resize event so that the changes are available for calculation
	        callAtTheEndOfResize : function (e){
	        	var mIManager = lyteDomObj.prototype.mIManager;
	        	clearTimeout(mIManager.id);
				mIManager.id = setTimeout(function(){
					var mentionElems = document.querySelectorAll('textarea[data-lyte-mentions="true"]');
					if(mentionElems.length > 0){
						for(var i = 0; i<mentionElems.length; i++){
							var mITextarea = $L(mentionElems[i]),
								cloneTextarea = $L(mentionElems[i].nextElementSibling),
								curatedWidth = Math.floor(parseInt(mITextarea.outerWidth(), 10));
							if(mITextarea[0]._mIData && mITextarea[0]._mIData._overlayDiv){
								$L(mITextarea[0].previousElementSibling).css("fontSize",mITextarea.css("fontSize"));
							}
							if (cloneTextarea.outerWidth() !== curatedWidth) {
								cloneTextarea.css({'width': curatedWidth + 'px', 'fontSize': mITextarea.css("fontSize")});
								if(cloneTextarea[0].getAttribute('setHeight') === "true"){
					            	cloneTextarea[0].setAttribute('setHeight',"false");
					            }
					            else{
					            	// Update height of textarea
					            	var evt;
									if(typeof(Event) === 'function') {
									    evt = new Event('change');
									}else{
									    evt = document.createEvent('Event');
									    evt.initEvent('change', true, true);
									}
					            	mITextarea[0].dispatchEvent(evt);
					            }
							}
						}
					}
				}, 200);
	        }

		}


		lyteDomObj.prototype.mentionsInput = function(object) {
			var mIManager = lyteDomObj.prototype.mIManager;
			if(!mIManager.bindResize){
				//findIndex
				if (!Array.prototype.findIndex) {
				  Object.defineProperty(Array.prototype, 'findIndex', {
				    value: function(predicate) {
				     // 1. Let O be ? ToObject(this value).
				      if (this == null) {
				        throw new TypeError('"this" is null or not defined');
				      }

				      var o = Object(this);

				      // 2. Let len be ? ToLength(? Get(O, "length")).
				      var len = o.length >>> 0;

				      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
				      if (typeof predicate !== 'function') {
				        throw new TypeError('predicate must be a function');
				      }

				      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
				      var thisArg = arguments[1];

				      // 5. Let k be 0.
				      var k = 0;

				      // 6. Repeat, while k < len
				      while (k < len) {
				        // a. Let Pk be ! ToString(k).
				        // b. Let kValue be ? Get(O, Pk).
				        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				        // d. If testResult is true, return k.
				        var kValue = o[k];
				        if (predicate.call(thisArg, kValue, k, o)) {
				          return k;
				        }
				        // e. Increase k by 1.
				        k++;
				      }

				      // 7. Return -1.
				      return -1;
				    },
				    configurable: true,
				    writable: true
				  });
				}

	        	window.addEventListener('resize', mIManager.callAtTheEndOfResize);
	        	mIManager.bindResize = true;
	        }



			/*--------------------------------  UTILITY FUNCTIONS START  ----------------------------------*/
			var lyteMIList, textarea,
	            lyteMIActiveItem = [],
	            lyteMICollection = [],
	            currentDataQuery = '';

			var resetBuffer = function(){
				mIManager.inputBuffer = [];
			};

			var callOnBeforeAdd = function(data, selectedObj, newValue){
				return data.onBeforeAdd(selectedObj, newValue);
			}
			var callOnAdd = function(data,selectedObj){
		    	data.onAdd(selectedObj);
		    };

		    var callonRemove = function(data,removedCollection){
		    	if(data.onRemove){
		    		data.onRemove(removedCollection);
		    	}
		    }

			var filterDuplicateResult = function(rArray,mArray){
				for(var i = 0; i<mArray.length; i++){
					for(var j = 0; j<rArray.length; j++){
						if(mArray[i].id == rArray[j].id){
							rArray.splice(j,1);
						}
					}
				}
				return rArray;
			};

			var getIndexPosition = function(message, str){
				return message.indexOf(str) + str.length;
			};

			var modifyNodeContent = function() {
		    var syntaxMessage = textarea.value || "";
		    var searchBy = textarea._mIData.searchBy;
		    var indPos = 0, processedStr = "", mentionsArray = [];
			  textarea._mIData.lyteMICollection.forEach(function(mention) {
				var textSyntax = textarea._mIData.triggerChar+mIManager.mentionsSyntax({id : mention.id, value : mention[textarea._mIData.searchBy]});
				mentionsArray.push(textSyntax);
				processedStr = syntaxMessage.substring(0,indPos);
				syntaxMessage = processedStr + syntaxMessage.substring(indPos).replace(mention[textarea._mIData.searchBy], textSyntax);
				indPos = indPos + getIndexPosition(syntaxMessage.substring(indPos),textSyntax);	
			  });


		      var mentionText = mIManager.htmlEncode(syntaxMessage);
		      var mentionText = mIManager.encodeMsg(syntaxMessage, mentionsArray);
		      textarea._mIData.lyteMICollection.forEach(function (mention) {
		      	
		      	var textSyntax = textarea._mIData.triggerChar+mIManager.mentionsSyntax({id : mention.id, value : mention[textarea._mIData.searchBy]});
		      	
		        var textHighlight = "<strong class='lyteMentionsStrongDiv'><span>"+mention[textarea._mIData.searchBy].replace(/&/g,"&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")+"</span></strong>";
		        mentionText = mentionText.replace(textSyntax, textHighlight);
		        
		 
		      });
		      

		      mentionText = mentionText.replace(/\n/g, '<br/>');
		      mentionText = mentionText.replace(/ {2}/g, '&nbsp; ');
		      textarea._mIData.syntaxMessage = syntaxMessage;
		    	textarea._mIData._overlayDiv.innerHTML= mentionText;

		    	/*console.log(textarea._mIData.lyteMICollection);
		    	var textareanode = textarea.value || "";
		    	var pos = 0;
		    	while(pos < textarea.length){

		    	}*/
		      
		    }

		    var updatelyteMICollection = function() {
		      // var inputText = textarea.value;
		      var syntaxMessage = textarea._mIData.syntaxMessage;
		      var searchBy = textarea._mIData.searchBy;
		      lyteMICollection = textarea._mIData.lyteMICollection;
		      var newCollection = [], removedCollection = [];
		      var indPos = 0;
		      for(var i = 0; i < lyteMICollection.length; i++){
		      	var collection = lyteMICollection[i][searchBy]+":"+lyteMICollection[i].id;
		      	if(lyteMICollection[i][searchBy] && syntaxMessage.indexOf(collection) != -1 ){
		      		newCollection.push(lyteMICollection[i]);
		      		syntaxMessage = syntaxMessage.substring(syntaxMessage.indexOf(collection) + 1 + collection.length);
			      }
		      	else{
		      		removedCollection.push(lyteMICollection[i]);
		      	}
		      }
		      textarea._mIData.lyteMICollection = newCollection;
		      if(removedCollection.length){
		      	callonRemove(textarea._mIData,removedCollection);
		      }
		    }
		    var positionalPush = function(data, msg){
		    	var indPos = 0,
		    		count = 0,
		    		searchBy = textarea._mIData.searchBy,
		    		lyteMICollection = textarea._mIData.lyteMICollection, processedStr="";
		    	for(var i = 0; i < lyteMICollection.length; i++){
		    		var ind = msg.substring(indPos).indexOf(lyteMICollection[i][searchBy]);
		    		if(ind == -1){
		    			break;
		    		}
		    		else{
		    			indPos = getIndexPosition(msg,lyteMICollection[i][searchBy]);
		    			++count;
		    		}
		    	}
		    	textarea._mIData.lyteMICollection.splice(count,0,data);

		    }

			var updateCollection = function(data) {
			  textarea._addedMentions = true;
		      var currentMessage = textarea.value;
			  var appendSpaceOnAdd = textarea._mIData.appendSpaceOnAdd;
		      var value = data[textarea._mIData.searchBy];
		      //Get the mentions position based on cursor position
		      var startCaretPosition = textarea.selectionEnd - mIManager.currentDataQuery.length - 1;
		      var currentCaretPosition = textarea.selectionEnd;

		      //If the string received based on cursor position dosent match the query, get the query position
		      if(currentMessage.substring(startCaretPosition,currentCaretPosition) !== textarea._mIData.triggerChar + mIManager.currentDataQuery){ 
		      	  // Using a regex to figure out positions
			      var regex = new RegExp("\\" + textarea._mIData.triggerChar + mIManager.currentDataQuery, "gi");
			      regex.exec(currentMessage);

			       startCaretPosition = regex.lastIndex - currentDataQuery.length - 1;
			       currentCaretPosition = regex.lastIndex;
		      }
		      
		      var start = currentMessage.substr(0, startCaretPosition);
		      var end = currentMessage.substr(currentCaretPosition, currentMessage.length);
		      var startEndIndex = (start + value).length + (appendSpaceOnAdd?1:0);

		      var updatedMessageText = start + value +(appendSpaceOnAdd?" ":"") + end;
			  if(textarea._mIData.onBeforeAdd &&  callOnBeforeAdd(textarea._mIData,data, updatedMessageText) ===  false){
				hideDropdown();
				return;
			  }
		      data.position = {start : startCaretPosition, end : startCaretPosition + value.length};
		      positionalPush(data, start);

		      // Cleaning before inserting the value, otherwise auto-complete would be triggered with "old" inputbuffer
		      resetBuffer();
		      mIManager.currentDataQuery = '';
		      hideDropdown();

		      // Mentions - syntax message
		      textarea.value = updatedMessageText;
		      modifyNodeContent();
		      triggerChangeEvt(textarea);
		   //    var evt;
			  // if(typeof(Event) === 'function') {
			  //     evt = new Event('change');
			  // }else{
			  //     evt = document.createEvent('Event');
			  //     evt.initEvent('change', true, true);
			  // }
		   //    textarea.dispatchEvent(evt);
		      // Set correct focus and selection
		    // textarea.focus();
		      setTimeout( function(){
			      mIManager.setCaratPosition(textarea, startEndIndex);
			  },50);
		      if(textarea._mIData.onAdd){
		      	callOnAdd(textarea._mIData,data);
		      }
		    }

			var hideDropdown = function(input, dropdown){
				var tArea = input ? input : textarea;
				lyteMIActiveItem = [];
				dropdown = dropdown || lyteMIList;
				if(!dropdown){
					dropdown = tArea._mIData.lyteMIList;
				}
				if(tArea._mIData.onHide){
					tArea._mIData.onHide(dropdown, tArea);
				}
				if(tArea._mIData.dropbody){
					dropdown.innerHTML = "";
				}
				if(tArea._mIData.preventParentScroll && tArea._scrollDisabled) {
					disableParentListeners(tArea);
				}
				
				dropdown.classList.remove('lyteMIDisplayBlock','lyteMIAddOverflow','lyteMIListAppended','lyteMIDropdown__Down','lyteMIDropdown__Up');
				if(tArea._mIData.dropdownClass) {
					dropdown.classList.remove(tArea._mIData.dropdownClass);
				}
				dropdown.style = "";
			};

			var createLiElement = function(data){
				var ele = mIManager.createElement('lyte-mentions-item');
				ele._mentionsData = data;
				var value = $L.texthighlighter(data[textarea._mIData.searchBy],mIManager.currentDataQuery,'b');
				var span = mIManager.createElement('span','','lyteMIItemContent');
				span.appendChild(value);
				ele.appendChild(span);
				return ele;
			};
			var updateAdvancedCollections = function(newSyntax){
				lyteMICollection = textarea._mIData.lyteMICollection;
				var newCollection = [], removedCollection = [];
				var searchBy = textarea._mIData.searchBy;
				var mentionsSyntax = mIManager.mentionsSyntax;
				var triggerChar = textarea._mIData.triggerChar;
				var regex = new RegExp(textarea._mIData.triggerChar+"\\[(.+?)\\:(.+?)\\]",'gi');
				var start = 0, mappedStart = 0, end;
				for(var i = 0; i<lyteMICollection.length; i++){
					var actualValue =  lyteMICollection[i][searchBy];
					var mentionObj = {id: lyteMICollection[i].id, value: actualValue};
					var mentionSyntax = triggerChar+mentionsSyntax(mentionObj);
					var index = newSyntax.indexOf(mentionSyntax);
					var previousString = newSyntax.substring(0,index);
					var missed = regex.exec(previousString);
					if(missed === null && index != -1 ){
						start += (index + actualValue.length);
						mappedStart = index + mentionSyntax.length;
						lyteMICollection[i].position = {end: start};
						newCollection.push(lyteMICollection[i]);
						newSyntax = newSyntax.substring(mappedStart);
					}
					else{
						removedCollection.push(lyteMICollection[i]);
						end = lyteMICollection[i].position.end;
					}
				}
				textarea._mIData.lyteMICollection = newCollection;
				if(removedCollection.length){
					callonRemove(textarea._mIData,removedCollection);
					return {end: end};
				}
			};

			var addToCollections = function(data, startIndex){
		    	var index = 0,
		    	lyteMICollection = textarea._mIData.lyteMICollection;
		    	for(; index < lyteMICollection.length; index++){
		    		if(lyteMICollection[index].position.end > startIndex) {
						break;
					}
		    	}
		    	textarea._mIData.lyteMICollection.splice(index,0,data);
		    };

			var advancedModifyNodeContent = function(newText) {
				var newSyntax = textarea._valueMap.newSyntax;
				var mentions = []; 
				textarea._mIData.lyteMICollection.forEach(function(mention){
					mentions.push(textarea._mIData.triggerChar+mIManager.mentionsSyntax({id : mention.id, value : mention[textarea._mIData.searchBy]}));
				});
				var mentionText = mIManager.encodeMsg(newSyntax, mentions);
				var newTextValue = newText;
		     	textarea._mIData.lyteMICollection.forEach(function (mention,index) {
					var textSyntax = mentions[index];
					var textHighlight = "<strong class='lyteMentionsStrongDiv'><span>"+mention[textarea._mIData.searchBy].replace(/&/g,"&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")+"</span></strong>";
					mentionText = mentionText.replace(textSyntax, textHighlight);
		      	});
				mentionText = mentionText.replace(/\n/g, '<br />');
				mentionText = mentionText.replace(/ {2}/g, '&nbsp; ');
				textarea._valueMap = {
					oldSyntax: newSyntax,
					oldText: newText
				}
				textarea._mIData.syntaxMessage = newSyntax;
				textarea._mIData._overlayDiv.innerHTML = mentionText;
				// textarea._mIData._overlayDiv.appendChild(document.createTextNode(mentionText));
			};
			var copyObject = function(object){
				return Object.assign({},object);
			};
			
			var addMentions = function(mention){
				mention =  copyObject(mention);
				textarea._addedMentions = true;
				var appendSpaceOnAdd = data.appendSpaceOnAdd;
				var str = textarea._valueMap.oldSyntax;
				var startCaretPosition = textarea.selectionEnd - mIManager.currentDataQuery.length - 1;
				var currentCaretPosition = textarea.selectionEnd;
				var start = mapTextIndex(str, startCaretPosition, 'start');
   				var end = start + currentCaretPosition - startCaretPosition;
				var insert = textarea._mIData.triggerChar+mIManager.mentionsSyntax({id : mention.id, value : mention[textarea._mIData.searchBy]})+(appendSpaceOnAdd?" ":"");
				var newValue = str.substring(0,start)+insert+str.substring(end);
				var newText = getText(newValue);
				if(textarea._mIData.onBeforeAdd &&  callOnBeforeAdd(textarea._mIData, data, newText) ===  false){
					hideDropdown();
					return;
				}
				textarea._valueMap.newSyntax =  newValue; 
				addToCollections(mention,startCaretPosition);
				// if(newText !=  textarea.value) {

				resetBuffer();
				mIManager.currentDataQuery = '';
				hideDropdown();

				textarea.value = newText;
				updateAdvancedCollections(newValue);
				advancedModifyNodeContent(newText);

				setSelectionPosition(mention.position.end+(appendSpaceOnAdd?1:0));// 1 for space
				if(textarea._mIData.onAdd){
					callOnAdd(textarea._mIData,data);
				}
				// }
			};

			var setSelectionPosition = function(end){
				triggerChangeEvt(textarea);
				// textarea.focus();
				setTimeout( function(){
					mIManager.setCaratPosition(textarea, end);
					setSelection(textarea);
				},10);
			};

			var onSelect = function(event) {
		    	var elmTarget = $L(this);
		    	if(!lyteMIList){
		    		lyteMIList = this.closest('.lyteMIDropdown');
		    	}
		    	textarea = lyteMIList._textarea;
				var advanced = data.removeHighlightCompletely;
				if(advanced) {
					addMentions(elmTarget[0]._mentionsData);
				}
				else {
					updateCollection(elmTarget[0]._mentionsData);
				}
		    	// updateCollectionPosition(textarea);
		    	// textarea.dispatchEvent(new InputEvent('change'));

		    	event.stopPropagation();
		    }


			var onKeyUpOrDown = function(ele){
				if(!ele){
					return;
				}

				if($L('lyte-mentions-item'/*textarea._mIData.listItemTag*/,lyteMIList).length){
					$L('lyte-mentions-item'/*textarea._mIData.listItemTag*/,lyteMIList).removeClass(textarea._mIData.activeItem);
				}
				$L(ele).addClass(textarea._mIData.activeItem);
				lyteMIActiveItem = [];
		    	lyteMIActiveItem.push(ele);
			};

			var getCursorXY = function(textarea, scrolled){
				var customDiv = document.createElement('div');
				var styles = getComputedStyle(textarea);
				
				var currentMessage = textarea.value;
				var properties = {};
				for(var prop in styles){
					if(!((/[\d -]+/g).test(prop) || typeof styles[prop] == "function") ){
						
						if( prop == "lineHeight" ){
							properties[prop] = styles[prop];
						}
						if( prop == "letterSpacing" ){
							properties[prop] = styles[prop];
						}
						if( prop == "height" ){
							properties[prop] = "auto";
						}
						if( prop == "width" ){
							properties[prop] = styles[prop];
						}
						if( prop == "fontSize" ){
							properties[prop] = styles[prop];
						}
						if( prop == "paddingLeft" ){
							properties[prop] = styles[prop];
						}
						if( prop == "paddingRight" ){
							properties[prop] = styles[prop];
						}
						if( prop == "paddingTop" ){
							properties[prop] = styles[prop];
						}
						if( prop == "paddingBottom" ){
							properties[prop] = styles[prop];
						}
						if( prop == "marginLeft" ){
							properties[prop] = styles[prop];
						}
						if( prop == "marginRight" ){
							properties[prop] = styles[prop];
						}
						if( prop == "marginTop" ){
							properties[prop] = styles[prop];
						}
						if( prop == "marginBottom" ){
							properties[prop] = styles[prop];
						}
						if( prop == "borderLeft" ){
							properties[prop] = styles[prop];
						}
						if( prop == "borderRight" ){
							properties[prop] = styles[prop];
						}
						if( prop == "borderTop" ){
							properties[prop] = styles[prop];
						}
						if( prop == "borderBottom" ){
							properties[prop] = styles[prop];
						}
						if( prop == "boxSizing" ){
							properties[prop] = styles[prop];
						}
						if( prop == "whiteSpace" ){
							properties[prop] = styles[prop];
						}
						if( prop == "fontWeight" ){
							properties[prop] = styles[prop];
						}
						if( prop == "fontFamily" ){
							properties[prop] = styles[prop];
						}
						if( prop == "testAlign" ){
							properties[prop] = styles[prop];
						}
						if( prop == "display" ){
							properties[prop] = styles[prop];
						}
						if( prop == "direction" ){
							properties[prop] = styles[prop];
						}
						if( prop == "wordBreak" ){
							properties[prop] = styles[prop];
						}
						if( prop == "wordWrap" ){
							properties[prop] = styles[prop];
						}
						if( prop == "wordSpacing" ){
							properties[prop] = styles[prop];
						}
						if( prop == "position" ){
							properties[prop] = "relative";
						}
					}
				}
				for(var prop in properties){
					customDiv.style[prop] = styles[prop];
				}


			    // Figure out positions
				var selectionStart =  scrolled?textarea._prevSelectionStart:textarea.selectionStart;
			    var startCaretPosition = selectionStart - (mIManager.currentDataQuery.length+1);

				var textContent = currentMessage.substr(0, startCaretPosition);
				customDiv.textContent = textContent;
				// customDiv.style.height = 'auto';
				var span = document.createElement('span');
				span.textContent = currentMessage.substr(startCaretPosition, mIManager.currentDataQuery.length+1) || '.';
				customDiv.appendChild(span);
				var customWrapper = document.createElement('div');
				customWrapper.className = "lyteMentionsCustomWrapper";
				customWrapper.appendChild(customDiv);
				document.body.appendChild(customWrapper);
				var textareaOffset = textarea.getBoundingClientRect();
				var spanOffset = span.getBoundingClientRect();
				var xscroll = window.pageXOffset || document.documentElement.scrollLeft;
                var yscroll = window.pageYOffset || document.documentElement.scrollTop;
				var offset = {
					x : textareaOffset.left + xscroll + span.offsetLeft - textarea.scrollLeft,
					y : textareaOffset.top + yscroll + span.offsetTop - textarea.scrollTop,
					height : spanOffset.height,
					width : spanOffset.width
				}
				customWrapper.remove();
				return offset;
			};

			var resetScrollForParent = function(event) {
				var scrollTop = $L( this ).data( 'lyte-scrollTop' ),
				scrollLeft = $L( this ).data( 'lyte-scrollLeft' );
				this.scrollTop = scrollTop;
				this.scrollLeft = scrollLeft;
			};

			var disableLyteScrollBar = function( event ) {
				event.stopPropagation();
			};

			var isScrollable = function( index, item ) {
				var overflowY = $L( item ).css( 'overflow-y' ),
				overflowX = $L( item ).css( 'overflow-x' );
				var allowableValue = ["scroll","auto"];
				if( ( item.clientWidth < item.scrollWidth && allowableValue.indexOf(overflowX) > -1 ) || ( item.clientHeight < item.scrollHeight && allowableValue.indexOf(overflowY) > -1 ) ) {
					return true;
				}
		
				return false;
			};

			var isLyteScrollBar = function( index, item ) {
				return item.classList.contains( 'lyteScrollBar' );
			};

			var disableParentListeners =  function(textarea) {
				var scrollableParents = textarea._scrollableParents;
				var lyteScrollBarParents =  textarea._lyteScrollBarParents;
				if( scrollableParents ) {
					scrollableParents.off( 'scroll', textarea._resetScrollFunc );
					delete textarea._scrollableParents;
					delete textarea._resetScrollFunc;
				}
				if( lyteScrollBarParents ) {

					lyteScrollBarParents.each( function( index, item ) {
		
						if( item ) {
							item.removeEventListener( 'touchmove', textarea._disableLyteScrollBar, true );
							item.removeEventListener( 'wheel', textarea.disableLyteScrollBar, true );
						}
						
					} );
					delete textarea._lyteScrollBarParents;
					delete textarea._disableLyteScrollBar;
				}
				delete textarea._scrollDisabled;
			};

			var preventParentScroll = function(dropdown, textarea) {

				var parents = $L( textarea ).parents(),
				lyteScrollBarParents;
		
				parents = parents.filter( isScrollable );

				lyteScrollBarParents = parents.filter( isLyteScrollBar );

				lyteScrollBarParents = lyteScrollBarParents.map( function( index, item ) {
					return item.parentNode;
				} );
				parents.each( function( index, item ) {
					$L( item ).data( 'lyte-scrollTop', item.scrollTop );
					$L( item ).data( 'lyte-scrollLeft', item.scrollLeft );
				} );
				textarea._disableLyteScrollBar = disableLyteScrollBar;
				lyteScrollBarParents.each( function( index, item ) {
					if( item ) {
						item.addEventListener( 'touchmove', textarea._disableLyteScrollBar, true );
						item.addEventListener( 'wheel', textarea._disableLyteScrollBar, true );
					}
				} );
				textarea._scrollableParents = parents;
				textarea._lyteScrollBarParents = lyteScrollBarParents;
				textarea._scrollDisabled = true;
				textarea._resetScrollFunc  = resetScrollForParent;
				parents.on( 'scroll', textarea._resetScrollFunc );
		
				document.body.classList.add( 'lyteBodyWrapper' );
			};

			var positionDropdown = function(lyteMIList, scrolled){
				var textarea = lyteMIList._textarea;
				if(scrolled && textarea._mIData.preventParentScroll) {
					return;
				}
			    var textareaOffset = textarea.getBoundingClientRect();
			    var listOffset = lyteMIList.getBoundingClientRect();
			    var winH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				var winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			    var xscroll = window.pageXOffset || document.documentElement.scrollLeft;
                var yscroll = window.pageYOffset || document.documentElement.scrollTop;
			    winH += yscroll;
			    var xy = getCursorXY(textarea, scrolled);
			    // console.log("listOffset.height ====" + listOffset.height);
			    // console.log("winH - textareaOffset.bottom ====" + (winH - textareaOffset.bottom));
			    // console.log("winH - textareaOffset.top ====" + (winH - textareaOffset.top));
			    if(listOffset.height < (winH - (xy.y + xy.height + 5))){  //Appending at Bottom
			    	lyteMIList.style.top = (xy.y + xy.height + 5) + "px";
			    	$L(lyteMIList).removeClass('lyteMIDropdown__Up');
			    	$L(lyteMIList).addClass('lyteMIDropdown__Down');
			    }
			    else if(listOffset.height < xy.y){  //Appending at Top
			    	lyteMIList.style.top = xy.y - listOffset.height + "px";
			    	$L(lyteMIList).removeClass('lyteMIDropdown__Down');
			    	$L(lyteMIList).addClass('lyteMIDropdown__Up');
			    }
			    else{  //Appending at Bottom Forcefully
			    	var position = getPositionUpOrDown(winH, xy.y, xy.height);
			    	if(position == "up"){
			    		lyteMIList.style.top = "5px";
				    	$L(lyteMIList).height(xy.y - 5);
				    	$L(lyteMIList).addClass('lyteMIAddOverflow','lyteMIDropdown__Up');
			    	}
			    	else{
			    		lyteMIList.style.top = (xy.y + xy.height + 5) + "px";
				    	$L(lyteMIList).height(winH - (xy.y + xy.height + 5) - 5);
				    	$L(lyteMIList).addClass('lyteMIAddOverflow','lyteMIDropdown__Down');
			    	}
			    }
			    if((xy.x + listOffset.width) < textareaOffset.right){
			    	lyteMIList.style.left = xy.x + "px";
			    }
			    else{
			    	var leftVal = (xy.x + xy.width) - listOffset.width;
			    	if(leftVal < 0){
			    		if(xy.x + xy.width <= textareaOffset.left + (textareaOffset.width / 2)){
			    			lyteMIList.style.maxWidth = (textareaOffset.right - xy.x) + "px";
			    			leftVal = xy.x;
			    		}
			    		else{
			    			lyteMIList.style.maxWidth = (listOffset.width + leftVal) - 10 + "px";
			    			leftVal = 10;
			    		}
			    	}
			    	else if(leftVal > textareaOffset.right){
			    		leftVal = textareaOffset.left;
			    	}
					var dropdownRight = leftVal+listOffset.width;
					if(dropdownRight > winWidth) {
						leftVal = leftVal + (winWidth - dropdownRight);
					}
			    	lyteMIList.style.left = leftVal + "px";
			    }
			    
			    if(!scrolled){
					$L(lyteMIList).addClass('lyteMIListAppended');
					if(textarea._mIData.preventParentScroll && !textarea._scrollDisabled) {
						preventParentScroll(lyteMIList, textarea);
					}
					if(textarea._mIData.onBeforeShow){
				    	textarea._mIData.onBeforeShow(lyteMIList,textarea);
				    }
					textarea._prevSelectionStart = textarea.selectionStart;
				}
			    
			}

			var getPositionUpOrDown = function(winH,tATop,tAHeight){
				if((tATop - 5) > (winH - (tATop + tAHeight + 5))){
					return "up";
				}
				else{
					return "down";
				}
			}

			var checkForMaxWidth = function(lyteMIList){
				if(getComputedStyle(lyteMIList).maxWidth === "none"){
					var cs = getComputedStyle(lyteMIList._textarea);
					lyteMIList.style.maxWidth = (parseFloat(cs.width) - (parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight))) + "px";
				}
			}

			//Create the dropdown
			var populateDropdown = function(results){
				if (!results.length) {
			        // hideDropdown();
			        return;
			      }

			      var elmDropDownList = mIManager.createElement('ul');

			      for(var i = 0; i<results.length; i++){
			      	  var liEle = createLiElement(results[i]);
			      	  liEle.addEventListener('click',onSelect,true);
			          
				      if(textarea._mIData.avatars && results[i].avatar){
				      	  var elmIcon = new Image();
				      	  elmIcon.src = results[i].avatar;
				      	  liEle.prepend(elmIcon);
				      }
				      elmDropDownList.append(liEle);
				      liEle = null;
			      }
			      lyteMIList.append(elmDropDownList);
			      if(!lyteMIList._appended){
			      	_lyteUiUtils.appendChild(document.body, lyteMIList);
			      	lyteMIList._appended = true;
			      }
			      onKeyUpOrDown(elmDropDownList.children[0]);
				  if(textarea._mIData.dropdownClass) {
					$L(lyteMIList).addClass(textarea._mIData.dropdownClass);
				  }
			      $L(lyteMIList).addClass('lyteMIHide');
			      $L(lyteMIList).addClass('lyteMIDisplayBlock');
			      checkForMaxWidth(lyteMIList);
			      positionDropdown(lyteMIList);
			      $L(lyteMIList).removeClass('lyteMIHide');
			};

			var filterData = function(responseData){
				var mode = textarea._mIData.mode,
					searchBy = textarea._mIData.searchBy,
					query = mIManager.currentDataQuery,
					results = [];
				if(responseData.length)
                {
                   for(var i = 0; i < responseData.length; i++){
                      	switch(mode){
                          	case 'contains' : {
                              	if(responseData[i][searchBy].trim().toLowerCase().indexOf(query.toLowerCase()) >= 0)
                               	  {
                                      results.push(responseData[i]);
                                  }
                              break;    
                           	}
                           	case 'startsWith' : {
                                if(responseData[i][searchBy].trim().toLowerCase().startsWith(query.toLowerCase()))
                                   {
                                      results.push(responseData[i]);
                                   }
                                break;
                           	}
                           	case 'endsWith' : {
                                if(responseData[i][searchBy].trim().toLowerCase().endsWith(query.toLowerCase()))
                                   {
                                        results.push(responseData[i]);
                                   }
                                break;
                           	}
                        }  
                    }

                    populateDropdown(textarea._mIData.allowDuplicates ? results : filterDuplicateResult(results,textarea._mIData.lyteMICollection));
                }
			};

			var trigerSearch = function(){
				var query = mIManager.currentDataQuery;
				if (((textarea._mIData.minChars == 0) || (query && query.length && query.length >= textarea._mIData.minChars))
					&& ((textarea._mIData.maxChars === Infinity) || (query && query.length && query.length <= textarea._mIData.maxChars))) {
      				var responseData = textarea._mIData.onDataRequest(query);
      				if(responseData){
  						if( responseData.then ) {
							Promise.resolve( responseData ).then( function( arg ) {
								if(data.dropbody === false) {
									if(!lyteMIList._appended){
								      	_lyteUiUtils.appendChild(document.body, lyteMIList);
								      	lyteMIList._appended = true;
								    }
									var returnVal = data.displayMentions(arg, query, lyteMIList);
									if(returnVal === undefined || returnVal){
										if(returnVal === "bindClick"){
											textarea._mIData.validateCollections = true;
											var listItems = $L('lyte-mentions-item',lyteMIList);
											for(var i = 0; i<listItems.length; i++){
												listItems[i].addEventListener('click',onSelect,true);
											}
										}
										onKeyUpOrDown(lyteMIList.querySelector('lyte-mentions-item'/*data.listItemTag*/));
										$L(lyteMIList).addClass('lyteMIHide');
									    $L(lyteMIList).addClass('lyteMIDisplayBlock');
									    checkForMaxWidth(lyteMIList);
									    positionDropdown(lyteMIList);
									    $L(lyteMIList).removeClass('lyteMIHide');
									}
								} else {
									populateDropdown(arg);
								}
							}, function(e) {
								console.error(e);
							});
						} else {
							filterData(responseData);
						}
      				}
    			}
			};

			var scrollIntoView = function(parent, element, move ) {
				var offsetTop = element.offsetTop,
				scrollT = parent.scrollTop,
				height = parent.getBoundingClientRect().height,
				elementHeight = element.getBoundingClientRect().height;

				if( move === 'down' 
					&& scrollT + height < offsetTop + elementHeight 
				) {
					parent.scrollTop = parent.scrollTop + offsetTop + elementHeight - ( height + scrollT );
				}
				else if( move === 'up' 
						&& offsetTop < scrollT 
					) {
					parent.scrollTop = offsetTop
				}
			};

			var getElement = function(element, cond){
				var reqdEle = null, tag = element.tagName;
				if(cond == "next"){
					while(element.nextElementSibling){
						if(element.nextElementSibling.tagName === tag){
							reqdEle = element.nextElementSibling;
							break;
						}
						element = element.nextElementSibling;
					}
				}
				if(cond == "prev"){
					while(element.previousElementSibling){
						if(element.previousElementSibling.tagName === tag){
							reqdEle = element.previousElementSibling;
							break;
						}
						element = element.previousElementSibling;
					}
				}
				return reqdEle;
			};

			var getLastIndex = function(message, query){	//gets the particular word without space and returns the index of the query
				// var lastSpaceIndex = message.lastIndexOf(" ");
				// var msg = message.substring(lastSpaceIndex === -1 ? 0 : lastSpaceIndex+1);
					
				// 	// Scenarios to be considered -
				// 	// * Valid if only one @ is present and it is the first alphabet of the word. eg- @sam
				// 	// * Invalid if more than one @ is present.Dropdown should be hidden. eg- @sam@zoho
				// 	// * Invalid if there are more characters or alphabets before @. eg- random@sam
				
				// if((msg.match(new RegExp(query,"g")) || []).length == 1 && (msg.indexOf(query) == 0)){
				// 	return message.lastIndexOf(query);
				// }
				// console.log("from getLastIndex",message);
				var occurences = (message.match(new RegExp(query,"g")) || []).length;
				var lastIndex;
				var withSpace =  data.triggerWithSpace;
				while(occurences > 0 && message){
					lastIndex = message.lastIndexOf(query);
					if(lastIndex == 0){
						return lastIndex;
					}
					if(lastIndex > 0 && (!withSpace || (message.charAt(lastIndex - 1) == " ") || (message.charAt(lastIndex - 1) == "\n"))){
						return lastIndex;
					}
					message = message.substring(0,lastIndex);
					occurences = (message.match(new RegExp(query,"g")) || []).length;
				}
				return -1;
			};

			var omitMentionedFromTextInput = function(message){
				var mentions = textarea._mIData.lyteMICollection;
				if(mentions.length > 0){
					for(var i = mentions.length - 1; i >= 0; i--){
						if(mentions[i].position.end <= message.length){
							return message.substring(mentions[i].position.end);
						}
					}
				}
				return message;
			};


			var isValidQuery = function(query){
				/*Notes : here query.indexOf("\n") > -1 added to fix the currentDataQuery 
				example @someName \n someName here search should not be triggered.
				*/
				if((query.charAt(0) == " ") || (query.charAt(0) == "\n") || query.indexOf("\n") > -1){
					return false;
				}
				return true;
			};


			var triggerChangeEvt = function(textarea){
				var evt;
				if(typeof(Event) === 'function') {
				    evt = new Event('change');
				}else{
				    evt = document.createEvent('Event');
				    evt.initEvent('change', true, true);
				}
				textarea.dispatchEvent(evt);
			};

			/*--------------------------- UTILITY FUNCTIONS END ----------------------------*/

			/*--------------------------- INITIALIZATION STARTS -------------------------*/

			if(typeof object === "string"){
				
				if(object === "setMessage"){

					textarea =  this.length > 0 ? (this[0].tagName === "LYTE-INPUT" && this[0].ltProp('type') == "textarea" ? this[0].querySelector('textarea') : this[0]) : null;
					if(textarea && textarea.getAttribute('data-lyte-mentions')){
						if(typeof arguments[1] === "object"){
							if(textarea.value){
								this.mentionsInput('reset');
							}
							var message = arguments[1].message;
							var mentionText = message;
							var collection = arguments[1].collection ? arguments[1].collection : textarea._mIData.onDataRequest();
							var newCollection = [],
							msgArr = [],
							currMsg = message;
							collection.forEach(function(mention){
								mention = copyObject(mention);
								var mentionObj = {id : mention.id, value : mention[textarea._mIData.searchBy]};
								var textSyntax = textarea._mIData.triggerChar+mIManager.mentionsSyntax(mentionObj);
								var index = message.indexOf(textSyntax);
		        	
								if(index != -1){
									var ind = currMsg.indexOf(textSyntax);
									msgArr.push(currMsg.substring(0,ind));
									currMsg = currMsg.substring(ind+textSyntax.length);

									mention.position = {start : index, end : index + mentionObj.value.length};
									newCollection.push(mention);
									var textHighlight = "<strong class='lyteMentionsStrongDiv'><span>"+mentionObj.value.replace(/&/g,"&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")+"</span></strong>";
									message = message.replace(textSyntax,mentionObj.value);
									mentionText = mentionText.replace(textSyntax,textHighlight);
									msgArr.push(textHighlight);
								}
							});
							
							msgArr.push(currMsg);
								mentionText = mentionText.replace(/\n/g, '<br />');
						    mentionText = mentionText.replace(/ {2}/g, '&nbsp; ');
						    if(textarea._callee && textarea._callee.tagName == "LYTE-INPUT"){
						    	textarea._callee.ltProp('value',message);
						    }
						    else{
						    	textarea.value = message;
						    }
						    textarea._mIData.syntaxMessage = arguments[1].message + " ";
						    // textarea._mIData._overlayDiv.innerHTML = mentionText;
						    msgArr.forEach(function(text,index){
						    	
						    	if(index%2 == 0){
						    		var textNode = document.createTextNode(text);
						    		textarea._mIData._overlayDiv.appendChild(textNode);
						    	}
						    	else{
						    		textarea._mIData._overlayDiv.innerHTML = textarea._mIData._overlayDiv.innerHTML + text;
						    	}
						    });
						    textarea._mIData.lyteMICollection = newCollection;
						    triggerChangeEvt(textarea);
							if(textarea._mIData.removeHighlightCompletely){
								textarea._valueMap = {
									oldSyntax: arguments[1].message,
									oldText: message
								};
							}
						 //    var evt;
							// if(typeof(Event) === 'function') {
							//     evt = new Event('change');
							// }else{
							//     evt = document.createEvent('Event');
							//     evt.initEvent('change', true, true);
							// }
							// textarea.dispatchEvent(evt);
							textarea.focus();	
						}
						else{

							if(!textarea){
							console.error("Element doesnt exist.Please check.");
							return null;
						}
							console.error("Inappropriate arguments passed. Please pass an object containing a message and a collection to be set.");
							return null;
						}
					}
					else{
						console.error(this + " is not Initialized using lyte-mentions plugin.Please check.");
						return null;
					}
				}

				if(object === "getMessage"){

					textarea =  this.length > 0 ? (this[0].tagName === "LYTE-INPUT" && this[0].ltProp('type') == "textarea" ? this[0].querySelector('textarea') : this[0]) : null;
					if(textarea && textarea.getAttribute('data-lyte-mentions')){
						return (textarea._mIData.syntaxMessage ? textarea._mIData.syntaxMessage : textarea.value);
					}
					else{
						if(!textarea){
							console.error("Element doesnt exist.Please check.");
							return null;
						}
						console.error(this + " is not Initialized using lyte-mentions plugin.Please check.");
						return null;
					}
				}

				if(object === "getCollection"){

					textarea =  this.length > 0 ? (this[0].tagName === "LYTE-INPUT" && this[0].ltProp('type') == "textarea" ? this[0].querySelector('textarea') : this[0]) : null;
					if(textarea && textarea.getAttribute('data-lyte-mentions')){
						return textarea._mIData.lyteMICollection;
					}
					else{
						if(!textarea){
							console.error("Element doesnt exist.Please check.");
							return null;
						}
						console.error(this + " is not Initialized using lyte-mentions plugin.Please check.");
						return null;
					}
				}

				if(object === "destroy"){

					textarea =  this.length > 0 ? (this[0].tagName === "LYTE-INPUT" && this[0].ltProp('type') == "textarea" ? this[0].querySelector('textarea') : this[0]) : null;
					if(textarea && textarea.getAttribute('data-lyte-mentions')){
						textarea.removeAttribute('data-lyte-mentions');
						if(textarea._mIData.removeHighlightCompletely) { 
							textarea.removeEventListener('mouseup',textarea._lyteMenIpMouseUpEvent);
							delete textarea._lyteSetSelection;
							delete textarea._lyteMenIpMouseUpEvent;
						}
						if(textarea.scrollableParents && textarea._scrollDisabled) {
							disableParentListeners(textarea);
						}
						var wrapper = textarea.parentElement;
						_lyteUiUtils.insertBefore(wrapper,textarea);
						textarea._mIData._overlayDiv = null;
						textarea._mIData.lyteMIList._textarea = null;
						textarea._mIData.element = null;
						textarea._mIData.lyteMIList.remove();
						textarea._mIData.lyteMIList = null;
						textarea._mIData = null;
						wrapper.remove();
						textarea.removeEventListener('keydown', textarea._lyteMenIpKeydownEvent);
				    	textarea.removeEventListener('keypress', textarea._lyteMenIpKeypressEvent);
				    	textarea.removeEventListener('input', textarea._lyteMenIpInputEvent);
				    	// textarea.removeEventListener('click', textarea._lyteMenIpClickEvent, true);
				    	// textarea.removeEventListener('blur', textarea._lyteMenIpBlurEvent);
				    	textarea.removeEventListener('paste', textarea._lyteMenIpPasteEvent);
				    	textarea.removeEventListener('input',textarea._closureEvnt);
				    	textarea.removeEventListener('change',textarea._closureEvnt);
						delete textarea._prevSelectionStart;
				    	delete textarea._lyteMenIpKeydownEvent;
				    	delete textarea._lyteMenIpKeypressEvent;
				    	delete textarea._lyteMenIpInputEvent;
				    	delete textarea._lyteMenIpClickEvent;
				    	delete textarea._lyteMenIpBlurEvent;
				    	delete textarea._closureEvnt;
						delete textarea._lyteMenIpPasteEvent;
						delete textarea._valueMap;
						delete textarea._selection;
						delete textarea._mIData;
						delete textarea._lytePosDropdown;
						delete textarea._lyteHideDropdown;
						delete textarea.triggerInputEvent;
						delete textarea._lyteDisableParentScrollListeners;
				    	if(mIManager.bindResize && document.querySelectorAll('textarea[data-lyte-mentions="true"]').length == 0){
				    		window.removeEventListener('resize', mIManager.callAtTheEndOfResize);
				    		mIManager.bindResize = false;
				    	}
				    	if(mIManager.bindClick && document.querySelectorAll('textarea[data-lyte-mentions="true"]').length == 0){
				    		document.body.removeEventListener('click', mIManager.onClick, true);
							mIManager.onClick = null;
				    		mIManager.bindClick = false;
				    	}
				    	if(mIManager.bindScroll && document.querySelectorAll('textarea[data-lyte-mentions="true"]').length == 0){
				    		window.removeEventListener('scroll', mIManager.onScroll, true);
							mIManager.onScroll = null;
				    		mIManager.bindScroll = false;
				    	}
						if(mIManager.bindSelect && document.querySelectorAll('textarea[data-lyte-mentions="true"]').length == 0){
				    		document.body.removeEventListener('selectionchange', mIManager.onSelection, true);
							mIManager.onSelection = null;
				    		mIManager.bindSelect = false;
				    	}
					}
					else{
						if(!textarea){
							console.error("Element doesnt exist.Please check.");
							return null;
						}
						console.error(this + " is not Initialized using lyte-mentions plugin.Please check.");
						return null;
					}
				}

				if(object === "reset"){

					textarea =  this.length > 0 ? (this[0].tagName === "LYTE-INPUT" && this[0].ltProp('type') == "textarea" ? this[0].querySelector('textarea') : this[0]) : null;
					if(textarea && textarea.getAttribute('data-lyte-mentions')){
						if(textarea._callee && textarea._callee.tagName == "LYTE-INPUT"){
					    	textarea._callee.ltProp('value', '');
					    }
					    else{
					    	textarea.value = '';
					    }
						if(textarea._mIData.removeHighlightCompletely){
							textarea._valueMap = {
								newText : "",
								newSyntax: ""
							};
							updateAdvancedCollections("");
							advancedModifyNodeContent("");
						}
						else {
							modifyNodeContent();
							updatelyteMICollection();
						}
						triggerChangeEvt(textarea);
						// var evt;
						// if(typeof(Event) === 'function') {
						//     evt = new Event('change');
						// }else{
						//     evt = document.createEvent('Event');
						//     evt.initEvent('change', true, true);
						// }
						// textarea.dispatchEvent(evt);
					}
					else{
						if(!textarea){
							console.error("Element doesnt exist.Please check.");
							return null;
						}
						console.error(this + " is not Initialized using lyte-mentions plugin.Please check.");
						return null;
					}
				}

				return true;
			}
			var data = object ? object : {};
			var element;

			if(this.length > 1){
				var elemArray = this;
				for(var i=0; i<elemArray.length; i++){
					if(elemArray[i].tagName == "LYTE-INPUT" && elemArray[i].ltProp('type') == "textarea"){
						var elem = elemArray[i].querySelector('textarea');
						var copyData = Object.assign({},data);
						copyData.isLyteInput = true;
						$L(elem).mentionsInput(Object.assign({},copyData));
					}
					else{
						$L(elemArray[i]).mentionsInput(Object.assign({},data));
					}
					
				}
				return;
			}
			else{
				if(this[0].tagName == "LYTE-INPUT" && this[0].ltProp('type') == "textarea"){
					element = this[0].querySelector('textarea');
					data.isLyteInput = true;
				}
				else{
					element = this[0];
				}
			}
			if(element.getAttribute('data-lyte-mentions')){
				if(element._mIData){
					element._mIData.mode = data.mode ? data.mode : element._mIData.mode;
					element._mIData.activeItem = data.activeItem ? data.activeItem : element._mIData.activeItem;
					element._mIData.triggerChar = data.triggerChar ? data.triggerChar : element._mIData.triggerChar;
					element._mIData.minChars = data.minChars == undefined ? element._mIData.minChars : parseInt(data.minChars);
					element._mIData.maxChars = data.maxChars === undefined ? element._mIData.maxChars : parseInt(data.maxChars);
					element._mIData.avatars = data.avatars == undefined ? element._mIData.avatars : data.avatars;
					element._mIData.searchBy = data.searchBy ? data.searchBy : element._mIData.searchBy;
					element._mIData.dropbody = data.dropbody == undefined ? element._mIData.dropbody : data.dropbody;
					element._mIData.listItemTag = data.listItemTag == undefined ? element._mIData.listItemTag : data.listItemTag;
					element._mIData.interval = data.interval ? parseInt(data.interval) : element._mIData.interval;
					element._mIData.onDataRequest = data.onDataRequest ? data.onDataRequest : element._mIData.onDataRequest;
					element._mIData.onAdd = data.onAdd ? data.onAdd : element._mIData.onAdd;
					element._mIData.onBeforeAdd = data.onBeforeAdd ? data.onBeforeAdd : element._mIData.onBeforeAdd;
					element._mIData.onRemove = data.onRemove ? data.onRemove : element._mIData.onRemove;
					element._mIData.displayMentions = data.displayMentions ? data.displayMentions : element._mIData.displayMentions;
					element._mIData.onHide = data.onHide ? data.onHide : element._mIData.onHide;
				}
				else{
					element._mIData = data;
					console.error("ALERT ! You are trying to bind mentions behaviour to a textarea which already has it enabled. Please don't call it twice to avoid abnormal behaviour.");
				}
				return this;
			}
			element.setAttribute('data-lyte-mentions',true);
			//Initialize values
			data.element = element;
			data.mode = data.mode ? data.mode : "contains"; //contains,startsWith, endsWith
			data.activeItem = data.activeItem ? data.activeItem : "lyteMIActive";
			data.triggerChar = data.triggerChar ? data.triggerChar : '@';
			data.minChars = data.minChars == undefined ? 1 : parseInt(data.minChars);
			data.maxChars = data.maxChars === undefined ? Infinity : parseInt(data.maxChars);
			data.avatars = data.avatars == undefined ? true : data.avatars;
			data.searchBy = data.searchBy ? data.searchBy : "name";
			data.lyteMICollection = [];
			data.dropbody = data.dropbody == undefined ? true : data.dropbody;
			data.listItemTag = data.listItemTag == undefined ? 'li' : data.listItemTag;
			data.interval = data.interval ? parseInt(data.interval) : 0;
			data.allowDuplicates = data.allowDuplicates ? true : false;
			data.removeHighlightCompletely = data.removeHighlightCompletely? true : false;
			data.triggerWithSpace =  data.triggerWithSpace === undefined? true : data.triggerWithSpace;
			data.appendSpaceOnAdd = data.appendSpaceOnAdd === undefined? true : data.appendSpaceOnAdd;
			data.dropdownClass =  data.dropdownClass === undefined ? "" : data.dropdownClass;
			data.preventParentScroll = data.preventParentScroll === undefined ? false : data.preventParentScroll;
			data.onEscapeClose = data.onEscapeClose == undefined ? true : data.onEscapeClose;
			var clickEvent = function(event){
				resetBuffer();
			};

			var inputEvent = function(event){
				textarea = this;
				lyteMIList = textarea._mIData.lyteMIList;
				// console.log("inputEvent",cursorPos.prev,event);
				if(textarea._mIData.removeHighlightCompletely) {
					var skipUpdate;
					var valueMap = textarea._valueMap;
					if(valueMap.undoAndRedo){
						if(valueMap.oldText === textarea.value) {
							skipUpdate = true;
						}
						delete valueMap.undoAndRedo;
					} ;
					var selection = textarea._selection;
					var range = {
						start : selection.start,
						end : selection.end,
						currentEnd : textarea.selectionEnd
					};
					var returnValue = skipUpdate ?{newValue:valueMap.oldSyntax}:updateMentions(textarea.value,range);
					var newMappedValue = returnValue.newValue;
					var selectionEnd = returnValue.selectionEnd;
					valueMap.newSyntax = newMappedValue;
					var newText = getText(newMappedValue);
					var removed = updateAdvancedCollections(newMappedValue);
					advancedModifyNodeContent(newText);
					if(removed) {
						textarea.value = newText;
						setSelectionPosition(selectionEnd);
					}
					setSelection(textarea);
				}
				else {
					modifyNodeContent();
				}
				if(textarea._mIData.dropbody || textarea._mIData.validateCollections){
					!data.removeHighlightCompletely && updatelyteMICollection();
				}
				 // updateCollectionPosition(textarea);
	        	 hideDropdown();
	        	 getInputBuffer(textarea);
	        	 // console.log("input",mIManager.inputBuffer);
	        	 // var triggerCharIndex = findLastIndex(mIManager.inputBuffer, textarea._mIData.triggerChar); //Returns the last match of the triggerChar in the inputBuffer
	        	 var triggerCharIndex = getLastIndex(mIManager.inputBuffer.join(''), textarea._mIData.triggerChar);
	        	 if (triggerCharIndex > -1 && isValidQuery(mIManager.inputBuffer.slice(triggerCharIndex + 1).join(''))) { //If the triggerChar is present in the inputBuffer array
	        	 	if(mIManager.searchTriggeredId){
	        	 		clearTimeout(mIManager.searchTriggeredId);
	        	 		mIManager.searchTriggeredId = false;
	        	 	}
	        	 	mIManager.searchTriggeredId = setTimeout(function(){
	        	 		mIManager.searchTriggeredId = false;
	        	 		currentDataQuery = mIManager.inputBuffer.slice(triggerCharIndex + 1).join(''); //Gets the currentDataQuery
		        	    mIManager.currentDataQuery = currentDataQuery/*mIManager.ltrim(currentDataQuery)*/; //Deletes the whitespaces
		        	    // console.log("before requesting",mIManager.currentDataQuery);
		        	    trigerSearch(); //Invoking the function trigerSearch
	        	 	},textarea._mIData.interval);
	        	 }
	        	 else{
	        	 	if(mIManager.searchTriggeredId){
	        	 		clearTimeout(mIManager.searchTriggeredId);
	        	 		mIManager.searchTriggeredId = false;
	        	 	}
	        	 }
			};

			var getInputBuffer = function(textarea){
				var currentMessage = textarea.value || "";
				mIManager.inputBuffer = [];
				// var typedValue = event.key/*String.fromCharCode(event.which || event.keyCode)*/;
				if(textarea.selectionStart < textarea.selectionEnd/* && typedValue*/){
					currentMessage = currentMessage.substring(0,textarea.selectionStart);
					// mIManager.inputBuffer = [];
				}
				currentMessage = omitMentionedFromTextInput(currentMessage.substring(0,textarea.selectionEnd))/* + typedValue*/;
				// console.log("message in keypress",currentMessage);
				var triggerCharIndex = getLastIndex(currentMessage, textarea._mIData.triggerChar)/*currentMessage.lastIndexOf(textarea._mIData.triggerChar)*/;
				if(triggerCharIndex > -1){
					var bufferMessage = currentMessage.substring(triggerCharIndex)/* + typedValue*/;
					mIManager.inputBuffer = bufferMessage.split("");
				}
			};
			var initializeSelection= function() {
				if(!mIManager.bindSelect) {
					mIManager.onSelection = function(){
						var activeElement = document.activeElement;
						if(activeElement.getAttribute("data-lyte-mentions")) {
							activeElement._lyteSetSelection(activeElement);
						}
					};
					document.body.addEventListener('selectionchange',mIManager.onSelection,true);
					mIManager.bindSelect = true;
				}
			};
			var keypressEvent = function(event){
				textarea = this;
				// console.log("calling from key press"+mIManager.inputBuffer+"===="+String.fromCharCode(event.which || event.keyCode))
				var KEY = mIManager.KEY;
				if((event.keyCode === KEY.LEFT && event.key !== "%") || (event.keyCode === KEY.RIGHT && event.key !== "'") || (event.keyCode === KEY.HOME && event.key !== "$") || (event.keyCode === KEY.END && event.key !== "#") || (event.keyCode === KEY.UP && event.key !== "&") || (event.keyCode === KEY.DOWN && event.key !== "(") || event.keyCode === KEY.BACKSPACE || event.keyCode === KEY.TAB || event.keyCode === KEY.RETURN || event.keyCode === KEY.ESC || event.key === "Shift" || event.key == "Control" || event.key == "Alt" || event.key == "Meta"){
					return;
				}
				// if(mIManager.inputBuffer.length != 0 || (mIManager.inputBuffer.length == 0 && textarea.selectionStart == 0) || textarea._addedMentions){
					// var typedValue = event.key/*String.fromCharCode(event.which || event.keyCode)*/;
    //   				mIManager.inputBuffer.push(typedValue);
    //   				textarea._addedMentions = false;
    //   				console.log("pushing it",mIManager.inputBuffer);
				// }
				// else{	//when the cursor is taken out of the textarea and again it is cliked to type any alphabet
					// console.log("calling it",mIManager.inputBuffer);
					var currentMessage = textarea.value || "";
					var typedValue = event.key/*String.fromCharCode(event.which || event.keyCode)*/;
					if(textarea.selectionStart < textarea.selectionEnd && typedValue){
						currentMessage = currentMessage.substring(0,textarea.selectionStart) + typedValue;
						mIManager.inputBuffer = [];
					}
					currentMessage = omitMentionedFromTextInput(currentMessage.substring(0,textarea.selectionStart)) + typedValue;
					// console.log("message in keypress",currentMessage);
					var triggerCharIndex = getLastIndex(currentMessage, textarea._mIData.triggerChar)/*currentMessage.lastIndexOf(textarea._mIData.triggerChar)*/;
					if(triggerCharIndex > -1){
						var bufferMessage = currentMessage.substring(triggerCharIndex)/* + typedValue*/;
						mIManager.inputBuffer = bufferMessage.split("");
					}
				// }
			};

			var keydownEvent = function(event){
				textarea = this;
				var KEY = mIManager.KEY;
				if(data.onEscapeClose && event.keyCode == KEY.ESC){
					hideDropdown(event.target);
				}
				// This also matches HOME/END on OSX which is CMD+LEFT, CMD+RIGHT
	            if (event.keyCode === KEY.LEFT || event.keyCode === KEY.RIGHT || event.keyCode === KEY.HOME || event.keyCode === KEY.END) {
	                // Defer execution to ensure carat pos has changed after HOME/END keys then call the resetBuffer function
	                // _.defer(resetBuffer);
	                postpone(resetBuffer);

	                return;
	            }
				if(data.removeHighlightCompletely) {
					setSelection(textarea);
				}
	            //If the key pressed was the backspace or cut(ctrl+x or cmd+x) or 
	            //to clear the text to ths left of the cursor in that line by pressing cmd+backspace in mac
	            if (event.keyCode === KEY.BACKSPACE || ((event.metaKey || event.ctrlKey) && event.keyCode == 88)) {
	            	var length = textarea.selectionStart - textarea.selectionEnd;
	            	// var userDeleted = checkForDeletedUser(textarea);
	            	// if(userDeleted){
	            	// 	event.preventDefault();
	            	// }
					// console.log("keydown delete or remove",textarea.selectionStart,textarea.selectionEnd);
	            	if(Math.abs(length) > mIManager.inputBuffer.length || (event.metaKey && (event.keyCode === KEY.BACKSPACE))/* || userDeleted*/){
						mIManager.inputBuffer = [];
	            	}
	            	else{
	            		mIManager.inputBuffer = mIManager.inputBuffer.slice(0, (length == 0 ? -1 : length) + mIManager.inputBuffer.length); // Can't use splice, not available in IE
	            	} 
	                return;
	            }

	            //if key pressed is undo(ctrl+z or cmd+z), then hide the dropdown and empty the inputBuffer
	            if(((event.metaKey || event.ctrlKey) && event.keyCode == 90)){
					if(data.removeHighlightCompletely) {
						textarea._valueMap.undoAndRedo = true;
					}
	            	resetBuffer();
	            }

	            //If the lyteMIList is hidden
	            if(!lyteMIList){
	            	lyteMIList = textarea._mIData.lyteMIList;
	            }
	            if ($L(lyteMIList).css("display") != "block") {
	            	// keypressEvent.call(this, event);
	                return ;
	            }

	            switch (event.keyCode) {
	                case KEY.UP: //If the key pressed was UP or DOWN
	                case KEY.DOWN:
	                    var lyteMICurrentItem = null, move;
	                    if (event.keyCode === KEY.DOWN) { //If the key pressed was DOWN
	                        if (lyteMIActiveItem && lyteMIActiveItem.length) { //If lyteMIActiveItem exits
	                        	lyteMICurrentItem = getElement(lyteMIActiveItem[0], "next"); //Gets the next li element in the list
	                            // lyteMICurrentItem = lyteMIActiveItem[0].nextElementSibling; 
	                        	move = "down";
	                        } else {
	                            lyteMICurrentItem = lyteMIList.querySelector('lyte-mentions-item'/*textarea._mIData.listItemTag*/); //Gets the first li element found
	                        	move = "up";
	                        }
	                    } else {
	                    	lyteMICurrentItem = getElement(lyteMIActiveItem[0], "prev"); //The key pressed was UP and gets the previous li element
	                        // lyteMICurrentItem = lyteMIActiveItem[0].previousElementSibling; 
	                    	move = "up";
	                    }
	                    if (lyteMICurrentItem) {
	                        onKeyUpOrDown(lyteMICurrentItem);
	                        scrollIntoView(lyteMIList, lyteMICurrentItem, move);
	                    }
	                    event.preventDefault();
	                    event.stopPropagation();
	                    break;
	                case KEY.RETURN: //If the key pressed was RETURN or TAB
	                case KEY.TAB:
	                    if (lyteMIActiveItem && lyteMIActiveItem.length) {
				            // lyteMIActiveItem[0].click();
				            lyteMIActiveItem[0].dispatchEvent(new Event('click'));
				            event.preventDefault();
				            event.stopPropagation();
				          }
	                	break;
	                // default:
	                // 	keypressEvent.call(this, event);
	            }
	            return;
			};

			var blurEvent = function(event){
				hideDropdown(event.target);
			};

			var mouseoverEvent = function(event){
				textarea = event.currentTarget._textarea;
				var target = event.target.closest('lyte-mentions-item'/*textarea._mIData.listItemTag*/);
				onKeyUpOrDown(target);
			};

			var setSelection = function(textarea){
				textarea._selection = {
					start:textarea.selectionStart,
					end: textarea.selectionEnd
				}
			};

			var iterateMentions = function(value, markupIterator, textIterator) {
				var regex = new RegExp(textarea._mIData.triggerChar+"\\[(.+?)\\:(.+?)\\]",'gi');
				regex =  new RegExp(regex);
				var match;
				var start = 0;
				var currentTextIndex = 0;
				var offset = textarea._mIData.triggerChar.length + 1;
				while ((match = regex.exec(value)) !== null) {
					var id = match[2];
					var matchedValue = match[1];
					var substr = value.substring(start, match.index);
					textIterator(substr, start, currentTextIndex);
					currentTextIndex += substr.length
					markupIterator(match[0],match.index,currentTextIndex,id,matchedValue);
					currentTextIndex += matchedValue.length;
					start = regex.lastIndex;
				}

				if (start < value.length) {
					textIterator(value.substring(start), start, currentTextIndex);
				}
			};

			var getText = function(value) {
				var result = '';
				var textIterator = function(matchedValue) {
					result += matchedValue;
				};
				var markupIterator = function(markup,index,mentionTextIndex,id,text) {
					result += text;
				}
				iterateMentions(value,markupIterator,textIterator);
				return result;
			}
			var mapTextIndex = function(value, indexInText, operation){
				if (typeof indexInText !== 'number') {
				  return indexInText;
				}
			  
				var result;
				var textIterator = function(substr, index, substrTextIndex) {
				  if (result !== undefined) {
					return;
				  } 
				  if (substrTextIndex + substr.length >= indexInText) {
					result = index + indexInText - substrTextIndex;
				  }
				}
				var markupIterator = function(markup,index,mentionTextIndex,id,display) {
				  if (result !== undefined){
					return;
				  } 
			  
				  if (mentionTextIndex + display.length > indexInText) {
					if (!operation) {
						result = null;
					} else {
					  result = index + (operation === 'end' ? markup.length : 0)
					}
				  }
				}
				iterateMentions(value, markupIterator, textIterator);
				return result === undefined ? value.length : result;
			};

			var updateMentions = function( newText, range) {
				var valueMap = textarea._valueMap;
				var oldText = valueMap.oldText;
				var oldSyntaxString = valueMap.oldSyntax;
				var prevStart = range.start,
				prevEnd = range.end,
				currentEnd = range.currentEnd;
				var delta  = oldText.length -  newText.length;
				// console.log(prevStart,prevEnd,currentEnd);
				if (prevStart === undefined) {
					prevStart = currentEnd + delta;
				}

				if (prevEnd === undefined) {
					prevEnd = prevStart;
				}

				if (prevStart === prevEnd && prevEnd === currentEnd && oldText.length === newText.length) {
					prevStart = prevStart - 1;
				}
				
				
				var insert = newText.slice(prevStart, currentEnd);
				var start = Math.min(prevStart, currentEnd);
				var end = prevEnd;
				if (prevStart === currentEnd) {
					end = Math.max(prevEnd, prevStart + delta);
				}

				var mappedStart = mapTextIndex(oldSyntaxString, start, 'start');
				var mappedEnd = mapTextIndex(oldSyntaxString, end, 'end');
				var mismatchedStart = mapTextIndex(oldSyntaxString, start);
				var mismatchedEnd = mapTextIndex(oldSyntaxString, end);
				var willRemove = mismatchedStart === null || mismatchedEnd === null;
				var newValue = oldSyntaxString.substring(0, mappedStart) + insert + oldSyntaxString.substring(mappedEnd);
				var returnObject = {};
				//TO handle undo and redo mismatch.
				var oldTextValue = getText(oldSyntaxString.substring(0, mappedStart));
				returnObject.selectionEnd = oldTextValue.length +  insert.length;
				if(!willRemove) {
					var mismatchedValue = getText(newValue);
					var maxCount = 50;
					var loopCount = 0;
					while (mismatchedValue !== newText && loopCount <= maxCount ) {
						start = 0;
						while (newText[start] === mismatchedValue[start]){
							start++;
						}
						insert = newText.slice(start, currentEnd);

						// find index of the unchanged remainder
						end = oldText.lastIndexOf(newText.substring(currentEnd));

						// re-map the corrected indices
						mappedStart = mapTextIndex(oldSyntaxString, start, 'start');
						mappedEnd = mapTextIndex(oldSyntaxString, end, 'end');
						newValue = oldSyntaxString.substring(0, mappedStart) + insert + oldSyntaxString.substring(mappedEnd);
						mismatchedValue = getText(newValue);
						loopCount++;
					}
					if(loopCount > maxCount) {
						console.warn("lyte mentionsInput match failed");
					}
				}
				returnObject.newValue = newValue;
				return returnObject;
			};

			var mouseupEvent = function(event){
				setSelection(event.target);
			};

			var pasteEvent = function(event){
				textarea = this;
				// console.log("pasteEvent",textarea.selectionStart,textarea.selectionEnd);
				if(textarea.selectionStart == textarea.selectionEnd){
					// var paste = textarea.value + (event.clipboardData || window.clipboardData).getData('text');
					var paste = omitMentionedFromTextInput(textarea.value) + (event.clipboardData || window.clipboardData).getData('text');
				}
				else{
					var paste = textarea.value.substring(0,textarea.selectionStart) + (event.clipboardData || window.clipboardData).getData('text');
					var restMsg = textarea.value.substring(textarea.selectionEnd);
					if(restMsg.length > 0){
						var lastSpaceIndex = restMsg.indexOf(' ');
						paste += restMsg.substring(0,(lastSpaceIndex > -1 ? lastSpaceIndex : restMsg.length));
					}
				}
				mIManager.inputBuffer = paste.split("");
			};

			var triggerInputEv = function(){
	    		var evt;
				if(typeof(Event) === 'function') {
				    evt = new Event('input');
				}else{
				    evt = document.createEvent('Event');
				    evt.initEvent('input', true, true);
				}
	    		element.dispatchEvent(evt);
	    	};

			/*---------------- BIND EVENTS AND DATA ------------------*/

			data.lyteMIList = mIManager.init(element);
			data.lyteMIList._textarea = element;
			data._overlayDiv = element.previousElementSibling.children[0];
			if (!data.isLyteInput) {
				$L(element.previousElementSibling).addClass('lyteMentionsNormalTextarea');
			}
	        element._mIData = data;
	        element._lyteMenIpKeydownEvent = keydownEvent;
	        element._lyteMenIpKeypressEvent = keypressEvent;
	        element._lyteMenIpInputEvent = inputEvent;
	        element._lyteMenIpClickEvent = clickEvent;
	        element._lyteMenIpBlurEvent = blurEvent;
	        element._lyteMenIpPasteEvent = pasteEvent;
			element._lyteHideDropdown = hideDropdown;
			element._lytePosDropdown = positionDropdown;
			element._valueMap = {oldText: "", oldSyntax: ""};
			element._selection = {};
			element._lyteDisableParentScrollListeners = disableParentListeners;
	    	element.addEventListener('keydown', element._lyteMenIpKeydownEvent);
	    	// element.addEventListener('keypress', element._lyteMenIpKeypressEvent);	/*Removed keypress as it is not supported by mobile browsers*/
	    	element.addEventListener('input', element._lyteMenIpInputEvent);
	    	element.triggerInputEvent = triggerInputEv;
	    	// element.addEventListener('click', element._lyteMenIpClickEvent, true);
	    	// element.addEventListener('blur', element._lyteMenIpBlurEvent);
	    	element.addEventListener('paste', element._lyteMenIpPasteEvent);
	    	data.lyteMIList.addEventListener('mouseover',mouseoverEvent);
			if(element._mIData.removeHighlightCompletely) {
				element._lyteSetSelection = setSelection;
				element._lyteMenIpMouseUpEvent = mouseupEvent;
				element.addEventListener('mouseup', element._lyteMenIpMouseUpEvent);
				initializeSelection();
			}
	    	if(!mIManager.bindScroll){
	    		mIManager.onScroll = function(event){
	    			if(!event || !event.target || event.target.isEqualNode(document) || event.target.tagName == "HTML" || event.target.closest('.lyteMIDropdown')){
	    				return;
	    			}
	    			var elems = document.querySelectorAll('.lyteMIListAppended');
	    			if(elems.length > 0){
	    				for(var i = 0; i<elems.length; i++){
	    					positionDropdown(elems[i],true);
	    				}
	    			}
	    		}
	    		window.addEventListener('scroll',mIManager.onScroll,true);
	    		mIManager.bindScroll = true;
	    	}
	    	if(!mIManager.bindClick){
	    		mIManager.onClick = function(event){
	    			var target = event.target;
	    			while(target){
	    				if((target.tagName === "TEXTAREA" && target.getAttribute('data-lyte-mentions') === "true") || target.tagName == "HTML"){
	    					break;
	    				}
	    				target = target.parentElement;
	    			}
	    			if(target && target.tagName === "TEXTAREA"){
	    				target._lyteMenIpClickEvent(event);
	    				var openLists = document.querySelectorAll('.lyteMIDropdown.lyteMIDisplayBlock');
	    				for(var i = 0; i < openLists.length; i++){
	    					if(!(target._mIData.lyteMIList.isEqualNode(openLists[i]))){
								var textarea = openLists[i]._textarea;
	    						textarea._lyteHideDropdown(openLists[i]._textarea);
	    					}
	    				}
	    				target._addedMentions = false;
	    			}
	    			else if(target && target.tagName === "HTML"){
	    				var openLists = document.querySelectorAll('.lyteMIDropdown.lyteMIDisplayBlock');
	    				for(var i = 0; i < openLists.length; i++){
							var textarea = openLists[i]._textarea;
	    					textarea._lyteHideDropdown(textarea,openLists[i]);
	    				}
	    			}
	    		}
	    		document.body.addEventListener('click',mIManager.onClick,true);
	    		mIManager.bindClick = true;
	    	}
	    	/*---------------------------------------------------------*/

	    	/*--------------------------- INITIALIZATION ENDS -------------------------*/

	    	return this;
		}
		
	}

})( window );

/*
	Optimized by reading the values first and then writting
	Added - 27/07/2014 - documentation not done yet
		1. Added draggable + sortable compatibility - Drag any draggable element to sort it with a list of sortable elements and sort it with them
		2. Added helper options - can be string or any function
		3. Added connectToSortable options
		4. Added onBeforeStop callback - return false to exit
	Date - 28/08/2018
  	1. Added method to destroy draggable.

*/

;(function( window ) {

	if(lyteDomObj){
		lyteDomObj.prototype.manageDraggable = {
			init : false,
			draggedEle : null,
			isRestricted : function(restrict,element){
				restrict = restrict instanceof Array ? restrict : restrict.split(",");
				for(var i = 0; i<restrict.length; i++){
					var elements = document.querySelectorAll(restrict[i]);
					for(var j = 0; j < elements.length; j++){
						if(element.isEqualNode(elements[i])){
							return true;
						}
					}
				}
				return false;
			},

			destroy : function(element){
				if(!element._draggableData || !(this.hasClassOrAttr(element._draggableData.attribute,element,'draggable-element')) && !(this.hasClassOrAttr(element._draggableData.attribute,element,'draggable-helper'))){
					console.info("ALERT! - U have already destroyed its draggable behaviour.");
					return;
				}
				var attribute = element._draggableData.attribute;
				if(this.hasClassOrAttr(attribute,element,'draggable-handle-element')){
					this.removeClassOrAttr(attribute,element,'draggable-handle-element');
					element.removeEventListener('mousedown',element._draggableData.__mousedown);
					element.removeEventListener('touchstart',element._draggableData.__mousedown, true);
					element._draggableData = null;
				}
				else{
					var handleElems = element.querySelectorAll('[draggable-handle-element]');
					handleElems= handleElems.length ? handleElems : element.querySelectorAll('.draggable-handle-element');
					for(var i = 0; i<handleElems.length; i++){
						this.removeClassOrAttr(attribute,handleElems[i],'draggable-handle-element');
						handleElems[i].removeEventListener('mousedown',handleElems[i]._draggableData.__mousedown);
						handleElems[i].removeEventListener('touchstart',handleElems[i]._draggableData.__mousedown, true);
						handleElems[i]._draggableData = null;
					}
				}
				this.removeClassOrAttr(attribute,element,'draggable-element');
				this.removeClassOrAttr(attribute,element,'draggable-helper');
				element._mousedown = undefined;
			},
			removeClassOrAttr :function(attribute,elem,name){
				if(attribute){
					$L(elem).removeAttr(name)
				}else{
					$L(elem).removeClass(name);
				}

			},
			hasClassOrAttr : function(attribute,elem,name){
				if(attribute){
					return $L(elem).attr(name) !== undefined;
				}else{
					return $L(elem).hasClass(name);
				}

			},
			addClassOrAttr : function(attribute,elem,name){
				if(attribute){
					$L(elem).attr(name,'');
				}else{
					$L(elem).addClass(name);
				}

			}

		};

		lyteDomObj.prototype.draggable = function(object) {
			var manageDraggable = lyteDomObj.prototype.manageDraggable;
			var managerDD = lyteDomObj.prototype.managerDD;
			if(!manageDraggable.init){
				if (!Element.prototype.matches) {
				    Element.prototype.matches =
				        Element.prototype.matchesSelector ||
				        Element.prototype.mozMatchesSelector ||
				        Element.prototype.msMatchesSelector ||
				        Element.prototype.oMatchesSelector ||
				        Element.prototype.webkitMatchesSelector ||
				        function(s) {
				            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				                i = matches.length - 1;
				            while (i >= 0 && matches.item(i) !== this){
				            	--i;
				            	//gets the index of the matched item
				            }
				            return i > -1;
				        };
				}
				manageDraggable.init = true;
			}

			if(typeof object === "string" && object === "destroy"){
				if(this.length > 1){
					var elemArray = this;
					for(var i = 0; i<elemArray.length; i++){
						manageDraggable.destroy(elemArray[i]);
					}
				}
				else{
					manageDraggable.destroy(this[0]);
				}
				return;
			}

			var data = object ? object : {};

			if(this.length > 1){
				var elemArray = this;
				for(var i = 0; i<elemArray.length; i++){
					$L(elemArray[i]).draggable(Object.assign({},data));
				}
				return;
			}
			//Parent Element
			if(data.restrict && manageDraggable.isRestricted(data.restrict,this[0])){
				return;
			}
			data._element = this[0];
			manageDraggable.addClassOrAttr(data.attribute,data._element,'draggable-element');

			var _handleElement;
			var _initClientX;
			var _initClientY;
			var _initialPos = {};
			var _offset = [0,0];
			var _marginTop = 0;
			var _marginLeft = 0;
			var _placeholder;
			var _sortableElemClass;
			var _positionedPlceholder = false;
			var _requestId1;
			var _animationFrameFired1;
			var _elemBelow;
			var droppablePlace;
			var returnVal;
			var prevDimension = null;
			var _maxScrollHeight;
			var _maxScrollWidth;
			var _scrollTop;
			var _scrollLeft;
			var _requestId2;
			var _animationFrameFired2;
			var _borderVal = {
				left : parseFloat(getComputedStyle($L(this)[0]).borderLeft.split(' ')[0]),
				right : parseFloat(getComputedStyle($L(this)[0]).borderRight.split(' ')[0]),
				top : parseFloat(getComputedStyle($L(this)[0]).borderTop.split(' ')[0]),
				bottom : parseFloat(getComputedStyle($L(this)[0]).borderBottom.split(' ')[0])
			}

			//Data initialization
			data.cancel = data.cancel === undefined ? [] : data.cancel instanceof Array ? data.cancel : data.cancel.split(",");
			data.placeholder = data.placeholder ? data.placeholder : "lyteDraggablePlaceholder";
			data.containment = (data.containment === undefined) ? document : $L(data.containment)[0];
			data.orientation = (data.orientation === undefined) ? "default" : data.orientation;
			data.handle = (data.handle === undefined) ? this[0] : data.handle;
			data.restrict = data.restrict === undefined ? [] : data.restrict instanceof Array ? data.restrict : data.restrict.split(",");
			data.helper = data.helper ? data.helper : "original";
			data.connectToSortable = data.connectToSortable ? data.connectToSortable : null;
			data.cursorAt = data.cursorAt;
			data.disabled = data.disabled ? data.disabled : "lyteDraggableDisabledPlaceholder";
			data.appendTo = data.appendTo && data.appendTo != "parent" ? $L(data.appendTo)[0] : "parent";
			data.bubbles = data.bubbles === undefined ? true : data.bubbles;
			data.scrollDivX = data.scrollDivX ? (typeof data.scrollDivX == "string" ? document.querySelector(data.scrollDivX) : data.scrollDivX) : undefined;
			data.scrollDivY = data.scrollDivY ? (typeof data.scrollDivY == "string" ? document.querySelector(data.scrollDivY) : data.scrollDivY) : undefined;
			data.scrollSpeed = data.scrollSpeed ? parseInt(data.scrollSpeed) : 10;
			data.threshold = data.threshold ? parseInt(data.threshold) : 0;
			data.hasContainment = data.hasContainment ? data.hasContainment : false;
			data.attribute = data.attribute ? data.attribute : false;
			data.dblTouchEvent = data.dblTouchEvent ? data.dblTouchEvent : false;

			if(data.scrollSpeed < 1){
				data.scrollSpeed = 1;
			}
			
			function checkfordraggable(targetElem){
				var cancel = data.cancel || [];
				for(var index = 0; index < cancel.length ; index++){
					var elem = targetElem;
					while(elem.parentElement){
						if(elem.matches(data.cancel[index])){
							return true;
						}
						if(manageDraggable.hasClassOrAttr(data.attribute,elem,'draggable-handle-element')){
							break;
						}
						elem = elem.parentElement;
					}
				}
				return false;
			}
			function mouseDownEvent(event){
				
				// event.preventDefault();
				// calling mousedown from draggable;
				//Disable right click on the sortable elements to avoid unwanted behaviour
				if(event.which == 3){
					return;
				}
				_initClientX = event.clientX
				_initClientY = event.clientY
				if(checkfordraggable(event.target)){
					return;
				}
				var _handleElement =  event.target.closest('[draggable-handle-element]') ;
				_handleElement = _handleElement ? _handleElement : event.target.closest('.draggable-handle-element');
				manageDraggable.draggedEle = _handleElement;
				if(_handleElement){
					if(!_handleElement._draggableData.bubbles){
						event.stopPropagation();
					}
					var data = _handleElement._draggableData;
					var elem = data._element;
					var elemOffset = elem.getBoundingClientRect();
					var cs = window.getComputedStyle(elem);
					var width = elemOffset.width;
					var height = elemOffset.height;
					data._offParent = elem.offsetParent || $L('body')[0];
					data._parent = elem.parentElement;
					var returnVal = true;

					//Callback fired
					if(data.onStart){
						returnVal = onStart(data, event);
					}
					if(returnVal){
						if(returnVal.then){
							returnVal.then(function(start){
								if(start){
									initializeDragEvents(elem,data,_handleElement,event);
								}
							});
						}else{
							initializeDragEvents(elem,data,_handleElement,event)
						}
					}
				}
				else{
					_handleElement = null;
				}
			}

			function initializeDragEvents (elem,data,_handleElement,event){
				var data = _handleElement._draggableData;
				var elem = data._element;
				var elemOffset = elem.getBoundingClientRect();
				var cs = window.getComputedStyle(elem);
				var width = elemOffset.width;
				var height = elemOffset.height;
				_initialPos = {
						x : elem.offsetLeft,
						y : elem.offsetTop,
						pos : $L(elem).css('position')
					};
					if(data.cursorAt){
						_offset = [
							data.cursorAt.left,
							data.cursorAt.top
						];
					}
					else{
						if(event.type == "mousedown"){
							_offset = [
								event.clientX - elemOffset.left,
								event.clientY - elemOffset.top
							];
						}
						else if(event.type == "touchstart"){
							_offset = [
								event.touches[0].clientX - elemOffset.left,
								event.touches[0].clientY - elemOffset.top
							];
						}
					}
					// if(event.type == "mousedown"){
					// 	_offset = [
					// 		event.clientX - elemOffset.left,
					// 		event.clientY - elemOffset.top
					// 	];
					// }
					if(event.type == "touchstart"){
						// _offset = [
						// 	event.touches[0].clientX - elemOffset.left,
						// 	event.touches[0].clientY - elemOffset.top
						// ];

						//Binding touch events
						
						document.addEventListener('touchmove',mouseMoveEvent, true);
						document.addEventListener('touchend',mouseUpEvent, true);
						data._element.classList.add('stopDefaultMove');
					}

					if(cs.marginTop){
						_marginTop = cs.marginTop;
					}
					if(cs.marginLeft){
						_marginLeft = cs.marginLeft;
					}
					// var parent = elem.offsetParent;


					if(data.scrollDivY && ( window.getComputedStyle(data.scrollDivY).position == "relative" ||  window.getComputedStyle(data.scrollDivY).position == 'absolute') && data.scrollDivY.contains(elem)){
						data._isRelativeY = true;
					}
					else{
						data._isRelativeY = false;
					}

					if(data.scrollDivX && ( window.getComputedStyle(data.scrollDivX).position == "relative" ||  window.getComputedStyle(data.scrollDivX).position == 'absolute') && data.scrollDivX.contains(elem)){
						data._isRelativeX = true;
					}
					else{
						data._isRelativeX = false;
					}

					data._isDown = true;
					data._initialPos = _initialPos;
					data._offset = _offset;
					data._Elemoffset = {top : _offset[0],left : _offset[1]};
					data._marginLeft = _marginLeft;
					data._marginTop = _marginTop;
					manageDraggable.addClassOrAttr(data.attribute,_handleElement,'selected-element','');
					// $L(_handleElement).addClass('selected-element');

					//Set the current element for manager to manage draggables and droppables
					if(typeof managerDD !== "undefined"){
						managerDD._current = _handleElement;
					}
					if(event.type == "mousedown"){
						document.addEventListener('mousemove',mouseMoveEvent);
						document.addEventListener('mouseup',mouseUpEvent);
						if(getOS() === "Windows"){	//Added check to restrict initial triggering of mousemove in windows as soon as the event is added
							manageDraggable.mouseMoveTriggered = true;
						}
					}
			}
			var mouseMoveEvent = function(event){
				//calling mousemove from draggable;
				if(getOS() === "Windows" && manageDraggable.mouseMoveTriggered){	//Added check to restrict initial triggering of mousemove in windows as soon as the event is added
					manageDraggable.mouseMoveTriggered = false;
					return;
				}
				
				if(manageDraggable.draggedEle && manageDraggable.hasClassOrAttr(manageDraggable.draggedEle._draggableData.attribute,manageDraggable.draggedEle,'selected-element') && manageDraggable.draggedEle._draggableData && manageDraggable.draggedEle._draggableData._isDown){
					_handleElement = manageDraggable.draggedEle;

				}
				else{
					_handleElement = null;
					return;
				}
				// var target = event.target;
				// while(target && target != document){
				// 	if($L(target).hasClass("selected-element")){
				// 		_handleElement = target;
				// 		break;
				// 	}
				// 	target = target.parentElement;
				// }
				if(_handleElement){
					var data = _handleElement._draggableData;
					if((!data._isMoved) && (((Math.abs(_initClientX - event.clientX)) < data.threshold) || ((Math.abs(_initClientY - event.clientY)) < data.threshold))){
						return
					}
					if(data && data._isDown){
						event.preventDefault();
						if(typeof document.body.style.MozUserSelect!="undefined"){
							document.body.style.MozUserSelect = "none";
						}
						var elem = data._element;
						_offset = data._offset;
						_marginLeft = data._marginLeft;
						_marginTop = data._marginTop;
						var orientation = data.orientation;
						var parent = data._offParent;
						var elemOffset = elem.getBoundingClientRect();
						var parentOffset = parent.getBoundingClientRect();
						var scrollLeftValue = 0;
						if(data.scrollDivY && data._isRelativeY){
							_scrollTop = data.scrollDivY.scrollTop;
						}
						else{
							_scrollTop = 0;
						}
						if(data.scrollDivX && data._isRelativeX){
							_scrollLeft = data.scrollDivX.scrollLeft;
							if(_lyteUiUtils.getRTL() && !_lyteUiUtils.isNegativeScroll() && detectBrowser() == "chrome" && data._isRelativeX){
								_scrollLeft -= (data._maxScrollWidth ? data._maxScrollWidth : (data.scrollDivX.scrollWidth - data.scrollDivX.offsetWidth));
							}
						}
						else{
							_scrollLeft = 0;
						}
						if(data._isRelative){
							scrollLeftValue = _scrollLeft;
						}
						if(data.dragstartreturn){
							var returnVal = true;	
						}else{
							var returnVal = false;
						}
						
						data._element.addScrollDivXY =  function(scrollDivX,scrollDivY){
							data.scrollDivX = scrollDivX ? (typeof scrollDivX == "string" ? document.querySelector(scrollDivX) : scrollDivX) : undefined;
							data.scrollDivY = scrollDivY ? (typeof scrollDivY == "string" ? document.querySelector(scrollDivY) : scrollDivY) : undefined;
							if(data.scrollDivY){
								_maxScrollHeight = data.scrollDivY.scrollHeight - data.scrollDivY.offsetHeight;
								data._maxScrollHeight = _maxScrollHeight;
								data._element._draggableData._maxScrollHeight = _maxScrollHeight;
							}
							if(data.scrollDivX){
								_maxScrollWidth = data.scrollDivX.scrollWidth - data.scrollDivX.offsetWidth;
								data._maxScrollWidth = _maxScrollWidth;
								data._element._draggableData._maxScrollWidth = _maxScrollWidth;
							}
							data._element._draggableData.scrollDivX = data.scrollDivX;
							data._element._draggableData.scrollDivY = data.scrollDivY;
							if(_requestId1){
								cancelAnimationFrame(_requestId1);
								_animationFrameFired1 = false;
								_requestId1 = null;
							}
							if(_requestId2){
								cancelAnimationFrame(_requestId2);
								_animationFrameFired2 = false;
								_requestId2 = null;
							}
 						}

						if(!data._isMoved){
							
							//data.dragstartreturn = true;
							// data.returnVal = true;
							// var cs = window.getComputedStyle(elem);
				            // var borderDimensionY = ((cs.borderTop ? parseFloat(cs.borderTop) : 0) +
				            //                          (cs.borderBottom ? parseFloat(cs.borderBottom) : 0));
				            // var borderDimensionX = ((cs.borderLeft ? parseFloat(cs.borderLeft) : 0) +
				            //                          (cs.borderRight ? parseFloat(cs.borderRight) : 0));
							if(typeof data.helper == "string"){
								if(data.helper == "clone"){
									var helper = elem.cloneNode(true);
									_lyteUiUtils.insertAfter(elem,helper);
									// $L(elem).removeClass('selected-element');
									manageDraggable.removeClassOrAttr(data.attribute,elem,'selected-element');
									if(!(manageDraggable.hasClassOrAttr(data.attribute,helper,'draggable-handle-element'))){
										manageDraggable.addClassOrAttr(data.attribute,helper,'draggable-handle-element','');
									}
									helper._draggableData = Object.assign({},data);
									helper.addScrollDivXY = data._element.addScrollDivXY;
									data = helper._draggableData;
									data._element = data.handle = helper;
									_handleElement = helper;
									elem = helper;
									manageDraggable.draggedEle = _handleElement = helper;
									elem.addEventListener("mousedown",mouseDownEvent);
									if(data.connectToSortable){
										data._prevTop = event.clientY;
									}
									elem._draggableData.helperElem = elem;
								}
							}
							else{
								var helper = data.helper(elem);
								if(helper){
									helper._callee = elem;
									// $L(elem).removeClass('selected-element');
									manageDraggable.removeClassOrAttr(data.attribute,elem,'selected-element');
									if(!(manageDraggable.hasClassOrAttr(data.attribute,helper,'draggable-handle-element'))){
										manageDraggable.addClassOrAttr(data.attribute,helper,'draggable-handle-element','');
									}
									if(!(manageDraggable.hasClassOrAttr(data.attribute,helper,'selected-element'))){
										manageDraggable.addClassOrAttr(data.attribute,helper,'selected-element','');
									}
									manageDraggable.addClassOrAttr(data.attribute,helper,'draggable-helper','');
									helper._draggableData = Object.assign({},data);
									helper.addScrollDivXY = data._element.addScrollDivXY;
									data = helper._draggableData;
									data._origin = data._element;
									data._element = data.handle = helper;
									manageDraggable.draggedEle = _handleElement = helper;

									//Appends the helper to the provided element
									if(data.appendTo == "parent"){
										Lyte.Component.appendChild(data._parent,helper);
										// data._parent.appendChild(helper);
									}
									else{
										Lyte.Component.appendChild($L(data.appendTo)[0],helper);
										// data.appendTo.appendChild(helper);
									}
									elem = helper;
									if(data.scrollDivY && !data.scrollDivY.contains(elem)){
										data._isRelativeY = false;
									}
									if(data.scrollDivX && !data.scrollDivX.contains(elem)){
										data._isRelativeX = false;
									}
									elem.addEventListener("mousedown",mouseDownEvent);
									if(data.connectToSortable){
										data._prevTop = event.clientY;
									}
									parent = data._offParent = elem.offsetParent;
									parentOffset = parent.getBoundingClientRect();
									elem._draggableData.helperElem = elem;
								}
							}
							if(typeof managerDD != "undefined"){
								managerDD._current = _handleElement;
							}

							data = elem._draggableData || _handleElement._draggableData;

							//Create placeholder and append it to the DOM
							if(data.connectToSortable){
								_placeholder = elem.cloneNode(true);
								_placeholder._callee = elem;
								// $L(_placeholder).removeClass('selected-element');
								manageDraggable.removeClassOrAttr(data.attribute,_placeholder,'selected-element');
								_placeholder.innerHTML = "";
								$L(_placeholder).attr('id','lyteDraggableDummy');
								$L(_placeholder).addClass(data.placeholder);
								_placeholder.style.boxSizing = "border-box";
								// if(cs.boxSizing == "border-box"){
									_placeholder.style.width = elemOffset.width + "px";
									_placeholder.style.height = elemOffset.height + "px";
								// }
								// else{
								// 	_placeholder.style.width = calculateWidth(elem)/*(elemOffset.width - borderDimensionX)*/ + "px";
								// 	_placeholder.style.height = calculateHeight(elem)/*(elemOffset.height - borderDimensionY)*/ + "px";
								// }
								_placeholder.style.padding = "0px";
								elem.classList.add('lyteSortableDisablePE');
							}
							if(data.onDragStart){
								data.dragstartreturn = onDragStart(data,_handleElement,_placeholder,event);
								
								if(!data.dragstartreturn){
									data._isMoved = true;
									returnVal = false;
									return;
								}
							}else{
								data.dragstartreturn = true;
							}
							elem.style.top = elemOffset.top - parentOffset.top /*- parseInt(cellSpacing)*/ - parseInt(_marginTop) + _scrollTop + 'px';
							elem.style.left = elemOffset.left - parentOffset.left - parseInt(_marginLeft) + _scrollLeft + 'px';
							elem.style.zIndex = 200000;
							// if(cs.boxSizing == "border-box"){
							// 	elem.style.width = elemOffset.width /*- borderDimensionX */+'px';
							// 	elem.style.height = elemOffset.height /*- borderDimensionY*/ +'px';
							// }
							// else{
								elem.style.width = calculateWidth(elem) /*elemOffset.width - borderDimensionX*/ +'px';
								elem.style.height = calculateHeight(elem) /*elemOffset.height - borderDimensionY*/ +'px';
							// }
							elem.style.position = "absolute";
							
							if(data.scrollDivY){
								_maxScrollHeight = data.scrollDivY.scrollHeight - data.scrollDivY.offsetHeight;
							}
							if(data.scrollDivX){
								_maxScrollWidth = data.scrollDivX.scrollWidth - data.scrollDivX.offsetWidth;
								data._maxScrollWidth = _maxScrollWidth;
							}
							if(data.cursorAt && _lyteUiUtils.getRTL()){
								var offset = data.cursorAt,
				                    newOffset = {};
				                for(key in offset){
				                    if(key == "left"){
				                        newOffset.left = data._element.offsetWidth - offset[key];
				                    }
				                    else{
				                        newOffset[key] = offset[key];
				                    }
				                }
				                data._preCursorAt = Object.assign({},data.cursorAt);
				                data.cursorAt = newOffset;
				                _offset = data._offset = [
										                	data.cursorAt.left,
										                	data.cursorAt.top
										                ];
							}
						}
						else{
							if(data._placeholder){
								_placeholder = data._placeholder;
							}
							if(data._positionedPlceholder){
								_positionedPlceholder = data._positionedPlceholder;
							}
						}

						if(event.type == "mousemove"){
							data._mousePosition = {
								x : event.clientX,
								y : event.clientY
							};
						}
						else if(event.type == "touchmove"){
							data.touchTarget = event.touches;
							data._mousePosition = {
								x : event.touches[0].clientX,
								y : event.touches[0].clientY
							};
						}

						//Callback fired
						var leftVal = data._mousePosition.x - data._offset[0] - parentOffset.left - parseInt(_marginLeft) + _scrollLeft;
						var TopVal = data._mousePosition.y - data._offset[1] - parentOffset.top - parseInt(_marginTop) + _scrollTop;
						data._Elemoffset = { top : TopVal, left : leftVal};
						if(data.dragstartreturn && data.onDrag){
							returnVal = onDrag(data,_handleElement,event);
						}

						
						if(returnVal){
							if(orientation === "vertical"){
								elem.style.top = data._mousePosition.y - _offset[1] - parentOffset.top - parseInt(_marginTop) + _scrollTop + 'px';
							}
							else if(orientation === "horizontal"){
								elem.style.left = data._mousePosition.x - _offset[0] - parentOffset.left - parseInt(_marginLeft) + _scrollLeft + 'px';
							}
							else if(orientation === "default"){
								elem.style.left = data._mousePosition.x - _offset[0] - parentOffset.left - parseInt(_marginLeft) + _scrollLeft + 'px';
								elem.style.top = data._mousePosition.y - _offset[1] - parentOffset.top - parseInt(_marginTop) + _scrollTop + 'px';
								elemOffset = elem.getBoundingClientRect();
								if(data.scrollDivY){
									var scrollDivOffset = data.scrollDivY.getBoundingClientRect();
									if((elemOffset.left <= scrollDivOffset.right) && (elemOffset.right >= scrollDivOffset.left)){
										_requestId1 = requestAnimationFrame(callForScrollY.bind(this,data,data.scrollDivY,scrollDivOffset,_maxScrollHeight,data._isRelativeY,data._mousePosition,_offset,parentOffset));
										_animationFrameFired1 = true;
									}
								}
								//Animation Frame fired for horizontal scrolling
								if(data.scrollDivX){
									var scrollDivOffset = data.scrollDivX.getBoundingClientRect();
									if(elemOffset.left <= scrollDivOffset.right || elemOffset.right >= scrollDivOffset.left){
										_requestId2 = requestAnimationFrame(callForScrollX.bind(this,data,scrollDivOffset,_maxScrollWidth,data._mousePosition,_offset,parentOffset,data._isRelativeX));
										_animationFrameFired2 = true;
									}
								}
								if(data.connectToSortable){
									var sortableData = $L(data.connectToSortable).length ? $L(data.connectToSortable)[0]._sortableParentData : null;
									_sortableElemClass = sortableData.sortableElemClass;

									//Find the below element over which the sortable element is being dragged
									_elemBelow = document.elementFromPoint(data._mousePosition.x,data._mousePosition.y);

									//check isOver sortable list
									lyteDomObj.prototype.manageSortable.isOver(event,data,true);

									if(!_elemBelow){
										return;
									}

									//Find the closest sortable element to sort with
									droppablePlace = _elemBelow.closest('.'+_sortableElemClass);

									if(droppablePlace && droppablePlace.parentElement._sortableParentData.droppable /* && checkDroppable(droppablePlace,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition)*/){

										if($L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,data) && checkForIntersect(_elemBelow,data._mousePosition) && checkForBetween(_elemBelow,data._mousePosition,elem/*,isRelativeY,scrollDiv*/)){
											_lyteUiUtils.appendChild(_elemBelow,_placeholder);
											_placeholder.style.display = "";
											_positionedPlceholder = true;
										}
										else{
											if(elem.getBoundingClientRect().top <= droppablePlace.getBoundingClientRect().top){
												_lyteUiUtils.insertBefore(droppablePlace,_placeholder);
												_placeholder.style.display = "";
												_positionedPlceholder = true;
											}
											else if(elem.getBoundingClientRect().bottom > droppablePlace.getBoundingClientRect().bottom){
												_lyteUiUtils.insertAfter(droppablePlace,_placeholder);
												_placeholder.style.display = "";
												_positionedPlceholder = true;
											}
										}
									}
									else if(_elemBelow && $L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,data) && checkForIntersect(_elemBelow,data._mousePosition) && checkForBetween(_elemBelow,data._mousePosition,elem/*,isRelativeY,scrollDiv*/)){
										_lyteUiUtils.appendChild(_elemBelow,_placeholder);
										_placeholder.style.display = "";
										_positionedPlceholder = true;
									}
									else{
										if(!checkPlaceholderBelow(_elemBelow) && !($L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,data))){
											// placeholder set to false
											if(document.getElementById('lyteDraggableDummy')){
												document.getElementById('lyteDraggableDummy').style.display = "none";
											}
											_positionedPlceholder = false;
										}
									}

									if(_positionedPlceholder){
										if(!data.onPlaceholder || checkValidDroppable(data,_placeholder)){
											if($L(_placeholder).hasClass(data.disabled)){
												$L(_placeholder).removeClass(data.disabled);
											}
											$L(_placeholder).addClass(data.placeholder);
										}
										else{
											if($L(_placeholder).hasClass(data.placeholder)){
												$L(_placeholder).removeClass(data.placeholder);
											}
											$L(_placeholder).addClass(data.disabled);
										}
									}
									data._placeholder = _placeholder;
									data._positionedPlceholder = _positionedPlceholder;
								}
							}
							if(data.hasContainment && returnVal){
								var parent = $L(data.containment)[0];
								var offParent = data._offParent;
								// elem.style.left = leftVal + 'px';
								// elem.style.top = topVal + 'px';
								// data.orientation = "";
								var cs = getComputedStyle(offParent);
								var offsetTop = 0,offsetLeft = 0;  
								if(cs.position === 'relative' || cs.position === 'absolute'){
									offsetLeft = offParent.getBoundingClientRect().left;
									offsetTop = offParent.getBoundingClientRect().top;
								}
								if(elem.getBoundingClientRect().top <= parent.getBoundingClientRect().top){
									elem.style.top = parent.getBoundingClientRect().top - offsetTop  + _borderVal.top+ 'px';
								}
								if(elem.getBoundingClientRect().bottom >= (parent.getBoundingClientRect().top + parent.offsetHeight)){
									elem.style.top = (parent.getBoundingClientRect().top + parent.offsetHeight) - offsetTop - elem.getBoundingClientRect().height + _borderVal.bottom + _scrollTop + 'px';
								}
								if(elem.getBoundingClientRect().left <= parent.getBoundingClientRect().left){															
									elem.style.left = parent.getBoundingClientRect().left + _borderVal.left  - offsetLeft + 'px';
								}
								if(elem.getBoundingClientRect().right >= parent.getBoundingClientRect().right){
									elem.style.left = (parent.getBoundingClientRect().left - offsetLeft + parent.getBoundingClientRect().width)   - elem.getBoundingClientRect().width + _borderVal.right + _scrollLeft  + 'px';
								}
							}
						}
						
						//Check for any droppable element and if present execute its drag function
						if(typeof managerDD !== "undefined"){
							managerDD._drag(event);
						}
						data._isMoved = true;
					}
				}
			}

			var mouseUpEvent = function(event){

				// console.log(event.type, event.target);
				// console.log("calling mouseup from draggable");
				// event.preventDefault();
				// _handleElement = event.target.closest('.selected-element') ? event.target.closest('.selected-element') : document.querySelector('.selected-element');
				// var target = event.target;
				// _handleElement = null;
				// while(target && target != document){
				// 	if($L(target).hasClass("selected-element")){
				// 		_handleElement = target;
				// 		break;
				// 	}
				// 	target = target.parentElement;
				// }
				//Unbind mouseup and mousemove
				if(event.type == "mouseup"){
					document.removeEventListener('mousemove',mouseMoveEvent);
					document.removeEventListener('mouseup',mouseUpEvent);
				}
				//Unbinding touch events
				if(event.type == "touchend"){
					document.removeEventListener('touchmove',mouseMoveEvent, true);
					document.removeEventListener('touchend',mouseUpEvent, true);
				}

				if(manageDraggable.draggedEle && manageDraggable.hasClassOrAttr(manageDraggable.draggedEle._draggableData.attribute,manageDraggable.draggedEle,'selected-element') && manageDraggable.draggedEle._draggableData && manageDraggable.draggedEle._draggableData._isDown){
					_handleElement = manageDraggable.draggedEle;
				}
				else{
					_handleElement = null;
					return;
				}
				
				if(_handleElement){
					var data = _handleElement._draggableData;
					// if(event.type == "touchend"){
					// 	if(data._element.classList.contains('stopDefaultMove')){
					// 		data._element.classList.remove('stopDefaultMove');
					// 	}
					// }
					if(data.cursorAt && _lyteUiUtils.getRTL()){
						data.cursorAt = Object.assign({},data._preCursorAt);
		                data._preCursorAt = undefined;

					}
					if(data.connectToSortable && lyteDomObj.prototype.manageSortable.prevSortable){
						lyteDomObj.prototype.manageSortable.prevSortable = false;
					}
					_placeholder = data._placeholder;

					if(data && data._isDown){
						data._isDown = false;
						var elem = data._element;
						if(data._isMoved){
							var placed = false;
							data._isMoved = false;
							_initialPos = data._initialPos;
							_marginTop = parseInt(data._marginTop);
							_marginLeft = parseInt(data._marginLeft);

							var returnVal = true;
							if(data.onBeforeStop){
								returnVal = onBeforeStop(data,event);
							}
							if(!returnVal){
								
								if(data.helperElem){
									elem.remove();
									if(document.getElementById('lyteDraggableDummy')){
										_placeholder.remove();
									}
									manageDraggable.draggedEle = null;
									return;
								}
								if(_initialPos.pos === "absolute"){
									elem.style.left = _initialPos.x + "px";
									elem.style.top = _initialPos.y + "px";
								}
								else{
									elem.style.left = "";
									elem.style.top = "";
									elem.style.position = "";
								}
								data._positionedPlceholder = false;
							}
							else{
								if(data.connectToSortable && data._positionedPlceholder){
									var sibling = (findPreviousElem(_placeholder) ? findPreviousElem(_placeholder) : findNextElem(_placeholder));
									var elementData = sibling ? sibling._sortableChildData : _placeholder.parentElement._sortableParentData;
									// $L(_placeholder).replace(_div);
									_lyteUiUtils.replaceWith(_placeholder, elem);

									_placeholder = null;
									elem._sortableChildData = elementData;
									elem.removeEventListener('mousedown',mouseDownEvent);
									removeStyle(elem);
									placed = true;
								}
							}
							//Check for any droppable element & if present execute its drop function
							if(typeof managerDD !== "undefined"){

								managerDD._drop(event);
								managerDD._current = null;
								if(data.currDroppable && data.currDroppable._droppableData){
									data.currDroppable._droppableData.entered = false
									data.currDroppable = null;
								}
							}

							//Callback fired
							if(data.onStop){
								returnVal = onStop(data, event);
							}

							if(!returnVal){

								if(data.helperElem && !placed){
									elem.remove();
									if(document.getElementById('lyteDraggableDummy')){
										_placeholder.remove();
									}
									manageDraggable.draggedEle = null;
									return;
								}
								if(_initialPos.pos === "absolute"){
									elem.style.left = _initialPos.x + "px";
									elem.style.top = _initialPos.y + "px";
								}
								else{
									elem.style.left = "";
									elem.style.top = "";
									elem.style.position = "";
								}
							}

						}
						elem.style.zIndex = "";
						manageDraggable.removeClassOrAttr(data.attribute,_handleElement,'selected-element');
						// $L(_handleElement).removeClass('selected-element');

					}
					data.touchTarget = null;
					_handleElement = null;
					if(document.getElementById('lyteDraggableDummy')){
						document.getElementById('lyteDraggableDummy').remove();
						if(_placeholder){
							_placeholder = null;
						}
					}
				}
				var elements = data.attribute ? event.target.ownerDocument.querySelectorAll("[selected-element]") : event.target.ownerDocument.querySelectorAll(".selected-element");
				var draggableDummy = event.target.ownerDocument.querySelectorAll(".lyteDraggableDummy");
				for(var i = 0; i < elements.length; i++){
					var elem = elements[i],
						data = elem._draggableData;
					if(data.cursorAt && data._preCursorAt && _lyteUiUtils.getRTL()){
						data.cursorAt = Object.assign({},data._preCursorAt);
						data._preCursorAt = undefined;
					}
					if(data._placeholder){
						data._placeholder = null;
						data._positionedPlceholder = false;
					}
					data._isDown = false;
					data._isMoved = false;
					manageDraggable.removeClassOrAttr(data.attribute,elem,'selected-element');
					// $L(elem).removeClass('selected-element');
					// $L(elem).removeClass('stopDefaultMove');
				}
				for(var i = 0; i < draggableDummy; i++){
					draggableDummy[i].remove();
				}

				manageDraggable.draggedEle = null;
			}

			/*---------------Callbacks Start--------------*/
			var onReady = function(data){
				data.onReady(data._element);
			}

			var onStart = function(data, event){
				returnVal = data.onStart(data._element, event);
				return (returnVal == undefined) ? true : returnVal;
			}

			var onDragStart = function(data,_handleElement,_placeholder,event){
				returnVal = data.onDragStart(data._element,_handleElement,_placeholder,event,data._origin);
				return (returnVal == undefined) ? true : returnVal;
			}

			var onDrag = function(data, _handleElement,event){
				returnVal = data.onDrag(data._element,_handleElement,event,data._origin,data._Elemoffset);
				return (returnVal == undefined) ? true : returnVal;
			}

			var onBeforeStop = function(data,event){
				returnVal = data.onBeforeStop(data._element,data._placeholder,data._positionedPlceholder ? data._placeholder.parentElement : null,event,getIndex(data, "onBeforeStop"),data._origin);
				return (returnVal == undefined) ? true : returnVal;
			}

			var checkValidDroppable = function(data,placeholder){
				var returnVal = data.onPlaceholder(data._element,placeholder, data._element.parentElement, placeholder ? placeholder.parentElement : null);
				return (returnVal == undefined) ? true : returnVal;
			}

			var onStop = function(data,event){
				data._element.style.display = "none";
				if(event.type == "mouseup"){
					_elemBelow = document.elementFromPoint(event.clientX, event.clientY);
				}
				else if(event.type == "touchend"){
					_elemBelow = document.elementFromPoint(data.touchTarget[0].clientX,data.touchTarget[0].clientY);
				}
				data._element.style.display = "";
				returnVal = data.onStop(data._element, data._positionedPlceholder ? data._element.parentElement : null, _elemBelow,event,getIndex(data, "onStop"),data._origin);
				return (returnVal === undefined) ? true : returnVal;
			}
			/*---------------Callbacks End--------------*/


			//Bind events
			if(data.dblTouchEvent){
				var prevClick = 0;
				
				data.__mousedown = function(event) {
					if(event.type == 'mousedown'){
							mouseDownEvent(event);
					}else{
						var date = new Date();
					  var time = date.getTime();
					  var touches = event.touches;
					  var curtouchY = event.touches[0].clientY;
					  const time_between_taps = 200; 

					  if(touches.length == 1){
					  		if(checkfordraggable(data,event.target)){
								  $L(	event.target  ).one('touchend',function(event){
								  		event.preventDefault();	  		
							  	})
								}
						  if (time - prevClick < time_between_taps &&  touches.length == 1 ) {
						  		prevClick = 0;
						  		event.preventDefault();
						  		mouseDownEvent(event);
						  	
						  }
						}
					  prevClick = time;
					}
				}
			}else{
				data.__mousedown = mouseDownEvent;
			}
			//data.__mousedown = mouseDownEvent;

			data.__mousemove = mouseMoveEvent;
			data.__mouseup = mouseUpEvent;
			if(!data._element._mousedown){
				if(typeof data.handle !== "string" && data.handle.length){
					data.handle.forEach(function(item){
						var ele = $L(item, data._element)[0];
						ele._draggableData = data;
						manageDraggable.addClassOrAttr(data.attribute,ele,'draggable-handle-element','');
						ele.addEventListener('mousedown',data.__mousedown);
						ele.addEventListener('touchstart',data.__mousedown);
					});
				}
				else{
					data.handle._draggableData = data;
					manageDraggable.addClassOrAttr(data.attribute,data.handle,'draggable-handle-element','');
					data.handle.addEventListener('mousedown',data.__mousedown);
					data.handle.addEventListener('touchstart',data.__mousedown);
				}
				data._element._mousedown = true;
			}



			//Callback fired
			if(data.onReady){
				onReady(data);
			}

			

			var checkParentDroppable = function(_elemBelow,data){
				if(_elemBelow.matches(data.connectToSortable) && _elemBelow._sortableParentData.droppable){
					return true;
				}
				return false;
			}

			var calculateHeight = function(element) {
				var cs = getComputedStyle(element);

				var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

				var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

				// Element height minus padding and border
				var elementHeight = element.offsetHeight - paddingY - borderY;
				return elementHeight;
			};

			var calculateWidth = function(element) {
				var cs = getComputedStyle(element);

				var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);

				var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);

				// Element width minus padding and border
				var elementWidth = element.offsetWidth - paddingX - borderX;
				return elementWidth;
			};

			var callForScrollY = function(data,scrollDiv,parentOffset,_maxScrollHeight,isRelativeY,_mousePosition,_offset,parent){
				var divOffset = data._element.getBoundingClientRect();
			
				if((document.compareDocumentPosition(data._element) & 1) ){
					return;
				}

				
				// var diff = data._placeholder.parentElement.offsetTop - scrollDiv.offsetTop + 5;
				var scrollTop = scrollDiv.scrollTop;
				// console.log("Scroll Y getting called",_maxScrollHeight,"    scrollTop",scrollTop);

				if((divOffset.top - parseInt(data._marginTop) <= parentOffset.top /*+ diff*/) && (scrollTop > 0)){
					if(isRelativeY){
						data._element.style.top = _mousePosition.y - _offset[1] - parent.top - (_maxScrollHeight - scrollTop >= data.scrollSpeed ? data.scrollSpeed : _maxScrollHeight - scrollTop) + scrollTop + "px";
					}
					scrollDiv.scrollTop -= data.scrollSpeed;
				}
				else if((divOffset.bottom >= (parentOffset.bottom - 3)) && (scrollTop < _maxScrollHeight)){
					if(_maxScrollHeight - scrollTop > data.scrollSpeed){
						if(isRelativeY){
							data._element.style.top = _mousePosition.y - _offset[1] - parent.top + data.scrollSpeed + scrollTop + "px";
						}
						scrollDiv.scrollTop += data.scrollSpeed;
					}
					else{
						if(isRelativeY){
							data._element.style.top = _mousePosition.y - _offset[1] - parent.top + _maxScrollHeight - scrollTop + scrollTop + "px";
						}
						scrollDiv.scrollTop += (_maxScrollHeight - scrollTop);
					}
				}
				else{
					cancelAnimationFrame(_requestId1);
					_animationFrameFired1 = false;
					_requestId1 = null;
					return;
				}
				_requestId1 = requestAnimationFrame(callForScrollY.bind(this,data,scrollDiv,parentOffset,_maxScrollHeight,isRelativeY,_mousePosition,_offset,parent));

			};

			var callForScrollX = function(data,parentOffset,_maxScrollWidth,_mousePosition,_offset,parent,isRelative){
				var divOffset = data._element.getBoundingClientRect();
				if((document.compareDocumentPosition(data._element) & 1) && data.scrollDivX ){
					return;
				}
				_scrollLeft = data.scrollDivX.scrollLeft;
				// _maxScrollWidth = data._maxScrollWidth;
				if( !_lyteUiUtils.getRTL() || (!_lyteUiUtils.isNegativeScroll() && _lyteUiUtils.getRTL() && detectBrowser() == "chrome" && !isRelative)){
					if((divOffset.right >= parentOffset.right - 2) && (_scrollLeft < _maxScrollWidth)){
						if((_maxScrollWidth - _scrollLeft) >= data.scrollSpeed){
							data.scrollDivX.scrollLeft += data.scrollSpeed;
							if(isRelative){
								data._element.style.left = _mousePosition.x - _offset[0] - parent.left + data.scrollSpeed + _scrollLeft + "px";
							}
						}
						else{
							data.scrollDivX.scrollLeft += (data.scrollSpeed - (_maxScrollWidth - _scrollLeft));
							if(isRelative){
								data._element.style.left = _mousePosition.x - _offset[0] - parent.left + (data.scrollSpeed - (_maxScrollWidth - _scrollLeft)) + _scrollLeft + "px";
							}
						}
					}
					else if((divOffset.left <= parentOffset.left + 2) && (_scrollLeft > 0)){
						if(isRelative){
							data._element.style.left = _mousePosition.x - _offset[0] - parent.left - ((_maxScrollWidth - _scrollLeft) > data.scrollSpeed ? data.scrollSpeed : (data.scrollSpeed - (_maxScrollWidth - _scrollLeft))) + _scrollLeft + "px";
						}
						data.scrollDivX.scrollLeft -= data.scrollSpeed;
					}
					else{
						cancelAnimationFrame(_requestId2);
						_animationFrameFired2 = false;
						_requestId2 = null;
						return;
					}
				}
				else{
					if(!_lyteUiUtils.isNegativeScroll() && detectBrowser() == "chrome" && isRelative){
						if((divOffset.right >= parentOffset.right) && (_scrollLeft < _maxScrollWidth)){
							if((_maxScrollWidth - _scrollLeft) >= 5){
								data.scrollDivX.scrollLeft += 5;
								if(isRelative){
									data._element.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + (_scrollLeft - _maxScrollWidth) + "px";
								}
							}
							else{
								data.scrollDivX.scrollLeft += (5 - (_maxScrollWidth - _scrollLeft));
								if(isRelative){
									data._element.style.left = _mousePosition.x - _offset[0] - parent.left + (5 - (_maxScrollWidth - _scrollLeft)) + _scrollLeft + "px";
								}
							}
						}
						else if((divOffset.left <= parentOffset.left) && (_scrollLeft > 0)){
							if(isRelative){
								data._element.style.left = _mousePosition.x - _offset[0] - parent.left - ((_maxScrollWidth - _scrollLeft) + 5) + "px";
							}
							data.scrollDivX.scrollLeft -= 5;
						}
						else{
							cancelAnimationFrame(_requestId2);
							_animationFrameFired2 = false;
							_requestId2 = null;
							return;
						}
					}
					else if((_lyteUiUtils.isNegativeScroll() && detectBrowser() == "chrome") || detectBrowser() == "firefox" || detectBrowser() == "safari"){
						if((divOffset.right >= parentOffset.right) && (_scrollLeft < 0)){
							if((_maxScrollWidth + _scrollLeft) >= 5){
								data.scrollDivX.scrollLeft += 5;
								if(isRelative){
									data._element.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + _scrollLeft + "px";
								}
							}
							else{
								data.scrollDivX.scrollLeft += (5 - (_maxScrollWidth + _scrollLeft));
								if(isRelative){
									data._element.style.left = _mousePosition.x - _offset[0] - parent.left + (5 - (_maxScrollWidth + _scrollLeft)) + _scrollLeft + "px";
								}
							}
						}
						else if((divOffset.left <= parentOffset.left) && (_scrollLeft > -(_maxScrollWidth))){
							if(isRelative){
								data._element.style.left = _mousePosition.x - _offset[0] - parent.left + (_scrollLeft - 5) + "px";
							}
							data.scrollDivX.scrollLeft -= 5;
						}
						else{
							cancelAnimationFrame(_requestId2);
							_animationFrameFired2 = false;
							_requestId2 = null;
							return;
						}
					}
					else if(detectBrowser() == "ie" || detectBrowser() == "edge"){
						if((divOffset.right >= parentOffset.right) && (_scrollLeft > 0)){
							if(_scrollLeft >= 5){
								data.scrollDivX.scrollLeft -= 5;
								// if(isRelative){
								// 	data._element.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + _scrollLeft + "px";
								// }
							}
							else{
								data.scrollDivX.scrollLeft -= _scrollLeft;
								// if(isRelative){
								// 	data._element.style.left = _mousePosition.x - _offset[0] - parent.left + (5 - (_maxScrollWidth + _scrollLeft)) + _scrollLeft + "px";
								// }
							}
						}
						else if((divOffset.left <= parentOffset.left) && (_scrollLeft < _maxScrollWidth)){
							if(isRelative){
								data._element.style.left = _mousePosition.x - _offset[0] - parent.left + (-_scrollLeft) - 5 + "px";
							}
							data.scrollDivX.scrollLeft += 5;
						}
						else{
							cancelAnimationFrame(_requestId2);
							_animationFrameFired2 = false;
							_requestId2 = null;
							return;
						}
					}

				}
				_requestId2 = requestAnimationFrame(callForScrollX.bind(this,data,parentOffset,_maxScrollWidth,_mousePosition,_offset,parent,isRelative));
			};
			var getRelativeParent = function(element){

				while(element.parentElement){
					element = element.parentElement;
					var cs = getComputedStyle(element);
					if(cs.position == "relative"){
						return element;
					}
				}
				return null;
			};
			var detectBrowser = function(){
				//Check if browser is IE11
			    if (navigator.userAgent.search("rv:11") >= 0) {
			        return "ie";
			    }
			    //Check if browser is Edge
			    if (navigator.userAgent.search("Edge") >= 0) {
			        return "edge";
			    }
			    //Check if browser is Chrome || Opera
			    else if (navigator.userAgent.search("Chrome") >= 0) {
			        return "chrome";
			    }
			    //Check if browser is Firefox
			    else if (navigator.userAgent.search("Firefox") >= 0) {
			        return "firefox";
			    }
			    //Check if browser is Safari
			    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
			        return "safari";
			    }
			};

			var checkForIntersect = function(parentElem,mP){
				var cs = window.getComputedStyle(parentElem);
				var offset = parentElem.getBoundingClientRect();
				// console.log("cs",cs);
				// console.log("offset",offset);
				// console.log("_mousePosition",mP.x,mP.y);
				if(mP.x > (offset.left + parseFloat(cs.paddingLeft || 0)) && mP.x < (offset.right - parseFloat(cs.paddingRight || 0)) && mP.y > (offset.top + parseFloat(cs.paddingTop || 0)) && mP.y < (offset.bottom - parseFloat(cs.paddingBottom || 0))){
					return true;
				}
				return false;
			};

			var checkForBetween = function(parentElem,mP,div){
				var childrens = parentElem.children;
				var templateTags = 0;
				var childElem = [];
				for(var i = 0;i<childrens.length;i++){
					if(childrens[i].tagName != "TEMPLATE" && childrens[i].id != "dummy"){
						childElem.push(childrens[i]);
					}
					else{
						templateTags++;
					}
				}
				if(templateTags == childrens.length){
					return true;
				}
				else if(div.getBoundingClientRect().top > (childElem[childElem.length - 1].getBoundingClientRect().bottom/* + (isRelativeY ? scrollDiv.scrollTop : 0)*/)){
					return true;
				}
				return false;
			};


			var findPreviousElem = function(elem){
				while(elem.previousElementSibling){
					elem = elem.previousElementSibling;
					if(elem.tagName != "TEMPLATE" && $L(elem).hasClass('sortable-element')){
						return elem;
					}
				}
				return null;
			};

			var findNextElem = function(elem){
				while(elem.nextElementSibling){
					elem = elem.nextElementSibling;
					if(elem.tagName != "TEMPLATE" && $L(elem).hasClass('sortable-element')){
						return elem;
					}
				}
				return null;
			};

			var removeStyle = function(elem){
				elem.style.left = "";
				elem.style.top = "";
				elem.style.zIndex = "";
				elem.style.position = "";
				$L(elem).addClass("sortable-element "+elem._sortableChildData.sortableElemClass);
				manageDraggable.removeClassOrAttr(data.attribute,elem,'draggable-element');
				manageDraggable.removeClassOrAttr(data.attribute,elem,'draggable-handle-element');
			};

			var findScrollDiv = function(elem){
				var parent = elem.parentElement;
				while(elem.parentElement){
					elem = elem.parentElement;
					if(parent.scrollHeight > elem.clientHeight && !(elem.style.overflow && elem.style.overflow == 'hidden')){
						return elem;
					}
				}
				return null;
			};

			var checkPlaceholderBelow = function(elem){
				while(elem){
					if(elem.id && elem.id === "lyteDraggableDummy"){
						return true;
					}
					elem = elem.parentElement;
				}
				return false;
			};

			var isNotRestricted = function(data,targetElem){
				for(var i = 0; i<data.restrict.length ; i++){
					if(targetElem.matches(data.restrict[i])){
						return false;
					}
				}
				return true;
			};

			var getIndex = function(data, fnName){
				if(data.connectToSortable && data._positionedPlceholder){
					var elem,parent;
					if(fnName === "onBeforeStop"){
						elem = data._placeholder;
						parent = data._placeholder.parentElement;
					}
					if(fnName === "onStop"){
						elem = data._element;
						parent = data._element.parentElement;
					}
					if(parent._sortableParentData.omitRestricted){
					var siblings = Array.from(parent.children).filter( function(ele) { return ele.tagName != "TEMPLATE" } );
						for(var y = 0; y<siblings.length; y++){
	                        if(!isNotRestricted(data,siblings[y])){
	                            siblings.splice(y,1);
	                            --y;
	                        }
	                    }
	                    return siblings.indexOf(elem);
					}
					else{
						return Array.from(parent.children).filter( function(ele) { return ele.tagName != "TEMPLATE" } ).indexOf(elem);
					}

				}
				return -1;
			};

			var getOS = function() {
				var userAgent = window.navigator.userAgent,
				    platform = window.navigator.platform,
				    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
				    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
				    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
				    os = null;

				if (macosPlatforms.indexOf(platform) !== -1) {
				    os = 'Mac OS';
				} else if (iosPlatforms.indexOf(platform) !== -1) {
				    os = 'iOS';
				} else if (windowsPlatforms.indexOf(platform) !== -1) {
				    os = 'Windows';
				} else if (/Android/.test(userAgent)) {
				    os = 'Android';
				} else if (!os && /Linux/.test(platform)) {
				    os = 'Linux';
				}

				return os;
			};


			return this;

		}
	}

})( window );

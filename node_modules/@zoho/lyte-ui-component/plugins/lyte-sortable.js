/*------------------------   NOTES   ------------------------*/
/*
  Date - 22/06/2018 - Documented
  1. Added scrollDivX property to check for horizontal scrolling.
  Date - 28/08/2018
  1. Added method to destroy sortable.
  Date - 13/09/2018
  1. Added omitRestricted - to exclude the restricted elements from list while calculating from and to index position.
  Date - 19/02/2019
  1. Providing rtl support - issue in chrome and ie not fixed
*/
/*
	Issues with relative Horizontal scroll div - Fixed
*/


;(function( window ) {

	if(lyteDomObj){
		lyteDomObj.prototype.manageSortable = {
			
			keyPressed : false,
			keyValue : 0,
			countSortable : 0,
			init : false,
			prevSortable : false,
			mousedownTriggered : false,
			draggedEle : null,
			_ssData : {},
			measureQueue : [],
			mutateQueue : [],
			isEqual : function (value, other) {
				if(value.length != other.length){
					return false;
				}
				for(var i = 0 ; i < value.length ; i++){
					if(other.indexOf(value[i]) == -1){
						return false;
					}
				}
				// If nothing failed, return true
				return true;
			},

			convertToArrayOfItems : function(selector,context){
				if(typeof selector != "string" && selector.length > 0){
					return selector;
				}
				var selectorArray = selector.split(',');
				var retArray = [];
				selectorArray.forEach(function(item,indexVal){
					var items = $L(item.trim(),context);
					if(items.length){
						for(var i=0;i < items.length ;i++){
							if(retArray.indexOf(items[i]) == -1 && items[i].tagName != "TEMPLATE"){
								retArray.push(items[i]);
							}
						}
					}
					else{
						if(retArray.indexOf(items) == -1 && items.tagName != "TEMPLATE"){
							retArray.push(items);
						}
					}
				});
				return retArray;
			},

			destroy : function(element){

				if(!(element.classList.contains('sortable-parent'))){
					console.info("ALERT! - U have already destroyed its sortable behaviour.");
					return;
				}
				var childrens = Array.from(element.children).filter(function(node) { return node.tagName != 'TEMPLATE'});
				var sortableElemClass = element.getSortableClass();
				for(var i = 0; i<childrens.length; i++){
					childrens[i].classList.remove('sortable-element',sortableElemClass);
					if(childrens[i]._sortableChildData){
						childrens[i]._sortableChildData = null;
					}
				}
				if(element._mousedown){
					element.removeEventListener('mousedown',element.__mouseDownEvent);
					element.removeEventListener('touchstart',element.__mouseDownEvent, true);
					element._mousedown = false;
				}
				element.classList.remove('sortable-parent');
				// element._sortableParentData = null;
				if(element._sortableParentData.multiSortable) {
					element._sortableParentData.allSortableClass = null;
				}
				delete element._sortableParentData;
				delete element.getSortableClass;
			},

			cancel : function(element){
				if(!(element.classList.contains('sortable-parent'))){
					console.info("ALERT! - The element is not a sortable parent.");
					return;
				}
				var childrens = this.getChildElements(element) /*element.children*/;
				for(var i = childrens.length-1; i >= 0 ; i--){
					if(childrens[i]._pos != i){
						var elem = undefined;
						for(var j = i; j >= 0; j--){
							if(childrens[j]._pos == i){
								elem = childrens[j];
								break;
							}
						}
						if(elem){
							if(i == childrens.length-1){
								_lyteUiUtils.appendChild(element,elem);
							}
							else{
								_lyteUiUtils.insertBefore(childrens[i+1],elem);
							}
						}
						childrens = this.getChildElements(element);
					}
				}
			},

			getChildElements : function(parent){
				return Array.from(parent.children).filter(function(ele){ return ele.tagName != "TEMPLATE" });
			},

			disable : function(elements){
				for(var i = 0; i < elements.length; i++){
					var sortableElem = elements[i];
					if(!(sortableElem.classList.contains('sortable-element'))){
						console.info(sortableElem, " cannot be disabled as it is not a sortable element.");
					}
					else{
						var disabledData = {
												class : 'sortable-element',
												data : Object.assign({}, sortableElem._sortableChildData)
											};
						sortableElem.classList.add('sort-disabled-element');
						sortableElem.classList.remove('sortable-element', sortableElem._sortableChildData.sortableElemClass);
						sortableElem._disabledData = disabledData;
						sortableElem._sortableChildData = null;
					}
				}
			},

			enable : function(elements){
				for(var i = 0; i < elements.length; i++){
					var sortableElem = elements[i];
					if(!(sortableElem._disabledData || sortableElem.classList.contains('sort-disabled-element'))){
						console.info(sortableElem, " cannot be enabled as it is not a disabled sortable element.");
					}
					else{
						sortableElem._sortableChildData = Object.assign({}, sortableElem._disabledData.data);
						sortableElem.classList.remove('sort-disabled-element');
						sortableElem.classList.add('sortable-element', sortableElem._sortableChildData.sortableElemClass);
						delete sortableElem._disabledData;
					}
				}
			},

			alreadySortable : function(elements){
				for(var i = 0; i<elements.length; i++){
					if($L(elements[i]).hasClass('sortable-parent') && elements[i]._sortableParentData){
						return {found : true, class : elements[i]._sortableParentData.sortableElemClass}
					}
				}
				return {found : undefined};
			},

			isOver : function(event, data, fromDraggable){
				var manageSortable = lyteDomObj.prototype.manageSortable;

				if(fromDraggable){
					var prevOffset = manageSortable.prevSortable ? manageSortable.prevSortable.getBoundingClientRect() : null;
					if(prevOffset && (event.clientX < prevOffset.left || event.clientX > prevOffset.right || event.clientY < prevOffset.top || event.clientY > prevOffset.bottom)){
						if(manageSortable.prevSortable && manageSortable.prevSortable._sortableParentData && manageSortable.prevSortable._sortableParentData.onLeave){
							manageSortable.prevSortable._sortableParentData.onLeave(event,{element : data._element, sortable : manageSortable.prevSortable, placeholder : data._placeholder});
						}
						manageSortable.prevSortable = false;
					}
					else{

						var sortables = document.querySelectorAll(data.connectToSortable+".sortable-parent");
												if(sortables.length){
							for(var i = sortables.length-1; i >= 0; i--){
								var sortableOffset =  sortables[i].getBoundingClientRect();
								if(sortables[i]._sortableParentData.droppable && (event.clientX >= sortableOffset.left) && (event.clientX <= sortableOffset.right) && (event.clientY >= sortableOffset.top) && (event.clientY <= sortableOffset.bottom)){
									// return sortables[i];
									if(!manageSortable.prevSortable || (manageSortable.prevSortable && manageSortable.prevSortable != sortables[i])){
										manageSortable.prevSortable = sortables[i];

										if(manageSortable.prevSortable._sortableParentData && manageSortable.prevSortable._sortableParentData.onEnter){
											manageSortable.prevSortable._sortableParentData.onEnter(event,{element : data._element, sortable : manageSortable.prevSortable, placeholder : data._placeholder});
										}
									}
									break;
								}
							}
						}
					}
				}
				else{

					var prevOffset = manageSortable.prevSortable ? ( manageSortable.prevSortable.getBoundingClientRect() ) : null;
					if(prevOffset && (event.clientX < prevOffset.left || event.clientX > prevOffset.right || event.clientY < prevOffset.top || event.clientY > prevOffset.bottom)){
						// manageSortable.prevSortable.classList.remove('disableHover');
						if(manageSortable.prevSortable && manageSortable.prevSortable._sortableParentData && manageSortable.prevSortable._sortableParentData.onLeave){
							manageSortable.prevSortable._sortableParentData.onLeave(event,{element : data._div, sortable : manageSortable.prevSortable, placeholder : data._placeholder});
						}
						manageSortable.prevSortable = false;
					}
					else{

						var sortables = data.connectedWith.length ? data.connectedWith : [data._parentElem];
						if(sortables.length){
							for(var i = sortables.length-1; i >= 0; i--){
								

								var sortableOffset =   sortables[i].getBoundingClientRect();
								if(sortables[i]._sortableParentData.droppable && (event.clientX >= sortableOffset.left) && (event.clientX <= sortableOffset.right) && (event.clientY >= sortableOffset.top) && (event.clientY <= sortableOffset.bottom)){
									// return sortables[i];

									if(!manageSortable.prevSortable || (manageSortable.prevSortable && manageSortable.prevSortable != sortables[i])){
										manageSortable.prevSortable = sortables[i];
										// manageSortable.prevSortable.classList.add('disableHover');
										if(manageSortable.prevSortable._sortableParentData && manageSortable.prevSortable._sortableParentData.onEnter){
											manageSortable.prevSortable._sortableParentData.onEnter(event,{element : data._div, sortable : manageSortable.prevSortable, placeholder : data._placeholder});
										}
									}
									break;
								}
							}
						}
					}
				}
			},

			getSortableClasses : function(elements, previousObject) {
				var object = previousObject || {};
				elements.forEach(function(element){
					if( element && element._sortableParentData){
						var classNameForSortable = element._sortableParentData.sortableElemClass;
						if(!object.hasOwnProperty(classNameForSortable)) {
							object[classNameForSortable] = element;
						}
					}
				});
				return object;
			},

			enableDroppable : function(element) {
				if($L(element).hasClass('sortable-parent')) {
					element[0]._sortableParentData.droppable = true;
				}
			},

			disableDroppable : function(element) {
				if($L(element).hasClass('sortable-parent')) {
					element[0]._sortableParentData.droppable = false;
				}
			}
		};

		lyteDomObj.prototype.sortable = function(object) {
			
			var manageSortable = lyteDomObj.prototype.manageSortable;
			if(!manageSortable.init){
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
				if (!Array.from) {
				  Array.from = (function () {
				    var toStr = Object.prototype.toString;
				    var isCallable = function (fn) {
				      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
				    };
				    var toInteger = function (value) {
				      var number = Number(value);
				      if (isNaN(number)) { return 0; }
				      if (number === 0 || !isFinite(number)) { return number; }
				      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
				    };
				    var maxSafeInteger = Math.pow(2, 53) - 1;
				    var toLength = function (value) {
				      var len = toInteger(value);
				      return Math.min(Math.max(len, 0), maxSafeInteger);
				    };

				    // The length property of the from method is 1.
				    return function from(arrayLike/*, mapFn, thisArg */) {
				      // 1. Let C be the this value.
				      var C = this;

				      // 2. Let items be ToObject(arrayLike).
				      var items = Object(arrayLike);

				      // 3. ReturnIfAbrupt(items).
				      if (arrayLike == null) {
				        throw new TypeError('Array.from requires an array-like object - not null or undefined');
				      }

				      // 4. If mapfn is undefined, then let mapping be false.
				      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				      var T;
				      if (typeof mapFn !== 'undefined') {
				        // 5. else
				        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				        if (!isCallable(mapFn)) {
				          throw new TypeError('Array.from: when provided, the second argument must be a function');
				        }

				        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				        if (arguments.length > 2) {
				          T = arguments[2];
				        }
				      }

				      // 10. Let lenValue be Get(items, "length").
				      // 11. Let len be ToLength(lenValue).
				      var len = toLength(items.length);

				      // 13. If IsConstructor(C) is true, then
				      // 13. a. Let A be the result of calling the [[Construct]] internal method
				      // of C with an argument list containing the single item len.
				      // 14. a. Else, Let A be ArrayCreate(len).
				      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

				      // 16. Let k be 0.
				      var k = 0;
				      // 17. Repeat, while k < len… (also steps a - h)
				      var kValue;
				      while (k < len) {
				        kValue = items[k];
				        if (mapFn) {
				          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				        } else {
				          A[k] = kValue;
				        }
				        k += 1;
				      }
				      // 18. Let putStatus be Put(A, "length", len, true).
				      A.length = len;
				      // 20. Return A.
				      return A;
				    };
				  }());
				}
				manageSortable.init = true;
			}

			if(typeof object === "string"){
				if(object === "destroy"){
					if(this.length > 1){
						var elemArray = this;
						for(var i = 0; i<elemArray.length; i++){
							manageSortable.destroy(elemArray[i]);
						}
					}
					else{
						manageSortable.destroy(this[0]);
					}
				}
				else if(object === "cancel"){
					if(this.length > 1){
						var elemArray = this;
						for(var i = 0; i<elemArray.length; i++){
							manageSortable.cancel(elemArray[i]);
						}
					}
					else{
						manageSortable.cancel(this[0]);
					}
				}
				else if(object === "disable"){
					manageSortable.disable(this);
				}
				else if(object === "enable"){
					manageSortable.enable(this);
				}
				else if(object === "disableDroppable"){
					manageSortable.disableDroppable(this);
				}
				else if(object === "enableDroppable"){
					manageSortable.enableDroppable(this);
				}
				return;
			}
			var data = object ? object : {};

			/* -------- BROWSER RELATED CHECKS -------- */
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

			var isMobileOrTabletCheck = function() {
				var check = false;
				(function(a){
					if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) ||
						/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
						check = true;
					}
				})(navigator.userAgent||navigator.vendor||window.opera);
				return check;
			};

			if(this.length > 1){

				var elemArray = this;
				if(!data.changed){
					++manageSortable.countSortable;
					data.changed = true;
				}
				var check = manageSortable.alreadySortable(this);

				if(check.found){
					data.sortableElemClass = check.class;
				}
				for(var i = 0 ; i < elemArray.length ; i++){

					if(elemArray[i]._sortableParentData && data.isSameClass  ){
						if((elemArray[i]._sortableParentData.connectedWith.length !== $L(data.connectedWith,data.context).length)){
							data.connectedWith  = manageSortable.convertToArrayOfItems(data.connectedWith,data.context);
						}else {
							data.connectedWith = elemArray[i]._sortableParentData.connectedWith;
						}
					}
					$L(elemArray[i]).sortable(Object.assign({},data));


				};
				return;
			}


			var element = this.length == undefined ? this : this[0];


			if(element._sortableParentData){

				var _sortableData = element._sortableParentData;

				data._parentElem = data._parentElem == undefined ? _sortableData._parentElem : data._parentElem;

				//Data overriding
				data.containment = data.containment ? data.containment : _sortableData.containment;
				data.connected = data.connectedWith ? manageSortable.isEqual(data.connectedWith, _sortableData.connectedWith) : _sortableData.connected;
				data.connectedWith = data.connectedWith ? data.connectedWith : _sortableData.connectedWith;
				data.orientation = data.orientation ? data.orientation : _sortableData.orientation;
				data.droppable = (data.droppable == undefined) ? _sortableData.droppable : data.droppable;
				data.draggable = (data.draggable == undefined) ? _sortableData.draggable : data.draggable;
				data.sortableElemClass = data.sortableElemClass ? data.sortableElemClass : _sortableData.sortableElemClass;
				data.placeholder = data.placeholder ? data.placeholder : _sortableData.placeholder;
				data.disabled = data.disabled ? data.disabled : _sortableData.disabled;
				data.onReady = data.onReady ? data.onReady : _sortableData.onReady;
				data.onSelect = data.onSelect ? data.onSelect : _sortableData.onSelect;
				data.onDragStart = data.onDragStart ? data.onDragStart : _sortableData.onDragStart;
				data.onDrag = data.onDrag ? data.onDrag : _sortableData.onDrag;
				data.onPlaceholder = data.onPlaceholder ? data.onPlaceholder : _sortableData.onPlaceholder;
				data.onBeforeDrop = data.onBeforeDrop ? data.onBeforeDrop : _sortableData.onBeforeDrop;
				data.onDrop = data.onDrop ? data.onDrop : _sortableData.onDrop;
				data.cancel = data.cancel == undefined ? _sortableData.cancel : data.cancel instanceof Array ? data.cancel : data.cancel.split(",") ;
				data.cancelRemove = (_sortableData.cancelRemove || data.cancelRemove == true) ? true : false ;
				data.tolerance = data.tolerance ? data.tolerance : _sortableData.tolerance;
				data.items = data.items == undefined ? _sortableData.items : data.items instanceof Array ? data.items : data.items.split(",");
				data.cursorAt = data.cursorAt == undefined ? _sortableData.cursorAt : data.cursorAt;
				data.restrict = data.restrict == undefined ? _sortableData.restrict : data.restrict instanceof Array ? data.restrict : data.restrict.split(",");
				data.scrollDivX = data.scrollDivX == undefined ? _sortableData.scrollDivX : typeof data.scrollDivX === "string" ? document.querySelector(data.scrollDivX) : data.scrollDivX;
				data.scrollDivY = data.scrollDivY == undefined ? _sortableData.scrollDivY : typeof data.scrollDivY === "string" ? document.querySelector(data.scrollDivY) : data.scrollDivY;
				data.preventScrollY = data.preventScrollY == undefined ? _sortableData.preventScrollY : data.preventScrollY;
				data.omitRestricted = data.omitRestricted == undefined ? _sortableData.omitRestricted : data.omitRestricted;
				data.onEnter = data.onEnter ? data.onEnter : _sortableData.onEnter;
				data.onLeave = data.onLeave ? data.onLeave : _sortableData.onLeave;
				data.clone = data.clone ? data.clone : _sortableData.clone;
				data.preventDefault = data.preventDefault ? data.preventDefault : _sortableData.preventDefault;
				data.appendTo = data.appendTo ? (data.appendTo != "parent" ? $L(data.appendTo)[0] : "parent") : _sortableData.appendTo;
				data.helper = data.helper ? data.helper : _sortableData.helper;
				data.preventDropAtEnd = data.preventDropAtEnd == undefined ? _sortableData.preventDropAtEnd : data.preventDropAtEnd;
				data.preventDropAtStart = data.preventDropAtStart == undefined ? _sortableData.preventDropAtStart : data.preventDropAtStart;
				data.onMultiSelectDrag = data.onMultiSelectDrag ? data.onMultiSelectDrag : _sortableData.onMultiSelectDrag;
				data.gridView = data.gridView ? data.gridView : _sortableData.gridView;
				data.multiSortable = data.multiSortable ? data.multiSortable : _sortableData.multiSortable;
				data.context = data.context ? data.context : _sortableData.context;
				data.isSameClass = data.isSameClass ? data.isSameClass : _sortableData.isSameClass;
				data.preventScroll = data.preventScroll ? data.preventScroll : _sortableData.preventScroll;
				data.threshold = data.threshold ? data.threshold : _sortableData.threshold;
				data.dblTouchEvent = data.dblTouchEvent ? data.dblTouchEvent : _sortableData.dblTouchEvent;
				if(data.multiSortable && data.connectedWith) {
					data.allSortableClass = _sortableData.allSortableClass ? _sortableData.allSortableClass : manageSortable.getSortableClasses(data.connectedWith, _sortableData.allSortableClass);
				}
				if(!($L(element).hasClass('sortable-parent'))){
					$L(element).addClass('sortable-parent','lyteSortableParent')
				}
				if(data.executeOnReady){
					data._parentElem.executedOnReady = false;
				}
			}
			else{

				if(!data.connected && !data.changed){
					// console.log(data,++manageSortable.countSortable);
					++manageSortable.countSortable;
					data.changed = true;
				}
				//Parent Element
				data._parentElem = element;
				$L(data._parentElem).addClass('sortable-parent','lyteSortableParent');

				//Data initialization
				data.containment = data.containment;
				data.connectedWith = data.connectedWith ? data.connectedWith : [];
				data.orientation = data.orientation ? data.orientation : "default";
				data.droppable = (data.droppable == undefined) ? true : data.droppable;
				data.draggable = (data.draggable == undefined) ? true : data.draggable;
				data.sortableElemClass = data.sortableElemClass ? data.sortableElemClass : element.parentElement && element.parentElement._sortableParentData ? element.parentElement._sortableParentData.sortableElemClass : (data.orientation === "horizontal") ? "sortable-element-h"+manageSortable.countSortable : (data.orientation === "vertical") ? "sortable-element-v"+manageSortable.countSortable : "sortable-element-d"+manageSortable.countSortable;
				data.placeholder = data.placeholder ? data.placeholder : "lyteSortablePlaceholder";
				data.disabled = data.disabled ? data.disabled : "lyteSortableDisabledPlaceholder";
				data.cancel = data.cancel == undefined ? [] : data.cancel instanceof Array ? data.cancel : data.cancel.split(",");
				data.tolerance = data.tolerance ? data.tolerance : "intersect";
				data.items = data.items == undefined ? [] : data.items instanceof Array ? data.items : data.items.split(",");
				data.cursorAt = data.cursorAt;
				data.restrict = data.restrict == undefined ? [] : data.restrict instanceof Array ? data.restrict : data.restrict.split(",");
				data.scrollDivX = data.scrollDivX ? ( typeof data.scrollDivX === "string" ? document.querySelector(data.scrollDivX) : data.scrollDivX) : undefined;
				data.scrollDivY = data.scrollDivY ? ( typeof data.scrollDivY === "string" ? document.querySelector(data.scrollDivY) : data.scrollDivY) : undefined;
				data.omitRestricted = data.omitRestricted == undefined ? false : data.omitRestricted;
				data.clone = data.clone ? true : false;
				data.context = data.context ? data.context : 'BODY';
				data.preventDefault = data.preventDefault == undefined ? { "mousedown" : isMobileOrTabletCheck() ? false : true, "mousemove" : true } : data.preventDefault;
				data.appendTo = data.appendTo && data.appendTo != "parent" ? $L(data.appendTo)[0] : "parent";
				data.preventDropAtEnd = data.preventDropAtEnd == undefined ? true : data.preventDropAtEnd;
				data.preventDropAtStart = data.preventDropAtStart == undefined ? true : data.preventDropAtStart;
				data.gridView = data.gridView ? true : false;
				data.isSameClass = data.isSameClass ? data.isSameClass : false;
				data.preventScrollY = data.preventScrollY ? data.preventScrollY : false;
				data.preventScroll = data.preventScroll ? data.preventScroll : false;
				data.threshold = data.threshold ? data.threshold : 0;
				data.dblTouchEvent = data.dblTouchEvent ? data.dblTouchEvent : false;
			}


			var _offset = [0,0];
			var _initClientX;
			var _initClientY;
			var _isDown = false;
			var _isMoved = false;
			var _mousePosition;
			var _elemBelow;
			var _droppablePlace;
			var _marginTop = 0;
			var _marginLeft = 0;
			var _sortableElemClass;
			var _sortableElem;
			var _placeholder = "";
			var _div = "";
			var _scrollLeft = 0;
			var _scrollTop = 0;
			var _requestId1 = null;
			var _requestId2 = null;
			var _animationFrameFired1 = false;
			var _animationFrameFired2 = false;
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
			var _maxScrollWidth = 0;
			var _maxScrollHeight = 0;
			var _prevMode = null;
			var prevTop = null;
			var _prevScrollDiv = null;
			var _prevData = null;

			function mouseDownEvent(event){


				//Disable right click on the sortable elements to avoid unwanted behaviour
				if(event.which == 3){
					return;
				}

				_initClientX = event.clientX
				_initClientY = event.clientY

				if(manageSortable.mousedownTriggered){
					manageSortable.mousedownTriggered = false;
					return;
				}

				var target = event.target;

				while(target){
					if($L(target).hasClass("sortable-element")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}

				if(!target){
					_sortableElem = null;
					manageSortable.draggedEle = null;
				}

				if(_sortableElem && checkForSortable(_sortableElem._sortableChildData || _sortableElem.parentElement._sortableParentData, event.target) && checkForItems(_sortableElem._sortableChildData || _sortableElem.parentElement._sortableParentData, event.target)){
					manageSortable.draggedEle = _sortableElem;
					var data = _sortableElem._sortableChildData || _sortableElem.parentElement._sortableParentData;
					if(data.preventDefault.mousedown == undefined || data.preventDefault.mousedown){
						event.preventDefault();
					}
					if(_sortableElem.parentElement && !_sortableElem.classList.contains(_sortableElem.parentElement._sortableParentData.sortableElemClass)){
						_sortableElem.classList.add(_sortableElem.parentElement._sortableParentData.sortableElemClass)
					}
					if(typeof data.helper == "function"){
						var helper = data.helper(_sortableElem);
						if(helper){
							helper._isHelper = true;
							helper.classList.add('sortable-helper');
							helper._sortableChildData = Object.assign({},_sortableElem._sortableChildData);
							helper.classList.add(_sortableElem.parentElement._sortableParentData.sortableElemClass);
							helper._origin = _sortableElem;
							manageSortable.draggedEle = helper;
							if(data.appendTo == "parent"){
								_lyteUiUtils.appendChild(_sortableElem.parentElement, helper);
							}
							else{
								_lyteUiUtils.appendChild($L(data.appendTo)[0], helper);
							}
							data = helper._sortableChildData;
							helper.style.visibility = "hidden";
						}
					}

					_placeholder = getClone(manageSortable.draggedEle, data.clone); //_sortableElem.cloneNode()
					data._div = _div = manageSortable.draggedEle/*_sortableElem*/;
					var returnVal = true;
					data._source = getSource(data);
					data._fromIndex = getFromIndex(data);

					//Callback fired
					if(data.onSelect){
						returnVal = onSelect(data,event);
					}
					if(returnVal){

						_div.classList.add("sortable-element-selected");
						var sortableElemCS = window.getComputedStyle(_div/*_sortableElem*/);
						var divOffset = isHelper(_div) ? _div._origin.getBoundingClientRect() : _div.getBoundingClientRect();
						if(data.scrollDivX && window.getComputedStyle(data.scrollDivX).position == "relative"){
							data._isRelative = true;
						}
						else{
							data._isRelative = false;
						}

						if(sortableElemCS.marginTop){
							_marginTop = sortableElemCS.marginTop;
						}
						if(sortableElemCS.marginLeft){
							_marginLeft = sortableElemCS.marginLeft;
						}
						if(event.type == "mousedown"){

							_offset = [
								data.cursorAt && data.cursorAt.left || event.clientX - divOffset.left,
								data.cursorAt && data.cursorAt.top || event.clientY - divOffset.top
							];
						}
						else if(event.type == "touchstart"){
							_offset = [
								data.cursorAt && data.cursorAt.left || event.touches[0].clientX - divOffset.left,
								data.cursorAt && data.cursorAt.top || event.touches[0].clientY - divOffset.top
							];

							//Binding eventlistener for touch
							document.addEventListener('touchmove',data._parentElem.__mouseMoveEvent, {capture : true, passive : false});
							document.addEventListener('touchend',data._parentElem.__mouseUpEvent, true);
						}

						//Binding the values to the draggable element
						data._isDown = true;
						data._placeholder = _placeholder;
						data._offset = _offset;
						data._marginTop = _marginTop;
						data._marginLeft = _marginLeft;
						data._event = event;
						data._placedPlaceholder = false;

						if(!manageSortable.draggedEle/*_sortableElem*/._sortableChildData){
							manageSortable.draggedEle/*_sortableElem*/._sortableChildData = data;
						}
						_placeholder = null;
						_div = null;
						_sortableElem = null;

						//Binding mousedown and mouseup event
						if(event.type == "mousedown"){
							document.addEventListener('mousemove',mouseMoveEvent);
							document.addEventListener('mouseup',mouseUpEvent);
							manageSortable.mousedownTriggered = true;
							if(getOS() === "Windows"){	//Added check to restrict initial triggering of mousemove in windows as soon as the event is added
								manageSortable.mouseMoveTriggered = true;
							}
						}
					}
					else{
						if(!data.cancelRemove){
							if(data.helper){
								manageSortable.draggedEle.remove();
							}
							manageSortable.draggedEle = null;
							_sortableElem = null;
						}
					}
				}
				else{
					_sortableElem = null;
				}
			}

			var mouseMoveEvent = function(event){

				if(getOS() === "Windows" && manageSortable.mouseMoveTriggered){	//Added check to restrict initial triggering of mousemove in windows as soon as the event is added
					manageSortable.mouseMoveTriggered = false;
					return;
				}

				if(event.type == "touchmove"){
					event.preventDefault();
				}
				if(_animationFrameFired1 && _requestId1){
					cancelAnimationFrame(_requestId1);
					_animationFrameFired1 = false;
					_requestId1 = null;
				}
				if(_animationFrameFired2 && _requestId2){
					cancelAnimationFrame(_requestId2);
					_animationFrameFired2 = false;
					_requestId2 = null;
				}

				if(manageSortable.draggedEle && manageSortable.draggedEle.classList.contains("sortable-element-selected") && manageSortable.draggedEle._sortableChildData._isDown){
					_sortableElem = manageSortable.draggedEle;
				}
				else{
					_sortableElem = null;
					return;
				}

				if(_sortableElem){

					var data = _sortableElem._sortableChildData;

					if(((Math.abs(_initClientX - event.clientX)) <= data.threshold) && ((Math.abs(_initClientY - event.clientY)) <= data.threshold)){
						return
					}

					if(data && data._isDown){
						if(data.preventDefault.mousemove == undefined || data.preventDefault.mousemove){
							event.preventDefault();
						}
						if(typeof document.body.style.MozUserSelect!="undefined"){
							document.body.style.MozUserSelect = "none";
						}
						_div = data._div;
						_placeholder = data._placeholder;
						_offset = data._offset;
						_marginTop = data._marginTop;
						_marginLeft = data._marginLeft;
						_sortableElemClass = data.sortableElemClass;
						var divOffset = _sortableElem.getBoundingClientRect();

						var scrollLeftValue = 0;


						//Find scroll div
						var scrollDiv;
						if(data.scrollDivY){
							scrollDiv = data.scrollDivY;
						}
						else if(!data.preventScrollY){
							scrollDiv = data.orientation != "horizontal" && findScrollDiv(data._placedPlaceholder ? _placeholder : _div);
						}
						if(scrollDiv && (!_prevScrollDiv || (_prevScrollDiv && _prevScrollDiv != scrollDiv))){
							_maxScrollHeight = scrollDiv.scrollHeight - scrollDiv.offsetHeight;
							_prevScrollDiv = scrollDiv;
						}

						//Find scrollDiv is relative or contains any relative parent and store scrollTop
						var isRelativeY = false;
						if(scrollDiv && (window.getComputedStyle(scrollDiv).position == "relative" || window.getComputedStyle(scrollDiv).position == "fixed" || window.getComputedStyle(scrollDiv).position == "absolute") && (!isHelper(_div) || (isHelper(_div) && scrollDiv.contains(_div)))){
							isRelativeY = true;
							_scrollTop = scrollDiv.scrollTop;
						}
						else{
							_scrollTop = 0;
						}

						if(!data._placedPlaceholder){

							if(data.scrollDivX){
							// if(detectBrowser() == "ie" || detectBrowser() == "edge"){
							// 	_maxScrollWidth = data.scrollDivX.scrollWidth - data.scrollDivX.offsetWidth;
							// }
							// else{

								_maxScrollWidth = data.scrollDivX.scrollWidth - data.scrollDivX.clientWidth;

							// }
							}
							else{
								_maxScrollWidth = 0;
						}
						data._maxScrollWidth = _maxScrollWidth;

							//onDragStart

							if(data.onDragStart){
								onDragStart(data, event);
							}
							divOffset = isHelper(_sortableElem) ? _sortableElem._origin.getBoundingClientRect() : _sortableElem.getBoundingClientRect();

							//set containment properties
							if(data.containment){
								data.containmentDimensions = setContainment(data,_sortableElem);
							}
							else{
								data.containmentDimensions = null;
							}

							// console.log("getting called");
							var width = /*$L(_sortableElem).outerWidth() divOffset.width*/ divOffset.width;
							var height = /*$L(_sortableElem).outerHeight() divOffset.height*/ divOffset.height;
							var cellSpacing = 0;
							var parent = _sortableElem.offsetParent;


							if(data._isRelative && data.scrollDivX.contains(_div)){
								scrollLeftValue = data.scrollDivX.scrollLeft;
							}
							if(!_lyteUiUtils.isNegativeScroll() && _lyteUiUtils.getRTL() && detectBrowser() == "chrome" && data._isRelative && data.scrollDivX.contains(_div)){
								scrollLeftValue = data.scrollDivX.scrollLeft - data._maxScrollWidth;
							}
							if(parent.tagName.toLowerCase() == "table"){
								cellSpacing = parent.cellSpacing;
								if(cellSpacing == ""){
									cellSpacing = 2;
								}
							}

							while((parent.tagName.toLowerCase() == "table" || parent.tagName.toLowerCase() == "lyte-table-structure") && parent.style.position == ""){
								parent = parent.offsetParent;
							}
							var relativeParent = getRelativeParent(_div);

							if(relativeParent && parent != relativeParent){
								parent = relativeParent;
							}
							if(!height){
								height = _sortableElem.getBoundingClientRect().height;
							}
							var parentOffset = parent.getBoundingClientRect();
							//console.log(event)
							//console.log(parent)
							//console.log(_scrollTop)

							if(!data.cancelRemove){

								_div.style.top = divOffset.top - (parentOffset.top + parseInt(cellSpacing) + parseInt(_marginTop)) + _scrollTop + 'px';
							}
							//console.log(divOffset.top,_scrollTop);
							_div.style.left = divOffset.left - (parentOffset.left + parseInt(_marginLeft)) + scrollLeftValue + 'px';
							_div.style.boxSizing = "border-box";
							_div.style.zIndex = 3001;
							_div.style.width = width + "px";
							_div.style.height = height + "px";
							if(isHelper(_div)){
								_div.style.visibility = "";
							}

							if(_sortableElem.tagName.toLowerCase() == "tr" || _sortableElem.tagName.toLowerCase() == "lyte-tr"){
								fixWidth(_sortableElem);
							}

							//Create placeholder and append it to the DOM
							// _placeholder.innerHTML = "";
							$L(_placeholder).attr('id','dummy');
							// $L(_placeholder).removeClass('sortableElem');
							_placeholder.style.width = width + "px";
							_placeholder.style.height = height + "px";
							_div.classList.add('lyteSortableElem');
							_placeholder.style.padding = "0px";
							_placeholder.classList.add(data.placeholder);

							//Insert the placeholder in the DOM and make the selected element's position absolute
							_lyteUiUtils.insertBefore(isHelper(_div) ? _div._origin : _div ,_placeholder);
							_div.style.position = "absolute";
							_div.classList.add('lyteSortableDisablePE');
							data._placedPlaceholder = true;
							callPlaceholder(data, _div.parentElement);
							// if(window.getComputedStyle(_placeholder).display == "inline"){
							// 	_placeholder.style.display = "inherit";
							// }
							data._div = _div;
							data._placeholder = _placeholder;
							data._prevTop = event.clientY;
							data._prevLeft = event.clientX;

							if(data.onDrag){
								onDrag(data,event);
							}
							manageSortable.isOver(event,data);
							data._isMoved = true;
							return;
						}

						var measure1 = $L.fastdom.measure(function(){
							manageSortable.measureQueue.shift();
							if(!_sortableElem){
								return;
							}
							if(data.containment){
								data.containmentDimensions = setContainment(data,_sortableElem);
							}

							if(event.type == "mousemove"){
								_mousePosition = {
									x : event.clientX,
									y : event.clientY
								};
								// _offset = [
								// 	event.clientX - _div.getBoundingClientRect().left,
								// 	event.clientY - _div.getBoundingClientRect().top
								// ]
							}
							else if(event.type == "touchmove"){
								_mousePosition = {
									x : event.touches[0].clientX,
									y : event.touches[0].clientY
								};
							}

							var parent = _div.offsetParent;
							// while((parent.tagName.toLowerCase() == "table" || parent.tagName.toLowerCase() == "lyte-table-structure") && parent.style.position == ""){
							// 	parent = parent.offsetParent;
							// }
							var relativeParent = getRelativeParent(_div);
							if(relativeParent && parent != relativeParent){
								parent = relativeParent;
							}

							var parentOffset = parent.getBoundingClientRect();
							var leftVal;
							var topVal;
							// var scrollLeftValue = 0;
							if(data._isRelative && data.scrollDivX.contains(_div)){
								scrollLeftValue = data.scrollDivX.scrollLeft;
							}
							if(!_lyteUiUtils.isNegativeScroll() && _lyteUiUtils.getRTL() && detectBrowser() == "chrome" && data._isRelative && data.scrollDivX.contains(_div)){
								scrollLeftValue = data.scrollDivX.scrollLeft - data._maxScrollWidth;
							}
							divOffset = _div.getBoundingClientRect();

							//_sortableElem.parentElement._bcr = _sortableElem.parentElement.getBoundingClientRect();
							var scrollDivOffset = scrollDiv ? scrollDiv.getBoundingClientRect() : 0,
							droppableOffset,droppablePlace;

							//Animation Frame fired for vertical scrolling
							if(scrollDiv && (divOffset.left <= scrollDivOffset.right) && (divOffset.right >= scrollDivOffset.left)){
								_requestId1 = requestAnimationFrame(callForScrollY.bind(this,data,scrollDiv,scrollDivOffset,_maxScrollHeight,null,isRelativeY,_mousePosition,_offset,parentOffset));
								_animationFrameFired1 = true;
							}

							//Animation Frame fired for horizontal scrolling
							if(data.scrollDivX){
								scrollDivOffset = data.scrollDivX.getBoundingClientRect();
								if(divOffset.left <= scrollDivOffset.left || divOffset.right >= (scrollDivOffset.right - 3)){
									_requestId2 = requestAnimationFrame(callForScrollX.bind(this,data,scrollDivOffset,_mousePosition,_offset,parentOffset,data._isRelative));
									_animationFrameFired2 = true;
								}
							}

							var mutate1 = $L.fastdom.mutate(function(){
								manageSortable.mutateQueue.shift();
								if(!_sortableElem){
									return;
								}
								//console.log(_div.getBoundingClientRect().left,)
								leftVal = _mousePosition.x - _offset[0] - parentOffset.left - parseInt(_marginLeft) + scrollLeftValue;
								topVal = _mousePosition.y - _offset[1] - parentOffset.top - parseInt(_marginTop) + _scrollTop;
								if(data.containment){

									var limit = {
											top : data.containmentDimensions.top,
											bottom : (data.containmentDimensions.top + (data.containmentDimensions.height - divOffset.height) + _scrollTop),
											left : data.containmentDimensions.left,
											right : (data.containmentDimensions.left + (data.containmentDimensions.width - divOffset.width) + scrollLeftValue)
										};
									 //console.log(limit);
									if(data.orientation == "vertical"){
										if(topVal+parentOffset.top >= data.containmentDimensions.top && topVal+parentOffset.top <= (data.containmentDimensions.top + (data.containmentDimensions.height - divOffset.height) + _scrollTop)){
											_div.style.top = topVal + 'px';
										}
									}
									else{
										//console.log((data.containmentDimensions.left + (data.containmentDimensions.width - divOffset.width) + scrollLeftValue), 'rightBou')
										//console.log(data.containmentDimensions.left,'leftB')
										if(leftVal+parentOffset.left >= data.containmentDimensions.left && leftVal+parentOffset.left <= (data.containmentDimensions.left + (data.containmentDimensions.width - divOffset.width) + scrollLeftValue)){
											//console.log('2')
											_div.style.left = leftVal + 'px';
										}
										else{
											 //console.log("leftVal ===>", (limit.left - parentOffset.left));

											if(leftVal+parentOffset.left < limit.left){
												_div.style.left = (limit.left - parentOffset.left) + 'px';
											}
											else if(leftVal+parentOffset.left > limit.right){
												_div.style.left = (limit.right - parentOffset.left) + 'px';
											}
										}
										if(topVal+parentOffset.top >= data.containmentDimensions.top && topVal+parentOffset.top <= (data.containmentDimensions.top + (data.containmentDimensions.height - divOffset.height) + _scrollTop)){
											// console.log("calculating",topVal+parentOffset.top, "=======", (data.containmentDimensions.top + (data.containmentDimensions.height - divOffset.height)));
											_div.style.top = topVal + 'px';
										}
										else{
											// console.log("topVal ===>", topVal);
											if(topVal+parentOffset.top < limit.top){
												_div.style.top = (limit.top - parentOffset.top) + 'px';
											}
											else if(topVal+parentOffset.top > limit.bottom){
												_div.style.top = (limit.bottom - parentOffset.top) + 'px';
											}
										}
									}
								}
								else{

									if(data.orientation == "vertical"){
										_div.style.top = topVal + 'px';
									}
									else{

										_div.style.left = leftVal + 'px';
										_div.style.top = topVal + 'px';
									}
								}

								divOffset = { left : parentOffset.left + (leftVal - scrollLeftValue), top : parentOffset.top + (topVal - _scrollTop), right : parentOffset.left + (leftVal - scrollLeftValue) + divOffset.width, bottom : parentOffset.top + (topVal - _scrollTop) + divOffset.height }; /*_div.getBoundingClientRect();*/

								if(data.onMultiSelectDrag){
									onMultiSelectDrag(data, event)
								}

									//Find the below element over which the sortable element is being dragged
								var measure2 = $L.fastdom.measure(function(){
									manageSortable.measureQueue.shift();
									if(!_sortableElem){
										return;
									}
									_elemBelow = document.elementFromPoint(_mousePosition.x,_mousePosition.y);
									if(data.multiSortable) {

										if(_elemBelow) {
											var sortableClasses = data.allSortableClass;
											for(var key in sortableClasses) {
												droppablePlace = $L(_elemBelow).closest('.'+key,sortableClasses[key])[0];
												if(droppablePlace) {
													break;
												}
											}
											if(!droppablePlace && $L(_elemBelow).hasClass('sortable-parent')){
												droppablePlace = _elemBelow;
											}
										}
										else {
											droppablePlace = null;
										}
									}
									else {
										droppablePlace = _elemBelow ? _elemBelow.closest('.'+_sortableElemClass) : null;
										if(_elemBelow && $L(_elemBelow).hasClass('sortable-parent')){
											droppablePlace = _elemBelow;
											
										}
									}
									droppableOffset = droppablePlace ? droppablePlace.getBoundingClientRect() : {};

									if(!_elemBelow){
										return;
									}

									var mutate2 = $L.fastdom.mutate(function(){
										manageSortable.mutateQueue.shift();
										if(!_sortableElem){
											return;
										}
										
										if(droppablePlace && $L(droppablePlace).hasClass('sortable-parent') && droppablePlace.querySelectorAll('.'+_sortableElemClass).length === 0 && data.droppable && data.connectedWith.indexOf(droppablePlace) !== -1){
											_lyteUiUtils.appendChild(droppablePlace,_placeholder);
											callPlaceholder(data, _elemBelow, droppablePlace);
										}

										if(droppablePlace && checkDroppable(droppablePlace,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition)){
											if($L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition) && checkForIntersect(_elemBelow,_mousePosition) && checkForBetween(_elemBelow,_mousePosition,_sortableElem/*,isRelativeY,scrollDiv*/)){
												// $L(_elemBelow).append(_placeholder);
												_lyteUiUtils.appendChild(_elemBelow,_placeholder);
												callPlaceholder(data, _elemBelow, droppablePlace);
											}
											else{
												if(data.tolerance == "pointer"){
													if(data.orientation === "horizontal"){
														if(event.clientX < data._prevLeft){
															_lyteUiUtils.insertBefore(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
														else if(event.clientX > data._prevLeft){
															_lyteUiUtils.insertAfter(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
														data._prevLeft = event.clientX;
													}
													else{
														if(((data.gridView && (event.clientX < data._prevLeft)) || (event.clientY < data._prevTop)) && (droppablePlace.previousElementSibling != _placeholder /*!_placeholder.nextElementSibling || (_placeholder.nextElementSibling && _placeholder.nextElementSibling != droppablePlace)*/)){	//!placeholder.nextElementSibling to check if placeholder is the last element and the draggable element's top goes above the last element's top
															// console.log("calling for droppable ele insertBefore => ",droppablePlace.textContent);
															_lyteUiUtils.insertBefore(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
														else if(((data.gridView && (event.clientX > data._prevLeft)) || (event.clientY > data._prevTop)) && (droppablePlace.nextElementSibling != _placeholder /*!_placeholder.previousElementSibling || (_placeholder.previousElementSibling && _placeholder.previousElementSibling != droppablePlace)*/)){
															// console.log("calling for droppable ele insertAfter => ",droppablePlace.textContent);
															_lyteUiUtils.insertAfter(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
														data._prevTop = event.clientY;
													}
												}
												if(data.tolerance == "intersect"){
													if(data.orientation === "horizontal"){
														if(divOffset.left < (droppableOffset.left)){
															_lyteUiUtils.insertBefore(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
														else if(divOffset.right > (droppableOffset.right)){
															_lyteUiUtils.insertAfter(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
													}
													else{
														if(((data.gridView && (divOffset.left < droppableOffset.left)) || (divOffset.top < droppableOffset.top)) && ( droppablePlace.previousElementSibling != _placeholder /*(_placeholder.nextElementSibling && _placeholder.nextElementSibling != droppablePlace) || (_placeholder.parentElement != droppablePlace.parentElement)*/)){
															// console.log("calling for droppable ele insertBefore => ",droppablePlace.textContent);
															_lyteUiUtils.insertBefore(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
														else if(((data.gridView && (divOffset.right > droppableOffset.right)) || (divOffset.bottom > droppableOffset.bottom)) && ( droppablePlace.nextElementSibling != _placeholder /*(_placeholder.previousElementSibling && _placeholder.previousElementSibling != droppablePlace) || (_placeholder.parentElement != droppablePlace.parentElement)*/)){
															// console.log("calling for droppable ele insertAfter => ",droppablePlace.textContent);
															_lyteUiUtils.insertAfter(droppablePlace,_placeholder);
															callPlaceholder(data, _elemBelow, droppablePlace);
														}
													}
												}
											}
										}
										else if(_elemBelow && $L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition) && checkForIntersect(_elemBelow,_mousePosition) && checkForBetween(_elemBelow,_mousePosition,_sortableElem,isRelativeY,scrollDiv) && (!data.preventDropAtEnd || lastChildNotRestricted(data, _elemBelow))){
											// $L(_elemBelow).append(_placeholder);
											_lyteUiUtils.appendChild(_elemBelow,_placeholder);
											callPlaceholder(data, _elemBelow, droppablePlace);
										}
										data._belowElem = _elemBelow != null ? _elemBelow : data._belowElem;
										if(data.onDrag){
											onDrag(data,event);
										}
										manageSortable.isOver(event,data);
										data._isMoved = true;
										droppablePlace = null;
										_elemBelow = null;
									});
									manageSortable.mutateQueue.push(mutate2);
								});
								manageSortable.measureQueue.push(measure2);
							});
							manageSortable.mutateQueue.push(mutate1);
						});
						manageSortable.measureQueue.push(measure1);
					}
				}
			}

			var mouseUpEvent = function(event){
				var target = event.target;
				if(_animationFrameFired1 && _requestId1){
					cancelAnimationFrame(_requestId1);
					_animationFrameFired1 = false;
					_requestId1 = null;
				}
				if(_animationFrameFired2 && _requestId2){
					cancelAnimationFrame(_requestId2);
					_animationFrameFired2 = false;
					_requestId2 = null;
				}
				if(manageSortable.measureQueue.length){
					while(manageSortable.measureQueue.length){
						$L.fastdom.clear(manageSortable.measureQueue.shift());
					}
				}
				if(manageSortable.mutateQueue.length){
					while(manageSortable.mutateQueue.length){
						$L.fastdom.clear(manageSortable.mutateQueue.shift());
					}
				}
				//UnBinding mousedown and mouseup event
				if(event.type == "mouseup"){
					document.removeEventListener('mousemove',mouseMoveEvent);
					document.removeEventListener('mouseup',mouseUpEvent);
				}
				if(event.type == "touchend"){
					document.removeEventListener('touchmove',mouseMoveEvent, {capture : true, passive : false});
					document.removeEventListener('touchend',mouseUpEvent, true);
				}

				if(manageSortable.prevSortable){
					manageSortable.prevSortable = false;
				}
				if(manageSortable.draggedEle && $L(manageSortable.draggedEle).hasClass("sortable-element-selected") && manageSortable.draggedEle._sortableChildData._isDown){
					_sortableElem = manageSortable.draggedEle;
					_sortableElem.classList.remove('lyteSortableDisablePE');
				}
				else{
					abnormalMC(event);
					_sortableElem = null;
					manageSortable.draggedEle = null;
					manageSortable.mousedownTriggered = false;
					return;
				}
				if(_sortableElem){
					var data = _sortableElem._sortableChildData;
					var prevParent = _sortableElem.parentElement;
					if(data._isDown){

						data._isDown = false;
						_div = data._div;
						_placeholder = document.querySelectorAll('#dummy').length == 1 ? document.querySelectorAll('#dummy')[0] : data._placeholder;
						var _placeholderParent = _placeholder.parentElement;
						if(data._isMoved){
							data._isMoved = false;
							data._toIndex = checkDroppedItemPosition(data, _placeholder,Array.from(_placeholderParent.children).filter(function(ele){ return ele.tagName != "TEMPLATE" && !($L(ele).hasClass('sortable-element-selected')) }));
							var returnVal = true;

							//Callback fired
							if(data.onBeforeDrop){
								returnVal = onBeforeDrop(data,event,_placeholder,_placeholderParent);
							}

							if($L(_placeholder).hasClass(data.disabled)){
								callRevertBack(data);
								manageSortable.draggedEle = null;
								manageSortable.mousedownTriggered = false;
								return;
							}

							if(!returnVal){
								callRevertBack(data);
								if(isHelper(_div)){
									_div.remove();
								}
								if(_div.preventScrollX){
									delete _div.preventScrollX;
								}
								manageSortable.draggedEle = null;
								manageSortable.mousedownTriggered = false;
								return;
							}

							var sibling = (findPreviousElem(_placeholder) ? findPreviousElem(_placeholder) : findNextElem(_placeholder));
							var elementData = sibling && sibling._sortableChildData ? Object.assign({}, sibling._sortableChildData) : Object.assign({}, _placeholder.parentElement._sortableParentData);
							// if(_sortableElem.classList.contains('sortable-parent')){

							// 	elementData._parentElem = _sortableElem;
							// }
							// $L(_placeholder).replace(_div);
							if((data._fromIndex == data._toIndex) && (data._parentElem == _placeholderParent)){
								_placeholder.remove();
							}
							else{
								_lyteUiUtils.replaceWith(_placeholder, _div);
							}
							removeStyle(_div);

							_placeholder = null;

							_div._sortableChildData = elementData;

							//Callback fired
							if(data.onDrop){
								onDrop(data,event);

							}
							if(isHelper(_div)){
								delete _div._origin;
							}
						}
						else{
							removeStyle(_div);
							if(isHelper(_div)){
								delete _div._origin;
								_div.remove();
							}
							if(_sortableElem.tagName.toLowerCase() == 'a'){
								window.location.href = _sortableElem.href;
							}
						}
						data._div = null;
						data._placeholder = null;
						data._placedPlaceholder = false;
						data._returnElemBelow = null;
						data._belowElem = null;
						data._source = null;
						data._fromIndex = null;
					}
					$L(_sortableElem).removeClass('sortable-element-selected');
					_offset = null;
					_isDown = null;
					_isMoved = null;
					_mousePosition = null;
					_elemBelow = null;
					_droppablePlace = null;
					_marginTop = null;
					_marginLeft = null;
					_sortableElemClass = null;
					_sortableElem = null;
					_placeholder = null;
					_div = null;
					_prevScrollDiv = null;
				}

				abnormalMC(event);

				manageSortable.draggedEle = null;
				manageSortable.mousedownTriggered = false;
			}

			var abnormalMC = function(event){
				//Check for abnormal mouse clicks
				var dummies = event.target.ownerDocument.querySelectorAll('.lyteSortablePlaceholder');
				for(var i = 0; i < dummies.length; i++){
					if(dummies[i]._callee){
						var elem = dummies[i]._callee;
						_lyteUiUtils.replaceWith(dummies[i], elem);
						$L(elem).removeClass('sortable-element-selected');
						removeStyle(elem);
						if(isHelper(elem)){
							elem.remove();
						}
					}
					else{
						dummies[i].remove();
					}
				}
				var elements = event.target.ownerDocument.querySelectorAll('.sortable-element-selected');
				for(var i =0; i<elements.length; i++){
					$L(elements[i]).removeClass('sortable-element-selected');
					removeStyle(elements[i]);
					if(isHelper(elements[i])){
						elements[i].remove();
					}
				}
			};

			element.addToSortable = function(elem){
				elem._sortableChildData = element._sortableParentData;
				$L(elem).addClass("sortable-element "+element._sortableParentData.sortableElemClass);
			};

			element.getSortableClass = function(){
				return element._sortableParentData.sortableElemClass;
			};


			element.removeFromSortable = function(elem){
				delete elem._sortableChildData;
				$L(elem).removeClass("sortable-element "+element._sortableParentData.sortableElemClass);
			};
			element.addToConnectedWith = function(elem,elem_data){

				var connectedWith = element._sortableParentData.connectedWith ? element._sortableParentData.connectedWith : [];
				if(elem.length !== undefined){
					for(var elem_index = 0; elem_index < elem.length && connectedWith.indexOf(elem[elem_index]) === -1; elem_index++){
						connectedWith.push(elem[elem_index]);
					}
				}else{
					connectedWith.push(elem);
				}
				var index = connectedWith.indexOf(element);
				connectedWith.splice(index,1);
				connectedWith.push(element);
				element._sortableParentData.connectedWith = connectedWith;
				var drag_element = element.querySelector('.sortable-element-selected');
				var diff = 0;
				if( drag_element ){
					var scrollDivX = element._sortableParentData.scrollDivX;
					var child =  scrollDivX.children;
					diff=  drag_element.getBoundingClientRect().right - child[child.length - 1].getBoundingClientRect().right;
					diff = diff > 0 ? diff : 0;
					if(element._sortableParentData && scrollDivX){
						_maxScrollWidth = scrollDivX.scrollWidth - scrollDivX.clientWidth;
					}else{
						_maxScrollWidth = 0;
					}
					drag_element._sortableChildData.connectedWith = connectedWith;
					drag_element._sortableChildData._maxScrollWidth = _maxScrollWidth - diff;
					drag_element.parentElement._sortableParentData._maxScrollWidth = _maxScrollWidth - diff;
					element._sortableParentData._maxScrollWidth = _maxScrollWidth - diff;
				}

				var not_sortable = $L(elem).not('.sortable-parent');

				if(not_sortable.length){
					elem_data = elem_data ? elem_data : {};
					if(elem_data.isSameClass){
						elem_data.connectedWith = connectedWith;
						elem_data.connected = true;
					}
					elem_data.restrict = elem_data.restrict ? elem_data.restrict : data.restrict;
					elem_data.sortableElemClass = data.sortableElemClass;
					elem_data._parentElem = $L(elem)[0];

					$L(not_sortable).sortable(Object.assign({},elem_data));
				}
			};

			var callPlaceholder = function(data, _elemBelow, droppablePlace){
				if(!data.onPlaceholder || checkValidDroppable(data,_elemBelow || droppablePlace.parentElement)){
					if(_placeholder.classList.contains(data.disabled)){
						_placeholder.classList.remove(data.disabled);
					}
					_placeholder.classList.add(data.placeholder);
				}
				else{
					if(_placeholder.classList.contains(data.placeholder)){
						_placeholder.classList.remove(data.placeholder);
					}
					_placeholder.classList.add(data.disabled);
				}


				//Callback fired
				data._returnElemBelow = droppablePlace || _elemBelow;
			};

			var callForScrollX = function(data,parentOffset,_mousePosition,_offset,parent,isRelative){
				//console.log('scroll')
				if(!data._div ){
					return;
				}
				// console.log("Scroll X getting called");

				var divOffset = data._div.getBoundingClientRect();

				_scrollLeft = data.scrollDivX.scrollLeft ;
				_maxScrollWidth = data._maxScrollWidth;
				if( !_lyteUiUtils.getRTL() || (!_lyteUiUtils.isNegativeScroll() && _lyteUiUtils.getRTL() && detectBrowser() == "chrome" && !isRelative)){

					if((divOffset.right >= parentOffset.right) && (_scrollLeft < _maxScrollWidth)){

						if((_maxScrollWidth - _scrollLeft ) >= 5 ){
								data.scrollDivX.scrollLeft += 5;

							if(isRelative && data.scrollDivX.contains(data._div) ){
								data._div.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + _scrollLeft + "px";
							}

						}
						else{

							data.scrollDivX.scrollLeft += ( (_maxScrollWidth - _scrollLeft) % 5);
							if(isRelative && data.scrollDivX.contains(data._div) ){
								data._div.style.left = _mousePosition.x - _offset[0] - parent.left + ( (_maxScrollWidth - _scrollLeft) % 5) + _scrollLeft + "px";
							}
						}
					}
					else if((divOffset.left <= parentOffset.left) && (_scrollLeft > 0)){
						if(isRelative && data.scrollDivX.contains(data._div) ){
							data._div.style.left = _mousePosition.x - _offset[0] - parent.left - ((_maxScrollWidth - _scrollLeft) > 5 ? 5 : (5 - (_maxScrollWidth - _scrollLeft))) + _scrollLeft + "px";
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
				else{
					if(!_lyteUiUtils.isNegativeScroll() && detectBrowser() == "chrome" && isRelative){
						if((divOffset.right >= parentOffset.right) && (_scrollLeft < _maxScrollWidth)){
							if((_maxScrollWidth - _scrollLeft) >= 5){
								data.scrollDivX.scrollLeft += 5;
								if(isRelative && data.scrollDivX.contains(data._div)){
									data._div.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + (_scrollLeft - _maxScrollWidth) + "px";
								}
							}
							else{
								data.scrollDivX.scrollLeft += (5 - (_maxScrollWidth - _scrollLeft));
								if(isRelative && data.scrollDivX.contains(data._div)){
									data._div.style.left = _mousePosition.x - _offset[0] - parent.left + (5 - (_maxScrollWidth - _scrollLeft)) + _scrollLeft + "px";
								}
							}
						}
						else if((divOffset.left <= parentOffset.left) && (_scrollLeft > 0)){
							if(isRelative && data.scrollDivX.contains(data._div)){
								data._div.style.left = _mousePosition.x - _offset[0] - parent.left - ((_maxScrollWidth - _scrollLeft) + 5) + "px";
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
								if(isRelative && data.scrollDivX.contains(data._div)){
									data._div.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + _scrollLeft + "px";
								}
							}
							else{
								data.scrollDivX.scrollLeft += (5 - (_maxScrollWidth + _scrollLeft));
								if(isRelative && data.scrollDivX.contains(data._div)){
									data._div.style.left = _mousePosition.x - _offset[0] - parent.left + (5 - (_maxScrollWidth + _scrollLeft)) + _scrollLeft + "px";
								}
							}
						}
						else if((divOffset.left <= parentOffset.left) && (_scrollLeft > -(_maxScrollWidth))){
							if(isRelative && data.scrollDivX.contains(data._div)){
								data._div.style.left = _mousePosition.x - _offset[0] - parent.left + (_scrollLeft - 5) + "px";
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
								// 	data._div.style.left = _mousePosition.x - _offset[0] - parent.left + 5 + _scrollLeft + "px";
								// }
							}
							else{
								data.scrollDivX.scrollLeft -= _scrollLeft;
								// if(isRelative){
								// 	data._div.style.left = _mousePosition.x - _offset[0] - parent.left + (5 - (_maxScrollWidth + _scrollLeft)) + _scrollLeft + "px";
								// }
							}
						}
						else if((divOffset.left <= parentOffset.left) && (_scrollLeft < _maxScrollWidth)){
							if(isRelative && data.scrollDivX.contains(data._div)){
								data._div.style.left = _mousePosition.x - _offset[0] - parent.left + (-_scrollLeft) - 5 + "px";
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

				_requestId2 = requestAnimationFrame(callForScrollX.bind(this,data,parentOffset,_mousePosition,_offset,parent,isRelative));
			};

			var callForScrollY = function(data,scrollDiv,parentOffset,_maxScrollHeight,topNBottom,isRelativeY,_mousePosition,_offset,parent){
				$L.fastdom.measure(function(){
					if(!data._div){
						return;
					}
					// var scrollDiv = arguments[1];
					// var parentOffset = arguments[2];
					var divOffset = data._div.getBoundingClientRect();
					// var parentOffset = data._parentElem.getBoundingClientRect();
					var diff = data._placeholder.parentElement.offsetTop - scrollDiv.offsetTop + 5;
					// var _maxScrollHeight = arguments[3];
					// var topNBottom = arguments[4];
					// var isRelativeY = arguments[5];
					var scrollTop = scrollDiv.scrollTop;
					var lastchild = $L('#dummy')[0].parentElement.lastElementChild;
					
					_maxScrollHeight = scrollDiv.scrollHeight - scrollDiv.getBoundingClientRect().height;
					$L.fastdom.mutate(function(){
						if(!data._div){
							return;
						}
						
						if((divOffset.top - parseInt(data._marginTop) <= parentOffset.top + diff) && (scrollTop > 0) ){
							if(isRelativeY && scrollDiv.contains(data._div)){
								data._div.style.top = _mousePosition.y - _offset[1] - parent.top - (_maxScrollHeight - scrollTop >= 10 ? 10 : _maxScrollHeight - scrollTop) + scrollTop + "px";
							}
							scrollDiv.scrollTop -= 10;
						}
						else if((divOffset.bottom >= (parentOffset.bottom - 3)) && (scrollTop < _maxScrollHeight) && ( lastchild.getBoundingClientRect().bottom > scrollDiv.getBoundingClientRect().bottom )){
							if(_maxScrollHeight - scrollTop > 10){
								if(isRelativeY && scrollDiv.contains(data._div)){
									data._div.style.top = _mousePosition.y - _offset[1] - parent.top + 10 + scrollTop + "px";
								}
								scrollDiv.scrollTop += 10;
							}
							else{
								if(isRelativeY && scrollDiv.contains(data._div)){
									data._div.style.top = _mousePosition.y - _offset[1] - parent.top + _maxScrollHeight - scrollTop + scrollTop + "px";
								}
								scrollDiv.scrollTop += (_maxScrollHeight - scrollTop);
							}
						}
						else{
							if((scrollTop == 0) && (divOffset.top - parseInt(data._marginTop) <= parentOffset.top + diff) && !isFirstOrLastELement(data, "first")){
								appendPlaceholderAt(data, "first");
							}
							else if((scrollTop == _maxScrollHeight) && (divOffset.bottom >= (parentOffset.bottom - 3)) && !isFirstOrLastELement(data, "last")){
								appendPlaceholderAt(data, "last");
							}
							cancelAnimationFrame(_requestId1);
							_animationFrameFired1 = false;
							_requestId1 = null;
							return;
						}
						_requestId1 = requestAnimationFrame(callForScrollY.bind(this,data,scrollDiv,parentOffset,_maxScrollHeight,topNBottom,isRelativeY,_mousePosition,_offset,parent));
					});
				});
			};

			var isFirstOrLastELement = function(data, pos){
				var placeholder = data._placeholder,
					parent = placeholder.parentElement,
					children = getChildren(data,parent);
				if(pos === "first"){
					return children[0] == placeholder;
				}
				return children[children.length - 1] == placeholder;	//incase of last
			};

			var getChildren = function(data, parent){
				if(data && data.omitRestricted){
					return Array.from(parent.children).filter( function(ele) { return (ele.tagName != "TEMPLATE" && isNotRestricted(data,ele))} );
				}
				return Array.from(parent.children).filter( function(ele) { return ele.tagName != "TEMPLATE" } );
			};

			var appendPlaceholderAt = function(data, pos){
				var placeholder = data._placeholder,
					parent = placeholder.parentElement,
					children = getChildren(data,parent);
				if(data.gridView){
					return;
				}
				if(pos === "first"){
					// _lyteUiUtils.insertBefore(children[0], placeholder);
					for(var i = 0; i < children.length; i++){
						if(!data.preventDropAtStart || (isNotRestricted(data, children[i]) && !(children[i].classList.contains('sort-disabled-element')))){
							_lyteUiUtils.insertBefore(children[i], placeholder);
							break;
						}
					}
				}
				else{
					// _lyteUiUtils.insertAfter(children[children.length - 1], placeholder);
					for(var i = children.length - 1; i >= 0; i--){
						if(!data.preventDropAtEnd || (isNotRestricted(data, children[i]) && !(children[i].classList.contains('sort-disabled-element')))){
							_lyteUiUtils.insertAfter(children[i], placeholder);
							break;
						}
					}
				}
			};

			var isNotRestricted = function(data,targetElem){
				for(var i = 0; i<data.restrict.length ; i++){
					if(targetElem.matches(data.restrict[i])){
						return false;
					}
				}
				return true;
			};

			var lastChildNotRestricted = function(data, parent){
				var children = getChildren(null, parent);
				return children.length ? isNotRestricted(data, children[children.length - 1]) : true;
			};

			var checkForSortable = function(data,targetElem){
				if(!data.draggable){
					return false;
				}
				for(var i = 0; i<data.cancel.length ; i++){
					var elem = targetElem;
					while(elem.parentElement){
						if(elem.matches(data.cancel[i])){
							return false;
						}
						if($L(elem).hasClass('sortable-element')){
							break;
						}
						elem = elem.parentElement;
					}
				}
				return true;
			};

			var checkDroppedItemPosition = function(data, ele,siblings){
				if(data.omitRestricted){
					for(var y = 0; y<siblings.length; y++){
                        if(!isNotRestricted(data,siblings[y])){
                            siblings.splice(y,1);
                            --y;
                        }
                    }
				}
				for(var i = 0; i<siblings.length; i++){
					if(siblings[i].tagName != "TEMPLATE" && ele == siblings[i]){
						return i;
					}
				}
			};

			var getFromIndex = function(data){
				var element = isHelper(data._div) ? data._div._origin : data._div;
				if(data.omitRestricted){
					var siblings = Array.from(data._source.children).filter( function(ele) { return ele.tagName != "TEMPLATE" } );
					for(var y = 0; y<siblings.length; y++){
                        if(!isNotRestricted(data,siblings[y])){
                            siblings.splice(y,1);
                            --y;
                        }
                    }
                    return siblings.indexOf(element);
				}
				else{
					return Array.from(data._source.children).filter( function(ele) { return ele.tagName != "TEMPLATE" } ).indexOf(element);
				}
			}

			var getSource = function(data){
				var current = isHelper(data._div) ? data._div._origin : data._div;
				var parentElem = data._parentElem;
				if(current.classList.contains('sortable-parent') && current.parentElement.classList.contains('sortable-parent')){
					parentElem = current.parentElement;
				}
				return parentElem;
			}

			/*---------------Callbacks Start--------------*/
			var onReady = function(data){
				data.onReady(data._parentElem);
			}

			var onSelect = function(data,event){
				data._div.preventScrollX = function(prevScroll){
					data._div._sortableChildData.preventScroll = prevScroll;
					data._parentElem._sortableParentData.preventScroll = prevScroll;
				}
				var returnVal = data.onSelect(data._div, data._fromIndex, data._source,event);
				if(returnVal == undefined || returnVal == true){
					return true;
				}else{
					delete data._div.preventScrollX;
					return false;
				}
				//return ( returnVal == undefined) ? true : returnVal;
			}

			var onDragStart = function(data, event){
				data.onDragStart(data._div,data._source, event,data._div._origin);
			}

			var onDrag = function(data,event){
				var placeholder = document.querySelectorAll('#dummy').length == 1 ? document.querySelectorAll('#dummy')[0] : data._placeholder;
				data.onDrag(data._div,data._returnElemBelow,event,placeholder,data._belowElem);
			}

			var onBeforeDrop = function(data,event,placeholder){
				// var placeholder = document.querySelectorAll('#dummy').length == 1 ? document.querySelectorAll('#dummy')[0] : data._placeholder;
				var returnVal = data.onBeforeDrop(data._div,data._returnElemBelow,placeholder,data._fromIndex, data._toIndex /*checkDroppedItemPosition(data, placeholder,Array.from(placeholder.parentElement.children).filter(function(ele){ return ele.tagName != "TEMPLATE" && !($L(ele).hasClass('sortable-element-selected')) }))*/, data._source, placeholder ? placeholder.parentElement : null,event);
				return (returnVal == undefined) ? true : returnVal;
			}

			var onDrop = function(data,event){
				data.onDrop(data._div, data._div._sortableChildData._parentElem, data._returnElemBelow, data._fromIndex, data._toIndex /*checkDroppedItemPosition(data, data._div,Array.from(data._div._sortableChildData._parentElem.children).filter(function(ele){ return ele.tagName != "TEMPLATE" }))*/, data._source, event);
			}

			var onMultiSelectDrag = function(data, event){
				var placeholder = document.querySelectorAll('#dummy').length == 1 ? document.querySelectorAll('#dummy')[0] : data._placeholder;
				data.onMultiSelectDrag(data._div,event,placeholder,placeholder.parentElement);
			}
			/*---------------Callbacks End--------------*/

			var checkValidDroppable = function(data,destination){
				if(destination.id && destination.id == "dummy"){
					destination = destination.parentElement;
				}
				else{
					while(destination){
						if($L(destination).hasClass('sortable-parent')){
							break;
						}
						destination = destination.parentElement;
					}
				}
				var placeholder = document.querySelectorAll('#dummy').length == 1 ? document.querySelectorAll('#dummy')[0] : data._placeholder;
				var returnVal = data.onPlaceholder(data._div,placeholder, data._parentElem, placeholder ? placeholder.parentElement : null);
				return (returnVal == undefined) ? true : returnVal;
			}


			//Bind events to the child elements that will be sortable
			var childrens = /*data._parentElem.children*/ getChildren(data, data._parentElem);
			
			if(data.dblTouchEvent){
				var prevClick = 0;
				
				data._parentElem.__mouseDownEvent = function(event) {
					if(event.type == 'mousedown'){
							mouseDownEvent(event);
					}else{
						var date = new Date();
					  var time = date.getTime();
					  var touches = event.touches;
					  var curtouchY = event.touches[0].clientY;
					  const time_between_taps = 200; 

					  if(touches.length == 1){
					  		if(checkForSortable(data._parentElem._sortableParentData,event.target)){
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
				data._parentElem.__mouseDownEvent = mouseDownEvent;
			}
			data._parentElem.__mouseMoveEvent = mouseMoveEvent;
			data._parentElem.__mouseUpEvent = mouseUpEvent;
			data._parentElem._sortableParentData = data;
			for(var i = 0 ; i < childrens.length ; i++){
				childrens[i]._pos = i;
				if(/*childrens[i].tagName != "TEMPLATE" &&*/ isNotRestricted(data,childrens[i]) && !(childrens[i].classList.contains('sortable-element-selected'))){
					childrens[i]._sortableChildData = data;
					$L(childrens[i]).addClass("sortable-element "+data.sortableElemClass);
				}
			}
			if(data.draggable && !data._parentElem._mousedown){
				data._parentElem.addEventListener("mousedown",data._parentElem.__mouseDownEvent);
				data._parentElem.addEventListener("touchstart",data._parentElem.__mouseDownEvent, true);
				data._parentElem._mousedown = true;
			}
			// else{
			// 	if(data._parentElem._mousedown){
			// 		data._parentElem.removeEventListener("mousedown",data._parentElem.__mouseDownEvent);
			// 		data._parentElem.removeEventListener("touchstart",data._parentElem.__mouseDownEvent, true);
			// 	}
			// }




			//Check whether the arrays are connected or not and has connectedWith
			if(!data.connected && data.connectedWith.length > 0){

				data.connectedWith = manageSortable.convertToArrayOfItems(data.connectedWith,data.context);
				data.connectedWith.forEach(function(id){

					var connectedWith = data.connectedWith.concat(),
					index = connectedWith.indexOf(id);
					connectedWith.splice(index,1);
					connectedWith.push(id);
					// connectedWith.push(data._parentElem);

					if(data.multiSortable && _sortableData &&  _sortableData.connectedWith) {
						data.connectedWith = _sortableData.connectedWith;
					}
					else {
						$L(id).sortable({
							_parentElem : $L(id)[0],
							connectedWith : connectedWith,
							connected : true,
							// droppable : data.droppable,
							// draggable : data.draggable,
							// placeholder : data.placeholder,
							// disabled : data.disabled,
							// orientation : data.orientation,
							// cancel : data.cancel,
							// items : data.items,
							// cursorAt : data.cursorAt,
							restrict : data.restrict,
							// scrollDivX : data.scrollDivX,
							// omitRestricted : data.omitRestricted,
							sortableElemClass : data.sortableElemClass,
							dblTouchEvent : data.dblTouchEvent
							// clone : data.clone
						});
					}
				});
			}

			if(data.onReady && !data._parentElem.executedOnReady){
				onReady(data);
				data._parentElem.executedOnReady = true;
			}

			var setContainment = function(data,sortableElem){

				if(data.containment == "parent"){
					var dimensions = isHelper(sortableElem) ? sortableElem._origin.parentElement.getBoundingClientRect() : sortableElem.parentElement.getBoundingClientRect();
					return ({left : dimensions.left,
							right : dimensions.right,
							top : dimensions.top,
							bottom : dimensions.bottom,
							height : dimensions.height,
							width : dimensions.width,
							offsetLeft : isHelper(sortableElem) ? sortableElem._origin.parentElement.offsetLeft : sortableElem.parentElement.offsetLeft,
							offsetTop : isHelper(sortableElem) ? sortableElem._origin.parentElement.offsetTop : sortableElem.parentElement.offsetTop});
				}
				else{
					var containment = $L(data.containment).length == undefined ? null : $L(data.containment)[0];
					var dimensions = containment.getBoundingClientRect();
					return ({left : dimensions.left,
							right : dimensions.right,
							top : dimensions.top,
							bottom : dimensions.bottom,
							height : dimensions.height,
							width : dimensions.width,
							offsetLeft : containment.offsetLeft,
							offsetTop : containment.offsetTop});
				}
			};

			/*----------------------- UTILITY FUNCTIONS FOR SORTABLE ---------------------*/

			var findScrollDiv = function(elem){
				var parent = elem.parentElement;
				while(elem.parentElement){
					elem = elem.parentElement;
					if((parent.scrollHeight > elem.clientHeight) && ((window.getComputedStyle(elem).overflowY != "hidden" && window.getComputedStyle(elem).overflow != "visible") || elem.matches('.lyteScrollBar')) /*!(elem.style.overflow && elem.style.overflow == 'hidden')*/){
						return elem;
					}
				}
				return null;
			};

			var fixWidth = function(element){
				var childrens = element.children,
				width = []
				for(var i = 0; i<childrens.length; i++){
					if(childrens[i].tagName.toLowerCase() == "td" || childrens[i].tagName.toLowerCase() == "lyte-td"){
						childrens[i].__prevWidth = childrens[i].style.width;
						width[ i ] = childrens[i].__prevWidth || ( childrens[i].offsetWidth + 'px' ) ;
					}
				}
				for(var i = 0; i<childrens.length; i++){
					if(childrens[i].tagName.toLowerCase() == "td" || childrens[i].tagName.toLowerCase() == "lyte-td"){
						childrens[i].style.width = width[ i ];
					}
				}
			};

			var removefixedWidth = function(element){
				var childrens = element.children;
				for(var i = 0; i<childrens.length; i++){
					if(childrens[i].tagName.toLowerCase() == "td" || childrens[i].tagName.toLowerCase() == "lyte-td"){
						childrens[i].style.width = childrens[i].__prevWidth;
					}
				}
			};

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

			var getRelativeParent = function(element){

				while(element.parentElement){
					element = element.parentElement;
					var cs = getComputedStyle(element);
					if(cs.position == "relative" || cs.position == "absolute" ){
						return element;
					}
				}
				return null;
			};

			//Checks whether the element can be dropped or not
			var checkDroppable = function(element,parentElem,sortableElem,connectedWith,containmentDimensions,mP){
				if(element.id != "dummy"){
					var sortableParentId = sortableElem.parentElement.id;
					var droppableParentId = element.parentElement.id;
					if(containmentDimensions){
						if(mP.x < containmentDimensions.left || mP.x > containmentDimensions.right || mP.y < containmentDimensions.top || mP.y > containmentDimensions.bottom){
							return false;
						}
					}
					if(sortableElem.parentElement == element.parentElement || element.parentElement == sortableElem._sortableChildData._parentElem){
						return true;
					}
					if(((connectedWith).indexOf(element.parentElement) != -1) && element._sortableChildData.droppable){
						return true;
					}
				}
				return false;
			};

			//Checks whwther the element can be dropped or not
			var checkParentDroppable = function(element,parentElem,sortableElem,connectedWith,containmentDimensions,mP){
				var sortableParentId = sortableElem.parentElement.id;
				if(containmentDimensions){
					if(mP.x < containmentDimensions.left || mP.x > containmentDimensions.right || mP.y < containmentDimensions.top || mP.y > containmentDimensions.bottom){
						return false;
					}
				}
				if(sortableElem.parentElement == element || element == parentElem){
					return true;
				}
				if(((connectedWith).indexOf(element) != -1) && checkDroppableValue(element)){
					return true;
				}
				return false;
			};

			var checkDroppableValue = function(element){
				var childrens = element.children;
				var childElem;
				for(var v= 0; v<childrens.length; v++){
					if(childrens[v] != element.querySelector("#dummy") && childrens[v].tagName != "TEMPLATE" && $L(childrens[v]).hasClass('sortable-element')){
						childElem = childrens[v];
						break;
					}
				}
				return (childElem && childElem._sortableChildData ? childElem._sortableChildData.droppable : element._sortableParentData.droppable);
			};

			//Checks for appending the sortable elements at the end of the div
			var checkPossiblePosition = function(element,sortableElem){
				if(element.childElementCount > 0){
					var lastChild = element.lastElementChild;
					if(sortableElem.getBoundingClientRect().top > lastChild.getBoundingClientRect().bottom){
						return true
					}
				}
				else{
					return true;
				}
				return false;
			};

			var checkIfDroppable = function(parentElem,ele){
				if(ele.parentElement === parentElem && parentElem.childElementCount === 1 && (((ele.getBoundingClientRect().right > (parentElem.getBoundingClientRect().left + ele.getBoundingClientRect().width / 2)) &&
					(ele.getBoundingClientRect().right <= parentElem.getBoundingClientRect().right)) || ((ele.getBoundingClientRect().left < (parentElem.getBoundingClientRect().right - ele.getBoundingClientRect().width / 2)) &&
					(ele.getBoundingClientRect().left >= parentElem.getBoundingClientRect().left)))){
					return true;
				}
				return false;
			};

			var checkForIntersect = function(parentElem,mP){
				var cs = window.getComputedStyle(parentElem);
				var offset = parentElem.getBoundingClientRect();
				
				if(mP.x > (offset.left + parseFloat(cs.paddingLeft || 0)) && mP.x < (offset.right - parseFloat(cs.paddingRight || 0)) && mP.y > (offset.top + parseFloat(cs.paddingTop || 0)) && mP.y < (offset.bottom - parseFloat(cs.paddingBottom || 0))){
					return true;
				}
				return false;
			};

			var checkForBetween = function(parentElem,mP,div,isRelativeY,scrollDiv){
				var childrens = parentElem.children;
				var templateTags = 0;
				var childElem = [];
				for(var i = 0;i<childrens.length;i++){
					if(childrens[i].tagName != "TEMPLATE" && childrens[i].id != "dummy" && isNotRestricted(parentElem._sortableParentData,childrens[i])){
						childElem.push(childrens[i]);
					}
					else{
						templateTags++;
					}
				}
				if(templateTags == childrens.length){
					return true;
				}
				else if((childElem.length == 1 && childElem[childElem.length - 1] == div) || (childElem.length > 1 && childElem[childElem.length - 1] == div && div.getBoundingClientRect().top > (childElem[childElem.length - 2].getBoundingClientRect().bottom + (isRelativeY ? scrollDiv.scrollTop : 0)))){
					return true;
				}
				else if(div.getBoundingClientRect().top > (childElem[childElem.length - 1].getBoundingClientRect().bottom + (isRelativeY ? scrollDiv.scrollTop : 0))){
					return true;
				}
				return false;
			};

			var callRevertBack = function(data) {
				$L(data._div).removeClass("sortable-element-selected");
				removeStyle(data._div);
				data._placeholder.remove();
			};

			var removeStyle = function(element){
				element.style.position = '';
				element.style.top = '';
				element.style.left = '';
				element.style.width = '';
				element.style.height = '';
				// element.style.display = '';
				element.style.zIndex = '';
				element.style.boxSizing = '';
				$L(element).removeClass('lyteSortableElem');
				$L(element).removeClass('lyteSortableDisablePE');
				if(isHelper(element)){
					$L(element).removeClass('sortable-helper');
				}
				if(element.tagName.toLowerCase() == "tr" || element.tagName.toLowerCase() == "lyte-tr"){
					removefixedWidth(element);
				}
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

			var checkForItems = function(data,targetElem){
				if(data.items.length > 0){
					for(var i = 0 ; i<data.items.length ; i++){
						var elements = document.querySelectorAll(data.items[i]);
						for(var j = 0; j<elements.length; j++){
							if(elements[j] == targetElem){
								return true;
							}
						}
					}
				}
				else{
					return true;
				}
				return false;
			};

			var getClone = function(elem,deepCopy){
				var clone;
				if(deepCopy){
					clone = elem.cloneNode(deepCopy);
					var cloneChildren = clone.children;
					var elemChildren = elem.children;
					for(var i = 0; i<cloneChildren.length; i++){
						var childOffset = elemChildren[i].getBoundingClientRect();
						// cloneChildren[i].innerHTML = "";
						cloneChildren[i].style.width = childOffset.width + "px";
						cloneChildren[i].style.height = childOffset.height + "px";
						// cloneChildren[i].style.boxSizing = "border-box";
						cloneChildren[i].classList.add('lyteSortableDummyTr');
					}
				}
				else{
					clone = elem.cloneNode();
					clone.innerHTML = "";
					clone.style.boxSizing = "border-box";
				}
				clone._callee = elem;
				clone.classList.remove('sortable-element-selected','sortableElem');
				if(isHelper(elem)){
					clone.style.visibility = "";
				}
				return clone;
			};

			var isHelper = function(elem){
				return (elem.classList.contains('sortable-helper') || elem._isHelper);
			};

			return this;

		}

	}

})( window );

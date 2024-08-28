/*
	Optimized by reading the values first and then writting
	Date - 28/08/2018
  	1. Added method to destroy droppable.
*/

;(function( window ) {

	if(lyteDomObj){	

		//This object synchronizes the draggable elements with the droppable elements
		//It contains the current object which is being dragged in the _current attribute
		//It also contains all the droppables available in the page inside the _droppables array attribute
		lyteDomObj.prototype.managerDD = {
			init : false,
			_current : null,
			_droppables : [],
			_checkAcceptable : function(draggable,acceptables){
				if(typeof acceptables !== "string"){
					if(acceptables.length === 0){
						return true;
					}
					else{
						for(var i = 0 ; i < acceptables.length ;i++){
							if(draggable.matches(acceptables[i])){
								return true;
							}
						}
					}
				}
				return false;
			},

			_isNotRejected : function(draggable, rejectSelectors){
				if(typeof rejectSelectors !== "string"){
					if(rejectSelectors.length === 0){
						return true;
					}
					else{
						for(var i = 0 ; i < rejectSelectors.length ;i++){
							if(draggable.matches(rejectSelectors[i])){
								return false;
							}
						}
						return true;
					}
				}
				return false;
			},

			_isOverAxis : function( x, reference, size ) {
				return ( x >= reference ) && ( x < ( reference + size ) );
			},
			_checkIntersects : function(event,draggable,droppable,toleranceMode){
				var managerDD = lyteDomObj.prototype.managerDD;
				var draggableOffset = draggable.getBoundingClientRect(),
					droppableOffset = droppable.getBoundingClientRect(),
					x1 = draggableOffset.left,
					y1 = draggableOffset.top,
					x2 = x1 + draggableOffset.width,
					y2 = y1 + draggableOffset.height,
					l = droppableOffset.left,
					t = droppableOffset.top,
					r = l + droppableOffset.width,
					b = t + droppableOffset.height;

				//If draggable and droppable elements are not from same window -
				//Calculate from their dimensions w.r.t top level window.
				if(draggable.ownerDocument.defaultView != droppable.ownerDocument.defaultView){
					//For draggable
					var currentWin = draggable.ownerDocument.defaultView || draggable.ownerDocument.parentWindow;
					while(currentWin && currentWin.frameElement){
						var frameElementOffset = currentWin.frameElement.getBoundingClientRect();
						x1 = x1 + frameElementOffset.left;
						x2 = x2 + frameElementOffset.left;
						y1 = y1 + frameElementOffset.top;
						y2 = y2 + frameElementOffset.top;
						currentWin = currentWin.parent;
					}
					//For droppable
					currentWin = droppable.ownerDocument.defaultView || droppable.ownerDocument.parentWindow;
					while(currentWin && currentWin.frameElement){
						var frameElementOffset = currentWin.frameElement.getBoundingClientRect();
						l = l + frameElementOffset.left;
						r = r + frameElementOffset.left;
						t = t + frameElementOffset.top;
						b = b + frameElementOffset.top;
						currentWin = currentWin.parent;
					}
				}

				switch ( toleranceMode ) {
				case "fit":
					return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
				case "intersect":
					return ( l < x1 + ( draggableOffset.width / 2 ) && // Right Half
						x2 - ( draggableOffset.width / 2 ) < r && // Left Half
						t < y1 + ( draggableOffset.height / 2 ) && // Bottom Half
						y2 - ( draggableOffset.height / 2 ) < b ); // Top Half
				case "pointer":
					if(event.type == "mousemove" || event.type == "mouseup"){
						return managerDD._isOverAxis( event.clientY, t, droppableOffset.height ) &&
						managerDD._isOverAxis( event.clientX, l, droppableOffset.width );
					}
					if(event.type == "touchmove" || event.type == "touchend"){
						return managerDD._isOverAxis( event.changedTouches[0].clientY, t, droppableOffset.height ) &&
						managerDD._isOverAxis( event.changedTouches[0].clientX, l, droppableOffset.width );
					}
				case "touch":
					return (
						( y1 >= t && y1 <= b ) || // Top edge touching
						( y2 >= t && y2 <= b ) || // Bottom edge touching
						( y1 < t && y2 > b ) // Surrounded vertically
					) && (
						( x1 >= l && x1 <= r ) || // Left edge touching
						( x2 >= l && x2 <= r ) || // Right edge touching
						( x1 < l && x2 > r ) // Surrounded horizontally
					);
				default:
					return false;
				}
			},
			_drag : function(event){
				var managerDD = lyteDomObj.prototype.managerDD;
				var droppables = this._droppables;
				var draggable = this._current;
				for(var i=0; i< droppables.length ; i++){
					
					var data = droppables[i]._droppableData;

					//Checks if the droppable is disabled or not
					//Also checks whether the draggable can be accepted by the droppable
					//And the draggable and droppable are not same element and doesnt have parent child relationship
					if(!data.disabled && !(managerDD._isRelated(draggable, droppables[i])) && managerDD._checkAcceptable(draggable,data.accept) && managerDD._isNotRejected(draggable,data.reject)){

						//Checks if the draggable intersects the droppable
						if(managerDD._checkIntersects(event,draggable,droppables[i],data.tolerance)){
							if(!data.entered){
								var prevDroppable = draggable._draggableData.currDroppable;
								if(prevDroppable && prevDroppable != droppables[i]){
									var prevDroppableData = prevDroppable._droppableData;
									if(prevDroppableData.onLeave){
										prevDroppableData.onLeave(draggable._draggableData._element,prevDroppable);
									}
									if(prevDroppableData.hoverClass && $L(prevDroppable).hasClass(prevDroppableData.hoverClass)){
										$L(prevDroppable).removeClass(prevDroppableData.hoverClass);
									}
									if(prevDroppableData.activeClass && !$L(prevDroppable).hasClass(prevDroppableData.activeClass)){
										$L(prevDroppable).addClass(prevDroppableData.activeClass);
									}
									prevDroppableData.entered = false;
								}
								if(data.isScrollable){
									draggable._draggableData._element.addScrollDivXY(droppables[i],droppables[i]);
								}
								
								if(data.onEnter){
									data.onEnter(draggable._draggableData._element,droppables[i]);
								}
								data.entered = true;
								draggable._draggableData.currDroppable = droppables[i];
							}
							if(data.onDrag){
								if(event.type == "mousemove"){
									mousePosition = {
										x : event.clientX,
										y : event.clientY
									};
								}
								else if(event.type == "touchmove"){
									var mousePosition = {
										x : event.touches[0].clientX,
										y : event.touches[0].clientY
									};
								}
		
								data.onDrag(draggable._draggableData._element,droppables[i],event,mousePosition);
							}
							if(data.hoverClass && !$L(droppables[i]).hasClass(data.hoverClass)){
								this.removeHoverClass(droppables[i],data.hoverClass);
								if(data.activeClass && $L(droppables[i]).hasClass(data.activeClass)){
									$L(droppables[i]).removeClass(data.activeClass);
								}
								$L(droppables[i]).addClass(data.hoverClass);
								if(data.onHover){
									data.onHover(draggable._draggableData._element,droppables[i]);
								}
							}
							break;
						}
						else{
							if(data.entered){
								var prevDroppable = draggable._draggableData.currDroppable,
									prevDroppableData = prevDroppable._droppableData;
								if(prevDroppableData.onLeave){
									prevDroppableData.onLeave(draggable._draggableData._element,prevDroppable);
								}
								if(prevDroppableData.hoverClass && $L(prevDroppable).hasClass(prevDroppableData.hoverClass)){
									$L(prevDroppable).removeClass(prevDroppableData.hoverClass);
								}
								if(prevDroppableData.activeClass && !$L(prevDroppable).hasClass(prevDroppableData.activeClass)){
									$L(prevDroppable).addClass(prevDroppableData.activeClass);
								}
								prevDroppableData.entered = false;
								draggable._draggableData.currDroppable = null;
							}
						}
					}
				}
			},
			_drop : function(event){
				var managerDD = lyteDomObj.prototype.managerDD;
				var droppables = this._droppables;
				var draggable = this._current;
				for(var i=0; i< droppables.length ; i++){

					if(!(managerDD._isRelated(draggable, droppables[i]))){
						var data = droppables[i]._droppableData;
						if(data.activeClass && $L(droppables[i]).hasClass(data.activeClass)){
							$L(droppables[i]).removeClass(data.activeClass);
						}
						if(data.hoverClass && $L(droppables[i]).hasClass(data.hoverClass)){
							$L(droppables[i]).removeClass(data.hoverClass);
						}
						if(!data.disabled && managerDD._checkAcceptable(draggable,data.accept)){
							if(managerDD._checkIntersects(event,draggable,droppables[i],data.tolerance)){
								if(data.onDrop){
									data.onDrop(draggable._draggableData._element,droppables[i]);
								}
								break;
							}
						}
					}
				}
			},
			_isRestricted : function(restrict,element){
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

			_isRelated : function(draggable, droppable){
				if(draggable.isEqualNode(droppable) || draggable.contains(droppable)){
					return true;
				}
				return false;
			},
			sort : function(){
				var droppables = this._droppables,
				lastItem = droppables[droppables.length - 1],
				lastItemOffset = lastItem.getBoundingClientRect();
				for(var i = 0; i < droppables.length - 1; i++){
					var elemOffset = droppables[i].getBoundingClientRect();
					if(lastItemOffset.height < elemOffset.height || lastItemOffset.width < elemOffset.width){
						droppables.splice(droppables.indexOf(lastItem),1);
						droppables.splice(i,0,lastItem);
						return;
					}
				}
			},

			destroy : function(element){
				var managerDD = lyteDomObj.prototype.managerDD;
				var attribute = element._droppableData.attribute;
				if(!(managerDD.hasClassOrAttr(attribute,element,'droppable-element'))){
					console.info("ALERT! - U have already destroyed its droppable behaviour.");
					return;
				}
				if(managerDD._droppables.indexOf(element) !== -1){
					managerDD._droppables.splice(managerDD._droppables.indexOf(element),1);
				}
				if(element._droppableData.registerFromParent || element._droppableData.registerToParent){
					var currentWin = window;
					managerDD.deleteDroppable(element, currentWin, "up");
					managerDD.deleteDroppable(element, currentWin, "down");
				}
				if (element._droppableData) {
					element._droppableData = null;
				}
				managerDD.removeClassOrAttr(attribute,element,'droppable-element');
			},

			sortDroppables : function(droppableEle){
				var managerDD = lyteDomObj.prototype.managerDD;
				var data = droppableEle._droppableData;
				if(data.sortCallback) {
					data.sortCallback(this._droppables);
				}else{
					managerDD.sort();
				}
				
			},

			removeHoverClass : function(current,className){
				var droppables = this._droppables;
				for(var i = 0; i<droppables.length; i++){
					if(!(droppables[i].isEqualNode(current)) && droppables[i].classList.contains(className)){
						droppables[i].classList.remove(className);
					} 
				}
			},

			deleteDroppable : function(element,currentWin,direction){
				var managerDD = lyteDomObj.prototype.managerDD;
				if(direction == "up"){
					while(currentWin.parent){
						currentWin = currentWin.parent;
						if(currentWin && currentWin.lyteDomObj){
							var winManagerDD = currentWin.lyteDomObj.prototype.managerDD;
							if(winManagerDD && winManagerDD._droppables.indexOf(element) !== -1){
								winManagerDD._droppables.splice(winManagerDD._droppables.indexOf(element),1);
							}
						}
						if(currentWin.parent == currentWin.top){
							break;
						}
					}
				}
				if(direction == "down"){
					var iframes = currentWin.document.documentElement.querySelectorAll('iframe');
					if(iframes){
						for(var i = 0; i<iframes.length ; i++){
							var win = iframes[i].contentWindow;
							if(win && win.lyteDomObj){
								var winManagerDD = win.lyteDomObj.prototype.managerDD;
								if(winManagerDD && winManagerDD._droppables.indexOf(element) !== -1){
									winManagerDD._droppables.splice(winManagerDD._droppables.indexOf(element),1);
									winManagerDD.deleteDroppable(element, win, "down");
								}
							}
						}
					}
				}
			},

			setProperty : function(element, properties){
				var managerDD = lyteDomObj.prototype.managerDD;
				if(!element){
					console.error('Element whose droppable property will be updated is undefined');
					return;
				}
				if(!managerDD.hasClassOrAttr(element._droppableData.attribute,element,'droppable-element')){
					console.error('Element whose droppable property will be updated is not a droppable element');
					return;
				}
				if(managerDD.isEmpty(properties)){
					console.error('Droppable properties to be updated is not specified');
					return;
				}

				for(var prop in properties) {
				    element._droppableData[prop] = properties[prop];
				}
			},

			isEmpty : function(properties){
				if(!properties){
					return true;
				}
				for(var prop in properties) {
				    if(properties.hasOwnProperty(prop)) {
				    	return false;
				    }
				}

				return JSON.stringify(properties) === JSON.stringify({});
			},
			addClassOrAttr : function( attribute, elem, name ){
				if(attribute){
					$L(elem).attr(name,'');
				}else{
					$L(elem).addClass(name);
				}
			},
			removeClassOrAttr : function( attribute, elem, name ){
				if(attribute){
					$L(elem).removeAttr(name);
				}else{
					$L(elem).removeClass(name);
				}
			},
			hasClassOrAttr: function( attribute, elem, name ){
				if(attribute){
					return $L(elem).attr(name) !== undefined;
				}else{
					return $L(elem).hasClass(name);
				}

			}
		};


		//It initializes the droppable funcionality and stores it in the managerDD._droppables array 
		lyteDomObj.prototype.droppable = function(object, properties) {
			var managerDD = lyteDomObj.prototype.managerDD;
			if(!managerDD.init){
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
				managerDD.init = true;
			}

			if(!managerDD.init){
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
				managerDD.init = true;
			}

			if(typeof object === "string"){
				if(object === "destroy"){
					if(this.length > 1){
						var elemArray = this;
						for(var i=0; i<elemArray.length; i++){
							managerDD.destroy(elemArray[i]);
						}
					}
					else{
						managerDD.destroy(this[0]);
					}
				}
				else if(object === "option"){
					if(this.length > 1){
						var elemArray = this;
						for(var i=0; i<elemArray.length; i++){
							managerDD.setProperty(elemArray[i], properties);
						}
					}
					else{
						managerDD.setProperty(this[0], properties);
					}
				}

				else if(object === "sort"){
					var currentDroppables = managerDD._droppables;
					if(currentDroppables.length > 0){
						managerDD._droppables = [];
						managerDD._droppables.push(currentDroppables[0]);
						for(var i = 1; i < currentDroppables.length; i++){
							managerDD._droppables.push(currentDroppables[i]);
							managerDD.sortDroppables(currentDroppables[i]);
						}
					}

					var element = this[0];
					if(element._droppableData && element._droppableData.registerToParent){
						var currentWin = window,
							winManagerDD;
						while(currentWin.parent){
							currentWin = currentWin.parent;
							if(currentWin && currentWin.lyteDomObj){
								winManagerDD = currentWin.lyteDomObj.prototype.managerDD;
								if(winManagerDD){
									currentDroppables = winManagerDD._droppables;
									if(currentDroppables.length > 0){
										winManagerDD._droppables = [];
										winManagerDD._droppables.push(currentDroppables[0]);
										for(var i = 1; i < currentDroppables.length; i++){
											winManagerDD._droppables.push(currentDroppables[i]);
											winManagerDD.sortDroppables(currentDroppables[i]);
										}
									}
								}
							}
							if(currentWin.parent == currentWin.top){
								break;
							}
						}
					}
					if(element._droppableData && element._droppableData.registerFromParent){
						var currentWin = window,
							parentWindow = window, pwinManagerDD, cwinManagerDD;
						while(parentWindow.parent){
							parentWindow = parentWindow.parent;
							if(parentWindow && parentWindow.lyteDomObj){
								pwinManagerDD = parentWindow.lyteDomObj.prototype.managerDD;
								if(pwinManagerDD){
									var droppables = pwinManagerDD._droppables;
									for(var i = 0; i<droppables.length ; i++){
										if(currentWin && currentWin.lyteDomObj){
											cwinManagerDD = currentWin.lyteDomObj.prototype.managerDD;
											currentDroppables = cwinManagerDD._droppables;
											if(currentDroppables.length > 0){
												cwinManagerDD._droppables = [];
												cwinManagerDD._droppables.push(currentDroppables[0]);
												for(var i = 1; i < currentDroppables.length; i++){
													cwinManagerDD._droppables.push(currentDroppables[i]);
													cwinManagerDD.sortDroppables(currentDroppables[i]);
												}
											}
										}
									}
								}
							}
							if(parentWindow.parent == parentWindow.top){
								break;
							}
						}
					}
				}
				
				return;
			}

			var data = object ? object : {};

			if(this.length > 1){
				var elemArray = this;
				for(var i = 0; i<elemArray.length; i++){
					$L(elemArray[i]).droppable(Object.assign({},data));
				}
				return;
			}

			if(data.restrict && managerDD._isRestricted(data.restrict, this[0])){
				return;
			}

			//Parent Element
			var droppableEle;
			data._element = droppableEle = this[0];

			
			data.entered = false;
			data.activeClass = data.activeClass ? data.activeClass : false; 
			data.accept = data.accept ? data.accept : [];
			data.disabled = (data.disabled === true) ? data.disabled : false;
			data.hoverClass = data.hoverClass ? data.hoverClass : false;
			data.isScrollable = data.isScrollable ? data.isScrollable : false;
			data.tolerance = (data.tolerance === "fit" || data.tolerance === "intersect" || data.tolerance === "pointer" || data.tolerance === "touch") ? data.tolerance : "intersect";
			data.registerToParent = data.registerToParent;
			data.attribute = data.attribute ? data.attribute : false;
			data.reject = data.reject ? data.reject : [],
			droppableEle._droppableData = data;
			managerDD.addClassOrAttr(data.attribute,data._element,'droppable-element');
			if(managerDD._droppables.indexOf(droppableEle) == -1){
				// managerDD._droppables.splice(managerDD._droppables.indexOf(droppableEle),1);
				managerDD._droppables.push(droppableEle);
				if(managerDD._droppables.length > 1 && data.sortDroppables){
					managerDD.sortDroppables(droppableEle);
				}
			}
			

			//Incase of nested iframes if user wants the droppables to be available to the parent window context
			if(data.registerToParent){
				var currentWin = window,
					winManagerDD;
				while(currentWin.parent){
					currentWin = currentWin.parent;
					if(currentWin && currentWin.lyteDomObj){
						winManagerDD = currentWin.lyteDomObj.prototype.managerDD;
						if(winManagerDD){
							winManagerDD._droppables.push(droppableEle);
							if(winManagerDD._droppables.length > 1 && droppableEle._droppableData.sortDroppables){
								winManagerDD.sortDroppables(droppableEle);
							}
						}
					}
					if(currentWin.parent == currentWin.top){
						break;
					}
				}
			}

			//Incase the user wants all the droppables from its parent
			if(data.registerFromParent){
				var currentWin = window,
					parentWindow = window, pwinManagerDD, cwinManagerDD;
				while(parentWindow.parent){
					parentWindow = parentWindow.parent;
					if(parentWindow && parentWindow.lyteDomObj){
						pwinManagerDD = parentWindow.lyteDomObj.prototype.managerDD;
						if(pwinManagerDD){
							var droppables = pwinManagerDD._droppables;
							for(var i = 0; i<droppables.length ; i++){
								if(currentWin && currentWin.lyteDomObj){
									cwinManagerDD = currentWin.lyteDomObj.prototype.managerDD;
									if(cwinManagerDD._droppables.indexOf(droppables[i]) == -1){
										cwinManagerDD._droppables.push(droppables[i]);
										if(cwinManagerDD._droppables.length > 1 && droppableEle._droppableData.sortDroppables){
											cwinManagerDD.sortDroppables(droppables[i]);
										}
									}
								}
							}
						}
					}
					if(parentWindow.parent == parentWindow.top){
						break;
					}
				}
			} 

			droppableEle = null;
			if(data.onReady){
				data.onReady(this[0]);
			}

			return this;
		}

	}

})( window );

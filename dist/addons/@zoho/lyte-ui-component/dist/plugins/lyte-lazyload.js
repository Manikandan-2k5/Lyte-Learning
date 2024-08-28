;( function(){
	if( window.lyteDomObj ){
		/*	Shorthand Lists for function names used here to reduc the file size
			ibr => isBrowser
			ibo => isBot
			sio => supportsIOBS
			st => stages
			hasES => hasEmptyStage
			hasLs => hasLoadingStage
			hasErS => hasErrorStage
			hasNS => hasNativeStage
			hasSL => hadStartedLoading
			fPS => forEachPictureSource
			el => element
			els => elements
			getSrcTags => getSourceTags
			srcTgs => sourceTags
			obs => observer
			cL => cancelLoading
			hasEvH => hasEventHandlers
			addEvh => addEventHandlers
			rmvEvH => removeEventHandlers
			H => Handler
			addEvL => addEventListenersAtOnce
			sUNat => shouldUseNative
			laN => loadAllNative
			fErEls => filterErrorElements
			setSrcFn => setSourcesFunctions
		*/
		//Sets to true if it is browser
		var ibr = typeof window !== "undefined";
		//Sets to true if it is a bot
		var ibo = ibr && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
		//Sets to true if IntersectionObserver is supported
		var sio = ibr && "IntersectionObserver" in window;
		//Stores different stages values
		var st = ["loading", "loaded", "applied", "entered", "error", "native"];

		var getData = function(el, attribute) {
			return el.getAttribute("data-" + attribute);
		};
		var setData = function(el, attribute, value) {
		    var attrName = "data-" + attribute;

		    if (value === null) {
		    	el.removeAttribute(attrName);
		    	return;
		    }

		    el.setAttribute(attrName, value);
		};

		var getStage = function(el) {
		    return getData(el, "lazyload-stage");
		};
		var setStage = function(el, stage) {
		    return setData(el, "lazyload-stage", stage);
		};
		var resetStage = function(el) {
		    return setStage(el, null);
		};
		//Checks if the element has no stage value
		var hasES = function(el) {
		    return getStage(el) === null;
		};
		//Checks if the element has loading as stage value
		var hasLs = function(el) {
		    return getStage(el) === st[0];
		};
		//Checks if the element has error as stage value
		var hasErS = function(el) {
		    return getStage(el) === st[4];
		};
		//Checks if the element has native as stage value
		var hasNS = function(el) {
		    return getStage(el) === st[5];
		};
		//Checks if the element has started loading
		var hasSL = function(el) {
			return ["loading", "loaded", "applied", "error"].indexOf(getStage(el)) >= 0;
		};

		var addClass = function(el, className) {
		    if (ibr && "classList" in el) {
		    	el.classList.add(className);
		    	return;
		    }

		    el.className += (el.className ? " " : "") + className;
		};
		var removeClass = function(el, className) {
		    if (ibr && "classList" in el) {
		    	el.classList.remove(className);
		    	return;
		    }

		    el.className = el.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
		};

		//Unobserve the given element
		var unobserve = function(el, obj) {
		    if (!obj) {
		    	return;
		    }
		    var obs = obj._obs;
		    if (!obs) {
		    	return;
		    }
		    obs.unobserve(el);
		};

		//get all the source tags from the element
		var getSrcTags = function(parentTag) {
		    var srcTgs = [];

		    for (var i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
			    if (childTag.tagName === "SOURCE") {
			        srcTgs.push(childTag);
			    }
		    }

		    return srcTgs;
		};

		var setAttr = function(el, attrName, value) {
		    if (!value) {
		    	return;
		    }

		    el.setAttribute(attrName, value);
		};
		//Check if the elements already has lazyAttrs property 
		var hasLazyAttrs = function(el) {
		    return !!el.lazyAttrs;
		};
		var elKeys = ["src", "srcset", "sizes", "error"];
		//Add lazyAttrs property to the element
		var addLazyAttrs = function(el) {
		    if (hasLazyAttrs(el)) {
		    	return;
		    }

		    var attrs = {};
		    attrs[elKeys[0]] = el.getAttribute(elKeys[0]);
		    attrs[elKeys[1]] = el.getAttribute(elKeys[1]);
		    attrs[elKeys[2]] = el.getAttribute(elKeys[2]);
		    el.lazyAttrs = attrs;
		};
		//sets the element's property values with values stored in lazyAttrs
		var setLazyAttrs = function(el) {
		    if (!hasLazyAttrs(el)) {
		    	return;
		    }

		    var attrs = el.lazyAttrs;
		    setAttr(el, elKeys[0], attrs[elKeys[0]]);
		    setAttr(el, elKeys[1], attrs[elKeys[1]]);
		    setAttr(el, elKeys[2], attrs[elKeys[2]]);
		};
		//sets the image's property values with values stored in lazyAttrs
		var setImgAttrs = function(el, props) {
		    setAttr(el, elKeys[2], getData(el, props.sizes));
		    setAttr(el, elKeys[1], getData(el, props.srcset));
		    setAttr(el, elKeys[0], getData(el, props.src));
		};
		//Removes the values of image properties
		var resetImgAttrs = function(el) {
		    el.removeAttribute(elKeys[0]);
		    el.removeAttribute(elKeys[1]);
		    el.removeAttribute(elKeys[2]);
		};
		//this function iterates over the source tags present inside the picture element
		var fPS = function(el, fn) {
		    var parent = el.parentNode;

		    if (!parent || parent.tagName !== "PICTURE") {
		    	return;
		    }

		    var srcTgs = getSrcTags(parent);
		    srcTgs.forEach(fn);
		};
		//this object contains the function that should exectue for loading the elements based on its type
		var setSrcFn = {
		    IMG: function(el, props) {
			    fPS(el, function (sourceTag) {
			    	addLazyAttrs(sourceTag);
			    	setImgAttrs(sourceTag, props);
			    });
			    addLazyAttrs(el);
			    setImgAttrs(el, props);
			},
		    IFRAME: function(el, props) {
			    setAttr(el, elKeys[0], getData(el, props.src));
			},
		    VIDEO: function(el, props) {
			    var srcTgs = getSrcTags(el);
			    srcTgs.forEach(function (sourceTag) {
			    	setAttr(sourceTag, elKeys[0], getData(sourceTag, props.src));
			    });
			    setAttr(el, "poster", getData(el, props.poster));
			    setAttr(el, elKeys[0], getData(el, props.src));
			    el.load();
			}
		};

		var setSources = function(el, props) {
		    var srcFn = setSrcFn[el.tagName];

		    if (!srcFn) {
		    	return;
		    }

		    srcFn(el, props);
		};
		var manageLoading = function(el, props, obj) {
		    if(obj){
		    	obj._count.loading += 1;
		    }
		    addClass(el, props.loadingClass);
		    setStage(el, st[0]);

		    if(props.onLoading){
		    	props.onLoading(el, obj);
		    }
		};

		var hasLoadEvent = function(el) {
		    return ["IMG", "IFRAME", "VIDEO"].indexOf(el.tagName) > -1;
		};
		var checkComplete = function(props, obj) {
		    if (obj && (obj._count.loading <= 0) && (obj._count.remaining <= 0) && props.onComplete) {
		      props.onComplete(obj);
		    }
		};
		//check if has event handlers
		var hasEvH = function(el) {
		    return !!el.lazyEvtHndlrs;
		};
		//add event handlers
		var addEvH = function(el, loadfn, errorfn) {
		    if (!hasEvH(el)) {
		    	el.lazyEvtHndlrs = {};
		    }
		    var loadEventName = el.tagName === "VIDEO" ? "loadeddata" : "load";
		    el.addEventListener(loadEventName, loadfn);
		    el.lazyEvtHndlrs[loadEventName] = loadfn;
		    el.addEventListener(elKeys[3], errorfn);
		    el.lazyEvtHndlrs[elKeys[3]] = errorfn;
		};
		//remove event handlers
		var rmvEvH = function(el) {
		    if (!hasEvH(el)) {
		    	return;
		    }
		    var eventListeners = el.lazyEvtHndlrs;
		    for (var eventName in eventListeners) {
		    	var handler = eventListeners[eventName];
		    	el.removeEventListener(eventName, handler);
		    }
		    delete el.lazyEvtHndlrs;
		};
		var doneH = function(el, props, obj) {
		    delete el.lazyTempImg;
		    if(obj && obj._count){
		    	obj._count.loading -= 1;
		    	obj._count.remaining -= 1;
		    }
		    removeClass(el, props.loadingClass);

		    if (props.removeOnComplete) {
		    	unobserve(el, obj);
		    }
		};
		var loadH = function(event, el, props, obj) {
		    var goingNative = hasNS(el);
		    doneH(el, props, obj);
		    addClass(el, props.loadedClass);
		    setStage(el, st[1]);

		    if(props.afterLoading){
		    	props.afterLoading(el, obj);
		    }
		    if (!goingNative) {
		    	checkComplete(props, obj);
		    }
		};
		var errorH = function(event, el, props, obj) {
		    var goingNative = hasNS(el);
		    doneH(el, props, obj);
		    addClass(el, props.errorClass);
		    setStage(el, st[4]);

		    if(props.onError){
		    	props.onError(el, obj);
		    }
		    if (!goingNative) {
		    	checkComplete(props, obj);
		    }
		};
		//adds both success and error event listeners
		var addEvL = function(el, props, obj) {
		    var elToListenTo = el.lazyTempImg || el;

		    if (hasEvH(elToListenTo)) {
		    	// This happens when loading is retried twice
		    	return;
		    }

		    var loadfn = function(event) {
		    	loadH(event, el, props, obj);
		    	rmvEvH(elToListenTo);
		    };
		    var errorfn = function(event) {
		    	errorH(event, el, props, obj);
		    	rmvEvH(elToListenTo);
		    };

		    addEvH(elToListenTo, loadfn, errorfn);
		};

		var load = function(el, props, obj) {
		    if (hasLoadEvent(el)) {
		    	addEvL(el, props, obj);
			    setSources(el, props);
			    manageLoading(el, props, obj);
		    } else {
		    	el.lazyTempImg = document.createElement("IMG");
			    addEvL(el, props, obj);

			    var bg1xValue = getData(el, props.bg);
			    var bgHiDpiValue = getData(el, props.hidpi);
			    var bgDataValue = (ibr && window.devicePixelRatio > 1 && bgHiDpiValue) ? bgHiDpiValue : bg1xValue;
			    
			    if (bgDataValue) {
			    	el.style.backgroundImage = "url(\"".concat(bgDataValue, "\")");
				    el.lazyTempImg.setAttribute(elKeys[0], bgDataValue);
				    manageLoading(el, props, obj);
			    }
			    
			    bg1xValue = getData(el, props.bgMulti);
			    bgHiDpiValue = getData(el, props.bgMultiHidpi);
			    bgDataValue = (ibr && window.devicePixelRatio > 1 && bgHiDpiValue) ? bgHiDpiValue : bg1xValue;

			    if (bgDataValue) {
			    	el.style.backgroundImage = bgDataValue;
			    	addClass(el, props.appliedClass);
				    setStage(el, st[2]);

				    if (props.removeOnComplete) {
				    	// Unobserve now because we can't do it on load
				    	unobserve(el, props);
				    }

				    if(props.afterApply){
				    	props.afterApply(el, obj);
				    }
			    }
			    //For elements which dont have load events like div, span
			    //enteredClass will be added in browsers that dont support IntersectionObserver
			    else{
			    	if(!(el.classList.contains(props.enteredClass))){
			    		// console.log("ELEMENTS WITHOUT LOAD EVENTS");
			    		addClass(el, props.enteredClass);
			    	}
			    }
		  	}
		};

		//cancel the loading of elements
		var cL = function(el, entry, props, obj) {
		    if (!props.cancelOnExit) {
		    	return;
		    }
		    if (!hasLs(el)) {
		    	return;
		    }
		    if (el.tagName !== "IMG") {
		    	return; //Works only on images
		    }

		    rmvEvH(el);
		    fPS(el, function (sourceTag) {
		    	resetImgAttrs(sourceTag);
		    	setLazyAttrs(sourceTag);
		    });
		    resetImgAttrs(el);
		    setLazyAttrs(el);
		    removeClass(el, props.loadingClass);
		    if(obj && obj._count){
		    	obj._count.loading -= 1;
		    }
		    resetStage(el);

		    if(props.onCancel){
		    	props.onCancel(el, entry, obj);
		    }
		};

		var onEnter = function(el, entry, props, obj) {
		    setStage(el, st[3]);
		    addClass(el, props.enteredClass);
		    removeClass(el, props.exitedClass);
		    if (props.removeOnEnter) {
		    	unobserve(el, obj);
		    }

		    if(props.onEnter){
		    	props.onEnter(el, entry, obj);
		    }
		    if (hasSL(el)) {
		    	return; //Prevent loading it again
		    }
		    load(el, props, obj);
		};
		var onExit = function(el, entry, props, obj) {
		    if (hasES(el)) {
		    	return; //Ignore the first pass, at landing
		    }
		    addClass(el, props.exitedClass);
		    cL(el, entry, props, obj);

		    if(props.onExit){
		    	props.onExit(el, entry, obj);
		    }
		};
		//check for usage of native lazyloading
		var sUNat = function(props) {
		    return props.useNative && "loading" in HTMLImageElement.prototype;
		};
		//load all elements using native lazyloading
		var laN = function(els, props, obj) {
		    els.forEach(function (el) {
		    	if (["IMG", "IFRAME"].indexOf(el.tagName) === -1) {
		        	return;
		    	}

		    	el.setAttribute("loading", "lazy");
		    	addEvL(el, props, obj);
			    setSources(el, props);
			    setStage(el, st[5]);
		    });
		    if(obj && obj._count){
		    	obj._count.remaining = 0;
		    }
		};
		// Initialize and set the observer and other properties
		var initialize = function(props, obj) {
			obj._count = {'loading' : 0};
		    if (!sio || sUNat(props)) {
		    	return;
		    }
		    var obsSets = {
		    	root: props.container === document ? null : props.container,
		    	rootMargin: props.thresholds || props.threshold + "px"
		    };
		    obj._obs = new IntersectionObserver(function (entries) {
		    	entries.forEach(function (entry) {
			    	if(entry.isIntersecting || entry.intersectionRatio > 0) {
			    		return onEnter(entry.target, entry, props, obj)
			    	} else {
			    		return onExit(entry.target, entry, props, obj);
			    	}
			    });
		    }, obsSets);
		};

		var getAllElements = function(props) {
		    return props.container.querySelectorAll(props.selector);
		};

		//filter error elements
		var fErEls = function(els) {
		    return Array.from(els).filter(hasErS);
		};
		var getElementsToLoad = function(els, props) {
			if(els){
				return Array.from(els).filter(hasES);
			}
			return Array.from(getAllElements(props)).filter(hasES);
		};

		var LyteLazyload = function(userProps, els) {
			var data = userProps ? userProps : {};

			data.selector = data.selector ? data.selector : ".lyteLazyload";
		    data.container = data.container ? $L(data.container)[0] : (ibo || ibr ? document : null);
		    data.threshold = data.threshold ? data.threshold : 300;
		    data.thresholds = data.thresholds ? data.thresholds : null;
		    data.src = data.src ? data.src : "src";
		    data.srcset = data.srcset ? data.srcset : "srcset";
		    data.sizes = data.sizes ? data.sizes : "sizes";
		    data.bg = data.bg ? data.bg : "bg";
		    data.hidpi = data.hidpi ? data.hidpi : "bg-hidpi";
		    data.bgMulti = data.bgMulti ? data.bgMulti : "bg-multi";
		    data.bgMultiHidpi = data.bgMultiHidpi ? data.bgMultiHidpi : "bg-multi-hidpi";
		    data.poster = data.poster ? data.poster : "poster";
		    data.appliedClass = data.appliedClass ? data.appliedClass : "lyteLazyApplied";
		    data.loadingClass = data.loadingClass ? data.loadingClass : "lyteLazyLoading";
		    data.loadedClass = data.loadedClass ? data.loadedClass : "lyteLazyLoaded";
		    data.errorClass = data.errorClass ? data.errorClass : "lyteLazyError";
		    data.enteredClass = data.enteredClass ? data.enteredClass : "lyteLazyEntered";
		    data.exitedClass = data.exitedClass ? data.exitedClass : "lyteLazyExited";
		    data.removeOnComplete = (data.removeOnComplete === undefined) ? true : data.removeOnComplete;
		    data.removeOnEnter = (data.removeOnEnter === true) ? data.removeOnEnter : false;
		    data.cancelOnExit = (data.cancelOnExit === undefined) ? true : data.cancelOnExit;
		    // data.onEnter = data.onEnter ? data.onEnter : null,
		    // data.onExit = data.onExit ? data.onExit : null,
		    // data.afterApply = data.afterApply ? data.afterApply : null,
		    // data.onLoading = data.onLoading ? data.onLoading : null,
		    // data.afterLoading = data.afterLoading ? data.afterLoading : null,
		    // data.onError = data.onError ? data.onError : null,
		    // data.onComplete = data.onComplete ? data.onComplete : null,
		    // data.onCancel = data.onCancel ? data.onCancel : null,
		    data.useNative = (data.useNative === true)? data.useNative : false;

		    this._props = data;
		    initialize(data, this);
		    if (ibr) {
		    	window.addEventListener("online", function () {
			    	// retryLazyLoad(props, this);
			    	var errorElements = fErEls(getAllElements(data));
				    errorElements.forEach(function (el) {
				    	removeClass(el, data.errorClass);
				    	resetStage(el);
				    });
				    this.update();
			    }.bind(this));
		    }
		    this.update(els);
		};

		LyteLazyload.prototype = {
		    update: function(els) {
		    	var props = this._props;
		    	var elsToLoad = getElementsToLoad(els, props);
		    	this._count.remaining = elsToLoad.length;

		    	if (ibo || !sio) {
		        	this.loadAll(elsToLoad);
		        	return;
		    	}

		    	if (sUNat(props)) {
		        	laN(elsToLoad, props, this);
		        	return;
		    	}

		    	var obs = this._obs;
		    	obs.disconnect();
		    	elsToLoad.forEach(function (el) {
			    	obs.observe(el);
				});
		    },
		    destroy: function() {
		    	// Observer
		    	if (this._obs) {
		        	this._obs.disconnect();
		    	} 

		    	// Clean custom elKeys from els
		    	getAllElements(this._props).forEach(function (el) {
		        	delete el.lazyAttrs;
		    	});

		    	// Delete all internal props
		    	delete this._obs;
		    	delete this._props;
		    	delete this._count;
		    },
		    loadAll: function(els) {
		      var _this = this;

		      var props = this._props;
		      var elsToLoad = getElementsToLoad(els, props);
		      elsToLoad.forEach(function (el) {
		        unobserve(el, _this);
		        load(el, props, _this);
		      });
		    }
		};

		// LyteLazyload.load = function (el, userProps) {
		//     var props = getAllProperties(userProps);
		//     // var props = getExtendedSettings(userProps);
		//     load(el, props);
		// };

		// LyteLazyload.resetStage = function (el) {
		//     resetStage(el);
		// };

		$L.lazyload = function(props, els, misc){
			if(typeof props === "string"){
				if(els){
					if(props === "destroy"){
						if(Array.isArray(els)){
							els.forEach(function(obj){
								if(obj instanceof LyteLazyload){
									obj.destroy();
								}
							})
						}
						else if(els instanceof LyteLazyload){
							els.destroy();
						}
					}
					else if(props === "update"){
						if(Array.isArray(els)){
							els.forEach(function(obj){
								if(obj instanceof LyteLazyload){
									obj.update(misc);
								}
							})
						}
						else if(els instanceof LyteLazyload){
							els.update(misc);
						}
					}
					else if(props === "loadAll"){
						if(Array.isArray(els)){
							els.forEach(function(obj){
								if(obj instanceof LyteLazyload){
									obj.loadAll(misc);
								}
							})
						}
						else if(els instanceof LyteLazyload){
							els.loadAll(misc);
						}
					}
				}
				return;
			}
			return new LyteLazyload(props, els);
		};

		$L.lazyload.LyteLazyload = LyteLazyload;
	}
} )( window );

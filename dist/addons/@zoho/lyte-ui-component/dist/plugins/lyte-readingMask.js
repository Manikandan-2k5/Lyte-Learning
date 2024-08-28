(function () {
    if (lyteDomObj) {
        lyteDomObj.prototype.readingMask = function (params) {
            var element = this[0];
            // setting the variables required on the element once
            if (!element.elementBCR && !element.once && !element.mask && !element.freeze &&
                !element.tabPressed && !element.maskStyle && !element.freezeStyle
                && !element.activeElementBCR && !element.activeElement && !element.maskBCR && !element.activeElemChange) { 
                element.elementBCR = element.getBoundingClientRect();
                element.once = true;
                element.mask = document.createElement('DIV');
                element.freezeLayer = document.createElement('DIV');
                element.tabPressed = false;
                element.maskStyle = element.mask.style;
                element.freezeStyle = element.freezeLayer.style;
                element.activeElement;
                element.activeElementBCR;
                element.cursorX;
                element.cursorY;
                element.maskBCR;
                element.activeElemChange = function () { };
                if (params && params.activeElemChange) { 
                    element.activeElemChange = params.activeElemChange;
                }
                
            }
            //function when tab key is pressed to focus the active element
            if (!element.tabKeyUp) { 
                element.tabKeyUp = function (e) {
                    if (e.key === "Tab") {
                        element.tabPressed = true;
                        var elemHeight, elemWidth, elemTop, elemLeft;

                        element.activeElement = document.activeElement;
                        element.activeElementBCR = element.activeElement.getBoundingClientRect();
                        element.maskStyle.display = "block";
                        element.freezeStyle.display = "block";

                        setElemDim();
                        setMaskDim();
                        element.activeElemChange();
                        document.addEventListener('scroll', element.scrollFn)
                    }
                    else if (e.key === "Escape") {
                        element.tabPressed = false;
                        element.maskStyle.width = maskWidth;
                        element.maskStyle.height = maskHeight;
                        element.maskStyle.top = (Math.min(element.elementBCR.bottom - element.maskBCR.height, Math.max(element.elementBCR.top, element.cursorY - (element.maskBCR.height / 2)))) - 5 + "px";
                        element.maskStyle.left = (Math.min(element.elementBCR.right - element.maskBCR.width, Math.max(element.elementBCR.left, element.cursorX - (element.maskBCR.width / 2)))) - 5 + "px";
                    }
                  // getting the dimensions of the element that is the active element
                  function setElemDim() {
                      elemHeight = element.activeElementBCR.height;
                      elemWidth = element.activeElementBCR.width;
                      elemTop = element.activeElementBCR.top;
                      elemLeft = element.activeElementBCR.left;
                  }
                  // setting the elem dim to the masking layer
                  function setMaskDim() {
                      element.maskStyle.width = elemWidth + "px";
                      element.maskStyle.height = elemHeight + "px";
                      element.maskStyle.top = elemTop - 5 + "px";
                      element.maskStyle.left = elemLeft - 5 + "px";
                  }
            }
            }
            // function to scroll the mask when an element is focussed
            if (!element.scrollFn) {
                element.scrollFn = function (e) {
                    if (element.tabPressed) {
                        element.activeElementBCR = element.activeElement.getBoundingClientRect();
                        element.maskStyle.top = element.activeElementBCR.top - 5 + "px";
                        element.maskStyle.left = element.activeElementBCR.left - 5 + "px";
                    }
                }
            }
            // function to display the freeze and mask layers on mouseover
            if (!element.maskOver) {
                element.maskOver = function (e) {
                    if (element.once) { 
                        element.maskStyle.display = "block";
                        element.freezeStyle.display = "block"
                        element.elementBCR = element.getBoundingClientRect();
                        element.once = false;
                    }
                }
            }
            // function to move the mask layer with mousemove
            if (!element.maskMove) { 
                element.maskMove = function (e) {
                    element.tabPressed = false;
                    element.cursorX = e.clientX;
                    element.cursorY = e.clientY;
                    element.maskStyle.width = maskWidth;
                    element.maskStyle.height = maskHeight;
                    //making the mask layer to stay inside the parent element
                    //positioning where the mask top should be:
                    element.maskBCR = element.mask.getBoundingClientRect();
                    element.maskStyle.top = (Math.min(element.elementBCR.bottom - element.maskBCR.height, Math.max(element.elementBCR.top, element.cursorY - (element.maskBCR.height / 2)))) - 5 + "px";
                    //Math.max(element.elementBCR.top,  element.cursorY - (maskHeight / 2)) =>  element.cursorY - (maskHeight / 2) -> the center of the mask at cursor (or) element.elementBCR.top -> the top of the parent element :: getting maximum of these two values 
                    //Math.min(element.elementBCR.bottom - maskHeight, Math.max("..") => element.elementBCR.bottom - maskHeight -> parentbottom - maskheight places the mask at the base of the parent elem :: getting minimum of this and max value 
                    element.maskStyle.left = (Math.min(element.elementBCR.right - element.maskBCR.width, Math.max(element.elementBCR.left, element.cursorX - (element.maskBCR.width / 2)))) - 5 + "px";
                    //same kind of calc goes for mask left calculation.
                }
            }
            // function to hide the mask and freeze layer on mouse leave
            if (!element.maskLeave) { 
                element.maskLeave = function (e) {
                    element.once = true;
                    element.maskStyle.display = "none";
                    element.freezeStyle.display = "none";
                }
            }
                // functionalites to create and render the reading mask
            if (params !== "destroy") {
                // appending the mask and freeze layers to the DOM
                function createMaskandFreeze() { 
                    $L('body')[0].appendChild(element.freezeLayer);
                    $L(element.freezeLayer)[0].appendChild(element.mask);
                }
                // setting the initial width and height to the mask layer
                function setInitialMaskDim(params){
                        if (params && params.maskWidth) {
                            if (typeof params.maskWidth === "number") {
                                maskWidth = params.maskWidth + "px";
                            }
                            else { maskWidth = params.maskWidth; }
                        } else { maskWidth = "500px"; }

                        if (params && params.maskHeight) {
                            if (typeof params.maskHeight === "number") {
                                maskHeight = params.maskHeight + "px";
                            }
                            else { maskHeight = params.maskHeight; }
                        } else { maskHeight = "100px"; }

                        if (params && params.freezeLayerColor) {
                            freezeLayerColor = params.freezeLayerColor;
                        } else { freezeLayerColor = "black" }

                        if (params && params.freezeLayerOpacity) {
                            freezeLayerOpacity = params.freezeLayerOpacity;
                        } else { freezeLayerOpacity = "0.5" }
                }
                // setting styling and attributes for masking layer
                function setMaskAttributes() { 
                    element.mask.id = "maskarea";
                    element.maskStyle.position = "absolute";
                    element.maskStyle.zIndex = 10000;
                    element.maskStyle.display = "none";
                    element.maskStyle.padding = "5px";
                    element.maskStyle.backgroundColor = "gray";
                    element.maskStyle.pointerEvents = "none";
                }
    
                // setting styling and attributes for freeze layer
                function setFreezeLayerAttributes() { 
                    element.freezeLayer.id = "freeze";
                    element.freezeStyle.position = "fixed";
                    element.freezeStyle.width = "100%";
                    element.freezeStyle.height = "100%";
                    element.freezeStyle.zIndex = 9999;
                    element.freezeStyle.backgroundColor = freezeLayerColor;
                    element.freezeStyle.top = "0";
                    element.freezeStyle.left = "0";
                    element.freezeStyle.display = "none";
                    element.freezeStyle.opacity = freezeLayerOpacity;
                    element.freezeStyle.pointerEvents = "none"
                    element.freezeStyle.mixBlendMode = "hard-light";
                }
                createMaskandFreeze();
                setInitialMaskDim(params);
                setMaskAttributes();
                setFreezeLayerAttributes();
                
                // on entering the element, the mask and the freeze layers are displayed
                $L(element).mouseover(element.maskOver);
                // moving the mask layer along with the mouse move
                $L(element).mousemove(element.maskMove);
                // on leaving the element, the mask and the freeze layers are disappeared
                $L(element).mouseleave(element.maskLeave);
                // listening tab keypress
                $L('body').keyup(element.tabKeyUp);
            }
                // destroy functionalities to remove all eventlisteners and layers
            else if (params === 'destroy') { 
                $L(element).off('mouseenter', element.maskOver);
                $L(element).off('mousemove', element.maskMove);
                $L(element).off('mouseleave', element.maskLeave);
                $L('body').off('keyup', element.tabKeyUp);
                document.removeEventListener('scroll', element.scrollFn);
                maskarea.remove();
                freeze.remove();
                element.mask = element.freezeLayer = element.maskStyle =
                element.freezeStyle = element.elementBCR = element.once =
                element.tabPressed = element.activeElementBCR = element.activeElement =
                element.maskOver = element.maskLeave = element.maskMove = element.activeElemChange =
                element.tabKeyUp = element.cursorX = element.cursorY = element.maskBCR =
                element = null;
            }
      };
    }
})();
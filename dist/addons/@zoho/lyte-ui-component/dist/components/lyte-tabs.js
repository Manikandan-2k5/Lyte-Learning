/**
 * Renders a tabs component
 * @component lyte-tabs
 * @version 1.0.0
 * @utility addTab,deleteTab,openTab,enableTab,disableTab,addCloseIcon
 * @methods onBeforeOpen,onOpen,onBeforeDelete,onDelete,onBeforeMenuOpen,onMenuOpen,onBeforeMenuCLose,onMenuClose,onMenuClick,onBeforeMenuRender,onAfterMenuRender
 */

Lyte.Component.register("lyte-tabs", {
_template:"<template tag-name=\"lyte-tabs\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"tabYield\"></lyte-yield> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropYield","ltPropHover","ltPropActiveClass","ltPropPosition","ltPropCloseIcon","prevTarget","ltPropHeight","ltPropType","ltPropMaxWidth","ltPropTabStyle","ltPropMenuWrapperClass","ltPropCurrentTab","ltPropFireOnInit","menuLabels"],

    init: function () {
        //aria attribute
        

        
        this.$node.addTab = function (newTab) {
            this.component.constructTabs(this, newTab);
            this.component.collapseHeader(true);
        };
        this.$node.deleteTab = function (tabId) {
            this.component.deleteTabContent(tabId, null);
        };
        this.$node.openTab = function (tabId) {
            this.component.openTabContent(tabId, null);
        };
        this.$node.enableTab = function (tabId) {
            this.component.enableTab(tabId);
        };
        this.$node.disableTab = function (tabId) {
            this.component.disableTab(tabId);
        };
        this.$node.addCloseIcon = function () {
            this.component.checkCloseIcon();
        };
        this.$node.resizeTab = function(){
            this.component.collapseHeader(true);
            this.component.checkHeightOnResize();   
        }
        
    },

    data: function () {
        return {

          /**
             * @experimental ltPropYield
             */
          "ltPropYield": Lyte.attr("boolean", { "default": true }),

          /**
           * @componentProperty {string} ltPropHover
           * @version 1.0.0
           * @default lyteTabHover 
           */
          "ltPropHover": Lyte.attr("string", { "default": _lyteUiUtils.resolveDefaultValue( 'lyte-tabs', 'hover', 'lyteTabHover' ) }),

          /**
           * @componentProperty {string} ltPropActiveClass
           * @version 1.0.0
           * @default lyteTabActive
           */
          "ltPropActiveClass": Lyte.attr("string", { "default": _lyteUiUtils.resolveDefaultValue( 'lyte-tabs', 'activeClass', 'lyteTabActive' ) }),
          /**
           * @typedef {object} position
           * @property {top|bottom|left|right} pos
           * @property {top|bottom|left|right} align
           */
          /**
           * @componentProperty {object} ltPropPosition
           * @version 1.0.0
           * @default { "pos":"top","align":"left" }
           */
          "ltPropPosition": Lyte.attr("object", { "default":  { 'pos': 'top', 'align': 'left' } }),

          /**
           * @componentProperty {boolean} ltPropCloseIcon
           * @version 1.0.0
           * @default false
           * 
           */
          "ltPropCloseIcon": Lyte.attr("boolean", { "default": false }),
          "prevTarget": Lyte.attr("object", { "default": null }),

          /**
           * @componentProperty {string} ltPropHeight
           * @version 1.0.0
           * @default 400px
           * @suffix px,pt,cm,mm,vh,vm,em
           */
          "ltPropHeight": Lyte.attr("string", { "default": _lyteUiUtils.resolveDefaultValue( 'lyte-tabs', 'height', "400px") }),

          /**
           * @componentProperty {string} ltPropType
           * @version 1.0.0
           * @options collapse
           */
          "ltPropType": Lyte.attr("string"), //options - collapse

          /**
           * @componentProperty {string} ltPropMaxWidth
           * @version 1.0.0
           * @default 90%
           * @suffix px,pt,cm,mm,vh,vm,em,%
           */
          "ltPropMaxWidth": Lyte.attr("string", { "default": _lyteUiUtils.resolveDefaultValue( 'lyte-tabs', 'maxWidth', "90%") }),

          /**
           * @componentProperty {string} ltPropTabStyle
           * @version 2.2.7
           * @options nested
           */
          "ltPropTabStyle": Lyte.attr("string"),     //nested

          /**
           * @componentProperty {string} ltPropMenuWrapperClass
           * @version 2.2.8
           */
          "ltPropMenuWrapperClass": Lyte.attr("string"),
          /**
           * @typedef {object} currentTab 
           * @property {string} index
           * @property {string} name
           */
          /**
           * @componentProperty {currentTab} ltPropCurrentTab
           * @version 3.6.0
           */
          "ltPropCurrentTab": Lyte.attr("object"),
          "ltPropFireOnInit": Lyte.attr('boolean',{"default": true }),
          "menuLabels": Lyte.attr("array", { "default": [] })
        }
    },

    didConnect: function () {
        $L(this.$node).attr('role','tabs');
        $L('LYTE-TAB-HEAD').attr('role','tablist');
        this.initialFunc(true);
    },

    didDestroy: function () {
        if (this.$node.checkTabs) {
            clearTimeout(this.$node.checkTabs);
            this.$node.checkTabs = false;
        }
    },

    /**
     * The method is going to perform the computations after the tabs component is rendered
     * @param {boolean} onRender - boolean value determines if afterRender method will be triggered or not
     *
     */
    initialFunc: function (onRender) {
        
        var _this = this;
        //Checking whether the lyte-tabs is having any content or not by counting its child element for avoiding unnecessary error
        if (this.$node.childElementCount > 1 || this.$node.children[0].tagName === "LYTE-TAB") {

            //Checking the format provided by user for lyte-tabs
            /* **-- NOT REQUIRED NOW --**   --   If the format is Format 2 then convert it to format 1 
            if(this.$node.firstElementChild.tagName === "LYTE-TAB"){
                var node = this.$node.cloneNode(true);
                this.$node.innerHTML = "";
                this.$node.append(document.createElement('lyte-tab-head'));
                this.$node.append(document.createElement('lyte-tab-body'));
                var childNodes = node.querySelectorAll('lyte-tab');
                for(var v=0; v<childNodes.length ; v++){
                    this.constructTabs(this.$node,childNodes[v]);
                }
            }
            **-- NOT REQUIRED NOW --** */
            
            this.checkTabStyle();
            this.$node.style.height = this.getData('ltPropHeight');
            var head = this.$node.querySelector('lyte-tab-head');
            head.classList.add('lyteTabNav');
            if (this.getData('ltPropType') == "collapse") {
                head.classList.add('lyteTabOverflowV');
            }
            var position = this.getData("ltPropPosition");
            var labels = this.getHeader(head.querySelectorAll('lyte-tab-title')); /*this.getHeader(head.children);*/
            // var contents = $L('lyte-tab-content',this.$node.querySelector('lyte-tab-body'));
            var contents = this.getContent( $L('lyte-tab-content',this.$node.querySelector('lyte-tab-body')) );
            var active = this.getData('ltPropActiveClass');
            var pos;
            this.setPosition(position);
            // if(this.getData('ltPropCloseIcon')){
            //     this.createCloseIcon(head.querySelectorAll('lyte-tab-title'));
            // }
            this.checkCloseIcon(head);

            var clickFn = function (event) { this.showTab(event) };
            var mouseoverFn = function (event) { this.mouseOver(event) };
            var mouseoutFn = function (event) { this.mouseOut(event) };
            var keydownFn = function (event) { this.keydown(event) }.bind(this);
            //Binds the events to tab-head
            var _this = this;
            head.addEventListener('click', clickFn.bind(this), true);
            head.addEventListener('mouseover', mouseoverFn.bind(this), true);
            head.addEventListener('mouseout', mouseoutFn.bind(this), true);

            this.$node.addEventListener('focusin',function(event){
                _this.$node.querySelector('lyte-tab-head').addEventListener('keydown', keydownFn, true);
            });
            this.$node.addEventListener('focusout',function(event){
                _this.$node.querySelector('lyte-tab-head').removeEventListener('keydown',keydownFn,true);
            });
            //To open a tab content
            for (var i = 0; i < labels.length; i++) {
                
                if (labels[i].classList.contains(active)) {
                    $L(labels[i]).attr('tabindex',0);
                    $L(labels[i]).attr('aria-selected','true');
                    pos = i;
                }
            }
            for (var i = 0; i < contents.length; i++) {
                
                if (pos && (pos === i || labels[pos].getAttribute('lt-prop-id') === contents[i].id)) {
                    this.executeOnBeforeOpen(labels[pos], labels[pos].getAttribute('lt-prop-id'), null, null);
                    contents[i].classList.add('lyteTabShow');
                    this.setData('ltPropCurrentTab', { 'index': pos, 'name': labels[pos].textContent.trim() });
                    this.executeOnOpen(labels[pos], labels[pos].getAttribute('lt-prop-id'), null, onRender);
                }
                else {
                    //$L(label[i]).attr('aria-selected','true');
                    contents[i].classList.add('lyteTabHide');
                    $L(labels[i]).attr('aria-selected',false);
                }
                $L(labels[i]).attr('aria-controls',contents[i].id);
            }
            if (!pos) {
                pos = 0;
                this.executeOnBeforeOpen(labels[0], labels[0].getAttribute('lt-prop-id'), null, null,onRender);
                labels[0].classList.add(active);
                $L(labels[0]).attr('tabindex',0);
                $L(labels[0]).attr('aria-selected','true');
                contents[0].classList.remove('lyteTabHide');
                //contents[0].setAttribute('hidden', false);
                contents[0].classList.add('lyteTabShow');
                this.setData('ltPropCurrentTab', { 'index': pos, 'name': labels[pos].textContent.trim() });
                this.executeOnOpen(labels[0], labels[0].getAttribute('lt-prop-id'), null, onRender);
            }
            this.setData('prevTarget', labels[pos]);


            //dispatch Event
            
            $L.fastdom.measure(function () {    //Sets the height and width of the tab label and content based on the given values and positions.
                if (this.getData('ltPropHeight') == "auto") {
                    if (position.pos === "left" || position.pos === "right") {
                        this.$node.querySelector('.lyteTabNav').style.height = "auto";
                        this.$node.querySelector('lyte-tab-body').style.height = "auto";
                    }
                    if (position.pos === "top" || position.pos === "bottom") {
                        this.$node.querySelector('lyte-tab-body').style.height = "auto";
                    }
                    this.makeAlignment(this.getData("ltPropPosition"));
                    if(onRender){
                        _lyteUiUtils.dispatchEvent('lytetabafterrender', this.$node );
                    }
                    onRender && this.getMethods('afterRender') && this.executeMethod('afterRender', this.$node);
                }
                else {

                    var cs = window.getComputedStyle(this.$node);
                    var borderDimensionY = ((cs.borderTop ? parseFloat(cs.borderTop) : 0) +
                        (cs.borderBottom ? parseFloat(cs.borderBottom) : 0));
                    var navHeight = this.$node.querySelector('.lyteTabNav').getBoundingClientRect().height;
                    var thisHeight = parseInt(cs.height) - borderDimensionY;
                    $L.fastdom.mutate(function () {
                        if (position.pos === "left" || position.pos === "right") {
                            this.$node.querySelector('.lyteTabNav').style.height = thisHeight + "px";
                            this.$node.querySelector('lyte-tab-body').style.height = thisHeight + "px";
                        }
                        if (position.pos === "top" || position.pos === "bottom") {
                            this.$node.querySelector('lyte-tab-body').style.height = (thisHeight - navHeight) + "px";
                        }
                        this.makeAlignment(this.getData("ltPropPosition"));
                        if(onRender){
                           _lyteUiUtils.dispatchEvent('lytetabafterrender', this.$node );
                        }
                        onRender && this.getMethods('afterRender') && this.executeMethod('afterRender', this.$node);
                    }, this);
                }
            }, this);

            // this.customizeTitleTab(position.pos);
        }
        else {
            console.error("No content detected");
        }

    },

    checkTabStyle: function () {
        if (this.getData('ltPropTabStyle') === "nested") {
            this.$node.classList.add('lyteNestedTab');
        }
    },

    onPositionChange: function () {
        
        var comp = this.$node;
        // comp.className = '';
        comp.classList.remove('lyteTabDefaultLeft', 'lyteTabDefaultRight', 'lyteTabDefaultTop', 'lyteTabDefaultBottom');
        var compHead = comp.querySelector('lyte-tab-head');
        var compBody = comp.querySelector('lyte-tab-body');
        var compHeaders = comp.querySelectorAll('lyte-tab-title');
        compHead.classList.remove('lyteTabAlignStart', 'lyteTabAlignEnd', 'lyteTabAlignCenter');
        compHead.removeAttribute("style");
        compBody.removeAttribute("style");
        compHeaders[0].style.marginLeft = "";
        compHeaders[0].style.marginTop = "";
        for (var i = 0; i < compHeaders.length; i++) {
            compHeaders[i].style.float = "";
        }
        comp = null;
        compHead = null;
        compHeaders = null;
        compBody = null;
        var position = this.getData('ltPropPosition');
        this.setPosition(position);
        this.setHeight(position);
        //this.initialFunc(false);
    }.observes('ltPropPosition'),

    onHeightChange: function () {
        this.$node.style.height = this.getData('ltPropHeight');
        this.setHeight(this.getData('ltPropPosition'));
    }.observes('ltPropHeight'),

    keydown: function(event){
        if(event.target.tagName !== 'LYTE-TAB-TITLE'){
            return;
        }
        var tabs = $L(this.$node).find('lyte-tab-title').toArray();
        var curr_tab = $L(this.$node).find('.lyteTabHover'); //$L(this.$node).find('.lyteTabActive');
        curr_tab = curr_tab.length === 0 ? $L(this.$node).find('.lyteTabActive') : curr_tab;
        var tabFocus = tabs.indexOf(curr_tab[0]),prevFocus;

        var tab_length = tabs.length;
        if (event.keyCode === 39 || event.keyCode === 37){
            tabs[tabFocus].setAttribute('tabindex', -1);
            $L(tabs[tabFocus]).removeClass('lyteTabHover');
            
            if(event.keyCode === 39){
                tabFocus++;
                if( tabFocus >= tab_length ){
                    tabFocus = 0;
                }
            }else{
                tabFocus--;
                if(tabFocus < 0){
                    tabFocus = tab_length - 1;
                }
            }
            tabs[tabFocus].setAttribute('tabindex', 0);
            $L(tabs[tabFocus]).addClass('lyteTabHover')
        }
        if(event.keyCode === 13){
            this.openTabContent($L(tabs[tabFocus]).attr('lt-prop-id'), event);
        }
        tabs[tabFocus].focus();  
    },

    showTab: function (event) {
        var target = event.target.correspondingElement || event.target;
        while (target && target.parentNode && target.tagName != 'LYTE-TAB-TITLE') {
            target = target.parentNode;
        }
        if (!target || target.tagName == 'HTML' || target.isEqualNode(document) || target.tagName != 'LYTE-TAB-TITLE') {
            return;
        }
        var id = target.getAttribute('lt-prop-id');

        //If user has clicked on the close icon
        if (event.target.classList.contains('lyteTabCloseIcon')) {
            var returnVal = this.deleteTabContent(id, event);
            if (!returnVal) {
                return;
            }
            this.makeAlignment(this.getData('ltPropPosition'));
            target = (this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title').length > 0) ? this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title')[0] : null;
            if (!target) {
                this.setData('prevTarget', null);
                return
            }
            id = target.getAttribute('lt-prop-id');
            this.openTabContent(target, null);
        }
        // this.executeOnBeforeOpen(id,this.getData('prevTarget').getAttribute('lt-prop-id'));
        this.openTabContent(target, event);
        // this.openTabContent(id);
        // this.executeOnOpen(id);
        // this.setData('prevTarget',target);
    },

    mouseOver: function (event) {

        var target = event.target.correspondingElement || event.target;
        while (target && target.parentNode && target.tagName != 'LYTE-TAB-TITLE') {
            target = target.parentNode;
        }
        if (!target || target.tagName == 'HTML' || target.isEqualNode(document)) {
            return;
        }
        var hover = this.getData('ltPropHover');
        // event.currentTarget.classList.add(hover);
        $L(target).addClass(hover);
    },

    mouseOut: function (event) {
        var target = event.target.correspondingElement || event.target;
        while (target && target.parentNode && target.tagName != 'LYTE-TAB-TITLE') {
            target = target.parentNode;
        }
        if (!target || target.tagName == 'HTML' || target.isEqualNode(document)) {
            return;
        }
        var hover = this.getData('ltPropHover');
        // event.currentTarget.classList.remove(hover);
        $L(target).removeClass(hover);
    },

    getContent: function (children) {
        var contents = [];
        for (var i = 0; i < children.length; i++) {
            if (this.$node == $L(children[i]).closest('LYTE-TABS')[0]) {
                contents.push(children[i]);
            }
        }
        return contents;
    },
    getHeader: function (children) {
        var headers = [];
        for (var i = 0; i < children.length; i++) {
            if (this.$node == $L(children[i]).closest('LYTE-TABS')[0]) {
                headers.push(children[i]);
            }
        }
        return headers;
    },


    //Changes tabs in Format 2 to Format 1 structure
    //Also creates new tab if called from the addTab function
    constructTabs: function (parentEle, node) {

        var title = "";
        var content = "";
        var id;
        var isObject = false;
        var titleEle = document.createElement('lyte-tab-title');
        var contentEle = document.createElement('lyte-tab-content');
        if (typeof node === "object" && node.tagName === "LYTE-TAB") {
            title = node.getAttribute("lt-prop-title");
            content = node.innerHTML;
            id = node.getAttribute("lt-prop-id");
        }
        else {
            title = node.title;
            content = node.content;
            id = node.id;
            isObject = true;
        }
        if (!id) {
            id = this.generateId(title);
        }
        titleEle.innerHTML = title;
        contentEle.innerHTML = content;
        titleEle.setAttribute('lt-prop-id', id);
        //aria-attribute
        titleEle.setAttribute('aria-controls', id);
        contentEle.id = id;
        contentEle.classList.add('lyteTabHide');
       // contentEle.setAttribute('hidden',true);
        var menu = parentEle.querySelector('#moreMenu');
        if(menu){
            var titles = parentEle.querySelector('lyte-tab-head');
            titles.insertBefore(titleEle,menu);
        }else{
            parentEle.querySelector('lyte-tab-head').append(titleEle);
        }
        parentEle.querySelector('lyte-tab-body').append(contentEle);

        //Checks whether the format is changed or a new tab is added
        //If a new tab is added it will execute the code inside this if-block
        if (isObject) {
            // var clickFn = function(event){this.showTab(event)};
            // var mouseoverFn = function(event){this.mouseOver(event)};
            // var mouseoutFn = function(event){this.mouseOut(event)};
            // titleEle.addEventListener('click',clickFn.bind(this));
            // titleEle.addEventListener('mouseover',mouseoverFn.bind(this));
            // titleEle.addEventListener('mouseout',mouseoutFn.bind(this));
            if (this.getData('ltPropCloseIcon')) {
                this.createCloseIcon(new Array(titleEle));
            }
            this.makeAlignment(this.getData('ltPropPosition'));
        }

    },

    deleteTabContent: function (tabId, event) {
        if (tabId) {
            var returnVal = true;
            if (this.getMethods('onBeforeDelete')) {
                returnVal = this.executeMethod('onBeforeDelete', tabId, this.$node, event);
                returnVal = returnVal === undefined ? true : returnVal;
            }
            if (!returnVal) {
                return false;
            }
            var content = this.$node.querySelector('#' + tabId);
            var head = this.$node.querySelector('lyte-tab-head');
            var headers = head.querySelectorAll('lyte-tab-title');
            var isCustomized = false;
            for (var v = 0; v < headers.length; v++) {
                if (headers[v].getAttribute('lt-prop-id') === tabId) {
                    if (headers[v].classList.contains('lyteTabCustomTitleWidth')) {
                        isCustomized = true;
                    }
                    head.removeChild(headers[v]);
                    if (content) {
                        this.$node.querySelector('lyte-tab-body').removeChild(content);
                    }
                    break;
                }
            }
            if (this.getMethods('onDelete')) {
                this.executeMethod('onDelete', tabId, this.$node, event);
            }

            return true;
            // if(isCustomized){
            //     this.customizeTitleTab("afterDelete");
            // }
        }
    },

    enableTab: function (tabId) {
        if (tabId) {
            if (typeof tabId == "string") {
                var headers = this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title');
                for (var v = 0; v < headers.length; v++) {
                    if (headers[v].getAttribute('lt-prop-id') === tabId) {
                        if (headers[v].classList.contains('lyteTabDisable')) {
                            headers[v].classList.remove('lyteTabDisable');
                            if (headers[v].classList.contains('lyteTabForceHide')) {
                                Lyte.arrayUtils(this.getData('menuLabels'), "push", this.getMenuLabel(headers[v])/*headers[v].textContent*/);
                            }
                        }
                        break;
                    }
                }
            }
            if (typeof tabId == "object" && tabId.classList.contains('lyteTabDisable')) {
                tabId.classList.remove('lyteTabDisable');
                if (tabId.classList.contains('lyteTabForceHide')) {
                    Lyte.arrayUtils(this.getData('menuLabels'), "push", this.getMenuLabel(tabId)/*tabId.textContent*/);
                }
            }
        }
    },

    disableTab: function (tabId) {
        
        if (tabId) {
            if (typeof tabId == "string") {
                var headers = this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title');
                for (var v = 0; v < headers.length; v++) {
                    if (headers[v].getAttribute('lt-prop-id') === tabId) {
                        if (!(headers[v].classList.contains('lyteTabDisable'))) {
                            headers[v].classList.add('lyteTabDisable');
                            if (headers[v].classList.contains('lyteTabForceHide')) {
                                var index = this.getData('menuLabels').indexOf(this.getMenuLabel(headers[v])/*headers[v].textContent*/);
                                if (index != -1) {
                                    Lyte.arrayUtils(this.getData('menuLabels'), "removeAt", index, 1);
                                }
                            }
                        }
                        break;
                    }
                }
            }
            if (typeof tabId == "object" && !(tabId.classList.contains('lyteTabDisable'))) {
                tabId.classList.add('lyteTabDisable');
                if (tabId.classList.contains('lyteTabForceHide')) {
                    var index = this.getData('menuLabels').indexOf(this.getMenuLabel(tabId)/*tabId.textContent*/);
                    if (index != -1) {
                        Lyte.arrayUtils(this.getData('menuLabels'), "removeAt", index, 1);
                    }
                }
            }
        }
    },

    openTabContent: function (tabId, event) {
        
        if (tabId) {
            var label;

            if (typeof tabId == "string") {
                var headers = this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title');
                var content = this.$node.querySelector('#' + tabId);
                for (var v = 0; v < headers.length; v++) {
                    if (headers[v].getAttribute('lt-prop-id') === tabId) {
                        if (headers[v].classList.contains(this.getData('ltPropActiveClass'))) {
                            return;
                        }
                        label = headers[v];
                        //$L(label).attr('tab-index',0);
                        var returnVal = this.executeOnBeforeOpen(label, tabId, this.getData('prevTarget') ? this.getData('prevTarget').getAttribute('lt-prop-id') : null, event);
                        if (!returnVal) {
                            return;
                        }
                        this.hideAll();
                        label.classList.add(this.getData('ltPropActiveClass'));
                        if (content) {
                            content.classList.remove('lyteTabHide');
                            content.classList.add('lyteTabShow');
                        }
                        this.setData('ltPropCurrentTab', { 'index': v, 'name': label.textContent.trim() });
                        this.executeOnOpen(label, tabId, event);
                        this.setData('prevTarget', label);
                        break;
                    }
                }
            }
            if (typeof tabId == "object") {
                if (tabId.classList.contains(this.getData('ltPropActiveClass'))) {
                    return;
                }
                label = tabId;
                var id = tabId.getAttribute('lt-prop-id');
                var content = this.$node.querySelector('#' + id);
                var returnVal = this.executeOnBeforeOpen(tabId, id, this.getData('prevTarget') ? this.getData('prevTarget').getAttribute('lt-prop-id') : null, event);
                if (!returnVal) {
                    return;
                }
                this.hideAll();

                tabId.classList.add(this.getData('ltPropActiveClass'));
                if (content) {
                    content.classList.remove('lyteTabHide');
                    content.classList.add('lyteTabShow');
                }
                var headers = this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title'), pos;
                for (var v = 0; v < headers.length; v++) {
                    if (headers[v].isEqualNode(label) && headers[v].getAttribute('lt-prop-id') === id) {
                        pos = v;
                        break;
                    }
                }
                this.setData('ltPropCurrentTab', { 'index': pos, 'name': label.textContent.trim() });
                this.executeOnOpen(tabId, id, event);
                this.setData('prevTarget', tabId);
            }
            if (this.getData('ltPropType') == "collapse" && this.getData('menuLabels').indexOf(this.getMenuLabel(label)/*label.textContent*/) > -1) {
                
                this.collapseHeader(true);
            }

            $L(label).attr('tabindex',0);
            $L(label).attr('aria-selected','true');
        }
       
    },

    checkCloseIcon: function (head) {
        if (this.getData('ltPropCloseIcon')) {
            head = head || this.$node.querySelector('lyte-tab-head');
            this.createCloseIcon(head.querySelectorAll('lyte-tab-title'));
        }
    },

    createCloseIcon: function (headers) {
        for (var v = 0; v < headers.length; v++) {
            if (!headers[v].addedCloseIcon) {
                // var span = document.createElement('span');
                // span.innerHTML = headers[v].innerHTML;
                // // span.style.float = "left";
                // headers[v].innerHTML = "";
                // headers[v].appendChild(span);
                var closeSpan = document.createElement('span');
                closeSpan.classList.add('lyteTabCloseIcon');
                // closeSpan.style.marginTop = (headers[0].getBoundingClientRect().height - 9 - 2) / 2 + 'px';
                headers[v].appendChild(closeSpan);
                headers[v].addedCloseIcon = true;
            }
        }
    },

    setPosition: function (position) {
        switch (position.pos) {
            case "left": this.$node.classList.add('lyteTabDefaultLeft');/*this.setHeight("left");*/break;
            case "right": this.$node.classList.add('lyteTabDefaultRight');/*this.setHeight("right");*/break;
            case "top": this.$node.classList.add('lyteTabDefaultTop');/*this.setHeight("top");*/break;
            case "bottom": this.$node.classList.add('lyteTabDefaultBottom');/*this.setHeight("bottom");*/break;
        }
        
    },

    checkHeightOnResize: function () {
        if (this.$node.getBoundingClientRect().height != (this.$node.querySelector('.lyteTabNav').getBoundingClientRect().height + this.$node.querySelector('lyte-tab-body').getBoundingClientRect().height)) {
            this.setHeight(this.getData('ltPropPosition'));
        }
    },

    setHeight: function (position) {
        if (this.getData('ltPropHeight') == "auto") {
            if (position.pos === "left" || position.pos === "right") {
                this.$node.querySelector('.lyteTabNav').style.height = "auto";
                this.$node.querySelector('lyte-tab-body').style.height = "auto";
            }
            if (position.pos === "top" || position.pos === "bottom") {
                this.$node.querySelector('lyte-tab-body').style.height = "auto";
            }
            this.makeAlignment(this.getData("ltPropPosition"));
        }
        else {
            $L.fastdom.measure(function () {
                var cs = window.getComputedStyle(this.$node);
                var borderDimensionY = ((cs.borderTop ? parseFloat(cs.borderTop) : 0) +
                    (cs.borderBottom ? parseFloat(cs.borderBottom) : 0));
                var navHeight = this.$node.querySelector('.lyteTabNav').getBoundingClientRect().height;
                var thisHeight = parseInt(cs.height) - borderDimensionY;
                $L.fastdom.mutate(function () {
                    // if(position.pos === "bottom"){
                    //     this.$node.querySelector('.lyteTabNav').style.top = (thisHeight - navHeight) + "px";
                    // }
                    if (position.pos === "left" || position.pos === "right") {
                        this.$node.querySelector('.lyteTabNav').style.height = thisHeight + "px";
                        this.$node.querySelector('lyte-tab-body').style.height = thisHeight + "px";
                    }
                    if (position.pos === "top" || position.pos === "bottom") {
                        this.$node.querySelector('lyte-tab-body').style.height = (thisHeight - navHeight) + "px";
                    }
                    this.makeAlignment(this.getData("ltPropPosition"));
                }, this);

            }, this);
        }
    },

    hideAll: function () {
        var labels = this.getHeader(this.$node.querySelector('lyte-tab-head').querySelectorAll('lyte-tab-title')); /*this.getHeader(this.$node.querySelector('lyte-tab-head').children);*/
        var contents = this.getContent($L('lyte-tab-content',this.$node.querySelector('lyte-tab-body'))); /*this.getContent(this.$node.querySelector('lyte-tab-body').children);*/
        var active = this.getData('ltPropActiveClass');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].classList.contains(active)) {
                labels[i].setAttribute('aria-selected',false);
                labels[i].classList.remove(active);
            }
        }
        for (var v = 0; v < contents.length; v++) {
            //contents[v].setAttribute('hidden',true);
            if (contents[v].classList.contains('lyteTabShow')) {
                contents[v].classList.remove('lyteTabShow');
                contents[v].classList.add('lyteTabHide');
            }
            if (!contents[v].classList.contains('lyteTabHide')) {
                contents[v].classList.add('lyteTabHide');
            }
            if (!$L(contents[v]).hasClass('lyteTabHide')) {
                $L(contents[v]).addClass('lyteTabHide');
            }
        }
    },

    customizeTitleTab: function (prop) {

        $L.fastdom.measure(function () {
            var head = this.$node.querySelector('lyte-tab-head');
            var compWidth = this.getWidth(head, false);
            if (prop === "top" || prop === "bottom") {
                var totalWidth = 0;
                var width = 0;
                var titles = head.querySelectorAll('lyte-tab-title');
                if (this.getData('ltPropType') == "collapse") {
                    $L.fastdom.measure(function () {
                        for (var i = 0; i < titles.length; i++) {
                            totalWidth = totalWidth + this.getWidth(titles[i], true, true);
                        }
                        if (totalWidth > compWidth) {
                            this.collapseHeader();
                        }
                    }, this);
                }

            }
            if (prop === "afterDelete") {
                var titles = head.querySelectorAll('lyte-tab-title');
                var width = compWidth / titles.length;
                $L.fastdom.mutate(function () {
                    for (var i = 0; i < titles.length; i++) {
                        titles[i].style.width = width + "px";
                    }
                });
            }
        }, this);
    },

    /**
     * The method is going to do the calculations for collapsible tab and construct the menu items
     *
     */
    collapseHeader: function (onResize) {

        var head = this.$node.querySelector('lyte-tab-head'),
            compOffset = {
                width: this.getWidth(head, false),
                height: head.offsetHeight
            },

            maxWidth = this.getData('ltPropMaxWidth').indexOf('%') != -1 ? (parseInt(this.getData('ltPropMaxWidth')) * compOffset.width) / 100 : parseFloat(this.getData('ltPropMaxWidth')),
            headers = head.querySelectorAll('lyte-tab-title'),
            totalWidth = 0, allowed = -1,
            _this = this,
            openedTab = Array.from(headers).findIndex(function (x) { return x.classList.contains(_this.getData('ltPropActiveClass')) }),
            menuLabels = [];
        if (onResize) {
            for (var i = 0; i < headers.length; i++) {
                if (headers[i].classList.contains('lyteTabForceHide')) {
                    headers[i].classList.remove('lyteTabForceHide');
                }
            }
        }
        totalWidth += this.getWidth(headers[openedTab], true, true);
        for (var i = 0; i < headers.length; i++) {
            if (i != openedTab) {
                totalWidth += this.getWidth(headers[i], true, true);
                if (totalWidth > maxWidth) {
                    allowed = i;
                    break;
                }
            }
        }
        if (allowed > -1 && allowed < headers.length) {
            for (var i = allowed; i < headers.length; i++) {
                if (i == openedTab) {
                    if (openedTab > 0 && !(headers[i - 1].classList.contains('lyteTabForceHide'))) {
                        $L(headers[i - 1]).addClass('lyteTabForceHide');
                        if (!($L(headers[i - 1]).hasClass('lyteTabDisable'))) {
                            menuLabels.push(this.getMenuLabel(headers[i - 1])/*headers[i - 1].textContent*/);
                        }
                    }
                }
                else {
                    $L(headers[i]).addClass('lyteTabForceHide');
                    if (!($L(headers[i]).hasClass('lyteTabDisable'))) {
                        menuLabels.push(this.getMenuLabel(headers[i])/*headers[i].textContent*/);
                    }
                }
            }
            var menu = this.$node.querySelector('#lyteTabMenu');
            if (!menu) {
                var span = document.createElement('span');
                span.id = "moreMenu";
                var uniqueSel = this.createUniqueSlector();
                span.classList.add(uniqueSel);
                span.appendChild(document.createElement('span'));
                head.appendChild(span);
                this.createMenu(menuLabels, uniqueSel, "init");
                if (!onResize) {
                    if (this.getData('ltPropPosition').pos === "bottom") {
                        head.style.top = (head.offsetTop + (Math.ceil(compOffset.height / 2) - 1)) + "px";
                    }
                }
            }
            else/*if(onResize)*/ {
                Lyte.arrayUtils(this.getData('menuLabels'), "removeAt", 0, this.getData('menuLabels').length);
                Lyte.arrayUtils(this.getData('menuLabels'), "push", menuLabels);
            }
        }
        else {
            if (allowed == -1) {
                this.removeMenu();
            }
            // if(onResize){
            //     this.makeAlignment(this.getData('ltPropPosition'));
            // }
        }
    },

    createUniqueSlector: function () {
        var tabs = document.querySelectorAll('lyte-tabs');
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].isEqualNode(this.$node)) {
                return "menuSel_" + i;
            }
        }
    },

    getMenuLabel: function (item) {
        var labelItem = item.querySelector('.lyteTabTitleLabel');
        return labelItem ? labelItem.textContent : item.textContent;
    },

    /**
     * The method is going to create the menu and add listeners for the methods
     *
     */
    createMenu: function (menuLabels, sel, prop) {
        if (prop == "init") {
            var menu = document.createElement('lyte-menu');
            menu.id = 'lyteTabMenu';
            this.setData('menuLabels', menuLabels);
            menu.ltProp({
                content: menuLabels,
                query: "." + sel,
                event: "click",
                callout: true
            });
            if (this.getData('ltPropMenuWrapperClass')) {
                menu.ltProp({
                    wrapperClass: this.getData('ltPropMenuWrapperClass')
                });
            }
            // this.onMenuLabelChange();
            menu.setMethods({
                onMenuClick: function (value, event, menu, menuOriginElem, subMenu) {
                    var labelText = arguments[0],
                        tab = arguments[2].parentElement.component,
                        head = arguments[3].parentElement,
                        headers = head.querySelectorAll('lyte-tab-title'),
                        label;
                    for (var i = 0; i < headers.length; i++) {
                        if (tab.getMenuLabel(headers[i])/*headers[i].textContent*/ == labelText && headers[i].classList.contains('lyteTabForceHide')) {
                            label = headers[i];
                            break;
                        }
                    }
                    if (label) {
                        label.classList.remove('lyteTabForceHide');
                        tab.openTabContent(label, event);
                        // LyteComponent.insertBefore(headers[0],label);
                        // tab.collapseHeader(true);
                    }
                    if (tab.getMethods('onMenuClick')) {
                        tab.executeMethod('onMenuClick', value, event, menu, menuOriginElem, subMenu, tab, label);
                    }
                },
                onBeforeOpen: function (menu, event, menuOriginElem) {
                    var tab = menu.parentElement.component;
                    if (tab.getMethods('onBeforeMenuOpen')) {
                        tab.executeMethod('onBeforeMenuOpen', menu, event, menuOriginElem, tab);
                    }
                },
                onOpen: function (menu, event, menuOriginElem) {
                    var tab = menu.parentElement.component;
                    if (tab.getMethods('onMenuOpen')) {
                        tab.executeMethod('onMenuOpen', menu, event, menuOriginElem, tab);
                    }
                },
                onBeforeClose: function (menu, event) {
                    var tab = menu.parentElement.component;
                    if (tab.getMethods('onBeforeMenuClose')) {
                        tab.executeMethod('onBeforeMenuClose', menu, event, tab);
                    }
                },
                onClose: function (menu, event) {
                    var tab = menu.parentElement.component;
                    if (tab.getMethods('onMenuClose')) {
                        tab.executeMethod('onMenuClose', menu, event, tab);
                    }
                },
                beforeRender: function (menu) {
                    var tab = menu.parentElement.component;
                    if (tab.getMethods('onBeforeMenuRender')) {
                        tab.executeMethod('onBeforeMenuRender', menu, tab);
                    }
                },
                afterRender: function (menu) {
                    var tab = menu.parentElement.component;
                    if (tab.getMethods('onAfterMenuRender')) {
                        tab.executeMethod('onAfterMenuRender', menu, tab);
                    }
                }
            });
            this.$node.appendChild(menu);
        }
    },

    removeMenu: function () {
        var menu = this.$node.querySelector('#lyteTabMenu');
        if (menu) {
            menu.remove();
            this.$node.querySelector('#moreMenu').remove();
        }
        this.setData('menuLabels', []);
    },

    onMenuLabelChange: function () {
        this.$node.querySelector('lyte-menu').ltProp({
            content: this.getData('menuLabels')
        })
    }/*.observes('menuLabels.[]')*/,

    makeAlignment: function (position) {
        var head = this.$node.querySelector('lyte-tab-head');
        if (position.align == "left" || position.align == "top") {
            head.classList.add('lyteTabAlignStart');
        }
        if (position.align == "right" || position.align == "bottom") {
            if (this.getData('ltPropType') == "collapse" && (position.pos == "top" || position.pos == "bottom")) {
                head.classList.add('lyteTabRightCollapse');
            }
            else {
                head.classList.add('lyteTabAlignEnd');
            }
        }
        if (position.align == "center") {
            head.classList.add('lyteTabAlignCenter');
        }
    },

    executeOnBeforeOpen: function (clickedItem, targetId, prevEleId, event, onRender) {
        var returnVal;
         if(this.getData('ltPropFireOnInit')){
            if (this.getMethods('onBeforeOpen')) {
                returnVal = this.executeMethod('onBeforeOpen', this.$node.querySelector("#" + targetId), this.$node.querySelector("#" + prevEleId), this, clickedItem, this.getData('prevTarget') ? this.getData('prevTarget') : null, event);
            }
        }else{
           if (this.getMethods('onBeforeOpen') && !onRender) {
                returnVal = this.executeMethod('onBeforeOpen', this.$node.querySelector("#" + targetId), this.$node.querySelector("#" + prevEleId), this, clickedItem, this.getData('prevTarget') ? this.getData('prevTarget') : null, event);
            } 
        }

        return (returnVal === undefined ? true : returnVal);
    },

    executeOnOpen: function (clickedItem, targetId, event,onRender) {

        
        if(this.getData('ltPropFireOnInit')){
            if (this.getMethods('onOpen') ) {
                this.executeMethod('onOpen', this.$node.querySelector("#" + targetId), this, clickedItem, event);
            } 
        }else{
            if (this.getMethods('onOpen') && !onRender) {
                this.executeMethod('onOpen', this.$node.querySelector("#" + targetId), this, clickedItem, event);
            }
        }

        _lyteUiUtils.dispatchEvent('lytetabopen', this.$node , { 'content' :  this.$node.querySelector("#" + targetId), 'component': this ,'tab': clickedItem });
    },

    generateId: function (text) {
        while (text.indexOf(" ") !== -1) {
            text = text.replace(" ", "_");
        }
        return text;
    },

    getWidth: function (ele, includePadding, includeMargin) {
        includePadding = includePadding == undefined ? true : includePadding;
        var cs = getComputedStyle(ele),
            padding = parseInt(cs.paddingLeft) + parseInt(cs.paddingRight),
            margin = 0;
        if (includeMargin) {
            margin = parseInt(cs.marginLeft) + parseInt(cs.marginRight);
        }
        return parseFloat(cs.width) + (includePadding ? 0 : -padding) + margin;
    }
});
// var _lyteTab = {
//     _lyteTabTitleId : 0,

//     generateId : function(){
//         return 'lyte_tab_tile_' + _lyteTab._lyteTabTitleId++;
//     },
//     getgeneratedId : function(){
//         return 'lyte_tab_tile_' + _lyteTab._lyteTabTitleId;
//     }
// }
/**
 * @customElement lyte-tab-title,
 *                lyte-tab-head,
 *                lyte-tab-body,
 *                lyte-tab-content
 */
 
if (!_lyteUiUtils.registeredCustomElements['lyte-tab-title']) {

    _lyteUiUtils.registeredCustomElements['lyte-tab-title'] = true;

    Lyte.createCustomElement("lyte-tab-title", {
        static: {

        },
        connectedCallback: function () {

            $L(this).attr('role','tab');
            $L(this).attr('tabindex',-1);
            $L(this).attr('aria-selected','false');
            
            
            var compEle = this.closest('lyte-tabs');
            if (compEle && compEle.component && compEle.getData('ltPropType') == "collapse" ) {

                if (compEle.checkTabs) {
                    clearTimeout(compEle.checkTabs);
                    compEle.checkTabs = false;
                }
                else {
                    this.closest('lyte-tab-head').classList.add('lyteTabVH');
                }
                compEle.checkTabs = setTimeout(function () {
                    var tab = this.closest('lyte-tabs');
                    if (tab) {
                        var comp = tab.component;
                        var head = this.parentElement;
                        var compWidth = comp.getWidth(head, false);
                        var maxWidth = comp.getData('ltPropMaxWidth').indexOf('%') != -1 ? (parseInt(comp.getData('ltPropMaxWidth')) * compWidth) / 100 : parseFloat(comp.getData('ltPropMaxWidth'));

                        var totalWidth = 0;
                        var width = 0;
                        var titles = head.querySelectorAll('lyte-tab-title');
                        var activeTabIndex = -1;
                        for (var i = 0; i < titles.length; i++) {
                            totalWidth = totalWidth + comp.getWidth(titles[i], true, true);
                            if (titles[i].classList.contains(comp.getData('ltPropActiveClass'))) {
                                activeTabIndex = i;
                            }
                        }
                        if (activeTabIndex == -1) {
                            comp.openTabContent(titles[0], null);
                        }
                        if (totalWidth > compWidth || totalWidth > maxWidth) {

                            if (comp.$node.ltProp('type') == "collapse") {
                                // $L.fastdom.mutate(function() {
                                comp.collapseHeader();
                                // },comp);
                            }
                        }
                        
                        this.closest('lyte-tab-head').classList.remove('lyteTabVH');
                    }
                    compEle.checkTabs = false;
                }.bind(this), 100);
            }
        },
        disconnectedCallback: function () {
            var compEle = this.closest('lyte-tabs');
            if (compEle && compEle.checkTabs) {
                clearTimeout(compEle.checkTabs);
                compEle.checkTabs = false;
                this.closest('lyte-tab-head').classList.remove('lyteTabVH');
            }
        }
    });
}
/*if (!_lyteUiUtils.registeredCustomElements['lyte-tab-content']) {

    _lyteUiUtils.registeredCustomElements['lyte-tab-content'] = true;

    Lyte.createCustomElement("lyte-tab-content", {
        static: {

        },
        connectedCallback: function () {
            if(!this.classList.contains('lyteTabShow')){
                this.classList.add('lyteTabHide')
            }
            
        }
        
    });
}*/
if (!_lyteUiUtils.registeredCustomElements['lyte-tab-content']) {

    _lyteUiUtils.registeredCustomElements['lyte-tab-content'] = true;

    Lyte.createCustomElement("lyte-tab-content", {
        static: {

        },
        connectedCallback: function () {
            $L(this).attr('role','tabpanel');
        }
        
    });
}
window.addEventListener('resize', function () {
    if (window._lyteUiUtils.tabResizeTriggered) {
        clearTimeout(window._lyteUiUtils.tabResizeTriggered);
        window._lyteUiUtils.tabResizeTriggered = false;
    }
    window._lyteUiUtils.tabResizeTriggered = setTimeout(function () {
        var tabs = document.querySelectorAll('lyte-tabs');
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].component && tabs[i].component.getData('ltPropType') == "collapse") {
                tabs[i].component.collapseHeader(true);
            }
            tabs[i].component.checkHeightOnResize();
        }
        window._lyteUiUtils.tabResizeTriggered = false;
    }, 50);
});

/**
 * @syntax yielded
 * <lyte-tabs>
 *     <template is = "registerYield" yield-name = "tabYield">
 *         <lyte-tab-head>
 *             <lyte-tab-title lt-prop-id = "tabs1"> Header 1 </lyte-tab-title>
 *             <lyte-tab-title lt-prop-id = "tabs2"> Header 2 </lyte-tab-title>
 *             <lyte-tab-title lt-prop-id = "tabs3"> Header 3 </lyte-tab-title>
 *             <lyte-tab-title lt-prop-id = "tabs4"> Header 4 </lyte-tab-title>
 *         </lyte-tab-head>
 *         <lyte-tab-body>
 *             <lyte-tab-content id = "tabs1"> Content 1 </lyte-tab-content>
 *             <lyte-tab-content id = "tabs2"> Content 2 </lyte-tab-content>
 *             <lyte-tab-content id = "tabs3"> Content 3 </lyte-tab-content>
 *             <lyte-tab-content id = "tabs4"> Content 4 </lyte-tab-content>
 *         </lyte-tab-body>
 *     </template>
 * </lyte-tabs>
 */

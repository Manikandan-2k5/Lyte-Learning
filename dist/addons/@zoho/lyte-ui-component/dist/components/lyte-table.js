// Issues to fix

// Combined width of fixed column should not exceed width of lyte-table 

/**
 * Lyte-table is a component used to display data in rows and columns
 * @component lyte-table
 * @dependency lyte-scrollbar
 *  /plugins/lyte-scrollbar.js
 *  /theme/compiledCSS/default/ltr/lyte-ui-scrollbar.css
 * @version 1.0.0
 */

Lyte.Component.register('lyte-table', {
_template:"<template tag-name=\"lyte-table\"> <div class=\"lyteTableScroll\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <lyte-table-structure id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" role=\"{{ltPropRole}}\"> <template is=\"if\" value=\"{{ltPropHeaderLabelKey}}\"><template case=\"true\"> <lyte-colgroup> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"list\" index=\"indexVal\"> <lyte-col></lyte-col> </template> </lyte-colgroup> <lyte-thead role=\"rowgroup\"> <lyte-tr role=\"row\"> <template is=\"if\" value=\"{{ltPropHeader.length}}\"><template case=\"true\"><template is=\"for\" items=\"{{ltPropHeader}}\" item=\"list\" index=\"indexVal\"> <lyte-th id=\"{{list.id}}\" class=\"{{list.class}}\" index=\"{{indexVal}}\" resize=\"{{list.resize}}\" fixed=\"{{list.fixed}}\" icon=\"{{list.icon}}\" role=\"columnheader\"> {{unescape(list[ltPropHeaderLabelKey])}} </lyte-th> </template></template></template> </lyte-tr> </lyte-thead> </template></template> <lyte-tbody role=\"rowgroup\"> <template is=\"if\" value=\"{{ltPropInfiniteScroll}}\"><template case=\"true\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"list\" index=\"indexVal\"> <lyte-tr id=\"{{list.body.id}}\" class=\"{{list.body.class}}\" role=\"row\" aria-rowindex=\"{{list.index}}\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"header\" index=\"index\"> <lyte-td role=\"cell\" aria-colindex=\"{{index}}\"> <div style=\"height: {{ltPropCellHeight}}\"> {{unescape(lyteUiGetValue(list.body,header[ltPropBodyLabelKey]))}} </div> </lyte-td> </template> </lyte-tr> </template> </template><template case=\"false\"> <template is=\"for\" items=\"{{ltPropContent}}\" item=\"list\" index=\"indexVal\"> <lyte-tr id=\"{{list.id}}\" class=\"{{list.class}}\" role=\"row\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"header\" index=\"index\"> <lyte-td role=\"cell\" aria-colindex=\"{{index}}\">{{unescape(lyteUiGetValue(list,header[ltPropBodyLabelKey]))}}</lyte-td> </template> </lyte-tr> </template> </template></template> </lyte-tbody> </lyte-table-structure> </template><template case=\"false\"><template is=\"if\" value=\"{{ltPropInfiniteScroll}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\" lt-prop-data=\"{{ltPropData}}\"></lyte-yield> </template><template case=\"false\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template></template></template></template> </div> <template is=\"if\" value=\"{{expHandlers(ltPropResize.vertical,'||',ltPropResize.horizontal)}}\"><template case=\"true\"> <lyte-table-resize ontouchstart=\"{{action('tableResize',event,'both')}}\" __mousedown=\"{{action('tableResize',event,'both')}}\"></lyte-table-resize> <template is=\"if\" value=\"{{ltPropResize.vertical}}\"><template case=\"true\"> <lyte-table-vertical-resize ontouchstart=\"{{action('tableResize',event,'vert')}}\" __mousedown=\"{{action('tableResize',event,'vert')}}\"></lyte-table-vertical-resize> </template></template><template is=\"if\" value=\"{{ltPropResize.horizontal}}\"><template case=\"true\"> <lyte-table-horizontal-resize ontouchstart=\"{{action('tableResize',event,'hori')}}\" __mousedown=\"{{action('tableResize',event,'hori')}}\"></lyte-table-horizontal-resize> </template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height: '","ltPropCellHeight"]}}}},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropContent","ltPropHeader","ltPropId","ltPropClass","ltPropBorder","ltPropHeaderLabelKey","ltPropBodyLabelKey","ltPropWidth","ltPropHeight","ltPropResize","ltPropFixedColumnClass","ltPropYield","ltPropScroll","ltPropColumnSortable","ltPropScrollbarOption","ltPropDualResize","ltPropData","ltPropInfiniteScroll","ltPropCellHeight","ltPropContentLength","ltPropPreventScrollbar","ltPropRole","ltPropStickyTable","ltPropScrollStep","ltPropPreventTableModify","ltPropSortDummyColumClass","ltPropNavigation","ltPropReset","lyteUnbound","columns","nonFixedColumn","minWidth1","minWidth2","secondaryData","boundary","rowHeights"],

    init : function(){
        var uA = navigator.userAgent,
        cb = "beforeRender",
        __this = this,
        $node = __this.$node,
        __window = window,
        add = "addEventListener",
        ns = '_tableResize';
        
        __this._dir = _lyteUiUtils.getRTL();
        __this.isIE11Lyte = /rv:11/ig.test( uA );
        __this.isEdgeLyte = /Edge/ig.test( uA );
        __this._browser = __this.isIE11Lyte || __this.isEdgeLyte || uA.match( 'Safari' );

        /**
         * @method beforeRender
         * @version 1.0.1
         */

        __this.getMethods( cb ) && __this.executeMethod( cb, $node );

        /**
         * @utility scrollTable
         * @version 1.0.4
         */

        $node.scrollTable = function( x, y ){
            var scrollElem = ( __this.scrollDiv = __this.scrollDiv || $node.querySelector( 'div.lyteTableScroll' ) ),
            undef = void 0,
            evt = new Event( 'scroll', { bubbles: true } );

            if( x != undef ){
                scrollElem.scrollLeft = x;
            }

            if( y != undef ){
                scrollElem.scrollTop = y;
            }

            evt._byFunc = true;
            scrollElem.dispatchEvent( evt );
        }

        if( !__window[ ns ] ){
            __window[ ns ] = true;

            var fn = resizeTable;

            __window[ add ]( 'resize', fn, true );
            __window[ add ]( 'orientationchange', fn, true );
        }

        /**
         * @utility toggleRows
         * @version 1.0.3
         */

         $node.toggleRows = function( val ){
            var name = val ? 'remove' : "add";
            Array.from( this.querySelectorAll( 'lyte-tbody lyte-tr.lytePreventInfiniteScroll' ) ).forEach( function( item ){
                item.classList[ name ]( 'lyteHidden' );
            });
         }
    },

    rtlfunc: function ( lft, bcr, ww ){
        if( this._dir && lft != 'top' && lft != 'clientY' ){
            if( bcr ){
                if( lft == 'right' ){
                    return ww - bcr.left;
                } else if( lft == 'clientX' ){
                    return ww - bcr[ lft ];
                }
                return ww - bcr.right;
            } else if( lft == 'left' ){
                return 'right';
            } else if( lft == "right" ){
                return "left";
            }
        }
        return bcr ? bcr[ lft ] : lft;
    },

    didDestroy : function(){
        var __this = this,
        __data = __this.data,
        scrolldiv = __this.scrollDiv,
        $node = __this.$node,
        _window = window,
        iso = __this._intersectionObs;

        if( _window._tableResize && document.body.getElementsByTagName( 'lyte-table' ).length == 0 ){
            var rel = "removeEventListener";

            _window[ rel ]( 'resize', resizeTable, true );
            _window[ rel ]( 'orientationchange', resizeTable, true );

            delete _window._tableResize;
        }

        if( __data.ltPropNavigation ){
           _lyteUiUtils.tableNavigation( $node.getElementsByTagName( 'lyte-table-structure' )[ 0 ], 'unbind' );
        }

        if( iso ){
            __this._setmeasure && $L.fastdom.clear( __this._setmeasure );
            iso.disconnect();

            delete __this.reset;
            delete __this._intersectionObs;
            delete __this._intersections;
        }

        !__data.ltPropPreventScrollbar && scrolldiv && $L( scrolldiv ).removeScroll();

        delete __this.scrollDiv; delete __this._dummy; delete __this._dummy1; delete __this.resizeComponent; delete __this.targetElem;
        delete $node.setValue; delete $node.scrollTable;
    },

    initProcess1 : function( arg ){
        var __this = this,
        __data = __this.data,
        is_reset = arg && arg.item == "ltPropReset";

        if( __this._prevent ){
            return
        }

        if( is_reset && arg.newValue == false ){
            return;
        }

        if( __data.ltPropInfiniteScroll ){
            var table = __this.$node.getElementsByTagName( 'lyte-table-structure' )[ 0 ],
            content = __data.ltPropContent || [],
            __length = content.length,
            len = Math.min( __data.ltPropContentLength || __length, __length ),
            data = [];

            if( __length == 0 && !arg ){
                return;
            }

            if( table ){
                table.style.height = "auto";
            }

            for( var i = 0; i < len; i++ ){
                data[ i ] = {
                    body : content[ i ],
                    checked : false,
                    index : i
                };
            }

            this.setData( 'ltPropData', data );

            var __dummy = __this._dummy,
            __dummy1 = __this._dummy1,
            __scrolldiv = __this.scrollDiv,
            __translate = "translateY(0px)";

            delete __this._stopScroll;

            if( arg ){
                __dummy && $L( __dummy ).css({
                    height : 0,
                    transform : __translate
                });

                __dummy1 && $L( __dummy1 ).css( 'transform', __translate );

                __scrolldiv.scrollTop = 0;
                __scrolldiv.scrollLeft = 0;
            }

            __this._boundary = {
                top : __this._top = 0,
                bottom : __this._bottom = Math.max( len - 1, 0 )
            };
        }

        if( is_reset ){
            this.setData( arg.item, false );
        }
    }.observes( 'ltPropContent.[]', 'ltPropReset' ).on( 'init' ),

    didConnect: function () {
        var __data = this.data,
        ltPropInfiniteScroll = __data.ltPropInfiniteScroll, 
        secData = __data.secondaryData,
        // ltPropResize = __data.ltPropResize,
        $node = this.$node;

        // if( __data.ltPropYield && (ltPropResize.vertical || ltPropResize.horizontal)) {
        //     this.resizeComponentAppend();
        // }
        try {
            var scrollDiv = $node.querySelector('div.lyteTableScroll');
            // scrollDiv._overlay = scrollDiv.getElementsByTagName( 'lyte-overlaydiv' )[ 0 ];
            this.scrollDiv = scrollDiv;
            scrollDiv.comp = this;
            scrollDiv._infiniteScroll = ltPropInfiniteScroll;
            if ( !__data.ltPropPreventScrollbar && $L.prototype.scroll ) {
                $L(scrollDiv).scroll( __data.ltPropScrollbarOption);
                var scrollbar = $node.querySelector('.lyteScrollContainer.lyteScrollContainerY');
                var header = $node.querySelector('lyte-th'), hgt;
                $L.fastdom.measure(function () {
                    var fg = this._dir;
                    // while applying scroll plugin vertical scrollbar needs some offset for enabling the virtual of only body part is scrolling. If it is zero we have to set height of the header as offset
                    if (header && scrollbar && scrollbar.offsetTop == 0) {
                        hgt = header.getBoundingClientRect().height;
                        $L.fastdom.mutate(function () {
                            scrollbar.style.top = hgt + 'px';
                            if (fg) {
                                $node.classList.add('lyteRTL')
                            }
                        }.bind(this))
                    }
                    $L.fastdom.mutate(function () {
                        __data.ltPropDualResize && $node.classList.add('lyteDualResize')
                        if (this.getMethods('afterRender')) {
                            this.executeMethod('afterRender', this.$node);
                        }
                    }.bind(this))
                }.bind(this))
            } else {
                if (this.getMethods('afterRender')) {
                    /**
                     * @method afterRender
                     * @version 1.0.1
                     */
                    this.executeMethod('afterRender', this.$node);
                }
            }
        } catch (err) {
        }
        if (ltPropInfiniteScroll) {
            $node.classList.add('infinitescroll')
            /**
             * @utility setValue
             * @version 1.0.2
             */
            $node.setValue = function (ret) {
                if (this._stopScroll) {
                    this.appendAddData1.call(this, ret)
                }
            }.bind(this)

            /**
             * @utility removeRow
             * @version 2.2.17
             */

            $node.removeRow = function (row) {
                this.removeRow(row);
            }.bind(this);

            /**
             * @utility scrollToRecord
             * @version 2.2.19
             */

            $node.scrollToRecord = this.scrollToRecord.bind(this);

            /**
             * @utility insertRow
             * @version 2.2.19
             */

            $node.insertRow = this.insertRow.bind(this);
        }

        if( __data.ltPropNavigation ){
            _lyteUiUtils.tableNavigation( $node.getElementsByTagName( 'lyte-table-structure' )[ 0 ] );
        }
    },

    // width calculation for positioning
    columnWidth: function( fixedColumn, i, j ){

        var width = 0;
        j = j || 0;

        for( ; j < i; j++ ){
            width += fixedColumn[ j ].property.width;
        }

        return width;
    },

    heightCalc: function( rows, upper, hgtLimit ){
        var hgt = 0, j = upper;
        for( ; j > 0; j-- ){
            hgt += rows[ j ];
            if( hgtLimit < hgt ){
                break;
            }
        }
        return [ hgt, j ];
    },

    topElem: function (elem) {
        var __final;

        if( this.isIE11Lyte || this.isEdgeLyte ){
            __final = elem.getElementsByTagName( 'lyte-td' )[ 0 ];
        } else {
            __final = elem;
        }
        return __final ? __final.getBoundingClientRect() : {};
    },

    cellSet: function( elem, value ){
        var __elem;
        if( this.isIE11Lyte || this.isEdgeLyte ){
            __elem = Array.from( elem.getElementsByTagName( 'lyte-td' ) );
        } else {
           __elem = [ elem ];
        }

        if( value ){
            __elem.forEach( function( item ){
                item.style.transform = value;
            });
        }
        return __elem[ 0 ].style.transform;
    },

    scrollTable: function (event, obj) {
        // fastdom has been removed here due to delay causes error in calculation of data in ie edge safari
        var b = event.yScroll, ltPropData = this.getData('ltPropData'), ltPropContent = this.getData('ltPropContent'), scrollDiv = this.scrollDiv, divClientRect = obj.tbodyClient, tableClient = obj.$nodeClient, table = this.$node.querySelector('lyte-table-structure');
        var head = this.$node.querySelector('lyte-th'), neglected = obj.neglected, compNeg = obj.compNeg;
        head = head ? (head.property ? head.property.height : head.getBoundingClientRect().height) : 0;
        var topElem = obj.topElem, top1 = obj.topElemClient;

        if (table.style.height.indexOf('px') == -1) {
            table.style.height = divClientRect.height + 'px';
            this._rowHgt = parseInt(top1.height * 10) / 10;
            this._step = parseInt((divClientRect.height - this._rowHgt * neglected.length) * 10) / 10;
        }
        if( !this._dummy ){
            this.createDummy( obj.tbody );
        }
        if (b == undefined && !scrollDiv.classList.contains('eventBinded')) {
            var prevScroll = parseFloat(this._dummy.style.transform.match(/[\d|.]+/ig)[0]),
                currScroll = scrollDiv.scrollTop
            if (currScroll > prevScroll) {
                b = 1
            } else {
                b = -1
            }
        }

        var __boundary = this._boundary,
        __dummy = this._dummy.style,
        __dummy1 = ( this._dummy1 || {} ).style,
        __rowHgt = this._rowHgt;

        if (b > 0) {
            if (parseFloat(tableClient.top + head) >= parseFloat(top1.bottom)) {
                if( __boundary.bottom <= ltPropContent.length - 2 ) {
                    var diff = Math.max(parseInt((tableClient.top + head - top1.bottom) / __rowHgt ), 1);
                    if( __boundary.bottom + diff > ltPropContent.length - 1) {
                        diff = ltPropContent.length - 1 - __boundary.bottom
                    }
                    for (var i = 0; i < diff; i++) {
                        __boundary.bottom += 1;
                        if (i >= diff - ltPropData.length) {
                            Lyte.Component.set(ltPropData[this._top], { body: ltPropContent[__boundary.bottom], index: __boundary.bottom })
                            topElem.dataOrder = __boundary.bottom;
                        }
                        __boundary.top = __boundary.bottom - ltPropData.length + 1;
                        if (this.cellSet(topElem)) {
                            this.regex(topElem)
                        } else {
                            this.cellSet(topElem, "translateY(" + (this._step) + 'px)')
                        }
                        __dummy.transform = 'translateY(' + (parseFloat( __dummy.transform.match(/[\d|.]+/ig)[0]) + __rowHgt ) + 'px)'
                        __dummy.height = Math.max(parseFloat( __dummy.height) - __rowHgt, 0) + 'px';
                        if (this._browser) {
                            __dummy1.transform = 'translateY(' + (parseFloat( __dummy1.transform.match(/[\d|.]+/ig)[0]) + __rowHgt ) + 'px)'
                        }
                        this._bottom = this._top;
                        this._top = (this._top + 1) % ltPropData.length;
                        if ( __boundary.bottom >= ltPropContent.length) {
                            __boundary.bottom = ltPropContent.length - 1;
                            this._top = (this._top + 1) % ltPropData.length;
                            break
                        }
                        topElem = this.nthoftype.call(this, obj.tbody, this._top + compNeg.length, true)
                    }
                } else {
                    this.scrollEndMethod1();
                }
            }

        } else if (b < 0) {
            var bottmElem = obj.bottmElem, bottom = obj.bottmElemClient;
            if (tableClient.bottom <= bottom.top) {
                var mat = this.cellSet(bottmElem).match(/[\d|.]+/ig);
                if (!mat || (mat && mat[0] == '0')) {
                    return
                }
                var diff = parseInt(Math.max(parseFloat((bottom.top - tableClient.bottom) / __rowHgt ), 0)),
                    minDiff = Math.max(diff - 1 - this._boundary.top, 0)
                for (var i = diff - 1; i >= 0 && diff != 0; i--) {
                    if ( __boundary.top == 0) {
                        break;
                    }
                    __boundary.top -= 1;
                    if (i <= ltPropData.length - 1 + minDiff) {
                        Lyte.Component.set(ltPropData[this._bottom], { body: ltPropContent[ __boundary.top], index: __boundary.top })
                        bottmElem.dataOrder = __boundary.top;
                    }
                    __boundary.bottom = __boundary.top + ltPropData.length - 1;
                    if (this.cellSet(bottmElem)) {
                        this.regex(bottmElem, true)
                    }
                    __dummy.height = (parseFloat( __dummy.height) + __rowHgt ) + 'px';
                    __dummy.transform = 'translateY(' + (parseFloat( __dummy.transform.match(/[\d|.]+/ig)[0]) - __rowHgt ) + 'px)'
                    if (this._browser) {
                        __dummy1.transform = 'translateY(' + (parseFloat( __dummy1.transform.match(/[\d|.]+/ig)[0]) - __rowHgt ) + 'px)'
                    }
                    this._top = this._bottom;
                    this._bottom = (ltPropData.length + this._bottom - 1) % ltPropData.length;
                    if (__boundary.top == -1) {
                        __boundary.top = 0;
                        __boundary.bottom = __boundary.top + ltPropData.length - 1;
                        break
                    }
                    bottmElem = this.nthoftype.call(this, obj.tbody, this._bottom + compNeg.length, true)
                }
            }
        }
    },

    createDummy : function( tbody ){
        var dummy = document.createElement('lyte-tr');
        dummy.classList.add('dummy');
        tbody.appendChild(dummy)
        dummy.setAttribute('style', 'transform:translateY(0px);height:0px')
        this._dummy = dummy;
        if (this._browser) {
            var dummy1 = document.createElement('div');
            dummy1.classList.add('dummy');
            this.scrollDiv.appendChild(dummy1)
            dummy1.setAttribute('style', 'transform:translateY(0px);height:5px')
            this._dummy1 = dummy1;
        }
    }, 

    regex: function (elem, flag) {
        if( this.isIE11Lyte || this.isEdgeLyte ){
            var cells = elem.getElementsByTagName( 'lyte-td' ),
            __length = cells.length;

            for( var i = 0; i < __length; i++ ){
                this.regex1( cells[ i ], flag );
            }
        } else {
            this.regex1( elem, flag );
        }
    },

    regex1: function (elem, flag) {
        var __style = elem.style,
        __transform = __style.transform,
        rgx = /[\d|.]+/ig,
        __step = this._step;

        if( flag ) {
            __style.transform = __transform.replace( rgx, function( arg ) { return Math.max( parseFloat( arg ) - __step, 0 ).toFixed( 3 ) });
        } else {
            __style.transform = __transform.replace( rgx, function( arg ) { return ( parseFloat( arg ) + __step ).toFixed( 3 ) });
        }
    },

    scrollEndMethod1: function () {
        if( this._stopScroll ) {
            return
        }
        this._stopScroll = true;
        if (this.getMethods('scrollEnd')) {
            /**
             * @method scrollEnd
             * @version 1.0.0
             */
            this.appendAddData1(this.executeMethod('scrollEnd'))
        }
    },

    appendAddData1: function (ret) {
        if (ret) {
            if (ret.then) {
                Promise.resolve(ret).then(function (arg) {
                    if (arg) {
                        this.apd1.call(this, arg);
                    }
                }.bind(this), function () {
                    console.log( 'error at scroll end promise' );
                }.bind(this));
            } else {
                this.apd1.call(this, ret)
            }
        }
    },

    apd1: function (ret) {
        var __data = this.data,
        ltPropContent = __data.ltPropContent, 
        ltPropData = __data.ltPropData,
        La = Lyte.arrayUtils;

        this._prevent = true
        if( ret.constructor == Array ){
            La( ltPropContent, 'concat', ret );
        } else if( ret.constructor == Object ) {
            La( ltPropContent, 'push', ret );
        }
        delete this._prevent;
        delete this._stopScroll;
    },

    nthoftype: function( tbody, index, fg ){
        var arr = [],
        rows = tbody.getElementsByTagName( 'lyte-tr' );

        if( fg ){
            return rows[ index ];
        }

        var __length = rows.length;

        for( var i = 0; i < __length; i++ ) {
            var __cur = rows[ i ];
            if( !__cur.classList.contains('dummy')) {
                arr.push( __cur.children[ index ] );
            }
        }
        return arr;
    },

    scroll: function (event) {

        // cant use fastdom because of jerk in ie edge safari browser
        var component = this.comp,
            // headerList =component.$node.querySelectorAll( 'lyte-th' ),
            // scrollleft and top are required for process like fixing columns and infinite scroll. If scroll is dispatched by plugin event object contains these properties or it is calculated
        obj = this._wheelObj || { bcr: {} };

        if( component.__ignore_scroll ){
            return;
        }

        this._scrollLeft = obj.scrollLeft != undefined ? obj.scrollLeft : this.scrollLeft;
        this._scrollTop = obj.scrollTop != undefined ? obj.scrollTop : this.scrollTop;
        
        var direction = this._direction,
        __is_not_sticky = !component.data.ltPropStickyTable;

        __is_not_sticky && component.scrollCheck.call(this, event, obj);

        if (this._scrollLeft == 0 && direction != 'rtl' && component.getData('ltPropInfiniteScroll')) {
            var ary = component.getData('columns');
            Lyte.arrayUtils(ary, 'remove', 0, ary.length);
            
            if( __is_not_sticky ){
                var fixedd = this.getElementsByClassName( 'lyteTableFixed' ),
                __length = fixedd.length;

                for( var i = 0; i < __length; i++ ) {
                    __cur = fixedd[ i ];

                    __cur.style.left = '0px';
                    __cur.classList.remove('lyteTableFixed');
                }
            }
        }
        if (component.data.ltPropInfiniteScroll) {
            component.scrollTable.call(component, event, obj)
        }
        delete this._scrollLeft; delete this._scrollTop;
    },

    // fixed column checks and removals
    scrollCheck: function (event, obj) {
        var table = this.getElementsByTagName('lyte-table-structure')[0], scrollDiv = this,
            scrollTop = this._scrollTop, scrollLeft = this._scrollLeft,
            scrollDir = this.parentElement.component.getData('ltPropScroll'),
            component = this.parentElement.component,
            direction = this._direction,
            tbody = table.getElementsByTagName('lyte-tbody')[0],
            thead = this.getElementsByTagName('lyte-thead')[0],
            ths = [],
            headerList = [],
            fixedColumn = [];

        if (thead) {
            ths = thead.getElementsByTagName('lyte-th');
        }

        if ((scrollTop != this.prevScollTop || event._byFunc) && scrollDir.vertical) {
            var colsNos = ths;
            if (colsNos.length) {
                for (var i = 0; i < colsNos.length; i++) {
                    colsNos[i].classList.add('tableRowFixed')
                    // colsNos[i].style.top = (scrollTop) + 'px';
                    component.transform(true, colsNos[i], scrollTop)
                }
                if (!scrollTop) {
                    for (var i = 0; i < colsNos.length; i++) {
                        colsNos[i].classList.remove('tableRowFixed');
                    }
                }
            }
        }
        // for horizontal scroll    
        if ((scrollLeft != this.prevScollLeft || event._byFunc) && scrollDir.horizontal) {
            var columns = component.data.columns, head = [];
            if (thead) {
                var headRows = Array.apply(Array, thead.getElementsByTagName('lyte-tr')),
                    headRowCopy = Array.apply(Array, thead.getElementsByClassName('lyteRowCopy'));
                head = headRows.concat(headRowCopy);
            }

            var ltPropFixedColumnClass = component.data.ltPropFixedColumnClass || '';
            if (head.length) {
                headerList = head[0].getElementsByTagName('lyte-th');
                for (var n = 0; n < headerList.length; n++) {
                    headerList[n].classList.contains('lyteFixedColumn') && fixedColumn.push(headerList[n]);
                }
            }
            // fastdom removed due to jerk in ie edge chrome browser
            for (var i = columns.length; i < fixedColumn.length; i++) {
                if (((fixedColumn[i].property.right + component.columnWidth.call(component, fixedColumn, i) > (obj.scrollDivClient.right)) && direction == 'rtl') || ((fixedColumn[i].property.left < (obj.scrollDivClient.left + component.columnWidth.call(component, fixedColumn, i))) && direction != 'rtl')) {
                    var width = fixedColumn[i].property.width
                    var order = fixedColumn[i].order
                    if (order + 1 < headerList.length) {
                        !fixedColumn[i].classList.contains('lyteTableFixed') && fixedColumn[i].classList.add('lyteTableFixed')
                        columns.push(fixedColumn[i])
                        for (var zz = 1; zz < head.length; zz++) {
                            var colex = head[zz].getElementsByTagName('lyte-th')[order];
                            colex && !colex.classList.contains('lyteTableFixed') && colex.classList.add('lyteTableFixed')
                        }
                        var colls = /*component.isIE11Lyte ? */component.nthoftype.call(component, tbody, order) /*: this.querySelectorAll( 'lyte-tbody lyte-td:nth-of-type(' + (order + 1) + ')' )*/
                        for (var k = 0; k < colls.length; k++) {
                            !colls[k].classList.contains('lyteTableFixed') && colls[k].classList.add('lyteTableFixed')
                            if (ltPropFixedColumnClass) {
                                colls[k].classList.add(ltPropFixedColumnClass)
                            }
                        }
                    }
                }
            }
            for (var n = columns.length - 1; n >= 0; n--) {
                j = columns.length - 1;
                if ((scrollLeft == 0 && !(window.chrome && direction == 'rtl')) || ((((parseFloat((headerList[columns[j].order + 1].property.right + columns[j].property.width + component.columnWidth.call(component, columns, columns.length - 1)).toFixed(2)) <= parseFloat(obj.scrollDivClient.right.toFixed(2))) || (headerList[columns[j].order + 1].property.right + 2 < columns[j].property.left)) && direction == 'rtl') || ((headerList[columns[j].order + 1].property.left >= (obj.scrollDivClient.left + columns[j].property.width + component.columnWidth.call(component, columns, columns.length - 1))) && (columns[j].property.left >= (obj.scrollDivClient.left + component.columnWidth.call(component, fixedColumn, columns.length - 1))) && direction != 'rtl'))) {
                    // var innerElem = headerList[columns[j].order].querySelector( 'lyte-th-data' );
                    headerList[columns[j].order].classList.contains('lyteTableFixed') && headerList[columns[j].order].classList.remove('lyteTableFixed');
                    if (ltPropFixedColumnClass) {
                        headerList[columns[j].order].classList.remove(ltPropFixedColumnClass)
                    }
                    // columns[j].style.removeProperty('left');
                    component.transform(false, columns[j], 0)
                    for (var zz = 0; zz < head.length; zz++) {
                        var colex = head[zz].getElementsByTagName('lyte-th')[columns[j].order];
                        if (colex) {
                            colex.classList.contains('lyteTableFixed') && colex.classList.remove('lyteTableFixed');
                            // colex.style.removeProperty('left');
                            component.transform(false, colex, 0)

                        }
                    }
                    var currCols = /*component.isIE11Lyte ?*/ component.nthoftype.call(component, tbody, columns[j].order) /*: this.querySelectorAll( 'lyte-tbody lyte-td:nth-of-type(' + (columns[j].order + 1) + ')' )*/;
                    for (var z = 0; z < currCols.length; z++) {
                        // currCols[z].style.removeProperty('left');
                        component.transform(false, currCols[z], 0)
                        currCols[z].classList.contains('lyteTableFixed') && currCols[z].classList.remove('lyteTableFixed')
                        if (ltPropFixedColumnClass) {
                            currCols[z].classList.remove(ltPropFixedColumnClass)
                        }
                    }
                    Lyte.arrayUtils(columns, 'removeAt', j)
                }
                else {
                    break;
                }
            }
            for (var j = 0; j < columns.length; j++) {
                //positioning on scroll
                var left, cells = /*component.isIE11Lyte ? */component.nthoftype.call(component, tbody, columns[j].order) /*: this.querySelectorAll( 'lyte-tbody lyte-td:nth-of-type(' + (columns[j].order + 1) + ')' )*/,
                    uA = navigator.userAgent.toLowerCase();
                if (j == 0) {
                    if (direction == 'rtl') {
                        if (uA.indexOf('firefox') != -1 || (uA.indexOf('safari') != -1 && (_lyteUiUtils.isNegativeScroll() || (!(uA.indexOf('chrome') != -1) && !(uA.indexOf('chromium') != -1))))) {
                            left = scrollLeft + (component.columnWidth.call(component, headerList, columns[j].order, 0))
                        }
                        else if (uA.indexOf('edge') != -1 || uA.indexOf('trident') != -1 || uA.indexOf('msie') != -1) {
                            left = -scrollLeft + (component.columnWidth.call(component, headerList, columns[j].order, 0))
                        }
                        else {
                            left = scrollLeft - 1 - (obj.scrollWidth) + obj.scrollDivClient.width + (component.columnWidth.call(component, headerList, columns[j].order, 0))
                        }
                    }
                    else {
                        left = scrollLeft - (component.columnWidth.call(component, headerList, columns[j].order, 0))
                    }
                }
                else {
                    if (direction == 'rtl') {
                        if (uA.indexOf('firefox') != -1 || (uA.indexOf('safari') != -1 && (_lyteUiUtils.isNegativeScroll() || (!(uA.indexOf('chrome') != -1) && !(uA.indexOf('chromium') != -1))))) {
                            left = /*parseInt(columns[j - 1].style.left)*/ component.transform(!1, columns[j - 1]) + component.columnWidth.call(component, headerList, columns[j].order, columns[j - 1].order + 1)
                        }
                        else {
                            left = /*parseInt(columns[j - 1].style.left)*/ component.transform(!1, columns[j - 1]) + component.columnWidth.call(component, headerList, columns[j].order, columns[j - 1].order + 1);
                        }
                    }
                    else {
                        left = component.transform(!1, columns[j - 1]) /*parseInt(columns[j - 1].style.left)*/ - component.columnWidth.call(component, headerList, columns[j].order, columns[j - 1].order + 1)
                    }
                }
                for (var x = 0; x < cells.length; x++) {
                    !cells[x].classList.contains('lyteTableFixed') && cells[x].classList.add('lyteTableFixed');
                    //cells[x].style.left = left + 'px';
                    component.transform(false, cells[x], left)
                }
                // columns[j].style.left = left + 'px';
                component.transform(false, columns[j], left)
                for (var zz = 0; zz < head.length; zz++) {
                    var colex = head[zz].getElementsByTagName('lyte-th')[columns[j].order];
                    if (colex) {
                        !colex.classList.contains('lyteTableFixed') && colex.classList.add('lyteTableFixed');
                        // colex.style.left = left + 'px';
                        component.transform(false, colex, left)
                    }
                }
            }
        }
        this.prevScollLeft = scrollLeft;
        this.prevScollTop = scrollTop;
    },

    transform: function (flag, elem, value) {
        var transform = (elem.style.transform || 'translateX(0px) translateY(0px)'),
            transX = parseFloat(/translateX\((.+)/.exec(transform)[1]),
            transY = parseFloat(/translateY\((.+)/.exec(transform)[1]);

        if (value != undefined) {
            if (!flag) {
                elem.style.transform = "translateY(" + transY + 'px) ' + 'translateX(' + value + 'px)';
            } else {
                elem.style.transform = "translateY(" + value + 'px) ' + 'translateX(' + transX + 'px)';
            }
        } else {
            return parseFloat(flag ? transY : transX);
        }
    },
    // border 

    borderChangeObs: function () {
        this.borderChange.call(this);
    }.observes('ltPropBorder').on('didConnect'),

    borderChange: function () {
        if (this.data.ltPropBorder) {
            this.$node.classList.add('border');
        }
        else {
            this.$node.classList.remove('border');
        }
    },

    widthObsObs: function () {
        this.widthObs.call(this);
    }.observes('ltPropWidth').on('didConnect'),

    widthObs: function () {
        this.$node.querySelector('lyte-table-structure').style.width = this.data.ltPropWidth;
    },

    heightObsObs: function () {
        this.heightObs.call(this);
    }.observes('ltPropHeight').on('didConnect'),

    heightObs: function () {
        this.$node.querySelector('lyte-table-structure').style.height = this.data.ltPropHeight;
    },

    sortableObs: function () {
        !this.data.ltPropStickyTable && this.sortable();
    }.observes('ltPropColumnSortable').on('didConnect'),

    sortable: function () {
        var row = this.$node.getElementsByTagName( 'lyte-thead' )[ 0 ];
        if( row ){
            var ns = "remove";

            if( this.data.ltPropColumnSortable ){
                this.colSort = this.sortableColumns.bind( this );
                ns = "add";
            }

            if( ns ){
                var rel = ns + "EventListener",
                fn = this.colSort;

                row[ rel ]( "mousedown", fn );
                row[ rel ]( "touchstart", fn );
                row.parentNode.classList[ ns ]( 'sortableTable' );
            }
        }
    },

    composePath: function( event ){
        var arr = [], 
        __target = event.target,
        node = __target.correspondingElement || __target;
        while( node && node.tagName != 'HTML' ){
            arr.push( node );
            node = node.parentNode;
        }
        return arr;
    },

    sortableColumns: function (event) {
        var target = this.closestFind.call(this, event.path ? event.path : this.composePath.call(this, event), 'lyte-th:not(.lyteTableFixed)');
        if (target && this.$node.contains(target)) {
            var ret, isTch = event.type == "touchstart";
            if (this.getMethods('onBeforeSelect')) {
                /**
                 * @method onBeforeSelect
                 * @version 1.0.3
                 */
                ret = this.executeMethod('onBeforeSelect', target, event, this.$node)
            }
            if (ret != false) {
                var evt = isTch ? event.touches[0] : event
                this._ww = window.innerWidth;
                this.mousemove = this.sortableMouseMove.bind(this);
                this.offLeft = this.rtlfunc.call(this, 'clientX', evt, this._ww) - this.rtlfunc.call(this, 'left', target.getBoundingClientRect(), this._ww);
                this.colHead = target;
                this._thisBccr = this.$node.getBoundingClientRect()
                target.classList.add('lyteStickyTableColumnSortSelect')
                document.documentElement.addEventListener(isTch ? "touchmove" : 'mousemove', this.mousemove);
                this.mouseup = this.sortableMouseup.bind(this);
                document.documentElement.addEventListener(isTch ? "touchend" : 'mouseup', this.mouseup);
                this.flag = true;
                event.preventDefault();
                if (this.getMethods('onSelect')) {
                    /**
                     * @method onSelect
                     * @version 1.0.3
                     */
                    this.executeMethod('onSelect', target, event, this.$node)
                }
            }
        }
    },

    horiScroll: function (dummyDiv, ww) {
        var lt = this.rtlfunc.call(this, 'left'), IE = this.isIE11Lyte || this.isEdgeLyte,
            isEvt, check1, check2;
        if (/mousemove|touchmove/i.test(dummyDiv.type)) {
            isEvt = true;
        }
        if (isEvt) {
            if (this._reqId) {
                return;
            }

            var __bcr = this.__bcr;

            check1 = this.rtlfunc( 'clientX', dummyDiv, ww ) > Math.min( this.rtlfunc( 'right', __bcr, ww), ww - 2 );
            check2 = this.rtlfunc( 'clientX', dummyDiv, ww ) <= Math.max( 0, this.rtlfunc('left', __bcr, innerWidth ) );
        } else {
            check1 = (parseFloat(dummyDiv.style[lt]) - this._xxoff + parseFloat(dummyDiv.style.width)) >= this.rtlfunc('right', this._thisBccr, ww) - 1;
            check2 = (parseFloat(dummyDiv.style[lt]) - this._xxoff + parseFloat(dummyDiv.style.width)) >= this.rtlfunc('right', this._thisBccr, ww) - 1;
        }

        if (check1) {
            this.scrollDiv.scrollLeft += 2 * (this._dir ? (-1 * (IE ? -1 : 1)) : 1)
            if (isEvt) {
                this.__clientX -= 2 * ( this._dir ? -1 : 1 );
            }
            this._reqId = window.requestAnimationFrame(function () {
                delete this._reqId;
                this.horiScroll(dummyDiv, ww)
            }.bind(this))
        } else if (check2) {
            if (isEvt) {
                this.__clientX += 2 * ( this._dir ? -1 : 1 );
            }
            this.scrollDiv.scrollLeft -= 2 * (this._dir ? (-1 * (IE ? -1 : 1)) : 1)
            this._reqId = window.requestAnimationFrame(function () {
                delete this._reqId;
                this.horiScroll(dummyDiv, ww);
            }.bind(this))
        } else {
            window.cancelAnimationFrame(this._reqId);
            delete this._prevent;
        }
    },

    sortableMouseMove: function (event) {
        var isTch = event.type == "touchmove", evt = event;
        if (isTch && evt.touches.length != 1) {
            return
        } else if (isTch) {
            evt = evt.touches[0]
        }
        if (this.flag && this._timeout == undefined) {
            var target = this.colHead, xscroll;
            var clientRect = target.getBoundingClientRect();
            var div = document.createElement('div');
            div.classList.add('lyteTableSortHelper');
            div.innerHTML = this.colHead.innerText;
            this._xxoff = xscroll = (window.pageXOffset || document.documentElement.scrollLeft) * (this._dir ? -1 : 1);
            var yscroll = window.pageYOffset || document.documentElement.scrollTop
            div.style.height = clientRect.height + 'px';
            div.style.width = clientRect.width + 'px';
            div.style[this.rtlfunc.call(this, 'left')] = (xscroll + this.rtlfunc.call(this, 'left', clientRect, this._ww)) + 'px';
            div.style.top = (yscroll + clientRect.top) + 'px';
            this._timeout = setTimeout(function () {
                document.body.appendChild(div);
                this.flag = false;
            }.bind(this), 100)
        }
        var dummyDiv = document.querySelector('div.lyteTableSortHelper')
        if (dummyDiv) {
            var lft = this._dir ? "right" : "left", ww = window.innerWidth;
            var newLeft = Math.max(Math.min((this.rtlfunc.call(this, 'clientX', evt, this._ww) - this.offLeft), this.rtlfunc.call(this, 'right', this._thisBccr, this._ww) - parseFloat(dummyDiv.style.width)), this.rtlfunc.call(this, 'left', this._thisBccr, this._ww));
            // if( ( newLeft > parseFloat( dummyDiv.style[ lft ] - this._xxoff ) ) || ( newLeft < parseFloat( dummyDiv.style[ lft ] ) - this._xxoff ) ){
            if ((parseFloat(newLeft) > this.rtlfunc('left', this._thisBccr, ww)) && ((parseFloat(newLeft) + parseFloat(dummyDiv.style.width)) < this.rtlfunc('right', this._thisBccr, ww))) {
                window.cancelAnimationFrame(this._reqId);
                delete this._prevent; delete this._scrollDir
            }
            if (this._prevent) {
                return
            }
            dummyDiv.style[lft] = (newLeft + this._xxoff) + 'px';
            this._prevent = true
            this.horiScroll(dummyDiv, ww)
            if (this.getMethods('onDrag')) {
                /**
                 * @method onDrag
                 * @version 1.0.3
                 */
                this.executeMethod('onDrag', this.colHead, dummyDiv, event, this.$node)
            }
        }
        event.preventDefault();
        event.stopPropagation();
    },

    sortableMouseup: function (event) {
        if (!this.flag) {
            var isTch = event.type == "touchend", dummyDiv = document.getElementsByClassName('lyteTableSortHelper')[0], clientRect = dummyDiv.getBoundingClientRect(), x = clientRect.left + clientRect.width / 2 + 2, y = clientRect.top + clientRect.height / 2,
                adjCol = this.closestFind.call(this, document.elementsFromPoint ? document.elementsFromPoint(x, y) : this.elementsFromPointCal.call(this, x, y), 'lyte-th:not(.lyteTableFixed)'),
                tbody = this.$node.getElementsByTagName('lyte-tbody')[0];
            if (adjCol != this.colHead && adjCol) {
                var Heads = this.colHead.parentElement.getElementsByTagName('lyte-th'),
                    colOrder = Array.prototype.indexOf.call(Heads, this.colHead),
                    adjOrder = Array.prototype.indexOf.call(Heads, adjCol),
                    ltPropHeader = this.data.ltPropHeader, ret;
                if (this.getMethods('onBeforeDrop')) {
                    /**
                     * @method onBeforeDrop
                     * @version 1.0.3
                     */
                    ret = this.executeMethod('onBeforeDrop', this.colHead, adjCol, colOrder, adjOrder, ltPropHeader, event, this.$node)
                }
                if (ret != false) {
                    if (!ltPropHeader.length) {
                        _lyteUiUtils.insertBefore(adjOrder > colOrder ? adjCol.nextElementSibling : adjCol, this.colHead);
                        var colGrp = /*this.isIE11Lyte ? */this.nthoftype.call(this, tbody, colOrder) /*: this.$node.querySelectorAll( 'lyte-tbody lyte-td:nth-of-type(' + ( colOrder + 1) +')' )*/;
                        var AdjColGrp = /*this.isIE11Lyte ?*/ this.nthoftype.call(this, tbody, adjOrder) /*: this.$node.querySelectorAll( 'lyte-tbody lyte-td:nth-of-type(' + ( adjOrder + 1) +')' )*/;
                        for (var i = 0; i < colGrp.length; i++) {
                            _lyteUiUtils.insertBefore(adjOrder > colOrder ? AdjColGrp[i].nextElementSibling : AdjColGrp[i], colGrp[i]);
                        }
                    }
                    else {
                        var flag = adjOrder > colOrder ? true : false;
                        var temp = Lyte.arrayUtils(ltPropHeader, 'removeAt', colOrder), newOrder = Array.prototype.indexOf.call(adjCol.parentElement.getElementsByTagName('lyte-th'), adjCol);
                        Lyte.arrayUtils(ltPropHeader, 'insertAt', colOrder < adjOrder ? (newOrder + 1) : newOrder, temp);
                        var newCol = adjCol.parentElement.getElementsByTagName('lyte-th', adjCol.parentElement)[colOrder < adjOrder ? (newOrder + 1) : newOrder];
                        if (adjCol.classList.contains('tableRowFixed')) {
                            newCol.classList.add('tableRowFixed');
                            newCol.style.top = adjCol.style.top;
                        }
                    }
                    if (this.getMethods('onDrop')) {
                        /**
                         * @method onDrop
                         * @version 1.0.3
                         */
                        this.executeMethod('onDrop', this.colHead, adjCol, colOrder, adjOrder, ltPropHeader, event, this.$node)
                    }
                }
            }
            document.body.removeChild(dummyDiv);
        } else {
            clearTimeout(this._timeout)
        }
        document.documentElement.removeEventListener(isTch ? "touchend" : 'mouseup', this.mouseup);
        document.documentElement.removeEventListener(isTch ? "touchmove" : 'mousemove', this.mousemove);
        this.colHead.classList.remove('lyteStickyTableColumnSortSelect')
        window.cancelAnimationFrame(this._reqId)
        delete this.mouseup; delete this._xxoff;
        delete this.mousemove;
        delete this.offLeft;
        delete this.colHead;
        delete this.flag;
        delete this._timeout;
        delete this._thisBccr; delete this._ww;
        delete this._reqId; delete this._prevent; delete this._scrollDir
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    },

    elementsFromPointCal: function (x, y) {
        var arr = [], element = document.elementFromPoint(x, y);
        while (element != document && element != document.documentElement && element != document.body && element != this.$node) {
            element.style.pointerEvents = 'none';
            arr.push(element);
            element = document.elementFromPoint(x, y);
        }
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.pointerEvents = 'initial';
        }
        return arr;
    },

    // resizeComponentAppendObs: function () {
    //     if (this.data.ltPropYield) {
    //         this.resizeComponentAppend.call(this);
    //     }
    // }.observes('ltPropResize', 'ltPropResize.{}'),

    // resizeComponentAppend: function () {
    //     var ltPropResize = this.data.ltPropResize, scrdiv = this.$node.getElementsByTagName('lyte-table-structure')[0],
    //         tRz = scrdiv.getElementsByTagName('lyte-table-resize')[0], vrz = scrdiv.getElementsByTagName('lyte-table-vertical-resize')[0],
    //         hrz = scrdiv.getElementsByTagName('lyte-table-horizontal-resize')[0];
    //     if (ltPropResize.vertical || ltPropResize.horizontal) {
    //         if (!tRz) {
    //             var comp = document.createElement('lyte-table-resize')
    //             scrdiv.appendChild(comp)
    //             comp.addEventListener('mousedown', this.actions.tableResize.bind(this));
    //             comp.addEventListener('touchstart', this.actions.tableResize.bind(this));
    //         }
    //     } else if (tRz) {
    //         scrdiv.removeChild(tRz)
    //     }
    //     if (ltPropResize.vertical) {
    //         if (!vrz) {
    //             var comp = document.createElement('lyte-table-vertical-resize')
    //             scrdiv.appendChild(comp)
    //             comp.addEventListener('mousedown', this.actions.tableResize.bind(this))
    //             comp.addEventListener('touchstart', this.actions.tableResize.bind(this));
    //         }
    //     }
    //     else if (vrz) {
    //         scrdiv.removeChild(vrz)
    //     }
    //     if (ltPropResize.horizontal) {
    //         if (!hrz) {
    //             var comp = document.createElement('lyte-table-horizontal-resize')
    //             scrdiv.appendChild(comp)
    //             comp.addEventListener('mousedown', this.actions.tableResize.bind(this))
    //             comp.addEventListener('touchstart', this.actions.tableResize.bind(this));
    //         }
    //     }
    //     else if (hrz) {
    //         scrdiv.removeChild(hrz)
    //     }
    // },

    data: function () {
        return {
            //user data
            /**
             * @componentProperty {object[]} ltPropContent
             * @version 1.0.0
             * @default []
             */
            ltPropContent: Lyte.attr("array", { "default": [] }),
            /**
             * @componentProperty {object[]} ltPropHeader
             * @version 1.0.0
             * @default []
             */
            ltPropHeader: Lyte.attr("array", { "default": [] }),
            /**
             * @componentProperty {string} ltPropId=''
             * @version 1.0.0
             */
            ltPropId: Lyte.attr("string", { "default": '' }),
            /**
             * @componentProperty {string} ltPropClass=''
             * @version 1.0.0
             */
            ltPropClass: Lyte.attr("string", { "default": '' }),
            /**
             * @componentProperty {boolean} ltPropBorder=false
             * @version 1.0.0
             */
            ltPropBorder: Lyte.attr("boolean", { "default": false }),
            /**
             * @componentProperty {string} ltPropHeaderLabelKey=''
             * @version 1.0.0
             */
            ltPropHeaderLabelKey: Lyte.attr("string", { "default": '' }),
            /**
             * @componentProperty {string} ltPropBodyLabelKey=''
             * @version 1.0.0
             */
            ltPropBodyLabelKey: Lyte.attr("string", { "default": '' }),
            /**
             * @componentProperty {string} ltPropWidth=100%
             * @version 1.0.0
             */
            ltPropWidth: Lyte.attr('string', { 'default': '100%' }),
            /**
             * @componentProperty {string} ltPropHeight=100%
             * @version 1.0.0
             */
            ltPropHeight: Lyte.attr('string', { 'default': '100%' }),
            /**
             * @typedef {object} tableResize
             * @property {boolean} horizontal
             * @property {boolean} vertical
             */

            /**
             * @componentProperty {tableResize} ltPropResize
             * @version 1.0.0
             * @default {}
             */
            ltPropResize: Lyte.attr('object', { 'default': {} }),
            /**
             * @componentProperty {string} ltPropFixedColumnClass=''
             * @version 1.0.0
             */
            ltPropFixedColumnClass: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {boolean} ltPropYield=false
             * @version 1.0.0
             */
            ltPropYield: Lyte.attr('boolean', { 'default': false }),
            /**
             * @typedef {object} tableScroll
             * @property {boolean} horizontal=true
             * @property {boolean} vertical=true
             */
            /**
             * @componentProperty {tableScroll} ltPropScroll
             * @default {"horizontal":true,"vertical":true}
             */
            ltPropScroll: Lyte.attr('object', { 'default': { horizontal: true, vertical: true } }),
            /**
             * @componentProperty {boolean} ltPropColumnSortable=false
             * @version 1.0.0
             */
            ltPropColumnSortable: Lyte.attr('boolean', { 'default': false }),
            /**
             * @typedef {object} tableScrollbar
             * @property {left | right} verticalPosition=left
             * @property {top | bottom} horizontalPosition=bottom
             * @property {string} containerClass
             * @property {string} handlerClass
             * @property {string} horizontalContainerClass
             * @property {string} horizontalHandlerClass
             * @property {string} verticalContainerClass
             * @property {string} verticalHandlerClass
             * @property {boolean} preventVertical
             * @property {boolean} preventHorizontal
             * @property {number} keyStep=30
             * @property {hover | always | scroll} showOn=scroll
             * @property {number} wheelSpeed=1
             * @property {boolean} preventOnEnd=true
             * @property {object} offset={"x":0,"y":0}
             * @property {boolean} nested
             * @property {number} max=Infinity
             * @property {number} min=-Infinity
             */
            /**
             * @componentProperty {tableScrollbar} ltPropScrollbarOption
             * @version 1.0.0
             * @default {}
             */
            ltPropScrollbarOption: Lyte.attr('object', { 'default': {} }),
            /**
             * @componentProperty {boolean} ltPropDualResize=false
             * @version 1.0.5
             */
            ltPropDualResize: Lyte.attr('boolean', { default: false }),

            // scroll table test data
            /**
             * @experimental ltPropData
             */
            ltPropData: Lyte.attr("array", { "default": [] }),
            /**
             * @componentProperty {boolean} ltPropInfiniteScroll=false
             * @version 1.0.0
             */
            ltPropInfiniteScroll: Lyte.attr('boolean', { 'default': false }),
            /**
             * @componentProperty {string} ltPropCellHeight=20px
             * @version 1.0.2
             */
            ltPropCellHeight: Lyte.attr('string', { default: '20px' }),
            /**
             * @componentProperty {number} ltPropContentLength
             * @version 1.0.2
             */
            ltPropContentLength: Lyte.attr('number'),
            /**
             * @componentProperty {boolean} ltPropPreventScrollbar=false
             * @version 1.0.0
             */
            ltPropPreventScrollbar: Lyte.attr('boolean', { default: false }),

            /**
             * @componentProperty {string} ltPropRole=""
             * @version 3.45.0
             */

            ltPropRole : Lyte.attr( 'string', { default : "" } ),

            // sticky table props
            /**
             * @componentProperty {boolean} ltPropStickyTable=false
             * @version 3.53.0
             */
            ltPropStickyTable : Lyte.attr( 'boolean', { default : false } ),
            /**
             * @componentProperty {number} ltPropScrollStep=2
             * @version 3.53.0
             */
            ltPropScrollStep : Lyte.attr( 'number', { default : 2 } ),
            /**
             * @componentProperty {boolean} ltPropPreventTableModify=true
             * @version 3.53.0
             */
            ltPropPreventTableModify : Lyte.attr( 'boolean', { default : true } ),
            /**
             * @componentProperty {string} ltPropSortDummyColumClass=""
             * @version 3.53.0
             */
            ltPropSortDummyColumClass : Lyte.attr( 'string', { default : "" } ),

            /**
             * @componentProperty {boolean} ltPropNavigation=false
             * @version 3.51.2
             */
            ltPropNavigation : Lyte.attr( 'boolean', { default : false } ),

            /**
             * @componentProperty {boolean} ltPropReset=false
             * @version 3.53.0
             */

            ltPropReset : Lyte.attr( 'boolean', { default : false } ),

            lyteUnbound: Lyte.attr('boolean', { default: false }),

            // system data
            columns: Lyte.attr('array', { 'default': [] }),
            nonFixedColumn: Lyte.attr('array', { 'default': [] }),
            minWidth1: Lyte.attr('string', { 'default': '' }),
            minWidth2: Lyte.attr('string', { 'default': '' }),
            secondaryData: Lyte.attr('array', { 'default': [] }),
            boundary: Lyte.attr('object', { 'default': {} }),
            rowHeights: Lyte.attr('array', { 'default': [] })
        }
    },

    resize_fun : function( evt ){
        var isTch = evt.type == "touchstart",
        __evt = evt,
        touches = evt.touches;

        if( isTch ){
            if( touches.length > 1 ){
                return;
            }
            __evt = touches[ 0 ];
        }

        evt.preventDefault();

        var __this = this,
        __bcr = __this.__bcr,
        __elem = __this.__elem,
        x_inc = ( __this.__clientX - ( __this.__clientX = __evt.clientX ) ) * ( __this._dir ? -1 : 1 ),
        y_inc = __this.__clientY - ( __this.__clientY = __evt.clientY ),
        __min1 = __this.__min1,
        __min2 = __this.__min2,
        __max1 = __this.__max1,
        __max2 = __this.__max2,
        __width = parseFloat( __elem.style.width ),
        new_width = __width - x_inc,
        new_height,
        __next = __elem.nextElementSibling,
        new_width2,
        cb = "onResizeMove",
        table = __this.__table,
        __resize = __this.data.ltPropResize,
        __dir = __this.__dir,
        is_hgt_modify = /vert|both/i.test( __dir || '' ),
        $node = $L( __this.$node );

        if( __dir ){
            if( !__resize.horizontal ){
                x_inc = 0;
            }

            if( !__resize.vertical ){
                y_inc = 0;
            }
        }

        if( __max1 && new_width > __max1 ){
            x_inc = __max1 - __width;
        } else if( __min1 && new_width < __min1 ){
            x_inc = __width - __min1;
        }

        if( !is_hgt_modify && __min2 != void 0 ){
            var __width2 = parseFloat( __next.style.width ),

            new_width2 = __width2 + x_inc;

            if( __max2 && new_width2 > __max2 ){
                x_inc = __width2 - __max2;
            } else if( __min2 && new_width2 < __min2 ){
                x_inc = __min2 - __width2;
            }

            new_width2 = __width2 + x_inc;
        } else {
            __next = void 0;
        }

        if( is_hgt_modify ){
            var __height = parseFloat( __elem.style.height );
            new_height = __height - y_inc;

            if( __max2 && new_height > __max2 ){
                y_inc = __max1 - __height;
            } else if( __min2 && new_height < __min2 ){
                y_inc = __height - __min2;
            }

            new_height = __height - y_inc;
        }

        new_width = __width - x_inc;

        if( table ){
           $L( table ).css( 'width', ( parseFloat( table.style.width ) - x_inc ) + 'px' );

        }

        $L( __elem ).css( 'width', new_width + 'px' );
        __next && $L( __next ).css( 'width', new_width2 + 'px' );

        if( __dir ){
            var ret = $node.css( 'maxWidth', new_width + 'px' );
            if( new_height ){
                ret.css( 'maxHeight', new_height + 'px' );
                $L( __elem ).css( 'height', new_height + 'px' );
            }
        }

        window.cancelAnimationFrame( __this._reqId );
        delete __this._reqId;

        __this.horiScroll( evt, __this.__ww );

        __this.data.ltPropStickyTable && __this._setLeftForInterSection();

        __this.getMethods( cb ) && __this.executeMethod( cb, __elem, evt, __this.$node );
    },

    resize_up : function( evt ){
        var isTch = evt.touches,
        __doc = document,
        __fn = 'removeEventListener',
        cb = 'onResizeEnd',
        __elem = this.__elem;

        __doc[ __fn ]( isTch ? 'touchmove' : 'mousemove', this.__mmove, true );
        __doc[ __fn ]( isTch ? 'touchend' : 'mouseup', this.__mup, true );

        [ '__dir', '__ww', '__min2', '__min1', '__max1', '__max2', '__clientX', '__clientY', '__elem', '__bcr', '__table' ].forEach( function( item ){
            delete this[ item ];
        }.bind( this ) );

        $L( this.$node ).removeClass( 'resizing lyteTableResizing' );
        $L( __elem ).removeClass( 'resizeSelect lyteTableResizeSelect' );

        this.clearfdm();

        /**
         * @method onResizeEnd
         * @version 1.0.3
         */

        this.getMethods( cb ) && this.executeMethod( cb, __elem, this.$node, evt );
    },

    actions: {

        tableResize : function( evt, from ){
            var isTch = evt.type == "touchstart",
            __evt = evt,
            touches = evt.touches;

            if( isTch ){
                if( touches.length > 1 ){
                    return
                }
                __evt = touches[ 0 ];
            }

            var  __this = this,
            table = __this.$node.getElementsByTagName( 'lyte-table-structure' )[ 0 ],
            __elem = from ? table : evt.target.parentNode,
            cb = "onBeforeResizeSelect";

            if( __this.getMethods( cb ) && __this.executeMethod( cb, __elem, evt, __this.$node ) == false ){
                return;
            }

            var tag = __elem.tagName,
            __data = __this.data,
            is_dual = __data.ltPropDualResize,
            fastdom = $L.fastdom,
            __maxwidth = table.style.maxWidth,
            __minWidth = table.style.minWidth,
            __maxheight = table.style.maxHeight,
            __layout = table.style.tableLayout,
            $table = $L( table ),
            __width = __elem.offsetWidth,
            is_cell = /lyte-th/i.test( tag ),
            nextelem = is_cell ? __elem.nextElementSibling : void 0,
            __next_width = nextelem ? nextelem.offsetWidth : 0,
            table_width = table.offsetWidth,
            scroll_elem = __this.scrollDiv,
            sL = scroll_elem.scrollLeft,
            is_vert = /vert|both/i.test( from || '' ),
            table_height = is_vert ? ( table.offsetHeight + 'px' ): table.style.height,
            $$node = $L( __this.$node ),
            table_style = window.getComputedStyle( table ),
            is_fixed = table_style.tableLayout == "fixed";

            __this.__ignore_scroll = true;

            __this.__bcr = __this.$node.getBoundingClientRect();
            __this.__ww = window.innerWidth;
            __this.__dir = from;

            if( is_cell && /%|px/i.test( table_style.minWidth ) ){
                var __arr = [];

                Array.from( __elem.parentNode.children ).forEach( function( item ){
                    __arr.push({
                        node : item,
                        width : item.style.width || ( item.offsetWidth + 'px' )
                    });
                });

                __arr.forEach( function( item ){
                    item.node.style.width = item.width;
                });
            }

            $table.css( {
                maxWidth :  '0px',
                tableLayout : "auto",
                minWidth : "auto"
            });

            if( is_vert ){
                $table.css( 'maxHeight', '0px' );
            }

            $$node.addClass( 'lyteTableInitialResize' );

            __this.__fd1 = fastdom.measure( function(){
                var __style = window.getComputedStyle( __elem ),
                actual_min = parseFloat( __style.getPropertyValue( 'min-width' ) ),
                minWidth1 = Math.min( __width, Math.max( __elem.offsetWidth, actual_min ) ),
                maxWidth1 = parseFloat( __style.getPropertyValue( 'max-width' ) ),
                minWidth2,
                maxWidth2;

                if( minWidth1 == 0 ){
                    minWidth1 = 50;
                }

                if( is_cell && is_fixed ){
                    minWidth1 = Math.min( minWidth1, actual_min );
                }

                if( maxWidth1 < minWidth1 ){
                    maxWidth1 = minWidth1;
                }

                if( is_cell ){
                    if( !is_dual ){
                        if( nextelem ){
                            var next_style = window.getComputedStyle( nextelem ),
                            actual_min_next = parseFloat( next_style.getPropertyValue( 'min-width' ) );

                            minWidth2 = Math.min( __next_width, Math.max( nextelem.offsetWidth, actual_min_next ) );
                            maxWidth2 = parseFloat( next_style.getPropertyValue( 'max-width' ) );

                            if( minWidth2 == 0 ){
                                minWidth2 = 50;
                            }

                            if( is_fixed ){
                                minWidth2 = Math.min( minWidth2, actual_min_next );
                            }

                            if( maxWidth2 < minWidth2 ){
                                maxWidth2 = minWidth2;
                            }
                        }
                    } else {
                        __this.__table = table;
                    }
                } else if( is_vert ){
                    maxWidth2 = parseFloat( __style.getPropertyValue( 'max-height' ) );
                    minWidth2 = parseFloat( __style.getPropertyValue( 'min-height' ) );
                }

                __this.__fd2 = fastdom.mutate( function(){
                    __this.__min1 = minWidth1;
                    __this.__min2 = minWidth2;
                    __this.__max1 = maxWidth1;
                    __this.__max2 = maxWidth2;

                    __this.__clientX = __evt.clientX;
                    __this.__clientY = __evt.clientY;

                    __this.__elem = __elem;

                    $table.css( {
                        maxWidth : __maxwidth,
                        width : table_width + 'px',
                        maxHeight : __maxheight,
                        height : table_height,
                        tableLayout : __layout,
                        minWidth : __minWidth
                    });

                    $L( __elem ).addClass( 'resizeSelect lyteTableResizeSelect' ).css( 'width', __width + 'px' );
                    nextelem && $L( nextelem ).css( 'width', __next_width + 'px' );

                    delete __this.__ignore_scroll;
                    scroll_elem.scrollLeft = sL;

                    var __doc = document,
                    __fn = "addEventListener";

                    __doc[ __fn ]( isTch ? 'touchmove' : "mousemove", __this.__mmove = __this.resize_fun.bind( __this ), true );
                    __doc[ __fn ]( isTch ? 'touchend' : "mouseup", __this.__mup = __this.resize_up.bind( __this ), true );

                    $$node.addClass( 'resizing lyteTableResizing' ).removeClass( 'lyteTableInitialResize' );

                    __this.getMethods( cb = "onResizeSelect" ) && __this.executeMethod( cb, __elem, evt, __this.$node );
                });
            });


            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
        }
    },

    clearfdm : function(){
        var __fastdom = $L.fastdom;

        [ '__fd1', '__fd2' ].forEach( function( item ){
            var __cur = this[ item ];

            if( __cur ){
                __fastdom.clear( __cur );
                delete this[ item ];
            }
        }.bind( this ) );
    },

    arrayFrom: function (nodeList) {
        if (Array.from) {
            return Array.from(nodeList)
        }
        return Array.apply(Array, nodeList);
    },

    closestFind: function (path, query) {
        var elements = this.arrayFrom.call(this, document.querySelectorAll(query));
        for (var i = 0; i < path.length; i++) {
            if (Array.prototype.indexOf.call(elements, path[i]) != -1) {
                return path[i];
            }
        }
        return null;
    },

    findDomIndex: function (order) {
        var data = this.data.ltPropData;
        for (var i = 0; i < data.length; i++) {
            if (data[i].index == order) {
                return i;
            }
        }
        return -1;
    },

    insertRow: function (index, insertData) {
        var boundary = this._boundary,
            top = boundary.top,
            bottom = boundary.bottom,
            content = this.data.ltPropContent,
            data = this.data.ltPropData;

        this._prevent = true;

        Lyte.arrayUtils(content, 'insertAt', index, insertData);

        if (index <= bottom) {
            var start = Math.max(top, index);

            for (var i = start; i <= bottom; i++) {
                var domIndex = this.findDomIndex(i);
                Lyte.Component.set(data[domIndex], { index: data[domIndex].index, body: content[i] });
            }
        }

        if( this.data.ltPropContentLength > content.length ){
            var _length = data.length;

            Lyte.arrayUtils( data, 'push', {
                index : _length,
                body : content[ _length ],
                checked : false
            });

            boundary.bottom++;
            this._bottom++;

            if( this._rowHgt ){
                this._step = this._rowHgt * data.length;
            }
        }

        delete this._prevent;
    },

    removeRow: function (dataIndex) {
        var rows = this.arrayFrom($L('lyte-tbody lyte-tr:not(.dummy)', this.$node));

        if (dataIndex.constructor != Number) {
            dataIndex = dataIndex.dataOrder || rows.indexOf(dataIndex);
        }

        var domIndex = this.findDomIndex(dataIndex),
            boundary = this._boundary,
            top = boundary.top,
            bottom = boundary.bottom,
            content = this.data.ltPropContent,
            data = this.data.ltPropData;

        this._prevent = true;

        if (domIndex != -1) {
            if (bottom == content.length - 1) {
                for (var i = dataIndex; i <= bottom; i++) {
                    var cIndex = (domIndex + (i - dataIndex) + data.length) % data.length;
                    if (i + 1 == content.length) {
                        this.regex(rows[cIndex], true);

                        if ( this._dummy ) {
                            var _style = this._dummy.style;
                            _style.transform = 'translateY(' + ( parseFloat( _style.transform.match( /[\d|.]+/ig)[ 0 ] ) - this._rowHgt ) + 'px)';
                            
                            if ( this._dummy1 ) {
                                var _style1 = this._dummy1.style;
                                _style1.transform = 'translateY(' + ( parseFloat( _style1.transform.match( /[\d|.]+/ig)[ 0 ] ) - this._rowHgt ) + 'px)';
                            }
                        }
                        if( content[ top - 1 ] ){
                            Lyte.Component.set(data[cIndex], { index: data[cIndex].index, body: content[top - 1] });
                            rows[ cIndex ].dataOrder = top - 1;
                        }
                    } else {
                        Lyte.Component.set(data[cIndex], { index: data[cIndex].index, body: content[i + 1] });
                        rows[cIndex].dataOrder--;
                    }
                }
                boundary.bottom--;
                boundary.top--;
                this._bottom = (this._bottom - 1 + data.length) % data.length;
                this._top = (this._top - 1 + data.length) % data.length;
            } else {
                for (var i = dataIndex; i <= bottom; i++) {
                    var cIndex = (domIndex + (i - dataIndex) + data.length) % data.length;
                    Lyte.Component.set(data[cIndex], { index: data[cIndex].index, body: content[i + 1] });
                }
                if (this._dummy) {
                    var _style = this._dummy.style;
                    _style.height = Math.max( 0, parseFloat( _style.height ) - this._rowHgt ) + 'px';
                }
            }
            Lyte.arrayUtils(content, 'removeAt', dataIndex);
        } else {
            Lyte.arrayUtils(content, 'removeAt', dataIndex);
            if (dataIndex < top) {

                for (var i = top; i <= bottom; i++) {
                    var cIndex = (this._top + i - top + rows.length) % rows.length;
                    Lyte.Component.set(data[cIndex], { index: data[cIndex].index, body: content[i == content.length ? (top - 1) : i] });
                    if (i == bottom) {
                        this.regex(rows[cIndex], true);
                        this._bottom = (this._bottom - 1 + data.length) % data.length;
                        this._top = (this._top - 1 + data.length) % data.length;
                    }
                }

                boundary.bottom--;
                boundary.top--;

                var _style = this._dummy.style;
                _style.transform = 'translateY(' + Math.max( 0, ( parseFloat( _style.transform.match(/[\d|.]+/ig)[ 0 ] ) - this._rowHgt ) ) + 'px)';
                if (this._dummy1) {

                    var _style1 = this._dummy1.style;
                    _style1.transform = 'translateY(' + Math.max( 0, ( parseFloat( _style1.transform.match( /[\d|.]+/ig )[ 0 ] ) - this._rowHgt ) ) + 'px)';
                }

            } else if (dataIndex > bottom) {
                if (this._dummy) {
                    this._dummy.style.height = Math.max(0, parseFloat(this._dummy.style.height) - this._rowHgt) + 'px';
                }
            }

        }

        if( content.length < this.data.ltPropContentLength ){
            Lyte.arrayUtils( data, 'pop' );
        }

        delete this._prevent;
    },

    scrollToRecord : function (rowIndex) {
        var content = this.data.ltPropContent,
            contentLength = content.length;

        if (rowIndex == undefined || rowIndex < 0 || rowIndex >= contentLength) {
            return;
        }

        if (!this._rowHgt) {
            this.$node.scrollTable();
        }

        $L.fastdom.clear(this._scrollToRecord);

        this._scrollToRecord = $L.fastdom.measure(this.processScrollToRecord.bind(this, rowIndex));

        // this.processScrollToRecord( rowIndex );
    },

    processScrollToRecord: function (rowIndex) {
        var boundary = this._boundary,
        top = boundary.top,
        bottom = boundary.bottom,
        content = this.data.ltPropContent,
        data = this.data.ltPropData,
        contentLength = data.length,
        length = content.length,
        step = this._step,
        rowHeight = this._rowHgt,
        scrollDiv = this.scrollDiv,
        offsetHeight = scrollDiv.offsetHeight,
        scrollHeight = scrollDiv.scrollHeight,
        scrollTop = scrollDiv.scrollTop,
        scrollPosition = Math.max(0, Math.min(rowIndex, content.length - contentLength)),
        newScrollTop = scrollPosition * rowHeight,
        scrollToSet;

        if( content.length <= contentLength ){
            scrollToSet = Math.max( 0, Math.min( scrollHeight - offsetHeight, rowIndex * rowHeight ) );
        } else if (bottom >= rowIndex) {
            scrollToSet = newScrollTop;
        } else {
            if (scrollPosition != rowIndex) {
                newScrollTop += (step - offsetHeight);
                var thead = $L('lyte-thead', this.$node).get(0);
                if (thead) {
                    newScrollTop += thead.getBoundingClientRect().height;
                }
            }

            var scrollHeight = scrollDiv.scrollHeight,
            maxScrollTop = scrollHeight - offsetHeight,
            diff = step - offsetHeight;

            if (newScrollTop <= maxScrollTop) {
                scrollToSet = newScrollTop;
            } else {
                var rows = this.arrayFrom($L('lyte-tbody lyte-tr:not(.dummy)', this.$node)),
                    fact = Math.floor(scrollPosition / contentLength),
                    newscrollPosition = scrollPosition % contentLength;

                for (var i = 0; i < contentLength; i++) {
                    var cIndex = scrollPosition + i,
                    domIndex = cIndex % contentLength,
                    dom = rows[i],
                    iteration = fact + (i < newscrollPosition ? 1 : 0);

                    Lyte.Component.set(data[domIndex], { index: cIndex, body: content[cIndex] });
                    this.cellSet(dom, "translateY(0px)")
                    for (var j = 0; j < iteration; j++) {
                        this.regex(dom);
                    }
                }

                if( !this._dummy ){
                    this.createDummy( this.$node.querySelector( 'lyte-tbody' ) );
                }

                this._dummy.style.transform = 'translateY(' + (scrollPosition * rowHeight) + 'px)';
                if (this._dummy1) {
                    this._dummy1.style.transform = 'translateY(' + (scrollPosition * rowHeight) + 'px)';
                }
                scrollToSet = newScrollTop;
                boundary.top = scrollPosition;
                boundary.bottom = scrollPosition + contentLength - 1;
                this._top = scrollPosition % contentLength;
                this._bottom = (scrollPosition + contentLength - 1) % contentLength;
            }
        }
        $L.fastdom.mutate(function () {
            scrollDiv.scrollTop = scrollToSet;
        })
    },

    update_aria : function( cell ){
        var row = cell.parentNode,
        index = Array.from( row.children ).indexOf( cell ),
        table = row.parentNode.parentNode,
        sA = "setAttribute",
        role = "role";

        table[ sA ]( role, this.data.ltPropRole );
        
        Array.from( table.children ).forEach( function( item ){

            if( /^div$/i.test( item.tagName || "" ) ){
                return;
            }

            item[ sA ]( role, "rowgroup" );

            var name = /lyte-thead/i.test( item.tagName ) ? 'columnheader' : 'cell';

            Array.from( item.children ).forEach( function( row ){
                row[ sA ]( role, 'row' );

                var __cell = row.children[ index ];

                if( __cell ){
                    __cell[ sA ]( role, name );
                }
            });
        });

    }

}, { mixins : [ 'lyte-table-utils' ] });

if (!_lyteUiUtils.registeredCustomElements['lyte-th']) {
    _lyteUiUtils.registeredCustomElements['lyte-th'] = true;
    /**
     * @customElement lyte-th,lyte-td
     */
    Lyte.createCustomElement("lyte-th", {
        static: {
            "observedAttributes": {
                get: function () {
                    return [ 'fixed', 'resize', 'icon', 'sticky-position' ];
                }
            }
        },

        getTable : function(){
            var query = "lyte-table";
            return ( this.__table || ( this.__table = this.closest ? this.closest( query ) : $L( this ).closest( query ).get( 0 ) ) );
        },

        getSticky : function(){
            var __sticky = this.__is_sticky;
            return __sticky == void 0 ? ( this.__is_sticky = this.getTable().ltProp( 'stickyTable' ) ) : __sticky;
        },

        connectedCallback : function(){
            var table = this.getTable();

            if( table && table.ltProp( 'role' ) && table.ltProp( 'yield' ) ){
                table.component.update_aria( this );
            }

            if( this.parentNode.previousElementSibling ){
                this.classList.add( "lyteTableSecondaryHeader" );
            }
        },

        "attributeChangedCallback": function (attr, oldVal, newVal) {

            var $node = $L( this );

            switch( attr ){
                case 'fixed' : {
                    var is_enable = newVal == "enable";

                    $node[ ( is_enable ? 'add' : "remove" ) + 'Class' ]( 'lyteFixedColumn' );
                    if( this.getSticky() ){
                        this.__table.component.checkIntersection.call( this, is_enable );
                    }
                }
                break;
                case 'resize' : {
                    var ns = 'lyte-tablehead-resize';
                    if( newVal == "enable" ){
                        var thead = document.createElement( ns ),
                        __add = "addEventListener",
                        fn = this.resize;

                        thead[ __add ]( 'mousedown', fn );
                        thead[ __add ]( 'touchstart', fn );

                        this.appendChild( thead );
                    } else {
                        var thead = this.getElementsByTagName( ns )[ 0 ];
                        if( thead ){
                            this.removeChild( thead );
                        }
                    }
                }
                break;
                case 'icon' : {
                    $node[ ( newVal == "disable" ? 'add' : "remove" ) + 'Class' ]( 'lytePreventIcon' );
                }
                break;
                case 'sticky-position' : {
                    if( $node.attr( 'fixed' ) == "enable" && this.getSticky() ){
                        var is_enable = newVal == "right",
                        __table = this.__table.component,
                        fn = is_enable ? 'add' : "remove",
                        __class = 'lyteTableRightFixed';

                        if( !is_enable && !$node.hasClass( __class ) ){
                            return;
                        }   

                        __table.stickyFunction( this, false, fn + 'Class', __class );
                        __table.checkIntersection.call( this, is_enable, true );
                    }
                }
            }
        },
        resize: function (event) {
            if (this.parentNode.classList.contains('lyteTableFixed')) {
                return;
            }
            var table = $L(event.target).closest('lyte-table')[0];
            table.component.actions.tableResize.call(table.component, event);
        },

        disconnectedCallback : function(){
            if( this.__is_sticky ){
                this.__table.component.disconnectedCallback.call( this );
            }
            delete this.__table;
        }
    });

    function resizeTable (evt) {
        if (evt && evt.type == 'resize' && _lyteUiUtils.isMobile) {
            return;
        }

        var fn = function( item ){
            var __elem = item.component.scrollDiv;
            __elem && $L( __elem ).resetScrollbar();
        },
        is_orient = evt && evt.type == "orientationchange";

        Array.from( document.body.getElementsByTagName( 'lyte-table' ) ).forEach( function( item ){
            if( is_orient ){
                setTimeout( fn.bind( this, item ), 500 );
            } else {
                fn( item );
            }
        });
    }
}


/**
 * @syntax nonYielded
 *   <lyte-table  lt-prop-content='[{"cityName" : "Agra","serialNo" : "1"},{"cityName" : "Mysore", "serialNo" : "2"}]' lt-prop-header='[{"data" : "From", "bodyData" : "cityName"},{"data" : "No", "bodyData" : "serialNo"}]' lt-prop-header-label-key='data' lt-prop-body-label-key='bodyData' >
 *   </lyte-table>
 */

/**
 * @syntax yielded
 * <lyte-table lt-prop-yield="true">
 *      <template is="registerYield" yield-name="yield">
 *          <lyte-table-structure>
 *             <lyte-thead>
 *                <lyte-tr>
 *                   <lyte-th>From</lyte-th>
 *                   <lyte-th>No</lyte-th>
 *                   <lyte-th>Name</lyte-th>
 *                </lyte-tr>
 *             </lyte-thead>
 *             <lyte-tbody>
 *                <lyte-tr>
 *                   <lyte-td>Agra</lyte-td>
 *                   <lyte-td>1</lyte-td>
 *                   <lyte-td>Tajmahal</lyte-td>
 *                </lyte-tr>
 *                <lyte-tr>
 *                   <lyte-td>Mysore</lyte-td>
 *                   <lyte-td>2</lyte-td>
 *                   <lyte-td>Mysorepalace</lyte-td>
 *                </lyte-tr>
 *             </lyte-tbody>
 *          </lyte-table-structure>
 *      </template>
 *  </lyte-table>
 */

/**
 * @syntax Infinite scroll
 * @attribute ltPropYield=true
 * @attribute ltPropInfiniteScroll=true
 *  <lyte-table style = 'height: 350px;' lt-prop-infinite-scroll = true lt-prop-yield = true lt-prop-content = {{contentJSON}} scroll-end = {{method('someMethod')}}>
 *   <template is = 'registerYield' yield-name = 'yield'>
 *       <lyte-table-structure>
 *           <lyte-thead>
 *               <lyte-tr>
*                  <lyte-th> From </lyte-th>
*                  <lyte-th> No </lyte-th>
*                  <lyte-th> Name </lyte-th>
 *              </lyte-tr>
 *           </lyte-thead>
 *           <lyte-tbody>
 *             <lyte-tr>
 *               <lyte-td> Agra </lyte-td>
 *               <lyte-td> 1 </lyte-td>
 *               <lyte-td> Taj Mahal </lyte-td>
 *             </lyte-tr>
 *              <lyte-tr>
 *               <lyte-td> Mysore </lyte-td>
 *               <lyte-td> 2 </lyte-td>
 *               <lyte-td> Mysore palace </lyte-td>
 *             </lyte-tr>
 *           </lyte-tbody>
 *       </lyte-table-structure>
 *   </template>
 *  </lyte-table>
 */
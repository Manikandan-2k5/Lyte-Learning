/**
 * This component is used to create draggable and resizable grids
 * @component lyte-gridstack
 * @version 1.0.0
 * @utility addGrid,removeGrid,setProperty,reRender
 * @methods onWindowResize,onDragStart,onBeforeSelect,onSelect,onBeforeDrop,onDrop,ondrag,onItemAdd,onPropertyChange,onScroll
 */


 /**
  * todo --> remove old mousemove codes. use new mousemove and logic functions for old flow too.
  */


Lyte.Component.register('lyte-gridstack', {
_template:"<template tag-name=\"lyte-gridstack\"> <lyte-yield yield-name=\"lyteGridStack\"> </lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropScope","ltPropHandler","ltPropMarginLeft","ltPropMarginTop","ltPropUnitX","ltPropUnitY","ltPropResizeDirection","ltPropFloat","ltPropDirection","ltPropUndo","ltPropResize","ltPropBestfit","ltPropMinUnitX","ltPropMinMarginLeft","ltPropBestfitClass","ltPropFreezeMode","ltPropDefaultLength","ltPropDefaultHeight","ltPropDefaultMinLength","ltPropDefaultMinHeight","ltPropDefaultMaxHeight","ltPropDefaultMaxLength","ltPropColumnMode","ltPropColumn","ltPropPrevent","ltPropGridLength","ltPropBestfitType","ltPropForcedReposition","ltPropSquareGrid","ltPropGridSpaceColor","ltPropHitBottom","ltPropGridSelectionClass","ltPropVisibleBoundary","ltPropVisible","ltPropCheckCurrentPosition","ltPropContainment","ltPropMaxGridHeight","ltPropScrollElement","ltPropIgnoreDrag","ltPropMaintainOrder","ltPropScrollValue","gridLength","ltPropGridHeight","ltPropMarginLeftCopy","ltPropUnitxCopy","lyteGridStack","elements","oriNode","xElements","yElements","iniData","lyteQuerySelector","direction"],

    init : function(){
        var uA = navigator.userAgent,
        __window = window,
        cb = 'beforeRender';

        this.isSaf = { 
            safari : !!__window.safari, 
            isIE11Lyte : /rv:11/ig.test( uA ), 
            isEdgeLyte : /Edge/ig.test( uA ), 
            chrome  : !!__window.chrome ,
            firefox : /firefox/ig.test( uA ) 
        };

        this.freeezeModeObs( this.data.ltPropFreezeMode );
       /**
        * @method beforeRender
        * @version 1.0.1
        */
        this.getMethods( cb ) && this.executeMethod( cb, this.$node );
    }, 
    didDestroy : function(){

        var rel = "removeEventListener",
        _this = this,
        $node = _this.$node,
        data = _this.data,
        __document = document,
        __window = window

        __document[ rel ]( 'keydown', data.lyteQuerySelector.keydown );
        __window[ rel ]( 'resize', _this._resizeFunc, true );
        __window[ rel ]( 'orientationchange', _this._resizeFunc, true );        
        __document[ rel ]( 'click', _this._click );
        $node[ rel ]( 'scroll', _this._scroll, true );
         
        delete _this.scopeElement; data.lyteGridStack = []; delete _this._scrollelem;
        delete $node.addGrid; delete $node.removeGrid; delete $node.reRender; delete $node.setProperty;
    },

    rtlfunc : function( lft, node ) {
        if( this.data.direction ) {
            if( lft == 'left' ){
                return 'right';
            } else if( lft == 'right' ){
                return 'left';
            } else if( node == 'clientX' ){
                return window.innerWidth - lft;
            } else if( node == 'bccr' ) {
                return window.innerWidth - lft.right
            } else {
                return node.offsetParent.getBoundingClientRect().right - node.getBoundingClientRect().right ;
            }
        }
        if( node == 'bccr' ) {
            return lft.left;
        }
        return node && node != 'clientX' ? node.offsetLeft : lft;
    },

    windowResize : function( evt ){
         if( evt && evt.type == 'resize' && _lyteUiUtils.isMobile ) {
            return;
        }

        var _this = this,
        __window = window;

        clearTimeout( __window._gridResize )
        __window._gridResize = setTimeout(function(){
            if( !_this.$node.offsetParent ) {
                return
            }

            var cb = 'onWindowResize',
            data = _this.data,
            gridLength = data.ltPropGridLength;

            if( gridLength != void 0 && !data.ltPropForcedReposition ){

                var minX = data.ltPropMinUnitX,
                wid = ( _this.bcrrelem = _this.scopeElement.getBoundingClientRect() ).width - ( gridLength + 1 ) * data.ltPropMarginLeft,
                temp1 = wid / gridLength;

                // var var data = _this.data,
                // minX = data.ltPropMinUnitX,
                // wid = ( _this.bcrrelem = _this.scopeElement.getBoundingClientRect() ).width - data.gridLength * data.ltPropMarginLeft,
                // temp1 = _this._initialXRatio * wid;

                _this.setData( 'ltPropUnitxCopy', Math.max( temp1, minX ) );

                if( data.ltPropSquareGrid ){
                    _this.__ingore = true;
                    _this.setData( 'ltPropUnitY', data.ltPropUnitxCopy );
                    delete _this.__ingore;
                }

                _this.MarginLeftAndXObs( true );
                _this.observerFunc(); 

                data.lyteGridStack.forEach( function( item ){
                 _this.set_individual_position( item );
               });
            } else {
                _this.MarginLeftAndXObs( true );
                _this.$node.reRender();
            }

            delete __window._gridResize;

            if( _this.getMethods( cb ) ){
                $L.fastdom.measure( function(){
                     $L.fastdom.mutate( function(){
                         _this.executeMethod( cb, event, _this.$node );
                    });
                });
            }
        }, evt && evt.type == "orientationchange" ? 500 : 250 );    
    },

    MarginLeft : function(){
       this.MarginLeftAndXObs.apply( this, arguments );
    }.observes('ltPropMarginLeft', 'ltPropUnitX'),

    MarginLeftAndXObs : function( flag ){

        var data = this.data,
        __unitxCopy = "ltPropUnitxCopy",
        __marginLeftCopy = "ltPropMarginLeftCopy",
        margin = data[ __marginLeftCopy ],
        unitx = data[ __unitxCopy ];

        if( flag && flag.constructor == Object ){
            this.setData( __unitxCopy, unitx = data.ltPropUnitX );
            this.setData( __marginLeftCopy, margin = data.ltPropMarginLeft );
        }

        this.setData( 'gridLength', Math.round( ( this.scopeElement.getBoundingClientRect().width - margin ) / ( unitx + margin ) ) );
    },

    squareGridObs :  function( arg ) {
        var ns = 'ltPropUnitY';

        if( arg.newValue) {
            this._originalY = this.getData( ns );
            this.setData( ns, this.data.ltPropUnitX );
        } else {
            if(this._originalY) {
                this.setData( ns, this._originalY );
                delete this._originalY;
            } else {
                this.setData( ns, 50 );
            }
        }
    }.observes( 'ltPropSquareGrid' ),

    obsfunc : function( arg ){

        if( this.__ingore ){
            return;
        }

        var __item = arg.item,
        __newValue = arg.newValue,
        __unitx = "ltPropUnitX",
        __unity = "ltPropUnitY";

        if( this.getData( 'ltPropSquareGrid' ) ){
            if( __item == __unitx ){
                this.setData( __unity, __newValue );
            }else if( __item == __unity ){
                this.setData( __unitx, __newValue );
            }
       }
      if(!this._prevObs){
            this.observerFunc.apply(this, arguments);
        }
    }.observes('ltPropUnitX', 'ltPropUnitY', 'ltPropMarginLeft', 'ltPropMarginTop'),

    observerFunc : function( flag ){
        this.initialValSet( null, !flag );
    },

    freezeobs : function(){
        this.freeezeModeObs.apply(this, arguments);
    }.observes('ltPropFreezeMode'),

    freeezeModeObs : function(){
        $L( this.$node )[ ( this.data.ltPropFreezeMode ? 'add' : "remove" ) + "Class" ]( 'gridFreezeMode' );
    },

    columnMode : function( arg ){
        var unitx = "ltPropUnitxCopy",
        data = this.data;

        if( arg.newValue ){
            this._originalX = data[ unitx ];
            if( arg.item != 'ltPropForcedReposition' ){
                this.columnModeLengthFind();
                this.setData( 'gridLength', this.gridLength( null, data[ unitx ] ) );
            }
            this.initialValSet();
        } else {
            var handQuer = data.ltPropHandler,
            iniData = data.iniData,
            elements = $L( this.scopeElement.querySelectorAll( handQuer ) ),
            __length = elements.length,
            unitcopy = data[ unitx ],
            _originalX = this._originalX,
            _unitns = "ltPropUnitX";

            for( var i = 0; i < __length; i++ ){
                var cur = iniData[ i ];
                for( var key in cur ){
                    var __value = cur[ key ];

                    if( __value ){
                        elements.eq( i ).attr( 'lyte-grid-' + key, __value );
                    }
                }
            }

            if( data[ _unitns ] == ( _originalX || unitcopy ) ){
                this.initialValSet( true );
            } else {
                this.setData( _unitns, ( _originalX || unitcopy ) );
            }

        }
    }.observes('ltPropColumn', 'ltPropColumnMode', 'ltPropForcedReposition' ),

    bestFitObs : function( arg ){
        $L( this._bestfit ).removeClass( arg.oldValue ).addClass( arg.newValue );
    }.observes('ltPropBestfitClass'),

    bfObs : function( arg ){
        var data = this.data,
        bf = data.ltPropBestfit,
        bftype = data.ltPropBestfitType,
        scopeElement = this.scopeElement,
        __bestfit = this._bestfit,
        __obj1,
        __obj2,
        __removeClass;

        if( bf && bftype == "grid" ){
            var color = data.ltPropGridSpaceColor,
            MarginLeft = data.ltPropMarginLeftCopy,
            marginTop = data.ltPropMarginTop,
            unitx = data.ltPropUnitX,
            unity = data.ltPropUnitY;

            __removeClass = 'addClass';
            __obj2 = {
                transform : "translate(-" + MarginLeft + "px,-" + marginTop +"px)"
            };
            __obj1 = {
                backgroundImage : 'linear-gradient(to right,' + color +' ' + MarginLeft + 'px,transparent 0px),linear-gradient(to bottom,'+ color + ' ' + marginTop + 'px,transparent 0px)',
                backgroundSize : ( unitx + MarginLeft ) + 'px ' + ( unity + marginTop ) + 'px'
            };

        } else if( !bf || bftype == "default" ){
            __obj1 = {
                backgroundImage : "",
                backgroundSize : ""
            };
            __removeClass = 'removeClass';
            __obj2 = {
                backgroundImage : "",
                backgroundSize : "",
                transform : ""
            };
        }

        if( __obj1 ){
            $L( scopeElement ).css( __obj1 );
            $L( __bestfit )[ __removeClass ]( 'lyteGrid' ).css( __obj2 );
        }

    }.observes( 'ltPropBestfit', 'ltPropBestfitType' ),

    lengthObs : function(){
        this.setData( 'gridLength', 0 );
        this.$node.reRender();
    }.observes('ltPropGridLength'),

    gridColorObs :  function( arg ){
        var data = this.data;

        if( data.ltPropBestfitType == "grid" && data.ltPropBestfit ){
            $L( this.scopeElement ).css( 'backgroundImage', 'linear-gradient(to right,' + arg.newValue + ' ' + data.ltPropMarginLeftCopy + 'px,transparent 0px),linear-gradient(to bottom,'+ arg.newValue + ' ' + data.ltPropMarginTop + 'px,transparent 0px)' );
        }
    }.observes('ltPropGridSpaceColor'), 

    dataSetting : function(elements1, i, columnMode, column,gridLength){
        var undef = void 0,
        data1 = {
            x : undef, 
            y : undef, 
            length : 1, 
            height : 1, 
            nodeName : '', 
            preX : [], 
            preY : [], 
            preLength : [], 
            preHeight : [], 
            component : undef
        },
        data = this.data,
        __ns = 'lyte-grid-';

        if( !columnMode ) {
            data1 = this.initialPosFind( elements1 );
        } else {
            var tem = parseInt( gridLength / column );
            data1.x = undef;
            data1.y = undef;
            data1.length = tem;
            data1.height = data1.height || parseInt( data.ltPropDefaultHeight );
            this._dopeHgt = data1.height;
        }    
        data1.nodeName = elements1;
        data1.nodeName.dataSet = {};
        data1.oldX = []; 
        data1.oldY = []; 
        data1.oldLength = []; 
        data1.oldHeight = []; 
        elements1.elemNum = i;

        data1.minLength = this.returnWid( elements1.getAttribute( __ns + 'min-length' ) || data.ltPropDefaultMinLength , true );
        data1.minHeight = this.returnWid( elements1.getAttribute( __ns + 'min-height' ) || data.ltPropDefaultMinHeight );
        data1.maxLength = this.returnWid( elements1.getAttribute( __ns + 'max-length' ) || data.ltPropDefaultMaxLength, true );
        data1.maxHeight = this.returnWid( elements1.getAttribute( __ns + 'max-height' ) || data.ltPropDefaultMaxHeight );
        
        data1.component = this;
        return data1;
    },

    append : function( element, classes, clsName, resizeDir ){
        $L.fastdom.mutate(function(){
             var divElem = document.createElement( 'div' ),
             name = classes[ clsName.indexOf( resizeDir ) ],
             __children = Array.from( element.children ).filter( function( item ){
                return item.classList.contains( name );
             });

             if( !__children.length ){
                divElem.setAttribute( 'class', name + " lyteGridResize" );
                element.appendChild( divElem );
            }
        });
    },

    maxPosFind : function( elements, lyteQuerySelector, columnMode, data, flag ){
        var b = [ 0 ],
        a = [ 0 ],
        c = [ 0 ],
        d = [ this.getData( 'gridLength' ) ],
        __math = Math;

        Array.from( elements ).forEach( function( item, index ){
            var cur = data[ index ];    

            if( !flag ){
                var retVal = this.emptySpaceFind( { length : cur.length, height : cur.height, x : cur.x, y : cur.y, nodeName : cur.nodeName } );
                if( !item._addGrid || columnMode || this.data.ltPropForcedReposition ){
                    cur.x = retVal[ 0 ].x;
                    cur.y = retVal[ 0 ].y;
                }

                delete item._addGrid;
            }

            a.push( cur.length );
            b.push( cur.height );
            c.push( cur.y + cur.height );
            d.push( cur.x + cur.length );
        }.bind( this ) );

        if( !flag ){
            this.previousPos( elements, true );
        }

        lyteQuerySelector.MaxLength = __math.max.apply( __math, a );
        lyteQuerySelector.MaxHeight = __math.max.apply( __math, b );
        lyteQuerySelector.MaxBottom = __math.max.apply( __math, c );
        lyteQuerySelector.MaxLeft = __math.max.apply( __math, d );
    },

    create_resize : function( elem ){
        var dirs = this.data.ltPropResizeDirection,
        __ns = 'lyteGridStack',
        classes = [
            __ns + 'Left', 
            __ns + 'Right', 
            __ns + 'Bottom', 
            __ns + 'BottomLeft', 
            __ns + 'BottomRight', 
            __ns + 'Top', 
            __ns + 'TopLeft', 
            __ns + 'TopRight'
        ],
        clsName = [
            'left', 
            'right', 
            'bottom', 
            'bottomLeft', 
            'bottomRight', 
            'top', 
            'topLeft', 
            'topRight'
        ];

        dirs.forEach( function( item ){
            if( clsName.indexOf( item ) + 1 ){
                this.append( elem, classes, clsName, item );
            }
        }.bind( this ) );
    },

    // default css construction and getting data from grids
    initialValSet : function( styleFlag, resizeFlag ){
        var __data = this.data,
        lyteQuerySelector = __data.lyteQuerySelector,
        data = __data.lyteGridStack,
        scope = this.scopeElement,
        unitX = __data.ltPropUnitxCopy,
        unitY = __data.ltPropUnitY,
        original_x = __data.ltPropUnitX,
        marginTop = __data.ltPropMarginTop,
        marginLeft = __data.ltPropMarginLeftCopy,
        gridLength = __data.gridLength,
        columnMode = __data.ltPropColumnMode,
        column = __data.ltPropColumn,
        bcr = this.bcrrelem || scope.getBoundingClientRect(),
        resizeDir = __data.ltPropResizeDirection,
        handler = __data.ltPropHandler,
        elements = scope.querySelectorAll( handler ),
        elem_count = [];

        $L.extend( lyteQuerySelector, {
            occupied : [],
            currentPos : 0,
            verticalMove : true,
            elementCount : elem_count
        });

        lyteQuerySelector.occupied = [];
        lyteQuerySelector.currentPos = 0;
        lyteQuerySelector.verticalMove = true;

        scope.dataSet = {};

        if( !resizeFlag ){
            Array.from( elements ).forEach( function( item, index ){
                data[ index ] = this.dataSetting( item, index, columnMode, column, gridLength );
                elem_count.push( index );

                if( __data.ltPropResize == true ){
                    if( $L( item ).attr( 'lyte-grid-resize' ) != 'disabled' && Array.from( item.children ).filter( function( __item ){ return __item.classList.contains( 'lyteGridResize' ); } ).length == 0 ){
                        this.create_resize( item );
                    }
                }
            }.bind( this ) );

            this.maxPosFind( elements, lyteQuerySelector, columnMode, data );
        }

        // if( this._initialWindowWidth == window.innerWidth ){
        //     this._initialXRatio = original_x / ( bcr.width - gridLength * marginLeft );
        // }

        var max_bottom = lyteQuerySelector.MaxBottom;

        $L.fastdom.mutate( function(){
            scope.style.height = ( max_bottom * unitY + ( ( max_bottom + 1 ) * marginTop ) ) + 'px';
            if( __data.ltPropBestfitType == "grid" && __data.ltPropBestfit ){
                var color = __data.ltPropGridSpaceColor;

                $L( scope ).css({
                    backgroundImage : 'linear-gradient(to right,' + color +' ' + marginLeft + 'px,transparent 0px),linear-gradient(to bottom,'+ color + ' ' + marginTop + 'px,transparent 0px)',
                    backgroundSize : ( unitX + marginLeft ) + 'px ' + ( unitY + marginTop ) + 'px'
                });

            }
        }.bind( this ) );

        if( !styleFlag ){
            var elem;

            $L( elements ).addClass( 'lyteGridstackHandler' );

            var __width = bcr.width,
            max_limit =  Math.max( gridLength, max_bottom ),
            __scope = __data.ltPropScope,
            escaped = handler.replace( /[.|#]/gi, '' ),
            elem,
            __left = this.rtlfunc( 'left' );

            // this._initialXRatio = unitX / ( __width - gridLength * marginLeft );
            this.setData( 'ltPropGridHeight', max_bottom );
        }

        this.displayGrid( null );  
    }, 
    // function for finding maximum height of the scope 
    maxHeight : function( data ){

        var __length = this.$node.querySelectorAll( this.data.ltPropHandler ).length,
        b = [],
        a = [],
        c = [],
        __math = Math;

        for( var i = 0; i < __length; i++ ){
            var cur = data[ i ];
            a.push( cur.length );
            b.push( cur.height );
            c.push( cur.y + cur.height );
        }

        return [ __math.max.apply( __math, a ), __math.max.apply( __math, b ), __math.max.apply( __math, c ) ];
    }, 
    // Checking and initiating css construction
    cssConstruct : function( target, attributeName, ignore ){
        var __data = this.data,
        data = __data.lyteGridStack,
        __scope = __data.ltPropScope,
        scope = this.scopeElement || this.$node.querySelector( __scope ),
        lyteQuerySelector = __data.lyteQuerySelector,
        elem,
        $target = $L( target ),
        gridHeight = this.returnWid( $target.attr( 'lyte-grid-height' ), null, target ),
        gridLength = this.returnWid( $target.attr( 'lyte-grid-length' ), true, target ),
        _x = parseInt( $target.attr( 'lyte-grid-x' ) ),
        _y = parseInt( $target.attr( 'lyte-grid-y' ) ),
        unitX = __data.ltPropUnitxCopy,
        unitY = __data.ltPropUnitY,
        marginTop = __data.ltPropMarginTop,
        marginLeft = __data.ltPropMarginLeftCopy,
        handler = __data.ltPropHandler,
        escaped = handler.replace( /[.|#]/gi, '' ),
        to_check,
        max_bottom = lyteQuerySelector.MaxBottom,
        ret = this.maxHeight( data ),
        new_grid_height = ret[ 2 ];

        if( __data.ltPropGridHeight != new_grid_height ){
            this.setData( 'ltPropGridHeight', new_grid_height );
        }

        max_bottom = lyteQuerySelector.MaxBottom = new_grid_height;

        if( !ignore ){
            this.set_individual_position( target.elemNum );
        }

        scope.style.height = ( max_bottom * unitY + ( ( max_bottom + 1 ) * marginTop ) ) + 'px';
    }, 
    // initiating css construction  
    setVal : function( target, attributeName, attributeValue, ignore ){
            // can't use fastdom here because of delay causes issue caching previous data

        target.setAttribute( attributeName, attributeValue );

        if( /^lyte-grid-(y|height|length|x)$/i.test( attributeName ) ){
            this.cssConstruct( target, attributeName, ignore );
        }
        target.dataSet[ attributeName ] = attributeValue;
    }, 
    // initiating css construction  and finding grid positions
    displayGrid :  function( x, flag ){
        var __data = this.data,
        __scope = this.scopeElement,
        elements = $L( __scope ).find( __data.ltPropHandler ),
        lyteQuerySelector = __data.lyteQuerySelector,
        data = __data.lyteGridStack,
        __length = elements.length,
        __ns = "lyte-grid-";

        for( var i = 0; i < __length; i++ ){
            if( ( x != i && !flag ) || ( flag && x == i ) ){
                var cur = elements.get( i ),
                eq = elements.eq( i ),
                cur_data = data[ i ];

                this.setVal( cur, __ns + 'y', cur_data.y, true );
                this.setVal( cur, __ns + 'x', cur_data.x, true );

                if( cur_data.length != eq.attr( __ns + 'length-old' ) ){
                    this.setVal( cur, __ns + 'length', cur_data.length, true );
                }
                if( cur_data.height != eq.attr( __ns + 'height-old' ) ){
                    this.setVal( cur, __ns + 'height', cur_data.height, true );
                }
                this.set_individual_position( i );
            }
        }

        __scope.dataSet[ 'lt-prop-grid-height' ] = lyteQuerySelector.MaxBottom;
        __scope.dataSet['lt-prop-grid-length'] = __data.gridLength;

        $L.fastdom.mutate(function(){
             this.positionFind( elements );
        }.bind( this ) );

        delete this.bcrrelem;
     }, 
    // To find all grid positions   
    positionFind : function( elements ){
        var __data = this.data;

        elements = elements || this.scopeElement.querySelectorAll( __data.ltPropHandler );

        var xCor = [],
        yCor = [],
        a = [],
        b = [],
        max,
        data = __data.lyteGridStack,
        __length = elements.length,
        __math = Math,
        LC = Lyte.arrayUtils;

        for( var i = 0; i < __length; i++ ){
            var cur = data[ i ];

            if( !cur ){
                continue;
            }

            a.push( cur.x + cur.length );
            b.push( cur.y + cur.height );
        }

        max = __math.max( __math.max.apply( __math, a ), __math.max.apply( __math, b ) );

        for( var j = 0; j <= max; j++ ){
            var  __length = data.length,
            x = [],
            y = [];

            for( var i = 0; i < __length; i++ ){
                var cur = data[ i ];
                if( cur.x <= j && j <= cur.x + cur.length ){
                    x.push( i );
                }
                if( cur.y <= j && j <= cur.y + cur.height ){
                    y.push( i );
                }
            }

            xCor.push( x );
            yCor.push( y );
        }

        var fn = function( arr, __value ){
            arr.splice( 0 );
            arr.push.apply( arr, __value );
        };

        fn(  __data.xElements, xCor );
        fn(  __data.yElements, yCor );

    }, 
    // To remove same elements from Checking    
    multipleRemoval : function( arr ){
        arr = arr || [];

        var _length = arr.length;

        for( var i = _length - 1; i > 0; i-- ){
            var value = arr[ i ],
            index = arr.indexOf( value );

            if( i != index ){
                arr.splice( i, 1 );
            }
        }

        return arr;
    }, 
    // To check elements in hori and vertical directions
    similarData : function ( arr1, arr2 ){
        var temp = [],
        is_undef1 = arr1 == void 0,
        is_undef2 = arr2 == void 0;

        if( is_undef1 && is_undef2 ){
            return [];
        }

        if( is_undef1 || is_undef2 ){
            return arr1 || arr2;
        }

        arr1.forEach( function( item ){
            if( arr2.indexOf( item ) + 1 ){
                temp.push( item );
            }
        });

        return temp;
    }, 
    // To find the other elements on selected element
    elementCheck : function( element, node, flag ){
        var elementsToCheck,
        i,
        __data = this.data,
        xElements = __data.xElements,
        off = 1,
        data = __data.lyteGridStack,
        nodeNum =   node.elemNum,
        cur = data[ nodeNum ],
        __x = cur.x;

        if( cur.length > 1 ){
            if( flag ){
                i = __x;
                off = 0;
            } else {
                i = __x + 1;
            }
            elementsToCheck = this.yElementsFind( i, __x + cur.length - off, xElements );       
        } else {
            elementsToCheck = this.similarData( xElements[ __x ], xElements[ __x + 1 ] );
        }

        return this.multipleRemoval( elementsToCheck || [] );
    }, 
    // To find clicked Pos
    nodeName : function( evt ){
        var type = evt.type,
        __target = evt.target,
        nodeName = $L( __target.correspondingElement || __target );

        if( nodeName.closest( 'lyte-gridstack' ).get( 0 ) != this.$node ){
            return null;
        }

        if( type == "click" ){
            var close = nodeName.closest( '.lyteGridstackHandler' );
            if( close.length ){
                return close.get( 0 );
            }
        } else if( type == "mousedown" || !type ){
            var resize = nodeName.closest( '.lyteGridResize' ),
            val,
            final;

            if( resize.length ){
                [ 'Left', 'Right', 'Top', 'Bottom', 'BottomRight', 'BottomLeft', 'TopRight', 'TopLeft' ].every( function( item ){
                    
                    if( resize.hasClass( 'lyteGridStack' + item ) ){
                        val = item;
                    }

                    return !val;
                });

                if( val ){
                    final = resize.get( 0 );
                }

            } else {
                var content = nodeName.closest( 'lyte-grid-content' );
                if( content.length ){
                    val = "content";
                    final = content.get( 0 );
                }
            }

            if( val ){
                return [ val, final.parentElement, this.scopeElement ];
            }
        }
        return null;
    },
    // updating value on every changes 
    valueUpdating : function( i, x, attributeName ){
        var data = this.getData( 'lyteGridStack' ),
        cur = data[ i ],
        node = cur.nodeName;

        if( cur[ x ] != node.dataSet[ attributeName ] ) {
            node.dataSet[ attributeName + '-old'] =  node.dataSet[ attributeName ];
            node.dataSet[ attributeName ] = parseInt( cur[ x ] );
        }
    }, 
    // Number of elements adjacent around selected elements
    bottomElementsCount : function( node, direction ){
        var x, 
        y, 
        length, 
        height, 
        yElements1, 
        xElements1, 
        offsetLeft, 
        initialLeft, 
        lytegridlength, 
        x, 
        ltPropMarginLeftCopy, 
        ltPropUnit;

        if( direction == 'vertical' ){
            x = 'y'; y = 'x'; length = 'height'; height = 'length'; yElements1 = 'xElements'; xElements1 = 'yElements'; offsetLeft = 'offsetTop'; lytegridlength = 'lyte-grid-height'; ltPropMarginLeftCopy ='ltPropMarginTop'; ltPropUnit = 'ltPropUnitY';
        } else{
            x = 'x'; y = 'y'; length = 'length'; height = 'height'; yElements1 = 'yElements'; xElements1 = 'xElements'; offsetLeft = 'offsetLeft'; lytegridlength = 'lyte-grid-length'; ltPropMarginLeftCopy ='ltPropMarginLeftCopy'; ltPropUnit = 'ltPropUnitxCopy';
        }
        var __data = this.data,
        data = __data.lyteGridStack, 
        yElements = __data[ yElements1 ], 
        xElements = __data[ xElements1 ], 
        elementsToCheck = [], 
        elementsToCheck1 = [], 
        elementsToCheck2 = [],
        index = node.elemNum,
        cur_data = data[ index ],
        fn = function( arr ){
            var __index = arr.indexOf( index );
            if( __index + 1 ){
                arr.splice( __index, 1 );
            }
            return arr;
        };

        if( cur_data[ length ] > 1) {
            elementsToCheck = this.yElementsFind( cur_data[ x ] + 1, cur_data[ x ] + cur_data[ length ] - 1, xElements );
        } else {
            elementsToCheck = this.similarData( xElements[ cur_data[ x ] ], xElements[ cur_data[ x ] + cur_data[ length ] ] );
        }  
        elementsToCheck1 = fn( this.multipleRemoval( elementsToCheck1.concat( yElements[ cur_data[ y ] + cur_data[ height ] ] ) ) );
        elementsToCheck2 = fn( this.multipleRemoval( elementsToCheck2.concat( yElements[ cur_data[ y ] ] ) ) );
        elementsToCheck = fn( this.multipleRemoval( elementsToCheck ) ); 

        return [ this.similarData( elementsToCheck, elementsToCheck1 ).length, this.similarData( elementsToCheck, elementsToCheck2 ).length ];
    },

     returnY : function(node, flag){
        var offtop, 
        margin, 
        unit, 
        ret,
        data = this.data;

        if(flag) {
            offtop = "offTop"; 
            margin = data.ltPropMarginTop;
            unit = data.ltPropUnitY;
        } else {
            offtop = "offLeft"; 
            margin = data.ltPropMarginLeftCopy;
            unit = data.ltPropUnitxCopy;
        }
        return  parseInt( ( ( node[ offtop ] - margin ) / ( unit + margin ) ).toFixed( 0 ) );
     }, 

     scrollCheckY : function( node , thisClientRect, unitY, nodeClientRect, innHgt, event, scrollWidth, scrollLeft, flag, flag2) {
        if( this._scrollCheck && !flag2) {
            return
        }
        var al, scrollTop = "scrollTop", topPos = "top", clientY = "clientY", bottom = "bottom", prevEvY = 'prevEvY', prevEvX = 'prevEvX', clientX = "clientX", width = "height", scrWid = "scrollHeight";

        if( flag ) {
            scrollTop = "scrollLeft"; topPos = "left"; clientY = "clientX"; bottom = "right"; prevEvY = 'prevEvX'; prevEvX = 'prevEvY'; clientX = "clientY"; width = "width"; scrWid = "scrollWidth";
        }

        var __width = thisClientRect[ width ];

        if( __width >= scrollWidth || Math.abs( __width - scrollWidth ) < 1 ){
            return
        }
        if( _lyteUiUtils.isIos && thisClientRect[ this.rtlfunc( bottom ) ] > innHgt ){
            return
        }
        function shouldPrevent( obj, sW, sL, mode, val, dir ){
            var wd = mode ? 'height' : 'width';
            if( ( val > 0 && sL  + obj[ wd ] >= sW  ) || ( val < 0 && -sL + obj[ wd ] >= sW ) ){
                return false
            } else if( !mode && this.isSaf.firefox && dir && ( val < 0 && sL == 0 ) ){
                return true
            } else if( ( val < 0 && sL == 0 ) && !( val < 0 && this.isSaf.safari && dir && sL == 0 ) ){
                return false;
            }
            return true
        }
        var __data = this.data,
        client_top = thisClientRect[ topPos ],
        client_bottom = thisClientRect[ bottom ],
        node_top = nodeClientRect[ topPos ],
        node_bottom = nodeClientRect[ bottom ],
        evt_y = event[ clientY ],
        node_y = node[ prevEvY ],
        check1 = Math.max( client_top, 0 ) > Math.min( node_top, evt_y ) && !( client_bottom < node_bottom ) && ( evt_y < node_y || node_y == void 0 ),
        check2 = Math.min( client_bottom, innHgt ) < Math.max( node_bottom, evt_y ) && !( client_top > node_top ) && ( evt_y > node_y || node_y == void 0 ),

        sT = this.$node[ scrollTop ], 
        isIE = ( this.isSaf.isEdgeLyte || this.isSaf.isIE11Lyte ) && __data.direction ? -1 : 1 ;
        
        if( check1 && shouldPrevent.call( this, thisClientRect, scrollWidth, scrollLeft, !flag, -unitY * isIE, __data.direction ) ) {
            this.$node[ scrollTop ] -= 1 * unitY * isIE; al = true;
        } else if( check2 && shouldPrevent.call( this, thisClientRect, scrollWidth, scrollLeft, !flag, unitY * isIE, __data.direction ) ) {
            this.$node[ scrollTop ] += 1 * unitY * isIE; al = true;
        } else {
            window.cancelAnimationFrame( this._reqId );
            delete this._reqId;
            delete  this._scrollCheck;
            node[ prevEvY ] = event[ clientY ]
            return;
        }
        if( al ) {
           this._scrollCheck = true;
           this._reqId = window.requestAnimationFrame( function() {
                nodeClientRect = node.getBoundingClientRect();
                this.scrollCheckY.call( this, node , thisClientRect, unitY, nodeClientRect, innHgt, event, scrollWidth, this.$node[ flag ? 'scrollLeft' : 'scrollTop' ], flag, true )
           }.bind( this ) ); 
        }
     },

    resetInitial : function( node, newoffleft, newofftop, offLeft, offTop ){
        var initialLeft = node.initialLeft,
        initialTop = node.initialTop;

        if( newoffleft > initialLeft && newoffleft < offLeft ){
            node.initialLeft = offLeft;
        } else if( newoffleft < initialLeft && newoffleft > offLeft ){
             node.initialLeft = offLeft;
        }

        if( newofftop > initialTop && newofftop < offTop ){
            node.initialTop = offTop;
        } else if( newofftop < initialTop && newofftop > offTop ){
            node.initialTop = offTop;
        }

    },


    checkLeftandWidth : function( left, nodeClientRect, MarginLeft, thisClientRect, newWidth ){
        var wid = newWidth == undefined ? nodeClientRect.width : newWidth;

        if( left + wid + MarginLeft > thisClientRect.width ){
            left = thisClientRect.width - MarginLeft - wid;
        }
        if( left < MarginLeft ) {
            left = MarginLeft;
        }
        return left;
    },

    checkTop : function( topPos, marginTop ){
        if( topPos < marginTop ) {
            topPos = marginTop;
        }
        return topPos;
    },

    widthcheck : function( tempWid, node, thisClientRect, marginLeft ){
        var __width = thisClientRect.width,
        __offleft = node.offLeft;

        if( __width - marginLeft < __offleft + tempWid ){
            tempWid = __width - marginLeft - __offleft;
        }
        return tempWid;
    },

    // Initial function on mousemove    
    mousemoveFun : function(element, event){
        // event.preventDefault()    
        if( this._scrollCheck ) {
            return
        }

        this._gridMoved = true;

        var __data = this.data,
        lyteQuerySelector = __data.lyteQuerySelector, 
        data = __data.lyteGridStack,
        selectedNodes = lyteQuerySelector.SelectedNodes,
        __length = selectedNodes.length,
        xPos = this.rtlfunc( event.clientX, 'clientX' ),
        yPos = event.clientY,
        elements = element.querySelectorAll( __data.ltPropHandler ),
        gridLength = __data.gridLength, 
        gridHeight = __data.ltPropGridHeight,
        xElements = __data.xElements,
        yElements = __data.yElements,
        unitX = __data.ltPropUnitxCopy, 
        unitY = __data.ltPropUnitY,
        marginTop = __data.ltPropMarginTop,
        MarginLeft = __data.ltPropMarginLeftCopy,  
        prevent = __data.ltPropPrevent,
        containment = __data.ltPropContainment,
        $node = this.$node,
        thisClientRect = $node.getBoundingClientRect(),
        innWid = window.innerWidth,
        innHgt = window.innerHeight,
        __left = this.rtlfunc( 'left' ),
        dont_prevent_vert = !prevent.vertical,
        dont_prevent_hori = !prevent.horizontal,
        not_float = !__data.ltPropFloat,
        check_current = __data.ltPropCheckCurrentPosition,
        node,
        valMove;

        if( !lyteQuerySelector.previousPosFind ) {
            lyteQuerySelector.previousPosFind = true;
            this.getMethods( 'onDragStart' ) && this.executeMethod( 'onDragStart', this.retNode( selectedNodes, data ), this.$node );
        }
        for( var z = 0;z < __length; z++ ) {  

                node = data[ selectedNodes[ z ] ].nodeName;

                var j, 
                k, 
                left, 
                flag = true, 
                stackElements = [], 
                stackElements1 = [], 
                flag1 = true, 
                flag2 = true, 
                elementsToCheck = [], 
                elementsToCheck1 = [], 
                btmEl, 
                btmEl1, 
                xIni = node.xPos,
                yIni = node.yPos,
                dumm,
                oldOffLeft = node.offLeft, oldOffTop = node.offTop,
                i = node.elemNum;

                var scrollWidth = $node.scrollWidth, 
                scrollHeight = $node.scrollHeight, 
                nodeClientRect = node.getBoundingClientRect(), 
                scrollLeft = $node.scrollLeft, 
                scrollTop = $node.scrollTop,
                scopeBcr = element.getBoundingClientRect(),
                cur_data = data[ i ],
                jnode = $L( node ),
                __initop = node.initialTop,
                __inileft = node.initialLeft,
                __offleft = node.offLeft = this.rtlfunc( 'offsetLeft', node ),
                __offtop = node.offTop = node.offsetTop;

                node.classList.add( 'lyteGridStackMove' );

                if( cur_data.length != parseInt( jnode.attr('lyte-grid-length') ) || cur_data.height != parseInt( jnode.attr( 'lyte-grid-height' ) ) || ( ( __offleft < __inileft ) && ( __offtop < __initop ) ) ) {
                    flag2 = true
                } else if( ( cur_data.x ) == parseInt( jnode.attr('lyte-grid-x' ) ) ) {
                    flag2 = false
                } else if( __offtop > ( __initop + unitY ) ) {
                    flag2 = false
                }           
                
                if( node.flag ){
                    left = xPos - xIni;
                    var topPos = yPos - yIni;
                    if( !prevent.horizontal ){
                        if( containment ){
                            left = this.checkLeftandWidth( left, nodeClientRect, MarginLeft, scopeBcr );
                        } 
                        node.style[ __left ] = left + 'px';
                        __offleft = node.offLeft = left;
                    }
                    if( !prevent.vertical ){
                        if( containment ){
                            topPos = this.checkTop( topPos, marginTop );
                        }
                        node.style.top = topPos + 'px'; 
                        __offtop = node.offTop = topPos;
                    }
                    var temppp = this.returnY( node );
                    if( temppp != cur_data.x ){
                        dumm = true
                    }
                    cur_data.x = Math.max( temppp, 0 );
                    cur_data.x = cur_data.x > ( gridLength - cur_data.length )? ( gridLength -cur_data.length) : cur_data.x;

                    if( cur_data.x < 0 ){
                        cur_data.length -= cur_data.x;
                        cur_data.x = 0;
                    }
                    this.scrollCheckY( node, thisClientRect, unitY, nodeClientRect, innHgt, event, scrollHeight, scrollTop)
                    this.scrollCheckY( node, thisClientRect, unitX, nodeClientRect, innWid, event, scrollWidth, scrollLeft, true )
                } else{
                    // resizing functions
                    var minWidth = ( cur_data.minLength * unitX + ( ( cur_data.minLength - 1 ) * MarginLeft ) ),
                    maxWidth = ( cur_data.maxLength * unitX + ( ( cur_data.maxLength - 1 ) * MarginLeft ) ),
                    minHgt = ( cur_data.minHeight * unitY + ( ( cur_data.minHeight - 1 ) * marginTop ) ),
                    maxHgt = ( cur_data.maxHeight * unitY + ( ( cur_data.maxHeight - 1 ) * marginTop ) ),
                    __value = node.value,
                    __xoff = node.xOff,
                    __yoff = node.yOff,
                    __bccr = this.rtlfunc( nodeClientRect, 'bccr' ),
                    __width = nodeClientRect.width,
                    __top = nodeClientRect.top,
                    __height = nodeClientRect.height;

                    if( dont_prevent_hori && ( [ 'Right', 'BottomRight', 'TopRight' ].indexOf( __value ) != -1 ) && ( __xoff + xPos - __bccr ) >= unitX ) {
                        var tempWid = __xoff + xPos - __bccr;
                        
                        if( maxWidth >= minWidth ){
                            tempWid = Math.min( Math.max( tempWid, minWidth ), maxWidth );
                        } else {
                            tempWid = Math.max( tempWid, minWidth );
                        }

                        if( containment ){
                            tempWid = this.widthcheck( tempWid, node, scopeBcr, MarginLeft );
                        }

                        node.style.width = tempWid + 'px';  

                        cur_data.length = Math.min( parseInt( ( ( tempWid + MarginLeft ) / ( MarginLeft + unitX ) ).toFixed( 0 ) ), gridLength - cur_data.x );

                    } else if( dont_prevent_hori && ( [ 'Left', 'BottomLeft', 'TopLeft' ].indexOf( __value ) != -1 ) && ( __xoff + Math.abs( xPos - __bccr - __width ) ) >= unitX ) {
                        var currentLeft = __offleft,
                        newLeft = xPos - xIni,
                        leftIncrease = newLeft - currentLeft,
                        newWidth = __width;

                        if( containment ){
                            newLeft = this.checkLeftandWidth( newLeft, nodeClientRect, MarginLeft, scopeBcr, __width - leftIncrease );
                        }

                        leftIncrease = newLeft - currentLeft;
                        newWidth -= leftIncrease;

                        if( newWidth > 0 && newWidth >= minWidth && (newWidth <= maxWidth || maxWidth < 0 ) ){
                            node.style.width = newWidth + 'px'
                            node.style[ __left ] = newLeft + 'px';
                            __offleft = node.offLeft = newLeft;
                        }

                         var leftToSet = Math.max( 0, this.returnY( node ) );

                         cur_data.length -= ( leftToSet - cur_data.x );
                         cur_data.x = leftToSet;  
                    }   
                        
                    if( dont_prevent_vert && ( [ 'BottomRight' , 'BottomLeft', 'Bottom' ].indexOf( __value ) != -1 ) && ( __yoff + yPos - __top ) >= unitY ) {
                        var tempHgt = node.yOff + yPos - __top,
                        to_set_hgt;
                        if( maxHgt >= minHgt ) {
                            to_set_hgt = Math.min( Math.max( tempHgt, minHgt ), maxHgt );
                        } else{
                            to_set_hgt = Math.max( tempHgt, minHgt );
                        }   
                        jnode.css( 'height', to_set_hgt + 'px' );

                        cur_data.height = parseInt( ( ( ( node.style.height ? parseInt( node.style.height ) : __height ) + marginTop ) / ( marginTop + unitY ) ).toFixed( 0 ) );                              
                    } else if( dont_prevent_vert && ( [ 'Top', 'TopRight', 'TopLeft' ].indexOf( __value ) != -1) && ( __yoff + Math.abs( yPos - __top - __height ) ) >= unitY ) {
                        var currentTop = __offtop,
                        newTop = yPos - yIni,
                        topIncrease,
                        newHeight = __height;

                        if( containment ){
                            newTop = this.checkTop( newTop, marginTop );
                        }

                        topIncrease = newTop - currentTop;
                        newHeight -= topIncrease;

                        if( newHeight > 0 && newHeight >= minHgt && ( newHeight <= maxHgt || maxHgt < 0 ) ){
                            jnode.css({
                                height : newHeight + 'px',
                                top : newTop + 'px'
                            });
                           
                            __offtop = node.offTop = newTop;
                        }

                         var topToSet = Math.max( 0, this.returnY( node, true ) );

                         cur_data.height -= ( topToSet - cur_data.y );
                        cur_data.y = topToSet;  
                   }        
                } 

                btmEl = this.bottomElementsCount( node, 'horizontal');
                btmEl1 = this.bottomElementsCount( node, 'vertical');

                if( dont_prevent_hori ){ 

                    if( __initop > node.offTop ) {
                        this.verticalMoveBottomToTop( element, node );
                    } else if( dont_prevent_hori < __offtop ){
                        this.verticalMoveTopToBottom( element, node );
                    }
                }   

                if( dont_prevent_hori ){
                    if( ( btmEl1[ 0 ] != 0 && ( __offleft > __inileft ) ) || !node.flag || ( btmEl1[ 1 ] != 0 && __inileft > node.offLeft && cur_data.height <= parseInt( jnode.attr( 'lyte-grid-height' ) ) ) || ( cur_data.length > node.dataSet['lyte-grid-length-old']) && cur_data.height <= parseInt( jnode.attr( 'lyte-grid-height' ) ) ){
                        this.topCheck( node, element );  
                        if( not_float ){
                            this.topMoveFunc( node, null, null, null, true );
                        }
                    }
                }
                  // offsets are continuously changing during mousemove and grid interchanges. so it is nescessary to calculate offsets 
                if( dont_prevent_vert ){
                    if( flag2|| ( btmEl[ 0 ] == 0 && __initop < __offtop ) || ( btmEl[ 1 ] == 0 && __initop > __offtop ) || not_float ) {
                        var temp = parseInt( ( ( __offtop - marginTop ) / ( unitY + marginTop ) ).toFixed( 0 ) );

                        if( [ 'Top', 'TopLeft', 'TopRight' ].indexOf( __value ) != -1 ) {
                             cur_data.y = temp
                        } else {
                            if( ( btmEl[ 0 ] == 0 && __initop < __offtop ) ) {
                                if( cur_data.y <= temp ) {
                                    cur_data.y = temp;
                                }
                            } else if( ( btmEl[ 1 ] == 0 && __initop > __offtop ) ){
                                if( cur_data.y >= temp ){
                                    cur_data.y = temp;
                                }
                            }
                        }
                        cur_data.y = Math.max( cur_data.y, 0 );
                    }
                }
                if( dumm || cur_data.x != parseInt( jnode.attr( 'lyte-grid-x' ) ) || cur_data.length != parseInt( jnode.attr( 'lyte-grid-length' ) ) || cur_data.height != parseInt( jnode.attr( 'lyte-grid-height' ) ) ){    
                    this.valueUpdating( i, 'x', 'lyte-grid-x');
                    this.valueUpdating( i, 'y', 'lyte-grid-y');
                    this.valueUpdating( i, 'length', 'lyte-grid-length');
                    this.valueUpdating( i, 'height', 'lyte-grid-height');       
                    this.positionFind( elements ); 
                    var l, 
                    count = 0, 
                    stackElements = [];

                    if( ( __inileft > __offleft || __inileft < __offleft ) || ( node.dataSet['lyte-grid-length-old'] > cur_data.length ) ){
                        elementsToCheck =  xElements[ cur_data.x ].concat( xElements[ cur_data.x + cur_data.length ] );
                    }  

                    elementsToCheck1 = this.yElementsFind( cur_data.y + cur_data.height, lyteQuerySelector.MaxBottom, yElements );    
                    elementsToCheck = this.multipleRemoval( this.similarData( elementsToCheck, elementsToCheck1 ) );

                    var remove__index = elementsToCheck;

                    if( remove__index != -1 ) {
                        elementsToCheck.splice( remove__index, 1 );
                    }

                     var for_length = elementsToCheck.length;

                    for( l = 0; l < for_length; l++ ) {
                        var __cur = data[ elementsToCheck[ l ] ];
                        if( cur_data.y + cur_data.height <= __cur.y + 1 ) {
                            if( ( ( ( __inileft > __offleft ) && __cur.x == cur_data.x + cur_data.length ) ) || ( ( __inileft < __offleft ) && cur_data.x == __cur.x + __cur.length ) || ( node.dataSet['lyte-grid-length-old'] - cur_data.length == 1 ) ){
                                valMove = this.heightGet( __cur.nodeName );
                                if( valMove ) {
                                    flag1 = false
                                    count = __cur.y;
                                    __cur.y = __cur.y - ( !not_float ? ( __cur.y - valMove < cur_data.y ) ? __cur.y - cur_data.y :valMove : valMove );

                                    this.valueUpdating( elementsToCheck[ l ], 'y', 'lyte-grid-y');
                                    this.positionFind( elements );
                                    this.topMoveFunc( __cur.nodeName, count, false, node );
                                    this.displayGrid( i );
                                    break;
                                }
                            }
                        }
                    }

                    if( ( cur_data.y < ( parseInt( jnode.attr( 'lyte-grid-y' ) ) ) || ( __initop - __offtop > parseInt( marginTop ) ) ) && not_float ){
                        this.topMoveFunc( node, parseInt( jnode.attr( 'lyte-grid-y' ) ), false, node );
                    }

                    var cur__height = cur_data.height;

                    if( ( cur__height > node.dataSet[ 'lyte-grid-height-old' ] && !node.flag ) ){
                        lyteQuerySelector.verticalMove = false;
                        jnode.attr( 'lyte-grid-height', cur__height );

                        this.verticalCheck( cur_data, cur_data.y + cur__height, cur_data.y + cur__height, node, true );
                        this.displayGrid( i );
                    } else if( ( cur__height < node.dataSet[ 'lyte-grid-height-old' ] && !node.flag ) ){
                        lyteQuerySelector.verticalMove = false;
                        jnode.attr('lyte-grid-height', cur__height);

                        this.topMoveFunc( node, cur_data.y, true );
                        this.displayGrid( i );
                    }       
                        // event.preventDefault();
                    if( not_float ){
                        this.topMoveAllGrid( node, data )
                    }

                    jnode.attr( "lyte-grid-length", cur_data.length );
                        
                } else if( check_current ) {
                    this.positionFind();
                }
            if( not_float ){
                valMove = this.heightGet( node );
            } else {
                valMove = 0
            }  
            this.getMethods( 'onDrag' ) && this.executeMethod( 'onDrag', node, event, $node );
            this.resetInitial( node, __offleft, __offtop, oldOffLeft, oldOffTop );
        }
        var bestFit = $L( this._bestfit );
        if( node && __data.ltPropBestfit && selectedNodes.length == 1 ) {
            this.setup_bestfit( node, data[ node.elemNum ], valMove );
        }
    },

    setup_bestfit : function( node, cur_data, valMove ){
        var __data = this.data,
        marginLeft = __data.ltPropMarginLeftCopy,
        marginTop = __data.ltPropMarginTop,
        unitX = __data.ltPropUnitxCopy,
        unitY = __data.ltPropUnitY,
        offsetBestfit = __data.ltPropBestfitType,
        bestFit = $L( this._bestfit ),
        __left = this.rtlfunc( 'left' ),
        new_top = cur_data.y - valMove,
        obj = {
            top : ( new_top * unitY + ( ( cur_data.y + 1 - valMove ) * marginTop ) ) + 'px',
            width : ( cur_data.length * unitX + ( cur_data.length - 1 ) * marginLeft + ( offsetBestfit == "grid" ? marginLeft : 0 ) ) + 'px',
            height : ( ( cur_data.height ) * unitY + ( cur_data.height - 1 ) * marginTop + ( offsetBestfit == "grid" ? marginTop : 0 ) ) + 'px',
            display : "block"
        };

        obj[ __left ] = ( cur_data.x * unitX + ( ( cur_data.x + 1 ) * marginLeft ) ) + 'px';

        if( offsetBestfit == 'grid' ){
            var color = __data.ltPropGridSpaceColor;

            obj.backgroundImage = 'linear-gradient(to right,' + color +' ' + marginLeft + 'px,transparent 0px),linear-gradient(to bottom,'+ color + ' ' + marginTop + 'px,transparent 0px)';
            obj.backgroundSize = ( marginLeft + unitX ) + 'px ' + ( unitY + marginTop ) + 'px';
            obj.transform = "translate(-" + ( __data.direction ? 0 : marginLeft ) + "px,-" + marginTop +"px)";
        }
        
        bestFit.css( obj ).attr( 'lyte-grid-y', new_top );
    },

    topMoveAllGrid : function(node, data, frm_delete ){
        // this.positionFind.call(this, elements)
        var __data = this.data,
        yElements = __data.yElements,
        __index = node.elemNum,
        cur_data = data[ __index ],
        __const = node.constructor == Number,
        max = __const ? ( node + ( frm_delete ? 2 : 0 ) ) : cur_data.y + cur_data.height * 2,
        max_bottom = __data.lyteQuerySelector.MaxBottom,
        elementCount = this.similarData( this.elementSorting( this.yElementsFind( __const ? node : ( cur_data.y + cur_data.height ), Math.min( max_bottom, isNaN( max ) ? max_bottom : max ), yElements ) ) );

        for(var j = 0; j < elementCount.length; j++){
             var cur = elementCount[ j ],
             el_data = data[ cur ];

            if( cur != __index ){
                var htmve = this.heightGet( el_data.nodeName );
                if( htmve ) {
                    el_data.y = el_data.y - htmve/*( this.getData('ltPropFloat')? htmve >= data[node.elemNum].height ? data[elementCount[j]].y - data[node.elemNum].y :htmve : htmve )*/
                    this.valueUpdating( cur, 'y', 'lyte-grid-y' );
                    this.topMoveFunc( el_data.nodeName, el_data.y );
                    this.displayGrid( cur, true );
                }
            }

        }
    },
    // check for movement from bottom to top
    verticalMoveBottomToTop : function(element, node){
            $L.fastdom.measure(function(){
                var topElements = [], 
                i, 
                temp1 = 0, 
                flag = true, 
                elementsToCheck = [], 
                elementsToCheck1 = [],
                __data = this.data,
                ltPropFloat = __data.ltPropFloat, 
                ltPropMarginTop = __data.ltPropMarginTop,
                data = __data.lyteGridStack,
                forceTop = __data.ltPropCheckCurrentPosition,
                __index = node.elemNum,
                ori_data = data[ __index ],
                ini_top = node.initialTop;

                elementsToCheck = this.elementCheck( element, node );
                temp1 = forceTop ? this.returnY( node, true ) : ori_data.y ;
                elementsToCheck1 = __data.yElements[ Math.max( 0, temp1 ) ];
                // offsets are continuously changing during mousemove and grid interchanges. so it is nescessary to calculate offsets 
                var nodeOff = node.offTop;
                if( elementsToCheck1 ){
                    elementsToCheck = this.similarData( elementsToCheck, elementsToCheck1 );
                }

                var index = elementsToCheck.indexOf( __index );

                if( index + 1 ){
                    elementsToCheck.splice( index, 1 );
                }

                elementsToCheck.forEach( function( item ){
                    var cur_data = data[ item ],
                    __node = cur_data.nodeName,
                    topPos = __node.offsetTop,
                    __height = __node.offsetHeight,
                    allow;

                    allow = forceTop ?
                           ( ( nodeOff < ( topPos + __height - 0.5 * ltPropMarginTop ) ) && ( nodeOff > ( topPos + ltPropMarginTop ) || temp1 <= 0 ) &&( temp1 < cur_data.y + cur_data.height && ( temp1 > cur_data.y || temp1 <= 0 ) ) && ( ini_top > nodeOff ) ) :
                           ( ( nodeOff < ( topPos + __height - 0.5 * ltPropMarginTop ) ) && ( nodeOff > ( topPos + ltPropMarginTop ) ) &&( ori_data.y == cur_data.y + cur_data.height ) && ( ini_top > nodeOff ) )

                        if ( allow ) {
                            topElements.push( item );
                        }

                });

                if( topElements.length ){
                        topElements = this.elementSorting( topElements );

                        this._occupied = topElements.slice();

                        var __length = topElements.length;

                        for( var i = 0; i < __length; i++ ){
                            var cur_data = data[ topElements[ i ] ],
                            ht = this.heightGet( node, cur_data.nodeName );

                            if( ltPropFloat ){
                                ht = Math.min( cur_data.height, ht );
                            }

                            var iniHgt = cur_data.y + cur_data.height;

                            if( !/top/i.test( node.value ) ){
                                ori_data.y = iniHgt - ht;
                                this.valueUpdating( __index, 'y', 'lyte-grid-y' );
                            }

                            var temp = ( ori_data.y + ori_data.height ) < ( cur_data.y - this.heightGet( cur_data.nodeName) ) ? ( cur_data.y - this.heightGet( cur_data.nodeName ) ) : ( ori_data.y + ori_data.height );

                            this.verticalCheck( cur_data, iniHgt, temp + cur_data.height, node, true );

                            cur_data.y = temp;

                            this.valueUpdating( topElements[ i ], 'y', 'lyte-grid-y' );

                            
                            if( !ltPropFloat ){
                                if( ( i == topElements.length - 1 && i != 0 ) ){
                                    this.topMoveFunc( node, ori_data.y + ht, false );
                                }
                                this.topMoveFunc( cur_data.nodeName, cur_data.y, true );
                            } 
                        }

                        delete this._occupied;
                        this.displayGrid();
                    }  
        }.bind( this ) )        
    }, 
    // check for movement top to bottom
    verticalMoveTopToBottom : function(element, node){
            $L.fastdom.measure(function(){
                var topElements = [], 
                bottomElements = [], 
                i, 
                j, 
                temp1, 
                flag = true, 
                elementsToCheck = [], 
                elementsToCheck1 = [], 
                upHeight = 0,
                __data = this.data,
                data = __data.lyteGridStack,
                ltPropUnitY = __data.ltPropUnitY,
                forceTop = __data.ltPropCheckCurrentPosition,
                index = node.elemNum,
                ori_data = data[ index ],
                hitbottom = !__data.ltPropHitBottom,
                margintop = __data.ltPropMarginTop,
                offtop = node.offTop,
                initialTop = node.initialTop,
                initialLeft = node.initialLeft,
                clientWidth = node.clientWidth,
                not_float = !__data.ltPropFloat,
                $node = $L( node );

                elementsToCheck = this.elementCheck( element, node );
                temp1 = ori_data.y;
                elementsToCheck1 = __data.yElements[ ( forceTop ? this.returnY( node, true ) : temp1 ) + ori_data.height ];

                if( elementsToCheck1 ) {
                    elementsToCheck = this.similarData( elementsToCheck, elementsToCheck1 );
                }

                var __index = elementsToCheck.indexOf( index );

                if( __index + 1 ){
                    elementsToCheck.splice( __index, 1 );
                }

                var __length = elementsToCheck.length;

                for( i = 0; i < __length; i++ ) {
                    // height and other grids offset are required here
                    var __cur = elementsToCheck[ i ],
                    cur_data = data[ __cur ],
                    nodeName = cur_data.nodeName,
                    topPos = nodeName.offsetTop, 
                    height = nodeName.offsetHeight, 
                    left =  this.rtlfunc( 'offsetLeft', nodeName ), 
                    width = nodeName.offsetWidth, 
                    nodeHgt = node.offsetHeight,
                    allow;

                    allow = forceTop ? 
                            ( ( offtop  > ( topPos + ( hitbottom ? ( margintop - nodeHgt ) : ( height - margintop ) ) ) ) && ( initialTop <= offtop ) ) :
                            ( ( offtop > (topPos + ( hitbottom ? ( margintop - nodeHgt ) : ( height - margintop ) ) ) ) && ( initialTop <= offtop ) && ( ( left + width > initialLeft ) && ( initialLeft + clientWidth > left ) && ( initialTop + nodeHgt < topPos || initialTop > topPos + height ) ) ); 


                    if( allow ){
                        topElements.push( __cur );
                    }
                }

                if( topElements.length ) { 
                    var arr = [], 
                    max,
                    __length = topElements.length;

                    for( i = 0; i < __length; i++ ) {
                        var cur_data = data[ topElements[ i ] ];
                        arr.push( cur_data.height + cur_data.y );
                    }
                    var ht = arr.reduce(function(a, b){
                        return Math.max(a, b);
                    });        

                    for( var j = 0; j < topElements.length; j++ ) {
                        var cur = topElements[ j ],
                        cur_data =  data[ cur ];
                        if( not_float ) {
                            upHeight = this.heightGet( cur_data.nodeName, node ); 
                            if( upHeight ){
                                cur_data.y -= upHeight;
                                this.valueUpdating( cur, 'y', 'lyte-grid-y' );
                                if( j == 0 ) {
                                    ht = cur_data.height + cur_data.y;
                                } else {
                                    var prev = data[ topElements[ j - 1 ] ];
                                    ht = ( cur_data.height + cur_data.y) > ( prev.height + prev.y ) ? ( cur_data.height + cur_data.y ) : ( prev.height + prev.y );
                                }
                            }
                            ori_data.y = ht
                            if( i == __length -1 || i != 0 ) {
                                this.topMoveFunc( cur_data.nodeName );
                            }   
                        } else {
                            ori_data.y = parseInt( ( ( node.offsetTop - ltPropUnitY ) / ( ltPropUnitY + __data.ltPropMarginTop ) ).toFixed( 0 ) );
                            this.verticalCheck( ori_data, parseInt( $node.attr( 'lyte-grid-y' ) ) + ori_data.height, ori_data.y + ori_data.height, node, true );
                        }
                    }
                    this.valueUpdating( index, 'y', 'lyte-grid-y' );
                    this.verticalCheck( ori_data, parseInt( $node.attr( 'lyte-grid-y' ) ) + ori_data.height, ori_data.y + ori_data.height, ori_data.nodeName, true );
                    this.displayGrid()
                }  
            }.bind( this ) )                   
    }, 
    // to check any free space available above the particular grid
    heightGet : function(node, oldNode,flag){
        var index = node.elemNum;
        if( index >= 0 ) {
            var topElements = [], 
            i, 
            j, 
            temp = 0, 
            elementsToCheck = [], 
            elementsToCheck1 = [], 
            __data = this.data,
            data = __data.lyteGridStack;

            if( !oldNode ) {
                oldNode = node
            }
            var xElements = __data.xElements,
            yElements = __data.yElements,
            cur_data = data[ index ];

            if( cur_data.length > 1 ) {
                elementsToCheck = this.yElementsFind( cur_data.x + 1, cur_data.length + cur_data.x - 1, xElements );
            } else {
                elementsToCheck = this.similarData( xElements[ cur_data.x ], xElements[ cur_data.x ] );
            } 

            for( var k = cur_data.y + cur_data.height - 1; k >= 0; k--) {
                elementsToCheck1 = this.yElementsFind( 0, cur_data.y + cur_data.height - 1, yElements );
            }   

            elementsToCheck = this.multipleRemoval( this.elementSorting( this.similarData( elementsToCheck, elementsToCheck1 ) ) );

            var __index = elementsToCheck.indexOf( index ),
            __length = elementsToCheck.length;

            if( __index + 1 ){
                elementsToCheck.splice( __index, 1 );
                __length--;
            }

            for( i = 0; i < __length; i++ ) {
                var cur = elementsToCheck[ i ],
                ori_data = data[ cur ];

                if( cur != oldNode.elemNum || flag ) {
                    if( cur_data.y >= ori_data.y ) {
                        if( ( ( ori_data.x > cur_data.x ) && ( ori_data.x < ( cur_data.x + cur_data.length ) ) ) || ( ( ( ori_data.x + ori_data.length ) > ( cur_data.x ) ) && ( ( ( ori_data.x + ori_data.length ) < ( cur_data.x + cur_data.length ) ) ) ) || ( ( ori_data.x > cur_data.x) && ( ( ori_data.x + ori_data.length ) < ( cur_data.x + cur_data.length ) ) ) || ( ( ori_data.x < cur_data.x ) && ( ( ori_data.x + ori_data.length ) > ( cur_data.x + cur_data.length ) ) ) || ( ( ori_data.x == cur_data .x) || ( ori_data.x + ori_data.length == cur_data.length + cur_data.x ) ) ) {
                            topElements.push( cur );
                        }
                    }
                }
            }

            __length = topElements.length;

            for( j = 0; j < topElements.length; j++ ) {
                var ori_data = data[ topElements[ j ] ];
                if( j == 0 ) {
                    temp += ( - ori_data.y - ori_data.height + cur_data.y );
                } else if( ( -ori_data.y - ori_data.height + cur_data.y ) < temp ) {
                    temp = -( ori_data.y + ori_data.height - cur_data.y );
                }
            }
            if( topElements.length == 0 ) {
                temp = cur_data.y;
            }
            if( temp < 0 ) {
                temp = 0;
            }   
            return temp;    
        }       
    },
    // vertical movement towards top 
    topMoveFunc : function( node, count, flagie, currentNode, finalfg ){
        var i, 
        elementsToCheck = [], 
        valMove,
        __data = this.data,
        lyteQuerySelector = __data.lyteQuerySelector,
        occupied = lyteQuerySelector.occupied,
        element = lyteQuerySelector.element, 
        data = __data.lyteGridStack,
        index = node.elemNum,
        ori_data = data[ index ];

        occupied.push( index );

        currentNode = currentNode || node;

        elementsToCheck = this.elementSorting( this.elementCheck( element, node, finalfg ) );

        var __index = elementsToCheck.indexOf( index );

        if( __index + 1 ){
            elementsToCheck.splice( __index, 1 );
        }

        elementsToCheck.forEach( function( item ){
            var cur_data = data[ item ];
            if( !$L( cur_data.nodeName ).hasClass( 'gridSelected' ) ){
                 if( ( ori_data.x >= cur_data.x && ori_data.x + ori_data.length <= cur_data.x ) || ( ori_data.x + ori_data.length >= cur_data.x && ( ori_data.x + ori_data.length <= cur_data.x + cur_data.length)) || ( ori_data.x > cur_data.x ) || ( ( ori_data.x + ori_data.length) > ( cur_data.x + cur_data.length ) ) ){
                    if( ori_data.y + ori_data.height <= cur_data.y + cur_data.height || flagie ) {
                        valMove = this.heightGet( cur_data.nodeName, null, !flagie );
                        cur_data.y -= valMove;
                        this.valueUpdating( item, 'y', 'lyte-grid-y' );
                        this.positionFind();

                        if( valMove ) {
                            this.topMoveFunc( cur_data.nodeName, cur_data.y + valMove, flagie, currentNode );
                            if( !flagie ) {
                                this.displayGrid( currentNode.elemNum );
                            }
                        }
                    }
                }
            }
        }.bind( this ) );
    }, 
    // to sort selected elements according to directions
    elementSorting : function(stackElements, flag){
            var y = flag ? 'x' : 'y',
            data = this.data.lyteGridStack,
            __length = stackElements.length;

            for( var j = 0; j < __length; j++ ) {
                var __cur1 = stackElements[ j ];
                for( var k = j + 1; k < __length; k++ ) {
                    var __cur2 = stackElements[ k ];
                    if( data[ __cur1 ][ y ] > data[ __cur2 ][ y ] ) {
                        stackElements[ j ] = __cur2;
                        stackElements[ k ] = __cur1;
                        j--;
                        break;
                    }
                }
            }
            return stackElements    
    }, 
    // horizontal movement check
    topCheck : function( node, element,timeoutFlag, fourth, allowHorizontal, width ){
        var i, 
        flag = false, 
        stackElements = [], 
        temp1, 
        elementsToCheck = [], 
        elementsToCheck1 = [], 
        hgt, 
        ht=0,
        __data = this.data,
        data = __data.lyteGridStack, 
        currentTop,
        xElements = __data.xElements,
        yElements = __data.yElements,
        index = node.elemNum,
        ori_data = data[ index ],
        $node = $L( node ),
        direction = __data.ltPropDirection,
        float = __data.ltPropFloat,
        offset = this.rtlfunc( 'offsetLeft', node );

        temp1 = ori_data.y
       
        if( ori_data.length > 1 ){
            elementsToCheck = this.elementSorting( this.multipleRemoval( this.yElementsFind( ori_data.x + 1, ori_data.x + ori_data.length - 1, xElements ) ) );
        } else {
            elementsToCheck = this.similarData( xElements[ ori_data.x ], xElements[ ori_data.x + 1 ] );
        }

        if( ori_data.height > 1 ){
            elementsToCheck1 = this.yElementsFind( temp1 + 1, ori_data.y + ori_data.height - 1, yElements );
        } else {
            elementsToCheck1 = this.similarData( yElements[ ori_data.y ], yElements[ ori_data.y + 1 ] );
        }

        if( elementsToCheck1 ){
            elementsToCheck = this.similarData( elementsToCheck, this.multipleRemoval( elementsToCheck1 ) );
        }

        elementsToCheck = this.elementSorting( this.multipleRemoval( elementsToCheck ) );

        var __index = elementsToCheck.indexOf( index ),
        __length = elementsToCheck.length,
        __fn = function( y1, y2, y ){
            return y >= y1 && y2 >= y;
        },
        __fn2 = function( x1, x2, x3, x4 ){
            return __fn( x1, x2, x3 ) || __fn( x1, x2, x4 ) || __fn( x3, x4, x1 ) || __fn( x3, x4, x2 );
        };

        if( __index + 1 ){
            elementsToCheck.splice( __index, 1 );
            __length--;
        }

        for( i = __length - 1; i > -1; i-- ) {
            var cur = elementsToCheck[ i ],
            cur_data = data[ cur ];

            if( timeoutFlag ) {
                if( ori_data.x != $node.attr( 'lyte-grid-x' ) || ori_data.length != $node.attr( 'lyte-grid-length' ) ) {   
                    flag = true;
                }
            } else {
                // if( ( ( ori_data.x + ori_data.length > cur_data.x && ori_data.x < cur_data.x ) || ( ori_data.x < cur_data.x + cur_data.length && cur_data.x + cur_data.length <= ori_data.x + ori_data.length)) && ( temp1 + ori_data.height > cur_data.y && temp1 < cur_data.y) || (temp1 < cur_data.y + cur_data.height && cur_data.y + cur_data.height < temp1 + ori_data.height ) || ( temp1 >= cur_data.y && cur_data.y + cur_data.height >= temp1 + cur_data.height) || ( cur_data.y + cur_data.height < temp1 + ori_data.height && temp1 < cur_data.y ) || ( cur_data.y + cur_data.height == temp1 + ori_data.height )  ){
                //     flag = true;
                // }

                var __top = temp1,
                __bottom = __top + ori_data.height,
                __top1 = cur_data.y,
                __bottom1 = __top1 + cur_data.height,
                __left = ori_data.x,
                __right = __left + ori_data.length,
                __left1 = cur_data.x,
                __right1 = __left1 + cur_data.length;

                if( __fn2( __left, __right, __left1, __right1 ) && __fn2( __top, __bottom, __top1, __bottom1 ) ){
                    flag = true;
                }
            }   
            if( flag && !$L( cur_data.nodeName ).hasClass( 'gridSelected' ) ){
                if( ( ( ori_data.x <= ( cur_data.x + cur_data.length - 1 ) ) ) || ( ( cur_data.x + 1 >= ( ori_data.x + ori_data.length ) ) ) ){
                    stackElements.push( cur );

                    ht += cur_data.height
                    if( direction != 'horizontal' && !fourth ){
                        break;
                    }
                }   
            }
            flag = false; 
        }

        var __length = stackElements.length;

        if( __length ){
            if( !timeoutFlag ) {
                this.valueUpdating( index, 'x', 'lyte-grid-x' );  
            } 
            stackElements = this.elementSorting( stackElements, true );
            for( var z = 0 ; z < __length; z++ ) {
                var cur = stackElements[ z ],
                cur_data = data[ cur ],
                valMove = this.heightGet( cur_data.nodeName ), 
                totalHeight = ori_data.height + ori_data.y - valMove, 
                ret = true;

                hgt = totalHeight;

                if( direction != 'horizontal' && !allowHorizontal ){
                    this.verticalCheck( cur_data, cur_data.y + cur_data.height, totalHeight + valMove + cur_data.height, node, ori_data.height < cur_data.height );  
                    cur_data.y = ( hgt > ( ori_data.height + ori_data.y ) ? hgt : ( ori_data.height + ori_data.y ) ) - (  float ? 0 : this.heightGet( ori_data.nodeName ) );
                    this.valueUpdating( cur, 'y', 'lyte-grid-y' );
                } else {
                    var cur_node = $L( cur_data.nodeName );
                    if( z > 0 &&  ( ( parseInt( cur_node.attr( 'lyte-grid-x' ) ) + parseInt( cur_node.attr( 'lyte-grid-length' ) ) ) == ( __data.gridLength ) || parseInt( cur_node.attr( 'lyte-grid-x' ) ) == 0 ) ){
                        break;
                    }

                    var cur_offset = this.rtlfunc( 'offsetLeft', cur_data.nodeName );

                    if( ( offset > cur_offset ) && !allowHorizontal ) {
                        this.horiMovement( node, cur, 'left', ht, __length == 1 || ( __length > 2 && z != 1), width );                                                   
                    } else if( ( offset < cur_offset ) || allowHorizontal ) {
                        this.horiMovement( node, cur, 'right', ht, __length == 1 || ( __length > 2 && z != 1), width ); 
                    }   
                }
                if( !float ){
                    this.topMoveFunc( cur_data.nodeName, z == 0 || (  cur_data.x != 0 && cur_data.x + cur_data.length != parseInt( __data.gridLength ) ) );
                }
                this.displayGrid( index );
            }
        }
},
// if given direction is horizontal
    horiMovement : function( node, stackElements, direction, ht, flag, wid ){
        var __data = this.data,
        data = __data.lyteGridStack, 
        lyteQuerySelector = __data.lyteQuerySelector,
        ori_data = data[ stackElements ],
        gridLength = parseInt( __data.gridLength ),
        cur_data = data[ node.elemNum ];

        ori_data.x = direction == "left" ? ( ori_data.x - ( wid ? wid : 1 ) ) : ( ori_data.x + ( wid ? wid : 1 ) );

        if( ori_data.x < 0 || ( ori_data.x + ori_data.length) > gridLength ) {
            if( ori_data.x < 0 ) {
                ori_data.x = 0;
            } else {
                ori_data.x = gridLength - ori_data.length;
            }

            this.valueUpdating( stackElements, 'x', 'lyte-grid-x' );
            var dumHgt = ori_data.y + ori_data.height;
            ori_data.y = ori_data.y + ori_data.height;   

            this.positionFind( this.scopeElement.querySelectorAll( __data.ltPropHandler ) );
            this.verticalCheck( ori_data, dumHgt, cur_data.y + cur_data.height + ori_data.height /*ht*/, node );
            this.valueUpdating( stackElements, 'y', 'lyte-grid-y')
            this.displayGrid();    
        } else {

            var nodeName = cur_data.nodeName;

            this.valueUpdating( stackElements, 'x', 'lyte-grid-x' );

            var offleft = this.rtlfunc( 'offsetLeft', nodeName ),
            offtop = nodeName.offsetTop;

            nodeName.initialLeft = [ offleft, offleft, offleft ];
            nodeName.initialTop = [ offtop, offtop, offtop ];

            this.topCheck( nodeName, lyteQuerySelector.element, true, null, wid ? true : false, wid );
            
            if( flag ) {
                var valMove = this.heightGet( nodeName );
                if( !__data.ltPropFloat ) {
                    cur_data.y -= valMove;
                    if( valMove ) {
                        this.topMoveFunc( nodeName );
                    }   
                }
            }
            this.displayGrid();
        }
    },
    // vertical movement top to bottom  
    verticalCheck : function( node, currentHeight, totalHeight, currentNode, flagie, direction ){
        var __data = this.data,
        topElements = [], 
        elementsToCheck = [], 
        elementsToCheckDum = [], 
        i, 
        count, 
        ht, 
        flag = false, 
        flag2 = flag, 
        elementsToCheck1 = [], 
        maxElem = [], 
        temp = [], 
        data = __data.lyteGridStack, 
        fixFlag,
        xElements = __data.xElements,
        yElements = __data.yElements,
        element = this.scopeElement;

        currentNode = currentNode || node.nodeName;

        if( direction == "left" ){
            elementsToCheck.push.apply( elementsToCheck, xElements[ node.x ] || [] );
        } else if( direction == "right" ){
            elementsToCheck.push.apply( elementsToCheck, xElements[ node.x + node.length ] || [] );
        } else {
            if( node != data[ currentNode.elemNum ] ){
                if( node.length > 1 ){
                    elementsToCheck = this.yElementsFind( node.x + 1, node.x + node.length - 1, xElements )
                } else {
                    elementsToCheck = this.similarData( xElements[ node.x ] || [], xElements[ node.x + 1 ] || [] );
                }
            } else {
                elementsToCheck = this.elementCheck( element, node.nodeName );
            }
        } 
               
         elementsToCheck = this.multipleRemoval( elementsToCheck ); 
        // elementsToCheckDum = elementsToCheckDum.concat(elementsToCheck); 
        for( var z = totalHeight - node.height; z <= totalHeight; z++ ) {
            elementsToCheck1.push.apply( elementsToCheck1, yElements[ z ] || [] );
        }
        
        elementsToCheck = this.similarData( elementsToCheck, this.multipleRemoval( elementsToCheck1 ) );    
        elementsToCheck = this.elementSorting( elementsToCheck );

        var fn = function( index ){
            var __index = elementsToCheck.indexOf( index );

            if( __index + 1 ){
                elementsToCheck.splice( __index, 1 );
            }
        },
        index1 = node.nodeName.elemNum,
        index2 = currentNode.elemNum;

        fn( index1 );
        fn( index2 );

        if( direction ) {
            if( !this.similarData( elementsToCheck, yElements[ node.y + node.height ].concat( yElements[ node.y ] ) ).length ) {
                elementsToCheck = [];
            }
        }       
        
        var __length = elementsToCheck.length;

    for( i = 0; i < __length; i++ ) {
        var cur = elementsToCheck[ i ],
        cur_data = data[ cur ];

        if( cur != index1 && cur != index2 ) {
            if( flagie ) {
                if( node.y == cur_data.y ) {
                    flag2 = true;
                }
            }
            if( node.y < ( cur_data.y + cur_data.height ) || flag2 ) {   
                topElements.push( cur );
                flag = true
            } else if( flagie && ( ( cur_data.y + cur_data.height) >= ( node.y + node.height ) ) ) {
                topElements.push( cur );
                flag = true
            }       
        }
        if( flag ) {
            flag = false;

            var last_data = data[ $L( topElements ).get( -1 ) ];

            maxElem.push( last_data.height + last_data.y );
            if( topElements.length > 1 ){
                var first_data = data[ topElements[ 0 ] ];
                temp.push( last_data.y - ( first_data.y + first_data.height ) );     
            }
        }   
    }

    if( topElements.length ){
        topElements = this.elementSorting( topElements );
        ht = totalHeight;

        var elem = [],
        elem1 = [],
        __length = topElements.length,
        first_data = data[ topElements[ 0 ] ];

        totalHeight = Math.max.apply(null,maxElem) - first_data.y + ht;

        for( var j = 0; j < __length; j++ ){
            var cur = topElements[ j ],
            cur_data = data[ cur ],
            htmove = this.heightGet( cur_data.nodeName );

            if( j == 0 ){
                if( ht <= cur_data.y && flagie ){
                    break;
                } else {
                    if( cur_data.y - ht < 1 ){
                        cur_data.y = ht;
                        htmove = this.heightGet( cur_data.nodeName );

                        if( cur_data.y - htmove >= ht ){
                            cur_data.y -= htmove;
                        }
                    }
                }
            } else {
                cur_data.y = first_data.y + first_data.height + temp[ j - 1 ];
                htmove = this.heightGet( cur_data.nodeName );
                if( cur_data.y - htmove >= ht ){
                    cur_data.y -= htmove;
                }
            }
            this.valueUpdating( cur, 'y', 'lyte-grid-y' );
        }

        var current_data = data[ index2 ];

        elem = this.yElementsFind( Math.min( node.x, current_data.x ), Math.max( node.x + node.length, current_data.x + current_data.length ), xElements );
        elem = this.elementSorting( this.multipleRemoval( this.similarData( elem, topElements ) ) );

        var __length = elem.length;

        for( var i = __length - 1; i >= 0; i-- ){
            var elem1 = [],
            elem2 = [],
            elem3 = [],
            cur_data = data[ elem[ i ] ],
            $node = $L( cur_data.nodeName );

            for( var j = cur_data.x + 1; j < cur_data.x + cur_data.length; j++ ){
               elem1.push.apply( elem1, xElements[ j ] );
            }

            if( cur_data.length == 1 ){
                elem1 = this.similarData( xElements[ cur_data.x ], xElements[ cur_data.x + 1 ] );
            }

            if( flagie ){
                elem2 = this.elementSorting( this.multipleRemoval( this.similarData( elem1, this.yElementsFind( parseInt( $node.attr( 'lyte-grid-y' ) ) + 1, parseInt( $node.attr( 'lyte-grid-y' ) ) + cur_data.height, yElements ) ) ) );
            } else {
                elem2 = this.elementSorting( this.multipleRemoval( this.similarData( elem1, this.yElementsFind( parseInt( $node.attr( 'lyte-grid-y' ) ) + 1, parseInt( $node.attr( 'lyte-grid-y' ) ) + cur_data.height, yElements ) ).concat( this.similarData( elem1, this.yElementsFind( parseInt( cur_data.y ) + 1 ,parseInt( cur_data.y ) + cur_data.height, yElements ) ) ) ) );
            }
        }

        for( var i = elem.length - 1; i >= 0; i-- ) {
            var __length = elem2.length,
            cur_data = data[ elem[ i ] ];

            for( var k = 0; k < __length; k++ ) {
                var __cur = elem2[ k ];

                if( topElements.indexOf( __cur ) == -1 && index1 != __cur && index2 != __cur ) {
                    if( this._occupied && this._occupied.indexOf( __cur ) != -1 ) {
                        continue;
                    }
                    this.additionalCheck( __cur, cur_data.y + cur_data.height, topElements );
                }
            }   
        }
    }

},

yElementsFind : function( start, end, yElements ){
    var elements = [];

    for( var i = start; i <= end; i++ ){
        var cur = yElements[ i ] || [];

        if( cur.length ){
            elements.push.apply( elements, cur );
        }
    }

    return elements;
},

// // to find elements on given height 
// yElementsFind : function(start, end, yElements){
//     var elements = [];
//     for( var i = start; i <= end; i++ ) {
//         elements = elements.concat( yElements[ i ] || [] );
//     }
//     return elements;    
// }, 
// to propagate vertical check 
additionalCheck : function( element, height, topElements1 ){
        var __data = this.data,
        xElements = __data.xElements, 
        yElements = __data.yElements, 
        data = __data.lyteGridStack, 
        elem1 = [], 
        elem2 = [], 
        hgt = height, 
        ori_data = data[ element ],
        __x = ori_data.x,
        __length = ori_data.length,
        __y = ori_data.y,
        __height = ori_data.height;

        elem1 = elem1.concat( this.yElementsFind( parseInt( $L( ori_data.nodeName ).attr( 'lyte-grid-y' ) ) + __height, __y + __height, yElements ) );

        if( ori_data.length > 1 ) {
           elem2.push.apply( elem2, xElements[ __x + 1 ] );
           elem2.push.apply( elem2, xElements[ __x + __length - 1 ] );
        } else {
           elem2.push.apply( elem2, this.similarData( xElements[ __x ], xElements[ __x + 1 ] ) );
        } 

        elem1 = this.similarData( elem1, elem2 );

        var index = elem1.indexOf( element ),
        _length = elem1.length;

        if( index + 1 ){
            elem1.splice( index, 1 );
            _length--;
        }


        for( var i = 0; i < _length; i++ ) {
            var cur = elem1[ i ];
            if( topElements1.indexOf( cur ) == -1 ) {
                topElements1.push( cur );
                this.additionalCheck( cur, height + __height, topElements1 );
            }
        }
        if( __y > hgt ) {
             var htmove = this.heightGet( ori_data.nodeName );
             if( __y - htmove <= hgt ) {
                ori_data.y = hgt;
            } else {
                ori_data.y -= htmove;
            }
                
        } else{
            ori_data.y = hgt;
        }
        topElements1.push( element ); 

        this.valueUpdating( element, 'y', 'lyte-grid-y' ); 
}, 
// finding previous position for undo
previousPos : function( elementCount, flag ){
    if( !elementCount || !this.data.ltPropUndo ){
        return;
    }

    var __length = elementCount.length;

    if( !__length ){
        return;
    }

    var __data = this.data,
    data = __data.lyteGridStack, 
    lyteQuerySelector = __data.lyteQuerySelector,
    current = lyteQuerySelector.currentPos,
    fn = function( arr ){
        arr.splice( current + 1 );
    },
    fn2 = function( arr, cur, ns ){
        var new_value = flag ? cur[ ns ] : parseInt( cur.nodeName.getAttribute( 'lyte-grid-' + ns ) ),
        prev = arr[ current_index ];

        is_modified = is_modified || ( prev != new_value );
        arr.push( new_value );
        final_arr.push( arr );
    },
    is_modified,
    current_index = data[ 0 ].oldX.length - 1,
    final_arr = [];

    for( var i = 0; i < __length; i++ ) {
        var cur = data[ i ];

        if( current < cur.oldX.length ) {
            fn( cur.oldX );
            fn( cur.oldY );
            fn( cur.oldLength );
            fn( cur.oldHeight );
        }

        fn2( cur.oldX, cur, 'x' );
        fn2( cur.oldY, cur, 'y' );
        fn2( cur.oldLength, cur, 'length' );
        fn2( cur.oldHeight, cur, 'height' );
    }

    if( !is_modified ){
        final_arr.forEach( function( item ){
            item.pop();
        });
        return;
    }

    lyteQuerySelector.currentPos = data[ 0 ].oldX.length - 1;
},  

mousedown : function ( evt, isTch ){

    var __data = this.data;

    if( !__data.ltPropFreezeMode ) {
        var lyteQuerySelector = __data.lyteQuerySelector, 
        currentElement = this, 
        data = __data.lyteGridStack,
        ret = this.nodeName( isTch ? evt.touches[ 0 ] : evt ),
        handler = __data.ltPropHandler;
        if( ret ) {
            this.mvefunc = this.mvefunc || this.mMove.bind( this );
            this.upfunc = this.upfunc || this.mouseup.bind( this );
            // evt.stopPropagation();
            var val = ret[ 0 ],
            nodeName = ret[ 1 ],
            element = this.scopeElement || this.$node.querySelector( __data.ltPropScope ),
            ev = isTch ? evt.touches[ 0 ] : evt;

            if( !evt.shiftKey ){
                lyteQuerySelector.BottomToTopFlag = true; 
                lyteQuerySelector.allowMovement = true;

                var prevSelected =  element.querySelectorAll( handler + '.gridSelected' );

                if( ( prevSelected.length == 0 ) ) {   
                    if( nodeName ){
                        if( nodeName.classList.contains( 'gridSelected' ) ){
                            return;
                        }
                    }
                    var method;
                    if( this.getMethods( 'onBeforeSelect' ) ) {
                        method = this.executeMethod('onBeforeSelect', nodeName, evt, this.$node );
                    }
                    if( nodeName && method != false ) {
                        var __selected = lyteQuerySelector.SelectedNodes = [],
                        index = nodeName.elemNum,
                        __offset = this.rtlfunc( 'offsetLeft', nodeName ),
                        cur_data = data[ index ],
                        __offsettop = nodeName.offsetTop,
                        __clientX = this.rtlfunc( ev.clientX, 'clientX' );

                        __selected.push( index );
                        lyteQuerySelector.element = element
                        nodeName.initialLeft = __offset;
                        nodeName.initialTop = __offsettop;
                        nodeName.initialy = cur_data.y
                        nodeName.initialx = cur_data.x
                        nodeName.xPos = __clientX - __offset;
                        nodeName.yPos = ev.clientY - __offsettop;

                        if( val == "content" ) {
                          nodeName.flag = true;
                        } else {
                            nodeName.value = val;
                            var bccr = nodeName.getBoundingClientRect(),
                            __bcr = this.rtlfunc( bccr, 'bccr' );

                            if( /right/i.test( val ) ){
                                nodeName.xOff = __bcr + bccr.width - __clientX;
                            } else {
                                nodeName.xOff = -__bcr + __clientX;
                            } 

                            if( /bottom/i.test( val ) ) {
                                nodeName.yOff = bccr.top + bccr.height - ev.clientY;
                            } else {
                                nodeName.yOff = - bccr.top + ev.clientY;
                            }       
                            nodeName.flag = false;
                            this._resizeSelected = true;
                        }
                        nodeName.classList.add( 'gridSelected' );

                        var __focusclass = __data.ltPropGridSelectionClass;
                        
                        $L( handler + '.' + __focusclass + ':not(.gridSelected)', this.$node ).removeClass( __focusclass );
                            
                        if( __data.ltPropBestfit ) {
                            if( !this._bestfit ) {
                                this.create_best_fit();
                            }
                                 
                            
                        }
                        document.body.addEventListener( isTch ? 'touchmove' : 'mousemove', this.mvefunc, true );
                        this.getMethods('onSelect') && this.executeMethod( 'onSelect', nodeName, evt, this.$node );
                    }
                } else {   
                    var __selected = lyteQuerySelector.SelectedNodes = [],
                    nodeName = this.$node.querySelectorAll( handler + '.gridSelected' ),
                    __length = nodeName.length;

                    for( var i = 0; i < __length; i++ ) {
                        var cur_node = nodeName[ i ],
                        __offleft = cur_node.offsetLeft,
                        __offtop = cur_node.offsetTop;

                        __selected.push( cur_node.elemNum );
                        cur_node.left = __offleft;
                        cur_node.top = __offtop;
                        cur_node.flag = true;
                        cur_node.initialLeft = __offleft;
                        cur_node.initialTop = __offtop;
                        cur_node.xPos = this.rtlfunc( ev.clientX, 'clientX' )- __offleft;
                        cur_node.yPos = ev.clientY - __offtop;
                    }
                    lyteQuerySelector.SelectedNodes = this.elementSorting( __selected );
                    document.body.addEventListener( isTch ? 'touchmove' : 'mousemove', this.mvefunc, true );
                    this.getMethods( 'onSelect' ) && this.executeMethod( 'onSelect', nodeName, evt, this.$node );
                }
            } else if( !lyteQuerySelector.allowMovement ) {
                var method;
                if( this.getMethods( 'onBeforeSelect' ) ) {
                    method = this.executeMethod( 'onBeforeSelect', nodeName, evt, this.$node );
                }
                if( method != false ) {
                    nodeName.initialLeft = [];
                    nodeName.initialTop = [];

                    var class_name = 'gridSelected',
                    $nodeName = $L( nodeName );

                    if( $nodeName.hasClass( class_name ) ) {
                        $nodeName.removeClass( class_name );
                    } else  {
                        $nodeName.addClass( class_name );
                    }
                }
            }   
        lyteQuerySelector.previousPosFind = false
    } 
          // evt.preventDefault()      
    }
},
mMove : function(evt){
    var isTch = evt.type == "touchmove";
    if( isTch && evt.touches.length != 1 ) {
        return;
    }
    this.mousemoveFun( this.scopeElement, isTch ? evt.touches[ 0 ] : evt );
    if( !isTch ) {
        evt.preventDefault()    
        evt.stopPropagation();
        evt.preventDefault();
    }
} ,
mouseup : function ( evt ){   
    var __data = this.data,
    lyteQuerySelector = __data.lyteQuerySelector, 
    i, 
    data = __data.lyteGridStack, 
    isTch = evt.type == "touchend",
    ret = this.nodeName( evt ), 
    element = this.scopeElement,
    elementCount = this.elementSorting( lyteQuerySelector.elementCount ),
    isresize = this._resizeSelected;

    if( !evt.shiftKey || lyteQuerySelector.allowMovement ){
        var method, 
        nodes, 
        bestfit = this._bestfit,
        __selected = lyteQuerySelector.SelectedNodes;

        lyteQuerySelector.verticalMove = true; 
        lyteQuerySelector.allowMovement = false;
        
        if( __selected.length ){
            nodes =  this.$node.querySelectorAll( __data.ltPropHandler + '.gridSelected');
            if( this._gridMoved && this.getMethods('onBeforeDrop')){
                method = this.executeMethod('onBeforeDrop', nodes, event, this.$node, isresize );
            }

            var __delete = function( node ){
                [ 'initialx', 'xPos', 'yPos', 'flag', 'offLeft', 'offTop', 'initialy', 'instantPreviousX', 'instantPreviousY', 'val', 'xOff', 'yOff', 'initialLeft', 'initialTop', 'value', 'prevEvX', 'prevEvY' ].forEach( function( item ){
                    delete node[ item ];
                });
            };
            
            for( i = __selected.length-1; i >= 0; i-- ){
                 var cur_data = data[ __selected[ i ] ],
                 nodeName = cur_data.nodeName,
                 $node = $L( nodeName ),
                 occupied = lyteQuerySelector.occupied;

                 if( $node.hasClass( 'gridSelected' ) ) {
                    if( this._gridMoved && !__data.ltPropFloat && method != false ) {
                        var valMove = this.heightGet( nodeName );
                        cur_data.y -= valMove;
                        this.topCheck( nodeName, element );
                        this.topMoveFunc( nodeName, cur_data.y + valMove, false );
                    }

                    $node.removeClass( 'gridSelected lyteGridStackMove' );

                    this.displayGrid();    

                    Lyte.arrayUtils( occupied, 'remove', 0, occupied.length );
                    
                    if( this._gridMoved ){
                        if( method != false ) {
                            this.topCheck( nodeName, element );
                        }
                        
                        if( isresize ){
                            this.indiv_child_render( nodeName );
                        }
                    }

                   __delete( nodeName );
                }

                $L( bestfit ).css( 'display', 'none' );
                this.findGrid();   
           } 
            window.cancelAnimationFrame( this._reqId );  
            delete this._reqId; delete this._scrollCheck;   
            evt.stopPropagation();
            if( !isTch ) {
                evt.preventDefault();   
            }
        }
        if( this._gridMoved ){
            if( method != false ){
                this.displayGrid();
                if( __selected.length && lyteQuerySelector.previousPosFind ) {
                        this.previousPos( element.querySelectorAll( __data.ltPropHandler ) );
                }
                if( this.getMethods( 'onDrop' ) ){
                    window.requestAnimationFrame( function(){
                        this.executeMethod('onDrop', nodes, evt, this.$node, isresize  );
                    }.bind( this ) )
                }  
            } else {    
                lyteQuerySelector.currentPos += 1;
                this.undoPrevious();
            }
        }

        document.body.removeEventListener( isTch ? 'touchmove' : 'mousemove', this.mvefunc, true );
        lyteQuerySelector.SelectedNodes = []   
        delete this._gridMoved; delete this._resizeSelected;  
    }
   document.removeEventListener( isTch ? 'touchend' : 'mouseup', this.upfunc, true )
},
    
keydown : function ( event ){

        if( $L( event.target ).closest( 'lyte-gridstack' ).get( 0 ) != this.$node ){
            return;
        }

        var data = this.data,
        keyCode = event.keyCode || event.which,
        is_meta = event.ctrlKey || event.metaKey,
        is_shift = event.shiftKey;

        if( data.ltPropUndo && !data.ltPropFreezeMode ) {
            if( is_meta && is_shift && keyCode == 90 ){
                this.undoNext();
            } else if( is_meta && !is_shift && keyCode == 90 ) {
                this.undoPrevious();
            }  
        }  
  },

  returnWid : function(length, x, div){
    if( !length ){
        return
    }
    if( length.constructor != String ){
        return length;
    }
    var match = length.match( /[\w|.]+(?=%)/gi );
    
    if( match && match.length ){
        var unitX, margin, width,
        bcr = this.bcrrelem || this.scopeElement.getBoundingClientRect();

        if( x ){
            width = "width";
            unitX = this.data.ltPropUnitxCopy;
        }else{
            width = "height";
            unitX = this.data.ltPropUnitY;
            margin = "ltPropMarginTop"
        }
        // grid length will be based on actual width
        return this.gridLength(  ( bcr[ width ] ) * parseFloat(match[ 0 ] ) / 100, unitX, margin )
    }else{
        return parseInt( length );
    }
  },

 initialPosFind : function( elem ){
        var iniData1 = {}, 
        repose = this.data.ltPropForcedReposition,
        $elem = $L( elem ),
        __x = $elem.attr( 'lyte-grid-x' ),
        __y = $elem.attr( 'lyte-grid-y' ),
        __length = $elem.attr( 'lyte-grid-length' ),
        __height = $elem.attr( 'lyte-grid-height' );

        iniData1.x = ( __x && !repose ) ? parseInt( __x ) : undefined;
        iniData1.y = ( __y && !repose ) ? parseInt( __y ) : undefined;
        iniData1.length = __length ? this.returnWid( __length , true, elem ) : this.returnWid( this.data.ltPropDefaultLength, true );
        iniData1.height = __height ? this.returnWid( __height, null, elem ) : this.returnWid( this.data.ltPropDefaultHeight );
        
        return iniData1;
  },

  retNode : function( sim, data ) {
    return sim.map( function( item ){
        var value = item.elemNum;
        return data[ value == void 0 ? item : value ];
    });
  },

  findGrid : function() {
     var $node = this.$node,
     bccr = $node.getBoundingClientRect(), 
     sim, 
     __data = this.data,
     data = __data.lyteGridStack, 
     arr,
     x = $node.scrollLeft, 
     y = $node.scrollTop, 
     length = x + bccr.width, 
     height = y + bccr.height,
     vis = { 
        left : this.returnY( { offLeft : x } ), 
        top : this.returnY( { offTop : y } , true), 
        right : this.returnY( { offLeft : length } ), 
        bottom : this.returnY( { offTop : height }, true ) 
    };
    this.setData('ltPropVisibleBoundary', vis );
    
    sim = this.similarData( this.multipleRemoval( this.yElementsFind( vis.top + 1, vis.bottom - 1, __data.yElements ) ), this.multipleRemoval( this.yElementsFind( vis.left + 1, vis.right - 1, __data.xElements ) ) );
    arr = this.retNode( sim, data );
    this.setData( 'ltPropVisible', arr );
  },

  scroll :  function( event ) {
     this.findGrid();
     if( this.getMethods( 'onScroll' ) ) {
         this.executeMethod( 'onScroll', this.getData( 'ltPropVisible' ), this.getData( 'ltPropVisibleBoundary' ), this.$node)
     }
  },

  click : function( event ) {
    var __data = this.data,
    className =  __data.ltPropGridSelectionClass;

    if( className ) {

        var fn = function(){
            var temp = this.scopeElement.querySelectorAll( __data.ltPropHandler + '.' + className ),
            __length = temp.length;

            for( var i = 0; i < __length; i++ ) {
                temp[ i ].classList.remove( className );
            }
        }.bind( this );

         fn();

        if( $L( event.target ).closest( 'lyte-gridstack' ).get( 0 ) != this.$node ){
            return;
        }

        var nodeName = this.nodeName( event );

        if( nodeName ) {
            nodeName.classList.add( className )
        }
    }
  },

   mousebind : function(event){
        if( event.target != this && event.button != 2 ) {  
            var isTouch = event.type == "touchstart",
            comp = this.component;

            if( isTouch && event.touches.length != 1  ){
                return;
            }

            if( comp.data.ltPropMaxGridHeight == Infinity ){
                comp.mousedown( event, isTouch );
            } else {
                comp.mod_mousedown( event, isTouch );
            }

            if(!event.shiftKey){
                document.addEventListener( isTouch ? 'touchend' : 'mouseup', comp.upfunc, true );
            }
            event.stopPropagation();
        }
    },

    prevent : function( evt ) {
        var __touches = evt.touches;
        if( __touches.length == 1 && this.nodeName( __touches[ 0 ] ) ) {
            var activeElement = document.activeElement;
            if( activeElement != document.body ) {
                activeElement.blur();
            }
            evt.preventDefault();
        }
    },

// after rendering properties
    didConnect : function(){    
            var __data = this.data,
            scopeDiv = __data.ltPropScope.trim(), 
            ltPropUnitX = __data.ltPropUnitX, 
            ltPropMarginLeft =__data.ltPropMarginLeft,
            $node = this.$node;

            this.setData('ltPropUnitxCopy', ltPropUnitX);
            this.setData('ltPropMarginLeftCopy', ltPropMarginLeft);

            this._scroll = this.scroll.bind(this);
            this._click = this.click.bind(this);
            this._prevtch = this.prevent.bind( this );

            this._scrollelem = $node.closest( __data.ltPropScrollElement ) || $node;

            this.$node.addEventListener( 'scroll', this._scroll, true);
            document.addEventListener( 'click', this._click );

            var element =  this.scopeElement = $node.querySelector( scopeDiv ),
            lyteQuerySelector = __data.lyteQuerySelector;
            
            element.classList.add( 'lyteGridstackScope' );

            if( element.tabIndex == -1 ){
                element.tabIndex = 0;
            }     
            element.lyteData = {};
            element.component = this;

            element.addEventListener('mousedown', this.mousebind );
            element.addEventListener( 'touchmove', this._prevtch )
            element.addEventListener( 'touchstart', this.mousebind );
            this.setData('lyteQuerySelector.keydown', this.keydown.bind(this));

            document.addEventListener( 'keydown', this.getData( 'lyteQuerySelector' ).keydown );

            /**
             * @utility placeholder
             * @version 3.53.0
             */
            $node.placeholder = this.placeholder.bind( this );

            /**
             * @utility getGridPositions
             * @version 3.53.0
             */

            $node.getGridPositions = function(){
                return this.data.lyteGridStack.map( function( item ){
                    return {
                        node : item.nodeName,
                        x : item.x,
                        y : item.y,
                        length : item.length,
                        height : item.height
                    }
                });
            }.bind( this );

            /**
             * @utility getEmptyPos
             * @version 3.53.0
             */
            
            $node.getEmptyPos = function( obj ){
                return this.emptySpaceFind( obj || {} );
            }.bind( this );

            $node.addGrid = function( div, obj, frm_placeholder ) {
                $L.fastdom.mutate(function(){
                    div._addGrid  = true;

                    obj = obj || {};

                    var ltPropColumnMode = __data.ltPropColumnMode,
                    $div = $L( div ),
                    x = parseInt( $div.attr( 'lyte-grid-x' ) ), 
                    y = parseInt( $div.attr( 'lyte-grid-y' ) ), 
                    le = parseInt( $div.attr( 'lyte-grid-length' ) ),
                    hg = parseInt( $div.attr( 'lyte-grid-height' ) ),
                    elem = this.scopeElement;

                    if( !isNaN( x ) ) {
                        obj.x = x 
                    }
                    if( !isNaN( y ) ) {
                        obj.y = y 
                    }
                    if( !isNaN( le ) ) {
                        obj.length = le 
                    }
                    if( !isNaN( hg ) ) {
                        obj.height = hg; 
                    }

                    var __length = obj.length,
                    __height = obj.height;

                    if( __length ){
                        obj.length = this.returnWid( __length, true, div );
                    }
                    if( __height ){
                        obj.height = this.returnWid( __height, null, div );
                    }

                    for( var i in obj ){
                         var cur = obj[ i ];
                        if( cur ) {
                            if( i != 'resize' ) {
                               obj[ i ] = parseInt( cur );
                            } 
                        }
                    }

                    obj.nodeName = div;
                    $div.addClass( 'lyteGridstackHandler' );

                    if( !ltPropColumnMode ) {
                        var newVal = this.emptySpaceFind( obj ),
                        ret_0 = newVal[ 0 ],
                        ret_1 = newVal[ 1 ],
                        __x = obj.x,
                        __y = obj.y,
                        __length = obj.length,
                        __height = obj.height;

                        if( ret_1 ) {
                            $div.attr( 'lyte-grid-x', ret_0.x );
                            $div.attr( 'lyte-grid-y', ret_0.y );
                        } else {
                            $div.attr( 'lyte-grid-x', ( !frm_placeholder && __x != undefined  && __x.constructor == Number ) ? __x : ret_0.x );
                            $div.attr( 'lyte-grid-y', ( !frm_placeholder && __y != undefined  && __y.constructor == Number ) ? __y : ret_0.y );
                        }    
                        
                        $div.attr('lyte-grid-length', obj.length || this.returnWid( __data.ltPropDefaultLength, true ) );
                        $div.attr('lyte-grid-height',obj.height || this.returnWid( __data.ltPropDefaultHeight ) ) ;
                        $div.attr('lyte-grid-min-length', obj.minLength || this.returnWid( __data.ltPropDefaultMinLength, true ) );
                        $div.attr('lyte-grid-min-height', obj.minHeight || this.returnWid( __data.ltPropDefaultMinHeight ) ) ;
                        $div.attr('lyte-grid-max-length', obj.maxLength || this.returnWid( __data.ltPropDefaultMaxLength, true ) );
                        $div.attr('lyte-grid-max-height', obj.maxHeight || this.returnWid( __data.ltPropDefaultMaxHeight ) );
                    }
                    if( obj.resize == 'disabled' ) {
                        $div.attr( 'lt-prop-resize', obj.resize );
                    }
                    // new grid is appended to the dom here  
                    if( !elem.contains( div ) ) { 
                        _lyteUiUtils.appendChild( elem, div );
                    }
                    this.initialValSet();
                    this.cssConstruct( div, 'lyte-grid-y' );
                    __data.iniData.push( this.initialPosFind( div ) );

                    var data = __data.lyteGridStack;

                    this.previousPos( data.length );

                    $L.fastdom.mutate(function(){
                        var index = div.elemNum;
                        if( newVal && ret_1 == false && !ltPropColumnMode ) {    
                             this.topCheck( div, elem, null, true );
                             if( !__data.ltPropFloat ) {
                                this.topCheck( div, elem, null, true );
                                var hgtMove = this.heightGet( div );
                                if( hgtMove ) {
                                    var cur_data = data[ index ];
                                    cur_data.y -= hgtMove; 

                                    this.valueUpdating( index, 'lyte-grid-y', cur_data.y );
                                    this.setVal( div, 'lyte-grid-y', cur_data.y );
                                    this.previousPos( data.length );
                                }
                                this.topMoveFunc( div, null, null, null, true );
                            }
                            this.findGrid();   
                        }

                       this.indiv_child_render( div );

                       if( this.getMethods( 'onItemAdd' ) ) {
                           $L.fastdom.measure( function(){
                                $L.fastdom.mutate( function(){
                                    this.executeMethod( 'onItemAdd', div, __data.lyteGridStack[ div.elemNum ], this.$node )
                                }.bind( this ) )
                           }.bind( this ) )
                        }
                    }.bind(this))
                }.bind(this))                    
             }.bind(this);

             $node.removeGrid = function(div){
                var elem = this.scopeElement;

                if( elem.contains( div ) ) {
                    var handQuer = __data.ltPropHandler, 
                    data = __data.lyteGridStack, 
                    is_number = div.constructor == Number,
                    index = is_number ? div : div.elemNum,
                    cur_data = data[ index ],
                    hgt = cur_data.y + cur_data.height,
                    LC = Lyte.arrayUtils;

                    LC( __data.iniData, 'removeAt', index );
                    // grid removed
                    if( !is_number && document.body.contains( div ) ){
                        div.parentElement.removeChild(div);
                    }
                    LC( data, 'remove', 0, data.length );
                    // called for removal of unused styles
                    this.initialValSet();
                    this.positionFind( elem.querySelectorAll( __data.ltPropHandler ) );
                    this.findGrid();
                    this.topMoveAllGrid( hgt, data, true );
                    this.initialValSet( true, true );
                }
             }.bind(this);

             $node.reRender = function( flag ){
                var data = __data.lyteGridStack;
                Lyte.arrayUtils( data, 'remove', 0 , data.length );
                this.didConnectWrk( true, flag );
             }.bind(this);

             $node.setProperty = function( targetDiv, propertyName, propValue ){

                    if( propertyName == "resize" ){
                        return this.$node.updateValue( targetDiv, { resize : propValue } );
                    }


                    if( propertyName == "height" || propertyName == "length" ){ 
                       propValue = this.returnWid( propValue, propertyName == "length" ? true : false, targetDiv );
                    }else{
                        propValue = parseInt( propValue );
                    }
                    var __data = this.data,
                    data = __data.lyteGridStack,
                    comProp = [ 'x', 'y', 'length', 'height' ],
                    dataVal = {},
                    index = targetDiv.elemNum,
                    cur_data = data[ index ];

                    if( comProp.indexOf( propertyName ) != -1 ){
                        for( var yy in cur_data ){
                            if( comProp.indexOf( yy ) != -1 ) {
                                dataVal[ yy ] = cur_data[ yy ];
                            }
                        }
                        
                        dataVal[ propertyName ] = propValue;
                        dataVal.nodeName = targetDiv;

                        var newVal = this.emptySpaceFind( dataVal ),
                        ret_0 = newVal[ 0 ],
                        ret_1 = newVal[ 1 ];

                        if( ret_0 ){
                            for( var zz in ret_0 ){
                                this.setVal( targetDiv, 'lyte-grid-' + zz, ret_0[ zz ] );
                            } 
                        }
                    }
                    this.setVal( targetDiv, 'lyte-grid-' + propertyName, propValue );

                    var pp = propertyName.replace( /(-\w)/g, function ( m ) {
                        return m[ 1 ].toUpperCase();
                    }),
                    elem = this.scopeElement;

                    cur_data[ pp ] = propValue;

                    if( comProp.indexOf( propertyName ) != -1 ) {
                        this.valueUpdating( index, 'lyte-grid-' + propertyName, propValue );
                        this.previousPos( data.length );

                        if( ret_1 == false ){
                            this.topCheck( targetDiv, elem, null, true );
                        }

                        if( !this.data.ltPropFloat ){
                            var hgtMove = this.heightGet( targetDiv );
                            if( hgtMove ) {   
                                cur_data.y -= hgtMove; 
                                this.valueUpdating( index, 'lyte-grid-y', cur_data.y );
                                this.setVal( targetDiv, 'lyte-grid-y', cur_data.y );
                                this.previousPos( data.length );
                            }
                            this.topMoveFunc( targetDiv, null, null, null, true );
                        }
                        this.previousPos( elem.querySelectorAll( __data.ltPropHandler ) );
                    }
                    if( ( propertyName == "height" || propertyName == "length" ) ){
                        this.indiv_child_render( targetDiv );
                    }
                    this.findGrid();  
                    if( this.getMethods( 'onPropertyChange' ) ) {
                           $L.fastdom.measure( function(){
                                $L.fastdom.mutate( function(){
                                    this.executeMethod( 'onPropertyChange', targetDiv, propertyName, data[ index ], this.$node );
                                }.bind( this ) )
                           }.bind( this ) )
                        }
                 }.bind(this);

            /**
             * @utility updateValue
             * @version 3.53.0
             */

            $node.updateValue = this.updateValue.bind( this );

            /**
             * @utility topMove
             * @version 3.53.0
             */
             
            $node.topMove = this.top_move.bind( this );

            this._resizeFunc = this.windowResize.bind(this);   
            this._initialWindowWidth = window.innerWidth
            
            window.addEventListener('resize', this._resizeFunc, true); 
            window.addEventListener( 'orientationchange', this._resizeFunc, true );
            
            this.didConnectWrk( true );
    },

    top_move : function( __elems ){

        if( __elems ){
            __elems = [ __elems ];
        } else {
            __elems = Array.from( this.get_elems() );
        }

        var __this = this,
        data = __this.data.lyteGridStack;

        __elems.forEach( function( item, index ){
             var hgt = __this.heightGet( item );

             if( hgt ){
                __this.$node.updateValue( item, { y : data[ index ].y - hgt } );
             }
        });
    },

    updateValue : function( grid_element, value, __force ){

        var index = grid_element.elemNum,
        data = this.data.lyteGridStack,
        cur_data = data[ index ],
        __x = cur_data.x,
        __y = cur_data.y,
        __length = cur_data.length,
        __height = cur_data.height,
        fn = function( value, _default, min, max ){
            var inf = Infinity;
            if( value == void 0 ){
                return Math.min( max || inf, Math.max( min || -inf, _default ) );
            }
            return Math.min( max || inf, Math.max( min || -inf, value ) );
        },
        new_obj = {
            x : fn( value.x, __x ),
            y : fn( value.y, __y ),
            length : fn( value.length, __length, value.minLength, value.maxLength ),
            height : fn( value.height, __height, value.minHeight, value.maxHeight )
        },
        resize = value.resize,
        is_resize = Object.keys( value ).length == 1 && resize != void 0,
        new_pos = __force ? new_obj : ( is_resize ? {} : this.emptySpaceFind( new_obj, index )[ 0 ] ),
        elements = this.scopeElement.querySelectorAll( this.data.ltPropHandler ),
        old_bottom = __y + __height,
        new_bottom = new_obj.y + new_obj.height;

        $L.extend( new_obj, new_pos );

        if( !is_resize ){
            for( var key in new_obj ){

                if( key == "resize" ){
                    continue;
                }

                var new_value = new_obj[ key ];

                this.setVal( grid_element, "lyte-grid-" + key.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase(), new_value );
                cur_data[ key ] = new_value;
            }

            this.positionFind( elements );
        }

        var cb = "onPropertyChange";

        if( !is_resize && !this.data.ltPropFloat ){
            var y_match = this.yElementsFind( __y + __height + 1, __y + __height + 1, this.data.yElements ),
            x_match = this.yElementsFind( __x + 1, __x + __length - 1, this.data.xElements ),
            final_match = this.multipleRemoval( this.multipleRemoval( this.similarData( y_match, x_match ) ) );

            final_match.forEach( function( item ){
                var __element = elements[ item ],
                hgtMove = this.heightGet( __element ),
                __data = data[ item ];

                if( hgtMove ){
                    __data.y -= hgtMove;
                    this.valueUpdating( item, 'lyte-grid-y', __data.y );
                    this.setVal( __element, 'lyte-grid-y', __data.y );
                }
                this.topMoveFunc( __element, null, null, null, true );
            }.bind( this ) );
        } 

        if( resize != void 0 ){
            var $grid = $L( grid_element );

            if( resize == "disabled" ){
                Array.from( $L( grid_element ).children( ".lyteGridResize" ) ).forEach( function( item ){
                    item.remove();
                });
            } else if( $grid.attr( 'lyte-grid-resize' ) == "disabled" ) {
                $grid.removeAttr( 'lyte-grid-resize' );
                this.create_resize( grid_element );
            }
        }

        if( __force && old_bottom < new_bottom ){
            this.__modifyflush = [];
            if( this.modified_vertical( grid_element, false, 1 ) ){
                this.global_flush();
            }
        }

        if( !is_resize ){
            this.previousPos( elements );
            this.positionFind( elements );
        }

         if( this.getMethods( cb ) ) {
           $L.fastdom.measure( function(){
                $L.fastdom.mutate( function(){
                    this.executeMethod( cb, grid_element, value, cur_data, this.$node );
                }.bind( this ) );
           }.bind( this ) );
        }
    },

    gridLength : function(width, ltPropUnitX1, ltPropMarginLeftCopy){
       ltPropMarginLeftCopy = ltPropMarginLeftCopy || 'ltPropMarginLeftCopy';
       var margin = parseInt( this.data.ltPropMarginLeftCopy ),
       ltPropUnitX = ltPropUnitX1 || this.data.ltPropUnitX , 
       len = parseInt( ( ( ( width ? width : (  ( this.bcrrelem || this.scopeElement.getBoundingClientRect() ).width ) ) - margin ) / ( ltPropUnitX + margin ) ).toFixed( 0 ) );
       return len;
    },

    columnModeLengthFind : function(){
        this._prevObs = true;
        
        var __data = this.data,
        length = __data.ltPropGridLength || __data.ltPropColumn,
        margin = __data.ltPropMarginLeftCopy || __data.ltPropMarginLeft,
        valueToSet = ( ( ( this.bcrrelem || this.scopeElement.getBoundingClientRect() ).width ) - ( length + 1 ) * margin ) / length;

        valueToSet = parseFloat( valueToSet.toFixed( 2 ) );

        this.setData('ltPropUnitX', valueToSet );
        delete this._prevObs;
    },

    didConnectWrk : function( flag, flag2 ){
        $L.fastdom.measure(function(){
            var __data = this.data,
            $node = this.$node;

            if( !$node.offsetParent ){
                return
            }

            $L( $node )[ ( __data.direction =  _lyteUiUtils.getRTL() ) ? 'addClass' : 'removeClass' ]( 'lyteRTL' );

            var element = this.scopeElement,
            bcrrelem = this.bcrrelem  = element.getBoundingClientRect(), 
            lyteQuerySelector = __data.lyteQuerySelector,
            ltPropColumnMode = __data.ltPropColumnMode, 
            handQuer = __data.ltPropHandler,
            iniData = __data.iniData,
            data = __data.lyteGridStack,
            elements = element.querySelectorAll( handQuer ),
            __length = elements.length,
            ltPropUnitX = __data.ltPropUnitX,
            lyteData = element.lyteData;

            Lyte.arrayUtils( iniData, 'remove', 0, iniData.length );

            if(ltPropColumnMode || __data.ltPropGridLength ){
                this.columnModeLengthFind();
            }
            if(!__data.gridLength || flag2 || ltPropColumnMode ){
                this.setData('gridLength', this.gridLength() );
            }
            if( !$node.ltProp( 'gridHeight' ) && !flag2 || ltPropColumnMode ){
                $node.ltProp( 'gridHeight', __data.gridLength );
            } else if( flag2 ){
                $node.ltProp('gridHeight', __data.gridLength );
            } 

            for( var i = 0; i < __length; i++ ) {
                iniData.push( this.initialPosFind( elements[ i ] ) );
            }

            $L.fastdom.mutate( this.initialValSet.bind( this ) );

            lyteData.gridLength = __data.gridLength
            lyteData.gridHeight = lyteQuerySelector.maxHeight;
            
            // this._initialXRatio = ltPropUnitX / ( bcrrelem.width - __data.gridLength * __data.ltPropMarginLeft  );
            // this._initialMarginRatio = this.data.ltPropMarginLeft / ltPropUnitX;
            $L.fastdom.mutate(function(){
                    this.render_child_grids( elements );
                    if( flag ){
                        if( this.getMethods('afterRender') ){
                            $L.fastdom.measure( function(){
                                $L.fastdom.mutate( function(){
                                    this.findGrid();
                                   /**
                                    * @method afterRender
                                    * @version 1.0.1
                                    */
                                    this.executeMethod( 'afterRender', this.$node );
                                }.bind( this ) )
                            }.bind( this ) )
                        }
                    }
            }.bind( this ) )
        }.bind( this ) ) 
    },
    // data 
    data : function(){
        return {
            // user data
           /**
            * @componentProperty {string} ltPropScope=''
            * @version 1.0.0
            */
            ltPropScope : Lyte.attr("string",{"default": ''}), 
           /**
            * @componentProperty {string} ltPropHandler=''
            * @version 1.0.0
            */
            ltPropHandler : Lyte.attr("string",{"default":''}),
           /**
            * @componentProperty {number} ltPropMarginLeft=10
            * @version 1.0.0
            */ 
            ltPropMarginLeft : Lyte.attr("number",{"default":10}), 
           /**
            * @componentProperty {number} ltPropMarginTop=10
            * @version 1.0.0
            */ 
            ltPropMarginTop : Lyte.attr("number",{"default":10}), 
           /**
            * @componentProperty {number} ltPropUnitX=50
            * @version 1.0.0
            */
            ltPropUnitX : Lyte.attr("number",{"default":50}), 
           /**
            * @componentProperty {number} ltPropUnitY=50
            * @version 1.0.0
            */
            ltPropUnitY : Lyte.attr("number",{"default":50}), 
           /**
            * @componentProperty {string[]} ltPropResizeDirection
            * @version 1.0.0
            * @default ["left","right","bottom","bottomRight","bottomLeft","top","topLeft","topRight"]
            */
            ltPropResizeDirection : Lyte.attr("array",{"default":['left', 'right', 'bottom', 'bottomRight', 'bottomLeft', 'top', 'topLeft', 'topRight']}), 
           /**
            * @componentProperty {boolean} ltPropFloat=false
            * @version 1.0.0
            */
            ltPropFloat : Lyte.attr("boolean",{"default": false}), 
           /**
            * @componentProperty {vertical | horizontal} ltPropDirection=vertical
            * @version 1.0.0
            */
            ltPropDirection : Lyte.attr("string",{"default":"vertical"}), 
           /**
            * @componentProperty {boolean} ltPropUndo=true
            * @version 1.0.0
            */
            ltPropUndo : Lyte.attr("boolean",{"default": true}), 
           /**
            * @componentProperty {boolean} ltPropResize=true
            * @version 1.0.0
            */
            ltPropResize : Lyte.attr("boolean",{"default": true}), 
           /**
            * @componentProperty {boolean} ltPropBestfit=true
            * @version 1.0.0
            */
            ltPropBestfit : Lyte.attr("boolean",{"default": true}), 
           /**
            * @componentProperty {number} ltPropMinUnitX=0
            * @version 1.0.0
            */
            ltPropMinUnitX : Lyte.attr('number',{default : 0}),
           /**
            * @componentProperty {number} ltPropMinMarginLeft=0
            * @version 1.0.1
            */
            ltPropMinMarginLeft : Lyte.attr('number',{default : 0}),
           /**
            * @componentProperty {string} ltPropBestfitClass=''
            * @version 1.0.1
            */
            ltPropBestfitClass : Lyte.attr('string', {default : ''}),
           /**
            * @componentProperty {boolean} ltPropFreezeMode=false
            * @version 1.0.1
            */
            ltPropFreezeMode : Lyte.attr('boolean', {default : false}),
           /**
            * @componentProperty {string} ltPropDefaultLength=2
            * @version 1.0.1
            */
            ltPropDefaultLength : Lyte.attr('string',{default : '2'}),
           /**
            * @componentProperty {string} ltPropDefaultHeight=2
            * @version 1.0.1
            */
            ltPropDefaultHeight : Lyte.attr('string',{default : '2'}),
           /**
            * @componentProperty {string} ltPropDefaultMinLength=1
            * @version 1.0.1
            */
            ltPropDefaultMinLength : Lyte.attr('string',{default : '1'}),
           /**
            * @componentProperty {string} ltPropDefaultMinHeight=1
            * @version 1.0.1
            */
            ltPropDefaultMinHeight : Lyte.attr('string',{default : '1'}),
           /**
            * @componentProperty {string} ltPropDefaultMaxHeight=0
            * @version 1.0.1
            */
            ltPropDefaultMaxHeight : Lyte.attr('string',{default : '0'}),
           /**
            * @componentProperty {string} ltPropDefaultMaxLength=0
            * @version 1.0.1
            */
            ltPropDefaultMaxLength : Lyte.attr('string',{default : '0'}),
           /**
            * @componentProperty {boolean} ltPropColumnMode=false
            * @version 1.0.1
            */
            ltPropColumnMode : Lyte.attr('boolean', {default : false}),
           /**
            * @componentProperty {number} ltPropColumn=false
            * @version 1.0.1
            */
            ltPropColumn : Lyte.attr('number', {default : 3}),
            /**
             * @typedef {object} preventObject
             * @property {boolean} horizontal=false
             * @property {boolean} vertical=false
             */

           /**
            * @componentProperty {preventObject} ltPropPrevent
            * @version 1.0.2
            */
            ltPropPrevent : Lyte.attr('object', { default : { horizontal : false, vertical : false }}),
           /**
            * @componentProperty {number} ltPropGridLength
            * @version 1.0.2
            */
            ltPropGridLength : Lyte.attr('number', {default : undefined}),
           /**
            * @componentProperty {default | grid } ltPropBestfitType=default
            * @version 1.0.2
            */
            ltPropBestfitType : Lyte.attr('string', { default : 'default'}),
           /**
            * @componentProperty {boolean} ltPropForcedReposition=false
            * @version 1.0.2
            */
            ltPropForcedReposition : Lyte.attr('boolean', { default : false}),
           /**
            * @componentProperty {boolean} ltPropSquareGrid=false
            * @version 1.0.2
            */
            ltPropSquareGrid : Lyte.attr('boolean', { default : false}),
           /**
            * @componentProperty {string} ltPropGridSpaceColor=#f8f8f8
            * @version 1.0.2
            */
            ltPropGridSpaceColor : Lyte.attr('string', { default : '#f8f8f8' }),
           /**
            * @componentProperty {boolean} ltPropHitBottom=false
            * @version 1.0.2
            */
            ltPropHitBottom : Lyte.attr('boolean', { default : false}),
           /**
            * @componentProperty {string} ltPropGridSelectionClass=lyteGridFocused
            * @version 1.0.4
            */
            ltPropGridSelectionClass: Lyte.attr( 'string', { default : 'lyteGridFocused' } ),
           /**
            * @componentProperty {object} ltPropVisibleBoundary={}
            * @version 1.0.4
            */
            ltPropVisibleBoundary : Lyte.attr( 'object', { default : {} } ),
           /**
            * @componentProperty {array} ltPropVisible
            * @version 1.0.4
            * @default []            
            */
            ltPropVisible : Lyte.attr( 'array', { default : [] } ),
           /**
            * @componentProperty {boolean} ltPropCheckCurrentPosition=false
            * @version 2.2.6
            */
            ltPropCheckCurrentPosition : Lyte.attr( 'boolean', { default : false } ),
           /**
            * @componentProperty {boolean} ltPropContainment=false
            * @version 2.2.6
            */
            ltPropContainment : Lyte.attr( 'boolean', { default : false } ),

            /**
             * @componentProperty {number} ltPropMaxGridHeight=Infinity
             * @version 3.45.0
             */
            ltPropMaxGridHeight : Lyte.attr( 'number', { default : Infinity } ),

            /**
             * @componentProperty {string} ltPropScrollElement
             * @version 3.53.0
             */
            ltPropScrollElement : Lyte.attr( "string", { default : void 0 } ),

            /**
             * @componentProperty {string} ltPropIgnoreDrag
             * @version 3.53.0
             */
            ltPropIgnoreDrag : Lyte.attr( "boolean", { default : false } ),

            /**
             * @componentProperty {string} ltPropMaintainOrder
             * @version 3.56.0
             */
            ltPropMaintainOrder : Lyte.attr( 'boolean', { default : false } ),


            ltPropScrollValue : Lyte.attr( 'number', { default : 10 } ),

            // system data
            /**
             * @experimental gridLength
             */
            gridLength : Lyte.attr("number",{"default":undefined}), 
            /**
             * @experimental ltPropGridHeight
             */
            ltPropGridHeight : Lyte.attr("number",{"default":undefined}),
            /**
             * @experimental ltPropMarginLeftCopy
             */
            ltPropMarginLeftCopy : Lyte.attr("number",{"default":10}), 
            /**
             * @experimental ltPropUnitxCopy
             */
            ltPropUnitxCopy : Lyte.attr("number",{"default":50}), 
            /**
             * @experimental lyteGridStack
             */ 
            lyteGridStack : Lyte.attr("array",{"default":[]}), 
            /**
             * @experimental elements
             */
            elements : Lyte.attr("object",{"default":undefined}), 
            /**
             * @experimental oriNode
             */
            oriNode : Lyte.attr("object",{"default":undefined}), 
            /**
             * @experimental xElements
             */
            xElements : Lyte.attr("array",{"default":[]}), 
            /**
             * @experimental yElements
             */
            yElements : Lyte.attr("array",{"default":[]}),
            /**
             * @experimental iniData
             */
            iniData : Lyte.attr('array', {'default' : []}),
            /**
             * @experimental lyteQuerySelector
             */
            lyteQuerySelector : Lyte.attr('object',{'default' : { SelectedNodes : [] }}),
            /**
             * @experimental direction
             */
            direction : Lyte.attr( 'boolean', { default : false } )
        }
    },  
    // undo
    undoPrevious : function(){
        var data = this.data.lyteGridStack, 
        lyteQuerySelector = this.data.lyteQuerySelector,
        elements = this.scopeElement.querySelectorAll( this.data.ltPropHandler ),
        currentPos = lyteQuerySelector.currentPos,
        __last = $L( data ).get( -1 ),
        __length = elements.length;

        if( currentPos <= __last.oldHeight.length && currentPos >= 1 ) {
            currentPos--;
            for( var i = 0; i < __length; i++ ) {
                var cur_data = data[ i ],
                node = cur_data.nodeName;

                cur_data.x = parseInt( cur_data.oldX[ currentPos ] );
                node.dataSet['lyte-grid-x-old'] = cur_data.x
                cur_data.y = parseInt( cur_data.oldY[ currentPos ] );
                node.dataSet['lyte-grid-y-old'] = cur_data.y
                cur_data.length = parseInt( cur_data.oldLength[ currentPos ] );
                node.dataSet['lyte-grid-length-old'] = cur_data.length
                cur_data.height = parseInt( cur_data.oldHeight[ currentPos ] );
                node.dataSet['lyte-grid-height-old'] = cur_data.height
            }
            this.displayGrid();
            lyteQuerySelector.currentPos = Math.max( currentPos, 0 );  
        }
    },
        // redo 
    undoNext : function(){
        var data = this.data.lyteGridStack, 
        lyteQuerySelector = this.data.lyteQuerySelector,
        elements = this.scopeElement.querySelectorAll( this.data.ltPropHandler ),
        currentPos = lyteQuerySelector.currentPos,
        last_data = $L( data ).get( -1 ),
        oldHeight = last_data.oldHeight;

        if( ( currentPos ) <= ( oldHeight.length - 1 ) ) {
            var dumm = currentPos < ( oldHeight.length - 1 ) ? ( currentPos + 1 ) : (oldHeight.length - 1 ),
            __length = elements.length;

            for( var i = 0; i < __length; i++ ) {
                var cur_data = data[ i ],
                node = cur_data.nodeName;

                cur_data.x = parseInt( cur_data.oldX[ dumm ] );
                node.dataSet['lyte-grid-x-old'] = cur_data.x;
                cur_data.y = parseInt( cur_data.oldY[ dumm ] );
                node.dataSet['lyte-grid-y-old'] = cur_data.y;
                cur_data.length = parseInt( cur_data.oldLength[ dumm ] );
                node.dataSet['lyte-grid-length-old'] = cur_data.length;
                cur_data.height = parseInt( cur_data.oldHeight[ dumm ] );
                node.dataSet['lyte-grid-height-old'] = cur_data.height;
            }
            this.displayGrid();
            lyteQuerySelector.currentPos = dumm;
        }
    },

     emptySpaceFind : function(objj, flagg, mappArray1, flag2){
        var __data = this.data,
        data = __data.lyteGridStack, 
        hgtShort,
        mappArray = [], 
        i,
        j,
        gridLength = __data.gridLength, 
        gridHeight = __data.ltPropGridHeight,
        ignore_shape;

        if( flagg != void 0 && flagg.constructor == Number ){
            ignore_shape = flagg;
            flagg = false;
        }

        if( !flagg ){
            for( i = 0; i < gridLength; i++ ) {
                mappArray.push( [] );
                for( var z = 0; z < gridHeight; z++ ) {
                    mappArray[ i ].push( false );
                }
            }

            var __length = data.length,
            maintainOrder = __data.ltPropMaintainOrder && __data.ltPropForcedReposition;

            for( i = 0; i < __length; i++ ) {   

                if( i == ignore_shape ){
                    continue;
                }

                var cur_data = data[ i ],
                cur_x = cur_data.x,
                cur_y = cur_data.y,
                cur_length = cur_data.length,
                cur_height = cur_data.height;

                if( maintainOrder ){
                    for( var k = 0; k <= cur_y; k++ ){
                        var x_limit = k == cur_y ? cur_x : gridLength;
                        for( var l = 0; l < x_limit; l++ ){
                            mappArray[ l ][ k ] = true;
                        }
                    }
                }

                if( cur_x != void 0 && cur_y != void 0 ) {
                    for( var k = cur_x; k < ( cur_x + cur_length ); k++ ) {
                        var __cur = mappArray[ k ];
                        for( var m = cur_y; m < ( cur_y + cur_height ); m++ ) {
                            if( cur_data.nodeName != objj.nodeName && __cur != undefined && __cur[ m ] != 'res' ) {
                                __cur[m] = true;
                            } else if( __cur && __cur[ m ] == false ) {
                                __cur[m] = 'res';
                            }   
                        }
                    }
                }
            } 
        } else {
             mappArray.push.apply( mappArray, mappArray1.slice() );
        }  

        var __length = objj.length,
        __height = objj.height;

        objj.length = __length != undefined ? __length : this.returnWid( __data.ltPropDefaultLength, true );  
        objj.height = __height != undefined ? __height : this.returnWid( __data.ltPropDefaultHeight );

        var __x = objj.x,
        __y = objj.y,
        xStar = __x || 0,
        yStar = __y || 0,
        __length = objj.length,
        __height = objj.height,
        xLim = __x != undefined && !isNaN( __x ) ? ( __x + 1 ) : ( gridLength + 1 - __length ),
        yLim = __y != undefined && !isNaN( __y ) ? ( __y ) : ( gridHeight - 1 ),
        max_height = __data.ltPropMaxGridHeight;

        if( __length > gridLength ){
            return [ { x : __x || 0, y : __y || 0 } , false ];
        }

        for( var i = yStar; i <= yLim; i++ ) {
            for( var j = xStar; j < xLim; j++ ) {
                var flag = true;
                for( var k = j; k < ( j + __length ); k++ ) {
                    for( var l = i; l < ( i + __height ); l++ ) {
                        if( mappArray[ k ] && mappArray[ k ][ l ] == true ) {
                            flag = false;
                            hgtShort = l - i;
                            break;
                        }
                    }
                    if( !flag ) {
                        break;
                    }   
                }
                if( flag && j < ( gridLength + 1 - __length ) ) {
                    var to_return = [ { x : j, y : i, length : __length, height : __height }, !flagg ];
                    
                    if( i + __height > max_height ){
                        to_return.push( false );
                    }

                    return to_return;
                }    
            }   
        }
        var temp,
        old_hgt = __data.ltPropGridHeight,
        __newhgt = gridHeight + __height;

        if( !flagg ){
            var sdObj = {
                length : __length, 
                height : __height, 
                nodeName : objj.nodeName
            };
            if( __x && !__y ) {
                this.setData('ltPropGridHeight', __newhgt ); 
                sdObj.x = __x;
            }
            temp = this.emptySpaceFind( sdObj, true, mappArray );
        }
       
       if( !temp ){
          this.setData( 'ltPropGridHeight', __newhgt );
          temp = this.emptySpaceFind( { length : __length, height : __height, nodeName : objj.nodeName }, true, mappArray, true );
        }  

        var to_return = temp.constructor == Array ? temp : [ temp, false ],
        __obj = to_return[ 0 ];

        if( __obj.y + __height > max_height ){
            to_return[ 2 ] = false;
            this.setData( 'ltPropGridHeight', old_hgt );
        }

        return to_return;
    },

    setup_positions : function(){
        this.data.lyteGridStack.forEach( this.set_individual_position.bind( this ) );
    },

    set_individual_position : function( obj ){

        var __data = this.data,
        marginLeft = __data.ltPropMarginLeftCopy,
        marginTop = __data.ltPropMarginTop,
        unitY = __data.ltPropUnitY,
        unitX = __data.ltPropUnitxCopy;

        if( obj.constructor == Number ){
            obj = __data.lyteGridStack[ obj ];
        }

        var node = $L( obj.nodeName ),
        __x = parseInt( node.attr( 'lyte-grid-x' ) ),
        __y = parseInt( node.attr( 'lyte-grid-y' ) ),
        __length = parseInt( node.attr( 'lyte-grid-length' ) ),
        __height = parseInt( node.attr( 'lyte-grid-height' ) ),
        obj = {},
        __left = this.rtlfunc( 'left' ),
        bcr = this.bcrrelem || ( this.bcrrelem = this.scopeElement.getBoundingClientRect() ),
        __width = bcr.width;

        if( isNaN( __x ) || isNaN( __y ) ){
            return;
        }

        if( node.hasClass( 'gridSelected' ) ){
            return;
        }

        var px_left = __x * unitX + ( ( __x + 1 ) * marginLeft ),
        px_width = ( __length * unitX + ( ( __length - 1) * marginLeft ) ),
        px_top = __y * unitY + ( ( __y + 1 ) * marginTop ),
        px_height = __height * unitY + ( __height - 1 ) * marginTop;

        obj[ __left ] = ( px_left * 100 / __width ) + '%';
        obj.top = px_top + 'px';
        obj.width =  ( px_width * 100 / __width ) + '%';
        obj.height =  px_height + 'px';

        node.css( obj ).data({
            left : px_left,
            top : px_top,
            width : px_width,
            height : px_height
        });
    },

    render_child_grids : function( elements ){
        Array.from( elements ).forEach( this.indiv_child_render.bind( this ) );
    },

    indiv_child_render : function( node ){
        var __grid = node.getElementsByTagName( 'lyte-gridstack' )[ 0 ];
        if( __grid ){
            __grid.reRender();
        }
    },

    mod_mousedown : function( evt, isTch ){
        var __data = this.data;

        if( __data.ltPropFreezeMode ){
            return;
        }

        var ret = this.nodeName( evt ),
        comp = this.$node,
        scope = this.scopeElement;

        this.bcrrelem = scope.getBoundingClientRect();
        this.__scrollbcr = this._scrollelem.getBoundingClientRect();

        this.__elements = this.get_elems();

        if( ret ){
            var value = ret[ 0 ],
            node = ret[ 1 ],
            $node = $L( node ),
            is_shift = evt.shiftKey,
            __selected = ( this.__selected = this.__selected || [] ),
            selected_cls = 'gridSelected',
            cb1 = "onBeforeSelect",
            cb2 = "onSelect",
            element = this.scopeElement,
            has_selected = $node.hasClass( selected_cls ),
            make_copy;

            if( is_shift ){
                if( value == "content" ){
                    if( has_selected ){
                        $node.removeClass( selected_cls );
                        var __index = __selected.indexOf( node );
                        if( __index + 1 ){
                            __selected.splice( __index, 1 );
                        }
                        delete node.offLeft; delete node.offTop; delete node.__x; delete node.__y; delete node.__length; delete node.__height;
                    } else {
                        $node.addClass( selected_cls );
                        __selected.push( node );
                        make_copy = true;
                    }
                } 
            } else {
                
                if( this.getMethods( cb1 ) && this.executeMethod( cb1, node, evt, comp ) == false ){
                    return;
                }

                if( !has_selected ){
                    $node.addClass( selected_cls );
                    __selected.push( node );
                    make_copy = true;
                }

                this.__clientX = evt.clientX;
                this.__clientY = evt.clientY;
                this.__value = value

                var __focusclass = __data.ltPropGridSelectionClass,
                handler = __data.ltPropHandler;

                $L( handler + '.' + __focusclass + ':not(.gridSelected)', comp ).removeClass( __focusclass );
                    
                if( __data.ltPropBestfit ) {
                    if( !this._bestfit ) {
                        var ltPropBestfitClass = __data.ltPropBestfitClass,
                        bestFit = this._bestfit = document.createElement('div'),
                        $bestfit = $L( bestFit );

                        $bestfit.addClass( 'lyteBestFit' );

                        if( __data.ltPropBestfitType == 'grid' ){
                            $bestfit.addClass( 'lyteGrid' );
                        }
                        if( ltPropBestfitClass ){
                            $bestfit.addClass( ltPropBestfitClass );
                        }
                        $bestfit.css( 'display', 'none' );
                        element.appendChild( bestFit );
                    }
                }

                var __doc = document,
                add = "addEventListener";

                __doc[ add ]( isTch ? 'touchmove' : "mousemove", this.__move = this.__move || this.modified_move.bind( this ), true );
                __doc[ add ]( isTch ? 'touchend' : "mouseup", this.__up = this.__up || this.modified_up.bind( this ), true );

                this.getMethods( cb2 ) && this.executeMethod( cb2, node, evt, comp );

                evt.preventDefault();
            }

            if( make_copy ){
                node.__x = parseInt( $node.attr( 'lyte-grid-x' ) );
                node.__y = parseInt( $node.attr( 'lyte-grid-y' ) );
                node.__length = parseInt( $node.attr( 'lyte-grid-length' ) );
                node.__height = parseInt( $node.attr( 'lyte-grid-height' ) );
            }
        }
    },

    modified_up : function( evt ){
        var __data = this.data,
        moved = this.__moved,
        isTch = /touch/i.test( evt.type ),
        is_resize = this.__value != "content",
        __selected = this.__selected,
        data = __data.lyteGridStack,
        cb = "onBeforeDrop",
        ret;

        if( moved && __selected.length ){
            ret = this.getMethods( cb ) && this.executeMethod( cb, __selected, evt, this.$node, is_resize ) == false;
        }
        
        __selected.forEach( function( item ){
            var $item = $L( item ).removeClass( 'gridSelected' ),
            cur_data = data[ item.elemNum ];

            delete item.offLeft;
            delete item.offTop;
            delete item.__x;
            delete item.__y;
            delete item.__length;
            delete item.__height;

            if( moved && !ret ){
                if( !__data.ltPropFloat ){
                    this.modified_topmove( item, void 0, true );
                }
                this.set_individual_position( cur_data );
            } else {
               $item.attr({
                "lyte-grid-x" : cur_data.x,
                "lyte-grid-y" : cur_data.y,
                "lyte-grid-length" : cur_data.length,
                "lyte-grid-height" : cur_data.height
               }) 
            }

        }.bind( this ) );

        if( !ret ){
            this.previousPos( data )
        } else {
            lyteQuerySelector.currentPos += 1;
            this.undoPrevious();
        }

        if( moved ){
            this.displayGrid();
        }

        $L( this._bestfit ).css( 'display', 'none' );

         var __doc = document,
         add = "removeEventListener";

        __doc[ add ]( isTch ? 'touchmove' : "mousemove", this.__move, true );
        __doc[ add ]( isTch ? 'touchend' : "mouseup", this.__up, true );

        window.cancelAnimationFrame( this.__raf );

        delete this.__moved;
        delete this.__up;
        delete this.__move;
        delete this.__clientY;
        delete this.__clientX;
        delete this.__selected;
        delete this.__value;
        delete this.__elements;
        delete this.bcrrelem;
        delete this.__modifyflush;
        delete this.__raf;

        if( !ret ){
            this.findGrid();
            this.getMethods( cb = "onDrop" ) && this.executeMethod( cb, __selected, evt, this.$node, is_resize );
        }
    },

    modified_move : function( ev, frm_raf ){

        window.cancelAnimationFrame( this.__raf );

        var is_tch = /touch/i.test( ev.type ),
        __this = this,
        __selected = __this.__selected,
        __data = __this.data,
        data = __data.lyteGridStack,
        __node = __this.$node,
        evt = ev;

        if( is_tch ){
            if( ev.touches.length > 1 ){
                return;
            }
            evt = ev.touches[ 0 ];
        }

        // if( this.__raf != void 0 && !frm_raf ){
        //     delete this.__raf;
            
        //     __this.__clientX = evt.clientX;
        //     __this.__clientY = evt.clientY;
        // }

        if( !__this.__moved ){
            __this.__moved = true;
            var cb = "onDragStart";
            __this.getMethods( cb ) && __this.executeMethod( cb, __this.retNode( __selected, data ), __node );
        }
        __this.__modifyflush = [];

        var __clientX = __this.__clientX,
        __clientY = __this.__clientY,
        new_clientX = evt.clientX,
        new_clientY = evt.clientY,
        yInc = new_clientY - __clientY,
        rtl_fact = __data.direction ? -1 : 1,
        xInc = ( new_clientX - __clientX ) * rtl_fact,
        __left = __this.rtlfunc( 'left' ),
        __value = __this.__value,
        unitX = __data.ltPropUnitxCopy,
        unitY = __data.ltPropUnitY,
        marginLeft = __data.ltPropMarginLeftCopy,
        marginTop = __data.ltPropMarginTop,
        convert_left = function( $item, _left ){
            if( /%$/.test( _left ) ){
                var x = parseInt( $item.attr( 'lyte-grid-x' ) );
                return x * unitX + ( ( x + 1 ) * marginLeft );
            }
            return parseFloat( _left );
        },
        convert_length = function( $item, _width ){
            if( /%$/.test( _width ) ){
                var __length = parseInt( $item.attr( 'lyte-grid-length' ) );
                return __length * unitX + ( ( __length - 1) * marginLeft );
            }
            return parseFloat( _width );
        },
        grid_length = __data.gridLength,
        grid_height = __data.ltPropMaxGridHeight,
        node,
        node_data,
        scroll_elem = __this._scrollelem,
        scope_bcr = __this.bcrrelem,
        containment = __data.ltPropContainment,

        _sW = scroll_elem.scrollWidth,
        _sH = scroll_elem.scrollHeight,
        _sL = scroll_elem.scrollLeft,
        _sT = scroll_elem.scrollTop,
        _oW = scroll_elem.offsetWidth,
        _oH = scroll_elem.offsetHeight,
        _ww = window.innerWidth,
        _wh = window.innerHeight,
        node_bcr,

        ignore_drag = __data.ltPropIgnoreDrag,
        __non_float = !__data.ltPropFloat,
        __left_limit = 0,
        __top_limit = 0,
        __right_limit = grid_length * unitX + ( ( grid_length + 1 ) * marginLeft ),
        __bottom_limit = grid_height * unitY + ( ( grid_height + 1 ) * marginTop );


        // if( this.__raf != void 0 && !frm_raf ){
        //     var ___fact = this.__raf_dir;

        //     if( ___fact == 1 && yInc > 0 ){
        //         yInc = 0;
        //     } else if( ___fact == -1 && yInc < 0 ){
        //         yInc = 0;
        //     }
        //     delete this.__raf;
        //     delete this.__raf_dir;
        // }

        __selected.forEach( function( item ){
            var style = item.style,
            obj = {},
            $item = $L( node = item ),
            _left = style[ __left ],
            _top = style.top,
            left_to = convert_left( $item, _left ),
            top_to = parseFloat( _top ),
            is_content = __value == "content",
            index = item.elemNum,
            cur_data = node_data = data[ index ],
            original_x = cur_data.x,
            original_y = cur_data.y,
            original_length = cur_data.length,
            original_height = cur_data.height,
            _width = style.width,
            _height = style.height,
            width_to = convert_length( $item, _width ),
            height_to = parseFloat( _height );

            if( is_content ){
                left_to += xInc;
                top_to += yInc;

                if( containment ){
                    left_to = Math.min( Math.max( 0, left_to ), __right_limit - width_to ) ;
                    top_to = Math.min( Math.max( 0, top_to ), __bottom_limit - height_to );
                }
            } else {
                var width_fact = 0,
                height_fact = 0,
                left_fact = 0,
                top_fact = 0,
                min_length = cur_data.minLength,
                max_length = cur_data.maxLength,
                min_height = cur_data.minHeight,
                max_height = cur_data.maxHeight,
                min_length_px = min_length * unitX + ( ( min_length - 1 ) * marginLeft ),
                max_length_px = max_length * unitX + ( ( max_length - 1 ) * marginLeft ),
                min_height_px = min_height * unitY + ( ( min_height - 1 ) * marginTop ),
                max_height_px = max_height * unitY + ( ( max_height - 1 ) * marginTop );

                if( /top/i.test( __value ) ){
                    height_fact = -1;
                    top_fact = 1;
                } else if( /bottom/i.test( __value ) ){
                    height_fact = 1;
                } else {
                    yInc = 0;
                }

                if( /left/i.test( __value ) ){
                    width_fact = -1;
                    left_fact = 1;
                } else if( /right/i.test( __value ) ){
                    width_fact = 1;
                } else {
                    xInc = 0;
                }

                width_to += ( width_fact * xInc );
                height_to += ( height_fact * yInc );
                left_to += ( left_fact * xInc );
                top_to += ( top_fact * yInc );

                var __old_width = width_to,
                __old_height = height_to;

                if( max_length < min_length ){
                    width_to = Math.max( width_to, min_length_px );
                } else {
                    width_to = Math.min( Math.max( width_to, min_length_px ), max_length_px );
                }

                if( max_height < min_height ){
                    height_to = Math.max( height_to, min_height_px );
                } else {
                    height_to = Math.min( Math.max( height_to, min_height_px ), max_height_px );
                }

                if( containment ){
                    if( width_fact ){
                        if( left_fact ){
                            width_to = Math.min( width_to, left_to + __old_width );
                        } else {
                            width_to = Math.min( width_to, __right_limit - left_to );
                        }
                    }

                    if( height_fact ){
                        if( top_fact ){
                            height_to = Math.min( height_to, top_to + __old_height );
                        } else {
                            height_to = Math.min( height_to, __bottom_limit - top_to );
                        }
                    }
                }

                obj.width = width_to;
                obj.height = height_to;

                var width_modification = __old_width - width_to,
                height_modification = __old_height - height_to;

                if( width_modification && left_fact ){
                    left_to += width_modification;
                    xInc = 0;
                }

                if( height_modification && top_fact ){
                    top_to += height_modification;
                    yInc = 0;
                }
            }
            
            obj[ __left ] = left_to;
            obj.top = top_to;

            item.offLeft = left_to;
            item.offTop = top_to;

            var __x = __this.returnY( item ),
            __y = __this.returnY( item, true ),
            new__x = Math.max( 0, __x ),
            new__y = Math.max( 0, __y ),
            __reset_position = false;

            node_bcr = {
                top : scope_bcr.top + top_to,
                height : height_to,
                width : width_to,
                left : scope_bcr.left + left_to + ( rtl_fact == 1 ? 0 : - width_to )
            };

            if( !is_content ){
                var __length = parseInt( ( ( width_to + marginLeft ) / ( marginLeft + unitX ) ).toFixed( 0 ) ),
                __height = parseInt( ( ( height_to + marginTop ) / ( marginTop + unitY ) ).toFixed( 0 ) );

                __length -= Math.abs( new__x - __x );
                __height -= Math.abs( new__y - __y );

                __length = Math.min( __length, grid_length - new__x );
                __height = Math.min( __height, grid_height - new__y );

                __this.setVal( item, 'lyte-grid-length', cur_data.length = __length, true );
                __this.setVal( item, 'lyte-grid-length', cur_data.height = __height, true );
            } else {
                new__x = Math.min( new__x, grid_length - original_length );
                if( grid_height != Infinity ){
                   new__y = Math.min( new__y, grid_height - original_height );
                }
            }

            if( !ignore_drag || !is_content ){
                __this.setVal( item, 'lyte-grid-x', cur_data.x = new__x, true );
                __this.setVal( item, 'lyte-grid-y', cur_data.y = new__y, true );
            }

            __this.positionFind();

            $item.css( obj );

            var is_hori_modified = ( cur_data.x != original_x || cur_data.length != original_length ),
            is_height_modified = cur_data.height != original_height,
            is_vert_modified = ( cur_data.y != original_y || is_height_modified );

            if( is_vert_modified && __this.modified_vertical( item, is_content, xInc, yInc ) ){
                __reset_position = true;
            }

            if( is_hori_modified ){
                if( __this.modified_horizontal( item, xInc ) ){
                    __reset_position = true;
                } else {
                    __reset_position = false;
                }

                if( __non_float && !__reset_position && xInc ){
                    __this.modified_topmoveall( item, xInc > 0 );
                }
            }

            if( __non_float && !__reset_position && is_height_modified && original_height > cur_data.height ){
                __this.modified_topmoveall( item );
            }

            if( __reset_position && xInc && is_content && cur_data.x != original_x ){
                cur_data.original_x = original_x;
                if( __this.check_interchange( item, xInc ) ){
                // if(  __this.check_interchange( item, original_x, yInc, xInc ) ){
                    __reset_position = true;
                } else {
                    original_x = cur_data.x;
                    original_y = cur_data.y;
                }
                delete cur_data.original_x;
            }

            if( __reset_position ){
                cur_data.x = original_x;
                cur_data.y = original_y;
                cur_data.length = original_length;
                cur_data.height = original_height;
                __this.positionFind();
            }

            var cb = "onDrag";

            __this.getMethods( cb ) && __this.executeMethod( cb, node, ev, __node );
        });

        __this.__clientX = new_clientX;
        __this.__clientY = new_clientY;

        if( is_tch ){
            ev.preventDefault();
        }

        if( __selected.length == 1 ){
            var abs_xInc = Math.abs( xInc ),
            abs_yInc = Math.abs( yInc );
            
            if( abs_xInc > abs_yInc && abs_xInc > 1 ){
                __this.modified_scrollcheck( ev, node, _sW, _oW, _sL, 'scrollLeft', __left, 'width', '__clientX', node_bcr, _ww, xInc );
            } else if( abs_yInc > abs_xInc && abs_yInc > 1 ){
                __this.modified_scrollcheck( ev, node, _sH, _oH, _sT, 'scrollTop', 'top', 'height', '__clientY', node_bcr, _wh, yInc );
            }

            if( node && __data.ltPropBestfit ){
                __this.setup_bestfit( node, node_data, __non_float ? this.heightGet( node ) : 0 );
            }
        }
    },

    modified_scrollcheck : function( evt, node, scrollWidth, offsetWidth, scrollLeft, _sL, left, width, __clientX, node_bcr, _ww, inc ){
        var __left = parseFloat( node.style[ left ] ),
        __width = parseFloat( node.style[ width ] ),
        fact = 0,
        scroll_bcr = this.__scrollbcr,
        modified_scroll;

        if( this.data.ltPropScrollElement ){
            if( left == "top" ){
                if( Math.max( 0, scroll_bcr.top ) > node_bcr.top && scrollLeft && inc < 0 ){
                    fact = -1;
                } else if( Math.min( _ww, scroll_bcr.top + scroll_bcr.height ) < ( node_bcr.top + node_bcr.height ) && inc > 0 ){
                    fact = 1;
                }
            } else {
                if( Math.max( 0, scroll_bcr.left ) > node_bcr.left && scrollLeft && inc < 0 ){
                    fact = -1;
                } else if( Math.min( _ww, scroll_bcr.left + scroll_bcr.width ) < ( node_bcr.left + node_bcr.width ) && inc > 0 ){
                    fact = 1;
                }
            }
            modified_scroll = fact;
        } else {
            if( __left < scrollLeft && inc < 0 ){
                if( scrollLeft ){
                    fact = -1;
                }
            } else if( __left + __width > ( offsetWidth + scrollLeft ) && inc > 0 ){
                // if( scrollLeft + offsetWidth < scrollWidth ){
                    fact = 1;
                // }
            }
        }

        if( fact ){

            var __new = Math.min( Math.max( 0, ( scrollLeft + this.data.ltPropScrollValue * fact ) ), scrollWidth - offsetWidth );
            
            this._scrollelem[ _sL ] = __new;
            this[ __clientX ] -= ( __new - scrollLeft );

            this.__raf_dir = fact;

            this.__raf = window.requestAnimationFrame( function(){
                delete this.__raf;
                delete this.__raf_dir;

                if( modified_scroll ){
                    this.bcrrelem = this.scopeElement.getBoundingClientRect();
                }
                this.modified_move( evt, true );
            }.bind( this ) );
        } else{
            return true;
        }
    },

    modified_vertical : function( item, is_content, xInc, yInc, frm_recursice, horizontal ){
        var overlap = this.overlap.apply( this, arguments ),
        left_top = overlap.left_top,
        right_top = overlap.right_top,
        left_bottom = overlap.left_bottom,
        right_bottom = overlap.right_bottom,
        mid = overlap.mid_vert,
        __arr = [],
        fn,
        consumed = overlap.consumed;

        if( yInc > 0 && is_content ){
            __arr = this.multipleRemoval( left_bottom.concat( right_bottom ).concat( mid ).concat( consumed ) );
            fn = horizontal || 'modified_toptobottom';
        } else if( yInc < 0 || !is_content ){
            __arr = this.multipleRemoval( left_top.concat( right_top ).concat( mid ).concat( consumed ) );
            fn =  horizontal || 'modified_bottomtotop';
        } else {
            return true;
        }

        if( __arr.length ){
            return this[ fn ]( item, __arr, xInc, yInc, frm_recursice, is_content );
        }
    },

    modified_horizontal : function( item, xInc ){
        var elems = this.check_interchange( item, xInc, true ),
        __data = this.data,
        data = __data.lyteGridStack,
        ret,
        index = item.elemNum,
        max_height = __data.ltPropMaxGridHeight,
        ori_data = data[ index ],
        __y = ori_data.y,
        __height = ori_data.height,
        __bottom = __y + __height,
        elements = this.__elements || this.get_elems(),
        modified = [];

        elems.reverse().every( function( item ){
           if( item == index ){
             return true;
           }

           var cur_data = data[ item ],
           node = cur_data.nodeName;

           if( max_height < __bottom + cur_data.height ){
                ret = true;
            } else {
                this.push_to_modifications( node, cur_data, __bottom, cur_data.y, modified, elements );

                if( !$L( node ).hasClass( 'gridSelected' ) ){
                    this.set_individual_position( cur_data );
                }
                ret = this.modified_vertical( node, true, xInc, -1, true );
            }
           return !ret;
        }.bind( this ) ); 

        if( !ret ){
            ret = !!this.get_common_elems( ori_data.x, ori_data.x + ori_data.length, __y, __bottom ).filter( function( x_item ){
                return x_item != index;
            }).length;
        }

        if( ret ){
            modified.length && this.flush_modified( modified, elements );
        } else {
            this.__modifyflush.push( this.flush_modified.bind( this, modified, elements ) );
        }

        return ret;
    },

    global_flush : function(){
        var arr = this.__modifyflush;

        this.__modifyflush = [];

        arr.forEach( function( item ){
            item();
        });
    },

    check_interchange : function( item, xInc, return_elems ){
        var is_right = xInc > 0,
        __data = this.data,
        data = __data.lyteGridStack,
        ret,
        index = item.elemNum,
        ori_data = data[ index ],
        __x = ori_data.x,
        __length = ori_data.length,
        __y = ori_data.y,
        __height = ori_data.height,
        xElements = __data.xElements,
        original_x = ori_data.original_x,
        max_length = 0,
        modify = [],
        elements = this.__elements || this.get_elems(),
        grid_length = __data.gridLength,
        elems = ( function( __this ){
          var yelems,
          xelems,
          yElements = __data.yElements;

          if( __height == 1 ){
             yelems = __this.similarData( yElements[ __y ], yElements[ __y + 1 ] );
          } else {
            yelems = __this.yElementsFind( __y + 1, __y + __height - 1, yElements );
          }

          yelems = __this.multipleRemoval( yelems );

          if( xInc > 0 ){
            xelems = __this.similarData( xElements[ __x + __length - 1 ], xElements[ __x + __length ] );
          } else {
            xelems = __this.similarData( xElements[ __x + 1 ], xElements[ __x ] );
          }

          return __this.similarData( __this.multipleRemoval( xelems ), yelems );

        })( this );

        if( return_elems ){
            return elems;
        }

        elems.every( function( item ){

            if( item == index ){
                return true;
            }

            var cur_data = data[ item ],
            length = cur_data.length,
            x = cur_data.x,
            y = cur_data.y,
            height = cur_data.height,
            right = x + length,
            bottom = y + height,
            new__x = x + ( __length * ( is_right ? -1 : 1 ) ),
            int_elems = this.get_common_elems( new__x, new__x + length, y, bottom ).filter( function( x_item ){
                return x_item != index && x_item != item;
            }); 

            if( new__x < 0 || new__x + length > grid_length ){
                ret = true;
                return;
            }

            if( int_elems.length == 0 ){
                modify.push({
                    data : cur_data,
                    value : new__x
                });
            } else {
                ret = true;
            }

            max_length = Math.max( max_length, length );

            return !ret;
        }.bind( this ) );

        if( !ret ){
            if( modify.length == 0 ){
                return true;
            }

            var fn = function( __item, allow ){
                var cur_data = __item.data,
                __node = cur_data.nodeName;

                this.setVal( __node, 'lyte-grid-x', cur_data.x = __item.value, true );
                this.positionFind( elements );
                if( allow ){
                  var hgt = this.heightGet( __node, item );
                  if( hgt ){
                    this.setVal( __node, 'lyte-grid-y', cur_data.y -= hgt, true );
                    this.positionFind( elements );
                  }
                  this.set_individual_position( __item.data );
                }
            },
            final_expected = original_x + ( max_length * ( is_right ? 1 : -1 ) );

            if( final_expected < 0 || final_expected + __length > grid_length ){
                return true;
            }

            var __intersects = this.get_common_elems( final_expected, final_expected + __length, __y, __y + __height ).filter( function ( item ){
                return elems.indexOf( item ) == -1;
            });

            if( __intersects.length ){
                return true;
            }

            modify.forEach( function( item ){
                fn.call( this, item, true );
            }.bind( this ) );

            fn.call( this, {
                data : ori_data,
                value : final_expected
            });
        }

        return ret;
    },

    get_common_elems : function( x1, x2, y1, y2 ){
        var __data = this.data,
        __xElements = __data.xElements,
        __yElements = __data.yElements,
        x_match = x2 - x1 == 1 ? this.similarData( __xElements[ x1 ], __xElements[ x2 ] ) : this.multipleRemoval( this.yElementsFind( x1 + 1, x2 - 1, __xElements ) ),
        y_match = y2 - y1 == 1 ? this.similarData( __yElements[ y1 ], __yElements[ y2 ] ) : this.multipleRemoval( this.yElementsFind( y1 + 1, y2 - 1, __yElements ) );

        return this.similarData( x_match, y_match );
    },

    modified_topmoveall : function( item, __right ){
        var __data = this.data,
        data = __data.lyteGridStack,
        index = item.elemNum,
        cur_data = data[ index ],
        position,
        elems,
        elements = this.__elements || this.get_elems(),
        xElements = __data.xElements,
        __length = cur_data.length,
        __x = cur_data.x;

        if( __right == void 0 ){
            if( __length == 1 ){
                elems = this.similarData( xElements[ __x ], xElements[ __x + 1 ] );
            } else {
                elems = this.multipleRemoval( this.yElementsFind( __x + 1, __x + __length - 1, xElements ) );
            }
        } else {
            position = __right ? ( __x - 1 ) : ( __x + __length + 1 );
            elems = xElements[ position ] || [];
        }

        elems.forEach( function( __item ){
            if( __item == index ){
                return;
            }
            this.modified_topmove( data[ __item ].nodeName, elements );
        }.bind( this ) );
    },

    common_bottom_move : function( item, elems ){
        var __data = this.data,
        data = __data.lyteGridStack,
        ret,
        modified = [],
        index = item.elemNum,
        ori_data = data[ index ],
        max_height = __data.ltPropMaxGridHeight,
        elements = this.__elements || this.get_elems(),
        ori_bottom = ori_data.y + ori_data.height;

        elems.every( function( __item ){
            var cur_data = data[ __item ],
            node = cur_data.nodeName,
            old_y = cur_data.y,
            new__y = ori_bottom;

            if( new__y + cur_data.height > max_height ){
                ret = true;
            } else {
                this.push_to_modifications( node, cur_data, new__y, old_y, modified, elements );

                if( !$L( node ).hasClass( 'gridSelected' ) ){
                    this.set_individual_position( cur_data );
                }
                ret = this.modified_vertical( node, true, 0, -1, true );
            }

            return !ret;
        }.bind( this ) );

        if( ret ){
            this.flush_modified( modified, elements );
        } else {
            this.__modifyflush.push( this.flush_modified.bind( this, modified, elements ) );
        }

        return ret;
    },

    modified_toptobottom : function( item, elems, xInc, yInc, is_content ){
        var __data = this.data,
        data = __data.lyteGridStack,
        ret,
        modified = [],
        index = item.elemNum,
        ori_data = data[ index ],
        exp_y = 0,
        max_height = __data.ltPropMaxGridHeight,
        elements = this.__elements || this.get_elems(),
        __float = __data.ltPropFloat;

        elems.every( function( __item ){
            var cur_data = data[ __item ],
            node = cur_data.nodeName,
            old_y = cur_data.y,
            hgt = this.heightGet( node, item ),
            cur_hgt = cur_data.height;

            if( __float ){                
                hgt = Math.max( 0, Math.min( hgt, cur_hgt, old_y, old_y + cur_hgt - ori_data.y ) );
            }

            if( hgt ){
                var new__y  = old_y - hgt;
                exp_y = Math.max( new__y + cur_hgt, exp_y );
                if( max_height < exp_y + ori_data.height ){
                    ret = true;
                } else {
                    this.push_to_modifications( node, cur_data, new__y, old_y, modified, elements )
                    this.set_individual_position( cur_data );
                }
            } else {
                exp_y = Math.max( exp_y, cur_data.y + cur_hgt );

                if( max_height < exp_y + ori_data.height ){
                    ret = true;
                }
            }

            return !ret;
        }.bind( this ) );

        if( ret ){
            this.flush_modified( modified, elements );
        } else {
            this.push_to_modifications( item, ori_data, exp_y, ori_data.y, modified, elements );

            if( this.modified_vertical( item, is_content == void 0 ? true : is_content, xInc, -1, true ) ){
                this.flush_modified( modified, elements );
                return true;
            }

            Array.from( elements ).forEach( function( __item ){
                if( item == __item || $L( __item ).hasClass( 'gridSelected' ) ){
                    return;
                }
                !__data.ltPropFloat && this.modified_topmove( __item, elements );
            }.bind( this ) );

            this.__modifyflush.push( this.flush_modified.bind( this, modified, elements ) );
        }

        return ret;
    },

    modified_topmove : function( __item, elements, force ){
        var __data = this.data,
        data = __data.lyteGridStack,
        hgt = this.heightGet( __item );

        if( hgt || force ){
            var index = __item.elemNum,
            cur_data = data[ index ];
            if( hgt ){
                this.setVal( __item, 'lyte-grid-y', cur_data.y -= hgt, true );
                this.positionFind();

                this.set_individual_position( cur_data ); 
            }

            force = true;

            if( force ){
                var __height = cur_data.height,
                __length = cur_data.length,
                __x = cur_data.x,
                __y = cur_data.y,
                arr = [],
                xelems,
                xElements = __data.xElements,
                yelems = this.yElementsFind( __y + __height, __data.lyteQuerySelector.MaxBottom, __data.yElements );
                if( __length == 1 ){
                    xelems = this.similarData( xElements[ __x ], xElements[ __x + 1 ] );
                } else {
                    xelems = this.yElementsFind( __x + 1, __x + __length - 1, xElements );
                }

                arr = this.similarData( this.multipleRemoval( xelems ), yelems );

                arr.forEach( function( item ){
                    if( item ==  index ){
                        return;
                    }
                    !__data.ltPropFloat && this.modified_topmove( data[ item ].nodeName, elements || this.__elements || this.get_elems() );
                }.bind( this ) );
            }
        }
    },

    flush_modified : function( modified, elements ){
        modified.forEach( function( __item ){
            this.setVal( __item.node, 'lyte-grid-y', __item.data.y = __item.value, true );
            if( !$L( __item.node ).hasClass( 'gridSelected' ) ){
                this.set_individual_position( __item.data );
            }
        }.bind( this ) );
        this.positionFind( elements );
        this.__modifyflush.length && this.global_flush();
    },

    push_to_modifications : function( node, cur_data, current_bottom, old_y, modified, elements ){
        this.setVal( node, 'lyte-grid-y', cur_data.y = current_bottom, true );
        this.positionFind( elements );
        modified.push( {
            node : node,
            value : old_y,
            data : cur_data
        });
    },

    modified_bottomtotop : function( item, elems, xInc, yInc, frm_recursice, is_content ){
         var __data = this.data,
        data = __data.lyteGridStack,
        ret,
        modified = [],
        index = item.elemNum,
        ori_data = data[ index ],
        max_height = __data.ltPropMaxGridHeight,
        current_bottom = ori_data.y + ori_data.height,
        elements = this.__elements || this.get_elems();

        elems.every( function( __item ){
            var cur_data = data[ __item ],
            node = cur_data.nodeName,
            old_y = cur_data.y;

            if( !frm_recursice ){
                var hgt = this.heightGet( item, node );
                if( hgt ){
                    this.push_to_modifications( item, ori_data, ori_data.y - hgt, ori_data.y, modified, elements );
                    current_bottom -= hgt;

                    if( current_bottom < old_y ){
                        return true;
                    }
                }
            }
            
            if( max_height < current_bottom + cur_data.height ){
                ret = true;
            } else {
                this.push_to_modifications( node, cur_data, current_bottom, old_y, modified, elements );

                if( !$L( node ).hasClass( 'gridSelected' ) ){
                    this.set_individual_position( cur_data );
                }
                ret = this.modified_vertical( node, is_content == void 0 ? true : is_content, xInc, yInc, true );
            }

            return !ret;
        }.bind( this ) );

        if( ret ){
            modified.length && this.flush_modified( modified, elements );
            return ret;
        } else {
            this.__modifyflush.push( this.flush_modified.bind( this, modified, elements ) );
        }
    },

    overlap : function( item, is_content, xInc, yInc ){
        var __data = this.data,
        elems = this.__elements || this.get_elems(),
        index = item.elemNum,
        data = __data.lyteGridStack,
        cur_data = data[ index ],
        xElements = __data.xElements,
        yElements = __data.yElements,
        __length = cur_data.length,
        __x = cur_data.x,
        __height = cur_data.height,
        __y = cur_data.y,
        fn = function( arr ){
            var __index = arr.indexOf( index );
            if( __index + 1 ){
                arr.splice( __index, 1 );
            }
            return arr;
        }.bind( this ),
        right_overlap,
        left_overlap,
        top_overlap,
        bottom_overlap,
        hori_mid,
        vert_mid,
        fake_x,
        fake_y;

        if( __length != 1 ){
            right_overlap = this.similarData( xElements[ __x + __length - 1 ].slice(), xElements[ __x + __length ].slice() );
            left_overlap = this.similarData( xElements[ __x ].slice(), xElements[ __x + 1 ].slice() );

            hori_mid = this.multipleRemoval( this.yElementsFind( __x + 1, __x + __length - 1, xElements ) );
        } else {
           var __overlap = this.similarData( xElements[ __x ], xElements[ __x + 1 ] );

           if( xInc ){
               if( xInc > 0 ){
                 right_overlap = __overlap;
                 left_overlap = [];
               } else if( xInc < 0 ){
                 left_overlap = __overlap;
                 right_overlap = [];
               }
           } else {
                left_overlap = __overlap.slice();
                right_overlap = __overlap.slice();
           }
           hori_mid = this.multipleRemoval( this.similarData( xElements[ __x ], xElements[ __x + 1 ] ) );
        }

        if( __height != 1 ){
            bottom_overlap = this.similarData( yElements[ __y + __height - 1 ].slice(), yElements[ __y + __height ].slice() );
            top_overlap = this.similarData( yElements[ __y ].slice(), yElements[ __y + 1 ].slice() );
            vert_mid = this.multipleRemoval( this.yElementsFind( __y + 1, __y + __height - 1, yElements ) );
        } else {
            var __overlap = this.similarData( yElements[ __y ], yElements[ __y + 1 ] );
            if( yInc ){
               if( yInc > 0 ){
                 bottom_overlap = __overlap;
                 top_overlap = [];
               } else if( yInc < 0 ){
                 top_overlap = __overlap;
                 bottom_overlap = [];
               }
           } else {
              top_overlap = __overlap.slice();
              bottom_overlap = __overlap.slice();
           }
           vert_mid = this.multipleRemoval( this.similarData( yElements[ __y  ], yElements[ __y + 1 ] ) );
        }
        
        var left_top = fn( this.similarData( left_overlap, top_overlap ) ),
        left_bottom = fn( this.similarData( left_overlap, bottom_overlap ) ),
        right_top = fn( this.similarData( right_overlap, top_overlap ) ),
        right_bottom = fn( this.similarData( right_overlap, bottom_overlap ) ),
        mid_vert = fn( this.multipleRemoval( this.similarData( hori_mid, top_overlap ).concat( this.similarData( hori_mid, bottom_overlap ) ) ) ),
        mid_hori = fn( this.multipleRemoval( this.similarData( vert_mid, left_overlap ).concat( this.similarData( vert_mid, right_overlap ) ) ) ),
        consumed = fn( this.multipleRemoval( this.similarData( this.yElementsFind( __x + 1, __x + __length - 1, xElements ), this.yElementsFind( __y + 1, __y + __height - 1, yElements ) ) ) );

        return {
           left_top : left_top,
           left_bottom : left_bottom,
           right_top : right_top,
           right_bottom : right_bottom,
           mid_vert : mid_vert,
           mid_hori : mid_hori,
           consumed : consumed
        };
    },

    get_elems : function(){
        return this.scopeElement.querySelectorAll( this.data.ltPropHandler );
    },

                        /*Placeholder code*/

    placeholder : function( ns, evt, element, obj ){
        return this[ ns + '_place' ]( evt, obj, element );
    },

    get_value_from_evt : function( evt, element, obj, __placeholder ){
        var __this = this,
        __data = __this.data,
        length = __data.gridLength,
        __bcr = 'getBoundingClientRect',
        scope_bcr = __this.scopeElement[ __bcr ](),
        bcr = element[ __bcr ](),
        unitX = __data.ltPropUnitxCopy,
        unitY = __data.ltPropUnitY,
        margin_left = __data.ltPropMarginLeftCopy,
        margin_top = __data.ltPropMarginTop,
        __x_diff = __this.rtlfunc( bcr, 'bccr' ) - __this.rtlfunc( scope_bcr, 'bccr' ),
        __y_diff = bcr.top - scope_bcr.top,
        x_diff = Math.max( 0, __x_diff ),
        y_diff = Math.max( 0, __y_diff ),
        __fastdom = $L.fastdom,
        return_obj = {
            length : obj.length,
            height : obj.height,
            x : Math.min( parseInt( ( ( x_diff - margin_left ) / ( unitX + margin_left ) ).toFixed( 0 ) ), length - obj.length ),
            y : parseInt( ( ( y_diff - margin_top ) / ( unitY + margin_top ) ).toFixed( 0 ) )
        },
        new_pos = this.emptySpaceFind( return_obj );

        if( new_pos.length == 3 ){
            new_pos = this.emptySpaceFind({
                length : obj.length,
                height : obj.height
            });

            if( new_pos.length == 3 ){
                return false;
            }
        } 

        return_obj = new_pos[ 0 ];

        __fastdom.measure( function(){
            __fastdom.mutate( function(){
                __placeholder.style.top = __y_diff + 'px';
                __placeholder.style[ __this.rtlfunc( 'left' ) ] = __x_diff + 'px';
            });
        });

        return return_obj;

    },

    create_place : function( evt, obj, __element ){
        var element = document.createElement( "div" ),
        __data = this.data,
        handler = $L( __data.ltPropHandler.split( " " ) ).get( -1 ),
        class_rgx = /^\./,
        id_rgx = /^#/,
        classList = element.classList,
        __evt = evt.touches ? evt.touches[ 0 ] : evt,
        position_obj = this.get_value_from_evt( evt, __element, obj, element );

        if( position_obj == false ){
            return false;
        }

        if( class_rgx.test( handler ) ){
            classList.add( handler.replace( class_rgx, '' ) );
        } else if( id_rgx.test( handler ) ){
            element.id = handler.replace( id_rgx, '' );
        }

        classList.add( "lyteGridStackPlaceholder" );

        this.$node.addGrid( element, position_obj, true );

        this.__placeholder = element;
        element.__obj = obj;

        this.__clientX = __evt.clientX;
        this.__clientY = __evt.clientY;

        return {
            grid : element,
            props : obj
        };
    },

    update_place : function( evt, element, obj ){
        var __placeholder = this.__placeholder,
        scope = this.scopeElement;

        if( !__placeholder ){
           var ret = this.create_place( evt, obj, element );
           if( ret == false ){
             return false;
           }
           __placeholder = this.__placeholder;
        } else if( scope.contains( __placeholder ) ) {
            if( !this.__mousebound ){
                var __bcr = 'getBoundingClientRect';
                this.bcrrelem = scope[ __bcr ]();
                this.__scrollbcr = this._scrollelem[ __bcr ]();
                this.__selected = [ __placeholder ];
                this.__mousebound = true;
                this.__value = "content";

                __placeholder.classList.add( 'gridSelected' );
            }
            this.create_best_fit();
            this.modified_move( evt );
        }

        return __placeholder;
    },

    remove_place : function(){
        var placeholder = this.__placeholder;

        if( placeholder ){
            delete placeholder.__obj;
            this.$node.removeGrid( placeholder );
            $L( this._bestfit ).css( 'display', 'none' );

            window.cancelAnimationFrame( this.__raf );

            var __arr = [ '__moved', '__elements', 'bcrrelem', '__modifyflush', '__raf', '__placeholder', '__clientX', '__clientY', '__scrollbcr', '__selected', '__mousebound', '__value' ],
            __length = __arr.length;

            for( var i = 0; i < __length; i++ ){
                delete this[ __arr[ i ] ];
            }
        }
    },

    get_place : function(){
        return this.__placeholder;
    },

                        /*Placeholder code*/

    create_best_fit : function(){
        if( this._bestfit ){
            return;
        }
        var element = this.scopeElement,
        __data = this.data,
        ltPropBestfitClass = __data.ltPropBestfitClass,
        bestFit = this._bestfit = document.createElement('div'),
        $bestfit = $L( bestFit );

        $bestfit.addClass( 'lyteBestFit' );

        if( __data.ltPropBestfitType == 'grid' ){
            $bestfit.addClass( 'lyteGrid' );
        }
        if( ltPropBestfitClass ){
            $bestfit.addClass( ltPropBestfitClass );
        }
        $bestfit.css( 'display', 'none' );
        element.appendChild( bestFit );
    }
}); 


/**
* @syntax yielded gridstack
* <lyte-gridstack lt-prop-scope="div.lyteGridStack " lt-prop-handler=".lyteGridStackItem " lt-prop-grid-length= 11  lt-prop-bestfit-type="grid " >
*    <template is="registerYield" yield-name="lyteGridStack">
*       <div class="lyteGridStack">
*          <div class="lyteGridStackItem" lyte-grid-x="2" lyte-grid-y="0" lyte-grid-length="2" lyte-grid-height="3" >
*             <lyte-grid-content> 1</lyte-grid-content>
*          </div>
*          <div  class="lyteGridStackItem" lyte-grid-x="2" lyte-grid-y="3" lyte-grid-length="2" lyte-grid-height="3"  lyte-prop-resize="disabled" >
*             <lyte-grid-content  > 1</lyte-grid-content>
*          </div>
*      </div>
*    </template>
* </lyte-gridstack>
*/   


;( function(){
    var isRtl;

    function rtlfunc( lft, bcr, ww ) {
              if( isRtl ) {
                if( bcr ) {
                    if( lft == 'right' ) {
                        return ww - bcr.left;
                    } else if( lft == 'clientX' ) {
                        return ww - bcr.clientX
                    }
                    return ww - bcr.right;
                } else if( lft == 'left' ) {
                    return 'right';
                } 
              }
              return bcr ? bcr[ lft ] : lft;
        }

    function destroy(){
        var remove_global_events = function( win_elem, elem ){
            if( win_elem && elem.contains( win_elem ) ){
                document.removeEventListener( 'mousemove', mousemove, true );
                document.removeEventListener( 'mouseup', mouseup, true );
                document.removeEventListener( 'touchmove', mousemove, true );
                document.removeEventListener( 'touchend', mouseup, true );
                mouseup( {}, true );
            }
        };
        this.each( function( index, item ){
            var current = $L( item ),
            activeElems = current.data( 'activeElems' ) || {},
            elem = current.get( 0 ),
            resizeData = elem._resizeData,
            win_elem = window._resizeelem;

            if( !resizeData ){
                return;
            }

            remove_global_events( win_elem, elem );

            for( var key in activeElems ){  
                activeElems[ key ].remove();
            }
            if( resizeData.component == 'table' ){
                removeActive.call( elem );
                elem.removeEventListener( 'mousemove', tableMove, true );
                elem.removeEventListener( 'mousedown', tableDown, true );
                elem.removeEventListener( 'mouseout', removeActive, true );
                elem.removeEventListener( 'touchmove', tableMove, true );
                elem.removeEventListener( 'touchstart', tableDown, true );
            }
            if( elem._clone ){
                elem._clone.remove();
                delete elem._clone._elem;
                delete elem._clone;
            }
        })
        return this;
    }

    function getBcr( elem ){
        var bcr = elem.getBoundingClientRect();
        return {
            left : bcr.left,
            right : bcr.right,
            top : bcr.top,
            bottom : bcr.bottom,
            width : elem.offsetWidth,
            height : elem.offsetHeight
        };
    }

    function getStyle( elem ){
        return window.getComputedStyle( elem );
    }

    function bind( obj ){
        this.each( function( index, item ){
            if( item._resizeData ){
                $L( item ).enableResize( 'destroy' );
            }
            bindEvents( item, $L.extend( true, {}, obj ) );
        }) 
    }

    function bindEvents( item, obj ){
        item._resizeData = obj;

        if( obj.component == "table" ){
            item.addEventListener( 'mousedown', tableDown, true );
            item.addEventListener( 'touchdown', tableDown, true );
            item.addEventListener( 'mousemove', tableMove, true );
            item.addEventListener( 'mouseout', removeActive, true );
        }

        createResize( item );
    }

    function createResize( elem ){
            var obj = elem._resizeData,
            directions = obj.directions,
            rotation = obj.rotation,
            activeElems = {},
            dirs = { N : { height : true, top : true }, S : { height : true }, W : { left : true, width : true }, E : { width : true }, SW : { height : true, left : true, width : true }, SE : { height : true, width : true }, NW : { top : true, height : true, left : true, width : true }, NE : { top : true, height : true, width : true } },
            clone;
            $L( elem ).data( 'activeElems', activeElems ).addClass( 'lyteResizeElement' );
            if( obj.clonedShape ){
                clone = $L( document.createElement( 'div' ) ).addClass( 'lyteResizeClone' ).get( 0 );
            }
            for( var i = 0; i < directions.length; i++ ){
                var curDir = directions[ i ],
                newelem = $L( document.createElement( 'div' ) ).addClass( 'lyteResizeHandle', 'lyteResize' + curDir ).data( { directions : dirs[ curDir ], element : elem, value : curDir } ).get( 0 );
                activeElems[ curDir ] = newelem;
                ( clone || elem ).appendChild( newelem );
                newelem.addEventListener( 'mousedown', mousedown, true );
                newelem.addEventListener( 'touchstart', mousedown, true );
            }
            if( clone ){
                elem.appendChild( clone );
                clone._elem = elem;
                elem._clone = clone;
            }
        }


    function getCell( element, direction ){
        var data = this._resizeData,
        tags = data.tags,
        __matches = function( query, __element ){
            if( __element.matches ){
                return __element.matches( query );
            }
            return getIndex( toArray( this.querySelectorAll( query ) ), __element ) != -1;
        }.bind( this );

        if( __matches( tags.th, element ) ){
            return element;
        }
        var row = element.parentNode,
        cells = toArray( row.children ),
        tbody = row.parentNode,
        rows = toArray( tbody.children ),
        cellIndex = getIndex( cells, element ),
        rowIndex = getIndex( rows, row );

        if( direction ){
            var rowSpan = element.rowSpan || 1;
            if( rowSpan == 1 ){
                return element;
            }
            var newrow = rows[ rowIndex + rowSpan - 1 ],
            newcells = newrow.children,
            new_length = newcells.length;

            for( var i = 0; i < new_length; i++ ){
                var cur = newcells[ i ];
                if( cur.style.display == "none" || ( cur.rowSpan || 1 ) != 1 ){
                    continue;
                }
                return cur;
            }

            new_length = cells.length;

            for( var i = 0; i < new_length; i++ ){
                var cur = cells[ i ];
                if( cur.style.display == "none" || ( cur.rowSpan || 1 ) != 1 ){
                    continue;
                }
                return cur;
            }
            return element;
        } else {
            return tbody.previousElementSibling.children[ 0 ].children[ cellIndex + ( element.colSpan || 1 ) - 1 ];
        }
    }

    function border( style, direction ){
        return ( direction ? 
                    parseFloat( style.borderTopWidth ) + parseFloat( style.borderBottomWidth ) : 
                    parseFloat( style.borderLeftWidth ) + parseFloat( style.borderRightWidth ) );
    }

    function padding( style, direction ){
        var width = 0;
        if( style.boxSizing == "content-box" ){
            width = direction ? 
                    parseFloat( style.paddingTop ) + parseFloat( style.paddingBottom ) : 
                    parseFloat( style.paddingLeft ) + parseFloat( style.paddingRight );

            width += border( style, direction );
        }   
        return width
    }

    function mousedown( ev ){
        var evt = ev,
        isTch = /touch/i.test( ev.type );
        if( isTch ){
            if( ev.touches.length > 1 ){
                return;
            }
            evt = ev.touches[ 0 ];
        }
        var elem = this,
        targetElem = $L( this ).data( 'element' ),
        data = targetElem._resizeData,
        directions = $L( elem ).data( 'directions' );
        if( data.onBeforeSelect && data.onBeforeSelect( elem, targetElem, ev, elem._clone ) == false ){
            return;
        }
        window._resizeelem = this;

        var width = targetElem.offsetWidth,
        height = targetElem.offsetHeight,
        bcr = getBcr( elem ),
        iw = window.innerWidth,
        style = getStyle( targetElem ),
        originalValue = {},
        clone = targetElem._clone;
        width -= padding( style );
        height -= padding( style, true );
        originalValue.height = directions.height ? targetElem.style.height = height + 'px' : void 0;
        originalValue.width = directions.width ? targetElem.style.width = width + 'px' : void 0;
        originalValue[ rtlfunc( 'left' ) ] = directions.left ? targetElem.style[ rtlfunc( 'left' ) ] = style[ rtlfunc( 'left' ) ] : void 0;
        originalValue.top = directions.top ? targetElem.style.top = style.top : void 0;

        this._clientX = rtlfunc( 'clientX', evt, iw ) - rtlfunc( 'right', bcr, iw );
        this._clientY = evt.clientY - bcr.bottom;
        this._original = originalValue;

        if( data.component == "table" ){
            var cells = $L( targetElem ).children().children().children( data.tags.td + ',' + data.tags.th );
            
            $L.each( cells, function( index, item ){
                directions.width ? item.style.width = '' : void 0;
                directions.height ? item.style.height = '' : void 0;
            });
        }

         targetElem._owidth =  targetElem.style.width;
         targetElem._oheight = targetElem.style.height;
         targetElem._mwidth = targetElem.style.maxWidth;
         targetElem.style.width = 0;
         targetElem.style.height = 0;
         targetElem.style.maxWidth = 0;
         $L.fastdom.measure( function(){
            targetElem._minWidth = targetElem.offsetWidth;
            targetElem._minHeight = targetElem.offsetHeight;
            if( clone ){
                clone._minHeight = targetElem._minHeight;
                clone._minWidth = targetElem._minWidth;
            }
         }.bind( this ) )
         $L.fastdom.mutate( function(){
            targetElem._tableDown = true;
            targetElem.style.width = targetElem._owidth;
            targetElem.style.height = targetElem._oheight;
            targetElem.style.maxWidth = targetElem._mwidth;
            if( clone ){
                clone.style.width = width + 'px';
                clone.style.height = height + 'px';
                clone.style[ rtlfunc( 'left' ) ] = 0;
                clone.style.top = 0;
            }
            delete targetElem._oheight; delete targetElem._owidth; delete targetElem._mwidth;

            document.addEventListener( isTch ? 'touchmove' : 'mousemove', mousemove, true );
            document.addEventListener( isTch ? 'touchend' : 'mouseup', mouseup, true );
            data.onSelect && data.onSelect( elem, targetElem, ev, elem._clone );
            evt.stopPropagation();
         } )
    }

    function tableDown( ev ){
        var data = this._resizeData,
        isTch = /touch/i.test( ev.type ),
        evt = ev;

        if( isTch ){
            if( evt.touches.length > 1 ){
                return;
            } 
            evt = evt.touches[ 0 ];
            tableMove.call( this, evt );
        }
        var active = data.active;
        if( !active || ev.buttons == 2 ){
            return;
        }
        if( data.onBeforeSelect && data.onBeforeSelect( this, active.element, ev ) == false ){
            return;
        }
        var preventTable = data.preventTable,
        direction = active.direction == "vertical",
        element = getCell.call( this, active.element, direction ),
        winwidth = window.innerWidth,
        style = getStyle( element ),
        bcr = getBcr( element ),
        row = element.parentNode,
        table = row.parentNode.parentNode,
        tableStyle = getStyle( table ),
        tableBcr = getBcr( table ),
        next = !direction && preventTable ? element.nextElementSibling : void 0,
        nextstyle,
        cells = toArray( row.children ),
        final = [],
        allCells = toArray( $L( table ).children().children().children( data.tags.td + ',' + data.tags.th ) );

        element._next = next;

        if( !preventTable ){
            table._original = { width : table.style.width, height : table.style.height };
        }

        if( direction ){
            cells.forEach( function( item ){
                if( item.style.display == "none" ){
                    return;
                }
                var obj = {
                    node  : item,
                    style : getStyle( item ),
                    bcr : getBcr( item )
                }
                final.push( obj );
            } )
            table.style.height = ( tableBcr.height - padding( tableStyle, true ) ) + 'px';

            final.forEach( function( item ){
                item.node._original = { height : item.node.height, width : item.node.height };
                item.node.style.height = ( item.bcr.height - padding( item.style, true ) ) + 'px';
            } )

            allCells.forEach( function( item ){
                item._hgt = item.style.height;
                item.style.height = 0;
            } )
            table._hgt = table.style.height;
            table.style.height = 0;
        } else {
            element._original = { width : element.style.width, height : element.style.height };

            element.style.width = ( bcr.width -  padding( style ) ) + 'px';
            if( !preventTable ){
                table.style.width = ( tableBcr.width - padding( tableStyle ) ) + 'px';
            }
            if( next ){
                next._original = { width : next.style.width, height : next.style.height };
                var nextbcr = getBcr( next );
                nextstyle = getStyle( next );
                next.style.width = ( nextbcr.width - padding( nextstyle ) ) + 'px';
            }
            table.style.maxWidth = 0;
        }

        $L.fastdom.measure( function(){
                if( direction ){
                    final.forEach( function( item ){
                        item.node._minHeight = getBcr( item.node ).height - padding( item.style, true );
                    } )
                    if( !preventTable ){
                       table._minHeigth = getBcr( table ).height - padding( tableStyle, true );
                    }
                } else {
                    element._minWidth = getBcr( element ).width - padding( style );
                    if( next ){
                       next._minWidth = getBcr( next ).width - padding( nextstyle );
                    }
                    if( !preventTable ){
                       table._minWidth = getBcr( table ).width - padding( tableStyle );
                    }
                 }
            }.bind( this ) )

            $L.fastdom.mutate( function(){
                if( direction ){
                    allCells.forEach( function( item ){
                        if( item.parentNode == element.parentNode && element != item ){
                            item.style.height = "";
                        } else {
                            item.style.height = item._hgt;
                        }
                        delete item._hgt;
                    } )
                    table.style.height = table._hgt;
                    delete table._hgt;
                } else {
                   table.style.maxWidth = "";
                }
                element._clientX = rtlfunc( 'clientX', evt, winwidth ) - rtlfunc( 'right', bcr, winwidth );
                element._clientY = evt.clientY - bcr.bottom;
                window._resizeelem = element;
                $L( element ).data( 'element', this );
                $L( element ).data( 'directions', { width : !direction, height : direction } );

                document.addEventListener( isTch ? 'touchmove' : 'mousemove', mousemove, true );
                document.addEventListener( isTch ? 'touchend' : 'mouseup', mouseup, true );
                data.onSelect && data.onSelect( this, element, ev );
                evt.stopPropagation();
                this._tableDown = true;
            }.bind( this ) )
    }

    function mousemove( ev ){
        var evt = ev,
        isTch = /touch/i.test( ev.type );
        if( isTch ){
            if( evt.touches.length > 1 ){
                return;
            }
            evt = evt.touches[ 0 ];
        }
        var elem = window._resizeelem,
        targetElem = $L( elem ).data( 'element' ) || elem,
        directions = $L( elem ).data( 'directions' ),
        data = targetElem._resizeData,
        winwidth = window.innerWidth,
        newX = rtlfunc( 'clientX', evt, winwidth ),
        newY = evt.clientY,
        newLeft,
        newTop,
        newWidth,
        newHeight,
        preventTable = data.preventTable,
        bcr = getBcr( elem ),
        isTable = targetElem._resizeData.component == 'table',
        next = elem._next,
        xIncr = newX - rtlfunc( 'right', bcr, winwidth ) - elem._clientX,
        yIncr = newY - bcr.bottom - elem._clientY,
        clone = targetElem._clone,
        x = ( window.pageXOffset || document.documentElement.scrollLeft ) * ( isRtl ? -1 : 1 ),
        y = window.pageYOffset || document.documentElement.scrollTop,
        xFact = directions.left ? -1 : 1,
        yFact = directions.top ? -1 : 1;

        targetElem = clone || targetElem;

        if( data.boundary && !next ){
            var bbcr;
            if( data.boundary.constructor == String ){
               var bcr1 = getBcr( $L( targetElem ).closest( data.boundary ).get( 0 ) );
               bbcr = {
                  left : bcr1[ rtlfunc( 'left' ) ],
                  right : bcr1[ rtlfunc( 'right' ) ],
                  top : bcr1.top,
                  bottom :bcr1.bottom
               }
            } else {
                bbcr = data.boundary;
            }
            if( newX > bbcr[ rtlfunc( 'right' ) ] || newX < bbcr[ rtlfunc( 'left' ) ] ){
                xIncr = 0;
            } 
            if( newY > bbcr.bottom || newY < bbcr.top ){
                yIncr = 0;
            } 
        }

        if( data.showInfo ){
            if( !elem._moved ){
                var infoDiv =  document.createElement( 'div' );
                infoDiv.classList.add( 'lyteResizeInfoDiv', data.infoClass );
                document.body.appendChild( infoDiv );
                elem._infoDiv = infoDiv;
            } 
        } 
        elem._moved = true;

        if( directions.width ){
            if( !preventTable ){
                var min = data.minWidth || targetElem._minWidth || 0,
                max = data.maxWidth || Infinity,
                originalWidth = parseFloat( targetElem.style.width ),
                modifiedWidth = originalWidth + xIncr * xFact,
                final = Math.min( max, Math.max( min, modifiedWidth ) );
                xIncr  = ( final - originalWidth ) * xFact;
            }

            if( isTable ){
                var originalWidth = parseFloat( elem.style.width ),
                modifiedWidth = originalWidth + xIncr,
                final = Math.max( elem._minWidth, modifiedWidth );
                xIncr = final - originalWidth;
                if( next ){
                    originalWidth = parseFloat( next.style.width );
                    modifiedWidth = originalWidth - xIncr;
                    final = Math.max( next._minWidth, modifiedWidth );
                    xIncr = originalWidth - final;
                }
            }
        }

        if( directions.height ){
            var min = data.minHeight || targetElem._minHeight || 0,
            max = data.maxHeight || Infinity,
            originalHeight = parseFloat( targetElem.style.height ),
            modifiedHeight = originalHeight + yIncr * yFact,
            final = Math.min( max, Math.max( min, modifiedHeight ) );
            yIncr  = ( final - originalHeight ) * yFact;
            
            if( isTable ){
                originalHeight = parseFloat( elem.style.height );
                modifiedHeight = originalHeight + yIncr;
                final = Math.max( elem._minHeight, modifiedHeight );
                yIncr = final - originalHeight;
            }
        }

        if( directions.left ){
            var left = parseFloat( targetElem.style[ rtlfunc( 'left' ) ] ),
            newLeft = left + xIncr,
            minLeft = data.minLeft || -Infinity,
            maxLeft = data.maxLeft || Infinity,
            finalLeft = Math.max( Math.min( maxLeft, newLeft ), minLeft );

            xIncr = finalLeft - left;
        }

        if( directions.top ){
            var tp = parseFloat( targetElem.style.top ),
            newTop = tp + yIncr,
            minTop = data.minTop || -Infinity,
            maxTop = data.maxTop || Infinity,
            finalTop = Math.max( Math.min( maxTop, newTop ), minTop );

            yIncr = finalTop - tp;
        }

        if( directions.width ){
            if( !preventTable ){
                targetElem.style.width = ( parseFloat( targetElem.style.width ) + xIncr * xFact ) + 'px';
            }
            if( isTable ){
                elem.style.width = ( parseFloat( elem.style.width ) + xIncr ) + 'px';
                if( next ){
                    next.style.width = ( parseFloat( next.style.width ) - xIncr ) + 'px';
                }
            }
        }

        if( directions.height ){
            targetElem.style.height = ( parseFloat( targetElem.style.height ) + yIncr * yFact ) + 'px';
            var cells = toArray( elem.parentNode.children );
            elem.style.height = ( parseFloat( elem.style.height ) + yIncr ) + 'px'
        }

        if( directions.left ) {
            targetElem.style.left = ( parseFloat( targetElem.style.left ) + xIncr ) + 'px';
        }

        if( directions.top ) {
            targetElem.style.top = ( parseFloat( targetElem.style.top ) + yIncr ) + 'px';
        }

        if( data.showInfo ){
            elem._infoDiv.innerHTML = data.getText ? data.getText( elem, Math.round( parseFloat( targetElem.style.width ) ), Math.round( parseFloat( targetElem.style.height ) ) ) : ( Math.round( parseFloat( targetElem.style.width ) ) + ' x ' + Math.round( parseFloat( targetElem.style.height ) ) );
            elem._infoDiv.style[ rtlfunc( 'left' ) ] = ( newX + x + 15 ) + 'px';
            elem._infoDiv.style.top = ( newY + y + 15 ) + 'px';
        }
        data.onMove && data.onMove( elem, $L( elem ).data( 'element' ), ev );
        evt.preventDefault();
    }

    function mouseup( evt, frm_remove ){
        var isTch = /touch/i.test( evt.type );
        document.removeEventListener( isTch ? 'touchmove' : 'mousemove', mousemove, true );
        document.removeEventListener( isTch ? 'touchend' : 'mouseup', mouseup, true );
        var elem = window._resizeelem,
        targetElem = $L( elem ).data( 'element' ),
        data = targetElem._resizeData,
        next = elem._next,
        isTable = data.component == "table",
        directions = $L( elem ).data( 'directions' );

        if( elem._moved ){
            if( elem._infoDiv ){
                elem._infoDiv.remove();
                delete elem._infoDiv;
            }
            if( !frm_remove && data.onBeforeDrop && data.onBeforeDrop( elem, targetElem, evt, targetElem._clone ) == false ){
                $L( targetElem._clone || targetElem ).css( elem._original );
                if( isTable ){
                    if( directions.width ){
                        $L( elem ).css( elem._original );
                        delete elem._original;
                        if( next ){
                            $L( next ).css( next._original );
                            delete next._original;
                        }
                    } else {
                        toArray( elem.parentNode.children ).forEach( function( item ){
                            $L( item ).css( item._original );
                            delete item._original;
                        } )
                    }
                }
                delete elem._original;
            } else {
                if( targetElem._clone ){
                    var lft = rtlfunc( 'left' );
                    targetElem.style[ lft ] = ( parseFloat( targetElem.style[ lft ] ) + parseFloat( targetElem._clone.style[ lft ] ) ) + 'px';
                    targetElem.style.top = ( parseFloat( targetElem.style.top )  + parseFloat( targetElem._clone.style.top ) ) + 'px';
                    targetElem.style.width = targetElem._clone.style.width;
                    targetElem.style.height = targetElem._clone.style.height;
                    targetElem._clone.style[ rtlfunc( 'left' ) ] = 0;
                    targetElem._clone.style.top = 0;
                }
                !frm_remove && data.onDrop && data.onDrop( elem, targetElem, evt, elem._original, targetElem._clone );
            }
        } else {
            !frm_remove && data.onRelease && data.onRelease( elem, targetElem, evt, targetElem._clone );
        }
        delete window._resizeelem; delete elem._moved;

         if( targetElem._resizeData.component == 'table' ){
            if( elem._next ){
                delete elem._next._originalValue;
                delete elem._next;
            }
            if( !elem.classList.contains( 'lyteResizeHandle' ) ){
                $L( elem ).removeData( 'element' );
                $L( elem ).removeData( 'directions');
            }
            if( targetElem.contains( evt.target ) ){
                window._preventresizeClick = true;
                setTimeout( function(){
                    delete this._preventresizeClick;
                }, 0 )
            }
        }
    }

    function tableMove( evt ){
        if( window._resizeelem || evt.type == "mousemove" && evt.buttons ){
            return;
        }

        var data = this._resizeData,
        offset = data.offset,
        elementQuery = data.tags.td + ',' + data.tags.th,
        closest = $L( evt.target ).closest( elementQuery, this ).get( 0 ),
        winwidth = window.innerWidth,
        cx = rtlfunc( 'clientX', evt, winwidth ),
        cy = evt.clientY;
        if( !closest ){
            return;
        }

        var cells = closest.parentNode.children,
        index = getIndex( toArray( cells ), closest ),
        bcr = getBcr( closest ),
        isHori = cx > rtlfunc( 'right', bcr, winwidth ) - offset && cx < rtlfunc( 'right', bcr, winwidth ),
        isVert = cy > bcr.bottom - offset && cy < bcr.bottom,
        active = data.active,
        cursor,
        direction;

        if( data.preventTable && isHori ){
            if( index + ( closest.colSpan || 1 ) - 1 == cells.length - 1 ){
                return;
            }
        }

        if( ( isHori && !data.preventHorizontal ) || ( isVert && !data.preventVertical ) ){
                active && active.element != closest && removeActive.call( this );
                cursor = closest._cursor == undefined ? closest.style.cursor : closest._cursor;
                if( isVert ){
                    direction = 'vertical';
                    closest.style.cursor = data.rowResize;
                } else if( isHori ){
                    direction = 'horizontal';
                    closest.style.cursor = data.colResize;

                }   
                closest._cursor = cursor;
                data.active = { cursor : cursor, element : closest, direction : direction };
            } else {
                active && removeActive.call( this );       
            }
    }

    function removeActive(){
        var active = this._resizeData.active;
        if( active ){
            active.element.style.cursor = active.element._cursor;
            delete active.element._cursor;
            delete this._resizeData.active;
        }
    }

    function getIndex( array, elem ){
        return array.indexOf( elem );
    }

    function toArray( arr ){
        if( Array.from ){
            return Array.from( arr );
        }
        return Array.apply( Array, arr );
    }

    lyteDomObj.prototype.enableResize = function( obj ){
        if( obj == 'destroy' ){
            return destroy.call( this );
        }
        obj = obj || {};
        obj.directions = obj.directions || [ 'N', 'S', 'W', 'E', 'SW', 'SE', 'NW', 'NE' ];
        obj.rotation = obj.rotation == undefined ? true : obj.rotation;
        obj.tags = obj.tags || { td : "td", th : "th", tr : "tr", table : "table", thead : "thead", tbody : "tbody" };
        obj.rowResize = obj.rowResize || "row-resize";
        obj.colResize = obj.colResize || "col-resize";
        obj.offset = obj.offset || 10;
        bind.call( this, obj );
        return this;
    }

    document.addEventListener( 'click', function( evt ){
        var active = document.getElementsByClassName( 'lyteResizeSelected' ),
        _length = active.length;

        for( var i = 0; i < _length; i++ ){
            active[ i ].classList.remove( 'lyteResizeSelected' );
        }
        !window._preventresizeClick && $L( evt.target ).closest( '.lyteResizeElement' ).addClass( 'lyteResizeSelected' ).children( '.lyteResizeClone' ).attr( 'style', '' );
    }, true )

})(window);
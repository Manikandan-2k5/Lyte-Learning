;( function(){

    if( lyteDomObj ){
        $L.domDetailer = (function(){
            var targetDetails = {},
            curEle = null,

            clickHandler = function( evt ){
                evt.stopPropagation();

                onSelection( targetDetails );
            },

            mouseOverHandler = function( evt ){
                evt.stopPropagation();
                
                var target = evt.target;

                if( curEle == null ){
                    curEle = target;
                }
                targetDetails = {
                    'tagName' : target.tagName,
                    'classList' :  getClassList( target ),
                    'attributes' : getAttributes( target.attributes ),
                    'boundingClientRect' : getBoundingClientRect( target ),
                    'element' : target                
                };

                targetDetails.selector = target.id != '' ? '#'+target.id : getUniqueSelector( target  );

                if( curEle != target){
                    curEle.style.outline = '';
                    curEle = target;
                }
                
                target.style.outline = "2px solid blue";

                outlineFl = true;

                onBeforeSelection( targetDetails );
            },

            getAttributes = function( attributes ){
                var attr = {}
                for( i = 0; i < attributes.length; i++ ){
                    if( attributes[ i ].nodeName != 'class' ){
                        attr[ attributes[ i ].nodeName ] = attributes[ i ].nodeValue;
                    }
                }
                return attr;
            },

            getClassList  = function( ele ){
                return Array.from( ele.classList );
            },

            getBoundingClientRect = function( ele ){
                var rect =  ele.getBoundingClientRect();
                return {
                    top: rect.top,
                    right: rect.right,
                    bottom: rect.bottom,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    x: rect.x,
                    y: rect.y
                  };
            },

            getUniqueSelector = function( ele ){
                if( ele.id != ''){
                    return "#" + target.id;
                }

                var classSelector = getClassSelector( ele );

                if( classSelector != '' &&  document.querySelectorAll( classSelector ).length == 1 && document.querySelectorAll( classSelector )[ 0 ] == ele ){
                    return classSelector;
                }

                return getPathSelector( ele );

            },
            
            getClassSelector = function( ele ){
                var classList = ele.classList,
                selector = '';

                for( i = 0; i < classList.length; i++){
                    selector += '.' + classList[ i ]; 
                }
                return selector;
            },

            getPathSelector = function( ele ){
                if (ele.tagName.toLowerCase() == 'body' || ele.tagName.toLowerCase() == 'html'){
                   return ele.tagName.toLowerCase();
                }

                var idx = 0,
                siblings = ele.parentNode ? ele.parentNode.childNodes : [];

                for ( var i = 0; i < siblings.length; i++ ) {
                    var sibling = siblings[i];

                    if (sibling === ele){
                        return getPathSelector( ele.parentNode ) + ' > ' + ele.tagName.toLowerCase() + ':nth-of-type(' + (idx + 1) + ')';
                    }
                    if ( sibling.nodeType === 1 && sibling.tagName === ele.tagName ) {
                        idx++;
                    }
                }
                return 'not available in dom';
            },
            
            destroy = function(){
                window.removeEventListener('click', clickHandler,true );
                window.removeEventListener( 'mouseover', mouseOverHandler, true )
                if( document.body.style.cursor != null ){
                    document.body.style.cursor = '';
                }
            },
            
            onSelection = function(){},
            
            onBeforeSelection = function(){};

            return function( properties ){
                var cursorFlag = true;

                if( properties && typeof properties == 'string'){
                    if( properties == 'destroy'){
                        destroy();                   
                        return;
                    }
                }else if( properties && typeof properties == 'object'){                
                    if( properties.onSelection ){
                        onSelection = properties.onSelection;
                    }
    
                    if( properties.onBeforeSelection ){
                        onBeforeSelection = properties.onBeforeSelection;
                    }
    
                    if( properties.defaultCursor ){
                        cursorFlag = false;
                    }
                }
    
                if( cursorFlag ){
                    document.body.style.cursor = 'grab';
                }

                window.addEventListener( 'click', clickHandler, true );
                window.addEventListener( 'mouseover', mouseOverHandler, true );
            }
        }());
    }
}());
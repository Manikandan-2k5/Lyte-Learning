;( function(){
	if( window.lyteDomObj ){

		var isSticky = {}, span = document.createElement( 'span' );
		span.style.position = "sticky";
		if( span.style.position == "sticky" ){
			isSticky.sticky = true;
		} else {
			span.style.position = "-webkit-sticky";
			if( span.style.position == "-webkit-sticky" ){
				isSticky.webkitsticky = true;
			} else {
				isSticky.sticky = false;
			}
		}
		span = undefined;

		function getPos( pos ) {
			if( _lyteUiUtils.getRTL() ) {
				if( pos == "left" ){
					return 'right';
				} else if( pos == "right" ) {
					return "left";
				}

			} 
			return pos;
		}

		function globalScroll( evt ){
			var target = evt.target,
			__sticky = target._sticky;

			if( __sticky ){

				if( __sticky.position == "topbottom" ){
					return update_positions( Array.from( target.parentNode.querySelectorAll( ".lyteSticky " + __sticky.query ) ), target );
				}

				if( isSticky.sticky == false ){
					findScroll.call( target, __sticky.highlight, true )
				} else if( __sticky.highlight ) {
					findScroll.call( target, true );
				}
			}
		}

		function update_positions( elems, __this ){
			var bcr_arr = elems.map( function( item ){
				var parent = item.parentNode;

				return {
					item : item,
					height : item.offsetHeight,
					bcr : parent.getBoundingClientRect(),
					parent : parent
				};
			}),
			this_bcr = __this.getBoundingClientRect(),
			is_relative = /relative|absolute|sticky/i.test( window.getComputedStyle( __this ).position ),
			__top = this_bcr.top,
			__bottom = this_bcr.bottom,
			this_height = this_bcr.height,
			__len = elems.length,
			top_stick = 0,
			bottom_stick = 0,
			default_top = is_relative ? __this.scrollTop : 0,
			default_bottom = is_relative ? -default_top : 0,
			top_hidden = [],
			bottom_hidden = [],
			className = "lyteStickyActive",
			sticky_obj = __this._sticky,
			__maxCount = sticky_obj.maxCount || Infinity,
			__maxHeight = sticky_obj.minHeight || 100,
			count = 0,
			__addFn = sticky_obj.onAdd,
			__removeFn = sticky_obj.onRemove;

			bcr_arr.forEach( function( __cur, index ){

				if( count++ > __maxCount ){
					return;
				}

				var __bcr = __cur.bcr,
				cur_top = __bcr.top,
				top_limit = __top + top_stick,
				obj = {
					position : "",
					top : "",
					bottom : ""
				},
				node = __cur.item,
				height = __cur.height,
				__class = "remove",
				is_active = node.classList.contains( className );

				if( top_limit > cur_top ){
					if( !( ( this_height - __maxHeight ) < top_stick ) ){
						obj.position = "absolute";
						obj.top = ( default_top + top_stick ) + "px";
						top_stick += height;
						__class = "add"
					}
				}
				$L( node ).css( obj )[ __class + 'Class' ]( className );

				if( __class == "add" && !is_active ){
					__addFn && __addFn.call( __this, node );
				} else if( __class == "remove" && is_active ){
					__removeFn && __removeFn.call( __this, node );
				}
			});

			bcr_arr.reverse().forEach( function( __cur, index ){

				if( count++ > __maxCount ){
					return;
				}

				var __bcr = __cur.bcr,
				cur_bottom = __bcr.top,
				obj = {
					position : "absolute",
					top : ""
				},
				bottom_limit = __bottom - bottom_stick,
				node = __cur.item,
				height = __cur.height,
				is_active = node.classList.contains( className );

				if( bottom_limit < cur_bottom + ( node.style.position ? 0 : height ) ){

					if( ( this_height - __maxHeight ) < top_stick + bottom_stick ){
						return;
					}

					obj.bottom = ( default_bottom + bottom_stick ) + "px";
					bottom_stick += height;

					$L( node ).css( obj ).addClass( className );

					if( !is_active ){
						__addFn && __addFn.call( __this, node );
					}
				}
			});
		}

		function makeSticky( arg ){
			var elms = this.parentElement.querySelectorAll( ".lyteSticky " + arg.query ),
			__len = elms.length,
			__pos = arg.position,
			__sticky = isSticky.sticky ? "sticky" : ( isSticky.webkitsticky ?  "-webkit-sticky" : '' ),
			stick_all = arg.position == "topbottom";

			if( stick_all ){
				update_positions( Array.from( elms ), this );
			} else {
				for( var i = 0; i < __len; i++ ){
					var __cur = elms[ i ],
					sty = __cur.style, 
					parstyle = __cur.parentElement.style;

					__cur._sticky = { val : sty[ __pos ], position : sty.position, parPos : parstyle.position };
					if( isSticky.sticky != false ) {
						sty.position = __sticky;
						sty[ __pos ] = arg.offset + 'px';
					} else {
						parstyle.position = sty.position = "relative";
					}
				}
			}
		}

		function unbind( arg ){
			var elms = this.parentElement.querySelectorAll( ".lyteSticky " + arg.query ),
			position = arg.position;

			for( var i = 0; i < elms.length; i++ ){
				var __cur = elms[ i ],
				obj = __cur._sticky, 
				style = __cur.style, 
				parstyle = __cur.parentElement.style;

				if( obj ){
					__cur.classList.remove( 'lyteStickyActive' );
					style.position = obj.position;
					parstyle.position = obj.parPos;
					style[ position ] = obj.val;
					delete __cur._sticky;
				}
			}
		}

		function findScroll( highlight, prevent ){
			if( !this.offsetParent ) {
				return
			}
			var arg = this._sticky, offs = [], slft, stp, elms = this.parentElement.querySelectorAll( ".lyteSticky " + arg.query ),
			stp = this == document.body ? window.pageYOffset : this.scrollTop, slft = this == document.body ? window.pageXOffset : this.scrollLeft,
			pos = arg.position, vert = [ 'bottom', 'top' ].indexOf( pos ) != -1, 
			bcr = this.getBoundingClientRect(), wid = vert ? "height" : "width", ofset = arg.offset;
			if( ( !vert && arg._prevx != slft ) || ( vert && arg._prevy != stp ) ) {
				for( var i = 0; i < elms.length; i++ ) {
					offs[ i ] = {};
					offs[ i ].node = elms[ i ]; elms[ i ].parent = elms[ i ].parentElement;
					offs[ i ].curBcr = elms[ i ].getBoundingClientRect();
					offs[ i ].parBcr = elms[ i ].parentElement.getBoundingClientRect();
				}
				for( var i = 0; i < elms.length; i++ ) {
					var cEl = offs[ i ], pBcr = cEl.parBcr, curBcr = cEl.curBcr, node = cEl.node.style,
					fact = 1, val = 0, flag = false;
					if( [ 'bottom', 'right' ].indexOf( pos ) != -1 ) {
						fact *= -1;
					}
					if( fact > 0 ) {
						if( parseInt( pBcr[ pos ] ) <= parseInt( bcr[ pos ] ) && ( parseInt( pBcr[ pos ] + pBcr[ wid ] ) >= parseInt( bcr[ pos ] + ofset ) ) ){
							var min = bcr[ pos ] - ( pBcr[ pos ] )
						 	val = min + ofset;
							flag = true;
						}
					} else {
						if( parseInt( pBcr[ pos ] ) >= parseInt( bcr[ pos ] ) && ( parseInt( pBcr[ pos ] - pBcr[ wid ] ) < parseInt( bcr[ pos ] - ofset ) ) ){
							var min = pBcr[ pos ] - bcr[ pos ];
							val = min + ofset;
							flag = true;
						}
					}
					if( flag ) {
						if( prevent ){
							node[ pos ] = val + 'px';
						}
						arg.onAdd && !cEl.node.classList.contains( 'lyteStickyActive' ) && arg.onAdd.call( this, cEl.node );
						highlight && cEl.node.classList.add( 'lyteStickyActive' );
						if( stp == 0 ){
							arg.onRemove && cEl.node.classList.contains( 'lyteStickyActive' ) && arg.onRemove.call( this, cEl.node );
							cEl.node.classList.remove( 'lyteStickyActive' );
						}
					} else {
						arg.onRemove && cEl.node.classList.contains( 'lyteStickyActive' ) && arg.onRemove.call( this, cEl.node );
						highlight && cEl.node.classList.remove( 'lyteStickyActive' );
					}
				}
			}
			arg._prevx = slft; arg._prevY = stp;
		}

		lyteDomObj.prototype.destroySticky = function(){
			$L( '.lyteSticky' ).removeSticky();
			window.removeEventListener( 'scroll', globalScroll, true )
			return this;
		}

		lyteDomObj.prototype.removeSticky = function(){
			for( var i = 0; i < this.length; i++ ){
				var obj = this[ i ]._sticky;
				if( obj ) {
					clearTimeout( obj._stickytime ); clearTimeout( obj._init );
					clearTimeout( obj._genscroll );
					unbind.call( this[ i ], obj ); 
					this[ i ].classList.remove( 'lyteSticky' );
					delete this[ i ]._sticky; 
				}
			}
			return this;
		}

		lyteDomObj.prototype.sticky = function( obj ){
			obj = obj || {};
			obj.position = getPos( obj.position ) || "top";
			obj.offset = obj.offset || 0;
			obj.query = obj.query || "*>*:first-child:not(template)";

			var __len = this.length;

			for( var i = 0; i < __len; i++ ){
				var __cur = this[ i ];

				if( __cur._sticky ){

					if( obj == "refresh" ){
						globalScroll( { target : __cur } );
						continue;
					}

					$L( __cur ).removeSticky();
				}
				__cur.classList.add( 'lyteSticky' );
				__cur._sticky = $L.extend( true, {}, obj );
				__cur._sticky._stickytime = setTimeout( makeSticky.bind( __cur ), 20, __cur._sticky )
				if( obj.position != "topbottom" ) {
					__cur._sticky._init = setTimeout( findScroll.bind( __cur, obj.highlight, isSticky.sticky == false ), 40 )
				}
			}
		 	return this;
		}
		
			window.addEventListener( 'scroll', globalScroll, true )
		// }
	}
} )( window )
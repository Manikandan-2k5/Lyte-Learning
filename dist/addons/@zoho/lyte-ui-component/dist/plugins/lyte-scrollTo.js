( function() {
	function returnCallback( settings, val, last, parent ) {
		var opts = $L.extend( {}, settings ), 
		key = !last ? 'onAfterFirst' : 'onAfter', 
		after = opts[ key ];

		if( after ) {
			opts.complete = function( settings ) {
				after.call( parent, val, opts );
			}
		}

		return opts;
	}

	// last animations will have the onAfter callback as the complete function
	// first animations will have onAfterFirst callback as the complete function
	function scrollTo( parent, change, options, val, last ) {
		$L( parent ).animate( change, 
			returnCallback( 
				options, 
				val, 
				last,
				parent 
		) );
	}

	function buildProps( dimensions, parent, change, len, options, val, item, index ) {
		var suffix = item === 'x' ? 'Left' : 'Top',
		obj = $L( parent ),
		queue = options.queue,
		prop = 'scroll' + suffix,
		lower = suffix.toLowerCase(),
		final =  dimensions.dom ? 
					dimensions[ suffix ] + obj[ prop ]() 
					: dimensions[ lower ],
		isNegativeScroll = _lyteUiUtils.isNegativeScroll();

		change[ prop ] = Math.abs( final );

		if( isNegativeScroll && change.scrollLeft >= 0 ) {
			change.scrollLeft = change.scrollLeft * -1;
		}
		
		if( queue ) {
			scrollTo( parent, change, options, val, index === len - 1 );
		}
		else if( len - 1 === index ) {
			scrollTo( parent, change, options, val, true );
		}
	}

	function findAxis( dimensions, parent, val, options ) {
		var axis = options.axis,
		dirs = axis.split( '' ),
		change = {}, len = dirs.length,
		queue = options.queue;

		if( queue ) {
			options.duration /= 2;
		}

		dirs.forEach( function( item, index ) {
			if( queue ) {
				change = {};
			}

			buildProps.call( this, dimensions, parent, change, len, options, val, item, index )
		} );
	}

	function setDimensions( item, options, dimensions, obj, vBCR, pBCR ) {
		var margin = options.margin,
		prop = item.toLowerCase(), extra;

		extra = margin ? parseInt( obj.css( 'margin' + item ), 10 ) + parseInt( obj.css( 'border' + item + 'Width' ), 10 ) : 0;
		dimensions[ item ] = vBCR[ prop ] - pBCR[ prop ] - extra;
	}

	function findMax( elem, iswin, prop ) {
		var obj = $L( elem ),
		doc = elem.document,
		dim = prop.toLowerCase(),
		html = ( doc || {} ).documentElement,
		htmlObj = $L( html );

		return iswin ? htmlObj[ dim ]() - elem[ 'inner' + prop ] : elem[ 'scroll' + prop ] - obj[ dim ]();
	}

	function findDimensions( val, parent, options ) {
		// val can be object aswell with left and top
		var dimensions = val, 
		percent, rpercent = /([0-9]*)%/g, 
		obj, arr = [ 'Left', 'Top' ],
		iswin = $L.isWindow( parent ), pBCR, vBCR;

		switch( typeof val ) {
			case 'number':
			case 'string':
				percent = ( rpercent.exec( val ) || [] )[ 1 ];
				dimensions = {
					top: percent ? 0.01 * percent * findMax( parent, iswin, 'Height' ) : parseFloat( val ),
					left: percent ? 0.01 * percent * findMax( parent, iswin, 'Width' ) : parseFloat( val ),
					dom: false
				};
				break;
				
			// Its a DOMElement or lyteDomObj
			case 'object':
				if( val.nodeType 
					|| ( val instanceof lyteDomObj 
						&& ( val = val.get( 0 ) ) 
				) ) {
					obj = $L( val );
					dimensions = {};
					vBCR = val.getBoundingClientRect();
					pBCR = $L.isWindow( val ) ? { top: 0, left: 0 } : parent.getBoundingClientRect();

					arr.forEach( function( item ) {
						setDimensions( item, options, dimensions, obj, vBCR, pBCR );
					} );

					dimensions.dom = true;
				}
				else {
					dimensions.dom = false;
				}
				break;

		}

		subtractOffset( dimensions, options.offset );

		return dimensions;
	}

	function subtractOffset( dimensions, obj ) {
		var obj = typeof obj === 'object' ? obj : { left: obj, top: obj }, key;

		for( key in dimensions ) {
			dimensions[ key ] = dimensions[ key ] + ( obj[ key.toLowerCase() ] || 0 ) 
		}

	}

	lyteDomObj.prototype.scrollTo = function( val, duration, options ) {
		var dimensions;

		if( typeof options === 'function' ) {
			options = { onAfter: options };
		}

		if( typeof duration === 'object' ) {
			if( ( options || {} ).onAfter ) {
				duration.onAfter = options.onAfter;
			} 

			options = duration;
			duration = options.duration; 
		}

		if( !options ) {
			options = {};
		}

		options = $L.extend( {}, $L.scrollTo.defaults, options );
		
		this.each( function() {
			killOtherScrollTo( this );
			dimensions = findDimensions( val, this, options );
			findAxis( dimensions, this, val, options );
		} );
		
	}

	function killOtherScrollTo( element ) {
		var rAFScrollLeft = element.rAFscrollLeft,
		rAFScrollTop = element.rAFscrollTop,
		forceRemove = true;

		window.cancelAnimationFrame( rAFScrollLeft );
		window.cancelAnimationFrame( rAFScrollTop );

		$L.animate.tryDequeue( element, undefined, forceRemove );		
	}

	$L.scrollTo = function() {
		$L( window ).scrollTo();
	}

	$L.scrollTo.defaults = {
		axis: 'xy',
		duration: 0
	};

	$L.each( [ 'scrollLeft', 'scrollTop' ], function( index, fn ) {
		$L.Tween.propHooks[ fn ] = {
			get: function( elem ) {
				return elem[ fn ]();
			},

			set: function( elem, value, options ) {
				var rounded = Math.round( value ),
				curr = elem[ fn ](), key = '_old' + fn;

				if( options.interrupt && options[ key ] && options[ key ] !== curr ) {
					elem.stop( false, false );
					options._stopped = true;
				}

				options[ key ] = rounded;
				elem[ fn ]( rounded );
			}
		}
	} ); 
} )();
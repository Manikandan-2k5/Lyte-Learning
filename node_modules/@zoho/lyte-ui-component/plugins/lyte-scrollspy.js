;( function() {
	if( window.lyteDomObj ) {

		function is_doc( elem ){
			return elem == document || elem == document.documentElement || elem == document.body;
		}

		function process_query( query, suff ){
			var split = query.split( ',' ),
			str = '';

			split.forEach( function( item ){
				str += ( ( str ? ',' : '' ) + item + suff );
			});

			return str;
		}

		function __bcr( elem ){

			if( is_doc( elem ) ){
				return {
					left : 0,
					top : 0,
					width : innerWidth,
					height : innerHeight	
				};
			}

			return elem.getBoundingClientRect();
		}

		function fndChdrn( ori ){
			var ns = ".lyteScrollSpy ",
			__obj = this._scrollspy.obj,
			query = process_query( __obj.query, ":not(template)" ), 
			ignore = __obj.ignore,
			__is_doc = is_doc( this );

			if( ignore.constructor == String ) {
				ignore = ignore.split( ',' );
			}
			for( var i = 0; i < ignore.length; i++ ) {
				query += ":not(" + ignore[ i ].trim() + ")";
			}

			if( !__is_doc ){
				query = ns + query;
			}
			
			return ( __is_doc ? document.body : this.parentElement ).querySelectorAll( query );
		}

		function intEl( prev, curr, cd ){
			var grp = [];
			for( var i = 0; i < cd.length; i++ ) {
				var __cur = cd[ i ];

				if( __cur != prev && __cur != curr && ( ( __cur.off > prev.off && __cur.off < curr.off ) || ( __cur.off < prev.off && __cur.off > curr.off ) ) ) {
					grp.push( __cur ); 
				}
			}	
			return grp;
		}

		function oT( src, sT, flag ) {
			var bcr = __bcr( src );
			return Math.round( Math.max( 0, ( -__bcr( this ).top + sT + bcr.top + ( flag ? bcr.height : 0 ) ) ) );
		}

		function spyall( cd, hgt, sT, cge ) {
			var curr = [], 
			prev = [], 
			map = [], 
			chged,
			__active = 'lyteSpyActive';


			for( var i = 0; i < cd.length; i++ ) { 

				var __cur_elem = cd[ i ],
				$cur = $L( __cur_elem );

				map.push( { topp : oT.call( this, __cur_elem, sT ), hgt : __cur_elem.offsetHeight } );

				var cls = $cur.hasClass( __active ),
				cur_map = map[ i ];
				
				if( ( cur_map.topp <= sT + hgt && cur_map.topp > sT  ) || ( ( cur_map.topp + map[ i ].hgt ) >= sT && ( cur_map.topp + map[ i ].hgt ) <= sT + hgt ) || ( cur_map.topp <= sT && ( cur_map.topp + cur_map.hgt ) >= sT + hgt ) ) {
						if( !cls ) {
							$cur.addClass( __active );
							chged = true
						}
						curr.push( __cur_elem )
				} else if( cls ) {
					$cur.removeClass( __active );
					prev.push( __cur_elem ) 
					chged = true
				}	
			}
			if( chged && cge && cge.constructor == Function ){
				cge( curr, prev ,this )
			}
		}

		function setClass( cd ){
			var wO = this._wheelObj, 
			__is_doc = is_doc( this ),
			hgt = __is_doc ? innerHeight : this.offsetHeight, 
			spy = this._scrollspy.obj, 
			sT = ( wO ? wO.scrollTop : ( __is_doc ? window.pageYOffset : this.scrollTop ) ), 
			prev = ( __is_doc ? document.body : this.parentElement ).querySelector( ( __is_doc ? "" : '.lyteScrollSpy ' ) + process_query( spy.query, '.lyteSpyActive:not(template)' ) ), 
			curr, 
			cge = spy.onChange;

			if( cd.length ) {
				if( spy.position == "all" ) {
					spyall.call( this, cd, hgt, sT, cge )
				} else {
					if( spy.position == "bottom" ) {
						for( var i = cd.length - 1; i >= 0; i-- ) {

							var __cur = cd[ i ];

							__cur.off = oT.call( this, __cur, sT, true ); 
							if( sT + hgt - spy.offset > __cur.off ) {
								if( curr && __cur.off < curr.off ){
									continue;
								}
								curr = __cur;
							}
						}
					} else {
						for( var i = 0; i < cd.length; i++ ) {

							var __cur = cd[ i ];

							__cur.off = oT.call( this, __cur, sT ) + __cur.offsetHeight; 
							if( sT + spy.offset < cd[ i ].off ) {
								if( curr && __cur.off > curr.off ){
									continue;
								}
								curr = __cur;
							}
						}
					}
					if( prev != curr ) {
						$L( prev ).removeClass( 'lyteSpyActive' );
						$L( curr ).addClass( 'lyteSpyActive' );
						if( cge && cge.constructor == Function ){
							cge( curr, prev, prev && curr ? intEl.call( this, prev, curr, cd ) : [] ,this )
						}
					}
				}
			}	

		}
		function innfun(){
			var chdrn = setClass.call( this, fndChdrn.call( this ) );	
			delete this._scrollspy.obj._spytime;
		}

		function glbscrll( evt ) {
			var tg = evt.target,
			spy = tg._scrollspy;

			if( spy ) {
				if( spy.obj.position == "visible" ){
					intersection_scroll.call( tg );
				} else{
					if( tg._scrollFun ) {
						clearTimeout( spy.obj._spytime );
						spy.obj._spytime = setTimeout( innfun.bind( tg ) , 0 );
					} else {
						innfun.call( tg );
					}
				}
			}
		}

		function intersection_scroll(){
			var bcr = this.getBoundingClientRect(),
			active = [],
			in_active = [],
			obj = this._scrollspy.obj,
			class_name = obj.activeClass,
			callback = obj.onChange,
			offset = obj.offset,
			left_str = "left",
			right_str = "right",
			top_str = "top",
			bottom_str = "bottom",
			partial = function( __bcr, to_check, _left, _right ){
				var value = __bcr[ to_check ];
				return ( ( bcr[ _left ] - offset ) <= value ) && ( value <= ( bcr[ _right ] + offset ) );
			},
			is_visible = function( __bcr ){
				return ( partial( __bcr, left_str, left_str, right_str ) || partial( __bcr, right_str, left_str, right_str ) ) && ( partial( __bcr, top_str, top_str, bottom_str ) || partial( __bcr, bottom_str, top_str, bottom_str ) );
			};

			Array.from( fndChdrn.call( this ) ).forEach( function( item ){
				var __bcr = item.getBoundingClientRect(),
				$elem = $L( item ),
				_has = $elem.hasClass( class_name );

				if( is_visible( __bcr ) ){
					if( !_has ){
						active.push( item );
						// $elem.addClass( class_name );
					}
				} else if( _has ){
					in_active.push( item );
					// $elem.removeClass( class_name );
				}
			});

			active.forEach( function( item ){
				$L( item ).addClass( class_name );
			});

			in_active.forEach( function( item ){
				$L( item ).removeClass( class_name );
			});

			if( callback && ( active.length || in_active.length ) ){
				callback( active, in_active, this );
			}
		}

		lyteDomObj.prototype.removeScrollspy = function(){

			var len = this.length,
			fn = function( __class, _this ){
				$L( fndChdrn.call( _this ) ).removeClass( __class );
			};

			for( var i = 0; i < len; i++ ){
				var current = this.eq( i ),
				dom = current.get( 0 ),
				data = dom._scrollspy;

				if( data ){
					fn( data.obj.activeClass, dom );

					current.removeClass( 'lyteScrollSpy' );
					clearTimeout( data.obj._spytime );
					delete dom._scrollspy;
				}
			}
		}
		lyteDomObj.prototype.scrollspy = function( obj ) {
			var length = this.length;

			if( obj == "reset" ){
				for( var i = 0; i < length; i++ ) {
				 	glbscrll( { target : this[ i ] } );
				}
				return this;
			}
			obj = obj || {};
			obj.activeClass = obj.activeClass || 'lyteSpyActive';
			obj.offset = obj.offset || 0; obj.ignore = obj.ignore || [];
			obj.position = obj.position || "top";
			obj.query = obj.query || ">*";

			for( var i = 0; i < length; i++ ) {
				var jelem = this.eq( i ),
				dom = jelem.get( 0 ),
				copy_obj = $L.extend( true, {}, obj );

				dom._scrollspy = {
					obj : copy_obj
				};

				jelem.addClass( 'lyteScrollSpy' );
				setTimeout( glbscrll, 20, { target : dom } );
			}
			return this;	
		}
		window.addEventListener( 'scroll', glbscrll, true );
	}
} )( window );
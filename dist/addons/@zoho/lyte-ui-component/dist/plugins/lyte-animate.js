	;(function(window){
		var elData, AniData,
		curves = {
			'ease-in': function( t ) {
				return t * t;
			},

			'ease-out': function( t ) {
				return t * ( 2 - t );
			},

			'linear': function( t ) {
				return t;
			},

			'ease-in-out': function( t ) {
				return t < 0.5 ? ( 2 * t * t ) : ( -1 + ( 4 - 2 * t ) * t );
			}
		};

		$L.Tween = {
			propHooks: {}
		};

		function firecallback( item, forceRemove ) {
			if( forceRemove ) {
				return ;
			}
			
			var anidata = AniData.data[ item.lyteAnimateId ][ 0 ],
			opts = ( anidata || {} ).options,
			complete = ( opts || {} ).complete,
			props, param = {}, aniProp;

			if( complete ) {
				props = elData.get( item, 'animeProp', 'animate' );
				aniProp = elData.get( item, 'animeProp' );
				param.transitionProperty = props;
				param.from = aniProp.from;
				param.to = aniProp.to;
				param.startTime = aniProp.startTime;

				complete.call( item, param );
			}
		}

		function mapOnCurve( t, timingFunction ) {
			return curves[ timingFunction ]( t );
		}

		function progress( prop, final, before, diff, initial, total, remaining, timingFunction, obj, data ) {
			var now = Date.now(),
			change = now - before,
			remaining = remaining - change,
			elapsed = total - remaining,
			tweenProps = $L.Tween.propHooks[ prop ], t, multiplier;

			elapsed = remaining < 0 ? total : elapsed;
			t = elapsed / total;
			multiplier = mapOnCurve( t, timingFunction );

			if( 'set' in tweenProps ) {
				tweenProps.set( obj, initial + diff * multiplier, data );
			}
			else {
				this[ prop ] = initial + ( diff * multiplier );
			}

			/**
			 * When .stop is called inside the set in scrollTo plugin
			 * we were cancelling the current request animation frames instead
			 * of preventing the next one from happening
			 * so we are using this flag to determine when it needs to be stopped
			 * We still had to cancel the rAFs though because
			 * we register scrollLeft and scrollTop rAFs
			 * If the rAF of scrollLeft is responsible for cancelling the animation with .stop
			 * we need to prevent the rAF of scrollTop from firing and calling the .stop again
			 *
			 */
			if( data._stopped ) {
				return ;
			}
			
			if( remaining > 0 ) {
				this[ 'rAF' + prop ] = window.requestAnimationFrame( 
					progress.bind( 
						this, 
						prop, 
						final, 
						now, 
						diff, 
						initial, 
						total, 
						remaining, 
						timingFunction, 
						obj,
						data 
				) );

			}
			else {
				tryDequeue( obj.get( 0 ), false );
			}

		}

		function animateNonStandard( prop, final, element ) {
			var now = Date.now(),
			obj = $L( element ),
			tweenProps = $L.Tween.propHooks[ prop ],
			initial = getCurrentValueForNonStandards( prop, obj ),
			diff = final - initial,
			data = AniData.data[ element.lyteAnimateId ][ 0 ].options,

			// If duration is 0 make sure it is 1
			duration = data.duration || 1,
			aniProps = elData.get( element, 'animeProp' ),
			timingFunction,
			start = data.start,

			// fired is going to tell us whether start has fired or not
			fired = data.fired;

			// We don't do ease functions over here
			timingFunction = data.timingFunction = ( data.timingFunction === 'ease' ? 'ease-in-out' : data.timingFunction );

			if( start && !fired ) {
				data.fired = true;

				start.call( element, {
					options: data,
					from: aniProps.from,
					to: aniProps.to,
					value: data.value,
					startTime: now,

					// I think the target is wrong over here and over there in standard start section
					// TODO: fix target
					target: element,
					transitionProperty: Object.keys( aniProps.to )
				} );
			}

			element[ 'rAF' + prop ] = window.requestAnimationFrame( 
				progress.bind( 
					element, 
					prop, 
					final, 
					now, 
					diff, 
					initial, 
					duration, 
					duration, 
					timingFunction, 
					obj,
					data
			 ) );
		}

		// compStyles can be undefined when we are searching for a window
		function isStandard( prop, compStyles ) {
			return prop in ( compStyles || {} );
		}

		function getCurrentValueForNonStandards( key, obj ) {
			var tweenProps = $L.Tween.propHooks[ key ];

			if( 'get' in tweenProps ) {
				return tweenProps.get( obj );
			}
		
			return obj.get( 0 )[ key ];	
		}

		/**
		 * This tries to dequeue the animateProperty from the queue
		 * @param {DOMElement} item - item whose animation needs to be dequeued
		 * @param {Boolean} standard - whether it is a standard or a non standard property
		 *
		 */

		function tryDequeue( item, standard, forceRemove ) {
			if( !( AniData.data[ item.lyteAnimateId ] || [] )[ 0 ] ){
				return;
			}
			var anidata = AniData.data[ item.lyteAnimateId ][ 0 ],
			nsC = anidata.nonstandard || 0, 
			comp_standard = anidata.standard, 
			animates = elData.get( item, 'animeProp', 'animate' ) || [],
			comp_ns;

			// if( !animates.length ) {
			// 	return ;
			// }

			if( standard ) {
				anidata.standard = comp_standard = true;
			}
			else {
				nsC--;
				anidata.nonstandard = nsC;
			}

			// never going to be lesser but just a safety
			comp_ns = nsC <= 0 ? true : false; 

			// Both standard and non standard animations have completed
			if( forceRemove || comp_standard && comp_ns ) {
				AniData.dequeue( item, forceRemove );
			}
		}

		function getDefaultDisplay( elem ) {
			if( !elem.lyteAnimateId ) {
				AniData.add( elem );
			}
			var nodeName = elem.nodeName, display = elData.get( elem, 'displayValue' );

			if ( display ) {
				return display;
			}

			if( elem.hasAttribute( 'lyte-rendered' ) ){
				display = "block";
			} else {
				var owner = elem.ownerDocument,temp = owner.body.appendChild( owner.createElement( nodeName ) );
				display = owner.defaultView.getComputedStyle( temp ).display;
				owner.body.removeChild( temp );

				if ( display === "none" ) {
					display = "block";
				}
			}
			elData.set( elem, 'displayValue', display );
			return display;
		}

		function generateDummyProps ( prop, flag ) {
			var dummy = {};
			var arr = [ 'left', 'right', 'top', 'bottom' ];
			for( var i = 0; i < arr.length; i++ ){
				dummy[ 'margin-' + arr[ i ] ] = dummy[ 'padding-' + arr[ i ] ] = prop;
			}
			if( flag ){
				dummy.width = dummy.height = dummy.opacity = prop;
			}
			return dummy;
		}

		function showhide( elems, flag ) {
			var disps = []
			for( var i = 0; i < elems.length; i++ ) {
				var el = elems[ i ];
				AniData.add( el );
				var actDisp = el.style.display;
				if( flag ) {

					var $el = $L( el ),
					is_hidden;

					if( actDisp == 'none' ) {
						disps[ i ] = null || elData.get( el,'display' )
						if( !disps[ i ] ) {
							el.style.display = "";
							// this forced read is unavoidable. If that element contains another display none defined in class we need to find if its really hidden or not after modifying its inline display value
							if( is_hidden = ( $el.css( 'display' ) == "none" ) ){
								actDisp = "";
							} else {
								disps[ i ] = "";
							}
						}
					}
					if( actDisp == "" && ( is_hidden || $el.css( 'display' ) == "none" ) ){
						disps[ i ] = getDefaultDisplay( el );
					}
				}else if( actDisp != 'none' ) {
					disps[ i ] = 'none';
					elData.set( el,'display', actDisp );
				}
			}


			for( var j = 0; j < elems.length; j++ ) {
				$L( elems[ j ] ).css( 'display', disps[ j ] )
			}

			return elems;
		}

		function show() {
			return showhide( [ this ], true );
		}

		function hide() {
			return showhide( [ this ] );
		}

		function toggle( arg, prop ) {
			if( !isValid( arg, prop ) ) {
				return;
			}
			if( arg.constructor == Boolean ) {
				return showhide( [ this ], arg )
			}

			return $L.each( this, function() {
				toggle( this, $L( this ).css( 'display' ) != 'none' ) 
			})
		}

		function camelCase (string){
		 return string.replace(/(-\w)/g, function (m) {
	            return m[1].toUpperCase();
	        });
		}

		function dasherize(string){
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		function AnimationData(){
			this.data = {};
		}

		function animationEnd(evt){
			if(evt.target == this){
				elData.get(this, 'endCallback').call(this, evt);
			}
		}

		AnimationData.prototype = {
			add : function(elem){
				if( elem.lyteAnimateId ){
					return elem.lyteAnimateId;
				}
				var randomId = 'lyteAnimate' + parseInt(Math.random() * Math.pow(10,6));
				elem.lyteAnimateId = randomId;
				this.data[randomId] = [];
				elem[elem.lyteAnimateId] = {}
				return randomId;
			},
			queue : function(elems, options, value){
				for(var i = 0; i < elems.length; i++){
					var el = elems[i];
					var id  = el.lyteAnimateId
					if(!id){
							id = this.add(el);
						}
					this.data[id].push({elem : el, options : options, value : value, properties : Object.keys(value)});
					if(this.data[id].length == 1){
						el.addEventListener('transitionend', animationEnd);
						this.next(el);	
					}
				}
			},
			dequeue : function(elem, forceRemove ){
				firecallback( elem, forceRemove );
			 	this.data[elem.lyteAnimateId].splice(0, 1);
				this.next(elem);
			},
			dequeueAll : function(elem){
				this.data[elem.lyteAnimateId] = this.data[elem.lyteAnimateId].splice();
				this.next(elem);
			},
			next : function(elems){
				clearTimeout( elems._nextime );
				elems._nextime = setTimeout(this.call.bind(this), 13, elems);
			},
			call : function(elem){
				delete elem._nextime;		
				if(elem.lyteAnimateId && this.data[elem.lyteAnimateId][0]){
						lyteAnimation.call(elem);
				}else{
					this.data[elem.lyteAnimateId] = [];
					elem.removeEventListener('transitionend', animationEnd);
				}	
			}
		}

		function ElementData(){
		}

		ElementData.prototype = {
			set :  function( arg0, arg1, arg2, arg3 ){

				var __length = arguments.length;

				if( __length < 3){
					return;
				}
				if( __length == 3){
					if( arg0[ arg0.lyteAnimateId] == undefined){
						arg0[ arg0.lyteAnimateId] = {};
					}
					arg0[ arg0.lyteAnimateId][ arg1 ] = arg2;
				}
				else if( __length == 4){
					if( arg0[ arg0.lyteAnimateId][ arg1 ] == undefined){
						arg0[ arg0.lyteAnimateId][ arg1 ] = {};
					}
					arg0[ arg0.lyteAnimateId][ arg1 ][ arg2 ] = arg3
				}

			},
			get : function( arg0, arg1, arg2 ){

				var __length = arguments.length;

				if( __length < 1){
					return;
				}
				if( __length == 1){
					return arg0[ arg0.lyteAnimateId];
				}
				else if( __length == 2){
					return arg0[ arg0.lyteAnimateId][ arg1 ];
				}
				else if( __length == 3){
					if( arg0[ arg0.lyteAnimateId][ arg1 ]){
						return arg0[ arg0.lyteAnimateId][ arg1 ][ arg2 ];
					}	
				}
				return;
			}
		}

		function checkCrctValue(value, key, camelCaseKey, compStyle){
			var valueCopy = value[key].toString();
			if(/^(\()/g.exec(valueCopy)){
				return valueCopy;
			}
			var operatorRegex = /^\+=|\-=|\*=|\/=/g, unitRegex = /cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|auto|vmin|vmax|%+$/ig, unit = valueCopy.match(unitRegex), finalVal = valueCopy.match(operatorRegex);
			if(compStyle[camelCaseKey] != "none" && !/matrix/ig.test(compStyle[camelCaseKey])){
				if(unit == null){
					var newUnit = compStyle[camelCaseKey].match(unitRegex);
					if(newUnit == null){
						unit = "";
					}else{
						if(newUnit[0] == 'auto'){
							unit = 'px';
						}else{
							unit = newUnit[0]
						}
					}
				}else{
					unit = unit[0];
					valueCopy = valueCopy.slice(0, valueCopy.indexOf(unit));
				}
			}else{
				unit = "";
			}
			if(finalVal){
				var temp = parseInt(compStyle[camelCaseKey]), split = valueCopy.split("=");
				temp = temp == NaN ? 0 : temp;
				switch(split[0]){
					case '/' : 
						valueCopy = temp  / parseFloat(split[1]);
						break;
					case '-' : 
						valueCopy = temp  - parseFloat(split[1]);
						break;
					case '*' : 
						valueCopy = temp  * parseFloat(split[1]);
						break;
					default : 
						valueCopy = temp  + parseFloat(split[1]);
				}
			}
			// return [valueCopy + unit, unit];
			return valueCopy + unit;

		}

		function lyteAnimation (){	
				var newObj = {}, 
				units = {},
				win = $L.isWindow( this ), 
				def = win ? false : this.ownerDocument.defaultView;

				$L.fastdom.measure( function(){
					// windows are not hidden but if it isn't a window, hidden is recaculated below
					var hidden = def;
					// We are ignoring if it is a window
					if( def ) {
						var compstyle = def.getComputedStyle( this );

						hidden = compstyle.display == "none";

						if( !hidden && !this.offsetParent ){
							autoAnimate.call( this )
							return;
						}
					}

					var anidata = AniData.data[this.lyteAnimateId][0];
					if( !anidata ){
						return;
					}
					var value = anidata.value, auto = [],
					keys = Object.keys( value ), value, animeProp = [], from = {}, to = {}, val,
					originalData = elData.get(this, 'animeProp', 'original');
					if( !originalData ){
						originalData = {};
						elData.set( this, 'animeProp', 'original', originalData )
					}

					$L.fastdom.mutate( function() {
						anidata = AniData.data[ this.lyteAnimateId ][ 0 ];
						if( !anidata ){
							return;
						}
						var flag = true, standardObj = {}, 
						compstyle, bcr, obj = $L( this ), standardPresent = false;

						for( var i = 0; i < keys.length; i++ ){
							var curkey = camelCase( keys[ i ] ), curval = value[ keys[ i ] ],

							// standard - properties that are present in the CSSStyleDeclaration
							// Non standard  - Eg: scrollTop
							val = null, standard;

							// Skipping if it is a window
							if( def && /show|hide|toggle/.test( curval ) ){
								if( curval == 'hide' || !hidden && curval == "toggle" ){
									val = "hide";
								} else if( curval == "show" || hidden && curval == "toggle" ){
									val = "show";
								}
								if( val == "show" && !hidden || val == "hide" && hidden ){
									continue;
								}
							}

							// Skipping if it is a window
							if( def && flag ){
								if( hidden ){
									if( this._lytedisplay == undefined ){
										this.style.display = getDefaultDisplay( this );
									} else {
										this.style.display = this._lytedisplay || '';

									}
								} else {
									this._lytedisplay = this.style.display;
								}
								// force measure needed
								compstyle = def.getComputedStyle( this );
								bcr = this.getBoundingClientRect();
								flag = false;
							}

							if( animeProp.indexOf( curkey ) == -1 ){
								animeProp.push( curkey );
							}

							standardObj[ curkey ] = 
							standardObj[ curkey ] = 
							standard = isStandard( curkey, compstyle );

							// We are checking if there is atleast 1 standard property
							// If there are no standard props we don't call autoanimate
							// else we do
							standardPresent = standardPresent || ( standard ? true : false );

							/* Element is not hidden */
							if( !hidden ) {
								if( val != "hide" ) {
									// There is a difference between getting a non standard from an object 
									// and a non standard from a DOM. If you are getting it from the DOM you need to use the getter
									// from tweenProps else you can just get it from the object.
									to[ curkey ] = !standard ? 
													value[ keys[ i ] ] : 
													checkCrctValue( value, keys[ i ], curkey, compstyle );
								} else{
									/* This gets fired when they are trying to hide an element 
									which doesn't happen with scrollTo or non standard animations */
									originalData[ curkey ] = this.style[ curkey ];
									to[ curkey ] =  0;
								}

								from[ curkey ] = !standard ? getCurrentValueForNonStandards( curkey, obj ) : compstyle[ curkey ];
							} else {
								if( val != "show" ){
									from[ curkey ] = !standard ? getCurrentValueForNonStandards( curkey, obj ) : compstyle[ curkey ];
								} else {
									originalData[ curkey ] = this.style[ curkey ];
									from[ curkey ] = 0;
								}

								to[ curkey ] = !standard ? 
												value[ keys[ i ] ] 
												: !val ? 
													checkCrctValue( value, keys[ i ], curkey, compstyle ) 
													: compstyle[ curkey ];
							}

							if( parseFloat( to[ curkey ] ) == parseFloat( from[ curkey ] ) || /auto/.test( to[ curkey ] ) || /auto/.test( from[ curkey ] ) ){
								delete from[ curkey ]; delete to[ curkey ]; 
								var index = animeProp.indexOf( curkey );

								if( index > -1 ) {
									animeProp.splice( index, 1 );
								}
							}
						}

						elData.set( this, 'animeProp', 'from', from );
						elData.set( this, 'animeProp', 'to', to );
						elData.set( this, 'animeProp', 'mode', val );
						elData.set( this, 'animeProp', 'animate', animeProp );
						elData.set( this, 'animeProp', 'standardObj', standardObj );


						// We just set this to true when we are about to animate any property( standard or nonstandard )
						// and set it to false inside autoanimate after standards finish animating
						// elData.set( this, 'animeProp', 'standard', false );
						// false as in standard has not finished
						// true as in there are no standards and we consider it to be finished
						anidata.standard = !standardPresent;

						if( !standardPresent && $L.isEmptyObject( to ) ) {
							// If there are no properties to animate just dumpster it 
							tryDequeue( this );
						}

						// Froms are used to animate standard properties, non-standards don't really care about them
						if( standardPresent ) {
							$L.each( from, function( prop, val ) {
								if( standardObj[ prop ] ) {
									this.style[ prop ] = val;
								}
							}.bind( this ) );

							autoAnimate.call( this );	
						}
						

						// Tos are used to animate non standard properties
						$L.each( to, function( prop, val ) {
							var nsC = anidata.nonstandard || 0;

							if( !standardObj[ prop ] ) {
								// Maintaining a count of the number of nonstandards that are getting animated
								// Will be decreased by 1 when their animation stops
								// We don't maintain a count for standards because they are all animated at once
								// which is not the case for nonstandards
								anidata.nonstandard = nsC + 1;
								animateNonStandard( prop, val, this );
							}
						}.bind( this ) );
						
						// When both standards and non standards finish we dequeue	

					}.bind( this ))
				}.bind( this ))
		}

		function constructCss(){
			if( !document.body.contains( this ) ){
				return;
			}
			var opts = AniData.data[this.lyteAnimateId][0].options,
			defaultOpts = ['timingFunction', 'duration', 'delay'], constyle="",
			value  =  Object.keys(AniData.data[this.lyteAnimateId][0].value || {});
			for(var i = 0; i < defaultOpts.length; i++){
				if(defaultOpts[i] in opts){
					var sec = '';
					if(defaultOpts[i] == 'delay' || defaultOpts[i] == 'duration'){
						if(!/[ms|s]+/ig.test(opts[defaultOpts[i]])){
							sec = 'ms'
						}
					}
					constyle += 'transition-' + dasherize(defaultOpts[i]) + ':' + opts [defaultOpts[i]] + sec + ";";
	 			}
			}
			if(value.length)
				{
					constyle += 'transition-property : ';
					for(var j = 0; j < value.length; j++){
						constyle += j > 0 ? ','+ dasherize(value[j]) : dasherize(value[j]);
					}
				}
			return constyle += ";";
		}

		function removeStyle(){
			this.style.removeProperty('transition');
		}

		function autoAnimate () {
			if( ( elData.get(this, 'animeProp', 'animate') || [] ).length) {

					removeStyle.call(this);
					var newstyle = constructCss.call(this);
					elData.set(this, 'endCallback', function(evt){				
					 	evt.type != 'timeout' && evt.stopPropagation();
						var props = elData.get(this, 'animeProp', 'animate');
						if( !AniData.data[this.lyteAnimateId].length ){
							return;
						}
						var propLength = elData.get(this, 'propertyCount');
						if( evt.type == 'timeout' ){
							propLength = props.length - 1;
						}
						elData.set(this, 'propertyCount', ++propLength);
						if(props.length == propLength)
							{
								clearTimeout( this._anitime ); delete this._anitime;
								// clearTimeout( this._styletime ); delete this._styletime;	
								removeStyle.call(this);
								var mode = elData.get(this, 'animeProp', 'mode'), original = elData.get(this, 'animeProp', 'original');
								if(mode){
									if(mode == 'hide'){
										  if( evt.type == "timeout" ){
										  	hide.call(this);
										  	$L.each( original, function( prop, value ){
												$L( this ).css( prop, value );
											}.bind( this ))

										  	tryDequeue( this, true );
										  } else {
											  setTimeout(function(){
											  	hide.call(this);
											  	$L.each( original, function( prop, value ){
													$L( this ).css( prop, value );
												}.bind( this ))

											  	tryDequeue( this, true );
											  }.bind(this), 20);
										  	}
										}
									else{
										$L.each( original, function( prop, value ){
											$L( this ).css( prop, value );
										}.bind( this ))

										tryDequeue( this, true );
									}
								}else{	

									tryDequeue( this, true );
								}
								
								setTimeout(function(){
									this.style.overflow = this._orioverflow;
									delete this._orioverflow;
								}.bind(this), 20);	
							}
					});
			    	this._orioverflow = this.style.overflow;
			    	this.style.overflow = "hidden";
					elData.set(this, 'propertyCount', 0);
					this._styletime =  setTimeout( function(){
						delete this._styletime;
						var sty = $L(this).attr('style');
						$L(this).attr('style', ( sty ? ( sty + ';' ) : "") + newstyle );
						setTimeout(dummy.bind(this), 20);
					}.bind( this ), 20 )
				}
			else{

				tryDequeue( this, true );
			}		

		}

		function dummy(){
				var anidata = AniData.data[this.lyteAnimateId][0];
				if(anidata){
					var options = anidata.options,
					currTime = Date.now(),

					// The fired is going to tell us whether the start callback has been fired or not
					fired = options.fired;

					elData.set(this, 'animeProp', 'startTime', currTime);
					var aniProp = elData.get(this, 'animeProp');

					if( options.start && !fired ) {
						options.fired = true;
						// TODO: fix target

						options.start.call(this, {options : options, from : aniProp.from, to : aniProp.to, value : AniData.data[this.lyteAnimateId][0].value, startTime : currTime, target : this, transitionProperty : Object.keys(aniProp.to)});
					}
					var elem = this;
					$L.each(elData.get(this, 'animeProp', 'to'), function(prop, val){
						$L(elem).css(prop, val);
					})
					this._anitime = setTimeout( animationEnd.bind( this, { type : "timeout", target : this } ), returntran( options.duration.toString() ) + 10 )
				}else{
					removeStyle.call(this);
					this.removeEventListener('transitionend', animationEnd);
				}
		}

		function returntran( prop ){
			var ret = 0;
			if( /\d+/.test( prop ) ){
				var match = prop.match( /(\d+)(s|ms){0,}$/ );
				ret = parseFloat( match[ 1 ] ) * ( match[ 2 ] == "s" ? 1000 : 1 );
			}
			return ret;
		} 

		elData = new ElementData();
		AniData = new AnimationData();

		function getCorrectOption (duration, ease, callbacks){
			var obj = {};
			if(callbacks){
				if(callbacks.constructor == Function){
					obj.complete = callbacks;
				}
			}
			if(ease){
				if(ease.constructor == Function){
					obj.complete = ease;
				}
				else if(ease.constructor == Object){
					$L.extend( obj, ease );
					// Object.assign(obj, ease);
				}
				else if(ease.constructor == String){
					obj.timingFunction = ease;
				}
			}
			if(duration != undefined){
				if(duration.constructor == Object){
					$L.extend( obj, duration );
					// Object.assign(obj, duration);
				}
				else if(duration.constructor == Number){
					obj.duration = duration
				}
				else if(duration.constructor == Function){
					obj.complete = duration
				}
			}
			if(obj.delay != undefined ){
				if(/[s]+/ig.test(obj.delay)){
					options.delay = parseInt(options.delay) * 1000;
				}
			}
			if(!('duration' in obj)){
				obj.duration = 400;
			}
			if(/[s]+/ig.test(obj.duration)){
					options.duration = parseInt(options.duration) * 1000;
				}
			if(!obj.timingFunction){
				obj.timingFunction = "ease";
			}	
			return obj;
		}

		function replaceStyle( props, from, percent ) {
			$L(this).css(props, this.style[props].replace(/([0-9.-]+)/, function(arg){
				return ((parseFloat(arg) - from) * percent + from);
			}))
		}

		function stopAnimation(jumpToEnd, clearQueue){
			if(jumpToEnd){
				var propLength = elData.get(this, 'propertyCount');
				elData.set(this, 'propertyCount', ( elData.get(this, 'animeProp', 'animate') || [] ).length - 1);
				// this.dispatchEvent(new Event('transitionend'));
				animationEnd.call( this, { target : this, type : 'timeout' } );
				if(clearQueue){
					AniData.dequeueAll(this);
				}
			}else{
				// issues in stop with JumpToEnd false. Need to be fixed after 2.0 release
				var data = AniData.data[this.lyteAnimateId];
				if( !data ) {
					return
				}
				clearTimeout( this._anitime ); delete this._anitime;
				var options = data[0].options, animate = elData.get(this, 'animeProp');
				var currTime = Date.now(), val, from = animate.from, to = animate.to;
				var startTime = animate.startTime;
				var remain = Math.max(0, startTime + options.duration - currTime);
				var percent = 1 - (remain / options.duration);
				var props = Object.keys(animate.to || {});
				var standardObj = elData.get( this, 'animeProp', 'standardObj' );


				for(var i = 0; i < props.length; i++){
					if( !standardObj[ props[ i ] ] ) {
						window.cancelAnimationFrame( this[ 'rAF' + props[ i ] ] );
						tryDequeue( this, false );
						continue;
					}

					tryDequeue( this, true );
					var from1 = from[props[i]];
					if( from1 == 'none' && !( /deg/ig.test( from1 ) ) ){
						from1 = 1
					}
					from1 = parseInt( from1 )
					from1 = isNaN(from1) ? 0 : from1;
					replaceStyle.call( this, props[ i ], from1, percent )
				}
				$L(this).css('transition', '');
				if(clearQueue){
					AniData.dequeueAll(this);
				}
				// else{
				// 	AniData.dequeue(this);
				// }
			}
		}

		function isValid( bol, prop ){
			if( ( prop == 'hide' && bol ) || ( prop == 'show' && !bol ) ){
				return false;
			}
			return true
		}

		if( lyteDomObj ){
			lyteDomObj.prototype.animate = function(){
				if(arguments.length)
					{
						var opts = getCorrectOption(arguments[1], arguments[2], arguments[3]);
						AniData.queue(this, opts, arguments[0]);
					}
				return this;
			}

			lyteDomObj.prototype.fadeTo = function( value, duration, ease, callback){
				if( duration != undefined && duration.constructor == Number ){
					if( duration < 1 ){
						var temp = duration;
						duration = value;
						value = temp;
					}
				}
				value = value || 0;
				var opts = getCorrectOption(duration, ease, callback);
				AniData.queue(this, opts, value.constructor == Object ? value :  {opacity : value});
				return this;
			}

			$L.each({
					fadeIn : { opacity : 'show'}, 
					fadeOut : { opacity : 'hide' }, 
					fadeToggle : { opacity : 'toggle'},
					slideUp : { height : 'hide', paddingTop : "hide", paddingBottom : "hide" },
					slideDown : {height : 'show', paddingTop : "show", paddingBottom : "show" },
					slideToggle :  { height : 'toggle', paddingTop : "toggle", paddingBottom : "toggle"}
				}, function(property, value){
					lyteDomObj.prototype[property] = function(duration, ease, callback){
					   return this.animate(value, duration, ease, callback);
					}
			})

			lyteDomObj.prototype.stop = function(clearQueue, jumpToEnd){
				return $L.each(this, function(){
					stopAnimation.call(this, jumpToEnd != undefined ? jumpToEnd : true, clearQueue);
				})
			}

			lyteDomObj.prototype.finish = function( jumpToEnd ){
				return $L.each(this, function(){
					var queues = AniData.data[this.lyteAnimateId];
					if( queues && queues.length )
						{
							for(var i = 1; i < queues.length; i++){
								queues[i].options.duration = 1;
							}
							// setTimeout( stopAnimation.bind( this, true, false ), 13 );
							stopAnimation.call(this, true, false);
						}
				})
			}

			$L.each({
					show : generateDummyProps('show', true), 
					hide : generateDummyProps('hide', true), 
					toggle : generateDummyProps('toggle', true)
				}, function(property, value){
					lyteDomObj.prototype[property] = function(duration, ease, callback){
					   if(duration && duration.constructor != Boolean){
							return this.animate(value, duration, ease, callback);
						}
					   return $L.each(this, function(){
							toggle.call(this, $L(this).css('display') == 'none', property);
						})
					}
			})
		}

		$L.animate = {
			tryDequeue: tryDequeue
		};

	})(window);
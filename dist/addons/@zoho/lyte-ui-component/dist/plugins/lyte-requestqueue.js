( function() {
	var empty = function() {},
	ignore = [];

	/* constructor */
	function reqQueue( obj ) {
		this.queue = [];
		this.total = 0;
		this.sequential = ( obj || {} ).hasOwnProperty( 'sequential' ) ? obj.sequential : true;

		this.success = {};
		this.error = {};
		this.complete = {};
		this.order = [];


		return this;
	}

	/* private functions */
	function generateID( reqQ ) {
		return reqQ.total++;
	}

	function makeRequestWhenAjax( obj, reqQ, id ) {
		var success = obj.success || empty,
		complete = obj.complete || empty,
		error = obj.error || empty,
		beforeSend = obj.beforeSend,
		prom, copy = {};

		prom = new Promise( function( res, rej ) {

			$L.extend( copy, obj );

			copy.complete = function() {
				if( !reqQ.sequential ) {
					complete.apply( this, arguments );
				}
				else if( nextInQueue( reqQ ) === id ) {
					complete.apply( this, arguments );
					reqQ.order.shift();
					flush( reqQ );
				}
				else {
					reqQ.complete[ id ] = {
						fn: complete,
						context: this,
						args: arguments
					}
				}
			}

			copy.success = function() {
				if( !reqQ.sequential || nextInQueue( reqQ ) === id ) {
					success.apply( this, arguments );
				}
				else {
					reqQ.success[ id ] = {
						fn: success,
						context: this,
						args: arguments
					};
				}	

				res( {
					statusText: arguments[ 1 ],
					id: id,
					options: obj,
					lXHR: arguments[ 2 ],
					data: arguments[ 0 ],
					passed: true
				} );
			}

			copy.error = function() {
				if( !reqQ.sequential || nextInQueue( reqQ ) === id ) {
					error.apply( this, arguments );
				}
				else {
					reqQ.error[ id ] =  {
						fn: error,
						context: this,
						args: arguments
					};
				}

				rej( {
					id: id,
					options: obj,
					lXHR: arguments[ 0 ],
					statusText: arguments[ 1 ],
					error: error,
					passed: false
				} );
			}

			copy.beforeSend = function() {
				var ret;

				if( beforeSend ) {
					ret = beforeSend.apply( this, arguments );

					if( ret === false ) {
						ignore.push( id );
						rej( {
							id: id,
							options: obj,
							lXHR: arguments[ 0 ],
							passed: false
						} );
					}

					return ret;
				}
			}


			$L.ajax( copy );	
		} );

		return prom;
	}


	
	function nextInQueue( reqQ ) {
		var next = ( reqQ.order || [] )[ 0 ];

		if( !!~ignore.indexOf( next ) ) {
			reqQ.order.shift();

			next = nextInQueue( reqQ );
		}

		return next;
	}

	function flush( reqQ ) {
		var arr = [ 'success', 'error', 'complete' ],
		next, obj, cb, args, context, empty;

		while( ( next = nextInQueue( reqQ ) ) ) {
			empty = true;

			arr.forEach( function( item ) {
				empty = $L.isEmptyObject( obj = reqQ[ item ][ next ] || {} ) && empty;
				context = obj.context;
				args = obj.args;
				cb = obj.fn;

				if( cb ) {
					cb.apply( context, args );
				}
			} );

			if( empty ) {
				break;
			}

			reqQ.order.shift();
		}

	}

	function findType( obj ) {
		var type = 'Object';

		if( obj instanceof Promise ) {
			type = 'Promise'
		}

		return type;
	}

	function disableSequentialFlag( reqQ ) {
		reqQ.sequential = false;
	}


	function processResults( res, rej, results ) {
		var failed = [],
		success = [];

		// Reset ignores
		ignore = [];

		results.forEach( function( item ) {
			var isSuccess = item.passed;

			if( isSuccess ) {
				success.push( item );
			}
			else {
				failed.push( item );
			}
		} );

		if( failed.length === 0 ) {
			res( {
				success: success,
				failure: failed
			} );
		}
		else {
			rej( {
				success: success,
				failure: failed
			} );
		}
	}


	function setCallbacksWhenPromise( promise, id ) {
		var wrapper = new Promise( function( res, rej ) {
			
			promise.then( function() {
				res( {
					data: arguments,
					passed: true,
					id: id
				} );
			}, function() {
				rej( {
					data: arguments,
					passed: false,
					id: id
				} );
			} );
		} );
		

		return wrapper;
	}

	/* public functions */
	reqQueue.prototype.initiate = function() {
		var queue = this.queue,
		obj, opts, id, prom = [], ret, type;

		while( obj = queue.shift() ) {
			opts = obj.options;
			id = obj.id;
			type = obj.type

			this.order.push( id );

			if( type === 'Object' ) {
				prom.push( makeRequestWhenAjax( opts, this, id ) );	
			}
			else {
				disableSequentialFlag( this );
				prom.push( setCallbacksWhenPromise( opts, id ) );
			}
		}

		ret = new Promise( function( res, rej ) {
			Promise.all( 
				prom.map( function( p ) {
					return p.catch( function( e ) {
						return e;
					} );
				} )
			).then( processResults.bind( this, res, rej ) );
		} );

		this.queue = [];

		return ret;
		
	}

	reqQueue.prototype.add = function( obj ) {
		var id, that = this;

		if( Array.isArray( obj ) ) {
			return obj.map( function( item ) {
				return that.add( item );
			} );
		}
		else {
			id = generateID( this );

			this.queue.push( {
				id: id,
				options: obj,
				type: findType( obj )
			} );

			return id;	
		}		
	}


	reqQueue.prototype.removeAll = function() {
		var queue = this.queue;

		this.remove( 
			queue.map( function( item ) {
				return item.id;
			} ) 
		);
	}

	reqQueue.prototype.remove = function( id ) {
		var queue = this.queue,
		ind, that = this;

		id = Array.isArray( id ) ? id : [ id ];

		this.queue = queue.filter( function( item ) {
			var ind = id.indexOf( item.id ),
			present = !!~ind;

			return !present;
			
		} );		
	}

	$L.reqQueue = function( obj ) {
		var reqQ = new reqQueue( obj );

		return reqQ;
	}
} )();


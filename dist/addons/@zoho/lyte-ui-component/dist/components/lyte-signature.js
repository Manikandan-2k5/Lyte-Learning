/**
 * This component is used to get hand written inputs and convert them to images
 * @component lyte-signature
 * @utility refresh,clear,downloadAsImage,reset,resetQueue
 * @methods onBeforeDrawSelect,onDrawSelect,onDrawMove,onDrawEnd,onBeforeDownload,onUndoRedoQueueUpdate
 * @version 3.17.0
 */

Lyte.Component.register("lyte-signature", {
_template:"<template tag-name=\"lyte-signature\"> <canvas ontouchstart=\"{{action('mousedown',event)}}\" tabindex=\"0\" __mousedown=\"{{action('mousedown',event)}}\" __keydown=\"{{action('keydown',event)}}\">Canvas not supported</canvas> <template is=\"if\" value=\"{{expHandlers(ltPropImageUrl,'&amp;&amp;',showImage)}}\"><template case=\"true\"> <img src=\"{{ltPropImageUrl}}\"> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropInsertStroke","ltPropInsertLineWidth","ltPropFileName","ltPropDontModifyCurrent","ltPropImageUrl","ltPropUndoRedo","ltPropMode","ltPropEraseStroke","ltPropEraseLineWidth","showImage","undoQueue","redoQueue"],

	data : function(){
		return {
			/**
			 * @componentProperty {colorString} ltPropInsertStroke='#000000'
			 * @version 3.17.0
			 */			
			ltPropInsertStroke : Lyte.attr( 'string', { default : "#000000" }),
			/**
			 * @componentProperty {number} ltPropInsertLineWidth=1
			 * @version 3.17.0
			 */				
			ltPropInsertLineWidth : Lyte.attr( 'number', { default : 1 }),
			/**
			 * @componentProperty {string} ltPropFileName='sample_sign'
			 * @version 3.17.0
			 */				
			ltPropFileName : Lyte.attr( 'string', { default : "sample_sign" }),
			/**
			 * @componentProperty {boolean} ltPropDontModifyCurrent=false
			 * @version 3.17.0
			 */				
			ltPropDontModifyCurrent : Lyte.attr( 'boolean', { default : false }),
			/**
			 * @componentProperty {string} ltPropImageUrl=''
			 * @version 3.17.0
			 */				
			ltPropImageUrl : Lyte.attr( 'string', { default : "" } ),
			/**
			 * @componentProperty {boolean} ltPropUndoRedo=true
			 * @version 3.17.0
			 */				
			ltPropUndoRedo : Lyte.attr( 'boolean', { default : false } ),
			/**
			 * @componentProperty {Insert | Erase} ltPropMode='Insert'
			 * @version 3.17.0
			 */				
			ltPropMode : Lyte.attr( 'string', { default : 'Insert' } ),
			/**
			 * @componentProperty {colorString} ltPropEraseStroke='white'
			 * @version 3.17.0
			 */			
			ltPropEraseStroke : Lyte.attr( 'string', { default : "white" }),
			/**
			 * @componentProperty {number} ltPropEraseLineWidth=3
			 * @version 3.17.0
			 */				
			ltPropEraseLineWidth : Lyte.attr( 'number', { default : 5 }),

			showImage :  Lyte.attr( 'boolean', { default : true } ),
			undoQueue : Lyte.attr( 'array', { default : [] } ),
			redoQueue : Lyte.attr( 'array', { default : [] } )
		}		
	},

	lineObs : function( arg ){
		if( this.data.ltPropDontModifyCurrent ){
			return;
		}

		var ctx = this._context,
		obj = {
			ltPropInsertStroke : "strokeStyle",
			ltPropInsertLineWidth : "lineWidth"
		};

		ctx[ obj[ arg.item ] ] = arg.newValue;
		ctx.stroke();
	}.observes( 'ltPropInsertLineWidth', 'ltPropInsertStroke' ),

	didConnect : function(){
		this._canvas = this.$node.children[ 0 ];
		this._context = this._canvas.getContext( '2d' );
		this.set_dimension();

		this.$node.refresh = this.set_dimension.bind( this );
		this.$node.clear = this.clear.bind( this );
		this.$node.downloadAsImage = this.download.bind( this );
		this.$node.reset = this.reset.bind( this );
		this.$node.resetQueue = this.resetQueue.bind( this );

	},

	reset : function(){
		this.setData( 'showImage', true );
		this.set_dimension();
		this.resetQueue();
	},

	resetQueue : function(){
		this.data.undoQueue = [];
		this.data.redoQueue = [];
		this.call_queueUpdate();
	},

	clear : function(){
		var canvas = this._canvas;
		this._context.clearRect( 0, 0, canvas.width, canvas.height );
	},

	download : function(){
		var canvas = this._canvas;
		var a = document.createElement( 'a' );
		a.download = this.data.ltPropFileName;
		a.href = canvas.toDataURL( "image/png" );

		a.style.position = 'absolute';

		if( this.getMethods( 'onBeforeDownload' ) ){
			if( this.executeMethod( 'onBeforeDownload', a, this.$node ) == false ){
				return;
			}
		}
		this.$node.appendChild( a );
		a.click();
		a.remove();
	},

	didDestroy : function(){
		this.remove_events();

		[ '_canvas', '_context', 'refresh', 'clear', 'downloadAsImage', 'reset', 'resetQueue' ].forEach( function( item ){
			delete this[ item ];
		}.bind( this ) );
	},

	set_dimension : function(){
		var canvas = this._canvas,
		_this = this;

		$L.fastdom.measure( function(){
			var bcr = canvas.getBoundingClientRect();

			$L.fastdom.mutate( function(){
				canvas.setAttribute( 'width', bcr.width );
				canvas.setAttribute( 'height', bcr.height );	
				_this.include_image();
			});

		});
	},

	include_image : function(){
		var img = this.$node.querySelector( 'img' );
		if( img ){
			var loadFn = function(){
				var ctx = this._context,
				canvas = this._canvas;
				ctx.drawImage( img, 0, 0, canvas.width, canvas.height );
				this.setData( 'showImage', false );
			}.bind( this );

			if( img.complete ){
				loadFn();
			} else{
				img.onload = loadFn;
			}
		}
	},

	getEvent : function( evt ){
		var touches = evt.touches || [ evt ];

		if( touches.length > 1 ){
			return;
		}

		return touches[ 0 ];
	},

	mousemove : function( ev ){
		var evt = this.getEvent( ev );
		if( !evt ){
			return;
		}
		this._moved = true;
		var coor = this.get_coordinate( evt ),
		ctx = this._context,
		mode = this.data.ltPropMode,
		stroke = this.data[ 'ltProp' + mode + 'Stroke'];

		ctx.lineWidth = this.data[ 'ltProp' + mode + 'LineWidth' ];

		ctx.lineTo( coor.x, coor.y );

		if( stroke ){
			ctx.stroke();
			ctx.strokeStyle = stroke;
		}

		if( this.getMethods( 'onDrawMove' ) ){
			this.executeMethod( 'onDrawMove', ev, this.$node );
		}
		ev.preventDefault();
	},

	remove_events : function(){
		if( this._move ){
			[ { name : 'mousemove', evt : this._move }, { name : 'mouseup', evt : this._up }, { name : 'touchmove', evt : this._move }, { name : 'touchend', evt : this._up } ].forEach( function( item ){
				document.removeEventListener( item.name, item.evt, true );
			}.bind( this ));

			delete this._move;
			delete this._up;
		}
	},

	mouseup : function( evt ){
		this.remove_events();
		if( this._moved && this.data.ltPropUndoRedo ){
			var canvas = this._canvas;
			this.push_to_queue( this._context.getImageData( 0, 0, canvas.width, canvas.height ) );
		}
		if( this.getMethods( 'onDrawEnd' ) ){
			this.executeMethod( 'onDrawEnd', evt, this._moved, this.$node );
		}
		delete this._moved;
	},

	push_to_queue : function( obj ){
		this.data.undoQueue.push( obj );
		this.data.redoQueue.splice( 0 );

		this.call_queueUpdate();
	},

	call_queueUpdate : function(){
		var callback_name = 'onUndoRedoQueueUpdate';
		if( this.getMethods( callback_name ) ){
			this.executeMethod( callback_name, this.data.undoQueue, this.data.redoQueue, this.$node );
		}
	},

	get_coordinate : function( evt ){
		var bcr = this.$node.getBoundingClientRect();
		return{
			x : evt.clientX - bcr.left,
			y : evt.clientY - bcr.top
		};
	},

	undo : function( evt ){
		var undo = this.data.undoQueue,
		redo = this.data.redoQueue;

		var current = undo.pop(),
		last_before = $L( undo ).get( -1 );

		if( current ){
			redo.push( current );
			this.render( last_before, evt );
		}
	},

	redo : function( evt ){
		var redo = this.data.redoQueue,
		current = redo.pop();

		if( current ){
			this.data.undoQueue.push( current );
			this.render( current, evt );
		}

	},

	render : function( to_render, evt ){
		this.clear();
		if( to_render ){
			this._context.putImageData( to_render, 0, 0 );
		}
		evt.preventDefault();
		this.call_queueUpdate();
	},

	actions : {
		mousedown : function( evt ){
			var ev = this.getEvent( evt ),
			namemove = "mousemove",
			nameup = "mouseup";

			if( ev ){
				if( ev != evt ){
					namemove = 'touchmove';
					nameup = 'touchend';
				}
			} else {
				return;
			}

			if( this.getMethods( 'onBeforeDrawSelect' ) ){
				if( this.executeMethod( 'onBeforeDrawSelect', evt, this.$node ) == false ){
					return;
				}
			}

			var coor = this.get_coordinate( ev ),
			ctx = this._context;

			ctx.beginPath();

			ctx.moveTo( coor.x, coor.y );

			this._move = this.mousemove.bind( this );
			this._up = this.mouseup.bind( this );

			document.addEventListener( namemove, this._move, true );
			document.addEventListener( nameup, this._up, true );

			if( this.getMethods( 'onDrawSelect' ) ){
				this.executeMethod( 'onDrawSelect', evt, this.$node );
			}
			if( namemove == 'touchmove' ){
				evt.preventDefault();
			}
		},

		keydown : function( evt ){
			if( this.data.ltPropUndoRedo ){
				var keycode = evt.which || evt.keyCode,
				is_meta = evt.metaKey != void 0 ? evt.metaKey : evt.ctrlKey;

				if( keycode == 90 && is_meta ){
					if( evt.shiftKey ){
						this.redo( evt );
					} else {
						this.undo( evt );
					}
				}
			}
		}
	}
});

/**
 * @syntax nonYielded
 * <lyte-signature></lyte-signature>
 */
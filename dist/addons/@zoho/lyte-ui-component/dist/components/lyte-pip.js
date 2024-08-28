Lyte.Component.register( 'lyte-pip', {
_template:"<template tag-name=\"lyte-pip\"> <template is=\"if\" value=\"{{expHandlers(ltPropPipMode,'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\"><template case=\"true\"> <div class=\"lytePipPlaceholder\"> </div> </template></template> <lyte-wormhole lt-prop-append-on-creation=\"false\" lt-prop-append=\"{{expHandlers(ltPropPipMode,'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lytePipContainer\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropHeaderYield,'&amp;&amp;',ltPropPipMode),'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\"><template case=\"true\"> <div class=\"lytePipHeader\"> <lyte-yield yield-name=\"header\"></lyte-yield> </div> </template></template> <div class=\"lytePipVideoContainer\"> <lyte-yield yield-name=\"video\"></lyte-yield> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropFooterYield,'&amp;&amp;',ltPropPipMode),'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\"><template case=\"true\"> <div class=\"lytePipFooter\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </div> </template></template> </div> </template> </lyte-wormhole> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"insertYield","position":[1,3,1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["ltPropPipMode","ltPropHeaderYield","ltPropFooterYield","ltPropPipWindowWidth","ltPropPipWindowHeight","ltPropResizeMinWidth","ltPropResizeMaxWidth","ltPropResizeMinHeight","ltPropResizeMaxHeight","ltPropResize","ltPropDraggable","ltPropUseBrowserApi","actualVideoWidth","actualVideoHeight"],

	data: function() {
		return {
			'ltPropPipMode': Lyte.attr( 'boolean', { 'default': false } ),
			'ltPropHeaderYield': Lyte.attr( 'boolean', { 'default': false } ),
			'ltPropFooterYield': Lyte.attr( 'boolean', { 'default': false } ),
			'ltPropPipWindowWidth': Lyte.attr( 'string', { 'default': '320px' } ),
			'ltPropPipWindowHeight': Lyte.attr( 'string', { 'default': '180px' } ),

			'ltPropResizeMinWidth': Lyte.attr( 'number' ),
			'ltPropResizeMaxWidth': Lyte.attr( 'number' ),
			'ltPropResizeMinHeight': Lyte.attr( 'number' ),
			'ltPropResizeMaxHeight': Lyte.attr( 'number' ),

			'ltPropResize': Lyte.attr( 'boolean', { 'default': true } ),
			'ltPropDraggable': Lyte.attr( 'boolean', { 'default': true } ),

			'ltPropUseBrowserApi': Lyte.attr( 'boolean', { 'default': false } ),

			'actualVideoWidth': Lyte.attr( 'number'  ),
			'actualVideoHeight': Lyte.attr( 'number' )
		}	
	},

	didConnect: function() {
		this.wormhole = this.$node.querySelector( 'lyte-wormhole' );
	},

	didDestroy: function() {
		if( _lyteUiUtils.pictureInPictureElement === this.$node ) {
			_lyteUiUtils.pictureInPictureElement = null;
		}
	},

	pipObserver: function() {
		var shouldEnablePip = this.getData( 'ltPropPipMode' );

		if( shouldEnablePip ) {
			this.enablePip();
		}
		else {
			this.disablePip();
		}
	}.observes( 'ltPropPipMode' ),

	enablePip: function() {
		var useBrowser = this.useBrowser();

		if( useBrowser ) {
			this.useBrowserApi();
		}
		else {
			this.buildManually();
		}
	},

	useBrowserApi: function() {
		var video = this.getVideo();

		if( document.pictureInPictureElement ) {
			document.exitPictureInPicture();
		}

		video.addEventListener( 'leavepictureinpicture', this.resetPipFlag.bind( this ) );
		video.requestPictureInPicture();
	},

	resetPipFlag: function() {

		// User can leave pip mode without calling lt-prop-pip-mode false. In that case we need to set it to false
		this.data.ltPropPipMode = false;
	},

	buildManually: function() {
		var wormhole = this.wormhole;

		this.closeOtherPipWindows();
		this.setPipWindowWidth();
		wormhole.classList.add( 'lytePipEnabled' );
		this.addResize();
		this.addDraggable();

		_lyteUiUtils.pictureInPictureElement = this.$node;
	},

	closeOtherPipWindows: function() {
		var pictureInPictureElement = _lyteUiUtils.pictureInPictureElement;

		if( pictureInPictureElement && pictureInPictureElement !== this.$node ) {
			pictureInPictureElement.ltProp( 'pipMode', false );
		}
	},

	setPipWindowWidth: function() {
		var wormhole = this.wormhole,
		pipWidth = this.getData( 'ltPropPipWindowWidth' ),
		pipHeight = this.getData( 'ltPropPipWindowHeight' );

		wormhole.style.width = pipWidth;
		wormhole.style.height = pipHeight;
	},

	addResize: function() {
		if( !this.getData( 'ltPropResize' ) ) {
			return ;
		}

		var resizeConfig = this.buildResizeConfig();

		$L( this.wormhole ).enableResize( resizeConfig );
	},

	buildResizeConfig: function() {
		var config = {},
		minWidth = this.getData( 'ltPropResizeMinWidth' ),
		maxWidth = this.getData( 'ltPropResizeMaxWidth' ),
		minHeight = this.getData( 'ltPropResizeMinHeight' ),
		maxHeight = this.getData( 'ltPropResizeMaxHeight' );

		if( minWidth ) {
			config.minWidth = minWidth;
		}

		if( maxWidth ) {
			config.maxWidth = maxWidth;
		}

		if( minHeight ) {
			config.minHeight = minHeight;
		}

		if( maxHeight ) {
			config.maxHeight = maxHeight;
		}

		return config;
	},

	addDraggable: function() {
		if( !this.getData( 'ltPropDraggable' ) ) {
			return ;
		}

		$L( this.wormhole ).draggable( {
			onDragStart: this.dragStart.bind( this ),
			onStop: this.onStop.bind( this )
		} );
	},

	dragStart: function() {
		this.playing = this.isPlaying();
	},

	isPlaying: function() {
		var video = this.getVideo();

		return !!( video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2 );
	},

	onStop: function() {
		setTimeout( function() {
			var video = this.getVideo(),
			playingBeforeDrag = this.playing,
			playingAfterDrag = this.isPlaying();

			if( playingBeforeDrag && !playingAfterDrag ) {
				video.play();
			}
			else if( !playingBeforeDrag && playingAfterDrag ) {
				video.pause();
			}
		}.bind( this ), 0 );
	},

	disablePip: function() {
		var useBrowser = this.useBrowser();

		if( useBrowser ) {
			this.disableBrowserPip();
		}
		else {
			this.disableManualPip();
		}
	},

	disableBrowserPip: function() {
		if( document.pictureInPictureElement ) {
			document.exitPictureInPicture();
		}
	},

	disableManualPip: function() {
		var wormhole = this.wormhole;

		wormhole.classList.remove( 'lytePipEnabled' );
		wormhole.setAttribute( 'style', '' );
		this.setNormalWindowWidth();
		this.removeResize();
		this.removeDraggable();

		_lyteUiUtils.pictureInPictureElement = null;
	},

	setNormalWindowWidth: function() {
		var wormhole = this.wormhole;

		wormhole.style.width = '';
		wormhole.style.height = '';
	},

	removeResize: function() {
		if( !this.getData( 'ltPropResize' ) ) {
			return ;
		}

		$L( this.wormhole ).enableResize( 'destroy' );
	},

	removeDraggable: function() {
		if( !this.getData( 'ltPropDraggable' ) ) {
			return ;
		}

		$L( this.wormhole ).draggable( 'destroy' );
	},

	getVideo: function() {
		return this.wormhole.querySelector( 'video' );
	},

	getPipVideoContainer: function() {
		return this.$node.querySelector( '.lytePipVideoContainer' );
	},

	useBrowser: function() {
		return this.getData( 'ltPropUseBrowserApi' ) && document.pictureInPictureEnabled;
	}
} );
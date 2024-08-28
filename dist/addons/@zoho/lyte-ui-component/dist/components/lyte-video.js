Lyte.Component.register( "lyte-video", {
_template:"<template tag-name=\"lyte-video\"> <div tabindex=\"0\" class=\"lyteVideoContainer lyteVideoControlsShow\" onpointerenter=\"{{action('mouseEnter',event)}}\" onpointerleave=\"{{action('mouseLeave',event)}}\" onpointermove=\"{{action('mouseMove',event)}}\" __keydown=\"{{action('keyDown',event)}}\"> <div class=\"lyteVideoAnimateWrapper lyteVideoAnimateBackward\"> <span class=\"lyteVideoAnimateBackArrow lyteVideoAnimateArrow3\"></span> <span class=\"lyteVideoAnimateBackArrow lyteVideoAnimateArrow2\"></span> <span class=\"lyteVideoAnimateBackArrow lyteVideoAnimateArrow1\"></span> </div> <div class=\"lyteVideoAnimateWrapper lyteVideoAnimatePlay\"> <span class=\"lyteVideoAnimatePauseIcon\"></span> </div> <div class=\"lyteVideoAnimateWrapper lyteVideoAnimateForward\"> <span class=\"lyteVideoAnimateForwardArrow lyteVideoAnimateArrow1\"></span> <span class=\"lyteVideoAnimateForwardArrow lyteVideoAnimateArrow2\"></span> <span class=\"lyteVideoAnimateForwardArrow lyteVideoAnimateArrow3\"></span> </div> <template is=\"if\" value=\"{{expHandlers(renderPrefetch,'&amp;&amp;',expHandlers(prefetchLoading,'==',&quot;lyteVideoPrefetchLoading&quot;))}}\"><template case=\"true\"> <div class=\"lyteVideoPrefetchLoadingContainer\"> <div class=\"lyteCircleLoader\"> <span class=\"lyteCircleInnerLoader\"></span> </div> </div> </template></template> <canvas class=\"lyteVideoPoster {{if(renderPrefetch,'lyteVideoPosterBeforeVideoLoad')}}\" __click=\"{{action('clickOnVideo')}}\"></canvas> <template is=\"if\" value=\"{{renderPrefetch}}\"><template case=\"true\"> <div class=\"lyteVideoControls hoverControls lyteVideoPrefetchControlsContainer\"> <div class=\"lyteVideoProgressWrapper\"> <div class=\"lyteVideoProgressBar\"> <span class=\"lyteVideoProgressHandler\" style=\"left: 0;\"></span> </div> <div class=\"lyteVideoTimer\"> <time class=\"duration\">{{currentDuration}}</time> <span class=\"lyteVideoTimerSeparator\">/</span> <time>{{duration}}</time> </div> </div> <div class=\"lyteVideoIconsWrap\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.play,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoPlayPauseIconWrap\"> <button class=\"lyteVideoIcons lyteVideoPlayIcon lyteVideoPaused\" __click=\"{{action('prefetch',this)}}\"></button> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.backward,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoRewind\"> <button class=\"lyteVideoIcons lyteVideoRewindIcon\" lt-prop-title=\"Play the video to enable controls\"></button> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.forward,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoForward\"> <button class=\"lyteVideoIcons lyteVideoForwardIcon\" lt-prop-title=\"Play the video to enable controls\"></button> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.volume,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoVolumeControls\"> <span class=\"lyteVideoVolumeIcon\" __click=\"{{action('mute',this)}}\"></span> <div class=\"lyteVideoVolumeSlider\"> <lyte-multislider lt-prop-css-direction=\"ltr\" lt-prop-max=\"1\" lt-prop-yield=\"true\" lt-prop-handler=\"lyteCircle\" lt-prop-value=\"[ { &quot;value&quot; : {{volume}}, &quot;min&quot; : 0, &quot;max&quot; : 1 } ]\" on-change=\"{{method('setVolume')}}\"></lyte-multislider> </div> </div></template></template> <div class=\"lyteVideoRightIcons\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.settings,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoSettings\"> <button class=\"lyteVideoIcons lyteVideoSettingsIcon\" lt-prop-title=\"Play the video to enable controls\"></button> </div></template></template> <template is=\"if\" value=\"{{isNotFirefox}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.pip,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoPip\"> <button class=\"lyteVideoIcons lyteVideoPipIcon\" lt-prop-title=\"Play the video to enable controls\"></button> </div></template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.fullScreen,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoFullScreenControl\"> <button class=\"lyteVideoIcons lyteVideoFullScreen\" lt-prop-title=\"Play the video to enable controls\"></button> </div></template></template> </div> </div> </div> </template><template case=\"false\"> <video class=\"lyteVideo\" preload=\"{{ltPropPreLoad}}\" crossorigin=\"{{ltPropCrossOrigin}}\" __volumechange=\"{{action('changeVolume',event)}}\" __timeupdate=\"{{action('update',event)}}\" __loadeddata=\"{{action('progress',event)}}\" __progress=\"{{action('progress',event)}}\" __loadedmetadata=\"{{action('meta',event)}}\" __pause=\"{{action('pause',event)}}\" __play=\"{{action('play',event)}}\" __click=\"{{action('clickOnVideo')}}\" __dblclick=\"{{action('toggleFullScreen')}}\"> <source src=\"{{ltPropSource[0].src}}\" type=\"{{ltPropSource[0].type}}\" label=\"{{ltPropSource[0].label}}\" size=\"{{ltPropSource[0].size}}\"> <template is=\"if\" value=\"{{ltPropTracks}}\"><template case=\"true\"> <track> </template></template> </video> <template is=\"if\" value=\"{{subtitles}}\"><template case=\"true\"> <div class=\"lyteVideoSubtitleWrapper\"> <p class=\"lyteVideoSubtitle\">{{subText}}</p> </div> </template></template> <div class=\"lyteVideoControls hoverControls\"> <div class=\"lyteVideoProgressWrapper\"> <div class=\"lyteVideoProgressBar\" __click=\"{{action('progressClick',event)}}\" __mousemove=\"{{action('updateToolTip',event)}}\"> <div class=\"lyteVideoToolTip\"> <div> <p class=\"lyteVideoTooltipChapterName\">{{toolTip.name}}</p> <p class=\"lyteVideoTooltipCurrentTime\">{{toolTip.time}}</p> </div> </div> <template is=\"if\" value=\"{{chaptersData}}\"><template case=\"true\"> <div class=\"lyteVideoChapterWrapper\"> <template is=\"for\" items=\"{{chaptersData}}\" item=\"item\" index=\"index\"> <div class=\"lyteVideoChapter\" data-start=\"{{item.startTime}}\" data-end=\"{{item.endTime}}\" data-label=\"{{item.title}}\" style=\"width: {{item.width}}%;\"> <span class=\"lyteVideoProgressed\" style=\"width: {{item.time}}%;\"></span> <span class=\"lyteVideoProgressLoad\" style=\" width : {{item.loadedTime}}%\"></span> </div> </template> </div> </template><template case=\"false\"> <span class=\"lyteVideoProgressed\" style=\"width: {{elapsedTime}}%;\"></span> <span class=\"lyteVideoProgressLoad\" style=\" width : {{loadedTime}}%\"></span> </template></template> <span class=\"lyteVideoProgressHandler\" ontouchstart=\"{{action('progressMouseDown',event)}}\" style=\"left: 0;\" __mousedown=\"{{action('progressMouseDown',event)}}\"></span> </div> <div class=\"lyteVideoTimer\"> <time class=\"duration\">{{currentDuration}}</time> <span class=\"lyteVideoTimerSeparator\">/</span> <time>{{duration}}</time> </div> </div> <div class=\"lyteVideoIconsWrap\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.play,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoPlayPauseIconWrap\"> <button class=\"lyteVideoIcons lyteVideoPlayIcon lyteVideoPaused\" __click=\"{{action('togglePlayPause',this)}}\"></button> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.backward,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoRewind\"> <button class=\"lyteVideoIcons lyteVideoRewindIcon\" lt-prop-title=\"Backward\" __click=\"{{action('skipVideo','rewind')}}\"></button> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.forward,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoForward\"> <button class=\"lyteVideoIcons lyteVideoForwardIcon\" lt-prop-title=\"Forward\" __click=\"{{action('skipVideo','forward')}}\"></button> </div></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.volume,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoVolumeControls\"> <span class=\"lyteVideoVolumeIcon\" __click=\"{{action('mute',this)}}\"></span> <div class=\"lyteVideoVolumeSlider\"> <lyte-multislider lt-prop-css-direction=\"ltr\" lt-prop-max=\"1\" lt-prop-yield=\"true\" lt-prop-handler=\"lyteCircle\" lt-prop-value=\"[ { &quot;value&quot; : {{volume}}, &quot;min&quot; : 0, &quot;max&quot; : 1 } ]\" on-change=\"{{method('setVolume')}}\"></lyte-multislider> </div> </div></template></template> <div class=\"lyteVideoRightIcons\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.settings,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoSettings\"> <button class=\"lyteVideoIcons lyteVideoSettingsIcon\" lt-prop-title=\"Settings\" __click=\"{{action('toggleSettings',event)}}\"></button> </div></template></template> <template is=\"if\" value=\"{{isNotFirefox}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.pip,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoPip\"> <button class=\"lyteVideoIcons lyteVideoPipIcon\" lt-prop-title=\"Play Picture in Picture\" __click=\"{{action('togglePip')}}\"></button> </div></template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.fullScreen,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoFullScreenControl\"> <button class=\"lyteVideoIcons lyteVideoFullScreen\" lt-prop-title=\"Full Screen\" __click=\"{{action('toggleFullScreen',this)}}\"></button> </div></template></template> </div> </div> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropOptions.settings,'!=',false)}}\"><template case=\"true\"><div class=\"lyteVideoSettingsWrapper lyteVideoSettingsItemHover lyteVideoMenuHide\" __mouseover=\"{{action('mouseOver')}}\"> <template is=\"if\" value=\"{{subMenuOpened}}\"><template case=\"true\"> <div data-value=\"back\" class=\"lyteVideoSettingsDropdownHead\" __click=\"{{action('settingsMenuClick',this)}}\"> <div class=\"lyteVideoSettingsBackIcon\"></div> <span class=\"lyteVideoSettingsLabel\">{{selectedOption}} </span> </div> </template></template> <template is=\"switch\" value=\"{{selectedOption}}\"><template case=\"speed\"><template is=\"for\" items=\"{{speedData}}\" item=\"item\" index=\"index\"> <div data-value=\"{{item.label}}\" class=\"lyteVideoSettingDropItem lyteVideoPl-40 {{lyteUiSetSelectedClass(item.label,ltPropPlayRate)}}\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">{{item.label}} </span> </div> </template></template><template case=\"quality\"> <div data-value=\"auto\" class=\"lyteVideoSettingDropItem lyteVideoPl-40 {{lyteUiSetSelectedClass('auto',ltPropQuality)}}\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">auto</span> </div> <template is=\"for\" items=\"{{ltPropSource}}\" item=\"item\" index=\"index\"> <div data-value=\"{{item.size}}\" class=\"lyteVideoSettingDropItem lyteVideoPl-40 {{lyteUiSetSelectedClass(item.size,ltPropQuality)}}\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">{{item.size}} </span> </div> </template></template><template case=\"captions\"> <div data-value=\"off\" class=\"lyteVideoSettingDropItem lyteVideoPl-40 {{lyteUiSetSelectedClass('off',ltPropCaption)}}\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">off</span> </div> <template is=\"for\" items=\"{{ltPropTracks}}\" item=\"item\" index=\"index\"> <div data-value=\"{{item.label}}\" class=\"lyteVideoSettingDropItem lyteVideoPl-40 {{lyteUiSetSelectedClass(item.label,ltPropCaption)}}\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">{{item.label}} </span> </div> </template></template><template default=\"\"> <div data-value=\"Subtitles/CC\" class=\"lyteVideoSettingsItem \" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">Subtitles/CC </span> <span class=\"lyteVideoSettingsKey\">{{ltPropCaption}}</span> </div> <div data-value=\"Playback Speed\" class=\"lyteVideoSettingsItem\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">Playback Speed </span> <span class=\"lyteVideoSettingsKey\">{{ltPropPlayRate}}</span> </div> <div data-value=\"Quality\" class=\"lyteVideoSettingsItem\" __click=\"{{action('settingsMenuClick',this)}}\"> <span class=\"lyteVideoSettingsLabel\">Quality </span> <span class=\"lyteVideoSettingsKey\">{{ltPropQuality}}</span> </div> </template></template> </div></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"attr","position":[1,11]},{"type":"if","position":[1,11],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,3,1,0]},{"type":"text","position":[1,1,3,5,0]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"if","position":[1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,3,1]},{"type":"componentDynamic","position":[0,3,1]}]}},"default":{}},{"type":"attr","position":[1,3,9,1]},{"type":"if","position":[1,3,9,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,9,3]},{"type":"if","position":[1,3,9,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,9,5]},{"type":"if","position":[1,3,9,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[5,1,1]},{"type":"text","position":[5,1,1,1,1,1,0]},{"type":"text","position":[5,1,1,1,1,3,0]},{"type":"attr","position":[5,1,1,3]},{"type":"if","position":[5,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","item.width","'%;'"]}}}},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","item.time","'%;'"]}}}},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["' width : '","item.loadedTime","'%'"]}}}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","elapsedTime","'%;'"]}}}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["' width : '","loadedTime","'%'"]}}}}]}},"default":{}},{"type":"attr","position":[5,1,1,5]},{"type":"text","position":[5,1,3,1,0]},{"type":"text","position":[5,1,3,5,0]},{"type":"attr","position":[5,3,1]},{"type":"if","position":[5,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[5,3,3]},{"type":"if","position":[5,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[5,3,5]},{"type":"if","position":[5,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[5,3,7]},{"type":"if","position":[5,3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,3,1]},{"type":"componentDynamic","position":[0,3,1]}]}},"default":{}},{"type":"attr","position":[5,3,9,1]},{"type":"if","position":[5,3,9,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[5,3,9,3]},{"type":"if","position":[5,3,9,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,3,9,5]},{"type":"if","position":[5,3,9,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"switch","position":[0,3],"cases":{"speed":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}]},"quality":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}]},"captions":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}]}},"default":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[3]},{"type":"text","position":[3,3,0]},{"type":"attr","position":[5]},{"type":"text","position":[5,3,0]}]}}]}},"default":{}}],
_observedAttributes :["ltPropSource","ltPropTracks","ltPropVolume","ltPropMuted","ltPropPlayRate","ltPropCrossOrigin","ltPropCurrentTime","ltPropChapters","ltPropWidth","ltPropHeight","ltPropLoop","ltPropPreLoad","ltPropAutoPlay","ltPropPoster","ltPropCaption","ltPropQuality","ltPropOptions","ltPropPrefetch","ltPropPrefetchOptions","isNotFirefox","volume","selectedOption","elapsedTime","loadedTime","toolTip","currentDuration","duration","subMenuOpened","speedData","captionsData","qualityData","chaptersData","subtitles","subText","selectedSource","renderPrefetch","prefetchLoading","metaSetted","durationSec"],

	data : function(){
		return{
			ltPropSource : Lyte.attr( 'array' ),
			ltPropTracks : Lyte.attr( 'array' ),
			ltPropVolume : Lyte.attr( 'number', { default : 1 }),
            ltPropMuted : Lyte.attr( 'boolean' ),
			ltPropPlayRate : Lyte.attr( 'number', { default : 1 }),
			ltPropCrossOrigin : Lyte.attr('string', { default : ''}),
			ltPropCurrentTime : Lyte.attr( 'number' ),
			ltPropChapters : Lyte.attr( 'array' ),
			ltPropWidth : Lyte.attr( 'string',{ default : '900px'} ),
			ltPropHeight : Lyte.attr( 'string',{ default : '500px'} ),
			ltPropLoop : Lyte.attr( 'boolean'),
            ltPropPreLoad : Lyte.attr( 'string', { default : 'metadata'} ),
            ltPropAutoPlay : Lyte.attr( 'boolean' ),
            ltPropPoster : Lyte.attr( 'string' ),
            ltPropCaption : Lyte.attr( 'string', { default : 'off'} ),
            ltPropQuality : Lyte.attr( 'string' , { default : 'auto'} ),
            ltPropOptions : Lyte.attr( 'object', { default : {}}),
            ltPropPrefetch :  Lyte.attr( 'boolean', { default : false } ),
            ltPropPrefetchOptions : Lyte.attr( 'object', { default : {
                method:'GET',
                mode:'cors'
            } 
        }),
            
			//system data
            isNotFirefox : Lyte.attr( 'boolean', { default :  
                _lyteUiUtils.getBrowser() != "firefox" } ),
			volume :  Lyte.attr( 'number'),
			selectedOption : Lyte.attr( 'string', { default : 'settings'}),
			elapsedTime : Lyte.attr( 'number', { default : 0}),
			loadedTime : Lyte.attr( 'number', { default : 0}),
			toolTip : Lyte.attr( 'object', { default : { 'name' : '', 'time' : '00:00' }}),
			currentDuration : Lyte.attr( 'string', { default : '00:00'}),
			duration : Lyte.attr( 'string', { default : '00:00'}),
			subMenuOpened : Lyte.attr( 'boolean', { default : false }),
			speedData : Lyte.attr( 'array', { default : [
				{ "label" : "0.25" },
				{ "label" : "0.5" },
				{ "label" : "1" },
				{ "label" : "1.25" },
				{ "label" : "1.5" },
				{ "label" : "1.75" },
				{ "label" : "2" }
			]}),
			captionsData : Lyte.attr( 'array', { default : [
				{ "label" : "off"}
			]}),
			qualityData : Lyte.attr( 'array', { default : [
				{ "label" : "auto" }
			]}),
			chaptersData : Lyte.attr( 'array' ),
            subtitles : Lyte.attr( 'array'),
            subText : Lyte.attr( 'string', { default : ''}),
            selectedSource :  Lyte.attr( 'number', { default : 0 } ),
            renderPrefetch : Lyte.attr( 'boolean', { default : false } ),
			prefetchLoading : Lyte.attr( 'string', { default : '' } ),
            metaSetted : Lyte.attr( 'boolean', { default : false } ),
            durationSec : Lyte.attr( 'number', { default : 0 })
		}
	},

	init : function(){
		this.setData('volume',this.getData('ltPropVolume'));
	},

	didConnect : function(){
        this.drawImage( undefined, 'black' );
        if( !this.data.ltPropPrefetch ){
            this.setGlobals();
        }else{
            this.setData( "renderPrefetch", true );
        }

		this._timerIdx;
		this._menuIdx = 0;
        this._focused = false;
        this._subIdx = 0;

		this.$node.screenShot = this.screenShot.bind( this );
        this.$node.play = this.play.bind( this );
        this.$node.pause = this.pause.bind( this );
	},

    setGlobals : function(){
        this._video = this.$node.querySelector( "video" );
		this._animationWrapper = this.$node.querySelectorAll('.lyteVideoAnimateWrapper');
		this._controls = this.$node.querySelector('.lyteVideoControls');
		this._menu = this.$node.querySelector('.lyteVideoSettingsWrapper');
		this._handler = this.$node.querySelector('.lyteVideoProgressHandler');
		this._playIcon = this.$node.querySelector('.lyteVideoPlayIcon');
        if( this._menu ){
            this._menu.style.right = "70px";
        }
    },

	didDestroy : function(){
		// document.body.removeEventListener('keydown', this._keyDown);
		if( this.__preloaded ){
			var src = this.data.ltPropSource;
            for( var i = 0;i < src.length; i++ ){
                URL.revokeObjectURL( src[ i ].src );
            }
		}
		delete this._video;
		delete this._playIcon;
		delete this._handler;
		delete this._controls;
		delete this._menu;
		delete this._progressBar;
		delete this._menuListener;
		// delete this._keyDown;
        delete this._focused;
        delete this._menuIdx;
	},

    formatTime : function( timeInSeconds ){
        if( timeInSeconds ){
		    var result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
            time = result.substr( 0, 2) != '00' ? result.substr( 0, 2) + ':' + result.substr(3, 2) + ':' + result.substr(6, 2) : result.substr(3, 2) + ':' + result.substr(6, 2);
            return time;
        }else{
            return "00:00";
        }
	},

    convertToSeconds : function( time ){
        var sec = 0;
        sec = parseInt( time.substr( 0, 2) * 3600 ) + parseInt( time.substr( 3, 2) * 60 ) + parseInt( time.substr( 6, 2) );

        return sec; 
    },

    screenShot : function(){
        var that = this,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        video = this._video;

        ctx.canvas.width = video.videoWidth;
        ctx.canvas.height = video.videoHeight;

        createImageBitmap(video).then(function(frame) {
            ctx.drawImage(frame, 0, 0);
        }).then(  function(){
            var url =  canvas.toDataURL();
            that.getMethods('onScreenShot') && that.executeMethod( 'onScreenShot', url, that.$node); 
        });
    },
    classHandler : function( node, action, className ){
        if( node ){
            node.classList[ action ]( className );
        }
    },
    setDefault : function(){
        var video = this._video,
        tracks = video.textTracks,
        playbackRate = this.getData('ltPropPlayRate'),
        startTime = this.getData( 'ltPropCurrentTime'),
        loop = this.getData( 'ltPropLoop' ),
        autoPlay = this.getData( 'ltPropAutoPlay'),
        chapters = this.getData( 'ltPropChapters'),
        poster = this.getData( 'ltPropPoster' ),
        sources = this.getData( 'ltPropSource' ),
        prefetch = this.getData( 'ltPropPrefetch'),
        muted = this.getData( 'ltPropMuted' );
        flag = sources[ 0 ].src.includes( "blob:" )

        video.onended = function(){
            this.getMethods('onEnded') && this.executeMethod( 'onEnded', this.$node ); 
        }.bind( this );

        if( muted ){
            this._video.muted = true;
        }
        if( !navigator.maxTouchPoints ){
            var tooltip = this.$node.querySelector(".lyteVideoToolTip");
            this.classHandler( tooltip, "add", "lyteVideoToolTipHover" );
        }
        if( poster ){;
            if( !isNaN( poster ) ){
                this.drawImage( poster, true );
            }else{
                this.getImage( poster )
            }
        }else{
            this.drawImage( poster, 'black' );
        }
        
        
        if( prefetch && !flag ){
            this.setData( "renderPrefetch", true );
            // this.prefetch();
            return;
        }

        if( startTime ){
            video.currentTime = startTime;
        }

        if( autoPlay ){
            video.setAttribute( 'autoplay', '');
        }

        if( playbackRate ){
            video.playbackRate = playbackRate;
        }


        if( loop ){
            video.setAttribute( 'loop', '');
        }

        if( chapters ){
            chaptersData = [],
            totalLoadedTime = video.buffered.length ? video.buffered.end( video.buffered.length - 1 ) : 0;

            for( i = 0; i < chapters.length; i++){
                var width = ( ( this.convertToSeconds( chapters[ i ].endTime ) - this.convertToSeconds( chapters[ i ].startTime )  ) / video.duration * 100 ).toFixed(2),
                loadedTime;

                if( totalLoadedTime > chapters[ i ].endTime ){
                    loadedTime = 100;
                }else if( totalLoadedTime <  chapters[ i ].startTime ){
                    loadedTime = 0;
                }
                else{  
                    loadedTime =  ( totalLoadedTime - chapters[i].startTime ) / (chapters[i].endTime - chapters[i].startTime )* 100;
                    loadedTime = loadedTime > 100 ? 100 : loadedTime;                       
                }

                chaptersData.push( { title :  chapters[ i ].title, startTime : this.convertToSeconds( chapters[ i ].startTime ) , endTime : this.convertToSeconds( chapters[ i ].endTime ), width : width, time : 0, loadedTime : loadedTime } )    
            }
            if( chaptersData.length > 0 ){
                this.classHandler( this.$node.querySelector(".lyteVideoProgressBar"), "add", "lyteVideoBgTransparent" );
            }
            this.setData('chaptersData',chaptersData)
        }
        
        if( this._menu ){
            this._menu.style.right = "70px";
        }
        this.setData( "ltPropCurrentTime", -1 );
    },

    playBackRate : function( change ){
        var video = this._video;

        video.playbackRate = change.newValue;
    }.observes( 'ltPropPlayRate' ),

    qualityChange :  function( change ){
        if( !this._video ){
            return;
        }
        var video = this._video,
        source = video.querySelector('source'),
        curTime = video.currentTime,
        isPaused = video.paused,
        sources = this.data.ltPropSource,
        newValue = change ? change.newValue : this.data.ltPropQuality,
        i;

        if( newValue == "auto" ){
            return
        }
        for( i = 0; i < sources.length; i++){
            if( sources[i].size == newValue ){
                break;
            }
        }
        this.setData( "selectedSource", i );
        if( this.data.ltPropPrefetch && !sources[ i ].src.includes( "blob:" ) ){
            this.drawImage( undefined, 'black' );
            this.setData( "renderPrefetch", true );
            this._curTime = curTime;
            this._isPaused = isPaused;
            this.__preloaded = false;
            this.prefetch();
            return;

        }
        for( attr in sources[i] ){
            source.setAttribute(attr, sources[i][attr] );
        }

        video.load();

        var fn = function(){ 
            video.currentTime = curTime;
            if( isPaused ){
                this.pause();
            }else{
                this.play();
            }
            video.removeEventListener('canplay',fn);
        }.bind(this);

        video.addEventListener('canplay', fn );

    }.observes( 'ltPropQuality' ).on( 'didConnect' ),

    setSubtitle : function( change ){
        if( !this._video ){
            return;
        }
        var video = this._video,
        tracks = this.data.ltPropTracks,
        source = video.querySelector('track'),
        capDiv = this.$node.querySelector( '.lyteVideoSubtitleWrapper'),
        subtitles = [],
        newValue = change ? change.newValue : this.data.ltPropCaption,
        track, i;
        
        if( newValue == 'off' && capDiv){
            this.classHandler( capDiv, "add", "lyteVideoMenuHide" );
            return;
        }else if( newValue == 'off'){
            return;
        }
        else if( capDiv ){
            this.classHandler( capDiv, "remove", "lyteVideoMenuHide" );
        }

        for( i = 0; i < tracks.length; i++){
            if( tracks[i].label == newValue  || tracks[i].lang == newValue){
                break;
            }
        }
        
        for( attr in tracks[i] ){
            source.setAttribute( attr, tracks[i][ attr ]);
        }
        track = video.textTracks[ 0 ];
        track.mode = "hidden";
        
        if(  tracks && !('src' in tracks[ i ] ) ){
            subtitles = tracks [ i ].texts.slice();
            this.setData( 'subtitles', subtitles );
            return;
        }
        setTimeout( function(){
            for( j = 0; j < track.cues.length;j++){
                subtitles.push({ 'startTime' : track.cues[ j ].startTime, 'endTime' : track.cues[ j ].endTime, 'text' : track.cues[ j ].text } )
            }
            this.setData( 'subtitles', subtitles );
        }.bind( this ),500);
        
    }.observes( 'ltPropCaption' ).on( 'didConnect' ),

    setVolume : function( change ){
        if( this._video == undefined){
            return
        }
        var video = this._video,
        slider = this.$node.querySelector('lyte-multislider');
        if( slider.ltProp('value')[0].value != change.newValue ){
            this.setData('volume',change.newValue );
        }
        if( this.data.renderPrefetch ){
            this._volume = change.newValue;
        }else{
            video.volume = change.newValue;
        }
    }.observes( 'ltPropVolume' ),

    loop : function( change ){
        var video = this._video;
        if( change.newValue ){
            video.setAttribute('loop','');
        }else{
            video.removeAttribute( 'loop' );
        }
    }.observes( 'ltPropLoop'),

    source : function( change ){
        this.getGlobals();
        var video = this._video,
        isPaused = video.paused;
        this.setData( "selectedSource", 0 );
        video.load();
        var fn = function(){ 
            if( isPaused ){
                this.pause();
            }else{
                this.play();
            }
            video.removeEventListener('canplay',fn);
        }.bind(this);

        video.addEventListener('canplay', fn );
    }.observes( 'ltPropSource'),

    time : function( change ){
        var video = this._video;
        if( change.newValue != -1 ){
            video.currentTime = change.newValue;
            this.setData( "ltPropCurrentTime", -1 );
        }
    }.observes( 'ltPropCurrentTime'),

    autoPlay : function( change ){
        var video = this._video;

        if( change.newValue ){
            video.setAttribute( 'autoplay', '');
        }else{
            video.removeAttribute( 'autoplay');
        }
    }.observes( 'ltPropAutoPlay'),

    menuListener : function( evt, fl ){
        if( !this._menu ){
            return
        }
        var flag = true,
        classList = ['lyteVideoSettingsWrapper', 'lyteVideoSettingsItem','lyteVideoSettingsIcon', 'lyteVideoSettingsLabel','lyteVideoSettingsKey','lyteVideoSettings', 'lyteVideoSettingsDropdownHead', 'lyteVideoSettingsBackIcon' ],
        menu = this._menu;

        if( evt ){
            for( i = 0; i < classList.length; i++){
                if( evt.target.classList.contains( classList[ i ] )){
                    flag = false;
                }
            }
        }
        if( flag  || fl ) {
            this.classHandler( menu, "add", "lyteVideoMenuHide" );
            this.classHandler( menu, "add", "lyteVideoSettingsItemHover" );
            menu.style = ''
            // menu.style.bottom = '70px';
            menu.style.right = "70px";
            this.setData({'subMenuOpened' : false, 'selectedOption' : 'settings'});
            this._menuIdx = 0;
            document.removeEventListener('scroll',this._onScroll);
            document.removeEventListener('click', this._menuListener);
            window.removeEventListener('resize',this._onResize);
            delete this._menuListener, this._onScroll, this._onResize;
        }
    },

    onScroll : function( evt ){
        if( this._menu ){
            return;
        }
        var menu = this._menu,
        bcr = menu.getBoundingClientRect();
        if( bcr.top < 0){
            menu.style.bottom = null;
            menu.style.top = this.$node.clientHeight + 'px';
        }else if(bcr.top - 70 > bcr.height ){
            menu.style.bottom = '70px';
            menu.style.top = null;
        }
    },

    onResize : function(){
        this.onScroll();
    },

    left : function(){
        return _lyteUiUtils.getRTL() ? "right" : "left";
    },

    bind_evt : function( fn, isTch ){
        document[ fn ]( isTch ? 'touchmove' : 'mousemove', this._move, true );
        document[ fn ]( isTch ? 'touchend' : 'mouseup', this._up, true );
    },

    updateTime : function( evt, flag){

        var ele = this.$node.querySelector(".lyteVideoProgressBar"),
        video = this._video,
        bcr = ele.getBoundingClientRect(),
        width = bcr.width,
        x = Math.abs( evt.clientX - bcr.left ),
		duration = this.data.durationSec,//video.duration,
        time = ( x / width ) * duration,
        hanlder = this._handler;
        
        if( flag || this.data.renderPrefetch ){
            return time;
        }


        video.currentTime = time;
        
        if( this._mouseDown ){
           var left = ( time / duration * 100) ;
           left = left > 100 ? 100 : left ;
           hanlder.style.left = left + '%';
        }

    },

    progressMouseMove : function( evt ){
        var touches = evt.touches || [],
		length = touches.length,
		ev = touches[ 0 ] || evt;

		if( length > 1 ){
			return;
		}
        
        if( length ){
            evt.preventDefault();
        }

        var time  = this.updateTime( ev );
        if( this.data.renderPrefetch ){
            this._isPaused = true;
            this._time = time;
            this.prefetch();
        }
    },

    progressMouseUp : function( evt ){
        var isTch = evt.touches ? true : false;

        this.bind_evt( 'removeEventListener', isTch );
        if( this._paused ){
            this.play();
        }

        delete this._move;
		delete this._up;
        delete this._paused;
        delete this._mouseDown;
    },

    play : function(){
        if( this._video == undefined){
            return
        }

        var video = this._video,
        _this = this,
        fn = function(){
            delete _this._happening;
            var final = _this._final;

            if( final ){
                delete _this._final;
                _this[ final ]();
            }
        },
        poster = this.$node.querySelector('.lyteVideoPoster');
        this.classHandler( poster, "add", "lyteVideoPosterHide" );

        if( this._happening ){
            this._final = 'play';
        }else if( video.paused ){
            this._happening = true;
            video.play().then( fn ).catch( fn );
        }
    },

    pause : function(){
        if( this._video == undefined){
            return
        }
        var video = this._video;

        if( this._happening ){
			this._final = 'pause';
		} else {
			video.pause();
		}
    },

    getImage : function( url ){
        var img = new Image(),
        canvas = this.$node.querySelector( '.lyteVideoPoster' ),
        ctx = canvas.getContext( "2d" ),
        video = this._video;
        
        ctx.canvas.width = video.videoWidth;
        ctx.canvas.height = video.videoHeight;
        
        img.onload = function( ){
            ctx.drawImage( img , 0, 0, video.videoWidth, video.videoHeight)
        }

        img.src = url;
    },

    drawImage : function( time, fl ){
        var that = this,
        canvas =  fl ? this.$node.querySelector( '.lyteVideoPoster' ) : '',
        ctx = canvas.getContext( '2d' );
        
        if( fl == "black" ){
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return;
        }
        var video = this._video ?  this._video.cloneNode( true ) : '';
        video.currentTime = time;

        video.oncanplaythrough =  function(){
            ctx.canvas.width = video.videoWidth;
            ctx.canvas.height = video.videoHeight;


            createImageBitmap(video).then(function(frame) {
                ctx.drawImage(frame, 0, 0, video.videoWidth, video.videoHeight );
            }).catch( function( error ){
                // console.log( error );
            });
        }
    },

    prefetch : function(){
		var __fetch = window.fetch,
		__this = this,
		__data = __this.data,
		ns = 'prefetchLoading',
		__ns = 'lyteVideoPrefetch',
		renderPrefetch = 'renderPrefetch',
		__error = function( err ){
			__this.setData( ns, __ns + "Error" );

			var cb = "onPrefetchError";
			
			if( __this.getMethods( cb ) && __this.executeMethod( cb, err, __this.$node ) == false ){
				return;
			}

			if( /Access\-Control\-Allow\-Origin/i.test( err.message || "" ) ){
				this.setData( renderPrefetch, false );
			}

		},
		src = __data.ltPropSource[ __data.selectedSource ] || {};

		if( __this.__preloaded ){
			return;
		}

		if( __fetch ){

			var cb = "onBeforePrefetch";

			if( __this.getMethods( cb ) && __this.executeMethod( cb, __this.$node ) == false ){
				return;
			}

			__this.setData( ns, __ns + 'Loading' );
            var poster = __this.$node.querySelector('.lyteVideoPoster');
            __this.classHandler( poster, "remove", "lyteVideoPosterHide");
			__fetch( src.src || "", __data.ltPropPrefetchOptions ).then( function( res ){
				if( /^2..$/.test( res.status ) ){
					return res.blob();
				} else {
					__error( {} );
				}
			}).then( function( blob ){
				
				__this.setData( ns, __ns + 'Success' );

				var __url = URL.createObjectURL( blob ),
				cb = "onPrefetchSuccess";
				
				Lyte.objectUtils( src, 'add', 'src', __url );
				__this.getMethods( cb ) && __this.executeMethod( cb, __url, __this.$node );
				__this.setData( renderPrefetch, !( __this.__preloaded = true ) );
                __this.setGlobals();
			}).then( function(){

                if( !__this._isPaused ){
                    __this.play();
                }
                if( __this._time ){
                    __this.classHandler( __this.$node.querySelector('.lyteVideoPoster'), "add", "lyteVideoPosterHide");
                    __this._video.currentTime = __this._time;
                }
                if( __this._curTime ){
                    __this._video.currentTime = __this._curTime;
                    __this.classHandler( __this.$node.querySelector('.lyteVideoPoster'), "add", "lyteVideoPosterHide")
                }
                if( __this._volume ){
                    __this._video.volume = __this._volume;
                    __this.setData('volume',__this._volume );
                }
                if( __this._muted ){
                    __this._video.muted = __this._muted;
                }
                delete __this._isPaused;
                delete __this._time;
                delete __this._curTime;
                delete __this._volume;
                delete __this._muted;
            }).catch( __error );
		}
	},

    handlePreVolume : function( currentValue ){
        var volIcon = this.$node.querySelector(".lyteVideoVolumeIcon");
        if( currentValue == "mute" ){
            this._muted = !this._muted;
            this._volume = this._volume == undefined ? 1 : this._volume; 
            if( this._muted ){
                this.classHandler( volIcon, "add", "lyteVideoMuted" );
                this.setData('volume', 0);
            }else{
                this.classHandler( volIcon, "remove", "lyteVideoMuted" );
                this.setData('volume', this._volume );
            }
            return;
        }
        if( this.data.renderPrefetch ){
            this._volume = currentValue.value;
            if( currentValue.value == 0 ){
                this.classHandler( volIcon, "add", "lyteVideoMuted" );
            }else if( currentValue.value < 0.5) {
                this.classHandler( volIcon, "remove", "lyteVideoMuted" );
                this.classHandler( volIcon, "add", "lyteVideoLow" );
            }else{
                this.classHandler( volIcon, "remove", "lyteVideoLow" );
            }
        }
    },

    actions : {
        keyDown : function( evt ){
            if( !this._video ){
                return
            }
            var video = this._video,
            wrapperEle,
            i = 0;
            if( this._focused ){  
                switch( evt.keyCode ){
                    case 32 : 
                        evt.preventDefault();
                        if( this.data.renderPrefetch ){
                            this.prefetch();
                            return;
                        }
                        wrapperEle = this._animationWrapper[1];
                        iconEle = wrapperEle.children[0];
                        if( video.paused ){
                            this.classHandler( iconEle, "remove", "lyteVideoAnimatePauseIcon" );
                            this.classHandler( iconEle, "add", "lyteVideoAnimatePlayIcon" );
                            this.play();
                        }else{
                            this.classHandler( iconEle, "add", "lyteVideoAnimatePauseIcon" );
                            this.classHandler( iconEle, "remove", "lyteVideoAnimatePlayIcon" );
                            this.pause();
                        }
                        break;
                    case 39 :
                        evt.preventDefault();
                        wrapperEle = this._animationWrapper[2];
                        video.currentTime += 10;
                        break;
                    case 37 :
                        evt.preventDefault();
                        wrapperEle = this._animationWrapper[0];
                        video.currentTime -= 10;
                        break;
                    case 38 :
                        var menu = this._menu;
                        if( menu && !menu.classList.contains('lyteVideoMenuHide')){
                            this.classHandler( menu, "remove", "lyteVideoSettingsItemHover" );
                            evt.preventDefault();
                            var options = menu.children;
                            this._menuIdx = this._menuIdx == 0 ? options.length  : this._menuIdx;
                            
                            prev =  Math.abs( this._menuIdx % options.length ),
                            idx =  Math.abs( --this._menuIdx % options.length );
    
                            this.classHandler( options[ prev ], "remove", lyteVideoSettingsItemSelected );
                            menu.scrollTop =  options[ idx ].offsetTop;
                            this.classHandler( options[ idx ], "add", lyteVideoSettingsItemSelected );
                        }
                        break;
                    case 40 :
                        var menu = this._menu;
                        if( menu && !menu.classList.contains('lyteVideoMenuHide')){
                            evt.preventDefault();
                            this.classHandler( menu, "remove", "lyteVideoSettingsItemHover" );
                            var options = menu.children,
                            prev = Math.abs( this._menuIdx % options.length ),
                            idx = Math.abs( ++this._menuIdx % options.length );
    
                            this.classHandler( options[ prev ], "remove", lyteVideoSettingsItemSelected );
                            menu.scrollTop =  options[ idx ].offsetTop;
                            // options[ idx ].scrollIntoView({ block: 'nearest'});
                            this.classHandler( options[ idx ], "add", lyteVideoSettingsItemSelected );
    
                        }
                        break;
                    case 13 :
                        var menu = this._menu;
                        if( menu && !menu.classList.contains('lyteVideoMenuHide')){
                            // evt.preventDefault();
                            var options = menu.children,
                            idx = Math.abs( this._menuIdx % options.length );
                            
                            options[ idx ].click();
                        }
                        evt.preventDefault();
                        break;
                }
                if( wrapperEle ){
                    wrapperEle.classList.add('lyteVideoAnimate');
                    setTimeout( function(){ wrapperEle.classList.remove('lyteVideoAnimate')}.bind(this),500);
                }
            }
        },
        play : function( evt ){
            this.classHandler( this._playIcon, "remove", "lyteVideoPaused" );
            this.getMethods('onPlay') && this.executeMethod( 'onPlay', this._video, evt, this.$node);
        },

        pause : function( evt ){
            this.classHandler( this._playIcon, "add", "lyteVideoPaused" );
            this.getMethods('onPause') && this.executeMethod( 'onPause', this._video, evt, this.$node);
        },

        togglePlayPause : function( ){
            var video = this._video,
            fn = "pause";

            if( video.paused ){
                fn = "play"
            }

            this[ fn ]();
            
        },

        prefetch : function(){
            if( this.data.ltPropPrefetch ){
                this.setData( "renderPrefetch", true );
                this.prefetch();
            }
        },

        clickOnVideo : function(){
            if( this.data.renderPrefetch ){
                this.prefetch();
                return;
            }
            
            var video = this._video,
            iconEle = this._animationWrapper[1].children[0];
            if( document.pictureInPictureElement == video){
                document.exitPictureInPicture();
            }else if( video.paused ){
                this.classHandler( iconEle, "remove", "lyteVideoAnimatePauseIcon" );
                this.classHandler( iconEle, "add", "lyteVideoAnimatePlayIcon" );
                this.play();
            }else{
                this.classHandler( iconEle, "add", "lyteVideoAnimatePauseIcon" );
                this.classHandler( iconEle, "remove", "lyteVideoAnimatePlayIcon" );
                this.pause();
            }
            this.classHandler( this._animationWrapper[ 1 ], "add", "lyteVideoAnimate" );
            setTimeout( function(){ this.classHandler( this._animationWrapper[ 1 ], "remove", "lyteVideoAnimate" );}.bind(this),500);
        },

        skipVideo : function( type ){
            var video = this._video,
            currrentTime = video.currentTime;

            video.currentTime = currrentTime + ( type == 'forward' ? 10 : -10 );
        },

        mute : function(){
            var video = this._video;
            if( this.data.renderPrefetch ){
                this.handlePreVolume( "mute" );
                return;
            }
            video.muted = !video.muted;
        },

        changeVolume : function(){
            if( this._video == undefined){
                return
            }
            var video = this._video,
            volIcon = this.$node.querySelector(".lyteVideoVolumeIcon");

            if(video.volume < 0.5) {
                this.classHandler( volIcon, "add", "lyteVideoLow" );
            }else{
                this.classHandler( volIcon, "remove", "lyteVideoLow" );
            }

            if( video.volume > 0 && volIcon && volIcon.classList.contains('lyteVideoMuted')){
                this.classHandler( volIcon, "remove", "lyteVideoMuted" );
                video.muted = false;
                this.setData("volume", video.volume);
            }else if( !video.muted && video.volume == 0){
                this.setData({"volume" : 1, 'ltPropVolume' : 1});
            }else if( video.muted ){
                this.classHandler( volIcon, "add", "lyteVideoMuted" );
                this.classHandler( volIcon, "remove", "lyteVideoLow" );
                this.setData('volume', 0);
            }
        },

        update : function( evt ){
            if( this._video == undefined){
                return
            }
            var video = this._video,
            time = video.currentTime,
            duration = video.duration,
            chaptersData = this.getData( 'chaptersData' ),
            subtitles = this.getData( 'subtitles' ),
            subEle = this.$node.querySelector( '.lyteVideoSubtitle'),
            curTime;
            
            
            if( subtitles ){
                for( i = 0; i < subtitles.length; i++){
                    if( time >= subtitles[ i ].startTime && time <= subtitles[ i ].endTime && subEle.innerHTML == ''){
                        this.setData('subText', subtitles[ i ].text);
                        this._subIdx = i;
                    }
                }
                if( time <= subtitles[ this._subIdx ].startTime  || time >= subtitles[ this._subIdx ].endTime) {
                    this.setData('subText', '');
                }
            }

            

            if( subtitles ){
                for( i = 0; i < subtitles.length; i++){
                    if( time >= subtitles[ i ].startTime && time <= subtitles[ i ].endTime && subEle.innerHTML == ''){
                        this.setData('subText', subtitles[ i ].text);
                        this._subIdx = i;
                    }
                }
                if( time <= subtitles[ this._subIdx ].startTime  || time >= subtitles[ this._subIdx ].endTime) {
                    this.setData('subText', '');
                }
            }

            if( chaptersData ){
                for( i = 0; i < chaptersData.length; i++){
                    if( time > chaptersData[i].endTime){
                        curTime = 100;
                    }else if( time <  chaptersData[i].startTime ){
                        curTime = 0;
                    }
                    else{  
                        curTime =  ( time - chaptersData[i].startTime) / (chaptersData[i].endTime - chaptersData[i].startTime )* 100;

                        curTime = curTime > 100 ? 100 : curTime;
                        this._curChapter = chaptersData[i].title;
                    }     
                    Lyte.objectUtils( chaptersData[i] , "add" , "time", curTime );
                }
            }
            
            this.setData( { 'currentDuration' : this.formatTime( time ), 'elapsedTime' : ( time / duration * 100) });
            // if( this._mouseDown == undefined){
                this._handler.style.left = ( time / duration * 100) + '%';
                // this.setData('elapsedTime', ( time / duration * 100));
                // }

            this.getMethods('onProgress') && this.executeMethod( 'onProgress', this._video, time, evt, this.$node);               
        },

        meta : function(){
            if( this._video == undefined){
                return
            }

            var video = this._video,
            duration = video.duration;
            if( !this.data.metaSetted )
            {
                this.setData({ 
                    'metaSetted' :  true ,
                    'duration' : this.formatTime( duration ),
                    'durationSec' : duration
                })
                this.setDefault();
            }
        },

        togglePip : function(){
			if (!('pictureInPictureEnabled' in document)) {
			    console.warn("Picture-in-picture is not supported");
			    return;
			}
            var video = this._video;
            if( video !== document.pictureInPictureElement ){

                video.requestPictureInPicture().then( function(){
                    this.classHandler( this._controls, "remove", "lyteVideoControlsShow" );
                }.bind(this)).catch(function(error){ 
                    console.log(error);
                });
            }else{
                document.exitPictureInPicture();
            }

		},

        toggleFullScreen : function( ele ){
            var videoContainer = this.$node.querySelector('.lyteVideoContainer'),
            ele = ele ? ele : this.$node.querySelector('.lyteVideoFullScreen'),
            options = this.data.ltPropOptions,
            that = this;
            if( options && options.fullScreen === false ){
                return
            }
            if( document.fullscreenElement || document.webkitFullscreenElement){               
                document.fullscreenElement ? document.exitFullscreen() : document.webkitExitFullscreen();
                that.classHandler( ele, "remove", "lyteVideoFullScreenExit" );
            }else{
                var fn = videoContainer.requestFullscreen ? 'requestFullscreen' : 'webkitRequestFullscreen' ;
                videoContainer[ fn ]().then( function(){
                    this.classHandler( ele, "add", "lyteVideoFullScreenExit" );
                    if( navigator.maxTouchPoints ){
                        screen.orientation.lock('landscape').catch( function( error ){ });
                    }
                }).catch( function(error){
                    console.log( error)
                });
               
            }
        },

        toggleSettings : function(){
            var menu = this._menu,
            diff,bcr;

            if( menu && menu.classList.contains('lyteVideoMenuHide')){
                
                menu.classList.remove('lyteVideoMenuHide');

                this._menuListener = this.menuListener.bind( this );

                document.addEventListener('click', this._menuListener);

            }else{
                this.menuListener(null, true);
            }
        },

        mouseMove : function( evt ){
            if( evt.pointerType != 'touch' && document.pictureInPictureElement == null ){
                clearTimeout( this._timerIdx );
                this.classHandler( this.$node.querySelector('.lyteVideoContainer'), "add", "lyteVideoControlsShow" );
                var flag = this._menu ? this._menu.classList.contains('lyteVideoMenuHide') : true;
                if( flag  &&  this._video && !this._video.paused){
                    this._timerIdx =  setTimeout(  function(){ 
                        this.classHandler( this.$node.querySelector('.lyteVideoContainer'), "remove", "lyteVideoControlsShow" );
                    }.bind(this), 3000 );
                }
            }
        },

        mouseEnter : function( evt ){
            this._focused = true;
            var container = this.$node.querySelector('.lyteVideoContainer'),
            flag = this._menu ? this._menu.classList.contains('lyteVideoMenuHide') : true;
            if( document.pictureInPictureElement == null ){
                this.classHandler( container, "add", "lyteVideoControlsShow" );
            }
            if( evt.pointerType == 'touch' && flag){
                clearTimeout( this._timerIdx );
                this._timerIdx =  setTimeout(  function(){ 
                    this.classHandler( container, "remove", "lyteVideoControlsShow" );
                }.bind(this), 3000 );
            }
        },

        mouseLeave : function( evt ){
            this._focused = false;
            var flag = this._menu ? this._menu.classList.contains('lyteVideoMenuHide') : true;
            if( evt.pointerType != 'touch' && flag && this._video && !this._video.paused){
                this.classHandler( this.$node.querySelector('.lyteVideoContainer'), "remove", "lyteVideoControlsShow" );
            }
        },

        mouseOver : function(){
            var menu = this._menu;
            if( menu && !menu.classList.contains('lyteVideoSettingsItemHover')){
                var options = menu.children,
                idx = Math.abs( this._menuIdx % options.length);
                this.classHandler( options[ idx ], "remove", "lyteVideoSettingsItemSelected" );
                this.classHandler( this._menu, "add", "lyteVideoSettingsItemHover" );
            }
        },

        settingsMenuClick : function( ele ){
            var value = ele.getAttribute('data-value'),
            menu = this._menu,
            bck = this.getMethods('onMenuClick') && this.executeMethod( 'onMenuClick', value, menu );
            bck = ( bck == undefined ) ? true : bck;
            
            if( !menu ){
                return;
            }
            if( !bck ){
                this.classHandler( menu, "add", "lyteVideoMenuHide" );
                this.setData({'subMenuOpened' : false, 'selectedOption' : 'settings'});
                return;
            }

            if( value == "back" ){
                this.classHandler( menu, "add", "lyteVideoMenuHide" );
                this.setData({'subMenuOpened' : false, 'selectedOption' : 'settings'});
                this.classHandler( menu, "remove", "lyteVideoMenuHide" );
            }else if( this.data.selectedOption == "settings"){
                switch( value ){
                    case 'Playback Speed' : 
                        this.setData({'subMenuOpened' : true, 'selectedOption' : 'speed'});
                        this.classHandler( menu, "remove", "lyteVideoMenuHide" );
                        break;
                    case 'Subtitles/CC':
                        this.setData({'subMenuOpened' : true, 'selectedOption' : 'captions'});
                        this.classHandler( menu, "remove", "lyteVideoMenuHide" );
                        break;
                    case 'Quality' :
                        this.setData({'subMenuOpened' : true, 'selectedOption' : 'quality'});
                        this.classHandler( menu, "remove", "lyteVideoMenuHide" );
                        break;
                }
            }else {
                if( this.data.selectedOption == "speed" ){
                    this.setData( 'ltPropPlayRate', value );
                }else if( this.data.selectedOption == "quality" ){
                    this.setData('ltPropQuality', value );
                }else if( this.data.selectedOption == "captions" ){
                    this.setData( 'ltPropCaption', value );
                }
                this.classHandler( menu, "add", "lyteVideoMenuHide" );
                this.setData({'subMenuOpened' : false, 'selectedOption' : 'settings'});
            }
        },

        progress : function( evt ){
            if( this._video == undefined){
                return
            }
            var video = this._video,
            buffer = video.buffered,
            duration = video.duration,
            chaptersData = this.getData( 'chaptersData' ),
            totalLoadedTime, width, loadedTime;

            if( buffer.length ){ 
                totalLoadedTime = buffer.end( buffer.length - 1 );    
                width = totalLoadedTime / duration * 100;
            } 

            if( chaptersData  && totalLoadedTime ){

                for( i = 0; i < chaptersData.length; i++){
                    if( totalLoadedTime > chaptersData[i].endTime){
                        loadedTime = 100;
                    }else if( totalLoadedTime <  chaptersData[i].startTime ){
                        loadedTime = 0;
                    }
                    else{  
                        loadedTime =  ( totalLoadedTime - chaptersData[i].startTime ) / (chaptersData[i].endTime - chaptersData[i].startTime )* 100;
                        loadedTime = loadedTime > 100 ? 100 : loadedTime;                       
                    }    

                    Lyte.objectUtils( chaptersData[i] , "add" , "loadedTime", loadedTime );
                }
            }

            this.setData( 'loadedTime', width)
        },

        progressClick : function( evt ){
            var ele = evt.target;

            if( ele.classList.contains('.lyteVideoProgressHandler') ){
                return;
            }

            var time = this.updateTime( evt );
            if( this.data.renderPrefetch ){
                this._isPaused = true;
                this._time = time;
                this.prefetch();
            }
        },

        progressMouseDown : function( evt ){
            var touches = evt.touches || [],
			length = touches.length,
			isTch = length != 0;

            if( length > 1 ){
				return;
			}

            if( this._video && !this._video.paused){
                this.pause();
                this._paused = true;
            }
            this._mouseDown = true;
            this._move = this.progressMouseMove.bind( this );
            this._up = this.progressMouseUp.bind( this );
            this.bind_evt( "addEventListener", isTch );
            evt.preventDefault();
        },

        chapterSelect : function( ele ){
            var video = this._video;
            
            video.currentTime = ele.getAttribute('data-start')
        },

        updateToolTip : function( evt ){
            var time = this.updateTime( evt, true ),
            curChapter = this._curChapter ? this._curChapter : '',
            tooltip = this.$node.querySelector(".lyteVideoToolTip"),
            title = $L(evt.target).closest('.lyteVideoChapter').attr('data-label'),
            ele = this.$node.querySelector(".lyteVideoProgressBar"),
            bcr = ele.getBoundingClientRect(),
            op = {};
            
            title = title ? title : curChapter;
            tooltip.style.left = evt.clientX - bcr.left -  15  + "px";
            op.name = title;
            op.time = this.formatTime( time );

            this.setData('toolTip', op);
        }
    },

    methods : {
        setVolume : function( handlerIndex , currentValue ){
            if( this.data.renderPrefetch ){
                this.handlePreVolume( currentValue );
                return;
            }
            var video = this._video;
            if( this._video == undefined){
                return
            }
            if( currentValue.value == 0){
                video.muted = true;
            }
            
            this.setData('ltPropVolume',currentValue.value)
        }
        
    }
});

Lyte.Component.registerHelper( "lyteUiSetSelectedClass" , function( value, selectedVal ){
	if(value == selectedVal){
		return "lyteVideoOptionselected";
	}
	return "";
});
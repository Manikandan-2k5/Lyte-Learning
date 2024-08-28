Lyte.Component.register( 'lyte-note-editor', {
_template:"<template tag-name=\"lyte-note-editor\"> <div class=\"lyteNoteFakeElement {{if(draftMode,'lyteNoteDraft','')}}\" __click=\"{{action('renderEditor',this)}}\"> <template is=\"if\" value=\"{{draftMode}}\"><template case=\"true\"> <div class=\"lyteNoteDraftWrapper\"> {{unescape(draftText,undefined,sanitizer.attr)}} </div> </template><template case=\"false\"> <div class=\"lyteNotePlaceholder\"> {{expHandlers(ltPropTextEditor.placeholder,'||',\"\")}} </div> </template></template> </div> <template is=\"if\" value=\"{{render}}\"><template case=\"true\"> <div class=\"lyteNoteEditorWrapper\" style=\"{{lyteNoteStyle(ltPropBackground,ltPropBorder)}}\"> <template is=\"if\" value=\"{{ltPropTitleYield}}\"><template case=\"true\"> <div class=\"lyteNoteTitleYield\"> <lyte-yield yield-name=\"lyte-comment-title\" data-index=\"{{dataIndex}}\"></lyte-yield> </div> </template></template> <div class=\"lyteNoteTextEditorWrapper\"> <lyte-texteditor lt-prop=\"{{stringify(ltPropTextEditor)}}\" class=\"lyteNoteMainEditor\" on-trigger=\"{{method('trigger')}}\" on-focus=\"{{method('focus')}}\" on-blur=\"{{method('blur')}}\" on-paste=\"{{method('paste')}}\" id=\"{{randomId}}\" show-placeholder=\"{{lbind(isEmpty)}}\" on-select=\"{{method('selection')}}\"></lyte-texteditor> <template is=\"if\" value=\"{{ltPropEditorProps.background}}\"><template case=\"true\"> <div lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-title=\"{{ltPropText.noteBackground}}\" lt-prop-tooltip-class=\"lyteNoteTooltip\" class=\"lyteNoteBgSwitcher\" __click=\"{{action('common_action','bg_switch')}}\"></div> </template></template> </div> <template is=\"if\" value=\"{{ltPropVoiceNote}}\"><template case=\"true\"> <lyte-voicenote class=\"lyteNotePreviewVoiceNote\" id=\"{{ltPropVoiceNote.id}}\" lt-prop-src=\"{{ltPropVoiceNote.src}}\"></lyte-voicenote> </template></template><template is=\"if\" value=\"{{ltPropEditorProps.attachment}}\"><template case=\"true\"> <div class=\"lyteNoteFileStatus {{showElement}}\"> <lyte-fileupload lt-prop=\"{{stringify(ltPropFileUpload)}}\" lt-prop-yield=\"true\" on-before-send=\"{{method('beforeSend')}}\" on-success=\"{{method('success')}}\" on-failure=\"{{method('failure')}}\" predefined-list=\"{{ltPropAttachments}}\" on-remove=\"{{method('removeFile')}}\" on-before-remove=\"{{method('beforeRemove')}}\" on-add=\"{{method('addFile')}}\"> <template is=\"registerYield\" yield-name=\"file\"> <lyte-file-select-area></lyte-file-select-area> <div class=\"lyteFileUpdList\"> <template is=\"for\" items=\"{{predefinedList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile\"> <div class=\"lyteNoteFileUpdListInnerWrap\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{lyteUiImageFile(item)}}\"><template case=\"true\"> <img class=\"lyteFileUpdThumb\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <lyte-text lt-prop-tooltip-class=\"lyteCommentFileNameTooltip\" class=\"lyteFileUpdFileName\" lt-prop-value=\"{{item.name}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\"></lyte-text> <span class=\"lyteFileUpdFileSize\">( {{lyteUiFileSize(item.size,\"\",1)}} )</span> </div> <lyte-file-close data-value=\"{{item.id}}\" class=\"{{item.status}}\"></lyte-file-close> </div> </template> <template is=\"for\" items=\"{{queueList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile {{item.status}}\"> <div class=\"lyteNoteFileUpdListInnerWrap\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{lyteUiImageFile(item)}}\"><template case=\"true\"> <img class=\"lyteFileUpdThumb\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <lyte-text lt-prop-tooltip-class=\"lyteCommentFileNameTooltip\" class=\"lyteFileUpdFileName\" lt-prop-value=\"{{item.name}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\"></lyte-text> <span class=\"lyteFileUpdFileSize\">( {{lyteUiFileSize(item.size,\"\",1)}} )</span> </div> <template is=\"if\" value=\"{{expHandlers(item.percentage,'!=',undefined)}}\"><template case=\"true\"> <div class=\"lyteFileUpdFileStatus\" data-completed=\"{{item.percentage}}\"> <div class=\"lyteFileUpdProgressBar {{item.status}}\"> <div class=\"lyteFileUpdProgressFill\" style=\"width: {{item.percentage}}%\"></div> </div> </div> </template></template><template is=\"if\" value=\"{{expHandlers(item.status,'==',&quot;error&quot;)}}\"><template case=\"true\"> <lyte-file-retry data-value=\"{{item.id}}\"> <span class=\"lyteFileUpdFailMsg\">{{ltPropText.failureMessage}}</span> <span class=\"lyteFileUpdRetryMsg\">{{ltPropText.retryText}}</span> </lyte-file-retry> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(item.status,'==',&quot;error&quot;),'||',expHandlers(item.status,'==',&quot;success&quot;))}}\"><template case=\"true\"> <lyte-file-close data-value=\"{{item.id}}\" class=\"{{item.status}}\"></lyte-file-close> </template><template case=\"false\"> <span class=\"lyteNoteIndividualFilePercentage\">{{item.percentage}}</span> </template></template> </div> </template> </div> </template> </lyte-fileupload> <template is=\"if\" value=\"{{showStatus}}\"><template case=\"true\"> <div class=\"lyteNoteFileUploadStatus {{showElement}}\"> <div class=\"lyteNoteUploadCountSection\"> <span class=\"lyteNoteSvgContainer\"> <svg viewBox=\"0 0 100 100\" width=\"100%\" height=\"100%\"> <g class=\"lyteNoteSvgGroup\"> <circle cx=\"50\" cy=\"50\" r=\"40\" class=\"background_circle\" stroke-dasharray=\"314.16\"></circle> <circle cx=\"50\" cy=\"50\" r=\"40\" class=\"progress_circle\" stroke-dasharray=\"314.16\" stroke-dashoffset=\"{{dashoffset}}\"></circle> </g> </svg> </span> <span class=\"lyteNoteUploadText\">{{ltPropText.fileUpload}} :</span> <span class=\"lyteNoteUploadCount\"> <span class=\"lyteNoteUploadCountNumber\">{{uploadedCount}}</span> / <span class=\"lyteNoteTotalCount\">{{totalCount}}</span> </span> <span class=\"lyteNoteFileLimitMessage\">{{ltPropText.limit}}</span> </div> <template is=\"if\" value=\"{{ltPropFileUpload.totalFilesSize}}\"><template case=\"true\"> <div class=\"lyteNoteUploadSize\"> <span class=\"lyteNoteSvgContainer\"> <svg viewBox=\"0 0 100 100\" width=\"100%\" height=\"100%\"> <g class=\"lyteNoteSvgGroup\"> <circle cx=\"50\" cy=\"50\" r=\"20\" class=\"background_circle\" stroke-dasharray=\"125.66\"></circle> <circle cx=\"50\" cy=\"50\" r=\"20\" class=\"progress_circle\" stroke-dasharray=\"125.66\" stroke-dashoffset=\"{{dashoffsetStorage}}\"></circle> </g> </svg> </span> <span class=\"lyteNoteSizeText\">{{ltPropText.storage}} :</span> <span class=\"lyteNoteSizeValue\"> <span class=\"lyteNoteUploadSizeNumber\">{{uploadedSize}}</span> / <span class=\"lyteNoteTotalSiza\">{{totalSize}}</span> </span> </div> </template></template> </div> </template></template> </div> </template></template> <div class=\"lyteNoteEditorFooter\"> <div class=\"lyteNoteFooterActions\"> <template is=\"if\" value=\"{{ltPropEditorProps.attachment}}\"><template case=\"true\"> <div lt-prop-tooltip-class=\"lyteNoteTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-title=\"{{ltPropText.attachFiles}}\" class=\"lyteNoteFileUpload\" __click=\"{{action('trigger_upload',event)}}\"></div> </template></template><template is=\"if\" value=\"{{ltPropEditorProps.emoji}}\"><template case=\"true\"> <span lt-prop-tooltip-class=\"lyteNoteTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-title=\"{{ltPropText.smileyIcon}}\" class=\"lyteNoteSmileyIcon\" __click=\"{{action('common_action','show_smiley')}}\"></span> </template></template><template is=\"if\" value=\"{{ltPropEditorProps.editorpanel}}\"><template case=\"true\"> <div class=\"lyteNoteIconHolder\"> <span class=\"lyteNoteEditorIcon lyteEditorPanelHidden\" __click=\"{{action('toggle_icon',this)}}\"></span> <lyte-editorpanel class=\"lyteEditorHide lyteNoteEditorPanel{{ltPropEditorAnimation}}\" lt-prop=\"{{stringify(ltPropEditorPanel)}}\" lt-prop-editor=\"#{{randomId}}\"></lyte-editorpanel> </div> </template></template> </div> <div class=\"{{lyteUiAddShowClass(disabled,'lyteNoteCancelSaveWrap','lyteNoteButtonDisabled')}}\"> <template is=\"for\" items=\"{{ltPropButtons}}\" item=\"item\" index=\"index\"> <lyte-button class=\"{{item.class}}\" lt-prop=\"{{stringify(item.properties)}}\" lt-prop-disabled=\"{{item.properties.disabled}}\" __click=\"{{action('common_action',item.method,event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{item.text}} </template> </lyte-button> </template> </div> </div> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteNoteStyle","args":["ltPropBackground","ltPropBorder"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"text","position":[1,1,5,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[3,3]},{"type":"for","position":[3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"text","position":[1,1,5,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","item.percentage","'%'"]}}}}]}},"default":{}},{"type":"attr","position":[1,4]},{"type":"if","position":[1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1,1,3]},{"type":"text","position":[1,1,3,0]},{"type":"text","position":[1,1,5,1,0]},{"type":"text","position":[1,1,5,3,0]},{"type":"text","position":[1,1,7,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1,3]},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,1,0]},{"type":"text","position":[1,5,3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,8,1,1]},{"type":"if","position":[1,8,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,8,1,2]},{"type":"if","position":[1,8,1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,8,1,3]},{"type":"if","position":[1,8,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"attr","position":[1,8,3]},{"type":"attr","position":[1,8,3,1]},{"type":"for","position":[1,8,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}],
_observedAttributes :["ltPropEditMode","ltPropValue","ltPropButtons","ltPropTextEditor","ltPropBackground","ltPropBorder","ltPropEditorPanel","ltPropFileUpload","ltPropAttachments","ltPropEditorAnimation","ltPropResize","ltPropTooltipConfig","ltPropText","ltPropVoiceNote","ltPropFooterYield","ltPropEditorProps","ltPropTitleYield","render","randomId","uploadedWidth","showStatus","uploadedCount","totalCount","uploadedSize","totalSize","dashoffset","dashoffsetStorage","showElement","disabled","sanitizer","animationHeight","isEmpty","fromMain","draftMode","draftText","dataIndex"],


	class : function( add, remove, _this ){
		var editor = $L( this.$node ).find( '.lyteNoteEditorWrapper' ).eq( 0 ),
		cls_name = 'lyteEditorHide';

		editor[ remove + 'Class' ]( cls_name );
		$L( _this )[ add + 'Class' ]( cls_name );
	},

	get_editor : function(){
		return $L( this.$node ).find( 'lyte-texteditor.lyteNoteMainEditor' ).get( 0 );
	},

	border_obs : function( arg ){
		var editor = $L( this.$node ).find( '.lyteNoteEditorWrapper' ),
		fn = 'addClass';
		if( arg.newValue ){
			fn = 'removeClass';
		}

		editor[ fn ]( 'lyteNoteEditorWhiteBg' );

	}.observes( 'ltPropBorder' ),

	draft_obs : function(){
		var data = this.data;
		if( data.draftMode && !data.ltPropEditMode ){
			this.setData( 'draftText', this.get_editor().getHTML() );
		} 
	}.observes( 'draftMode', 'ltPropEditMode' ),

	data  : function(){
		return {
			ltPropEditMode : Lyte.attr( 'boolean', { default : false } ),
			ltPropValue : Lyte.attr( 'string', { default : '' } ),

			ltPropButtons : Lyte.attr( 'array', { default : [] } ),

			ltPropTextEditor : Lyte.attr( 'object', { default : {} } ),

			ltPropBackground : Lyte.attr( 'string', { default : '' } ),

			ltPropBorder : Lyte.attr( 'string', { default : '' } ),

			ltPropEditorPanel : Lyte.attr( 'object', { default : {} } ),

			ltPropFileUpload : Lyte.attr( 'object', { default : {} } ),

			ltPropAttachments : Lyte.attr( 'array', { default : [] } ),

			ltPropEditorAnimation : Lyte.attr( 'string', { default : 'slide' } ),

			ltPropResize : Lyte.attr( 'object', { default : { horizontal : false, vertical : true } } ),

			ltPropTooltipConfig : Lyte.attr( "string", { default : '{}' } ),

			ltPropText : Lyte.attr( "object", { default : {
				fileUpload : _lyteUiUtils.i18n( "upload.file", "note", "File upload" ),
				storage : _lyteUiUtils.i18n( "storage", "note", "Storage" ),
				failureMessage : _lyteUiUtils.i18n( 'Attachment failed', 'fileupload', "Attachment failed" ), 
				retryText : _lyteUiUtils.i18n( 'retry', "fileupload", "Retry" )
			} } ),

			ltPropVoiceNote : Lyte.attr( 'object' ),

			ltPropFooterYield : Lyte.attr( 'boolean', { default : false } ),

			ltPropEditorProps : Lyte.attr( 'object', { default : {} } ),

			ltPropTitleYield : Lyte.attr( 'boolean', { default : false } ),

			// system

			render : Lyte.attr( 'boolean', { default : false } ),
			randomId : Lyte.attr( 'string', { default : 'LyteNoteEditor' + parseInt( Math.random() * 100000 ) } ),

			uploadedWidth : Lyte.attr( 'string', { default : '0' } ),
			showStatus : Lyte.attr( 'boolean', { default : false } ),
			uploadedCount : Lyte.attr( 'string' ),
			totalCount : Lyte.attr( 'string' ),
			uploadedSize : Lyte.attr( 'string' ),
			totalSize : Lyte.attr( 'string' ),
			dashoffset : Lyte.attr( "number" ),
			dashoffsetStorage : Lyte.attr( "number" ),
			showElement : Lyte.attr( 'string', { default : 'lyteEditorHide' } ),
			disabled : Lyte.attr( 'boolean', { default : false } ),
			sanitizer : Lyte.attr( 'object', {}),

			animationHeight : Lyte.attr( 'number', { default : 0 } ),
			isEmpty : Lyte.attr( "boolean" ),
			fromMain : Lyte.attr( "boolean" ),
			draftMode : Lyte.attr( 'boolean' ),
			draftText : Lyte.attr( 'string' ),
			dataIndex : Lyte.attr( 'string', { default : "" } )
		}
	},

	empty_obs : function(){
		this.disable_button();
	}.observes( "isEmpty" ),

	disable_button : function(){
		var data = this.data;

		if( data.ltPropEditorProps.attachment ){
			clearTimeout( this._disable );
			this._disable = setTimeout( function(){
				var button = data.ltPropButtons.filter( function( item ){
					return item.method == "save";
				})[ 0 ];
				if( button ){
					var file_data = $L( "lyte-fileupload", this.$node ).get( 0 ).component.data,
					queueList = file_data.queueList,
					predefined = file_data.predefinedList;

					Lyte.objectUtils( button.properties, 'add', 'disabled', data.isEmpty && !queueList.length && !predefined.length );
				}
			}.bind( this ), 10 );
		}
	},

	didDestroy : function(){
		clearTimeout( this._disable );
		clearTimeout( this._timeout );
	},

	obs : function(){

		var __mode = this.data.ltPropEditMode,
		__rendered = this.data.render;

		if( __mode && !__rendered ){
			this.setData( 'render', __rendered = true );
		}

		var editor = this.get_editor(),
		_this = $L( this.$node ).children( '.lyteNoteFakeElement' ),
		$this = this,
		evt_name = 'transitionend',
		wrapper = $L( this.$node ).find( '.lyteNoteEditorWrapper' ).eq( 0 ),
		fn = function( bool ){
			if( $this.getMethods( "onSwitch" ) ){
				$this.executeMethod( "onSwitch", bool, $this.$node );
			}
		},
		height,
		initial_height,
		hide_cls = "lyteEditorHide",

		common_fn1 = function(){
			wrapper.off( evt_name ).css( {
				height : "auto",
				overflow : ""
			});

			$this.modify_display( $L( "lyte-fileupload", $this.$node ).get( 0 ) );
		},

		common_fn2 = function( height, initial_height ){
			if( Math.abs( height - initial_height ) < 10 ){
				wrapper.trigger( evt_name );
			}
		};

		if( __mode ){
			initial_height = this.data.animationHeight || _this.get( 0 ).offsetHeight;

			this.class( 'add', 'remove', _this );

			var value = this.data.ltPropValue,
			__fn,
			__arg = value;

			try{
				if( /^[0-9]+$/.test( value ) ){
					__fn = 'HTML';
				} else {
					var json = JSON.parse( value );
					__fn = 'JSON';
					__arg = json;
				}
			}catch( e ){
				__fn = 'HTML';
			}

			editor[ 'insert' + __fn ]( __arg );

			window.requestAnimationFrame( function(){
				height = wrapper.height();
				
				wrapper.css( {
					height : initial_height,
					overflow : "hidden"
				});
				window.requestAnimationFrame( function(){
					wrapper.css( {
						height : height,
						overflow : "hidden"
					}).on( evt_name, function(){
						editor.focus();
						$this.setData( "disabled", false );
						common_fn1();
						fn( !0 );
					});

					common_fn2( height, initial_height );
				});
			});

		} else if( __rendered ) {

			height = wrapper.height();
			initial_height = this.data.animationHeight,
			anim = function(){
				wrapper.css( {
					height : height,
					overflow : "hidden"
				} );

				window.requestAnimationFrame( function(){
					wrapper.on( evt_name, function(){

						$this.setData( "disabled", false );

						common_fn1();

						if( !$this.data.draftMode ){
							editor.clear();
							editor.resetQueue();
						}

						$L( editor ).css( {
							width : "",
							height : ""
						});

						var panel = $L( 'lyte-editorpanel', $this.$node );

						if( panel.data( "animation" ) ){
						    panel.trigger( evt_name );
						}

						fn( !1 );
						$this.class( 'remove', 'add', _this );

						if( $this.data.fromMain ){

							$this.$node.ltProp( {
								background : "",
								border : ""
							});
						} else if( $this.data.ltPropVoiceNote ){
							var audio = $L( "audio", $this.$node ).get( 0 );
							audio.pause();
							audio.currentTime = 0;

						}

					}).css( {
						height : initial_height || _this.get( 0 ).offsetHeight
					});

					!initial_height && _this.addClass( hide_cls );

					common_fn2( height, initial_height );
				});
			};

			if( !initial_height ){
				_this.removeClass( hide_cls );
				anim();
			} else {
				// if it doesn't wait for a frame in edit case animation is not happening in firefox
				window.requestAnimationFrame( anim );
			}
		}

		this.setData( 'disabled', true );
	}.observes( 'ltPropEditMode' ).on( 'didConnect' ),

	toggle_icon : function( _this ){
		var panel = $L( this.$node ).find( 'lyte-editorpanel' ),
		cls_name = 'lyteEditorHide',
		hid_class = 'lyteEditorPanelHidden',
		animation = this.data.ltPropEditorAnimation,
		old_animation = panel.data( 'animation' ),
		$this = $L( _this ),
		_add = 'addClass',
		_remove = 'removeClass',
		evt_name = 'transitionend',
		start_cls = 'lyteNoteEditorPanelTransStart',
		end_cls = 'lyteNoteEditorPanelTransEnd',
		__key = ( animation || {} ).key; 

		if( panel.hasClass( cls_name ) ){
			if( old_animation == 'open' ){
				return;
			} else if( old_animation == 'close' ){
				panel.trigger( evt_name );
			}

			if( animation ){ 
				panel[ _add ]( start_cls );
				$this[ _remove ]( hid_class );
				window.requestAnimationFrame( function(){ // animation is not happening in FF without this RAF
					panel[ _remove ]( cls_name ).data( 'animation', 'open' );
					window.requestAnimationFrame( function(){
						panel.on( evt_name, function(){
							panel.off( evt_name ).data( 'animation', '' )[_remove ]( end_cls );
						})[_remove ]( start_cls )[ _add ]( end_cls );
					});
				});
			} else {
				panel[ _remove ]( cls_name );
				$this[ _remove ]( hid_class );
			}

		} else{

			if( old_animation == 'open' ){
				panel.trigger( evt_name );
			} else if( old_animation == 'close' ){
				return;
			} 

			if( animation ){
				panel[ _add ]( end_cls ).data( 'animation', 'close' );
				window.requestAnimationFrame( function(){
					panel.on( evt_name, function(){
						panel.off( evt_name )[ _add ]( cls_name ).data( 'animation', '' )[_remove ]( start_cls );
						$this[ _add ]( hid_class );
					})[_remove ]( end_cls )[ _add ]( start_cls );
				});
			} else{
				panel[ _add ]( cls_name );
				$this[ _add ]( hid_class );
			}
		}
	},

	actions : {
		renderEditor : function( _this ){

			if( !this.data.render ){
				this.setData( 'render', true );		
				this.class( 'remove', 'add' );
			}

			if( this.data.fromMain && this.executeMethod( 'closeComment' ) ){
				return;
			}
			this.setData( 'ltPropEditMode', true );
		},
		common_action : function( name, evt ){
			if( name == 'cancel' ){
				this.setData( 'draftMode', false );
			}
			this.throwEvent( name, this.get_editor(), evt );

			if( name == 'bg_switch' ){
				this.get_editor().focus();
			}
		},

		toggle_icon : function( _this ){
			this.toggle_icon( _this );
		},

		trigger_upload : function( evt ){
			evt.preventDefault();
			evt.stopPropagation();

			$L( this.$node ).find( '.fileuploadInput ' ).click();

			return false;
		}
	},

	focus_blur : function( fn ){
		$L( this.$node )[ fn + 'Class' ]( 'lyteNoteEditorFocused' );
	},

	methods : {

		selection : function(){
			var range = arguments[ 1 ],
			editor_panel = $L( this.$node ).find( 'lyte-editorpanel' ),
			has_class = editor_panel.hasClass( 'lyteEditorHide' );

			if( range.isRange ){	
				if( has_class ){
					this.toggle_icon( $L( '.lyteNoteEditorIcon', this.$node ) );
				}
			} 
		},

		trigger : function( value, position, editor ){
			if( this.getMethods( 'onTrigger' ) ){
				return this.executeMethod( 'onTrigger', value, position, editor );
			}
		},

		focus : function(){
			this.focus_blur( 'add' );
		},

		blur : function(){
			this.focus_blur( 'remove' );
		},

		paste : function( pasteDiv, clipboard, editor ){
			this.file_execute( 'on_editor_paste', arguments );
		},

		beforeSend : function(){
			this.file_execute( 'file_before_send', arguments );
		},

		success : function(){
			var args = arguments;
			this.modify_display( args[ 1 ] );
			this.file_execute( 'file_success', args );
		},

		failure : function(){
			var args = arguments;
			this.modify_display( args[ 1 ] );
			this.file_execute( 'file_failure', arguments );
		},

		removeFile : function(){
			var args = arguments;
			this.modify_display( args[ 2 ] );
			this.file_execute( 'file_remove', args );
		},

		beforeRemove : function(){
			this.file_execute( 'file_before_remove', arguments );
		},

		addFile : function( _file, _fileupload ){
			this.modify_display( _fileupload );
		}
	},

	modify_display : function( _file ){
		if( _file ){
			clearTimeout( this._timeout );
			this._timeout = setTimeout( this._modify_display.bind( this, _file ), 0 );
		}
	},	

	_modify_display : function( _file ){
		var _this = _file.component,
		queueList = _this.data.queueList.slice().concat( _this.data.predefinedList || [] ),
		total_size = 0,
		success_size = 0,
		success = queueList.filter( function( item ){
			var is_success = item.status == 'success' || item.status == void 0;
			if( is_success ){
				success_size += item.size;
			}

			total_size += item.size;
			return is_success;
		}),
		fn = function( value ){
			if( value == 0 ){
				return '0 Bytes';
			}
			return Lyte.Component.registeredHelpers.lyteUiFileSize( value, void 0, 2 );
		}.bind( this ),
		elem_name = 'showElement',
		fileSize = this.data.ltPropFileUpload.totalFilesSize;

		this.setData( 'uploadedCount', success.length );
		this.setData( 'totalCount', queueList.length );

		this.setData( "dashoffset", 314.16 * ( 1 - success.length / queueList.length ) );

		if( fileSize ){
			this.setData( 'uploadedSize', fn( success_size ) );
			this.setData( "totalSize", fileSize );
			this.setData( 'uploadedWidth', ( success_size / _file.getData( 'totalFilesSize' ) * 100 ) + '%' );

			this.setData( 'dashoffsetStorage', 125.66 * ( 1 - success_size / _file.getData( 'totalFilesSize' ) ) );
		}
		if( queueList.length ){
			this.setData( elem_name, '' );
			this.setData( 'showStatus', true );
		} else{
			this.setData( elem_name, 'lyteEditorHide' );
		}

		this.disable_button();
	},

	file_execute: function( name, args ){
		args = Array.from( args );
		args.unshift( name );

		this.throwEvent.apply( this, args );
	}
});
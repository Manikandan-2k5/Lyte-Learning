Lyte.Component.register( 'lyte-comment', {
_template:"<template tag-name=\"lyte-comment\" __click=\"{{action('comment_click',event)}}\"> <template is=\"if\" value=\"{{ltPropPinnedComment}}\"><template case=\"true\"> <span class=\"lyteNoteUnpinIcon\"></span> <lyte-yield yield-name=\"lyte-pinned-note\" value=\"{{value}}\"></lyte-yield> </template><template case=\"false\"> <lyte-comment-header> <template is=\"if\" value=\"{{ltPropImage}}\"><template case=\"true\"> <span class=\"lyteCommentProfileImage\" data-method=\"onProfileClick\"> <img src=\"{{ltPropImage}}\"> </span> </template></template> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\"> <span class=\"{{item.name}}\" data-method=\"onHeaderClick\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-class=\"lyteCommentHeaderTooltip\" lt-prop-title=\"{{item.title}}\">{{item.value}}</span> </template> </lyte-comment-header> <lyte-comment-content class=\"{{commentType}}\"> <template is=\"if\" value=\"{{render}}\"><template case=\"true\"> <lyte-note-editor class=\"lyteEditorHide\" lt-prop-value=\"{{lbind(ltPropValue)}}\" lt-prop-edit-mode=\"{{lbind(ltPropEditMode)}}\" render=\"true\" lt-prop-buttons=\"{{ltPropButtons}}\" on-trigger=\"{{method('onTrigger')}}\" lt-prop-text-editor=\"{{ltPropTextEditor}}\" lt-prop-background=\"{{ltPropStyle.background}}\" lt-prop-editor-panel=\"{{ltPropEditorPanel}}\" lt-prop-file-upload=\"{{ltPropFileUpload}}\" lt-prop-attachments=\"{{ltPropAttachments}}\" lt-prop-border=\"{{ltPropStyle.border}}\" lt-prop-editor-animation=\"{{ltPropEditorAnimation}}\" on-switch=\"{{method('modeswitch')}}\" animation-height=\"{{height}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" lt-prop-voice-note=\"{{ltPropVoiceNote}}\" lt-prop-editor-props=\"{{ltPropEditorProps}}\" lt-prop-title-yield=\"{{ltPropTitleYield}}\" data-index=\"{{dataIndex}}\"> <template is=\"registerYield\" yield-name=\"lyte-comment-title\" from-parent=\"\"></template> </lyte-note-editor> </template></template> <div class=\"lyteCommentValue\"> <div class=\"lyteEditorContent\" style=\"{{lyteNoteStyle(ltPropStyle)}}\"> <template is=\"if\" value=\"{{ltPropVoiceNote}}\"><template case=\"true\"> <a href=\"{{ltPropVoiceNote.src}}\" class=\"lyteCommentAttachmentDownload\" download=\"{{ltPropVoiceNote.name}}\" __click=\"{{action('download',event)}}\"></a> <template is=\"if\" value=\"{{value}}\"><template case=\"true\"> <div class=\"lyteCommentText\" __mouseenter=\"{{action('comment_click',event,'data-mouseover')}}\" __mouseleave=\"{{action('comment_click',event,'data-mouseout')}}\"> {{unescape(value,undefined,sanitizer.attr)}} </div> </template></template> <lyte-voicenote id=\"{{ltPropVoiceNote.id}}\" lt-prop-src=\"{{ltPropVoiceNote.src}}\"></lyte-voicenote> </template><template case=\"false\"> <div class=\"lyteCommentText\" __mouseover=\"{{action('comment_click',event,'data-mouseover')}}\" __mouseout=\"{{action('comment_click',event,'data-mouseout')}}\"> {{unescape(value,undefined,sanitizer.attr)}} </div> </template></template> <template is=\"if\" value=\"{{ltPropCheckIn}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyte-note-checkin\" lt-prop-check-in=\"{{ltPropCheckIn}}\"></lyte-yield> </template></template> <div class=\"lyteCommentAttachments\"> <template is=\"for\" items=\"{{ltPropAttachments}}\" item=\"item\" index=\"index\"> <div id=\"{{item.id}}\" data-index=\"{{index}}\" class=\"lyteCommentAttachmentPreview {{id}}_preview\" data-method=\"onPreviewClick\" data-lytecbox-title=\"{{item.name}}\" data-lytecbox-href=\"{{item.src}}\" data-lytecbox-type=\"{{item.ctype}}\" data-lytecbox-dlink=\"{{item.src}}\"> <template is=\"if\" value=\"{{expHandlers(item.fileType,'==',&quot;image&quot;)}}\"><template case=\"true\"> <img class=\"lytecommentAttachment_image\" src=\"{{item.src}}\"> </template><template case=\"false\"> <div class=\"lyteCommentNonImageAttachWrap lytecommentAttachment_{{item.fileType}}\" style=\"--lyte-note-attachment-url:url('{{item.src}}')\"></div> </template></template> <span class=\"lyteCommentAttachmentSize\">{{lyteUiFileSize(item.size,\"\",1)}}</span> <a href=\"{{item.src}}\" class=\"lyteCommentAttachmentDownload\" download=\"{{item.name}}\" __click=\"{{action('download',event)}}\"></a> <lyte-text class=\"lyteCommentAttachmentName\" lt-prop-value=\"{{item.name}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-class=\"lyteCommentFileNameTooltip\"></lyte-text> </div> </template> </div> </div> <template is=\"if\" value=\"{{moreOptions}}\"><template case=\"true\"> <span class=\"lyteNoteCommentMoreOptions\"></span> </template></template> </div> </lyte-comment-content> <lyte-comment-footer> <div class=\"lyteCommentEmojiWrapper\"> <template is=\"for\" items=\"{{ltPropEmoji}}\" item=\"item\" index=\"index\"> <lyte-emoji-container data-index=\"{{index}}\" class=\"{{lyteUiCommentEmoji(item.class,item.selected,item.count)}}\" data-method=\"onCommentEmoji\" data-value=\"{{item.value}}\" data-count=\"{{item.count}}\"> <lyte-emoji-holder __mouseleave=\"{{action('mouseleave')}}\" __mouseenter=\"{{action('mouseenter',this,index)}}\">{{unescape(item.value)}}</lyte-emoji-holder> <lyte-emoji-count data-hover=\"hovercard_show\" __mouseenter=\"{{action('comment_click',event,'data-hover')}}\">{{item.count}}</lyte-emoji-count> </lyte-emoji-container> </template> </div> <div class=\"lyteCommentOtherFooter\"> <template is=\"if\" value=\"{{ltPropCreatedTime}}\"><template case=\"true\"> <span class=\"lyteCommentTime\" lt-prop-title=\"{{createdTime.tooltip}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-class=\"lyteCommentFooterTooltip\">{{createdTime.display}}</span> </template></template> <template is=\"for\" items=\"{{ltPropFooter}}\" item=\"item\" index=\"index\"> <span class=\"{{item.name}}\" data-method=\"onFooterClick\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-class=\"lyteCommentFooterTooltip\" lt-prop-title=\"{{item.title}}\">{{item.value}}</span> </template> </div> </lyte-comment-footer> <template is=\"if\" value=\"{{ltPropReply.length}}\"><template case=\"true\"> <lyte-comment-reply> <template is=\"if\" value=\"{{ltPropReplyYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteReplyHeader\" data-id=\"{{id}}\" data-index=\"{{dataIndex}}\" yield-name=\"lyte-reply-header\" lt-prop-reply=\"{{ltPropReply}}\"></lyte-yield> </template></template><template is=\"for\" items=\"{{ltPropReply}}\" item=\"item\" index=\"index\"> <lyte-comment id=\"{{item.id}}\" class=\"lyteCommentRply {{item.class}}\" lt-prop-image=\"{{item.image}}\" lt-prop-created-time=\"{{item.createdTime}}\" lt-prop-header=\"{{item.header}}\" lt-prop-edit=\"{{item.edit}}\" lt-prop-delete=\"{{item.delete}}\" lt-prop-value=\"{{lbind(item.value)}}\" data-index=\"{{concat(index)}}\" on-time-conversion=\"{{method('onTimeConversion')}}\" lt-prop-reply=\"{{item.reply}}\" lt-prop-footer=\"{{item.footer}}\" lt-prop-emoji=\"{{item.emoji}}\" lt-prop-edit-mode=\"{{lbind(item.editmode)}}\" lt-prop-buttons=\"{{ltPropButtons}}\" on-trigger=\"{{method('onTrigger')}}\" lt-prop-text-editor=\"{{ltPropTextEditor}}\" lt-prop-style=\"{{item.style}}\" lt-prop-editor-panel=\"{{ltPropEditorPanel}}\" lt-prop-file-upload=\"{{ltPropFileUpload}}\" lt-prop-attachments=\"{{item.attachments}}\" lt-prop-editor-animation=\"{{ltPropEditorAnimation}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" lt-prop-voice-note=\"{{item.voiceNote}}\" lt-prop-check-in=\"{{item.checkIn}}\" lt-prop-pin=\"{{item.pin}}\" sanitizer=\"{{sanitizer}}\" lt-prop-editor-props=\"{{ltPropEditorProps}}\" lt-prop-title-yield=\"{{ltPropTitleYield}}\"> <template is=\"registerYield\" yield-name=\"lyte-note-checkin\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-reply-header\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-reply-footer\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-comment-title\" from-parent=\"\"></template> </lyte-comment> </template><template is=\"if\" value=\"{{ltPropReplyYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteReplyFooter\" data-id=\"{{id}}\" data-index=\"{{dataIndex}}\" yield-name=\"lyte-reply-footer\" lt-prop-reply=\"{{ltPropReply}}\"></lyte-yield> </template></template> </lyte-comment-reply> </template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[3]},{"type":"insertYield","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteNoteStyle","args":["ltPropStyle"]}}}},{"type":"attr","position":[3,3,1,1]},{"type":"if","position":[3,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,3,1,3]},{"type":"if","position":[3,3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1,5,1]},{"type":"for","position":[3,3,1,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-note-attachment-url:url(''","item.src","'')'"]}}}}]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,7]},{"type":"componentDynamic","position":[1,7]}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1,1]},{"type":"for","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5,3,1]},{"type":"if","position":[5,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5,3,3]},{"type":"for","position":[5,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"for","position":[1,2],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"registerYield","position":[1,3],"dynamicNodes":[]},{"type":"registerYield","position":[1,5],"dynamicNodes":[]},{"type":"registerYield","position":[1,7],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropImage","ltPropHeader","ltPropEdit","ltPropDelete","ltPropEmoji","ltPropFooter","ltPropCreatedTime","ltPropValue","ltPropEditMode","ltPropReply","ltPropButtons","ltPropCount","ltPropTextEditor","ltPropEditorPanel","ltPropFileUpload","ltPropAttachments","ltPropStyle","ltPropEditorAnimation","ltPropTooltipConfig","ltPropText","ltPropVoiceNote","ltPropCheckIn","ltPropPin","ltPropPinnedComment","ltPropReplyYield","ltPropEditorProps","createdTime","sanitizer","value","height","commentType","isReacted","moreOptions","firstReaction","id","dataIndex"],


	didConnect : function(){
		this.$node.resetTime = this.reset_time.bind( this );
	},

	init : function(){
		var str = '',
		data = this.data;

		if( data.ltPropVoiceNote ){
			str = "lyteNoteVoiceNoteComment";
		} else if( data.ltPropCheckIn ){
			str = "lyteNoteCheckinComment";
		}

		this.setData( 'commentType', str );

		if( data.ltPropEditorProps.emoji ){
			this.setData( 'firstReaction', data.ltPropEmoji[ 0 ] );
		}
	},

	obs : function(){
		if( this.data.ltPropPinnedComment ){
			return;
		}
		this.reset_time();
	}.observes( 'ltPropCreatedTime' ).on( 'init' ),

	preview_obs : function(){
		if( this.data.ltPropPinnedComment ){
			return;
		}
		this.preview_obs_check();
	}.observes( 'ltPropAttachments.[]' ).on( "init" ),

	emoji_obs : function(){
		var __data = this.data;

		if( __data.ltPropPinnedComment || !__data.ltPropEditorProps.emoji ){
			return;
		}
		var emoji = __data.ltPropEmoji;

		this.setData( 'isReacted', emoji.length > 1 || emoji[ 0 ].count );

	}.observes( 'ltPropEmoji.[]', 'firstReaction.count' ).on( 'init' ),

	more_options : function(){
		if( this.data.ltPropPinnedComment ){
			return;
		}
		var data = this.data;
		this.setData( 'moreOptions', data.isReacted || data.ltPropPin || data.ltPropDelete || data.ltPropEdit );
	}.observes( 'isReacted', 'ltPropPin', 'ltPropEdit', 'ltPropDelete' ).on( 'init' ),

	preview_obs_check : function(){
		var data = this.data.ltPropAttachments || [],
		obj = {
			image : "photo"
		},
		_utils = Lyte.objectUtils,
		frame_arr = [ "pdf", "video", "audio" ];

		data.forEach( function( item ){
			var _type = ( item.fileType || "image" ).toLowerCase(),
			_value = obj[ _type ];

			if( !_value ){
				if( frame_arr.indexOf( _type ) != -1 ){
					_value = "iframe/" + _type;
				} else{
					_value = "custom/" + _type;
				}
			}

			_utils( item, "add", "ctype", _value );
		}.bind( this ) );
	},

	edit_modeobs : function( arg ){
		if( this.data.ltPropPinnedComment ){
			return;
		}

		var is_edit = this.data.ltPropEditMode;

		if( is_edit ){
			var hgt = $L( '.lyteEditorContent', this.$node ).get( 0 ).offsetHeight;
			this.setData( 'height', hgt );

			this.setData( 'render', !0 );

			var cls_name = "lyteEditorHide",
			editor = $L( 'lyte-note-editor', this.$node ).eq( 0 );

			editor.removeClass( cls_name ).next().addClass( cls_name );

		} 

	}.observes( 'ltPropEditMode' ).on( 'didConnect' ),

	reset_time : function(){
		var data = this.data,
		time = data.ltPropCreatedTime,
		str,
		callback = 'onTimeConversion';

		if( !time ){
			return;
		}

		if( this.getMethods( callback ) ){
			var str = this.executeMethod( callback, time, 'comment' );

			this.setData( 'createdTime', str );
		}
	},

	convert_to_string : function( value ){
		var ret;
		try{
			var json = JSON.parse( value ),
			ret = _lyteUiEditor.jsonToString( json, this.data.ltPropTextEditor );
		}catch( e ){
			ret = value;
		}
		return ret;
	},

	convert_mention : function(){
		this.setData( 'value', this.checkcount( this.convertback_mention( this.convert_to_string( this.data.ltPropValue ) ), this.data.ltPropPinnedComment ? Infinity : this.data.ltPropCount ) );
	}.observes( 'ltPropValue', 'ltPropCount' ).on( 'init' ),

	convertback_mention : function( text ){
		return text.replace(  /@\[(.+?):(.+?)\]/g, function( final, match1, match2 ){
			return '<span data-method = "onMentionClick" data-mouseover = "onMentionEnter" data-mouseout = "onMentionLeave" class = "lyteCommentUserMention" data-id = "' + match2 + '">' + match1 + '</span>'
		})

		// regex used in crm - shank

		.replace( /([\w](['A-Za-z0-9._%\-+]*@[A-Za-z0-9-]+(\.[a-zA-Z0-9-]{1,22}){0,9}\.[a-zA-Z]{2,22}))/g, '<a class = \'lyteNoteEmail\' href = \'mailto:$1\'>$1</a>' );

		// took this from https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

		// .replace( /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g, '<a class = \'lyteNoteLink\' href = \'$1\' target = \'_blank\'>$1</a>' );
	},

	checkcount : function( text, count ){
		if( count == Infinity ){
			return text;
		}

		 var ret = _lyteUiEditor.limitFilter( text, count, true );

		 if( count == ret.length ){
		 	var text = ret.html,
		 	index = text.lastIndexOf( "</" + ( ret.tag || "p" ) + ">" );
		 	
		 	return text.slice( 0, index ) + '...<span data-method = "more" class = "lyteCommentMoreString">' + this.data.ltPropText.more + '</span>' + text.slice( index );
		 }

		return ret.html;
	},

	data: function() {
		return {
			ltPropImage : Lyte.attr( 'string', { default : '' } ),

			ltPropHeader : Lyte.attr( 'array', { default : [] } ),

			ltPropEdit: Lyte.attr( 'boolean', { default : true } ),

			ltPropDelete : Lyte.attr( 'boolean', { default : true } ),

			ltPropEmoji : Lyte.attr( 'array', { default : [] } ),

			ltPropFooter : Lyte.attr( 'array', { default : [] } ),

			ltPropCreatedTime : Lyte.attr( 'string', { default : '' } ),

			ltPropValue : Lyte.attr( 'string', { default : "", hideAttr : true } ),

			ltPropEditMode : Lyte.attr( 'boolean', { default : false } ),

			ltPropReply : Lyte.attr( 'array', { default : [] } ),

			ltPropButtons : Lyte.attr( 'array', { default : [], hideAttr : true } ),

			ltPropCount : Lyte.attr( 'number', { default : 250 } ),

			ltPropTextEditor : Lyte.attr( 'object', { default : {} } ),

			ltPropEditorPanel : Lyte.attr( 'object', { default : {} } ),

			ltPropFileUpload : Lyte.attr( 'object', { default : {} } ),

			ltPropAttachments : Lyte.attr( 'array', { default : [] } ),

			ltPropStyle : Lyte.attr( 'object', { default : {} } ),

			ltPropEditorAnimation : Lyte.attr( 'string', { default : 'fade' } ),

			ltPropTooltipConfig : Lyte.attr( "string", { default : '{}' } ),

			ltPropText : Lyte.attr( "object", { default : {
					fileUpload : _lyteUiUtils.i18n( "upload.file", "note", "File upload" ),
					storage : _lyteUiUtils.i18n( "storage", "note", "Storage" ),
					more : _lyteUiUtils.i18n( "more", "note", "More" )
			} } ),

			ltPropVoiceNote : Lyte.attr( 'object' ),

			ltPropCheckIn : Lyte.attr( "object" ),

			ltPropPin : Lyte.attr( 'boolean', { default : false } ),

			ltPropPinnedComment : Lyte.attr( 'boolean', { default : false } ),

			ltPropReplyYield : Lyte.attr( 'boolean', { default : false } ),

			ltPropEditorProps : Lyte.attr( 'object', { default : {
			        background : true,
			        attachment : true,
			        emoji : true,
			        editorpanel : true
			    } 
			}),

			// systemData
			
			createdTime : Lyte.attr( 'object', { default : {} } ),

			sanitizer : Lyte.attr( 'object', {}),

			value : Lyte.attr( 'string', { default : '', hideAttr : true } ),

			height : Lyte.attr( 'number', { default : 0 } ),

			commentType : Lyte.attr( 'string' ),

			isReacted : Lyte.attr( 'boolean' ),

			moreOptions : Lyte.attr( 'boolean' ),

			firstReaction : Lyte.attr( 'object' ),

			id : Lyte.attr( 'string', { default : "" } ),
			dataIndex : Lyte.attr( 'string', { default : "" } )
		}
	},

	actions : {
		comment_click : function( evt, name ){
			var method_name = this.get_method_name( evt.target, name || 'data-method' );
			if( method_name ){
				switch( method_name.method ){
					case 'more' : {
						return this.more();
					}
					break;
					default : {
						this.throwEvent( 'common_action', method_name.method, evt, method_name.target, this.$node );
					}
				}
			}
		},

		cancel : function( editor ){
			this.throwEvent( 'cancel_comment', editor, this.$node );
			return false;
		},

		save : function( editor ){
			this.throwEvent( 'update_comment', editor, this.$node );
			return false;
		},

		mouseenter : function( _this, index ){
			if( index == 0 ){
				this._timeout = setTimeout( function(){
					this.throwEvent( 'show_emoji', _this );
				}.bind( this ), 500);
			}
		},

		mouseleave : function(){
			this.didDestroy();
		},

		download : function( evt ){
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			return false;
		}
	},

	more : function(){
		this.setData( 'ltPropCount', Infinity );
	},

	didDestroy : function(){
		clearTimeout( this._timeout );
		delete this._timeout;
	},

	methods : {
		onTimeConversion : function(){
		},
		onTrigger : function( value, position, editor ){
			if( this.getMethods( 'onTrigger' ) ){
				return this.executeMethod( 'onTrigger', value, position, editor );
			}
		},

		modeswitch : function( value, _editor ){
			if( !value ){
				var cls = 'lyteEditorHide';
				$L( _editor ).addClass( cls ).next().removeClass( cls );
			}
		}
	},

	get_method_name : function( target, name ){

		var fn  = function( elem, query ){
			if( elem.closest ){
				return elem.closest( query );
			}
			return $L( elem ).closest( query ).get( 0 );
		},
		comment = fn( target, 'lyte-comment' );

		if( comment == this.$node ){
			var element = fn( target, '[' + name + ']:not([' + name + '=""])' );

			if( element ){
				return{
					method : $L( element ).attr( name ),
					target : element
				}
			}
		}
	}
});


Lyte.Component.registerHelper( 'lyteNoteStyle', function( background, border ){

	if( !background ){
		return "";
	}

	var obj;
	
	if( border && background ){
		obj = {
			background : background,
			border : border
		}
	} else{
		if( background.constructor == String ){
			return "background:" + background;
		}
		obj = {
			background : background.background,
			border : background.border
		}
	}

	return _lyteUiEditor.inlineStyle( obj );
});

Lyte.Component.registerHelper( 'lyteUiCommentEmoji', function( className, selected, count ){
	var str = className || '';

	if( selected ){
		str += ' lyteEmojiSelected';
	}

	if( count != void 0 ){
		str += ( ' lyte_emoji_reactions_' + count );
	}

	return str.trim();
});
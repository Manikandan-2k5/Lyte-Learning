/**
 * This component is used to create note view
 * @component lyte-notecomp
 * @version 4.0.0
 * @dependency lyte-popover
 * 	components/lyte-popover.js
 * 	components/lyte-wormhole.js
 *  theme/compiledCSS/default/ltr/lyte-ui-popover.css
 * @dependency lyte-button
 * 	components/lyte-button.js
 *  theme/compiledCSS/default/ltr/lyte-ui-button.css
 * @dependency lyte-checkbox
 * 	components/lyte-checkbox.js
 *  theme/compiledCSS/default/ltr/lyte-ui-checkbox.css
 * @dependency lyte-menu
 * 	components/lyte-menu.js
 *  theme/compiledCSS/default/ltr/lyte-ui-menu.css
 * @dependency lyte-colorpicker
 * 	components/lyte-colorpicker.js
 *  theme/compiledCSS/default/ltr/lyte-ui-colorpicker.css
 * @dependency lyte-colorbox
 * 	components/lyte-colorbox.js
 *  theme/compiledCSS/default/ltr/lyte-ui-colorbox.css
 * @dependency lyte-fileupload
 * 	components/lyte-fileupload.js
 *  theme/compiledCSS/default/ltr/lyte-ui-fileupload.css
 * @dependency lyte-messagebox
 * 	components/lyte-messagebox.js
 *  theme/compiledCSS/default/ltr/lyte-ui-messagebox.css
 * @dependency lyte-voicenote
 * 	components/lyte-voicenote.js
 *  theme/compiledCSS/default/ltr/lyte-ui-voicenote.css
 * @dependency lyte-emoji
 * 	components/lyte-emoji.js
 *  theme/compiledCSS/default/ltr/lyte-ui-emoji.css
 * @dependency lyte-comment
 * 	components/lyte-note/lyte-comment.js
 * @dependency lyte-note-editor
 * 	components/lyte-note/lyte-note-editor.js
 * @methods onTimeConstruction, onCommentUnpin, onViewReaction,onCommentDelete,onCommentPin, onCommentEdit, onEmojiSelect, onTrigger, onCommentCancel, onMainCommentCancel, onMainCommentSave, onButtonClick, onBeforeSend, onSuccess, onFailure, onError, onBeforeRemove, onEditorPaste
 * @utility removeAllFiles, getBackground, setBackground, viewReactions 
 */

Lyte.Component.register( 'lyte-notecomp', {
_template:"<template tag-name=\"lyte-notecomp\"> <template is=\"if\" value=\"{{ltPropAddNewComment}}\"><template case=\"true\"> <div class=\"lyteNoteMainComment\"> <template is=\"if\" value=\"{{ltPropAvatar}}\"><template case=\"true\"> <img src=\"{{ltPropAvatar}}\" class=\"lyteNoteMainCommentAvatar\"> </template></template> <lyte-note-editor from-main=\"true\" lt-prop-text-editor=\"{{ltPropTextEditor}}\" lt-prop-edit-mode=\"{{lbind(ltPropEditMode)}}\" lt-prop-buttons=\"{{ltPropButtons}}\" on-trigger=\"{{method('onTrigger')}}\" lt-prop-editor-panel=\"{{ltPropEditorPanel}}\" lt-prop-file-upload=\"{{ltPropFileUpload}}\" lt-prop-editor-animation=\"{{ltPropEditorAnimation}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" close-comment=\"{{method('close_comment')}}\" sanitizer=\"{{sanitizer}}\" lt-prop-editor-props=\"{{ltPropEditorProps}}\" lt-prop-title-yield=\"{{ltPropTitleYield}}\"> <template is=\"registerYield\" yield-name=\"lyte-comment-title\" from-parent=\"\"></template> </lyte-note-editor> </div> </template></template> <div class=\"lyteNoteCommentWrapper\"> <template is=\"for\" items=\"{{ltPropPinnedComments}}\" item=\"item\" index=\"index\"> <lyte-comment lt-prop-pinned-comment=\"true\" id=\"pinned_{{item.id}}\" data-index=\"pin_{{index}}\" class=\"lyteNotePinnedComment\" lt-prop-value=\"{{lbind(item.value)}}\" sanitizer=\"{{sanitizer}}\" lt-prop-title-yield=\"{{ltPropTitleYield}}\" __click=\"{{action('pinned',event,this,item)}}\" __mouseenter=\"{{action('pinEnter',this,event)}}\"> <template is=\"registerYield\" yield-name=\"lyte-pinned-note\" from-parent=\"\" item=\"{{item}}\"></template> <template is=\"registerYield\" yield-name=\"lyte-comment-title\" from-parent=\"\"></template> </lyte-comment> </template><template is=\"for\" items=\"{{ltPropComments}}\" item=\"item\" index=\"index\"> <lyte-comment id=\"{{item.id}}\" class=\"lyteNoteComment {{item.class}}\" lt-prop-image=\"{{item.image}}\" lt-prop-created-time=\"{{item.createdTime}}\" lt-prop-edit=\"{{item.edit}}\" lt-prop-delete=\"{{item.delete}}\" lt-prop-value=\"{{lbind(item.value)}}\" on-time-conversion=\"{{method('timeConversion')}}\" data-index=\"{{concat(index)}}\" lt-prop-reply=\"{{item.reply}}\" lt-prop-header=\"{{item.header}}\" lt-prop-footer=\"{{item.footer}}\" lt-prop-emoji=\"{{item.emoji}}\" lt-prop-edit-mode=\"{{lbind(item.editmode)}}\" lt-prop-buttons=\"{{ltPropButtons}}\" on-trigger=\"{{method('onTrigger')}}\" lt-prop-text-editor=\"{{ltPropTextEditor}}\" lt-prop-editor-panel=\"{{ltPropEditorPanel}}\" lt-prop-file-upload=\"{{ltPropFileUpload}}\" lt-prop-attachments=\"{{item.attachments}}\" lt-prop-style=\"{{item.style}}\" lt-prop-editor-animation=\"{{ltPropEditorAnimation}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" lt-prop-voice-note=\"{{item.voiceNote}}\" lt-prop-pin=\"{{item.pin}}\" sanitizer=\"{{sanitizer}}\" lt-prop-reply-yield=\"{{ltPropReplyYield}}\" lt-prop-editor-props=\"{{ltPropEditorProps}}\" lt-prop-title-yield=\"{{ltPropTitleYield}}\"> <template is=\"registerYield\" yield-name=\"lyte-note-checkin\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-reply-header\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-reply-footer\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-comment-title\" from-parent=\"\"></template> </lyte-comment> </template><template is=\"if\" value=\"{{ltPropPinnedComments.length}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\"#{{id}} .lyteNoteUnpinIcon\" on-menu-click=\"{{method('unpinSelect')}}\" lt-prop-wrapper-class=\"lyteNoteUnpinMenu\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <lyte-menu-item data-value=\"unpin\" class=\"lyteNoteUnpinOption\">{{ltPropText.unpin}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <lyte-hovercard lt-prop-class=\"lyteNotePinTooltipWrapper\" lt-prop-show=\"{{lbind(pinShow)}}\" lt-prop-origin-elem=\"#{{id}} .lyteNotePinOrigin\" on-hovercard-hide=\"{{method('pinHide')}}\" lt-prop-hide-on-click=\"true\" lt-prop-keep-alive=\"true\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <span class=\"lyteNotePinMessage\">{{unescape(pin.message)}}</span> <span class=\"lyteNotePinnedTime\">{{pin.time}}</span> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> <template is=\"if\" value=\"{{ltPropEditorProps.emoji}}\"><template case=\"true\"> <lyte-popover class=\"lyteNoteEmojiPopover\" lt-prop=\"{{stringify(ltPropPopover)}}\" lt-prop-origin-elem=\"#{{id}} .lyte_note_origin_elem\" lt-prop-show=\"{{lbind(popoverShow)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-emoji lt-prop=\"{{stringify(ltPropEmojiProps)}}\" on-emoji-select=\"{{method('emojiselect')}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\"></lyte-emoji> </template> </lyte-popover> </template></template><template is=\"if\" value=\"{{expHandlers(ltPropColors,'!')}}\"><template case=\"true\"> <lyte-colorpicker lt-prop=\"{{stringify(ltPropColorPicker)}}\" lt-prop-origin-element=\".lyte_note_bgswitch_elem\" lt-prop-show=\"{{lbind(bgSwitch)}}\" on-select=\"{{method('colorPickerSelect')}}\" lt-prop-wrapper-class=\"lyteNoteBgSwitcherPopover\"></lyte-colorpicker> </template></template> <lyte-messagebox lt-prop-type=\"info\" lt-prop-show=\"{{lbind(messageShow)}}\" lt-prop-message=\"{{message}}\"></lyte-messagebox> <lyte-menu lt-prop-wrapper-class=\"lyteNoteOptionsMenu\" lt-prop-yield=\"true\" lt-prop-query=\"#{{id}} .lyteNoteCommentMoreOptions\" on-menu-click=\"{{method('optionsMenuSelect')}}\" on-before-open=\"{{method('beforeOpenOptionsMenu')}}\" on-before-close=\"{{method('beforeCloseOptionsMenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <lyte-menu-item data-value=\"delete\" class=\"{{if(isDelete,'lyteNoteDeleteOption','lyteNoteDeleteOption lyteEditorHide')}}\">{{ltPropText.delete}}</lyte-menu-item> <lyte-menu-item data-value=\"pin\" class=\"{{if(isPin,'lyteNotePinOption','lyteNotePinOption lyteEditorHide')}}\">{{if(isPinned,ltPropText.unpin,ltPropText.pin)}}</lyte-menu-item> <lyte-menu-item data-value=\"view\" class=\"{{if(isReact,'lyteNoteViewReactionsOption ','lyteNoteViewReactionsOption lyteEditorHide')}}\">{{ltPropText.viewReactions}}</lyte-menu-item> <lyte-menu-item data-value=\"edit\" class=\"{{if(isEdit,'lyteNoteViewEditOption ','lyteNoteViewEditOption lyteEditorHide')}}\">{{ltPropText.edit}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <template is=\"if\" value=\"{{renderView}}\"><template case=\"true\"> <lyte-reaction-view lt-prop-show=\"{{lbind(showViewArray)}}\" lt-prop-comment=\"{{lbind(currentComment)}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" on-time-conversion=\"{{method('timeConversion')}}\" lt-prop=\"{{ltPropReaction}}\"></lyte-reaction-view> </template></template><template is=\"if\" value=\"{{editAlertRender}}\"><template case=\"true\"> <lyte-alert lt-prop-top=\"0\" lt-prop-yield=\"true\" lt-prop-wrapper-class=\"lyteNoteAlert\" lt-prop-show=\"{{lbind(alertShow)}}\"> <template is=\"registerYield\" yield-name=\"alert\"> <lyte-alert-header>{{ltPropText.editAlertHeader}}</lyte-alert-header> <lyte-alert-content>{{ltPropText.editAlertMessage}}</lyte-alert-content> <lyte-alert-footer> <lyte-button class=\"lyteNoteKeepEditingButton\" __click=\"{{action('keepedit')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{ltPropText.keepEditing}} </template> </lyte-button> <lyte-button class=\"lyteNoteContinueButton\" lt-prop-appearance=\"failure\" __click=\"{{action('continue')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{ltPropText.continue}} </template> </lyte-button> </lyte-alert-footer> </template> </lyte-alert> </template></template><template is=\"if\" value=\"{{ltPropEditorProps.emoji}}\"><template case=\"true\"> <lyte-hovercard lt-prop-class=\"lyteNoteEmojiTooltipWrapper\" lt-prop-show=\"{{lbind(hovercardShow)}}\" lt-prop-origin-elem=\"#{{id}} .lyteNoteHoverOrigin\" on-hovercard-hide=\"{{method('hoverHide')}}\" lt-prop-hide-on-click=\"true\" lt-prop-keep-alive=\"true\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <div class=\"lyteNoteEmojiTooltipTitle\">{{hoverEmoji.name}}</div> <ul class=\"lyteNoteEmojiTooltipNames\"> <template is=\"for\" items=\"{{hoverEmoji.reacted}}\" item=\"item\" index=\"index\"> <li class=\"lyteNoteEmojiIndividualName\">{{item}}</li> </template> </ul> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template><template is=\"if\" value=\"{{ltPropEditorProps.attachment}}\"><template case=\"true\"> <lyte-colorbox lt-prop-yield=\"true\" on-before-open=\"{{method('cboxBeforeOpen')}}\" on-navigate=\"{{method('cboxNavigate')}}\" on-close=\"{{method(&quot;cboxClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"colorBoxYield\"> <div id=\"lyteColorbox\" class=\"lyteColorbox lyteCBox lyteNoteComponentColorbox\"> <div class=\"lyteColorboxFreezeLayer lyteCBoxOverlay\"></div> <div class=\"lyteColorboxWrapper\"> <div class=\"lyteColorboxUtilDiv {{if(isImage,'','lyteCBoxDNImp')}}\"> <span class=\"lyteCBoxZoomOut lyteColorboxZoomOut lyteColorboxDisabled\"></span> <span class=\"lyteCBoxReset lyteColorboxReset lyteColorboxDisabled\"></span> <span class=\"lyteCBoxZoomIn lyteColorboxZoomIn\"></span> </div> <div class=\"lyteColorboxContent lyteCBoxContent\" style=\"position: unset;\"> <span class=\"lyteColorboxLoadingImg\"></span> <template is=\"if\" value=\"{{isNoPreview}}\"><template case=\"true\"> <div class=\"lyteNoteComponentNoPreviewWrap\"> <span class=\"lyteNoteComponentNoPreviewIcon {{previewType}}\"></span> <span class=\"lyteNoteComponentNoPreviewMessage\">{{ltPropText.noPreviewMessage}}</span> </div> </template></template> </div> <div class=\"lyteColorboxHeader\"> <div class=\"lyteNoteComponentFileDetailWrapper\"> <div class=\"lyteColorboxTitle lyteCBoxTitle\" lt-prop-tooltip-title=\"lyteNoteColorBoxTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" __mouseenter=\"{{action('enter',this)}}\"></div> <div class=\"lyteNoteComponentFileDetail\"> <span class=\"lyteNoteComponentFileDate\" lt-prop-title=\"{{previewDate.tooltip}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-class=\"lyteNoteColorboxTooltip\">{{previewDate.display}}</span> <span class=\"lyteNoteComponentFileSize\">{{fileSize}}</span> </div> </div> <div class=\"lyteColorboxDownloadDiv lyteCBoxDownload\"> <span class=\"lyteColorboxDownloadImg\"></span> </div> </div> </div> <div class=\"lyteColorboxCloseIcon lyteCBoxClose\"></div> <div class=\"lyteColorboxIconDiv lyteCBoxPrevious {{prevIconClass}}\"> <div class=\"lyteColorboxPreviousIcon\"></div> </div> <div class=\"lyteColorboxIconDiv lyteCBoxNext {{nextIconClass}}\"> <div class=\"lyteColorboxNextIcon\"></div> </div> <div class=\"lyteColorboxThumbInnerWrapper\"> <template is=\"for\" items=\"{{thumbnails}}\" item=\"item\" index=\"index\"> <div class=\"lyteColorboxThumb {{if(ifEquals(index,thumbIndex),'thumb-on','')}}\" data-thumb-val=\"{{thumbnailValue}}\" __click=\"{{action('thumbClick',index)}}\"> <template is=\"if\" value=\"{{expHandlers(item.ctype,'==',&quot;photo&quot;)}}\"><template case=\"true\"> <img class=\"lyteNoteColorboxImg\" src=\"{{item.src}}\"> </template><template case=\"false\"> <div class=\"lyteCBoxIframeWrap\"> <div class=\"lyteCBoxIframeIcon\"></div> <div class=\"lyteCBoxIframeLabel\">{{item.fileType}}</div> </div> </template></template> </div> </template> </div> </div> </template> </lyte-colorbox> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"registerYield","position":[1,3],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,2]},{"type":"for","position":[3,2],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"registerYield","position":[1,3],"dynamicNodes":[]},{"type":"registerYield","position":[1,5],"dynamicNodes":[]},{"type":"registerYield","position":[1,7],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[6]},{"type":"if","position":[6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[8]},{"type":"componentDynamic","position":[8]},{"type":"attr","position":[10]},{"type":"registerYield","position":[10,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,0]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7]},{"type":"text","position":[1,7,0]},{"type":"componentDynamic","position":[1,7]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[10]},{"type":"attr","position":[12]},{"type":"if","position":[12],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[13]},{"type":"if","position":[13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,0]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[14]},{"type":"if","position":[14],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1,0]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[15]},{"type":"if","position":[15],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,3,3]},{"type":"if","position":[1,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"attr","position":[1,3,5,1,1]},{"type":"attr","position":[1,3,5,1,3,1]},{"type":"text","position":[1,3,5,1,3,1,0]},{"type":"text","position":[1,3,5,1,3,3,0]},{"type":"attr","position":[1,7]},{"type":"attr","position":[1,9]},{"type":"attr","position":[1,11,1]},{"type":"for","position":[1,11,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropComments","ltPropEditMode","ltPropPopover","ltPropColorPicker","ltPropButtons","ltPropTooltipConfig","ltPropAvatar","ltPropTextEditor","ltPropEditorPanel","ltPropColors","ltPropFileUpload","ltPropEditorAnimation","ltPropEmojiProps","ltPropUploadInfoMessage","ltPropEmptyInfoMessage","ltPropText","ltPropScrollDuration","ltPropReaction","ltPropEditAlert","ltPropUserId","ltPropMaxTooltipNames","ltPropPinnedComments","ltPropAddNewComment","ltPropReplyYield","ltPropEditorProps","ltPropTitleYield","popoverShow","bgSwitch","messageShow","message","fileDate","fileTime","fileSize","isImage","isNoPreview","previewType","thumbnails","thumbnailValue","thumbIndex","prevIconClass","nextIconClass","renderView","currentComment","showViewArray","previewDate","editAlertRender","alertShow","hovercardShow","hoverEmoji","isDelete","isPin","isEdit","isReact","isPinned","pinShow","pin","sanitizer","id"],

	
	init : function(){
		var __id = this.$node.id || ( "lyteNote_" +  Date.now() );
		this.data.id = ( this.$node.id = __id );
	},

	data: function() {
			return {

				// comment

				/**
				 * @componentProperty {array} ltPropComments
				 * @default []
				 * @version 4.0.0
				 */

				ltPropComments : Lyte.attr( 'array', { default : [] } ),
				/**
				 * @componentProperty {boolean} ltPropEditMode=false
				 * @version 4.0.0
				 */				
				ltPropEditMode : Lyte.attr( 'boolean', { default : false } ),
				/**
				 * @componentProperty {object} ltPropPopover
				 * @default { "freeze" : false , "wrapperClass" : "lyteNoteEmojiPopover","type" : "box", "showCloseButton" : false}
				 * @component lyte-popover
				 * @version 4.0.0
				 */		
				ltPropPopover : Lyte.attr( 'object', { default : { 
					freeze : false ,
					wrapperClass : 'lyteNoteEmojiPopover',
					type : 'box',
					showCloseButton : false
				} } ),
				/**
				 * @componentProperty {object} ltPropColorPicker
				 * @default {"freeze":false,"wrapperClass":"lyteNoteBgSwitchPopover","type":"box","showCloseButton":false,"noFillButton":true}
				 * @component lyte-colorpicker
				 * @version 4.0.0
				 */					
				ltPropColorPicker : Lyte.attr( 'object', { default : { 
					freeze : false ,
					wrapperClass : 'lyteNoteBgSwitchPopover',
					type : 'box',
					showCloseButton : false,
					noFillButton : true
				} } ),
				/**
				 * @componentProperty {string} ltPropButtons='[{"text":"Cancel","method":"cancel","properties":{"size":"small"}},{"text":"Save","method":"save","properties":{"appearance":"primary","size":"small"}}]'
				 * @version 4.0.0
				 */					

				ltPropButtons : Lyte.attr( 'string', { default : '[{"text":"' + _lyteUiUtils.i18n( 'note', 'cancel', 'Cancel' ) + '","method":"cancel","properties":{"size":"small"}},{"text":"' + _lyteUiUtils.i18n( 'note', 'save', 'Save' ) + '","method":"save","properties":{"appearance":"primary","size":"small"}}]', hideAttr : true } ),
				/**
				 * @componentProperty {object} ltPropTooltipConfig
				 * @default { "position" : "bottom" }
				 * @component lyte-tooltip ltPropTooltipConfig
				 * @version 4.0.0
				 */	

				ltPropTooltipConfig : Lyte.attr( 'object', { default : { position : "bottom" } } ),
				/**
				 * @componentProperty {string} ltPropAvatar=''
				 * @version 4.0.0
				 */	

				ltPropAvatar : Lyte.attr( 'string', { default : '' } ),
				/**
				 * @componentProperty {object} ltPropTextEditor
				 * @default {"wordStyle":{"whiteSpace":"break-spaces"},"placeholder":"Add a note ...","checkbox":{"prevent":true}}
				 * @component lyte-texteditor
				 * @version 4.0.0
				 */	
				ltPropTextEditor : Lyte.attr( 'object', { default : { wordStyle : {
						whiteSpace: "break-spaces"
					},
					placeholder : _lyteUiUtils.i18n( 'note', 'add.note', 'Add a note ' ) + "...",
					checkbox : {
						prevent : true
					}
				} } ),
				/**
				 * @componentProperty {object} ltPropEditorPanel
				 * @default {"tooltipConfig":{"position":"bottom"},"moreIcon":false,"icons":[{"class":"formatting","subIcons":[{"type":"switch","name":"bold","display":"","functionName":"toggleWordClass","arguments":["fontWeight","bold"],"title":"bold","active":false},{"type":"switch","name":"italic","display":"","functionName":"toggleWordClass","arguments":["fontStyle","italic"],"title":"italic","active":false},{"type":"switch","name":"underline","display":"","functionName":"toggleWordClass","arguments":["textDecoration","underline"],"title":"underline","active":false},{"type":"switch","name":"strike","display":"","functionName":"toggleWordClass","arguments":["textDecoration","line-through"],"title":"strike","active":false}]},{"class":"formatting","subIcons":[{"type":"switch","name":"ul","display":"","functionName":"list","selected":"","arguments":["{{selected}}"],"title":"ul","active":false},{"type":"switch","name":"decimal","display":"","functionName":"ordered","selected":"","arguments":["3"],"title":"ol","active":false},{"type":"anchor","name":"anchor","display":"","functionName":"toggleWordClass","arguments":["lyteEditorAnchor"],"title":"anchor","active":false}]},{"class":"colorpicker","subIcons":[{"type":"colorpicker","name":"color","display":"","selected":"black","functionName":"toggleWordClass","arguments":["color","{{selected}}"],"title":"color","active":false},{"type":"colorpicker","name":"bg","display":"","selected":"white","functionName":"toggleWordClass","arguments":["backgroundColor","{{selected}}"],"title":"background","active":false}]},{"class":"clearformatting","subIcons":[{"type":"switch","name":"clear","display":"","functionName":"clearFormat","title":"clear format","arguments":[""],"action":false}]}]}
				 * @component lyte-editorpanel
				 * @version 4.0.0
				 */					

				ltPropEditorPanel : Lyte.attr( 'object', { default : {
					tooltipConfig : {
						position : "bottom"
					},
					moreIcon : false,
					icons : [
								{
									class : "formatting",
									subIcons : [
										{
											type : "switch",
											name : "bold",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'fontWeight', 'bold' ],
											title : _lyteUiUtils.i18n( "bold", "note", "bold" ),
											active : false
										},
										{
											type : "switch",
											name : "italic",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'fontStyle', 'italic' ],
											title : _lyteUiUtils.i18n( "italic", "note", "italic" ),
											active : false
										},
										{
											type : "switch",
											name : "underline",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'textDecoration', 'underline' ],
											title : _lyteUiUtils.i18n( "underline", "note", "underline" ),
											active : false
										},
										{
											type : "switch",
											name : "strike",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'textDecoration', 'line-through' ],
											title : _lyteUiUtils.i18n( "strike", "note", "strike" ),
											active : false
										}
									]
								},
								{
									class : "formatting",
									subIcons : [
										{
											type : "switch",
											name : "ul",
											display : "",
											functionName : "list",
											selected : "",
											arguments : [ '{{selected}}' ],
											title : _lyteUiUtils.i18n( "ul", "note", "ul" ),
											active : false
										},
										{
											type : "switch",
											name : "decimal",
											display : "",
											functionName : "ordered",
											selected : "",
											arguments : [ '3' ],
											title : _lyteUiUtils.i18n( "ol", "note", "ol" ),
											active : false
										},
										{
											type : "anchor",
											name : "anchor",
											display : "",
											functionName : "toggleWordClass",
											arguments : [ 'lyteEditorAnchor' ],
											title : _lyteUiUtils.i18n( "anchor", "note", "anchor" ),
											active : false
										}
									]
								},
								{
									class : 'colorpicker',
									subIcons : [
										{
											type : "colorpicker",
											name : "color",
											display : "",
											selected : "black",
											functionName : "toggleWordClass",
											arguments : [ 'color', '{{selected}}' ],
											title : _lyteUiUtils.i18n( "color", "note", "color" ),
											active : false
										},
										{
											type : "colorpicker",
											name : "bg",
											display : "",
											selected : "white",
											functionName : "toggleWordClass",
											arguments : [ 'backgroundColor', '{{selected}}' ],
											title : _lyteUiUtils.i18n( "background", "note", "background" ),
											active : false
										}
									]
								},
								{
									class : 'clearformatting',
									subIcons : [
										{
											type : "switch",
											name : "clear",
											display : "",
											functionName : "clearFormat",
											title : _lyteUiUtils.i18n( "clear.format", "note", "clear format" ),
											arguments : [ '' ],
											action : false
										}
									]
								}				
							]
				} } ),
				/**
				 * @componentProperty {Object[]} ltPropColors
				 * @default [{"background":"#DDF2D9","border":"1px solid #A9E198"},{"background":"#CEF7F8","border":"1px solid #97E4E3"},{"background":"#F8DDCE","border":"1px solid #F5B388"},{"background":"#F5E5FA","border":"1px solid #E3B2EE"},{"background":"#F8DCEA","border":"1px solid #F39BBF"},{"background":"#fff","border":""}]
				 * @version 4.0.0
				 */	
				ltPropColors : Lyte.attr( 'array', { default : [
					{
					      background: '#DDF2D9',
					      border: '1px solid #A9E198'
					},
					{
					      background: '#CEF7F8',
					      border: '1px solid #97E4E3'
					},
					{
					      background: '#F8DDCE',
					      border: '1px solid #F5B388'
					},
					{
					      background: '#F5E5FA',
					      border: '1px solid #E3B2EE'
					},
					{
					      background: '#F8DCEA',
					      border: '1px solid #F39BBF'
					},
					{
					      background: '#fff',
					      border: ''
					}
				] } ),
				/**
				 * @componentProperty {object} ltPropFileUpload
				 * @default {"filesCount":5,"totalFilesSize":"20MB","thumb":true,"appearance":"Btn","ajax":{"url":"/imageupload"}}
				 * @component lyte-fileupload
				 * @version 4.0.0
				 */					

				ltPropFileUpload : Lyte.attr( 'object', { default : { filesCount : 5, totalFilesSize : '20MB', thumb : true, appearance : "Btn", ajax : { url : "/imageupload" } } } ),
				/**
				 * @componentProperty {string} ltPropEditorAnimation='slide'
				 * @version 4.0.0
				 */	

				ltPropEditorAnimation : Lyte.attr( 'string', { default : 'slide' } ),
				/**
				 * @componentProperty {object} ltPropEmojiProps
				 * @default {}
				 * @component lyte-emoji
				 * @version 4.0.0
				 */
				ltPropEmojiProps : Lyte.attr( 'object', { default : {} } ),
				/**
				 * @componentProperty {string} ltPropUploadInfoMessage
				 * @version 4.0.0
				 */
				ltPropUploadInfoMessage : Lyte.attr( "string" ),
				/**
				 * @componentProperty {string} ltPropEmptyInfoMessage
				 * @version 4.0.0
				 */
				ltPropEmptyInfoMessage : Lyte.attr( "string" ),

				/**
				 * @typedef textObj
				 * @property {string} fileUpload=File upload
				 * @property {string} storage=Storage
				 * @property {string} limit=Limit 5 files
				 * @property {stirng} smileyIcon=smileys
				 * @property {string} attachFiles=Attach files
				 * @property {string} noteBackground=Note background
				 * @property {string} more=More
				 * @property {string} failureMessage=Attachment failed
				 * @property {string} retryText=Retry
				 * @property {string} noPreviewMessage=Sorry, No preview is available for this format
				 * @property {string} thumbnailIndex={{index}} of {{total}}
				 * @property {string} noResult=No results found
				 * @property {string} all=All
				 * @property {string} editAlertHeader=Discard the changes in the current note?
				 * @property {string} editAlertMessage=You will lose any unsaved changes in your note
				 * @property {string} keepEditing=Cancel
				 * @property {string} continue=Discard
				 * @property {string} delete=Delete
				 * @property {string} pin=Pin
				 * @property {string} unpin=Unpin
				 * @property {string} edit=Edit
				 * @property {string} viewReactions=View reactions
				 * @property {string} pinnedBy=Pinned by <span class = \"lyteNotePinnedBy\">{{0}}</span>
				 */

				/**
				 * @componentProperty {textObj} ltPropText
				 * @version 4.0.0
				 */

				ltPropText : Lyte.attr( "object", { default : {
					fileUpload : _lyteUiUtils.i18n( "upload.file", "note", "File upload" ),
					storage : _lyteUiUtils.i18n( "storage", "note", "Storage" ),
					limit : _lyteUiUtils.i18n( "limit.files", "note", "( Limit {{0}} files )" ).replace( '{{0}}', 5 ),
					smileyIcon : _lyteUiUtils.i18n( "smileys", "note", "smileys" ),
					attachFiles : _lyteUiUtils.i18n( "attach.files", "notes", "Attach files" ),
					noteBackground : _lyteUiUtils.i18n( "note.background", "notes", "Note background" ),
					more : _lyteUiUtils.i18n( "more", "note", "More" ),
					failureMessage : _lyteUiUtils.i18n( 'Attachment failed', 'fileupload', "Attachment failed" ), 
					retryText : _lyteUiUtils.i18n( 'retry', "fileupload", "Retry" ),
					noPreviewMessage : _lyteUiUtils.i18n( "no.preview", "note", "Sorry, No preview is available for this format" ),
					thumbnailIndex : _lyteUiUtils.i18n( "of", "note", "{{index}} of {{total}}" ),
					noResult : _lyteUiUtils.i18n( "no.results.found", void 0, "No results found" ),
					all : _lyteUiUtils.i18n( "all", "note", "All" ),
					editAlertHeader : _lyteUiUtils.i18n( 'discard.header', "note", "Discard the changes in current note?" ),
					editAlertMessage : _lyteUiUtils.i18n( "discard.message", "note", "You will lose any unsaved changes in your note" ),
					keepEditing : _lyteUiUtils.i18n( "cancel", "note", "Cancel" ),
					continue : _lyteUiUtils.i18n( "discard", "note", "Discard" ),
					delete : _lyteUiUtils.i18n( "delete", "note", "Delete" ),
					pin : _lyteUiUtils.i18n( "pin", "note", "Pin" ),
					unpin : _lyteUiUtils.i18n( "unpin", "note", "Unpin" ),
					edit : _lyteUiUtils.i18n( "edit", "note", "Edit" ),
					viewReactions : _lyteUiUtils.i18n( "view.reaction", "note", "View reactions" ),
					pinnedBy : _lyteUiUtils.i18n( "pinned.by", "note", "Pinned by <span class = \"lyteNotePinnedBy\">{{0}}</span>" )
				} } ),
				/**
				 * @componentProperty {number} ltPropScrollDuration=400
				 * @version 4.0.0
				 */				

				ltPropScrollDuration : Lyte.attr( 'number', { default : 400 } ),
				/**
				 * @componentProperty {string} ltPropReaction='{}'
				 * @version 4.0.0
				 */	
				ltPropReaction : Lyte.attr( 'string', { default : '{}' } ),
				/**
				 * @componentProperty {boolean} ltPropEditAlert=true
				 * @version 4.0.0
				 */
				ltPropEditAlert : Lyte.attr( 'boolean', { default : true } ),
				/**
				 * @componentProperty {string} ltPropUserId
				 * @version 4.0.0
				 */
				ltPropUserId : Lyte.attr( 'string' ),
				/**
				 * @componentProperty {number} ltPropMaxTooltipNames=6
				 * @version 4.0.0
				 */
				ltPropMaxTooltipNames : Lyte.attr( 'number', { default : 6 } ),
				/**
				 * @componentProperty {array} ltPropPinnedComments
				 * @default []
				 * @version 4.0.0
				 */
				ltPropPinnedComments : Lyte.attr( 'array', { default : [] } ),
				/**
				 * @componentProperty {boolean} ltPropAddNewComment=true
				 * @version 4.0.0
				 */
				ltPropAddNewComment : Lyte.attr( 'boolean', { default : true } ),
				/**
				 * @componentProperty {boolean} ltPropReplyYield=false
				 * @version 4.0.0
				 */
				ltPropReplyYield : Lyte.attr( 'boolean', { default : false } ),
				/**
				 * @typedef editorProps
				 * @property {boolean} background=true
				 * @property {boolean} attachment=true
				 * @property {boolean} emoji=true
				 * @property {boolean} editorpanel=true
				 */

				/**
				 * @componentProperty {editorProps} ltPropEditorProps
				 * @version 4.0.0
				 */
				ltPropEditorProps : Lyte.attr( 'object', { default : {
				        background : true,
				        attachment : true,
				        emoji : true,
				        editorpanel : true
				    } 
				}),
				/**
				 * @componentProperty {boolean} ltPropTitleYield=false
				 * @version 4.0.0
				 */				

				ltPropTitleYield : Lyte.attr( 'boolean', { default : false } ),

				// system

				popoverShow : Lyte.attr( 'boolean', { default : false } ),

				bgSwitch : Lyte.attr( 'boolean', { default : false } ),

				messageShow : Lyte.attr( "boolean", { default : false } ),

				message : Lyte.attr( "string", { default : "" } ),

				fileDate : Lyte.attr( 'string' ),

				fileTime : Lyte.attr( 'string' ),

				fileSize : Lyte.attr( 'string' ),

				isImage : Lyte.attr( 'boolean' ),

				isNoPreview : Lyte.attr( 'boolean' ),

				previewType : Lyte.attr( 'string' ),

				thumbnails : Lyte.attr( 'array', { default : [] } ),

				thumbnailValue : Lyte.attr( 'string' ),

				thumbIndex : Lyte.attr( 'number' ),

				prevIconClass : Lyte.attr( 'string' ),

				nextIconClass : Lyte.attr( 'string' ),

				renderView : Lyte.attr( 'boolean', { default : false } ),

				currentComment : Lyte.attr( 'object', { default : {} } ),

				showViewArray : Lyte.attr( 'boolean', { default : false } ),

				previewDate : Lyte.attr( 'object', { default : {} } ),

				editAlertRender : Lyte.attr( 'boolean' ),

				alertShow : Lyte.attr( 'boolean' ),

				hovercardShow : Lyte.attr( 'boolean', { default : false }),

				hoverEmoji : Lyte.attr( 'object', { default : {} } ),

				isDelete : Lyte.attr( 'boolean' ),
				isPin : Lyte.attr( 'boolean' ),
				isEdit : Lyte.attr( 'boolean' ),
				isReact : Lyte.attr( 'boolean' ),
				isPinned : Lyte.attr( 'boolean' ),

				pinShow : Lyte.attr( 'boolean' ),
				pin : Lyte.attr( 'object' ),

				sanitizer : Lyte.attr( 'object', {
					default : {
						attr : Lyte.Security.createSanitizer( { ADD_URI_SAFE_ATTR : [ "style" ], ALLOWED_STYLE : "ALL", STYLE_VALIDATION : false })
					}
				}),

				id : Lyte.attr( 'string' )
		}
	},

	clear_cbox : function(){
		delete this.__comment;
		delete this.__index;
		this.setData( 'thumbnails', [] );
	},

	clear_alert : function(){
		delete this.__promeditor;
		delete this.__promcomment;
		delete this.__executeArg;
	},

	didDestroy : function(){
		this.clear_cbox();
		this.clear_alert();

		clearTimeout( this.__pintime );
	},

	comments_obs : function( arg ){
		if( arg.insertedItems ){
			var index = arg.index,
			wrapper = $L( this.$node ).children( '.lyteNoteCommentWrapper' ),
			comment = wrapper.children().get( this.data.ltPropPinnedComments.length + index ),
			_top = this.get_scrolltop( wrapper.get( 0 ), comment );

			wrapper.scrollTo( { top : _top }, {
				duration : this.data.ltPropScrollDuration,
				onAfter : function(){
					$L( comment ).addClass( "lyteNoteNewComment" );
				}.bind( this )	
			} );

		}
	}.observes( 'ltPropComments.[]' ),

	didConnect : function(){
		this.$node.removeAllFiles = this.removeAllFiles.bind( this );

		this.$node.getBackground = function( editor ){
			var note_comp = $L( editor ).closest( 'lyte-note-editor' ).get( 0 ),
			obj = {};

			[ 'background', 'border' ].forEach( function( item ){
				obj[ item ] = note_comp.ltProp( item );
			});

			return obj;
		};

		this.$node.setBackground = function( editor, obj ){
			$L( editor ).closest( 'lyte-note-editor' ).get( 0 ).ltProp( obj );
		};

		this.$node.viewReactions = this.viewReactions.bind( this );
	},

	viewReactions : function( comment_obj ){
		this.setData( 'renderView', true );
		this.setData( 'currentComment', comment_obj );
		this.setData( 'showViewArray', true );
	},	

	get_element : function( selector ){
		if( !selector || selector.constructor == String ){
			return $L( selector ? ( '#' + selector ) : ( ".lyteNoteMainComment" ), this.$node );
		}
		return $L( selector ).closest( '.lyteNoteEditorWrapper' );
	},

	removeAllFiles : function( editor ){

		if( this.data.ltPropEditorProps.attachment ){
			var file = this.get_element( editor ).find( 'lyte-fileupload' ).get( 0 ),
			queueList = file.component.data.queueList,

			files = queueList.map( function( item ){
				return item.id;
			});

			files.forEach( function( item ){
				file.removeUpload( item );
			});
		}
	},

	setup_file_data : function( comment, index ){
		var attachments = comment.ltProp( 'attachments' ),
		 current = attachments[ index ],
		 time = comment.ltProp( 'createdTime' ),
		 ctype = current.ctype,
		 arrow_class = 'lyteColorboxHideVisibility';

		 if( time ){
		 	 this.setData( 'previewDate', this.timeConversion( time, 'colorbox' ) );
		 }

		 this.setData( 'fileSize', _lyteUiUtils.lyteUiFileSize( current.size, '', 1 ) );

		 this.setData( 'isImage', ctype == 'photo' );

		 this.setData( 'previewType', $L( ctype.split( '/' ) ).get( -1 ) );
		 this.setData( 'isNoPreview', /^custom/i.test( ctype ) );

		 this.setData( 'thumbnailValue', this.get_thumb_index( index, attachments ) );

		 this.setData( 'thumbIndex', index );

		 this.setData( 'prevIconClass', index == 0 ? arrow_class : '' );
		 this.setData( 'nextIconClass', ++index == attachments.length ? arrow_class : '' );
	},

	get_thumb_index : function( index, attachments ){
		return this.data.ltPropText.thumbnailIndex.replace( "{{index}}", ++index ).replace( "{{total}}", attachments.length );
	},

	timeConversion : function(){
		var name = 'onTimeConversion';
		if( this.getMethods( name ) ){
			var arg = Array.from( arguments );
			arg.unshift( name );
			return this.executeMethod.apply( this, arg );
		}
	},

	construct_react : function( obj, id, count ){
		var arr = [],
		_reacted = obj.reacted,
		_index,
		i = 0;

		if( obj.selected ){
			_reacted.every( function( item, index ){
				if( item.id == id ){
					arr.push( 'you' /*item.name*/ );
					_index = index;
					return false;
				}
				return true;
			});
			count--;
		}

		while( true ){
			if( i == _index && ++i ){
				continue;
			}

			if( _reacted[ i ] == void 0 ){
				break;
			}

			arr.push( _reacted[ i++ ].name );

			if( arr.length == count ){
				arr.push( '+' + ( _reacted.length - count ) + 'more...' );
				break;
			}
		}
		return arr;
	},

	methods : {

		pinHide : function(){
			$L( '.lyteNotePinOrigin', this.$node ).removeClass( 'lyteNotePinOrigin' );
			this.setData( 'pin', {} );
		},

		unpinSelect : function(){
			var cb = 'onCommentUnpin',
			args = arguments;

			if( this.getMethods( cb ) ){
				var elem = args[ 3 ],
				comment = this.$node.querySelector( 'lyte-comment#' + elem.parentNode.id );
				return this.executeMethod( cb, args[ 1 ], elem, comment, this.get_comment_index( comment ) );
			}
		},

		optionsMenuSelect : function( type, evt, menu, element ){
			var cb,
			data = this.data;

			switch( type ){
				case 'view' : {
					if( data.isReact ){
						cb = 'onViewReaction';
					}
				}
				break;
				case 'delete' : {
					if( data.isDelete ){
						cb = "onCommentDelete";
					}
				}
				break;
				case 'pin' : {
					if( data.isPin ){
						if( data.isPinned ){
							cb = "onCommentUnpin";
						} else{
							cb = "onCommentPin";
						}
					}
				}
				break;
				case 'edit' : {
					var args = [ 'onCommentEdit', evt, element,  element.closest( 'lyte-comment' ) ];
					
					if( this.close_all_comments() || this.make_main_draft() ){
						this.__executeArg = args;
						return;
					}
					return this.execute( Array.from( args ) );
				}
				break;
			}

			if( cb && this.getMethods( cb ) ){
				var comment = element.closest( 'lyte-comment' );
				return this.executeMethod( cb, evt, element, comment, this.get_comment_index( comment ) );
			}
		},

		beforeCloseOptionsMenu : function( menu ){
			$L( menu.element ).closest( 'lyte-comment' ).removeClass( 'lyteNoteOptionsMenuOpened' );
		},

		beforeOpenOptionsMenu : function(){
			var comment = arguments[ 2 ].closest( 'lyte-comment' ),
			data = comment.component.data;

			$L( comment ).addClass( 'lyteNoteOptionsMenuOpened' );

			this.setData({
				isDelete : 	data.ltPropDelete,
				isPin : data.ltPropPin,
				isEdit : data.ltPropEdit,
				isReact : data.isReacted,
				isPinned : this.data.ltPropPinnedComments.findIndex( function( item ){
					return item.id == comment.id;
				}) != -1
			});
		},

		hoverHide : function(){
			$L( '.lyteNoteHoverOrigin', this.$node ).removeClass( 'lyteNoteHoverOrigin' );
			this.setData( 'hoverEmoji', {} );
		},

		hovercard_show : function( evt, element, comment, comment_data ){
			var $element = $L( element ), 
			index = Number( $element.parent().attr( 'data-index' ) ),
			data = comment_data.sectionArray[ comment_data.sectionIndex ],
			current_emoji = data.emoji[ index ],
			count = this.data.ltPropMaxTooltipNames,
			id = this.data.ltPropUserId;

			$element.addClass( 'lyteNoteHoverOrigin' );

			this.setData( 'hoverEmoji', {
				name : current_emoji.name,
				reacted : this.construct_react( current_emoji, id, count )
			});

			this.setData( 'hovercardShow', true );
		},

		close_comment : function(){
			return this.close_all_comments();
		},

		cboxClose : function(){
			this.clear_cbox();
		},	

		cboxBeforeOpen : function(){
			this.setup_file_data( this.__comment, this.__index );
		},

		cboxNavigate : function(){
			this.setup_file_data( this.__comment, arguments[ 2 ] - 1 );
		},

		timeConversion : function(){
			return this.timeConversion.apply( this, arguments );
		},

		emojiselect : function( obj ){
			var origin = $L( '.lyte_note_origin_elem', this.$node );

			if( origin.hasClass( 'lyteNoteSmileyIcon' ) ){
				var editor = origin.closest( '.lyteNoteEditorWrapper' ).find( 'lyte-texteditor' ).get( 0 );
				
				editor.insertHTML( obj.encode );
				editor.focus();

			} else {
				var callback = 'onEmojiSelect';
				if( this.getMethods( callback ) ){
					this.executeMethod( callback, obj, this.get_comment_index( $L( '.lyte_note_origin_elem' ).closest( 'lyte-comment' ).get( 0 ) ) );
				}
			}
			this.setData( 'popoverShow', false );
		},

		onTrigger : function( value, position, editor ){
			if( this.getMethods( 'onTrigger' ) ){
				return this.executeMethod( 'onTrigger', value, position, editor );
			}
		},

		colorPickerSelect : function(){
			$L( '.lyte_note_bgswitch_elem', this.$node ).closest( 'lyte-note-editor' ).get( 0 ).ltProp( 'background', arguments[ 1 ].hex );
			this.setData( 'bgSwitch', false );
		}
	},

	emoji_obs : function(){
		if( !this.data.popoverShow ){
			$L( $L( 'lyte-popover.lyteNoteEmojiPopover', this.$node ).get( 0 ).component.actualModalDiv ).find( 'lyte-emoji' ).get( 0 ).resetValue();
		}
	}.observes( 'popoverShow' ),

	get_comment_index : function( comment, prev ){

		var index = this.get_comment_index_fork( comment, prev ),
		format = this.get_correct_data( index, this.data.ltPropComments ); 

		index.sectionArray = format.array;
		index.sectionIndex = format.index;

		return index;
	},

	get_comment_index_fork : function( comment, prev ){
		var jobj = $L( comment ),
		obj = {
			node : comment,
			index : parseInt( jobj.attr( 'data-index' ) )
		},
		parent_comment = jobj.parent().closest( 'lyte-comment' ).get( 0 );

		if( prev ){
			obj.child = prev;
		}

		if( parent_comment ){
			return this.get_comment_index_fork( parent_comment, obj );
		}
		return obj;
	},

	find_index : function( array, key, value ){
		var index = -1;

		array.every( function( item, _index ){

			if( item[ key ] == value ){
				index = _index;
			}

			return index == -1;
		});

		return index;
	},

	preview_click : function(){ 
		var arg = arguments,
		comment = arg[ 3 ],
		image = $L( arg[ 2 ] ),
		index = Number( image.attr( "data-index" ) ),
		attachments = comment.ltProp( "attachments" ),
		colorbox = $L( this.$node ).children().get( -1 );

		this.__comment = comment;
		this.__index = index;

		this.setData( 'thumbnails', attachments );

		colorbox.ltProp( "selectors", [ "." + comment.id +"_preview" ] );

		return false;
	},

	get_files : function( editor ){
		if( this.data.ltPropEditorProps.attachment ){
			var file = $L( editor ).closest( '.lyteNoteEditorWrapper' ).find( 'lyte-fileupload' ).get( 0 ),
			queueList = file.component.data.queueList,
			fn = function( name ){
				return queueList.filter( function( item ){
					return item.status == name;
				});
			};

			return[ fn( "success" ), fn( "uploading" ), fn( "failure" ) ]; 
		}
		return [ [], [], [] ];
	},

	/*
		Recursive function for finding exact data for comment / reply

		data format will be 

		{
			node : comment / reply element,
			index : comment / reply index,
			child : {
				// same set. inner most child is the comment to be altered
			}
		}
	*/

	get_correct_data : function( data, array ){
		if( data.child ){
			return this.get_correct_data( data.child, array[ data.index ].reply );
		} 
		return {
			array : array,
			index : data.index
		};
	},

	make_main_draft : function(){
		if( this.data.ltPropEditMode ){
			var editor_comp = $L( 'lyte-note-editor', this.$node ).eq( 0 ),
			text_editor = editor_comp.find( 'lyte-texteditor' ).get( 0 ),
			files = this.get_files( text_editor ),
			isEmpty = text_editor.getData( 'showPlaceholder' ),
			is_zero = function( arr ){
				return arr.length == 0;
			},
			_this = this,
			draft_need = !( isEmpty && is_zero( files[ 0 ] ) && is_zero( files[ 1 ] ) && is_zero( files[ 2 ] ) ),
			fn = function(){
				_this.$node.ltProp( 'editMode', false ); 
			};

			if( draft_need ){
				// if( _this.data.ltPropEditAlert ){
				// 	this.render_edit_alert( text_editor );
				// 	return true;
				// } else {
					editor_comp.get( 0 ).setData( 'draftMode', true );
					fn();
				// }
			} else {
				fn();
			}
		}
	},

	render_edit_alert : function( editor ){
		this.setData( 'editAlertRender', true );
		this.setData( 'alertShow', true );
		this.__promeditor = editor;
	},

	close_all_comments : function( arg ){
		var _this = this,
		ret;

		( arg || _this.data.ltPropComments ).every( function( item ){
			if( item.editmode ){
				var comment = $L( '#' + item.id, _this.$node ),
				editor = comment.find( 'lyte-texteditor' ).get( 0 );

				if( _this.data.ltPropEditAlert ){ 
					_this.__promcomment = comment;
					_this.render_edit_alert( editor );
					ret = true;
				} else {
					_this.call_cancel( editor, comment );
				}
			}
			if( _this.close_all_comments( item.reply || [] ) ){
				ret = true;
			}
			return !ret;
		}); 

		return ret;
	},

	call_cancel : function( editor, comment, name ){
		return this.execute( [ name || 'onCommentCancel', editor, this.get_comment_index( comment ) ].concat( this.get_files( editor ) ) );
	},

	get_scrolltop : function( wrapper, comment ){
		var sH = wrapper.scrollHeight,
		oH = wrapper.offsetHeight,
		oT = comment.offsetTop,
		elems = Array.from( wrapper.querySelectorAll( '.lyteNotePinnedComment' ) ),
		off = 0,
		max_scroll = sH - oH;

		elems.forEach( function( item ){
			off += item.offsetHeight;
		});

		return Math.min( oT - off - 10, max_scroll );
	},

	actions : {

		pinEnter : function( _this, evt ){
			var fn = function(){
				
				var index = Number( $L( _this ).addClass( 'lyteNotePinOrigin' ).attr( 'data-index' ).replace( 'pin_', '' ) ),
				obj = this.data.ltPropPinnedComments[ index ].pinnedBy,
				time = ( this.timeConversion( obj.pinnedTime, 'pin' ) || { display : "" } ).display,
				cb = "onTimeConversion";

				this.setData( 'pin',{
					message : this.data.ltPropText.pinnedBy.replace( "{{0}}", obj.name ),
					time : time
				});
				this.setData( 'pinShow', true );
			}.bind( this );
			
			if( this.data.pinShow ){
				this.__pintime = setTimeout( fn, 500 );
			} else {
				fn();
			}
		},

		pinned : function( evt, fake_comment, data ){
			var comment = $L( 'lyte-comment#' + data.id, this.$node ).get( 0 );

			if( $L( evt.target ).hasClass( 'lyteNoteUnpinIcon' ) ){
				return;
			}

			$L.fastdom.measure( function(){
				var wrapper = $L( this.$node ).children( '.lyteNoteCommentWrapper' ),
				cls_name = "lyteNotePinnedCommentClick",
				fn = function( _evt ){
					$L( _evt.currentTarget ).removeClass( cls_name ).off( {
						animationend : fn,
						transitionend : fn	
					});
				};
				wrapper.scrollTo( { top : this.get_scrolltop( wrapper.get( 0 ), comment ) }, {
					duration : this.data.ltPropScrollDuration,
					onAfter : function(){
						$L( comment ).addClass( cls_name ).on( {
							animationend : fn,
							transitionend : fn	
						});
					}.bind( this )	
				});
			}.bind( this ));
		},

		keepedit : function(){
			this.setData( 'alertShow', false );
			this.__promeditor.focus();
			this.clear_alert();
		},

		continue : function(){
			this.setData( 'alertShow', false );
			
			var exe_arg = this.__executeArg,
			comment = this.__promcomment,
			editor = this.__promeditor;

			if( comment ){
				this.call_cancel( editor, comment );
			}

			if( exe_arg ){
				if( !comment ){
					this.execute( [ 'onMainCommentCancel', editor, this.$node ].concat( this.get_files( editor ) ) )
				}
				this.execute( Array.from( exe_arg ) );
			} else {
				this.$node.ltProp( 'editMode', true );
			}
			this.clear_alert();
		},

		enter : function( _this ){
			var $this = $L( _this );

			$this.attr( 'lt-prop-title', _this.scrollWidth > _this.offsetWidth ? $this.text() : '' );
		},

		thumbClick : function( index ){
			$L( this.$node ).children().get( -1 ).open( index + 1 );
			this.setup_file_data( this.__comment, index );
		},

		save : function( editor ){
			return this.execute( [ 'onMainCommentSave', editor, this.$node ].concat( this.get_files( editor ) ) );
		},

		cancel : function( editor ){
			return this.execute( [ 'onMainCommentCancel', editor, this.$node ].concat( this.get_files( editor ) ) )
		},

		other : function( editor, evt ){
			return this.execute( [ 'onButtonClick', editor, evt, this.$node ].concat( this.get_files( editor ) ) )
		},

		common_action : function( name ){

			switch( name ){
				case 'onPreviewClick' : {
					return this.preview_click.apply( this, arguments );
				}
				break;
				// case 'onCommentEdit' : {
				// 	if( this.close_all_comments() || this.make_main_draft() ){
				// 		this.__executeArg = arguments;
				// 		return;
				// 	}
				// }
				default : {
					return this.execute( Array.from( arguments ) );
				}
			}
		},

		update_comment : function( editor, comment ){
			return this.call_cancel( editor, comment, 'onCommentSave' );
		},

		cancel_comment : function(){
			return this.call_cancel.apply( this, arguments );
		},

		show_emoji : function( elem ){
			this.show_emoji( elem );
		},

		bg_switch : function( editor ){
			var colors = this.data.ltPropColors,
			$editor = $L( editor ),
			elem = $editor.parent().children( '.lyteNoteBgSwitcher' );

			if( colors ){
				var note = $editor.closest( 'lyte-note-editor' ).get( 0 ),
				_color = note.ltProp( 'background' ),
				index = this.find_index( colors, 'background', _color ),
				final = colors[ ( index + 1 ) % colors.length ];

				[ 'background', 'border' ].forEach( function( item ){
					note.ltProp( item, final[ item ] );
				});

			} else {
				var __classname = 'lyte_note_bgswitch_elem';

				$L( '.' + __classname, this.$node ).removeClass( __classname );
				elem.addClass( __classname );

				this.setData( 'bgSwitch', true );
			}
			return false;
		},

		show_smiley : function( editor ){
			this.show_emoji( $L( editor.parentNode.parentNode ).find( '.lyteNoteSmileyIcon' ).get( 0 ) );
			return false;
		},

		file_before_send : function(){
			return this.execute_file_method( arguments, 3, 'onBeforeSend' );
		},

		file_success : function(){
			return this.execute_file_method( arguments, 2, 'onSuccess' );
		},

		file_failure : function(){
			return this.execute_file_method( arguments, 2, 'onFailure' );
		},

		file_remove : function(){
			return this.execute_file_method( arguments, 2, 'onRemove' );
		},

		file_before_remove : function(){
			return this.execute_file_method( arguments, 2, 'onBeforeRemove' );
		},

		on_editor_paste : function(){
			return this.execute_file_method( arguments, 2, 'onEditorPaste' );
		}
	},

	execute_file_method : function( args, index, name ){

		var args = Array.from( args ),
		comment = $L( args[ index ] ).closest( 'lyte-comment', this.$node ).get( 0 );

		if( comment ){
			args.push( this.get_comment_index( comment ) );
		}

		args.unshift( name );

		if( this.getMethods( name ) ){
			this.executeMethod.apply( this, args );
		}
		return false;
	},

	show_emoji : function( elem ){
		if( this.data.popoverShow ){
			return;
		}

		var __classname = 'lyte_note_origin_elem';

		$L( '.' + __classname ).removeClass( __classname );
		$L( elem ).addClass( __classname );
		this.setData( 'popoverShow', true );
	},

	execute : function( __arg ){
		var name = __arg.shift();

		if( /commentsave/i.test( name ) ){
			if( this.should_prevent.apply( this, __arg ) ){
				return;
			}
		}

		return this.execute_file_method( __arg, 2, name );
	},

	should_prevent : function( editor, notecomp, success, uploading ){
		var html = editor.getHTML(),
		message;

		if( !html.replace( '<br>', '' ) ){
			message = 'Empty';
		}

		if( uploading.length ){
			message = 'Upload';
		}

		if( message ){
			var value = this.data[ 'ltProp' + message + 'InfoMessage' ];

			if( value ){
				this.setData( 'message', value );
				this.setData( 'messageShow', true );
				return 1;
			}
		}
	}
});


/**
 * @syntax nonYield
 * <lyte-notecomp lt-prop-comments = []></lyte-notecomp>
 */


 /**
  * @syntax Pinned comment yield
  * @attribute ltPropPinnedComments
  * <lyte-notecomp lt-prop-comments = []>
  *   <template is = "registerYield" yield-name = "lyte-pinned-note">
  *       <div class="notePinMessage"></div>
  *   </template>
  * </lyte-notecomp>
  */ 

 /**
  * @syntax Checkin yield
  * @attribute ltPropCheckIn=true
  * <lyte-notecomp lt-prop-comments = []>
  *   <template is = "registerYield" yield-name = "lyte-note-checkin">
  *        your content
  *   </template>
  * </lyte-notecomp>
  */ 

 /**
  * @syntax Reply header yield
  * @attribute ltPropReplyYield=true
  * <lyte-notecomp lt-prop-comments = []>
  *   <template is = "registerYield" yield-name = "lyte-reply-header">
  *        your content
  *   </template>
  * </lyte-notecomp>
  */

 /**
  * @syntax Reply footer yield
  * @attribute ltPropReplyYield=true
  * <lyte-notecomp lt-prop-comments = []>
  *   <template is = "registerYield" yield-name = "lyte-reply-footer">
  *        your content
  *   </template>
  * </lyte-notecomp>
  */ 

 /**
  * @syntax Comment title yield
  * @attribute ltPropTitleYield
  * <lyte-notecomp lt-prop-comments = []>
  *   <template is = "registerYield" yield-name = "lyte-comment-title">
  *        your content
  *   </template>
  * </lyte-notecomp>
  */ 
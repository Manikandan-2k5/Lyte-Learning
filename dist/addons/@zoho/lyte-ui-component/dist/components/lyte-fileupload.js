/**
 * Renders a fileupload
 * @component lyte-fileupload
 * @dependency lyte-text, lyte-tooltip
 * @version 2.2.9
 * @utility upload,removeUpload
 * @methods beforeRender,afterRender,onBeforeAdd,onAdd,onBeforeRemove,onRemove,onBeforeSend,onSend,onFileSuccess,onFileRemove,onRequestSuccess,onRequestFailure,onSuccess,onFailure,
 * onProgress,onRetry,onReject,onChunkSuccess,onChunkError,onBeforeOpen,onDragEnter,onDragOver,onDragLeave,onBeforeDrop,onDrop,onBeforePaste,onPaste
 */
Lyte.Component.register("lyte-fileupload", {
_template:"<template tag-name=\"lyte-fileupload\"> <input class=\"fileuploadInput {{ltPropClass}}\" id=\"{{ltPropId}}\" type=\"file\" name=\"{{ltPropName}}\" multiple=\"{{ltPropMultiple}}\" accept=\"{{ltPropAccept}}\" __change=\"{{action('change',event,this)}}\"> <div tabindex=\"{{ltPropTabindex}}\" class=\"fileUploadWrapper {{fileClass}} {{if(ltPropMultiple,'multiFileupload','singleFileUpload')}} lyteFileUpd{{ltPropAppearance}}Type {{if(ltPropDisabled,'lyteFileUpdDisabled')}} {{maxFileClass}}\" style=\"outline: none;\" aria-labelledby=\"{{randomAriaId}}\" __dragenter=\"{{action('drag',event)}}\" __dragleave=\"{{action('drag',event)}}\" __dragover=\"{{action('drag',event)}}\" __drop=\"{{action('drop',event)}}\" __click=\"{{action('click',event)}}\" __paste=\"{{action('paste',event)}}\" __keydown=\"{{action('keydown',event)}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"file\" queue-list=\"{{queueList}}\" predefined-list=\"{{predefinedList}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{ltPropMultiple}}\"><template case=\"true\"> <lyte-file-select-area> <lyte-file-message class=\"lyteFileUpdMsgWrap\"> <span class=\"lyteFileUpdMsg\">{{lyteUiI18n(ltPropMessage,\"fileupload\")}}</span> </lyte-file-message> </lyte-file-select-area> <div class=\"lyteFileUpdList\"> <template is=\"for\" items=\"{{predefinedList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{lyteUiImageFile(item)}}\"><template case=\"true\"> <img class=\"lyteFileUpdThumb\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <lyte-text class=\"lyteFileUpdFileName\" lt-prop-value=\"{{item.name}}\"></lyte-text> <span class=\"lyteFileUpdFileSize\">( {{lyteUiFileSize(item.size,ltPropFileUnit,ltPropDigits)}} )</span> <lyte-file-close data-value=\"{{item.id}}\" role=\"button\" aria-label=\"{{ariaCloseLabel}} selected {{item.name}} file\" class=\"{{item.status}}\"></lyte-file-close> </div> </template> <template is=\"for\" items=\"{{queueList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile {{concat('lyteFile',lyteUiCapitalizeName(item.status))}}\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{lyteUiImageFile(item)}}\"><template case=\"true\"> <img class=\"lyteFileUpdThumb\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <lyte-text class=\"lyteFileUpdFileName\" lt-prop-value=\"{{item.name}}\"></lyte-text> <span class=\"lyteFileUpdFileSize\">( {{lyteUiFileSize(item.size,ltPropFileUnit,ltPropDigits)}} )</span> <template is=\"if\" value=\"{{expHandlers(item.percentage,'!=',undefined)}}\"><template case=\"true\"> <div class=\"lyteFileUpdFileStatus\" data-completed=\"{{item.percentage}}\"> <div class=\"lyteFileUpdProgressBar {{item.status}}\"> <div class=\"lyteFileUpdProgressFill\" style=\"width: {{item.percentage}}%\"></div> </div> </div> </template></template><template is=\"if\" value=\"{{expHandlers(item.status,'==',&quot;error&quot;)}}\"><template case=\"true\"> <lyte-file-retry data-value=\"{{item.id}}\" role=\"button\"> <span class=\"lyteFileUpdFailMsg\">{{lyteUiI18n(ltPropFailureMessage,\"fileupload\")}}</span> <template is=\"if\" value=\"{{expHandlers(ltPropUploadMultiple,'!')}}\"><template case=\"true\"> <span class=\"lyteFileUpdRetryMsg\">{{lyteUiI18n(ltPropRetryText,\"fileupload\")}}</span> </template></template> </lyte-file-retry> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropUploadMultiple,'!'),'||',expHandlers(expHandlers(expHandlers(item.status,'!'),'||',expHandlers(item.status,'==',&quot;error&quot;)),'||',expHandlers(item.status,'==',&quot;success&quot;)))}}\"><template case=\"true\"> <lyte-file-close aria-level=\"2\" tabindex=\"0\" aria-label=\"{{ariaCloseLabel}} selected {{item.name}} file\" role=\"button\" data-value=\"{{item.id}}\" class=\"{{item.status}}\"></lyte-file-close> </template></template> </div> </template> </div> </template><template case=\"false\"> <lyte-file-select-area> <lyte-file-message class=\"lyteFileUpdMsgWrap {{if(expHandlers(queueList.length,'||',predefinedList.length),'lyteHide','')}}\"> <span class=\"lyteFileUpdMsg\"> {{lyteUiI18n(ltPropMessage,\"fileupload\")}} </span> </lyte-file-message> <div class=\"lyteFileUpdList\" tabindex=\"0\" aria-level=\"2\" aria-label=\"SelectedFile:{{ariaSelectedFiles}}\"> <template is=\"for\" items=\"{{predefinedList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{lyteUiImageFile(item)}}\"><template case=\"true\"> <img class=\"lyteFileUpdThumb\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <lyte-text class=\"lyteFileUpdFileName\" lt-prop-value=\"{{item.name}}\"></lyte-text> <span class=\"lyteFileUpdFileSize\">( {{lyteUiFileSize(item.size,ltPropFileUnit,ltPropDigits)}} )</span> <lyte-file-close data-value=\"{{item.id}}\" class=\"{{item.status}}\" aria-label=\"{{ariaCloseLabel}} selected {{item.name}} file\" role=\"button\"> </lyte-file-close> </div> </template> <template is=\"for\" items=\"{{queueList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile {{concat('lyteFile',lyteUiCapitalizeName(item.status))}}\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{lyteUiImageFile(item)}}\"><template case=\"true\"> <img class=\"lyteFileUpdThumb\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <lyte-text class=\"lyteFileUpdFileName\" lt-prop-value=\"{{item.name}}\"></lyte-text> <span class=\"lyteFileUpdFileSize\">( {{lyteUiFileSize(item.size,ltPropFileUnit,ltPropDigits)}} )</span> <template is=\"if\" value=\"{{expHandlers(item.percentage,'!=',undefined)}}\"><template case=\"true\"> <div class=\"lyteFileUpdFileStatus\" data-completed=\"{{item.percentage}}\"> <div class=\"lyteFileUpdProgressBar {{item.status}}\"> <div class=\"lyteFileUpdProgressFill\" style=\"width: {{item.percentage}}%\"></div> </div> </div> </template></template><template is=\"if\" value=\"{{expHandlers(item.status,'==',&quot;error&quot;)}}\"><template case=\"true\"> <lyte-file-retry data-value=\"{{item.id}}\" role=\"button\"> <span class=\"lyteFileUpdFailMsg\">{{lyteUiI18n(ltPropFailureMessage,\"fileupload\")}}</span> <span class=\"lyteFileUpdRetryMsg\"> {{lyteUiI18n(ltPropRetryText,\"fileupload\")}} </span> </lyte-file-retry> </template></template> <lyte-file-close data-value=\"{{item.id}}\" tabindex=\"0\" class=\"{{item.status}}\" aria-label=\"{{ariaCloseLabel}} selected {{item.name}} file\" role=\"button\"> </lyte-file-close> </div> </template> </div> </lyte-file-select-area> </template></template> </template></template> </div> <template is=\"if\" value=\"{{ltPropAria}}\"><template case=\"true\"><span id=\"{{randomAriaId}}\" style=\"display: none;\"> SelectedFiles:{{ariaSelectedFiles}} </span></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,1]},{"type":"attr","position":[1,7]},{"type":"componentDynamic","position":[1,7]}]},{"type":"attr","position":[3,3]},{"type":"for","position":[3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","item.percentage","'%'"]}}}}]}},"default":{}},{"type":"attr","position":[1,8]},{"type":"if","position":[1,8],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,10]},{"type":"if","position":[1,10],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,1]},{"type":"attr","position":[1,7]},{"type":"componentDynamic","position":[1,7]}]},{"type":"attr","position":[1,3,3]},{"type":"for","position":[1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","item.percentage","'%'"]}}}}]}},"default":{}},{"type":"attr","position":[1,8]},{"type":"if","position":[1,8],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,10]},{"type":"componentDynamic","position":[1,10]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}}],
_observedAttributes :["ltPropName","ltPropMultiple","ltPropAccept","ltPropId","ltPropClass","ltPropAppearance","ltPropDisabled","ltPropYield","ltPropFileLimit","ltPropMinimumFileSize","ltPropTotalFilesSize","ltPropParallel","ltPropAutoUpload","ltPropTriggerUpload","ltPropParamName","ltPropThumb","ltPropTabindex","ltPropRetry","ltPropFileUnit","ltPropDigits","ltPropMessage","ltPropFailureMessage","ltPropRetryText","ltPropFiles","ltPropFolder","ltPropChunk","ltPropChunkSize","ltPropParallelChunkUpload","ltPropParallelChunkCount","ltPropChunkRetry","ltPropUploadMultiple","ltPropUploadMultipleCount","ltPropAjax","ltPropAllowReplace","ltPropFilesCount","ltPropAriaAttributes","ltPropReset","ltPropResetFileValue","ltPropAria","queueList","predefinedList","currentUpload","chunkUpload","fileClass","chunkCount","abort","lxhrs","uploadedFiles","manualUpdFiles","uploadMultipleRetry","retryFiles","retry","manualUpload","totalFilesSize","curTotFilesSize","ariaCloseLabel","commonAriaLabel","ariaSelectedFiles","randomAriaId"],

	init : function(){
		this.getMethods( 'beforeRender' ) && this.executeMethod( 'beforeRender', this.$node )
	},

	didConnect : function(){
		this._file = this.$node.querySelector( 'input.fileuploadInput' );
		this.$node.upload = this.processqueue.bind( this );
		this.$node.removeUpload = function( id ){
			if( id ) {
				this.removeFrmUpload( id, 'queueList' );
			} else {
				this.removeFrmUpload( this.data.queueList, 'queueList', true );
			}
			this._file.value = "";
		}.bind( this )
		this.$node.predefined = function (files){
			if(!Array.isArray(files)){
				files = [files]
			}
			for(var index=0;index<files.length;index++){
				Lyte.arrayUtils(this.data.predefinedList,"push",files[index]);
			}
		}.bind(this);
		/**
		* @utility addFiles
		* @version 2.2.15
		*/ 
		this.$node.addFiles = function(files){
			if(!Array.isArray(files)){
				files = [files]
			}
			this.validate(files);
		}.bind(this);
		this.folderUpload();
		this.getMethods( 'afterRender' ) && this.executeMethod( 'afterRender', this.$node );
	},

	didDestroy : function(){
		this.$node.removeUpload();
		if(this._triggerId) {
			clearTimeout(this._triggerId);
			delete this._triggerId;
		}
		if(this._resetId) {
			clearTimeout(this._resetId);
			delete this._resetId;
		}
		delete this._file;
		delete this.$node.upload; 
		delete this.$node.removeUpload;
		delete this.$node.predefined;
		delete this.$node.addFiles;
	},
	addAriaForButton : function(aria, key, dataName, defaultValue) {
		if(aria.hasOwnProperty(key)) {
			defaultValue = aria[key];
			delete aria[key];
		}
		this.setData(dataName,defaultValue);
	},
	addAriaValues : function(newAria) {
		var oldAria = this.data.commonAriaLabel;
		var fileUploadWrapper = this.$node.querySelector(".fileUploadWrapper");
		newAria =  Object.assign({}, newAria);
		this.addAriaForButton(newAria, "close-label", "ariaCloseLabel", "remove");
		_lyteUiUtils.setAttribute( fileUploadWrapper, newAria, oldAria );
		this.setData("commonAriaLabel",newAria);
	},
	ariaObserver: function( change ) {
		var newAria = this.data.ltPropAriaAttributes;
		if(this.data.ltPropAria) {
			if(!change) {
				this.setData("randomAriaId", new Date().getTime() + parseInt( Math.random() * 10E10 ));
			}
			this.addAriaValues( newAria );
		}
	}.observes( 'ltPropAriaAttributes.*' ).on('didConnect'),
	disableDataObserver: function(){
		var ltPropDisabled = this.data.ltPropDisabled;
		var fileUploadWrapper = this.$node.querySelector(".fileUploadWrapper");
		if(ltPropDisabled){
			fileUploadWrapper.setAttribute("aria-disabled",true);
		}
		else {
			fileUploadWrapper.removeAttribute("aria-disabled");
		}

	}.observes( 'ltPropDisabled' ).on('didConnect'),
	data : function(){
		return {
			// file input property
			/** 
			 * @componentProperty {string} ltPropName=file
			 */
			ltPropName : Lyte.attr( 'string', { "default" : "file" } ),
			/** 
			 * @componentProperty {boolean} ltPropMultiple=true
			 */
			ltPropMultiple : Lyte.attr( 'boolean', { "default" : true } ),
			/** 
			 * @componentProperty {string} ltPropAccept
			 */
			ltPropAccept : Lyte.attr( 'string', { "default" : ''} ),
			/** 
			 * @componentProperty {string} ltPropId
			*/
			ltPropId : Lyte.attr( 'string', { "default" : ''} ),
			/**
			 * @componentProperty {string} ltPropClass
			 */
			ltPropClass : Lyte.attr( 'string', { "default" : ''} ),
			/**
			 * @componentProperty {Box | Btn | Input} ltPropAppearance=Box 
			 */
			ltPropAppearance : Lyte.attr( 'string', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'appearance', "Box" )
			} ),
			/** 
			 * @componentProperty {boolean} ltPropDisabled=false
			 */
			ltPropDisabled : Lyte.attr('boolean',{"default":false}),
			// file uploader data
			/** 
			 * @componentProperty {boolean} ltPropYield=false
			 */
			ltPropYield : Lyte.attr( 'boolean', { "default" : false } ),
			// ltPropMultipleUpload : Lyte.attr( 'boolean', { default : true } ),
			/** 
			 * @componentProperty {number} ltPropFileLimit
			*/
			ltPropFileLimit : Lyte.attr( 'number', { "default" : undefined } ),
			/** 
			 * @componentProperty {number} ltPropMinimumFileSize=0
			 * @version 2.2.11
			*/
			ltPropMinimumFileSize : Lyte.attr( 'number',{"default": 0 } ),
			/** 
			 * @componentProperty {number} ltPropTotalFilesSize
			 * @version 3.2.1
			*/
			ltPropTotalFilesSize : Lyte.attr('string'),
			/** 
			 * @componentProperty {number} ltPropParallel=2
			*/
			ltPropParallel : Lyte.attr( 'number', { "default" : 2 } ),
			/** 
			 * @componentProperty {boolean} ltPropAutoUpload=true
			*/
			ltPropAutoUpload : Lyte.attr( 'boolean', { "default" : true } ),
			/** 
			 * @componentProperty {boolean} ltPropTriggerUpload=false
			*/
			ltPropTriggerUpload : Lyte.attr( 'boolean', { "default" : false } ),
			/** 
			 * @componentProperty {string} ltPropParamName=file
			 */
			ltPropParamName : Lyte.attr( 'string', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'paramName', 'file' ) 
			} ),
			/** 
			 * @componentProperty {boolean} ltPropThumb=false
			 */
			ltPropThumb : Lyte.attr( 'boolean', { "default" : false } ),
			/** 
			 * @componentProperty {number} ltPropTabindex=0
			 */
			ltPropTabindex : Lyte.attr( 'number', { "default" : 0 } ),
			/** 
			 * @componentProperty {number} ltPropRetry=2
			 */
			ltPropRetry : Lyte.attr( 'number', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'retry', 2 )
			} ),
			/** 
			 * @componentProperty {Bytes | KB | MB | GB | TB | PB | EB | ZB | YB} ltPropFileUnit
			 */
			ltPropFileUnit : Lyte.attr( 'string', { "default" : '' } ),
			/**
			 * @componentProperty {number} ltPropDigits=1
			 */
			ltPropDigits : Lyte.attr( 'number', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'digits', 1 ) 
			} ),
			/**
			 * @componentProperty {string} ltPropMessage
			 * @default Drag file here or browse to upload
			 */
			ltPropMessage : Lyte.attr( 'string', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'message', "Drag file here or browse to upload" )  
			} ),
			/**
			 * @componentProperty {string} ltPropFailureMessage
			 * @default Attachment failed
			 */
			ltPropFailureMessage : Lyte.attr( 'string', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'failureMessage', "Attachment failed" ) 
			} ),
			/**
			 * @componentProperty {string} ltPropRetryText=Retry
			 */
			ltPropRetryText : Lyte.attr( 'string', { 
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-fileupload', 'retryText', "Retry" )  
			} ),
			ltPropFiles : Lyte.attr("array",{ "default" :[]}),
			/**
			 * @componentProperty {boolean} ltPropChunk=false
			 */
			ltPropFolder : Lyte.attr("boolean",{"default" : false}),
			// chunking
			/**
			 * @componentProperty {boolean} ltPropChunk=false
			 */
			ltPropChunk : Lyte.attr( 'boolean', { "default" : false }),
			/**
			 * @componentProperty {number} ltPropChunkSize=2000000
			 */
			ltPropChunkSize : Lyte.attr( 'number', { "default" : 2000000 } ),
			/**
			 * @componentProperty {boolean} ltPropParallelChunkUpload=false
			 */
			ltPropParallelChunkUpload : Lyte.attr('boolean' , { "default" : false }),
			/**
			 * @componentProperty {number} ltPropParallelChunkCount=Infinity
			 */
			ltPropParallelChunkCount : Lyte.attr( 'number', { "default" :  Infinity } ),
			/**
			 * @componentProperty {number} ltPropChunkRetry=2
			 */
			ltPropChunkRetry : Lyte.attr( 'number', { "default" : 2 } ),

			// preventing multiple upload
			/**
			 * @componentProperty {boolean} ltPropUploadMultiple=false
			 */
			ltPropUploadMultiple : Lyte.attr( 'boolean', { "default" : false } ),
			/**
			 * @componentProperty {number} ltPropUploadMultipleCount=Infinity
			 */
			ltPropUploadMultipleCount : Lyte.attr('number', { "default" : Infinity}),
			/**
 			 * @typedef {Object} ajaxConfig
			 * @property {string} url=''
			 */
			/**
			 * @componentProperty {ajaxConfig} ltPropAjax
			 */
			ltPropAjax : Lyte.attr( 'object', { "default" : { url : '' } } ),
			/**
			 * @componentProperty {boolean} ltPropAllowReplace=false
			 */
			ltPropAllowReplace : Lyte.attr("boolean",{"default":false}),
			/**
			 * @componentProperty {number} ltPropFilesCount=Infinity
			 * @version 3.25.0
			 */
			ltPropFilesCount : Lyte.attr("number",{"default" : Infinity}),
			/**
            * @componentProperty {object} ltPropAriaAttributes
            * @version 3.1.0
            * @default {}
            */
 			ltPropAriaAttributes : Lyte.attr( 'object', { default : {
				role : "button",
				'aria-roledescription' : "fileupload"
			}, watch : true }),
			/**
            * @componentProperty {boolean} ltPropReset=false
            * @version 3.59.0
			*/
			ltPropReset : Lyte.attr("boolean",{ default : false}),

			ltPropResetFileValue : Lyte.attr("boolean", { default : false}),
			ltPropAria : Lyte.attr("boolean",{default : false}),
			// system data
			queueList : Lyte.attr( 'array', { "default" : [] } ),
			predefinedList : Lyte.attr('array',{ "default" : []}),
			currentUpload : Lyte.attr( 'array', { "default" : [] } ),
			chunkUpload : Lyte.attr('array',{ "default" : []}),
			fileClass : Lyte.attr( 'string', { "default" : '' } ),
			chunkCount : Lyte.attr('number', { "default" : 0}),
			abort : Lyte.attr("boolean",{ "default" : false}),
			lxhrs : Lyte.attr("array",{"default" : []}),
			uploadedFiles : Lyte.attr("array",{"default" :[]}),
			manualUpdFiles : Lyte.attr("array",{"default" :[]}),
			uploadMultipleRetry : Lyte.attr('number',{"default":0}),
			retryFiles : Lyte.attr('array',{"default" : []}),
			retry : Lyte.attr('boolean',{"default" : false}),
			manualUpload : Lyte.attr('boolean',{"default" : false}),
			totalFilesSize : Lyte.attr('number'),
			curTotFilesSize : Lyte.attr('number',{"default":0}),
			ariaCloseLabel : Lyte.attr("string"),
			commonAriaLabel : Lyte.attr("object",{"default": {}}),
			ariaSelectedFiles : Lyte.attr("string",{"default": "0"}),
			randomAriaId:Lyte.attr("string")
		}		
	},
	getFileDataAsString :  function(array) {
		var string = "";
		var sizeHelper = Lyte.Component.registeredHelpers.lyteUiFileSize;
		var ltPropFileUnit = this.data.ltPropFileUnit;
		var ltPropDigits = this.data.ltPropDigits;
		array.forEach(function(item){
			string += ("name "+item.name+" size "+sizeHelper(item.size, ltPropFileUnit, ltPropDigits)) + " "
		});
		return string;
	},
	constructAriaString : function() {
		if(this.data.ltPropAria) {
			var selectFiles = this.getFileDataAsString( this.data.predefinedList);
			selectFiles = this.getFileDataAsString( this.data.queueList);
			if(selectFiles) {
				this.setData("ariaSelectedFiles", selectFiles);
			}
			else {
				this.setData("ariaSelectedFiles", "0");
			}
		}
	},
	exceedTotalCount : function(){
		var fileCount =  this.data.ltPropFilesCount;
		if(fileCount !== Infinity)  {
			var predefinedList = this.data.predefinedList || [];
			var queueList =  this.data.queueList || [];
			var noOfFiles = predefinedList.length + queueList.length;
			if(noOfFiles < fileCount) {
				return false;
			}
			return true;
 		}
		return false;
	},
	folderUpload : function(){
		var folder =  this.data.ltPropFolder
		if(folder){
			this._file.setAttribute("webkitdirectory",true);
		}
		else{
			this._file.removeAttribute("webkitdirectory");
		}
	},
	validateAndGetType : function(fileName, fileType, reason){
		var acceptRegex = new RegExp( this.data.ltPropAccept.replace(/\s+/g,"").split(",").join("|"));
		var extension="", type, extensionWithDot;
		if(fileName){
			extension=fileName.substring(fileName.lastIndexOf('.')+1, fileName.length);
			extensionWithDot = "."+extension;
		}
		if(acceptRegex.test(fileType)){
			type = fileType.match(/(video|image|pdf|zip)/ig);
			type = type && type[0]?type[0]:extension;
		}
		else if(acceptRegex.test(extension) || acceptRegex.test(extensionWithDot)){
			type = extension;
		}
		else{
			reason.type = "Invalid_Type";
		}
		return type;
	},
	validateSize : function(file, reason) {
		if(file.size < this.data.ltPropMinimumFileSize){
			reason.size = "Lower_Size";
		}  
		else if(file.size > this.data.ltPropFileLimit){
			reason.size = "Higher_Size";
		}
		else if(this.checkTotalFilessize(file.size)){
			reason.totalSize = "Exceeds";
		}
	},
	folderUploadObserver : function(){
		this.folderUpload();
	}.observes('ltPropFolder'),
	trigUpl : function( arg ){
		if( arg.newValue ) {
			this.processqueue();
			var compRef = this;
			this._triggerId = setTimeout(function(){
				compRef.setData( 'ltPropTriggerUpload', false );
				delete compRef._triggerId;
			}, 0);
		}
	}.observes( 'ltPropTriggerUpload' ),
	resetObserver : function(changeObject) {
		if(changeObject.newValue) {
			this.$node.removeUpload();
			var compRef = this;
			this._resetId = setTimeout(function(){
				compRef.setData("ltPropReset", false);
				delete compRef._resetId;
			}, 0);
		}
	}.observes('ltPropReset'),
	validate : function( files ){ 
		var promises = [],clearflag=false;
		for( var j = 0; j < files.length; j++ ) {
			var reason = {}, isChunk=this.data.ltPropChunk,
			fileName=files[ j ].name,fileType=files[ j ].type,
			type = this.validateAndGetType(fileName, fileType, reason);
			this.validateSize(files[ j ], reason);
			if(this.exceedTotalCount())  {
				reason.fileCount = "Exceeds"; 
			}
			if ( Object.keys(reason).length > 0 ){ 
				clearflag = true;
				this.getMethods( 'onReject' ) && this.executeMethod( 'onReject', files[ j ], reason, this.$node )
			} else {
				var ret;
				if( this.getMethods( 'onBeforeAdd' ) ) {
					ret = this.executeMethod( 'onBeforeAdd', files[ j ], this.$node );
				}
				if( ret == false ){
					clearflag = true;
					continue;
				} else if( ret && ret.then ) {
					promises.push( ret );
					var cur = files[ j ];
					Promise.resolve( ret ).then( this.add.bind( this, cur, isChunk,type) )
				} else {
					this.add( files[ j ], isChunk,type);
				}
				if( !this.data.ltPropMultiple ){
					break;
				}
			}
		}
		if(clearflag || this.data.ltPropResetFileValue) {
			this._file.value = "";
		}
		if( this.data.ltPropAutoUpload ){
			promises.length ? Lyte.resolvePromises( promises ).then( this.processqueue.bind( this ) ) : this.processqueue();
		} 
		this.constructAriaString();
 	},

 	add : function( files, isChunk, fileType ){
 		var ret = { id : 'lyte' + new Date().getTime() + parseInt( Math.random() * 10E10 ), file : files, size : files.size, name : files.name, isChunk: isChunk, retry : 0, fileType : ( fileType? fileType:'document') };
 		if( this.data.ltPropThumb && /image/i.test( files.type ) ) {
 			Lyte.Component.set( ret, 'src', URL.createObjectURL( files ) );
		}
		this.addToTotalFilesSize(files.size);
		Lyte.arrayUtils( this.data.uploadedFiles, 'push', ret );
		Lyte.arrayUtils( this.data.queueList, 'push', ret );
		Lyte.arrayUtils( this.data.ltPropFiles, 'push' , files);
		this.getMethods( 'onAdd' ) && this.executeMethod( 'onAdd', files, this.$node, ret );
 	},

 	chkId : function( id, obj ) {
 		 return obj.id == id;
 	},
	SendingFile : function(){
		var data = this.data, 
		manualUpdFiles = data.manualUpdFiles;
		for(var index =0 ; index < manualUpdFiles.length ;){
			var current = manualUpdFiles[index];
			if(!current.status || (current.isChunk && current.status == "uploading")){
				if(current.isChunk){
					if(!current.status){
						this.setData("manualUpload",true);
						this.uploadFile(current);
						break;
					}
					else if(current.finished + current.currentUploadingChunks < current.chunks.length){
						this.setData("manualUpload",true);
						this.uploadFile(current);
						break;
					}
					else{
						index++;
					}
				}
				else{
					if(data.currentUpload.length < data.ltPropParallel){
						this.setData("manualUpload",true);
						Lyte.arrayUtils( data.currentUpload, 'push', current );
						this.uploadFile( current );
						index++;
					}
					else{
						break;
					}
				}
			}
			else{
				index++;
			}
		}
		if(index === manualUpdFiles.length){
			this.finishcallback(manualUpdFiles);
		}
	},
 	processqueue : function( id  , check , frmRetry ){
 		var data = this.data, idx = 0,
		 multiple = [];
		 if(id && !frmRetry){
			if( id.constructor != Array ) {
				id = [ id ];
			}
			for( var i = 0; i < id.length; i++ ) {
				var fileId =  id[ i ].id || id[ i ];
				var file = data.queueList[ this.findIndex( data.queueList, this.chkId.bind( this, fileId ) ) ];
				if(file){
					Lyte.arrayUtils( this.data.manualUpdFiles, 'push', file );
				}
			}
			if(this.data.manualUpdFiles.length){
				this.SendingFile();
				return;
			}
		}
		if(data.manualUpload){
			this.SendingFile();
			return;
		}
 		while( ( ( data.currentUpload.length < data.ltPropParallel ) || ( data.ltPropUploadMultiple && data.currentUpload.length < data.ltPropUploadMultipleCount) /*|| ( !data.ltPropMultipleUpload && !data.currentUpload.length ) */) || frmRetry && data.queueList.length  ) {
 			var current = data.queueList[ idx ];
 			if( id ) {
 				id = id.constructor == Object ? id.id : id;
				current = data.queueList[ this.findIndex( data.queueList, this.chkId.bind( this, id ) ) ]
				if(frmRetry && current){
					Lyte.arrayUtils( this.data.retryFiles, 'push', current );
					Lyte.Component.set( current, 'status', 'reloading' );
					if(data.uploadedFiles.indexOf(current) < 0){
						Lyte.arrayUtils( this.data.uploadedFiles, 'push', current );
						this.retrySendingFile();
					}
					return;
				}
 			}
 			if( current ) {
 				if( /uploading|success/.test( current.status ) ) {
 					if( id ) {
 						break;
					 }
					if( /uploading/.test( current.status ) && current.isChunk && current.finished + current.currentUploadingChunks < current.chunks.length){
						this.processChunkQueue(current.chunks);
						break;
					}
					else{
						idx++;
 						continue;
					}
 				} else if( current.status == 'error'&& (this.data.ltPropUploadMultiple || ( current.retry >= ( data.ltPropRetry - 1 ) || current.isChunk )) && !id ) {
 					idx++;
 					continue;
 				} else if( current.status == 'reloading' ) {
					idx++;
					continue;
				}
 				if( !current.isChunk ){
		 			Lyte.arrayUtils( data.currentUpload, 'push', current );
				}
 				if( !this.data.ltPropUploadMultiple ){
					 this.uploadFile( current )
		 			if( id || current.isChunk ) {
		 				break;
		 			}
		 		} else{
		 			multiple.push( current );
		 		}
	 			idx++;
	 		} else {
				this.data.retryFiles.length && this.retrySendingFile();
				if(check){
					this.finishcallback();
				}
	 			break;
	 		}
 		} 

 		if( this.data.ltPropUploadMultiple && multiple.length ){
 			this.uploadFile( multiple );
 		}

 	},
	 retrySendingFile : function(){
		var data = this.data, 
		retryFiles = data.retryFiles;
		for(var index =0 ; index < retryFiles.length ;){
			var current = retryFiles[index];
			if(current.status == "reloading"|| current.status == "uploading"){
				if(current.isChunk){
					if(current.finished + current.currentUploadingChunks < current.chunks.length){
						this.setData("retry",true);
						this.processChunkQueue(current.chunks);
						break;
					}
					else{
						index++;
					}
				}
				else{
					if(data.currentUpload.length < data.ltPropParallel){
						this.setData("retry",true);
						Lyte.arrayUtils(retryFiles,"removeAt",index);
						Lyte.arrayUtils( data.currentUpload, 'push', current );
						this.getMethods( 'onRetry' ) && this.executeMethod( 'onRetry', {}, current, this.$node );
						this.uploadFile( current );
					}
					else{
						break;
					}
				}
			}
			else{
				Lyte.arrayUtils(retryFiles,"removeAt",index);
			}
		}
		if(!retryFiles.length){
			this.setData("retry",false);
			this.processqueue(undefined,true);
		}
	 },
 	findIndex : function ( array, condition ) {
	    if( condition.constructor == Function ) {
	        for( var i = 0; i < array.length; i++ ) {
	            var ret = condition.call( array[ i ], array[ i ] );
	            if( ret ) {
	                return i;
	            }
	        }
	    } else {
	       return array.indexOf( condition );
	    }    
	},
	abortChunksFrmUpload : function(id){
		var data = this.data,chunkUpload = data.chunkUpload;
		for(var index = 0;index <chunkUpload.length;){
			var chunk = chunkUpload[index];
			if(chunk.chunkProp.origin.id === id && chunk.xhr){
				this.setData("abort",true);
				chunk.xhr.ret.abort();
			}
			else {
				index++;
			}
		}
	},
 	removeFrmUpload : function( idd, arrnme, prevent ,check ) {//need to be checked
 		if( idd.constructor != Array ) {
 			idd = [ idd ];
 		}
 		for( var i = 0; i < idd.length; i++ ) {
	 		var id = idd[ i ].id || idd[ i ];
			 var arr = this.data[ arrnme ], crct = this.findIndex( arr,  this.chkId.bind( this, id ) ) , flag ,cur ;
			 if(crct === undefined || crct < 0){
				arr = this.data.predefinedList,crct = this.findIndex( arr,  this.chkId.bind( this, id ) ) ;
				if(crct > -1){
				   arrnme = "predefinedList";
				}
			 }
	 		if( crct >= 0 ) {
	 			if( !prevent && this.getMethods( 'onBeforeRemove' ) && this.executeMethod( 'onBeforeRemove', arrnme, arr[ crct ], this.$node ) == false ) {
		 			continue;
				 }
				cur = arr[ crct ]; 
				if(arrnme === "queueList" || arrnme === "predefinedList"){
					this.removeFromTotalFileSize(cur.size)
				}
	 			if( cur.status == 'uploading' ) {
					flag = true ;
					if(cur.xhr){
						this.setData("abort",true);
						cur.xhr.ret.abort();
					}
					if(cur.isChunk){
						this.abortChunksFrmUpload(cur.id);
					}
	 			}
				Lyte.arrayUtils( arr, 'removeAt', crct );
				if(arrnme === "queueList"){
					var lxhrs = this.getData("lxhrs");
					var lxhr = $L.search(lxhrs,"fileId",cur.id)[0],index;
					if(cur.isChunk && flag){
						this.getMethods("onFileFailure") && this.executeMethod('onFileFailure',lxhr,cur,this.$node,true);
					}
					Lyte.arrayUtils( this.data.ltPropFiles, 'removeAt', crct );
					var temparray=this.data.uploadedFiles,tempId = this.findIndex( temparray,  this.chkId.bind( this, id ) )
					if( tempId >= 0 ) {
						Lyte.arrayUtils( temparray, 'removeAt', tempId );
					}
					var temparray=this.data.retryFiles,tempId = this.findIndex( temparray,  this.chkId.bind( this, id ) )
					if( tempId >= 0 ) {
						Lyte.arrayUtils( temparray, 'removeAt', tempId );
					}
					index = lxhrs.indexOf(lxhr);
					index > -1 && Lyte.arrayUtils(lxhrs,'removeAt',index);
					if( crct <= i ) {
						i--;
					}
				}
				!prevent && this.getMethods( 'onRemove' ) && this.executeMethod( 'onRemove', arrnme, cur, this.$node );
			}
	 	}
	 	if(!this.data.ltPropUploadMultiple && ((arrnme == "queueList" && flag) || check)) {
			 //check is a flag to used to trigger the finishcallback
	 		this.data.retry?this.retrySendingFile():this.processqueue(undefined,true);
	 	}
		if(arrnme === "queueList" || arrnme === "predefinedList") {
			this.constructAriaString();
		}
 	},

 	uploadFile : function( file ){
		var props = Lyte.deepCopyObject( this.data.ltPropAjax );
		file.isChunk ? this.proceedChunk( file, props ) : this.proceedUpload( file, props, false );
		//comments may be need in future please check git 
		// if( this.getMethods( 'onBeforeUpload' ) ) {
		// 	ret = this.executeMethod( 'onBeforeUpload', file, props, this.$node );
		// }
		// if( ret && ret.then ) {
		// 	Promise.resolve( ret ).then( function(){
		// 		file.isChunk ? this.proceedChunk( file, props ) : this.proceedUpload( file, props );
		// 	}.bind( this ))
		// } else if( ret != false ) {
			
		// } else {
		// 	if( file.constructor != Array ){
		// 		file = [ file ];
		// 	}
		// 	for( var i = 0; i < file.length; i++ ){
		// 		//this.removeFrmUpload( file[ i ].id, 'queueList' );
		// 		this.removeFrmUpload( file[ i ].id, 'currentUpload',true);//need to be checked
		// 	}
		// }
 	},

 	succFunc : function( evt ){
		if(this.$node){
			var file = arguments[ 2 ].xhr.file,ret = arguments[2].xhr.ret,tempRet = [],duplicate;
			file.xhr && delete file.xhr;
			this.getMethods( 'onRequestSuccess' ) && this.executeMethod( 'onRequestSuccess', ret, file, this.$node );
			if( file.constructor != Array ){
				file = [ file ];
			}
			for( var i = 0; i < file.length; i++ ){
				Lyte.Component.set( file[ i ], 'status', 'success' );
				Lyte.objectUtils( file[ i ], 'delete', 'xhr' );
				if(!this.data.ltPropUploadMultiple){
					var lxhrs =this.getData("lxhrs");
					duplicate = $L.search(lxhrs,"fileId",file[i].id);
					duplicate.length  && Lyte.arrayUtils(lxhrs,'removeAt',lxhrs.indexOf(duplicate[0]));
					ret.fileId = file[i].id;
					Lyte.arrayUtils(this.getData("lxhrs"),'push',ret);
					this.getMethods( 'onFileSuccess' ) && this.executeMethod( 'onFileSuccess', ret, file[ i ], this.$node );
					this.removeFrmUpload( file[ i ].id, 'currentUpload' , true, true ); //need to be checked
				}
				 else{
					tempRet.push(file[ i ].id);
					this.removeFrmUpload( file[ i ].id, 'currentUpload',true); //need to be checked
				}
			}
			if(this.data.ltPropUploadMultiple){
				ret.fileId = tempRet;
				Lyte.arrayUtils(this.getData("lxhrs"),'push',ret);
				this.setData("uploadMultipleRetry",0);
				this.processqueue(undefined,true);
			}
			delete arguments[ 2 ].xhr.file;
		}
 	},

 	reject : function( evt ){
		if(this.$node){
			var file = evt.xhr.file,ret=evt.xhr.ret,retry = file.retry,tempRet = [],duplicate;
			if(this.data.abort || retry >= this.data.ltPropRetry  || (this.data.ltPropUploadMultiple && this.data.uploadMultipleRetry  >= this.data.ltPropRetry) ) {
				file.xhr && delete file.xhr;
				this.getMethods( 'onRequestFailure' ) && this.executeMethod( 'onRequestFailure', ret, file, this.$node,this.data.abort );
				if( file.constructor != Array ){
					file = [ file ];
				}
				for( var i = 0; i < file.length; i++ ){
					Lyte.Component.set( file[ i ], 'status', 'error' );
					Lyte.objectUtils( file[ i ], 'delete', 'xhr' );
					if(! this.data.ltPropUploadMultiple){
						var lxhrs =this.getData("lxhrs");
						duplicate = $L.search(lxhrs,"fileId",file[i].id);
						duplicate.length  && Lyte.arrayUtils(lxhrs,'removeAt',lxhrs.indexOf(duplicate[0]));
						ret.fileId = file[i].id;
						this.getMethods("onFileFailure") && this.executeMethod('onFileFailure',ret,file[i],this.$node,this.data.abort);
						!this.data.abort  && Lyte.arrayUtils(this.getData("lxhrs"),'push',ret);
					}
					else{
						tempRet.push(file[ i ].id);
					}
					this.removeFrmUpload( file[ i ].id, 'currentUpload',true,!this.data.abort); //need to be checked
					
				}
				if(this.data.ltPropUploadMultiple){
					ret.fileId = tempRet;
					Lyte.arrayUtils(this.getData("lxhrs"),'push',ret);
					this.setData("uploadMultipleRetry",0);
					this.processqueue(undefined,true);
				}
				if(this.data.abort){
					Lyte.objectUtils( evt.xhr.file, 'add', 'retry', this.data.ltPropRetry );
					this.setData("abort",false);
				}
				delete evt.xhr.file;
			} else {
				if(!this.data.ltPropUploadMultiple){
					Lyte.Component.set( evt.xhr.file, 'status', 'retrying' );
					Lyte.objectUtils( evt.xhr.file, 'add', 'retry', retry + 1 );
					this.getMethods( 'onRetry' ) && this.executeMethod( 'onRetry', ret, file, this.$node );
					this.uploadFile( file );
				}
				else{
					delete file.xhr;
					for( var i = 0; i < file.length; i++ ){
						Lyte.Component.set( evt.xhr.file[i], 'status', 'retrying' );
						Lyte.Component.set( evt.xhr.file[i], 'retry', evt.xhr.file[i].retry +1 );
					}
					this.setData("uploadMultipleRetry",this.data.uploadMultipleRetry+1);
					this.getMethods( 'onRetry' ) && this.executeMethod( 'onRetry', ret, file, this.$node );
					this.uploadFile(file);
				}
			}
		}
 	},

 	progress : function( evt ){
 		if( evt.lengthComputable ) {
	 		var total = evt.total, upload = evt.loaded, xhr = evt.target.xhr,
	 		file = xhr.file;

	 		if( file.constructor != Array ){
	 			file = [ file ];
	 		}
	 		for( var i = 0; i < file.length; i++ ){ 
				if(this.data.ltPropUploadMultiple){
					Lyte.Component.set( file[ i ] , { loaded : file[i].size, percentage : 100 } );
				}
				else{
					Lyte.Component.set( file[ i ] , { loaded : upload, percentage : Math.round( upload * 100 / total ) } );
				}
	 			this.getMethods( 'onProgress' ) && this.executeMethod( 'onProgress', evt, xhr, file[ i ], this.$node );
	 		}
	 	}
 	},

 	removeChunk : function( id, origin, prevent ) {
 		var arr = this.data.chunkUpload, cur = this.findIndex( arr, function( obj ){
 			return obj.chunkProp.chunkId == id
 		} )
 		if( cur > -1 ) {
 			Lyte.arrayUtils( arr, 'removeAt', cur );
 			!prevent && this.processChunkQueue( origin.chunks )
 		}
 	},

 	chunkReject : function( evt ){
		if(this.$node){
			var file = evt.xhr.file, origin = file.chunkProp.origin,ret = arguments[0].xhr.ret;
			if( !this.data.abort && file.retry < this.data.ltPropChunkRetry) {
				Lyte.Component.set( file, 'status', 'retrying' );
				Lyte.objectUtils( file, 'add', 'retry', file.retry + 1 );
				this.removeChunk( file.chunkProp.chunkId, origin, true );
				this.getMethods( 'onRetry' ) && this.executeMethod( 'onRetry',ret, file, this.$node );
				Lyte.Component.set( origin, 'currentUploadingChunks', origin.currentUploadingChunks - 1 );
				this.processChunkQueue( file, true );
			} else {
				this.getMethods( 'onRequestFailure' ) && this.executeMethod( 'onRequestFailure', ret, file, this.$node,this.data.abort );
				Lyte.Component.set( file, 'status', 'error' );
				this.removeChunk( file.chunkProp.chunkId, origin, true );
				this.getMethods( 'onChunkError' ) && this.executeMethod( 'onChunkError', ret, file, origin, this.$node,this.data.abort );
				Lyte.objectUtils( file, 'delete', 'xhr' );
				delete evt.xhr.file; 	
				Lyte.Component.set( origin, 'currentUploadingChunks', origin.currentUploadingChunks - 1 );
				Lyte.Component.set( origin, 'error', origin.error + 1 );
				if( origin.status != 'error' ) {
					var lxhrs =this.getData("lxhrs"),duplicate;
					Lyte.Component.set( origin, 'status', 'error' );
					//Lyte.Component.set( this.getData("lxhrs"), origin.id, ret );
					duplicate = $L.search(lxhrs,"fileId",origin.id);
					duplicate.length  && Lyte.arrayUtils(lxhrs,'removeAt',lxhrs.indexOf(duplicate[0]));
					ret.fileId = origin.id;
					Lyte.arrayUtils(this.getData("lxhrs"),'push',ret);
				}
				if(!this.data.abort){
					this.abortChunksFrmUpload(origin.id);
					this.getMethods("onFileFailure") && this.executeMethod('onFileFailure',ret,origin,this.$node,this.data.abort);
					this.data.retry ? this.retrySendingFile()
					:this.processqueue(undefined,true);
				}
				else{
					this.setData("abort",false);
				}
			}
		}
 	},

 	chunkSuccess : function( evt ){
		if(this.$node){
			var file = arguments[ 2 ].xhr.file, origin = file.chunkProp.origin,ret = arguments[ 2 ].xhr.ret;
			this.getMethods( 'onRequestSuccess' ) && this.executeMethod( 'onRequestSuccess', ret, file, this.$node );
			Lyte.Component.set( file, 'status', 'success' );
			this.removeChunk( file.chunkProp.chunkId, origin,true );
			this.getMethods( 'onChunkSuccess' ) && this.executeMethod( 'onChunkSuccess', ret, file, origin, this.$node );
			Lyte.objectUtils( file, 'delete', 'xhr' );
			delete arguments[ 2 ].xhr.file;
			Lyte.Component.set( origin, 'finished', origin.finished + 1 );
			Lyte.Component.set( origin, 'currentUploadingChunks', origin.currentUploadingChunks - 1 );
			if( origin.finished == origin.total ) {
				var lxhrs =this.getData("lxhrs"),duplicate;
			   	Lyte.Component.set( origin, 'status', 'success' );
				duplicate = $L.search(lxhrs,"fileId",origin.id);
				duplicate.length  && Lyte.arrayUtils(lxhrs,'removeAt',lxhrs.indexOf(duplicate[0]));
				ret.fileId = origin.id;
				Lyte.arrayUtils(this.getData("lxhrs"),'push',ret);
				this.getMethods( 'onFileSuccess' ) && this.executeMethod( 'onFileSuccess', ret, origin, this.$node );
				this.data.retry ? this.retrySendingFile()
				:this.processqueue(undefined,true);
			}
			else {
				this.processChunkQueue( origin.chunks, true );
			}
		}
		
 	},

 	chunkProgress : function( evt ){
 		if( evt.lengthComputable ) {
 			var total = evt.total, upload = evt.loaded, file = evt.target.xhr.file, origin = file.chunkProp.origin, diff = upload - file.loaded;
 			Lyte.Component.set( file, 'loaded', upload );
 			Lyte.Component.set( origin, { loaded : Math.min( origin.loaded + diff, origin.size ), percentage : Math.min( Math.round( ( origin.loaded + diff ) * 100 / origin.size ), 100 ) } );
 			this.getMethods( 'onProgress' ) && this.executeMethod( 'onProgress', evt, evt.target.xhr, origin, this.$node )
 		}
 	},

 	proceedChunk : function( files, props ) {
 		var data = this.data, chunkSize = data.ltPropChunkSize, oriSize = files.size, size = 0, blobs = [];
 		while( size <= oriSize ){
			var start = size, end =  Math.min( oriSize, size += chunkSize ),totalChunkSize = end - start;
 			blobs.push( { file : files.file.slice( start, end ), chunkProp : {
 			  chunkOffset : start, 
			  chunkEnd : end, 
			  chunkSize : totalChunkSize,
 			  chunkId : "lyteChunk" + new Date().getTime() + parseInt( Math.random() * 10E10 ), 
 			  chunkIndex : blobs.length, 
 			  origin : files,
 			  chunkCount : Math.ceil( files.size / chunkSize ),
 			  totalSize : files.size 
 			}, name : files.file.name, loaded : 0, retry : 0 });
 		}
		 Lyte.Component.set( files, { chunks : blobs, error : 0, finished : 0, total : blobs.length } );
		 if(data.ltPropParallelChunkCount === Infinity){
			 this.setData("chunkCount", blobs.length);
		 }
 		this.processChunkQueue( blobs )
 	},

 	processChunkQueue : function( blobs, frmFail ){
 		var data = this.data, idx = 0;
		if( blobs.constructor != Array ) {
			blobs = [ blobs ];
		} 
		while( (!data.ltPropParallelChunkUpload && data.chunkUpload.length < 1) || (data.ltPropParallelChunkUpload && (data.ltPropParallelChunkCount === Infinity ) ||( data.ltPropParallelChunkCount != Infinity &&/*data.ltPropMultipleUpload &&*/ data.chunkUpload.length < data.ltPropParallelChunkCount ) /*|| ( !data.ltPropMultipleUpload && !data.currentUpload.length )*/ ) ) {
			var bb = blobs[ idx ];
			if( !bb ) {
				if(data.retry){
					this.retrySendingFile();
				}
				else if(data.ltPropParallelChunkUpload){
					data.ltPropParallelChunkCount != Infinity && data.chunkUpload.length < data.ltPropParallelChunkCount && this.processqueue();
					data.ltPropParallelChunkCount == Infinity && this.processqueue();
				}
				break;
			}
			if( !/success|uploading/.test( bb.status ) && ( !frmFail || ( frmFail && !/error/.test( bb.status ) ) ) ) {
				var file = bb.chunkProp.origin;
				Lyte.Component.set( file, { status : 'uploading', percentage : file.percentage || 0, loaded : file.loaded || 0, size : file.size , currentUploadingChunks : file.currentUploadingChunks+1 || 1 } )
				this.proceedUpload( bb, Lyte.deepCopyObject( data.ltPropAjax ), true );
				Lyte.arrayUtils( data.chunkUpload, 'push', bb );
				idx++;
			} else {
				idx++;
				continue;
			}
		}
 	},

 	proceedUpload : function( file, props, isChunk ){
 		if( /success|uploading/.test( ( file[ 0 ] && file[ 0 ].status ) || file.status ) ){
 			return;
 		}
		var formdata = new FormData(), callback,keys=["chunkOffset","chunkSize","chunkIndex","chunkCount","totalSize"],fileName;
 		if( file.constructor == Array ){
 			for( var j = 0; j < file.length; j++ ){
				fileName = this.data.ltPropFolder ?file[ j ].file.webkitRelativePath:file[ j ].name;
 				formdata.append( this.data.ltPropParamName + '[' + j + ']', file[ j ].file, fileName );
 			}
 		} else {
			fileName = this.data.ltPropFolder && !isChunk ?file.file.webkitRelativePath:file.name;
			formdata.append(this.data.ltPropParamName, file.file, fileName );
		 }
		 if(isChunk){
			 for(var index=0;index<keys.length;index++){
				formdata.append(keys[index],file.chunkProp[keys[index]]);
			 }
			 var origin = file.chunkProp.origin;
			 formdata.append("fileId",origin.id);
			 fileName = this.data.ltPropFolder ?origin.file.webkitRelativePath:origin.name;
			 formdata.append("fileName",fileName);
		}
 		props.success = isChunk ? this.chunkSuccess.bind( this ) : this.succFunc.bind( this );
 		props.error =  isChunk ? this.chunkReject.bind( this ) : this.reject.bind( this );
 		var xhr = new XMLHttpRequest();
 		props.type = 'POST';
 		file.xhr = xhr;
 		xhr.file = file;
 		xhr.upload.xhr = xhr;
 		xhr.upload.addEventListener( 'progress', isChunk ? this.chunkProgress.bind( this ) : this.progress.bind( this ), false );
 		props.xhr = xhr;
 		props.data = formdata;
		props.processData = false;
		// set content-type false and make sure browser
 		props.contentType = false;
 		if( this.getMethods( 'onBeforeSend' ) ) {
 			callback = this.executeMethod( 'onBeforeSend', xhr, file, isChunk, this.$node, formdata, props );
 		}
 		if( callback && callback.then ) {
 			Promise.resolve( callback ).then( function(){
 				this.finishSend( props, xhr, file );
 			}.bind( this ) )
 		} else if( callback == false ) {
 			if( file.constructor != Array ){
 				file = [ file ];
 			}
 			for( var i = 0; i < file.length; i++ ){
 				//this.removeFrmUpload( file[ i ].id, 'queueList' );
				this.removeFrmUpload( file[ i ].id, 'currentUpload',true); //need to be checked
 			}
 			return
 		} else {
 			if( callback && callback.constructor == FormData ){
	 			props.data = callback;
	 		}
 			this.finishSend( props, xhr, file, isChunk )
 		}
 		
 	},

 	finishSend : function( props, xhr, file, isChunk ){
 		if( file.constructor == Array ){
 			for( var i = 0; i < file.length; i++ ){
 				Lyte.Component.set( file[ i ], 'status', 'uploading' );
 			}
 		} else {
 			Lyte.Component.set( file, 'status', 'uploading' );
 		}
 		var ret = $L.ajax( props );
 		ret.xhr = xhr;
 		xhr.ret = ret;
 		this.getMethods( 'onSend' ) && this.executeMethod( 'onSend', xhr, ret, file, !!isChunk, this.$node, props );
	},
	finishcallback :function(files){
		var currentFiles = files || this.data.uploadedFiles,chunk=this.data.chunkUpload,lxhr=this.data.lxhrs,flag;
		if(!currentFiles.length){
			return ;
		}
		for(var index=0;index < currentFiles.length;index++){
			if(!currentFiles[index].status || currentFiles[index].status == "uploading"){
				return;
			}
			else if(currentFiles[index].status == "error"){
				flag = true;
			}
		}
		for(var index=0;index < chunk.length;index++){
			if(chunk[index].status == "uploading"){
				return;
			}
			else if(chunk[index].status == "error"){
				flag = true;
			}
		}
		if(!this.data.ltPropMultiple)  {
			currentFiles = currentFiles[0];
			lxhr = lxhr[0];
		}
		if(flag){
			this.getMethods( 'onFailure' ) && this.executeMethod( 'onFailure', currentFiles, this.$node ,lxhr);
			this.setData("uploadedFiles",[]);
			this.setData("lxhrs",[]);
		}
		else{
			this.getMethods("onSuccess") && this.executeMethod('onSuccess',currentFiles, this.$node ,lxhr);
			this.setData("uploadedFiles",[]);
			this.setData("lxhrs",[]);
		}
		if(this.data.manualUpload == true)  {
			this.setData("manualUpdFiles",[]);
			this.setData("manualUpload",false);
		}
	 },
	 convertToBytes : function(){
		var size = this.getData("ltPropTotalFilesSize");
		 if(size){
			var fileUnit =  size.substring(size.length-2),
			totalSize  = parseInt(size.substring(0,size.length-2)),
			validFormat = ["KB","MB","GB"],
			indexOf = validFormat.indexOf(fileUnit);
			if(indexOf > -1){
				this.setData("totalFilesSize",totalSize*(Math.pow(1000,indexOf+1)))
			}
		 }
	 }.observes("ltPropTotalFilesSize").on("didConnect"),
	 checkTotalFilessize : function(fileSize){
		var size = this.getData("totalFilesSize"),
		totalSize  = this.getData("curTotFilesSize");
		if(size && (totalSize+fileSize) > size){
			return true;
		}
		return false;
	 },
	 addToTotalFilesSize : function(fileSize){
		var size = this.getData("totalFilesSize");
		if(size){
			var total =  this.getData("curTotFilesSize");
			this.setData("curTotFilesSize",total+fileSize);
		}
	 },
	 removeFromTotalFileSize : function(fileSize){
		var size = this.getData("totalFilesSize");
		if(size){
			var total =  this.getData("curTotFilesSize");
			this.setData("curTotFilesSize",total-fileSize);
		}
	 },
	 openFileWindow : function(evt, fromEnter){
		if( !this.data.ltPropYield  && this.data.ltPropMultiple ) {
			if( !evt.shiftKey ){
				$L( '#lyteFileUpdSelectedFile.lyteFileUpdListFile' ).removeAttr( 'id' );
			} else{
				evt.preventDefault();
			}
			if(evt.target.className != "lyteFileUpdRetryMsg"){
				$L( evt.target ).closest( '.lyteFileUpdListFile' ).attr( 'id', 'lyteFileUpdSelectedFile' );
			}
		}
		if( evt.ctrlKey || evt.shiftKey || evt.metaKey ){
			return
		}
		var isSelectArea, close = $L( evt.target ).closest( 'lyte-file-close' );
		if( close.length ) {
			this.$node.removeUpload( close.eq( 0 ).attr( 'data-value' ) )
			return;
		}
		var retry = $L( evt.target ).closest( 'lyte-file-retry' );
		if( retry.length ) {
			this.$node.upload( retry.eq( 0 ).attr( 'data-value' ),undefined,true );
			return;
		}
		isSelectArea = $L( evt.target ).closest( 'lyte-file-select-area' ).length || fromEnter;
		if( isSelectArea && this.data.ltPropMultiple || (this.data.queueList.length == 0 && this.data.predefinedList.length == 0) || this.data.ltPropAllowReplace){
			if( this.getMethods( 'onBeforeOpen' ) && this.executeMethod( 'onBeforeOpen', evt, this.$node ) == false ) {
				return
			}
			this._file.click();
		}
	 },
	actions : {
		change : function( evt, _this ){
			if(_this.files.length){
				if(!this.data.ltPropMultiple &&this.data.ltPropAllowReplace){
					this.removeFrmUpload( this.data.queueList, 'queueList', true );
					this.data.predefinedList.length && this.removeFrmUpload( this.data.predefinedList, 'predefinedList', true );
				}
				var files = Array.from(_this.files);
				if(this.getMethods("onSelect") && this.executeMethod("onSelect",files, evt) === false){
					this._file.value = "";
					return;
				}
				this.validate( files );
			}
		},	

		drag : function( evt ){
			var type = evt.type, nwStr = "onDrag", match = type.match(/drag(.+)/ );
			if( match && match[ 1 ] ) {
				nwStr += match[ 1 ].slice( 0, 1 ).toUpperCase() + match[ 1 ].slice( 1 );
				if( /enter|over/.test( evt.type ) ) {
					if( evt.type == 'dragover' ) {
						var tran = evt.dataTransfer;
						if( tran ) {
							var effect = tran.effectAllowed;
							tran.dropEffect = 'move' === effect || 'linkMove' === effect ? 'move' : 'copy';
						}
					}
					evt.preventDefault();
				}
			}
			if( type == "dragenter" ){
				this.setData( 'fileClass', 'fileDragEnter' );
			} else if( type == "dragleave" ){
			 	 this.setData( 'fileClass', '' );
			}
			this.getMethods( nwStr ) && this.executeMethod( nwStr, evt, this.$node );
		},

		drop : function( evt ){
			this.setData( 'fileClass', '' );
			var dT = evt.dataTransfer;
			if( dT ) {
				if( this.getMethods( 'onBeforeDrop' ) && this.executeMethod( 'onBeforeDrop', evt, this.$node ) == false ) {
					return;
				}
				evt.preventDefault();
				if( !this.data.ltPropMultiple ) {
					this.$node.removeUpload();
				}
				this.validate( dT.files );
				this.getMethods( 'onDrop' ) && this.executeMethod( 'onDrop', evt, this.$node );
			}	
		},

		click : function( evt ) {
			this.openFileWindow(evt);
		},

		paste : function( evt ){
			var clip = evt.clipboardData || window.clipboardData, items = clip.items, files = [];
			for( var i = 0; i < items.length; i++ ) {
				var file = items[ i ].getAsFile();
				if( file ) {
					files.push( file )
				}
			}
			if( files.length ) {
				if( this.getMethods( 'onBeforePaste' ) && this.executeMethod( 'onBeforePaste', evt, files, this.$node ) == false ) {
					return;
				}
				if( !this.data.ltPropMultiple ) {
					this.$node.removeUpload();
				}
				this.validate( files );
				this.getMethods( 'onPaste' ) && this.executeMethod( 'onPaste', evt, files, this.$node );
			}
		},

		keydown : function( evt ){
			if( evt.which == 8 ){
				var elem = $L( "#lyteFileUpdSelectedFile lyte-file-close", this.$node )
				for( var i = 0; i < elem.length; i++ ) {
				   this.$node.removeUpload( elem.eq( i ).attr( 'data-value' ) );
				}
				elem.length && evt.preventDefault();
			}
			else if(evt.which === 13 ) {
				this.openFileWindow(evt, true);
				evt.preventDefault();
			}
		}
	}
});
/**
 * @syntax nonYielded
 * <lyte-fileupload></lyte-fileupload>
 */
/**
 * @syntax 
 * @attribute ltPropYield=true 
 * @attribute ltPropMultiple=true
 *	<lyte-fileupload lt-prop-yield=true lt-prop-multiple = true> 
 *  	<template is = "registerYield" yield-name = "file"> 
 *	 	<lyte-file-select-area> 
 *	  	 	<lyte-file-message class="lyteFileUpdMsgWrap"> <span class="lyteFileUpdMsg"> Drag file here or browse to upload </span> </lyte-file-message>
 *	 	</lyte-file-select-area> 
 *		<div class="lyteFileUpdList">
 *			<template lyte-for="{{predefinedList}} as item index">
 *				<div class="lyteFileUpdListFile">
 *					<div class="lyteFileUpdTypePreview">
 *						<template lyte-if="{{item.src}}">
 *								<img class="lyteFileUpdThumb" src={{item.src}}>
 *						</template>
 *						<template lyte-else>
 *							<span class="lyteFileUpdTypeIcon {{item.fileType}}"></span>
 *						</template>
 *					</div>
 *					<lyte-text class = "lyteFileUpdFileName" lt-prop-value = {{item.name}}></lyte-text>
 *					<span class="lyteFileUpdFileSize">( {{lyteUiFileSize(item.size, ltPropFileUnit, ltPropDigits)}} )</span>
 *					<lyte-file-close data-value = {{item.id}} class = {{item.status}}></lyte-file-close>
 *				</div>
 *			</template>
 *	  	  	<template lyte-for="{{queueList}} as item index">
 *	  	  		<div class="lyteFileUpdListFile {{item.status}}"> 
 *	  				<div class="lyteFileUpdTypePreview"> 
 *	  	  	  	 		<template lyte-if="{{item.src}}"> 
 *	  	  	  	  	  		<img class="lyteFileUpdThumb" src={{item.src}}>
 * 						</template>				
 *	  	  	  	  	  	<template lyte-else> 
 *	  	  	  	  	  		<span class="lyteFileUpdTypeIcon {{item.fileType}}"></span>
 *	  	  	  	  	  	</template>
 *	  	  	  	  	</div> 
 *	  	  	  	  	<lyte-text class = "lyteFileUpdFileName" lt-prop-value = {{item.name}}> </lyte-text>
 *	  	  	  	  	<span class="lyteFileUpdFileSize"> ( {{lyteUiFileSize(item.size, 'KB', 2)}} ) </span>
 *	  	  	  	  	<template lyte-if="{{!ltPropUploadMultiple && item.percentage != undefined}}"> 
 *	  	  	  	  		<div class="lyteFileUpdFileStatus" data-completed = {{item.percentage}}> 
 *	  	  	  	  	  		<div class="lyteFileUpdProgressBar {{item.status}}"> 
 *	  	  	  	  	  	  		<div class="lyteFileUpdProgressFill" style="width: {{item.percentage}}%"> </div>
 *	  	  	  	  	  		</div> 
 *	  	  	  	  		</div>
 *					</template>
 * 					<template lyte-if='{{item.status=="error"}}'>
 *	  	  	  	  		<lyte-file-retry data-value = {{item.id}}> 
 *	  	  	  	  	  		<span class="lyteFileUpdFailMsg">Attachment failed </span>
 *	  	  	  	  	  		<template lyte-if="{{!ltPropUploadMultiple}}"> 
 *	  	  	  	  	  			<span class="lyteFileUpdRetryMsg"> Retry </span>
 *	  	  	  	  	  		</template> 
 *	  	  	  	  		</lyte-file-retry> 
 *	  	  	  	  	</template> 
 *               	<template lyte-if='{{(!ltPropUploadMultiple)||(!item.status||item.status=="error"||item.status=="success")}}'>
 *	  	  	  	  		<lyte-file-close data-value = {{item.id}} class = {{item.status}}> </lyte-file-close>
 *	  	  	  	  	</template> 
 *	  	  	  	</div> 
 *	  		</template> 
 *	 	</div> 
 *		</template> 
 *	</lyte-fileupload>  
 */
/**
 * @syntax 
 * @attribute ltPropYield=true 
 * @attribute ltPropMultiple=false
 *	<lyte-fileupload lt-prop-yield = true lt-prop-multiple = false> 
 *		<template is = "registerYield" yield-name = "file"> 
 *	  		<lyte-file-select-area> 
 *	  	  		<lyte-file-message class="lyteFileUpdMsgWrap{{if(queueList.length, 'lyteHide', '')}}"> 
 *	  	  	  		<span class="lyteFileUpdMsg"> Drag file here or browse to upload </span>
 *	  	  	  	</lyte-file-message> 
 *	  	  	  	<div class="lyteFileUpdList">
 *					<template lyte-for="{{predefinedList}} as item index">
 *						<div class="lyteFileUpdListFile">
 *							<div class="lyteFileUpdTypePreview">
 *								<template lyte-if="{{item.src}}">
 *										<img class="lyteFileUpdThumb" src={{item.src}}>
 *								</template>
 * 								<template lyte-else>
 *									<span class="lyteFileUpdTypeIcon {{item.fileType}}"></span>
 *								</template>
 *							</div>
 *							<lyte-text class = "lyteFileUpdFileName" lt-prop-value = {{item.name}}></lyte-text>
 *							<span class="lyteFileUpdFileSize">( {{lyteUiFileSize(item.size, ltPropFileUnit, ltPropDigits)}} )</span>
 *							<lyte-file-close data-value = {{item.id}} class = {{item.status}}></lyte-file-close>
 *						</div>
 *					</template>
 *					<template lyte-for="{{queueList}} as item index">
 *	  	  	  	  		<div class="lyteFileUpdListFile {{item.status}}"> 
 *	  	  	  	  	 		<div class="lyteFileUpdTypePreview">
 *	  	  	  	  	  	  		<template lyte-if="{{item.src}}"> 
 *	  	  	  	  	  	  			<img class="lyteFileUpdThumb" src={{item.src}}>
 *	  	  	  	  	  	  		</template>
 *								<template lyte-else>
 *	  	  	  	  	  	  			<span class="lyteFileUpdTypeIcon {{item.fileType}}"> </span>
 *	  	  	  	  	  	  		</template>
 *	  	  	  	  	  		</div> 
 *	  	  	  	  	  		<lyte-text class = "lyteFileUpdFileName" lt-prop-value = {{item.name}}> </lyte-text>
 *	  	  	  	  	  		<span class="lyteFileUpdFileSize"> ( {{lyteUiFileSize(item.size, 'KB', 2)}} ) </span>
 *	  	  	  	  	  		<div lyte-if="{{item.percentage != undefined}}" class="lyteFileUpdFileStatus" data-completed = {{item.percentage}}> 
 *	  	  	  	  	  	 		<div class="lyteFileUpdProgressBar {{item.status}}"> 
 *	  	  	  	  	  	  			<div class="lyteFileUpdProgressFill" style="width: %"> </div> 
 *	  	  	  	  	  	 		</div> 
 *	  	  	  	  	  		</div> 
 *	  	  	  	  	  		<lyte-file-retry lyte-if='{{item.status=="error"}}' data-value = {{item.id}}> 
 *	  	  	  	  	  	  		<span class="lyteFileUpdFailMsg"> Attachment failed </span>
 *	  	  	  	  	  	  		<span class="lyteFileUpdRetryMsg"> Retry </span>
 *	  	  	  	  	  		</lyte-file-retry> 
 *	  	  	  	  	  		<lyte-file-close data-value = {{item.id}} class = {{item.status}}> </lyte-file-close>
 *	  	  	  	 		</div> 
 *	  	  	  		</template>
 *	 			</div> 
 *	  		</lyte-file-select-area> 
 *		</template> 
 *	</lyte-fileupload>  
 */
Lyte.Component.register( 'lyte-code-snippet', {
_template:"<template tag-name=\"lyte-code-snippet\"> <div class=\"lyteCSHeader\"> <template is=\"if\" value=\"{{ltPropTitle}}\"><template case=\"true\"> <div class=\"lyteCSTitle\"> {{ltPropTitle}} </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropCopyButtonAppearance,'===',&quot;text&quot;)}}\"><template case=\"true\"> <lyte-button class=\"lyteCSCopyButton\" __click=\"{{action('copyCode')}}\"> <template is=\"registerYield\" yield-name=\"text\"> copy </template> </lyte-button> </template><template case=\"false\"> <span class=\"lyteCSCopyIcon\" lt-prop-title=\"{{ltPropCopyTooltipText}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;bottom&quot;}\" __click=\"{{action('copyCode')}}\"></span> </template></template> </div> <div class=\"lyteCSContainer\" style=\"height: 400px;\" __scroll=\"{{action('alignCodeAndLineContainer',event)}}\"> <template is=\"if\" value=\"{{ltPropShowLineNumber}}\"><template case=\"true\"> <div class=\"lyteCSLineNumberContainer\"> </div> </template></template> <div class=\"lyteCSCodeContainer\"> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}],
_observedAttributes :["ltPropCode","ltPropType","ltPropInitialLineCount","ltPropLinesPerScroll","ltPropLazyLoading","ltPropShowLineNumber","ltPropTitle","ltPropCopyButtonAppearance","ltPropCopyTooltipText"],

	data: function() {
		return {
			'ltPropCode': Lyte.attr( 'string', { 'default': '' } ),
			'ltPropType': Lyte.attr( 'string', { 'default': 'js' } ),
			'ltPropInitialLineCount': Lyte.attr( 'number', { 'default': 100 } ),
			'ltPropLinesPerScroll': Lyte.attr( 'number', { 'default': 100 } ),
			'ltPropLazyLoading': Lyte.attr( 'boolean', { 'default': false } ),
			'ltPropShowLineNumber': Lyte.attr( 'boolean', { 'default': true } ),
			'ltPropTitle': Lyte.attr( 'string', { 'default': '' } ),
			'ltPropCopyButtonAppearance': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-code-snippet', 'copyButtonAppearance', 'text' ) } ),
			'ltPropCopyTooltipText': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-code-snippet', 'copyTooltipText', 'copy' ) } )
		};
	},

	didConnect: function() {
		this.createMessageBox();
	},

	createMessageBox: function() {
		if( this.getMessageBox() ) {
			return ;
		}
		
		var messageBox = document.createElement( 'lyte-messagebox' );

		messageBox.setAttribute( 'id', 'lyteCSMessageBox' );

		document.body.appendChild( messageBox );
	},

	tokenizeAndBuild: function() {
		var type = this.getData( 'ltPropType' ) || 'js',
		code = this.getData( 'ltPropCode' ),
		tokensObj;

		if( !this.isContainerEmpty() ) {
			this.removeBuiltCode();
		}

		if( code ) {
			var builder = $L.snippets.getBuilder( type, code ),
			result = builder.build();
			this.fixDimensionsAndAppend( result.snippet );
			this.buildLineNumbers( result.lineCount ); 
			
		}

	}.observes( 
		'ltPropCode'
	)
	.on( 'didConnect' ),

	buildLineNumbers: function( totalLines ) {
		var docFrag = document.createDocumentFragment();

		for( var i = 1; i <= totalLines; i++ ) {
			var line = document.createElement( 'span' );

			line.setAttribute( 'class', 'lyteCSLineNumber' );
			line.textContent = i;
			docFrag.appendChild( line );
		}

		this.getLineNumberContainer().appendChild( docFrag );
	},

	isContainerEmpty: function() {
		var children = this.getChildren();

		return children.length === 0;
	},

	getChildren: function() {
		var container = this.getSnippetContainer();

		return container.children;
	},

	removeBuiltCode: function() {
		var container = this.getSnippetContainer(),
		lineNumberContainer = this.getLineNumberContainer();

		container.innerHTML = '';
		lineNumberContainer.innerHTML = '';
	},

	buildHighlighterObj: function( tokensObj ) {
		var lineCount = tokensObj.lineCount,
		lazyLoading = this.getData( 'ltPropLazyLoading' ),
		initialCount = lazyLoading ? this.getData( 'ltPropInitialLineCount' ) || 100 : lineCount,
		perScroll = this.getData( 'ltPropLinesPerScroll' ) || 100;

		return {
			lineCount: lineCount,
			initialCount: initialCount,
			perScroll: perScroll,
			container: this.getSnippetContainer(),
			lineNumberContainer: this.getLineNumberContainer(),
			showLineNumber: this.getData( 'ltPropShowLineNumber' )
		}
	},

	buildSnippet: function( tokensObj ) {
		var tokens = tokensObj.tokens,
		highlighterObj = this.buildHighlighterObj( tokensObj ),
		snippet;

		snippet = this.convertToHTML( tokens, highlighterObj );
		this.fixDimensionsAndAppend( snippet, highlighterObj );
	},

	fixDimensionsAndAppend: function( snippet, highlighterObj ) {
		var lazyLoading = this.getData( 'ltPropLazyLoading' ),
		// highlighter = this.getData( 'highlighter' ),
		// height = highlighter.height,
		container = this.getSnippetContainer(),
		lineCount = ( highlighterObj || {} ).lineCount;

		if( lazyLoading ) {
			totalHeight = height * lineCount;
			container.style.height = totalHeight + 'px';
		}
		
		container.appendChild( snippet );
	},

	convertToHTML: function( tokens, highlighterObj ) {
		var type = this.getData( 'ltPropType' ),
		highlighter = $L.highlighter.getHighlighter( type, tokens, highlighterObj );

		this.setData( 'highlighter', highlighter );

		return highlighter.build();	
	},

	getSnippetContainer: function() {
		return this.$node.querySelector( '.lyteCSCodeContainer' );
	},

	getLineNumberContainer: function() {
		return this.$node.querySelector( '.lyteCSLineNumberContainer' );
	},

	isEmpty: function( element ) {
		return !element.querySelector( '*' );
	},

	scrollExceededLimit: function() {
		var totalScroll = this.getScrollPosition(),
		currentRenderedHeight = this.getCurrentRenderedHeight();

		return totalScroll > currentRenderedHeight - 100;
	},

	getScrollPosition: function() {
		var scrollableDiv = this.getScrollableDiv(),
		scrollTop = scrollableDiv.scrollTop,
		offsetHeight = scrollableDiv.offsetHeight,
		totalScroll = scrollTop + offsetHeight;

		return totalScroll;
	},

	getScrollableDiv: function() {
		return this.$node.querySelector( '.lyteCSContainer' );
	},

	getCurrentRenderedHeight: function() {
		var highlighter = this.getData( 'highlighter' ),
		perScroll = highlighter.perScroll,
		batchEnd = highlighter.batchEnd, 
		height = highlighter.height;

		return height * ( batchEnd - perScroll );
	},

	buildMoreContent: function() {
		var numberOfTimesToBuild = this.numberOfTimesToBuild(),
		highlighter = this.getData( 'highlighter' ), ret, container = this.getSnippetContainer();

		for( var i = 0; i < numberOfTimesToBuild; i++ ) {
			ret = highlighter.build();

			if( !this.isEmpty( ret ) ) {
				container.appendChild( ret );
			}
		}
	},

	numberOfTimesToBuild: function() {
		var totalScroll = this.getScrollPosition(),
		renderedHeight = this.getCurrentRenderedHeight(),
		diff = totalScroll - renderedHeight,
		highlighter = this.getData( 'highlighter' ),
		perScroll = highlighter.perScroll,
		height = highlighter.height;

		if( diff < 0 ) {
			return 1;
		}
		else {
			return Math.ceil( diff / ( perScroll * height ) );
		}
	},

	AdjustLineNumberContainer: function() {
		var div = this.getScrollableDiv(),
		scrollLeft = div.scrollLeft,
		lineNumberContainer = this.getLineNumberContainer();

		lineNumberContainer.style.transform = 'translateX(' + scrollLeft + 'px)';
	},

	displaySuccessMessage: function() {
		var messageBox = this.getMessageBox();

		messageBox.ltProp( 'message', 'copied' );
		messageBox.ltProp( 'type', 'success' );
		messageBox.ltProp( 'show', true );
	},

	getMessageBox: function() {
		return document.getElementById( 'lyteCSMessageBox' );
	},

	displayFailureMessage: function() {
		var messageBox = this.getMessageBox();

		messageBox.ltProp( 'message', 'unable to copy' );
		messageBox.ltProp( 'type', 'error' );
		messageBox.ltProp( 'show', true );
	},

	actions: {
		addMoreLines: function() {
			var lazyLoading = this.getData( 'ltPropLazyLoading' ),
			showLineNumber = this.getData( 'ltPropShowLineNumber' );

			if( !lazyLoading ) {
				return ;
			}

			if( this.scrollExceededLimit() ) {
				this.buildMoreContent();
			}

			if( showLineNumber ) {
				this.AdjustLineNumberContainer();
			}

		},

		alignCodeAndLineContainer: function( event ) {
			var codeContainer = event.target,
			scrollPosition = codeContainer.scrollTop;

			this.getLineNumberContainer().scrollTop = scrollPosition;
		},

		copyCode: function() {
			var text = this.getData( 'ltPropCode' ), that = this;

			navigator.clipboard.writeText( text ).then( function() {
				that.displaySuccessMessage();
			}, function( err ) {
				that.displayFailureMessage();
			} );
		}
	}
} );
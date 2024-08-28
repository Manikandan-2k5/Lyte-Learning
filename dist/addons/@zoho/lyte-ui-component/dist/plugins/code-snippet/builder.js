( function() {
	$L.snippets = {
		getBuilder: function( language, str ) {
			return new builder( language, str );
		}
	};

	var builder = function( language, str ) {
		this.tokenizer = $L.snippets.getTokenizer( language, str );
	}

	builder.prototype.buildSnippets = function( tokens ) {
		var result = document.createDocumentFragment(), that = this, curLineNumber = 1;

		var calculateLineNumber = function( value ) {
			var numberOfLineBreaks = ( value.match( /(\n)/g ) || [] ).length;

			curLineNumber += numberOfLineBreaks;
		}

		tokens.forEach( function( token ) {
			var value = token.value,
			tokenObject = token.tokenInfo,
			cls = tokenObject.class || that.getClassForCommonTokens( tokenObject ),
			span = document.createElement( 'span' );

			span.setAttribute( 'class', cls );

				calculateLineNumber( value );

			span.textContent = value;

			result.appendChild( span );
		} );

		return {
			snippet: result,
			lineCount: curLineNumber
		};
	}

	builder.prototype.getClassForCommonTokens = function( tokenObject ) {
		switch( tokenObject.token ) {
			case 'whitespace':
				return 'lyteCSWhiteSpace';
			case 'unmatched-token':
				return 'lyteCSUnmatchedToken';
		}
	}

	builder.prototype.build = function() {
		var tokens = this.tokenizer.build();

		return this.buildSnippets( tokens );
	}

} )();


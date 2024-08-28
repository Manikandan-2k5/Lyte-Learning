$L.tokenizer = {};

( function() {
	var token = function( type, value ) {
		this.type = type;
		this.value = value;
	}

	var registeredTokenizers = {},
	tokenList = [],
	numberOfLines = 1;

	$L.tokenizer.registerTokenizer = function( type, obj ) {
		registeredTokenizers[ type ] = obj;
	}

	$L.tokenizer.addToken = function( value, type ) {
		var tokenObj = new token( type, value );

		tokenList.push( tokenObj );
	}

	$L.tokenizer.incrementLineCount = function() {
		numberOfLines++;
	}

	$L.tokenizer.getCurrentList = function() {
		return tokenList;
	}

	$L.tokenizer.tokenize = function( string, type ) {
		var cb = getCallback( type ), 
		result, lineCount;

		cb( string );
		result = tokenList;
		lineCount = numberOfLines; 
		flushGlobals();

		return {
			tokens: result,
			lineCount: lineCount
		};

	}

	var getCallback = function( type ) {
		type = type || 'js';

		return registeredTokenizers[ type ].tokenize;
	}

	var flushGlobals = function() {
		tokenList = [];
		numberOfLines = 1;
	}
} )();
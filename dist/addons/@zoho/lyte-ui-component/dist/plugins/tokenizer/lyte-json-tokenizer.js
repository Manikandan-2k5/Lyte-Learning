( function() {
	$L.snippets.registerLanguage( 'json', {
		tokenConfig: [ 
			{
				'token': 'punctuation',
				'regex': /({|}|\[|\]|:|,)/,
				'class': 'lyteJSONPunctuation'
			},
			{
				'token': 'literal',
				'regex': /(?<stringStart>["]).*?(?<!\\)(\\\\)*\k<stringStart>/,
				'class': 'lyteJSONLiteral'
			},
			{
				'token': 'null',
				'regex': /null/,
				'class': 'lyteJSONNull'
			},
			{
				'token': 'boolean',
				'regex': /(?:true|false)/,
				'class': 'lyteJSONBoolean'
			},
			{
				'token': 'number',
				'regex': /[0-9]+(\.[0-9]+)?/,
				'class': 'lyteJSONNumber'
			}
		]
	} );
} )();
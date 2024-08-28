( function() {
	var SPACE_RULE = '\\s*',
	ATTRIBUTE_NAME_RULE = '([a-zA-Z_:][a-zA-Z0-9._:-]*)',
	EQUAL_RULE = '(' + SPACE_RULE + '=' + SPACE_RULE + ')',
	REFERENCE_RULE = '(&' + ATTRIBUTE_NAME_RULE + ';|&#[0-9]+;|&#x[0-9a-fA-F]+;)',
	ATTRIBUTE_VALUE_RULE = '"([^<&"]|' + REFERENCE_RULE + ')*"';

	$L.snippets.registerLanguage( 'xml', {
		tokenConfig: [ 
			{
				'group': 'prolog',
				'regex':  new RegExp( '<\\?xml(\\s+' + ATTRIBUTE_NAME_RULE + EQUAL_RULE + ATTRIBUTE_VALUE_RULE + ')*\\?>' ),
				'matched-elements': [ {
					'token': 'punctuation',
					'regex': /(<\?|\?>|=)/,
					'class': 'lyteXMLPunctuation'
				}, {
					'token': 'tag-name',
					'regex': /xml/,
					'class': 'lyteXMLTagName'
				}, {
					'token': 'attribute-name',
					'regex': new RegExp( ATTRIBUTE_NAME_RULE ),
					'class': 'lyteXMLAttributeName'
				}, {
					'token': 'attribute-value',
					'regex': new RegExp( ATTRIBUTE_VALUE_RULE ),
					'class': 'lyteXMLAttributeValue'
				} ]
			}, {
				'token': 'comments',
				'regex': /<!--([\s\S]*?)-->/,
				'class': 'lyteXMLComments'
			},
			{
				'group': 'processing-instructions',
				'regex': new RegExp( '<\\?' + ATTRIBUTE_NAME_RULE + '(' + SPACE_RULE + '[a-zA-Z0-9._:="\'-])*\\?>' ),
				'matched-elements': [ {
					'group': 'processing-instruction-name',
					'regex': new RegExp( '<\\?' + ATTRIBUTE_NAME_RULE ),
					'matched-elements': [ {
						'token': 'punctuation',
						'regex': /<\?/,
						'class': 'lyteXMLPunctuation'
					}, {
						'token': 'processing-instruction-name',
						'regex': new RegExp( ATTRIBUTE_NAME_RULE ),
						'class': 'lyteXMLProcessingInstructionName'	
					} ]
				}, {
					'token': 'punctuation',
					'class': 'lyteXMLPunctuation',
					'regex': /\?>/
				}, {
					'token': 'instruction-data',
					'class': 'lyteXMLPIData',
					'regex': 'remaining'
				} ]
			},
			{
				'group': 'start-tag',
				'regex': new RegExp( '<' + ATTRIBUTE_NAME_RULE + '(\\s+' + ATTRIBUTE_NAME_RULE + EQUAL_RULE + ATTRIBUTE_VALUE_RULE + ')*\\s*/?>' ),
				'matched-elements': [ {
					'group': 'start-tag',
					'regex': new RegExp( '<' + ATTRIBUTE_NAME_RULE ),
					'matched-elements': [ {
						'token': 'punctuation',
						'class': 'lyteXMLPunctuation',
						'regex': /</
					}, {
						'token': 'tag-name',
						'class': 'lyteXMLTagName',
						'regex': new RegExp( ATTRIBUTE_NAME_RULE )
					} ] 
				}, {
					'group': 'attribute-name',
					'regex': new RegExp( ATTRIBUTE_NAME_RULE + EQUAL_RULE ),
					'matched-elements': [ 
						{
							'token': 'attribute-name',
							'class': 'lyteXMLAttributeName',
							'regex': new RegExp( ATTRIBUTE_NAME_RULE )
						}, {
							'token': 'punctuation',
							'class': 'lyteXMLPunctuation',
							'regex': /=/
						}
					 ]
				}, {
					'token': 'punctuation',
					'class': 'lyteXMLPunctuation',
					'regex': /[/>]/
				}, {
					'token': 'attribute-value',
					'class': 'lyteXMLAttributeValue',
					'regex': new RegExp( ATTRIBUTE_VALUE_RULE )
				} ]
			},
			{
				'group': 'end-tag',
				'regex': new RegExp( '</' + ATTRIBUTE_NAME_RULE + '>' ),
				'matched-elements': [ {
					'token': 'punctuation',
					'regex': /(<\/|>)/,
					'class': 'lyteXMLPunctuation'
				}, {
					'token': 'tag-name',
					'regex': new RegExp( ATTRIBUTE_NAME_RULE ),
					'class': 'lyteXMLTagName'
				} ]
			},
			{
				'group': 'content',
				'regex': new RegExp( /[^<]+/ ),
				'matched-elements': [ {
					'token': 'entity',
					'regex': new RegExp( '&' + ATTRIBUTE_NAME_RULE + ';' ),
					'class': 'lyteEntityCls'
				}, {
					'token': 'content',
					'regex': new RegExp( /[^&]+/ ),
					'class': 'lyteContentCls'
				} ]
			},
			{
				'group': 'cdata-sections',
				'regex': new RegExp( '<!\[CDATA\[[a-zA-Z0-9._:="\'\\s<>&-]*?(?=\]\]>)\]\]>' ),
				'matched-elements': [ {
					'group': 'cdata-start',
					'regex': /(<!\[CDATA\[)/,
					'matched-elements': [ {
						'token': 'punctuation',
						'regex': /[<!\[]/,
						'class': 'lyteXMLPunctuation'
					}, {
						'token': 'tag-name',
						'regex': /CDATA/,
						'class': 'lyteXMLTagName'
					} ]	
				}, {
					'token': 'punctuation',
					'regex': /[\]>]/,
					'class': 'lyteXMLPunctuation'
				}, {
					'token': 'cdata-content',
					'regex': /[a-zA-Z0-9._:="'\s<>&-]*?(?=\]\]>)/,
					'class': 'lyteXMLCDATAContent'
				} ]
			},
			{
				'group': 'DTD',
				'regex': /<![a-zA-Z]*[a-zA-Z0-9._:="'\s&-]*?(?=>)>/,
				'matched-elements': [ {
					'group': 'DTD-start',
					'regex': /<![a-zA-Z]*/,
					'matched-elements': [ {
						'token': 'punctuation',
						'regex': /[<!]/,
						'class': 'lyteXMLPunctuation'
					}, {
						'token': 'start-tag',
						'regex': /[a-zA-Z]/,
						'class': 'lyteXMLTagName'
					} ]
				}, {
					'token': 'punctuation',
					'regex': />/,
					'class': 'lyteXMLPunctuation'
				}, {
					'token': 'DTD-content',
					'regex': /[a-zA-Z0-9._:="'\s&-]*?(?=>)/,
					'class': 'lyteXMLDTDContent'
				} ]
			}
		]
	} );
} )();
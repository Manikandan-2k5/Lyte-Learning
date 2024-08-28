( function() {
	$L.snippets.registerLanguage( 'css', {
		tokenConfig: [ 
		{
			'token': 'comment',
			'class': 'lyteCSSComment',
			'regex': /\/\*([\s\S]*?)\*\//
		}, 
		{
			'group': 'ruleset',
			'regex': /.+?(?={){[\s\S]*?(?=})}/,
			'matched-elements': [ {
				'group': 'selector',
				'regex': /.+?(?={)/,
				'matched-elements': [ {
					'token': 'combinator',
					'class': 'lyteCSSCombinator',
					'regex': /[+>~]/
				}, {
					'group': 'attribute-selector',
					'regex': /\[.+?(?=\])\]/,
					'matched-elements': [
						{
							'token': 'punctuation',
							'class': 'lyteCSSPunctuation',
							'regex': /[\[\]]/
						},
						{
							'token': 'attribute-name',
							'class': 'lyteCSSAttributeName',
							'regex': /[^\[\]=]+?(?==)/
						},
						{
							'group': 'attribute-value',
							'regex': /=.*?(?=])]/,
							'matched-elements': [
								{
									'token': 'punctuation',
									'class': 'lyteCSSPunctuation',
									'regex': /[=\]]/
								},
								{
									'token': 'attribute-value',
									'regex': /[^=]*?(?=])/,
									'class': 'lyteCSSAttributeValue'
								}
							]
						}
					]
				}, {
					'token': 'selector',
					'class': 'lyteCSSSelector',
					'regex': /[^+>~\[]*/
				} ]
			}, {
				'group': 'rulebody',
				'regex': /{[\s\S]*?(?=})}/,
				'matched-elements': [ {
					'class': 'lyteCSSPunctuation',
					'token': 'punctuation',
					'regex': /[{}]/
				}, {
					'group': 'declaration',
					'regex': /[^{}]+?(?=[;}]);?/,
					'matched-elements': [ {
						'token': 'rule-name',
						'regex': /[\S]+?(?=:)/,
						'class': 'lyteCSSRuleName'
					}, {
						'group': 'rule-value',
						'regex': /:[\s\S]+?(?=[;}]);?/,
						'matched-elements': [ {
							'group': 'rule-value',
							'regex': /[^:;][^;}]*/,
							'matched-elements': [ {
								'token': 'color-value',
								'regex': /\s*#.*/,
								'class': 'lyteCSSColorValue'
							}, {
								'token': 'important-keyword',
								'regex': /!important/,
								'class': 'lyteCSSImportant'
							}, {
								'token': 'css-function',
								'regex': /[a-zA-Z0-9]+\([a-zA-Z0-9,%\s'"+-/.]+\)/,
								'class': 'lyteCSSValueFunction'
							}, {
								'token': 'rule-value',
								'regex': /[a-zA-Z0-9%'"+-./]+/,
								'class': 'lyteCSSRuleValue'
							} ]
						}, {
							'token': 'punctuation',
							'regex': /[:;]/,
							'class': 'lyteCSSPunctuation'
						} ]
					} ]
				} ] 
			} ]
		} ]
	} );
} )();
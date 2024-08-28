( function() {

	var registeredTokenizers = {};

	$L.snippets.registerLanguage = function( language, config ) {
		buildTokenizer( language, config );
	}

	$L.snippets.getTokenConfig = function( language ) {
		return registeredTokenizers[ language ]._tokenConfig;
	}

	var buildTokenizer = function( language, config ) {
		registeredTokenizers[ language ] = function( str ) {
			this.code = str;
			this.tokenConfig = config.tokenConfig;
			this.language = language;
			this.tokenizer = {};
		}

		registeredTokenizers[ language ]._tokenConfig = config.tokenConfig;

		registeredTokenizers[ language ].prototype.build = function() {
			return this.buildTokens( this.code, this.tokenConfig, true );
		}

		registeredTokenizers[ language ].prototype.setCode = function( code ) {
			this.code = code;
		}

		registeredTokenizers[ language ].prototype.buildTokens = function( code, tokenConfig, buildUnmatchedToken ) {
			var tokenValue, tokenInfo, bestMatchIndex, bestMatch, reduceBy, result = [], that = this, isRemainingPresent = false, remainingToken,
			__fn = function( token ) {
				var regex = token.regex, currentMatch,
				currentMatchIndex;

				if( regex === 'remaining' ) {
					isRemainingPresent = true;
					remainingToken = token;

					return ;
				}

				currentMatch = regex.exec( code );

				if( !currentMatch ) {
					return ;
				}

				currentMatchIndex = currentMatch.index;

				if( isNaN( bestMatchIndex ) || currentMatchIndex < bestMatchIndex || ( currentMatchIndex === bestMatchIndex && currentMatch[ 0 ].length > bestMatch[ 0 ].length ) ) {
					bestMatchIndex = currentMatchIndex;
					bestMatch = currentMatch;
					tokenInfo = token;
				}
			};

			while( code.length != 0 ) {
				tokenConfig.forEach( __fn );

				if( bestMatchIndex != 0 ) {
					if( isRemainingPresent ) {
						reduceBy = code.length;
						tokenValue = code;
						tokenInfo = remainingToken;
					}
					else {
						reduceBy = bestMatchIndex || code.length;
						tokenValue = code.substring( 0, bestMatchIndex );

						if( that.isWhiteSpace( tokenValue ) ) {
							tokenInfo = {
								token: 'whitespace'
							};
						}
						else {
							tokenInfo = {
								token: 'unmatched-token'
							};
						}	
					}
				}
				else {
					reduceBy = bestMatch[ 0 ].length;
					tokenValue = code.substring( 0, bestMatch[ 0 ].length );
				}

				// We will buildUnmatched tokens at the top level
				if( !buildUnmatchedToken && tokenInfo.token === 'unmatched-token' ) {
					return result;
				}

				if( that.isToken( tokenInfo ) ) {
					result.push( that.createToken( tokenValue, tokenInfo ) );
					code = that.reduceStringBy( code, reduceBy );
				}

				if( that.isGroup( tokenInfo ) ) {
					result = result.concat( that.buildTokens( bestMatch[ 0 ], tokenInfo[ 'matched-elements' ] ) );
					code = that.reduceStringBy( code, bestMatch[ 0 ].length );
				}

				if( that.shouldUseOtherTokenizer( tokenInfo, bestMatch ) ) {
					var tokenizerInfo = that.getTokenizerInfo( tokenInfo, bestMatch );

					var codeToParse = tokenizerInfo.regex.exec( code )[ 0 ];

					that.decorateTokenizer( tokenizerInfo );

					result = result.concat( that.useSubTokenizer( tokenizerInfo.parseWith, codeToParse ) );
					code = that.reduceStringBy( code, codeToParse.length );
				}
				

				if( that.hasNextTokens( tokenInfo ) ) {
					result = result.concat( that.buildTokens( code, tokenInfo.nextTokens ) );
					code = that.reduceStringBy( code, nextTokens );
				}

				tokenValue = tokenInfo = bestMatchIndex = bestMatch = reduceBy = undefined;

			}

			return result;
		}

		registeredTokenizers[ language ].prototype.isToken = function( token ) {
			return 'token' in token;
		}

		registeredTokenizers[ language ].prototype.isWhiteSpace = function( value ) {
			return /[\s]*/.test( value );
		}

		registeredTokenizers[ language ].prototype.isGroup = function( token ) {
			return 'group' in token;
		}

		registeredTokenizers[ language ].prototype.hasNextTokens = function( token ) {
			return 'nextTokens' in token;
		}

		registeredTokenizers[ language ].prototype.createToken = function( tokenValue, tokenObject ) {
			return {
				value: tokenValue,
				tokenInfo: tokenObject
			}
		}

		registeredTokenizers[ language ].prototype.reduceStringBy = function( code, val ) {

			if( Array.isArray( code ) ) {
				var tokens = code, result = '';

				tokens.forEach( function( token ) {
					result += token.value;
				} );

				return code.substring( result.length );
			}

			return code.substring( val );
		}

		registeredTokenizers[ language ].prototype.shouldUseOtherTokenizer = function( token, match ) {
			return 'tokenizer' in token && this.getTokenizerInfo( token, match );
		}

		registeredTokenizers[ language ].prototype.getTokenizerInfo = function( token, match ) {
			var groups = match.groups,
			tokenizerInfoList = token.tokenizer;

			for( var i = 0; i < tokenizerInfoList.length; i++ ) {
				var tokenizerInfo = tokenizerInfoList[ i ];

				if( this.hasMatchingGroup( tokenizerInfo, groups ) ) {
					return tokenizerInfo;
				}
			}
		}

		registeredTokenizers[ language ].prototype.hasMatchingGroup = function( tokenizer, groups ) {
			for( var groupName in groups ) {
				var value = groups[ groupName ];

				if( groupName === tokenizer[ 'matched-group' ] && value === tokenizer.value ) {
					return true;
				}
			}

			return false;
		}

		registeredTokenizers[ language ].prototype.decorateTokenizer = function( tokenizerInfo ) {
			var language = tokenizerInfo.parseWith;

			if( !this.tokenizer[ language ] ) {
				this.tokenizer[ language ] = $L.snippets.getTokenizer( language );
			}
		}

		registeredTokenizers[ language ].prototype.useSubTokenizer = function( language, str ) {
			this.tokenizer[ language ].setCode( str );

			return this.tokenizer[ language ].build();
		}
	}

	$L.snippets.getTokenizer = function( language, str ) {
		return new registeredTokenizers[ language ]( str );
	}

} )();


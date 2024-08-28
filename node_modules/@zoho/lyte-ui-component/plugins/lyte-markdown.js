/** Think about the from = 'italics' problem that you faced and fix that
We removed a condition which would normally convert a italics symbol into a text
refer the other types to get a better understanding
**/
( function() {

	var reg_sinks = {
		// 'text': /[a-zA-Z]/i,
		'line_break': /(\n|\r\n|\r)/,
		'special': /[*#\-_~!`()\[\]\.|"]/,
		'space': /[ ]/,
		'number': /\d/
	};

	var typeMap = {
		'b': 'bold',
		'i': 'italics',
		'u': 'underline',
		's': 'strike',
		'div': 'para',
		'table': 'table',
		'thead': 'thead',
		'tbody': 'tbody',
		'tr': 'tr',
		'td': 'td',
		'th': 'th',
		'img': 'image',
		'a': 'hyperlink',
		'ul': 'ul',
		'ol': 'ol',
		'li': 'li',
		'mark': 'mark',
		'blockquote': 'blockquote',
		'h1': 'h1',
		'h2': 'h2',
		'h3': 'h3',
		'h4': 'h4',
		'h5': 'h5'
	};

	function flushBuf( buf ) {
		var ret = buf.flush();

		if( ret ) {
			return new token( ret, 'text' );	
		}
	}

	function token( value, type ) {
		var obj = {
			value: value,
			type: type
		};

		this.get = function( name ) {
			return obj[ name ] || '';
		}

		return this;
	}

	function buffer() {
		var buffer = [];

		this.push = function( char ) {
			buffer.push( char );
		}

		this.flush = function() {
			var temp = buffer;

			buffer = [];

			return temp.join( "" );
		}
	}

	function tokenList() {
		var tokens = [],
		pointer = 0;

		this.push = function( token ) {
			if( token ) {
				tokens.push( token );
			}
		}

		this.peek = function() {
			return tokens[ pointer ] || new token();
		}

		this.peekback = function() {
			return tokens[ pointer - 1 ] || new token();
		}

		this.eat = function() {
			return tokens[ pointer++ ] || new token();
		}

		this.pointer = function( num ) {
			return !isNaN( num ) ? ( pointer = num ) : pointer;
		}

		this.moveback = function() {
			pointer--;
		}

		/* probably not this guy */		
		this.flush = function() {
			pointer = 0;
			tokens = [];
		}
	}

	function stack() {
		var stack = [];

		this.push = function( val ) {
			stack.push( val );

			return val;
		}

		this.pop = function() {
			stack.pop();
		}

		this.callStackContains = function( val ) {
			return !!~stack.indexOf( val );
		}

		this.isEmpty = function() {
			return stack.length === 0;
		}
	}

	function isSpace( char ) {
		return reg_sinks.space.test( char );
	}

	function isLineBreak( char ) {
		return reg_sinks.line_break.test( char );
	}

	// function isText( char ) {
	// 	return reg_sinks.text.test( char );
	// }

	function isSpecial( char ) {
		return char.match( reg_sinks.special );
	}

	function lex( text ) {
		var i = 0, length = text.length,
		buf = new buffer(), char, ret, _special, 
		list = new tokenList();

		for( ; i < length; i++ ) {
			char = text.charAt( i );

			if( isLineBreak( char ) ) {
				list.push( flushBuf( buf ) );
				list.push( new token( char, 'line_break' ) );
			}
			else if( ( _special = isSpecial( char ) ) ) {
				list.push( flushBuf( buf ) );
				list.push( new token( char, 'special' + _special[ 0 ] ) );
			}
			else if( isSpace( char ) ) {
				list.push( flushBuf( buf ) );
				list.push( new token( char, 'space' ) );
			} 
			else {
				buf.push( char );
			}
		}

		list.push( flushBuf( buf ) );

		return list;
	}


	// Node can either be a text or a node
	function getText( node ) {
		var text;

		if( typeof node !== 'string' ) {
			text = $L._lyteHTMLToText( node );
		}
		else {
			text = node;
		}

		return text;
	}

	/* The buildConfig is used to create a closure variable(an interface) which can be used to access the individual properties */
	/* 
	For now we are returning all attributes in a config but there can be a case where one of the attributes is a tagname instead of an
	attribute 
	*/
	function buildConfig( totalConfiguration ) {
		var attributes = [ 
						'bold', 'italics', 'strike', 'underline', 'blockquote', 'mark',
						'para',  
						'hyperlink', 'image', 
						'header', 'h1', 'h2', 'h3', 'h4', 'h5',
						'ol', 'ul', 'li',
						'table', 'thead', 'tbody', 'tr', 'th', 'td' ],

		configs = {};

		totalConfiguration = totalConfiguration || {};

		attributes.forEach( function( item ) {
			configs[ item ] = new config( totalConfiguration[ item ] );
		} );

		return {
			getAllAttributes: function( configName ) {
				return configs[ configName ].getAllAttributes();
			},

			getAttribute: function( configName, attributeName ) {
				return configs[ configName ].getAttribute( attributeName ) || '';
			}
		};
	}

	function config( config ) {
		var configStore = config || {};

		this.getAttribute = function( name ) {
			return configStore[ name ];
		}

		this.getAllAttributes = function() {
			return configStore;
		}

		return this;
	}

	function _rDP( list, totalConfiguration ) {
		var cs = new stack(),
		userConfig = buildConfig( totalConfiguration ),
		isTableCell, onBeforeAppend = ( totalConfiguration || {} ).onBeforeAppend;

		function join( high, low ) {
			var obj = {};

			$L.extend( obj, low );
			$L.extend( obj, high );

			return obj;
		}

		function addAllAttributes( node, configName ) {
			var attributes, key,
			domObj = $L( node );

			if( !!~[ 'h1', 'h2', 'h3', 'h4', 'h5' ].indexOf( configName ) ) {
				attributes = join( userConfig.getAllAttributes( configName ), userConfig.getAllAttributes( 'header' ) );
			}
			else {
				attributes = userConfig.getAllAttributes( configName );
			}

			for( key in attributes ) {
				domObj.attr( key, attributes[ key ] );
			}
		}

		var capture = function() {
			return list.pointer();
		}

		var backtrack = function( val ) {
			list.pointer( val );
		}

		var isEmpty = function( frag ) {
			if( typeof frag === 'boolean' ) {
				return true;
			}

			// Added a fix for IE where you have to trim the textContent or else its flags empty fragments as non empty
			return !frag.querySelector( '*' ) && !frag.textContent.trim();
		}

		var buildHeader = function() {
			var count = 0, header;

			count = findHeaders();

			if( count <= 5 
				&& (
					( !shouldConsiderWhiteSpace() && !isWhiteSpace() ) 
					|| ( shouldConsiderWhiteSpace() && isWhiteSpace( list.eat() ) )
				)
				&& hasTextualCharacter() 
			) {

				header = document.createElement( 'h' + count );
				addAllAttributes( header, 'h' + count );
				para( header );

				return header;
			}
		}

		var shouldConsiderWhiteSpace = function() {
			return !userConfig.getAttribute( 'header', 'ignoreWhiteSpaceJoiner' );
		}

		var hasTextualCharacter = function() {
			var mem = capture();

			while( !endOfLine() ) {
				if( !isWhiteSpace() ) {
					backtrack( mem );

					return true;
				}

				list.eat();
			}

			backtrack( mem );

			return false;
		} 

		var findHeaders = function() {
			var count = 0;

			while( list.peek().get( 'type' ) === 'special#' ) {
				count++;
				list.eat();
			}

			return count;
		}

		var buildQuote = function() {
			var quote;

			if( hasTextualCharacter() ) {
				quote = document.createElement( 'blockquote' );
				addAllAttributes( quote, 'blockquote' );
				para( quote );

				return quote;
			}
			
		}

		var getType = function( tag ) {
			return typeMap[ tag ];
		}

		var getElementToAppend = function( element ) {
			var tag = element.tagName.toLowerCase(),
			type = getType( tag ), ret;

			if( onBeforeAppend ) {
				ret = onBeforeAppend.call( window, element, type );
			}

			return ret ? ret : element;
		}

		var appendElement = function( parent, child ) {
			if( !parent || !child ) {
				return ;
			}

			var nodeType = child.nodeType;

			if( nodeType === 1 ) {
				child = getElementToAppend( child );	
			}
			
			parent.appendChild( child );
		}

		var buildMarkdown = function() {
			var div = document.createElement( 'div' ), ret;

			while( list.peek().get( 'type' ) !== '' ) {
				ret = buildBasedOnFirstCharacter() || document.createDocumentFragment();

				// Eating the last line line_break in para
				if( list.peek().get( 'type' ) === 'line_break' ) {
					list.eat();
				}

				appendElement( div, ret );
			}

			return div;
		}

		var buildBasedOnFirstCharacter = function() {
			var p = document.createElement( 'div' ), 
			children, mem, header, quote, table, ret, token;

			addAllAttributes( p, 'para' );
			mem = capture();

			if( isStartOfHeader() ) {
				mem = capture();
				ret = buildHeader();

				if( ret ) {
					appendElement( p, ret );
				}
				else {
					backtrack( mem );
					para( p );
				}
			}

			else if( isQuoteStart() ) {
				token = list.eat();
				mem = capture();
				ret = getImage();

				if( ret ) {
					appendElement( p, ret );

					// Image should use para
					para( p );
				}
				else {
					backtrack( mem );
					ret = buildQuote();

					if( ret ) {
						// This guy doesn't need para
						appendElement( p, ret );
					}
					else {
						backtrack( mem );
						consumeCharacter( p, token );
						para( p );
					}
				}
			}

			else if( isOrderedListStart() ) {
				// Need to fix this
				appendElement( p, buildOrderedList() );
			}

			else if( isUnorderedListStart() ) {
				// Need to fix this
				appendElement( p, buildUnorderedList() );
			}

			else if( isTableStart() ) {
				table = buildTable();

				if( table ) {
					appendElement( p, table );
					list.moveback();
				}
				else {
					backtrack( mem );
					para( p );
				}
			}
			else {
				backtrack( mem );
				para( p );
			}

			return p;

		}

		var isStartOfHeader = function() {
			var mem = capture();

			consumeLeadingWhiteSpaces();

			if( list.peek().get( 'type' ) === 'special#' ) {
				return true;
			}
			else {
				backtrack( mem );

				return false;
			}
		}

		var isQuoteStart = function() {
			var mem = capture();

			consumeLeadingWhiteSpaces();

			if( isImageStart() ) {
				return true;
			}
			else {
				backtrack( mem );

				return false;
			}
		}

		var consumeLeadingWhiteSpaces = function() {
			while( isWhiteSpace() ) {
				list.eat();
			}
		}

		var isTableStart = function() {
			var mem = capture(), token,
			type;

			consumeLeadingWhiteSpaces();

			token = list.peek(),
			type = token.get( 'type' )

			if( type === 'special|' ) {
				return true;
			}
			else {
				backtrack( mem );

				return false;
			}
		}

		var buildTable = function() {
			var table = document.createElement( 'table' ),
			tableHeader = getTableHeader(),
			tableRow, isProperSyntax;

			if( !tableHeader ) {
				return false;
			}

			isProperSyntax = consumeHeaderFooter( tableHeader.column_count );

			if( !isProperSyntax ) {
				return false;
			}

			appendElement( table, tableHeader.header );
			isProperSyntax = buildTableBody( tableHeader.column_count );

			if( !isProperSyntax ) {
				return false;
			}

			appendElement( table, isProperSyntax );
			addAllAttributes( table, 'table' );

			return table;
		}

		var buildTableBody = function( column_count ) {
			var tableRow, body = document.createElement( 'tbody' );

			while( isValidRow( buildLine() ) ) {
				tableRow = getTableRow( column_count );

				if( !tableRow ) {
					return false;
				}

				appendElement( body, tableRow );
			}

			if( body.children.length === 0 ) {
				return false;
			}

			addAllAttributes( body, 'tbody' );

			return body;
		}

		var buildLine = function() {
			var mem = capture(),
			res = '';

			while( !endOfLine() ) {
				res = res + list.eat().get( 'value' );
			}

			backtrack( mem );

			return res;
		}

		var isValidRow = function( res ) {
			return !!~res.indexOf( '|' )
		}

		var getTableRow = function( column_count ) {
			var row = document.createElement( 'tr' ), cell,
			mem = capture(), currentColumnCount = 0;

			consumeLeadingWhiteSpaces();

			while( list.eat().get( 'type' ) === 'special|' ) {
				cell = buildCell();

				if( cell ) {
					currentColumnCount++;
					appendElement( row, cell );
				}
			}

			if( currentColumnCount < column_count ) {
				addRemainingColumns( row, currentColumnCount, column_count );
			}

			if( currentColumnCount > column_count ) {
				return false;
			}

			addAllAttributes( row, 'tr' );

			return row;

		}

		var addRemainingColumns = function( row, cur, max ) {
			var cell;

			for( var i = cur; i < max; i++ ) {
				cell = document.createElement( 'td' );
				appendElement( row, cell );
				addAllAttributes( cell, 'td' );
			}
		}

		var buildCell = function() {
			var frag = document.createDocumentFragment(),
			cell = document.createElement( 'td' );

			isTableCell = true;
			para( frag );
			isTableCell = false;
			trimFragment( frag );

			if( isEmpty( frag ) ) {
				return false;
			}

			cell.appendChild( frag );
			addAllAttributes( cell, 'td' );

			return cell;
		}

		var trimFragment = function( frag ) {
			trimLeadingSpaces( frag );
			trimTrailingSpaces( frag );
		}

		var trimLeadingSpaces = function( frag ) {
			var firstNode = frag.childNodes[ 0 ], 
			value, rLeadingSpace = /^\s+/g;

			if( firstNode 
				&& firstNode.nodeType === 3 
			) {
				value = firstNode.nodeValue;
				value = value.replace( rLeadingSpace, '' );
				firstNode.nodeValue = value;
			}
		}

		var trimTrailingSpaces = function( frag ) {
			var length = frag.childNodes.length,
			lastNode = frag.childNodes[ length - 1 ],
			value, rTrailingSpace = /\s+$/g;

			if( lastNode 
				&& lastNode.nodeType === 3 
			) {
				value = lastNode.nodeValue;
				value = value.replace( rTrailingSpace, '' );
				lastNode.nodeValue = value;
			}
		}

		var consumeHeaderFooter = function( column_count ) {
			var columnCount = 0, hasNonTrailingCharacters;

			consumeLeadingWhiteSpaces();

			while( !endOfLine() ) {

				if( trailingCharacter() ) {
					break;
				}

				if( list.peek().get( 'type' ) !== 'special|' && list.peek().get( 'type' ) !== 'special-' ) {
					return false;
				}

				if( list.eat().get( 'type' ) === 'special|' && list.peek().get( 'type' ) === 'special-' ) {
					columnCount++;
				}
			}

			hasNonTrailingCharacters = consumeTrailingCharacters();

			if( hasNonTrailingCharacters ) {
				return false;
			}

			return columnCount === column_count;
		}

		var getTableHeader = function() {
			var header = document.createElement( 'thead' ),
			row = document.createElement( 'tr' ),
			column_count, head, hasNonTrailingCharacters;

			while( list.peek().get( 'type' ) === 'special|' ) {
				list.eat();
				head = buildHead();

				if( head ) {
					appendElement( row, head );
				}
			}

			column_count = row.children.length;

			if( column_count === 0 ) {
				return false;
			}
			
			appendElement( header, row );			
			hasNonTrailingCharacters = consumeTrailingCharacters();
			
			if( hasNonTrailingCharacters ) {
				return false;
			}

			addAllAttributes( header, 'thead' );
			addAllAttributes( row, 'tr' );

			return {
				column_count: column_count,
				header: header
			}
		}

		var buildHead = function() {
			var frag = document.createDocumentFragment(),
			headerCell = document.createElement( 'th' );

			isTableCell = true;
			para( frag );
			isTableCell = false;
			trimFragment( frag );

			if( isEmpty( frag ) ) {
				return false;
			}

			headerCell.appendChild( frag );
			addAllAttributes( headerCell, 'th' );

			return headerCell;
		}

		var endOfCell = function() {
			return list.peek().get( 'type' ) === 'special|' 
				|| list.peek().get( 'type' ) === 'line_break' 
				|| list.peek().get( 'type' ) === ''
		}

		var consumeTrailingCharacters = function() {
			while( !endOfLine() ) {
				if( !trailingCharacter() ) {
					return false;
				}

				list.eat();
			}

			list.eat();
		}

		var trailingCharacter = function() {
			return list.peek().get( 'type' ) === 'line_break' 
				|| list.peek().get( 'type' ) === '' 
				|| isWhiteSpace()
		}

		var endOfLine = function() {
			return list.peek().get( 'type' ) === 'line_break' || list.peek().get( 'type' ) === ''
		}

		var buildOrderedList = function() {
			var parent = document.createElement( 'ol' );

			do {
				appendElement( parent, buildListItem() );
				consumeTrailingCharacters();
			}while( isStartOfList() );

			addAllAttributes( parent, 'ol' );

			return parent;
		}

		var buildUnorderedList = function() {
			var parent = document.createElement( 'ul' );

			do {
				appendElement( parent, buildListItem() );
				consumeTrailingCharacters();
			}while( isStartOfList() );

			addAllAttributes( parent, 'ul' );

			return parent;
		}

		var buildListItem = function() {
			var item = document.createElement( 'li' ),
			frag = document.createDocumentFragment();

			para( frag );

			item.appendChild( frag );	

			return item;
		}

		var isStartOfList = function() {
			var mem = capture(),
			isListStart = isOrderedListStart() || ( backtrack( mem ), isUnorderedListStart() );

			if( !isListStart ) {
				backtrack( mem );
			}

			return isListStart;
		}

		var isOrderedListStart = function() {
			var mem = capture(), 
			token, value, type, isValidStart;

			consumeLeadingWhiteSpaces();

			token = list.eat();
			value = token.get( 'value' );
			type = token.get( 'type' );

			if( type === 'text' && !isNaN( value ) ) {
				isValidStart = list.eat().get( 'type' ) === 'special.' && list.eat().get( 'type' ) === 'space';
			}

			if( !isValidStart ) {
				backtrack( mem );
			}

			return isValidStart;
		}

		var isUnorderedListStart = function() {
			var mem = capture(), 
			token, value, type, isValidStart;

			consumeLeadingWhiteSpaces();

			token = list.eat();
			value = token.get( 'value' );
			type = token.get( 'type' );

			if( type === 'special*' || type === 'special-' ) {
				isValidStart = list.eat().get( 'type' ) === 'space';
			}

			if( !isValidStart ) {
				backtrack( mem );
			}

			return isValidStart;
		}

		var getEmphasisOrConsumeCharacter = function( allowSpace ) {
			var value = list.peek().get( 'value' ), 

			// It can have text because bold, italics, strike and underline call it as well
			type = list.peek().get( 'type' ), frag, ret, mem;

			switch( value ) {
				case '*':
					if( ( mem = capture(), ret = bold() ) ) {
						return ret;
					}
					else if( ( backtrack( mem ), !cs.callStackContains( 'bold' ) ) || ( cs.callStackContains( 'bold' ) && ( backtrack( mem ), list.peekback().get( 'type' ) === 'space' ) ) ) {
						list.eat();
						ret = document.createTextNode( '*' );

						return ret;	
					}
					else if( cs.callStackContains( 'bold' ) ) {
						return false;
					}
					
					break;
				case '_': 
					mem = capture();

					if( isUnderLineStart() ) {
						backtrack( mem );
						return buildUnderline();
					}
					else {
						backtrack( mem );
						return buildItalics();
					}

					break;
				case '~':
					if( ( mem = capture(), ret = strike() ) ) {
						return ret;
					}
					else if( ( backtrack( mem ), !cs.callStackContains( 'strike' ) ) || ( cs.callStackContains( 'strike' ) && ( backtrack( mem ), list.peekback().get( 'type' ) === 'space' ) ) ) {
						list.eat();
						ret = document.createTextNode( '~' );

						return ret;	
					}
					else if( cs.callStackContains( 'strike' ) ) {
						return false;
					}

					break;
			}

			if( isTextualCharacter() || ( allowSpace && type === 'space' ) ) {
				ret = text();

				return document.createTextNode( ret );
			}

			return false;
		}

		var buildItalics = function() {
			var mem = capture(), ret;

			if( ( ret = italics() ) ) {
				return ret;
			}
			else if( ( backtrack( mem ), !cs.callStackContains( 'italics' ) ) || ( cs.callStackContains( 'italics' ) && ( backtrack( mem ), list.peekback().get( 'type' ) === 'space' ) ) ) {
				list.eat();
				ret = document.createTextNode( '_' );

				return ret;
			}
			else if( cs.callStackContains( 'italics' ) ) {
				return false;
			}
		}

		var buildUnderline = function() {
			var mem = capture(), ret;

			if( ( ret = underline() ) ) {
				return ret;
			}
			else if( ( backtrack( mem ), !cs.callStackContains( 'underline' ) ) || ( cs.callStackContains( 'underline' ) && ( backtrack( mem ), list.peekback().get( 'type' ) === 'space' ) ) ) {
				list.eat();
				ret = document.createTextNode( '_' );

				return ret;
			}
			else if( cs.callStackContains( 'underline' ) ) {
				return false;
			} 
		}

		var isUnderLineStart = function() {
			var first = list.eat(),
			second = list.eat();

			return first.get( 'type' ) === 'special_' && second.get( 'type' ) === 'special_';
		}

		var italics = function() {
			var mem, frag, start, container;

			list.eat();
			mem = capture();
			cs.push( 'italics' );

			if( !isWhiteSpace()
				&& para( frag = document.createDocumentFragment() )
				&& !isWhiteSpace( list.peekback() )
				&& list.eat().get( 'type' ) === 'special_' 
			) {
				container = document.createDocumentFragment();
				container.appendChild( frag );
				cs.pop();

				return createItalics( container );
			}
			else if( ( backtrack( mem ), !isEmpty( ret = recurse( 'special_' ) ) )
				&& list.peekback().get( 'type' ) !== 'space'
				&& list.eat().get( 'type' ) === 'special_' 
			) {
				frag = document.createDocumentFragment();
				frag.appendChild( ret );
				cs.pop();

				return createItalics( frag );
			}

			cs.pop();

			return false;

		}

		var underline = function() {
			var mem, frag, container;

			list.eat();
			list.eat();
			mem = capture();
			cs.push( 'underline' );

			if( !isWhiteSpace()
				&& para( frag = document.createDocumentFragment() )
				&& !isWhiteSpace( list.peekback() )
				&& list.eat().get( 'type' ) === 'special_'
				&& list.eat().get( 'type' ) === 'special_'
			) {
				container = document.createDocumentFragment();
				container.appendChild( frag );
				cs.pop();

				return createUnderline( container );
			}
			else if( ( backtrack( mem ), !isEmpty( ret = recurse( 'underline' ) ) )
				&& list.peekback().get( 'type' ) !== 'space'
				&& list.eat().get( 'type' ) === 'special_' 
				&& list.eat().get( 'type' ) === 'special_' 
			) {
				frag = document.createDocumentFragment();
				frag.appendChild( ret );
				cs.pop();

				return createUnderline( frag );
			}

			cs.pop();

			return false;
		}

		var bold = function() {
			var mem, frag, end, container;

			list.eat();
			mem = capture();
			cs.push( 'bold' );
			
			if( !isWhiteSpace()
				&& para( frag = document.createDocumentFragment() )
				&& !isWhiteSpace( list.peekback() )
				&& list.eat().get( 'type' ) === 'special*' 
			) {
				container = document.createDocumentFragment();
				container.appendChild( frag );
				cs.pop();

				return createBold( container );
			}
			else if( ( backtrack( mem ), !isEmpty( ret = recurse( 'special*' ) ) )
				&& list.peekback().get( 'type' ) !== 'space'
				&& list.eat().get( 'type' ) === 'special*' 
			) {
				frag = document.createDocumentFragment();
				frag.appendChild( ret );
				cs.pop();

				return createBold( frag );
			}

			cs.pop();

			return false;

		}

		var strike = function() {
			var mem, frag, end, container;

			list.eat();
			mem = capture();
			cs.push( 'strike' );
			
			if( !isWhiteSpace()
				&& para( frag = document.createDocumentFragment() )
				&& !isWhiteSpace( list.peekback() )
				&& list.eat().get( 'type' ) === 'special~' 
			) {
				container = document.createDocumentFragment();
				container.appendChild( frag );
				cs.pop();

				return createStrike( container );
			}
			else if( ( backtrack( mem ), !isEmpty( ret = recurse( 'special~' ) ) )
				&& list.peekback().get( 'type' ) !== 'space'
				&& list.eat().get( 'type' ) === 'special~' 
			) {
				frag = document.createDocumentFragment();
				frag.appendChild( ret );
				cs.pop();

				return createStrike( frag );
			}

			cs.pop();

			return false;
		}


		var para = function( parent ) {
			var token = list.peek(), 
			ret, mem, char, code,
			type = token.get( 'type' );

			if( isURL() ) {
				mem = capture();
				ret = getURL();
				appendElement( parent, ret );
				processNextCharacter( parent );

				return ret;

			}

			// Found textual character
			if( isTextualCharacter() || isWhiteSpace() ) {
				ret = consumeText( parent );
				processNextCharacter( parent );

				return ret;
			}

			// Found a possible image
			else if( isImageStart() ) {
				token = list.eat();
				mem = capture();
				ret = getImage();

				if( ret ) {
					appendElement( parent, ret );
					processNextCharacter( parent );

					return ret;
				}
				else {
					backtrack( mem );			
					consumeCharacter( parent, token );
					processNextCharacter( parent );

					return token.get( 'value' );
				}
			}
			
			// Found a possible emphasis token
			else if ( isEmphasis() ) {
				ret = getEmphasisOrConsumeCharacter();
				
				if( ret ) {
					appendElement( parent, ret );
					processNextCharacter( parent );

					return ret;
				}
				else {
					return false;
				}
			}

			// Found highlight character
			else if( isHighlight() ) {
				token = list.eat();
				mem = capture();
				ret = getHighlight();

				if( ret ) {
					appendElement( parent, ret );
					processNextCharacter( parent );

					return ret;
				}
				else {
					backtrack( mem );
					consumeCharacter( parent, token );
					processNextCharacter( parent );

					return token.get( 'value' );
				}
			}

			// Found a link
			else if( isLink() ) {
				token = list.eat();
				mem = capture();
				ret = getLink();

				if( ret ) {
					appendElement( parent, ret );
					processNextCharacter( parent );

					return ret;
				}
				else {
					backtrack( mem );
					consumeCharacter( parent, token );
					processNextCharacter( parent );

					return token.get( 'value' );
				}
			}

			// Found a line_break. End it.
			else if( delimiter() ) {
				return false;
			}
			
			
			// Found a weirdo. Consume weirdo as text.
			else if( !hasEnded( list ) ) {
				token = list.eat();
				mem = capture();
				consumeCharacter( parent, token );
				processNextCharacter( parent );

				return token.get( 'value' );

			}

			if( hasEnded( list ) ) {
				return parent;
			}
		}

		var isURL = function() {
			var mem = capture(),
			token = list.eat(),
			value = token.get( 'value' ),
			type = token.get( 'type' ),
			nextToken = list.peek();

			backtrack( mem );

			return type === 'text' 
				&& ( 
					value.startsWith( 'htt' + 'ps://' ) 
					|| value.startsWith( 'htt' + 'p://' )
					|| ( 
						value.startsWith( 'www' ) 
						&& nextToken.get( 'type' ) === 'special.' 
					) 
				);
		}

		var getURL = function() {
			var href, text, a, textNode;

			href = text = consumeURL();

			a = document.createElement( 'a' );
			href = href.trim();

			if( !href.startsWith( 'htt' + 'ps://' ) && !href.startsWith( 'htt' + 'p://' ) ) {
				href = 'htt' + 'ps://' + href;
			}

			a.href = href
			a.setAttribute( 'target', '_blank' );
			a.setAttribute( 'rel', 'noopener noreferrer' );

			textNode = document.createTextNode( text );
			a.appendChild( textNode );

			addAllAttributes( a, 'hyperlink' );

			return a;

		}

		var consumeURL = function() {
			var str = '';
			
			while( !isWhiteSpace() && !delimiter() ) {
				str += list.eat().get( 'value' );
			}

			return str;	
		}

		var getLink = function() {
			var ret, allowSpace = true, text, textNode,
			href, a, title;

			if( !cs.callStackContains( 'link' ) ) {		
				text = getInnerText();

				if( list.eat().get( 'type' ) !== 'special]' ) {
					return false;
				}

				if( list.eat().get( 'type' ) !== 'special(' ) {
					return false;
				}

				href = consumeAsTextForLink();

				if( ( href || "" ).trim().length === 0 ) {
					return false;
				}

				if( list.peek().get( 'type' ) === 'special"' ) {
					list.eat();
					title = consumeTextAsTitle();

					if( list.eat().get( 'type' ) !== 'special"' ) {
						return false;
					}
				}

				if( list.eat().get( 'type' ) !== 'special)' ) {
					return false;
				}

				a = document.createElement( 'a' );
				a.href = href.trim();
				a.setAttribute( 'target', '_blank' );
				a.setAttribute( 'rel', 'noopener noreferrer' )

				if( text.trim().length === 0 ) {
					text = href.trim();
				}

				textNode = document.createTextNode( text );
				a.appendChild( textNode );

				if( title ) {
					a.setAttribute( 'title', title );
				} 

				addAllAttributes( a, 'hyperlink' );

				return a;
			}

			return false;
		}

		var consumeCharacter = function( parent, token ) {
			var value = token.get( 'value' ),
			textNode = document.createTextNode( value );

			parent.appendChild( textNode );
		}


		var isLink = function() {
			var token = list.peek();

			return token.get( 'type' ) === 'special[';
		}

		var getImage = function() {
			var text, img, alt = '';

			// I don't think this is needed
			if( alreadProcessingLink() ) {
				return false;
			}

			if( list.eat().get( 'type' ) === 'special[' ) {
				alt = consumeAsTextForAlt();

				if( list.eat().get( 'type' ) !== 'special]' ) {
					return false;
				}

				if( list.eat().get( 'type' ) !== 'special(' ) {
					return false;
				}

				text = consumeAsTextForSrc();

				if( list.peek().get( 'type' ) === 'special)' ) {
					list.eat();
				}
				else {
					return false;
				}

				if( ( text || "" ).trim().length === 0 ) {
					return false;
				}

				img = document.createElement( 'img' );
				img.alt = alt;
				img.src = text;
				addAllAttributes( img, 'image' );

				return img;
			}
			else {
				return false;
			}
		}

		var getHighlight = function() {
			var mark, ret;

			if( cs.isEmpty() ) {
				ret = consumeAsTextForHighlight() || "";

				if( ret.trim().length !== 0 && isHighlight() ) {
					list.eat();
					mark = document.createElement( 'mark' );
					mark.appendChild( document.createTextNode( ret ) );
					addAllAttributes( mark, 'mark' );

					return mark;
				}
			}
			
			return false;
		}

		var isHighlight = function() {
			var token = list.peek();

			return token.get( 'type' ) === 'special`';
		}

		var alreadProcessingLink = function() {
			return cs.callStackContains( 'link' );
		}

		var processNextCharacter = function( parent ) {
			var mem = capture();

			if( !para( parent ) ) {
				backtrack( mem );
			}
		}

		var isImageStart = function() {
			var token = list.peek();

			return token.get( 'type' ) === 'special!';
		}

		var consumeText = function( parent ) {
			var ret = text();

			parent.appendChild( document.createTextNode( ret ) );

			return ret;
		}

		var isEmphasis = function() {
			var token = list.peek(),
			type = token.get( 'type' );

			return type === 'special*' || type === 'special_' || type === 'special~';
		}

		var consumeAsTextForLink = function() {
			var str = '';

			while( list.peek().get( 'type' ) !== 'special)'
				&& list.peek().get( 'type' ) !== 'special"'
				&& !delimiter()
			) {
				
				str += list.eat().get( 'value' );
			}

			return str;
		}

		var consumeTextAsTitle = function() {
			var str = '';

			while( list.peek().get( 'type' ) !== 'special"'
				&& !delimiter()
			) {
				
				str += list.eat().get( 'value' );
			}

			return str;
		}

		var consumeAsTextForSrc = function() {
			var str = '';

			while( list.peek().get( 'type' ) !== 'special)'
				&& !delimiter()
			) {
				
				str += list.eat().get( 'value' );
			}

			return str;
		}

		var consumeAsTextForAlt = function() {
			var str = '';

			while( list.peek().get( 'type' ) !== 'special]'
				&& !delimiter()
			) {
				
				str += list.eat().get( 'value' );
			}

			return str;
		}

		var consumeAsTextForHighlight = function() {
			var str = '';

			while( list.peek().get( 'type' ) !== 'special`'
				&& !delimiter()
			) {
				
				str += list.eat().get( 'value' );
			}

			return str;
		}

		var getInnerText = function() {
			var str = '';

			while( list.peek().get( 'type' ) !== 'special]'
				&& !delimiter() 
			) {
				str += list.eat().get( 'value' );
			}

			return str; 
		}

		var delimiter = function() {
			var token = list.peek();

			return isTableCell ? ( token.get( 'type' ) === '' || token.get( 'type' ) === 'line_break' || token.get( 'type' ) === 'special|' )
								: ( token.get( 'type' ) === 'line_break' || token.get( 'type' ) === '' );
		}

		var hasEnded = function( list ) {
			return delimiter();
		}


		var createBold = function( frag ) {
			var b = document.createElement( 'b' );

			b.appendChild( frag );
			addAllAttributes( b, 'bold' );

			return b;
		}

		var createUnderline = function( frag ) {
			var u = document.createElement( 'u' );

			u.appendChild( frag );
			addAllAttributes( u, 'underline' );

			return u;
		}

		var createItalics = function( frag ) {
			var i = document.createElement( 'i' );

			i.appendChild( frag );
			addAllAttributes( i, 'italics' );

			return i;
		}

		var createStrike = function( frag ) {
			var s = document.createElement( 's' );

			s.appendChild( frag );
			addAllAttributes( s, 'strike' );

			return s;
		}

		var recurse = function( type ) {
			var ret, frag = document.createDocumentFragment(),
			allowSpace = false;

			while( ( ret = getEmphasisOrConsumeCharacter( allowSpace ) )
				&& !isEndOfType( type )
				&& !delimiter()
			) {
				frag.appendChild( ret );
				allowSpace = true;
			}

			if( ret ) {
				frag.appendChild( ret );
			}

			if( !isEndOfType( type ) ) {
				return false;
			}

			return frag;
		}

		var isEndOfType = function( type ) {
			var mem, isEnd;
			list.peek().get( 'type' ) !== type 

			// TODO: Fix greedy consumption problem in recurse
			if( type === 'underline' ) {
				mem = capture();
				isEnd = list.peekback().get( 'type' ) !== 'space' && list.eat().get( 'type' ) === 'special_' && list.eat().get( 'type' ) === 'special_';
				backtrack( mem );
			}
			else {
				isEnd = list.peekback().get( 'type' ) !== 'space' && list.peek().get( 'type' ) === type;
			}

			return isEnd;
		}


		var text = function() {
			var ret = '';

			while( isTextualCharacter()
				|| isWhiteSpace()
			) {
				ret = ret + list.eat().get( 'value' );
			}

			return ret;
		}

		var isTextualCharacter = function( token ) {
			token = token ? token : list.peek();

			return isTableCell ? isTextContentWhenTable( token ) : isTextContentWhenNormal( token );
		}

		var isTextContentWhenTable = function( token ) {
			return ( isText( token ) || token.get( 'type' ) === 'special.' || token.get( 'type' ) === 'special"' ) && !isURL();
		}

		var isTextContentWhenNormal = function( token ) {
			return ( isText( token ) || token.get( 'type' ) === 'special.' || token.get( 'type' ) === 'special|' || token.get( 'type' ) === 'special"' ) && !isURL();
		}

		var isWhiteSpace = function( token ) {
			token = token ? token : list.peek();

			return token.get( 'type' ) === 'space'
		}

		var isText = function( token ) {
			token = token ? token : list.peek();

			return token.get( 'type' ) === 'text'; 
		}

		return buildMarkdown();
	}

	var convertToString = function( dom ) {
		var dummyDiv = document.createElement( 'div' );

		dummyDiv.appendChild( dom );

		// SECURITY: XSS issues over here
		return dummyDiv.innerHTML;
	}

	var getReturnBasedOnType = function( type, dom ) {
		type = ( type || "dom" ).toLowerCase();

		if( type === 'dom' ) {
			return dom;
		}
		else if( type === 'domstring' ) {
			return convertToString( dom );
		}

		return dom;
	}


	$L.markdown = function( node, config ) {
		var dom, list, text, type, ret;

		config = config || {};
		type = config.type;
		text = getText( node )
		list = lex( text )
		dom = _rDP( list, config );
		list.flush();

		ret = getReturnBasedOnType( type, dom );

		return ret;
	}
} )();


( function() {

	var wrapMap = {
		'b': {
			'start': '*',
			'end': '*'
		},

		'p': {
			'start': '',
			'end': '\n'
		},

		'div': {
			'start': '',
			'end': '\n'
		},

		'br': {
			'start': '',
			'end': '\n'
		},

		'span': {
			'start': '',
			'end': ''
		}
	}

	function shouldAddWrapper( node ) {
		var parent = node.parentNode,
		isLineBreak = node.nodeName.toLowerCase() === 'br',
		isParentParaOrDiv = parent.nodeName.toLowerCase() === 'div' || parent.nodeName.toLowerCase() === 'p',
		isSingleChild = parent.childNodes.length === 1;

		return !isLineBreak || !isParentParaOrDiv || !isSingleChild;

	}

	function wrapText( node, text ) {
		var tagName = node.nodeName.toLowerCase(),
		wrapObj = wrapMap[ tagName ],
		ret;

		if( shouldAddWrapper( node ) ) {
			ret = wrapObj.start + text + wrapObj.end;
		}
		else {
			ret = text;
		}

		return ret;
	}


	function getText( node, isFirstNode ) {
		var res = '',
		childNodes = node.childNodes;

		$L( childNodes ).each( function( index, node ) {
			isFirstNode = isFirstNode && ( index === 0 );

			if( isFirstNode ) {
				if( node.nodeType === 1 ) {
					res += getText( node ) + ( shouldAddNewLine( childNodes ) ? '\n' : '' );
				}
				else if( node.nodeType === 3 ) {
					res += node.nodeValue + ( shouldAddNewLine( childNodes ) ? '\n' : '' );
				}
			}
			else if( node.nodeType === 1 ) {
				res += wrapText( node, getText( node ) );
			}
			else if( node.nodeType === 3 ) {
				res += node.nodeValue;
			}
		} );

		return res;
	}

	function shouldAddNewLine( children ) {
		return children.length > 1;
	}

	$L._lyteHTMLToText = function( node ) {
		return getText( node, true );
	}
} )();
;( function(){
	if( lyteDomObj ){

		function getScope( elem, scope ){
           var data = elem._finddata;
           scope = data.dynamicScope ? data.dynamicScope( elem ) : scope;
           if( data.checkFromParent ){
             scope = elem.parentNode;
           }
           return scope;
        }

		function switchfn( text, value, method ){
			var flag
			switch( ( method || "" ).toLowerCase() ){
				case 'startswith' : {
					flag = text.indexOf( value ) == 0;
					break;
				}
				case 'endswith' : {
					var idx = text.lastIndexOf( value );
					if( idx != -1 ){
						flag = idx + value.length == text.length;
					}
					break;
				}
				default : {
					flag = text.indexOf( value ) != -1;
				}
			}
			return flag;
		}

		function treecheck( visible, hidden, scope, value, data ){
			var rgx1 = new RegExp( '(' + ( value || '' ).replace( /(\\|\'|\"|\?|\^|\$|\.|\||\*|\+|\(|\)|\[|\]|\{|\})/g,  '\\$1' ) + ')', 'ig' ),
			rgx2 = /(?!>)([^><]+)(?=<)/ig;
			for( var i = 0; i < visible.length; i++ ){
				var vis = $L( visible[ i ] ).closest( 'lyte-tree' )[ 0 ];
				for( var j = 0; j < hidden.length; j++ ){
					var hid = $L( hidden[ j ] ).closest( 'lyte-tree' )[ 0 ];
					if( vis == hid || hid.contains( vis ) ){
						data.highlight && hide( hidden[ j ] )
						Lyte.arrayUtils( hidden, 'removeAt', j );
						j--;
					}
				}
			}
			for( var i = 0; i < visible.length; i++ ){
			   value.length && data.highlight && highlightnode( visible[ i ], value, data, rgx1, rgx2 );
			   value.length && scope.ltProp( 'stateAttr', $L( visible[ i ] ).closest( 'lyte-tree' ).attr( 'temp-var' ) )
			}
			for( var i = 0; i < hidden.length; i++ ){
				hide( hidden[ i ] )
				if( value.length ){
					var inn = $L( 'lyte-yield:not(.noChildClass) lyte-tree-icon', $L( hidden[ i ]  ).closest( 'lyte-tree' ).parent() ).eq( 0 );
					inn.hasClass( 'lyteIconOpened' ) && inn.click();
				}
			}
			if( !value.length ) {
				closealltree.call( this, scope )
			}
		}

		function closealltree( scope ){
			var icons = $L( 'lyte-yield:not(.noChildClass) lyte-tree-icon', scope );
			for( var i = icons.length - 1; i >= 0; i-- ){
				var cur = icons.eq( i );
				cur.hasClass( 'lyteIconOpened' ) && cur.click();
			}
		}

		function highlightnode( element, value, data, rgx1 ){

			var exspan = element._findelement,
			cloned_element = element.cloneNode( true ),
			first_time;

			$L( element ).addClass( 'lyteSearchHidden' );

			cloned_element.normalize();

			if( !exspan ){
				var allow_attrs = data.keepAttributes;

				exspan = $L( allow_attrs ? cloned_element : document.createElement( element.tagName ) ).addClass( 'lyteHighlightdiv' ).get( 0 );
				_lyteUiUtils.insertAfter( element, exspan );

				element._findelement = exspan;
				exspan._originalelement = element;

				if( allow_attrs ){
					first_time = 1;
				}
			}

			exspan.style.display = '';

			convertString( Array.from( cloned_element.childNodes ), value, data );

			if( first_time ){
				return;
			}

			var __child = Array.from( cloned_element.childNodes );

			exspan.innerHTML = '';

			__child.forEach( function( item ){
				exspan.appendChild( item );
			});
		}

		function convertString( nodes, value, data ){
			var str = '';
			nodes.forEach( function( item ){
				var tag = item.tagName || '';
				if( /^template$/i.test( tag ) ){
					item.remove();
				} else if( tag ){
					convertString( Array.from( item.childNodes ), value, data );
				} else {
					var str = item.nodeValue,
					lower = str.toLowerCase(),
					index = lower.indexOf( value ),
					is_modified,
					ref = item;

					while( index != -1 ){
						var first = str.slice( 0, index ),
						limit = index + value.length,
						second = str.slice( index, limit ),
						third = str.slice( limit ),
						is_modified = true;

						if( first ){
							var node = document.createTextNode( first );
							Lyte.Component.insertAfter( ref, ref = node );
						}

						var node = $L( document.createElement( 'span' ) ).addClass( 'lyteFindHighlight '+ ( data.highlightclass || '' ) ).get( 0 );
						node.textContent = second;
						Lyte.Component.insertAfter( ref, ref = node );

						str = third;
						lower = str.toLowerCase();
						index = lower.indexOf( value );
					}

					if( is_modified ){
						if( str ){
							var node = document.createTextNode( str );
							Lyte.Component.insertAfter( ref, node );
						}
						item.remove();
					}
				}
			});
		}

		function hide( elem ){
			$L( elem ).removeClass( 'lyteSearchHidden' );
			$L( elem._findelement ).css( 'display', 'none' );
		}

		function acccheck( visible, hidden, scope, value, data ){
			// var rgx1 = new RegExp( '(' + ( value || '' ).replace( /(\\|\'|\"|\?|\^|\$|\.|\||\*|\+|\(|\)|\[|\]|\{|\})/g,  '\\$1' ) + ')', 'ig' ),
			// rgx2 = /(?!>)([^><]+)(?=<)/ig, 

			var exs = scope.ltProp( 'exclusive' );

			for( var i = 0; i < visible.length; i++ ){
				for( var j = 0; j < hidden.length; j++ ){
					if( $L( hidden[ j ] ).closest( 'lyte-accordion-item' ).is( $L( visible[ i ] ).closest( 'lyte-accordion-item' ) ) ){
						data.highlight && hide( hidden[ j ] );
						Lyte.arrayUtils( hidden, 'removeAt', j );
						j--; continue;
					}
				}
				if( visible[ i + 1 ] ){
					if( $L( visible[ i ] ).closest( 'lyte-accordion-item' ).is( $L( visible[ i + 1 ] ).closest( 'lyte-accordion-item' ) ) ){
						value.length && data.highlight && highlightnode( visible[ i + 1 ], value, data/*, rgx1, rgx2*/ );
					}
				}
				value.length && data.highlight && highlightnode( visible[ i ], value, data/*, rgx1, rgx2*/ )
			}

			for( var i = 0; i < visible.length; i++ ){
				!value.length && hide( visible[ i ] );
				var close = $L( visible[ i ] ).closest( 'lyte-accordion-item ', scope )
				if( !close.hasClass( 'lyteAccordionActive' ) ){
					if( exs && i != visible.length - 1 ){
						continue;
					}
					value && close.click()
				} else if( !value ){
					close.click();
				}
			}

			for( var i = 0; i < hidden.length; i++ ){
				data.highlight && hide( hidden[ i ] );
				$L( hidden[ i ] ).closest( 'lyte-accordion-item.lyteAccordionActive' , scope ).click()
			}
			
		}

		function commonCheck( visible, hidden, scope, value, data ){
			var rgx1 = new RegExp( '(' + ( value || '' ).replace( /(\\|\'|\"|\?|\^|\$|\.|\||\*|\+|\(|\)|\[|\]|\{|\})/g,  '\\$1' ) + ')', 'ig' ),
			rgx2 = /(?!>)([^><]+)(?=<)/ig;

			if( value.length ){
				for( var i = 0; i < visible.length; i++ ){
			    	data.highlight && highlightnode( visible[ i ], value, data, rgx1, rgx2 );
				}
			}

			for( var i = 0; i < hidden.length; i++ ) {
				data.highlight && hide( hidden[ i ] );
			}

			if( !value.length ){
				for( var i = 0; i < visible.length; i++ ){
			    	data.highlight && hide( visible[ i ] );
				}
			}

		}

		function processing( evt ){
			var data = this._finddata,
			scope = $L( getScope( this, data.scope ) )[ 0 ],
			comp = data.component,
			search = $L( data.search || data.target, scope ),
			method = data.method,
			value = ( this.tagName != "LYTE-INPUT" ? this.value : this.querySelector( 'input,textarea' ).value ).toLowerCase(), text = [], visible = [], hidden = [];
			if( data.trim ){
				value = value.trim();
			}
			for( var i = 0; i < search.length; i++ ){
				if( search.eq( i ).hasClass( 'lyteHighlightdiv' ) ){
					continue;
				}
				if( switchfn( search[ i ].textContent.trim().toLowerCase(), value, method ) ){
					visible.push( search[ i ] )
				} else {
					hidden.push( search[ i ] )
				}	
			}
			if( data.onSearch && data.onSearch.call( this, visible, hidden, evt, value, this ) == false ){
				return;
			}
			( comp == 'tree' && treecheck.call( this, visible, hidden, scope, value, data ) ) || ( comp == "accordion" && acccheck.call( this, visible, hidden, scope, value, data ) ) || ( comp == undefined && commonCheck.call( this, visible, hidden, scope, value, data ) );
		}

		function eventFunc( evt ){
			clearTimeout( this._timeout );
			this._timeout = setTimeout( processing.bind( this, evt ), 250 );
		}

		function setValue( value ){
			if( this.tagName != "LYTE-INPUT" ){
				this.value = value;
			} else{
				this.ltProp( 'value', value );
			}
			eventFunc.call( this, {} ); 
		}

		lyteDomObj.prototype.lytefind = function( data ){
			data = data || {};
			data.highlight = data.highlight != undefined ? data.highlight : true;
			var current = this.get( 0 );
			if( current._finddata ){
				this.eq( 0 ).removefind();
			}
			current._finddata = data;
			current.setValueForFind = current.setValue = setValue.bind( current );
			// current.resetValue = setValue.bind( current );
			current.addEventListener( 'input', eventFunc );
			return this;
		}

		lyteDomObj.prototype.removefind = function(){
			for( var i = 0; i < this.length; i++ ){
				var cur = this[ i ];
				if( cur._finddata ){
					var spans = $L( '.lyteHighlightdiv', getScope( cur, cur._finddata.scope ) ),
					_length = spans.length;
					
					for( var j = 0; j < _length; j++ ){
						// $L( spans[ j ] ).parent().children( '.lyteSearchHidden' ).removeClass( 'lyteSearchHidden' );
						var current = spans[ j ];
						if( current._originalelement ){
							$L( current._originalelement ).removeClass( 'lyteSearchHidden' );
							delete current._originalelement._findelement;
							delete current._originalelement;
						}
						current.remove();
					} 
					clearTimeout( cur._timeout );
					cur.removeEventListener( 'input', eventFunc );
					delete cur._finddata; delete cur._timeout; delete cur.setValue; delete cur.setValueForFind;
					// delete cur.resetValue;
				}
			}
			return this;
		}
	}
})();
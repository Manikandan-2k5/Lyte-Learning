;Lyte.Mixin.register( 'lyte-connect-undo', {
	undo : function( _undoQueue, _redoQueue, frm_undo ){
		this._isundo = true;

		var data = this.data,
		undoQueue = data[ _undoQueue ],
		last = undoQueue.pop(),
		ret;

		if( last ){
			ret = true;
			data[ _redoQueue ].push( last );
			this.process_do( last, frm_undo );
		}

		delete this._isundo;
		return ret;
	},

	parse : function( json ){
		return JSON.parse( json );
	},

	get_textdiv_by_index : function( index ){
		return this.$node.getElementsByTagName( 'lyte-textbox' )[ index ];
	},

	process_do : function( last, frm_undo ){

		if( frm_undo ){
			last = Array.from( last ).reverse();
		}

		last.forEach( function( item ){
			this[ 'do_' + item.type ]( item, frm_undo );
		}.bind( this ));

		this.call_queue_update();
		this.setup_viewbox();
		this._boundary( true );
	},

	do_addText : function( last, frm_undo ){
		if( frm_undo ){
			this.do_removeText( last );
		} else {
			var parsed = this.parse( last.data );
			this.addText( this.get_textdiv_by_index( parsed.elem_index ), parsed.text, parsed.index );
		}
	},

	do_removeText : function( last, frm_undo ){
		if( frm_undo ){
			this.do_addText( last );
		} else {
			var parsed = this.parse( last.data );
			this.removeText( this.get_textdiv_by_index( parsed.elem_index ), parsed.index );
		}
	},

	do_updateText : function( last, frm_undo ){
		var parsed = last.data,
		value = parsed[ frm_undo ? 'oldValue' : "newValue" ];
		this.updateText( this.get_textdiv_by_index( parsed.elem_index ), value, parsed.index );
	},

	do_positionUpdate : function( last, frm_undo ){
		var id = last.id,
		data = this.data.details[ id ];
		Lyte.objectUtils( data.data, 'add', 'position', this.parse( last[ frm_undo ? 'oldValue' : "newValue" ] ) );

		this.setup_boundary();

		window.cancelAnimationFrame( this.__frame );

		this.__frame = window.requestAnimationFrame( function(){
			this.overall_split( [] );
		}.bind( this ) );	

		setTimeout( function(){
			this.update_position( this.get_element( id ) );
		}.bind( this ), 0 );
	},

	do_renderConnections : function( last, frm_undo ){
		if( frm_undo ){
			this.do_deleteConnections( last );
		} else {
			var node = this.$node;
			this.parse( last.data ).forEach( function( item ){
				node.connect( item.src, item.target, item.options );
			});
		}
	},

	do_deleteConnections : function( last, frm_undo ){
		if( frm_undo ){
			this.do_renderConnections( last );
		} else {
			var node = this.$node;
			this.parse( last.data ).forEach( function( item ){
				node.disConnect( $L( '#' + item.options.id, node ) );
			});
		}
	},

	do_id_change : function( last, frm_undo ){
		var old_value = last.old_value,
		new_value = last.new_value,
		elem = $L( '#' + ( frm_undo ? new_value : old_value ), this.$node ).get( 0 ),
		to_send = frm_undo ? old_value : new_value;

		this.updateConnectorId( elem, to_send );
	},

	do_insertShape : function( last, frm_undo ){
		if( frm_undo ){
			this.do_deleteShape( last );
		} else {
			var data = this.parse( last.data );
			this.$node.insertShape( data, last.index, data.group_id );
		}
	},

	do_deleteShape : function( last, frm_undo ){
		if( frm_undo ){
			this.do_insertShape( last );
		} else{
			var data = this.parse( last.data );
			this.$node.deleteShape( data.id, data.group_id );
		}
	},

	do_contextualZoom : function( last, frm_undo ){
		var ns = 'lyteConnectContextualLevel',
		data = this.parse( last.data ),
		newValue = data[ frm_undo ? 'oldValue' : 'newValue' ],
		oldValue = data[ frm_undo ? 'newValue' : 'oldValue' ];

		this.setData( 'ltPropContextualZoomLevel', newValue );

		$L( this.$node ).removeClass( ns + oldValue ).addClass( ns + newValue );
	},

	do_reconnect : function( last, frm_undo ){
		var parsed = this.parse( last.data ),
		ns = frm_undo ? 'old' : "new",
		other_ns = frm_undo ? 'new' : 'old',
		old_id = parsed[ other_ns + '_value' ],
		new_id = parsed[ ns + '_value' ],
		old_pos = parsed[ other_ns + '_pos' ],
		new_pos = parsed[ ns + '_pos' ],
		__ns = parsed.ns,
		connection_elements = 'connection_elements',
		old_elem = $L( this.get_element( old_id ) ),
		old_data = old_elem.data( connection_elements ),
		key_name = __ns + '_' + parsed.id,
		old_obj = old_data[ key_name ],
		connector = old_obj.connector,
		connector_data = connector.data(),
		connector_options = connector_data.options,
		cb = "onReconnect",
		$node = this.$node,
		args = [ $node, {}, connector.get( 0 ), new_pos, old_pos, __ns ],
		new_elem = old_elem,
		other = this.get_element( parsed.other_value );

		if( old_id != new_id ){
			new_elem = $L( this.get_element( new_id ) );
			var new_data = new_elem.data( connection_elements );

			if( !new_data ){
				new_elem.data( connection_elements, new_data = {} );
			}

			delete old_data[ key_name ];
			new_data[ key_name ] = old_obj;

			connector_data[ __ns ] = new_elem;
			connector_options[ __ns + '_query' ] = '#'+ new_id
		}

		args.unshift( old_elem.get( 0 ), new_elem.get( 0 ) );

		if( __ns == "src" ){
			args.splice( 2, 0, other );
		} else {
			args.unshift( other );
		}

		args.unshift( cb );

		$L.extend( true, connector_options[ __ns + '_position' ], new_pos );

		this.getMethods( cb ) && this.executeMethod.apply( this, args );

		$L( $node ).connection( 'updateConnection', connector );
	},

	do_custom : function( arg, is_undo ){
		var cb = "onCustomUndo";

		this.getMethods( cb ) && this.executeMethod( cb, arg.sub_type, this.parse( arg.value ), is_undo, this.$node );
	},

	pushToQueue : function( item ){

		var _this = this,
		data = _this.data,
		arr = data._undoQueue,
		LC = Lyte.arrayUtils;

		if( !data.ltPropUndo ){
			return;
		}

		arr.push( item );

		clearTimeout( _this.__undotime );
		_this.__undotime = setTimeout( function(){
			var undoQueue = data.undoQueue,
			redoQueue = data.redoQueue,
			remove_len = undoQueue.length - data.ltPropQueueLength + 1,
			redo_len = redoQueue.length;

			if( redo_len ){
				LC( redoQueue, 'removeAt', 0, redo_len );
			}

			undoQueue.push( arr.slice() );
			if( remove_len > 0 ){
				LC( undoQueue, 'removeAt', 0, remove_len );
			}

			arr.splice( 0 );

			_this.call_queue_update();
		}, data.ltPropUpdateTime );
	},

	call_queue_update : function(){
		var cb = "onUndoRedoQueueUpdate";

		if( this.getMethods( cb ) ){
			var data = this.data;
			this.executeMethod( cb, data.undoQueue, data.redoQueue, this.$node );
		}
	},

	resetQueue : function(){
		var data = this.data,
		undoQueue = data.undoQueue,
		redoQueue = data.redoQueue,
		_undoQueue = data._undoQueue,
		LC = Lyte.arrayUtils,
		undo_len = undoQueue.length,
		redo_len = redoQueue.length,
		_len = _undoQueue.length,
		removeAt = 'removeAt';

		if( undo_len || redo_len || _len ){
			LC( undoQueue, removeAt, 0, undo_len );
			LC( redoQueue, removeAt, 0, redo_len );
			clearTimeout( this.__undotime );
			LC( _undoQueue, removeAt, 0, _len );
			this.call_queue_update();
		}
	}
});
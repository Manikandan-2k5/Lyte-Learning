;Lyte.Mixin.register( 'lyte-connect-magnetiser',{
	magnetiser : function( moving ){

		var __data = this.data,
		details = __data.details,
		obj = {},
		id_prefx = __data.ltPropIdPrefix,
		arr = [];
		
		moving.map( function( item ){
			arr.push( item.get( 0 ).id.replace( id_prefx, '' ) );
		});

		for( var key in details ){
			var cur = details[ key ].position;
			
			obj[ key ] = {
				position : {
					left : cur.left,
					top : cur.top
				},
				dimension : {
					width : cur.width,
					height : cur.height
				}
			};
		}

		arr.forEach( function( item ){
			this.individual_magnetiser( item, obj, arr );
		}.bind( this ) );
	},

	individual_magnetiser : function( item, shape_object, moving ){
		var ck = this.data.ltPropMinDiff * 0.5,
		moved = [],
		obj = shape_object[ item ],
		pos = obj.position,
		dim = obj.dimension;

		for( var id in shape_object ){
			if( moving.indexOf( id ) + 1 ){
				continue;
			}
			if( item != id ){
				var _obj = shape_object[ id ],
				_pos = _obj.position,
				_dim = _obj.dimension,
				change = { left : 0, top : 0 };

				this.is_overlapping( change, 'left', 'width', pos, dim, _pos, _dim, ck );
				this.is_overlapping( change, 'top', 'height', pos, dim, _pos, _dim, ck );

				if( change.left && change.top ){
					if( !change.ignoreleft ){
						_pos.left += change.left;
					}
					
					if( !change.ignoretop ){
						_pos.top += change.top;
					}

					this.construct_modifications( id, _pos );
					this.individual_magnetiser( id, shape_object, moving );
				}
			}
		}
	},

	construct_modifications : function( __id, __pos ){
		var modifications = this.__mod || ( this.__mod = {} ),
		__details = this.data.details[ __id ],
		position = __details.position,
		elem = this.get_element( __id );

		if( !modifications[ __id ] ){
			modifications[ __id ] = true;
		}

		Lyte.objectUtils( __details, 'add', 'position', {
			left : __pos.left,
			top : __pos.top,
			width : position.width,
			height : position.height
		});

		$L( elem ).css( __pos ).data( 'position', __pos );
		this.update_position( elem );
	},

	is_overlapping : function( obj, left, width, pos, dim, pos_other, dim_other, ck ){
		var _left = pos[ left ] - ck,
		_right = pos[ left ] + dim[ width ] + ck,
		other_left = pos_other[ left ],
		other_right = pos_other[ left ] + dim_other[ width ],
		is_left = this.__check_overlap( _left, _right, other_left ),
		is_right = this.__check_overlap( _left, _right, other_right ),
		is_left_outer = this.__check_overlap( other_left, other_right, _left ),
		is_right_outer = this.__check_overlap( other_left, other_right, _right );

		if( is_left && is_right ){
			obj[ 'ignore' + left ] = true;
			if( is_left > is_right ){
				is_left = 0;
			} else {
				is_right = 0;
			}
		}
		if( is_left ){
			obj[ left ] += is_left;
		} else if( is_right ){
			obj[ left ] -= is_right;
		} else if( is_left_outer && is_right_outer ){
			if( is_left_outer > is_right_outer ){
				obj[ left ] += ( other_right - other_left - is_right_outer );
			} else {
				obj[ left ] -= ( other_right - other_left - is_left_outer );
			}
		}
	},

	__check_overlap : function( left, right, tocheck ){
		if( left <= tocheck && tocheck <= right ){
			return Math.min( tocheck - left, right - tocheck );
		}
		return 0;
	},

	magnetiser_up : function(){
		var mods = this.__mod,
		details = this.data.details;

		for( var key in mods ){
			this._item.push( $L( this.get_element( key ) ) );
			this._data.push( details[ key ].data );
		}

		delete this.__mod;
	}
});
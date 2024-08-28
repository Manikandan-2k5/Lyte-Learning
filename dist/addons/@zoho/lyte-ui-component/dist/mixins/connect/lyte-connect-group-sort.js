;Lyte.Mixin.register( 'lyte-connect-group-sort',{

	s_ondrag : function( grp, elem, grp1, evt ){
		var $node = this.$node;
		$node.refreshConnectors( grp.id.replace( $node.ltProp( 'idPrefix' ), "" ) );

		evt && this.check_grp_in_move( elem, evt );

		return true;
	},

	remove_frm_a_grp : function( grp, elem ){
		var prefix = this.data.ltPropIdPrefix,
		grp_id = grp.id.replace( prefix, "" ),
		elem_id = elem.id.replace( prefix, "" );

		return this.$node.deleteShape( elem_id, grp_id );
	},

	insert_to_a_grp : function( ret, grp, index ){
		var prefix = this.data.ltPropIdPrefix,
		grp_id = grp.id.replace( prefix, "" );

		delete ret.data.position;

		this.$node.insertShape( ret.data, index, grp_id );
		this.render_connectors( ret.connections );

		this.s_ondrag( grp );

		grp.addToSortable( $L( '#' + prefix + ret.data.id, grp ).get( 0 ) );
	},

	switch_elements : function( grp, target_grp, src, target, src_elem, target_elem ){

		var cb = "onBeforeInterchange";

		if( this.getMethods( cb ) && this.executeMethod( cb, grp, target_grp, src_elem, target_elem, src, target, this.$node ) == false ){
			return this.s_ondrag( grp );
		}
		this.insert_to_a_grp( this.remove_frm_a_grp( grp, src_elem ), target_grp, target );

		if( grp != target_grp && this.$node.contains( grp ) ){
			this.s_ondrag( grp )
		}

		this.getMethods( cb = "onInterchange" ) && this.executeMethod( cb, grp, target_grp, src, target, this.$node )
	},

	create_separate_shape : function( grp, elem, index ){
		var cb = "onBeforeUngroup";

		if( this.getMethods( cb ) && this.executeMethod( cb, grp, elem, index, this.$node ) == false ){
			return this.s_ondrag( grp );
		}

		var __left = elem.offsetLeft,
		__top = elem.offsetTop,
		grp_left = parseFloat( grp.style.left ),
		grp_top = parseFloat( grp.style.top ),
		ret = this.remove_frm_a_grp( grp, elem );

		ret.data.position = {
			left : grp_left + __left,
			top : grp_top + __top
		};

		this.$node.insertShape( ret.data );
		this.render_connectors( ret.connections );

		if( this.$node.contains( grp ) ){
			this.s_ondrag( grp );
		}

		this.getMethods( cb = "onUngroup" ) && this.executeMethod( cb, grp, index, this.$node );
	},

	merge_shapes : function( src_grp, src, close_elem ){

		var cb = "onBeforeGroup";

		if( this.getMethods( cb ) && this.executeMethod( cb, src, close_elem, src_grp, this.$node ) == false ){
			return this.s_ondrag( src_grp || src );
		}

		var prefix = this.data.ltPropIdPrefix,
		ret = src_grp ? this.remove_frm_a_grp( src_grp, src ) : this.$node.deleteShape( src.id.replace( prefix, "" ) ),
		ret1 = this.$node.deleteShape( close_elem.id.replace( prefix, "" ) ),
		grp = {
			children : [
				ret.data,
				ret1.data
			],
			position : ret1.data.position
		};

		delete ret1.data.position;
		delete ret.data.position;

		this.$node.insertShape( grp );

		this.render_connectors( ret.connections );
		this.render_connectors( ret1.connections );

		if( src_grp && this.$node.contains( src_grp ) ){
			this.s_ondrag( src_grp );
		}

		this.getMethods( cb = "onGroup" ) && this.executeMethod( cb, grp, this.$node );
	},

	get_element_at : function( elem, evt ){
		var __elems = document.elementsFromPoint( evt.clientX, evt.clientY ),
		ret;

		__elems.every( function( item ){
			if( /lyte-connect-item/i.test( item.tagName || "" ) && item != elem && item != elem.parentNode && !$L( item ).hasClass( 'lyteConnectInnerItem' ) ){
				ret = item;
			}
			return !ret;
		});

		return ret;
	},

	check_drop_grp : function( elem, evt ){

		$L.fastdom.mutate( this.remove_place.bind( this ) );

		if( $L( elem ).hasClass( 'lyteConnectGroupShape' ) ){
			return;
		}

		var match = this.get_element_at( elem, evt );

		if( match ){
			var $match = $L( match );

			if( $match.hasClass( 'lyteConnectGroupShape' ) ){
				this.check_other_grp_merge( elem, match, evt );
			} else {
				if( this.merge_shapes( void 0, elem, match ) ){
					return false;
				}
			}
			this.grp_boolean();
			return true;
		}
	},

	check_other_grp_merge : function( elem, match, evt ){
		var items = Array.from( match.getElementsByTagName( 'lyte-connect-item' ) ),
		bcr_arr = items.map( function( item ){
			return item.getBoundingClientRect();
		}),
		__final = 0,
		__diff = Infinity,
		__clientX = evt.clientX;

		bcr_arr.forEach( function( item, index ){
			var diff = __clientX - item.left;
			if( diff > 0 && diff < __diff ){
				__final = index + 1;
				__diff = diff;
			}
		});

		if( $L( elem ).hasClass( 'lyteConnectInnerItem' ) ){
			var src_grp = elem.parentNode,
			src_index = Array.from( src_grp.children ).indexOf( elem );

			return this.switch_elements( src_grp, match, src_index, __final, elem );
		} else {
			return this.insert_to_a_grp( this.$node.deleteShape( elem.id.replace( this.data.ltPropIdPrefix, "" ) ), match, __final );
		}
	},

	check_grp_in_move : function( elem, evt ){
		var match = $L( this.get_element_at( elem, evt ) ),
		__class = 'lyteConnectSortHover';

		this.remove_place();

		if( !$L( elem ).hasClass( 'lyteConnectGroupShape' ) ){
			match.addClass( __class );
		}
	},

	remove_place : function(){
		var __class = 'lyteConnectSortHover';
		$L( '.' + __class, this.$node ).removeClass( __class );
	},

	grp_boolean : function(){
		this.__regroup_drop = true;

		setTimeout( function(){
			delete this.__regroup_drop;
		}.bind( this ), 500 );
	},

	actions : {
		bind_sortable : function( $node ){
			var selectionClass = 'lyteGroupSortableSelect',
			main_node_class = "lyteConnectSortableDown",
			__$node = $L( $node ),
			main_node = $L( this.$node );

			__$node.sortable({
				onDrag : this.s_ondrag.bind( this, $node ),
				onSelect : function( element, index, grp, evt ){

					if( $L( evt.target ).hasClass( 'lyteConnectAnchorPoint ' ) ){
						return false;
					}

					var cb = "onBeforeGroupSortSelect";

					if( this.getMethods( cb ) && this.executeMethod( cb, element, grp, evt, this.$node ) == false ){
						return false;;
					}

					__$node.addClass( selectionClass );
					main_node.addClass( main_node_class );
				}.bind( this ),
				onBeforeDrop : function( src, target, grp, src_index, target_index, src_grp, target_grp, evt ){
					var __target = evt.target,
					__wrapper = this.__wrapper;

					if( __target == __wrapper || __target == this.$node ){
						this.create_separate_shape( src_grp, src, src_index );
					} else {
						var close_grp = __target.closest( '.lyteConnectGroupShape' );
						if( close_grp ){
							if( close_grp == src_grp ){
								if( src_index != target_index ){
									this.switch_elements( src_grp, src_grp, src_index, target_index, src, target );
								} else {
									this.s_ondrag( src_grp );
								}
							} else {
								this.check_other_grp_merge( src, close_grp, evt );
							}
						} else {
							close_grp = __target.closest( 'lyte-connect-item:not(.lyteConnectGroupShape):not(.lyteConnectInnerItem)' );

							if( close_grp ){
								this.merge_shapes( src_grp, src, close_grp );
							} else {
								this.s_ondrag( src_grp );
							}
						}
					}

					__$node.removeClass( selectionClass );
					main_node.removeClass( main_node_class );

					$L.fastdom.mutate( this.remove_place.bind( this ) );
					this.grp_boolean();
					return false; 
				}.bind( this )
			});
		},

		unbind_sortable : function( $node ){
			$L( $node ).sortable( "destroy" );r
		}
	}
});
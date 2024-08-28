Lyte.Mixin.register( 'lyte-listview-utils',{
	createIntersection : function(){
		this.create_ins();
	}.on( 'didConnect' ),

	create_ins : function(){
		var __this = this,
		$node = __this.$node,
		ns = 'getElementsByClassName',
		elems = $node[ ns ]( 'lyteListviewIntersection' );

		__this._intersectionObs = new IntersectionObserver( __this.intersection.bind( __this ), { threshold : [ 0 ], root : $node[ ns ]( 'lyteTableScroll' )[ 0 ] } );

		Array.from( elems ).forEach( this.addToIntersection.bind( this ) );
	},

	destroyIntersection : function(){
		this.destroy_ins();
	}.on( 'didDestroy' ),

	destroy_ins : function(){
		var __this = this,
		ns = '_intersectionObs';

		__this[ ns ].disconnect();
		delete __this[ ns ];
	},

	intersection : function( elems ){
		var __this = this;

		elems.forEach( function( item ){
			if( item.isIntersecting ){
				var __target = item.target;
				__this.renderNode( __target );
				__this.removeFromIntersection( __target );
			}
		});
	},

	addToIntersection : function( elem ){
		this._intersectionObs.observe( elem );
	},

	removeFromIntersection : function( elem ){
		this._intersectionObs.unobserve( elem );
	}
});	
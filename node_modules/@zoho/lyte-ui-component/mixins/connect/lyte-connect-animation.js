;Lyte.Mixin.register( 'lyte-connect-animation', {
		
	shape_animate : function( $elem, new_position, __old_position, __dur ){

		var x_diff = new_position.left - __old_position.left,
		y_diff = new_position.top - __old_position.top,
		__className = 'lyteConnectShapeAnimate',
		evt_name = 'transitionend';

		if( x_diff || y_diff ){
			this.__anime_dur = __dur;

			var details = this.data.details[ $elem.get( 0 ).id.replace( this.data.ltPropIdPrefix, "" ) ];

			$elem.css({
				transform : "translate(" + -x_diff + "px," + -y_diff + "px)"
			});

			details.x_diff = x_diff;
			details.y_diff = y_diff;
			
			$L.fastdom.mutate( function(){
				var $node = $L( this.$node ).addClass( __className ),
				raf = window.requestAnimationFrame;

				$elem.on( evt_name, function(){
					$elem.off( evt_name ).css({
						transform : ""
					});

					delete details.x_diff;
					delete details.y_diff;
				
					$node.removeClass( __className );
				});

				raf( function(){
					raf( function(){
						$elem.css({ 
							transform : "translate(0px,0px)",
							opacity : ""
						});
						delete this.__anime_dur;
					}.bind( this ) );
				}.bind( this ) );
			}.bind( this ) );
		} else {
			$elem.css( 'opacity', '' );
		}
	},

	create_animation_tags : function( elem ){
		var trans_elem = this.create_tag( 'animateTransform', {
           attributeName : "transform",
           begin : "0s",
           dur : "0s",
           attributeType : "XML",
           type : 'translate'
        }),
        d_element = this.create_tag( 'animate', {
           attributeName : "d",
           begin : "0s",
           dur : "0s",
           attributeType : "XML"
        });

        elem.appendChild( trans_elem );
        elem.children[ 0 ].appendChild( d_element );
	},	

	create_tag : function( name, obj ){
	  var anime = document.createElementNS( "ht" + "tp://www.w3.org/2000/svg", name );

      for( var key in obj ){
          anime.setAttribute( key, obj[ key ] );
      }

      return anime;
	},

	common_anime : function( svg, name, value ){
		if( name == "d" ){
			this.update_d( svg, value );
		} else {
			this.update_transform( svg, value );
		}
	},

	update_transform : function( svg, value ){
		var __dur = this.__anime_dur || '1ms',
		__children = svg.children,
		__length = __children.length;

		if( __length < 3 ){
			return;
		}

		trans_tag = __children[ __length - 1 ];

		if( /path/i.test( trans_tag.tagName ) ){
			return;
		}

		var  old_trans = svg.getAttribute( 'transform' ) || value;

		this.anime_set( trans_tag, __dur, this.get_match( old_trans ), this.get_match( value ) );
	},

	update_d : function( path, value ){
		var __dur = this.__anime_dur || '1ms',
		__children = path.children,
		d_tag = __children[ 0 ];

		if( !d_tag ){
			return;
		}

		var old_d = path.getAttribute( 'd' ) || value,
		rgx = /A(\s[\d\.\-]+){5}/g,
		ret = this.modify_d( old_d.replace( rgx, 'L' ), value.replace( rgx, 'L' ) ),
		__from = ret.from,
		__to = ret.to;

		this.anime_set( d_tag, __to == __from ? '1ms' : __dur, __from, __to );
	},

	get_match : function( str ){
		var __match = str.match( /translate\((.+)\)/ );

		return __match ? __match[ 1 ] : "";
	},

	anime_set : function( tag, dur, from, to ){
		tag.setAttribute( 'dur', dur );
		tag.setAttribute( 'from', from );
		tag.setAttribute( 'to', to );

		tag.beginElement();
	},

	modify_d : function( from, to ){
        var split_fn = function( value ){
           return value.replace( /\s{0,}(L|M)\s+/g, ' ' ).trim().split( /\s/ );
        },
        from_split = split_fn( from ),
        to_split = split_fn( to ),
        from_len = from_split.length,
        to_len = to_split.length;

        if( from_len == to_len ){
           return {
              from : from,
              to : to
           };
        }

        var __diff = Math.abs( from_len - to_len ) / 2,
        fn = function( value, __last ){
            var last__1 = __last.get( -1 ),
            last__2 = __last.get( -2 );

            for( var i = 0; i < __diff; i++ ){
               value += ( 'L ' + last__2 + ' ' + last__1 );
            }
            return value;
        };

        if( from_len > to_len ){
           to = fn( to, $L( to_split ) );
        } else {
           from = fn( from, $L( from_split ) );
        }

        return {
           from : from,
           to : to
        };
	}
});
;( function(){
	var lytedom = window.lyteDomObj,
	http_string = "ht" + "tp://",
	fakeContainerClass = "lyteConnectionFakeContainer",
	containerClass = "lyteConnectionContainer",
	targetElemClass = "lyteConnectionTargetElement",
	srcElemClass = "lyteConnectionSrcElement",
	connection_elements = 'connection_elements',
	connection_data_str = 'connection_data',
	lyteConnectionElement_str = 'lyteConnectionElement',
	evt_str = 'mousedown touchstart';

	if( lytedom ){

		function tbox_hover( evt ){
			hover_fn.call( this, evt, $L( evt.currentTarget ).data( 'connector' ).get( 0 ), ' lyteTextboxHover' );
		}

		function hover_fn( evt, __elem, extra_class ){

			if( evt.buttons ){
				return;
			}

			var elem = __elem || evt.target.closest( '.' + containerClass + ',.' + fakeContainerClass ),
			cls_name = 'lyteConnectionHover' + ( extra_class || '' ),
			is_enter = evt.type == 'mouseenter',
			name = ( is_enter ? 'add' : 'remove' ) + "Class",
			item = "lyte-connect-item",
			fn = function( $node ){
				return $node[ name ]( cls_name );
			},
			data = fn( $L( elem ) ).data(),
			connection_data = this.data( connection_data_str ),
			callback = connection_data[ "onConnection" + ( is_enter ? "Hover" : "Leave" ) ];

			fn( fn( data.src )[ name ]( cls_name + 'Src' ).closest( item ) );
			fn( fn( data.target )[ name ]( cls_name + 'Target' ).closest( item ) );

			fn( $L( data.text_box ) );

			if( callback ){
				callback( evt.originalEvent, elem );
			}

			if( is_enter && connection_data.render_first ){
				elem.parentNode.appendChild( elem );
			}
		}

		function createElement( id, _class, data, options ){

			var ns = http_string + "www.w3.org/2000/svg",
			g = document.createElementNS( ns, "g" ),
			path1 = document.createElementNS( ns, 'path' ),
			path2 = document.createElementNS( ns, 'path' ),
			fn = function( elem, name, value ){
				elem.setAttribute( name, value );
			},
			bind_fn = hover_fn.bind( this ),
			line_marker = data.line_marker;

			options = options || {};

			g.id = id;

			fn( g, 'class', ( _class || fakeContainerClass ).trim() );

			fn( path1, 'class', 'lyteConnectionPath' );
			fn( path1, 'marker-end', options.markerEnd || data.markerEnd || '' );
			fn( path1, 'marker-start', options.markerStart || data.markerStart || '' );

			fn( path2, 'class', 'lyteConnectionFakePath' );

			g.appendChild( path1 );
			g.appendChild( path2 );

			if( line_marker ){
				var line = document.createElementNS( ns, 'path' );
				fn( line, 'class', 'lyteConnectionLineMarker' );
				g.appendChild( line );
			}

			$L( path2 ).on({
				mouseenter : bind_fn,
				mouseleave : bind_fn
			});

			return g;
		}

		function mouseup( evt ){
			var data = this.removeClass( 'lyteConnectionCreateMousedown' ).data(),
			connection_data = data[ connection_data_str ],
			tempElement = data.tempElement,
			$temp = $L( tempElement );

			$L( document ).off({
				mousemove : data.mousemove,
				mouseup : data.mouseup,
				touchmove : data.mousemove,
				touchend : data.mouseup
			});

			if( data.moved ){
				var module_name = connection_data.module || connection_data.parent,
				__target = evt.target,
				elem = __target.closest( module_name ),
				this_elem = this.get( 0 ),
				target = $temp.data( 'target' );

				if( elem ){
					var callback;
					if( target ){

						callback = connection_data.onReconnect;

						if( callback ){
						  var exst_target = target.get( 0 ),
						  new_position,
						  $_tar = $L( __target ),
						  options = $temp.data( 'options' ),
						  old_position = options.target_position;

						   if( $_tar.hasClass( 'lyteConnectAnchorPoint' ) ){
						  	 new_position = {
						  	 	x : Number( $_tar.attr( 'left' ) ),
						  	 	y : Number( $_tar.attr( 'top' ) )
						  	 };
						  }

						  var new_target = $L( callback( data.element, exst_target, elem, this_elem, evt.originalEvent, tempElement, new_position, old_position ) || exst_target ),
						  __id = 'target_' + tempElement.id,
						  obj = target.data( connection_elements ),
						  target_class = targetElemClass,
						  is_not_same = function(){
						  	if( new_target.get( 0 ) != exst_target ){
						  		return true;
						  	}

						  	if( new_position && ( new_position.x != old_position.x || new_position.y != old_position.y ) ){
						  		return true;
						  	}

						  	return false;
						  };

						  if( new_position && is_not_same() ){
						  	 $temp.data( 'target_position', options.target_position = new_position );
						  }

						  delete obj[ __id ];
						  $temp.data( 'target', new_target );

						  if( !Object.keys( obj ).length ){
						  	 target.removeClass( target_class );
						  }

						  var new_connection = new_target.data( connection_elements );
						  if( !new_connection ){
						  	 new_target.data( connection_elements, new_connection = {} );
						  }
						  new_connection[ __id ] = { connector : $temp };
						  new_target.addClass( target_class );
						}
					} else {
						if( callback = connection_data.onConnect ){
							callback( data.element, elem, this_elem, evt.originalEvent, data.pos, tempElement );
						}
					}
				}

				window.cancelAnimationFrame( this_elem._frame );
				delete this_elem._frame;

				if( target ){
					$temp.addClass( containerClass ).removeClass( fakeContainerClass );
					update_individual_connector.call( this, $temp );
				} else {
					tempElement.remove();
				}
			} else{
				$temp.addClass( containerClass ).removeClass( fakeContainerClass );
			}

			delete connection_data.ignore_break;

			[ 'mousemove', 'mouseup', 'moved', 'clientY', 'clientX', 'tempElement', 'con_x', 'con_y', 'element', 'pos' ].forEach( function( item ){
				delete data[ item ];
			});
		}
		function advanced_curve(path,_start_x,_start_y,_end_x,_end_y,start,end,curve_offset,xtra,width,height){
			var ext=curve_offset + xtra,
			to_right=(start.width-start.pos_x),
			overlap=(start.left<(end.left+end.width+10))&&((start.left+start.width)>(end.left-10)),
			find_position=function(obj){
				var curr_pos={
					down_dist:(obj.height-obj.pos_y),
					right_dist:(obj.width-obj.pos_x),
					top_dist:obj.pos_y,
					left_dist:obj.pos_x
				},
				position='down_dist';
				if(curr_pos[position]==0 && curr_pos.left_dist==0){
					position='left_dist';
				}else{
					for(var i in curr_pos){
						// var cur_position = curr_pos[ position ];
						if(curr_pos[position]==0){
							break;
						}else if(curr_pos[i]<curr_pos[position]){
							position=i;
							if(curr_pos[position]==0){
								break;
							}
						}
					}
				}
				return position;
			},
			start_position=find_position(start),
			end_position=find_position(end),
			top_down=function(flip_side){
				var _curve_offset=flip_side?curve_offset:-curve_offset,
					_ext=flip_side?ext:-ext;
				path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + _start_x  + ' ' + (_start_y + _curve_offset ) ) : "" ) + ' C ';
				switch(end_position){
					case flip_side?'top_dist':'down_dist':
						var cond=flip_side?((_start_y+curve_offset<_end_y-curve_offset)&&(overlap)):((_start_y-curve_offset>_end_y+curve_offset)&&(overlap));
						path+=(_start_x) + ' ';
						if( ( flip_side ? ( ( start.y + ext )<(end.y-ext)):((_start_y-ext)>(_end_y+ext))) || cond){//down curve
							path+= _end_y + ' ' + _end_x + ' ' +_start_y + ' ';
						}else{//norm
							var midy=((_start_y+_ext)+(_end_y-_ext))/2,
								midx=(_end_x+_start_x)/2,
								limit=Math.min((_end_x-(xtra*2)),(_start_x-(xtra*2))),
								val_change=_end_x-_start_x,
								trigger=_start_x+to_right+xtra,
								chng1=(val_change<trigger && !cond)?(midx-(trigger-val_change)>limit)?midx-(trigger-val_change):limit:midx;
							path += (_start_y+_ext) + ' ' + chng1 + ' ' + (_start_y+_ext) + ' ' + chng1 + ' ' + midy + ' C ' + chng1 + ' ' + (_end_y-(_ext)) + ' ' + _end_x + ' ' + (_end_y-(_ext)) + ' ';
						}
						path+= ( curve_offset ? (  _end_x + ' ' + (_end_y - _curve_offset ) + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
						break;
					case 'left_dist':
						var midx=((_start_x+(_end_x-curve_offset))/2),
						cond=flip_side?(_start_y+curve_offset)<_end_y:(_start_y-curve_offset)>_end_y;
						if((flip_side?_end_y>(_start_y+ext):((_start_y-ext)>_end_y)) || (cond && overlap)){//curve
							path+= _start_x + ' ' +((_start_y+_curve_offset+_end_y)/2) + ' ' + midx + ' ' +_end_y + ' '; 
						}else{
							//from here on cont
							var limit=Math.min((_end_x-(xtra*2)-curve_offset),(_start_x-(xtra*2))),
								val_change=(_end_x-curve_offset)-_start_x,
								trigger=_start_x+to_right+xtra,
								chng1=(val_change<trigger && !cond)?(midx-(trigger-val_change)>limit)?midx-(trigger-val_change):limit:midx;
								midy=(((_start_y+_ext)+_end_y)/2)
								path+= (_start_x) + ' ' +(_start_y+_ext) + ' ' + chng1 + ' ' + (_start_y+_ext) + ' ' + chng1 + ' ' + midy + ' C ' + chng1  + ' ' + ((midy+_end_y)/2) + ' ' + (((_end_x-curve_offset)+chng1)/2) + ' ' + _end_y + ' ';
						}
						path+=( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
						break;
					case 'right_dist':
						var midx=(_start_x+_end_x+ext)/2,
						midy=flip_side?Math.max((_start_y+curve_offset+(xtra*2)),(_end_y+(end.height-end.pos_y)+(xtra*2))):Math.min((_start_y-curve_offset-(xtra*2)),(_end_y-end.pos_y-(xtra*2))),
						temp=_start_x,//gh
						chng1=0,chng2=0;
						if(flip_side?((_start_y+curve_offset)>_end_y):((_start_y-curve_offset)<_end_y)){
							var change_val=flip_side?(_start_y+curve_offset)-_end_y:_end_y-(_start_y-curve_offset),
							need_val;
							// midx=(midx+_start_x)/2;
							need_val=(midx+_start_x)/2
							midx=((midx-(change_val/4))>need_val)?(midx-(change_val/4)):(need_val);
							// temp=(_start_x+midx)/2;
							need_val=(_start_x+midx)/2;
							temp=((temp+(change_val/4))<need_val)?(temp+(change_val/4)):(need_val);
							// midy-=xtra;
							midy=flip_side?((midy-(change_val/4))>((midy-xtra)))?(midy-(change_val/4)):(midy-xtra):((midy+(change_val/4))<((midy+xtra)))?(midy+(change_val/4)):(midy+xtra);
							var val_change=(_end_x-_start_x),
							trigger=_start_x+to_right+xtra*2,
							limit=(curve_offset+xtra*2);
							chng1=(val_change<trigger)?((trigger-val_change)<limit)?trigger-val_change:limit:0;
						}else{
							var val_change=(_end_x-_start_x),
								trigger=_start_x+to_right+xtra*2;
							chng2=(val_change<trigger)?((trigger-val_change)<(xtra*2))?trigger-val_change:(xtra*2):0;
						}
						path+=(_start_x-chng2) + ' ' +((_start_y+_curve_offset+midy)/2) + ' ' + (temp-chng2) + ' ' + (midy) + ' ' + (midx+(chng1/4)-(chng2/2)) + ' ' + (midy) + ' C ' + (_end_x+ext+chng1) + ' ' + (midy) + ' ' + (_end_x+ext+chng1) + ' ' + _end_y + ' ' +( curve_offset ? ( ( _end_x + curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
						break;
					default:
						var val_change=_end_x-_start_x,
							trigger=_start_x+to_right+xtra,
							chng=(val_change<trigger && Math.abs((_start_y+curve_offset)-(_end_y+curve_offset))>xtra)?(trigger-val_change)<(xtra*2)?(trigger-val_change):(xtra*2):0,
							chng1=0,
							chng2=0,
							level;
						if(flip_side?_start_y<_end_y:_start_y>_end_y){
							level=(_end_y + _ext);
							chng1=chng;
						}else{
							level=(_start_y + _ext);
							chng2=chng;
						}
						path+=(_start_x-(chng1*2)) + ' ' +level+ ' ' + (_end_x+(chng2*2)) + ' ' +level+' '+ ( curve_offset ? (  _end_x + ' ' + (_end_y + _curve_offset ) + ' L '  ) : "" ) + _end_x + ' ' + _end_y;	
				}
			};
			try{
				switch(start_position){
					case 'top_dist':
						top_down(false);
						break;
					case 'down_dist':
						top_down(true);
						break;
					case 'left_dist'://left
						var midx=((_start_x-ext)+(_end_x+ext))/2,
							midy;
						path+= "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x - curve_offset ) + ' ' + _start_y ) : "" ) + ' C ' + (_start_x - ext ) + ' ' + _start_y + ' ' + (_start_x-ext) + ' ';
						switch(end_position){
							case 'right_dist'://left right
								var midx=((_start_x-ext)+(_end_x+ext))/2,
									val_change=_end_x-_start_x,
									trigger=_start_x+to_right+xtra,
									act_val=trigger-val_change,
									val_tri=val_change<trigger,
									chng2=(val_tri && _start_y>_end_y)?(act_val<(curve_offset+(xtra*2)))?act_val:(curve_offset+(xtra*2)):0;
									chng1=((val_tri && _start_y<_end_y)?(act_val<(xtra))?act_val:(xtra):0)/2;
								midy=Math.max((_start_y+(start.height-start.pos_y)+(xtra*2)),(_end_y+(end.height-end.pos_y)+(xtra*2)));
								path += (midy-chng1) + ' ' +midx + ' ' + (midy-chng1) + ' C ' + (_end_x + ext + chng2) + ' ' + (midy-chng1) + ' ' + (_end_x + ext + chng2) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x + curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
								break;
							case 'down_dist':
							case 'top_dist':
								var chng1=0,chng3=0,chng4=0;
								chng_var1=_end_x,chng_var2=undefined,
								collide=function(bool){
									var val_change=(_end_x-_start_x),
										trigger=_start_x+to_right+(xtra),
										act_val=(trigger-val_change);
									if(val_change<trigger){
										if(bool){
											chng4=chng1=((act_val/4)<xtra)?act_val/4:xtra;
										}else{
											chng3=((act_val)<xtra*2)?act_val:xtra*2;
										}
									}
								};
								if(end_position=='top_dist'){//up
									midy=Math.min((_start_y-start.pos_y-(xtra+(xtra/2))),(_end_y-end.pos_y-curve_offset-(xtra+(xtra/2)))) * 13 / 15;
									midx=(_end_x+(_start_x-ext))/2,
									chng_var2=((_end_y-curve_offset)+midy)/2;
									if((_end_y-curve_offset)<_start_y){//up
										var change_val=_start_y-(_end_y-curve_offset);
										midx=(midx+(change_val)<(midx+_end_x)/2)?midx+(change_val):(midx+_end_x)/2;
									}
									if((_end_y-curve_offset)<(_start_y+150)){
										collide(true,'top');
										chng4*=-1;
									}else{
										collide(false);
									}
								}else{
									midy=Math.max((_start_y+(start.height-start.pos_y)+(xtra)),(_end_y+ext)),
									midx=((_start_x-ext)+_end_x)/2;
									if((_end_y+curve_offset)>_start_y){
										var change_val=(_end_y+curve_offset)-_start_y,
											need_val=(midx+_end_x)/2;
										((midx+(change_val/4))<need_val)?(midx+=(change_val/4)):(midx=need_val);
										((chng_var1-(change_val/4))>(_end_x+midx)/2)?(chng_var1-=(change_val/4)):(chng_var1=(_end_x+midx)/2);
									}else{
										midy+=((_start_y-(_end_y+curve_offset))/4)<xtra?((_start_y-(_end_y+curve_offset))/4):xtra;
									}
									if((_end_y+curve_offset)>(_start_y-150)){
										collide(true);//down
									}else{
										collide(false);
									}
									chng_var2=((_end_y+curve_offset+midy+(chng1/2))/2);
								}
								path='';
								path+= "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x - curve_offset ) + ' ' + _start_y ) : "" ) + ' C ' + (_start_x - ext -chng1) + ' ' + _start_y + ' ' + (_start_x-ext-chng1) + ' ';
								path+= (midy) + ' ' +(midx-(chng1/2)+((chng3/2)<_end_x?(chng3/2):_end_x)) + ' ' + (midy+(chng4/2)) + ' C ' + (chng_var1+chng3) + ' ' + (midy+(chng4/2)) + ' ' + (_end_x+chng3) + ' ' + chng_var2;
								path+=' '+ ( curve_offset ? (  _end_x + ' ' + (_end_y + ((end_position=='down_dist')?curve_offset:-curve_offset) ) + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
								break;
							default:
								var chng1=0,val_change=Math.max(start.height,end.height)+(xtra*2);
								if(Math.abs(_start_y-_end_y)<=val_change){
									var val=val_change-Math.abs(_start_y-_end_y);
									if(_start_y<=_end_y){
										chng1=val
									}else{
										chng1=-val;
									}
								}
								path += (_end_y + chng1) + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
						}
						break;
					case 'right_dist'://right
						if(end_position!='left_dist'){
							path+="M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y ) : "" ) + ' C ';
							if(end_position=='down_dist' || end_position=='top_dist'){
								var midx=(_start_x+curve_offset+_end_x)/2,
									midy,
									first,
									ext_val=ext,
									cond,
									chng1;
								if(end_position=='down_dist'){
									cond=(_end_y+curve_offset)<_start_y;
									midy=(_start_y+(_end_y+ext))/2;
									first=((_end_y+ext)<_start_y || cond&&overlap)?false:true;
								}else{
									cond=(_end_y-curve_offset)>_start_y;
									midy=(_start_y+(_end_y-ext))/2;
									first=((_end_y-ext)>_start_y || cond&&overlap)?false:true;
									ext_val=-ext;
								}
								if(first){
										limit=Math.max((_end_x+(xtra*2)),(_start_x+curve_offset+(xtra*2))),
										val_change=_end_x-(_start_x+curve_offset),
										trigger=_start_x+to_right+ext,
										act_val=trigger-val_change,
										chng1=(val_change<trigger && !cond)?(midx+(act_val*2)<limit)?midx+(act_val*2):limit:midx;
									path+= (_start_x+curve_offset+chng1)/2 + ' ' + _start_y + ' ' + chng1 + ' ' + (_start_y+midy)/2 + ' ' + chng1 + ' ' + midy + ' C ' + chng1 + ' ' + (_end_y+ext_val) + ' ' + _end_x + ' ' + (_end_y+ext_val) + ' ' ;
								}else{
									path+= midx + ' ' + (_start_y) + ' ' + _end_x + ' ' +  midy + ' ' ;
								}
								path+=( curve_offset ? (  _end_x + ' ' + (_end_y + ((end_position=='down_dist')?curve_offset:-curve_offset) ) + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
							}else{
								var chng1=0,val_change=Math.max(start.height,end.height)+(xtra*2);
								if(Math.abs(_start_y-_end_y)<=val_change){
									var val=val_change-Math.abs(_start_y-_end_y);
									if(_start_y<=_end_y){
										chng1=-val
									}else{
										chng1=val;
									}
								}
								path += ( _end_x + ext) + ' ' + (_start_y+chng1) + ' ' + ( _end_x + ext) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x + curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
							}
							break;
						}
					default:
					path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y ) : "" ) + ' C ' + (_start_x + curve_offset + width * 13 / 15 ) + ' ' + _start_y + ' ' + ( _end_x - curve_offset - width * 13 / 15 ) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
				}
			}catch(e){
				path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y ) : "" ) + ' C ' + (_start_x + curve_offset + width * 13 / 15 ) + ' ' + _start_y + ' ' + ( _end_x - curve_offset - width * 13 / 15 ) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
			}
			return path;
		}

		function draw_curve( svg, start, end, data ){
			var width = Math.abs( start.x - end.x ),
			height = Math.abs( start.y - end.y ),
			offset = data.offset,
			off_x1 = offset.left,
			off_y1 = offset.top,
			off_x2 = offset.right,
			off_y2 = offset.bottom,
			start_x = Math.min( start.x, end.x ),
			start_y = Math.min( start.y, end.y ),
			end_x = Math.max( start.x, end.x ),
			end_y = Math.max( start.y, end.y ),
			ref_x = start_x - off_x1,
			ref_y = start_y - off_y1,
			flipx = start.x > end.x,
			flipy = start.y > end.y,
			trans = '',
			path = '',
			type = data.connection_type,
			scroll = /*data.getScroll()*/ { left : 0, top : 0 },
			curve_offset = /*Math.min( */data.curve_offset/*, width / 3 )*/,
			_module = data.module,
			$svg = $L( svg ),
			$data = $svg.data(), 
			text_box = $data.text_box,
			cb = data.onConnectionUpdate,
			cb1 = data.attr_fn,
			line_marker = data.line_marker,
			ignore_break = !data.ignore_break,
			xtra=80;


			if( type == 'line' ){
				path += "M " + ( start.x - ref_x ) + ' ' + ( start.y - ref_y ) + ' L ' + ( end.x - ref_x ) + ' ' + ( end.y - ref_y );
			} else if( type == 'curve' || type=='advanced_curve'){
				function fn( start, end ,data){
					var is_hgt = height <= curve_offset,
					is_wdt = width <= curve_offset * 3,
					_start_x = start.x - ref_x,
					_start_y = start.y - ref_y,
					_end_x = end.x - ref_x,
					_end_y = end.y - ref_y;
					if(type=="curve"){
						if( is_hgt && !is_wdt && curve_offset ){
							path += "M " + _start_x + ' ' + _start_y + ' C ' + ( _start_x + width / 4 ) + ' ' + ( _start_y + curve_offset ) + ' ' + ( _start_x + width * 3 / 4 ) + ' ' + ( _end_y + curve_offset ) + ' ' + _end_x + ' ' + _end_y;
							curve_offset = 0;
						} else {
							if( is_wdt && !is_hgt && curve_offset ){
								var is_start_left = start.x == start.left,
								is_end_left = end.x == end.left;
								if( is_start_left == is_end_left ){
									if( !is_end_left ){
										path += "M " + _start_x + ' ' + _start_y + ' L ' +  ( _start_x + curve_offset ) + ' ' + _start_y + ' C ' + ( _end_x + curve_offset * 3 ) + " " + _start_y + " " + ( _end_x + curve_offset * 3 ) + " " + ( _end_y ) + " " + ( _end_x + curve_offset ) + ' ' + _end_y + " L " + _end_x + " " + _end_y;
									} else {
										path += "M " + _start_x + ' ' + _start_y + ' L ' +  ( _start_x - curve_offset ) + ' ' + _start_y + ' C ' + ( _start_x - curve_offset * 3 ) + " " + _start_y + " " + ( _start_x - curve_offset * 3 ) + " " + ( _end_y ) + " " + ( _end_x - curve_offset ) + ' ' + _end_y + " L " + _end_x + " " + _end_y;
									}
								} else {
									path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y  ) : "" ) + ' C ' + ( _start_x + curve_offset * 3 + width * 13 / 15 ) + ' ' + _start_y + ' ' + ( _end_x - curve_offset * 3 - width * 13 / 15 ) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
								}
							} else {
								path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y  ) : "" ) + ' C ' + ( _start_x + curve_offset + width * 13 / 15 ) + ' ' + _start_y + ' ' + ( _end_x - curve_offset - width * 13 / 15 ) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
							}
						}
					}else if(type=='advanced_curve'){
						path=advanced_curve(path,_start_x,_start_y,_end_x,_end_y,start,end,curve_offset,xtra,width,height);
					}
					$svg[ ( flipx ? 'add' : 'remove' ) + 'Class' ]( 'lyteFlipX' );
				    $svg[ ( flipy ? 'add' : 'remove' ) + 'Class' ]( 'lyteFlipY' );
					var callback=data.onBeforePathChange;
					if(callback){
						var ret_val=callback(path,start,end,_start_x,_start_y,_end_x,_end_y);
						path=ret_val?ret_val:path;
					}
				}
				if( flipx ){
					fn( end, start ,data)

					// for fliped case need to switch start and end points. Because marker end and start will only apply for respective points
					
					var new_path = path.replace( /(M|C|L)\s/g, '' ),
					_split = new_path.split( ' ' ).reverse(),
					_len = _split.length,
					set_path=function(current){
						while(true){
							if(current+6 <= _split.length){
								_split.splice( current, 0, 'C' );
								current+=7;
							}else{
								break;
							}
						}
						return current;
					};
					for( var i = 0; i < _len; i += 2 ){
						var _temp = _split[ i ];
						_split[ i ] = _split[ i + 1 ];
						_split[ i + 1 ] = _temp;
					}

					_split.splice( 0, 0, 'M' );
					if( curve_offset ){
						_split.splice( 3, 0, 'L' );
						var current=set_path(6);
						// _split.splice( 6, 0, 'C' );
						_split.splice( current, 0, 'L' );
						//
					} else {
						set_path(3);

						// _split.splice( 3, 0, 'C' );
					}

					path = _split.join( ' ' );
				} else {
					fn( start, end ,data);
				}
			} else if( type == "elbow" ){
				var avoid_line = data.avoid_line && ignore_break,
				arc = data.elbow_arc && ignore_break;

				path = $L.elbow( svg, start, end, data, avoid_line && arc );

				if( avoid_line ){
					path = $L.elbow.avoidLine( svg, data, arc, ref_x, ref_y ) || path;
				}

				if( data.elbow_arc && arc ){
					$L.elbow.arc( svg, data, void 0, cb1 );
					path = void 0;
				}
			}



			var fn = function( elem, name, value ){
				elem.setAttribute( name, value );
			},
			fn2 = cb1 || fn,
			new_transform = 'translate(' + ( ref_x - scroll.left ) + ' ' + ( ref_y - scroll.top ) + ')',
			has_container = $svg.hasClass( containerClass );

			if( path ){
				var paths = svg.children;

				fn2( paths[ 0 ], 'd', path );
				fn( paths[ 1 ], 'd', path );
			}
			fn2( svg, 'transform', new_transform );

			check_element_type( svg );

			if( text_box ){
				var $text = $L( text_box );

				if( /line|curve/i.test( type ) ){
					$text.css({
						left : ( ref_x + off_x1 - scroll.left ) + width / 2,
						top : ( ref_y + off_y1 - scroll.top ) + height / 2
					});
				} else {
					var pos =  $L.elbow.textbox( $data.absolute_points, data, text_box );
					$text.css({
						left : pos.x,
						top : pos.y
					}).data( 'position', pos );
				}
			}

			if( line_marker && type == "elbow" ){
				$L.elbow.marker( svg, line_marker, ref_x, ref_y, data, ignore_break );
			}

			cb && has_container && cb( svg );
		}

		function check_element_type( svg ){
			var $svg = $L( svg ),
			data = $svg.data(),
			src_class = data.src_class,
			target_class = data.target_class,
			active_src = data.active_src,
			active_target = data.active_target,
			fn = function( elem ){
				return ( elem ? elem.tagName.toLowerCase() : "" ).replace(/\-(.)/g, function(){
				    return arguments[ 1 ].toUpperCase();
				});
			},
			src_tag = 'lyteConnectSrc_' + fn( active_src ),
			target_tag = 'lyteConnectTarget_' + fn( active_target );

			$svg.removeClass( ( src_class || "" ) + " " + ( target_class || "" ) );

			$svg.addClass( src_tag + ' ' + target_tag ).data({
				src_class : src_tag,
				target_class : target_tag	
			});
		}

		function getOriginalClient( data, elem, scale ){
			var clientX = data.clientX,
			clientY = data.clientY,
			wrap_elem = elem.querySelector( '.lyteConnectWrapper' );

			if( !wrap_elem ){
				wrap_elem = elem;
			}

			var wrap_bcr = wrap_elem.getBoundingClientRect(),
			left_diff = ( clientX - wrap_bcr.left ) / scale,
			top_diff = ( clientY - wrap_bcr.top ) / scale;

			return {
				clientX : left_diff,
				clientY : top_diff
			};
		}

		function mousemove( evt ){
			var data = this.data(),
			connection_data = data.connection_data,
			scale = connection_data.getScale(),
			ori_evt = evt,
			touches = evt.touches || [ evt ];

			if( touches.length > 1 ){
				return;
			}

			evt = touches[ 0 ];

			var clientX = evt.clientX,
			clientY = evt.clientY,
			_clientX = data.clientX,
			_clientY = data.clientY,
			tempElement = data.tempElement,
			elem = this.get( 0 ),
			boundary = connection_data.getBoundary(),
			scroll = connection_data.getScroll(),
			bcr = elem.getBoundingClientRect(),
			original_client = getOriginalClient( data, elem, scale ),
			xInc = ( clientX - _clientX ) / scale/* + scroll.left*/,
			yInc = ( clientY - _clientY ) / scale /*+ scroll.top*/;

			window.cancelAnimationFrame( elem._frame );
			delete elem._frame;

			if( !data.moved ){
				data.moved = true;
				if( !tempElement ){
					data.tempElement = tempElement = createElement.call( this, 'lyteNewConnection' + Date.now(), void 0, connection_data );
					connection_data.wrapperElement.appendChild( tempElement );
				}
			}

			draw_curve( tempElement, { x : data.con_x , y : data.con_y, initial_angle : data.initial_angle }, { x : original_client.clientX + xInc, y : original_client.clientY + yInc }, connection_data );

			function fn( _left, _right, client, min, max, s_left ){
				if( client < bcr[ _left ] + 5 ){
					if( s_left + 5 > max ){
						return 0;
					}
					return 1;
				} else if( client > bcr[ _right ] - 5 ){
					if( s_left - 5 < min ){
						return 0;
					}
					return -1;
				}
			}

			var x_fact = boundary ? fn( 'left', 'right', clientX, boundary.min_x, boundary.max_x, scroll.left ) : 0,
			y_fact = boundary ? fn( 'top', 'bottom', clientY, boundary.min_y, boundary.max_y, scroll.top ) : 0,
			bool = x_fact || y_fact;

			if( x_fact ){
				connection_data.setScroll( 'Left', scroll.left + 5 * x_fact );
				clientX -= 5 * x_fact;
			}

			if( y_fact ){
				connection_data.setScroll( 'Top', scroll.top + 5 * y_fact );
				clientY -= 5 * y_fact;
			} 

			if( bool ){
				elem._frame = window.requestAnimationFrame( mousemove.bind( this, ori_evt ) );
			}

			data.clientX = clientX;
			data.clientY = clientY;
		}

		function get_group_off( _module, __scale ){
			var off_parent = _module.offsetParent;

			if( $L( off_parent ).hasClass( 'lyteConnectGroupShape' ) ){
				return {
					left : calc_offset( off_parent, 'left', __scale ),
					top : calc_offset( off_parent, 'top', __scale )
				};
			}
			return {
				left : 0,
				top : 0
			};
		}

		function acc_off( elem, outer, acc, ns ){
			var off = elem.offsetParent;
			if( !off || off == outer ){
				return acc;
			}
			return acc_off( off, outer, acc + off[ ns ], ns );
		}

		function scroll_deduct( elem, outer, ns, acc ){

			var parent = elem.parentNode;

			acc += parent[ 'scroll' + ns ];

			if( elem == outer ){
				return acc;
			}

			return scroll_deduct( parent, outer, ns, acc );
		}

		function calc_offset( elem, ns, scale ){
			var off_parent = elem.offsetParent;

			if( off_parent ){
				return ( elem.getBoundingClientRect()[ ns ] - off_parent.getBoundingClientRect()[ ns ] ) / scale;
			}
			return 0;
		}

		function mousedown( evt ){
			var data = this.data( connection_data_str ),
			module_name = data.selector,
			elem = evt.target.closest( module_name ),
			tempElement,
			callback = data.onBeforeConnectionCreation,
			ori_evt = evt,
			touches = evt.touches || [ evt ],
			is_reselect,
			__outer = this.get( 0 ),
			__scale = data.getScale();

			if( data.readonly || touches.length > 1 || evt.buttons == 2 ){
				return;
			}

			evt = touches[ 0 ];

			if( !elem ){
				var class_name = containerClass,
				connector = evt.target.closest( '.' + class_name );
				if( connector ){
					elem = $L( connector ).removeClass( class_name ).addClass( fakeContainerClass ).data( 'active_src' );
					is_reselect = true;
				}
				tempElement = connector;
				callback = data.onBeforeReconnectSelect;
			}

			if( !elem || evt.buttons == 2 ){
				return;
			} 

			if( callback && callback( ori_evt.originalEvent, tempElement, __outer ) == false ){
				$L( tempElement ).addClass( class_name ).removeClass( fakeContainerClass );
				return;
			}

			var bcr = elem.getBoundingClientRect(),
			near = evt.clientX,
			move = mousemove.bind( this ),
			up = mouseup.bind( this ),
			obj = {
				mousemove : move,
				mouseup : up,
				touchmove : move,
				touchend : up
			},
			close_module = elem.closest( data.module ),
			close_com = close_module.component;

			if( close_module == elem ){
				close_module = {
					offsetLeft : 0,
					offsetTop : 0,
					offsetWidth : elem.offsetWidth,
					offsetHeight : elem.offsetHeight
				};
			}

			var scroll = /*data.getScroll()*/ { left : 0, top : 0 },
			group_off = get_group_off( close_module, __scale ),
			off_left = acc_off( close_module, __outer, calc_offset( close_module, 'left', __scale ), 'offsetLeft' ) + group_off.left + calc_offset( elem, 'left', __scale ) + scroll.left - scroll_deduct( elem, __outer, 'Left', 0 ),
			off_top = acc_off( close_module, __outer, calc_offset( close_module, 'top', __scale ), 'offsetTop' ) + group_off.top + calc_offset( elem, 'top', __scale ) + scroll.top - scroll_deduct( elem, __outer, 'Top', 0 ),
			initial_angle,
			__pos = close_com ? {} : {
				x : calc_offset( elem, 'left', __scale ) / close_module.offsetWidth,
				y : calc_offset( elem, 'top', __scale ) / close_module.offsetHeight
			},
			_height = off_top + elem.offsetHeight * 0.5;

			if( close_com ){
				if( !is_reselect ){
					close_com.update_from_evt( __pos, evt );
				}
			}

			if( close_com && is_reselect ){
				var src_position = $L( tempElement ).data( 'src_position' ),
				x_value = src_position.x || 1;

				near = off_left + elem.offsetWidth * x_value;
				_height = off_top + elem.offsetHeight * src_position.y;

				if( $L( elem ).hasClass( 'lyteConnectInnerItem' ) ){
					near += calc_offset( elem.parentNode, 'left', __scale );
					_height += calc_offset( elem.parentNode, 'top', __scale );
				}

				if( x_value >= 0.5 ){
					initial_angle = 0;
				} else {
					initial_angle = 180;
				}
			} else{
				var $elem = $L( elem ),
				is_anchor = $elem.hasClass( 'lyteConnectAnchorPoint' );

				if( Math.abs( near - bcr.left ) > Math.abs( near - bcr.right ) ){
					near = off_left + elem.offsetWidth;
					initial_angle = 0;
				} else {
					near = off_left;
					initial_angle = 180;
				}

				if( is_anchor ){
					var __x = __pos.x = Number( $elem.attr( 'left' ) ),
					__y = __pos.y = Number( $elem.attr( 'top' ) ),
					__parent = elem.parentNode,
					par_bcr = __parent.getBoundingClientRect(),
					is_not_left = __x != 0 && __x != 1;

					near = calc_offset( __parent, 'left', __scale ) + __x * par_bcr.width;
					_height = calc_offset( __parent, 'top', __scale ) + __y * par_bcr.height;

					if( $L( __parent ).hasClass( 'lyteConnectInnerItem' ) ){
						near += calc_offset( __parent.parentNode, 'left', __scale );
						_height += calc_offset( __parent.parentNode, 'top', __scale );
					}

					if( is_not_left ){
						if( __y == 0 ){
							initial_angle = 270;
						} else if( __y == 1 ){
							initial_angle = 90;
						}
					}
				}
			}

			$L( document ).on( obj );

			this.addClass( 'lyteConnectionCreateMousedown' ).data( obj ).data({
				clientX : evt.clientX,
				clientY : evt.clientY,
				con_x : near,
				con_y : _height,
				element : elem,
				tempElement : connector,
				initial_angle : initial_angle,
				pos : __pos
			});

			data.ignore_break = true;

			ori_evt.preventDefault();
		}

		function destroy(){
			var len = this.length;

			for( var i = 0; i < len; i++ ){
				var cur = this.eq( i ),
				data = cur.data( connection_data_str );

				if( data ){
					var elements = cur.find( '.' + srcElemClass ),
					_len = elements.length;

					for( var j = 0; j < _len; j++ ){
						delete_connection.call( this, elements.eq( j ) );
					}

					cur.removeData( connection_data_str );
				}
				cur.removeClass( lyteConnectionElement_str ).off( evt_str );
			}
		}

		function apply_connection( obj ){
			var len = this.length,
			fn1 = function(){
				return{
					left : 0,
					top : 0
				};
			},
			fn2 = function(){
				return 1;
			},
			fn3 = function(){
				return;
			};

			for( var i = 0; i < len; i++ ){
				var cur = this.eq( i );

				var new_obj = $L.extend( true, { 
					connection_type : "curve", 
					connector_radius : 5,
					connectShortest : true, 
					line_marker : void 0,
					readonly : false,
					offset : { 
						left : 2, 
						right : 2, 
						top : 2, 
						bottom : 2 
					},
					getScroll : fn1,
					getScale : fn2,
					getBoundary : fn3,
					curve_offset : 0,
					render_first : false,
					min_width : 100,
					min_height : 100,
					max_width : 1400,
					max_height : 1400
				}, obj );

				if( cur.data( connection_data_str ) ){
					destroy.call( cur );
				}

				if( !new_obj.wrapperElement ){
					var svg = document.createElementNS( http_string + "www.w3.org/2000/svg", 'svg' );
					svg.setAttribute( 'width', '100%' );
					svg.setAttribute( 'height', '100%' );

					new_obj.wrapperElement = svg;
					cur.get( 0 ).appendChild( svg );
				}

				cur.data( connection_data_str, new_obj ).addClass( lyteConnectionElement_str )

				if( obj.module ){
					cur.on( evt_str, mousedown.bind( cur ) );
				}
			}
		}

		function delete_connection( element, id ){
			var $elem = $L( element ),
			exst = $elem.data( connection_elements ) || {},
			data = this.data( connection_data_str ),
			callback = data.onConnectionDisconnect;

			if( $elem.hasClass( 'lyteConnectionContainer' ) ){
				return delete_connection.call( this, $elem.data( 'src' ), $elem.attr( 'id' ) );
			}

			for( var key in exst ){
				var act_key = key.replace( 'src_', '' ).replace( 'target_', '' );

				if( id && id != act_key ){
					continue;
				} 

				var cur = exst[ key ],
				dom = cur.connector,
				src_dom = dom.data( 'src' ),
				target_dom = dom.data( 'target' ),
				src = src_dom.data( connection_elements ),
				target = target_dom.data( connection_elements ),
				con_elem = dom.get( 0 ),
				fastdom = $L.fastdom,
				text_box = dom.data( 'text_box' ),
				ml = "mouseleave",
				evt_name = "mouseenter " + ml;

				if( data.connection_type == "elbow" && data.check_break && data.elbow_arc ){
					$L.elbow.arc && $L.elbow.arc( con_elem, data, true );
				}

				dom.children().trigger( ml ).off( evt_name );
				$L( text_box ).trigger( ml ).removeAttr( "connector-id" ).off( evt_name ).removeData( "connector" )

				delete src[ 'src_' + act_key ];
				delete target[ 'target_' + act_key ];

				if( !/src_/.test( Object.keys( src ).join( '' ) ) ){
					src_dom.removeClass( srcElemClass );
				}

				if( !/target_/.test( Object.keys( target ).join( '' ) ) ){
					target_dom.removeClass( targetElemClass );
				}

				[ 'src', 'target', 'active_src', 'active_target', 'text_box' ].forEach( function( item ){
					dom.removeData( item );
				});

				fastdom.clear( con_elem._measure_fdom );
				fastdom.clear( con_elem._mutate_fdom );

				con_elem.remove(); 

				if( callback ){
					callback.call( this, dom.data() );
				}

				dom.removeData();
			} 

			// var keys = Object.keys( exst ).join( '' );
			// if( !/src_/.test( keys ) ){
			// 	$elem.removeClass( srcElemClass );
			// }

			// if( !/target_/.test( keys ) ){
			// 	$elem.removeClass( targetElemClass );
			// }
		}

		function adjust_bcr( _module, elem, bcr, scroll, scroll_elem, form_module, __scale ){

			if( _module == elem){
				elem = {
					offsetLeft : 0,
					offsetTop : 0,
					offsetWidth : elem.offsetWidth,
					offsetHeight : elem.offsetHeight
				};
			}

			var group_off = get_group_off( _module, __scale ),
			__fn = function( ns, __elem ){
				if( !__elem || __elem == _module ){
					return 0;
				}
				return __fn( ns, __elem.offsetParent ) + __elem[ 'offset' + ns ];
			},
			obj = {
				width : elem.offsetWidth,
				height : elem.offsetHeight,
				left : calc_offset( _module, 'left', __scale ) + group_off.left + __fn( 'Left', elem ) + scroll.left - ( scroll_elem ? scroll_elem.scrollLeft : 0 ),
				top : calc_offset( _module, 'top', __scale ) + group_off.top + __fn( 'Top', elem ) + scroll.top - ( scroll_elem ? scroll_elem.scrollTop : 0 ),
				scroll : scroll
			};

			if( form_module ){
				$L.extend( true, obj, {
					_width : _module.offsetWidth,
					_height : _module.offsetHeight,
					_left : calc_offset( _module, 'left', __scale ) + group_off.left + scroll.left,
					_top : calc_offset( _module, 'top', __scale ) + group_off.top + scroll.top
				});
				// obj._right = obj._left + obj._width;
				// obj._bottom = obj._top + obj._height;
			}

			// obj.right = obj.left + obj.width;
			// obj.bottom = obj.top + obj.height;

			return obj;
		}

		function adjust_without_module( bcr, __elem ){
			var other_bcr = __elem.getBoundingClientRect(),
			__left = other_bcr.left,
			__top = other_bcr.top;

			return {
				x : bcr.x - __left,
				y : bcr.y - __top,
				width : bcr.width,
				height : bcr.height,
				left : bcr.left - __left,
				top : bcr.top - __top,
				right : bcr.right - __left,
				bottom : bcr.bottom - __top
			};
		}

		function adjust_position( obj, bcr, element, data, __elem ){

			var scroll_query = data.scroll_parent,
			elem = scroll_query ? element.closest( scroll_query ) : void 0,
			__module = data.module,
			_module = element.closest( __module ),
			x = obj.x,
			y = obj.y,
			avoid_module = data.avoid_with_module,
			__scale = data.getScale();

			if( elem ){
				var _bcr = elem.getBoundingClientRect(),
				top_hid = bcr.bottom < _bcr.top,
				bottom_hid = bcr.top > _bcr.bottom,
				query = top_hid ? data.default_top : data.default_bottom;
				
				if( top_hid || bottom_hid ){
					if( query ? ( elem = _module.querySelector( query ) ) : void 0 ){
						bcr = elem.getBoundingClientRect();
						element = elem;
					}
				}
			}

			if( !_module && $L( element ).hasClass( 'lyteConnectReconnectElement' ) ){
				_module = element;
			}

			bcr = _module && __module == "lyte-connect-item" ? adjust_bcr( _module, element, bcr, /*data.getScroll()*/ { left : 0, top : 0 }, elem, avoid_module, __scale ) : adjust_without_module( bcr, __elem );

			var width = bcr.width,
			height = bcr.height,
			_left = bcr.left,
			_top = bcr.top,
			fn = function( name ){
				if( avoid_module ){
					var ret = bcr[ '_' + name ];
					if( ret != void 0 ){
						return ret;
					}
				}
				return bcr[ name ];
			};

			return{
				x : x * width + _left,
				y : y * height +_top,
				pos_x : x * width + ( avoid_module ? ( _left - fn( 'left' ) ) : 0 ),
				pos_y : y * height + ( avoid_module ? ( _top - fn( 'top' ) ) : 0 ),
				width : fn( "width" ),
				height : fn( "height" ),
				left : fn( "left" ),
				top : fn( "top" ),
				elem : element
			}
		}

		function find_position( bcr1, bcr2, options ){
			var fn = function( _bcr1, _bcr2, _left, _right, _x, obj ){
				var __value = obj[ _x ];
				if( __value != void 0 ){
					return __value;
				}

				var _left1 = _bcr1[ _left ],
				_right1 = _bcr1[ _right ],
				_left2 = _bcr2[ _left ],
				_right2 = _bcr2[ _right ];

				if( _left1 < _left2 || _left1 < _right2 ){
					return 1;
				} else {
					return 0;
				} 

			},
			src_position = options.src_position || {},
			target_position = options.target_position || {},
			src_x = fn( bcr1, bcr2, 'left', 'right', 'x', src_position ),
			src_y = fn( bcr1, bcr2, 'top', 'bottom', 'y', src_position ),
			target_x = fn( bcr2, bcr1, 'left', 'right', 'x', target_position ),
			target_y = fn( bcr2, bcr1, 'top', 'bottom', 'y', target_position );

			return {
				src_position : {
					x : src_x,
					y : src_y
				},
				target_position : {
					x : target_x,
					y : target_y
				}
			};
		} 

		function get_elem_id( query ){
			var split = query.split( ',' ),
			ret;

			split.every( function( item ){
				ret = document.getElementById( item.replace( '#', '' ) );
				return !ret;
			});

			return ret;
		}

		function create( src, target, options ){
			options = options || {};

			var text_box = options.text_box;

			// $L.fastdom.measure( function(){
				var elem = this.get( 0 ),
				src_elem = options.is_src_id ? get_elem_id( src ) : $L( src, elem ).get( 0 ),
				target_elem = options.is_target_id ? get_elem_id( target ) : $L( target, elem ).get( 0 ),
				// bcr1 = src_elem.getBoundingClientRect(),
				// bcr2 = target_elem.getBoundingClientRect(),
				// ret = find_position( bcr1, bcr2, options ),
				// src_position = ret.src_position || {},
				// target_position = ret.target_position || {},
				data = this.data( connection_data_str ),
				// src_obj = adjust_position( src_position, bcr1, src_elem, data, elem ),
				// target_obj = adjust_position( target_position, bcr2, target_elem, data, elem ),
				connectShortest = data.connectShortest;
				
				// $L.fastdom.mutate( function(){
					var __id = options.id || ( options.id = ( 'connection_' + Date.now() + parseInt( Math.random() * 1e3 ) ) ),
					element = createElement.call( this, __id || '', containerClass + " " + ( options.class || '' ), data, options ),
					$elem = $L( element ),
					$src = $L( src_elem ),
					$target = $L( target_elem ),
					text_box_hover = tbox_hover.bind( this );

					data.wrapperElement.appendChild( element );

					$elem.data({
						src : $src.addClass( srcElemClass ),
						target : $target.addClass( targetElemClass ),
						src_position : options.src_position,
						target_position : options.target_position,
						//src_position : ( /*connectShortest ? options.src_position :*/ src_position ) || {},
						//target_position : ( /*connectShortest ? options.target_position :*/ target_position ) || {},
						options : options,
						src_query : src,
						target_query : target,
						// active_src : src_obj.elem,
						// active_target : target_obj.elem,
						arcs : {},
						vert_arcs : {},
						text_box : text_box
					});

					$L( text_box ).attr( "connector-id", __id ).data( 'connector', $elem ).on({
						mouseenter : text_box_hover,
						mouseleave : text_box_hover
					});

					// draw_curve( element, src_obj, target_obj, data );

					var data_fn = function( $_elem ){
						var __data = $_elem.data( connection_elements );
						if( !__data ){
							__data = {};
							$_elem.data( connection_elements, __data );	
						}

						return __data;
					},
					src_data = data_fn( $src ),
					target_data = data_fn( $target ),
					callback = data.onConnectionCreate,
					fastdom = $L.fastdom;

					src_data[ 'src_' + __id ] = { connector : $elem };
					target_data[ 'target_' + __id ] = { connector : $elem };
					// draw curve
					!elem.__ignore_update && update_individual_connector.call( this, $elem );

					if( callback ){
						fastdom.measure( function(){
							fastdom.mutate( function(){
								callback.call( this, element, src_elem, target_elem );
							}, this );
						}, this );
					}

			// 	}, this );
			// }, this );
		}

		function update( element ){
			var connection = get_connections( element );

			connection.src.concat( connection.target ).forEach( function( item ){
				update_individual_connector.call( this, item );
			}.bind( this ) );
		}

		function update_individual_connector( item ){
			if( item.hasClass( 'lyteConnectHiddenElem' ) ){
				return;
			}

			var item_elem = item.get( 0 ),
			fastdom = $L.fastdom;

			fastdom.clear( item_elem._measure_fdom );

			item_elem._measure_fdom = fastdom.measure( function(){
				delete item_elem._measure_fdom;
				var this_elem = this.get( 0 ),
				data = item.data(),
				src_elem = data.src.get( 0 ),
				bcr1 = src_elem.getBoundingClientRect(),
				target_elem = data.target.get( 0 ),
				bcr2 = target_elem.getBoundingClientRect(),
				ret = find_position( bcr1, bcr2, data.options ),
				src_position = ret.src_position,
				target_position = ret.target_position,
				_data = this.data( connection_data_str ),
				src_obj = adjust_position( src_position, bcr1, src_elem, _data, this_elem ),
				target_obj = adjust_position( target_position, bcr2, target_elem, _data, this_elem );

				data.active_src = src_obj.elem;
				data.active_target = target_obj.elem;

				data.src_position = src_position;
				data.target_position = target_position;

				fastdom.clear( item_elem._mutate_fdom );

				item_elem._mutate_fdom = fastdom.mutate( function(){
					delete item_elem._mutate_fdom;
					draw_curve( item_elem, src_obj, target_obj, _data );
				}, this );

			}, this );
		}

		/*
		 * Single element may have multiple parents. So cannot create previous parent in single dimentional array. it may go like binary tree. 
		 */

		function get_previous( __elem, deep_arr, deep_copy ){
			
			deep_arr = deep_arr || [];
			deep_copy = deep_copy || [];

			var arr = [],
			$node = $L( __elem ),
			__data = $node.data( connection_elements ) || {},
			dom_elem = $node.get( 0 ),
			__obj = {
				elem : dom_elem,
				parent : arr
			};

			deep_arr.push( dom_elem );
			deep_copy.push( __obj );

			for( var key in __data ){
				if( /^target/i.test( key ) ){
					var __value = __data[ key ],
					__connection = __value.connector,
					par_node = __connection.data( 'src' ),
					parent_dom = par_node.get( 0 ),
					index = deep_arr.indexOf( parent_dom ),
					sub_obj = {
						connector : __connection.get( 0 ),
						parent : parent_dom
					},
					ret,
					recursive = false;

					if( index + 1 ){
						ret = deep_copy[ index ];
						recursive = true;
					} else {
					    ret = get_previous( par_node, deep_arr, deep_copy );
					}

					if( ret.parent.length ){
						sub_obj.previous_parent = ret;
					}

					sub_obj.recursive = recursive;
					arr.push( sub_obj );
				}
			}

			return __obj;
		}

		function getAll(){
			return Array.from( this.find( '.lyteConnectionContainer' ) ).map( function( item ){
				return {
					connector : item,
					src : getSrc( item ).get( 0 ),
					target : getSrc( item, 'target' ).get( 0 )
				};
			});
		}

		function get_connections( element ){
			var data = $L( element ).data( connection_elements ) || {},
			src = [],
			target = [];

			for( var key in data ){
				( /src_/.test( key ) ? src : target ).push( data[ key ].connector );
			}

			return {
				src : src,
				target : target
			};
		}

		function is_connected( src, target ){
			var data = $L( src ).data( connection_elements ) || {};

			target = $L( target ).get( 0 );

			for( var key in data ){
				if( /src_/.test( key ) ){
					var value = data[ key ].connector,
					_target = value.data( 'target' ).get( 0 );

					if( _target == target ){
						return true;
					}
				}
			}
			return false;
		}

		function getSrc( elem, type ){
			return $L( elem ).data( type || 'src' );
		}

		lytedom.prototype.connection = function( arg1, arg2, arg3, arg4 ){
			if( !this.length ){
				return this;
			}
			switch( arg1 ){
				case 'update' : {
					update.call( this, arg2 );
				}
				break;
				case 'updateConnection' : {
					update_individual_connector.call( this, arg2 );
				}
				break;
				case 'delete' : {
					delete_connection.call( this, arg2, arg3 );
				}
				break;
				case 'destroy' : {
					destroy.call( this );
				}
				break;
				case 'create' : {
					create.call( this, arg2, arg3, arg4 );
				}	
				break;
				case 'getConnections' : {
					return get_connections( arg2 );
				}
				break;
				case 'hasConnected' : {
					return is_connected( arg2, arg3 );
				}
				break;
				case 'getSrc' : {
					return getSrc( arg2 );
				}
				break;
				case 'getTarget' : {
					return getSrc( arg2, 'target' );
				}
				break;
				case 'getAll' : {
					return getAll.call( this );
				}
				break;
				case 'getPrevious' : {
					return get_previous.call( this, arg2 );
				}	
				break;
				default : {
					apply_connection.call( this, arg1 );
				}
			}
			return this;
		}
	}
})();
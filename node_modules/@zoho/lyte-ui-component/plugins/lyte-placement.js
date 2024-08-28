 ;(function(windows){
 	
 	lyteDomObj.prototype.placement = function( config ) {
		var elem = this.get(0);
		this.data  = config;
		this.container = $L(this.container).length ? $L(this.container)[0] : $L('body')[0];

		setDefaultConfig( config );

		if( config.append ) {
			appendElement( config , elem );
		}
		
		if( config.originElement ) {
			alignWithOriginElement( config , elem );						
		}else{
			alignWithWindow( config , elem );
		}			
	}

	function setDefaultConfig( config ) {
		config = config || {};

		if( !( 'append' in config ) ) {
			config.append = true;
		}
	}


	function alterElementPosition( alterposition , elem ){
		if( alterposition ){
			elem.style.left = elem.offsetLeft + alterposition.left + 'px';
			elem.style.top = elem.offsetTop + alterposition.top + 'px';
		}
	}
			
	function appendElement( config , elem ){
		var appendto;
		elem.style.position = 'absolute';
		if( config.appendTo ){
			appendto = document.querySelector( config.appendTo );
			if( appendto == undefined ){
				appendto = $L('body').get(0);
			}
		}else{
			appendto = document.getElementsByTagName('body')[0];
		}
			appendto.appendChild(elem);
	}

	function alignRight( origin_elem , elem , container){
		
		var actualposition = origin_elem.getBoundingClientRect().right;
		var marginLeft = parseInt(window.getComputedStyle(container).marginLeft); 

		if( isWindowLeftExceeded( actualposition , elem ,container ) ){
			elem.style.left = origin_elem.getBoundingClientRect().left - elem.offsetParent.getBoundingClientRect().left  + origin_elem.offsetWidth + marginLeft + "px";
		}else{
			if(canElementFitLeft( (origin_elem.offsetLeft - elem.offsetWidth) , container )){
				elem.style.left = origin_elem.offsetLeft - elem.offsetWidth + "px";
			}else {
				elem.style.left = origin_elem.getBoundingClientRect().left - elem.offsetParent.getBoundingClientRect().left  + origin_elem.offsetWidth + marginLeft + "px";
			}
		}
		
	}
			
	function alignLeft( origin_elem , elem , container ){
		var leftBoundary = origin_elem.getBoundingClientRect().left - elem.offsetParent.getBoundingClientRect().left - elem.offsetWidth;
		var marginLeft = parseInt(window.getComputedStyle(container).marginLeft); 
		if( canElementFitLeft( leftBoundary , container ) ){
			elem.style.left = leftBoundary + "px";
		}else{
			var actualposition = origin_elem.getBoundingClientRect().right;
			if( isWindowLeftExceeded( actualposition , elem ,container ) ){
				elem.style.left = origin_elem.offsetParent.getBoundingClientRect().left - origin_elem.getBoundingClientRect().left + origin_elem.offsetWidth + marginLeft + "px";
			}else{
				elem.style.left = leftBoundary + "px";
			}
		}
	}
	
	function alignTop( origin_elem , elem ,container ){
		var topBoundary =  origin_elem.getBoundingClientRect().top - elem.offsetHeight;
		var marginTop = parseInt(window.getComputedStyle(container).marginTop); 
		if( canElementFitAbove( topBoundary ,container) ){
			elem.style.top = topBoundary - elem.offsetParent.getBoundingClientRect().top + marginTop + 'px';
		}else{
			var actual_top = origin_elem.getBoundingClientRect().bottom;
			if( !isWindowTopExceeded( actual_top , elem  ,container) ){
				elem.style.top =  origin_elem.getBoundingClientRect().top  - elem.offsetParent.getBoundingClientRect().top + origin_elem.offsetHeight + marginTop + 'px';
			}else{
				elem.style.top = topBoundary - elem.offsetParent.getBoundingClientRect().top + marginTop + 'px';
			}

		}

	}
	
	function alignBottom(origin_elem , elem , container){
		var originElementBoundingRect = origin_elem.getBoundingClientRect(), 
		originElementBottom = originElementBoundingRect.bottom,
		originElementTop = originElementBoundingRect.top;

		fixElementLeft( origin_elem , elem, container );

		if( isWindowTopExceeded( originElementBottom, elem, container ) ) {
			elem.style.top = addTopScroll( elem ) + originElementBottom + 'px';
		}else{
			elem.style.top = addTopScroll( elem ) + originElementTop - elem.offsetHeight + 'px';
		}

	}

	function alignBottomRight(origin_elem , elem , container){
		alignBottom( origin_elem , elem , container );
		alignRight( origin_elem , elem , container);
	}

	function alignTopRight( origin_elem , elem , container ){
		alignTop( origin_elem , elem , container );
		alignRight( origin_elem , elem , container);
	}
	
	function alignTopLeft( origin_elem , elem , container ){
		alignTop( origin_elem , elem , container );
		alignLeft( origin_elem , elem , container);

	}
	
	function alignBottomLeft( origin_elem , elem , container ){
		alignBottom( origin_elem , elem , container );
		alignLeft( origin_elem , elem , container);
	}

	function alignTopCenter( origin_elem , elem , container ){
		elem.style.left = origin_elem.getBoundingClientRect().left - elem.offsetParent.getBoundingClientRect().left + origin_elem.offsetWidth/2 - elem.offsetWidth/2 + "px";
		alignTop( origin_elem , elem , container );
	}
	
	function alignBottomCenter( origin_elem , elem , container ){
		var marginTop = parseInt(window.getComputedStyle(container).marginTop);
		elem.style.left = origin_elem.offsetLeft + origin_elem.offsetWidth/2 - elem.offsetWidth/2 + "px";
		alignBottom( origin_elem , elem , container);
	}
	
	function alignCenterRight( origin_elem , elem , container ){
		alignRight( origin_elem , elem , container);
		FixElementTopCenter( origin_elem , elem , container );
	}
	function alignCenter( origin_elem , elem , container ){
		var center = origin_elem.getBoundingClientRect().left + origin_elem.offsetWidth/2 ;
		if( isWindowLeftExceeded( center , elem , container)){
			elem.style.left = center - elem.offsetParent.getBoundingClientRect().left + 'px'; 
		}else{
			elem.style.left = origin_elem.getBoundingClientRect().left - elem.offsetParent.getBoundingClientRect().left + origin_elem.offsetWidth/2 - elem.offsetWidth + 'px';
		}
		FixElementTopCenter( origin_elem , elem , container);
	}
	
	function alignCenterLeft( origin_elem , elem , container ){
		alignLeft( origin_elem , elem , container );
		FixElementTopCenter( origin_elem , elem , container);
	}
	
	function FixElementTopCenter( origin_elem , elem ,container){
		var top = origin_elem.getBoundingClientRect().top + origin_elem.offsetHeight/2; 
		if( !isWindowTopExceeded( top , elem, container ) ){
			elem.style.top = top - elem.offsetParent.getBoundingClientRect().top - elem.offsetHeight + "px";
		}else{
			elem.style.top = top - elem.offsetParent.getBoundingClientRect().top + "px";
		}
	}
	
	function canElementFitAbove( topBoundary ,container){

		if( topBoundary >= container.getBoundingClientRect().top ){
			return true;
		}
		else{
			return false;
		}
	} 
			
	function canElementFitLeft( leftBoundary ,container){
		if( leftBoundary >= container.getBoundingClientRect().left ){
			return true;
		}
		else{
			return false;
		}
	}
	
	function isWindowTopExceeded( position , elem ,container){
		if( ( position + elem.offsetHeight ) < window.innerHeight ){
			return true;
		}
		else{
			return false;
		}
	}
	
	function isWindowLeftExceeded( position , elem , container){	
		if( ( position + elem.offsetWidth ) < (container.getBoundingClientRect().left + container.getBoundingClientRect().width) ){
			return true;	
		}
		else{
			return false;
		}
	}	
	
	
	function placeAtBottom( origin_elem , elem , container){
		var marginTop = parseInt(window.getComputedStyle(container).marginTop);
		elem.style.top = origin_elem.getBoundingClientRect().top - elem.offsetParent.getBoundingClientRect().top - marginTop  + "px"; 
	}

	function placeAtTop( origin_elem , elem , container ){	
		var marginTop = parseInt(window.getComputedStyle(container).marginTop);
		elem.style.top = origin_elem.getBoundingClientRect().top -  elem.offsetParent.getBoundingClientRect().top + marginTop  + "px";
	}
	
	function FixElementTop( origin_elem , elem , container ){
		if( !isWindowTopExceeded( origin_elem.getBoundingClientRect().top , elem, container ) ){
			placeAtBottom( origin_elem , elem ,container );
		}else{
			placeAtTop( origin_elem , elem ,container);
		}
	}
	
	function alignWithOriginElement( config , elem ){
		var body = $L( "body" ).get(0);
		
		if( getComputedStyle(body).direction == 'rtl'){
			Changedirection( config );
		}
		if( config.alignment ){
			alignWithLeftTop( config , elem );
		}else{
			alignWithPosition( config , elem  );
		}
		alterElementPosition( config.alterposition , elem );
	}
	
	function alignWithLeftTop( config , elem ){
		var origin_elem = $L( config.originElement ).get(0);
		var container =  $L(config.container).length ? $L(config.container).get(0) : $L('body').get(0);
		var elem_left = config.alignment.left;
		var elem_top = config.alignment.top;

		switch(elem_top){
			case 'top':
				if( !elem_left ){
					alignTop( origin_elem , elem , container );
					fixElementLeft( origin_elem , elem , container  );
				}
				else if( elem_left == 'left' ){
					alignTopLeft( origin_elem , elem , container );
				}
				else if( elem_left == 'right'){
					alignTopRight( origin_elem , elem , container );
				}
				else{
					alignTopCenter( origin_elem , elem , container ); 
				}
				break;
			case 'bottom':
				if( !elem_left ){
					alignBottom( origin_elem , elem , container );
					fixElementLeft( origin_elem , elem , container  );
				}
				else if( elem_left == 'left' ){
					alignBottomLeft( origin_elem , elem , container );
				}
				else if( elem_left == 'right'){
					alignBottomRight( origin_elem , elem , container );
				}
				else{
					alignBottomCenter( origin_elem , elem , container ); 
				}
				break;
			case 'center':
				if( !elem_left ){
					alignCenter( origin_elem , elem , container );
				}
				else if( elem_left == 'left' ){
					alignCenterLeft( origin_elem , elem , container );
				}
				else if( elem_left == 'right'){
					alignCenterRight( origin_elem , elem , container );
				}
				else{
					alignCenter( origin_elem , elem , container );				
				}
				break;
			default :
				switch(elem_left){
					case 'left':
						alignLeft( origin_elem , elem , container );
						FixElementTop(origin_elem , elem , container );
						break;
					case 'right':
						alignRight( origin_elem , elem , container );
						FixElementTop(origin_elem , elem , container );
						break;
					case 'center':
						alignCenter( origin_elem , elem , container );
						break;
					default :
						alignBottom( origin_elem , elem , container );
						break;
				}
		}
	}
	
	function alignWithPosition( config , elem ){
		var origin_elem = $L( config.originElement ).get(0);
		var container =  $L(config.container).length ? $L(config.container).get(0) : $L('body').get(0);

		switch ( config.position ) {
			case 'right':
				alignRight( origin_elem , elem , container );
				FixElementTop( origin_elem , elem , container );
				break;
			case 'left':
				alignLeft( origin_elem , elem , container  );
				FixElementTop(origin_elem , elem , container );
				break;
			case 'top':
				alignTop( origin_elem , elem , container  );
				fixElementLeft( origin_elem , elem , container  );
				break;
			case 'bottomright':
				alignBottomRight( origin_elem , elem , container  );
				break;
			case 'bottomleft':
				alignBottomLeft( origin_elem , elem , container  );
				break;
			case 'topright':
				alignTopRight( origin_elem , elem , container  );
				break;
			case 'topleft':
				alignTopLeft( origin_elem , elem , container );
				break;
			case 'bottom':
			default :
				alignBottom( origin_elem , elem , container  );
				fixElementLeft( origin_elem , elem , container  );
				break;
		}
	}
	
	function alignWithWindow( config , elem ){
		var offset = config.offset ? config.offset : {};
		
		if(isoffset( offset ) ){
			if( isRtl() ){
				offset.left = window.innerWidth - offset.left.match(/(\d+)/)[0] - elem.offsetWidth + 'px';
			}
			setTopLeft( offset , elem );
		}else{
			elem.style.left = ( window.innerWidth/2 - elem.offsetWidth/2 )  + 'px';
			elem.style.top = ( window.innerHeight/2 - elem.offsetHeight/2 )  + 'px';	
		}
	}
	function Changedirection( config ){
		if(config.alignment){
			if( config.alignment.left == 'right' ){
				config.alignment.left = 'left';
			}else if( config.alignment.left == 'left' ){
				config.alignment.left = 'right';
			}
		}else{
			if( config.position == 'left' ){
				config.position = 'right';
			}else if( config.position == 'topleft' ){
				config.position = 'topright';
			}else if( config.position == 'bottomleft' ){
				config.position = 'bottomright';
			}else if( config.position == 'right' ){
				config.position = 'right';
			}else if( config.position == 'topright' ){
				config.position = 'topleft';
			}else if( config.position == 'bottomright' ){
				config.position = 'bottomleft';
			}
		}
	}
	function fixElementLeft( origin_elem , elem ,container){
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		if( !isWindowLeftExceeded( origin_elem.offsetLeft , elem ,container ) ){
			elem.style.left = window.innerWidth - elem.offsetWidth + 'px';
		}else{
			elem.style.left = origin_elem.offsetLeft + 'px';
		}
	}
	function isRtl(){
		var body = $L('body').get(0);
		if(getComputedStyle(body).direction == 'rtl'){
			return true;
		}
		else{
			return false;
		}
	}
	function setTopLeft( offset , elem ){
		var left = offset.left ? offset.left : '0px';
		var top = offset.top ? offset.top : '0px';
		elem.style.left = left;
		elem.style.top = top;
	}
	function isoffset( offset ){
		if(offset.left  || offset.top ){
			return true;
		}
		else{
			return false;
		}
	}

	function addTopScroll( elementToPosition ) {
		var offsetParent = elementToPosition.offsetParent;

		if( offsetParent.tagName === 'BODY' ) {
			return window.pageYOffset || document.documentElement.scrollTop;
		}

		// TODO: Add this
		return 0;
	}

})(window);

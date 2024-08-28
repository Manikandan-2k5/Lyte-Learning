

;( function() { 

	var wrapped = [];
	var $u = function(obj){
		if (obj instanceof $u) return obj;
    	if (!(this instanceof $u)) return new $u(obj);
		this.wrapped = obj;
	};
	var result = function(instance, obj) {
    	return instance._chain ? $u(obj).chain() : obj;
  	};
  	
  	$u.some = function( list , predicate ){

  		if(predicate  != null){
  			predicate = formatIteratee(predicate);
		}
  		if(!Array.isArray(list)){
  			for(var key in list){
  				var currentVal = list[key];
  				if(!predicate){
  					if(currentVal){
  						return true;
  					}
  				}else if(predicate(currentVal)){
  					return true;
  				}
  			}
  		}else{
  			var length = list.length;
			for (var index = 0 ; index < length ; index++){
  				var currentVal = list[ index ];
  				if(!predicate){
  					if(currentVal){
  						return true;
  					}
  				}else if(predicate(currentVal)){
  					return true;
  				}
  			}
		}
  		
  		return false;
  	}


  	$u.every = function( list , predicate ){
  		
  		if(predicate  != null){
  			predicate = formatIteratee(predicate);
		}
  		if(!Array.isArray(list)){
  			for(var key in list){
  				var currentVal = list[key];
  				if(!predicate){
  					if(!currentVal){
  						return false;
  					}
  				}else if(!predicate(currentVal)){
  					return false;
  				}
  			}
  		}else{
  			var length = list.length;
			for (var index = 0 ; index < length ; index++){
  				var currentVal = list[ index ];
  				if(!predicate){
  					if(!currentVal){
  						return false;
  					}
  				}else if(!predicate(currentVal)){
  					return false;
  				}
  			}
		}
  		
  		return true;

  	}

  	$u.contains = function( list , val ){
  		return includes( list , val );
  	}


	$u.mixin = function( object ){
		
		var keys = Object.keys( object );
		keys.forEach(function(key){
			var func_name = key;
			var func =$u[func_name]= object[ func_name ];
      		$u.prototype[ func_name ] = function() {
        		var args = [this.wrapped];
        		Array.prototype.push.apply(args,arguments);
        		return  result( this , func.apply($u, args) );
			}
		});
	}
	$u.prototype.value=function(){
		return this.wrapped;
	}
	$u.difference = function(){
		
			var length = arguments.length;
		
		var newArray=[];
		
		var array = arguments[0];
		for(var index=0 ,len = array.length; index < len ; index++){
			var val = array[ index ];
			var isContains = false;
			for(var i= 1 ; i < length && Array.isArray(arguments[i]) ; i++){
				if(arguments[i].indexOf(val) !== -1){
					isContains = true;
					break;
				}
			}
			if(!isContains){
				newArray.push(val);
			}	
		}
		return newArray;
		
		

	}
	var Form_array = function( arg ){
		var array =[];
		Array.prototype.push.apply(array,arg);
		return array;
	}
	$u.removeFromArray = function (array , removeitems){
		var newArray = [];
		
		for (var i = 0,length= array.length; i < length; i++) {
			var val = array[ i ];
			if(!includes(removeitems,val)){
				newArray.push(val);
			}
		}
		return newArray;
	}
	var includes = function( list , val ){
		list = list || [];
		if(Array.isArray(list)){
			return list.indexOf(val) >= 0 ? true : false;
		}else{
			return $u.some( list , function(item){ return item === val; })
		}
		
	}
	$u.groupBy = function( list , iteratee ){
			
		iteratee = formatIteratee(iteratee);
		return list.reduce(function( set , val) {
			var key = iteratee( val );
	   		(set[key] = Array.isArray(set[ key ]) ? set[key] : []);
	   		set[key].push(val);
	    	return set;
	  	},{});
	}
	$u.indexBy = function( list , iteratee ){
		iteratee = formatIteratee(iteratee);
		return list.reduce(function( set , val ){
			var key = iteratee(val);
			set[ key ] = val;
			return set;
		},{});
	}
	$u.chain = function(obj){
		
		var instance = $u(obj);
    	instance._chain = true;
    	
		return instance;
	}

	$u.findWhere = function( list , properties ){
		var keys = Object.keys(properties);
		var flag = true;
		var result = undefined;
		for ( val in list){
			val = list[val]
			for(var i = 0 ; i < keys.length ; i++){
				var key = keys[i];
				if(val[key] !== properties[key]){
					flag = false;
					break;
				}
			}
			if(flag){
				result = val;
				break
			}
			flag = true; 
		}
		return result;
	}
	$u.intersection = function(){
		
		var start = 1 , intersec = [];
		intersec= arguments[0] || [];
		
		var result = [];
		var length = arguments.length ;
		var flag = true;
		var argument = arguments;
		var that = $u;
		var result = intersec . filter(function (val) {
			
			for(var index = start ; index < length ; index++){
				var array = argument[index];
				var check = includes( array , val );
				if( !check && flag ){
					flag = false;
					break;
				}
			}
			if(flag){
				return true;
			}
			flag = true;
		});
		
		return result;
	}
	$u.defaults =function( obj ){
		var length = arguments.length ;
		var argument = {} ;
		argument = obj || {};
		if( argument ){
			for(var i = 1 ; i < length ; i++){
				for(var key in arguments[i]){
					if( !argument.hasOwnProperty(key) || argument[key] === undefined ){
						argument[key] = arguments[i][key];
					}
				}
			}
		}
		return argument;
	}
	$u.negate = function( func ){
		return function(){
			return !func.apply( this , arguments );
		}
	}
	$u.omit = function( object ){
		var omit ;
		var iteratee ;
		if(typeof arguments[1] != 'function'){
			var keys = [];
			keys = Form_array(arguments);
			keys.shift();
			iteratee = function(value , key){
				return !includes(keys,key);
			}
		}else{
			iteratee = $u.negate(arguments[1]);
		}	
		return $u.pick(arguments[0] , iteratee);
	}
	$u.pick_array = function ( obj , pick , key ){
		var that = $u;
		for(var index =0 ,length=key.length; index < length ; index++){
			var val = key[index];
			if( Array.isArray(val)){
				that.pick_array( obj , pick , val );
			}else if(obj.hasOwnProperty(val)){
				pick[val] = obj[val];
			}
		}
		
		return pick;
	}
	$u.pick =function ( obj ){
		var pick = {};
		var length = arguments.length;
		var iteratee;

		if(typeof(arguments[1]) != 'function'){
			for(var i = 1 ; i < length ; i++ ){
				var key = arguments[i];
				if( !Array.isArray(key) ){
					if(obj[key]){
						pick[key] = obj[key];
					}
				}else {
					pick = $u.pick_array( obj , pick , key );
				}
			}
		}else{
			iteratee = (arguments[1]);
			for( var key in obj ){
				if(iteratee( obj[key] , key , obj )){
					pick[key] = obj[key];
				}
			}
		}
		return pick;
	}
	$u.extend = function(obj){
		if(obj){
			var extendObj = function(keys,object){
				keys.forEach(function(key){
					obj[key] = object[key];
				});
			}
			for(var index = 1; index < arguments.length ; index++){
				var object = arguments[index];
				var keys = Object.getOwnPropertyNames(object);
				extendObj(keys, object);
			}
			return obj;
		}else{
			return undefined;
		}
	}
	
	$u.isString = function(obj){
		if(typeof obj == "string"){
			return true;
		}else if(typeof obj == "object"){
			var type = toString(obj);
			return  type === "[object String]";
		}else{
			return false;
		}
	}

	$u.isEmpty = function( list ){
		
		if(  Array.isArray( list )){
			if(list.length > 0){
				return false;
			}
		}else if( list && typeof list == 'object' ){
			if(Object.getOwnPropertyNames( list ).length > 0){
				return false;
			}
		}else if(list){
			return false;
		}
		return true;
	}
	$u.clone = function( object ){
		var type = typeof object;

	    if (! (type === 'function' || type === 'object' && !!object ))
		 	return object;
	    if(Array.isArray( object ) ){
	    	return object.slice() 
	    }else{
	    	newObj = {};
			for(var key in object){
				newObj[key] = object[key];
			}
			return newObj;
	    }
	}
	var isArrayLike =  function(obj){
    	return ( Array.isArray(obj) || 
        (!!obj &&
          typeof obj === "object" &&
          typeof (obj.length) === "number" && 
          (obj.length === 0 ||
             (obj.length > 0 && 
             (obj.length - 1) in obj)
          )
        ));
	}
	$u.map = function(list , iteratee ){
		
		iteratee = formatIteratee(iteratee);
		var arr = [];
		var keys = !isArrayLike(list) && Object.keys(list),
			length = (keys || list).length;
		for(var index = 0 ; index < length ; index++){
			var cur_key = keys ? keys[index] : index,
				value = iteratee(list[cur_key] , cur_key , list);
			if(value){
				arr.push( value );
			}
		}
		return arr;
			
		
	}
	var flatten = function(input ,depth,output){
		var output = output || [];
		if(!depth && depth !== 0){
			depth = Infinity;
		}else if(depth <= 0){
			return output.concat(input);
		}
		var index = output.length;
		for(var i = 0; i < input.length ; i++){
			var val= input[i];
			if(Array.isArray(val)){
				if(depth > 1){
					flatten(val,depth-1,output);
					index = output.length;
				}else{
					var j = 0 , length = val.length;
					while( j < length ){
						output[ index++ ] = val[ j++ ];
					}
				}	
			}else{
				output[ index++ ] = val;
			}
		}
		return output;
	}
	var toString = function( obj ){
		return ({}).toString.call(obj);
	}
	$u.union = function(){
				
		var length = arguments.length;
		var unionArray = arguments[ 0 ];
		if(toString(unionArray) === '[object Arguments]'){
			var result = [];
			for(var union_index = 0 ,len = unionArray.length ; union_index < len ; union_index++   ){
				result[union_index] = unionArray[union_index];
			}
			unionArray = result;
		}

		for(var index = 1 ; index < length ; index++ ){
			var array = arguments[ index ];
			for (var i =  0 , len = array.length; i < len ; i++) {
				var val = array[ i ];
				if(!includes(unionArray,val)){
					unionArray.push(val);
				}
			}
		}
		return unionArray;
		
	}
	$u.uniq = function(array , iteratee){

		var uniqArray = [];
		if(!array && !array.length){
			return [];
		}
		var seen = [] ;
		var index = -1;
		
		if(iteratee != null){
			var iteratee = formatIteratee(iteratee);
			
		}else{
			seen = uniqArray;
		}
		var length = array.length;
		loop:
		for( ++index ; index< length ; index++){
			var val = array[index];
			var iter_val = iteratee ? iteratee(val) : val;
			var seen_len = seen.length;
			while(seen_len--){
				if(seen[seen_len] === iter_val){
					continue loop;
				}
			}
			if(iteratee){
				seen.push(iter_val);
			}
			uniqArray.push(val);
		}
		
		return uniqArray;
	}
	$u.chunk = function(array,length){
		
		var chunkedArray = [],chunks = [];
		array.forEach(function(val){
			if(chunks.length < length){
				chunks.push(val);
			}
			if( (chunks.length == length && length != 0) ){
				chunkedArray.push(chunks);
				chunks = [];
			}
		});
		if(chunks.length){
			chunkedArray.push(chunks);
		}
		return chunkedArray;
	}
	$u.isEqual = function(object1,object2,NonEnumerable){
		
		NonEnumerable = NonEnumerable === false ? false : true;
		if(object1 === object2){ return true; }
		if(typeof object1 !== typeof object2) return false;
		if (object1 == null || object2 == null) return object1 === object2;
		var className = toString(object1);
		if(className ==='[object RegExp]' || className ==='[object String]') {
	       	return '' + object1 === '' + object2;
	    }else if(className === '[object Number]'){
	       	if (+object1 !== +object1) return +object2 !== +object1;
	      		return +object1 === 0 ? 1 / +object1 === 1 / object2 : +object1 === +object2;
	    }else if( className === '[object Date]' || className ==='[object Boolean]'){
	        return +object1 === +object2;
	    }else if(typeof(object1) == 'object' && typeof(object2) == 'object'){
			if(Array.isArray(object1) != Array.isArray(object2)){
				return false;
			}else if(Array.isArray(object1) && Array.isArray(object2)){
				return $u.checkArrayEquality(object1,object2,NonEnumerable);
			}else {
				return $u.checkObjectEquality(object1,object2,NonEnumerable);
			}
		}else if(typeof object1 != typeof object2 ){
			return false;
		}
		return true;
	}
	$u.checkArrayEquality = function(array1,array2,NonEnumerable){
		var flag = true;
		if(array1.length == array2.length){
			var len = array1.length;
			for( var i = 0 ; i < len ; i++ ){
				if(typeof(array1[i]) != typeof(array2[i])){
					return false;
				}
				else if(typeof(array1[i]) == 'object' ){
					flag = $u.isEqual(array1[i],array2[i],NonEnumerable);
				}
				else if(array1[i] !== array2[i]){
					return false;
				}
				if(flag == false){
					return flag;
				}
			}
		}
		else {
			return false;
		}
		return flag;
	}

	$u.checkObjectEquality = function( obj1 , obj2 ,NonEnumerable){
			
		if(NonEnumerable){
			var obj2_key = Object.getOwnPropertyNames(obj2);
			var keys = Object.getOwnPropertyNames(obj1);
		}else{
			var obj2_key = Object.keys(obj2);
			var keys = Object.keys(obj1);	
		}
		var  len = keys.length , flag = true;

		if(keys.length != obj2_key.length){
			return false;
		}
		for(var i =0 ; i < len ; i++){
			var key = keys[i];
			if(typeof(obj1[key]) != typeof(obj2[key]) ){
				return false;
			}
			else if(typeof(obj1[key]) == 'object'){
				flag = $u.isEqual(obj1[key] , obj2[key] , NonEnumerable);
			}
			else if( obj1[key] !== obj2[key] ){
				return false;
			}
			if(flag == false){
				return flag;
			}
		}
		
		return flag;
	}
	$u.invert = function(input){
		var keys = Object.keys(input);
		var newObj = {};
		keys.forEach(function(val){
			newObj[input[val]] = val;
		});
		return newObj;
	}
	$u.without = function(){
		
		var len = arguments.length , argument = [] ;
		for(var i = 1 ; i < len ; i++ ){
			argument.push(arguments[i]);
		}
		var first_arg = Form_array(arguments[0]);
		return $u.removeFromArray( first_arg || [] , argument);
	}
	$u.max = function(list,iteratee){

		list = list || [];
		var maxVal = list[0] , flag = false;
		iteratee = formatIteratee(iteratee);
		var iter_max = iteratee(maxVal);
		for(var index = 0;index < list.length ;index ++){
			var val = list[index];
			var iter_val = iteratee(val);
			if(  ( iter_val > iter_max ) || isNaN(iter_max) && !isNaN(iter_val) ){
				maxVal = val;
				iter_max = iteratee(maxVal);
				flag = true;
			}
		}
		if(!flag && isNaN(iter_max)){
			return -Infinity;
		}
		return maxVal;
	}
	$u.min = function(list,iteratee){
		list =list || [];
		var minVal = list[0] , flag = false;
		iteratee = formatIteratee(iteratee);
		var iter_min = iteratee(minVal);
		for(var index = 0; index < list.length ; index++){
			var val = list[index];
			var iter_val = iteratee(val);
			if(  ( iter_val < iter_min ) || isNaN(iter_min) && !isNaN(iter_val) ){
				minVal = val;
				iter_min = iteratee(minVal)
				flag = true;
			}
		}
		if(!flag && isNaN(iter_min)){
			return Infinity;
		}
		return minVal;
	}
	var partition = function( arr ,  low ,  high , iteratee ){ 
        var pivot = arr[high];  
        var i = (low-1); 
        for (var j=low; j<high; j++) 
        { 
            if (iteratee(arr[j] )< iteratee(pivot)) 
            { 
                i++; 
                var temp = arr[i]; 
                arr[i] = arr[j]; 
                arr[j] = temp; 
            } 
        } 
        var temp = arr[i+1]; 
        arr[i+1] = arr[high]; 
        arr[high] = temp; 
  
        return i+1; 
    } 
 
   	var sort = function( arr ,  low ,  high , iteratee ){ 
        if (low < high){ 
            var pi = partition( arr, low , high , iteratee ); 
            sort( arr , low , pi-1 , iteratee ); 
            sort( arr , pi+1 , high , iteratee ); 
        }
        return arr; 
    } 
	$u.sortBy = function(list,iteratee){
		iteratee = formatIteratee(iteratee);
		return sort( list , 0 , list.length-1 , iteratee );
	}
	var formatIteratee = function(iteratee){
		
		var type = typeof iteratee;
		if(iteratee == undefined || type == "function"){
			return iteratee||function(val){return val;};
		}else if(type  == "string" || type  == "number"){
			var key = iteratee ;
			iteratee = function(val){return val[key]};
		}else if(Array.isArray(iteratee)){
			var deep = iteratee;
			iteratee = function( val ){
				for(var index=0 ; index < deep.length && val != undefined ; index++){
					val = val[deep[index]];
				}
				return val;
			}
		}else {
			var compareobj = iteratee;
			iteratee = function( obj ){
				var keys =  Object.getOwnPropertyNames( compareobj );
				var key = keys[ 0 ]; 
				for(var i = 0 ; i < keys.length ;key = keys[ ++i ]){
					if( obj[ key ] !== compareobj[ key ] ){
						return false;
					}
				}
				return true;
			}
		}
		
		return iteratee;
	}
	$u.replace = function(accented){
		var str;
		/*var map = {
        	
        	'a' : 'ā|á|à|ã|â|À|Á|Ã|Â|Ā',
        	'c' : 'ç|Ç|ĉ|Ĉ|Ć|ć|Ĉ|ĉ|Ċ|ċ|Č|č',
        	'd' : 'Ḍ|Ḏ|ḍ|ḏ|Ď|ď|Đ|đ|Ḍ',
        	'e' : 'ē|é|è|ê|É|È|Ê|Ē',
        	'g' : 'Ĝ|ĝ|Ğ|ğ|Ġ|ġ|Ģ|ģ',
        	'h' : 'Ḥ|H̱|H̤|Ḫ|ḥ|ẖ|h̤|ḫ|Ĥ|ĥ|Ħ|ħ',
        	'i' : 'í|ì|î|ī|Í|Ì|Î|Ī',
        	'j' : 'ĵ|j̄|Ĵ|J̄',
        	'k' : 'ḵ|Ḵ',
        	'l' : 'l̥|ḻ|ḷ|L̥|Ḻ|Ḷ| l̥̄|  L̥̄',
        	'm' : 'ṃ|ṁ|m̐|m̆|Ṃ|Ṁ|M̐|M̆',
        	'n' : 'Ñ|Ṇ|Ṅ|Ṉ|N̆|ñ|ṇ|ṅ|ṉ|n̆',
        	'o' : 'ó|ò|ô|ö|õ|ō|Ö|Ō|Ó|Ò|Ô|Õ',
  			'r' : 'Ṛ|Ṟ|R̥| R̥̄|R̆|ṛ|ṟ|r̥|  r̥̄|r̆',
  			's' : 'Ś|Ṣ|Ṣ|S̤|S̱|§|ś|ṣ|s̤|s̱|§',
  			't' : 'ṭ|ṯ|Ṭ|Ṯ',
         	'u' : 'ú|ù|û|ü|ū|Ú|Ù|Û|Ü|Ū',
        	'y' : 'ý|ÿ|Ý',
        	'z' : 'ž|ż|ẓ|ẕ|ź|Ž|Ż|Ẓ|Ẕ|Ź',
        	'kh': 'k͟h|K͟H',
        	'ae' : 'Æ|æ'
		};
    	for (var pattern in map) {
        	accented = accented.replace( new RegExp( map[pattern] , 'gi'), pattern);
    	};*/
    	str = accented.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
    	//str = str.replace(/"Æ"/g,"AE");
    	return str;
	}
	$u.highlight = function( string , search , callback ){
		var Reg = new RegExp( search , "gi");
		callback = generatecallback( callback ); 
		string = string.replace(Reg,function(str,pos){
			var highlight = string.slice(pos,pos+search.length);
			return callback(highlight);
		});
		return string;
	}
	
	var generatecallback = function( callback ){

		if(typeof callback === "string" ){
			var tag_name = callback;
			callback = function(str){
				return "<"+tag_name+">" + str + "</" + tag_name + ">"; 
			}
		}
		callback = callback ||  function(str){
				return "<span>" + str + "</span>"; 
			};
		return callback;
	}
	$u.mixin($u);
	window.$u = $u;
})() 


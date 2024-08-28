;( function(){
	if( window.lyteDomObj ){
		function CanvasPool() {
			var canvases = [];
			return {
	    	
	        pop: function pop() {
	          if (this.length === 0) {
	            canvases.push(document.createElement('canvas'));
	          }
	    
	          return canvases.pop();
	        },
	        
	        get length() {
	          return canvases.length;
	        },

	        release: function release(canvas) {
	          var context = canvas.getContext('2d');
	          context.clearRect(0, 0, canvas.width, canvas.height);
	          canvases.push(canvas);
	        },

	        clear: function clear() {
	          canvases.splice(0, canvases.length);
	        },

	        get elements() {
	          return canvases;
	        }
	    
	      };
	    }
	    var shared = CanvasPool();
	    var canvasPool = (shared);

		function lyteWatermark(object, promise){
			var data = object ? object : {};
			var positions = ["atPos","lowerRight","upperRight","lowerLeft","upperLeft","center","custom"];
			var styles = ["image","text"];

			data.target = data.target;
			data.watermark = data.watermark;
			data.style = data.style && styles.indexOf(data.style) !== -1 ? data.style : "text";
			data.position = data.position && positions.indexOf(data.position) !== -1 ? data.position : "lowerRight";
			data.alpha = data.alpha && data.alpha >= 0 && data.alpha <= 1 ? data.alpha : 1;
			data.font = data.font ? data.font : "20px Josefin Slab";
			data.fillStyle = data.fillStyle ? data.fillStyle : "#fff";
			data.size = data.size;
			data.init = data.init ? data.init : function init() {};
			data.initialized = data.initialized;
			data.type = "image/png";
			data.encoderOptions = 0.92;
			if(data.position == "atPos"){
				data.posX = typeof data.posX === "function" ? data.posX : returnFnRef(data.posX);
				data.posY = typeof data.posY === "function" ? data.posY : returnFnRef(data.posY);
			}
			data.onLoad = data.onLoad;
			data.onComplete = data.onComplete;
			var promise = this.promise = promise !== undefined ? promise : null;
			
			this.promise || (promise = this.promise = loadImages(getImageArray(data), data.init));

			if(!data.initialized){
				data.initialized = true;
				if(data.position === "custom"){
					if(!data.onLoad){
						// console.error("For custom style you need to provide onLoad function to position the watermark");
						// this.promise = "ERROR ! onLoad not provided for custom position.";
						throw new Error("ERROR ! onLoad not provided for custom position.");
						// return ;
					}
					promise = this.promise = afterImageLoad(data.onLoad)
				}
				else if(data.style == "image"){
					if(data.position == "lowerRight"){
						promise = this.promise = afterImageLoad(lowerRight(data.alpha));
					}
					else if(data.position == "upperRight"){
						promise = this.promise = afterImageLoad(upperRight(data.alpha));
					}
					else if(data.position == "lowerLeft"){
						promise = this.promise = afterImageLoad(lowerLeft(data.alpha));
					}
					else if(data.position == "upperLeft"){
						promise = this.promise = afterImageLoad(upperLeft(data.alpha));
					}
					else if(data.position == "center"){
						promise = this.promise = afterImageLoad(center(data.alpha));
					}
					else if(data.position == "atPos"){
						promise = this.promise = afterImageLoad(atPos(data.posX, data.posY, data.alpha));
					}
				}
				else if(data.style == "text"){
					if(data.position == "lowerRight"){
						promise = this.promise = afterImageLoad(text_lowerRight(data.watermark, data.font, data.fillStyle, data.alpha, data.size));
					}
					else if(data.position == "upperRight"){
						promise = this.promise = afterImageLoad(text_upperRight(data.watermark, data.font, data.fillStyle, data.alpha, data.size));
					}
					else if(data.position == "lowerLeft"){
						promise = this.promise = afterImageLoad(text_lowerLeft(data.watermark, data.font, data.fillStyle, data.alpha, data.size));
					}
					else if(data.position == "upperLeft"){
						promise = this.promise = afterImageLoad(text_upperLeft(data.watermark, data.font, data.fillStyle, data.alpha, data.size));
					}
					else if(data.position == "center"){
						promise = this.promise = afterImageLoad(text_center(data.watermark, data.font, data.fillStyle, data.alpha, data.size));
					}
					else if(data.position == "atPos"){
						promise = this.promise = afterImageLoad(text_atPos(data.posX, data.posY, data.watermark, data.font, data.fillStyle, data.alpha));
					}
				}
				if(data.onComplete){
					promise = this.promise = addResolve();
				}
			}

			function afterImageLoad(draw) {
			    return dataUrl(draw).then(createImage);
			}

			function dataUrl(draw) {
			    var promise_obj = $L.watermark(data, promise).then(function (images) {
			        return mapToCanvas(images, canvasPool);
			    }).then(function (canvases) {
			        return addStyleToResult(draw, canvases);
			    }).then(function (result) {
			        return release(result, canvasPool, {
			          type: data.type,
			          encoderOptions: data.encoderOptions
			        });
			    });
			    return $L.watermark(data, promise_obj);
			}

			function identity(x) {
				return x;
			}

			function getTypeOf(obj) { 
				if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { 
				    getTypeOf = function getTypeOf(obj) { return typeof obj; }; 
				} else { 
				    getTypeOf = function getTypeOf(obj) { 
					    return obj && 
					    typeof Symbol === "function" && 
					    obj.constructor === Symbol && 
					    obj !== Symbol.prototype ? "symbol" : typeof obj; 
				    }; 
				} return getTypeOf(obj); 
			}

			function getLoader(resource) {
				var type = getTypeOf(resource);
				if (type === 'string') {
    				return loadUrl;
				}
				if (resource instanceof Image) {
    				return identity;
				}
				// return loadFile;
			}

			function loadImages(imgArray, init) {
				var promises = [];

				for (var i = 0; i < imgArray.length; i++) {
				    var img = imgArray[i];
				    var loader = getLoader(img);
				    var promise = loader(img, init);
				    promises.push(promise);
				}

				return Promise.all(promises);
			}

			function loadUrl(url, init) {
				var img = new Image();
				typeof init === 'function' && init(img);
				return new Promise(function (resolve) {
				    img.onload = function () {
				    	return resolve(img);
				    };
				    img.src = url;
				});
			}

			function createImage(url, onload) {
				var img = new Image();

				if (typeof onload === 'function') {
    				img.onload = onload;
				}
				img.src = url;
				return img;
			}

			function mapToCanvas(images, pool) {
				return images.map(function (img) {
					var canvas = pool.pop();
					var ctx = canvas.getContext('2d');
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img, 0, 0);
					return canvas;
				});
			}
			function canvasDataUrl(canvas, parameters) {
				var parameters = parameters || {
				    type: 'image/png',
				    encoderOptions: 0.92
				};
				return canvas.toDataURL(parameters.type, parameters.encoderOptions);
			}
			function addStyleToResult(draw, sources) {
				var canvas = draw.apply(null, sources);
				return {
				    canvas: canvas,
				    sources: sources
				};
			}

		    function release(result, pool, parameters) {
				var canvas = result.canvas,
			    	sources = result.sources;
				var dataURL = canvasDataUrl(canvas, parameters);
				sources.forEach(pool.release);
				return dataURL;
			}

			function atPos(xFn, yFn, alpha) {
				// alpha || (alpha = 1.0);
				return function (target, watermark) {
				    var context = target.getContext('2d');
				    context.save();
				    context.globalAlpha = alpha;
				    context.drawImage(watermark, xFn(target, watermark), yFn(target, watermark));
				    context.restore();
				    return target;
				};
			}
			function lowerRight(alpha) {
				return atPos(function (target, mark) {
				    return target.width - (mark.width + 10);
				}, function (target, mark) {
				    return target.height - (mark.height + 10);
				}, alpha);
			}
			function upperRight(alpha) {
				return atPos(function (target, mark) {
				    return target.width - (mark.width + 10);
				}, function (target, mark) {
				    return 10;
				}, alpha);
			}

			function lowerLeft(alpha) {
				return atPos(function (target, mark) {
				    return 10;
				}, function (target, mark) {
				    return target.height - (mark.height + 10);
				}, alpha);
			}

			function upperLeft(alpha) {
				return atPos(function (target, mark) {
				    return 10;
				}, function (target, mark) {
				    return 10;
				}, alpha);
			}

			function center(alpha) {
				return atPos(function (target, mark) {
				    return (target.width - mark.width) / 2;
				}, function (target, mark) {
				    return (target.height - mark.height) / 2;
				}, alpha);
			}

			function text_atPos(xFn, yFn, text, font, fillStyle, alpha) {
				return function (target) {
				    var context = target.getContext('2d');
				    context.save();
				    context.globalAlpha = alpha;
				    context.fillStyle = fillStyle;
				    context.font = font;
				    var metrics = context.measureText(text);
				    context.fillText(text, xFn(target, metrics, context), yFn(target, metrics, context));
				    context.restore();
				    return target;
				};
			}

			function text_lowerRight(text, font, fillStyle, alpha, size) {
				return text_atPos(function (target, metrics) {
				    return target.width - (metrics.width + 10);
				}, function (target) {
				    return size || target.height - 10;
				}, text, font, fillStyle, alpha);
			}

			function text_lowerLeft(text, font, fillStyle, alpha, size) {
				return text_atPos(function () {
				    return 10;
				}, function (target) {
				    return size || target.height - 10;
				}, text, font, fillStyle, alpha);
			}

			function text_upperRight(text, font, fillStyle, alpha, size) {
				return text_atPos(function (target, metrics) {
				    return target.width - (metrics.width + 10);
				}, function () {
				    return size || 20;
				}, text, font, fillStyle, alpha);
			}

			function text_upperLeft(text, font, fillStyle, alpha, size) {
				return text_atPos(function () {
				    return 10;
				}, function () {
				    return size || 20;
				}, text, font, fillStyle, alpha);
			}

			function text_center(text, font, fillStyle, alpha, size) {
				return text_atPos(function (target, metrics, ctx) {
				    ctx.textAlign = 'center';
				    return target.width / 2;
				}, function (target, metrics, ctx) {
				    ctx.textBaseline = 'middle';
				    return target.height / 2;
				}, text, font, fillStyle, alpha);
			}

			function returnFnRef(val) {
				return function(){
					return val || 40;
				}
			}

			function getImageArray(data){
				var images = Array.of(data.target);
				if(data.style == "image"){
					images.push(data.watermark);
				}
				return images;
			}

			function addResolve(){
				return $L.watermark(data, promise).then(data.onComplete);
			}
		}

		lyteWatermark.prototype = {
			load: function load(resources, init) {
		      var promise = this.then(function (resource) {
		        resources.target = resource;
		        resources.initialized = false;
		        return $L.watermark(resources);
		      });
		      resources.initialized = true;
		      return $L.watermark(resources, promise);
		    },

		    then: function then() {
		      for (var len = arguments.length, funcs = new Array(len), key = 0; key < len; key++) {
		        funcs[key] = arguments[key];
		      }

		      return this.promise.then.apply(this.promise, funcs);
		    }
		}

		$L.watermark = function(arg, promise){
			if(typeof arg === "string" && arg === "destroy"){
				return canvasPool.clear();
			}
			return new lyteWatermark(arg, promise);
		}

		$L.watermark.lyteWatermark = lyteWatermark;
	}
} )( window );

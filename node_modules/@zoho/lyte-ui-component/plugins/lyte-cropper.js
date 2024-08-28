;(function(){

  if(lyteDomObj){

    lyteDomObj.prototype.cropper = function(aRD){

      if( (aRD === "destroy") || (aRD === "Destroy")){

        var userImage = this[0];
        var userImageParent = userImage.parentElement
        var cropperWrapperDiv = $L(userImageParent).find('.lyteCropArea')[0];

        userImageParent.removeChild(cropperWrapperDiv);
        $L(userImage).data('cropper' , {})
        userImage.style.display = "block";

      } else {
        if(aRD){
          if(!aRD.type){
            aRD.type = 'default'
          }
        }
        if(aRD.type === 'default'){

                        /*
                          * getBoundingClientRect function
                        */
                        function getBCR(elem){
                          return elem.getBoundingClientRect();
                        }

                        /*
                          * Cropper global variables
                        */

                        // Parent image variables

                        var imageTag = this[0],imageData,naturalAR = 1,cropperDiv = imageTag.parentElement,aspectRatio = 'n:n',aspectDiff = 1,imageType,aR = aRD,initialRotateAngle;
                        var useExif = false;

                        if(aRD){
                          if(aRD.useExif){
                            useExif = aRD.useExif;
                          }
                        }

                        var beforeRender = function(){};
                        var afterRender = function(){};

                        if(aRD){
                          if(aRD.beforeRender){
                            beforeRender = aRD.beforeRender;
                          }
                          if(aRD.afterRender){
                            afterRender = aRD.afterRender;
                          }
                        }


                        var exifRotate=0,gotRotateData = false,exifRotateY = 0;
                        var imageOrientation = '';


                        function getImageExif(){
                          if($L.exif){
                            $L.exif({
                                target : imageTag,
                                getData : function(obj){
                    							imageTag = obj.target;
                    							if(getComputedStyle(imageTag).imageOrientation !== "from-image"){
                    								var rValue = obj.exifdata.Orientation;
                    								switch(rValue) {
                                      case 1 :
                                        exifRotate = 0;
                    										break;
                    									case 2 :
                                        exifRotate = 0;
                                        exifRotateY = 180;
                    										break;
                    									case 3 :
                                        exifRotate = 180;
                    										break;
                    									case 4 :
                                        exifRotate = 180;
                                        exifRotateY = 180;
                    										break;
                    									case 5 :
                                        exifRotate = 270;
                                        exifRotateY = 180;
                    										break;
                    									case 6 :
                                        exifRotate = 90;
                    										break;
                    									case 7 :
                                        exifRotate = 90;
                                        exifRotateY = 180;
                    										break;
                    									case 8 :
                                        exifRotate = 270;
                                        break;
                    						        }
                                        beforeRender(obj.exifdata.Orientation);
                                        gotRotateData = true;
                                        if(gotRotateData){
                                          loadCropper();
                                          if($L(imageTag).data('cropper')){
                                            initialRotateAngle = $L(imageTag).data('cropper').angle;
                                            exifRotateY = $L(imageTag).data('cropper').exifAngle;
                                          } else {
                                            initialRotateAngle = exifRotate;
                                          }
                                          imageTag.style.display = "none";
                                          constructor();
                                          afterRender();
                                        }
                    							}
                    						}
                            })
                          }
                        }






                        // if($L(imageTag).data('cropper')){
                        //   initialRotateAngle = $L(imageTag).data('cropper').angle;
                        // } else {
                        //   if(aRD.angle){
                        //     initialRotateAngle = aRD.angle;
                        //   } else {
                        //     initialRotateAngle = 0;
                        //   }
                        //
                        // }

                        if(!aR) {

                          aR = {
                            'aspectRatio' : 'n:n'
                          }

                        }

                        // Cropper variables

                        var cropArea , box , fixedDiv , opacityDiv , cropper , divImage , displayArea , displayImageDiv,topEdge , bottomEdge , leftEdge , rightEdge , topRightCorner , bottomRightCorner , topLeftCorner , bottomLeftCorner,mainImage , fixedImage , divImageImg , displayImage,cropVerGrid1 , cropVerGrid2 , cropVerGrid3 , cropHorGrid1 , cropHorGrid2 , cropHorGrid3,cropperParent,modalDets,topSpan , bottomSpan , leftSpan , rightSpan,cropData = {},cropStart = function(){},cropDrag = function(){} , onSet = function(){} , cropEnd = function(){};

                        // Cropper Dimension variables

                        var leastHeight , leastWidth , maxHeight , maxWidth;


                        // imageData = getBCR(imageTag);
                        // imageTag.style.display = "none";
                        // imageTag.addEventListener('load' , loadCropper);

                        /*
                          * Re create cropper
                        */


                        if(cropperDiv.querySelectorAll('.lyteCropArea').length !==0 ){
                          var element = cropperDiv.querySelectorAll('.lyteCropArea')[0];
                          exifRotateY = $L(imageTag).data('cropper').exifAngle;
                          if($L(imageTag).data('cropper')){
                            initialRotateAngle = $L(imageTag).data('cropper').angle;
                            exifRotateY = $L(imageTag).data('cropper').exifAngle;
                          } else {
                            initialRotateAngle = exifRotate;
                          }
                          cropperDiv.removeChild(element);
                          imageTag.style.display = "block";
                          imageData = getBCR(imageTag);
                        }


                        function loadCropper(){
                          if((imageTag.complete)&&(cropperDiv.querySelectorAll('.lyteCropArea').length ===0)){
                            imageData = getBCR(imageTag);
                            imageTag.style.display = "none";
                          }
                          imageTag.removeEventListener('load' , loadCropper);
                        }


                        /*
                          * Cropper element Creation
                        */

                        // Creating cropper elements

                        function createCropperElements(){

                          cropArea = document.createElement("DIV");
                          box = document.createElement("DIV");
                          fixedDiv = document.createElement("DIV");
                          opacityDiv = document.createElement("DIV");
                          divImage = document.createElement("DIV")
                          cropper = document.createElement("DIV");
                          topEdge = document.createElement("DIV");
                          bottomEdge = document.createElement("DIV");
                          leftEdge = document.createElement("DIV");
                          rightEdge = document.createElement("DIV");
                          topRightCorner = document.createElement("DIV");
                          topLeftCorner = document.createElement("DIV");
                          bottomRightCorner = document.createElement("DIV");
                          bottomLeftCorner = document.createElement("DIV");
                          cropVerGrid1 = document.createElement("SPAN");
                          cropVerGrid2 = document.createElement("SPAN");
                          cropHorGrid1 = document.createElement("SPAN");
                          cropHorGrid2 = document.createElement("SPAN");
                          topSpan = document.createElement("SPAN");
                          bottomSpan = document.createElement("SPAN");
                          leftSpan = document.createElement("SPAN");
                          rightSpan = document.createElement("SPAN");
                          mainImage = document.createElement("IMG")
                          fixedImage = document.createElement("IMG")
                          divImageImg = document.createElement("IMG");

                        }

                        // Appending cropper elements to dom

                        function appendCropperElements(){

                          createCropperElements();

                          cropperParent = imageTag.parentElement;

                          cropperParent.appendChild(cropArea);
                          cropArea.appendChild(box);
                          box.appendChild(fixedDiv);
                          fixedDiv.appendChild(fixedImage);
                          box.appendChild(opacityDiv);
                          box.appendChild(cropper);
                          cropper.appendChild(topEdge);
                          topEdge.appendChild(topSpan);
                          cropper.appendChild(bottomEdge);
                          bottomEdge.appendChild(bottomSpan)
                          cropper.appendChild(leftEdge);
                          leftEdge.appendChild(leftSpan)
                          cropper.appendChild(rightEdge);
                          rightEdge.appendChild(rightSpan);
                          cropper.appendChild(topRightCorner);
                          cropper.appendChild(topLeftCorner);
                          cropper.appendChild(bottomLeftCorner);
                          cropper.appendChild(bottomRightCorner);
                          cropper.appendChild(cropVerGrid1);
                          cropper.appendChild(cropVerGrid2);
                          cropper.appendChild(cropHorGrid1);
                          cropper.appendChild(cropHorGrid2);
                          cropper.appendChild(divImage);
                          divImage.appendChild(divImageImg);

                        }

                        // Setting class for cropper elements

                        function setClassAttribute(){

                          appendCropperElements();

                          cropArea.setAttribute("class" , "lyteCropArea");
                          mainImage.setAttribute("class" , "lyteCropMainImage");
                          box.setAttribute("class" , "lyteCropBox");
                          fixedDiv.setAttribute("class" , "lyteCropFixedDiv");
                          fixedImage.setAttribute("class" , "lyteCropFixedImage");
                          opacityDiv.setAttribute("class" , "lyteCropOpacityDiv");
                          cropper.setAttribute("class" , "lyteCropCropper");
                          cropVerGrid1.setAttribute("class" , "lytecropVerGrid1");
                          cropVerGrid2.setAttribute("class" , "lytecropVerGrid2");
                          cropHorGrid1.setAttribute("class" , "lytecropHorGrid1");
                          cropHorGrid2.setAttribute("class" , "lytecropHorGrid2");
                          topEdge.setAttribute("class" , "lyteCropTopEdge");
                          topSpan.setAttribute("class" , "lyteCropTopSpan");
                          bottomEdge.setAttribute("class" , "lyteCropBottomEdge");
                          bottomSpan.setAttribute("class" , "lyteCropBottomSpan");
                          leftEdge.setAttribute("class" , "lyteCropLeftEdge");
                          leftSpan.setAttribute("class" , "lyteCropLeftSpan");
                          rightEdge.setAttribute("class" , "lyteCropRightEdge");
                          rightSpan.setAttribute("class" , "lyteCropRightSpan");
                          topRightCorner.setAttribute("class" , "lyteCropTopRightCorner");
                          topLeftCorner.setAttribute("class" , "lyteCropTopLeftCorner");
                          bottomRightCorner.setAttribute("class" , "lyteCropBottomRightCorner");
                          bottomLeftCorner.setAttribute("class" , "lyteCropBottomLeftCorner");
                          divImage.setAttribute("class" , "lyteCropDivImage");
                          divImageImg.setAttribute("class" , "lyteCropDivImageImg");

                        }


                        /*
                          * Constructing cropper and assigning global values
                        */

                        function constructor(){

                          if(aR){

                            aspectRatio = aR.aspectRatio;

                          }

                          if(aR.cropStart){
                              cropStart = aR.cropStart;
                          }
                          if(aR.cropDrag){
                              cropDrag = aR.cropDrag;
                          }
                          if(aR.onSet){
                              onSet = aR.onSet;
                          }
                          if(aR.cropEnd){
                              cropEnd = aR.cropEnd;
                          }

                          switch (aspectRatio) {
                            case 'n:n': aspectDiff = undefined; break;
                            case '1:1': aspectDiff = 1/1; break;
                            case '2:3': aspectDiff = 2/3; break;
                            case '3:2': aspectDiff = 3/2; break;
                            case '4:3': aspectDiff = 4/3; break;
                            case '3:4': aspectDiff = 3/4; break;
                            case '16:9': aspectDiff = 16/9; break;
                            case '9:16': aspectDiff = 9/16; break;
                          }

                          naturalAR = imageTag.naturalWidth / imageTag.naturalHeight;

                          if(imageTag.naturalWidth > imageTag.naturalHeight){
                            imageType = 'landscape';
                          } else if(imageTag.naturalWidth <= imageTag.naturalHeight){
                            imageType = 'portrait';
                          }

                          setClassAttribute();

                          setCropperValues();

                          setMinAndMaxDim();

                          setCropperData();

                        }

                        /*
                          * Setting up cropper
                        */

                        // Setting least and max hwight and width

                        function setMinAndMaxDim(){

                          switch (aspectRatio) {
                            case 'n:n': getMinDim(1);getMaxDim(1); break;
                            case '1:1': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                            case '2:3': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                            case '3:2': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                            case '4:3': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                            case '3:4': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                            case '16:9': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                            case '9:16': getMinDim(aspectDiff);getMaxDim(aspectDiff); break;
                          }

                        }

                        function getMinDim(diff){

                            if(aR.minSize){
                              leastWidth = aR.minSize;
                              leastHeight = aR.minSize / diff;
                            } else {
                              leastWidth = 15;
                              leastHeight = 15 / diff;
                            }


                        }

                        function getMaxDim(diff){

                          var fixedImageData = getBCR(fixedImage);

                          if(imageType === 'landscape'){

                            if(aR.maxSize){
                                if(aR.maxSize > fixedImageData.width){
                                  maxHeight = fixedImageData.height;
                                  maxWidth = fixedImageData.height * diff;
                                  if(aspectRatio === "n:n"){
                                    maxHeight = fixedImageData.height;
                                    maxWidth = fixedImageData.width;
                                  }
                                } else {
                                  maxWidth = aR.maxSize;
                                  maxHeight = aR.maxSize / diff;
                                  if(aspectRatio === "n:n"){
                                    maxHeight = aR.maxSize;
                                    maxWidth = aR.maxSize;
                                  }
                                }
                            } else {
                              maxHeight = fixedImageData.height;
                              maxWidth = fixedImageData.height * diff;
                              if(aspectRatio === "n:n"){
                                maxHeight = fixedImageData.height;
                                maxWidth = fixedImageData.width;
                              }
                            }

                          } else if(imageType === 'portrait'){

                            if(aR.maxSize){
                                if(aR.maxSize > fixedImageData.height){
                                  maxHeight = fixedImageData.width / diff;
                                  maxWidth = fixedImageData.width;
                                  if(aspectRatio === "n:n"){
                                    maxHeight = fixedImageData.height;
                                    maxWidth = fixedImageData.width;
                                  }
                                } else {
                                  maxWidth = aR.maxSize * diff;
                                  maxHeight = aR.maxSize;
                                  if(aspectRatio === "n:n"){
                                    maxHeight = aR.maxSize;
                                    maxWidth = aR.maxSize;
                                  }
                                }
                            } else {
                              maxHeight = fixedImageData.width / diff;
                              maxWidth = fixedImageData.width;
                              if(aspectRatio === "n:n"){
                                maxHeight = fixedImageData.height;
                                maxWidth = fixedImageData.width;
                              }
                            }
                          }

                        }

                        // Initial cropper values

                        function setInitialValues(){

                          var initialValue = {};


                          fixedImage.src = mainImage.src = divImageImg.src = imageTag.src;

                          initialValue.cropperWidth = getInitialWidth(aspectDiff);
                          initialValue.cropperHeight = getInitialHeight(aspectDiff);

                          return initialValue;

                        }

                        function getInitialWidth(diff){

                          var initialWidth;

                          if(aR.selection){

                            if(aR.selection.size){

                              initialWidth = parseFloat(aR.selection.size);

                              if(aR.maxSize){
                                if(parseFloat(aR.maxSize) < parseFloat(aR.selection.size)){
                                  initialWidth = parseFloat(aR.maxSize);
                                }
                              }
                              if(aR.minSize){
                                if(parseFloat(aR.minSize) > parseFloat(aR.selection.size)){
                                  initialWidth = parseFloat(aR.minSize);
                                }

                              }

                            } else {

                              initialValue = widthHeightCal().width;

                            }

                          } else {

                            if(aspectRatio === 'n:n'){
                              initialWidth = getBCR(fixedImage).width;
                            } else {
                              initialWidth = widthHeightCal().width;
                            }

                          }

                          return initialWidth;

                        }

                        function getInitialHeight(diff){

                          if(aspectRatio === 'n:n'){
                            diff = 1;
                          }

                          var initialHeight;

                          if(aR.selection){



                            if(aR.selection.size){

                              initialHeight = parseFloat(aR.selection.size) / diff;

                              if(aR.maxSize){
                                if(parseFloat(aR.maxSize) < parseFloat(aR.selection.size)){
                                  initialHeight = parseFloat(aR.maxSize) / diff;
                                }
                              }
                              if(aR.minSize){
                                if(parseFloat(aR.minSize) > parseFloat(aR.selection.size)){
                                  initialHeight = parseFloat(aR.minSize) / diff;
                                }
                              }

                            } else {

                              initialHeight = widthHeightCal().height;

                            }


                          } else {

                            if(aspectRatio === "n:n"){
                              initialHeight = getBCR(fixedImage).height;
                            } else {
                              initialHeight = widthHeightCal().height;
                            }

                          }

                          return initialHeight;

                        }

                        function widthHeightCal(){

                          var value = {};

                          if(imageType === "landscape"){

                            value.width = getBCR(fixedImage).height * aspectDiff
                            value.height = getBCR(fixedImage).height;

                          } else {

                            value.width = getBCR(fixedImage).width;
                            value.height = getBCR(fixedImage).width / aspectDiff;

                          }

                          if(value.width > getBCR(fixedImage).width){

                            value.width = getBCR(fixedImage).width;
                            value.height = getBCR(fixedImage).width / aspectDiff;

                          }

                          if(value.height > getBCR(fixedImage).height){

                            value.height = getBCR(fixedImage).height;
                            value.width = getBCR(fixedImage).height * aspectDiff;

                          }

                          return value

                        }

                        function getImageValues(){
                          var value = {};
                          switch (imageType) {
                            case 'landscape':
                            value.imageWidth = getBCR(cropperParent).width;
                            value.imageHeight = getBCR(cropperParent).width / naturalAR;
                            break;
                            case 'portrait':
                            value.imageWidth = getBCR(cropperParent).height * naturalAR;
                            value.imageHeight = getBCR(cropperParent).height;
                            break;
                          }

                          return value;

                        }


                        function getImageXY(){

                          var value = {};

                          if(imageType === 'landscape'){
                            value.imageTop = (getBCR(cropperParent).height - getBCR(fixedImage).height)/2;
                            value.imageLeft = 0;
                          } else {
                            value.imageTop = 0;
                            if(_lyteUiUtils.getRTL()){
                              value.imageLeft = "-"+(getBCR(cropperParent).width - getBCR(fixedImage).width)/2;
                            }else {
                              value.imageLeft = (getBCR(cropperParent).width - getBCR(fixedImage).width)/2;
                            }
                          }

                          return value;

                        }

                        function getCropperXY(){

                          var value = {};

                          if(aR.selection){

                            if(aR.selection.top){
                              value.cropperTop = cropperMaxXY().top;
                            } else {
                              value.cropperTop = getDefaultTopLeft().cropperTop;
                            }
                            if(aR.selection.left){
                              value.cropperLeft = cropperMaxXY().left;
                            } else {
                              value.cropperLeft = getDefaultTopLeft().cropperLeft;
                            }


                          } else {
                            value.cropperLeft = getDefaultTopLeft().cropperLeft;
                            value.cropperTop = getDefaultTopLeft().cropperTop;
                          }

                          return value;

                        }


                        function cropperMaxXY(){

                          var value = {};

                          if((parseFloat(aR.selection.top)+getBCR(cropper).height) > getBCR(opacityDiv).bottom){
                            value.top = getBCR(opacityDiv).height - getBCR(cropper).height;
                          } else {
                            value.top = parseFloat(aR.selection.top);
                          }
                          if((parseFloat(aR.selection.left)+getBCR(cropper).width) > getBCR(opacityDiv).right){
                            value.left = getBCR(opacityDiv).width - getBCR(cropper).width;
                          } else {
                            value.left = parseFloat(aR.selection.left);
                          }

                          return value;

                        }

                        function getDefaultTopLeft(){

                          var value = {};


                          if(imageType === 'portrait'){
                            value.cropperTop = (getBCR(opacityDiv).height - getBCR(cropper).height)/2;
                            value.cropperLeft = (getBCR(fixedImage).width - getBCR(cropper).width)/2;
                          } else {
                            value.cropperTop = (getBCR(opacityDiv).height - getBCR(cropper).height)/2;
                            value.cropperLeft = (getBCR(fixedImage).width - getBCR(cropper).width)/2;
                          }

                          return value;

                        }

                        function setCropperValues(){

                          var initialImageData = getImageValues();

                          fixedImage.style.height = initialImageData.imageHeight + "px";
                          fixedImage.style.width = initialImageData.imageWidth + "px";

                          divImageImg.style.height = initialImageData.imageHeight + "px";
                          divImageImg.style.width = initialImageData.imageWidth + "px";

                          cropArea.style.height = getBCR(fixedImage).height + "px";
                          cropArea.style.width = getBCR(fixedImage).width + "px";

                          var initialImageXY = getImageXY()

                          cropArea.style.left = initialImageXY.imageLeft + "px";
                          cropArea.style.top = initialImageXY.imageTop + "px";

                          var initialCropperData = setInitialValues();

                          cropper.style.height = initialCropperData.cropperHeight + "px";
                          cropper.style.width = initialCropperData.cropperWidth + "px";

                          var initialCropperXY = getCropperXY();

                          cropper.style.top = initialCropperXY.cropperTop + "px";
                          cropper.style.left = initialCropperXY.cropperLeft + "px";

                          divImageImg.style.left = - initialCropperXY.cropperLeft + "px";
                          divImageImg.style.top = - initialCropperXY.cropperTop + "px";

                          box.style.overflow = "unset";


                          var angle;
                          if(initialRotateAngle===90 || initialRotateAngle === 270){
                            var cropperDim = getBCR(cropper);
                            var cropAreaDim = getBCR(cropArea);
                            var imageDim = getBCR(fixedImage);
                            angle = initialRotateAngle;
                            var prevAng = initialRotateAngle - 90;
                            if(angle){
                              prevAng = initialRotateAngle - 90;
                              angle = initialRotateAngle;
                              if(angle >= 360){
                                angle = 0;
                              }
                              fixedImage.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                              divImageImg.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                            } else {
                              var angle = 90;
                              fixedImage.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                              divImageImg.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                            }
                            aspectDiff = 1/aspectDiff;
                            if(imageType === "landscape"){
                              imageType = "portrait";
                            } else {
                              imageType = "landscape";
                            }
                            setMinAndMaxDim();
                            positionCropper(cropperDim , cropAreaDim , imageDim , angle , prevAng);
                            // setMinAndMaxDim();
                          }
                          if((initialRotateAngle===180)||(initialRotateAngle === 0)){
                            angle = initialRotateAngle;
                            if(angle===0){
                              prevAng = initialRotateAngle - 90;
                              angle = initialRotateAngle;
                              if(angle >= 360){
                                angle = 0;
                              }
                              fixedImage.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                              divImageImg.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                            } else {
                              // var angle = 90;
                              fixedImage.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                              divImageImg.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                            }
                          }

                          setCropperData();

                          cropper.addEventListener("mousedown" , cropImage);

                        }

                        if((getComputedStyle(imageTag).imageOrientation !== 'from-image')&&(useExif)){

                          getImageExif();

                        } else {
                          beforeRender();
                          loadCropper();
                          constructor();
                          afterRender();
                        }


                        function cropImage(event){

                          cropStart();

                          cropVerGrid1.style.opacity = cropVerGrid2.style.opacity = cropHorGrid1.style.opacity = cropHorGrid2.style.opacity = 1;

                          opacityDiv.style.opacity = "0.6";

                          event.preventDefault();

                          var todo;
                          if((event.target.className === "lyteCropDivImageImg")||(event.target.className === "lyteCropDivImage")){
                            todo = "parent";
                          } else {
                            todo = "child"
                          }


                          var topEdge           =  $L('.lyteCropTopEdge')[0],
                              rightEdge         =  $L('.lyteCropRightEdge')[0],
                              bottomEdge        =  $L('.lyteCropBottomEdge')[0],
                              leftEdge          =  $L('.lyteCropLeftEdge')[0],
                              topRightCorner    =  $L('.lyteCropTopRightCorner')[0],
                              bottomRightCorner =  $L('.lyteCropBottomRightCorner')[0],
                              bottomLeftCorner  =  $L('.lyteCropBottomLeftCorner')[0],
                              topLeftCorner     =  $L('.lyteCropTopLeftCorner')[0];


                          switch(todo){

                            case "parent" :

                              if((event.target.className === 'lyteCropDivImage')||(event.target.className === 'lyteCropDivImageImg')){

                                var cropperMoveData = getBCR(cropper),
                                    opacityDivMoveData = getBCR(opacityDiv),
                                    cropAreaMoveData = getBCR(cropArea),
                                    boxMoveData = getBCR(box),
                                    fixedImageMoveData = getBCR(fixedImage),
                                    previousClientX = event.clientX,
                                    previousClientY = event.clientY,
                                    finalLeft = opacityDivMoveData.left - cropAreaMoveData.left,
                                    finalRight = opacityDivMoveData.right - cropperMoveData.width - boxMoveData.left,
                                    finalTop = opacityDivMoveData.top - cropAreaMoveData.top,
                                    finalBottom = ((cropAreaMoveData.bottom - (cropAreaMoveData.bottom - opacityDivMoveData.bottom) - cropperMoveData.height)-(window.innerHeight - cropAreaMoveData.bottom));


                                function removeCropMoveEvent(){

                                  opacityDiv.style.opacity = "";
                                  cropVerGrid1.style.opacity = cropVerGrid2.style.opacity = cropHorGrid1.style.opacity = cropHorGrid2.style.opacity = 0;
                                  document.removeEventListener("mousemove" , moveCropper);
                                  document.removeEventListener("mouseup" , removeCropMoveEvent);
                                  document.removeEventListener("mousedown" , moveCropper);

                                  setCropperData();

                                  onSet();


                                }


                                function moveCropper(event){
                                  cropVerGrid1.style.opacity = cropVerGrid2.style.opacity = cropHorGrid1.style.opacity = cropHorGrid2.style.opacity = 1;

                                  event.preventDefault();

                                  var evX = event.clientX;
                                  var evY = event.clientY;

                                  if(((cropperMoveData.top+(evY-previousClientY) - cropAreaMoveData.top)+cropAreaMoveData.top)>opacityDivMoveData.top){
                                    cropper.style.top = (cropperMoveData.top+(evY-previousClientY) - cropAreaMoveData.top)+"px";
                                  } else {
                                    cropper.style.top = finalTop +"px";
                                  }
                                  if(((cropperMoveData.left+(evX-previousClientX) - cropAreaMoveData.left)+cropAreaMoveData.left)>opacityDivMoveData.left){
                                    cropper.style.left = ((cropperMoveData.left+(evX - previousClientX))-cropAreaMoveData.left) + "px";
                                  } else {
                                    cropper.style.left = finalLeft + "px";
                                  }
                                  if(!(((cropperMoveData.right+(evX-previousClientX) - cropAreaMoveData.right)+cropAreaMoveData.right)<opacityDivMoveData.right)){
                                    cropper.style.left = finalRight +"px";
                                  }
                                  if(!(((cropperMoveData.bottom+(evY-previousClientY) - cropAreaMoveData.bottom)+cropAreaMoveData.bottom)<opacityDivMoveData.bottom)){
                                    cropper.style.top = opacityDivMoveData.bottom - cropperMoveData.height - cropAreaMoveData.top + "px";
                                  }

                                  var fixedImageTransform = fixedImage.style.transform;
                                  fixedImage.style.transform = 'rotate(0deg)';
                                  divImageImg.style.left = (getBCR(fixedImage).left - getBCR(cropper).left)+"px";
                                  divImageImg.style.top = (getBCR(fixedImage).top - getBCR(cropper).top)+"px";
                                  fixedImage.style.transform = fixedImageTransform;

                                  setCropperData();

                                }


                                document.addEventListener("mousemove" , moveCropper);
                                document.addEventListener("mouseup" , removeCropMoveEvent);

                              }

                            break;


                            case "child" :

                            {
                              var cropperData = getBCR(cropper),
                                  cropperLeft = cropperData.left,
                                  cropperTop = cropperData.top,
                                  cropperWidth = cropperData.width,
                                  cropperHeight = cropperData.height,
                                  cropperRight = cropperData.right,
                                  cropperBottom = cropperData.bottom,
                                  opacityDivData = getBCR(opacityDiv),
                                  opacityDivTop = opacityDivData.top,
                                  opacityDivLeft = opacityDivData.left,
                                  opacityDivWidth = opacityDivData.width,
                                  opacityDivHeight = opacityDivData.height,
                                  opacityDivBottom = opacityDivData.bottom,
                                  opacityDivRight = opacityDivData.right,
                                  cropAreaData = getBCR(cropArea),
                                  cropAreaTop = cropAreaData.top,
                                  cropAreaLeft = cropAreaData.left,
                                  cropAreaWidth = cropAreaData.width,
                                  cropAreaHeight = cropAreaData.height,
                                  cropAreaRight = cropAreaData.right,
                                  cropAreaBottom = cropAreaData.bottom,
                                  boxData = getBCR(box),
                                  boxHeight = boxData.height,
                                  boxWidth = boxData.width,
                                  boxLeft = boxData.left,
                                  boxTop = boxData.top,
                                  fixedImageData = getBCR(fixedImage),
                                  fixedImageLeft = fixedImageData.left,
                                  fixedImageTop = fixedImageData.top,
                                  fixedImageWidth = fixedImageData.width,
                                  fixedImageheight = fixedImageData.height,
                                  previousClientX = event.clientX,
                                  previousClientY = event.clientY,
                                  midHeight       = (cropperData.top + (cropperData.height / 2)) - cropAreaData.top,
                                  midWidth        = (cropperData.left + (cropperData.width / 2)) - cropAreaData.left,
                                  finalLeft       = opacityDivData.left - cropAreaData.left,
                                  finalTop        = opacityDivData.top - cropAreaData.top,
                                  finalRight      = opacityDivData.right - cropperData.width - boxData.left,
                                  tempWidth ,
                                  tempHeight,
                                  todoC;
                              if (event.target.className === "") {
                                todoC = event.target.parentElement.className;
                              } else {
                                todoC = event.target.className;
                              }


                              function removeResizeEvent(){
                                opacityDiv.style.opacity = "";
                                cropVerGrid1.style.opacity = cropVerGrid2.style.opacity = cropHorGrid1.style.opacity = cropHorGrid2.style.opacity = 0;
                                document.removeEventListener("mousemove" , resizeCropper);
                                document.removeEventListener("mouseup" , removeResizeEvent);
                                setCropperData();

                                cropEnd();

                              }


                              function resizeCropper(event){

                                setCropperData();

                                var dragCrop = cropDrag();

                                if(dragCrop === false){
                                  return
                                }

                                var cropperNewTop , cropperNewLeft , cropperNewWidth , cropperNewHeight , cropperNewRight , cropperNewBottom,evX = event.clientX,evY = event.clientY,presentClientX = event.clientX,presentClientY = event.clientY,cropperDummyData = getBCR(cropper);

                                function upDCropperDD(){
                                  cropperDummyData = getBCR(cropper);
                                }

                                switch(todoC){

                                  case "lyteCropLeftEdge":


                                  upDCropperDD();

                                  cropperNewTop = 0; cropperNewLeft = 0; cropperNewWidth = 0; cropperNewHeight= 0;

                                  if (((cropperWidth - (evX - previousClientX))>=leastWidth)&&((cropperWidth - (evX - previousClientX))<=maxWidth)) {
                                    if(evX > opacityDivLeft){
                                      cropperNewWidth   = cropperWidth - (presentClientX - previousClientX) + "px";
                                      cropperNewHeight  = (cropperWidth - (presentClientX - previousClientX))/aspectDiff + "px";
                                      cropperNewTop     = ((cropperTop - cropAreaTop) + ((presentClientX - previousClientX)/aspectDiff)/2) + "px";
                                      cropperNewLeft    = ((cropperLeft - cropAreaLeft) + (evX - previousClientX))+ "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if(evX-6 <= opacityDivLeft){
                                      if((!(cropperDummyData.height >= opacityDivHeight))||(!(cropperDummyData.width >= opacityDivWidth))&&(cropperDummyData.top < opacityDivTop)){
                                        cropperNewTop = (opacityDivBottom - (((opacityDivWidth - (opacityDivRight - cropperRight))/aspectDiff) + (opacityDivBottom - (midHeight + ((opacityDivWidth - (opacityDivRight - cropperRight))/aspectDiff)/2)))) + "px";
                                        cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                        $L(cropper).css({'top' : cropperNewTop,'left' : cropperNewLeft})
                                      }
                                      cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                      cropperNewWidth = cropperRight - opacityDivLeft + "px";
                                      cropperNewHeight = (opacityDivWidth - (opacityDivRight - cropperRight))/aspectDiff + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight , 'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.bottom >= opacityDivBottom){
                                      cropperNewTop = opacityDivBottom - cropperDummyData.height - cropAreaTop + "px";
                                      $L(cropper).css({'top' : cropperNewTop})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.top <= opacityDivTop){
                                      cropperNewTop = opacityDivTop - cropAreaTop + "px";
                                      $L(cropper).css({'top' : cropperNewTop})
                                    }
                                    upDCropperDD();
                                    if((cropperDummyData.bottom >= opacityDivBottom)&&(cropperDummyData.top <= opacityDivTop)){
                                      cropperNewLeft = cropperRight - ((opacityDivBottom - opacityDivTop)*aspectDiff) - cropAreaLeft + "px";
                                      cropperNewWidth = (opacityDivBottom - opacityDivTop)*aspectDiff + "px";
                                      cropperNewHeight = opacityDivBottom - opacityDivTop + "px";
                                      cropperNewTop = opacityDivTop - cropAreaTop + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                    }

                                  }else if(((cropperWidth - (evX - previousClientX))<=leastWidth)){
                                    if(!(aspectRatio === "n:n")){
                                      cropperNewLeft    = (cropperRight - leastWidth) - cropAreaLeft + "px";
                                      cropperNewTop     = (midHeight - (leastHeight/2)) + "px";
                                      cropperNewWidth   = leastWidth +"px";
                                      cropperNewHeight  = leastHeight + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                    } else {
                                      cropperNewLeft    = (cropperRight - leastWidth) - cropAreaLeft + "px";
                                      cropperNewWidth   = leastWidth +"px";
                                      $L(cropper).css({'width' : cropperNewWidth,'left' : cropperNewLeft})
                                    }
                                  }else if(((cropperWidth - (evX+6 - previousClientX))>=maxWidth)){
                                    if(!(aspectRatio === "n:n")){
                                      var checkHeight = (cropperWidth - (presentClientX - previousClientX))/aspectDiff;
                                      var checkWidth = cropperWidth - (presentClientX - previousClientX);
                                      var checkLeft = ((cropperLeft - cropAreaLeft) + (evX - previousClientX));
                                      if(((checkWidth >= maxWidth)||(checkHeight >= maxHeight))&&((evX+6 <= opacityDivLeft)&&((cropperRight - opacityDivLeft)>=maxWidth))){
                                        cropperNewLeft    = (cropperRight - maxWidth) - cropAreaLeft + "px";
                                        upDCropperDD();
                                        // if(imageType === "landscape"){
                                          cropperNewTop     = (midHeight - (maxHeight/2));
                                          if(cropperNewTop < 0){
                                            cropperNewTop = 0 ;
                                          }
                                          if(cropperNewTop > (opacityDivBottom - maxHeight)-opacityDivTop){
                                            cropperNewTop = (opacityDivBottom - maxHeight)-opacityDivTop ;
                                          }
                                        // } else {
                                        //   cropperNewLeft     = 0 + "px";
                                        // }
                                        cropperNewWidth   = maxWidth +"px";
                                        cropperNewHeight  = maxHeight + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                      }
                                    } else {

                                      if(maxWidth!=fixedImageWidth){
                                        cropperNewLeft =  cropperRight - maxWidth - opacityDivLeft;
                                        cropperNewWidth   = maxWidth +"px";
                                      } else {
                                        cropperNewLeft = 0;
                                        cropperNewWidth   = cropperRight - opacityDivLeft +"px";
                                      }
                                      $L(cropper).css({'width' : cropperNewWidth,'left' : cropperNewLeft})
                                    }
                                  }
                                  break;

                                  case "lyteCropTopEdge":

                                  upDCropperDD();

                                  cropperNewTop = 0; cropperNewLeft = 0; cropperNewWidth = 0; cropperNewHeight= 0;

                                  if (((cropperHeight - (evY - previousClientY))>=leastHeight)&&((cropperHeight - (evY - previousClientY))<=maxHeight)) {
                                    if(evY > opacityDivTop+6){
                                      cropperNewWidth = (cropperHeight - (evY - previousClientY))*aspectDiff + "px";
                                      cropperNewHeight  = cropperHeight - (evY - previousClientY)+ "px";
                                      cropperNewLeft    = ((cropperLeft - cropAreaLeft) + ((evY - previousClientY)*aspectDiff)/2) + "px";
                                      cropperNewTop     = ((cropperTop - cropAreaTop) + (evY - previousClientY))+ "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if(evY-6 <= opacityDivTop){
                                      if((!(cropperDummyData.height >= opacityDivHeight))||(!(cropperDummyData.width >= opacityDivWidth))&&(cropperDummyData.left < opacityDivLeft)){
                                        cropperNewLeft = (opacityDivRight - (((cropperBottom - opacityDivTop)*aspectDiff) + (opacityDivRight-(midWidth+(((cropperBottom - opacityDivTop)*aspectDiff)/2))))) + "px";
                                        cropperNewTop = opacityDivTop - cropAreaTop + "px";
                                        $L(cropper).css({'top' : cropperNewTop,'left' : cropperNewLeft})
                                      }
                                      cropperNewWidth = (cropperBottom - opacityDivTop)*aspectDiff + "px";
                                      cropperNewHeight = cropperBottom - opacityDivTop + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.left <= opacityDivLeft){
                                      cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                      $L(cropper).css({'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.right >= opacityDivRight){
                                      cropperNewLeft = opacityDivRight - cropperDummyData.width - cropAreaLeft+ "px";
                                      $L(cropper).css({'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if((cropperDummyData.right >= opacityDivRight)&&(cropperDummyData.left <= opacityDivLeft)){
                                      cropperNewWidth = opacityDivRight - opacityDivLeft + "px";
                                      cropperNewHeight = (opacityDivRight - opacityDivLeft)/aspectDiff + "px";
                                      cropperNewTop = (cropperBottom - ((opacityDivRight - opacityDivLeft)/aspectDiff)) - cropAreaTop + "px";
                                      cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                    }
                                  }else if((cropperHeight - (evY - previousClientY))<=leastHeight) {
                                    if(!(aspectRatio === "n:n")){
                                      cropperNewTop     = (cropperBottom - leastHeight) - cropAreaTop + "px";
                                      cropperNewLeft    = (midWidth - (leastWidth/2)) + "px";
                                      cropperNewWidth   = leastWidth +"px";
                                      cropperNewHeight  = leastHeight + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                    } else {
                                      cropperNewTop     = (cropperBottom - leastHeight) - cropAreaTop + "px";
                                      cropperNewHeight  = leastHeight + "px";
                                      $L(cropper).css({'height' : cropperNewHeight,'top' : cropperNewTop})
                                    }
                                  }else if(((cropperHeight - (evY - previousClientY))>=maxHeight)){
                                    if(!(aspectRatio === "n:n")){
                                      var checkHeight = cropperHeight - (evY - previousClientY);
                                      var checkWidth = (cropperHeight - (evY - previousClientY))*aspectDiff;
                                      var checkTop = ((cropperTop - cropAreaTop) + (evY - previousClientY));
                                      if(((checkWidth >= maxWidth)||(checkHeight >= maxHeight))&&((evY-6 < opacityDivTop)&&((cropperBottom - opacityDivTop)>=maxHeight))){
                                        cropperNewTop    = (cropperBottom - maxHeight) - cropAreaTop + "px";
                                        upDCropperDD();
                                        // if(imageType === "landscape"){
                                          cropperNewLeft     = (midWidth - (maxWidth/2));
                                          if(cropperNewLeft < 0){
                                            cropperNewLeft = 0 ;
                                          }
                                          if(cropperNewLeft > (opacityDivRight - maxWidth)-opacityDivLeft){
                                            cropperNewLeft = (opacityDivRight - maxWidth)-opacityDivLeft ;
                                          }
                                        // } else {
                                        //   cropperNewLeft     = 0 + "px";
                                        // }
                                        cropperNewWidth   = maxWidth +"px";
                                        cropperNewHeight  = maxHeight + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                      }
                                    } else {

                                      if(maxHeight!=fixedImageheight){
                                        cropperNewTop =  cropperBottom - maxHeight - opacityDivTop;
                                        cropperNewHeight   = maxHeight +"px";
                                      } else {
                                        cropperNewTop = 0;
                                        cropperNewHeight   = cropperBottom - opacityDivTop +"px";
                                      }
                                      $L(cropper).css({'height' : cropperNewHeight,'top' : cropperNewTop})
                                    }
                                  }
                                  break;


                                  case "lyteCropRightEdge":
                                  upDCropperDD();

                                  cropperNewTop = 0; cropperNewRight = 0; cropperNewWidth = 0; cropperNewHeight= 0 , cropperNewLeft = 0;

                                  if(((cropperWidth + (presentClientX - previousClientX))>=leastWidth)&&((cropperWidth + (presentClientX - previousClientX))<=maxWidth)){
                                    if(presentClientX < opacityDivRight){
                                      cropperNewWidth   = cropperWidth + (presentClientX - previousClientX) + "px";
                                      cropperNewHeight  = (cropperWidth + (presentClientX - previousClientX))/aspectDiff + "px";
                                      cropperNewTop     = ((cropperTop - cropAreaTop) - ((presentClientX - previousClientX)/aspectDiff)/2) + "px";
                                      cropperNewRight   = ((cropperRight - cropAreaRight) - (presentClientX - previousClientX))+ "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'right' : cropperNewRight})
                                    }
                                    if(presentClientX >= opacityDivRight){
                                      cropperNewTop = midHeight - (((opacityDivRight - cropperLeft)/aspectDiff) / 2) + "px";
                                      cropperNewWidth = opacityDivRight - cropperLeft + "px";
                                      cropperNewHeight = (opacityDivRight - cropperLeft)/aspectDiff + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.bottom >= opacityDivBottom){
                                      cropperNewTop = opacityDivBottom - cropperDummyData.height - cropAreaTop + "px";
                                      $L(cropper).css({'top' : cropperNewTop})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.top <= opacityDivTop){
                                      cropperNewTop = opacityDivTop - cropAreaTop + "px";
                                      $L(cropper).css({'top' : cropperNewTop})
                                    }
                                    upDCropperDD();
                                    if((cropperDummyData.bottom >= opacityDivBottom)&&(cropperDummyData.top <= opacityDivTop)){
                                      cropperNewLeft = cropperLeft - cropAreaLeft + "px";
                                      cropperNewWidth = (opacityDivBottom - opacityDivTop)*aspectDiff + "px";
                                      cropperNewHeight = (opacityDivBottom - opacityDivTop) + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft})
                                    }
                                  }else if((cropperWidth + (presentClientX - previousClientX))<=leastWidth){
                                    if(!(aspectRatio === "n:n")){
                                      cropperNewTop     = (midHeight - (leastHeight/2)) + "px";
                                      cropperNewWidth   = leastWidth + "px";
                                      cropperNewHeight  = leastHeight + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                    } else {
                                      cropperNewWidth   = leastWidth + "px";
                                      $L(cropper).css({'width' : cropperNewWidth})
                                    }
                                  }else if(((cropperWidth + (evX - previousClientX))>=maxWidth)){
                                    if(!(aspectRatio === "n:n")){
                                      var checkHeight = (cropperWidth + (presentClientX - previousClientX))/aspectDiff;
                                      var checkWidth = cropperWidth + (presentClientX - previousClientX);
                                      if(((checkHeight >= maxHeight)||(checkWidth >= maxWidth))&&(cropperLeft <= (opacityDivRight - maxWidth))){
                                        // if(imageType === "portrait"){
                                          cropperNewTop     = (midHeight - (maxHeight/2));
                                          if(cropperNewTop < 0){
                                            cropperNewTop = 0 ;
                                          }
                                          if(cropperNewTop > (opacityDivBottom - maxHeight)-opacityDivTop){
                                            cropperNewTop = (opacityDivBottom - maxHeight)-opacityDivTop ;
                                          }
                                        // } else {
                                        //   cropperNewTop     = 0 + "px";
                                        // }
                                        cropperNewWidth   = maxWidth +"px";
                                        cropperNewHeight  = maxHeight + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                      }
                                    } else {
                                      if(maxWidth != fixedImageWidth){
                                        cropperNewWidth   = maxWidth +"px";
                                      } else {
                                        cropperNewWidth   = opacityDivRight - cropperLeft +"px";
                                      }
                                      $L(cropper).css({'width' : cropperNewWidth})
                                    }
                                  }
                                  break;

                                  case "lyteCropBottomEdge":
                                  upDCropperDD();

                                  cropperNewTop = 0; cropperNewRight = 0; cropperNewWidth = 0; cropperNewHeight= 0 , cropperNewLeft = 0;
                                  if(((cropperHeight + (evY - previousClientY))>=leastHeight)&&((cropperHeight + (evY - previousClientY))<=maxHeight)){
                                    if(evY < opacityDivBottom){
                                      cropperNewWidth   = (cropperHeight + (presentClientY - previousClientY))*aspectDiff + "px";
                                      cropperNewHeight  = cropperHeight + (evY - previousClientY)+ "px";
                                      cropperNewLeft    = ((cropperLeft - cropAreaLeft) - ((presentClientY - previousClientY)*aspectDiff)/2) + "px";
                                      cropperNewBottom  = ((cropperBottom - cropAreaBottom) - (presentClientY - previousClientY))+ "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft,'bottom' : cropperNewBottom})
                                    }
                                    if(evY >= opacityDivBottom){
                                      cropperNewLeft = midWidth - (((opacityDivBottom - cropperTop)*aspectDiff) / 2) + "px";
                                      cropperNewWidth = (opacityDivBottom - cropperTop)*aspectDiff + "px";
                                      cropperNewHeight = opacityDivBottom - cropperTop + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.left <= opacityDivLeft){
                                      cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                      $L(cropper).css({'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if(cropperDummyData.right >= opacityDivRight){
                                      cropperNewLeft = opacityDivRight - cropperDummyData.width - cropAreaLeft+ "px";
                                      $L(cropper).css({'left' : cropperNewLeft})
                                    }
                                    upDCropperDD();
                                    if((cropperDummyData.right >= opacityDivRight)&&(cropperDummyData.left <= opacityDivLeft)){
                                      cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                      cropperNewWidth = opacityDivRight - opacityDivLeft + "px";
                                      cropperNewHeight = (opacityDivRight - opacityDivLeft)/aspectDiff + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft})
                                    }
                                  }else if((cropperHeight + (evY - previousClientY))<=leastHeight) {
                                    if(!(aspectRatio === "n:n")){
                                      cropperNewLeft    = (midWidth - (leastWidth/2)) + "px";
                                      cropperNewWidth   = leastWidth + "px";
                                      cropperNewHeight  = leastHeight + "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft})
                                    } else {
                                      cropperNewHeight  = leastHeight + "px";
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  }else if(((cropperHeight + (evY - previousClientY))>=maxHeight)){
                                    if(!(aspectRatio === "n:n")){
                                      var checkHeight = cropperHeight + (evY - previousClientY);
                                      var checkWidth = (cropperHeight + (presentClientY - previousClientY))*aspectDiff;
                                      if(((checkWidth >= maxWidth)||(checkHeight >= maxHeight))&&(cropperTop <= (opacityDivBottom - maxHeight))){
                                        // if(imageType === "landscape"){
                                          cropperNewLeft = (midWidth - (maxWidth/2));
                                          if(cropperNewLeft < 0){
                                            cropperNewLeft = 0 ;
                                          }
                                          if(cropperNewLeft > (opacityDivRight - maxWidth)-opacityDivLeft){
                                            cropperNewLeft = (opacityDivRight - maxWidth)-opacityDivLeft ;
                                          }
                                        // } else {
                                        //   cropperNewLeft  = 0 + "px";
                                        // }
                                        cropperNewWidth   = maxWidth +"px";
                                        cropperNewHeight  = maxHeight + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft})
                                      }
                                    } else {
                                      if(maxHeight != fixedImageheight){
                                        cropperNewHeight   = maxHeight +"px";
                                      } else {
                                        cropperNewHeight   = opacityDivBottom - cropperTop +"px";
                                      }
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  }
                                  break;

                                  case "lyteCropTopRightCorner":
                                  upDCropperDD();

                                  cropperNewTop = 0; cropperNewRight = 0; cropperNewWidth = 0; cropperNewHeight= 0 , cropperNewLeft = 0;
                                  if(aspectRatio === "n:n"){
                                    if(((cropperWidth + (presentClientX - previousClientX))>=leastWidth) && ((cropperWidth + (presentClientX - previousClientX))<=maxWidth)){
                                      if(presentClientX < opacityDivRight){
                                        cropperNewWidth   = cropperWidth + (presentClientX - previousClientX) + "px";
                                        $L(cropper).css({'width' : cropperNewWidth})
                                        $L(cropper).css({'width' : cropperNewWidth})
                                      }
                                    } else if((cropperWidth + (presentClientX - previousClientX))<leastWidth){
                                      if(presentClientX <= cropperLeft){
                                          cropperNewWidth = leastWidth + "px";
                                        $L(cropper).css({'width' : cropperNewWidth})
                                      }
                                    } else if((cropperWidth + (presentClientX - previousClientX))>maxWidth) {
                                      if(presentClientX >= opacityDivRight){
                                        if(maxWidth != fixedImageWidth){
                                          cropperNewWidth = maxWidth + "px";
                                        } else {
                                          cropperNewWidth = opacityDivRight - cropperLeft + "px";
                                        }
                                        $L(cropper).css({'width' : cropperNewWidth})
                                      }
                                    }
                                    if(((cropperHeight - (presentClientY - previousClientY))>=leastHeight) && ((cropperHeight - (presentClientY - previousClientY))<=maxHeight)){
                                      if(presentClientY > opacityDivTop){
                                        cropperNewTop = ((cropperTop - cropAreaTop) + (evY - previousClientY))+ "px";
                                        cropperNewHeight   = cropperHeight - (presentClientY - previousClientY) + "px";
                                        $L(cropper).css({'height' : cropperNewHeight , 'top' : cropperNewTop})
                                      }
                                    } else if((cropperHeight - (presentClientY - previousClientY))<leastHeight){
                                      if(presentClientY > cropperBottom){
                                          cropperNewHeight = leastHeight + "px";
                                          cropperNewTop = cropperBottom - leastHeight - opacityDivTop + "px";
                                        $L(cropper).css({'height' : cropperNewHeight , 'top' : cropperNewTop})
                                      }
                                    } else if((cropperHeight - (presentClientY - previousClientY))>maxHeight) {
                                      if(presentClientY <= opacityDivTop){
                                        if(maxHeight != fixedImageheight){
                                          cropperNewTop = cropperBottom - maxHeight - opacityDivTop + "px";
                                          cropperNewHeight   = maxHeight + "px";
                                        } else {
                                          cropperNewTop = (opacityDivTop - fixedImageTop) + "px";
                                          cropperNewHeight   = (cropperBottom - opacityDivTop) + "px";
                                        }
                                        $L(cropper).css({'height' : cropperNewHeight , 'top' : cropperNewTop})
                                      }
                                    }
                                  } else {
                                      if (((cropperHeight - (evY - previousClientY))>=leastHeight)&&((cropperHeight - (evY - previousClientY))<=maxHeight)) {
                                        if(evY >= opacityDivTop+5){
                                          cropperNewWidth   = (cropperHeight - (evY - previousClientY))*aspectDiff + "px";
                                          cropperNewHeight  = cropperHeight - (evY - previousClientY)+ "px";
                                          cropperNewTop     = ((cropperTop - cropAreaTop) + (evY - previousClientY))+ "px";
                                          cropperNewRight   = ((cropperRight - cropAreaRight) - (evX - previousClientX))+ "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'right' : cropperNewRight})
                                        }
                                        upDCropperDD();
                                        if(evY < (opacityDivTop+5)){
                                          if((!(cropperDummyData.height >= opacityDivHeight))||(!(cropperDummyData.width >= opacityDivWidth))&&(cropperDummyData.left < opacityDivLeft)){
                                            cropperNewTop = opacityDivTop - cropAreaTop  + "px";
                                          }
                                          cropperNewWidth = (cropperBottom - opacityDivTop)*aspectDiff + "px";
                                          cropperNewHeight = cropperBottom - opacityDivTop + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                        }
                                        upDCropperDD();
                                       if(cropperDummyData.right >= opacityDivRight){
                                         cropperNewTop = (cropperBottom - ((opacityDivRight - cropperLeft)/aspectDiff)) - cropAreaTop + "px";
                                         cropperNewWidth = opacityDivRight - cropperLeft + "px";
                                         cropperNewHeight = (opacityDivRight - cropperLeft)/aspectDiff + "px";
                                         $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                       }
                                     } else if((cropperHeight - (evY - previousClientY))<=leastHeight) {
                                          cropperNewTop     = (cropperBottom - leastHeight) - cropAreaTop + "px";
                                          cropperNewWidth   = leastWidth + "px";
                                          cropperNewHeight  = leastHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                      }
                                      else if((cropperHeight - (evY - previousClientY))>=maxHeight) {
                                        var checkHeight = cropperHeight - (evY - previousClientY);
                                        var checkWidth = (cropperHeight - (evY - previousClientY))*aspectDiff;
                                        var checkTop = ((cropperTop - cropAreaTop) + (evY - previousClientY));
                                        if(((checkWidth >= maxWidth)||(checkHeight >= maxHeight))&&((evY-6 < opacityDivTop)&&((cropperBottom - opacityDivTop)>=maxHeight))&&(cropperLeft <= (opacityDivRight - maxWidth))){
                                          cropperNewTop    = (cropperBottom - maxHeight) - cropAreaTop + "px";
                                          // if(imageType === "landscape"){
                                            cropperNewLeft     = (midWidth - (maxWidth/2));
                                            if(cropperNewLeft < 0){
                                              cropperNewLeft = 0 ;
                                            }
                                            if(cropperNewLeft > (opacityDivRight - maxWidth)-opacityDivLeft){
                                              cropperNewLeft = (opacityDivRight - maxWidth)-opacityDivLeft ;
                                            }
                                          // } else {
                                          //   cropperNewLeft     = 0 + "px";
                                          // }
                                          cropperNewWidth   = maxWidth +"px";
                                          cropperNewHeight  = maxHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop})
                                        }
                                      }
                                  }
                                  break;

                                  case "lyteCropTopLeftCorner":
                                  upDCropperDD();

                                  cropperNewTop = 0; cropperNewRight = 0; cropperNewWidth = 0; cropperNewHeight= 0 , cropperNewLeft = 0;
                                  if(aspectRatio === "n:n"){
                                    upDCropperDD();
                                    if (((cropperWidth - (evX - previousClientX))>=leastWidth)&&((cropperWidth - (evX - previousClientX))<=maxWidth)) {
                                      if(evX > opacityDivLeft){
                                        cropperNewWidth   = cropperWidth - (presentClientX - previousClientX) + "px";
                                        cropperNewLeft    = ((cropperLeft - cropAreaLeft) + (evX - previousClientX))+ "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'left' : cropperNewLeft})
                                      }
                                    }else if((cropperWidth - (evX - previousClientX))<leastWidth){
                                      if(presentClientX > cropperRight){
                                          cropperNewWidth = leastWidth + "px";
                                          cropperNewLeft = cropperRight - leastWidth - opacityDivLeft + "px";
                                        $L(cropper).css({'width' : cropperNewWidth , 'left' : cropperNewLeft})
                                      }
                                    }else if((cropperWidth - (evX - previousClientX))>maxWidth){
                                      if(evX <= opacityDivLeft){
                                        if(maxWidth != fixedImageWidth){
                                          cropperNewWidth   = maxWidth + "px";
                                          cropperNewLeft    = cropperRight - maxWidth - opacityDivLeft + "px";
                                        } else {
                                          cropperNewWidth   = (cropperRight - opacityDivLeft) + "px";
                                          cropperNewLeft    = (opacityDivLeft - fixedImageLeft) + "px";
                                        }
                                        $L(cropper).css({'width' : cropperNewWidth,'left' : cropperNewLeft})
                                      }
                                    }
                                    if(((cropperHeight - (presentClientY - previousClientY))>=leastHeight) && ((cropperHeight - (presentClientY - previousClientY))<=maxHeight)){
                                      if(presentClientY > opacityDivTop){
                                        cropperNewTop = ((cropperTop - cropAreaTop) + (evY - previousClientY))+ "px";
                                        cropperNewHeight   = cropperHeight - (presentClientY - previousClientY) + "px";
                                        $L(cropper).css({'height' : cropperNewHeight , 'top' : cropperNewTop})
                                      }
                                    }else if((cropperHeight - (presentClientY - previousClientY))<leastHeight){
                                      if(presentClientY > cropperBottom){
                                          cropperNewHeight = leastHeight + "px";
                                          cropperNewTop = cropperBottom - leastHeight - opacityDivTop + "px";
                                        $L(cropper).css({'height' : cropperNewHeight , 'top' : cropperNewTop})
                                      }
                                    } else if((cropperHeight - (presentClientY - previousClientY))>maxHeight){
                                      if(presentClientY <= opacityDivTop){
                                        if(maxHeight != fixedImageheight){
                                          cropperNewTop = cropperBottom - maxHeight - opacityDivTop + "px";
                                          cropperNewHeight   = maxHeight + "px";
                                        } else {
                                          cropperNewTop = (opacityDivTop - fixedImageTop) + "px";
                                          cropperNewHeight   = (cropperBottom - opacityDivTop) + "px";
                                        }
                                        $L(cropper).css({'height' : cropperNewHeight , 'top' : cropperNewTop})
                                      }
                                    }
                                  } else {
                                      if(((cropperHeight - (evY - previousClientY))>=leastHeight)&&((cropperHeight - (evY - previousClientY))<=maxHeight)){
                                        if(evY >= opacityDivTop+5){
                                          cropperNewWidth = (cropperHeight - (evY - previousClientY))*aspectDiff + "px";
                                          cropperNewHeight  = cropperHeight - (evY - previousClientY)+ "px";
                                          cropperNewTop     = ((cropperTop - cropAreaTop) + (evY - previousClientY))+ "px";
                                          cropperNewLeft    = ((cropperLeft - cropAreaLeft) + ((evY - previousClientY)*aspectDiff)) + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft,'top':cropperNewTop})
                                        }
                                        upDCropperDD();
                                        if(evY-6 <= opacityDivTop){
                                          if((!(cropperDummyData.height > opacityDivHeight))||(!(cropperDummyData.width > opacityDivWidth))&&(cropperDummyData.left < opacityDivLeft)){
                                            cropperNewLeft = (opacityDivRight - (((cropperBottom - opacityDivTop)*aspectDiff) + (opacityDivRight - cropperRight))) - cropAreaLeft + "px";
                                            cropperNewTop = opacityDivTop - cropAreaTop + "px";
                                          }
                                          cropperNewWidth = (cropperBottom - opacityDivTop)*aspectDiff + "px";
                                          cropperNewHeight = cropperBottom - opacityDivTop + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft,'top':cropperNewTop})
                                        }
                                        upDCropperDD();
                                        if(cropperDummyData.left <= opacityDivLeft){
                                          cropperNewTop = (cropperBottom - ((cropperRight - opacityDivLeft)/aspectDiff)) - cropAreaTop + "px";
                                          cropperNewLeft = opacityDivLeft - cropAreaLeft + "px";
                                          cropperNewWidth = cropperRight - opacityDivLeft + "px";
                                          cropperNewHeight = (cropperRight - opacityDivLeft)/aspectDiff + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft,'top':cropperNewTop})
                                        }
                                      }else if((cropperHeight - (evY - previousClientY))<=leastHeight){
                                        if(!(aspectRatio === "n:n")){
                                          cropperNewTop     = (cropperBottom - leastHeight) - cropAreaTop + "px";
                                          cropperNewLeft    = (cropperRight - leastWidth) - cropAreaLeft + "px";
                                          cropperNewWidth   = leastWidth + "px";
                                          cropperNewHeight  = leastHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft,'top':cropperNewTop})
                                        }
                                      }else if((cropperHeight - (evY - previousClientY))>=maxHeight) {
                                        var checkHeight = cropperHeight - (evY - previousClientY);
                                        var checkWidth = (cropperHeight - (evY - previousClientY))*aspectDiff;
                                        var checkTop = ((cropperTop - cropAreaTop) + (evY - previousClientY));
                                        if(((checkWidth >= maxWidth)||(checkHeight >= maxHeight))&&((evY-6 < opacityDivTop)&&((cropperBottom - opacityDivTop)>=maxHeight))&&(cropperRight - opacityDivLeft >= maxWidth)){
                                          cropperNewTop    = (cropperBottom - maxHeight) - cropAreaTop + "px";
                                          // if(imageType === "landscape"){
                                            cropperNewLeft     = (midWidth - (maxWidth/2));
                                            if(cropperNewLeft < 0){
                                              cropperNewLeft = 0 ;
                                            }
                                            if(cropperNewLeft > (opacityDivRight - maxWidth)-opacityDivLeft){
                                              cropperNewLeft = (opacityDivRight - maxWidth)-opacityDivLeft ;
                                            }
                                          // } else {
                                          //   cropperNewLeft     = 0 + "px";
                                          // }
                                          cropperNewWidth   = maxWidth +"px";
                                          cropperNewHeight  = maxHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'top' : cropperNewTop,'left' : cropperNewLeft})
                                        }
                                      }
                                    }
                                break;
                                case "lyteCropBottomRightCorner":
                                upDCropperDD();

                                cropperNewTop = 0; cropperNewRight = 0; cropperNewWidth = 0; cropperNewHeight= 0 , cropperNewLeft = 0;
                                if(aspectRatio === "n:n"){
                                  upDCropperDD();
                                  if(((cropperHeight + (evY - previousClientY))>=leastHeight)&&((cropperHeight + (evY - previousClientY))<=maxHeight)){
                                    if(evY < opacityDivBottom){
                                      cropperNewHeight  = cropperHeight + (evY - previousClientY)+ "px";
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  }else if((cropperHeight + (evY - previousClientY))<leastHeight){
                                    if(presentClientY < cropperTop){
                                        cropperNewHeight = leastHeight + "px";
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  } else if((cropperHeight + (evY - previousClientY))>maxHeight) {
                                    if(evY >= opacityDivBottom){
                                      if(maxHeight != fixedImageheight){
                                        cropperNewHeight = maxHeight + "px";
                                      } else {
                                        cropperNewHeight = opacityDivBottom - cropperTop + "px";
                                      }
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  }
                                  if(((cropperWidth + (evX - previousClientX))>=leastWidth)&&((cropperWidth + (evX - previousClientX))<=maxWidth)){
                                    if(evX < opacityDivRight){
                                      cropperNewWidth  = cropperWidth + (evX - previousClientX) + "px";
                                      $L(cropper).css({'width' : cropperNewWidth})
                                    }
                                  }else if((cropperWidth + (evX - previousClientX))<leastWidth){
                                    if(presentClientX <= cropperLeft){
                                        cropperNewWidth = leastWidth + "px";
                                      $L(cropper).css({'width' : cropperNewWidth})
                                    }
                                  } else if((cropperWidth + (evX - previousClientX))>maxWidth){
                                    if(evX >= opacityDivRight){
                                      if(maxWidth != fixedImageWidth){
                                        cropperNewWidth = maxWidth + "px";
                                      } else {
                                        cropperNewWidth = opacityDivRight - cropperLeft + "px";
                                      }
                                      $L(cropper).css({'width' : cropperNewWidth})
                                    }
                                  }
                                } else {
                                    if(((cropperWidth + (presentClientX - previousClientX))>=leastWidth)&&((cropperWidth + (presentClientX - previousClientX))<=maxWidth)){
                                        if(presentClientX < opacityDivRight){
                                          cropperNewWidth   = cropperWidth + (presentClientX - previousClientX) + "px";
                                          cropperNewHeight  = (cropperWidth + (presentClientX - previousClientX))/aspectDiff + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight})
                                        }
                                        upDCropperDD();
                                        if((cropperDummyData.right >= opacityDivRight-5)&&(presentClientX >= opacityDivRight-5)){
                                          cropperNewWidth = opacityDivRight - cropperLeft + "px";
                                          cropperNewHeight = (opacityDivRight - cropperLeft)/aspectDiff + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight})
                                        }
                                        upDCropperDD();
                                        if(cropperDummyData.bottom >= opacityDivBottom){
                                          cropperNewHeight = opacityDivBottom - cropperTop + "px";
                                          cropperNewWidth = (opacityDivBottom - cropperTop)*aspectDiff + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight})
                                        }
                                      }else if((cropperWidth + (presentClientX - previousClientX))<=leastWidth){
                                          cropperNewWidth   = leastWidth + "px";
                                          cropperNewHeight  = leastHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight})
                                      }else if((cropperWidth + (presentClientX - previousClientX))>=maxWidth){
                                        var checkHeight = (cropperWidth + (presentClientX - previousClientX))/aspectDiff;
                                        var checkWidth = cropperWidth + (presentClientX - previousClientX);
                                        if(((checkHeight >= maxHeight)||(checkWidth >= maxWidth))&&(opacityDivBottom - cropperTop >= maxHeight)&&(opacityDivRight - cropperLeft >= maxWidth)){
                                          // // cropperNewLeft    = (cropperRight - maxWidth) - cropAreaLeft + "px";
                                          // if(imageType === "portrait"){
                                          //   // cropperNewTop     = (midHeight - (maxHeight/2));
                                          //   if(cropperNewTop < 0){
                                          //     // cropperNewTop = 0 ;
                                          //   }
                                          //   if(cropperNewTop > (opacityDivBottom - maxHeight)-opacityDivTop){
                                          //     // cropperNewTop = (opacityDivBottom - maxHeight)-opacityDivTop ;
                                          //   }
                                          // } else {
                                          //   //cropperNewTop     = 0 + "px";
                                          // }
                                          cropperNewWidth   = maxWidth +"px";
                                          cropperNewHeight  = maxHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight})
                                        }
                                      }
                                  }
                                break;
                                case "lyteCropBottomLeftCorner":
                                upDCropperDD();

                                cropperNewTop = 0; cropperNewRight = 0; cropperNewWidth = 0; cropperNewHeight= 0 , cropperNewLeft = 0;
                                if(aspectRatio === "n:n"){
                                  upDCropperDD();
                                  if (((cropperWidth - (evX - previousClientX))>=leastWidth)&&((cropperWidth - (evX - previousClientX))<=maxWidth)) {
                                    if(evX > opacityDivLeft){
                                      cropperNewWidth   = cropperWidth - (presentClientX - previousClientX) + "px";
                                      cropperNewLeft    = ((cropperLeft - cropAreaLeft) + (evX - previousClientX))+ "px";
                                      $L(cropper).css({'width' : cropperNewWidth,'left' : cropperNewLeft})
                                    }
                                  }else if((cropperWidth - (evX - previousClientX))<leastWidth){
                                    if(presentClientX > cropperRight){
                                        cropperNewWidth = leastWidth + "px";
                                        cropperNewLeft = cropperRight - leastWidth - opacityDivLeft + "px";
                                      $L(cropper).css({'width' : cropperNewWidth , 'left' : cropperNewLeft})
                                    }
                                  } else if((cropperWidth - (evX - previousClientX))>maxWidth){
                                    if(evX <= opacityDivLeft){
                                      if(maxWidth != fixedImageWidth){
                                        cropperNewWidth   = maxWidth + "px";
                                        cropperNewLeft    = cropperRight - maxWidth - opacityDivLeft + "px";
                                      } else {
                                        cropperNewWidth   = (cropperRight - opacityDivLeft) + "px";
                                        cropperNewLeft    = (opacityDivLeft - fixedImageLeft) + "px";
                                      }
                                      $L(cropper).css({'width' : cropperNewWidth,'left' : cropperNewLeft})
                                    }
                                  }
                                  if(((cropperHeight + (evY - previousClientY))>=leastHeight)&&((cropperHeight + (evY - previousClientY))<=maxHeight)){
                                    if(evY < opacityDivBottom){
                                      cropperNewHeight  = cropperHeight + (evY - previousClientY)+ "px";
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  }else if((cropperHeight + (evY - previousClientY))<leastHeight){
                                    if(presentClientY < cropperTop){
                                        cropperNewHeight = leastHeight + "px";
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  } else if((cropperHeight + (evY - previousClientY))>maxHeight){
                                    if(evY >= opacityDivBottom){
                                      if(maxHeight != fixedImageheight){
                                        cropperNewHeight = maxHeight + "px";
                                      } else {
                                        cropperNewHeight = opacityDivBottom - cropperTop + "px";
                                      }
                                      $L(cropper).css({'height' : cropperNewHeight})
                                    }
                                  }
                                } else {
                                      if(((cropperWidth - (evX - previousClientX))>=leastWidth)&&((cropperWidth - (evX - previousClientX))<=maxWidth)){
                                      if(evX > opacityDivLeft){
                                        cropperNewWidth   = cropperWidth - (presentClientX - previousClientX) + "px";
                                        cropperNewHeight  = (cropperWidth - (presentClientX - previousClientX))/aspectDiff + "px";
                                        cropperNewLeft    = ((cropperLeft - cropAreaLeft) + (evX - previousClientX))+ "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight , 'left' : cropperNewLeft})
                                      }
                                      upDCropperDD();
                                      if(evX-6 <= opacityDivLeft+2){
                                        if((!(cropperDummyData.height >= opacityDivHeight))||(!(cropperDummyData.width >= opacityDivWidth))&&(cropperDummyData.left < opacityDivLeft)){
                                          cropperNewLeft = opacityDivLeft - cropAreaLeft  + "px";
                                        }
                                        cropperNewWidth = (cropperRight - opacityDivLeft) + "px";
                                        cropperNewHeight = (cropperRight - opacityDivLeft)/aspectDiff + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight , 'left' : cropperNewLeft})
                                      }
                                      upDCropperDD();
                                      if(cropperDummyData.bottom >= opacityDivBottom){
                                        cropperNewHeight = (opacityDivBottom - cropperTop) + "px";
                                        cropperNewWidth = (opacityDivBottom - cropperTop)*aspectDiff + "px";
                                        cropperNewLeft = opacityDivRight - (((opacityDivBottom - cropperTop)*aspectDiff) + (opacityDivRight - cropperRight)) - cropAreaLeft + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight , 'left' : cropperNewLeft})
                                      }
                                    }else if((cropperWidth - (evX - previousClientX))<=leastWidth){
                                      if(!(aspectRatio === "n:n")){
                                        cropperNewLeft    = (cropperRight - leastWidth) - cropAreaLeft + "px";
                                        cropperNewWidth   = leastWidth + "px";
                                        cropperNewHeight  = leastHeight + "px";
                                        $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight , 'left' : cropperNewLeft})
                                      }
                                    }
                                    else if((cropperWidth - (evX - previousClientX))>=maxWidth){
                                      if(!(aspectRatio === "n:n")){
                                        var checkHeight = (cropperWidth - (presentClientX - previousClientX))/aspectDiff;
                                        var checkWidth = cropperWidth - (presentClientX - previousClientX);
                                        var checkLeft = ((cropperLeft - cropAreaLeft) + (evX - previousClientX));
                                        if(((checkHeight >= maxHeight)||(checkWidth >= maxWidth))&&((evX-6 < opacityDivLeft)&&((cropperRight - opacityDivLeft)>=maxWidth))&&(opacityDivBottom - cropperTop >= maxHeight)){
                                          cropperNewLeft    = (cropperRight - maxWidth) - cropAreaLeft + "px";
                                          // if(imageType === "portrait"){
                                          //   // cropperNewTop     = (midHeight - (maxHeight/2));
                                          //   if(cropperNewTop < 0){
                                          //     // cropperNewTop = 0 ;
                                          //   }
                                          //   if(cropperNewTop > (opacityDivBottom - maxHeight)-opacityDivTop){
                                          //     // cropperNewTop = (opacityDivBottom - maxHeight)-opacityDivTop ;
                                          //   }
                                          // } else {
                                          //   //cropperNewTop     = 0 + "px";
                                          // }
                                          cropperNewWidth   = maxWidth +"px";
                                          cropperNewHeight  = maxHeight + "px";
                                          $L(cropper).css({'width' : cropperNewWidth,'height' : cropperNewHeight,'left' : cropperNewLeft})
                                        }
                                      }
                                    }
                                  }
                                break;
                                }
                                var fixedImageTransform = fixedImage.style.transform;
                                fixedImage.style.transform = 'rotate(0deg)';
                                divImageImg.style.left = (getBCR(fixedImage).left - getBCR(cropper).left)+"px";
                                divImageImg.style.top = (getBCR(fixedImage).top - getBCR(cropper).top)+"px";
                                fixedImage.style.transform = fixedImageTransform;
                                setCropperData();
                              }
                              document.addEventListener("mousemove" , resizeCropper);
                              document.addEventListener("mouseup" , removeResizeEvent);
                            }

                            break;
                          }
                        }


                        function positionCropper(cropperDim , cropAreaDim , imageDim , ang1 , prevAng){

                              var ang = fixedImage.style.transform.match(/-?\d+/g)[0];

                              var angCheck = parseInt(ang);
                              var angCheck1 = angCheck;
                              angCheck = Math.abs(angCheck);

                              if((angCheck === 90) || (angCheck === 270)){

                              if(imageData.height<imageData.width){
                                fixedImage.style.width = divImageImg.style.width = getBCR(cropperDiv).height + "px";
                                fixedImage.style.height = divImageImg.style.height ="auto";
                                cropArea.style.height = getBCR(cropperDiv).height + "px";
                                cropArea.style.top = "0px";
                                cropArea.style.width = getBCR(fixedImage).width + "px";
                                var absLeft = Math.abs(getBCR(cropArea).left - getBCR(fixedImage).left);
                                if(_lyteUiUtils.getRTL()){
                                  cropArea.style.left = "-"+((getBCR(cropperDiv).width - getBCR(cropArea).width)/2) + "px";
                                  fixedImage.style.left = -absLeft + "px";
                                } else{
                                  cropArea.style.left = ((getBCR(cropperDiv).width - getBCR(cropArea).width)/2) + "px";
                                  fixedImage.style.left = -absLeft + "px";
                                }
                              } else if(imageData.height>imageData.width){
                                fixedImage.style.width = divImageImg.style.width = "auto"
                                fixedImage.style.height = divImageImg.style.height = getBCR(cropperDiv).width + "px";
                                cropArea.style.width = getBCR(cropperDiv).width + "px";
                                cropArea.style.left = "0px";
                                cropArea.style.height = getBCR(fixedImage).height + "px";
                                cropArea.style.top = ((getBCR(cropperDiv).height - getBCR(cropArea).height)/2) + "px";
                                var x = Math.abs(getBCR(cropArea).left - getBCR(fixedImage).left);
                                if(_lyteUiUtils){
                                  fixedImage.style.left = x + "px";
                                }else{
                                  fixedImage.style.left = x + "px";
                                }
                              }

                              fixedImage.style.top = (getBCR(cropArea).top - getBCR(fixedImage).top) + "px";

                              setMinAndMaxDim();

                              if(aspectRatio !== 'n:n'){
                                leastHeight = 15*(getBCR(cropArea).height/cropAreaDim.width);
                                leastWidth = leastHeight*aspectDiff;
                              } else {
                                leastHeight = 15*(getBCR(cropArea).height/cropAreaDim.width);
                                leastWidth = leastHeight;
                              }

                              var cropperWidth = (cropperDim.height*getBCR(cropArea).width) / cropAreaDim.height;
                              var cropperHeight = (cropperDim.width*getBCR(cropArea).height) / cropAreaDim.width;
                              var newCropperWidth = cropperWidth;
                              var newCropperHeight = cropperHeight;
                              if((leastWidth > cropperWidth)&&(aspectRatio != "n:n")) {
                                newCropperWidth = leastWidth;
                                newCropperHeight = newCropperWidth/aspectDiff;
                              }
                              if((leastHeight > cropperHeight)&&(aspectRatio != "n:n")) {
                                newCropperHeight = leastHeight;
                                newCropperWidth = newCropperHeight*aspectDiff;
                              }
                              cropper.style.width = newCropperWidth + "px";
                              cropper.style.height = newCropperHeight + "px";


                              if((angCheck1 === -90)||(angCheck1 === -270)){
                                cropper.style.left = (((cropperDim.top - cropAreaDim.top) * getBCR(cropArea).width)/cropAreaDim.height) + "px";
                                cropper.style.top = ((getBCR(cropArea).height) - ((((cropperDim.left - cropAreaDim.left) * getBCR(cropArea).height)/cropAreaDim.width) + getBCR(cropper).height) ) + "px";
                              }
                              if((angCheck1 === 90) || (angCheck1 === 270)){
                                cropper.style.top = (((cropperDim.left - cropAreaDim.left) * getBCR(cropArea).height)/cropAreaDim.width) + "px";
                                cropper.style.left = (getBCR(cropArea).width - ( getBCR(cropper).width + (((cropperDim.top - cropAreaDim.top)* getBCR(cropArea).width)/cropAreaDim.height))) + "px";
                              }



                            } else {

                              if(imageData.height<imageData.width){
                                fixedImage.style.width = divImageImg.style.width = getBCR(cropperDiv).width + "px";
                                fixedImage.style.height = divImageImg.style.height = "auto";
                                cropArea.style.width = getBCR(cropperDiv).width + "px";
                                cropArea.style.left = "0px";
                                cropArea.style.right = "";
                                cropArea.style.height = getBCR(fixedImage).height + "px";
                                cropArea.style.top = (getBCR(cropperDiv).height - getBCR(cropArea).height)/2 + "px";
                                fixedImage.style.left = (getBCR(cropArea).width - getBCR(fixedImage).width)/2 + "px";
                              } else {
                                fixedImage.style.width = divImageImg.style.width = "auto";
                                fixedImage.style.height = divImageImg.style.height = getBCR(cropperDiv).height + "px";
                                cropArea.style.height = getBCR(cropperDiv).height + "px";
                                cropArea.style.top = "0px";
                                cropArea.style.width = getBCR(fixedImage).width + "px";
                                if(_lyteUiUtils.getRTL()){
                                  cropArea.style.left = "-"+(getBCR(cropperDiv).width - getBCR(cropArea).width)/2 + "px";
                                }else{
                                  cropArea.style.left = (getBCR(cropperDiv).width - getBCR(cropArea).width)/2 + "px";
                                }
                                fixedImage.style.left = (getBCR(cropArea).width - getBCR(fixedImage).width)/2 + "px";
                              }



                              fixedImage.style.top = (getBCR(box).height - getBCR(fixedImage).height)/2 + "px";

                              setMinAndMaxDim();

                              var cropperWidth = (cropperDim.height*getBCR(cropArea).width) / cropAreaDim.height;
                              var cropperHeight = (cropperDim.width*getBCR(cropArea).height) / cropAreaDim.width;
                              var newCropperWidth = cropperWidth;
                              var newCropperHeight = cropperHeight;
                              if((leastHeight > cropperHeight)&&(aspectRatio != "n:n")) {
                                newCropperHeight = leastHeight;
                                newCropperWidth = newCropperHeight * aspectDiff;
                              }
                              cropper.style.width = newCropperWidth + "px";
                              cropper.style.height = newCropperHeight + "px";

                              if((angCheck1 === -180)){
                                cropper.style.top = ((getBCR(cropArea).height) - ((((cropperDim.left - cropAreaDim.left) * getBCR(cropArea).height)/cropAreaDim.width) + getBCR(cropper).height) ) + "px";
                                cropper.style.left = (((cropperDim.top - cropAreaDim.top) * getBCR(cropArea).width)/cropAreaDim.height) + "px";
                              }
                              if((angCheck1 === 0)||(angCheck1 === 180)){
                                cropper.style.top = (((cropperDim.left - cropAreaDim.left) * getBCR(cropArea).height)/cropAreaDim.width) + "px";
                                cropper.style.left = (getBCR(cropArea).width - ( getBCR(cropper).width + (((cropperDim.top - cropAreaDim.top)* getBCR(cropArea).width)/cropAreaDim.height))) + "px";
                              }
                            }

                            var fixedImageTransform = fixedImage.style.transform;
                            fixedImage.style.transform = 'rotate(0deg)';
                            divImageImg.style.left = (getBCR(fixedImage).left - getBCR(cropper).left)+"px";
                            divImageImg.style.top = (getBCR(fixedImage).top - getBCR(cropper).top)+"px";
                            fixedImage.style.transform = fixedImageTransform;

                            }




                        function setCropperData(){

                          var cropperData = getBCR(cropper);

                          cropData.cropperDimensions = {
                            'top' : cropper.offsetTop,
                            'left' : cropper.offsetLeft,
                            'width' : cropperData.width,
                            'height' : cropperData.height
                          }
                          cropData.imageDimension = imageData;



                          function getImageResolution(){

                            var resoluWidth , resoluHeight;

                            var image = $L('.lyteCropDivImageImg')[0];

                            var widthScaleFactor = image.naturalWidth / image.getBoundingClientRect().width;
                            var heightScaleFactor = image.naturalHeight / image.getBoundingClientRect().height;
                            if((cropData.angle === 90) || (cropData.angle === 270)){
                              widthScaleFactor = image.naturalHeight / image.getBoundingClientRect().width;
                              heightScaleFactor = image.naturalWidth / image.getBoundingClientRect().height;
                            }




                            resoluWidth = cropper.getBoundingClientRect().width * widthScaleFactor;
                            resoluHeight = cropper.getBoundingClientRect().height * heightScaleFactor;

                            return { "width" : resoluWidth , "height" : resoluHeight }

                          }

                          cropData.resolution = getImageResolution();

                          cropData.rotate = function(){
                                var cropperDim = getBCR(cropper);
                                var cropAreaDim = getBCR(cropArea);
                                var imageDim = getBCR(fixedImage);
                                var angle;
                                var o = fixedImage.style.transform;
                                var prevAng;
                                if(o){
                                  angle = o.match(/-?\d+/g);
                                  prevAng = angle[0];
                                  angle = parseInt(angle[0]) + 90;
                                  if(angle >= 360){
                                    angle = 0;
                                  }
                                  fixedImage.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                                  divImageImg.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                                } else {
                                  var angle = 90;
                                  fixedImage.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                                  divImageImg.style.transform = "rotate("+angle+"deg) rotateY("+exifRotateY+"deg)";
                                }
                                initialRotateAngle = angle;
                                // if(cropData.angle === undefined){
                                  // cropData.angle = angle;
                                // } else {
                                cropData.angle = angle;
                                // }
                                aspectDiff = 1/aspectDiff;
                                if(imageType === "landscape"){
                                  imageType = "portrait";
                                } else {
                                  imageType = "landscape";
                                }
                                positionCropper(cropperDim , cropAreaDim , imageDim , angle , prevAng);
                                setCropperData();
                              };


                              cropData.getCroppedImage = function(){
                                var image = $L('.lyteCropDivImageImg')[0];
                                var cropperData = getBCR(cropper);
                                var cropperAreaData = getBCR(cropArea);
                                var divImageData = getBCR(divImageImg);

                                var scaleFactor = image.naturalWidth / cropperData.width;

                                function scaleIt(img , scaleFactor){

                                  var c1 = document.createElement('CANVAS');
                                  var ctx = c1.getContext('2d');
                                  c1.style.background = "#eee";


                                  var o = fixedImage.style.transform;
                                  var angle = 0;
                                  if(o){
                                    angle = o.match(/-?\d+/g);
                                    angle = parseInt(angle[0]);
                                  }
                                  if((Math.abs(angle) !== 90)&&(Math.abs(angle) !== 270)){
                                    divImageImg.style.transform = 'rotate(0deg) rotateY(' +exifRotateY+'deg)';
                                  }
                                  var cw;
                                  var ch;
                                  var cx = cropperAreaData.left - cropperData.left;
                                  var cy = cropperAreaData.top - cropperData.top;

                                  if((Math.abs(angle) !== 90)&&(Math.abs(angle) !== 270)){
                                    c1.width = Math.round(cropperData.width * (img.naturalWidth / divImageData.width));
                                    c1.height = Math.round(cropperData.height * (img.naturalHeight / divImageData.height));
                                    cw = img.naturalWidth;
                                    ch = img.naturalHeight;
                                  } else {
                                    c1.height = Math.round(cropperData.height * (img.naturalWidth / divImageData.height));
                                    c1.width = Math.round(cropperData.width * (img.naturalHeight / divImageData.width));
                                    ch = img.naturalWidth;
                                    cw = img.naturalHeight;
                                  }
                                  cx = cx * (cw / divImageData.width)
                                  cy = cy * (ch / divImageData.height)
                                  divImageImg.style.transform = o;



                                  if((angle !== 0)||(exifRotateY===180)){

                                    ctx.save();
                                    if((Math.abs(angle)%90 === 0)&&(!((Math.abs(angle) === 180)||(Math.abs(angle) === 360)))){
                                      var cW = img.naturalWidth;
                                      var cH = img.naturalHeight;
                                    }
                                    var halfWidth = cw / 2;
                                    var halfHeight = ch / 2;

                                    if(((Math.abs(angle)%90 === 0)&&(angle!=0))&&(!((Math.abs(angle) === 180)||(Math.abs(angle) === 360)))){

                                      ctx.translate( cx+halfWidth , cy+halfHeight);
                                      ctx.rotate(angle * (Math.PI/180));
                                      if(exifRotateY === 180){
                                        ctx.scale(-1, 1);
                                      }
                                      ctx.drawImage(image, -halfHeight, -halfWidth, ch, cw);
                                    } else {
                                      ctx.translate( cx+cw/2 , cy+ch/2);
                                      ctx.rotate(angle * (Math.PI/180));
                                      if(exifRotateY === 180){
                                        ctx.scale(-1, 1);
                                      }
                                      ctx.drawImage(image,-cw/2,-ch/2,cw,ch);
                                    }
                                    ctx.restore();
                                  } else {
                                    ctx.drawImage(img , cx , cy , cw , ch);
                                  }

                                  function convertCanvasToImage(cc) {
                                    var image = new Image();
                                    image.src = cc.toDataURL("image/jpeg");
                                    return image;
                                  }

                                  // return convertCanvasToImage(c1);
                                  return c1;

                                }

                                return scaleIt(image , scaleFactor);


                              }

                              cropData.changeByHeight = function(val){

                                var retObj = {}

                                var cropperData = getBCR(cropper);
                                var opacityDivData = getBCR(opacityDiv)

                                var newHeight = parseFloat(val);

                                if(!(newHeight + getBCR(cropper).top <= getBCR(opacityDiv).bottom)){
                                  newHeight = getBCR(opacityDiv).bottom - getBCR(cropper).top;
                                }

                                var newTop;

                                var leftMid = getBCR(cropper).left + getBCR(cropper).width/2 - getBCR(opacityDiv).left;


                                if(newHeight>=maxHeight){
                                  newHeight = maxHeight;
                                }
                                if(newHeight<=leastHeight){
                                  newHeight = leastHeight;
                                }

                                var newWidth = newHeight*aspectDiff;

                                if(cropperData.top + newHeight >= opacityDivData.bottom ){
                                  newTop = opacityDivData.bottom - newHeight - opacityDivData.top;
                                  $L(cropper).css({'top' : newTop})
                                }

                                var cropperNewLeft = leftMid - newWidth/2;

                                if(cropperNewLeft >= 0){
                                  $L(cropper).css({'left' : cropperNewLeft})
                                }
                                if(cropperNewLeft+newWidth >= getBCR(opacityDiv).right - getBCR(opacityDiv).left){
                                  cropperNewLeft = getBCR(opacityDiv).right - newWidth - getBCR(opacityDiv).left;
                                  $L(cropper).css({'left' : cropperNewLeft})
                                }

                                if(aspectRatio !== 'n:n'){
                                  $L(cropper).css({'width' : newWidth,'height' : newHeight})
                                } else {
                                  newWidth = getBCR(cropper).width;
                                  $L(cropper).css({'height' : newHeight})
                                }

                                if(val === 'NaN'){
                                    newWidth = leastWidth;
                                    newHeight = leastHeight;
                                }

                                retObj = {'cropperWidth' : newWidth , 'cropperHeight' : newHeight};

                                var fixedImageTransform = fixedImage.style.transform;
                                fixedImage.style.transform = 'rotate(0deg)';
                                divImageImg.style.left = (getBCR(fixedImage).left - getBCR(cropper).left)+"px";
                                divImageImg.style.top = (getBCR(fixedImage).top - getBCR(cropper).top)+"px";
                                fixedImage.style.transform = fixedImageTransform;

                                setCropperData();

                                return retObj;

                              }


                              cropData.changeByWidth = function(val){

                                var retObj = {};

                                var newWidth = parseFloat(val);

                                if(!(newWidth + getBCR(cropper).left <= getBCR(opacityDiv).right)){
                                  newWidth = getBCR(opacityDiv).right - getBCR(cropper).left;
                                }

                                var newLeft;
                                var cropperData = getBCR(cropper);
                                var opacityDivData = getBCR(opacityDiv);

                                var topMid = getBCR(cropper).top + getBCR(cropper).height/2 - getBCR(opacityDiv).top;

                                if(newWidth>=maxWidth){
                                  newWidth = maxWidth;
                                }
                                if(newWidth<=leastWidth){
                                  newWidth = leastWidth;
                                }

                                var newHeight = newWidth/aspectDiff;

                                if(cropperData.left + newWidth >= opacityDivData.right ){
                                  newLeft = opacityDivData.right - newWidth - opacityDivData.left;
                                  $L(cropper).css({'left' : newLeft})
                                }

                                var cropperNewTop = topMid - newHeight/2;

                                if(cropperNewTop >= 0){
                                  $L(cropper).css({'top' : cropperNewTop})
                                }

                                if(cropperNewTop+newHeight >= getBCR(opacityDiv).bottom - getBCR(opacityDiv).top){
                                  cropperNewTop = getBCR(opacityDiv).bottom - newHeight - getBCR(opacityDiv).top;
                                  $L(cropper).css({'top' : cropperNewTop})
                                }


                                if(aspectRatio !== 'n:n'){
                                  $L(cropper).css({'width' : newWidth,'height' : newHeight})
                                } else {
                                  newHeight = getBCR(cropper).height;
                                  $L(cropper).css({'width' : newWidth})
                                }

                                if(val === 'NaN'){
                                    newWidth = leastWidth;
                                    newHeight = leastHeight;
                                }

                                retObj = {'cropperWidth' : newWidth , 'cropperHeight' : newHeight};

                                var fixedImageTransform = fixedImage.style.transform;
                                fixedImage.style.transform = 'rotate(0deg)';
                                divImageImg.style.left = (getBCR(fixedImage).left - getBCR(cropper).left)+"px";
                                divImageImg.style.top = (getBCR(fixedImage).top - getBCR(cropper).top)+"px";
                                fixedImage.style.transform = fixedImageTransform;

                                setCropperData();

                                return retObj;

                              }

                              cropData.deleteCropper = function(){

                                cropperDiv.removeChild(cropArea)
                                imageTag.style.display = 'block'

                              }

                              cropData.swapAspectRatio = function(){

                                aspectDiff = 1/aspectDiff

                                setMinAndMaxDim();

                                var cropperOldHeight = getBCR(cropper).height;
                                var cropperOldWidth = getBCR(cropper).width;
                                var cropperNewTop ;
                                var cropperNewLeft;
                                var topMid = getBCR(cropper).height/2 + getBCR(cropper).top;
                                var leftMid = getBCR(cropper).width/2 + getBCR(cropper).left;

                                var cropperNewWidth;
                                var cropperNewHeight;



                                if(getBCR(cropper).top + cropperOldWidth > getBCR(opacityDiv).bottom){
                                  cropperNewTop = getBCR(opacityDiv).bottom - cropperOldWidth - getBCR(opacityDiv).top;
                                  $L(cropper).css({'top' : cropperNewTop})
                                } else {
                                  cropperNewTop = topMid - (getBCR(cropper).width/2) - getBCR(opacityDiv).top;
                                  if(cropperNewTop <= 0){
                                    cropperNewTop = 0;
                                  }
                                  $L(cropper).css({'top' : cropperNewTop})
                                }
                                if(getBCR(cropper).left + cropperOldHeight > getBCR(opacityDiv).right){
                                  cropperNewLeft = getBCR(opacityDiv).right - cropperOldHeight - getBCR(opacityDiv).left;
                                  $L(cropper).css({'left' : cropperNewLeft})
                                } else {
                                  cropperNewLeft = leftMid - (getBCR(cropper).height/2) - getBCR(opacityDiv).left;
                                  if(cropperNewLeft <= 0 ){
                                    cropperNewLeft = 0;
                                  }
                                  $L(cropper).css({'left' : cropperNewLeft})
                                }

                                $L(cropper).css({'width' : cropperOldHeight,'height' : cropperOldWidth})

                                if(cropperOldWidth >= getBCR(fixedImage).height){
                                  cropperNewWidth = getBCR(fixedImage).height * aspectDiff;
                                  cropperNewHeight = getBCR(fixedImage).height ;
                                  cropperNewLeft = (getBCR(fixedImage).width - cropperNewWidth)/2;
                                  $L(cropper).css({'height' : cropperNewHeight , 'width' : cropperNewWidth , 'top' : 0 , 'left' : cropperNewLeft});
                                }
                                if(cropperOldHeight >= getBCR(fixedImage).width){
                                  cropperNewWidth = getBCR(fixedImage).width;
                                  cropperNewHeight = getBCR(fixedImage).width / aspectDiff;
                                  cropperNewTop = (getBCR(fixedImage).height - cropperNewHeight)/2;
                                  $L(cropper).css({'height' : cropperNewHeight , 'width' : cropperNewWidth , 'left' : 0 , 'top' : cropperNewTop});
                                }


                                var fixedImageTransform = fixedImage.style.transform ;
                                fixedImage.style.transform = 'rotate(0deg)';
                                divImageImg.style.left = (getBCR(fixedImage).left - getBCR(cropper).left)+"px";
                                divImageImg.style.top = (getBCR(fixedImage).top - getBCR(cropper).top)+"px";
                                fixedImage.style.transform = fixedImageTransform+ 'rotateY('+exifRotateY+')';

                                setCropperData();

                              }

                              cropData.angle = initialRotateAngle;
                              cropData.exifAngle = exifRotateY;

                          $L(imageTag).data('cropper' , cropData);
                        }
        } else if(aRD.type === 'DP'){


            var mainImage = this[0];
            var mainImageDimension = mainImage.getBoundingClientRect()
            mainImage.style.display = 'none';
            var imageParent = mainImage.parentElement;
            var imageParentDimension = imageParent.getBoundingClientRect()
            var imageType;
            var inImageDimension;
            var cropData = {}
            var initialImageValue;

            if(!aRD){
              aRD = {}
            }

            if(!aRD.cropperSize){
              aRD.cropperSize = 300
            }

            var mainArea,backImage,frontImage,visualArea,freezeDiv


            if(mainImageDimension.height < mainImageDimension.width){
              imageType = "landscape";
            } else {
              imageType = "portrait";
            }

            var generateDiv = function(){

              mainArea = document.createElement('DIV');
              freezeDiv = document.createElement('DIV');
              backImage = document.createElement('IMG');
              visualArea = document.createElement('DIV');
              frontImage = document.createElement('IMG');


              backImage.src = frontImage.src = mainImage.src

              mainArea.setAttribute('class' , 'lytePSParent')
              freezeDiv.setAttribute('class' , 'lytePSFreezeLayer')
              backImage.setAttribute('class' , 'lytePSBackImage')
              visualArea.setAttribute('class' , 'lytePSvisualArea')
              frontImage.setAttribute('class' , 'lytePSFrontImage')

              if(imageType === "landscape"){
                backImage.style.height = aRD.cropperSize + "px";
                frontImage.style.height = aRD.cropperSize + "px";
              } else {
                backImage.style.width = aRD.cropperSize + "px";
                frontImage.style.width = aRD.cropperSize + "px";
              }


              appendFunction()
              setDimensions()

            }

            var appendFunction = function(){

              mainArea.appendChild(backImage)
              mainArea.appendChild(freezeDiv)
              visualArea.appendChild(frontImage)
              mainArea.appendChild(visualArea)
              imageParent.appendChild(mainArea)

              inImageDimension = backImage.getBoundingClientRect()

            }

            var setDimensions = function(){

              visualArea.style.width = visualArea.style.height = aRD.cropperSize + "px"

              visualArea.style.top = (imageParentDimension.height/2 - aRD.cropperSize/2) + "px";
              visualArea.style.left = (imageParentDimension.width/2 - aRD.cropperSize/2) + "px";
              if(imageType === "landscape"){
                backImage.style.top = (imageParentDimension.height/2 - aRD.cropperSize/2)+ "px";
                backImage.style.left = (imageParentDimension.width - inImageDimension.width)/2 + "px";
              } else {
                backImage.style.top = (imageParentDimension.height - inImageDimension.height)/2 + "px";
                backImage.style.left = (imageParentDimension.width/2 - aRD.cropperSize/2) + "px";
              }
              frontImage.style.left = (backImage.getBoundingClientRect().left - visualArea.getBoundingClientRect().left) + "px"
              frontImage.style.top = (backImage.getBoundingClientRect().top - visualArea.getBoundingClientRect().top) + "px"


              initialImageValue = backImage.getBoundingClientRect()


              imageParent.addEventListener('mousedown' , psMouseDown)


            }

            var bst , bsl
            var preY , preX

            var psMouseDown = function(eve){
              if($L(eve.target).hasClass('lytePSvisualArea')){

                imageParent.addEventListener('mousemove' , psMoveImage)
                imageParent.addEventListener('mouseup' , remPsFun)

                bst = backImage.getBoundingClientRect().top - imageParent.getBoundingClientRect().top
                bsl = backImage.getBoundingClientRect().left - imageParent.getBoundingClientRect().left
                preY = eve.clientY
                preX = eve.clientX

              }
            }

            var psMoveImage = function(eve){

              var mFT = ((-1*(imageParentDimension.height/2 - aRD.cropperSize/2)) + (bst - (preY - eve.clientY)))
              var mBT = (bst - (preY - eve.clientY))
              var mFL = (((bsl - (preX - eve.clientX)))-(imageParentDimension.width/2 - aRD.cropperSize/2))
              var mBL = (bsl - (preX - eve.clientX))

              if(mBL <= (visualArea.getBoundingClientRect().left - imageParent.getBoundingClientRect().left)){
                backImage.style.left = (bsl - (preX - eve.clientX)) + "px"
                frontImage.style.left = (((bsl - (preX - eve.clientX)))-(imageParentDimension.width/2 - aRD.cropperSize/2)) + "px"
              } else {
                backImage.style.left = (visualArea.getBoundingClientRect().left - imageParent.getBoundingClientRect().left) + "px"
                frontImage.style.left = ((visualArea.getBoundingClientRect().left - imageParent.getBoundingClientRect().left) - (imageParentDimension.width/2 - aRD.cropperSize/2)) + "px";
              }


              if(
                (mBL + backImage.getBoundingClientRect().width) < ((visualArea.getBoundingClientRect().left - imageParent.getBoundingClientRect().left) + visualArea.getBoundingClientRect().width )
              ){

                backImage.style.left = -1*((backImage.getBoundingClientRect().width - visualArea.getBoundingClientRect().width) - (visualArea.getBoundingClientRect().left - imageParent.getBoundingClientRect().left)) + "px"
                frontImage.style.left = (-1*((backImage.getBoundingClientRect().width - visualArea.getBoundingClientRect().width) - (visualArea.getBoundingClientRect().left - imageParent.getBoundingClientRect().left)) - (imageParentDimension.width/2 - aRD.cropperSize/2)) + "px";

              }



              if(mBT <= (visualArea.getBoundingClientRect().top - imageParent.getBoundingClientRect().top)){
                backImage.style.top = (bst - (preY - eve.clientY)) + "px"
                frontImage.style.top = ((-1*(imageParentDimension.height/2 - aRD.cropperSize/2)) + (bst - (preY - eve.clientY))) + "px"
              } else {
                backImage.style.top = (visualArea.getBoundingClientRect().top - imageParent.getBoundingClientRect().top) + "px"
                frontImage.style.top = ((-1*(imageParentDimension.height/2 - aRD.cropperSize/2)) + (visualArea.getBoundingClientRect().top - imageParent.getBoundingClientRect().top)) + "px"
              }

              if(
                (mBT + backImage.getBoundingClientRect().height) < ((visualArea.getBoundingClientRect().top - imageParent.getBoundingClientRect().top) + visualArea.getBoundingClientRect().height )
              ){

                backImage.style.top = -1*((backImage.getBoundingClientRect().height - visualArea.getBoundingClientRect().height) - (visualArea.getBoundingClientRect().top - imageParent.getBoundingClientRect().top)) + "px"
                frontImage.style.top = (-1*((backImage.getBoundingClientRect().height - visualArea.getBoundingClientRect().height) - (visualArea.getBoundingClientRect().top - imageParent.getBoundingClientRect().top)) - (imageParentDimension.height/2 - aRD.cropperSize/2)) + "px";

              }


            }

            var remPsFun = function(eve){

              imageParent.removeEventListener('mousemove' , psMoveImage)
              imageParent.removeEventListener('mouseup' , remPsFun)

            }

            generateDiv();

            cropData.zoomImage = function(percent) {
              var scaleValue = (percent / 100) + 1;
              var iamgeParentDimension = imageParent.getBoundingClientRect();

              var backImageCurrentTop = parseFloat(backImage.style.top);
              var backImageCurrentLeft = parseFloat(backImage.style.left);
              var backImageCurrentDimension = backImage.getBoundingClientRect();
              var backImageCurrentHeight = backImageCurrentDimension.height;
              var backImageCurrentWidth = backImageCurrentDimension.width;
              var backImageCurrentRight = backImageCurrentLeft + backImageCurrentWidth;
              var backImageCurrentBottom = backImageCurrentTop + backImageCurrentHeight;

              var cropperDimension = visualArea.getBoundingClientRect();
              var cropperTop = cropperDimension.top - iamgeParentDimension.top;
              var cropperLeft = cropperDimension.left - iamgeParentDimension.left;
              var cropperRight = cropperLeft + cropperDimension.width;
              var cropperBottom = cropperTop + cropperDimension.height;

              var LeftGapBetweenImageAndCropper = cropperLeft - backImageCurrentLeft;
              var rightGapBetweenImageAndCropper = backImageCurrentRight - cropperRight;
              var topGapBetweenImageAndCropper = cropperTop - backImageCurrentTop;
              var BottomGapBetweenImageAndCropper = backImageCurrentBottom - cropperBottom;

              var imageHeightNew = initialImageValue.height*scaleValue;
              var imageWidthNew = initialImageValue.width*scaleValue;

              var oldTotalHorizontalGap = backImageCurrentWidth - cropperDimension.width;
              var oldTotalVerticalGap = backImageCurrentHeight - cropperDimension.height;
              var newTotalHorizontalGap = imageWidthNew - cropperDimension.width;
              var newTotalVerticalGap = imageHeightNew - cropperDimension.height;

              var imageHeightDiff = imageHeightNew - backImageCurrentHeight;
              var imageWidthDiff = imageWidthNew - backImageCurrentWidth;

              var newLeftGapBetweenImageAndCropper = (LeftGapBetweenImageAndCropper/ oldTotalHorizontalGap) * newTotalHorizontalGap;
              var newTopGapBetweenImageAndCropper = (topGapBetweenImageAndCropper / oldTotalVerticalGap) * newTotalVerticalGap;

              var backImageTopNew, backImageLeftNew;
              if((LeftGapBetweenImageAndCropper == rightGapBetweenImageAndCropper) && (topGapBetweenImageAndCropper == BottomGapBetweenImageAndCropper)) {
                  backImageLeftNew = backImageCurrentLeft - (imageWidthDiff / 2);
                  backImageTopNew = backImageCurrentTop - (imageHeightDiff / 2);
              }
              else if(LeftGapBetweenImageAndCropper == rightGapBetweenImageAndCropper) {
                  backImageTopNew = cropperTop - newTopGapBetweenImageAndCropper;
                  backImageLeftNew = backImageCurrentLeft - (imageWidthDiff / 2);
              }
              else if(topGapBetweenImageAndCropper == BottomGapBetweenImageAndCropper) {
                  backImageTopNew = backImageCurrentTop - (imageHeightDiff / 2);
                  backImageLeftNew = cropperLeft - newLeftGapBetweenImageAndCropper;
              }
              else {
                  backImageTopNew = cropperTop - newTopGapBetweenImageAndCropper;
                  backImageLeftNew = cropperLeft - newLeftGapBetweenImageAndCropper;
              }

              if(imageType === "landscape"){
                  backImage.style.height = imageHeightNew + "px";
                  frontImage.style.height = imageHeightNew + "px";
              } else {
                  backImage.style.width = imageWidthNew + "px";
                  frontImage.style.width = imageWidthNew + "px";
              }

              backImage.style.top = backImageTopNew + "px";
              frontImage.style.top = (backImageTopNew - cropperTop) + "px";
              backImage.style.left = backImageLeftNew + "px";
              frontImage.style.left = (backImageLeftNew - cropperLeft) + "px"
          }
          cropData.getCroppedImage = function(){
            var image = frontImage;
            var cropperData = visualArea.getBoundingClientRect();
            var mainAreaData = mainArea.getBoundingClientRect();
            var divImageData = frontImage.getBoundingClientRect();

            var scaleFactor = image.naturalWidth / cropperData.width;

            function scaleIt(img , scaleFactor){

              var c1 = document.createElement('CANVAS');
              var ctx = c1.getContext('2d');
              c1.style.background = "#eee";


              var o = backImage.style.transform;
              var angle = 0;
              if(o){
                angle = o.match(/-?\d+/g);
                angle = parseInt(angle[0]);
              }
              var cw;
              var ch;
              var cx = divImageData.left - cropperData.left;
              var cy = divImageData.top - cropperData.top;

              if((Math.abs(angle) !== 90)&&(Math.abs(angle) !== 270)){
                c1.width = Math.round(cropperData.width * (image.naturalWidth / divImageData.width));
                c1.height = Math.round(cropperData.height * (image.naturalHeight / divImageData.height));
                cw = image.naturalWidth;
                ch = image.naturalHeight;
              } else {
                c1.height = Math.round(cropperData.height * (image.naturalWidth / divImageData.height));
                c1.width = Math.round(cropperData.width * (image.naturalHeight / divImageData.width));
                ch = image.naturalWidth;
                cw = image.naturalHeight;
              }
              cx = cx * (cw / divImageData.width)
              cy = cy * (ch / divImageData.height)
              frontImage.style.transform = o;

              ctx.drawImage(image , cx , cy , cw , ch);

              // return convertCanvasToImage(c1);
              return c1;

            }

            return scaleIt(image , scaleFactor);


          }

            $L(mainImage).data('lyteCrop' , cropData);
        }
      }

    }
  }
}());

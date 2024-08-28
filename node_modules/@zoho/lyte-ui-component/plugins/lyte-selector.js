;(function(){

  if(lyteDomObj){

  lyteDomObj.prototype.selector = function(selections){

    // if(!selections){
    //   selections = {}
    // }

    var imageTagOriginal = this[0];
    var parentDiv = imageTagOriginal.parentElement;

    if(selections && selections.destroy){
      if($L(parentDiv).find('.lyteSelectionWrapperBox')[0]){
        parentDiv.removeChild($L(parentDiv).find('.lyteSelectionWrapperBox')[0])
        imageTagOriginal.style.display = "block"
        $L(imageTagOriginal).data('classes' , undefined)
        $L(imageTagOriginal).data('lyteSelector' , undefined)
        parentDiv.removeEventListener('mousedown' , parentDiv.mousedownFun)
      }
      return;
    }
    var selectionArray = [];
    selectionArray = $L(imageTagOriginal).data('classes');
    var currentClass = ''
    var wrapperDiv = document.createElement('DIV');
    var imageTag = document.createElement('IMG');
    imageTag.src = imageTagOriginal.src;
    imageTag.setAttribute('class' , 'lyteSelectorBackImage' )
    var selectionData = {};
    var maxCount
    var updateMaxCount = false

    if(selections && selections.maxCount){
      maxCount = selections.maxCount
    } else {
      maxCount = 1
      updateMaxCount = true
    }

    var imageMinWidth,imageMinHeight;

    if(selections && selections.initWidth){
      imageMinWidth = selections.initWidth
    } else {
      imageMinWidth = 20
    }
    if(selections && selections.initHeight){
      imageMinHeight = selections.initHeight
    } else {
      imageMinHeight = 20
    }

    var imageTop,imageLeft,imageRight,imageBottom,imageHeight,imageWidth;

    var currentX , currentY;
    var prevLeft, prevTop, prevRight, prevBottom; // VARIABLES USED IN moveSelection FUNCTION
    var rpLeft, rpTop, rpRight, rpBottom, rpWidth, rpHeight; // VARIABLES USED IN resizeSelectionBox FUNCTION RESIZE PREVIOUS VALUES
    var currentHandle; // CURRENT HANDLE HOLDED FOR RESIZING THE SELECTION BOX

    var currentDeleteBtn; // CURRENT DELETE BTN
    var deleteAllButton={};
    // var selectionStart = selectionEnd = deleteSingle = deleteMul = function(){};

    var onBeforeCreate = function(){}
    ,onCreate = function(){}
    ,onDragStart = function(){}
    ,onDragEnd = function(){}
    ,onResizeStart = function(){}
    ,onResizeEnd = function(){}
    ,onSelectionLimitReached = function(){}
    ,onDeleteOne = function(){}
    ,onDeleteAll = function(){}
    ,onOverlap = function(){}

    // if(!preventEvent){
    // } else {
    //   preventEvent = true;
    // }

    if(selections){

      if(selections.onBeforeCreate){
        onBeforeCreate = selections.onBeforeCreate
      }
      if(selections.onCreate){
        onCreate = selections.onCreate
      }
      if(selections.onDragStart){
        onDragStart = selections.onDragStart
      }
      if(selections.onDragEnd){
        onDragEnd = selections.onDragEnd
      }
      if(selections.onResizeStart){
        onResizeStart = selections.onResizeStart
      }
      if(selections.onResizeEnd){
        onResizeEnd = selections.onResizeEnd
      }
      if(selections.onDeleteOne){
        onDeleteOne = selections.onDeleteOne
      }
      if(selections.onDeleteAll){
        onDeleteAll = selections.onDeleteAll
      }
      if(selections.onOverlap){
        onOverlap = selections.onOverlap
      }
      if(selections.onSelectionLimitReached){
        onSelectionLimitReached = selections.onSelectionLimitReached
      }
      if(selections.preventOverlap === undefined){
        selections.preventOverlap = false;
      }
      if(!selections.classAttr){
        selections.classAttr = ""
      }
      if(!selections.classList){
        selections.classAttr = ""
      }

      if(selections.selections){

        // Predefined Selecitons creation

        selections = selections.selections;

        imageTag.onload = function(){

          if(!$L(parentDiv).find('.lyteSelectorBackImage')[0]){
            wrapperDiv.appendChild(imageTag);
            imageTag.style.height = imageTagOriginal.getBoundingClientRect().height + "px";
            imageTag.style.width = imageTagOriginal.getBoundingClientRect().width + "px";

            imageTagOriginal.style.display = "none"
          }

          if(!$L(parentDiv).find('.lyteSelectionWrapperBox')[0]){

            wrapperDiv.setAttribute('class' , 'lyteSelectionWrapperBox');
            parentDiv.appendChild(wrapperDiv);
            wrapperDiv.style.height = imageTag.getBoundingClientRect().height+"px";
            wrapperDiv.style.width = "auto";

            if(!($L(parentDiv).find('.lyteSelectionFreezeLayer')[0])){
              var freezeLayer = document.createElement('DIV');
              freezeLayer.setAttribute('class' , 'lyteSelectionFreezeLayer');
              wrapperDiv.appendChild(freezeLayer);
              freezeLayer.style.top = "0px";
              freezeLayer.style.left = "0px";
              freezeLayer.style.height = imageTag.getBoundingClientRect().height + "px";
              freezeLayer.style.width = imageTag.getBoundingClientRect().width + "px";
            }



            for(var i=0;i<selections.length;i++){
              var dummyDiv = document.createElement('DIV');
              dummyDiv.classList.add('lyteSelector'+(i+1));
              currentClass = 'lyteSelector'+(i+1);
              dummyDiv.classList.add('lyteSelectionBox')

              if(!selectionArray){
                selectionArray = []
              }

              selectionArray.push(currentClass)
              $L(parentDiv).find(imageTagOriginal).data('classes' , selectionArray)

              var tlCorner = document.createElement('DIV');
              var trCorner = document.createElement('DIV');
              var brCorner = document.createElement('DIV');
              var blCorner = document.createElement('DIV');

              var tEdge = document.createElement('DIV');
              var bEdge = document.createElement('DIV');
              var rEdge = document.createElement('DIV');
              var lEdge = document.createElement('DIV');

              var deleteBtn = document.createElement('DIV');
              var workArea = document.createElement('DIV');

              var selectorLabelTop = document.createElement('DIV');
              var selectorLabelBottom = document.createElement('DIV');

              tlCorner.setAttribute('class' , 'lyteSelectorHandles lyteTLCorner')
              trCorner.setAttribute('class' , 'lyteSelectorHandles lyteTRCorner')
              brCorner.setAttribute('class' , 'lyteSelectorHandles lyteBRCorner')
              blCorner.setAttribute('class' , 'lyteSelectorHandles lyteBLCorner')
              tEdge.setAttribute('class' , 'lyteSelectorHandles lyteTEdge')
              bEdge.setAttribute('class' , 'lyteSelectorHandles lyteBEdge')
              rEdge.setAttribute('class' , 'lyteSelectorHandles lyteREdge')
              lEdge.setAttribute('class' , 'lyteSelectorHandles lyteLEdge')

              deleteBtn.setAttribute('class' , 'lyteSelectorDeleteBtn')
              workArea.setAttribute('class' , 'lyteSelectorWorkArea')

              selectorLabelTop.setAttribute('class' , 'lyteSelectorLabel')
              selectorLabelBottom.setAttribute('class' , 'lyteSelectorLabel')

              onBeforeCreate(dummyDiv)

              dummyDiv.appendChild(tlCorner)
              dummyDiv.appendChild(trCorner)
              dummyDiv.appendChild(brCorner)
              dummyDiv.appendChild(blCorner)
              dummyDiv.appendChild(tEdge)
              dummyDiv.appendChild(bEdge)
              dummyDiv.appendChild(rEdge)
              dummyDiv.appendChild(lEdge)
              dummyDiv.appendChild(deleteBtn)
              dummyDiv.appendChild(workArea)

              dummyDiv.appendChild(selectorLabelTop)
              dummyDiv.appendChild(selectorLabelBottom)


              if(selections[i].borderColor){
                dummyDiv.style.borderColor = selections[i].borderColor;
              }

              if(selections[i].dataLabel){
                selectorLabelTop.classList.add('lyteSelectorLabelTop')
                selectorLabelBottom.classList.add('lyteSelectorLabelBottom')
                selectorLabelTop.classList.add(selections[i].dataLabel[0].className)
                selectorLabelBottom.classList.add(selections[i].dataLabel[1].className)
                selectorLabelTop.innerText = selections[i].dataLabel[0].label;
                selectorLabelBottom.innerText = selections[i].dataLabel[1].label;
              }

              wrapperDiv.appendChild(dummyDiv)

              var ar = imageTag.naturalWidth / imageTag.getBoundingClientRect().width;

              $L(parentDiv).find('.'+currentClass)[0].style.width = selections[i].width / ar + "px";
              $L(parentDiv).find('.'+currentClass)[0].style.height = selections[i].height / ar + "px";
              $L(parentDiv).find('.'+currentClass)[0].style.top = selections[i].top / ar + "px";
              $L(parentDiv).find('.'+currentClass)[0].style.left = selections[i].left / ar + "px";

              $L(parentDiv).find('.'+currentClass)[0].style.backgroundImage = "url('"+ imageTag.src +"')"
              $L(parentDiv).find('.'+currentClass)[0].style.backgroundPosition = (-($L(parentDiv).find('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L(parentDiv).find('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
              $L(parentDiv).find('.'+currentClass)[0].style.backgroundSize = imageTag.getBoundingClientRect().width + "px " + imageTag.getBoundingClientRect().height + "px";
              $L(parentDiv).find('.'+currentClass)[0].style.backgroundRepeat = "no-repeat";

              onCreate(dummyDiv)
              if(updateMaxCount){
                maxCount += 1;
              }

            }

          }
        }

        if(!selections.classAttr){
          selections.classAttr = ""
        }

      }
    }

    var mainFun = function(){

      var imgDim = imageTag.getBoundingClientRect()

      imageTop = imgDim.top;
      imageLeft = imgDim.left;
      imageRight = imgDim.left + imgDim.width;
      imageBottom = imgDim.top + imgDim.height;
      imageHeight = imgDim.height;
      imageWidth = imgDim.width;

      event.preventDefault();

      if((event.target.nodeName === 'IMG')||(event.target.className === 'lyteSelectionFreezeLayer')){

        currentX = event.clientX;
        currentY = event.clientY;

        if((!selectionArray) || (selectionArray.length < 1)){
          selectionArray = [];
          selectionArray.push('lyteSelector1')
          currentClass = 'lyteSelector1'
          $L(imageTagOriginal).data('classes' , selectionArray)
          // getSelectedData();
        } else {
          if(selections && ($L(parentDiv).find('.lyteSelectionBox').length < maxCount)){
            var arr = $L(imageTagOriginal).data('classes');
            var regex = /\d+/g
            var test = parseInt(arr[arr.length-1].match( regex )[0])
            test +=1
            var newClass = arr[arr.length-1].replace(regex , test);
            selectionArray.push(newClass)
            currentClass = newClass
            $L(imageTagOriginal).data('classes' , selectionArray)
          }
        }
        var createSelec = createSelection()

        if(createSelec){
          return;
        }
        document.addEventListener('mousemove' , setDim);
        
      } else if($L(event.target).hasClass('lyteSelectionBox')) {

        onDragStart();

        // Move selection function

        currentX = event.clientX;
        currentY = event.clientY;

        if($L(parentDiv).find('.lyteSelectorActiveBox')[0]){
          $L(parentDiv).find('.lyteSelectorActiveBox')[0].classList.remove('lyteSelectorActiveBox');
        }

        var elem = event.target;
        elem.classList.add('lyteSelectorActiveBox')
        prevLeft = elem.getBoundingClientRect().left;
        prevTop = elem.getBoundingClientRect().top;
        prevRight = elem.getBoundingClientRect().left+elem.getBoundingClientRect().width;
        prevBottom = elem.getBoundingClientRect().top + elem.getBoundingClientRect().height;

        $L(elem).data().previousDim = {
          left : prevLeft,
          top : prevTop,
          right : prevRight,
          bottom : prevBottom,
          width : elem.getBoundingClientRect().width-2,
          height : elem.getBoundingClientRect().height-2
        }
        
        document.addEventListener('mousemove' , moveSelection);


      } else if($L(event.target).hasClass('lyteSelectorHandles')){

        onResizeStart();


        var acele = $L(parentDiv).find('.lyteSelectorActiveBox')[0]; // ACTIVE ELEMENT acele

        var currentHold = event.target.className.split(' ');
        currentHandle = currentHold[1];

        currentX = event.clientX;
        currentY = event.clientY;

        rpLeft = acele.getBoundingClientRect().left;
        rpTop = acele.getBoundingClientRect().top;
        rpBottom = acele.getBoundingClientRect().top + acele.getBoundingClientRect().height;
        rpRight = acele.getBoundingClientRect().left + acele.getBoundingClientRect().width;

        rpWidth = acele.getBoundingClientRect().width;
        rpHeight = acele.getBoundingClientRect().height;

        $L(acele).data().previousDim = {
          left : rpLeft,
          top : rpTop,
          right : rpRight,
          bottom : rpBottom,
          width : rpWidth-2,
          height : rpHeight-2
        }

        document.addEventListener('mousemove' , resizeSelectionBox);

      } else if($L(event.target).hasClass('lyteSelectorDeleteBtn')){

        deleteOne();

      }



    }

    parentDiv.mousedownFun = mainFun
    parentDiv.addEventListener('mousedown' , parentDiv.mousedownFun)

    function createSelection(){

      var div = document.createElement('DIV');
      div.setAttribute('class' , currentClass);
      div.classList.add('lyteSelectionBox');

      if(!$L(parentDiv).find('.lyteSelectorBackImage')[0]){
        wrapperDiv.appendChild(imageTag);
        imageTag.style.height = imageTagOriginal.getBoundingClientRect().height + "px";
        imageTag.style.width = imageTagOriginal.getBoundingClientRect().width + "px";

        imageTagOriginal.style.display = "none"
      }

      if($L(parentDiv).find('.lyteSelectionBox').length+1 > maxCount){
        onSelectionLimitReached()
        return true;
      }


      var tlCorner = document.createElement('DIV');
      var trCorner = document.createElement('DIV');
      var brCorner = document.createElement('DIV');
      var blCorner = document.createElement('DIV');

      var tEdge = document.createElement('DIV');
      var bEdge = document.createElement('DIV');
      var rEdge = document.createElement('DIV');
      var lEdge = document.createElement('DIV');

      var deleteBtn = document.createElement('DIV');
      var workArea = document.createElement('DIV');

      var selectorLabelTop = document.createElement('DIV');
      var selectorLabelBottom = document.createElement('DIV');
      tlCorner.setAttribute('class' , 'lyteSelectorHandles lyteTLCorner')
      trCorner.setAttribute('class' , 'lyteSelectorHandles lyteTRCorner')
      brCorner.setAttribute('class' , 'lyteSelectorHandles lyteBRCorner')
      blCorner.setAttribute('class' , 'lyteSelectorHandles lyteBLCorner')
      tEdge.setAttribute('class' , 'lyteSelectorHandles lyteTEdge')
      bEdge.setAttribute('class' , 'lyteSelectorHandles lyteBEdge')
      rEdge.setAttribute('class' , 'lyteSelectorHandles lyteREdge')
      lEdge.setAttribute('class' , 'lyteSelectorHandles lyteLEdge')

      selectorLabelTop.setAttribute('class' , 'lyteSelectorLabel')
      selectorLabelBottom.setAttribute('class' , 'lyteSelectorLabel')

      deleteBtn.setAttribute('class' , 'lyteSelectorDeleteBtn')
      workArea.setAttribute('class' , 'lyteSelectorWorkArea')

      onBeforeCreate(div)

      div.appendChild(tlCorner)
      div.appendChild(trCorner)
      div.appendChild(brCorner)
      div.appendChild(blCorner)
      div.appendChild(tEdge)
      div.appendChild(bEdge)
      div.appendChild(rEdge)
      div.appendChild(lEdge)

      div.appendChild(selectorLabelTop)
      div.appendChild(selectorLabelBottom)
      if($L(parentDiv).find('.lyteSelectionBox').length >= maxCount){
        document.removeEventListener('mousemove' , setDim);
        onSelectionLimitReached()
        return
      }
      wrapperDiv.appendChild(div)

      if(!$L(parentDiv).find('.lyteSelectionWrapperBox')[0]){
        wrapperDiv.setAttribute('class' , 'lyteSelectionWrapperBox');
        parentDiv.appendChild(wrapperDiv);
        wrapperDiv.style.height = imageTag.getBoundingClientRect().height+"px";
        wrapperDiv.style.width = imageTag.getBoundingClientRect().width+"px";
      }


      if($L(parentDiv).find('.lyteSelectorActiveBox')[0]){
        $L(parentDiv).find('.lyteSelectorActiveBox')[0].classList.remove('lyteSelectorActiveBox');
      }

      if(!($L(div).hasClass('lyteSelectorActiveBox'))){
        div.classList.add('lyteSelectorActiveBox');
      }

      if(!($L(parentDiv).find('.lyteSelectionFreezeLayer')[0])){
        var freezeLayer = document.createElement('DIV');
        freezeLayer.setAttribute('class' , 'lyteSelectionFreezeLayer');
        wrapperDiv.appendChild(freezeLayer);
        freezeLayer.style.height = imageTag.getBoundingClientRect().height + "px";
        freezeLayer.style.top = 0 + "px";
        freezeLayer.style.width = imageTag.getBoundingClientRect().width + "px";
      }

      $L(parentDiv).find('.'+currentClass)[0].style.backgroundImage = "url('"+ imageTag.src +"')"
      $L(parentDiv).find('.'+currentClass)[0].style.backgroundPosition = (-($L(parentDiv).find('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L(parentDiv).find('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
      $L(parentDiv).find('.'+currentClass)[0].style.backgroundSize = imageTag.getBoundingClientRect().width + "px " + imageTag.getBoundingClientRect().height + "px";
      $L(parentDiv).find('.'+currentClass)[0].style.backgroundRepeat = "no-repeat";

      document.addEventListener('mouseup' , removeEve)

      function removeEve(event){
        if(updateMaxCount){
          maxCount+=1;
        }
        document.removeEventListener('mousemove' , setDim);
        document.removeEventListener('mouseup' , removeEve);
        document.removeEventListener('mousedown' , parentDiv.mousedownFun);
        var currentDiv = $L(parentDiv).find('.'+currentClass)[0]
        if(currentDiv){
          if((currentDiv.getBoundingClientRect().width<imageMinWidth)||(currentDiv.getBoundingClientRect().height<imageMinHeight)){
            currentDiv.style.width = imageMinWidth + 'px';
            currentDiv.style.height = imageMinHeight + 'px';
            if(currentY + imageMinHeight > (imageTag.getBoundingClientRect().top+imageTag.getBoundingClientRect().height)){
              currentDiv.style.top = (imageTag.getBoundingClientRect().bottom - imageTag.getBoundingClientRect().top) - imageMinHeight - 2 +'px';
            } else {
              currentDiv.style.top = currentY - (imageMinHeight/2) - imageTag.getBoundingClientRect().top+'px';
            }
            if(currentX + imageMinWidth > (imageTag.getBoundingClientRect().left+imageTag.getBoundingClientRect().width)){
              currentDiv.style.left = (imageTag.getBoundingClientRect().right - imageTag.getBoundingClientRect().left) - imageMinWidth - 2 +'px';
            } else {
              currentDiv.style.left = currentX - (imageMinWidth/2) -imageTag.getBoundingClientRect().left+'px';
            }
            currentDiv.style.backgroundImage = "url('"+ imageTag.src +"')"
            currentDiv.style.backgroundPosition = (-(currentDiv.getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-(currentDiv.getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
            currentDiv.style.backgroundSize = imageTag.getBoundingClientRect().width + "px " + imageTag.getBoundingClientRect().height + "px";
            currentDiv.style.backgroundRepeat = "no-repeat";
          }
        }
        div.appendChild(deleteBtn)
        div.appendChild(workArea)

        if(selections.preventOverlap){
          deleteOverlap()
          if(updateMaxCount){
            maxCount-=1
          }
        }

        onCreate(div)

      }

    }

    function deleteOverlap(node){
      var boxes = $L(parentDiv).find('.lyteSelectionBox')
      var remTotal = boxes.length;
      var newClasses = []
      $L(imageTagOriginal).data('classes' , [])
      for(var i=0;i<remTotal;i++){
        if(!$L(boxes[i]).attr(selections.classAttr)){
          $L(boxes[i]).addClass('lyteSelector'+(i+1)+' lyteSelectionBox '+selections.classList)  
        } else {
          $L(boxes[i]).addClass('lyteSelector'+(i+1)+' lyteSelectionBox '+selections.classList+' '+$L(boxes[i]).attr(selections.classAttr))
        }
        newClasses.push('lyteSelector'+(i+1))
        if(i+1 === remTotal){
          $L(boxes[i]).addClass('lyteSelectorActiveBox')
        }
      }
      $L(imageTagOriginal).data('classes',newClasses)

      var arr = $L(imageTagOriginal).data('classes');
      var regex = /\d+/g
      var test = parseInt(arr[arr.length-1].match( regex )[0])
      var totalSelections = $L(imageTagOriginal).data().lyteSelector.getData().imageSelections
      var currentCreatedBox = totalSelections[test-1]
      var currentRight = currentCreatedBox.left + currentCreatedBox.width
      var currentLeft = currentCreatedBox.left
      var currentTop = currentCreatedBox.top
      var currentBottom = currentCreatedBox.top + currentCreatedBox.height
      var imageDatas = $L(imageTagOriginal).data().lyteSelector

      if(totalSelections.length > 1){

        var mouseleavexpos = event.clientX - imageTag.getBoundingClientRect().left
        var mouseleaveypos = event.clientY - imageTag.getBoundingClientRect().top
        var flag = 0;

        for(var i=0;i<totalSelections.length;i++){

          if(
            ((currentRight > totalSelections[i].left) && ((currentRight < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentBottom > totalSelections[i].top) && ((currentBottom < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft < totalSelections[i].left) && ((currentRight > (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentBottom > totalSelections[i].top) && ((currentBottom < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft < totalSelections[i].left) && ((currentRight > (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop < totalSelections[i].top) && ((currentBottom > (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft > totalSelections[i].left) && ((currentLeft < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop < totalSelections[i].top) && ((currentBottom > (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentRight > totalSelections[i].left) && ((currentRight < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop < totalSelections[i].top) && ((currentBottom > (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft < totalSelections[i].left) && ((currentRight > (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop > totalSelections[i].top) && ((currentTop < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentRight > totalSelections[i].left) && ((currentRight < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop > totalSelections[i].top) && ((currentTop < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft > totalSelections[i].left) && ((currentLeft < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop > totalSelections[i].top) && ((currentTop < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft > totalSelections[i].left) && ((currentLeft < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentBottom > totalSelections[i].top) && ((currentBottom < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(flag){
            imageDatas.deleteSelection("."+currentClass)
            onOverlap()
            i = totalSelections.length
          }

        }

      }
    }

    function deleteOverlapMove(){

      var totalSelections = $L(imageTagOriginal).data().lyteSelector.getData().imageSelections

      var oldplace = $L(parentDiv).find('.lyteSelectorActiveBox').data().previousDim

      var currentCreatedBox = $L(parentDiv).find('.lyteSelectorActiveBox')[0]
      var currentRight = (currentCreatedBox.getBoundingClientRect().left + currentCreatedBox.getBoundingClientRect().width) - imageTag.getBoundingClientRect().left;
      var currentLeft = currentCreatedBox.getBoundingClientRect().left - imageTag.getBoundingClientRect().left;
      var currentTop = currentCreatedBox.getBoundingClientRect().top - imageTag.getBoundingClientRect().top;
      var currentBottom = (currentCreatedBox.getBoundingClientRect().top + currentCreatedBox.getBoundingClientRect().height) - imageTag.getBoundingClientRect().top;
      var imageDatas = $L(imageTagOriginal).data().lyteSelector


      if(totalSelections.length > 1){

        var mouseleavexpos = event.clientX - imageTag.getBoundingClientRect().left
        var mouseleaveypos = event.clientY - imageTag.getBoundingClientRect().top
        var flag = 0;

        for(var i=0;i<totalSelections.length;i++){

          if(
            ((currentRight > totalSelections[i].left) && ((currentRight < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentBottom > totalSelections[i].top) && ((currentBottom < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft < totalSelections[i].left) && ((currentRight > (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentBottom > totalSelections[i].top) && ((currentBottom < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft < totalSelections[i].left) && ((currentRight > (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop < totalSelections[i].top) && ((currentBottom > (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft > totalSelections[i].left) && ((currentLeft < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop < totalSelections[i].top) && ((currentBottom > (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentRight > totalSelections[i].left) && ((currentRight < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop < totalSelections[i].top) && ((currentBottom > (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft < totalSelections[i].left) && ((currentRight > (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop > totalSelections[i].top) && ((currentTop < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentRight > totalSelections[i].left) && ((currentRight < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop > totalSelections[i].top) && ((currentTop < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft > totalSelections[i].left) && ((currentLeft < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentTop > totalSelections[i].top) && ((currentTop < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(
            ((currentLeft > totalSelections[i].left) && ((currentLeft < (totalSelections[i].left+totalSelections[i].width)))) &&
            ((currentBottom > totalSelections[i].top) && ((currentBottom < (totalSelections[i].top+totalSelections[i].height))))
          ){
            flag = 1;
          }

          if(flag){
            currentCreatedBox.style.left = (oldplace.left - imageTag.getBoundingClientRect().left) +"px"
            currentCreatedBox.style.top = (oldplace.top - imageTag.getBoundingClientRect().top) +"px"
            currentCreatedBox.style.width = oldplace.width +"px"
            currentCreatedBox.style.height = oldplace.height +"px"
            currentCreatedBox.style.backgroundPosition = (-(currentCreatedBox.getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-(currentCreatedBox.getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
            onOverlap()
            i = totalSelections.length
          }

        }

      }

    }

    function setDim(){

      var xChange = currentX - event.clientX;
      var yChange = currentY - event.clientY;
      if(xChange < 0){
        $L(parentDiv).find('.'+currentClass)[0].style.left = currentX - imageTag.getBoundingClientRect().left + 'px'
      } else {
        $L(parentDiv).find('.'+currentClass)[0].style.left = event.clientX - imageTag.getBoundingClientRect().left + 'px'
      }
      if(yChange < 0){
        $L(parentDiv).find('.'+currentClass)[0].style.top = currentY - imageTag.getBoundingClientRect().top + 'px'
      } else {
        $L(parentDiv).find('.'+currentClass)[0].style.top = event.clientY - imageTag.getBoundingClientRect().top + 'px'
      }


      $L(parentDiv).find('.'+currentClass)[0].style.width = Math.abs(xChange) + 'px'
      $L(parentDiv).find('.'+currentClass)[0].style.height = Math.abs(yChange) + 'px'

      if(event.clientX <= imageTag.getBoundingClientRect().left ){

        $L(parentDiv).find('.'+currentClass)[0].style.left = '0px';
        $L(parentDiv).find('.'+currentClass)[0].style.width = currentX - imageTag.getBoundingClientRect().left + 'px';

      }

      if(event.clientY <= imageTag.getBoundingClientRect().top ){

        $L(parentDiv).find('.'+currentClass)[0].style.top = '0px';
        $L(parentDiv).find('.'+currentClass)[0].style.height = currentY - imageTag.getBoundingClientRect().top + 'px';

      }

      if(event.clientX >= (imageTag.getBoundingClientRect().left + imageTag.getBoundingClientRect().width)){

        $L(parentDiv).find('.'+currentClass)[0].style.width = ( ( imageTag.getBoundingClientRect().left +  imageTag.getBoundingClientRect().width ) - currentX) + 'px';

      }

      if(event.clientY >= (imageTag.getBoundingClientRect().top + imageTag.getBoundingClientRect().height) ){

        $L(parentDiv).find('.'+currentClass)[0].style.height = ( (imageTag.getBoundingClientRect().top + imageTag.getBoundingClientRect().height) - currentY) + 'px';

      }

      $L(parentDiv).find('.'+currentClass)[0].style.backgroundPosition = (-($L(parentDiv).find('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L(parentDiv).find('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"

    }

    function moveSelection(){


      var leftVal = prevLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left;
      var topVal = prevTop - (currentY - event.clientY) - imageTag.getBoundingClientRect().top

      if(leftVal < 0){

        leftVal = 0;

      }

      if(topVal < 0){

        topVal = 0;

      }

      if((leftVal + $L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().width) >= imageTag.getBoundingClientRect().width){

        leftVal = imageTag.getBoundingClientRect().width - $L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().width

      }

      if((topVal + $L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().height) >= imageTag.getBoundingClientRect().height){

        topVal = imageTag.getBoundingClientRect().height - $L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().height

      }

      $L(parentDiv).find('.lyteSelectorActiveBox')[0].style.left = leftVal + "px";
      $L(parentDiv).find('.lyteSelectorActiveBox')[0].style.top = topVal + "px";

      $L(parentDiv).find('.lyteSelectorActiveBox')[0].style.backgroundPosition = (-($L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"


      document.addEventListener('mouseup' , removeMoveEve)


    }

    function removeMoveEve(){
      if(selections.preventOverlap){
        deleteOverlapMove()
      }

      onDragEnd();
      document.removeEventListener('mousemove' , moveSelection);
      document.removeEventListener('mouseup' , removeMoveEve);
      document.removeEventListener('mousedown' , parentDiv.mousedownFun);
    }

    function resizeSelectionBox(event){


      var th = $L(parentDiv).find('.lyteSelectorActiveBox')[0];

      switch (currentHandle) {

        case 'lyteTLCorner':
        th.style.height = rpHeight + (currentY - event.clientY) - 2 + "px";
        th.style.top = rpTop - (currentY - event.clientY) - imageTag.getBoundingClientRect().top + "px";
        th.style.width = rpWidth + (currentX - event.clientX) - 2 + "px";
        th.style.left = rpLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left + "px";

        if(event.clientX <= imageLeft){
          th.style.width = rpRight - imageLeft - 2 + "px";
          th.style.left = imageLeft - imageTag.getBoundingClientRect().left + "px";
        }
        if(event.clientX >= rpRight){
          th.style.width = "1px";
          th.style.left = rpRight-3 - imageTag.getBoundingClientRect().left + "px";
        }
        if(event.clientY <= imageTop){
          th.style.height = rpBottom - imageTop - 2 + "px";
          th.style.top = imageTop - imageTag.getBoundingClientRect().top + "px";
        }
        if(event.clientY >= rpBottom){
          th.style.height = "1px";
          th.style.top = rpBottom-3 - imageTag.getBoundingClientRect().top + "px";
        }

        if((rpHeight + (currentY - event.clientY) - 2) <= imageMinHeight){
          th.style.height = imageMinHeight + "px";
          th.style.top = rpBottom - 2 - imageTag.getBoundingClientRect().top - imageMinHeight + "px";
        }

        if((rpWidth + (currentX - event.clientX) - 2) <= imageMinWidth){
          th.style.width = imageMinWidth + "px";
          th.style.left = rpRight - 2 - imageTag.getBoundingClientRect().left - imageMinWidth + "px";
        }

        break;
        case 'lyteTRCorner':
        th.style.height = rpHeight + (currentY - event.clientY) - 2 + "px";
        th.style.top = rpTop - (currentY - event.clientY) - imageTag.getBoundingClientRect().top + "px";
        th.style.width = rpWidth - (currentX - event.clientX) - 2 + "px";
        if(event.clientY <= imageTop){
          th.style.height = rpBottom - imageTop - 2 + "px";
          th.style.top = imageTop - imageTag.getBoundingClientRect().top + "px";
        }
        if(event.clientY >= rpBottom){
          th.style.height = "1px";
          th.style.top = rpBottom-3 - imageTag.getBoundingClientRect().top + "px";
        }
        if(event.clientX >= imageRight){
          th.style.width = imageRight - rpLeft + "px"
        }
        if(event.clientX <= rpLeft){
          th.style.width = "1px";
        }

        if((rpHeight + (currentY - event.clientY) - 2) <= imageMinHeight){
          th.style.height = imageMinHeight + "px";
          th.style.top = rpBottom - 2 - imageTag.getBoundingClientRect().top - imageMinHeight + "px";
        }
        if((rpWidth - (currentX - event.clientX)) <= imageMinWidth){
          th.style.width = imageMinWidth + "px";
        }

        break;


        case 'lyteBRCorner':
        th.style.width = rpWidth - (currentX - event.clientX) - 2 + "px";
        th.style.height = rpHeight - (currentY - event.clientY) - 2 + "px";
        if(event.clientY >= imageBottom){
          th.style.height = imageBottom - rpTop + "px";
        }
        if(event.clientY <= rpTop){
          th.style.height = '1px'
        }
        if(event.clientX >= imageRight){
          th.style.width = imageRight - rpLeft + "px"
        }
        if(event.clientX <= rpLeft){
          th.style.width = "1px";
        }

        if((rpHeight - (currentY - event.clientY)) <= imageMinHeight){
          th.style.height = imageMinHeight + "px";
        }

        if((rpWidth - (currentX - event.clientX)) <= imageMinWidth){
          th.style.width = imageMinWidth + "px";
        }

        break;
        case 'lyteBLCorner':
        th.style.width = rpWidth + (currentX - event.clientX) - 2 + "px";
        th.style.left = rpLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left + "px";
        th.style.height = rpHeight - (currentY - event.clientY) + "px";
        if(event.clientX <= imageLeft){
          th.style.width = rpRight - imageLeft - 2 + "px";
          th.style.left = imageLeft - imageTag.getBoundingClientRect().left + "px";
        }
        if(event.clientX >= rpRight){
          th.style.width = "1px";
          th.style.left = rpRight-3 - imageTag.getBoundingClientRect().left + "px";
        }

        if(event.clientY >= imageBottom){
          th.style.height = imageBottom - rpTop + "px";
        }
        if(event.clientY <= rpTop){
          th.style.height = '1px'
        }

        if((rpHeight - (currentY - event.clientY)) <= imageMinHeight){
          th.style.height = imageMinHeight + "px";
        }
        if((rpWidth + (currentX - event.clientX) - 2) <= imageMinWidth){
          th.style.width = imageMinWidth + "px";
          th.style.left = rpRight - 2 - imageTag.getBoundingClientRect().left - imageMinWidth + "px";
        }

        break;
        case 'lyteTEdge':
        th.style.height = rpHeight + (currentY - event.clientY) - 2 + "px";
        th.style.top = rpTop - imageTag.getBoundingClientRect().top - (currentY - event.clientY) + "px";

        if(event.clientY <= imageTop){
          th.style.height = rpBottom - imageTop - 2 + "px";
          th.style.top = imageTop - imageTag.getBoundingClientRect().top + "px";
        }
        if(event.clientY >= rpBottom){
          th.style.height = "1px";
          th.style.top = rpBottom-3 - imageTag.getBoundingClientRect().top + "px";
        }

        if((rpHeight + (currentY - event.clientY) - 2) <= imageMinHeight){
          th.style.height = imageMinHeight + "px";
          th.style.top = rpBottom - 2 - imageTag.getBoundingClientRect().top - imageMinHeight + "px";
        }

        break;
        case 'lyteBEdge':
        th.style.height = rpHeight - (currentY - event.clientY) + "px";
        if(event.clientY >= imageBottom){
          th.style.height = imageBottom - rpTop + "px";
        }
        if(event.clientY <= rpTop){
          th.style.height = '1px'
        }
        if((rpHeight - (currentY - event.clientY)) <= imageMinHeight){
          th.style.height = imageMinHeight + "px";
        }
        break;

        case 'lyteREdge':
        th.style.width = rpWidth - (currentX - event.clientX) + "px";
        if(event.clientX >= imageRight){
          th.style.width = imageRight - rpLeft + "px"
        }
        if(event.clientX <= rpLeft){
          th.style.width = "1px";
        }
        if((rpWidth - (currentX - event.clientX)) <= imageMinWidth){
          th.style.width = imageMinWidth + "px";
        }
        break;
        case 'lyteLEdge':

        th.style.width = rpWidth + (currentX - event.clientX) - 2 + "px";
        th.style.left = rpLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left + "px";

        if(event.clientX <= imageLeft){
          th.style.width = rpRight - imageLeft - 2 + "px";
          th.style.left = imageLeft - imageTag.getBoundingClientRect().left + "px";
        }
        if(event.clientX >= rpRight){
          th.style.width = "1px";
          th.style.left = rpRight-3 - imageTag.getBoundingClientRect().left + "px";
        }

        if((rpWidth + (currentX - event.clientX) - 2) <= imageMinWidth){
          th.style.width = imageMinWidth + "px";
          th.style.left = rpRight - 2 - imageTag.getBoundingClientRect().left - imageMinWidth + "px";
        }

        break;

      }

      $L(parentDiv).find('.lyteSelectorActiveBox')[0].style.backgroundPosition = (-($L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L(parentDiv).find('.lyteSelectorActiveBox')[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"

      document.addEventListener('mouseup' , removeReEve)

    }

    function removeReEve(){
      if(selections.preventOverlap){
        deleteOverlapMove()
      }
      onResizeEnd()
      document.removeEventListener('mousemove' , resizeSelectionBox)
      document.removeEventListener('mouseup' , removeReEve)
      document.removeEventListener('mousedown' , parentDiv.mousedownFun);
    }

    function deleteOne(nodeToDelete){

      if(updateMaxCount){
        maxCount -= 1;
      }


      if(event){
        event.preventDefault();
      }

      onDeleteOne()

      if(nodeToDelete){
        delElem = $L(parentDiv).find(nodeToDelete)[0];
      } else {
        delElem = $L(parentDiv).find('.lyteSelectorActiveBox')[0];
      }

      if(!delElem){
        return
      }

      wrapperDiv.removeChild(delElem);

      var currentElemArr = $L(imageTagOriginal).data('classes');
      var delElemClass = delElem.classList[0];

      currentElemArr.splice( currentElemArr.indexOf(delElemClass) , 1 )

      if(currentElemArr.length < 1){

        wrapperDiv.removeChild($L(parentDiv).find('.lyteSelectionFreezeLayer')[0]);
        selectionArray = [];
        parentDiv.removeChild(wrapperDiv)
        imageTagOriginal.style.display = "block";

      }
      var boxes = $L(parentDiv).find('.lyteSelectionBox')
      var remTotal = boxes.length;
      var newClasses = []
      $L(parentDiv).find('.lyteSelectionBox').attr('class' , '')
      $L(imageTagOriginal).data('classes' , [])
      for(var i=0;i<remTotal;i++){
        if(!$L(boxes[i]).attr(selections.classAttr)){
          $L(boxes[i]).addClass('lyteSelector'+(i+1)+' lyteSelectionBox '+selections.classList)  
        } else {
          $L(boxes[i]).addClass('lyteSelector'+(i+1)+' lyteSelectionBox '+selections.classList+' '+$L(boxes[i]).attr(selections.classAttr))
        }
        // $L(boxes[i]).addClass('lyteSelector'+(i+1)+' lyteSelectionBox '+selections.classList+' '+$L(boxes[i]).attr(selections.classAttr))
        newClasses.push('lyteSelector'+(i+1))
      }
      $L(imageTagOriginal).data('classes',newClasses)

    }

    function getSelectedData(){

      var returnData = {};

      returnData.imageNaturalWidth = imageTag.naturalWidth;
      returnData.imageNaturalHeight = imageTag.naturalHeight;

      returnData.imageWidth = imageTag.getBoundingClientRect().width;
      returnData.imageHeight = imageTag.getBoundingClientRect().height;

      var totalBoxes = $L(parentDiv).find(imageTagOriginal).data('classes').length;
      var classesArr = $L(parentDiv).find(imageTagOriginal).data('classes');
      var imageSelections = [];


      for(var i=0;i<totalBoxes;i++){

        var dummy = {};

        var ratioChange = imageTag.naturalWidth / imageTag.getBoundingClientRect().width;
        dummy.creationIndex = i+1;
        dummy.width = $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().width;
        dummy.height = $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().height;
        dummy.left = $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left;
        dummy.top = $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top;
        dummy.naturalWidth = $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().width * ratioChange;
        dummy.naturalHeight = $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().height * ratioChange;
        dummy.naturalLeft = ( $L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)*ratioChange;
        dummy.naturalTop = ($L(parentDiv).find('.'+classesArr[i])[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)*ratioChange;

        imageSelections.push(dummy);

      }

      returnData.imageSelections = imageSelections;


      return returnData;


    }

    selectionData.getData = function(){

      return getSelectedData()

    }

    selectionData.deleteSelection = function(arg){
      deleteOne(arg)
    }

    selectionData.deleteAll = function (){

      if(updateMaxCount){
        maxCount = 1;
      }

      onDeleteAll();

      var classArr = $L(imageTagOriginal).data().classes;

      for(var i=0;i<classArr.length;i++){
        wrapperDiv.removeChild( $L(parentDiv).find('.'+classArr[i])[0] )
      }

      wrapperDiv.removeChild($L(parentDiv).find('.lyteSelectionFreezeLayer')[0]);
      selectionArray = [];
      currentClass = '';

      parentDiv.removeChild(wrapperDiv)
      imageTagOriginal.style.display = "block";

    }

    $L(parentDiv).find(imageTagOriginal)[0].deleteSelection = function(arg){
      deleteOne(arg)
    }

    $L(parentDiv).find(imageTagOriginal).data('lyteSelector' , selectionData);

  }

}

}());

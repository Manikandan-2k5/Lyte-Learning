;(function(){

    var configurationObjects=[],parentArr=[],globalIdInd=0;

    document.addEventListener('keydown',function(event){ 

        if(isConfigObjsEmpty()){
            return;
        }

        if(event.key==="ArrowUp"){

            let options=findOptions();
            if(options && !options.includes('ArrowUp')){
                return;
            }

            if(!checkForInverse()){
                if(isFocusOnConfigObjs()){
                    event.preventDefault();
                }
                moveToPrevious();     
            }
        }
        else if(event.key==="ArrowDown"){

            let options=findOptions();
            if(options && !options.includes('ArrowDown')){
                return;
            }


            if(!checkForInverse()){
                if(isFocusOnConfigObjs()){
                    event.preventDefault();
                }
                moveToNext();
            }
        }
        else if(event.key==="PageUp"){

            let options=findOptions();
            if(options && !options.includes('PageUp')){
                return;
            }

            if(isFocusOnConfigObjs()){
                event.preventDefault();
            }
            scrollPageUpKey();
        }
        else if(event.key==="PageDown"){

            let options=findOptions();
            if(options && !options.includes('PageDown')){
                return;
            }

            if(isFocusOnConfigObjs()){
                event.preventDefault();
            }
            scrollPageDownKey();
        }
        else if(event.key==="Home"){

            let options=findOptions();
            if(options && !options.includes('Home')){
                return;
            }

            scrollToHomeElement();
        }
        else if(event.key==="End"){

            let options=findOptions();
            if(options && !options.includes('End')){
                return;
            }

            scrollToEndElement();
        }
        else if(event.key=="ArrowLeft"){

            let options=findOptions();
            if(options && !options.includes('ArrowLeft')){
                return;
            }


            if(checkForInverse()){
                if(isFocusOnConfigObjs()){
                    event.preventDefault();
                }
                moveToPrevious();
            }
        }
        else if(event.key=="ArrowRight"){

            let options=findOptions();
            if(options && !options.includes('ArrowRight')){
                return;
            }

            if(checkForInverse()){
                if(isFocusOnConfigObjs()){
                    event.preventDefault();
                }
                moveToNext();
            }
        }
        else if(event.key=="Enter"){
            checkForTriggerProp()
        }

    });

    document.addEventListener('mousemove',function(event){
        if(isConfigObjsEmpty()){
            return;
        }
        moveToEventTarget(event);
    }); 

        
    lyteDomObj.prototype.keyboardNavigator=function(configurationObject){

        if(configurationObject=="destroy"){
            removePlugIn(this[0]);
            return;
        }
        configurationObjects.push(configurationObject);
        parentArr.push(this[0]);
        // let parentBody=this[0];
        let parentBody=document.querySelector(configurationObject.scope);
        var firstElem;
        if(configurationObject.highlightValue){
            firstElem=parentBody.querySelector(configurationObject.highlightValue);
        }
        else{
            let child=configurationObject.child,skipElements=configurationObject.skipElements;
            let listOfChildren= Array.from(parentBody.querySelectorAll(child));
            let elementsToSkip= Array.from(parentBody.querySelectorAll(skipElements));
            firstElem=listOfChildren[0];
            let ind=0;
            while(firstElem!=null && elementsToSkip && elementsToSkip.includes(firstElem)){
                if(ind>=listOfChildren.length){
                    break;
                }
                firstElem=listOfChildren[++ind];
            }
        }
        firstElem.classList.add(configurationObject.selectedClass);
        let focusableElement=document.querySelector(configurationObject.scope);
        focusableElement.setAttribute('aria-controls',configurationObject.scope.slice(1));
        let ariaId=firstElem.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            firstElem.id=ariaId;

        }
        focusableElement.setAttribute('aria-activedescendant',firstElem.id);

    }

    function moveToPrevious(){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,configObj=utilObj.configObj,currentElement=utilObj.currentElement;     
        if(parent===undefined || parent===null ){
            return false;
        }
        let previousElement=findPreviousElement();
        if(previousElement===undefined){
            return;
        }
        let focusableElement=document.querySelector(configObj.scope);
        currentElement.classList.remove(configObj.selectedClass);
        previousElement.classList.add(configObj.selectedClass);
        scrollParentToUp(previousElement);
        let ariaId=previousElement.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            previousElement.id=ariaId

        }
        focusableElement.setAttribute('aria-activedescendant',previousElement.id);
    }

    function moveToNext(){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,configObj=utilObj.configObj,currentElement=utilObj.currentElement;
        if(parent===undefined || parent===null ){
            return false;
        }
        let nextElement=findNextElement();
        if(nextElement===undefined){
            
            return;
        }
        let focusableElement=document.querySelector(configObj.scope);
        currentElement.classList.remove(configObj.selectedClass);
        nextElement.classList.add(configObj.selectedClass);
        scrollParentToDown(nextElement);       
        let ariaId=nextElement.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            nextElement.id=ariaId
        }
        focusableElement.setAttribute('aria-activedescendant',nextElement.id);
    }

    function moveToEventTarget(event){
        let utilObj=findUtilObj(document.activeElement);

        if(!utilObj.configObj || !utilObj.listOfChildren.includes(event.target) ){
            utilObj=findUtilObj(event.target.parentElement);
            let instElement=event.target.parentElement;
            while(utilObj.configObj==null||utilObj.configObj==undefined ){
                if(instElement==null||instElement==undefined||instElement.tagName=="BODY"||instElement.tagName=="HTML"){
                    break;
                }
                utilObj=findUtilObj(instElement=instElement.parentElement);
            }
            if(!utilObj.configObj){
                    return false;
            }
        }
        let parent=utilObj.parent,configObj=utilObj.configObj,listOfChildren=utilObj.listOfChildren,elementsToSkip=utilObj.elementsToSkip,currentElement=utilObj.currentElement,focusableElement;
        if(parent===undefined||parent===null){
            return false;
        }
        focusableElement=document.querySelector(configObj.scope);
        if( !elementsToSkip.includes(event.target) &&
            listOfChildren.includes(event.target)  ){
            currentElement=parent.querySelector('.'+configObj.selectedClass);
            currentElement.classList.remove(configObj.selectedClass);
            event.target.classList.add(configObj.selectedClass);
            let ariaId=event.target.id;
            if(!ariaId){
                ariaId=`LyteHighlightElement_${globalIdInd++}`;
                event.target.id=ariaId;
            }
            focusableElement.setAttribute('aria-activedescendant',event.target.id);
        }
    }

    function removePlugIn(valueToBeRemoved){
        let index=0;
        for(let value of parentArr)
        {
            if(value===valueToBeRemoved)
            {
                parentArr[index]=null;
                configurationObjects[index]=null;
                break;
            }
            index+=1;
        }
    }
    
    function diffOfOffsetScroll(Element){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent;
        return Element.offsetTop+Element.offsetHeight-parent.scrollTop;
    }

    function scrollParentToUp(previousElement){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,configObj=utilObj.configObj;
        let listOfChildren=Array.from(parent.querySelectorAll(configObj.child));
        if(previousElement==listOfChildren[0]){
            parent.scrollTop=0;
            return;
        }
        if(diffOfOffsetScroll(previousElement) <= previousElement.offsetHeight){
            parent.scrollTop -= (previousElement.offsetHeight-diffOfOffsetScroll(previousElement));                    
        }
    }

    function scrollParentToDown(nextElement){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent;
        if(diffOfOffsetScroll(nextElement) >= parent.offsetHeight)
        {
            parent.scrollTop += (diffOfOffsetScroll(nextElement)-parent.offsetHeight);
        }
    }

    function isConfigObjsEmpty(){

        if(configurationObjects.length===0){
            return true;
        }
    }

    function isFocusOnConfigObjs(){
        
        for(let x of parentArr)
        {
            if(x==document.activeElement||x==document.activeElement.parentElement){
                return true;
            }
        }
        return false;
    }

    function findPreviousElement(){

        let utilObj=findUtilObj(document.activeElement);
        let configObj=utilObj.configObj,listOfChildren=utilObj.listOfChildren,elementsToSkip=utilObj.elementsToSkip,currentElement=utilObj.currentElement,previousElement;
        let currentElementIndex=listOfChildren.indexOf(currentElement);
        if(currentElementIndex>0 && currentElementIndex<listOfChildren.length){
             previousElement=listOfChildren[--currentElementIndex];
        }
        else if(currentElementIndex==0 && configObj.ifCycle===true)
        {
            previousElement=scrollToLastElement();
        }
        if(previousElement){
            while(previousElement!=null && elementsToSkip &&elementsToSkip.includes(previousElement)){
                previousElement=listOfChildren[--currentElementIndex];
            }
        }
        return previousElement;
    }

    function findNextElement(){
    
        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,configObj=utilObj.configObj,listOfChildren=utilObj.listOfChildren,elementsToSkip=utilObj.elementsToSkip,currentElement=utilObj.currentElement,nextElement;
        let currentElementIndex=listOfChildren.indexOf(currentElement);
        if(currentElementIndex>=0 && currentElementIndex<listOfChildren.length-1) {
             nextElement=listOfChildren[++currentElementIndex];
        }
         else if(currentElementIndex==listOfChildren.length-1 && configObj.ifCycle===true)
         {
            nextElement=scrollToFirstElement();
         }
        if(nextElement){
                while(nextElement!=null && elementsToSkip &&elementsToSkip.includes(nextElement)){
                    nextElement=listOfChildren[++currentElementIndex];
                }
        }
        return nextElement;
    }

    function findUtilObj(elementToCheck){
        let index=0,parent,configObj;
        for(let value of parentArr){
                if(elementToCheck && (elementToCheck === value ||
                     (elementToCheck.parentElement /*&& elementToCheck.parentElement.nodeName!=="BODY"*/ 
                        && elementToCheck.parentElement === value ))){        
                        parent=value;
                        configObj=configurationObjects[index];
                        break;
                }
                index+=1;
        }
        let listOfChildren,elementsToSkip,currentElement;
        if(parent!=undefined) {
            if(configObj){
                parent=document.querySelector(configObj.scope);
                listOfChildren= Array.from(parent.querySelectorAll(configObj.child));
                elementsToSkip= Array.from(parent.querySelectorAll(configObj.skipElements));
                currentElement= parent.querySelector('.'+configObj.selectedClass);
                if(!currentElement){
                    listOfChildren[0].classList.add(configObj.selectedClass);
                    currentElement= parent.querySelector('.'+configObj.selectedClass);
                }
            }
        }
       
        return {
            parent: parent,
            configObj: configObj,
            listOfChildren: listOfChildren,
            elementsToSkip: elementsToSkip,
            currentElement: currentElement
        };
    }

    function scrollToLastElement(){
        
        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,listOfChildren=utilObj.listOfChildren;
        let previousElement=listOfChildren[listOfChildren.length-1];
        parent.scrollTop=previousElement.offsetHeight*listOfChildren.length;
        return previousElement; 
            
    }

    function scrollToFirstElement(){
        
        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,listOfChildren=utilObj.listOfChildren;
        let nextElement=listOfChildren[0];
        parent.scrollTop=0;
        return nextElement;
    }
    function scrollPageDownKey(){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,listOfChildren=utilObj.listOfChildren,currentElement=utilObj.currentElement;
        let configObj=utilObj.configObj,elementsToSkip=utilObj.elementsToSkip;
        let currentElementIndex=listOfChildren.indexOf(currentElement),nextElement;
        let focusableElement=document.querySelector(configObj.scope);

        if(currentElementIndex<Math.floor(listOfChildren.length/2) && currentElementIndex>=0){
            nextElement=listOfChildren[Math.floor((listOfChildren.length)/2)];
        }
        else if(currentElementIndex>=Math.floor(listOfChildren.length/2) && currentElementIndex<listOfChildren.length){
            nextElement=listOfChildren[listOfChildren.length-1];
        }
        currentElementIndex=listOfChildren.indexOf(nextElement);
        if(nextElement){
            while(nextElement!=null && elementsToSkip &&elementsToSkip.includes(nextElement)){
                nextElement=listOfChildren[++currentElementIndex];
            }
        }
        currentElement.classList.remove(configObj.selectedClass);
        nextElement.classList.add(configObj.selectedClass);    
        parent.scrollTop=nextElement.offsetTop; 
        let ariaId=nextElement.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            nextElement.id=ariaId

        }
        focusableElement.setAttribute('aria-activedescendant',nextElement.id);

    }
    function scrollPageUpKey(){
        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,listOfChildren=utilObj.listOfChildren,currentElement=utilObj.currentElement;
        let configObj=utilObj.configObj,elementsToSkip=utilObj.elementsToSkip;
        let currentElementIndex=listOfChildren.indexOf(currentElement),previousElement;
        let focusableElement=document.querySelector(configObj.scope);
        
        if(currentElementIndex>Math.floor(listOfChildren.length/2) && currentElementIndex<listOfChildren.length){
            previousElement=listOfChildren[Math.floor((listOfChildren.length)/2)];
        }
        else if(currentElementIndex<=Math.floor(listOfChildren.length/2) && currentElementIndex>=0){
            previousElement=listOfChildren[0];
            currentElementIndex=0;
            while(previousElement==null || elementsToSkip &&elementsToSkip.includes(previousElement)){
                previousElement=listOfChildren[++currentElementIndex];
            }
        }
        currentElementIndex=listOfChildren.indexOf(previousElement);
        if(previousElement){
            while(previousElement!=null && elementsToSkip &&elementsToSkip.includes(previousElement)){
                previousElement=listOfChildren[--currentElementIndex];
            }
        }
        currentElement.classList.remove(configObj.selectedClass);
        previousElement.classList.add(configObj.selectedClass);    
        parent.scrollTop=previousElement.offsetTop; 
        let ariaId=previousElement.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            previousElement.id=ariaId

        }
        focusableElement.setAttribute('aria-activedescendant',previousElement.id);
    }

    function scrollToHomeElement(){

        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,listOfChildren=utilObj.listOfChildren,currentElement=utilObj.currentElement;
        let configObj=utilObj.configObj,elementsToSkip=utilObj.elementsToSkip;
        let currentElementIndex=listOfChildren.indexOf(currentElement),previousElement;
        let focusableElement=document.querySelector(configObj.scope);
         previousElement= scrollToFirstElement();
        currentElementIndex=listOfChildren.indexOf(previousElement);
        if(previousElement){
            while(previousElement!=null && elementsToSkip &&elementsToSkip.includes(previousElement)){
                previousElement=listOfChildren[++currentElementIndex];
            }
        }
        currentElement.classList.remove(configObj.selectedClass);
        previousElement.classList.add(configObj.selectedClass);    
        parent.scrollTop=previousElement.offsetTop; 
        let ariaId=previousElement.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            previousElement.id=ariaId;
        }
        focusableElement.setAttribute('aria-activedescendant',previousElement.id);
    }

    function scrollToEndElement(){
        let utilObj=findUtilObj(document.activeElement);
        let parent=utilObj.parent,listOfChildren=utilObj.listOfChildren,currentElement=utilObj.currentElement;
        let configObj=utilObj.configObj,elementsToSkip=utilObj.elementsToSkip;
        let currentElementIndex=listOfChildren.indexOf(currentElement),nextElement;
        let focusableElement=document.querySelector(configObj.scope);
        nextElement=scrollToLastElement();
        currentElementIndex=listOfChildren.indexOf(nextElement);
        if(nextElement){
            while(nextElement!=null && elementsToSkip &&elementsToSkip.includes(nextElement)){
                nextElement=listOfChildren[--currentElementIndex];
            }
        }
        currentElement.classList.remove(configObj.selectedClass);
        nextElement.classList.add(configObj.selectedClass);    
        parent.scrollTop=nextElement.offsetTop; 
        let ariaId=nextElement.id;
        if(!ariaId){
            ariaId=`LyteHighlightElement_${globalIdInd++}`;
            nextElement.id=ariaId;

        }
        focusableElement.setAttribute('aria-activedescendant',nextElement.id);

    }

    function checkForInverse(){
        let utilObj=findUtilObj(document.activeElement);
        if(utilObj && utilObj.configObj && (utilObj.configObj.orientation==='horizontal')){
            return true;  
        }
        return false;
    }

    function findOptions(){
        let utilObj=findUtilObj(document.activeElement);
        if(utilObj && utilObj.configObj){
            return utilObj.configObj.options;
        }
        else{
            return undefined;
        }
    }
    function checkForTriggerProp(){
        let utilObj=findUtilObj(document.activeElement);
        if(utilObj && utilObj.configObj && utilObj.configObj.triggerClick=="true"){
            if(utilObj.currentElement){
                utilObj.currentElement.click();
            }
        }
    }
    
 })();

 
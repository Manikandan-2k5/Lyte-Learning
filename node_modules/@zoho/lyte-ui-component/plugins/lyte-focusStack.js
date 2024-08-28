;(function(){

    if(lyteDomObj){

        var grpArr=[],groupNo;
  
    $L.focusStack = function(param){
        
        document.addEventListener('keydown',function(event){
                if(event.key=='Tab' && event.shiftKey==false){
                        let currentActiveElement=document.activeElement, nextElementNfe=currentActiveElement.getAttribute('lyte-nfocus-name'),
                        nextElementTabind=currentActiveElement.getAttribute('data-tabindex');

                        if(nextElementNfe!=null){
                            event.preventDefault();
                            if(param && param.onBeforeChange && currentActiveElement.getAttribute('lyte-is-callback')&& currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true"){
                                 param.onBeforeChange();
                                }
                            document.querySelector(`[lyte-focus-name=${nextElementNfe}]`).focus();
                            if(param && param.onAfterChange && currentActiveElement.getAttribute('lyte-is-callback') && currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {
                                param.onAfterChange();}
                        }
                        else if(nextElementTabind!=null){
                           
                            if(grpArr.length==0){
                                groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
                                groupNo=Number.parseInt( groupNo.split('-')[0]);
                                grpArr=document.querySelectorAll(`[data-tabindex^="group${groupNo}"]`);
                                grpArr=Array.from(grpArr);
                                curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
                               
                                if(curInd<grpArr.length-1){
                                    let Elem=document.querySelector(`[data-tabindex="group${groupNo}-${curInd+1}"]`);
                                    if(Elem){
                                        event.preventDefault();
                                        if(param && param.onBeforeChange && currentActiveElement.getAttribute('lyte-is-callback') && currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true"){ param.onBeforeChange();}
                                        Elem.focus();
                                        if(param && param.onAfterChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onAfterChange();}
                                    }
                                }
                                else if(curInd==grpArr.length-1){
                                    if(checkLoopNext()) {event.preventDefault();}
                                }
                            }
                            else {
                                    if((currentActiveElement.getAttribute('data-tabindex').split('group')[1]).charAt(0)==groupNo){
                                        curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
                                        if(curInd<grpArr.length-1){
                                            let Elem=document.querySelector(`[data-tabindex="group${groupNo}-${curInd+1}"]`);
                                            if(Elem){
                                                event.preventDefault();
                                                if(param && param.onBeforeChange &&currentActiveElement.getAttribute('lyte-is-callback')&& currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onBeforeChange();}
                                                Elem.focus();
                                                if(param && param.onAfterChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onAfterChange();}
                                            }
                 
                                        }
                                        else if(curInd==grpArr.length-1){
                                            if(checkLoopNext()) {event.preventDefault();}
                                        }
                                    }
                                    else{
                                        groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
                                        groupNo=Number.parseInt( groupNo.split('-')[0]);
                                        grpArr=document.querySelectorAll(`[data-tabindex^="group${groupNo}"]`);
                                        grpArr=Array.from(grpArr);
                                        curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
                                        if(curInd<grpArr.length-1){
                                            let Elem=document.querySelector(`[data-tabindex="group${groupNo}-${curInd+1}"]`);
                                            if(Elem){
                                                event.preventDefault();
                                                if(param && param.onBeforeChange &&currentActiveElement.getAttribute('lyte-is-callback')&& currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onBeforeChange();}
                                                Elem.focus();
                                                if(param && param.onAfterChange  && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onAfterChange();}
                                            }
          
                                        }
                                        else if(curInd==grpArr.length-1){
                                            if(checkLoopNext()){ event.preventDefault();}
                                        }
                                    }
                            }
                           
                        }
                }
                else if(event.key=='Tab' && event.shiftKey==true){
                    let currentActiveElement=document.activeElement, prevElementNfe=currentActiveElement.getAttribute('lyte-bfocus-name'),
                        prevElementTabind=currentActiveElement.getAttribute('data-tabindex');

                        if(prevElementNfe!=null){
                            event.preventDefault();
                            if(param && param.onBeforeChange &&currentActiveElement.getAttribute('lyte-is-callback')&& currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onBeforeChange();}
                            document.querySelector(`[lyte-focus-name=${prevElementNfe}]`).focus();
                            if(param && param.onAfterChange  && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") { param.onAfterChange();}
                        }
                        else if(prevElementTabind!=null){
                           
                            if(grpArr.length==0){
                                groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
                                groupNo=Number.parseInt( groupNo.split('-')[0]);
                                grpArr=document.querySelectorAll(`[data-tabindex^="group${groupNo}"]`);
                                grpArr=Array.from(grpArr);
                                curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
                                if(curInd>=1){
                                    let Elem=document.querySelector(`[data-tabindex="group${groupNo}-${curInd-1}"]`);
                                    if(Elem){
                                        event.preventDefault();
                                        if(param && param.onBeforeChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onBeforeChange();}
                                        Elem.focus();
                                        if(param && param.onAfterChange &&currentActiveElement.getAttribute('lyte-is-callback')&& currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true"){ param.onAfterChange();}
                                    }
        
                                }
                                else if(curInd==0){
                                    if(checkLoopPrev()){
                                        event.preventDefault();
                                    }
                                }
                            }
                            else {
                                    if((currentActiveElement.getAttribute('data-tabindex').split('group')[1]).charAt(0)==groupNo){
                                        curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
                                        if(curInd>=1){
                                            let Elem=document.querySelector(`[data-tabindex="group${groupNo}-${curInd-1}"]`);
                                            if(Elem){
                                                event.preventDefault();
                                                if(param && param.onBeforeChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onBeforeChange();}
                                                Elem.focus();
                                                if(param && param.onAfterChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onAfterChange();}
                                            }
       
                                        }
                                        else if(curInd==0){
                                            if(checkLoopPrev()){
                                                event.preventDefault();
                                            }
                                        }
                                    }
                                    else{
                                        groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
                                        groupNo=Number.parseInt( groupNo.split('-')[0]);
                                        grpArr=document.querySelectorAll(`[data-tabindex^="group${groupNo}"]`);
                                        grpArr=Array.from(grpArr);
                                        curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
                                        if(curInd>=1){
                                            let Elem=document.querySelector(`[data-tabindex="group${groupNo}-${curInd-1}"]`);
                                            if(Elem){
                                                event.preventDefault();
                                                if(param && param.onBeforeChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onBeforeChange();}
                                                Elem.focus();
                                                if(param && param.onAfterChange && currentActiveElement.getAttribute('lyte-is-callback')&&currentActiveElement.getAttribute('lyte-is-callback').toLowerCase()=="true") {param.onAfterChange();}
                                            }
     
                                        }
                                        else if(curInd==0){
                                            if(checkLoopPrev()){
                                                event.preventDefault();
                                            }
                                        }
                                    }
                                
                                
                            }
                           
                        }
                       

                }
        });
    }
    function checkLoopNext(){
        let currentActiveElement=document.activeElement;

        groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
        groupNo=Number.parseInt( groupNo.split('-')[0]);
        grpArr=document.querySelectorAll(`[data-tabindex^="group${groupNo}"]`);
        grpArr=Array.from(grpArr);
        curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
        let nextDomElement=grpArr[grpArr.indexOf(currentActiveElement)+1];
        if(nextDomElement==null) { 
            return false;
        }
        if( groupNo==Number.parseInt((nextDomElement.getAttribute('data-tabindex').split('group')[1]).split('-')[0])&& Number.parseInt(nextDomElement.getAttribute('data-tabindex').split('-')[1])<curInd){
            return true;
        }
        return false;

    }
    function checkLoopPrev(){
        let currentActiveElement=document.activeElement;

        groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
        groupNo=Number.parseInt( groupNo.split('-')[0]);
        grpArr=document.querySelectorAll(`[data-tabindex^="group${groupNo}"]`);
        grpArr=Array.from(grpArr);
        curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
        let prevDomElement=grpArr[grpArr.indexOf(currentActiveElement)-1];
        if(prevDomElement==null) {return false;}
        if( groupNo==Number.parseInt((prevDomElement.getAttribute('data-tabindex').split('group')[1]).split('-')[0])&& Number.parseInt(prevDomElement.getAttribute('data-tabindex').split('-')[1])>curInd){
            return true;
        }
        return false;
    }
    
        
  }
  
  }());  

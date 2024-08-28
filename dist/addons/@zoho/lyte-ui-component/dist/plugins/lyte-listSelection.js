;(function(){

	if(lyteDomObj){
  
        lyteDomObj.prototype.listSelection = function (params) {

          var onSelect = function () { }, onDeselect = function () { };
          if (params.onSelect) { 
              onSelect = params.onSelect;
          }
          if (params.onDeselect) { 
              onDeselect = params.onDeselect;
          }
          
          var target, nextTarget, currentTarget, mainKey, previousTarget;
          var flag = true;
          var mainKeyIndex, previousIndex, currentIndex;
          var wrapperDiv = this[0];

          var className = params.toAppendClass;


          const children = wrapperDiv.children;
          var childrenArr = Array.from(children);
          
          //to disable the default text selection in the browser
          childrenArr.forEach(element => {
            $L(element).css("user-select","none")
          });
            
         //indices of the mainKey, previous, current targets
          function getIndex(mainKey, previousTarget, currentTarget) { 
                    mainKeyIndex = childrenArr.indexOf(mainKey);
                    previousIndex = childrenArr.indexOf(previousTarget);
                    currentIndex = childrenArr.indexOf(currentTarget);
              return mainKeyIndex, previousIndex, currentIndex;
          }

          document.addEventListener("click",startSelect);

          function startSelect(e) {

              currentTarget = e.target;
              if ($L(e.target).closest(wrapperDiv)[0] && currentTarget != wrapperDiv) {

                  e.preventDefault;

                  //reinitialze flag for shift key
                  if (!e.shiftKey) {
                      target = e.target;
                      flag = true;
                  }

                  //single click --> deselect all,select target
                  if (!(e.metaKey || e.ctrlKey) && !e.shiftKey) {
                      if (!params.toggleSingleSelection) {
                          $L("." + className).removeClass(className);
                          $L(target).addClass(className);
                          onSelect(currentTarget);
                      }

                      // toggle single selection
                      else if (params.toggleSingleSelection) {
                          $L("." + className).not($L(currentTarget)).removeClass(className);
                          if ($L(currentTarget).hasClass(className)) {
                              $L(currentTarget).removeClass(className);
                              onDeselect(currentTarget);
                          }
                          else {
                              $L(currentTarget).addClass(className);
                              onSelect(currentTarget);
                          }

                      }
                  }

                  // control / meta key function 
                  if (e.metaKey || e. ctrlKey) {
                      mainKey = previousTarget;
                      if (!$L(target).hasClass(className)) {
                          $L(target).addClass(className)
                      }
                      else {
                          $L(target).removeClass(className)
                      }
                  }

                  // shift key function
                  else if (e.shiftKey) {     
                      if (flag) {
                          mainKey = previousTarget;
                          mainKeyIndex = childrenArr.indexOf(mainKey);
                          flag = false;
                      }
            
                      nextTarget = e.target;

                      getIndex(mainKey, previousTarget, currentTarget);
            
                      // clicked double times below the main key, one below other 
                      if (currentIndex - mainKeyIndex > 0 &&
                          currentIndex - previousIndex > 0 &&
                          mainKeyIndex - previousIndex < 0 &&
                          previousIndex - mainKeyIndex > 0) {
                          $L(mainKey).nextUntil(currentTarget).addClass(className);
                      }

                      // clicked first time below the main key, second time in between the main and first
                      else if (currentIndex - mainKeyIndex > 0 &&
                          currentIndex - previousIndex < 0 &&
                          mainKeyIndex - previousIndex < 0 &&
                          previousIndex - mainKeyIndex > 0) {
                          $L(mainKey).nextUntil(currentTarget).addClass(className);
                          $L(currentTarget).nextUntil(previousTarget).removeClass(className);
                          $L(previousTarget).removeClass(className);
                      }
                
                      //clicked first below the main key, second above the main key
                      else if (currentIndex - mainKeyIndex < 0 &&
                          currentIndex - previousIndex < 0 &&
                          mainKeyIndex - previousIndex < 0 &&
                          previousIndex - mainKeyIndex > 0) {
                          $L(mainKey).prevUntil(currentTarget).addClass(className);
                          $L(mainKey).nextUntil(previousTarget).removeClass(className);
                          $L(previousTarget).removeClass(className);
                      }
            
                      //clicked double times above the main key, one above other
                      else if (currentIndex - mainKeyIndex < 0 &&
                          currentIndex - previousIndex < 0 &&
                          mainKeyIndex - previousIndex > 0 &&
                          previousIndex - mainKeyIndex < 0) {
                          $L(mainKey).prevUntil(currentTarget).addClass(className);
                      }
                
                      //clicked first time above the main key, second time in between the main and first
                      else if (currentIndex - mainKeyIndex < 0 &&
                          currentIndex - previousIndex > 0 &&
                          mainKeyIndex - previousIndex > 0 &&
                          previousIndex - mainKeyIndex < 0) {
                          $L(mainKey).prevUntil(currentTarget).addClass(className);
                          $L(currentTarget).prevUntil(previousTarget).removeClass(className);
                          $L(previousTarget).removeClass(className)
                      }
                
                      //clicked first above the main key, second below the main key
                      else if (currentIndex - mainKeyIndex > 0 &&
                          currentIndex - previousIndex > 0 &&
                          mainKeyIndex - previousIndex > 0 &&
                          previousIndex - mainKeyIndex < 0) {
                          $L(mainKey).nextUntil(currentTarget).addClass(className);
                          $L(mainKey).prevUntil(previousTarget).removeClass(className);
                          $L(previousTarget).removeClass(className);
                      }
                
                      //clicked single time below the main key
                      else if (currentIndex - mainKeyIndex > 0 &&
                          currentIndex - previousIndex > 0 &&
                          mainKeyIndex === previousIndex) {
                          $L(mainKey).nextUntil(currentTarget).addClass(className);
                      }
                
                      //clicked single time above the main key
                      else if (currentIndex - mainKeyIndex < 0 &&
                          currentIndex - previousIndex < 0 &&
                          mainKeyIndex === previousIndex) {
                          $L(mainKey).prevUntil(currentTarget).addClass(className);
                      }
                      $L(nextTarget).addClass(className);

                      //
            
                  }
              }

              else{
                    $L("." + className).removeClass(className);    
              }
              
              previousTarget = currentTarget;
          }
}
	  }

  }());

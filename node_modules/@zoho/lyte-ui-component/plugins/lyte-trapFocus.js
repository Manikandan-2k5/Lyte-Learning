;(function(){
  if(lyteDomObj){
    lyteDomObj.prototype.trapFocus = function(arg){

      if((_lyteUiUtils.trappingFocus)&&($L("#"+_lyteUiUtils.focusParent)[0])){
        $L("#"+_lyteUiUtils.focusParent)[0].removeEventListener('keydown' , _lyteUiUtils.trapFocusFun)
        _lyteUiUtils.trappingFocus = false
        _lyteUiUtils.focusParent = "";
      }

      if(arg === 'destroy' || arg === "Destroy"){
        document.addEventListener('keydown',LytePopup.onEscape,true);
        return;
      }
      document.removeEventListener('keydown',LytePopup.onEscape,true);

      var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), *[contenteditable]';
      var parent = this[0];

      var iniFocusableItems = [];
      iniFocusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
        return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
      })
      if(iniFocusableItems.length < 1){
        if(!$L(this).attr('tabindex')){
          $L(this).attr('tabindex' , 0)
        }
        iniFocusableItems.push($L(this)[0])
      }

      if(iniFocusableItems.indexOf(document.activeElement) < 0){
        iniFocusableItems[0].focus()
      }

      _lyteUiUtils.trapFocusFun = function(evt){

        _lyteUiUtils.trappingFocus = true
        _lyteUiUtils.focusParent = $L(parent).attr('id');

        var focusableItems;
        focusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
          return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
        })

        if(focusableItems.length < 1){
          focusableItems.push($L(parent)[0])
        }

        if(focusableItems.indexOf(document.activeElement) < 0){
          focusableItems[0].focus()
        }

        if(evt.keyCode === 9 || evt.keyCode === 16){
          if(focusableItems.length == 0){
              return;
          }

          var focusedItem = document.activeElement;
          var focusedParent;

          if(!(parent.contains(focusedItem))){
            focusedParent = $L(focusedItem).closest('lyte-drop-box')[0]
            if(focusedParent){
              focusedParent = focusedParent.origindd
            }
            if(!(parent.contains(focusedParent))){
              LytePopup.initializeFocus(parent);
              evt && evt.preventDefault();
              return;
            }
          }

          var numberOfFocusableItems = focusableItems.length;

          var focusedItemIndex;
          for(var i = 0; i < focusableItems.length; i++){
              if(focusableItems[i] == focusedItem){
                  focusedItemIndex = i;
                  break;
              }
          }

          if (evt.shiftKey) {
              if (focusedItemIndex == 0) {
                  focusableItems.get(numberOfFocusableItems - 1).focus();
                  evt.preventDefault();
              }

          } else {
              if (focusedItemIndex == numberOfFocusableItems - 1) {
                  focusableItems.get(0).focus();
                  evt.preventDefault();
              }
          }
        }

      }

      parent.addEventListener('keydown' , _lyteUiUtils.trapFocusFun)

    }
  }
}());

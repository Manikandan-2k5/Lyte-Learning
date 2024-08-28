(function () {
  if (lyteDomObj) {
    lyteDomObj.prototype.infiniteScroll = function (param) {
      var table = this[0];
      var tableHeight = table.getBoundingClientRect().height, extraDivs;
      var minorFlag = true, onScrollStartCheck = false;
      var scrollTimer = null, setTimer = false;
      var browserName, isSafari;
        //function to check the browser
      function checkBrowser(){ 
        var uA = navigator.userAgent;
        if ((isBrowser=uA.indexOf("OPR"))!=-1) {
          browserName = "Opera";
         }
         else if ((isBrowser=uA.indexOf("Edg"))!=-1) {
          browserName = "Microsoft Edge";
         }
         else if ((isBrowser=uA.indexOf("MSIE"))!=-1) {
          browserName = "Microsoft Internet Explorer";
         }
         else if ((isBrowser=uA.indexOf("Chrome"))!=-1) {
          browserName = "Chrome";
         }
         else if ((isBrowser=uA.indexOf("Safari"))!=-1) {
          browserName = "Safari";
         }
        else if ((isBrowser = uA.indexOf("Firefox")) != -1) {
          browserName = "Firefox";
        }
      }
      checkBrowser();
      // Safari browser cond. checking
      if (browserName === "Safari") {
        $L(table).css("overscroll-behavior-y", "none")
        isSafari = true; }
      var onScrollStart = function () { }, onScrolling = function () { }, onScrollEnd = function(){};
      if (param.onScrollStart) { 
        onScrollStart = param.onScrollStart;
        setTimer = true;
        onScrollStartCheck = true;
      }
      if (param.onScrolling) { 
          onScrolling = param.onScrolling;
      }
      if (param.onScrollEnd) { 
        setTimer = true;
        onScrollEnd = param.onScrollEnd;
      }
      // initializing the populateObject for DOM rendering 
      for (var i = 0; i < param.displayElem; i++) {
        updatePopulateObject([i], i);
      }
      // checking the sufficiency of extraElems adding it if required
      var rowHeight = $L("tr")[0].getBoundingClientRect().height;
      var downElemThres = Math.floor(tableHeight / rowHeight);

      if (param.displayELem >= downElemThres + 4) { extraDivs = 0; }
      else {extraDivs = 4;}

      // reinitializing the populateObject
      var totalElementCount = param.displayElem + extraDivs;
      for (var i = 0; i < totalElementCount; i++) {
        updatePopulateObject([i], i);
      }
      // setting the CSS transform property if not present
      var children = $L("tr");
      Array.from(children).forEach((element) => {
        if ($L(element).css("transform") === "none") {
          $L(element).css("transform", "translateY(0px)");
        }
      });

      // holding elements for CSS and render-data manipulation
      var firstElem,lastElem, up1 = undefined, up2 = undefined, currentElem;
      var down1 = $L("tr:nth-child(" + (downElemThres + 3) + ")"),
        down2 = $L("tr:nth-child(" + (downElemThres + 2) + ")"),
        downCurrentElem = $L("tr:nth-child(" + (downElemThres + 1) + ")");
      
      //total height of the overall elements
      var totalYShift = totalElementCount * rowHeight;
      totalYShift = Number(totalYShift.toFixed(2));

      firstElem = $L("tr:first-child");
      lastElem = $L("tr:last-child");
      currentElem = firstElem;

      // "index" to track the index in populateObject
      // "counter"  to track the index in dataArray
      var index = 0, counter = totalElementCount;
      var prevScroll = 0, difference = 0;

      // toggled when the direction of scrolling changes
      var firstCheckScrollDown = false, firstCheckScrollUp = true;
      var once = true,dummyDiv,dummyTr;

      table.addEventListener('scroll', function (e) {
        e.preventDefault();
        if (isSafari && once) {
          // creating and appending a dummy TR to the table
          dummyTr = document.createElement('tr'),
          parentNode = $L(table).find('tr')[0].parentNode;
          parentNode.appendChild(dummyTr);
          $L(dummyTr).addClass('dummy');
          $L(dummyTr).css("transform", "translateY(0px)");
          $L(dummyTr).css("height", "0px");
          dummyTr = $L(dummyTr);
          // creating and appending a dummy DIV to the parent Div
          dummyDiv = document.createElement('DIV');
          table.appendChild(dummyDiv);
          $L(dummyDiv).addClass('dummy');
          $L(dummyDiv).css("transform", "translateY(0px)");
          $L(dummyDiv).css("height", "0.5px");
          once = false;
          dummyDiv = $L(dummyDiv);
        }
        //scroll start callback
        if (onScrollStartCheck) { 
          onScrollStart();
          onScrollStartCheck = false;
        }
        // on Scroll callback
        onScrolling();
        if (setTimer) {
          if (scrollTimer)
            clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(scrollFinished, 100);
        // scroll end callback
          function scrollFinished() {
            onScrollStartCheck = true;
            onScrollEnd();
          }
        }
        var currentScroll = $L(table).scrollTop();
        if (currentScroll >= 0) {
          // to find whether the scrolling is in down or up direction
          difference = prevScroll - currentScroll;
          //top first visible element
          if (currentElem) {
            var currentElemBCR = currentElem[0].getBoundingClientRect();
            var currentTop = currentElemBCR.top;
            var currentBottom = currentElemBCR.bottom; }
          var tableBCR = table.getBoundingClientRect();
          var tableTop = tableBCR.top;
          //if Scroll Down happens
          if (difference < 0) {
            firstCheckScrollUp = true;
            if (firstCheckScrollDown) {
              index += 1;
              checkUpIndex();
              counter += totalElementCount + 1;
              firstCheckScrollDown = false;
            }
            //checks whether an element has passed
            if (currentBottom < tableTop) {
              // transfer of upper elements
              up1 = up2;
              up2 = currentElem;
              if (isSafari) {
                if ($L(currentElem).next()[0] === dummyTr[0]) {
                  currentElem = firstElem;
                } else {
                  currentElem = $L(currentElem).next();
                }
              } else { 
                if ($L(currentElem).next().length === 0) {
                  currentElem = firstElem;
                } else {
                  currentElem = $L(currentElem).next();
                }
              } 
              //transfer of lower elements
              downCurrentElem = down2;
              down2 = down1;
              if (isSafari) {
                if ($L(down1).next()[0] === dummyTr[0]) {
                  down1 = firstElem;
                } else {
                  down1 = $L(down1).next();
                }
              } else { 
                if ($L(down1).next().length === 0) {
                  down1 = firstElem;
                } else {
                  down1 = $L(down1).next();
                }
              }
              if (up1 != undefined) {
                //alteration in populateObject and CSS of the elements
                if (counter <= param.dataArray.length - 1) {
                  updatePopulateObject(index, counter)
                  var YTranslate = getYTransform(up1);
                  if (up1) {
                    $L(up1[0]).css("transform", "translateY(" + (YTranslate + totalYShift) + "px)");
                  }
                  if (isSafari) { 
                    var dumTrYTransform = getYTransform(dummyTr);
                    var dumDivYTransform = getYTransform(dummyDiv);
                    // var dumTrHeight = parseInt($L(dummyTr).css("height"));
                    $L(dummyDiv).css("transform", "translateY(" + (dumDivYTransform + rowHeight)+ "px)");
                    $L(dummyTr).css("transform", "translateY(" + (dumTrYTransform + rowHeight) + "px)");
                    // $L(dummyTr).css("height", dumTrHeight - 40 +"px")
                  }
                  index++;
                  counter++;
                }
              }
              checkUpIndex();
            }
            function checkUpIndex() { 
              if (index >= totalElementCount) {
                index = 0;
              }
            }
            //checks if the table has reched its most bottom
            if (this.scrollTop + parseInt($L(table).css("height")) >= param.dataArray.length * rowHeight && minorFlag) {
              minorFlag = false;
              downResetFunction();
            }
          }
          // if Scroll Up happens
          else if (difference > 0) {
            firstCheckScrollDown = true;
            if (firstCheckScrollUp) {
              minorFlag = true;
              index -= 1;
              checkDownIndex();
              counter -= totalElementCount + 1;
              firstCheckScrollUp = false;
            }
            diff = Math.max(Math.abs(difference) / rowHeight, 1);
            if (currentTop > tableTop) {
              for (let i = 0; i < Math.round(diff) + 1; i++) {
                  //alteration in populateObject and CSS of the elements
                updatePopulateObject(index, counter)
                var YTranslate = getYTransform(up1);
                if (up1) {
                  $L(up1[0]).css("transform", "translateY(" + (YTranslate - totalYShift) + "px)");
                }
                if (isSafari) { 
                  var dumTrYTransform = getYTransform(dummyTr);
                  var dumDivYTransform = getYTransform(dummyDiv);
                  // var dumTrHeight = parseInt($L(dummyTr).css("height"));
                  $L(dummyDiv).css("transform", "translateY(" + Math.max((dumDivYTransform - rowHeight),0) + "px)");
                  $L(dummyTr).css("transform", "translateY(" + Math.max((dumTrYTransform - rowHeight), 0) + "px)");
                  // $L(dummyTr).css("height", dumTrHeight + 40 + "px");
                }
                index--;
                counter--;
                //transfer of lower elements
                down1 = down2;
                down2 = downCurrentElem;
                if ($L(downCurrentElem).prev().length === 0) {
                  downCurrentElem = lastElem;
                }
                else {
                  downCurrentElem = $L(downCurrentElem).prev();
                } 
                // transfer of upper elements
                currentElem = up2;
                up2 = up1;
                if ($L(up1).prev().length === 0) {
                  up1 = lastElem;
                }
                else {
                  up1 = $L(up1).prev();
                }
                checkDownIndex();
              }
            }
            // checks if the table has reached its utmost top
            if (this.scrollTop <= 0) {
              resetFunction();
            }
            function checkDownIndex() { 
              if (index < 0) {
                index = totalElementCount - 1;
              }
            }
          }
          // to maintain the previous state
          prevScroll = currentScroll;
        }
      });
      //function to get the Y-Transform of the element 
      function getYTransform(elem) {
        try {
          // var YTranslate = $L(elem).css("transform");
          var YTranslate = elem[0].style.transform;
          // regex to get the Y translate of the elements
          YTranslate = Number(/translateY\(([0-9\.]+)px\)/g.exec(YTranslate)[1]);
          return YTranslate;
        }catch (e){ 
          // console.log("in catch");
        }
      }
      // function to update the populateObject
      function updatePopulateObject(index, counter) { 
        Lyte.objectUtils(param.populateObject, "add", "elem" + index, param.dataArray[counter]);
      }
      // function to reset the variables when the table has reaches its top
      function resetFunction() {
        $L(table).find("tr").css("transform", "translateY(0px)");
        // initializing the table to its initial position
        for (var i = 0; i < totalElementCount; i++) {
          updatePopulateObject(i,i)
        }
        // reinitailizing the variabales
        index = 0;
        counter = totalElementCount;
        up1 = up2 = undefined;
        currentElem = firstElem;
        firstCheckScrollDown = false;
      }
      // function to reset the variables when the table has reaches its bottom
      function downResetFunction() { 
        // to get the greater Y-Transform when the table has reached bottom
        var prevTempTransform = 0;
        for (var i = 0; i < totalElementCount; i++) {
          var tempTransform = getYTransform($L("tr").eq(i));
          if (tempTransform > prevTempTransform) {
            prevTempTransform = tempTransform;
          }
        }
        // to get the last elem (also the Last Element of the data) from the array of higher matching Y-Transform elements
        var lastElement, matchingArray = [];
        for (var i = 0; i < totalElementCount; i++) {
          if ($L("tr").eq(i).css("transform") === "matrix(1, 0, 0, 1, 0, " + prevTempTransform + ")")
            matchingArray.push($L("tr").eq(i));
        }
        lastElement = matchingArray.at(-1);
        // assigning all the handling variables with respect to the lastElement;
        up1 = lastElement;
        if ($L(up1).next().length === 0) up2 = firstElem;
        else up2 = $L(up1).next();
        if ($L(up2).next().length === 0) currentElem = firstElem;
        else currentElem = $L(up2).next();
        down1 = down2 = undefined;
        downCurrentElem = lastElement;
      }
    };
  }
})();

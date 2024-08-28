(function () {
  if (lyteDomObj) {
      lyteDomObj.prototype.tableNavigator = function (params) {
        var table = this[0], tableRows, tableData, rowLimit, colLimit, tableType;
        var focusChange = function () { }, cellChange = function () { }, rowHome = function () { }, rowEnd = function () { }, tableHome = function () { }, tableEnd = function () { }; 
          function setParams() { 
            if (params) {
              if (params.focusChange) { 
                focusChange = params.focusChange;
              }
              if (params.cellChange) { 
                cellChange = params.cellChange;
              }
              if (params.rowHome) { 
                rowHome = params.rowHome;
              }
              if (params.rowEnd) { 
                rowEnd = params.rowEnd;
              }
              if (params.tableHome) { 
                tableHome = params.tableHome;
              }
              if (params.tableEnd) { 
                tableEnd = params.tableEnd;
              }
            }
          }
          function setTableType() { 
              if (table.nodeName === 'TABLE') { 
                  tableType = "normalTable";
              }else if (table.nodeName === 'LYTE-TABLE') {
                  tableType = "lyteTable";
              }else if (table.nodeName === 'LYTE-EXPRESSTABLE') {
                  tableType = "expressTable";
              }
          }
          function getTableData() { 
              tableData = [];
              if ( tableType === "normalTable") {
                  // setting tabindex for table
                  if (!table.hasAttribute("tabindex")) {
                      table.tabIndex = -1;
                  }
                  // getting the tableRows
                  tableRows = Array.from(table.rows);
                  // getting tableData from tableRows
                  removeUnwantedTRs();
                  tableRows.forEach(function (element) {
                      var currentRowData = element.getElementsByTagName("td");
                      currentRowData = Array.from(currentRowData);
                      tableData.push(currentRowData);
                  });
              } else if (tableType === "lyteTable") {
                  var tableBody = table.querySelector('lyte-tbody');
                  tableRows = Array.from(tableBody.querySelectorAll('lyte-tr'));
                  removeUnwantedTRs();
                  tableRows.forEach(function (element) {
                      var currentRowData = element.querySelectorAll('lyte-td');
                      currentRowData = Array.from(currentRowData);
                      tableData.push(currentRowData);
                  });
              } else if (tableType === "expressTable") { 
                  var tableBody = table.querySelector('lyte-exptable-tbody') || table.querySelector('.lyteExpOriginalTable');
                  tableRows = Array.from(tableBody.querySelectorAll('lyte-exptable-tr'));
                  removeUnwantedTRs();
                  tableRows.forEach(function (element) {
                      var currentRowData = element.querySelectorAll('lyte-exptable-td');
                      currentRowData = Array.from(currentRowData);
                      tableData.push(currentRowData);
                  });
              }
                function removeHeading() { 
                  //removing the heading row
                  tableData.forEach(function (element) {
                    if (element.length === 0) {
                        tableRows.splice(tableData.indexOf(element), 1);
                        tableData.splice(tableData.indexOf(element), 1);
                    }
                  });
                }
                function removeUnwantedTRs() { 
                  tableRows.forEach(function (elem) {
                    if (hasIgnoreRow(elem) || !isVisible(elem)) { 
                        tableRows.splice(tableRows.indexOf(elem), 1);
                    }
                  });
                }
                function removeNonVisibleTDs() { 
                  let func = function(elem) {
                    if (!isVisible(elem)) { 
                      tableData[i].splice(tableData[i].indexOf(elem), 1);
                    }
                  }
                  for (let i = 0; i < tableData.length; i++) {
                    tableData[i].forEach(func);
                  }
              }
                function setTabIndex() { 
                  //setting tabindex for the TDs
                  tableData.forEach(function (element){
                    element.forEach(function (elem) {
                        elem.tabIndex = 0;
                    });
                  });
                }
                function hasIgnoreRow(elem){ 
                  var ignoreRow = elem.getAttribute("lt-prop-ignore-row");
                  if (ignoreRow === null || ignoreRow === "false") { ignoreRow = false; }
                  else if (ignoreRow === "" || ignoreRow === "true") { ignoreRow = true; }
                    return ignoreRow;
                }
                function isVisible (item) {
                  return !!( item.offsetWidth || item.offsetHeight || item.getClientRects().length );
                }
                setParams();
                removeHeading();
                removeNonVisibleTDs();
                setTabIndex();
              rowLimit = tableData.length;
              colLimit = tableData[0].length;
          }
          setTableType();
          getTableData();
      //initializing flags =>
      var row = 0, col = 0,
      // enterFlags to allow navigation inside a cell
      allowLeftNavigation = false, allowRightNavigation = false,
      // initialFlags to allow once running functionalities
      // verticalFlag to know if a vertical movement has happened.
      atInitialRightNav = true, atInitialLeftNav = true, isVerticalChange = false,
      focusableElems = [], focusableElemIndex = 0;
      //focusableElemIndex for indexing the focusable elems in a cell
  
  //registering the keydown function in the global object
if (!table.navTableKeyDown) {
    table.navTableKeyDown = function (e) {
        getTableData();
      //only if the target is present inside the table
    if (table.contains(e.target)) {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          upArrowPressed(e);
          break;

        case "ArrowDown":
          e.preventDefault();
          downArrowPressed(e);
          break;

        case "ArrowLeft":
          e.preventDefault();
          leftArrowPressed(e);
          break;

        case "ArrowRight":
          e.preventDefault();
          rightArrowPressed(e);
          break;

        case "Home":
          e.preventDefault();
          homeKeyPressed(e);
          break;

        case "End":
          e.preventDefault();
          endKeyPressed(e);
          break;
      }
        //function to get all the focusable elements from a cell
        function getCellChildren(cell) {
          var cellChildren = Array.from(cell.children)
          if (cellChildren.length > 0) {
          focusableElems = [];
          focusableElemIndex = 0;
          for (let i = 0; i < cellChildren.length; i++) {
              if (tableType !== "normalTable") {
                  cellChildren[i].focus();
                  let activeElem = document.activeElement;
                  if (cellChildren[i].contains(activeElem)) { 
                        focusableElems.push(activeElem);
                  }
              } else {
                  if (!cellChildren[i].hasAttribute('disabled') && cellChildren[i].tabIndex > -1) {
                      focusableElems.push(cellChildren[i]);
                  }
              }
          }
          } 
          setfocusableElemIndex(cellChildren);
          cellChildren = null;
      }
        //function to set the index of the focusable elem to focus
      function setfocusableElemIndex(cellChildren) { 
          if (cellChildren.length > 0) {
              //to focus from last element
              if (e.key === "ArrowLeft") {
                focusableElemIndex = focusableElems.length - 1;
              }
            } //if the cell doesn't contain focusable elements
            else {
              focusableElems = [];
              focusableElemIndex = 0;
            }
      }
        // reinitializing flags for horizontal navigation(right/left)
      function reinitializeFlagsHor() { 
          if (focusableElems.length > 0) {
              allowRightNavigation = true;
              allowLeftNavigation = true;
              atInitialRightNav = true;
              atInitialLeftNav = true;
              isVerticalChange = false;
            } else {
              allowRightNavigation = false;
              allowLeftNavigation = false;
            }
      }
        // resetting the InitialFlags for vertical navigation(up/down)
      function resetInitialFlagsVer() { 
          atInitialLeftNav = true;
          atInitialRightNav = true;
      }
        //code to navigate the focus in vertical navigation
      function navigateVerticalFocus(direction) { 
          //inside a cell
          if (focusableElems.length > 0) {
              isVerticalChange = true;
              allowRightNavigation = true;
              focusableElems[focusableElemIndex].focus();
              focusableElemIndex++;
              focusChange();
              cellChange();
          } 
          //among cells
          else {
              allowLeftNavigation = false;
              allowRightNavigation = false;
              focusableElemIndex = 0;
              focusableElems = [];
              var _row;
              if (direction === "up") {_row = row - 1}
              else if (direction === "down") {_row = row + 1}
              tableData[_row][col].focus();
              focusChange();
              cellChange();
          } // if only one focusable elem
          if (focusableElems.length === 1) {
              allowRightNavigation = false;
              allowLeftNavigation = false;
          }
      }
        //resetting flags for horizontal navigation if only one elem is inside a cell
      function singleElemSetFlags(){ 
          allowRightNavigation = false;
          allowLeftNavigation = false;
          atInitialLeftNav = true;
          atInitialRightNav = true;
      }  
        //resetting flags for horizontal navigation among the table cells
      function tableCellNavResetFlag() { 
          atInitialRightNav = true;
          atInitialLeftNav = true;
          isVerticalChange = false;
          focusableElems = [];
          focusableElemIndex = 0;
      }    
      function upArrowPressed(e) {
          resetInitialFlagsVer();
        if (row > 0) {
            getCellChildren(tableData[row - 1][col]);
            navigateVerticalFocus("up")
          row--;
        }
      }
      function downArrowPressed(e) {
          resetInitialFlagsVer()
        if (row < rowLimit - 1) {
            getCellChildren(tableData[row + 1][col]);
            navigateVerticalFocus("down")
          row++;
        }
      }
      function leftArrowPressed(e) {
        if (e.shiftKey) {
          allowLeftNavigation = false;
          focusableElemIndex = 0;
          focusableElems = [];
          cellChange();
        }
        if (col > 0 && !allowLeftNavigation) {
          getCellChildren(tableData[row][col - 1]);
          reinitializeFlagsHor();
        }
        if (!allowLeftNavigation && col > 0) {
            allowRightNavigation = false;
            tableCellNavResetFlag();
          tableData[row][col - 1].focus();
          focusChange();
          cellChange();
          col--;
        }
        if (allowLeftNavigation && col > 0 && focusableElems.length > 0) {
          allowRightNavigation = true;
          if (focusableElemIndex >= 0 && focusableElemIndex < focusableElems.length) {
            if (!atInitialLeftNav) {
              focusableElemIndex--;
            } else {
              if (!isVerticalChange) {
                col--;
                cellChange();
              }
              atInitialRightNav = false;
              atInitialLeftNav = false;
            }
            focusableElems[focusableElemIndex].focus();
            focusChange();
          }
          if (focusableElems.length === 1) {
              singleElemSetFlags()
          
          } else {
            if (focusableElemIndex === 0) {
              allowLeftNavigation = false;
            }
            if (focusableElemIndex >= focusableElems.length - 1) {
              allowRightNavigation = false;
            }
          }
        }
      }
      function rightArrowPressed(e) {
        if (e.shiftKey) {
          allowRightNavigation = false;
          focusableElemIndex = 0;
          focusableElems = [];
          cellChange();
        }
        if (col < colLimit - 1 && !allowRightNavigation) {
          getCellChildren(tableData[row][col + 1]);
          reinitializeFlagsHor();
        }
        if (!allowRightNavigation && col < colLimit - 1) {
            tableCellNavResetFlag();
          tableData[row][col + 1].focus();
          focusChange();
          cellChange();
          col++;
        }
        if (allowRightNavigation && focusableElems.length > 0) {
          allowLeftNavigation = true;
          if (focusableElemIndex < focusableElems.length) {
            if (!atInitialRightNav) {
              focusableElemIndex++;
            } else {
              if (!isVerticalChange) {
                cellChange();
                col++;
              }
              atInitialRightNav = false;
              atInitialLeftNav = false;
            }
          //   if (focusableElems.length === 1) {
          //     focusableElemIndex = 0;
          //   }
            focusableElems[focusableElemIndex].focus();
            focusChange();
          }
          if (focusableElems.length === 1) {
              singleElemSetFlags()
          } else {
            if (focusableElemIndex >= focusableElems.length - 1) {
              allowRightNavigation = false;
            }
            if (focusableElemIndex === 0) {
              allowLeftNavigation = false;
            }
          }
        }
      }
      function homeKeyPressed(e) {
        //if meta key is pressed along with home -> move to first cell
        if (e.metaKey) {
          row = 0;
          col = 1;
        } else {
          col = 1;
          rowHome();
        }
        allowLeftNavigation = false;
        leftArrowPressed(e);
      }
      function endKeyPressed(e) {
        //if meta key is pressed along with end -> move to last cell
        if (e.metaKey) { 
          row = rowLimit - 1;
          col = colLimit - 2;
        } else {
          col = colLimit - 2;
          rowEnd();
        }
        allowRightNavigation = false;
        rightArrowPressed(e);
      }
    }
    let lengthMinus, homeChange;
    if (isVerticalChange) {
      homeChange = 1;
      lengthMinus = 0;
    } else {
      homeChange = 0;
      lengthMinus = 1;
    } 
    if (row === 0 && col === 0 && focusableElemIndex === homeChange) { 
      tableHome();
    }
    if (row === rowLimit - 1 && col === colLimit - 1 && focusableElemIndex === (focusableElems.length - lengthMinus)) { 
      tableEnd();
      getTableData();
    }
  };
}
if (!table.navTableMouseClick) {
    table.navTableMouseClick = function (e) {
        getTableData();
    // getting the Selected Row and Selected Column
        var tdTag, tdParentNode;
        if (tableType === "normalTable") {
            tdTag = "td";
            tdParentNode = e.target.parentNode;
        } else if (tableType === "lyteTable") { 
            tdTag = "lyte-td";
            tdParentNode = e.target.closest('lyte-td');
        } else if (tableType === "expressTable") { 
            tdTag = "lyte-exptable-td";
            tdParentNode = e.target.closest('lyte-exptable-td');
        }
        try {
          var selectedRow = e.target.closest(tdTag).parentNode;
          var selRowIndex = tableRows.indexOf(selectedRow);
          var selColIndex = tableData[selRowIndex].indexOf(e.target);
          if (selColIndex < 0) {
            selColIndex = tableData[selRowIndex].indexOf(tdParentNode);
      }
      // setting row and col
        row = selRowIndex;
        col = selColIndex;
        
      // getting the focusable elems in the clicked cell
      var cellChildren = Array.from(tableData[row][col].children);
      if (cellChildren.length > 0) {
          focusableElems = [];
          for (let i = 0; i < cellChildren.length; i++) {
              if (tableType !== "normalTable") {
                  cellChildren[i].focus();
                  let activeElem = document.activeElement;
                  if (cellChildren[i].contains(activeElem)) { 
                        focusableElems.push(activeElem);
                  }
              } else {
                  if (!cellChildren[i].hasAttribute('disabled') && cellChildren[i].tabIndex > -1) {
                      focusableElems.push(cellChildren[i]);
                  }
              }
          }
          cellChildren = null;
          let isTDClicked;
        // if the td containing the target is clicked
          if (!focusableElems.includes(e.target)) {
              isTDClicked = true;
              focusableElems[0].focus();
        }
        // if the target is directly clicked
          else {
              var target = e.target;
              var assignDirectFocus = function () {
                if (target.tabIndex > -1) {
                    target.focus();
                } else { 
                    target = target.parentNode;
                    assignDirectFocus();
                }
              }
              assignDirectFocus();
        }
        // target is the first focusable elem
          if (focusableElems.indexOf(e.target) === 0 || focusableElems.indexOf(e.target) === -1) {
              allowLeftNavigation = false;
              allowRightNavigation = true;
          }
          // target is the last focusable elem
          else if (
              focusableElems.indexOf(e.target) ===
              focusableElems.length - 1
          ) {
              allowLeftNavigation = true;
              allowRightNavigation = false;
          }
          // target is a middle focusable elem
          else if (
              focusableElems.indexOf(e.target) > 0 &&
              focusableElems.indexOf(e.target) < focusableElems.length - 1
          ) {
              allowLeftNavigation = true;
              allowRightNavigation = true;
          }
        // target is the only focusable elem
        if (focusableElems.length === 1) {
          allowLeftNavigation = false;
          allowRightNavigation = false;
        }
        if (isTDClicked) { focusableElemIndex = 0; }
        else { focusableElemIndex = focusableElems.indexOf(e.target); }  
        isVerticalChange = false;
        atInitialLeftNav = false;
        atInitialRightNav = false;
      }
      // no focusable elem in the TD
      else {
        e.target.focus();
        focusableElems = [];
        focusableElemIndex = 0;
        allowLeftNavigation = false;
        allowRightNavigation = false;
        }
      } catch (e) {
          // error handling goes here
      }
  };
}

if (params !== "destroy") {
  table.addEventListener("keydown", table.navTableKeyDown);
  table.addEventListener("click", table.navTableMouseClick);
} else if (params === "destroy") {
  table.removeEventListener("keydown", table.navTableKeyDown);
    table.removeEventListener("click", table.navTableMouseClick);
    tableData.forEach(function (element){
      element.forEach(function (elem) {
          elem.tabIndex = -1;
      });
    });
    focusableElems = tableRows = rowLimit = colLimit = allowLeftNavigation =
    focusableElemIndex = allowRightNavigation = atInitialLeftNav =
    cellChildren = atInitialRightNav = isVerticalChange =
    focusChange = cellChange = rowEnd = rowHome = tableEnd = tableHome = null;
}
  };
  }
})();

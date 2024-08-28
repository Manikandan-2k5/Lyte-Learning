/**
 * Issues
 * block it for mobiles
 * Valid cases
 * ("alt+enter", "shift+enter", "b", "B", "meta+l", "meta+y", ' a b c ', 'Meta', "z+?", 'x z',  "c+m", "c +r", "c",
 * 'q w r t', "meta+i", "control + j", "$", "k+₹", "₹", "›", "f5", "meta+f8", "plus", "space", "Shift+ArrowDown",
 *  "/\\d/i", "/[a-z]{4}/i", ["meta+k", "control+m", "shift+backspace", "n"], ["meta+c", "meta+v", "meta+a"], "Control+F5")
 * Invalid Cases
 * ("meta+shift+plus", "Control+arrowleft", "alt+3", "alt+o", "alt+£", "shift+P", "shift+$", "Shift+1", "Shift+[", "shift+alt+o")
 * On keydown of any letter after meta will only fire the alphabet in small letter,no matter shift or capslock is used
*/

/**
 * Intializes the shortcut library
 * @param {object} window - window object
 * @param {document} document - document object
 */

; (function (window, document) {
  // Private Variables
  var _registeredKeys = {};
  var _registeredKeyShortcuts = {};
  var _timeoutID;
  var _allPressed = []
  var _allCodePressed = []
  var _shortcutCounter = {}
  var _keyShortcutCounter = {}
  var codeShortcutCounter = {}
  var _funcId
  var _clickId

  var _splittingKeys = new Map([
    [" ", "space"],
    [" ", "space"],
    ["+", "plus"]
  ]);
  var codeKeys = new Map([
    ["shiftleft", "shift"],
    ["shiftright", "shift"],
    ["metaleft", "meta"],
    ["metaright", "meta"],
    ["altleft", "alt"],
    ["altright", "alt"],
    ["controlleft", "control"],
    ["controlright", "control"]
  ]);

  var _specialKeys = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'control',
    18: 'alt',
    20: 'capslock',
    27: 'esc',
    32: 'space',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    45: 'insert',
    46: 'delete',
    91: 'meta',
    92: 'meta', // windows key
    93: 'meta',
    224: 'meta'
  }

  var _otherSpecialKeys = {
    48: ')',
    49: '!',
    50: '@',
    51: '#',
    52: '$',
    53: '%',
    54: '^',
    55: '&',
    56: '*',
    57: '(',
    187: 'plus',
    188: '<',
    190: '>',
    191: '?',
    192: '~',
    219: '{',
    220: '|',
    221: '}',
    222: '"'
  }

  // Private Methods

  /**
   * Checks whether the two array are equal or not
   * @param {Object} arr1
   * @param {Object} arr2
   * @returns boolean
   */
  function isEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) { return false; }
    return arr1.every(function (element, index) {
      return element === arr2[index];
    });
  }

  /**
   * Checks if the current key is a modifier
   * @param {string} string - The string which contains the currently processed key
   */
  function _checkIfModifier(string) {
    string = string.toLowerCase()
    return string === "control" || string === "command" || string === "alt" || string === "shift" || string === "meta"
  }

  /**
   * Checks if the character is a function key
   * @param {string} character - The character that should be checked
   */
  function _checkIfFunctionKey(character) {
    for (var i = 1; i <= 12; i++) {
      if (character.toLowerCase() === ('f' + i)) {
        return true
      }
    }
    return false
  }

  /**
   * Checks if there are any alphanumeric charcters
   * @param {Object} shortcutKeys
   */
  function checkAlphaNumeric(shortcutKeys) {
    function checkLength(element) {
      return element.trim().length > 1;
    }
    var keys = shortcutKeys.slice()
    return (keys.every(checkLength))
  }

  /**
   * Check if _splittingKeys are included in keys to be registered
   * We only allow special keys to be combined with alt and plus, using length of keys.
   * But since plus and space are added in words, they have to be prevented from registering shortcut.
   * @param {object} shortcutKeys Array of keys
   */
  function checkForSeperators(shortcutKeys) {
    function checkSplittingKeys(element) {
      var splittingKeys = Array.from(_splittingKeys.values())
      return splittingKeys.some(function (splittingKey) { return (splittingKey === element.trim().toLowerCase()) })
    }
    var keys = shortcutKeys.slice()
    return keys.some(checkSplittingKeys)
  }

  /**
   * Checks whether the shortcut is valid or not
   * @param {object} shortcutKeys
   */

  // Applies to all underscored identifier names
  function checkValid(shortcutKeys) {
    shortcutKeys = shortcutKeys.split('+');
    var arrayLength = shortcutKeys.length;
    var element, i;
    for (i = 0; i < arrayLength; i++) {
      element = shortcutKeys[i].trim()
      if ("dead" === element.toLowerCase()) {
        return false;
      }
      if ("alt" === element.toLowerCase() || "shift" === element.toLowerCase()) {
        if (checkAlphaNumeric(shortcutKeys) && !checkForSeperators(shortcutKeys)) {
          return true;
        }
        else { return false; }
      }
    }
    return true
  }

  /**
   * Checks if the shortcut to be registered is a valid shortcut
   * @param {string} character - The shortcut keys that should be checked
   */
  function removeWhiteSpace(shortcutKeys) {
    shortcutKeys = shortcutKeys.split('+');
    var arrayLength = shortcutKeys.length;
    for (i = 0; i < arrayLength; i++) {
      shortcutKeys[i] = shortcutKeys[i].trim()
      // Case Insensitive
      shortcutKeys[i] = shortcutKeys[i].toLowerCase()
    }
    shortcutKeys = shortcutKeys.join("+");
    return (shortcutKeys);
  }

  /**
   * Split keys in modifiers and normal keys
   * @param {string} keys - The keys registered to shortcut
   */
  function segregateKeys(keys) {
    var keyArray = _splitArray(keys)
    var modifier = []
    for (var i = 0; i < keyArray.length; i++) {
      if (_checkIfModifier(keyArray[i])) {
        keyArray[i] = keyArray[i] === 'command' ? 'meta' : keyArray[i]
        if (keys.indexOf('+') != -1) {
          modifier.push(keyArray[i])
          keyArray.splice(i, 1)
          i--;
        }
      }
      else if (_checkIfFunctionKey(keyArray[i])) {
        keyArray[i] = keyArray[i].toLowerCase()
      }
    }
    var pressTogether
    if (keys.indexOf('+') !== -1) {
      keyArray = keyArray.join('+')
      pressTogether = true
    }
    else {
      keyArray = keyArray.join(' ')
      pressTogether = false
    }
    return {
      modifier: modifier,
      newKey: keyArray,
      pressTogether: pressTogether
    }
  }

  /**
   * Split keys and build an array
   * @param {string} keys - split between spaces or plus
   */
  function _splitArray(keys) {
    if (keys.indexOf('+') !== -1) {
      return keys.split('+')
    }
    else {
      return keys.split(' ')
    }
  }

  /**
   * @returns All the registered shortcuts
   */
  function getAllRegisteredShortcutKeys() {
    var allRegisteredShortcutKeys = Object.assign({}, _registeredKeys);
    Object.assign(allRegisteredShortcutKeys, _registeredKeyShortcuts)
    return allRegisteredShortcutKeys
  }

  /**
   *Check whether the shortcut is a regex method or not
   * @param {string} shortcutKey
   * @returns whether it is a REGEX shortcut or not
   */
  function isRegexKey(shortcutKey) {
    if (shortcutKey.indexOf('r:') !== -1) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * remove special keys before checking for a cross match for REGEX
   */
  function removeSpecialKeysFromAllPressedKeys() {
    var _specialKeys = ['backspace', "plus", 'tab', 'enter', 'shift', 'control', 'alt', 'capslock', 'escape', 'space', 'pageup', 'pagedown', 'end', 'home', 'arrowleft', 'arrowup', 'arrowright', 'arrowdown', 'insert', 'delete', 'meta', "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12"]
    var pressedKeysWithoutSpecialKeys = _allPressed.filter(x => !_specialKeys.includes(x));
    return pressedKeysWithoutSpecialKeys
  }

  /**
   * Matches the input for regular expressions
   * @param {string} shortcutKey
   */
  function handleRegularExpressions(shortcutKey) {
    var pressedKeysWithoutSpecialKeys = removeSpecialKeysFromAllPressedKeys()
    var exp = shortcutKey.substring(2)
    var matches = exp.match(new RegExp('^/(.*?)/([gimy]*)$'))
    var regex = new RegExp(matches[1], matches[2])
    if (regex.test(pressedKeysWithoutSpecialKeys.join(''))) {
      _shortcutCounter[shortcutKey] = 1
      // return true
    }
    else {
      _shortcutCounter[shortcutKey] = 0
      // return false
    }
  }
  function getAllShortcutKeysWithCode() {
    var codeRegisteredKeys = {}
    for (var shortcutKey in _registeredKeyShortcuts) {
      var shortcutArray = []
      if (!isRegexKey(shortcutKey)) {
        for (var i = 0; i < _registeredKeyShortcuts[shortcutKey].length; i++) {
          var item = _registeredKeyShortcuts[shortcutKey][i]
          if (item.useCode) {
            shortcutArray.push(item)
          }
        }
        codeRegisteredKeys[shortcutKey] = shortcutArray
      }
    }
    return codeRegisteredKeys
  }
  /**
   * Increase character pointer of all the registered keys if the match
   * @param {string} character - currently pressed character
   */
  function _increaseCharPointer(currentPressedCharacter) {
    var allRegisteredShortcutKeys = getAllRegisteredShortcutKeys();
    for (var shortcutKey in allRegisteredShortcutKeys) {
      if (isRegexKey(shortcutKey)) {
        handleRegularExpressions(shortcutKey)
        continue;
      }
      var keyArray = _splitArray(shortcutKey)
      var progress
      _shortcutCounter[shortcutKey] = progress = _shortcutCounter[shortcutKey] ? _shortcutCounter[shortcutKey] : 0
      var nextCharacterInShorcutKeySequence = (keyArray[progress] || "")
      if (currentPressedCharacter === nextCharacterInShorcutKeySequence) {
        _shortcutCounter[shortcutKey]++;
      }
      else {
        _shortcutCounter[shortcutKey] = 0
      }
    }
  }
  function increaseCharPointerCode(currentPressedCharacter) {
    var allShortcutKeys = getAllShortcutKeysWithCode();
    for (var shortcutKey in allShortcutKeys) {
      var keyArray = _splitArray(shortcutKey)
      var progress
      codeShortcutCounter[shortcutKey] = progress = codeShortcutCounter[shortcutKey] ? codeShortcutCounter[shortcutKey] : 0
      var nextCharacterInShorcutKeySequence = (keyArray[progress] || "")
      if (currentPressedCharacter === nextCharacterInShorcutKeySequence) {
        codeShortcutCounter[shortcutKey]++;
      }
      else {
        codeShortcutCounter[shortcutKey] = 0
      }
    }
  }
  function increaseCharPointerKey(currentPressedCharacter) {
    var allRegisteredShortcutKeys = getAllRegisteredShortcutKeys();
    if (currentPressedCharacter !== "shift" && currentPressedCharacter !== "alt") {
      for (var shortcutKey in allRegisteredShortcutKeys) {
        var keyArray = _splitArray(shortcutKey)
        var progress
        _keyShortcutCounter[shortcutKey] = progress = _keyShortcutCounter[shortcutKey] ? _keyShortcutCounter[shortcutKey] : 0
        var nextCharacterInShorcutKeySquence = (keyArray[progress] || "")
        if (nextCharacterInShorcutKeySquence.toLowerCase() === currentPressedCharacter.toLowerCase()) {
          _keyShortcutCounter[shortcutKey]++;
        }
        else {
          _keyShortcutCounter[shortcutKey] = 0
        }
      }
    }
  }

  /**
   * Calls a the matched element which should be invoked.
   * @param {function} func - The callback that must be invoked
   * @param {number} wait - A wait period where a user can press a different key to invoke a different element
   * @param {object} event - The current keydown event
   */
  // return true - prevent default behaviour of the  shortcut
  // return false - not  prevent default behaviour of the  shortcut
  function _invokeFunction(func, wait, event, invokedKey, preventDefault) {
    if (wait) {
      _flushTimeout()
      if (preventDefault) {
        event.preventDefault()
      }
      _funcId = setTimeout(function () {
        var prevent
        if (preventDefault) {
          func.call(window, event, invokedKey)
        }
        else {
          prevent = func.call(window, event, invokedKey)
          // prevent = prevent === false ? prevent : true
          prevent = prevent === false ? true : prevent
          if (prevent) {
            event.preventDefault()
          }
        }
        _shortcutCounter = {}
        _keyShortcutCounter = {}
        _allPressed = []

        _allCodePressed = []
        codeShortcutCounter = {}

      }, wait)

    }
    else {
      _flushTimeout()
      var prevent
      if (preventDefault) {
        event.preventDefault()
        func.call(window, event, invokedKey)
      }
      else {
        prevent = func.call(window, event, invokedKey)
        // prevent = prevent === false ? prevent : true
        prevent = prevent === false ? true : prevent
        if (prevent) {
          event.preventDefault()
        }
      }
      _shortcutCounter = {}
      _keyShortcutCounter = {}
      _allPressed = []

      _allCodePressed = []
      codeShortcutCounter = {}
    }
  }

  function _isVisible(element) {
    var tagName = element.tagName
    var parent = element;
    switch (tagName) {
      case 'BUTTON':
      case 'LYTE-ACCORDION-ITEM':
      case 'LYTE-NAV-ITEM':
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
        break;
      case 'LYTE-MENU-ITEM':
        while (parent.tagName !== 'LYTE-MENU-BODY') {
          parent = parent.parentElement
        }
        var menu = parent.parent
        var query = menu.ltProp('query')
        var all = document.querySelectorAll(query)
        for (var i = 0; i < all.length; i++) {
          var isVisible = !!(all[i].offsetWidth || all[i].offsetHeight || all[i].getClientRects().length);
          if (isVisible) {
            return true
          }
        }
        return false
    }
  }

  /**
   * Triggers a click event on the element that is matched
   * @param {HTMLElement} element - The HTMLElement that should be clicked
   * @param {number} wait - A wait period where a user can press a different key to invoke a different element
   */
  function _invokeClick(element, wait) {
    element = element.tagName === 'LYTE-BUTTON' ? element.querySelector('button') : element;
    var isVisible = _isVisible(element)
    if (!isVisible) {
      return;
    }
    if (wait) {
      _flushTimeout()
      _clickId = setTimeout(function () {
        element.click()
        _shortcutCounter = {}
        _keyShortcutCounter = {}
        _allPressed = []

        _allCodePressed = []
        codeShortcutCounter = {}
      }, wait)
    }
    else {
      _flushTimeout()
      element.click()
      _shortcutCounter = {}
      _keyShortcutCounter = {}
      _allPressed = []

      _allCodePressed = []
      codeShortcutCounter = {}
    }
  }

  /**
   * Clears the timeout in both the invoke functions
   */
  function _flushTimeout() {
    clearTimeout(_funcId)
    clearTimeout(_clickId)
  }

  /**
   * Callbacks/elements that need to be invoked/clicked
   * @param {array} matchedElements - all the keys that have matched the current sequence of characters
   */
  function _invokeMatchedElements(matchedElements, event) {
    for (var i = 0; i < matchedElements.length; i++) {
      var value = matchedElements[i].value
      var wait = matchedElements[i].wait
      var preventDefault = matchedElements[i].preventDefault
      var invokedKey = matchedElements[i]._invokedKey
      if (typeof value === 'function') {
        _invokeFunction(value, wait, event, invokedKey, preventDefault)
      }
      else {
        _invokeClick(value, wait)
      }
    }
  }

  /**
   * get all the modifiers that are currently pressed
   * @param {object} event - the keydown event
   */
  function _getModifiers(event) {
    var modifier = []
    if (event.altKey) {
      modifier.push('alt')
    }
    if (event.ctrlKey) {
      modifier.push('control')
    }
    if (event.shiftKey) {
      modifier.push('shift')
    }
    if (event.metaKey) {
      modifier.push('meta')
    }
    return modifier
  }
  function _getFilteredModifiers(event) {
    var modifier = []
    if (event.ctrlKey) {
      modifier.push('control')
    }
    if (event.metaKey) {
      modifier.push('meta')
    }
    return modifier
  }
  /**
   * removes the smaller shortcut from the matched shortcuts
   * @param {object} foundMatches dictonary have all the matchedShortcuts
   * @param {object} allValues Array of matched shortcut entries
   * @remove the smaller matched shortcuts
   */
  function removeSmallShortcuts(foundMatches, allValues) {
    var allMatchedKeys = Object.keys(foundMatches);
    // allMatchedKeys = ['a', 'b+c', 'a+b+c']
    // allMatchedKeys = ['a', 'a+b+c', 'a+b', 'a+b+c+d']
    allMatchedKeys.sort((a, b) => b.length - a.length);
    var largest = "";
    for (var i = 0; i < allMatchedKeys.length; i++) {
      var currentKey = allMatchedKeys[i];
      for (var j = i + 1; j < allMatchedKeys.length; j++) {
        if (currentKey.includes(allMatchedKeys[j])) {
          // If the current string is a substring of another string,
          // check if it is larger than the current largest string
          if (largest.length < currentKey.length) {
            largest = currentKey;
          }
        }
      }
    }

    if (largest) {
      allMatchedKeys.forEach(element => {
        if (largest !== element) {
          delete foundMatches[element];
        }
      });
      for (var i = 0; i < allValues.length; i++) {
        var element = allValues[i];

        if (largest !== element._invokedKey) {
          allValues.splice(i, 1);
        }
      }
    }
    return [foundMatches, allValues];
  }

  /**
   * get all the matching elements for the current sequence
   * @param {object} event - the keydown event
   */
  function _getMatchedElements(event) {
    var allValues = [], foundMatches = {};
    var allModifier = _getModifiers(event)
    var filteredModifiers = _getFilteredModifiers(event)

    // _invokedKey writes in the global object but it won't cause problems i guess
    var allRegisteredShortcutKeys = getAllRegisteredShortcutKeys();
    for (var keys in _shortcutCounter) {

      if (keys.indexOf('r:') !== -1 && _shortcutCounter[keys] > 0) {
        var item = allRegisteredShortcutKeys[keys]
        item._invokedKey = keys
        allValues.push(item)
        continue
      }
      for (var i = 0; i < allRegisteredShortcutKeys[keys].length; i++) {
        var item = allRegisteredShortcutKeys[keys][i]
        if (item.modifier.length <= 0) {
          if (item.pressTogether) {
            if (_keyShortcutCounter[keys] === _splitArray(keys).length && _allPressed.join("+").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
          else {
            if (_splitArray(keys).length !== 1 && _keyShortcutCounter[keys] === _splitArray(keys).length && _allPressed.length === _splitArray(keys).length && _allPressed.join(" ").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }

            else if (!event.metaKey && !event.ctrlKey && _splitArray(keys).length === 1 && _keyShortcutCounter[keys] === _splitArray(keys).length && _allPressed.join(" ").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
        }
        else {
          if (item.pressTogether) {
            if (_shortcutCounter[keys] === _splitArray(keys).length && item.modifier.sort().join('+') === allModifier.sort().join('+') && _allPressed.join("+").includes(keys)) {
              item._invokedKey = item.modifier.sort().length !== 0 ? item.modifier.sort().join('+') + "+" + keys : keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
            else if (_keyShortcutCounter[keys] === _splitArray(keys).length && item.modifier.sort().join('+') === filteredModifiers.sort().join('+') && _allPressed.join("+").includes(keys)) {
              item._invokedKey = item.modifier.sort().length !== 0 ? item.modifier.sort().join('+') + "+" + keys : keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
          else {
            if (_shortcutCounter[keys] === _splitArray(keys).length && _allPressed.join(" ").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
        }
      }
    }
    for (var key in foundMatches) {
      if (foundMatches[key]) {
        _shortcutCounter[key] = 0;
      }
    }
    [foundMatches, allValues] = removeSmallShortcuts(foundMatches, allValues)
    return allValues
  }
  function getMatchedElementsCode(event) {
    var allValues = [], foundMatches = {};
    var allModifier = _getModifiers(event)
    // _invokedKey writes in the global object but it won't cause problems i guess
    var allRegisteredShortcutKeys = getAllShortcutKeysWithCode();
    for (var keys in codeShortcutCounter) {
      for (var i = 0; i < allRegisteredShortcutKeys[keys].length; i++) {
        var item = allRegisteredShortcutKeys[keys][i]
        if (item.modifier.length <= 0) {
          if (item.pressTogether) {
            if (codeShortcutCounter[keys] === _splitArray(keys).length && _allCodePressed.join("+").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
          else {
            if (_splitArray(keys).length !== 1 && codeShortcutCounter[keys] === _splitArray(keys).length && _allCodePressed.length === _splitArray(keys).length && _allCodePressed.join(" ").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
            else if (!event.metaKey && !event.ctrlKey && _splitArray(keys).length === 1 && codeShortcutCounter[keys] === _splitArray(keys).length && _allCodePressed.join(" ").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
        }
        else {
          if (item.pressTogether) {
            if (codeShortcutCounter[keys] === _splitArray(keys).length && item.modifier.sort().join('+') === allModifier.sort().join('+') && _allCodePressed.join("+").includes(keys)) {
              item._invokedKey = item.modifier.sort().length !== 0 ? item.modifier.sort().join('+') + "+" + keys : keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
          else {
            if (codeShortcutCounter[keys] === _splitArray(keys).length && _allCodePressed.join(" ").includes(keys)) {
              item._invokedKey = keys
              allValues.push(item)
              foundMatches[keys] = true;
            }
          }
        }
      }
    }
    for (var key in foundMatches) {
      if (foundMatches[key]) {
        codeShortcutCounter[key] = 0;
      }
    }
    [foundMatches, allValues] = removeSmallShortcuts(foundMatches, allValues)
    return allValues
  }

  // A timeout that refreshes the current pressed keys when no more keys are pressed
  function _createGracePeriod() {
    clearTimeout(_timeoutID)
    _timeoutID = setTimeout(function () {
      _shortcutCounter = {}
      _keyShortcutCounter = {}
      _allPressed = []

      _allCodePressed = []
      codeShortcutCounter = {}
    }, 1000)
  }

  // Checks if the active element is a input/select/textarea
  function _checkActiveElement() {
    var activeElement = document.activeElement
    var tagName = activeElement.tagName
    var inputTypesAllowed = ['checkbox', 'radio', 'file', 'color', 'range']
    var classList = activeElement.classList
    var unallowedClasses = ['lyteDummyEventContainer']
    if (((tagName === 'INPUT' && inputTypesAllowed.indexOf(activeElement.type) === -1)
      || activeElement.getAttribute('contenteditable') === "true" || tagName === 'SELECT' || tagName === 'TEXTAREA')
      && !activeElement.classList.contains('lyte-shortcut')) {
      return true;
    }
    unallowedClasses.forEach(function (activeClass) {
      if (classList.contains(activeClass)) {
        return true
      }
    });
    return false
  }

  /**
   * The callback for the keydown event
   * @param {object} event - the keydown event
   */
  function _handleKeyPress(event) {
    var shouldReject = _checkActiveElement();
    if (shouldReject) {
      return;
    }

    var codeAlpha = event.key;
    if (codeAlpha.length >= 1) {
      codeAlpha = codeAlpha.toLowerCase()
    }



    var temp = codeAlpha.toLowerCase()
    //Special case for plus and space
    if (_splittingKeys.has(temp)) {
      codeAlpha = _splittingKeys.get(temp);
    }
    if (!(temp === "shift" || temp === "alt")) {
      _allPressed.push(codeAlpha)
    }

    var code = event.code;
    code = code.toLowerCase()
    if (codeKeys.has(code)) {
      code = codeKeys.get(code);
    }

    if (code !== "shift" && code !== "alt") {
      _allCodePressed.push(code)
    }
    increaseCharPointerCode(code)
    if (Object.keys(codeShortcutCounter).length) {
      var matchedElements = getMatchedElementsCode(event)
      _createGracePeriod()
      _invokeMatchedElements(matchedElements, event)
    }

    _increaseCharPointer(codeAlpha)
    increaseCharPointerKey(codeAlpha)
    var matchedElements = _getMatchedElements(event)
    _createGracePeriod()
    _invokeMatchedElements(matchedElements, event)
  }

  /**
   * Builds the registered keys from array
   * @param {array} keys - Array of keys
   * @param {function} callback - Function to be invoked for the keys
   */
  function _processObject(keys, callback, options, useKey) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      _processString(key, callback, options, useKey)
    }
  }

  function keysToLowerCase(shortcutKeys) {
    shortcutKeys = shortcutKeys.split('+');
    var arrayLength = shortcutKeys.length;
    var element, i;
    for (i = 0; i < arrayLength; i++) {
      element = shortcutKeys[i].trim()
      if (element.length === 1) {
        shortcutKeys[i] = element.toLowerCase()
      }
    }
    shortcutKeys = shortcutKeys.join("+");
    return (shortcutKeys);
  }
  /**
   * Builds the registered key from the string
   * @param {string} keys - String that represents the key
   * @param {function} callback - Function to be invoked for the key
   */
  function _processString(keys, callback, options, useKey) {
    var isValid;
    keys = removeWhiteSpace(keys)
    if (!useKey) {
      keys = userToBrowserKeys(keys)
    }
    if (useKey) {
      isValid = checkValid(keys)
    }
    else {
      isValid = true
    }
    if (isValid) {
      shortcut.push({
        newKey: keys,
        oldKey: undefined,
        useKey: useKey,
        value: callback,
        options: options
      })
    }
    else {
      console.error("Invalid Shortcut! Shortcut not added for", keys)
    }
  }

  /**
   * Adds the regex expression to the registeredKeys
   * @param {string} key - The regular expresssion
   * @param {function/HTMLElement} callback - The function or the HTMLElement that should be invoked
   * @param {object} options - Configuarion for this particular key
   */
  function _pushRegex(keys, callback, options, regKeys) {
    keys = 'r:' + keys
    var wait = options.wait ? options.wait : 0

    var preventDefault = options.preventDefault ? options.preventDefault : false
    var useCode = options.useCode ? options.useCode : false


    var type = typeof callback
    regKeys[keys] = {
      type: type,
      value: callback,
      wait: wait,
      preventDefault: preventDefault,
      useCode: useCode
    }
  }

  /**
   * registers function keys and solves other cross browser issues
   */
  function _registerOtherKeys() {
    for (var i = 0; i <= 9; i++) {
      _specialKeys[i + 96] = i.toString()
    }
    for (var i = 1; i <= 12; i++) {
      _specialKeys[111 + i] = 'f' + i
    }
    var sniff = navigator.userAgent
    if (sniff.match('Firefox')) {
      _otherSpecialKeys[59] = ':'
      _otherSpecialKeys[173] = '_'
    }
    else {
      _otherSpecialKeys[186] = ':'
      _otherSpecialKeys[189] = '_'
    }
  }

  /**
   * Removing a single key and its functions
   * @param {string} keys - The key to remove
   */
  function _removeKey(keys, _regKeys) {
    var obj = segregateKeys(keys)
    var container = _regKeys[obj.newKey]
    if (!container) {
      return;
    }
    for (var i = 0; i < container.length; i++) {
      if (obj.pressTogether && container[i].modifier.sort().join(' ') === obj.modifier.sort().join(' ')) {
        _regKeys[obj.newKey].splice(i, 1)
        break;
      }
      else if (!obj.pressTogether) {
        _regKeys[obj.newKey].splice(i, 1)
        break;
      }
    }
  }

  /**
   * Replaces the substrings of keys to event.key
   * @param {string} keys
   * @returns the modified key containing "event.key" name
   */
  function userToBrowserKeys(keys) {
    //ctrl will be replaced by control
    if (keys.search("/ctrl/i")) {
      keys = keys.replaceAll("ctrl", "control")
    }
    //command will be replaced by meta
    if (keys.search("/command/i")) {
      keys = keys.replaceAll("command", "meta")
    }
    //command will be replaced by meta
    if (keys.search("/esc/i")) {
      keys = keys.replaceAll("esc", "escape")
    }
    //arrow keys will be replaced
    if (keys.search("/left/i")) {
      keys = keys.replaceAll("left", "arrowleft")
    }
    if (keys.search("/right/i")) {
      keys = keys.replaceAll("right", "arrowright")
    }
    if (keys.search("/up/i")) {
      keys = keys.replaceAll("up", "arrowup")
    }
    if (keys.search("/down/i")) {
      keys = keys.replaceAll("down", "arrowdown")
    }
    return keys;
  }

  /**
   * Removes the shortcut registered with oldKey
   * @param {object} entry
   */
  function removeFromCache(entry) {
    var oldkey = entry.oldKey
    if (oldkey) {
      shortcut.unregister(oldkey)
      shortcut.unregisterKey(oldkey)
    }
  }

  /**
   * Check whether a shortcut is registered in shortcut cache
   * @param {object} entry
   * @param {string} shortcutCache
   * @returns false if shortcut is not present in cache. the index if present
   */
  function isShortcutRegistered(entry, shortcutCache) {
    var returnedObject = segregateKeys(entry.newKey)
    var shortcutkey = returnedObject.newKey
    if (shortcutCache[shortcutkey] && shortcutCache[shortcutkey].length) {
      for (var i = 0; i < shortcutCache[shortcutkey].length; i++) {
        var item = shortcutCache[shortcutkey][i]
        if (item.pressTogether === returnedObject.pressTogether) {
          if (isEqual(item.modifier, returnedObject.modifier)) {
            return i;
            // console.error("The shortcut is already registered for ", processedKeys.newKey);
          }
          else {
            return false
          }
        } else {
          return false
        }
      }
    }
    else {
      return false
    }
  }

  /**
   * Replaces the shortcut in the cache
   * @param {object} entry
   * @param {string} shortcutCache
   * @param {integer} index the position at which the shortcut is present in the array
   */
  function replaceShortcut(entry, shortcutCache, index) {
    var value = entry.value
    var returnedObject = segregateKeys(entry.newKey)
    var wait
    var preventDefault
    if (entry.options) {
      wait = entry.options.wait ? entry.options.wait : 0
      preventDefault = entry.options.preventDefault ? entry.options.preventDefault : false
      useCode = entry.options.useCode ? entry.options.useCode : false
    }
    else {
      wait = 0
      preventDefault = false;
      useCode = false;
    }
    var type = typeof value
    shortcutCache[returnedObject.newKey][index] = {
      type: type,
      value: value,
      modifier: returnedObject.modifier,
      pressTogether: returnedObject.pressTogether,
      wait: wait,
      useKey: entry.useKey,
      preventDefault: preventDefault,
      useCode: useCode
    }
  }

  /**
   * Add new shortcut to the shortcut cache
   */
  function addNewShortcut(entry, shortcutCache) {
    var value = entry.value
    var returnedObject = segregateKeys(entry.newKey)
    var wait
    var preventDefault
    if (entry.options) {
      wait = entry.options.wait ? entry.options.wait : 0
      preventDefault = entry.options.preventDefault ? entry.options.preventDefault : false
      useCode = entry.options.useCode ? entry.options.useCode : false
    }
    else {
      wait = 0
      preventDefault = false;
      useCode = false;
    }
    var type = typeof value
    shortcutCache[returnedObject.newKey] = shortcutCache[returnedObject.newKey] || [];
    shortcutCache[returnedObject.newKey].push({
      type: type,
      value: value,
      modifier: returnedObject.modifier,
      pressTogether: returnedObject.pressTogether,
      wait: wait,
      useKey: entry.useKey,
      preventDefault: preventDefault,
      useCode: useCode
    })
  }

  /**
   * based on the presece of the shortcut in the cache, the shortcut is added to cache
   */
  function storeToCache(entry, shortcutCache) {
    var index = isShortcutRegistered(entry, shortcutCache)
    if (typeof (index) === "number") {
      replaceShortcut(entry, shortcutCache, index)
    }
    else {
      addNewShortcut(entry, shortcutCache)
    }
  }

  /**
   * Based on the useKey, the shortcut is being registered
   * @param {string} entry - The keys to be registered as shortcuts
   * @param {object} _regKeys - The object to which shortcuts needs to be stored
   */
  function storeShortcuts(entry) {
    removeFromCache(entry)

    if (entry.useKey) {
      storeToCache(entry, _registeredKeyShortcuts)
    }
    else {
      storeToCache(entry, _registeredKeys)
    }
  }

  /**
   *Checks whether the shortcut to be registered are of suggested types
   * @param {} keys
   * @param {function} callback - function to be invoked
   * @param {object} options - the attributes of shortcut(wait, type)
   * @param {boolean} useKey - defines the function used among (register() & registerKey())
   */
  function registerShortcut(keys, callback, options, useKey) {
    var type = typeof keys
    if (type !== 'string' && type !== 'object') {
      console.error("Invalid Type")
      return;
    }
    if (type === 'object') {
      _processObject(keys, callback, options, useKey)
    }
    else {
      _processString(keys, callback, options, useKey)
    }
  }

  // Constructor
  /**
   * Shortcut constructor
   * registers listeners
   */
  function shortcut(target) {
    _registerOtherKeys()
    target.addEventListener('keydown', _handleKeyPress)
  }

  // Public methods
  /**
   * Exposes the push function so that the custom elements register key presses
   */
  Object.defineProperty(shortcut, "push", {
    writable: false,
    value: function (entry) {
      // undefined or empty string cases or empty object
      if (!entry.newKey || entry.newKey === undefined || (typeof newValue === "object" && Object.keys(newValue).length === 0)) {
        if (entry.oldKey) {
          shortcut.unregister(entry.oldKey)
          shortcut.unregisterKey(entry.oldKey)
        } else {
          console.error("Trying to register shortcut for empty key combination.")
        }
        return;
      }
      storeShortcuts(entry)
    }
  })
  Object.defineProperty(shortcut, "pushKey", {
    writable: false,
    value: function (entry) {
      removeFromCache(entry)
      // undefined or empty string cases or empty object
      if (!entry.newKey || entry.newKey === undefined || (typeof newValue === "object" && Object.keys(newValue).length === 0)) {
        if (entry.oldKey) {
          shortcut.unregister(oldKey)
          shortcut.unregisterKey(oldKey)
        } else {
          console.error("Trying to register shortcut for empty key combination.")
        }
        return;
      }
      if (entry.useKey === undefined) {
        entry.useKey = true
      }
      storeToCache(entry, _registeredKeyShortcuts)
    }
  })

  /**
   * Checks whether the shortcut is already registered for these keys.
   */
  Object.defineProperty(shortcut, "hasRegisteredShortcut", {
    writable: false,
    value: function (keys) {
      keys = removeWhiteSpace(keys)
      var processedKeys = segregateKeys(keys.trim())
      var allRegisteredShortcutKeys = getAllRegisteredShortcutKeys();
      if (Object.keys(allRegisteredShortcutKeys).length === 0) {
        return false;
      }
      for (var keys in allRegisteredShortcutKeys) {
        if ((keys === processedKeys.newKey)) {
          for (var i = 0; i < allRegisteredShortcutKeys[keys].length; i++) {
            var item = allRegisteredShortcutKeys[keys][i]
            if (item.pressTogether === processedKeys.pressTogether) {
              if (isEqual(item.modifier, processedKeys.modifier)) {
                return true;
                // console.error("The shortcut is already registered for ", processedKeys.newKey);
              }
              else {
                return false;
                // console.log("No shortcut is registered for ", processedKeys.newKey);
              }
            }
            else {
              return false;
              // console.log("No shortcut is registered for ", processedKeys.newKey);
            }
          }
        }
      }
    }
  })

  /**
   * Exposes the register function so that developers can register key pressess
   */
  Object.defineProperty(shortcut, "registerKey", {
    writable: false,
    value: function (keys, callback, options) {
      var useKey = true;
      if (options && options.type) {
        options.type = options.type.trim()
      }
      if (options && options.type === 'regex') {
        _pushRegex(keys, callback, options, _registeredKeyShortcuts)
      }
      registerShortcut(keys, callback, options, useKey)
    }
  })

  Object.defineProperty(shortcut, "register", {
    writable: false,
    value: function (keys, callback, options) {
      var useKey = false;
      if (options && options.type === 'regex') {
        _pushRegex(keys, callback, options, _registeredKeys)
      }
      registerShortcut(keys, callback, options, useKey)
    }
  })

  /**
   * Exposes the unregister function so that developers can unregister already registered keys
   */
  Object.defineProperty(shortcut, "unregister", {
    writable: false,
    value: function (keys) {
      if (typeof keys === 'object') {
        for (var i = 0; i < keys.length; i++) {
          var _key = userToBrowserKeys(keys[i])
          _key = removeWhiteSpace(_key)
          _removeKey(_key, _registeredKeys);
        }
      }
      else {
        keys = removeWhiteSpace(keys)
        _removeKey(keys, _registeredKeys);
      }
    }
  })

  Object.defineProperty(shortcut, "unregisterKey", {
    writable: false,
    value: function (keys) {
      if (typeof keys === 'object') {
        for (var i = 0; i < keys.length; i++) {
          var _key = keys[i]
          _key = removeWhiteSpace(_key)
          _removeKey(_key, _registeredKeyShortcuts);
        }
      }
      else {
        keys = removeWhiteSpace(keys)
        _removeKey(keys, _registeredKeyShortcuts);
      }
    }
  })

  /**
   * Exposes the unregisterAll function so developers can unregister all keys at once
   */
  Object.defineProperty(shortcut, "unregisterAll", {
    writable: false,
    value: function () {
      for (var key in _registeredKeys) {
        delete _registeredKeys[key]
      }
      for (var key in _registeredKeyShortcuts) {
        delete _registeredKeyShortcuts[key]
      }
    }
  })

  // Intializing
  shortcut(document)
  window.shortcut = shortcut

})(window, document);

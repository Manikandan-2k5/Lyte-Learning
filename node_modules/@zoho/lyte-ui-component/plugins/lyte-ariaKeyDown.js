(function () { 
  document.addEventListener("keydown",
    function (e) {
      var elem = document.activeElement, isKeyDownEvent;
      if (elem && (isKeyDownEvent = checkKeyDownEvent(elem)) && elem.hasAttribute("role")) {
        switch (elem.getAttribute("role").toLowerCase()) {
          // case "textbox":
          // 		if (e.code === "Enter") {
          // 			e.preventDefault();
          // 			if (elem.getAttribute("aria-multiline") === null ||
          // 				elem.getAttribute("aria-multiline") === "false") {
          // 				e.preventDefault();
          // 				document.querySelector("[type = 'submit']").click();
          // 			}
          // 		}
          // 	break;
          case "checkbox":
            if (e.key === " ") {
              e.preventDefault();
              elem.click();
            }
            break;
          case "button":
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              elem.click();
            }
            break;
          case "radiogroup":
            {
              const options = Array.from(elem.querySelectorAll("[role='radio']"));
              var flag = false, idx;
              options.map(function (elem, index) {
                if (elem.getAttribute("aria-checked") === "true") {
                  flag = true;
                  idx = index;
                }
              })
              if (e.code === "ArrowDown" || e.code === "ArrowRight") {
                e.preventDefault();
                if (flag) {
                  options[idx].setAttribute("aria-checked", "false");
                  if ((idx + 1) >= options.length) { idx = 0; }
                  else { idx = idx + 1; }
                  options[idx].setAttribute("aria-checked", "true");
                }
              }
              if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
                e.preventDefault();
                if (flag) {
                  options[idx].setAttribute("aria-checked", "false")
                  if ((idx - 1) < 0) { idx = (options.length - 1); }
                  else { idx = idx - 1; }
                  options[idx].setAttribute("aria-checked", "true");
                }
              }
              if (e.code === "Space") {
                e.preventDefault();
                options[0].click();
              }
            }
            break;
          case "link":
            if (e.key === "Enter") {
              e.preventDefault();
              const ref = e.target;
              if (ref) {
                window.open(ref.getAttribute("data-href"));
              }
            }
            break;
          case "switch":
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              elem.click();
            }
            break;
            case "menuitem":
              if (e.key === " " || e.key === "Enter") { 
                e.preventDefault();
                elem.click();
              }
        }
      }
    }, true);
    function checkKeyDownEvent(elem){ 
      var isKeyDownEvent = elem.getAttribute("lt-prop-aria-keydown");
      if (isKeyDownEvent === null || isKeyDownEvent === "false") { isKeyDownEvent = false; }
      else if (isKeyDownEvent === "" || isKeyDownEvent === "true") { isKeyDownEvent = true; }
              return isKeyDownEvent;
  }
})();

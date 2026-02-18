/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Resources/assets/js/picker.js"
/*!*******************************************!*\
  !*** ./src/Resources/assets/js/picker.js ***!
  \*******************************************/
() {

/**
 * Filemanager picker widget – modale iframe et écoute postMessage.
 * À charger sur les pages qui contiennent des champs filemanager_picker.
 */
(function () {
  var MESSAGE_TYPE = 'keyboardman.filemanager.picked';
  function openModal(widget) {
    var url = widget.getAttribute('data-picker-url') || '/filemanager';
    var channel = widget.getAttribute('data-channel') || '';
    var base = url.indexOf('?') !== -1 ? url + '&' : url + '?';
    var iframeSrc = base + 'picker=1&channel=' + encodeURIComponent(channel);
    var overlay = document.getElementById('filemanager-picker-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'filemanager-picker-overlay';
      overlay.className = 'filemanager-picker-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '<div class="filemanager-picker-dialog" role="dialog">' + '<button type="button" class="filemanager-picker-close" aria-label="Fermer">&times;</button>' + '<iframe title="Choisir un fichier" class="filemanager-picker-iframe"></iframe>' + '</div>';
      document.body.appendChild(overlay);
      overlay.querySelector('.filemanager-picker-close').addEventListener('click', closeModal);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') closeModal();
      });
    }
    overlay.querySelector('.filemanager-picker-iframe').src = iframeSrc;
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    var overlay = document.getElementById('filemanager-picker-overlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    var iframe = overlay.querySelector('.filemanager-picker-iframe');
    if (iframe) iframe.src = 'about:blank';
  }
  function onMessage(event) {
    if (event.origin !== window.location.origin) return;
    var data = event.data;
    if (!data || data.type !== MESSAGE_TYPE || !data.channel) return;
    var widgets = document.querySelectorAll('.filemanager-picker-widget');
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].getAttribute('data-channel') === data.channel) {
        var input = widgets[i].querySelector('input');
        if (input) {
          input.value = data.path || '';
          input.dispatchEvent(new Event('input', {
            bubbles: true
          }));
        }
        closeModal();
        break;
      }
    }
  }
  function init() {
    window.addEventListener('message', onMessage);
    document.querySelectorAll('.filemanager-picker-widget').forEach(function (widget) {
      var btn = widget.querySelector('.filemanager-picker-btn');
      if (btn) btn.addEventListener('click', function () {
        openModal(widget);
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/***/ },

/***/ "./src/Resources/assets/styles/picker.css"
/*!************************************************!*\
  !*** ./src/Resources/assets/styles/picker.css ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./src/Resources/assets/js/picker.entry.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_picker_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/picker.css */ "./src/Resources/assets/styles/picker.css");
/* harmony import */ var _picker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./picker.js */ "./src/Resources/assets/js/picker.js");
/* harmony import */ var _picker_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_picker_js__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Point d'entrée Webpack pour le widget picker (formulaire).
 */


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsWUFBWSxHQUFHLGdDQUFnQztFQUVyRCxTQUFTQyxTQUFTQSxDQUFDQyxNQUFNLEVBQUU7SUFDdkIsSUFBTUMsR0FBRyxHQUFHRCxNQUFNLENBQUNFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLGNBQWM7SUFDcEUsSUFBTUMsT0FBTyxHQUFHSCxNQUFNLENBQUNFLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFO0lBQ3pELElBQU1FLElBQUksR0FBR0gsR0FBRyxDQUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUdKLEdBQUcsR0FBRyxHQUFHLEdBQUdBLEdBQUcsR0FBRyxHQUFHO0lBQzVELElBQU1LLFNBQVMsR0FBR0YsSUFBSSxHQUFHLG1CQUFtQixHQUFHRyxrQkFBa0IsQ0FBQ0osT0FBTyxDQUFDO0lBRTFFLElBQUlLLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsNEJBQTRCLENBQUM7SUFDbkUsSUFBSSxDQUFDRixPQUFPLEVBQUU7TUFDVkEsT0FBTyxHQUFHQyxRQUFRLENBQUNFLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDdkNILE9BQU8sQ0FBQ0ksRUFBRSxHQUFHLDRCQUE0QjtNQUN6Q0osT0FBTyxDQUFDSyxTQUFTLEdBQUcsNEJBQTRCO01BQ2hETCxPQUFPLENBQUNNLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO01BQzNDTixPQUFPLENBQUNPLFNBQVMsR0FDYix1REFBdUQsR0FDdkQsNkZBQTZGLEdBQzdGLGdGQUFnRixHQUNoRixRQUFRO01BQ1pOLFFBQVEsQ0FBQ08sSUFBSSxDQUFDQyxXQUFXLENBQUNULE9BQU8sQ0FBQztNQUVsQ0EsT0FBTyxDQUFDVSxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFQyxVQUFVLENBQUM7TUFDeEZaLE9BQU8sQ0FBQ1csZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVVFLENBQUMsRUFBRTtRQUMzQyxJQUFJQSxDQUFDLENBQUNDLE1BQU0sS0FBS2QsT0FBTyxFQUFFWSxVQUFVLENBQUMsQ0FBQztNQUMxQyxDQUFDLENBQUM7TUFDRlgsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVUUsQ0FBQyxFQUFFO1FBQzlDLElBQUlBLENBQUMsQ0FBQ0UsR0FBRyxLQUFLLFFBQVEsSUFBSWYsT0FBTyxDQUFDTixZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssT0FBTyxFQUFFa0IsVUFBVSxDQUFDLENBQUM7TUFDM0YsQ0FBQyxDQUFDO0lBQ047SUFFQVosT0FBTyxDQUFDVSxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQ00sR0FBRyxHQUFHbEIsU0FBUztJQUNuRUUsT0FBTyxDQUFDaUIsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUM5QmxCLE9BQU8sQ0FBQ00sWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7RUFDaEQ7RUFFQSxTQUFTTSxVQUFVQSxDQUFBLEVBQUc7SUFDbEIsSUFBTVosT0FBTyxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQztJQUNyRSxJQUFJLENBQUNGLE9BQU8sRUFBRTtJQUNkQSxPQUFPLENBQUNpQixLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO0lBQzlCbEIsT0FBTyxDQUFDTSxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQztJQUMzQyxJQUFNYSxNQUFNLEdBQUduQixPQUFPLENBQUNVLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQztJQUNsRSxJQUFJUyxNQUFNLEVBQUVBLE1BQU0sQ0FBQ0gsR0FBRyxHQUFHLGFBQWE7RUFDMUM7RUFFQSxTQUFTSSxTQUFTQSxDQUFDQyxLQUFLLEVBQUU7SUFDdEIsSUFBSUEsS0FBSyxDQUFDQyxNQUFNLEtBQUtDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDRixNQUFNLEVBQUU7SUFDN0MsSUFBTUcsSUFBSSxHQUFHSixLQUFLLENBQUNJLElBQUk7SUFDdkIsSUFBSSxDQUFDQSxJQUFJLElBQUlBLElBQUksQ0FBQ0MsSUFBSSxLQUFLcEMsWUFBWSxJQUFJLENBQUNtQyxJQUFJLENBQUM5QixPQUFPLEVBQUU7SUFDMUQsSUFBTWdDLE9BQU8sR0FBRzFCLFFBQVEsQ0FBQzJCLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDO0lBQ3ZFLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixPQUFPLENBQUNHLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDckMsSUFBSUYsT0FBTyxDQUFDRSxDQUFDLENBQUMsQ0FBQ25DLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSytCLElBQUksQ0FBQzlCLE9BQU8sRUFBRTtRQUMxRCxJQUFNb0MsS0FBSyxHQUFHSixPQUFPLENBQUNFLENBQUMsQ0FBQyxDQUFDbkIsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJcUIsS0FBSyxFQUFFO1VBQ1BBLEtBQUssQ0FBQ0MsS0FBSyxHQUFHUCxJQUFJLENBQUNRLElBQUksSUFBSSxFQUFFO1VBQzdCRixLQUFLLENBQUNHLGFBQWEsQ0FBQyxJQUFJQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQUVDLE9BQU8sRUFBRTtVQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlEO1FBQ0F4QixVQUFVLENBQUMsQ0FBQztRQUNaO01BQ0o7SUFDSjtFQUNKO0VBRUEsU0FBU3lCLElBQUlBLENBQUEsRUFBRztJQUNaZCxNQUFNLENBQUNaLGdCQUFnQixDQUFDLFNBQVMsRUFBRVMsU0FBUyxDQUFDO0lBQzdDbkIsUUFBUSxDQUFDMkIsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsQ0FBQ1UsT0FBTyxDQUFDLFVBQVU5QyxNQUFNLEVBQUU7TUFDOUUsSUFBTStDLEdBQUcsR0FBRy9DLE1BQU0sQ0FBQ2tCLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztNQUMzRCxJQUFJNkIsR0FBRyxFQUFFQSxHQUFHLENBQUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWTtRQUFFcEIsU0FBUyxDQUFDQyxNQUFNLENBQUM7TUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQyxDQUFDO0VBQ047RUFFQSxJQUFJUyxRQUFRLENBQUN1QyxVQUFVLEtBQUssU0FBUyxFQUFFO0lBQ25DdkMsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTBCLElBQUksQ0FBQztFQUN2RCxDQUFDLE1BQU07SUFDSEEsSUFBSSxDQUFDLENBQUM7RUFDVjtBQUNKLENBQUMsRUFBRSxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ2hGSjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZXlib2FyZG1hbi9maWxlbWFuYWdlci1idW5kbGUvLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy9waWNrZXIuanMiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvc3R5bGVzL3BpY2tlci5jc3M/NWMwMSIsIndlYnBhY2s6Ly9rZXlib2FyZG1hbi9maWxlbWFuYWdlci1idW5kbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2tleWJvYXJkbWFuL2ZpbGVtYW5hZ2VyLWJ1bmRsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvcGlja2VyLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW1hbmFnZXIgcGlja2VyIHdpZGdldCDigJMgbW9kYWxlIGlmcmFtZSBldCDDqWNvdXRlIHBvc3RNZXNzYWdlLlxuICogw4AgY2hhcmdlciBzdXIgbGVzIHBhZ2VzIHF1aSBjb250aWVubmVudCBkZXMgY2hhbXBzIGZpbGVtYW5hZ2VyX3BpY2tlci5cbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBNRVNTQUdFX1RZUEUgPSAna2V5Ym9hcmRtYW4uZmlsZW1hbmFnZXIucGlja2VkJztcblxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbCh3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gd2lkZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWNrZXItdXJsJykgfHwgJy9maWxlbWFuYWdlcic7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSB3aWRnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW5uZWwnKSB8fCAnJztcbiAgICAgICAgY29uc3QgYmFzZSA9IHVybC5pbmRleE9mKCc/JykgIT09IC0xID8gdXJsICsgJyYnIDogdXJsICsgJz8nO1xuICAgICAgICBjb25zdCBpZnJhbWVTcmMgPSBiYXNlICsgJ3BpY2tlcj0xJmNoYW5uZWw9JyArIGVuY29kZVVSSUNvbXBvbmVudChjaGFubmVsKTtcblxuICAgICAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlbWFuYWdlci1waWNrZXItb3ZlcmxheScpO1xuICAgICAgICBpZiAoIW92ZXJsYXkpIHtcbiAgICAgICAgICAgIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIG92ZXJsYXkuaWQgPSAnZmlsZW1hbmFnZXItcGlja2VyLW92ZXJsYXknO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc05hbWUgPSAnZmlsZW1hbmFnZXItcGlja2VyLW92ZXJsYXknO1xuICAgICAgICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIG92ZXJsYXkuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZpbGVtYW5hZ2VyLXBpY2tlci1kaWFsb2dcIiByb2xlPVwiZGlhbG9nXCI+JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZmlsZW1hbmFnZXItcGlja2VyLWNsb3NlXCIgYXJpYS1sYWJlbD1cIkZlcm1lclwiPiZ0aW1lczs8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAnPGlmcmFtZSB0aXRsZT1cIkNob2lzaXIgdW4gZmljaGllclwiIGNsYXNzPVwiZmlsZW1hbmFnZXItcGlja2VyLWlmcmFtZVwiPjwvaWZyYW1lPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcblxuICAgICAgICAgICAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuZmlsZW1hbmFnZXItcGlja2VyLWNsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU1vZGFsKTtcbiAgICAgICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gb3ZlcmxheSkgY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG92ZXJsYXkuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpID09PSAnZmFsc2UnKSBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmZpbGVtYW5hZ2VyLXBpY2tlci1pZnJhbWUnKS5zcmMgPSBpZnJhbWVTcmM7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlbWFuYWdlci1waWNrZXItb3ZlcmxheScpO1xuICAgICAgICBpZiAoIW92ZXJsYXkpIHJldHVybjtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5maWxlbWFuYWdlci1waWNrZXItaWZyYW1lJyk7XG4gICAgICAgIGlmIChpZnJhbWUpIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVzc2FnZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhO1xuICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS50eXBlICE9PSBNRVNTQUdFX1RZUEUgfHwgIWRhdGEuY2hhbm5lbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB3aWRnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbGVtYW5hZ2VyLXBpY2tlci13aWRnZXQnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWRnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAod2lkZ2V0c1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2hhbm5lbCcpID09PSBkYXRhLmNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHdpZGdldHNbaV0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBkYXRhLnBhdGggfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbGVtYW5hZ2VyLXBpY2tlci13aWRnZXQnKS5mb3JFYWNoKGZ1bmN0aW9uICh3aWRnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IHdpZGdldC5xdWVyeVNlbGVjdG9yKCcuZmlsZW1hbmFnZXItcGlja2VyLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGJ0bikgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkgeyBvcGVuTW9kYWwod2lkZ2V0KTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXQoKTtcbiAgICB9XG59KSgpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDaGVjayBpZiBtb2R1bGUgZXhpc3RzIChkZXZlbG9wbWVudCBvbmx5KVxuXHRpZiAoX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBQb2ludCBkJ2VudHLDqWUgV2VicGFjayBwb3VyIGxlIHdpZGdldCBwaWNrZXIgKGZvcm11bGFpcmUpLlxuICovXG5pbXBvcnQgJy4uL3N0eWxlcy9waWNrZXIuY3NzJztcbmltcG9ydCAnLi9waWNrZXIuanMnO1xuIl0sIm5hbWVzIjpbIk1FU1NBR0VfVFlQRSIsIm9wZW5Nb2RhbCIsIndpZGdldCIsInVybCIsImdldEF0dHJpYnV0ZSIsImNoYW5uZWwiLCJiYXNlIiwiaW5kZXhPZiIsImlmcmFtZVNyYyIsImVuY29kZVVSSUNvbXBvbmVudCIsIm92ZXJsYXkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiY2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiYm9keSIsImFwcGVuZENoaWxkIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbG9zZU1vZGFsIiwiZSIsInRhcmdldCIsImtleSIsInNyYyIsInN0eWxlIiwiZGlzcGxheSIsImlmcmFtZSIsIm9uTWVzc2FnZSIsImV2ZW50Iiwib3JpZ2luIiwid2luZG93IiwibG9jYXRpb24iLCJkYXRhIiwidHlwZSIsIndpZGdldHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbmd0aCIsImlucHV0IiwidmFsdWUiLCJwYXRoIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImluaXQiLCJmb3JFYWNoIiwiYnRuIiwicmVhZHlTdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=
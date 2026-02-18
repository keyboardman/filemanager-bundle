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
  function setInputValue(input, value) {
    if (!input) return;
    input.value = value || '';
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
  }
  function onMessage(event) {
    if (event.origin !== window.location.origin) return;
    var data = event.data;
    if (!data || data.type !== MESSAGE_TYPE || !data.channel) return;
    var widgets = document.querySelectorAll('.filemanager-picker-widget');
    var _loop = function _loop() {
      if (widgets[i].getAttribute('data-channel') === data.channel) {
        var input = widgets[i].querySelector('input');
        var valueType = widgets[i].getAttribute('data-value-type') || 'path';
        var path = data.path || '';
        var filesystem = data.filesystem != null ? data.filesystem : 'default';
        if (valueType === 'url') {
          var resolveUrl = widgets[i].getAttribute('data-resolve-url');
          if (resolveUrl) {
            var url = resolveUrl + (resolveUrl.indexOf('?') !== -1 ? '&' : '?') + 'filesystem=' + encodeURIComponent(filesystem) + '&path=' + encodeURIComponent(path);
            fetch(url).then(function (r) {
              return r.json();
            }).then(function (json) {
              setInputValue(input, json.url || '');
              closeModal();
            })["catch"](function () {
              setInputValue(input, filesystem + ':' + path);
              closeModal();
            });
          } else {
            setInputValue(input, filesystem + ':' + path);
            closeModal();
          }
        } else {
          setInputValue(input, filesystem + ':' + path);
          closeModal();
        }
        return 1; // break
      }
    };
    for (var i = 0; i < widgets.length; i++) {
      if (_loop()) break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZXlib2FyZG1hbi9maWxlbWFuYWdlci1idW5kbGUvLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy9waWNrZXIuanMiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvc3R5bGVzL3BpY2tlci5jc3M/NWMwMSIsIndlYnBhY2s6Ly9rZXlib2FyZG1hbi9maWxlbWFuYWdlci1idW5kbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2tleWJvYXJkbWFuL2ZpbGVtYW5hZ2VyLWJ1bmRsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2V5Ym9hcmRtYW4vZmlsZW1hbmFnZXItYnVuZGxlLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvcGlja2VyLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW1hbmFnZXIgcGlja2VyIHdpZGdldCDigJMgbW9kYWxlIGlmcmFtZSBldCDDqWNvdXRlIHBvc3RNZXNzYWdlLlxuICogw4AgY2hhcmdlciBzdXIgbGVzIHBhZ2VzIHF1aSBjb250aWVubmVudCBkZXMgY2hhbXBzIGZpbGVtYW5hZ2VyX3BpY2tlci5cbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBNRVNTQUdFX1RZUEUgPSAna2V5Ym9hcmRtYW4uZmlsZW1hbmFnZXIucGlja2VkJztcblxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbCh3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gd2lkZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1waWNrZXItdXJsJykgfHwgJy9maWxlbWFuYWdlcic7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSB3aWRnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW5uZWwnKSB8fCAnJztcbiAgICAgICAgY29uc3QgYmFzZSA9IHVybC5pbmRleE9mKCc/JykgIT09IC0xID8gdXJsICsgJyYnIDogdXJsICsgJz8nO1xuICAgICAgICBjb25zdCBpZnJhbWVTcmMgPSBiYXNlICsgJ3BpY2tlcj0xJmNoYW5uZWw9JyArIGVuY29kZVVSSUNvbXBvbmVudChjaGFubmVsKTtcblxuICAgICAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlbWFuYWdlci1waWNrZXItb3ZlcmxheScpO1xuICAgICAgICBpZiAoIW92ZXJsYXkpIHtcbiAgICAgICAgICAgIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIG92ZXJsYXkuaWQgPSAnZmlsZW1hbmFnZXItcGlja2VyLW92ZXJsYXknO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc05hbWUgPSAnZmlsZW1hbmFnZXItcGlja2VyLW92ZXJsYXknO1xuICAgICAgICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIG92ZXJsYXkuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZpbGVtYW5hZ2VyLXBpY2tlci1kaWFsb2dcIiByb2xlPVwiZGlhbG9nXCI+JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZmlsZW1hbmFnZXItcGlja2VyLWNsb3NlXCIgYXJpYS1sYWJlbD1cIkZlcm1lclwiPiZ0aW1lczs8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAnPGlmcmFtZSB0aXRsZT1cIkNob2lzaXIgdW4gZmljaGllclwiIGNsYXNzPVwiZmlsZW1hbmFnZXItcGlja2VyLWlmcmFtZVwiPjwvaWZyYW1lPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcblxuICAgICAgICAgICAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuZmlsZW1hbmFnZXItcGlja2VyLWNsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU1vZGFsKTtcbiAgICAgICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gb3ZlcmxheSkgY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG92ZXJsYXkuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpID09PSAnZmFsc2UnKSBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmZpbGVtYW5hZ2VyLXBpY2tlci1pZnJhbWUnKS5zcmMgPSBpZnJhbWVTcmM7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlbWFuYWdlci1waWNrZXItb3ZlcmxheScpO1xuICAgICAgICBpZiAoIW92ZXJsYXkpIHJldHVybjtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5maWxlbWFuYWdlci1waWNrZXItaWZyYW1lJyk7XG4gICAgICAgIGlmIChpZnJhbWUpIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldElucHV0VmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIGlmICghaW5wdXQpIHJldHVybjtcbiAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lc3NhZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuO1xuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEudHlwZSAhPT0gTUVTU0FHRV9UWVBFIHx8ICFkYXRhLmNoYW5uZWwpIHJldHVybjtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWxlbWFuYWdlci1waWNrZXItd2lkZ2V0Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHdpZGdldHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW5uZWwnKSA9PT0gZGF0YS5jaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB3aWRnZXRzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVUeXBlID0gd2lkZ2V0c1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUtdHlwZScpIHx8ICdwYXRoJztcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gZGF0YS5wYXRoIHx8ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzeXN0ZW0gPSBkYXRhLmZpbGVzeXN0ZW0gIT0gbnVsbCA/IGRhdGEuZmlsZXN5c3RlbSA6ICdkZWZhdWx0JztcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVR5cGUgPT09ICd1cmwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVVcmwgPSB3aWRnZXRzW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1yZXNvbHZlLXVybCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZVVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVybCArIChyZXNvbHZlVXJsLmluZGV4T2YoJz8nKSAhPT0gLTEgPyAnJicgOiAnPycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmlsZXN5c3RlbT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVzeXN0ZW0pICsgJyZwYXRoPScgKyBlbmNvZGVVUklDb21wb25lbnQocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaCh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIuanNvbigpOyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElucHV0VmFsdWUoaW5wdXQsIGpzb24udXJsIHx8ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShpbnB1dCwgZmlsZXN5c3RlbSArICc6JyArIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGlucHV0LCBmaWxlc3lzdGVtICsgJzonICsgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGlucHV0LCBmaWxlc3lzdGVtICsgJzonICsgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWxlbWFuYWdlci1waWNrZXItd2lkZ2V0JykuZm9yRWFjaChmdW5jdGlvbiAod2lkZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSB3aWRnZXQucXVlcnlTZWxlY3RvcignLmZpbGVtYW5hZ2VyLXBpY2tlci1idG4nKTtcbiAgICAgICAgICAgIGlmIChidG4pIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgb3Blbk1vZGFsKHdpZGdldCk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbml0KCk7XG4gICAgfVxufSkoKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGV4aXN0cyAoZGV2ZWxvcG1lbnQgb25seSlcblx0aWYgKF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogUG9pbnQgZCdlbnRyw6llIFdlYnBhY2sgcG91ciBsZSB3aWRnZXQgcGlja2VyIChmb3JtdWxhaXJlKS5cbiAqL1xuaW1wb3J0ICcuLi9zdHlsZXMvcGlja2VyLmNzcyc7XG5pbXBvcnQgJy4vcGlja2VyLmpzJztcbiJdLCJuYW1lcyI6WyJNRVNTQUdFX1RZUEUiLCJvcGVuTW9kYWwiLCJ3aWRnZXQiLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJjaGFubmVsIiwiYmFzZSIsImluZGV4T2YiLCJpZnJhbWVTcmMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJvdmVybGF5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsImUiLCJ0YXJnZXQiLCJrZXkiLCJzcmMiLCJzdHlsZSIsImRpc3BsYXkiLCJpZnJhbWUiLCJzZXRJbnB1dFZhbHVlIiwiaW5wdXQiLCJ2YWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImJ1YmJsZXMiLCJvbk1lc3NhZ2UiLCJldmVudCIsIm9yaWdpbiIsIndpbmRvdyIsImxvY2F0aW9uIiwiZGF0YSIsInR5cGUiLCJ3aWRnZXRzIiwicXVlcnlTZWxlY3RvckFsbCIsIl9sb29wIiwiaSIsInZhbHVlVHlwZSIsInBhdGgiLCJmaWxlc3lzdGVtIiwicmVzb2x2ZVVybCIsImZldGNoIiwidGhlbiIsInIiLCJqc29uIiwibGVuZ3RoIiwiaW5pdCIsImZvckVhY2giLCJidG4iLCJyZWFkeVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==
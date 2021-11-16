/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/css/index.css":
/*!**********************************!*\
  !*** ./src/assets/css/index.css ***!
  \**********************************/
/***/ ((module) => {

eval("var styleEle = document.createElement('style');\n    styleEle.innerText = `/*\r\n* @Author: lsx\r\n* @Date:   2021-06-15 14:58:01\r\n* @Last Modified by:   smallsky\r\n* @Last Modified time: 2021-06-15 14:58:23\r\n*/\r\nbody {\r\n    background-color: #f40;\r\n    color: #fff;\r\n}`;\n    document.head.appendChild(styleEle);module.exports=`/*\r\n* @Author: lsx\r\n* @Date:   2021-06-15 14:58:01\r\n* @Last Modified by:   smallsky\r\n* @Last Modified time: 2021-06-15 14:58:23\r\n*/\r\nbody {\r\n    background-color: #f40;\r\n    color: #fff;\r\n}`\n\n//# sourceURL=webpack://demo4/./src/assets/css/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\r\n* @Author: lsx\r\n* @Date:   2021-06-15 14:57:32\r\n* @Last Modified by:   smallsky\r\n* @Last Modified time: 2021-06-15 15:10:56\r\n*/\r\nconst result = __webpack_require__(/*! ./assets/css/index.css */ \"./src/assets/css/index.css\");\r\nconsole.log(result);\n\n//# sourceURL=webpack://demo4/./src/index.js?");

/***/ })

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
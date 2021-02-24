/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"about":"about"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/index.js\");\n/* harmony import */ var _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/AuthenticationService */ \"./src/services/AuthenticationService.ts\");\n/* harmony import */ var _services_Tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Tokens */ \"./src/services/Tokens.ts\");\n\r\n\r\n\r\n\r\nconst auth = new _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\nconst tokens = _services_Tokens__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInstance();\r\nlet Home = class Home extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__[\"Vue\"] {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.isLoading = false;\r\n    }\r\n    ensureUser() {\r\n        auth.getUser().then((user) => {\r\n            if (user) {\r\n                tokens.setAccessToken(user.access_token);\r\n            }\r\n            else {\r\n                auth.login();\r\n            }\r\n        });\r\n    }\r\n    isLoadingCallback(loading) {\r\n        this.isLoading = loading;\r\n    }\r\n    created() {\r\n    }\r\n    mounted() {\r\n        this.ensureUser();\r\n        this.$api.RequestHandler.isLoadingCallback(this.isLoadingCallback);\r\n    }\r\n};\r\nHome = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"])([\r\n    vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__[\"Component\"]\r\n], Home);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\r\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/index.js\");\n/* harmony import */ var _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/AuthenticationService */ \"./src/services/AuthenticationService.ts\");\n\r\n\r\n\r\nconst auth = new _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\nlet Home = class Home extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__[\"Vue\"] {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.currentUser = \"\";\r\n        this.accessTokenExpired = false;\r\n        this.isLoggedIn = false;\r\n        this.values = [];\r\n        this.services = [];\r\n    }\r\n    get username() {\r\n        return this.currentUser;\r\n    }\r\n    login() {\r\n        auth.login();\r\n    }\r\n    logout() {\r\n        auth.logout();\r\n    }\r\n    mounted() {\r\n        auth.getUser().then((user) => {\r\n            if (user) {\r\n                this.currentUser = user.profile.name;\r\n                this.accessTokenExpired = user.expired;\r\n                this.isLoggedIn = (user !== null && !user.expired);\r\n            }\r\n        });\r\n    }\r\n    getUnProtectedApiData() {\r\n        this.$api.Values.get()\r\n            .then((response) => {\r\n            this.values = response.data;\r\n        })\r\n            .catch((error) => {\r\n            alert(error);\r\n        });\r\n    }\r\n    getProtectedApiData() {\r\n        this.$api.Secured.get()\r\n            .then((response) => {\r\n            this.values = response;\r\n        })\r\n            .catch((error) => {\r\n            alert(error);\r\n        });\r\n    }\r\n    clearData() {\r\n        this.values = [];\r\n        this.services = [];\r\n    }\r\n};\r\nHome = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"])([\r\n    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__[\"Component\"])({\r\n        components: {},\r\n    })\r\n], Home);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\r\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"a80e8290-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a80e8290-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { attrs: { id: \"app\" } },\n    [\n      _c(\n        \"div\",\n        { attrs: { id: \"nav\" } },\n        [\n          _c(\"router-link\", { attrs: { to: \"/\" } }, [_vm._v(\"Home\")]),\n          _vm._v(\" | \"),\n          _c(\"router-link\", { attrs: { to: \"/about\" } }, [_vm._v(\"About\")])\n        ],\n        1\n      ),\n      _c(\"router-view\")\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22a80e8290-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"a80e8290-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=template&id=fae5bece&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a80e8290-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=template&id=fae5bece& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"home\" },\n    [\n      _c(\"img\", {\n        attrs: { alt: \"Vue logo\", src: __webpack_require__(/*! ../assets/logo.png */ \"./src/assets/logo.png\") }\n      }),\n      _c(\"h1\", [_vm._v(\"Welcome to Your Vue.js + Identity Server\")]),\n      _c(\"div\", { staticClass: \"home\" }, [\n        _vm.isLoggedIn\n          ? _c(\"p\", [_vm._v(\"User: \" + _vm._s(_vm.username))])\n          : _vm._e(),\n        !_vm.isLoggedIn\n          ? _c(\"button\", { staticClass: \"btn\", on: { click: _vm.login } }, [\n              _vm._v(\"Login\")\n            ])\n          : _vm._e(),\n        _vm.isLoggedIn\n          ? _c(\"button\", { staticClass: \"btn\", on: { click: _vm.logout } }, [\n              _vm._v(\"Logout\")\n            ])\n          : _vm._e(),\n        _c(\n          \"button\",\n          { staticClass: \"btn\", on: { click: _vm.getUnProtectedApiData } },\n          [_vm._v(\"Get Unsecured API data\")]\n        ),\n        _vm.isLoggedIn\n          ? _c(\n              \"button\",\n              { staticClass: \"btn\", on: { click: _vm.getProtectedApiData } },\n              [_vm._v(\"Get Secured API data\")]\n            )\n          : _vm._e(),\n        _c(\"button\", { staticClass: \"btn\", on: { click: _vm.clearData } }, [\n          _vm._v(\"Clear\")\n        ])\n      ]),\n      _vm._l(_vm.values, function(item) {\n        return _c(\"div\", { key: item }, [_c(\"p\", [_vm._v(_vm._s(item))])])\n      }),\n      _vm._l(_vm.services, function(item) {\n        return _c(\"div\", { key: item.name }, [\n          _c(\"p\", [_vm._v(_vm._s(item.name))])\n        ])\n      })\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22a80e8290-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n#app {\\r\\n  font-family: Avenir, Helvetica, Arial, sans-serif;\\r\\n  -webkit-font-smoothing: antialiased;\\r\\n  -moz-osx-font-smoothing: grayscale;\\r\\n  text-align: center;\\r\\n  color: #2c3e50;\\n}\\n#nav {\\r\\n  padding: 30px;\\n}\\n#nav a {\\r\\n  font-weight: bold;\\r\\n  color: #2c3e50;\\n}\\n#nav a.router-link-exact-active {\\r\\n  color: #42b983;\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.btn {\\n    color: #42b983;\\n    font-weight: bold;\\n    background-color: #007bff;\\n    border-color: #007bff;\\n    display: inline-block;\\n    font-weight: 400;\\n    text-align: center;\\n    vertical-align: middle;\\n    -webkit-user-select: none;\\n    -moz-user-select: none;\\n    -ms-user-select: none;\\n    user-select: none;\\n    background-color: transparent;\\n    border: 1px solid #42b983;\\n    padding: .375rem .75rem;\\n    margin: 10px;\\n    font-size: 1rem;\\n    line-height: 1.5;\\n    border-radius: .25rem;\\n    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\\n}\\n\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"fa1ef42a\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=style&index=0&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"56ab1116\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts& */ \"./src/App.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ \"./src/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=ts&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=ts& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/ts-loader??ref--12-1!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--6-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_a80e8290_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"a80e8290-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"a80e8290-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_a80e8290_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_a80e8290_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/assets/logo.png":
/*!*****************************!*\
  !*** ./src/assets/logo.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/logo.82b9c7a5.png\";\n\n//# sourceURL=webpack:///./src/assets/logo.png?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/router/index.ts\");\n/* harmony import */ var _services_ApplicationContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/ApplicationContext */ \"./src/services/ApplicationContext.ts\");\n\r\n\r\n\r\n\r\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.productionTip = false;\r\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].prototype.$api = new _services_ApplicationContext__WEBPACK_IMPORTED_MODULE_3__[\"ApplicationContext\"](_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    router: _router__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n    render: h => h(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\r\n}).$mount('#app');\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _views_Home_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/Home.vue */ \"./src/views/Home.vue\");\n\r\n\r\n\r\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\nconst routes = [\r\n    {\r\n        path: '/',\r\n        name: 'Home',\r\n        component: _views_Home_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\r\n    },\r\n    {\r\n        path: '/about',\r\n        name: 'About',\r\n        // route level code-splitting\r\n        // this generates a separate chunk (about.[hash].js) for this route\r\n        // which is lazy-loaded when the route is visited.\r\n        component: () => __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../views/About.vue */ \"./src/views/About.vue\"))\r\n    }\r\n];\r\nconst router = new vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\r\n    mode: 'history',\r\n    base: \"/\",\r\n    routes\r\n});\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\r\n\n\n//# sourceURL=webpack:///./src/router/index.ts?");

/***/ }),

/***/ "./src/services/ApplicationContext.ts":
/*!********************************************!*\
  !*** ./src/services/ApplicationContext.ts ***!
  \********************************************/
/*! exports provided: ApplicationContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ApplicationContext\", function() { return ApplicationContext; });\n/* harmony import */ var _services_RequestHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/RequestHandler */ \"./src/services/RequestHandler.ts\");\n/* harmony import */ var _services_ValuesService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ValuesService */ \"./src/services/ValuesService.ts\");\n/* harmony import */ var _services_SecuredService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/SecuredService */ \"./src/services/SecuredService.ts\");\n/* harmony import */ var _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/AuthenticationService */ \"./src/services/AuthenticationService.ts\");\n\r\n\r\n\r\n\r\nclass ApplicationContext {\r\n    constructor(router) {\r\n        this.RequestHandler = new _services_RequestHandler__WEBPACK_IMPORTED_MODULE_0__[\"default\"](router);\r\n        this.Values = new _services_ValuesService__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.RequestHandler.Axios);\r\n        this.Secured = new _services_SecuredService__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.RequestHandler.Axios);\r\n        this.Authentication = new _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/ApplicationContext.ts?");

/***/ }),

/***/ "./src/services/AuthenticationService.ts":
/*!***********************************************!*\
  !*** ./src/services/AuthenticationService.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AuthenticationService; });\n/* harmony import */ var oidc_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! oidc-client */ \"./node_modules/oidc-client/lib/oidc-client.min.js\");\n/* harmony import */ var oidc_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(oidc_client__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass AuthenticationService {\r\n    constructor() {\r\n        const IDENTITY_DOMAIN = 'https://localhost:5443';\r\n        const settings = {\r\n            userStore: new oidc_client__WEBPACK_IMPORTED_MODULE_0__[\"WebStorageStateStore\"]({ store: window.localStorage }),\r\n            authority: IDENTITY_DOMAIN,\r\n            client_id: 'js',\r\n            redirect_uri: 'https://localhost:5000/callback.html',\r\n            automaticSilentRenew: true,\r\n            silent_redirect_uri: 'https://localhost:5000/silent-renew.html',\r\n            response_type: 'code',\r\n            scope: 'openid profile api1',\r\n            post_logout_redirect_uri: 'https://localhost:5000',\r\n            filterProtocolClaims: true,\r\n            accessTokenExpiringNotificationTime: 10,\r\n        };\r\n        this.userManager = new oidc_client__WEBPACK_IMPORTED_MODULE_0__[\"UserManager\"](settings);\r\n    }\r\n    getUser() {\r\n        return this.userManager.getUser();\r\n    }\r\n    login() {\r\n        return this.userManager.signinRedirect();\r\n    }\r\n    logout() {\r\n        return this.userManager.signoutRedirect();\r\n    }\r\n    getAccessToken() {\r\n        return this.userManager.getUser().then((data) => {\r\n            return data.access_token;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/AuthenticationService.ts?");

/***/ }),

/***/ "./src/services/LocalStorageService.ts":
/*!*********************************************!*\
  !*** ./src/services/LocalStorageService.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Storage; });\nclass Storage {\r\n    constructor(getStorage = () => window.localStorage) {\r\n        this.storage = getStorage();\r\n    }\r\n    get(key) {\r\n        return this.storage.getItem(key);\r\n    }\r\n    set(key, value) {\r\n        this.storage.setItem(key, value);\r\n    }\r\n    clearItem(key) {\r\n        this.storage.removeItem(key);\r\n    }\r\n    clearItems(keys) {\r\n        keys.forEach((key) => this.clearItem(key));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/LocalStorageService.ts?");

/***/ }),

/***/ "./src/services/RequestHandler.ts":
/*!****************************************!*\
  !*** ./src/services/RequestHandler.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RequestHandler; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/AuthenticationService */ \"./src/services/AuthenticationService.ts\");\n/* harmony import */ var _services_Tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Tokens */ \"./src/services/Tokens.ts\");\n//Parts of this taken from https://laptrinhx.com/how-does-axios-cancel-duplicate-requests-253816797/\r\n\r\n\r\n\r\nconst auth = new _services_AuthenticationService__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst tokens = _services_Tokens__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getInstance();\r\nclass RequestHandler {\r\n    constructor(router) {\r\n        this.pendingRequests = new Map();\r\n        this.requestCount = 0;\r\n        this.Axios = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create();\r\n        //if the user changes route, cancel everything\r\n        router.beforeEach((_to, _from, next) => {\r\n            this.clearPending(undefined);\r\n            next();\r\n        });\r\n        //XHR request handler\r\n        this.Axios.interceptors.request.use(config => {\r\n            this.ensureAuthorizationHeader(config);\r\n            this.addToRequestCount();\r\n            this.removePending(config, true); // check and cancel the previous request before the request starts\r\n            this.addPending(config); // add the current request to pending\r\n            return config;\r\n        }, error => {\r\n            this.subtractFromRequestCount();\r\n            return Promise.reject(error);\r\n        });\r\n        //XHR response handler\r\n        this.Axios.interceptors.response.use(response => {\r\n            this.subtractFromRequestCount();\r\n            this.removePending(response.config, false); // after the request, remove the request\r\n            return response;\r\n        }, error => {\r\n            //todo: remove from pending?\r\n            this.subtractFromRequestCount();\r\n            this.ensureAuthentication(error);\r\n            return Promise.reject(error);\r\n        });\r\n    }\r\n    isLoadingCallback(func) {\r\n        this.isLoadingFunc = func;\r\n    }\r\n    addToRequestCount() {\r\n        this.requestCount++;\r\n        this.isLoadingFunc(true);\r\n    }\r\n    subtractFromRequestCount() {\r\n        this.requestCount--;\r\n        this.isLoadingFunc(this.requestCount > 0);\r\n    }\r\n    requestSignature(config) {\r\n        return [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join(\"&\");\r\n    }\r\n    addPending(config) {\r\n        const url = this.requestSignature(config);\r\n        if (config.cancelToken) {\r\n            return;\r\n        }\r\n        var cancel = axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken.source();\r\n        config.cancelToken = cancel.token;\r\n        this.pendingRequests.set(url, cancel.cancel);\r\n    }\r\n    removePending(config, performCancel) {\r\n        const url = this.requestSignature(config);\r\n        // if the current request ID exists in pending, you need to cancel the current request and remove it\r\n        if (this.pendingRequests.has(url)) {\r\n            if (performCancel) {\r\n                const cancellationFunction = this.pendingRequests.get(url);\r\n                cancellationFunction(url); //url here is just for info\r\n            }\r\n            this.pendingRequests.delete(url);\r\n        }\r\n    }\r\n    clearPending(matcher) {\r\n        for (const [url, cancellationFunction] of this.pendingRequests) {\r\n            if (matcher && !url.includes(matcher)) {\r\n                continue;\r\n            }\r\n            cancellationFunction(url);\r\n        }\r\n        this.pendingRequests.clear();\r\n        this.requestCount = 0;\r\n        if (this.isLoadingFunc) {\r\n            this.isLoadingFunc(false);\r\n        }\r\n    }\r\n    ensureAuthorizationHeader(config) {\r\n        var token = tokens.getAccessToken();\r\n        if (token) {\r\n            config.headers.common['Authorization'] = 'Bearer ' + token;\r\n        }\r\n    }\r\n    ensureAuthentication(error) {\r\n        if (error != null && error.response.status === 401) {\r\n            auth.login();\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/RequestHandler.ts?");

/***/ }),

/***/ "./src/services/SecuredService.ts":
/*!****************************************!*\
  !*** ./src/services/SecuredService.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SecuredService; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass SecuredService {\r\n    constructor(instance) {\r\n        this.instance = instance ? instance : axios__WEBPACK_IMPORTED_MODULE_0___default.a.create();\r\n    }\r\n    get() {\r\n        let url_ = \"https://localhost:5000/api/secured\";\r\n        url_ = url_.replace(/[?&]$/, \"\");\r\n        let options_ = {\r\n            method: \"GET\",\r\n            url: url_,\r\n            headers: {\r\n                \"Accept\": \"application/json\"\r\n            }\r\n        };\r\n        return this.instance.request(options_).catch((_error) => {\r\n            if (isAxiosError(_error) && _error.response) {\r\n                return _error.response;\r\n            }\r\n            else {\r\n                throw _error;\r\n            }\r\n        }).then((_response) => {\r\n            return this.processGet(_response);\r\n        });\r\n    }\r\n    processGet(response) {\r\n        const status = response.status;\r\n        let _headers = {};\r\n        if (response.headers && typeof response.headers === \"object\") {\r\n            for (let k in response.headers) {\r\n                if (response.headers.hasOwnProperty(k)) {\r\n                    _headers[k] = response.headers[k];\r\n                }\r\n            }\r\n        }\r\n        if (status === 200) {\r\n            const _responseText = response.data;\r\n            let result200 = null;\r\n            let resultData200 = _responseText;\r\n            if (Array.isArray(resultData200)) {\r\n                result200 = [];\r\n                for (let item of resultData200)\r\n                    result200.push(item);\r\n            }\r\n            return result200;\r\n        }\r\n        else if (status !== 200 && status !== 204) {\r\n            const _responseText = response.data;\r\n            return throwException(\"An unexpected server error occurred.\", status, _responseText, _headers);\r\n        }\r\n        return Promise.resolve(null);\r\n    }\r\n}\r\nfunction throwException(message, status, response, headers, result) {\r\n    if (result !== null && result !== undefined)\r\n        throw result;\r\n    else\r\n        throw new Error(message);\r\n}\r\nfunction isAxiosError(obj) {\r\n    return obj && obj.isAxiosError === true;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/SecuredService.ts?");

/***/ }),

/***/ "./src/services/Tokens.ts":
/*!********************************!*\
  !*** ./src/services/Tokens.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tokens; });\n/* harmony import */ var _services_LocalStorageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/LocalStorageService */ \"./src/services/LocalStorageService.ts\");\n\r\nvar Locals;\r\n(function (Locals) {\r\n    Locals[\"ACCESS_TOKEN\"] = \"access_token\";\r\n    Locals[\"REFRESH_TOKEN\"] = \"refresh_token\";\r\n    Locals[\"USER\"] = \"user\";\r\n})(Locals || (Locals = {}));\r\nclass Tokens extends _services_LocalStorageService__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor() {\r\n        super();\r\n    }\r\n    static getInstance() {\r\n        if (!this.instance) {\r\n            this.instance = new Tokens();\r\n        }\r\n        return this.instance;\r\n    }\r\n    getUser() {\r\n        var user = this.get(Locals.USER);\r\n        if (user) {\r\n            return JSON.parse(user);\r\n        }\r\n        return null;\r\n    }\r\n    setUser(user) {\r\n        this.set(Locals.USER, JSON.stringify(user));\r\n    }\r\n    getAccessToken() {\r\n        return this.get(Locals.ACCESS_TOKEN);\r\n    }\r\n    setAccessToken(accessToken) {\r\n        this.set(Locals.ACCESS_TOKEN, accessToken);\r\n    }\r\n    getRefreshToken() {\r\n        return this.get(Locals.REFRESH_TOKEN);\r\n    }\r\n    setRefreshToken(refreshToken) {\r\n        this.set(Locals.REFRESH_TOKEN, refreshToken);\r\n    }\r\n    clear() {\r\n        this.clearItems([Locals.ACCESS_TOKEN, Locals.REFRESH_TOKEN, Locals.USER]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/Tokens.ts?");

/***/ }),

/***/ "./src/services/ValuesService.ts":
/*!***************************************!*\
  !*** ./src/services/ValuesService.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ValuesService; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass ValuesService {\r\n    constructor(instance) {\r\n        this.instance = instance ? instance : axios__WEBPACK_IMPORTED_MODULE_0___default.a.create();\r\n    }\r\n    get() {\r\n        let url_ = \"https://localhost:5000/api/values\";\r\n        url_ = url_.replace(/[?&]$/, \"\");\r\n        let options_ = {\r\n            method: \"GET\",\r\n            url: url_,\r\n            headers: {\r\n                \"Accept\": \"application/json\"\r\n            }\r\n        };\r\n        return this.instance.request(options_).catch((_error) => {\r\n            if (isAxiosError(_error) && _error.response) {\r\n                return _error.response;\r\n            }\r\n            else {\r\n                throw _error;\r\n            }\r\n        }).then((_response) => {\r\n            return this.processGet(_response);\r\n        });\r\n    }\r\n    processGet(response) {\r\n        const status = response.status;\r\n        let _headers = {};\r\n        if (response.headers && typeof response.headers === \"object\") {\r\n            for (let k in response.headers) {\r\n                if (response.headers.hasOwnProperty(k)) {\r\n                    _headers[k] = response.headers[k];\r\n                }\r\n            }\r\n        }\r\n        if (status === 200) {\r\n            const _responseText = response.data;\r\n            let result200 = null;\r\n            let resultData200 = _responseText;\r\n            if (Array.isArray(resultData200)) {\r\n                result200 = [];\r\n                for (let item of resultData200)\r\n                    result200.push(item);\r\n            }\r\n            return result200;\r\n        }\r\n        else if (status !== 200 && status !== 204) {\r\n            const _responseText = response.data;\r\n            return throwException(\"An unexpected server error occurred.\", status, _responseText, _headers);\r\n        }\r\n        return Promise.resolve(null);\r\n    }\r\n}\r\nfunction throwException(message, status, response, headers, result) {\r\n    if (result !== null && result !== undefined)\r\n        throw result;\r\n    else\r\n        throw new Error(message);\r\n}\r\nfunction isAxiosError(obj) {\r\n    return obj && obj.isAxiosError === true;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/ValuesService.ts?");

/***/ }),

/***/ "./src/views/Home.vue":
/*!****************************!*\
  !*** ./src/views/Home.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=fae5bece& */ \"./src/views/Home.vue?vue&type=template&id=fae5bece&\");\n/* harmony import */ var _Home_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=ts& */ \"./src/views/Home.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.vue?vue&type=style&index=0&lang=css& */ \"./src/views/Home.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Home_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/Home.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=script&lang=ts&":
/*!*****************************************************!*\
  !*** ./src/views/Home.vue?vue&type=script&lang=ts& ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************!*\
  !*** ./src/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=template&id=fae5bece&":
/*!***********************************************************!*\
  !*** ./src/views/Home.vue?vue&type=template&id=fae5bece& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_a80e8290_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"a80e8290-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=fae5bece& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"a80e8290-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=template&id=fae5bece&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_a80e8290_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_a80e8290_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/main.ts?");

/***/ })

/******/ });
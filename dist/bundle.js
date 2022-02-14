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

/***/ "./src/api_config.js":
/*!***************************!*\
  !*** ./src/api_config.js ***!
  \***************************/
/***/ ((module) => {

eval("const apiUrl = \"https://api.github.com\";\r\nconst usersUrl = `${apiUrl}/users`;\r\n\r\nconst headers = {\r\n    \"Accept\": \"application/vnd.github.v3+json\"\r\n}\r\n\r\nconst getOptions = {\r\n    method: 'GET',\r\n    headers: headers,\r\n}\r\n\r\nmodule.exports = { usersUrl, getOptions };\r\n\n\n//# sourceURL=webpack://hw7_ajax/./src/api_config.js?");

/***/ }),

/***/ "./src/debounce.js":
/*!*************************!*\
  !*** ./src/debounce.js ***!
  \*************************/
/***/ (function(module) {

eval("const debounce = (fn, time = 500) => {\r\n    let timer;\r\n    return (...args) => {\r\n        clearTimeout(timer);\r\n        timer = setTimeout(() => fn.apply(this, args), time)\r\n    }\r\n}\r\n\r\nmodule.exports = { debounce }\n\n//# sourceURL=webpack://hw7_ajax/./src/debounce.js?");

/***/ }),

/***/ "./src/get_user.js":
/*!*************************!*\
  !*** ./src/get_user.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { fetchData } = __webpack_require__(/*! ./requests */ \"./src/requests.js\");\r\nconst { usersUrl, getOptions } = __webpack_require__(/*! ./api_config */ \"./src/api_config.js\");\r\n\r\n\r\nconst getUser = (user) => {\r\n    const url = `${usersUrl}/${user}`;\r\n    return fetchData(url, getOptions)\r\n}\r\n\r\nconst getData = (reposUrl) => {\r\n    return fetchData(reposUrl, getOptions)\r\n}\r\n\r\nmodule.exports = { getUser, getData }\n\n//# sourceURL=webpack://hw7_ajax/./src/get_user.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { getUser } = __webpack_require__(/*! ./get_user */ \"./src/get_user.js\");\r\nconst { renderUser } = __webpack_require__(/*! ./render */ \"./src/render.js\");\r\nconst { debounce } = __webpack_require__(/*! ./debounce */ \"./src/debounce.js\");\r\n\r\nlet userInfo = null;\r\nconst pop = document.querySelector('.found');\r\nconst searchBtn = document.getElementById('button-search');\r\nconst searchInput = document.getElementById('user-search');\r\n\r\nsearchUserLive = debounce(searchUserLive);\r\n\r\nsearchInput.addEventListener('keypress', (e) => {if (e.key === 'Enter') searchOrRender()});\r\n\r\nsearchBtn.addEventListener('click', searchOrRender);\r\n\r\npop.addEventListener('click', () => {\r\n    renderUser(userInfo);\r\n    pop.classList.add('d-none');\r\n})\r\n\r\nsearchInput.addEventListener('input', (e) => {\r\n    const query = e.target.value;\r\n    if (query.length >= 3) searchUserLive();\r\n})\r\n\r\nfunction searchOrRender() {\r\n    if (!userInfo) {\r\n        searchUser();\r\n    } else {\r\n        renderUser(userInfo);\r\n        pop.classList.add('d-none');\r\n    }\r\n}\r\n\r\nfunction searchUser() {\r\n    const query = searchInput.value;\r\n    getUser(query)\r\n        .then(result => {\r\n            userInfo = result;\r\n            renderUser(userInfo);\r\n        })\r\n}\r\n\r\nfunction searchUserLive() {\r\n    const query = searchInput.value;\r\n    getUser(query)\r\n        .then(result => {\r\n            if (result) {\r\n                pop.classList.remove('d-none');\r\n                pop.textContent = `Found: ${result.login}`;\r\n                userInfo = result;\r\n            } else {\r\n                pop.textContent = 'No suggestions'\r\n            }\r\n        })\r\n}\r\n\n\n//# sourceURL=webpack://hw7_ajax/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { getData } = __webpack_require__(/*! ./get_user */ \"./src/get_user.js\");\r\nconst nopic = './img/nopic.png';\r\n\r\nfunction renderUser(userInfo) {\r\n    renderUserInfo(userInfo);\r\n\r\n    getData(userInfo.repos_url)\r\n        .then(repos => renderRepos(repos));\r\n\r\n    getData(userInfo.followers_url)\r\n        .then(followers => renderFollowers(followers))\r\n}\r\n\r\nfunction renderUserInfo(userInfo) {\r\n    const avatar = document.querySelector('.user-repos img')\r\n    const title = document.querySelector('.user-repos .card-title a');\r\n    const followersTitle = document.querySelector('.user-followers .card-title');\r\n\r\n    avatar.src = userInfo.avatar_url || nopic;\r\n\r\n    title.textContent = userInfo.login;\r\n    title.href = userInfo.html_url;\r\n\r\n    followersTitle.textContent = `${userInfo.login} followers`;\r\n}\r\n\r\nfunction renderRepos(repos) {\r\n    const container = document.querySelector('.repos-list');\r\n    while (container.firstChild) {\r\n        container.firstChild.remove()\r\n    }\r\n\r\n    if (repos.length === 0) {\r\n        const listItem = document.createElement('li');\r\n        listItem.textContent = 'No repositories found';\r\n        container.appendChild(listItem);\r\n        return;\r\n    }\r\n\r\n    const reposList = repos.map(repo => {\r\n        const listItem = document.createElement('li');\r\n        listItem.classList.add('list-group-item');\r\n\r\n        const link = document.createElement('a');\r\n        link.textContent = repo.name;\r\n        link.href = repo.html_url;\r\n        link.target = \"_blank\"\r\n\r\n        listItem.appendChild(link);\r\n        return listItem;\r\n    });\r\n\r\n    reposList.forEach(repo => container.appendChild(repo))\r\n}\r\n\r\nfunction renderFollowers(followers) {\r\n    const container = document.querySelector('.followers-list');\r\n    while (container.firstChild) {\r\n        container.firstChild.remove()\r\n    }\r\n\r\n    if (followers.length === 0) {\r\n        const listItem = document.createElement('li');\r\n        listItem.textContent = 'No followers found';\r\n        container.appendChild(listItem);\r\n        return;\r\n    }\r\n\r\n    const followersList = followers.map(follower => {\r\n        const listItem = document.createElement('li');\r\n        listItem.classList.add('list-group-item');\r\n\r\n        const avatar = document.createElement('img');\r\n        avatar.classList.add('img-thumbnail');\r\n        avatar.classList.add('w-7');\r\n\r\n        avatar.src = follower.avatar_url || nopic;\r\n\r\n        const link = document.createElement('a');\r\n        link.textContent = follower.login;\r\n        link.href = follower.html_url;\r\n        link.target = \"_blank\"\r\n\r\n        listItem.appendChild(avatar);\r\n        listItem.appendChild(link);\r\n        return listItem;\r\n    });\r\n\r\n    followersList.forEach(follower => container.appendChild(follower))\r\n}\r\n\r\nmodule.exports = { renderUser, renderUserInfo, renderRepos, renderFollowers }\n\n//# sourceURL=webpack://hw7_ajax/./src/render.js?");

/***/ }),

/***/ "./src/requests.js":
/*!*************************!*\
  !*** ./src/requests.js ***!
  \*************************/
/***/ ((module) => {

eval("const getJSONorReject = (response) => {\r\n    if (!response.ok) {\r\n        return null;\r\n    } else {\r\n        return response.json()\r\n    }\r\n}\r\n\r\nconst fetchData = (url, options={}) => {\r\n    return new Promise((resolve) => {\r\n        fetch(url, options)\r\n            .then(response => getJSONorReject(response))\r\n            .then(json => resolve(json))\r\n            .catch(err => console.error(err.message))\r\n    })\r\n}\r\n\r\nmodule.exports = { getJSONorReject, fetchData }\n\n//# sourceURL=webpack://hw7_ajax/./src/requests.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
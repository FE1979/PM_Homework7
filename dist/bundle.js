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

/***/ "./src/get_user.js":
/*!*************************!*\
  !*** ./src/get_user.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { fetchData } = __webpack_require__(/*! ./requests */ \"./src/requests.js\")\r\n\r\nconst apiUrl = \"https://api.github.com\"\r\nconst usersUrl = `${apiUrl}/users`;\r\n\r\nconst getUser = (user, options) => {\r\n    const url = `${usersUrl}/${user}`;\r\n    return fetchData(url, options)\r\n}\r\n\r\nconst getRepos = (reposUrl, options) => {\r\n    return fetchData(reposUrl, options)\r\n}\r\n\r\nconst getFollowers = (followersUrl, options) =>{\r\n    return fetchData(followersUrl, options)\r\n}\r\n\r\nmodule.exports = { getUser, getRepos, getFollowers }\n\n//# sourceURL=webpack://hw7_ajax/./src/get_user.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { getUser, getRepos, getFollowers } = __webpack_require__(/*! ./get_user */ \"./src/get_user.js\");\r\n\r\nconst headers = {\r\n    \"Accept\": \"application/vnd.github.v3+json\"\r\n}\r\n\r\nconst get = {\r\n    method: 'GET',\r\n    headers: headers,\r\n    mode: 'cors'\r\n}\r\n\r\nconst nopic = './img/nopic.png';\r\nlet userInfo = null;\r\n\r\nconst pop = document.querySelector('.found')\r\nconst searchBtn = document.getElementById('button-search');\r\nconst searchInput = document.getElementById('user-search');\r\n\r\nsearchInput.addEventListener('keypress', (e) => {\r\n    if (e.key === 'Enter') {\r\n        renderUser();\r\n        pop.classList.add('d-none');\r\n    }\r\n});\r\n\r\npop.addEventListener('click', () => {\r\n    renderUser();\r\n    pop.classList.add('d-none');\r\n})\r\n\r\nsearchBtn.addEventListener('click', () => {\r\n    renderUser();\r\n    pop.classList.add('d-none')\r\n});\r\n\r\nsearchInput.addEventListener('input', (e) => {\r\n    const query = e.target.value;\r\n    if (query.length >= 3) searchUser();\r\n})\r\n\r\nfunction searchUser() {\r\n    const query = document.getElementById('user-search').value;\r\n    getUser(query, get)\r\n        .then(result => {\r\n            if (result) {\r\n                pop.classList.remove('d-none');\r\n                pop.textContent = `Found: ${result.login}`;\r\n                userInfo = result;\r\n            } else {\r\n                pop.textContent = 'No suggestions'\r\n            }\r\n        })\r\n}\r\n\r\nfunction renderUser() {\r\n    renderUserInfo(userInfo);\r\n\r\n    getRepos(userInfo.repos_url, get)\r\n        .then(repos => renderRepos(repos));\r\n\r\n    getFollowers(userInfo.followers_url, get)\r\n        .then(followers => renderFollowers(followers))\r\n}\r\n\r\nfunction renderUserInfo(userInfo) {\r\n    const avatar = document.querySelector('.user-repos img')\r\n    const title = document.querySelector('.user-repos .card-title a');\r\n    const followersTitle = document.querySelector('.user-followers .card-title');\r\n\r\n    avatar.src = userInfo.avatar_url || nopic;\r\n\r\n    title.textContent = userInfo.login;\r\n    title.href = userInfo.html_url;\r\n\r\n    followersTitle.textContent = `${userInfo.login} followers`;\r\n}\r\n\r\nfunction renderRepos(repos) {\r\n    const container = document.querySelector('.repos-list');\r\n    while (container.firstChild) {\r\n        container.firstChild.remove()\r\n    }\r\n\r\n    if (repos.length === 0) {\r\n        const listItem = document.createElement('li');\r\n        listItem.textContent = 'No repositories found';\r\n        container.appendChild(listItem);\r\n        return;\r\n    }\r\n\r\n    const reposList = repos.map(repo => {\r\n        const listItem = document.createElement('li');\r\n        listItem.classList.add('list-group-item');\r\n\r\n        const link = document.createElement('a');\r\n        link.textContent = repo.name;\r\n        link.href = repo.html_url;\r\n        link.target = \"_blank\"\r\n\r\n        listItem.appendChild(link);\r\n        return listItem;\r\n    });\r\n\r\n    reposList.forEach(repo => container.appendChild(repo))\r\n}\r\n\r\nfunction renderFollowers(followers) {\r\n    const container = document.querySelector('.followers-list');\r\n    while (container.firstChild) {\r\n        container.firstChild.remove()\r\n    }\r\n\r\n    if (followers.length === 0) {\r\n        const listItem = document.createElement('li');\r\n        listItem.textContent = 'No followers found';\r\n        container.appendChild(listItem);\r\n        return;\r\n    }\r\n\r\n    const followersList = followers.map(follower => {\r\n        const listItem = document.createElement('li');\r\n        listItem.classList.add('list-group-item');\r\n\r\n        const avatar = document.createElement('img');\r\n        avatar.classList.add('img-thumbnail');\r\n        avatar.classList.add('w-7');\r\n\r\n        avatar.src = follower.avatar_url || nopic;\r\n\r\n        const link = document.createElement('a');\r\n        link.textContent = follower.login;\r\n        link.href = follower.html_url;\r\n        link.target = \"_blank\"\r\n\r\n        listItem.appendChild(avatar);\r\n        listItem.appendChild(link);\r\n        return listItem;\r\n    });\r\n\r\n    followersList.forEach(follower => container.appendChild(follower))\r\n}\r\n\n\n//# sourceURL=webpack://hw7_ajax/./src/index.js?");

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
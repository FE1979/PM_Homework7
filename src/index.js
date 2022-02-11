const { getUser } = require('./get_user');
const { renderUser } = require('./render')

let userInfo = null;

const pop = document.querySelector('.found')
const searchBtn = document.getElementById('button-search');
const searchInput = document.getElementById('user-search');

const debounce = (fn, time=500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), time)
    }
}

searchUserLive = debounce(searchUserLive);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchOrRender();   
    }
});

searchBtn.addEventListener('click', searchOrRender);

pop.addEventListener('click', () => {
    renderUser(userInfo);
    pop.classList.add('d-none');
})

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length >= 3) searchUserLive();
})

function searchOrRender() {
    if (!userInfo) {
        searchUser();
    } else {
        renderUser(userInfo);
        pop.classList.add('d-none');
    }
}

function searchUser() {
    const query = document.getElementById('user-search').value;
    getUser(query)
        .then(result => {
            userInfo = result;
            renderUser(userInfo);
        })
}

function searchUserLive() {
    const query = document.getElementById('user-search').value;
    getUser(query)
        .then(result => {
            if (result) {
                pop.classList.remove('d-none');
                pop.textContent = `Found: ${result.login}`;
                userInfo = result;
            } else {
                pop.textContent = 'No suggestions'
            }
        })
}

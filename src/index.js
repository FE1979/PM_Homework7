const { getUser, getRepos, getFollowers } = require("./get_user");

const nopic = './img/nopic.png';
let userInfo = null;

const pop = document.querySelector('.found')
const searchBtn = document.getElementById('button-search');
const searchInput = document.getElementById('user-search');

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

function renderUser(userInfo) {
    renderUserInfo(userInfo);

    getRepos(userInfo.repos_url)
        .then(repos => renderRepos(repos));

    getFollowers(userInfo.followers_url)
        .then(followers => renderFollowers(followers))
}

function renderUserInfo(userInfo) {
    const avatar = document.querySelector('.user-repos img')
    const title = document.querySelector('.user-repos .card-title a');
    const followersTitle = document.querySelector('.user-followers .card-title');

    avatar.src = userInfo.avatar_url || nopic;

    title.textContent = userInfo.login;
    title.href = userInfo.html_url;

    followersTitle.textContent = `${userInfo.login} followers`;
}

function renderRepos(repos) {
    const container = document.querySelector('.repos-list');
    while (container.firstChild) {
        container.firstChild.remove()
    }

    if (repos.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No repositories found';
        container.appendChild(listItem);
        return;
    }

    const reposList = repos.map(repo => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        const link = document.createElement('a');
        link.textContent = repo.name;
        link.href = repo.html_url;
        link.target = "_blank"

        listItem.appendChild(link);
        return listItem;
    });

    reposList.forEach(repo => container.appendChild(repo))
}

function renderFollowers(followers) {
    const container = document.querySelector('.followers-list');
    while (container.firstChild) {
        container.firstChild.remove()
    }

    if (followers.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No followers found';
        container.appendChild(listItem);
        return;
    }

    const followersList = followers.map(follower => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        const avatar = document.createElement('img');
        avatar.classList.add('img-thumbnail');
        avatar.classList.add('w-7');

        avatar.src = follower.avatar_url || nopic;

        const link = document.createElement('a');
        link.textContent = follower.login;
        link.href = follower.html_url;
        link.target = "_blank"

        listItem.appendChild(avatar);
        listItem.appendChild(link);
        return listItem;
    });

    followersList.forEach(follower => container.appendChild(follower))
}

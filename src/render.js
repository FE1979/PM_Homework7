const { getRepos, getFollowers } = require('./get_user');
const nopic = './img/nopic.png';

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

module.exports = { renderUser, renderUserInfo, renderRepos, renderFollowers }
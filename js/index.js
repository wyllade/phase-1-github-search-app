const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const userResultsDiv = document.getElementById('user-results');
const repoResultsDiv = document.getElementById('repo-results');

// Search users by keyword
function searchUsers(query) {
  const url = `https://api.github.com/search/users?q=${query}`;

  fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      userResultsDiv.innerHTML = ''; // Clear previous results
      if (data.items.length === 0) {
        userResultsDiv.innerHTML = '<p>No users found</p>';
      } else {
        data.items.forEach(user => renderUser(user));
      }
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
}

// Render user information
function renderUser(user) {
  const userCard = document.createElement('div');
  userCard.classList.add('user-card');
  
  const userImage = document.createElement('img');
  userImage.src = user.avatar_url;
  userImage.alt = user.login;
  userImage.width = 50;
  userImage.height = 50;
  
  const userName = document.createElement('p');
  userName.textContent = user.login;

  const userLink = document.createElement('a');
  userLink.href = user.html_url;
  userLink.target = '_blank';
  userLink.textContent = 'View Profile';

  userCard.append(userImage, userName, userLink);
  
  // Add click event to fetch repos when the user is clicked
  userCard.addEventListener('click', () => fetchUserRepos(user.login));

  userResultsDiv.appendChild(userCard);
}

// Fetch repositories for a user
function fetchUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(repos => {
      repoResultsDiv.innerHTML = ''; // Clear previous repo results
      if (repos.length === 0) {
        repoResultsDiv.innerHTML = '<p>No repositories found</p>';
      } else {
        repos.forEach(repo => renderRepo(repo));
      }
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
    });
}

// Render repository information
function renderRepo(repo) {
  const repoCard = document.createElement('div');
  repoCard.classList.add('repo-card');

  const repoName = document.createElement('p');
  repoName.textContent = repo.name;

  const repoLink = document.createElement('a');
  repoLink.href = repo.html_url;
  repoLink.target = '_blank';
  repoLink.textContent = 'View Repo';

  repoCard.append(repoName, repoLink);
  repoResultsDiv.appendChild(repoCard);
}

// Handle search button click
searchBtn.addEventListener('click', () => {
  const query = searchBar.value.trim();
  if (query) {
    searchUsers(query); // Search users by the keyword
  } else {
    alert('Please enter a search term');
  }
});

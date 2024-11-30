import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const searchGitHubUsers = async (query: string) => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      Authorization: `token ${process.env.VITE_GITHUB_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error('response was not ok');
  }

  const data = await response.json();
  return data.items; // returns a list of users
};

const handleSearch = async () => {
  try {
    const users = await searchGitHubUsers('octocat');
    console.log(users); // this is where we do stuff with the search results
    localStorage.setItem('searchedUsers', JSON.stringify(users));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


const CandidateSearch = () => {

  const [users, setUsers] = useState([]);




  return (
    <div>
      <h1>CandidateSearch</h1>
    </div>
  );
};

export default CandidateSearch;

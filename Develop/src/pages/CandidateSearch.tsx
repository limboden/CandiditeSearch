import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {

  const [users, setUsers] = useState([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);


  const fetchCandidates = async () => {
    try {
      const data = await searchGithub();
      setCandidates(data);
    } catch (err) {
      console.log('Failed to fetch candidates');
    }
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


  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      //retrieve saved candidates
    }
  }, []);




  return (
    <div>
      <h1>CandidateSearch</h1>
    </div>
  );
};

export default CandidateSearch;

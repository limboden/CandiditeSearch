import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [users, setUsers] = useState([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null)
  const [savedCandidates, setsavedCandidates] = useState<Candidate[]>([])

  const fetchCandidates = async () => {
    try {
      const data = await searchGithub();
      setCandidates(data);
      setCurrentIndex(0);
    } catch (err) {
      console.log('Failed to fetch candidates');
    }
  };


  // Skip candidates without a valid name, username, and profile URL
  // we will also call this when a candidate is rejected !!!
  const handleNextArrayItem = () => {
    const nextArrayItem = candidates[currentIndex];
    if (nextArrayItem && nextArrayItem.login && nextArrayItem.html_url) {
      setCurrentCandidate(nextArrayItem)
    } else {
      setCurrentIndex(currentIndex + 1)
      if (currentIndex >= candidates.length) {
        fetchCandidates()
      } else {
        handleNextArrayItem() // we might have to loading... here
      }
    }
  };

  //what happens when someone saves a candidate
  const handleSave = () => {
    const newSavedCandidatesArray = [...savedCandidates, currentCandidate]
    setsavedCandidates(newSavedCandidatesArray)
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates))
    handleNextArrayItem();
  }


  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setsavedCandidates(JSON.parse(saved))
    }
  }, []);




  return (
    <div>
      <h1>CandidateSearch</h1>
    </div>
  );
};

export default CandidateSearch;

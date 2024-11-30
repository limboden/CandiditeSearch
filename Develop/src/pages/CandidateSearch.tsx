import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

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

  useEffect(() => {
    fetchCandidates();
  }, []);


  // Skip candidates without a valid name, username, and profile URL
  // we will also call this when a candidate is rejected !!!
  const handleNextArrayItem = async () => {
    const nextArrayItem = candidates[currentIndex];

    const detailedItem = await searchGithubUser(nextArrayItem.login);

    if (detailedItem && detailedItem.login && detailedItem.html_url) {
      setCurrentCandidate(detailedItem)
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
    const newSavedCandidatesArray = [...savedCandidates, currentCandidate as Candidate]
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
    <div className="candidate-search-container container-fluid">
      <h1 className='page-titles'>Candidate Search</h1>
      {currentCandidate && (
        <div className="card p-3 mb-2 bg-dark text-white">
          <div>
            <img src={currentCandidate.avatar_url} alt={currentCandidate.login} className="card-img-top img-fluid" />
          </div>
          <div className="card-body">
            <h2>{currentCandidate.name || currentCandidate.login} <span>({currentCandidate.login})</span></h2>
            <p className="card-text">Location: {currentCandidate.location || 'N/A'}</p>
            <p className="card-text">Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email || 'N/A'}</a></p>
            <p className="card-text">Company: {currentCandidate.company || 'N/A'}</p>
            <p className="card-text">Profile: <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
          </div>
          <div className="candidate-actions button-group">
            <button type="button" className="btn btn-danger" onClick={() => handleNextArrayItem()}>Deny</button>
            <button type="button" className="btn btn-success" onClick={() => handleSave()}>Accept</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;

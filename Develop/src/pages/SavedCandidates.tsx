import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleRejectCandidate = (id: number) => {
    const newCandidates = savedCandidates.filter((candidate) => candidate.id !== id); // put all the ones that aren't the one we removed into the new candidates
    setSavedCandidates(newCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(newCandidates));
  };

  return (
    <div className="saved-candidates-container container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p className="text-center mt-4">No candidates have been accepted yet!</p>
      ) : (
        <table className="candidate-table table-bordered table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} width={50} height={50} />
                </td>
                <td>
                  {candidate.name || candidate.login} <span>({candidate.login})</span>
                </td>
                <td>{candidate.location || 'N/A'}</td>
                <td>
                  <a href={`mailto:${candidate.email}`}>{candidate.email || 'N/A'}</a>
                </td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <div className='button-group'>
                    <button type="button" className="btn btn-danger" onClick={() => handleRejectCandidate(candidate.id)}>-</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;

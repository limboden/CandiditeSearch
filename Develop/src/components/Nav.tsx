import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse " id="navbarNav">
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <h5>
                <Link className="nav-link text-light" to="/">
                  Home
                </Link>
              </h5>
              <h5>
                <Link className="nav-link text-light" to="/SavedCandidates">
                  Potential Candidates
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Nav;

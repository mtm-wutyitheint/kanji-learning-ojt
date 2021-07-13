import "./content.scss"
import { Link } from "react-router-dom";

function Content() {
  return (
    <div className="content">
      <div className="content-logo clearFix">
        <div className="logo1">
          <div className="content-log1"></div>
        </div>
        <div className="content-log2"></div>
      </div>
      <div className="content-section">
        <div className="main-section">
          <Link to="/comming-soon">
            <div className="section section-first">
              <p>Learn</p>
            </div>
          </Link>
          <Link to="/comming-soon">
            <div className="section">
              <p>Quiz</p>
            </div>
          </Link>
          <Link to="/comming-soon">
            <div className="section section-last">
              <p>Game</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Content;
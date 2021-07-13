import logo from "../../img/top_page_logo.png";
import topText from "../../img/top_page_text.png";
import "./top.scss";
import { Link } from "react-router-dom";

function Top() {
  return (
    <div className="Top">
      <div className="clearFix">
        <div className="logo-img">
          <img className="img" src={logo} alt="logo"></img>
        </div>
        <div className="top-text">
          <img className="choose-img" src={topText} alt="Choose"></img>
          <div className="level">
            <Link className="no-link" to="/content">
              <button className="level-btn no-link">N4</button>
            </Link>
          </div>
          <div className="level">
            <Link className="no-link" to="/content">
              <button className="level-btn no-link">N5</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top;
import { Link } from "react-router-dom";
import User from "./User";
import "./styles/Nav.css";

function Nav() {
  return (
    <nav className='NavBar'>
      <ul className='nav-Ul'>
        <li className='nav-li'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-li'>
          <Link to='/add'>Add Question</Link>
        </li>
        <li className='nav-li'>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
      </ul>
      <div>
        <User />
      </div>
    </nav>
  );
}

export default Nav;

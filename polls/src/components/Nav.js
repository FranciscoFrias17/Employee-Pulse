import { Link } from "react-router-dom";
import User from "./User";

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/add'>Add Question</Link>
        </li>
        <li>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
        <div>
          <User />
        </div>
      </ul>
    </div>
  );
}

export default Nav;

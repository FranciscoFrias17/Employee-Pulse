import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";

function Leaderboard({ users, authedUser }) {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    setLeaderboard(
      users
        .map((user) => {
          const answers = Object.keys(user.answers);
          return {
            name: user.name,
            avatarURL: user.avatarURL,
            answers: answers.length,
            questions: user.questions.length,
            total: answers.length + user.questions.length,
          };
        })
        .sort((a, b) => b.total - a.total)
    );
  }, [users, authedUser]);

  return (
    <div>
      <div>
        <Nav />
      </div>
      <h2>Leaderboard</h2>
      <ul className='Leaderboard'>
        {leaderboard.map((user) => {
          return (
            <li key={user.name}>
              <img src={user.avatarURL} alt={user.name} />
              <div>
                <h3>{user.name}</h3>
                <p>Answers: {user.answers}</p>
                <p>Questions: {user.questions}</p>
                <p>Total: {user.total}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users: Object.keys(users).map((key) => users[key]),
    authedUser,
  };
};
export default connect(mapStateToProps)(Leaderboard);

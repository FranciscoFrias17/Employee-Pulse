import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import "./styles/Leaderboard.css";

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
      <div className='leaderboard-container'>
        <div className='leaderboard-header'>
          <h2>Leaderboard</h2>
        </div>
        <div className='leaderboard-body'>
          <ul className='Leaderboard-ul'>
            {leaderboard.map((user) => {
              return (
                <li key={user.name} className='leaderboard-li'>
                  <img
                    src={user.avatarURL}
                    alt={user.name}
                    className='avatar'
                  />
                  <div className='user-data'>
                    <p className='user'>{user.name}</p>
                    <p>Questions answered: {user.answers}</p>
                    <p>Questions created: {user.questions}</p>
                    <p>Total: {user.total}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
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

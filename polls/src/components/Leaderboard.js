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
          <table className='Leaderboard-table'>
            <tr>
              <th>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
            {leaderboard.map((user) => {
              return (
                <tr key={user.name}>
                  <td className='user-data'>
                    <img
                      src={user.avatarURL}
                      alt={user.name}
                      className='avatar'
                    />
                    {user.name}
                  </td>
                  <td>{user.answers}</td>
                  <td>{user.questions}</td>
                </tr>
              );
            })}
          </table>
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

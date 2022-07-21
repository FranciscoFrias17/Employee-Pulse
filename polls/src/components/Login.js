import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";
import "./styles/Login.css";

const Login = ({ users, dispatch }) => {
  const [selectUser, setSelectUser] = useState("none");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(selectUser));
  };

  const disabled = selectUser === "none";

  return (
    <div className='login-container'>
      <form className='login-form'>
        <h2 className='login_title'>Employee Polls</h2>
        <h4>Please select a user:</h4>
        <div className='user-container'>
          {users.map((user) => {
            return (
              <div className='login-card' key={user.id}>
                <img
                  src={user.avatarURL}
                  alt={user.name}
                  className='login-avatar'
                />
                <input
                  type='radio'
                  name='user'
                  className='radio-input'
                  value={user.id}
                  onChange={(e) => setSelectUser(e.target.value)}
                />
                <label>{user.name}</label>
              </div>
            );
          })}
        </div>
        <button className='btn' onClick={handleLogin} disabled={disabled}>
          Log in
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users).map((id) => users[id]),
  };
};

export default connect(mapStateToProps)(Login);

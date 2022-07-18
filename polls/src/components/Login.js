import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

const Login = ({ users, dispatch }) => {
  const [selectUser, setSelectUser] = useState("none");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(selectUser));
  };

  const disabled = selectUser === "none";

  return (
    <form className='Login-Form'>
      <h2 className='Login__title'>Select User:</h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <input
              type='radio'
              name='user'
              value={user.id}
              onChange={(e) => setSelectUser(e.target.value)}
            />
            <label>{user.name}</label>
          </div>
        );
      })}

      <button
        className='Login__button'
        onClick={handleLogin}
        disabled={disabled}
      >
        Login
      </button>
    </form>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users).map((id) => users[id]),
  };
};

export default connect(mapStateToProps)(Login);

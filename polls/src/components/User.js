import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import "./styles/User.css";

const UserProfile = (props) => {
  const navigate = useNavigate();
  const { name, avatarURL } = props;

  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    navigate("/");
  };

  return (
    <div className='container'>
      <div className='user-profile'>
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='user-avatar'
        />
        <div className='user-card'>
          <div className='user-info'>
            <div className='user-name-container'>
              <span className='user-name'>{name}</span>
            </div>
            <div>
              <button className='Logout-btn' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  const { name, avatarURL } = user;
  return {
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(UserProfile);

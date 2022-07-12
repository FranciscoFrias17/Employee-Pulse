import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const UserProfile = (props) => {
  const navigate = useNavigate();
  const { name, avatarURL } = props;

  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    navigate("/");
  };

  return (
    <div className='user-profile'>
      <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar' />
      <div className='user-info'>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
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

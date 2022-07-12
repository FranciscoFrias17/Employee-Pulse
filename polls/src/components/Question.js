import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import Error from "./Error";

const Question = (props) => {
  const navigate = useNavigate();
  console.log(props);

  const toDetail = (e, id) => {
    e.preventDefault();
    navigate(`/questions/:questions_${id}`);
  };

  if (!props.question === null) {
    return <Error />;
  }

  const { name, avatar, optionOne, optionTwo, timestamp, question, id } =
    props.question;

  return (
    <Link to={`/questions/:question_${id}`}>
      <div className='question'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
        <div className='question-info'>
          <div>
            <span>{name}</span>
            {question && (
              <button onClick={(e) => toDetail(e, question.id)}></button>
            )}
            <p className='question-option'>{`Would you rather ${optionOne.text.text} or ${optionTwo.text.text}?`}</p>
            <div>Asked at: {formatDate(timestamp)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default connect(mapStateToProps)(Question);

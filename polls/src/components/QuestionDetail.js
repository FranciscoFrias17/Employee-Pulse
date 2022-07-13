import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { formatDate } from "../utils/helpers";

import Nav from "./Nav";

function QuestionDetail({ questions, authedUser, users }) {
  const dispatch = useDispatch();
  const { question_id } = useParams();
  let question = questions.find((question) => question.id === question_id);
  let author = users[question.author];
  let optionOne = question.optionOne;
  let optionTwo = question.optionTwo;
  let timestamp = question.timestamp;

  console.log(question);

  const [selectOption, setSelectOption] = useState({
    optionOne: "none",
    optionTwo: "none",
  });

  useEffect(() => {
    if (question.optionOne.votes.includes(authedUser)) {
      setSelectOption({
        optionOne: "selected",
      });
    }
    if (question.optionTwo.votes.includes(authedUser)) {
      setSelectOption({
        optionTwo: "selected",
      });
    }
  }, [question, authedUser]);

  const selectedOne = {
    authedUser: authedUser,
    qid: question_id,
    answer: "optionOne",
  };

  const selectedTwo = {
    authedUser: authedUser,
    qid: question_id,
    answer: "optionTwo",
  };

  const optionOneStats = () => {
    return (
      (optionOne.votes.length /
        (optionOne.votes.length + optionTwo.votes.length)) *
      100
    ).toFixed(2);
  };

  const optionTwoStats = () => {
    return (
      (optionTwo.votes.length /
        (optionOne.votes.length + optionTwo.votes.length)) *
      100
    ).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectOption.optionOne === "selected") {
      dispatch(handleSaveQuestionAnswer(selectedOne));
    } else if (selectOption.optionTwo === "selected") {
      dispatch(handleSaveQuestionAnswer(selectedTwo));
    }
  };

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className='container'>
        <div>
          <img src={author.avatarURL} alt={author.name} />
          <h4>{author.name}</h4>
          <h5>Asked at: {formatDate(timestamp)}</h5>
        </div>
        <form onChange={handleSubmit}>
          <div className='form-group'>
            <label>Would you rather:</label>
            <div className='form-check'>
              <input
                type='radio'
                name='option'
                value='optionOne'
                checked={selectOption.optionOne === "selected"}
                onChange={() => setSelectOption({ optionOne: "selected" })}
              />
              <label>{optionOne.text}</label>
            </div>
            <div>
              <input
                type='radio'
                name='option'
                value='optionTwo'
                checked={selectOption.optionTwo === "selected"}
                onChange={() => setSelectOption({ optionTwo: "selected" })}
              />
              <label>{optionTwo.text}</label>
            </div>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    users,
    questions: Object.keys(questions).map((key) => questions[key]),
  };
};

export default connect(mapStateToProps)(QuestionDetail);

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
  let timestamp = question.timestamp;

  console.log("QuestionDetail: ", question, question_id, author);

  const [selectOption, setSelectOption] = useState({
    optionOne: "",
    optionTwo: "",
  });

  useEffect(() => {
    if (question) {
      setSelectOption({
        optionOne: question.optionOne.votes.includes(authedUser)
          ? "selected"
          : "",
        optionTwo: question.optionTwo.votes.includes(authedUser)
          ? "selected"
          : "",
      });
    }
  }, [question, authedUser]);

  const optionOneStats = () => {
    return (
      (question.optionOne.votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
      100
    ).toFixed(2);
  };

  const optionTwoStats = () => {
    return (
      (question.optionTwo.votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
      100
    ).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleSaveQuestionAnswer({
        authedUser: authedUser,
        qid: question_id,
        answer: selectOption,
      })
    );
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
        <form>
          <div className='form-group'>
            <label>Would you rather:</label>
            <div className='form-check'>
              <input
                type='radio'
                name='option'
                value='optionOne'
                checked={selectOption.optionOne === "selected"}
                onChange={(e) => setSelectOption({ optionOne: "selected" })}
              />
              <label>{question.optionOne.text}</label>
            </div>
            <div>
              <input
                type='radio'
                name='option'
                value='optionTwo'
                checked={selectOption.optionTwo === "selected"}
                onChange={(e) => setSelectOption({ optionTwo: "selected" })}
              />
              <label>{question.optionTwo.text}</label>
            </div>
            <button className='btn' type='submit' onClick={handleSubmit}>
              Submit
            </button>
            {selectOption.optionOne === "selected" && (
              <div>
                <h5>
                  {optionOneStats()}% of employees selected to{" "}
                  {question.optionOne.text}
                </h5>
              </div>
            )}
            {selectOption.optionTwo === "selected" && (
              <div>
                <h5>
                  {optionTwoStats()}% of employees selected to{" "}
                  {question.optionTwo.text}
                </h5>
              </div>
            )}
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

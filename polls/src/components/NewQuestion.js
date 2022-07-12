import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const NewQuestion = () => {
  const navigate = useNavigate();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const dispatch = useDispatch();

  const authedUser = useSelector((state) => state.authedUser);

  const question = {
    optionOneText,
    optionTwoText,
    author: authedUser,
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "optionOneText") {
      setOptionOneText(value);
    }
    if (name === "optionTwoText") {
      setOptionTwoText(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The New Question:", optionOneText, optionTwoText);
    dispatch(handleAddQuestion(question));
    setOptionOneText("");
    setOptionTwoText("");
    navigate("/");
  };

  return (
    <div>
      <div>
        <Nav />
      </div>
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Would you Rather:</label>
          <input
            type='text'
            name='optionOneText'
            value={question.optionOneText}
            onChange={handleChange}
            className='form-control'
            placeholder='Option One'
          />
          <label>or</label>
          <input
            type='text'
            name='optionTwoText'
            value={question.optionTwoText}
            onChange={handleChange}
            className='form-control'
            placeholder='Option Two'
          />
          <button
            className='btn'
            type='submit'
            disabled={
              question.optionOneText === "" || question.optionTwoText === ""
            }
          >
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser.id === "" ? null : authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);

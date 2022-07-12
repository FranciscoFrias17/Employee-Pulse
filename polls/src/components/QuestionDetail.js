import { useState, useEffect } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";
import Nav from "./Nav";

function QuestionDetail(props) {
  const dispatch = useDispatch();
  console.log("QuestionDetail props:", {
    ...props,
  });

  useEffect(() => {});

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <div className='question'></div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  return {
    authedUser,
    users,
    questions,
    question: questions[props.id],
  };
};

export default connect(mapStateToProps)(QuestionDetail);

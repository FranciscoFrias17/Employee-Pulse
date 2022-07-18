import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion(question).then((question) => {
      dispatch(addQuestion(question));
      dispatch(hideLoading());
    });
  };
}

export function savePollAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(info) {
  return async (dispatch) => {
    dispatch(savePollAnswer(info));

    return await saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer: ", e);
      dispatch(savePollAnswer(info));
      alert("Error: Could not save poll answer.");
    });
  };
}

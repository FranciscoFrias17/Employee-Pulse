import { connect } from "react-redux";
import { useEffect, useState } from "react";
import QuestionContainer from "./QuestionContainer";
import Nav from "./Nav";

const Dashboard = ({ authedUser, questions }) => {
  const [newQuestions, setNewQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  useEffect(() => {
    setCompletedQuestions(
      questions
        .filter(
          (question) =>
            question.optionOne.votes.includes(authedUser.id) ||
            question.optionTwo.votes.includes(authedUser.id)
        )
        .sort((a, b) => b.timestamp - a.timestamp)
    );

    setNewQuestions(
      questions
        .filter(
          (question) =>
            !question.optionOne.votes.includes(authedUser.id) &&
            !question.optionTwo.votes.includes(authedUser.id)
        )
        .sort((a, b) => b.timestamp - a.timestamp)
    );
  }, [authedUser, questions]);

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <QuestionContainer
          newQuestions={newQuestions}
          completedQuestions={completedQuestions}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questions: Object.values(questions),
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);

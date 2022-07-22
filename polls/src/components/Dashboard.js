import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NewQuestionContainer from "./NewQuestionContainer";
import CompletedQuestionContainer from "./CompletedQuestionContainer";
import Nav from "./Nav";

const Dashboard = ({ authedUser, questions }) => {
  const [newQuestions, setNewQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  useEffect(() => {
    setCompletedQuestions(
      questions
        .filter(
          (question) =>
            question.optionOne.votes.includes(authedUser) ||
            question.optionTwo.votes.includes(authedUser)
        )
        .sort((a, b) => b.timestamp - a.timestamp)
    );

    setNewQuestions(
      questions
        .filter(
          (question) =>
            !question.optionOne.votes.includes(authedUser) &&
            !question.optionTwo.votes.includes(authedUser)
        )
        .sort((a, b) => b.timestamp - a.timestamp)
    );
  }, [authedUser, questions]);

  const [activeTab, setActiveTab] = useState("");
  const selectedTab = () => {
    switch (activeTab) {
      case "new":
        return <NewQuestionContainer newQuestions={newQuestions} />;
      case "completed":
        return (
          <CompletedQuestionContainer completedQuestions={completedQuestions} />
        );
      default:
        return <NewQuestionContainer newQuestions={newQuestions} />;
    }
  };
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className='toggle-btn-container'>
        <div className='btn-container'>
          <button onClick={() => setActiveTab("new")} className='dashboard-btn'>
            New Questions
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className='dashboard-btn'
          >
            Completed Questions
          </button>
        </div>
      </div>
      {selectedTab()}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questions: Object.values(questions),
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);

import Question from "./Question";
import "./styles/QuestionContainer.css";

function QuestionContainer({ newQuestions, completedQuestions }) {
  return (
    <div>
      <div className='container'>
        <div>
          <h3>New Questions</h3>
          <ul className='container-ul'>
            {newQuestions.map((question) => {
              return (
                <li key={question.id} className='question-card'>
                  <Question id={question.id} />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3>Completed Questions</h3>
          <ul className='container-ul'>
            {completedQuestions.map((question) => {
              return (
                <li key={question.id} className='question-card'>
                  <Question id={question.id} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuestionContainer;

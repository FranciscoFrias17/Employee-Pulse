import Question from "./Question";

function QuestionContainer({ newQuestions, completedQuestions }) {
  return (
    <div>
      <div>
        <h3>New Polls:</h3>
        <ul>
          {newQuestions.map((question) => {
            return (
              <li key={question.id}>
                <Question id={question.id} />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Completed Polls:</h3>
        <ul>
          {completedQuestions.map((question) => {
            return (
              <li key={question.id}>
                <Question id={question.id} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default QuestionContainer;

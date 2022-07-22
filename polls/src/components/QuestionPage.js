import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionDetail from "./QuestionDetail";
import Error from "./Error";

function QuestionPage(props) {
  const { questionArray } = props;
  const { question_id } = useParams();
  const id = question_id.replace(":question_", "");

  return questionArray.includes(id) ? <QuestionDetail id={id} /> : <Error />;
}

const mapStateToProps = ({ questions }) => {
  const questionArray = Object.keys(questions);
  return {
    questionArray,
  };
};

export default connect(mapStateToProps)(QuestionPage);

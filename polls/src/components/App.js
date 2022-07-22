import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared.js";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
import NewQuestion from "./NewQuestion.js";
import Leaderboard from "./Leaderboard.js";
import QuestionPage from "./QuestionPage.js";
import Error from "./Error.js";
import { Route, Routes } from "react-router-dom";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <Fragment>
      <div>
        {props.authedUser === null ? (
          <Login />
        ) : (
          <Fragment>
            <Routes>
              <Route path='/' exact element={<Dashboard />} />
              <Route path='/add' element={<NewQuestion />} />
              <Route path='/leaderboard' element={<Leaderboard />} />
              <Route
                path='/questions/:question_id'
                element={<QuestionPage />}
              />
              <Route path='*' element={<Error />} />
            </Routes>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(App);

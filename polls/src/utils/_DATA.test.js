import { _saveQuestion } from "./_DATA";
import { formatQuestion } from "./_DATA";
import { _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("should save a question", async () => {
    const question = {
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
      author: "author",
    };
    const formattedQuestion = formatQuestion(question);
    const result = await _saveQuestion(question);
    expect(result.author).toEqual(formattedQuestion.author);
    expect(result.optionOneText).toEqual(formattedQuestion.optionOneText);
    expect(result.optionTwoText).toEqual(formattedQuestion.optionTwoText);
  });

  it("should throw an error if one of the required fields is missing", async () => {
    const question = {
      optionOneText: "",
      optionTwoText: "",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should save a question answer", async () => {
    const answer = {
      authedUser: "authedUser",
      qid: "qid",
      answer: "OptionOne",
    };
    const result = await _saveQuestionAnswer(answer);
    expect(result).toBeTruthy();
  });

  it("should throw an error if one of the required fields is missing", async () => {
    const question = {
      authedUser: "user",
      qid: "qid",
    };
    await expect(_saveQuestionAnswer(question)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});

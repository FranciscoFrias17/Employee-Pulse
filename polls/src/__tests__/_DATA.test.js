import { _saveQuestion } from "../utils/_DATA";
import { formatQuestion } from "../utils/_DATA";
import { _saveQuestionAnswer } from "../utils/_DATA";

jest.setTimeout(30000);

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

// Got an idea for implementation for this test from a github repo:
//  https://github.com/kluth/would-you-rather/blob/main/src/_DATA.test.js
describe("_saveQuestionAnswer", () => {
  it("should return true when correct", async () => {
    const answer = _saveQuestionAnswer({
      authedUser: "tylermcginnis",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionTwo",
    });

    expect(answer).toBeInstanceOf(Promise);
    await expect(answer).resolves.toEqual(true);
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

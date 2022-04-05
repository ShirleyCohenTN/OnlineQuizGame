import React from "react";
import { FaMedal } from 'react-icons/fa';
import { BsFillClockFill } from 'react-icons/bs';



function Questionnaire({
  currentIndex,
  questions_length,
  score,
  timer,
  resetTimer,
  handleAnswer,
  handleNextQuestion,
  showAnswers,
  data: { question, correct_answer, answers },
}) {
  //console.log(timer)

  //when the time is over it will go to the next question
  if (timer === "00:00:00") {
    handleNextQuestion();
  }
  
  let question_number = currentIndex + 1;
  return (
    <>
      <div className="top-base">
        <div className="timer">Time Left: <br/> {timer}  <BsFillClockFill/></div>

        <div className="score">
          <u>Score:</u> {score}/{questions_length} <FaMedal/>
        </div>
      </div>

      <div className="questionClass">
        <h1
          dangerouslySetInnerHTML={{
            __html: question_number + ". " + question,
          }}
        />
      </div>
      <div className="button-overall">
        {answers.map((answer, idx) => {
          const specialClassName = showAnswers
            ? answer === correct_answer
              ? "green-button"
              : "red-button"
            : "";
          return (
            <button
              className={`normal-button ${specialClassName}`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>

      {/* {showAnswers && (
         <button onClick ={handleNextQuestion} className="next-question">Next Question</button>
     )} */}
    </>
  );
}

export default Questionnaire;

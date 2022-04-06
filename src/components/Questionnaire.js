import React from "react";
import { FaMedal } from 'react-icons/fa';
import { BsFillClockFill } from 'react-icons/bs';



function Questionnaire({
  currentIndex,
  questions_length,
  score,
  timer,
  handleAnswer,
  handleNextQuestion,
  data: { question, category, answers },
}) {
  //console.log(timer)

  //when the time is over it will go to the next question
  if (timer === "00:00:00") {
    handleNextQuestion();
  }
  
  let question_number = currentIndex + 1;
  let category_name = category.split(":").pop();
  return (
    <>
      <div className="top-base">
        <div className="timer">Time Left: <br/> {timer}  <BsFillClockFill/></div>

        <div className="score">
          <u>Score:</u> {score}/{questions_length} <FaMedal/>
        </div>
      </div>

      <div className="questionClass">
        <h2> <u>{category_name}</u></h2>
        <h1
          dangerouslySetInnerHTML={{
            __html: question_number + ". " + question,
          }}
        />
      </div>
      <div className="button-overall">
        {answers.map((answer, idx) => {
        
          return (
            <button
              className={`normal-button`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>

  
    </>
  );
}

export default Questionnaire;

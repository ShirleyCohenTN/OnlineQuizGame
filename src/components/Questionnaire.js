import React from "react";

function Questionnaire({questions_length,score, timer, resetTimer, handleAnswer, handleNextQuestion, showAnswers, data: {question, correct_answer, answers}}) {
  //console.log(timer)

  //when the time is over it will go to the next question
  if(timer === '00:00:00'){
    handleNextQuestion();
  }
    return (
    <>
    <div>
{timer} -
 Score: {score}/{questions_length}
    </div>
      <div className="questionClass">
        <h1 dangerouslySetInnerHTML={{__html:question}} />
      </div>
      <div className="button-overall">
        {answers.map((answer,idx) => {
            const specialClassName = showAnswers ? (answer === correct_answer ? "green-button" : "red-button") : "" ;
            return(
                <button className={`normal-button ${specialClassName}`} 
                onClick={() => handleAnswer(answer)}
                dangerouslySetInnerHTML={{__html:answer}}/>
            )
        } )}
      </div>

     {/* {showAnswers && (
         <button onClick ={handleNextQuestion} className="next-question">Next Question</button>
     )} */}

     

    </>
  );
}

export default Questionnaire;

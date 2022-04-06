import React from "react";
import CircularProgress from "./CircularProgress";
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

//import 'bootstrap/dist/css/bootstrap.min.css';




function GameOver({ score, questions_length }) {

  function percentage(correct_answers, total_questions) {
    return (100 * correct_answers) / total_questions;
  }



  function feedback() {
    if (percentage(score, questions_length) >= 80) {
        return  "Amazing! You did a great job!";

    } else if (
      percentage(score, questions_length) >= 60 &&
      percentage(score, questions_length) < 80
    ) {
        return  "Good job! I'm sure you can do better!";

    } else {
      return  "Not so good.. Try again, you can do better!";
    }
  }

  return (
      <>
 
 <h1>Your Score:</h1>

    <CircularProgress
        size={250}
        strokeWidth={20}
        percentage={percentage(score, questions_length)}
        color="green"
      />

    <div style={{marginBottom:"1%"}}>
      <h2>{score} of {questions_length} questions answered correctly</h2>
      <h2 className="text-style"> {feedback()}</h2>
    </div>

<button className="button-22" onClick={() => window.location.reload()}>RETRY QUIZ</button>

    </>
  );
}

export default GameOver;


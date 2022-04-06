//import { Axios } from "axios";
import Axios from "axios";

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Questionnaire from "./components/Questionnaire";
import GameOver from "./components/GameOver";


const API_URL = "https://opentdb.com/api.php?amount=100";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  //useRef for dealing with javascript setInterval - tracking and stopping it
  const intervalRef = useRef(null);
  const [timer, setTimer] = useState('00:00:00');

  //compute the difference between the target timer and the current time
 const getTimeRemaining = (endtime) =>{
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60);
    const minutes = Math.floor( (total/1000/60) % 60);
    const hours = Math.floor( (total/1000*60*60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }


  //updates the timer and stops it when the time reach to zero
  const startTimer = (deadline) => {
     let {total, hours, minutes, seconds} = getTimeRemaining(deadline);
     if(total>=0){
       //update the timer
       setTimer(
         (hours > 9 ? hours : '0'+hours) + ':' +
         (minutes > 9 ? minutes : '0'+minutes) + ':' +
         (seconds > 9 ? seconds : '0'+seconds)
         )
     }else{
       clearInterval(intervalRef.current);
       //handleNextQuestion();
     }
     
  }


  //reset the timer, starting from the beginning
  //using this function when updating the question
  const clearTimer = (endtime) => {
    setTimer('00:00:30')
    if(intervalRef.current){
      clearInterval(intervalRef.current);
    }
    const id = setInterval( () => {
      startTimer(endtime);
    }, 1000)
    intervalRef.current = id;
  }


  const getDeadlineTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds()+30);
    return deadline;
  }

  useEffect(() => {
    Axios.get(API_URL)
      .then((res) => res.data)
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));

        setQuestions(questions);
        console.log("the questions are: ", questions);
      });

      clearTimer(getDeadlineTime());
      //will run when the component will unmount
      //need to make sure that there will be no memomry leak or else the app will crash
      return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
  }, []);


  const resetTimer = () => {
    //since we are not sure the interval is running we need to clear it first using
    if(intervalRef.current) clearInterval(intervalRef.current); //to avoid memory leak
      clearTimer(getDeadlineTime());
    
  }

  const handleAnswer = (answer) => {
    //that the user won't be able to score multiple times in the same question:
    
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }


    
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
   
    resetTimer();
  };

  return questions.length > 0 ? (
    <div className="container">
      {currentIndex >= questions.length ? (
        <GameOver
        questions_length = {questions.length}
        score = {score}

        />
      ) : (
        
        <Questionnaire
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
          
          resetTimer = {resetTimer}
          timer = {timer}
          data={questions[currentIndex]}
          score = {score}
          questions_length = {questions.length}
          currentIndex = {currentIndex}
        />
      )}
    </div>
  ) : (
     <div className="container">Loading...</div>
  );
}

export default App;

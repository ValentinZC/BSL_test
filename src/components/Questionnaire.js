import React, { useEffect, useState } from "react";
import data from "../data/data";
import Result from "./Result";
import Question from "./Question";
import './../App.css';


const Questionnery = ({ name, answers, setAnswers }) => {
   let [currentQuestion, setcurrentQuestion] = useState(0);
   let [showResult, setShowResult] = useState(true);

   const questionData = data.questions[currentQuestion];


   useEffect(() => {

      switch (questionData.answerType) {
         case 'radio':
         case 'text':
            setAnswers({
               ...answers,
               [`${questionData.answerType}_${questionData.id}`]: ''
            })
            break;

         case 'checkbox':
            setAnswers({
               ...answers,
               [`${questionData.answerType}_${questionData.id}`]: []
            })
            break;
      }

   }, [currentQuestion])

   return (
      <>
         {showResult
            ? <Question name={name}
               currentQuestion={currentQuestion}
               setcurrentQuestion={setcurrentQuestion}
               setShowResult={setShowResult}
               answers={answers}
               setAnswers={setAnswers} />
            : <Result name={name} answers={answers} />
         }
      </>
   )
}

export default Questionnery
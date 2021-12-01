import React, { useEffect, useState } from "react";
import data from "../data/data";
import Result from "./Result";
import './../App.css'

const Questionnery = ({ name, answers, setAnswers }) => {
   let [currentQuestion, setcurrentQuestion] = useState(0);
   let [showResult, setShowResult] = useState(true)
   const questionData = data.questions[currentQuestion];
   const questionLength = data.questions.length

   let handleNextQuestion = () => {
      setcurrentQuestion(currentQuestion + 1)
   }

   let handleShowRes = () => {
      setShowResult(false)
   }

   let handleForRadio = (e) => {
      let value = e.target.value
      let name = e.target.name

      setAnswers({
         ...answers,
         [name]: value
      })
   }

   console.log(answers)

   return (
      <>
         {showResult
            ? <div>
               <h2>User : {name}</h2>
               <div>
                  <h3>{questionData.quest}</h3>
                  <div>
                     {
                        questionData.answerType === 'checkbox' || questionData.answerType === 'radio'
                           ? questionData.answers.map(item => {
                              return (
                                 <div>
                                    <input
                                       key={questionData.id}
                                       name={`${questionData.answerType}_${questionData.id}`}
                                       type={questionData.answerType}
                                       value={item.answer}
                                       onChange={handleForRadio} />
                                    <label>{item.answer}</label>
                                 </div>
                              )
                           })
                           : <input
                              key={questionData.id}
                              name={`${questionData.answerType}_${questionData.id}`}
                              onChange={handleForRadio}
                              type={questionData.answerType} />
                     }
                  </div>
               </div>
               {currentQuestion < questionLength - 1
                  ? <button className='button' onClick={handleNextQuestion}>{data.nameNextButton}</button>
                  : <button className='button' onClick={handleShowRes}>{data.nameFinishButton}</button>}
            </div>
            : <Result name={name} answers={answers} />
         }
      </>

   )
}

export default Questionnery
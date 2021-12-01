import React, { useEffect, useState } from "react";
import data from "../data/data";
import Result from "./Result";
import './../App.css';
import { renderRadioInput, renderCheckboxInput, renderTextInput } from './../helpers/renderInput'


const Questionnery = ({ name, answers, setAnswers }) => {
   let [currentQuestion, setcurrentQuestion] = useState(0);
   let [showResult, setShowResult] = useState(true);

   const questionData = data.questions[currentQuestion];
   const questionLength = data.questions.length

   useEffect(() => {
      if (questionData.answerType === 'radio') {
         setAnswers({
            ...answers,
            [`${questionData.answerType}_${questionData.id}`]: ''
         })

         return;
      }

      if (questionData.answerType === 'text') {
         setAnswers({
            ...answers,
            [`${questionData.answerType}_${questionData.id}`]: ''
         })

         return;
      }

      if (questionData.answerType === 'checkbox') {
         setAnswers({
            ...answers,
            [`${questionData.answerType}_${questionData.id}`]: []
         })
      }
   }, [currentQuestion])

   const handleNextQuestion = (answers, type, id) => {
      console.log(type)
      const name = `${type}_${id}`;
      if (type === 'radio') {
         if (answers[name] !== '') {
            setcurrentQuestion(currentQuestion + 1)
         } else {
            alert('Select variant')
         }
         return
      }

      if (type === 'checkbox') {
         if (answers[name].length) {
            setcurrentQuestion(currentQuestion + 1)
         } else {
            alert('Select variant')
         }
         return
      }

      if (type === 'text') {
         if (answers[name] !== '') {
            handleShowRes()
         } else {
            alert('Write your city')
         }
         return
      }
   }

   const handleShowRes = () => {
      setShowResult(false)
   }

   const handleSingleValue = (e) => {
      let value = e.target.value
      let name = e.target.name

      setAnswers({
         ...answers,
         [name]: value
      })
   }

   const handleMultiplyValue = (e, id) => {
      let value = e.target.value
      let name = e.target.name

      const newArray = answers[name];

      if (!newArray.length) {
         newArray.push({ answer: value, id: id })
         setAnswers({
            ...answers,
            [name]: newArray
         })
         return
      }

      if (newArray.length) {
         const selectedCheck = newArray.filter(item => item.id === id);

         if (selectedCheck.length) {
            let indexItem = newArray.indexOf(selectedCheck[0])
            newArray.splice(indexItem, 1);
            setAnswers({
               ...answers,
               [name]: newArray
            })
            return;
         }

         if (!selectedCheck.length) {
            newArray.push({ answer: value, id: id })
            setAnswers({
               ...answers,
               [name]: newArray
            })
         }
      }
   }

   return (
      <>
         {showResult
            ? <div>
               <h2>User : {name}</h2>
               <div>
                  <h3>{questionData.quest}</h3>
                  <div>
                     {questionData.answerType === 'checkbox' && questionData.answers.map(item => renderCheckboxInput(questionData, item, handleMultiplyValue))}

                     {questionData.answerType === 'radio' && questionData.answers.map(item => renderRadioInput(questionData, item, handleSingleValue))}

                     {questionData.answerType === 'text' && renderTextInput(questionData, handleSingleValue)}
                  </div>
               </div>
               {currentQuestion < questionLength - 1
                  ? <button className='button' onClick={() => handleNextQuestion(answers, questionData.answerType, questionData.id)}>{data.nameNextButton}</button>
                  : <button className='button' onClick={() => handleNextQuestion(answers, questionData.answerType, questionData.id)}>{data.nameFinishButton}</button>}
            </div>
            : <Result name={name} answers={answers} />
         }
      </>

   )
}

export default Questionnery
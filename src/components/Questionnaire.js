import React, { useEffect, useState } from "react";
import data from "../data/data";
import Result from "./Result";
import './../App.css'

const renderRadioInput = (questionData, item, handleSingleValue) => {
   return (
      <div>
         <input
            key={questionData.id}
            name={`${questionData.answerType}_${questionData.id}`}
            type={questionData.answerType}
            value={item.answer}
            onChange={handleSingleValue} />
         <label>{item.answer}</label>
      </div>
   )
}

const renderCheckboxInput = (questionData, item, handleMultiplyValue) => {
   return (
      <div>
         <input
            key={questionData.id}
            name={`${questionData.answerType}_${questionData.id}`}
            type={questionData.answerType}
            value={item.answer}
            onChange={e => handleMultiplyValue(e, item.id)} />
         <label>{item.answer}</label>
      </div>
   )
}

const renderTextInput = (questionData, handleSingleValue) => {
   return (
      <div>
         <input
            key={questionData.id}
            name={`${questionData.answerType}_${questionData.id}`}
            onChange={handleSingleValue}
            type={questionData.answerType} />
      </div>
   )
}

const Questionnery = ({ name, answers, setAnswers }) => {
   let [currentQuestion, setcurrentQuestion] = useState(0);
   let [showResult, setShowResult] = useState(true)
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

   let handleNextQuestion = (answers, type, id) => {
      const name = `${type}_${id}`;
      if (type === 'radio' || type === 'text') {
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
      let name = e.target.name // checkbox_3

      const newArray = answers[name]; // answers.checkbox_1 = [{...}]

      if (!newArray.length) {
         newArray.push({ answer: value, id: id })
         setAnswers({
            ...answers,
            [name]: newArray // [{...}]
         })
         return
      }

      if (newArray.length) {
         const selectedCheck = newArray.filter(item => item.id === id); // [{...}]

         if (selectedCheck.length) {
            let indexItem = newArray.indexOf(selectedCheck[0]) // index
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

   console.log(answers)
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
                  : <button className='button' onClick={handleShowRes}>{data.nameFinishButton}</button>}
            </div>
            : <Result name={name} answers={answers} />
         }
      </>

   )
}

export default Questionnery
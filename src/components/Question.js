import React from "react";
import data from "../data/data";
import { renderRadioInput, renderCheckboxInput, renderTextInput } from './../helpers/renderInput'

const Question = ({ name, setcurrentQuestion, currentQuestion, setShowResult, setAnswers, answers }) => {
   const questionData = data.questions[currentQuestion];
   const questionLength = data.questions.length;

   const handleNextQuestion = (answers, type, id) => {
      const name = `${type}_${id}`;

      switch (type) {
         case 'radio':
            (answers[name] !== '') ? setcurrentQuestion(currentQuestion + 1) : alert('Select variant')
            break
         case 'checkbox':
            (answers[name].length) ? setcurrentQuestion(currentQuestion + 1) : alert('Select variant')
            break
         case 'text':
            (answers[name] !== '') ? handleShowRes() : alert('Write your city')
            break
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
      <div>
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
   )
}

export default Question
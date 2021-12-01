import React from "react";
import data from './../data/data'
import './../App.css'

const Result = ({ name, answers }) => {
   let ansValues = Object.values(answers)
   let questValues = data.questions.map(el => el.quest)

   return (
      <div>
         <h2>Result of user: {name}</h2>
         {
            questValues.map((el, i) => {
               return <div key={el[i]}>{el}: {ansValues[i]}</div>
            })
         }
      </div>
   )
}

export default Result
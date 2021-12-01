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
            ansValues.map((el, i) => {
               if (typeof el === 'string') {
                  return (
                     <div>
                        <h4>{questValues[i]}:</h4>
                        <ul>
                           <li>{el}</li>
                        </ul>
                     </div>
                  )
               }
               if (Array.isArray(el)) {
                  return (
                     <div>
                        <h4>{questValues[i]}</h4>
                        <ul>
                           {el.map(({ answer }) => <li>{answer}</li>)}
                        </ul>
                     </div>
                  )
               }
            })
         }
      </div>
   )
}

export default Result
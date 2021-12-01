export const renderRadioInput = (questionData, item, handleSingleValue) => {
   return (
      <div>
         <input
            id={item.id}
            key={questionData.id}
            name={`${questionData.answerType}_${questionData.id}`}
            type={questionData.answerType}
            value={item.answer}
            onChange={handleSingleValue} />
         <label htmlFor={item.id}>{item.answer}</label>
      </div>
   )
}

export const renderCheckboxInput = (questionData, item, handleMultiplyValue) => {
   return (
      <div>
         <input
            id={item.id}
            key={questionData.id}
            name={`${questionData.answerType}_${questionData.id}`}
            type={questionData.answerType}
            value={item.answer}
            onChange={e => handleMultiplyValue(e, item.id)} />
         <label htmlFor={item.id}>{item.answer}</label>
      </div>
   )
}

export const renderTextInput = (questionData, handleSingleValue) => {
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
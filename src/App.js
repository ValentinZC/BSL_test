import React, { useState } from 'react';
import Login from './components/Login';
import Questionnery from './components/Questionnaire';
import './App.css'

function App() {
  let [userName, setUserName] = useState('');
  let [showComponent, setShowComponent] = useState(true)
  let [answers, setAnswers] = useState({})
  return (
    <div className='app'>
      {showComponent ? <Login name={userName}
        setName={setUserName}
        setShowComponent={setShowComponent} />
        : <Questionnery name={userName} answers={answers} setAnswers={setAnswers} />}
    </div>
  )
}

export default App;

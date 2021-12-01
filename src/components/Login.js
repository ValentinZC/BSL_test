import React from 'react';
import data from './../data/data';
import './../App.css'


const Login = ({ name, setName, setShowComponent }) => {
   let setUserName = (e) => {
      setName(e.target.value)
   }

   let handle = () => name.trim().length !== 0 ? setShowComponent(false) : alert("Please, enter you'r name")

   return (
      <>
         <div>
            Please, enter you'r name:
         </div>
         <input className='input' type='text' onChange={setUserName}></input>
         <button className='button' onClick={() => handle()}>{data.nameStartButton}</button>
      </>
   );
}

export default Login
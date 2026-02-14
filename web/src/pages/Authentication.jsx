import React, { useState } from 'react'
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const Authentication = () => {

    const [islogin, setIsLogin] = useState(true);
  return (
    <div>
       {islogin ? (
        <Login showSignup={() => setIsLogin(false)}/>
       ) : (
        <Signup showLogin={() => setIsLogin(true)}/>
       )}
    </div>
  )
}

export default Authentication
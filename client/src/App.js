import React, {useEffect, useContext} from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './Components/Home'
import Nav from './Components/Nav'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Exercises from './Components/Exercises'
import ExercisePage from './Components/ExercisePage'
import Profile from './Components/Profile'
import {UserContext} from "./Context/user"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
library.add(faEye,faEyeSlash)

function App() {

    const {user, setUser} = useContext(UserContext)

    function handleLogout() {
        
        fetch("/logout", {
            method: "DELETE",
        }).then(
            // () => onLogout()
            setUser(null)
            
        );
        console.log('logged out')
    }

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            } else {
                console.log(response.status)
                response.text().then(console.warn)
            }
        });
    }, []);

  return (
    <div className="">
        <Nav handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path='/exercises/:exerciseId' element={<ExercisePage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

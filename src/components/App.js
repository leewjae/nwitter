import React, {useEffect, useState} from "react";   
import AppRouter from "components/Router";
import {authService} from "fbase";
import { flushSync } from "react-dom";

function App() {
  // const auth = fbase.auth();
  const [init, setInit] =useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(()=>
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }   
      setInit(true);
    })
  )
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/>: "Initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  ) 
}

export default App;

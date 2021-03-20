import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, SetError] = useState("")
    const onChange =(event)=> {
      const {
        target : {name, value},
      } = event;
      if (name ==="email") {
        setEmail(value)
      } else if (name === "password") {
        setPassword(value)
      }
    }

    const onSubmit = async(event) => {
      event.preventDefault();
      try {
        let data;
        if(newAccount) {
          //create account
          data = await authService.createUserWithEmailAndPassword(
            email, password
          )
        } else {
          //logout
          data = await authService.signInWithEmailAndPassword(
            email, password
          )
        }
        console.log(data)
      } catch(error) {
        SetError(error.message)
      }
    }

    const toogleAccount = () => setNewAccount(prev => !prev)
    const onSocialClick = async(event) => {
      const {
        target : {name},
      } = event;
      
      let provider;

      if (name === "google") {
        //
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        //
        provider= new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name="email"
          type="text"
          placeholder="Email"
          required value={email}
          onChange={onChange} 
        />
        <input
         name="password"
         type="password"
         placeholder="Password" 
         required value={password} 
         onChange={onChange} 
         />
        <input 
          type ="submit" 
          value={newAccount ? "Create Account" : "Log in"}/>
      </form>
      {error}
      <span onClick={toogleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
      <button name = "google" onClick = {onSocialClick}>Continue with Google</button>
      <button name = "github" onClick = {onSocialClick}>Continue with Github</button>
    </div>
    )
} 

export default Auth;
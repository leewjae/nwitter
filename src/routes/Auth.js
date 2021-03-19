import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const onChange =(event)=> {
      console.log(event.target.name);
    }

    const onSubmit = (event) => {
      event.preventDefault();
    }
  return (
    <div>
      <form>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password"type= "password " placeholder="Password" required value={password} onChange={onChange} />
        <input type ="submit" value="Log In"/>
      </form>
      <button>Continue with Google</button>
      <button>Continue with Github</button>
    </div>
    )
} 

export default Auth;
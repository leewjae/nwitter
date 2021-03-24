import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import {useHistory} from "react-router-dom"

// eslint-disable-next-line
export default ({userObj,refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.pushState("/");
    }
   const getMyNweets = async() => {
       // eslint-disable-next-line
    const nweets = await dbService.collection("nweets")
                    .where("creatorId", "==", userObj.uid)
                    .orderBy("createdAt")
                    .get();
   }
   useEffect(() => {
       getMyNweets();
       // eslint-disable-next-line
   }, [])

   const onSubmit = async(event) => {
       event.preventDefault();
       if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile(
                {displayName : newDisplayName}
            )
            refreshUser();
       }
   }

   const onChange = (event) => {
       const {target: {value}} = event;
       setNewDisplayName(value);
   }

  return (
    <>
    <form onSubmit = {onSubmit}>
        <input onChange = {onChange} value = {newDisplayName} type="text" placeholder = "Display name" />
        <input type = "submit" value = "Update profile" />
    </form>
      <button onClick = {onLogOutClick}>Log out</button>
    </>
  )
}

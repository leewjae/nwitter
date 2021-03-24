import React, {useEffect, useState} from "react";   
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
    const [init, setInit]=useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [userObj,setUserObj] = useState(null);
    useEffect( ()=>
        authService.onAuthStateChanged((user) => {
        if(user) {
            setIsLoggedIn(true);
            setUserObj(user);
            // setUserObj({
            //     displayName:user.displayName,
            //     uid:user.uid,
            //     updateProfile: (args) => user.updateProfile(args)
            // });
        } else {
            setIsLoggedIn(false);
        }   
        setInit(true);
        })
    )

    const refreshUser = () => {
        // const user = authService.currentUser;
        // console.log(user);
        setUserObj({...authService.currentUser});
        // setUserObj(
        //     {
        //         displayName:user.displayName,
        //         uid:user.uid,
        //         updateProfile: (args) => user.updateProfile(args)
        //     }
        // );
    }

    return (
        <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser ={refreshUser}/> : "Initializing..."} 
        {/* <footer>&copy; Wonjae Lee {new Date().getFullYear()}</footer> */}
        </>
    ) 
}

export default App;

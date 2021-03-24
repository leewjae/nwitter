import Nweet from "components/Nweet";
import { dbService, storageService, } from "fbase";
import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    // const getNweets = async() => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setNweets((prev) => [nweetObject, ...prev])
    //     }
    //     );
    // }
    useEffect(() => { 
        dbService.collection("nweets").orderBy("createdAt").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray)
        })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        // await dbService.collection("nweets").add({
        //     text : nweet,
        //     createdAt: Date.now(),
        //     creatorId : userObj.uid
        // });
        // setNweet("");
        const nweetObj  = {
            text : nweet,
            createdAt: Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        }

        await dbService.collection("nweets").add(nweetObj)
        // add nweet to our database.
        setNweet("");
        setAttachment("");
    };

    const onChange=(event)=> {
        const {target : {value},} = event;
        setNweet(value);
    }

    const onFileChange = (event)=> {
        const {target: {files}}= event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget : {result}
            } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAtachment = () => {setAttachment(null)}

  return (
    <div>
      <form  onSubmit = {onSubmit}>
        <input 
        type= "text" 
        value={ nweet } 
        onChange={ onChange } 
        placeholder= "What's on your mind?" 
        maxLength={120} 
        />
        <input type="file" accept="image/*" onChange = {onFileChange}/>
        <input type= "submit" value= "Nweet" />
        {attachment &&
        <>
         <div>
            <img src= {attachment} width="50px" height="50px" alt="Your uploaded attachment" />
            <button onClick = {onClearAtachment}>Clear</button>
        </div>
        </>
        }
      </form>
      <div>
          {nweets.map((nweet) => (
            <Nweet 
            key = {nweet.id}
            nweetObj={nweet} 
            isOwner={nweet.creatorId === userObj.uid}
            />
))}
      </div>
    </div>
  )
}
export default Home

import {  useSelector } from "react-redux";
import Message from "./Message";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import {fetchMessage} from "../../../services/operations/chatApi"
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

import { BASE_URL } from "../../../services/apis";


function MessageRoom({roomId,email,roomName}){

    
     const { user } = useSelector((state) => state.profile);
     const [message,setMessage] = useState([]);
     const [inputMessage,setInputMessage] = useState("");
     const {token} = useSelector((state) => state.auth);
    
     const [stompClient, setStompClient] = useState(null);
   
     const [loading, setLoading] = useState(true);



     const onChangeHandler = (e) => { setInputMessage(e.target.value); };
    
     console.log("userid = " , user);
     
     
useEffect(() => {
  if (!roomId || !token) return;

  setMessage([]);
  setLoading(true);

  const loadMessage = async() => {
     const result = await fetchMessage(roomId, token, setMessage);

     if(!result.success)
     {
        toast.error("Error while loading Messages");
       setLoading(false);
        return;
     }
     setLoading(false);
  }
  loadMessage();
  
  const socket = new SockJS(`${BASE_URL}/chat`);
  const client = Stomp.over(socket);


  //syntex =>  client.connect(headers, onConnect, onError);

  client.connect(
    {},
    () => {
      console.log("Connected to room:", roomId);

      // syntex => client.subscribe(destination, callback)
      //It runs only when the server sends a message to that topic.
      // Subscribe = “start listening”
      client.subscribe(`/topic/chatroom/${roomId}`, (msg) => {
        setMessage((prev) => [...prev, JSON.parse(msg.body)]);
      });
    },
    (error) => {
      console.log("Connection error:", error);
      toast.error("Connection Failed. Please Try Again Later.");
    }
  );

  setStompClient(client);

  //this is a clean up function which is send to react
  // when the roomid chage then or component unmount in that case 
  // react will run first this function and then 
  // run the rerender
  return () => {
    console.log("Disconnecting old room:", roomId);
    client.disconnect();
  };
}, [roomId,token]);






    const onClickHandler =() =>
    {
      try{
      
        stompClient.send(`/app/chatroom/${roomId}`, {},JSON.stringify({content:inputMessage,roomId:roomId,email:email}));
        setInputMessage("");
      
      }catch(error)
      {
          console.log("error in sending message" + error)
          toast.error("Please Try  Again After Some Time");
      } 
    }
 

     return (
         <div className="flex flex-col h-full w-full bg-gray-900 text-gray-200 font-sans">
            {/* div to show roomname */}
             <div className="flex items-center p-3 border-b border-gray-700 shadow-md  bg-gray-800">
                <img src={ 'https://placehold.co/100x100/64748b/FFFFFF?text=R'} alt="Room avatar" className="h-10 w-10 rounded-full object-cover mr-4 bg-gray-600"/>
                <h1 className="text-lg font-semibold text-white">{roomName || "Chat Room"}</h1>
            </div>

            {/* show message of the chat group */}
            <div className="h-[80%] w-full  overflow-auto p-5 space-y-4 bg-gray-900">
               
                {loading && <div className="flex justify-center items-center h-full"><FaSpinner className="animate-spin text-4xl text-gray-500" /></div>}
               
               {
                 message.length === 0 ? (
                    <>
                      no message
                    </>
                 ):(
                    message.map((msg) => 
                  {
                     return(
                      Number(user.userId) === Number(msg.userId) ? (
                          <div className="flex justify-end">
                             <Message senderName={msg.senderName} content={msg.content} senderImageUrl={msg.senderImageUrl} timeStamp={msg.timeStamp} isMyMessage = {true}></Message>
                          </div>
                      ):
                      (
                          <div className="flex justify-start">
                             <Message  senderName={msg.senderName} content={msg.content} senderImageUrl={msg.senderImageUrl} timeStamp={msg.timeStamp} isMyMessage={false}></Message>
                          </div>
                      )
                     )
                  })
                 )
               }
           
            </div>

            {/* message input and button to send */}

           <div className="flex h-[10%] items-center p-2 bg-gray-100 border-t border-gray-300">
  

          <input 
              id="inputMessage"
              value={inputMessage}
              name ="inputMessage"
              onChange={onChangeHandler}
              placeholder="Type a message" 
              class="flex-grow p-2 text-black rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          />
  
          <button
            onClick={onClickHandler}  
            class="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <FaPaperPlane />
          </button>
  
          </div>

        </div>
     )
}

export default MessageRoom;




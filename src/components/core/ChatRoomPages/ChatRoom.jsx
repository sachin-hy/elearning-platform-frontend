
import Rooms from "./Rooms";
import MessageRoom from "./MessageRoom";
import { useSelector } from "react-redux";
import { useState } from "react";

function ChatRoom() {
    
    const {user} = useSelector((state) => state.profile); 
    const [roomId,setRoomId] = useState(null);
    const [roomName,setRoomName] = useState(null);

    return (
        <div className="h-full w-full flex flex-row font-sans bg-gray-900">
           
            <div className="h-full w-[30%] min-w-[250px] p-3 bg-gray-900 border-r border-gray-700 shadow-lg">
                <Rooms setRoomId={setRoomId} setRoomName={setRoomName}/>
            </div>

           
            <div className="h-full w-[70%] bg-gray-800 flex flex-col">
                {roomId !== null ? (
                    <MessageRoom roomId={roomId} email={user.email} roomName={roomName}/>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-lg">Select a room to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatRoom;
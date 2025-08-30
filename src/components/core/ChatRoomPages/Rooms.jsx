import { MdGroups } from "react-icons/md";
import ChatRoomButton from "./ChatRoomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRooms } from "../../../services/operations/chatApi";


function Rooms({setRoomId,setRoomName}){
    const {room} = useSelector((state) => state.room);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    console.log(user.email);
   useEffect(() => {
      console.log("room use efefetc is called");
      dispatch(fetchRooms(token));
    
   }, []);

   

    return(
        <div className="h-full w-full  border border-white">
            {/* show icon and chatroom heading */}
            <div className="h-[10%] w-full pl-2  flex flex-row ">
                <MdGroups size={40} className="text-white  "/>
                <h1 className=" text-white text-bold pl-2 pt-2">
                    Chat Room
                </h1>
            </div>
          
            {/* show chatroom links */}
            <div className="w-full h-[90%]  p-2 space-y-2 overflow-auto  flex flex-col border border-white">
                  {
                     room.length === 0 ? (
                        <>
                        no rooms
                        </>
                     ):(
                        room.map((r) => {
                              return (
                                <ChatRoomButton 
                                   setRoomId={setRoomId}
                                  
                                   key={r.roomId}
                                   roomId={r.roomId} 
                                   roomName={r.roomName} 
                                   roomImageUrl={r.roomImageUrl}
                                    setRoomName={setRoomName}
                                />
                              );
                                })
                        )
                         } 
            </div>
        </div>
    )
}

export default Rooms;





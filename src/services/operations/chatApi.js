import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { chatEndpoints } from "../apis";
import { setRoom } from "../../slices/roomSlice";
import { removeToken } from "../../slices/authSlice";


// it is called from messageroom component
export  async function fetchMessage(roomId,token,setMessage,dispatch,navigate)
{
     try{
          const res = await apiConnector("GET",chatEndpoints.MESSAGE_HISTORY_API(roomId),null,
            {
                Authorization: `Bearer ${token}` 
            },
            null
          )

          const safeArray = Array.isArray(res.data) ? res.data : []
         
          setMessage(safeArray);

          
     }catch(error)
     {
       if(error.status === 401)
            {
                      toast.error("Your session has expired. Please log in again.");
                      dispatch(removeToken())
                      navigate("/login");
            }else{
            console.log(error.response.data.message);
              toast.error(error.response.data.message);
          }
     }      
}


// called from rooms component
export   function fetchRooms(token)
{
  return async (dispatch) =>{
     try{
      const res = await apiConnector("POST",chatEndpoints.CHATROOM_API,null,
      {
            Authorization: `Bearer ${token}` 
      },null);
       const safeArray = Array.isArray(res?.data) ? res.data : []
       
       dispatch(setRoom(safeArray));
     }
     catch(error)
     {
       toast.error(error.response.data.message);
       console.log(error);
     }
    }
}
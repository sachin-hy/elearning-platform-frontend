import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { chatEndpoints } from "../apis";

// it is called from messageroom component
export async function fetchMessage(
  roomId,
  token,
  setMessage,
  dispatch,
  navigate,
) {
  try {
    const res = await apiConnector(
      "GET",
      chatEndpoints.MESSAGE_HISTORY_API(roomId),
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
    );

    //checking that the response whould be an array only
    const safeArray = Array.isArray(res.data) ? res.data : [];

    setMessage(safeArray);

    return { success: true };
  } catch (error) {
    console.log("Error while fetching messages list : " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function fetchRooms(token) {
  try {
    const res = await apiConnector(
      "POST",
      chatEndpoints.CHATROOM_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while fetching room : " + error);
    return { success: true, message: error.resposne.data.message };
  }
}

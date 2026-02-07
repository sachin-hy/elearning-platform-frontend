import { MdGroups } from "react-icons/md";
import ChatRoomButton from "./ChatRoomButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRooms } from "../../../services/operations/chatApi";
import toast from "react-hot-toast";
import { OrbitProgress } from "react-loading-indicators";

function Rooms({ setRoomId, setRoomName }) {
  const { token } = useSelector((state) => state.auth);

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);

      const result = await fetchRooms(token);

      if (!result.success) {
        toast.error("Error while Loading Rooms");
        setLoading(false);
        return;
      }

      setRoom(result.data);
      setLoading(false);
    };

    loadRooms();
  }, [token]);

  return (
    <div className="h-full w-full border border-white">
      {/* Header */}
      <div className="h-[10%] w-full pl-2 flex flex-row items-center">
        <MdGroups size={40} className="text-white" />
        <h1 className="text-white font-bold pl-2">Chat Room</h1>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-[90%]">
          <OrbitProgress
            variant="dotted"
            color="#dee7de"
            size="medium"
          />
        </div>
      ) : (
        <div className="w-full h-[90%] p-2 space-y-2 overflow-auto flex flex-col border border-white">
          {room.length === 0 ? (
            <p className="text-white text-center">No Rooms</p>
          ) : (
            room.map((r) => (
              <ChatRoomButton
                key={r.roomId}
                roomId={r.roomId}
                roomName={r.roomName}
                roomImageUrl={r.roomImageUrl}
                setRoomId={setRoomId}
                setRoomName={setRoomName}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Rooms;

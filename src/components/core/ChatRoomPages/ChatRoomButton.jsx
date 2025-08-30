


function ChatRoomButton({ setRoomId, roomId, roomName, roomImageUrl ,setRoomName}) {
    const onClickHandler = () => {
        setRoomId(roomId);
        setRoomName(roomName);
    };

    return (
        <button
            onClick={onClickHandler}
            className="w-full h-[60px] flex flex-row items-center px-3 py-2 bg-gray-800 rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            <img 
                className="w-[40px] h-[40px] rounded-full object-cover border-2 border-gray-600" 
                src={roomImageUrl} 
                alt="Room Icon"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/CCCCCC/FFFFFF?text=Err'; }}
            />
            <p className="text-white ml-4 font-semibold text-lg truncate">
                {roomName}
            </p>
        </button>
    );
}


export default ChatRoomButton

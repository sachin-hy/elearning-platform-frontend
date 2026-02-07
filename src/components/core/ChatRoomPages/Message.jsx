



function Message({ senderName, content, senderImageUrl, timeStamp, isMyMessage }) {
  const date = new Date(timeStamp);

  const formattedTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className={`flex items-start gap-3 p-2 max-w-[75%] ${isMyMessage ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
      {!isMyMessage && (
        <img
          src={senderImageUrl}
          alt={senderName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
        />
      )}

      <div className={`flex flex-col p-3 rounded-xl shadow-md ${isMyMessage ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-700 text-gray-100 rounded-bl-none"}`}>
        {!isMyMessage && senderName && (
          <p className="text-sm font-semibold mb-1 text-blue-300">{senderName}</p>
        )}

        <p className="text-sm leading-snug break-words">{content}</p>

        <span className={`text-xs mt-2 ${isMyMessage ? "text-blue-200 text-right" : "text-gray-400 text-left"}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
}

export default Message;

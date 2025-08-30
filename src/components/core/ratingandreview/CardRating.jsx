
import { Rating } from "@smastrom/react-rating";

function CardRating({url,firstName,lastName,rating,review})
{
    return(
        <div className="w-[90%]  p-4 mt-8 mb-8 bg-gray-800 border border-white rounded-md">
            <div className="flex items-start gap-4 items-center">
                {/* image */}
                <div className="w-12 h-12  rounded-full">
                    <img src={url} className="w-12 h-12 rounded-full " ></img>
                </div>
                {/* user name */}
                <div className="w-auto h-auto">
                   <p className="text-white font-normal">{firstName}{lastName}</p>
                </div>

            </div>
            {/* user rating */}
            <div className="w-full pt-2 pb-2">
                 <Rating
                        value={rating || 0.5}
                        readOnly={true} 
                        style={{ maxWidth: 100 }} 
                  
                />
            </div>
              {/* user review */}
            <div className="w-full">
                <p className="text-white font-normal overflow-hidden">{review}</p>
            </div>
        </div>
    )
}

export default CardRating;
import { useCourseContext } from "../../../providers/CourseProvider";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Rating } from "@smastrom/react-rating";
import { ratingAndReviewEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiconnector";
import toast from "react-hot-toast";
import { createReview } from "../../../services/operations/ratingAndreviewApi";
import { useNavigate } from "react-router-dom";
import { getCourseDetails } from "../../../services/operations/courseApi";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { OrbitProgress } from "react-loading-indicators";


function ViewCourse() {
 
  const { courseid } = useParams();
  
  const { token } = useSelector((state) => state.auth);
 
  const [url, setUrl] = useState(null);
  const [course, setCourse] = useState(null);
  const [viewSection, setViewSection] = useState([]);
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  function onRatingChangeHandler(value){
    setRating(value);
    console.log("Rating changed to:", value);
  }

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  const result = await createReview({
    courseid,
    rating,
    review,
    token
  });
  if (!result.success) 
  {
    toast.error("Failed to submit review: " + result.message);
    return;
  }
  setRating(0);
  setReview("");
  toast.success("Review submitted successfully");
  
};




useEffect( () => {
   
     const loadCourse = async() =>{
      
       
       const result = await getCourseDetails(courseid, token);
       if (!result.success) {
          toast.error("Failed to load course details: " + result.message);
          
          return;
       } 
       setCourse(result.data);

       setViewSection(
         result.data.courseContent.map(() => false)
       );
       
     }

     loadCourse();

    //  course?.courseContent?.forEach((section, index) =>{
    //     setViewSection((prev) => {
    //       const newViewSection = [...prev];
    //       newViewSection[index] = false; 
    //       return newViewSection;
    //     });
    // })

  },[]);

 


  const sectionList = useMemo(() => {
     if (!course) return null;
    return course.courseContent?.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-white p-2">
                <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-normal text-shadow-text-glow-light text-gray-700 mb-3">
                  {section.sectionName}
                </h3>
                <button
                
                  onClick={() => {
                    setViewSection((prev) => {
                      const newViewSection = [...prev];
                      newViewSection[index] = !newViewSection[index];
                      return newViewSection;
                    });
                  }}
                >
                   { viewSection[index] ?
                    <ChevronDown /> : <ChevronUp />
                   } 
                </button>
                </div>
                {viewSection[index] && (
                  <ul className="space-y-2">
                    {section.subSection?.map((subSection, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => setUrl(subSection.vedioUrl)}
                          className="w-full text-left p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200 text-sm md:text-base"
                        >
                          {subSection.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
  },[course?.courseContent, viewSection]);

  


  

  console.log("view:", viewSection);

  if(!course)
  {
     return <div className="flex justify-center  items-center min-h-screen">
         <OrbitProgress variant="dotted" color="#dee7de" size="medium" text="" textColor="" />
      </div>
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-cols w-full h-full  ">
        {/* Left: Course Sections */}
        <div className="w-[45%] mt-4 mr-8 ml-4  overflow-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-shadow-text-glow-light mb-6">
            {course.courseName}
          </h2>

          <div className="space-y-4 p-8">
              {sectionList}
          </div>
        </div>

        {/* Right: Video Player */}
        <div className="w-[55%] pr-8 pt-8 mt-4 ">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {url ? (
                <video className="w-full h-full object-cover" controls key={url}>
                  <source src={url} type="video/mp4" />
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Your browser does not support the video tag.
                  </div>
                </video>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-lg mb-2">📹</div>
                    <div>Select a video to start watching</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  text-black p-8 ">
         
         <h2 className="text-white font-semibold">Rating</h2>
         
         <form onSubmit={onSubmitHandler} >
          <Rating
             className="mt-2 mr-2 mb-2"
             value={rating}
             onChange={onRatingChangeHandler}
            style={{ maxWidth: 100 }}
          />

           <h2 className="text-white font-semibold">Review</h2>
           <textarea
           value={review}
           onChange={(e) => setReview(e.target.value)}
          rows="4"
          className="w-full p-2 rounded border"
          placeholder="Write your thoughts..."
        />

        <button
         type="submit"
         className="mt-2 px-4 py-2 bg-green-800 text-white rounded hover:bg-blue-700 transition-colors duration-200">
         Submit
        </button>
          
         </form>
      </div>
    </div>
  );
}

export default ViewCourse;

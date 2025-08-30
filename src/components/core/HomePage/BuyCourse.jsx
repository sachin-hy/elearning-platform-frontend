import CourseCard from "./CourseCard";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from "react";
import Footer from "../HomePage/common/Footer";
import CardRating from "../ratingandreview/CardRating";
import { useSelector } from "react-redux";

function BuyCourse() {
  const course = JSON.parse(localStorage.getItem("buycourse"));
   

  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const [isOpen, setIsOpen] = useState(() => {
    const len = course?.courseContent?.length || 0;
    return Array(len).fill(false);
  });

  const toggleSection = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

 
  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Course not found. Please navigate from the courses page.</p>
      </div>
    );
  }

  return (
    
    <div className=" h-full">
      {
       isVerifyingPayment === true ? (
         <>
          <div className="h-full flex  justify-center items-center">
            <h1 className="text-white">Payment in Process..... </h1>
          </div>
         </>
        )
        :
        (
          <>
          
          <div className=" flex flex-row w-full ">
        <div className="md:col-span-2 w-[60%]">
          <section className="p-6 md:p-8 rounded-lg  shadow-sm">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              {course?.courseName}
            </h1>
            <p className="text-lg text-white md:text-xl font-light opacity-80 max-w-3xl">
              {course?.courseDescription}
            </p>
            
            <h2 className="text-2xl mt-4 md:text-3xl font-normal text-white mb-5  pb-3 pt-3  text-shadow-text-glow-light">
              About This Course
            </h2>
            <p className="text-white leading-relaxed text-base md:text-lg mb-4">
              Dive deep into this comprehensive course taught by <span className="font-semibold">{course?.instructor?.firstName} {course?.instructor?.lastName}</span>.
           </p>
            <div className="flex items-center text-white text-sm md:text-base mt-4">
              <span className="font-semibold mr-2">Overall Rating:</span> {course?.rating?.toFixed(1) || 'N/A'} out of 5
            </div>
          
          </section>

          
          <section className="p-6 md:p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl md:text-3xl font-normal text-white mb-6  pb-3  text-shadow-text-glow-light">
              Course Curriculum
            </h2>
            <div className="space-y-4">
              {course?.courseContent?.length > 0 ? (
                course.courseContent.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-md overflow-hidden transition-all duration-300 ease-in-out"
                  >
                  
                    <button
                      onClick={() => toggleSection(index)}
                      className="flex justify-between bg-richblack-400 items-center w-full h-full p-4 text-left  hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-white flex-grow pr-8 hover:text-black">
                        {section.sectionName} ({section.subSection?.length || 0} lectures) {/* Added lecture count */}
                      </h3>
                      {isOpen[index] ? (
                        <ChevronUp className="text-white w-5 h-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="text-white w-5 h-5 flex-shrink-0" />
                      )}
                    </button>

                 
                    {isOpen[index] && (
                      <div className="p-4 bg-zinc-300 border-t border-gray-200">
                        <ul className="space-y-3 text-gray-700">
                          {section.subSection?.length > 0 ? (
                            section.subSection.map((subSection, subIndex) => (
                              <li key={subIndex} className="flex items-start text-base">
                                <span className="mr-3 mt-1 text-blue-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </span> 
                                <div>
                                  <p className="font-medium">{subSection.title}</p>
                                  {subSection.description && (
                                    <p className="text-sm text-gray-500 mt-0.5 ">
                                      {subSection.description}
                                    </p>
                                  )}
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-200 italic">No lectures available for this section.</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-white italic p-4">No course content available.</p>
              )}
            </div>
          </section>
        </div>

      
        <div className="md:col-span-1 w-[40%] p-4">
          <CourseCard course={course} buttonVariable={true} setIsVerifyingPayment = {setIsVerifyingPayment}/>
         
          <div className="p-6 rounded-lg border border-gray-200 shadow-sm mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">What you'll get:</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Lifetime Access</li>
              <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Certificate of Completion</li>
              <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Downloadable Resources</li>
              <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>30-Day Money-Back Guarantee</li>
            </ul>
          </div>
        </div>
      </div>
     
      <div className="flex justify-center w-full mt-[150px] overflow-auto border-t border-white ">
           {
             course.ratingAndReviews?.length === 0 ? (
                <div >
                  <h1></h1>
                  <h2 className="text-2xl md:text-3xl text-white font-normal p-12 mb-6">
                    No Ratings and Reviews Yet
                  </h2>
                 </div>
             ):
             (
                      course.ratingAndReviews.map((review, index) => (
                        <CardRating key={index} url={review?.image} firstName={review?.firstName} lastName={review?.lastName} rating={review?.rating} review={review?.reviews}></CardRating>
                      ))
             )

           }
            
      </div>
      {/* footer */}
      <div className=" mt-28"><Footer/></div>
          </>
        )
      
      }
    </div>
  
  );
}

export default BuyCourse;
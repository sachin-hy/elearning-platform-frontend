import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../../../services/apiconnector";
import { setAllCourses } from "../../../slices/courseSlice";
import { coursesEndpoints } from "../../../services/apis";
import CourseCard from "./CourseCard";
import { fetchCourse, fetchCourseSize } from "../../../services/operations/courseApi";
import { fetchCartCourses, fetchCartCoursesSize } from "../../../services/operations/cartApi";



function AllCoursesHomePage() {


  const {allCourses} = useSelector((state) => state.course);
  const {cartCourses} = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.auth);
  const {type} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // current page number
  // it is used to change the page number when user clicks on the page number button
  const [pageNumber,setPageNumber] = useState(0);
  //to represent the total buttons 
  const [courseButton,setCourseButton] = useState([0]);

 
 
 

  useEffect(()=>{
      setPageNumber(0);
      if(type !== "cart")
      {
         fetchCourseSize(type,dispatch,setCourseButton);  
      }else{
        dispatch(fetchCartCoursesSize(setCourseButton,token,navigate));
      }
       
  },[type]);


  useEffect(() => {
    if(type !== "cart")
    {
       fetchCourse(dispatch,type,pageNumber);
    }else{
       dispatch(fetchCartCourses(pageNumber,token,navigate));
    }
     
  },[type,pageNumber]);


 
  
   const courseList = type !== "cart" ? allCourses : cartCourses;

   function handlePageChange(pageNum) {
    setPageNumber(pageNum);
   
  }
   


 

  return (
    <div className="min-h-screen bg-richblack-900">
      
      <div className=" shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Explore Our Courses</h1>
            <p className="text-lg text-white max-w-2xl mx-auto  ">
              Discover a wide range of courses designed to help you learn new skills and advance your career
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courseList.length !== 0 ? 
        (
          <>
            {/* div to show the total course */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-semibold text-gray-900">{allCourses.length}</span> courses
              </p>
            </div>

            {/* div to show the course card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8 p-4">
              {
               courseList.map((course) => 
                {
                  return (
                    //  sending the course and buttonVariable to show the card buy button or not
                    <CourseCard key={course.courseid} course={course} buttonVariable={false} />
                 
                  )
                })
              
              }

             
            </div>

             {/* div to show the page button  */}
            <div className="flex justify-center mt-10 gap-2">
             {
             courseButton.map((pageNum) => (
             <button
                  key={pageNum}
                 className={`px-4 py-2 border rounded ${
                 pageNum === pageNumber ? "bg-blue-600 text-white" : "bg-white text-blue-600"
               }`}
                onClick={() => handlePageChange(pageNum)}
               >
                 {pageNum+1}
            </button>
             ))}
       </div>

          </>
        ) 
        
        :
        
        (
          // if the there are no course to show
          
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
            
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

             
              <h3 className="text-xl font-semibold text-white mb-2">No Courses Available</h3>
              <p className="text-gray-500 mb-6">
                We're working hard to bring you amazing courses. Check back soon for new content!
              </p>

              
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Notify Me When Available
              </button>
            </div>
          </div>
        )}
      </div>

     
      <div className="bg-richblack-900 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white text-sm">
            <p>
              Can't find what you're looking for?{" "}
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Contact us</span> for
              custom course requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




export default AllCoursesHomePage;
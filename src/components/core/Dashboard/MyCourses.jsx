import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { Pencil, Trash2, BookOpen, Clock, Users } from "lucide-react"
import { useCourseContext } from "../../../providers/CourseProvider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { apiConnector } from "../../../services/apiconnector"
import { coursesEndpoints } from "../../../services/apis"
import { setTotalItems, setcoursesEnrolled } from "../../../slices/cartSlice"
import toast from "react-hot-toast"
import {deleteCourse} from "../../../services/operations/courseApi"
import { fetchUserCourses } from "../../../services/operations/courseApi"


function MyCourses() {
  const { user } = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const { instructorCourses} = useSelector((state) => state.instructorCourses);
  const { studentCourses } = useSelector((state) => state.studentCourses);
  const { setCourseid } = useCourseContext()
  const navigate = useNavigate()
  const dispatch = useDispatch()

   

    const onDeleteClickHandler = async(courseid) =>
    {
       await deleteCourse(courseid,navigate,dispatch,token);
    }


  useEffect(() => {  
    
     fetchUserCourses(token,user,dispatch,navigate);
  },[])


  console.log("MyCourses component rendered with user:", instructorCourses);
  const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
  const courseList = isInstructor ? (Array.isArray(instructorCourses) ? instructorCourses : []) : (Array.isArray(studentCourses) ? studentCourses : [])
   
  return (
    <div className="min-h-screen w-full bg-richblack-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-shadow-text-glow-light z-40 text-white mb-2">
            {isInstructor ? "My Created Courses" : "My Enrolled Courses"}
          </h1>
          <p className="text-gray-100">
            {isInstructor
              ? "View and edit your course content"
              : "Continue your learning journey"}
          </p>
        </div>

        {/* Course Count */}
        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg border border-gray-200 px-4 py-3 inline-block">
            <span className="text-sm font-medium text-gray-700">
              Total Courses: <span className="text-blue-600 font-semibold">{courseList.length}</span>
            </span>
          </div>
        </div>

        {/* No Course Case */}
        {courseList.length === 0 ? (
          <div className="bg-gray-200 rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">No Courses Available</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {isInstructor
                ? "Start creating your first course and share your knowledge with students worldwide."
                : "You haven't enrolled in any courses yet. Browse our catalog to start learning."}
            </p>
            <button
              onClick={() =>
                navigate(isInstructor ? "/dashboard/create-course" : "/catalog/All")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isInstructor ? "Create Your First Course" : "Browse Courses"}
            </button>
          </div>
        ) : (
          // Course List
          <div className="space-y-4">
            {courseList.map((course) => (
              <div
                key={course.courseid}
                className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-shadow duration-200"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 md:flex-shrink-0">
                    <div className="h-48 md:h-full md:min-h-[160px] relative overflow-hidden rounded-lg md:rounded-lg ">
                      <img
                        src={course.thumbnail || "/placeholder.svg?height=160&width=256"}
                        alt={course.courseName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-xl font-normal text-gray-900 mb-2 line-clamp-2">
                          {course.courseName}
                        </h3>
                        <p className="text-gray-600 font-normal text-sm mb-4 line-clamp-3">
                          {course.courseDescription || "No description available for this course."}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Created : {course.createdAt?.slice(0, 10)}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{course.studentsEnrolled?.length || 0} students</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            setCourseid(course.courseid)
                            navigate("/dashboard/view-course")
                          }}
                        >
                          {isInstructor ? "View Course" : "Continue Learning"}
                        </button>

                        {isInstructor && (
                          <div className="flex items-center space-x-2">
                            <button
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Edit Course"
                              onClick={() => {
                                setCourseid(course.courseid)
                                navigate("/dashboard/sectioninfo")
                              }}
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Delete Course"
                              onClick={() => onDeleteClickHandler(course.courseid)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructor Quick Actions */}
        {isInstructor && courseList.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/dashboard/create-course")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Create New Course
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                View Analytics
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                Export Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses

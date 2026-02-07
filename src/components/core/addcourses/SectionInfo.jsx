

import { useParams } from "react-router-dom";

import ShowSection from "./ShowSection";

import { useSelector } from "react-redux";
import { useCourseContext } from "../../../providers/CourseProvider";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";





function SectionInfo() {
   

   const { courseid } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { courses,setCourseid } = useCourseContext();
     const navigate = useNavigate();
 



    const course =  courses?.find((item) => Number(item.courseid) === Number(courseid));
  
  
  
    const onClickHandler = () => {
        setCourseid(courseid);
        navigate("/dashboard/create-section");

    }
  
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Course Sections</h2>
                <button 
                onClick={onClickHandler}
                    
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Section
                </button>
            </div>

            <div className="space-y-6">
                {(course?.courseContent?.length || 0) === 0  ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <p className="mt-2 text-gray-500">No sections created yet</p>
                        <p className="text-sm text-gray-400">Create your first section to get started</p>
                    </div>
                ) : (
                    course.courseContent.map((s) => {
                       
                        return (
                            <ShowSection 
                                key={s.id}
                                courseid={courseid} 
                                subSectionList={s.subSection} 
                                sectionName={s.sectionName}
                                sectionid={s.id}
                                
                            />
                        )
                    })
                )}
            </div>
           
        </div>
    )
}

export default SectionInfo;
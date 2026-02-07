import { useSelector } from "react-redux";
import SubSection from "./SubSection";

import { useCourseContext } from "../../../providers/CourseProvider";
import { Plus } from 'lucide-react';
import {Trash2} from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteSection } from "../../../services/operations/courseApi";


function ShowSection({courseid, subSectionList, sectionName,sectionid }) {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { setCourses, setSectionid ,setCourseid} = useCourseContext();
   

    const onCreateSubsectionHandler = () =>{
    
         console.log("section id" + sectionid);
         console.log("courseid = " + courseid);
          setSectionid(sectionid);
          setCourseid(courseid);
          navigate("/dashboard/create-subsection");
              
    }

    const deleteSectionHandler = async() => {
       
        if (sectionid == null) {
          toast.error("Section id not available");
          return;
        }

        const result = await deleteSection(sectionid, token, courseid)
        if(!result.success)
        {
            toast.error("Failed to delete section: " + result.message);
            return;
        }
        

       setCourses((prevCourses) =>
            prevCourses.map((course) => {
           if (Number(course.courseid) !== Number(courseid)) return course;

          return {
          ...course,
          courseContent: (course.courseContent || []).filter(
            (section) => Number(section.id) !== Number(sectionid)
          ),
        };
        })
      );

      toast.success("Section Deleted Successfully");
       
    }
     
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{sectionName}</h3>
                <div className="flex gap-2">
                   
                   <button
                   onClick={deleteSectionHandler}
                   className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-300"
                   >
                      <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
            </div>

             <div className="space-y-3 mt-4">
        {subSectionList.length === 0 ? (
          <div className="text-center py-6 bg-white rounded-md border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">No subsections added yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {
            subSectionList.map((subsection) => (
              <SubSection
                key={subsection.id}
                subSectionName={subsection.title}
                subSectionid={subsection.id}
                courseid={courseid}
                sectionid={sectionid}
              />
            ))}
          </div>
        )}
      </div>


            <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                    onClick={onCreateSubsectionHandler}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-black rounded-md hover:bg-green-700 transition-colors duration-300 text-sm"
                >
                    <Plus className="w-4 h-4"/> Create Subsection
                </button>
            </div>
        </div>
    )
}

export default ShowSection;


import { Pencil, Trash2 } from "lucide-react";
import { useCourseContext } from "../../../providers/CourseProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteSubSection } from "../../../services/operations/courseApi";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";


function SubSection({ subSectionName, subSectionid ,courseid, sectionid}) {
  const { setCourses,setSubSectionid,setSectionid ,setCourseid } = useCourseContext();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();




  const onUpdateClickHandler = () => {
    setSectionid(sectionid);
    setCourseid(courseid);
    setSubSectionid(subSectionid);
    navigate("/dashboard/update-subsection");
  };

  const onDeleteClickHandler = async() => {
  
     const result = await deleteSubSection(subSectionid,token);
   
    if (!result.success) {
      toast.error("Failed to delete subsection: " + result.message);
      return;
    }
    
   
   
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
      if (Number(course.courseid) !== Number(courseid)) return course;

       return {
        ...course,
         courseContent: (course.courseContent || []).map((section) => {
           if (Number(section.id) !== Number(sectionid)) return section;

           return {
             ...section,
               subSection: (section.subSection || []).filter(
                (sub) => Number(sub.id) !== Number(subSectionid)
              ),
             };
           }),
         };
       })
     );
     toast.success("Subsection Deleted Successfully");

  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition duration-200">
      <p className="text-gray-800 font-medium">{subSectionName}</p>
      <div className="flex gap-2">
        <button
          onClick={onUpdateClickHandler}
          className="p-2 rounded-full hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition"
          title="Edit"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={onDeleteClickHandler}
          className="p-2 rounded-full hover:bg-gray-100 text-red-600 hover:text-red-800 transition"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SubSection;


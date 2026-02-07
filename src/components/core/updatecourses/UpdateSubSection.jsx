import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCourseContext } from "../../../providers/CourseProvider";
import { updateSubSection } from "../../../services/operations/courseApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function UpdateSubSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { courses, setCourses, courseid, sectionid, subsectionid} = useCourseContext();
  const dispatch = useDispatch();




  const OnSubmit = async (data) => {
    const formData = {
      ...data,
      vedioUrl: data.vedioUrl[0],
      sectionid:sectionid,
      subsectionid:subsectionid, 
    };

    const response = await updateSubSection(formData, token);
    
    if(!response.success)
    {
      toast.error("Failed to update subsection: " + response.message);
      return;
    }

   

    setCourses((prevCourses) => {
        return prevCourses.map( (course) => {
           if(Number(course.courseid) !== Number(courseid)) return course;

           return {
            ...course,
            courseContent: (course.courseContent || []).map( (section) =>
            {
               if(Number(section.id) !== Number(sectionid)) return section;

               return {
                ...section,
                subSection: (section.subSection || []).map( (sub) => {
                    if(Number(sub.id) !== Number(subsectionid)) return sub;
                    
                    return response.data;
                
                })
               }
            })
           }
        })
    });
        
    toast.success("Subsection updated successfully");
    navigate(`/dashboard/sectioninfo/${courseid}`);
  
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Update Subsection
      </h2>
      <form onSubmit={handleSubmit(OnSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            {...register("description")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Duration</label>
          <input
            type="text"
            placeholder="Enter time duration"
            {...register("timeDuration")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Video</label>
          <input
            type="file"
            {...register("vedioUrl")}
            className="mt-1 w-full"
          />
        </div>

        <div className="text-center">
          <input
            type="submit"
            value={isSubmitting ? "Updating..." : "Submit"}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateSubSection;

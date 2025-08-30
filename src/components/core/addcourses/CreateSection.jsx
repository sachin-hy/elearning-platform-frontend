import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSection } from "../../../services/operations/courseApi";
import { useCourseContext } from "../../../providers/CourseProvider";
import { useDispatch } from "react-redux";
function CreateSection() {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { courseid, setSectionid } = useCourseContext();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      courseid: courseid,
    };

    console.log("formData = " + formData);
    await createSection(formData, navigate, token, setSectionid,dispatch,courseid);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Create Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          
          
          <label className="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
          <input
            type="text"
            placeholder="Enter section name"
            {...register("sectionName", { required: "Section Name is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.sectionName && (
            <p className="text-red-500 text-sm mt-1">{errors.sectionName.message}</p>
          )}


        </div>

        <div className="text-center">
          <input
            type="submit"
            value={isSubmitting ? "Creating..." : "Create Section"}
            disabled={isSubmitting}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateSection;

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSubsection } from "../../../services/operations/courseApi";
import { useCourseContext } from "../../../providers/CourseProvider";
import { useDispatch } from "react-redux";

function CreateSubsection() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { sectionid,courseid } = useCourseContext();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      vedioUrl: data.vedioUrl[0],
      sectionid: sectionid,
    };

    await createSubsection(formData, navigate, token,dispatch,courseid);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create Subsection</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Subsection Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter title of subsection"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Subsection Description</label>
          <input
            type="text"
            {...register("description", { required: "Description is required" })}
            placeholder="Enter description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Time Duration</label>
          <input
            type="text"
            {...register("timeDuration", { required: "Time duration is required" })}
            placeholder="Enter time duration"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.timeDuration && <p className="text-red-500 text-sm mt-1">{errors.timeDuration.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Video</label>
          <input
            type="file"
            {...register("vedioUrl", { required: "Vedio file is required" })}
            className="w-full"
          />
          {errors.vedioUrl && <p className="text-red-500 text-sm mt-1">{errors.vedioUrl.message}</p>}
        </div>

        <div>
          <input
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateSubsection;

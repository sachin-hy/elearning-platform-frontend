

import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useCourseContext } from "../../../providers/CourseProvider"
import { fetchTags } from "../../../services/operations/categoryApi"
import toast from "react-hot-toast";
import { createCourse } from "../../../services/operations/courseApi"

function CourseInfo() {
  const [categories, setCategories] = useState([])
  const [previewImage, setPreviewImage] = useState(null)
  
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
 
  const { setCourses } = useCourseContext();  
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  

  useEffect(() => {
    const loadTags = async () => {
           
      const result = await fetchTags(setCategories, token);
      if(!result.success)
      {
        toast.error("Failed to load categories: " + result.message);
        return;
      }
    }

    loadTags();
    
  }, [])


  
  useEffect(() => {
    return () => {
    
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage]);


    
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      file: data.file[0],
    }
  
    const result = await createCourse(formData, token);

    
    if(!result.success)
    {
      toast.error("Failed to create course: " + result.message);
      return;
    }

    setCourses( (prevCourses) => {
        return [...prevCourses, result.data];
    });

    toast.success("Course Created Successfully");
    navigate("/dashboard/sectioninfo");
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Course Title <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            {...register("courseName")}
            placeholder="Enter course title"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Course Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows="4"
            {...register("courseDescription")}
            placeholder="Enter course description"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                required
                type="number"
                placeholder="Enter price"
                {...register("price")}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Tag <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              {...register("tag")}
              placeholder="Enter course category"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg "
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Course Image <span className="text-red-500">*</span>
          </label>

          <div className="mt-1">
            {previewImage && (
              <div className="mb-3">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview"
                  className="h-40 w-auto object-contain rounded-md"
                />
              </div>
            )}

            <div className="flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Choose file
              </label>
              <span className="ml-3 text-sm text-gray-500">{previewImage ? "Change image" : "No file chosen"}</span>
            </div>

            <input
              id="file-upload"
              type="file"
              required
              accept="image/*"
              {...register("file")}
              className="sr-only"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setPreviewImage(URL.createObjectURL(e.target.files[0]))
                }
              }}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Create Course"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseInfo

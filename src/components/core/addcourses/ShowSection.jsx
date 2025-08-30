import { useSelector } from "react-redux";
import SubSection from "./SubSection";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { useCourseContext } from "../../../providers/CourseProvider";
import { Plus } from 'lucide-react';
import {  Pencil ,Trash2} from "lucide-react";
import { GiNextButton } from "react-icons/gi";
import toast from "react-hot-toast";
import { sectionEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiconnector";
import { useDispatch } from "react-redux";
import { removeSectionFromTotalItems } from "../../../slices/cartSlice";
import { deleteSection } from "../../../services/operations/courseApi";


function ShowSection({courseid, subSectionList, sectionName,sectionid }) {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { setSectionid } = useCourseContext();
   
    const dispatch = useDispatch();

    const updateSectionHandler = () => {
        setSectionid(sectionid);
        navigate("/dashboard/update-section");
    }

    const deleteSectionHandler = async() => {
         await deleteSection(sectionid, navigate, token, dispatch, courseid);
    }
     
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{sectionName}</h3>
                <div className="flex gap-2">
                   <button
                     onClick={updateSectionHandler}
                     className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-300"
                    >
                    <Pencil className="h-4 w-4" />
                   </button>
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
            {subSectionList.map((subsection) => (
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
                    onClick={() => {
                        setSectionid(sectionid);
                        navigate("/dashboard/create-subsection");
                    }}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-black rounded-md hover:bg-green-700 transition-colors duration-300 text-sm"
                >
                    <Plus className="w-4 h-4"/> Create Subsection
                </button>
            </div>
        </div>
    )
}

export default ShowSection;


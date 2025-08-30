import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authApi";


function Sidebar()
{
    const {user} = useSelector((state)=>state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("sidebar length = " + sidebarLinks.length);
    function onClickHandler()
    {
        dispatch(logout(navigate));
    }

   return(
    <div className="flex flex-col text-white   font-normal py-10">
    
      {
        sidebarLinks.map((link)=>{
            if(link.type && user?.accountType!==link.type) return null;
            return (
                <SidebarLinks  key={link.id} link={link} iconName={link.icon}/>
            )
        })
      }

   

    <div className="mx-auto  mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 "></div>
    
    <div  className="flex relative flex-col">
     <SidebarLinks
       link={{name:"Settings",path:"dashboard/settings"}}
       iconName={"VscSettingsGear"}
     />

     <button
     
     onClick={onClickHandler}
     >
        <div className="flex text-white ml-8 items-center gap-x-2">
            <VscSignOut className="text-lg"/>
            <span>Logout</span>

        </div>
     </button>
    </div>
    
    </div>
   ) 

}

export default Sidebar;
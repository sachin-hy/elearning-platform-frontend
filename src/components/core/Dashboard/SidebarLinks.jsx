
import * as Icons from "react-icons/vsc";
import { NavLink } from "react-router-dom";


function SidebarLinks({link,iconName})
{
    const Icon= Icons[iconName];

    if(link.name==="Purchase History"){
        return ;
      }

      return(

        <NavLink
         to={link.path}
         className={"relative px-8 py-2 text-base sm:text-sm text-[80%] font-medium"}
         >

        <div className="flex items-center gap-x-2">
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
         </NavLink>
      )
}

export default SidebarLinks;
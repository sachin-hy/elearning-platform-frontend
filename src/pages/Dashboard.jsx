
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";



function Dashboard()
{

    console.log("Dashboard rendered");
    
     return (
        <div className="relative  flex  h-full w-[100vw] ">
            
            <div className="sm:relative sm:left-0 absolute transition-all duration-500 w-[15%] h-full">
              {console.log("Rendering Sidebar")}
              <Sidebar/>
            </div>
           
            <div className=" w-[85%] overflow-auto h-full">
              
                <Outlet/>
             
            </div>
        </div>
     )

}


export default Dashboard;
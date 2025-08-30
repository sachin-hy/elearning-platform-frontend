
import { useRef } from "react";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
function Dashboard()
{

     const token = localStorage.getItem("token");

     console.log("token = " + token ) ;

     const user = localStorage.getItem("user");
     const showRef = useRef();
     return (
        <div className="relative  flex  h-full w-[100vw] ">
            
            <div ref={showRef} className={` sm:relative sm:left-0 absolute transition-all duration-500 w-[15%] h-full `}>
              <Sidebar/>
            </div>
           
            <div className=" w-[85%] overflow-auto h-full">
              <ErrorBoundary>
                <Outlet/>
              </ErrorBoundary>
            </div>
        </div>
     )

}


export default Dashboard;
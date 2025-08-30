import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai";
import { Instructor } from "../../../../data/constData";
import ProfileDropDown from "../../auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../../../services/apiconnector";
import { categories } from "../../../../services/apis";
import {IoIosArrowDropdownCircle} from "react-icons/io";
import {logout} from  "../../../../services/operations/authApi"
import { useNavigate } from "react-router-dom";
import { categorysEndpoints } from "../../../../services/apis";
import { CircleUser } from 'lucide-react';
import { fetchSubLinks } from "../../../../services/operations/categoryApi";
import { ACCOUNT_TYPE } from "../../../../utils/constants";

function Navbar({menu,setMenu})
{

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {studentCourses} = useSelector((state) => state.studentCourses);
    


    console.log("menu = " , menu);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [subLinks,setSubLinks] = useState([]);

    console.log("sublinks = " , subLinks);

    


    useEffect(()=>{
        fetchSubLinks(setSubLinks);
        
    },[]);
   
  

    const location = useLocation();
    
    const matchRoute = (route) =>
    {
        return matchPath({path:route},location.pathname)
    }

   

    return(
        <div className="flex  w-full h-full  items-center justify-center ">
            
               
            <div className="relative flex w-11/12 max-w-maxContent items-center">
                <Link to="/">
                  
                </Link>

               



                {/**Navlinks  */}
                <nav className="mx-auto">
                    <ul className="flex gap-x-6 text-richblack-25 ">
                       {
                         NavbarLinks.map((link,index) =>
                        (
                           <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                  <div className="relative flex flex-row gap-2 items-center group">
                                      <p>{link.title}</p>
                                      <IoIosArrowDropdownCircle/>

                                      <div className="invisible absolute left-1/2 top-[120%] translate-x-[-50%] rounded-md bg-richblack-5 p-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[250px] z-50">
                                            <Link to={`/catalog/${"All"}`} ><p>All</p></Link>
                                      
                                      {
                                                subLinks?.length ? (
                                                
                                                    subLinks.map((subLink,index)=>{
                                                        return (
                                                        <Link to={`/catalog/${subLink.name}`} key={index}>
                                                            <p>{subLink.name}</p>
                                                        </Link>
                                                        );
                                                    })
                                                
                                                ):(<div></div>)
                                      }
                                      </div>
                                  </div>
                                )
                                :
                                (
                                    <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-white-25"}`}>
                                        {link.title}
                                    </p>    
                                    </Link>
                                      
                                )
                            }
                           </li>
                        )
                    )
                }
                    </ul>
                </nav>
                
                

                {/**Login/signup/dashboard */}
                <div className="absolute right-4 flex space-x-4 items-center  ">
                    {
                       token &&  <Link to="/dashboard/my-profile" ><CircleUser className="item-center text-white" /></Link>
                    }
                    {
                        user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <Link to={`/catalog/${"cart"}`} >
                                <AiOutlineShoppingCart className="w-6 h-6 text-white"/>
                                {
                                    studentCourses > 0 && (
                                        <span>{studentCourses}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md"> 
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                Sign up
                            </button>
                            </Link>
                        )
                    }

                    {
                        token != null && <ProfileDropDown />
                    }
                    {
                        token != null && (<button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-white rounded-md" onClick={()=>dispatch(logout(navigate))}> Logout</button>)
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar; 
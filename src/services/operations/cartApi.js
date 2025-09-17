import { apiConnector } from "../apiconnector";
import { cartEndpoints } from "../apis";
import { setCartCourses } from "../../slices/cartSlice";
import { addToCartCourses} from "../../slices/cartSlice";
import { toast } from "react-hot-toast";
import { removeToken } from "../../slices/authSlice";
export  function fetchCartCourses(pageNumber,token,navigate)
{
    return async (dispatch) => {
         try{
             const res = await apiConnector("GET",cartEndpoints.GET_CART_COURSES_API,null,{
                  Authorization: `Bearer ${token}`,
                },{
                    page:pageNumber
                });

                dispatch(setCartCourses(res.data));
         }catch(error)
         {
           if(error.status === 401)
                       {
                                 toast.error("Your session has expired. Please log in again.");
                                 dispatch(removeToken())
                                 navigate("/login");
                       }
                       toast.error(error.response.data.message);
            console.log("Error while loading cart courses" , error);
         }
    }
}

export function fetchCartCoursesSize(setCourseButton,token,navigate)
{
    return async (dispatch) => {
        try{

            const res = await apiConnector("GET",cartEndpoints.GET_CART_COURSES_SIZE_API,null,{
                Authorization: `Bearer ${token}`,
            },null);


            const size = Math.ceil(res.data / 2);
            let buttons = [];
            for(let i = 0; i < size; i++){
                buttons.push(i);
            }

            setCourseButton(buttons);

        }catch(error){
            if(error.status === 401)
                        {
                                  toast.error("Your session has expired. Please log in again.");
                                  dispatch(removeToken())
                                  navigate("/login");
                        }
                        toast.error(error.response.data.message);
             console.log("Errorwhileloading cart course size", error);
        }
    }
}


export function addCartCourse(courseid, token,navigate) {
    return async (dispatch) => {
        try{
            const res = await apiConnector("POST", cartEndpoints.ADD_TO_CART_API, null,{
                Authorization: `Bearer ${token}`,
            }, {
                courseid: courseid,
            });

            dispatch(addToCartCourses(res.data));
            toast.success("Course added to cart successfully");
        }catch(error)
        {
            if(error.status === 401)
                        {
                                  toast.error("Your session has expired. Please log in again.");
                                  dispatch(removeToken())
                                  navigate("/login");
                        }
            toast.error(error.response.data.message);
            console.log("Error while adding course to cart", error);
        }
    }
}
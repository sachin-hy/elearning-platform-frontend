import { useNavigate } from "react-router-dom"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { apiConnector } from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import { paymentEndpoints } from "../../../services/apis";
import toast from "react-hot-toast";
import { addCartCourse } from "../../../services/operations/cartApi";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants";


const CourseCard = ({ course ,buttonVariable, setIsVerifyingPayment}) => {

    const {user} = useSelector((state)=> state.profile);
    const token = useSelector((state)=> state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickHandler = ()=>
    {
     
        navigate(`/buy-course/${course.courseid}`);
    }

    const onCartCourseHandler  = async() => {
     
        const result = await addCartCourse(course.courseid,token);
        if(!result.success)
        {
           toast.error("Failed to add course to cart: " + result.message);
           return;
        }

        toast.success("Course added to cart successfully");
      }



    const onBuyCourseHandler = async() => {
      try{
        
          const orderResponse = await apiConnector("POST",paymentEndpoints.CREATE_ORDER_API,null,{
           Authorization: `Bearer ${token}`
          },{
            courseid: course.courseid
          });

          // order placed and get orderid and other details
          const { orderId, currency, amount, keyId } = orderResponse.data;
          

          const options = {
                key: keyId,
                amount: amount * 100,
                currency: currency,
                name: "My Awesome Store",
                description: "Course Enrollment",
                order_id: orderId,
                // caled after the payment is successful
                // and a webhook is triggered to verify the payment in backend as well  
                handler: async function (response) {
                    try {  
                        const verificationResponse = await apiConnector("POST",paymentEndpoints.VERIFY_PAYMENT_API, {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            
                            },{
                           Authorization: `Bearer ${token}`
         
                          },null);

                        if (verificationResponse.data.success) {
                            toast.success("Payment verified successfully!");
                            setIsVerifyingPayment(false);
                            navigate("/dashboard/my-courses");
                        } else {
                            toast.error("Payment verification failed: " + verificationResponse.data.message);
                        }
                    } catch (error) {
                        console.error("Error during payment verification:", error);
                        toast.error("Payment verification failed due to an error.");
                    }
                },
                prefill: {

                    name: user?.firstName + " " + user?.lastName,
                    email: user?.email,
                    contact: user?.additionalDetails?.contactNumber
                  
                },
                notes: { 
                    courseId: course.courseid,
                    email: user?.email,
                    "additional_note": "This is an example note for Razorpay"
                },
                theme: {
                    color: "#3399CC"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            rzp.on('payment.failed', function (response) {
                console.error("Payment Failed:", response.error);
                alert("Payment failed: " + response.error.description);
            });

          
      }catch(error)
      {
         
          console.error("Error  while  payment:", error);
          toast.error("Error while processing payment. Please try again."); 
      }
    }


  return (
    <>
    {
      buttonVariable ? 
      
      (
        ///******** */
        ///   this is the card which is 
        //     shown on the buy button
        ///******** */
        <div className="w-32 sm:w-48 md:w-64 bg-zinc-800  rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <div className="relative">
        <img
          src={course.thumbnail }
          alt="Course thumbnail"
          className="w-full h-40 object-cover"
        />
        
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <p className="text-white text-lg font-semibold font-heading "> 
            {course.courseName}
          </p>
          <p className="text-white text-sm ">
            {course.courseDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-white">${course.price}</span>  
          </div>
        </div>
         {
          user?.accountType === ACCOUNT_TYPE.STUDENT ? (
            <>
        <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={onBuyCourseHandler}
        >
          Buy Course
        </button>
       
        <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={onCartCourseHandler}
        >
          Add To Cart
        </button>
        </> 
          ):(<p></p>)
         }
      </div>
    </div>
      )
      :
      
      (

        //// ***
        //   this is the card we see on the page for allcourses 
        // ****////
      <button onClick={onClickHandler} className="  z-40  duration-300">
      <div className="w-full bg-zinc-800 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden">
       <div className="relative">
        <img
          src={course.thumbnail}
          alt="Course thumbnail"
          className="w-full h-40 object-cover"
        />
        
      </div>

      <div className="p-4 space-y-3">
        <div className="flex flex-col items-start justify-start space-y-2 ">
          <p className="text-white text-md  font-semibold font-heading ">
            {course.courseName}
          </p>

          
            <p className="font-light text-sm text-white ">
              {course.instructor.firstName} {course.instructor.lastName}
            </p>
        
         
          <Rating
              value={
              course?.ratingAndReviews?.length
               ? course.ratingAndReviews.reduce((sum, review) => sum + Number(review.rating), 0) /
              course.ratingAndReviews.length
              : 0.5
             }
            readOnly={true}
            style={{ maxWidth: 100 }}
          />
          <hr className="w-full border-t border-gray-300 my-2" /> 
          <span className="text-md font-medium text-white">${course.price}</span>
            
          
        </div>

        
        
      </div>
    </div>
    </button>)
    }
    </>
  )
}

export default CourseCard

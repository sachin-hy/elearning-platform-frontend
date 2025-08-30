import { FaArrowRight } from "react-icons/fa";
import instructor from "../../../assets/images/Instructor.png";
import Button from "./Button";
import HighlightText from "./HighlightText";

function InstructorSection()
{
    return(
        <div className=" flex flex-row items-center gap-10 mt-20">
              <div className="w-[50%] ">
               <img
                src={instructor}
               />
              </div>
              <div className="w-[50%] flex flex-col">
                  <div className="">
                   <p className="text-4xl font-semibold">Become an 
                    <HighlightText text={"Instructor"}/>
                   </p> 
                    <p className="text-[14px] w-[50%] font-normal  text-richblack-100 p-4">
                        Instructors from around the world tech milions of students on E-Learning. we provide the tools and skills to teach what you love.
                    </p>
                    <div className="w-fit h-fit">
                    <Button active={true} linkto={"/signup"}>
                       <div className="flex flex-row gap-2 items-center justify-center ">
                           Start Today 
                           <FaArrowRight/>
                       </div>
                    </Button>
                    </div>
                  </div>
              </div>
        </div>
    )
}


export default InstructorSection;
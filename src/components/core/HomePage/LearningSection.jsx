import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/images/Know_your_progress.png";
import plan_your_lesson from "../../../assets/images/Plan_your_lessons.png";
import compare_with_others from "../../../assets/images/Compare_with_others.png";
import Button from "./Button";


function LearningSection()
{
    return (
        <div>
              <div className="flex flex-col gap-5 justify-center items-center">
                 <div className="text-4xl text-white font-semibold text-center">
                     Your Swiss knife for
                     <HighlightText text={"learning any language"}></HighlightText>
                 </div>
                 <div>
                    <p className="text-center text-richblack-100 mx-auto mt-4 mb-10 w-3/4">Using spin making learning multiple languages easy with 20+ languages realistic voic-over, progress tracking, custom schedule and more.</p>
                 </div>

                 <div className="flex flex-row items-center justify-center mt-5 ">
                    <div className="relative  left-[100px]   ">
                          
                     <img
                        src={know_your_progress}
                     />
                    </div>
                    <div className="relative   ">
                    <img
                       src={compare_with_others}
                     />
                    </div>
                    <div className="relative right-[100px] ">
                      <img
                         src={plan_your_lesson}
                     />
                    </div>
                 </div>
                 <div className="m-5">
                    <Button action={true} linkto={"/signup"}>
                        Learn more
                    </Button>
                 </div>
              </div>
        </div>
    )
}

export default LearningSection;
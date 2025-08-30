import { TypeAnimation } from "react-type-animation";
import Button from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";


function CodeBlocks({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor})
{

     return (
        <div className={`flex ${position} my-20 justify-between gap-10 `}>
             {/**Section1 */}
             <div className='w-[50%] h-[100%] flex flex-col gap-8'>
                {heading}
                <div className=' text-richblack-100  font-normal text-lg'>
                    {subheading}
                </div>
                
                <div className='flex gap-7 mt-7'>
                    
                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </Button>

                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn2.btnText}
                            <FaArrowRight/>
                        </div>
                    </Button>
                </div>
             </div>


             {/**section2 */}
             <div className="h-[100%] flex flex-row text-10[px] w-[100%] py-4 lg:w-[400px] ">
                {/**Bg gradient */}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                    
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-normal font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                     sequence={[codeblock,10000,""]}
                     repeat={Infinity}
                     cursor={true}
                     omitDeletionAnimation={false}
                     style={{ whiteSpace: "pre-wrap", display: "block" }}
                    /> 
                </div>
             </div>

        </div>
     )
}

export default CodeBlocks;
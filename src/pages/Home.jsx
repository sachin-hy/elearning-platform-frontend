import {FaArrowRight} from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/images/Untitled design.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningSection from "../components/core/HomePage/LearningSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/core/HomePage/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Sidebar from "../components/core/Dashboard/Sidebar";


function Home()
{
   
   return (
     
      
    <div>
        {/* section1 */}
        <div className="relative  mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
           <Link to={"/signup"}>
              
              <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-600 font-normal text-white transition-all duration-200 hover:scale-95'>
                 <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                 </div>
              </div>
           </Link>
           <div className="text-center text-white text-4xl font-semibold mt-4 ">
             Empower Your Future with 
             <HighlightText text={"Coding Skills"}/>
           </div>

           <div className="w-[60%] pt-1 text-center text-richblack-100 text-lg font-normal ">
              with our online coding courses, you can learn at your own pace, from anywhere in the world and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
           </div>

           <div className="flex flex-row gap-7 mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                 Book a Demo
              </CTAButton>
           </div>
           
           <div className="shadow-blue-200 w-5/8 h-[500px] ">
               <video
               className="h-full w-full"
               muted
               loop
               autoPlay
               >
                  <source src={Banner} type="video/mp4"/> 
               </video>
           </div>

          {/**code Section */}
    
          <div className=" w-3/4 ">
            <CodeBlocks
                position={`lg:flex-row`}
                heading={
                  <div className='text-4xl font-semibold text-white'>
                  Unlock Your
                  <HighlightText text={"coding potential "}></HighlightText>
                  with our online courses
                  </div>
                }
               subheading={
                  "Our courses are desinged and taught by industry experts who have years of experience"
               }
               ctabtn1={
                  {
                  btnText:"try it yourself",
                  linkto:"/signup",
                  active:true, 
                  }           
               }

               ctabtn2={
                  {
                     btnText:"learn more",
                     linkto:"/login",
                     active:false,
                  }
               }

               codeblock={
                  `<!DOCTYPE html>\n<html>\n<head>\n<title>My Simple Webpage</title>\n</head>\n<body>\n<h1>Hello on Screen</h1>\n<p>This is a very basic HTML page.</p>\n</body>\n</html>`
               }
               
               codeColor={"text-white"}


            />
          </div>

          <div className="w-3/4">
            <CodeBlocks
                position={`lg:flex-row-reverse`}
                heading={
                  <div className='text-4xl font-semibold text-white lg:w-[50%]'>
                  Start 
                  <HighlightText text={"Coding in seconds "}></HighlightText>
                  </div>
                }
               subheading={
                  "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
               }
               ctabtn1={
                  {
                  btnText:"Continue Lesson",
                  linkto:"/signup",
                  active:true, 
                  }           
               }

               ctabtn2={
                  {
                     btnText:"learn more",
                     linkto:"/login",
                     active:false,
                  }
               }

               codeblock={
                 `import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
               codeColor={"text-white"}


            />
          </div>
         
            <ExploreMore/>
        </div>
        {/*section2 */}

       <div className=" text-richblack-700">
          <div className="homepage_bg h-[310px]">

            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 ">
               <div className="h-[150px]"></div>
                  <div className="flex flex-row gap-7 text-white">
                       <CTAButton active={true} linkto={"/signup"}>
                          <div className="flex gap-1 items-center justify-center">
                             Explore Full Catalog
                             <FaArrowRight/>
                          </div>   
                       </CTAButton>

                       <CTAButton active={false} linkto={"/signup"}>
                           <div>
                              Learn More
                           </div>
                       </CTAButton>
                  </div>
            </div>

          </div>

          <div className="m-5 w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
              <div className="flex flex-row gap-7 ">
                     <div className="text-4xl font-semibold text-white w-[45%] ">
                        Get the skills you need for a 
                        <HighlightText text={"Job that is in demand"}/>
                     </div>
                     <div className="flex flex-col gap-10 w-[40%] items-start mb-10">
                        <div className="text-[16px] text-richblack-100">
                             The modern StudyNotion is the dictates its own term. Today to be a competitve 
                             specialist requires more than professional skills.
                        </div>

                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                              Learn More
                            </div>
                        </CTAButton>
                     </div>
              </div>

              <TimelineSection/>
              <LearningSection/>
          </div>

 
       </div>
        {/**section3 */}

        <div className="w-11/12 m-5 max-w-maxContent flex flex-col items-center justify-between  text-white ">
             <InstructorSection></InstructorSection>

        </div>
        {/**footer */}
        <Footer/>

    </div>
    
   )
}


export default Home;



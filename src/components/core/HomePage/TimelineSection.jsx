
import Logo1 from "../../../assets/TimelineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimelineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimelineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimelineLogo/Logo4.svg"
import timelineImage from "../../../assets/images/studyimage.jpg"



function TimelineSection()
{

    
const timeline =[
    {
        Logo:Logo1,
        heading: "Leadership",
        Descritpion:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading: "Leadership",
        Descritpion:"Fully committed to the success company"
    },
    {
        Logo:Logo3,
        heading: "Leadership",
        Descritpion:"Fully committed to the success company"
    },
    {
        Logo:Logo4,
        heading: "Leadership",
        Descritpion:"Fully committed to the success company"
    }
]

   return (
    <div>
        <div className="flex flex-row gap-15 items-center">
              <div className="w-[45%] flex flex-col gap-5">
                {
                    timeline.map( (element,index) => {
                        return (
                            <div className="flex flex-row gap-6" key={index}>
                                <div className="w-[50px] h-[50px]  flex items-center">
                                    <img src={element.Logo}/>  
                                </div>
                                <div>
                                    <h2 className="font-semibold text-white text-[18px]">{element.heading}</h2>
                                    <p className="text-base text-richblack-100">{element.Descritpion}</p>
                                </div>    
                            </div>
                        )
                    })
                }
              </div>

              <div className="relative flex flex-col shadow-blue-200  items-center">
                 <img src={timelineImage} alt="timelineImage" className="shadow-white object-cover h-fit"/>
                
                 <div className="relative top-[-20px] bg-caribbeangreen-600 flex flex-row h-14 w-3/4 ">
                       <div className="flex gap-5 items-center px">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                       </div>

                       <div className="flex gap-5 items-center p-5">
                        <p className="flex text-3xl gap-5  font-bold items-center px">250</p>
                        <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
                       </div>
                 </div>
              </div>
        </div>
    </div>
   )
}

export default TimelineSection;
import { createContext, useState, useContext, useEffect } from "react";



const AppContext  = createContext();

export const CourseProvider = ({children}) => {
    const [courseid, setCourseid] = useState(() => localStorage.getItem("courseid"));
    const [sectionid, setSectionid] = useState(() => localStorage.getItem("sectionid"));
    const [subsectionid, setSubSectionid] = useState(() => localStorage.getItem("subsectionid"));


    useEffect(()=>
        {
            if (courseid) {
                localStorage.setItem("courseid", courseid);
            } else {
                localStorage.removeItem("courseid");
            }
        },[courseid])


    useEffect(()=>{
        if(sectionid)
        {
          localStorage.setItem("sectionid", sectionid);  
        }else{
            localStorage.removeItem("sectionid");
        }
    },[sectionid]);


    useEffect(()=>{
        if(subsectionid)
        {
            localStorage.setItem("subsectionid",subsectionid);
        }else{
            localStorage.removeItem("subsectionid");
        }
    },[subsectionid]);

    const value = {
        courseid,
        setCourseid,
        sectionid,
        setSectionid,
        subsectionid,
        setSubSectionid,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
export const useCourseContext = () => {
    return useContext(AppContext);
};
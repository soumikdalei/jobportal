import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
export const Appcontext=createContext();
export const AppContextProvider=(props)=>{
     const[searchFilter,setSearchFilter]=useState(
          {
               title:"",
               location:""
          }
     );
     const fetchJobs=async()=>{
          setJobs(jobsData)
     }
     useEffect(()=>{
          fetchJobs()
     },[])
     const [jobs,setJobs]=useState([])
     const [isSearched,setIsSearched]=useState(false)
     const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)
     const value={
          searchFilter,setSearchFilter,
          isSearched,setIsSearched,
          jobs,setJobs,
          showRecruiterLogin,setshowRecruiterLogin
     }
    
     return(<Appcontext.Provider value={value}>
          {props.children}
     </Appcontext.Provider>)
} 
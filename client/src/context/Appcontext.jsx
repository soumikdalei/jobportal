import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
export const Appcontext=createContext();
export const AppContextProvider=(props)=>{
     const backendurl=import.meta.env.VITE_BACKEND_URL
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
     const [companyToken,setcompanyToken]=useState(null)
     const [companyData,setcompanyData]=useState(null)
     const value={
          searchFilter,setSearchFilter,
          isSearched,setIsSearched,
          jobs,setJobs,
          showRecruiterLogin,setshowRecruiterLogin,
          companyToken,setcompanyToken,
          companyData,setcompanyData,
          backendurl
     }
    
     return(<Appcontext.Provider value={value}>
          {props.children}
     </Appcontext.Provider>)
} 
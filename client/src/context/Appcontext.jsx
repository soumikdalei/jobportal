import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import {useAuth, useUser} from "@clerk/clerk-react"
export const Appcontext=createContext();
export const AppContextProvider=(props)=>{
     const backendurl=import.meta.env.VITE_BACKEND_URL
     const {user}=useUser()
     const {getToken}=useAuth()
     const[searchFilter,setSearchFilter]=useState(
          {
               title:"",
               location:""
          }
     );
     const fetchJobs=async()=>{
          try {
               const {data}=await axios.get(backendurl+'/api/jobs')
               if(data.success){
                    setJobs(data.jobs)
                    console.log(data.jobs)
               }
               else{
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)
          }
     }
     const fetchCompanyData=async()=>{
          try {
               const {data}=await axios.get(backendurl+'/api/company/company',{headers:{token:companyToken}})
               if(data.success){
                    setcompanyData(data.company)
                    
               }
               else{
                    toast.error(data.message)
               }

          } catch (error) {
               toast.error(error.message)
          }
     }
     useEffect(()=>{
          fetchJobs()
          const storedCOmpanyToken=localStorage.getItem('companyToken')
          if(storedCOmpanyToken){
               setcompanyToken(storedCOmpanyToken)
          }
     },[])
     const [jobs,setJobs]=useState([])
     const [isSearched,setIsSearched]=useState(false)
     const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)
     const [companyToken,setcompanyToken]=useState(null)
     const [companyData,setcompanyData]=useState(null)
     const [userData,setuserData]=useState(null)
     const [userApplications,setuserApplications]=useState([])
     const fetchuserdata=async()=>{
          try {
               const token =await getToken()
               const {data}=await axios.get(backendurl+'/api/users/user',{headers:{Authorization:`Bearer ${token}`}})
               if(data.success){
                    setuserData(data.user)
               }
               else{
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)
          }
     }
     const fetchuserapplication=async()=>{
          try {
               const token=await getToken()
               const {data}=await axios.get(backendurl+'/api/users/applications',{headers:{Authorization:`Bearer ${token}`}})
               if(data.success){
                    setuserApplications(data.applications)
                    
               }else{
                    toast.error(data.message)
               }
          } catch (error) {
               toast.error(error.message)
          }
     }
     useEffect(()=>{
          if(companyToken){
               fetchCompanyData()
          }

     },[companyToken])
     useEffect(()=>{
         if(user){
          fetchuserdata()
          fetchuserapplication()
         }

     },[user])
     const value={
          searchFilter,setSearchFilter,
          isSearched,setIsSearched,
          jobs,setJobs,
          showRecruiterLogin,setshowRecruiterLogin,
          companyToken,setcompanyToken,
          companyData,setcompanyData,
          backendurl,userApplications,userData,setuserApplications,setuserData,fetchuserdata,fetchuserapplication
     }
    
     return(<Appcontext.Provider value={value}>
          {props.children}
     </Appcontext.Provider>)
} 
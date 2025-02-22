import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Appcontext } from "../context/Appcontext"
import { assets, jobsData } from "../assets/assets"
import Loading from "../components/Loading"
import Navbar from "../components/Navbar"
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from "axios"
import { toast } from "react-toastify"

import { useAuth } from "@clerk/clerk-react"


export default function ApplyJob(){
    
    const {id}=useParams()
    const {getToken}=useAuth()
    const [JobData,setJobData]=useState(null)
    const [isAlreadyApplied,setisAlreadyApplied]=useState(false)
    const { jobs ,backendurl, userApplications,userData,fetchuserapplication}=useContext(Appcontext)
    const navigate=useNavigate()
    
    const fetchjob=async()=>{
        try {
        const {data}=await axios.get(backendurl+`/api/jobs/${id}`)
        

        if(data.success){
            setJobData(data.job)
            
        }
        else{
            toast.error(data.message)
            console.log(data.job)
          
        }
        } catch (error) {
            toast.error(error.message)
           
        }
       
    }
    const applyhandler=async()=>{
        try {
            if(!userData){

                toast.error("Please Login First! To apply for jobs")
            }
            if(!userData.resume){
                navigate("/application")
                toast.error("Please Upload resume to apply!!")
            }
            const token=await getToken()
            const {data}=await axios.post(backendurl+'/api/users/apply',{jobId:JobData._id},{headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                toast.success(data.message)
                fetchuserapplication()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const checkalreadyapplied=()=>{
        const hasapplied=userApplications.some(item=>item.jobId._id===JobData._id)
        setisAlreadyApplied(hasapplied)
    }
    useEffect(()=>{
    fetchjob()
    },[id])
    useEffect(()=>{
          if(userApplications.length>0 && JobData){
            checkalreadyapplied()
          }
    },[JobData,userApplications,id])
    return JobData ?(<>
      <Navbar/> 
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full  ">
            <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-cyan-50 border border-cyan-400 rounded-xl ">
                <div className="flex flex-col md:flex-row items-center ">
                    <img className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border" src={JobData.companyId.image} />
                    <div className="text-center md:text-left text-neutral-700">
                        <h1 className="text=2xl sm:text-4xl font-medium">{JobData.title}</h1>
                        <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                            <span className="flex items-center gap-1">
                                <img src={assets.suitcase_icon} />
                                {JobData.companyId.name}
                            </span>
                            <span  className="flex items-center gap-1">
                                <img src={assets.location_icon} />
                                {JobData.location}
                            </span>
                            <span  className="flex items-center gap-1">
                                <img src={assets.person_icon} />
                                {JobData.level}
                            </span>
                            <span  className="flex items-center gap-1">
                                <img src={assets.money_icon} />
                                CTC:{kconvert.convertTo(JobData.salary)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
                    <button onClick={applyhandler} className="bg-blue-600 p-2.5 px-10 text-white rounded" >{isAlreadyApplied?'Already Applied':"Apply Now"}</button>
                    <p className="mt-1 text-gray-600">Posted {moment(JobData.date).fromNow()}</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full lg:w-2/3">
                    <h2 className="font-bold text-2xl mb-4">
                       Job Description 
                    </h2> 
                    <div className="rich-text" dangerouslySetInnerHTML={{__html:JobData.description}}>
                    </div>
                    <button onClick={applyhandler} className="bg-blue-600 p-2.5 px-10 text-white rounded mt-10">Apply Now</button>
                </div>
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 ">
                    <h2>More Jobs from {JobData.companyId.name}</h2>
                    {jobs.filter(job=>job._id!==JobData._id && job.companyId._id===JobData.companyId._id).filter(job=>
                   { const appliedJobs=new Set(userApplications.map(app=>app.jobId && app.jobId._id))
                     return !appliedJobs.has(job._id)
                   }
                    ).slice(0,4)
                    .map((job,index)=><JobCard key={index} job={job}/>)
                }
                </div>
            </div>
        </div>
      </div> 
      <Footer/>
    </>):(
        <Loading/>
    )
}
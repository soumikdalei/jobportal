import { useContext, useEffect, useState } from "react";
import { Appcontext, AppContextProvider } from "../context/Appcontext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import { use } from "react";
export default function JobListing(){
    const{isSearched,searchFilter,setSearchFilter,jobs}=useContext(Appcontext);
    const[showFilter,setShowFilter]=useState(true);
    const[currentPage,setPage]=useState(1)
    const [selectedCategories,setSelectedCategories]=useState([])
    const [selectedLocations,setSelectedLocations]=useState([])
    const[filterJobs,setFilterJobs]=useState(jobs)
    const handleCategoryChange=(category)=>{
          setSelectedCategories(
            prev=> prev.includes(category)?prev.filter(c=>c!==category):[...prev,category]
          )
    }
    const handleLocationChange=(location)=>{
        setSelectedLocations(
          prev=> prev.includes(location)?prev.filter(c=>c!==location):[...prev,location]
        )
  }
  useEffect(()=>{
    const matchCategory=job=>selectedCategories.length==0||selectedCategories.includes(job.category)
    const matchLocation=job=>selectedLocations.length==0||selectedLocations.includes(job.location)
    const matchesTitle=job=>searchFilter.title===""||job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    const matchesSearchLocation=job=>searchFilter.location===""||job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
    const newFilteredJobs=jobs.slice().reverse().filter(
        job=>matchCategory(job)&&matchLocation(job)&&matchesTitle(job)&&matchesSearchLocation(job)
    )
    setFilterJobs(newFilteredJobs)
    setPage(1)
  },[jobs,selectedCategories,selectedLocations,searchFilter])
    return(
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 text-white">
        <div className="w-full  lg:w-1/4 bg-white px-4">
            {
                isSearched && (searchFilter.title!=="" || searchFilter.location!=="") && (
                    <>
                     <h3 className="font-medium text-gray-600 text-lg mb-4">Current Search</h3>
                     <div className="mb-4 text-gray-600">
                        {searchFilter.title && (
                            <span className="inline-flex items-center gap-2.5 bg-white border border-cyan-600  px-4 py-1.5 rounded">
                               {searchFilter.title}
                               <img onClick={e=>setSearchFilter(prev=>({...prev,title:""}))} className="cursor-pointer" src={assets.cross_icon}/>
                            </span>
                        )}
                        {searchFilter.location && (
                            <span className="ml-2 inline-flex items-center bg-white gap-2.5 border border-cyan-600  px-4 py-1.5 rounded">
                                {searchFilter.location}
                                <img onClick={e=>setSearchFilter(prev=>({...prev,location:""}))} className="cursor-pointer" src={assets.cross_icon}/>
                            </span>
                        )}
                     </div>       
                    </>
                )
            }
            <button onClick={e=>setShowFilter(prev=>!prev)} className="px-6 py-1.5 rounded border text-gray-600 border-gray-600 lg:hidden">
                {showFilter ? "Close":"Filters"}
            </button>
            <div className={showFilter ? "": "max-lg:hidden"}>
                <h4 className="font-medium text-lg py-4 text-gray-600">Search By Categories</h4>
                <ul className="space-y-4 text-gray-600">
                    {
                        JobCategories.map((category,index)=>(
                            <li className="flex gap-3 items-center" key={index}>
                                <input  onChange={()=>handleCategoryChange(category)} 
                                checked={selectedCategories.includes(category)}
                                className="scale-125" type="checkbox"/>
                                {category}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={showFilter ? "": "max-lg:hidden"}>
                <h4 className="font-medium text-lg py-4 pt-14 text-gray-600">Search By Location</h4>
                <ul className="space-y-4 text-gray-600">
                    {
                        JobLocations.map((category,index)=>(
                            <li
                            onChange={()=>handleLocationChange(category)} 
                            checked={selectedLocations.includes(category)}
                            className="flex gap-3 items-center" key={index}>
                                <input className="scale-125" type="checkbox"/>
                                {category}
                            </li>
                        ))
                    }
                </ul>
            </div>
            </div>    
           <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
            <h3 className="font-medium text-3xl py-2" id='job-list'>Latest Jobs</h3>
            <p className="mb-8">Get your desired job from top companies</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(
                    <JobCard key={index} job={job}/>
                ))}
            </div>
            {
                filterJobs.length>0 && (
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        <a onClick={()=>setPage(Math.max(currentPage-1),1)} href="#job-list">
                            <img src={assets.left_arrow_icon}/>
                        </a>
                        {Array.from({length:Math.ceil(filterJobs.length/6)}).map((_,index)=>(
                            <a key={index} href="#job-list">
                            <button onClick={()=>setPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage===index+1?'bg-blue-100 text-blue-500':'text-gray-500'}`}>
                                 {index+1}
                            </button>
                         </a>
                        ))}
                  
                        <a onClick={()=>setPage(Math.min(currentPage+1),Math.ceil(filterJobs.length/6))} href="#job-list">
                            <img src={assets.right_arrow_icon}/>
                        </a>
                    </div>
                )
            }
           </section>

        </div>
    )
}
import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { Appcontext, AppContextProvider } from "../context/Appcontext";

export default function Hero(){
    const {setSearchFilter,setIsSearched}=useContext(Appcontext)
    const titleref=useRef(null)
    const locationref=useRef(null)
    const onSearch=()=>{
        setSearchFilter({
            title:titleref.current.value,
            location:locationref.current.value
        })

        setIsSearched(true)
        console.log({
            title:titleref.current.value,
            location:locationref.current.value
        })
    }
    return(
        <div className="container 2xl:px-20 mx-auto my-10 ">
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-900 text-white py-16 text-center mx-2 rounded-md">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Over 10,000+ jobs to apply</h2>
                <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
                    <div className="flex items-center">
                        <img className="h-4 sm:h-5" src={assets.search_icon}/>
                        <input ref={titleref} type="text" placeholder="Search For Jobs" className="max-sm:text-xs p-2 rounded outline-none w-full"/>
                    </div>
                
                    <div className="h-4 sm:h-5 flex items-center">
                        <img src={assets.location_icon}/>
                        <input ref={locationref} type="text" placeholder="Location" className="max-sm:text-xs p-2 rounded outline-none w-full"/>
                    </div>
                    <button onClick={onSearch} className="bg-cyan-600 m-1 px-6 py-2 rounded text-white">Search</button>
                </div>
            </div>
            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
                <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
                    <p className="font-medium">Trusted by</p>
                    <img className="h-6" src={assets.microsoft_logo}/>
                    <img className="h-6" src={assets.walmart_logo}/>
                    <img className="h-6" src={assets.amazon_logo}/>
                    <img className="h-6" src={assets.accenture_logo}/>
                    <img className="h-6" src={assets.samsung_logo}/>
                    <img className="h-6" src={assets.adobe_logo}/>
                </div>
            </div>
        </div>
    )
}
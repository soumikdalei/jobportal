import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk,UserButton,useUser } from "@clerk/clerk-react"; 
import { Link, useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";


 export default function Navbar(){
    const {openSignIn}=useClerk();
    const {user}=useUser();
    const navigate=useNavigate()
    const {setshowRecruiterLogin }=useContext(Appcontext)
    return (
       <div className="shadow-2xl py-4">
        <div className="container px-4 2x1:px-20 mx-auto text-blue-600 flex justify-between items-center">
            <img onClick={()=>navigate('/')} className='cursor-pointer' src={assets.logo}/>
            {user
            ?<div className="flex items-center gap-3">
                <Link to={'/application'}>Applied jobs</Link>
                <p>|</p>
                <p className="max-sm:hidden" >Hi,{user.firstName+" "+user.lastName}</p>
                <UserButton/>
            </div>:<div className="flex gap-4 max-sm:text-xs">
                <button onClick={e=>setshowRecruiterLogin(true)} className="bg-cyan-600 text-white shadow-lg shadow-cyan-500/50 rounded-full px-5">Recruiter Login</button>
                <button onClick={e => openSignIn()} className="bg-cyan-600  text-white px-6 sm:px-9 py-2 rounded-full shadow-lg shadow-cyan-500/50">Login</button>
            </div>}
            
        </div>
       </div>
    )
}
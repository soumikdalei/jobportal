import { json } from "express";
import Company from "../models/Company.js";
import bcrypt from "bcrypt" 
import {v2 as cloudinary} from 'cloudinary'
import generatetoken from "../utils/generateToken.js";

export const registerCompany=async(req,res)=>{
    const {name,email,password}=req.body;
    const imageFile=req.file;
    if(!name || !email || !password || !imageFile){
        return res.json({success:false,message:"Missing Details"})
    }
    try {
        const companyExist=await Company.findOne({email})
        if(companyExist){
            return res.json({success:false,message:"Email already exist"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const imageUpload=await cloudinary.uploader.upload(imageFile.path)
        const company=await Company.create({
            name,email,password:hashedPassword,image:imageUpload.secure_url
        })
        res.json({success:true,
            company:{
                _id:company.id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generatetoken(company._id)
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
export const loginCompany=async(req,res)=>{
       const {email,password}=req.body
       try {
         const company=await Company.findOne({email})
         if(bcrypt.compare(password,company.password)){
            res.json({
                success:true,
                company:{
                _id:company.id,
                name:company.name,
                email:company.email,
                image:company.image
                },
                token:generatetoken(company._id)
            })
         }
         else{
            res.json({success:false,message:"Invalid email or password"})
         }
       } catch (error) {
         res.json({success:false,message:error.message})
       }
}
export const getCompanyData=async(req,res)=>{

}
export const postnewJob=async(req,res)=>{

}
export const getJobAppplicants=async(req,res)=>{

}
export const getCompanyPostedJobs=async(req,res)=>{

}
export const changeJobApplicationStatus=async(req,res)=>{

}
export const changeVisibility=async(req,res)=>{

}
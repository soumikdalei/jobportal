import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyPostedJobs, getJobAppplicants, loginCompany, postnewJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'
const router=express.Router()
router.post('/register',upload.single('image'),registerCompany)
router.post('/login',protectCompany,loginCompany)
router.get('/company',protectCompany,getCompanyData)
router.post('/post-job',protectCompany,postnewJob)
router.get('/applicants',protectCompany,getJobAppplicants)
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)
router.post('/change-status',protectCompany,changeJobApplicationStatus)
router.post('/change-visibility',protectCompany,changeVisibility)
export default router
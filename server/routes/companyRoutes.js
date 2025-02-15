import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyPostedJobs, getJobAppplicants, loginCompany, postnewJob, registerCompany } from '../controllers/companyController.js'
const router=express.Router()
router.post('/register',registerCompany)
router.post('/login',loginCompany)
router.get('/company',getCompanyData)
router.post('/post-job',postnewJob)
router.get('/applicants',getJobAppplicants)
router.get('/list-jobs',getCompanyPostedJobs)
router.post('/change-status',changeJobApplicationStatus)
router.post('/change-visibility',changeVisibility)
export default router
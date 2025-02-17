import './config/instrument.js'
import express, { application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhook.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
const app=express()
await connectDB()
await connectCloudinary()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("API working")
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post('/webHooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
const PORT =process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';

const router = express.Router();

//create job || post
router.post('/create-job',userAuth,createJobController)

//get job || get
router.get('/get-job',userAuth,getAllJobsController)

//update job || patch || (put)
router.patch('/update-job/:id',userAuth,updateJobController)

//delete job || delete
router.delete('/delete-job/:id',userAuth,deleteJobController)

// Job stats filter || get
router.get('/job-stats',userAuth,jobStatsController)


export default router;
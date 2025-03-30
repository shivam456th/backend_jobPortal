import AppliedJob from "../Models/appliedJobsModel.js";
import Job from "../Models/job.model.js";

// GET all jobs
export const allJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ message: "All jobs fetched successfully", jobs });
    } catch (error) {
        console.error("Error in allJobs:", error);
        res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
};

// CREATE a new job
export const createJob = async (req, res) => {
    try {
        const { companyName, position, location, salary, skills } = req.body;

        if (!companyName || !position || !location || !salary) {
            return res.status(400).json({
                message: "All required fields must be provided",
            });
        }

        const salaryNum = Number(salary);
        if (isNaN(salaryNum)) {
            return res.status(400).json({ message: "Salary must be a number" });
        }

        const job = new Job({
            companyName,
            position,
            location,
            salary: salaryNum,
            skills: skills || [],
        });

        await job.save();
        res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
        console.error("Error in createJob:", error);
        res.status(500).json({ message: "Error creating job", error: error.message });
    }
};

// GET job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job fetched successfully", job });
    } catch (error) {
        console.error("Error in getJobById:", error);
        res.status(500).json({ message: "Error fetching job", error: error.message });
    }
};
export const applyForJob = async (req, res) => {
    try {
        const { jobId, userId } = req.body;
        console.log("Apply request:", { jobId, userId });

        if (!jobId || !userId) {
            return res.status(400).json({ message: "jobId and userId are required" });
        }

        // Optional: Check if the user exists
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const existingApplication = await AppliedJob.findOne({ jobId, userId });
        if (existingApplication) {
            return res.status(400).json({ message: "Already applied for this job" });
        }

        const appliedJob = new AppliedJob({ jobId, userId });
        await appliedJob.save();
        res.status(201).json({ message: "Application successful", appliedJob });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getUserAppliedJobs = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Fetching applied jobs for user:", userId);

        const appliedJobs = await AppliedJob.find({ userId }).populate('jobId');

        if (!appliedJobs.length) {
            return res.status(200).json({
                message: "No applied jobs found",
                appliedJobs: []
            });
        }

        const formattedJobs = appliedJobs.map(app => {
            if (!app.jobId) {
                console.error(`jobId not found for application: ${app._id}`);
                return null;
            }

            return {
                _id: app._id,
                jobId: app.jobId._id,
                companyName: app.jobId.companyName,
                position: app.jobId.position,
                location: app.jobId.location,
                salary: app.jobId.salary,
                skills: app.jobId.skills || []
            };
        }).filter(job => job !== null);

        res.status(200).json({
            message: "Applied jobs fetched successfully",
            appliedJobs: formattedJobs
        });
    } catch (error) {
        console.error(`Error in getUserAppliedJobs for userId ${req.params.userId}:`, error);
        res.status(500).json({ message: "Error fetching applied jobs", error: error.message });
    }
};

// DELETE applied job
export const deleteAppliedJob = async (req, res) => {
    try {
        const { id } = req.params;  // This should be the AppliedJob _id
        const { userId } = req.body;

        console.log("Delete request received:", { appliedJobId: id, userId });

        if (!id || !userId) {
            return res.status(400).json({ message: "Application ID and User ID are required" });
        }

        // Find the specific application
        const appliedJob = await AppliedJob.findOne({ 
            _id: id, 
            userId: userId 
    });

        if (!appliedJob) {
            console.log("Application not found or not authorized");
            return res.status(404).json({ 
                message: "Applied job not found or not authorized" 
            });
        }

        await AppliedJob.deleteOne({ _id: id, userId });
        console.log("Application deleted successfully");

        res.status(200).json({ message: "Applied job deleted successfully" });
    } catch (error) {
        console.error("Error in deleteAppliedJob:", error);
        res.status(500).json({ message: "Error deleting applied job", error: error.message });
    }
};

// Delete Company 
export const deleteApiCompany = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Validate jobId format (assuming MongoDB ObjectId)
        if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid job ID format' 
            });
        }

        // Find and delete the job
        const deletedJob = await Job.findByIdAndDelete(jobId);
        
        if (!deletedJob) {
            return res.status(404).json({ 
                success: false, 
                message: 'Job not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Job deleted successfully',
            data: deletedJob // Optional: return deleted job details
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while deleting job',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
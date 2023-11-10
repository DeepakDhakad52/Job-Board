const express = require('express')


const { UserJobApplicationModel } = require('../Models/UserJobApplication.model')

const JobApplicationRouter = express.Router()

JobApplicationRouter.get('/', async (req, res) => {
    try {
        const data = await UserJobApplicationModel.find()
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})
JobApplicationRouter.get('/application/:user', async (req, res) => {
    const { user } = req.params;

    try {
        // Find all job applications for the specified user
        const jobApplications = await UserJobApplicationModel.find({ user });

        // Send the job applications as the response
        res.json(jobApplications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error', success: false });
    }
});


JobApplicationRouter.get('/:user', async (req, res) => {
    const { user } = req.params;

    try {
        // Check if there are any job applications for the specified employee
        const hasApplications = await UserJobApplicationModel.exists({ 'jobData.user': user });

        if (hasApplications) {
            const data = await UserJobApplicationModel.find({ 'jobData.user': user });
            res.status(200).send(data);
        } else {
            // No applications found for the specified employee
            res.status(404).send({ msg: "No applications found for this employee", status: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Internal Server Error", status: false });
    }
})

JobApplicationRouter.post('/apply', async (req, res) => {
    try {
        // Extract relevant data from the request body
        const { user, jobData } = req.body;

        // Check if a job application with the same jobData._id already exists for the user
        const existingApplication = await UserJobApplicationModel.findOne({ user, 'jobData._id': jobData._id });

        if (existingApplication) {
            // If an application already exists, send a response with an alert message
            res.json({ msg: 'You have already applied for this job.', success: false });
        } else {
            // If no existing application, create a new job application and save it to the database
            const newJobApplication = new UserJobApplicationModel(req.body);
            await newJobApplication.save();
            res.json({ msg: 'New job application submitted successfully.', success: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', success: false });
    }
});

JobApplicationRouter.patch("/update/:id", async (req, res) => {
    const jobId = req.params.id; // Get the job application ID from the request params

    try {
        const updatedFields = req.body; // Assuming your request body contains the fields to update

        // Use findByIdAndUpdate to update the document by its ID
        const updatedApplicationStatus = await UserJobApplicationModel.findByIdAndUpdate(
            jobId, // Use jobId to find the document by its ID
            { $set: { status: updatedFields.status } }, // Update only the 'status' field
            { new: true } // This option returns the updated document
        );

        if (!updatedApplicationStatus) {
            return res.status(404).json({ message: "Job application status not found" });
        }

        res.json({ message: "Job Approved", success: true, data: updatedApplicationStatus });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = {
    JobApplicationRouter
}
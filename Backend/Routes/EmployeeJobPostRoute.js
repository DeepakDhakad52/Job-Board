const express = require('express')

const { EmployeeJobPostModel } = require('../Models/EmployeeJobPost.model')

const EmployeeJobPostRouter = express.Router()

EmployeeJobPostRouter.get('/', async (req, res) => {

    try {
        const data = await EmployeeJobPostModel.find()
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})
EmployeeJobPostRouter.get('/jobdata', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "JobPostDate";

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }

        const query = {
            $or: [
                { jobTitle: { $regex: search, $options: "i" } },
                { companyName: { $regex: search, $options: "i" } }
            ]
        };

        const jobs = await EmployeeJobPostModel.find(query)
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await EmployeeJobPostModel.countDocuments(query);

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            jobs
        };

        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: true, message: 'An error occurred' });
    }
});



EmployeeJobPostRouter.get('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const data = await EmployeeJobPostModel.findOne({ _id }); // Use findOne to query by _id
        if (data) {
            res.send(data);
        } else {
            res.status(404).json({ message: 'Job post not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

EmployeeJobPostRouter.get('/user/:user', async (req, res) => {
    try {
        const { user } = req.params;
        const data = await EmployeeJobPostModel.find({ user: user }); // Adjust the field name as needed

        res.send(data);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
        console.error(err);
    }
});

EmployeeJobPostRouter.post('/post', async (req, res) => {
    try {
        const Job = new EmployeeJobPostModel(req.body)
        await Job.save()

        res.send({ "msg": "New job application submited succesfully", "success": true })
    } catch (err) {
        console.log(err)
    }
})





module.exports = {
    EmployeeJobPostRouter
}
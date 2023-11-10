const mongoose = require('mongoose')


const EmployeeJobPostSchema = mongoose.Schema({
    user: String,
    jobTitle: String,
    companyName: String,
    CompanyLogo: String,
    experience: String,
    salary: String,
    location: String,
    JobPostDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
    vacancy: Number,
    applications: Number,
    jobDescription: Array,
    what_looking_in_collegue: Array,
    role: String,
    industryType: String,
    department: String,
    employmentType: String,
    roleCatagory: String,
    educations: String,
    skills: Array,
    aboutCompany: Array
}, {
    versionKey: false
})




const EmployeeJobPostModel = mongoose.model('jobs', EmployeeJobPostSchema)

module.exports = {
    EmployeeJobPostModel
}


// // const data = [{
    // "user": "650afeccb63b4872712198fe",
    // "jobTitle": "Java Backend Engineer - Spring Boot / Microservices Architecture",
    // "companyName": "Patch Infotech",
    // "CompanyLogo": "https://media.licdn.com/dms/image/C4D0BAQFL6aRYsm6eoA/company-logo_200_200/0/1603463350197?e=2147483647&v=beta&t=FUw6S14oqNFSN8yTdfG4NzKro-5zWWdKXjzk7RMQGgw",
    // "exprinence": "2-5",
    // "salary": "2-3",
    // "location": "Delhi",
    // "JobPostDate": "12 Aug 2023",
    // "vacance": "5",
    // "applications": "0",
    // "jobDescription": [" Are you in love with javascript?", "Do you like to build beautiful yet challenging applications?", "Do you like to work in large scale projects?", " Do you lovewant to work in micro frontend architectures?", "Do you like to work remote?", "If above is Yes then let's connect over an e-coffee or e-beer!"],
    // "what_looking_in_collegue": ["We are looking for people like you matching below technical criteria :", "Should be strong in react and javascript concepts", "Should be strong in business logics, HTML, CSS, mobile responsiveness", " Should be able to work independently with minimum supervision", "Should have exposure in handling state management in react from scratch."],
    // "role": "Front End Developer",
    // "industryType": " IT Services & Consulting",
    // "department": "Engineering - Software & QA",
    // "employmentType": "Full Time, Permanent",
    // "roleCatagory": " Software Development",
    // "educations": "Graduation",
    // "skills": ["React", "Mongo", "Node", "Python"],
    // "aboutCompany": ["Patch Infotech is a product+service based organization that aims to build scalable and pixel-perfect products along with providing technical consultancy to other service or product based organizations.", "Started in 2016, we have gathered experience across industry verticals like Logistics, Healthcare, Education, eCommerce, IoT, Fintech, Real Estate, Banking, Entertainment, and various consumer Startups. We have also amassed extensive experience in end-to-end product design & development across various verticals and consumer applications. We have an experienced Product, UI & UX team along with a strong dev team that can help you with conceptualizing, designing as well as building scalable Web, Mobile and backend products."]
// }]
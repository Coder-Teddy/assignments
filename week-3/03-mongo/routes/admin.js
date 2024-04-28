const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Course, Admin } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body

    // Admin.findOne({ 
    //     username: username, 
    //     password: password 
    // }, 
    //     (err, user) => {
    //         if (err) throw err;
    //         if (user) {
    //             return res.status(400).send('User already exist');
    //         }
    //     }
    // )
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: "Admin created successfully"
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body

    const newCourse = await Course.create({
        title, 
        description, 
        price, 
        imageLink
    })
    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});
    
router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;
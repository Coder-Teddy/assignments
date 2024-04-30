const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body

    User.findOne({ 
        username: username, 
        password: password 
    }, 
        (err, user) => {
            if (err) throw err;
            if (user) {
                return res.status(400).send('User already exist');
            }
        }
    )
    await User.create({
        username: username,
        password: password
    })
    res.json({
        message: "User created successfully"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const username = req.body.username

    await User.updateOne({
        username: username
    },{ // $push is use to add specific value in array, in below case we have to update purchased course ID
        "$push":{
            purchasedCourses: courseId
        },
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })
    console.log(user.purchasedCourses);
    
    const course = await Course.findOne({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })
});

module.exports = router
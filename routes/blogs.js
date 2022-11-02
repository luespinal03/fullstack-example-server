var express = require('express');
var router = express.Router();
const { uuid } = require("uuidv4");

const { db } = require("../mongo");



/* GET all blogs listing. */
router.get('/all', async function (req, res, next) {
    // 
    try {
        // empty object inside find({}) gets us everything sincce we are not specifying anything
        const blogPost = await db()
            .collection('BlogsDB')
            .find({}).toArray();

        res.json({
            success: true,
            post: blogPost
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});


//  GET-one id number route
router.get('/get-one/:id', async function (req, res, next) {
    try {
        // id given through request.params.id(params means the user inputs it)
        const idParam = req.params.id;

        const blogPost = await db()
            .collection('BlogsDB')
            .findOne({
                id: idParam,
            });

        res.json({
            success: true,
            post: blogPost
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})


// create-one route
router.post('/create-one', async function (req, res, next) {
    try {
        console.log(req.body)
        // copies the key value pairs from req.body into newBlog
        const newBlog = {
            ...req.body,
            createdAt: new Date(),
            lastModified: new Date(),
            id: uuid()
        }


        console.log(newBlog)

        const result = await db().collection('BlogsDB').insertOne(newBlog)


        console.log(result);

        res.json({
            success: true,
        })

    }

    catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})


// update-one route STLL working on it
router.post('/update-one', async function (req, res, next) {
    try {
        console.log(req.body)
    }
    catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})


module.exports = router;
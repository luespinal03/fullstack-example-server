var express = require('express');
var router = express.Router();

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



router.get('/get-one/:id', async function (req, res, next) {
    try {
        // id given through request.params.id
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
    catch {

    }
})

module.exports = router;
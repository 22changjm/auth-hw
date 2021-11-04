const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../model/User");

/**
 * @method - GET
 * @param - /list
 * @description - Get USER's list
 */

router.get("/list", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ shoppinglist: user.shoppinglist});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.post("/add", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = req.body.item;
        user.shoppinglist.push(item);

        await user.save();

        res.json({ shoppinglist: user.shoppinglist});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

router.delete("/delete", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = req.body.item;
        let index = user.shoppinglist.indexOf(item);
        if (index > -1) {
            user.shoppinglist.splice(index, 1);
        }

        await user.save();

        res.json({ shoppinglist: user.shoppinglist});
    } catch (e) {
        res.send({ message: "Error in Fetching User"});
    }
})

module.exports = router;
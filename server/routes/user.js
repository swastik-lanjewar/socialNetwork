const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwtAuth = require("../middleware/jwtAuth");

// GET A USER BY ID
router.get("/:id", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            // if the user is found, do not send the password and timestamp
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json({
                message: "User found",
                user: other,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error getting user",
            });
        }
    }
});

// UPDATE A USER BY ID
router.put("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            // if the user is updating their password then hash it
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 16);
            }
            const updatedUserProfile = await User.findByIdAndUpdate(req.user.id, req.body, {
                new: true,
            })
            // if the user is found, do not send the password and timestamp
            const { password, updatedAt, ...userData } = updatedUserProfile._doc;
            
            return res.status(200).json({
                message: "User updated",
                user: userData,
            });   
        } catch (error) {
            return res.status(500).json({
                message: "Error updating user",
            });
        }
    }
});

// DELETE A USER BY ID
router.delete("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            // delete all posts of the user
            await Post.deleteMany({ userId: req.user.id });
            // delete the user
            await User.findByIdAndDelete(req.user.id);

            return res.status(200).json({
                message: "User deleted",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
});

// GET ALL USERS
router.get("/", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const users = await User.find();
            if (!users) {
                return res.status(404).json({
                    message: "No users found",
                });
            }
            // don't send the password and timestamp
            const usersData = users
                .map((user) => {
                    const { password, updatedAt, ...other } = user._doc;
                    return other;
                })
                .filter((user) => {
                    return user.id !== req.user.id;
                });

            return res.status(200).json({
                message: "Users found",
                users: usersData,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error getting users",
            });
        }
    }
});

// connect to a user
router.post("/:id/connect", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            // check if the user is already connected to the other user
            const user = await User.findById(req.user.id);
            const isConnected = user.connections.find(
                connection => connection.toString() === req.params.id
            );   

            if (isConnected) {
                return res.status(400).json({
                    message: "User already connected",
                });
            }

            // save current user to the other user's connections array
            const otherUser = await User.findById(req.params.id);
            otherUser.connections.push(req.user.id);
            await otherUser.save();

            // save the other user to the current user's connections array
            user.connections.push(req.params.id);
            const updatedUser = await user.save();

            // send the updated user to the frontend
            const { password, updatedAt, ...other } = updatedUser._doc;

            return res.status(200).json({
                message: "User connected",
                user: other,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error connecting user",
            });
        }
    }
});

// disconnect from a user
router.delete("/:id/disconnect", jwtAuth, async (req, res) => {
    if (req.user) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $pull: { connections: req.params.id },
                },
                { new: true }
            );

            await User.findByIdAndUpdate(req.params.id, {
                $pull: { connections: req.user.id },
            });

            const { password, updatedAt, ...other } = updatedUser._doc;
            return res.status(200).json({
                message: "User disconnected",
                user: other,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error disconnecting user",
            });
        }
    }
});

module.exports = router;

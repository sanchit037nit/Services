import {generateToken} from "../utils/gentok.js"
import User from "../models/users.model.js"
import Solution from "../models/solution.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../utils/cloudinary.js"
import Report from "../models/report.model.js"

const REPORT_THRESHOLD = Number(process.env.REPORT_THRESHOLD) || 5;

export const reportPost = async (req, res) => {
    try {

        const { postId } = req.params;
        const { reason } = req.body;
        const reporter = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.isHidden) {
            return res.status(400).json({
                success: false,
                message: "Post already under review"
            });
        }

        if (post.createdby.equals(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: "You cannot report your own post"
            });
        }

        const alreadyReported = await Report.findOne({
            reporter,
            post: postId
        });

        if (alreadyReported) {
            return res.status(400).json({
                success: false,
                message: "You have already reported this post."
            });
        }

        await Report.create({
            reporter,
            post: postId,
            reason
        });

        post.reportCount++;

        if (post.reportCount >= REPORT_THRESHOLD) {
            post.isHidden = true;
        }

        await post.save();

        res.status(200).json({
            success:true,
            message:"Report submitted.",
            reportCount:post.reportCount,
            hidden:post.isHidden
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getReportedPosts = async (req, res) => {

    try {

        const reports = await Report.find()
            .populate("reporter", "username profilePic")
            .populate({
                path: "post",
                populate: {
                    path: "user",
                    select: "username profilePic"
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reports
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const restorePost = async (req, res) => {

    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        post.isHidden = false;
        post.reportCount = 0;
        await post.save();

        await Report.deleteMany({
            post: postId
        });

        res.status(200).json({
            success: true,
            message: "Post restored successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteReportedPost = async (req, res) => {

    try {
        const { postId } = req.params;
        await Report.deleteMany({
            post: postId
        });

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
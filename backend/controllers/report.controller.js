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


        
        const post = await Solution.findById(postId);

       
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
        const alreadyReportedonce = await Report.findOne({
            post: postId
        });

        if (alreadyReported) {
            return res.status(400).json({
                success: false,
                message: "You have already reported this post."
            });
        }



        post.reportCount++;

        if (post.reportCount >= REPORT_THRESHOLD) {
            console.log(REPORT_THRESHOLD)
            console.log(post.reportCount)
            post.isHidden = true;
        }

        if (alreadyReportedonce) {
                    res.status(200).json({
            success:true,
            message:"Report submitted.",
            reportCount:post.reportCount,
            hidden:post.isHidden
        });
        }
                await Report.create({
            reporter,
            post: postId,
            reason
        });

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
                    path: "createdby",
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
        const post = await Solution.findById(postId);
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

        await Solution.findByIdAndDelete(postId);

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

export const rejectreport = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }

        const post = await Solution.findById(report.post);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        await Report.findByIdAndDelete(id);

        post.reportCount--;

        post.isHidden = post.reportCount >= REPORT_THRESHOLD;

        await post.save();

        return res.status(200).json({
            message: "Report rejected"
        });

    } catch (error) {
        console.log("Error rejecting report", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
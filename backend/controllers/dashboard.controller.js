import User from "../models/users.model.js";
import Solution from "../models/solution.model.js";
import Report from "../models/report.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalPosts,
      totalReports,
      hiddenPosts,

      monthlyPosts,
      monthlyUsers,
      monthlyReports,
      hiddenPostsMonthly,

      recentUsers,
      recentReports,

      reportReasons,
      topActiveUsers,
      topReportedPosts,
    ] = await Promise.all([

      // ================= COUNTS =================

      User.countDocuments({ role: "user" }),

      Solution.countDocuments(),

      Report.countDocuments(),

      Solution.countDocuments({
        isHidden: true,
      }),

      // ================= MONTHLY POSTS =================

      Solution.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      // ================= MONTHLY USERS =================

      User.aggregate([
        {
          $match: {
            role: "user",
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      // ================= MONTHLY REPORTS =================

      Report.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      // ================= MONTHLY HIDDEN POSTS =================

      Solution.aggregate([
        {
          $match: {
            isHidden: true,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      // ================= RECENT USERS =================

      User.find(
        { role: "user" },
        "name email profilephoto createdAt"
      )
        .sort({ createdAt: -1 })
        .limit(5),

      // ================= RECENT REPORTS =================

      Report.find()
        .populate("reporter", "name profilephoto")
        .populate({
          path: "post",
          select: "doubt language platform createdby reportCount isHidden",
          populate: {
            path: "createdby",
            select: "name profilephoto",
          },
        })
        .sort({ createdAt: -1 })
        .limit(5),

      // ================= REPORT REASONS =================

      Report.aggregate([
        {
          $group: {
            _id: "$reason",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]),

      // ================= TOP ACTIVE USERS =================

      Solution.aggregate([
        {
          $group: {
            _id: "$createdby",
            totalPosts: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalPosts: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            totalPosts: 1,
            "user.name": 1,
            "user.profilephoto": 1,
            "user.email": 1,
          },
        },
      ]),

      // ================= TOP REPORTED POSTS =================

      Solution.find({
        reportCount: { $gt: 0 },
      })
        .populate("createdby", "name profilephoto")
        .sort({
          reportCount: -1,
        })
        .limit(5),
    ]);

    const hiddenPercentage =
      totalPosts === 0
        ? 0
        : Number(((hiddenPosts / totalPosts) * 100).toFixed(1));

    return res.status(200).json({
      success: true,

      // Summary Cards
      totalUsers,
      totalPosts,
      totalReports,
      hiddenPosts,
      hiddenPercentage,

      // Graph Data
      monthlyPosts,
      monthlyUsers,
      monthlyReports,
      hiddenPostsMonthly,

      // Tables
      recentUsers,
      recentReports,

      // Pie Chart
      reportReasons,

      // Extra Analytics
      topActiveUsers,
      topReportedPosts,

      generatedAt: new Date(),
    });

  } catch (error) {
    console.log("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};
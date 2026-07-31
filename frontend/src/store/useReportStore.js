import { create } from "zustand";
import { axiosinstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useReportStore = create((set, get) => ({

    loading: false,

    reportedPosts: [],

    selectedReport: null,

    stats: {},

    // ==========================
    // User - Report a Post
    // ==========================

    reportPost: async (postId, reason) => {

        try {

            set({ loading: true });

            const res = await axiosinstance.post(
                `/sol/${postId}/report`,
                { reason }
            );

            toast.success(res.data.message);

            return true;

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Failed to report post."
            );

            return false;

        } finally {

            set({ loading: false });

        }

    },

    // ==========================
    // Admin - Get All Reports
    // ==========================

    getReportedPosts: async () => {

        try {

            set({ loading: true });

            const res = await axiosinstance.get(
                "/sol/reported"
            );

            set({

                reportedPosts: res.data.reports,

            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to fetch reported posts."
            );

        } finally {

            set({ loading: false });

        }

    },

    // ==========================
    // Admin - Review Report
    // action = approve/reject
    // ==========================

    reviewReport: async (reportId, action) => {

        try {

            set({ loading: true });

            const res = await axiosinstance.put(

                `/sol/admin/review/${reportId}`,

                {
                    action,
                }

            );

            toast.success(res.data.message);

            get().getReportedPosts();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to review report."
            );

        } finally {

            set({ loading: false });

        }

    },

    // ==========================
    // Admin - Delete Post
    // ==========================

    deleteReportedPost: async (postId) => {

        try {

            set({ loading: true });

            const res = await axiosinstance.delete(

                `/sol/${postId}/admin-delete`

            );

            toast.success(res.data.message);

            get().getReportedPosts();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to delete post."
            );

        } finally {

            set({ loading: false });

        }

    },

    // ==========================
    // Admin - Dashboard Stats
    // ==========================

    getReportStats: async () => {

        try {

            set({ loading: true });

            const res = await axiosinstance.get(

                "/sol/reported"

            );
            console.log(res)
            set({

                stats: res.data,

            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to fetch statistics."
            );

        } finally {

            set({ loading: false });

        }

    },

    // ==========================
    // Selected Report
    // ==========================

    setSelectedReport: (report) => {

        set({

            selectedReport: report,

        });

    },

    clearSelectedReport: () => {

        set({

            selectedReport: null,

        });

    },

}));
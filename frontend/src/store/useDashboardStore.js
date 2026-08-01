import { create } from "zustand";
import { axiosinstance } from "../lib/axios"; // adjust path if needed

export const useDashboardStore = create((set) => ({

    dashboard: null,
    loading: false,

    getDashboardStats: async () => {

        try {

            set({ loading: true });

            const res = await axiosinstance.get("/sol/admin/dashboard");
            console.log(res)
            set({
                dashboard: res.data,
                loading: false
            });

        } catch (error) {

            console.log(error);

            set({ loading: false });

        }

    }

}));
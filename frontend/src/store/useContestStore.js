import { create } from "zustand";
import { axiosinstance, BASE_URL } from "../lib/axios.js";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SOCKET_URL = BASE_URL.replace("/api", "");

export const useContestStore = create((set, get) => ({
  contests: [],
  currentGroup: null,
  socket: null,
  isLoading: false,

  // 1. Initialize global socket connection for real-time push notifications
  connectSocket: () => {
    const currentSocket = get().socket;
    if (currentSocket?.connected) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to real-time contest server");
    });

    // Listen for background worker scraping a new contest
    socket.on("new_contest_group", (contest) => {
      toast.success(`New Contest Found: ${contest.contestName}! Groups created.`);
      set((state) => ({ contests: [...state.contests, contest] }));
    });

    // Listen for background worker declaring a contest is LIVE
    socket.on("contest_live", (data) => {
      toast.success(`Contest is now LIVE: ${data.name}!`);
      set((state) => ({
        contests: state.contests.map((c) =>
          c._id === data.contestId ? { ...c, status: "ACTIVE" } : c
        ),
      }));
    });

    // Listen for chat messages inside a room
    socket.on("new_group_message", (message) => {
      const { currentGroup } = get();
      if (currentGroup) {
        set({
          currentGroup: {
            ...currentGroup,
            messages: [...currentGroup.messages, message],
          },
        });
      }
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  // 2. Fetch all upcoming/active contests
  fetchContests: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosinstance.get(`/contest`);
      set({ contests: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch contests");
    } finally {
      set({ isLoading: false });
    }
  },

  // 3. Enter a specific contest group room
  joinContestGroup: async (contestId) => {
    set({ isLoading: true });
    try {
      // First, get the historical chat messages from REST API
      const res = await axiosinstance.get(`/contest/group/${contestId}`);
      set({ currentGroup: res.data });

      // Then, join the WebSockets room to receive real-time updates
      const { socket } = get();
      if (socket) {
        socket.emit("join_contest_group", contestId);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to join contest group");
    } finally {
      set({ isLoading: false });
    }
  },

  // 4. Send a message to the group
  sendMessage: async (contestId, content, solutionId = null) => {
    try {
      await axiosinstance.post(
        `/contest/group/${contestId}/message`,
        { content, solutionId }
      );
      // We don't update state here manually!
      // The backend will broadcast the "new_group_message" socket event,
      // which our listener above will catch and update the UI automatically.
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send message");
    }
  },
}));

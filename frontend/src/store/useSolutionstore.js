import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosinstance, BASE_URL } from '../lib/axios.js'
import { useAuthstore } from './useAuthstore.js'


export const useSolution =create((set,get)=>({
solutions: [],
bookmarks: [],
users: [],
mysols: [],
airesp: "",
selpost: null,
airesources: [],
aiHistory: [],
loading: false,
aiConversations: [],
currentConversationId: null,

    createsol: async(data)=>{
        try{
            const { solutions } = get()
        const newsol= await axiosinstance.post("/sol/createsol",data)
        set({solutions:[...solutions,newsol.data]})
        toast.success("blog posted successfully")
        }
        catch(error){
            console.log("error in posting solution",error)
            toast.error("error in creating blog")
        }
    },

    updatesol: async(data)=>{
        try{
        const updatesol=await axiosinstance.post("/sol/updatesol",data)
        toast.success("blog updated successfully")
        }
        catch(error){
            console.log("error in updating solution",error)
            toast.error("error in updating blog")
        }
    },

    deletesol: async(id)=>{
        try{
        const deletesol=await axiosinstance.delete(`/sol/deletesol/${id}`)
           set((state) => ({
      solutions: state.solutions.filter((post) => post._id !== id)
    }));
           set((state) => ({
      mysols: state.mysols.filter((post) => post._id !== id)
    }));
           set((state) => ({
      bookmarks: state.bookmarks.filter((post) => post._id !== id)
    }));
        toast.success("blog deleted successfully")
        }
        catch(error){
            console.log("error in deleting solution",error)
            toast.error("error in deleting blog")
        }
    },

    getsol: async() =>{
        try{
            const res = await axiosinstance.get(`/sol/get`)
            // console.log(res.data.sols)
            set({ solutions: [...res.data.sols] })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    getmysol: async() =>{
        try{
            const res = await axiosinstance.get(`/sol/getsolbyid`)
            console.log(res.data)
            set({ mysols: res.data.sols })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    getusers: async() =>{
        try{
            const res = await axiosinstance.get(`/auth/get`)
            // console.log(res.data.sols)
            set({ users: [...res.data.users] })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },
    
    inclikes:async(id)=>{
         try{
            const res = await axiosinstance.get(`/sol/like/${id}`)
                const updatedLikedBy = res.data; 

    set((state) => ({
      solutions: state.solutions.map((post) =>
        post._id === id ? { ...post, likes: updatedLikedBy } : post
      )}))

        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    bookmark: async(id)=>{
        try {
             console.log(id)
             const res = await axiosinstance.post(`/sol/bookmark/${id}`)
                        
            const updatedbookmarks=res.data

            const userss= await axiosinstance.get('/auth/users')
  
             set({users:userss.data})
             
set((state) => ({
    users: state.users.map((user) =>
        user._id === id
            ? { ...user, bookmarks: updatedbookmarks }
            : user
    )
}))
        }
        catch(error){
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to bookmark");
        }
    },

     getbookmark: async() =>{
        try{
            const res = await axiosinstance.get(`/sol/getbook`)
            // console.log(res.data)
            set({ bookmarks:res.data.bookmarks })
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    handlecomment:async(id,text)=>{
        try {
            // console.log(text)
              const res=await axiosinstance.post(`/sol/comment/${id}`,{text})
            //   console.log(res.data)
              set({selpost:res.data})
              toast.success("comment added")
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add comment");
        }
    },

        selectedpost: async (post) => {
        set({selpost:post})
    },


aires: async (data) => {
    try {
        let {
            aiHistory,
            aiConversations,
            currentConversationId,
        } = get();

        // --------------------------------
        // CREATE CONVERSATION IF NEEDED
        // --------------------------------

        if (!currentConversationId) {
            const response = await axiosinstance.post(
                "/ai/conversations"
            );

            const newConversation =
                response.data.conversation;

            currentConversationId =
                newConversation._id;

            aiConversations = [
                ...aiConversations,
                newConversation,
            ];

            aiHistory = [];

            set({
                aiConversations,
                currentConversationId,
                aiHistory,
            });
        }

        // --------------------------------
        // START AI REQUEST
        // --------------------------------

        set({
            airesp: "",
            airesources: [],
            loading: true,
        });

        const response = await fetch(
            `${BASE_URL}/ai/ask`,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    question: data,
                    history: aiHistory,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Request failed: ${response.status}`
            );
        }

        const reader =
            response.body.getReader();

        const decoder = new TextDecoder();

        let buffer = "";
        let answer = "";
        let sources = [];

        // --------------------------------
        // READ STREAM
        // --------------------------------

        while (true) {
            const { value, done } =
                await reader.read();

            if (done) break;

            buffer += decoder.decode(value, {
                stream: true,
            });

            const lines =
                buffer.split("\n");

            // Keep incomplete line
            buffer =
                lines.pop() || "";

            for (const line of lines) {
                if (!line.trim()) continue;

                try {
                    const message =
                        JSON.parse(line);

                    // AI response chunk
                    if (
                        message.type ===
                        "chunk"
                    ) {
                        answer +=
                            message.content;

                        set({
                            airesp: answer,
                        });
                    }

                    // Sources
                    if (
                        message.type ===
                        "sources"
                    ) {
                        sources =
                            message.sources ||
                            [];

                        set({
                            airesources:
                                sources,
                        });
                    }

                } catch (error) {
                    console.log(
                        "Could not parse stream:",
                        line
                    );
                }
            }
        }

        // --------------------------------
        // PROCESS REMAINING BUFFER
        // --------------------------------

        if (buffer.trim()) {
            try {
                const message =
                    JSON.parse(buffer);

                if (
                    message.type ===
                    "chunk"
                ) {
                    answer +=
                        message.content;

                    set({
                        airesp: answer,
                    });
                }

                if (
                    message.type ===
                    "sources"
                ) {
                    sources =
                        message.sources ||
                        [];

                    set({
                        airesources:
                            sources,
                    });
                }

            } catch (error) {
                console.log(
                    "Could not parse final stream:",
                    buffer
                );
            }
        }

        // --------------------------------
        // UPDATE HISTORY
        // --------------------------------

        const updatedHistory = [
            ...aiHistory,

            {
                role: "user",
                content: data,
            },

            {
                role: "assistant",
                content: answer,
            },
        ];

        // --------------------------------
        // SAVE TO MONGODB
        // --------------------------------

        const saveResponse =
            await axiosinstance.put(
                `/ai/conversations/${currentConversationId}`,
                {
                    messages:
                        updatedHistory,

                    title:
                        aiHistory.length === 0
                            ? data.slice(0, 40)
                            : undefined,
                }
            );

        const savedConversation =
            saveResponse.data.conversation;

        // --------------------------------
        // UPDATE ZUSTAND
        // --------------------------------

        const updatedConversations =
            aiConversations.map(
                (conversation) => {

                    if (
                        conversation._id !==
                        currentConversationId
                    ) {
                        return conversation;
                    }

                    return savedConversation;
                }
            );

        set({
            aiHistory:
                updatedHistory,

            aiConversations:
                updatedConversations,

            loading: false,
        });

    } catch (error) {
        console.log(
            "error in ai",
            error
        );

        set({
            loading: false,

            airesp:
                "Something went wrong while generating the AI response.",
        });
    }
    },

createAIConversation: async () => {
    try {
        const response = await axiosinstance.post(
            "/ai/conversations"
        );

        const conversation =
            response.data.conversation;

        set({
            aiConversations: [
                ...get().aiConversations,
                conversation,
            ],

            currentConversationId:
                conversation._id,

            aiHistory: [],

            airesp: "",

            airesources: [],
        });

        return conversation;

    } catch (error) {
        console.error(
            "Error creating AI conversation:",
            error
        );
    }
},
    

 switchAIConversation: async (id) => {
    try {
        const response = await axiosinstance.get(
            `/ai/conversations/${id}`
        );

        const conversation =
            response.data.conversation;

        set({
            currentConversationId:
                conversation._id,

            aiHistory:
                conversation.messages || [],

            airesp: "",

            airesources: [],
        });

    } catch (error) {
        console.error(
            "Error loading AI conversation:",
            error
        );
    }
},
    // GET ALL AI CONVERSATIONS
getAIConversations: async () => {
    try {
        const response = await axiosinstance.get(
            "/ai/conversations"
        );

        const conversations =
            response.data.conversations || [];

        const currentId =
            get().currentConversationId;

        // Keep currently selected conversation
        if (currentId) {
            const exists = conversations.some(
                (conversation) =>
                    conversation._id === currentId
            );

            if (exists) {
                set({
                    aiConversations:
                        conversations,
                });

                return;
            }
        }

        // Automatically open latest conversation
        if (conversations.length > 0) {
            const latest = conversations[0];

            const conversationResponse =
                await axiosinstance.get(
                    `/ai/conversations/${latest._id}`
                );

            const conversation =
                conversationResponse.data.conversation;

            set({
                aiConversations:
                    conversations,

                currentConversationId:
                    conversation._id,

                aiHistory:
                    conversation.messages || [],

                airesp: "",
                airesources: [],
            });

            return;
        }

        // No conversations
        set({
            aiConversations: [],
            currentConversationId: null,
            aiHistory: [],
            airesp: "",
            airesources: [],
        });

    } catch (error) {
        console.error(
            "Error fetching AI conversations:",
            error
        );
    }
    }
}))
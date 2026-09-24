import AIConversation from "../models/aiconversation.model.js";


// ==========================================
// CREATE NEW CONVERSATION
// ==========================================

export const createConversation = async (req, res) => {
    try {
        const userid = req.user._id;

        const conversation = await AIConversation.create({
            userId: userid,
            title: "New Conversation",
            messages: [],
        });

        return res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        console.error(
            "Error creating AI conversation:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create conversation",
        });
    }
};


// ==========================================
// GET ALL USER CONVERSATIONS
// ==========================================

export const getConversations = async (req, res) => {
    try {
        const userid = req.user._id;

        const conversations = await AIConversation.find({
            userId: userid,
        })
            .sort({ updatedAt: -1 })
            .select("-messages");

        return res.status(200).json({
            success: true,
            conversations,
        });
    } catch (error) {
        console.error(
            "Error getting AI conversations:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get conversations",
        });
    }
};


// ==========================================
// GET ONE CONVERSATION
// ==========================================

export const getConversation = async (req, res) => {
    try {
        const userid = req.user._id;
        const { id } = req.params;

        const conversation =
            await AIConversation.findOne({
                _id: id,
                userId: userid,
            });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        console.error(
            "Error getting AI conversation:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get conversation",
        });
    }
};


// ==========================================
// DELETE CONVERSATION
// ==========================================

export const deleteConversation = async (req, res) => {
    try {
        const userid = req.user._id;
        const { id } = req.params;

        const conversation =
            await AIConversation.findOneAndDelete({
                _id: id,
                userId: userid,
            });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Conversation deleted",
        });
    } catch (error) {
        console.error(
            "Error deleting AI conversation:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete conversation",
        });
    }
};

// UPDATE CONVERSATION
export const updateConversation = async (req, res) => {
    try {
        const userid = req.user._id;
        const { id } = req.params;
        const { messages, title } = req.body;

        const updateData = {
            messages,
        };

        // Only update title when a new title is provided
        if (title) {
            updateData.title = title;
        }

        const conversation =
            await AIConversation.findOneAndUpdate(
                {
                    _id: id,
                    userId: userid,
                },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            conversation,
        });

    } catch (error) {
        console.error(
            "Error updating AI conversation:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update conversation",
        });
    }
};
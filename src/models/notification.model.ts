import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["email", "sms", "push"],
            required: true
        },

        message: {
            type: String,
            required: true
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        
        status: {
            type: String,
            enum: ["pending", "processing", "sent", "failed"],
            default: "pending"
        }
    },
    { 
        timestamps: true 
    }
);

export const Notification = mongoose.model(
    "Notification", 
    notificationSchema
);
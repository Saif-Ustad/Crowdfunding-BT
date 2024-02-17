import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        donatedProjects: {
            type: [String]
        },
        createdProjects: {
            type: [String]
        }
    },
    { timestamps: true }
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
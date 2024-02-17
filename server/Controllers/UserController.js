import UserModel from "../Models/userModel.js";


export const getAllDonatedProjects = async (req, res) => {
    const email = req.params.userId; 
    try {

        // Find the user by email and select only the donatedProjects field
        const user = await UserModel.findOne({ email: email }, 'donatedProjects');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const donatedProjects = user.donatedProjects || [];

        res.status(200).json(donatedProjects);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getAllCreatedProjects = async (req, res) => {
    const email = req.params.userId; 
    try {
        
        // Find the user by email and select only the donatedProjects field
        const user = await UserModel.findOne({ email: email }, 'createdProjects');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const createdProjects = user.createdProjects || [];

        res.status(200).json(createdProjects);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export const addDonatedProject = async (req, res) => {
    const email = req.params.userId;
    const newDonatedProject = req.body.newDonatedProject; // Assuming the new project is provided in the request body

    console.log(newDonatedProject)

    try {

        // Update the user's donatedProjects array
        await UserModel.updateOne(
            { email: email },
            { $push: { donatedProjects: newDonatedProject } }
        );

        // Optionally, you can retrieve the updated user with the new donatedProjects
        const updatedUser = await UserModel.findOne({ email: email }, 'donatedProjects');

        res.status(200).json(updatedUser.donatedProjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const addCreatedProject = async (req, res) => {
    const email = req.params.userId;
    const newCreatedProject = req.body.newCreatedProject; // Assuming the new project is provided in the request body

    try {

        // Update the user's donatedProjects array
        await UserModel.updateOne(
            { email: email },
            { $push: { createdProjects: newCreatedProject } }
        );

        // Optionally, you can retrieve the updated user with the new donatedProjects
        const updatedUser = await UserModel.findOne({ email: email }, 'createdProjects');

        res.status(200).json(updatedUser.createdProjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async(req, res) => {
    const {email, password, firstname, lastname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new UserModel({email, password:hashedPass, firstname, lastname});

    try{
        const oldUser = await UserModel.findOne({email});
        if(oldUser)
        {
            res.status(400).json({message: "email is already exist"});
        }
        else{
            const user = await newUser.save();
            let { password, ...userWithoutPassword } = user._doc;
            res.status(200).json(userWithoutPassword);
        }
        

    }catch(error) {
        res.status(500).json({message:error.message})
    }
}

export const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await UserModel.findOne({email:email});
        
        if(user){
            const validity = await bcrypt.compare(password, user.password);

            if(!validity)
            {
                res.status(400).json("wrong password");
            }else{
                let { password, ...userWithoutPassword } = user._doc;
                res.status(200).json(userWithoutPassword);
            }

        }else {
            res.status(404).json("user not find");
        }

    }catch(error) {
        res.status(500).json({message:error.message})
    }
}



import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';



export const registerController = async (req,res) => {
    try{
        const {name,email,password,phone,address}=req.body
        if(!name){
            res.send({error:`name is required`})
        }
        if(!email){
            res.send({error:`email is required`})
        }
        if(!password){
            res.send({error:`password is required`})
        }
        if(!phone){
            res.send({error:`phone is required`})
        }
        if(!address){
            res.send({error:`address is required`})
        }
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:`user already exists`,
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

        res.status(200).send({
            success:true,
            message:`user registered successfully`,
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:`error in Registration`,
            error
        })
    }
};

//POST LOGIN
export const loginController = async (req,res) =>{
    try{
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:`invalid email or password`,

            })

        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:`email is not registered`
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:`invalid password`
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        res.status(200).send({
            success:true,
            message:`login Successfully`,
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Error in login`,
            error
        })
    }
};

//test controller
export const testController = (req,res) =>{
    res.send("protected route request made")
}
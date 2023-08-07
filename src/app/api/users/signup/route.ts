import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

connect();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json ({error: "User already exist"},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        const newUser = new User ({
            username,
            email,
            password:hasedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}
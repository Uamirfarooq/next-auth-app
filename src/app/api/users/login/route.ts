import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        const auser = await User.findOne({ email });
        if (!auser) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }
        const validatePassword = await bcrypt.compare(password, auser.password);
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }
        //create tokenData
        const tokenData = {
            id: auser._id,
            username: auser.username,
            email: auser.email,
        };
        console.log(tokenData);
        
        //create token
        const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!,{expiresIn:"1d"})

        const responce = NextResponse.json({
            message:"login successful",
            success: true
        })
        responce.cookies.set("token",token,{
            httpOnly:true
        })

        return responce;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
 connect();

 export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verfiyToken: token, verfiyTokenExpiry: {$gt: Date.now()}});
        

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        user.isVerifyed = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        console.log(user);
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
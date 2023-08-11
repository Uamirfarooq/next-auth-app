import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
 connect();

 export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token, password } = reqBody
        console.log(token + 'password nichy aana chiya');
        console.log(password);
        
        const user = await User.findOne({verfiyToken: token, verfiyTokenExpiry: {$gt: Date.now()}});
        

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        await user.save();
        console.log(user);
        
        return NextResponse.json({
            message: "update your password",
            success: true,
            user
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
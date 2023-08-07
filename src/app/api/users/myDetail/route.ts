import { GetUserDetails } from "@/helpers/GetUserDetails";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest){
    try {
        

        const userId = await GetUserDetails(request)
        const user =  await User.findOne({_id:userId}).select('-password')
        // console.log("user detail"+ user);
        
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }
}
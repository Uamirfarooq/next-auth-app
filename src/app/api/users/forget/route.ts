import { connect } from "@/dbconfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
    try {
    const reqBody = await request.json();
    const {email} = reqBody
    console.log(email);
    
    const user = await User.findOne({email})
    console.log("this is user to forsrt passs" + user);
    
    if(!user){
        return NextResponse.json({ error: "DATABASE Error" }, { status: 400 });
    }
    
    if(user.isVerifyed === true){
       console.log(user+"data for logout"); 
       await sendEmail({email, emailType: "RESET", userId: user._id})
       console.log('email has sended for reset pass');
    }
    else if(user.isVerifyed === false){
       
        console.log(user+"data for logout"); 

        await sendEmail({email, emailType: "VERIFY", userId: user._id})
        console.log('email has sended verify your self');
    }
    return NextResponse.json({ message: "Succes is in your nasib" }, { status: 200 });
 
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
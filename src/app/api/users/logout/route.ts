import { NextResponse } from "next/server";

export async function GET(){
    try{
        const responce = NextResponse.json(
            {message:"Lougout Successfully",
            success:true}
        )
        responce.cookies.set("token","",
        {
            httpOnly:true,expires:new Date(0)
        }
        );
        return responce
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
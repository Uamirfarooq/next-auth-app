import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const GetUserDetails = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decdedToken: any = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!)
        return decdedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
        
    }
}
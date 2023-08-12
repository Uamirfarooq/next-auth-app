import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, user } = reqBody;

        console.log(token + "password nichy aana chiya");
        console.log(user.password);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(user.password, salt);
        console.log(hashedPassword + "hashed password");

        const user1 = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });
        console.log(user1);

        try {
            if (user1) {
                // Update the user's password
                const taskdone = await User.findByIdAndUpdate(
                     user1._id , // Use the appropriate identifier for your user
                    { $set: { password: hashedPassword, forgotPasswordToken: null } } // Update the password and clear the token
                );
                if (taskdone) {
                    console.log("Password updated successfully.");
                } else {
                    console.log("User not found.");
                }
            } else if (!user1) {
                return NextResponse.json({ error: "database error" }, { status: 400 });
            }
        } catch (error) {
            return NextResponse.json(
                { error: "password changing error" },
                { status: 400 }
            );
        }
        return NextResponse.json({
            message: "update your password",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

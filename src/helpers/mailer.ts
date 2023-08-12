import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verfiyToken: hashedToken,
                    verfiyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.mail_user,
              pass: process.env.mail_pass
            }
          });
        const mailOptions = {
            from: 'mrumair775@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN} ${emailType === "VERIFY" ? "/verifyemail" : "/forgetpass"}?token=${hashedToken}"> here <a/> to ${emailType === "VERIFY" ? "verify your email" : "reset your Password"}
                OR copy and paste link in new tab <br> ${process.env.DOMAIN}${emailType === "VERIFY" ? "/verifyemail" : "/forgetpass"}?token=${hashedToken}
                </p>`
        }
        const mailresponce = await transport.sendMail(mailOptions);
        return mailresponce;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
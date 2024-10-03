import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect()



export async function POST(requst:NextRequest) {
    try {
        const reqBody = await requst.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // email verification
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User registred successfully",
            success: true,
            savedUser
        })



    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
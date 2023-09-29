import connectDB from "@/app/lib/db"
import Contact from "@/app/models/contact"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    // console.log(request.body)
    const {fullname, email, message} = await request.json()
    console.log(fullname, email, message)
    try {
        await connectDB()
        await Contact.create({fullname, email, message})
        return NextResponse.json({msg: ["Message sent successfully"], success: true})
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let ErrorList = []
            for (let e in error.errors) {
                ErrorList.push(error.errors[e].message)
            }
            // console.log(ErrorList)
            return NextResponse.json({msg: ErrorList})
        } else {
            return NextResponse.json({msg: error.message})
        }
    }
}
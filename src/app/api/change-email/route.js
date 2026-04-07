import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {

try {

await connectDB();

const { newEmail } = await req.json();

const token = req.headers.get("authorization")?.split(" ")[1];

if (!token) {
return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

const decoded = jwt.verify(token, process.env.JWT_SECRET);

const user = await User.findById(decoded.id);

user.email = newEmail;

await user.save();

return NextResponse.json({ message: "Email updated successfully" });

} catch (error) {
return NextResponse.json({ message: "Server error" }, { status: 500 });
}

}
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();
    await Contact.create({ name, email, subject, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
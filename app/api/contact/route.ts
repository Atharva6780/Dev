import { NextResponse } from "next/server";
import { Resend } from "resend";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // use this until you verify a domain
      to: "atharvas@gmail.com",                          // your email
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
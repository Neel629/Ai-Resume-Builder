import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, pdfBase64, filename } = await req.json();

    if (!email || !pdfBase64) {
      return NextResponse.json(
        { error: "Email and pdfBase64 are required" },
        { status: 400 }
      );
    }

    // Convert the base64 string (data URI) to a Buffer
    // It typically looks like: "data:application/pdf;filename=generated.pdf;base64,JVBERi0xLjQK..."
    const base64Data = pdfBase64.split(",")[1];
    if (!base64Data) {
      return NextResponse.json(
        { error: "Invalid pdfBase64 format" },
        { status: 400 }
      );
    }

    const pdfBuffer = Buffer.from(base64Data, "base64");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Resume from Resume Force",
      text: "Hey, this is your resume, which you made using Resume Force! It's attached below as a PDF.",
      attachments: [
        {
          filename: filename ? `${filename}.pdf` : "resume.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

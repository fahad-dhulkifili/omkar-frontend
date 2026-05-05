import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "info@omkarmanpower.com";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, organisation, phone, email, service, message } = body;

    const { data, error } = await resend.emails.send({
      from: "Omkar Website <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `New Enquiry — ${service || "General"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>A new enquiry has been received from the Omkar website.</p>
        <hr />
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#0f1a3d;">Name</td><td style="padding:8px 12px;">${fullName}</td></tr>
          <tr style="background:#f7f7f5;"><td style="padding:8px 12px;font-weight:bold;color:#0f1a3d;">Organisation</td><td style="padding:8px 12px;">${organisation || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#0f1a3d;">Phone</td><td style="padding:8px 12px;">${phone}</td></tr>
          <tr style="background:#f7f7f5;"><td style="padding:8px 12px;font-weight:bold;color:#0f1a3d;">Email</td><td style="padding:8px 12px;">${email || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#0f1a3d;">Service</td><td style="padding:8px 12px;">${service || "—"}</td></tr>
        </table>
        <h3 style="margin-top:24px;color:#0f1a3d;">Message</h3>
        <p style="background:#f7f7f5;padding:16px;line-height:1.7;">${message || "No message provided."}</p>
        <hr />
        <p style="font-size:12px;color:#7a7a7a;">Sent from the Omkar Manpower website contact form.</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

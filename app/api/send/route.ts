import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not defined in environment variables');
            return NextResponse.json(
                { error: 'Email service is not configured. Please add RESEND_API_KEY to .env.local' },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['asahariar385@gmail.com'],
            subject: `New Contact Form Submission from ${name}`,
            replyTo: email,
            html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

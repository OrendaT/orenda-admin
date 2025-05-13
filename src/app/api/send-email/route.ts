import { NextRequest, NextResponse } from 'next/server';
import mailChimpTransactional from '@mailchimp/mailchimp_transactional';

// Initialize with server-side API key
const mailChimpClient = mailChimpTransactional(
  process.env.MAILCHIMP_API_KEY || '',
);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, url, first_name, type } = data;

    let message;
    if (type === 'new-form') {
      // New form email template
      message = {
        from_email: 'admin@orendapsych.com',
        from_name: 'Orenda Psychiatry',
        subject: 'Invite to fill out Orenda Intake Form',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Hello ${first_name || ''},</p>
            <p>Welcome to Orenda Psychiatry. To get started, please complete your intake form using the link below:</p>
            <p style="margin: 25px 0;">
              <a href="${url}" style="display: inline-block; background-color: #6442c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">
                Complete form
              </a>
            </p>
            <p>If you have any questions or need support, feel free to reply to this email.</p>
            <p>Warm regards,<br/>The Orenda Psychiatry Team</p>
          </div>
        `,
        to: [
          {
            email: email,
            type: 'to' as const,
          },
        ],
        track_opens: true,
        track_clicks: true,
        headers: {
          'Reply-To': 'support@orendapsych.com',
        },
      };
    } else if (type === 'reminder') {
      const messageContent = `
        <p>We noticed you started your intake form but haven't finished it yet. To continue your journey with Orenda Psychiatry and get matched with the right provider, please complete your form using the link below:</p>
        <p style="margin: 25px 0;">
          <a href="${url}" style="display: inline-block; background-color: #6442c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">
            Resume intake form here
          </a>
        </p>
        <p>Completing the form helps us prepare for your visit and provide you with the best care possible. If you need help, just reply to this email.</p>
      `;

      // Custom reminder message if provided
      // const messageContent = customMessage
      //   ? `
      //     <div>${customMessage.replace(/\n/g, '<br/>')}</div>
      //     <p style="margin: 25px 0;">
      //       <a href="${url}" style="display: inline-block; background-color: #6442c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">
      //         Resume intake form here
      //       </a>
      //     </p>
      //   `
      //   : defaultMessage;

      message = {
        from_email: 'admin@orendapsych.com',
        from_name: 'Orenda Psychiatry',
        subject: 'Reminder: Complete Your Orenda Intake Form',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Hello ${first_name || ''},</p>
            ${messageContent}
            <p>Thank you,<br/>The Orenda Psychiatry Team</p>
          </div>
        `,
        to: [
          {
            email: email,
            type: 'to' as const,
          },
        ],
        track_opens: true,
        track_clicks: true,
        headers: {
          'Reply-To': 'support@orendapsych.com',
        },
      };
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid email type' },
        { status: 400 },
      );
    }

    // Send email via Mailchimp
    const response = await mailChimpClient.messages.send({ message });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 },
    );
  }
}

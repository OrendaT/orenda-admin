import { NextRequest, NextResponse } from 'next/server';
import mailchimpTransactional from '@mailchimp/mailchimp_transactional';

// Initialize with server-side API key
const mailchimpClient = mailchimpTransactional(
  process.env.MAILCHIMP_API_KEY || '',
);

// HTML email template with logo and styling
const getBaseEmailTemplate = (
  content: string,
  includeNotInterestedLink = false,
) => {
  const logo =
    'https://mcusercontent.com/f49e77d8389e110b514988d07/images/bd4a6ffd-dce6-72c2-e379-2223ce4d0a6b.png';

  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${logo}" alt="Orenda Psychiatry" style="max-width: 180px;">
        </div>

        <h2 style="color: #000; margin-bottom: 20px;">Orenda Psychiatry</h2>
  
        <!-- Content -->
        <div style="color: #333; line-height: 1.5; font-size: 14px;">
          ${content}
        </div>
  
        ${
          includeNotInterestedLink
            ? `
          <!-- Not Interested Link -->
          <div style="text-align: center; margin-top: 20px;">
            <a href="#" style="color: #2e0086; text-decoration: underline; font-size: 14px;">Not interested in booking</a>
          </div>
        `
            : ''
        }
  
        <!-- Footer -->
        <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
          <p>80 Fifth Avenue, Office #903-10, New York, NY 10011.</p>
          <p>Call: (347) 707-7735 | Email: <a href="mailto:admin@orendapsych.com" style="color: #2e0086;">admin@orendapsych.com</a></p>
          <div style="margin-top: 20px;">
            <img src="${logo}" alt="Orenda Psychiatry" style="max-width: 120px;">
          </div>
        </div>
      </div>
    `;
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, url, first_name, type } = data;

    let subject = '';
    let html = '';

    if (type === 'new-form') {
      // New Form Email
      subject = 'Invite to fill out Orenda Intake Form';

      const content = `
        <p>Hello ${first_name || ''},</p>
        
        <p>Welcome to Orenda Psychiatry. To get started, please complete your intake form using the link below:</p>
        
        <div style="display: flex; justify-content: flex-start; margin: 30px 0;">
          <a href="${url}" style="background-color: #2e0086; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px;">
            Complete form
          </a>
        </div>
        
        <p>If you have any questions or need support, feel free to reply to this email.</p>
        
        <p>Warm regards,<br/>The Orenda Psychiatry Team</p>
      `;

      // Include the "Not interested" link for new form emails
      html = getBaseEmailTemplate(content);
    } else if (type === 'reminder') {
      // Reminder Email

      subject = 'Reminder: Complete Your Orenda Intake Form';

      const content = `
        <p>Hello ${first_name || ''},</p>
        
        <p>We noticed you started your intake form but haven't finished it yet. To continue your journey with Orenda Psychiatry and get matched with the right provider</p>

        <p>Please click on the link or respond to this message at your convenience.</p>
        
        <div style="display: flex; justify-content: flex-start; margin: 30px 0;">
          <a href="${url}" style="background-color: #2e0086; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px;">
            Schedule a Visit
          </a>
        </div>
        
        <p>Completing the form helps us prepare for your visit and provide you with the best care possible. If you need help, just reply to this email.</p>
        
        <p>Thank you,<br/>The Orenda Psychiatry Team</p>
      `;

      // Include the "Not interested" link for reminder emails
      html = getBaseEmailTemplate(content, true);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid email type' },
        { status: 400 },
      );
    }

    // Prepare message for Mailchimp
    const message = {
      from_email: 'admin@orendapsych.com',
      from_name: 'Orenda Psychiatry',
      subject,
      html,
      to: [
        {
          email: email,
          name: first_name || '',
          type: 'to' as const,
        },
      ],
      track_opens: true,
      track_clicks: true,
      headers: {
        'Reply-To': 'admin@orendapsych.com',
      },
    };

    // Send email via Mailchimp
    const response = await mailchimpClient.messages.send({ message });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

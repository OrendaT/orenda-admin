import mailchimpTransactional from '@mailchimp/mailchimp_transactional';

// Initialize with your API key 
const mailchimpClient = mailchimpTransactional(process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '');

// Send new intake form email
export async function sendNewFormEmail(
  email: string, 
  formUrl: string, 
  patientFirstName?: string
) {
  const message = {
    from_email: 'admin@orendapsych.com',
    from_name: 'Orenda Psychiatry',
    subject: 'Invite to fill out Orenda Intake Form',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>Hello ${patientFirstName ? patientFirstName : ''},</p>
        <p>Welcome to Orenda Psychiatry. To get started, please complete your intake form using the link below:</p>
        <p style="margin: 25px 0;">
          <a href="${formUrl}" style="display: inline-block; background-color: #6442c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">
            Complete form
          </a>
        </p>
        <p>If you have any questions or need support, feel free to reply to this email.</p>
        <p>Warm regards,<br/>The Orenda Psychiatry Team</p>
      </div>
    `,
    to: [{ 
      email: email,
      type: 'to' as const 
    }],
    track_opens: true,
    track_clicks: true,
    headers: {
      'Reply-To': 'support@orendapsych.com'
    }
  };

  try {
    const response = await mailchimpClient.messages.send({ message });
    return { success: true, response };
  } catch (error) {
    console.error('Error sending new form email:', error);
    return { success: false, error };
  }
}

// Send reminder email for incomplete form
export async function sendReminderEmail(
  email: string, 
  formUrl: string,
  patientFirstName?: string,
  customMessage?: string
) {
  // Default message matching your template
  const defaultMessage = `
    <p>Hello ${patientFirstName ? patientFirstName : ''},</p>
    <p>We noticed you started your intake form but haven't finished it yet. To continue your journey with Orenda Psychiatry and get matched with the right provider, please complete your form using the link below:</p>
    <p style="margin: 25px 0;">
      <a href="${formUrl}" style="display: inline-block; background-color: #6442c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">
        Resume intake form here
      </a>
    </p>
    <p>Completing the form helps us prepare for your visit and provide you with the best care possible. If you need help, just reply to this email.</p>
    <p>Thank you,<br/>The Orenda Psychiatry Team</p>
  `;

  // Use custom message if provided, otherwise use default
  const messageContent = customMessage 
    ? `
      <p>Hello ${patientFirstName ? patientFirstName : ''},</p>
      <div>${customMessage.replace(/\n/g, '<br/>')}</div>
      <p style="margin: 25px 0;">
        <a href="${formUrl}" style="display: inline-block; background-color: #6442c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">
          Resume intake form here
        </a>
      </p>
      <p>Thank you,<br/>The Orenda Psychiatry Team</p>
    `
    : defaultMessage;

  const message = {
    from_email: 'admin@orendapsych.com',
    from_name: 'Orenda Psychiatry',
    subject: 'Reminder: Complete Your Orenda Intake Form',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        ${messageContent}
      </div>
    `,
    to: [{ 
      email: email,
      type: 'to' as const 
    }],
    track_opens: true,
    track_clicks: true,
    headers: {
      'Reply-To': 'support@orendapsych.com'
    }
  };

  try {
    const response = await mailchimpClient.messages.send({ message });
    return { success: true, response };
  } catch (error) {
    console.error('Error sending reminder email:', error);
    return { success: false, error };
  }
}
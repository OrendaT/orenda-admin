// src/services/email-service.ts

// Interface for parameters
interface SendEmailParams {
    email?: string;
    url: string;
    first_name?: string;
    customMessage?: string;
    via?: ('email' | 'sms')[];
  }
  
  // Send new form email function
  export async function sendNewFormEmail({
    email,
    url,
    first_name,
    via = ['email'],
  }: SendEmailParams) {
    try {
      // Return early if no email provided
      if (!email) {
        return { success: false, error: 'Email is required' };
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          formUrl: url,
          firstName: first_name,
          emailType: 'new-form',
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending new form email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
  
  // Send reminder email function
  export async function sendReminderEmail({
    email,
    url,
    first_name,
    customMessage,
    via = ['email'],
  }: SendEmailParams) {
    try {
      // Return early if no email provided
      if (!email) {
        return { success: false, error: 'Email is required' };
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          formUrl: url,
          firstName: first_name,
          customMessage,
          emailType: 'reminder',
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending reminder email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
   
// src/services/email-service.ts

// Update the function to accept an object instead of individual parameters
export async function sendNewFormEmail({
    email,
    url,
    first_name
  }: {
    email: string;
    url: string;
    first_name?: string;
  }) {
    try {
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
  
  // Update this function as well for consistency
  export async function sendReminderEmail({
    email,
    url,
    first_name,
    customMessage
  }: {
    email: string;
    url: string;
    first_name?: string;
    customMessage?: string;
  }) {
    try {
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
import axios, { AxiosError } from 'axios';

// New form email function
export async function sendNewFormEmail(data: {
  email: string;
  url: string;
  first_name?: string;
}) {
  try {
    const response = await axios.post('/api/send-email', {
      ...data,
      type: 'new-form',
    });

    return response.data;
  } catch (error) {
    console.error('Error sending new form email:', error);
    return {
      success: false,
      error:
        error instanceof AxiosError
          ? error.response?.data?.message
          : 'Something went wrong',
    };
  }
}

// Reminder email function
export async function sendReminderEmail(data: {
  email: string;
  url: string;
  first_name?: string;
  via: ('email' | 'sms')[];
}) {
  try {
    const response = await axios.post('/api/send-email', {
      ...data,
      type: 'reminder',
    });

    return response.data;
  } catch (error) {
    console.error('Error sending reminder email:', error);
    return {
      success: false,
      error:
        error instanceof AxiosError
          ? error.response?.data?.message
          : 'Something went wrong',
    };
  }
}

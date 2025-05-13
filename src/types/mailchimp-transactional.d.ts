// src/types/mailchimp-transactional.d.ts
declare module '@mailchimp/mailchimp_transactional' {
    interface MailchimpMessage {
      html?: string;
      text?: string;
      subject: string;
      from_email: string;
      from_name?: string;
      to: {
        email: string;
        name?: string;
        type: 'to' | 'cc' | 'bcc';
      }[];
      headers?: Record<string, string>;
      important?: boolean;
      track_opens?: boolean;
      track_clicks?: boolean;
      auto_text?: boolean;
      auto_html?: boolean;
      inline_css?: boolean;
      url_strip_qs?: boolean;
      preserve_recipients?: boolean;
      view_content_link?: boolean;
      tracking_domain?: string;
      signing_domain?: string;
      return_path_domain?: string;
      merge?: boolean;
      merge_language?: 'mailchimp' | 'handlebars';
      global_merge_vars?: {
        name: string;
        content: string;
      }[];
      merge_vars?: {
        rcpt: string;
        vars: {
          name: string;
          content: string;
        }[];
      }[];
      tags?: string[];
      subaccount?: string;
      google_analytics_domains?: string[];
      google_analytics_campaign?: string;
      metadata?: Record<string, string>;
      recipient_metadata?: {
        rcpt: string;
        values: Record<string, string>;
      }[];
      attachments?: {
        type: string;
        name: string;
        content: string;
      }[];
      images?: {
        type: string;
        name: string;
        content: string;
      }[];
    }
  
    interface MailchimpResponse {
      _id: string;
      email: string;
      status: 'sent' | 'queued' | 'scheduled' | 'rejected' | 'invalid';
      reject_reason?: string;
      _version?: string;
    }
  
    interface MailchimpClient {
      messages: {
        send: (params: { message: MailchimpMessage }) => Promise<MailchimpResponse[]>;
        sendTemplate: (params: {
          template_name: string;
          template_content: { name: string; content: string }[];
          message: MailchimpMessage;
        }) => Promise<MailchimpResponse[]>;
      };
      users: {
        ping: () => Promise<string>;
        info: () => Promise<Record<string, unknown>>;
      };
      // Add other methods as needed
    }
  
    function createClient(apiKey: string): MailchimpClient;
    export default createClient;
  }
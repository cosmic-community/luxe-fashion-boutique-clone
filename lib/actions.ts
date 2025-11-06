'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface EmailResponse {
  success: boolean
  error?: string
}

export async function sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        success: false,
        error: 'All fields are required'
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Invalid email address'
      }
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return {
        success: false,
        error: 'Email service is not configured. Please contact support.'
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Luxe Fashion Boutique <tony@cosmicjs.com>',
      to: ['tony@cosmicjs.com'],
      replyTo: formData.email,
      subject: `Contact Form: ${formData.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${formData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${formData.subject}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #000;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="color: #666; font-size: 12px; margin: 10px 0;">
            This email was sent from the Luxe Fashion Boutique contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        error: 'Failed to send email. Please try again later.'
      }
    }

    return {
      success: true
    }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    }
  }
}
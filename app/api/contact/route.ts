import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Luxe Fashion Boutique <tony@cosmicjs.com>',
      to: ['tony@cosmicjs.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                          Luxe Fashion Boutique
                        </h1>
                        <p style="margin: 8px 0 0 0; color: #e0e0e0; font-size: 14px;">
                          New Contact Form Submission
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="margin: 0 0 20px 0; color: #1a1a2e; font-size: 20px; font-weight: 600;">
                          Contact Details
                        </h2>
                        
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                              <strong style="color: #1a1a2e; font-size: 14px;">Name:</strong>
                              <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">${name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                              <strong style="color: #1a1a2e; font-size: 14px;">Email:</strong>
                              <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">
                                <a href="mailto:${email}" style="color: #1a1a2e; text-decoration: none;">${email}</a>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                              <strong style="color: #1a1a2e; font-size: 14px;">Subject:</strong>
                              <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">${subject}</p>
                            </td>
                          </tr>
                        </table>
                        
                        <h3 style="margin: 0 0 12px 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">
                          Message
                        </h3>
                        <div style="background-color: #f9f9f9; border-left: 4px solid #1a1a2e; padding: 16px; border-radius: 4px;">
                          <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
                        <p style="margin: 0; color: #999; font-size: 12px;">
                          This email was sent from the Luxe Fashion Boutique contact form
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully',
        id: data?.id
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
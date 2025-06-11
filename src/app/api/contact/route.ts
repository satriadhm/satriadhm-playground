import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function rateLimit(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - userLimit.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP;
  return 'unknown';
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // Rate limiting
    if (!rateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Field length exceeds maximum allowed.' },
        { status: 400 }
      );
    }

    // Sanitize data
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email.toLowerCase()),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Check environment variables
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email environment variables missing');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact directly at glorioussatria@gmail.com' },
        { status: 503 }
      );
    }

    console.log('🔧 Creating Nodemailer transporter...');
    
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Additional options for better reliability
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5,
    });

    console.log('🔍 Verifying SMTP connection...');
    
    // Verify transporter
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    const currentTime = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Main email to you
    const mainEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Contact - ${sanitizedData.subject}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb;
            padding: 20px;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 { font-size: 24px; margin-bottom: 8px; }
          .badge { 
            background: rgba(255, 255, 255, 0.2); 
            padding: 6px 12px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: 600;
            display: inline-block;
          }
          .content { padding: 30px; }
          .field { 
            margin-bottom: 24px; 
            padding: 20px; 
            background: #f8fafc; 
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .field-label { 
            font-weight: 600; 
            color: #1e40af; 
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
          }
          .field-value { 
            color: #374151; 
            font-size: 16px;
            line-height: 1.5;
          }
          .message-field { 
            background: #f0fdf4; 
            border-left-color: #10b981; 
          }
          .message-field .field-value { 
            white-space: pre-wrap; 
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            background: white;
            padding: 16px;
            border-radius: 6px;
            border: 1px solid #d1fae5;
          }
          .footer { 
            background: #f8fafc; 
            padding: 20px 30px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
          }
          .footer strong { color: #374151; }
          .reply-info {
            background: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            text-align: center;
          }
          .reply-info strong { color: #1d4ed8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Portfolio Contact</h1>
            <div class="badge">Via Nodemailer</div>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="field-label">👤 From</span>
              <div class="field-value"><strong>${sanitizedData.name}</strong></div>
            </div>
            
            <div class="field">
              <span class="field-label">📧 Email</span>
              <div class="field-value">
                <a href="mailto:${sanitizedData.email}" style="color: #1d4ed8; text-decoration: none;">
                  ${sanitizedData.email}
                </a>
              </div>
            </div>
            
            <div class="field">
              <span class="field-label">📋 Subject</span>
              <div class="field-value"><strong>${sanitizedData.subject}</strong></div>
            </div>
            
            <div class="field message-field">
              <span class="field-label">💬 Message</span>
              <div class="field-value">${sanitizedData.message}</div>
            </div>
            
            <div class="field">
              <span class="field-label">🕒 Received</span>
              <div class="field-value">${currentTime} (Jakarta Time)</div>
            </div>
            
            <div class="field">
              <span class="field-label">🌐 Source</span>
              <div class="field-value">IP: ${clientIP} • Portfolio Contact Form</div>
            </div>
            
            <div class="reply-info">
              <strong>💡 Quick Reply:</strong> Simply reply to this email to respond directly to ${sanitizedData.name}
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from your <strong>portfolio contact form</strong></p>
            <p>Powered by <strong>Nodemailer</strong> • satriadhm.vercel.app</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Auto-reply email to sender
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Glorious Satria</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb;
            padding: 20px;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 { font-size: 24px; margin-bottom: 8px; }
          .header p { opacity: 0.9; margin: 0; }
          .content { padding: 30px; }
          .content p { margin-bottom: 16px; color: #374151; }
          .highlight { 
            background: #f0fdf4; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #10b981;
            margin: 20px 0;
          }
          .highlight strong { color: #065f46; }
          .social-links { 
            text-align: center; 
            margin: 24px 0; 
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
          }
          .social-links a { 
            color: #1d4ed8; 
            text-decoration: none; 
            margin: 0 12px;
            font-weight: 500;
          }
          .social-links a:hover { text-decoration: underline; }
          .footer { 
            background: #f8fafc; 
            padding: 20px 30px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
          }
          .cta-list { 
            background: #eff6ff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .cta-list ul { 
            list-style: none; 
            padding: 0; 
          }
          .cta-list li { 
            padding: 8px 0; 
            border-bottom: 1px solid #dbeafe;
          }
          .cta-list li:last-child { border-bottom: none; }
          .cta-list a { color: #1d4ed8; text-decoration: none; font-weight: 500; }
          .signature {
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for reaching out through my portfolio</p>
          </div>
          
          <div class="content">
            <p>Hi <strong>${sanitizedData.name}</strong>,</p>
            
            <p>Thank you for contacting me through my portfolio website! I've successfully received your message and wanted to confirm that it reached me.</p>
            
            <div class="highlight">
              <strong>📋 Your Message Summary:</strong><br>
              <strong>Subject:</strong> ${sanitizedData.subject}<br>
              <strong>Sent:</strong> ${currentTime} (Jakarta Time)<br>
              <strong>Status:</strong> ✅ Delivered via Nodemailer
            </div>
            
            <p><strong>⏰ Response Time:</strong> I typically respond to messages within <strong>24 hours</strong> during business days. I'll get back to you as soon as possible to discuss your inquiry in detail.</p>
            
            <div class="cta-list">
              <p><strong>🚀 While you wait, feel free to:</strong></p>
              <ul>
                <li>🔍 <a href="https://github.com/satriadhm">Explore my latest projects on GitHub</a></li>
                <li>🔗 <a href="https://linkedin.com/in/gloriousatria">Connect with me on LinkedIn</a></li>
                <li>🌐 <a href="https://satriadhm.vercel.app">Browse my complete portfolio</a></li>
                <li>📖 <a href="https://satriadhm.vercel.app/blog">Read my technical blog posts</a></li>
              </ul>
            </div>
            
            <p><strong>🚨 Urgent?</strong> If your message requires immediate attention, you can reach me directly at <a href="mailto:glorioussatria@gmail.com" style="color: #1d4ed8; text-decoration: none; font-weight: 600;">glorioussatria@gmail.com</a></p>
            
            <div class="signature">
              <p>Best regards,<br>
              <strong>Glorious Satria</strong><br>
              <span style="color: #6b7280;">Software Engineer & Full-Stack Developer</span></p>
              
              <div class="social-links">
                <a href="https://github.com/satriadhm">GitHub</a> |
                <a href="https://linkedin.com/in/gloriousatria">LinkedIn</a> |
                <a href="mailto:glorioussatria@gmail.com">Email</a> |
                <a href="https://satriadhm.vercel.app">Portfolio</a>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation sent via <strong>Nodemailer</strong></p>
            <p>You're receiving this because you contacted me through my portfolio form</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('📤 Sending emails via Nodemailer...');

    // Send main email to you
    const mainEmailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'glorioussatria@gmail.com',
      subject: `🚀 New Portfolio Contact: ${sanitizedData.subject}`,
      html: mainEmailHtml,
      replyTo: sanitizedData.email,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    // Send auto-reply to sender
    const autoReplyOptions = {
      from: `"Glorious Satria" <${process.env.EMAIL_USER}>`,
      to: sanitizedData.email,
      subject: `✅ Thank you for contacting me - ${sanitizedData.subject}`,
      html: autoReplyHtml,
      headers: {
        'X-Auto-Response-Suppress': 'OOF, DR, RN, NRN, AutoReply'
      }
    };

    // Send both emails concurrently
    const [mainResult, autoReplyResult] = await Promise.all([
      transporter.sendMail(mainEmailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    console.log('✅ Main email sent:', mainResult.messageId);
    console.log('✅ Auto-reply sent:', autoReplyResult.messageId);
    console.log(`📊 Contact from: ${sanitizedData.name} (${sanitizedData.email})`);

    // Close the transporter
    transporter.close();

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully via Nodemailer! You should receive a confirmation email shortly.',
      messageId: mainResult.messageId,
      timestamp: currentTime
    });

  } catch (error: unknown) {
    console.error('❌ Nodemailer error:', error);
    
    let errorMessage = 'An unexpected error occurred with the email service.';
    let statusCode = 500;
    let errorDetails: string | undefined = undefined;

    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('auth')) {
        errorMessage = 'Email authentication failed. Please check email configuration.';
        statusCode = 503;
      } else if (error.message.includes('connect') || error.message.includes('timeout')) {
        errorMessage = 'Could not connect to email server. Please try again later.';
        statusCode = 503;
      } else if (error.message.includes('DNS') || error.message.includes('ENOTFOUND')) {
        errorMessage = 'Email server not found. Please check configuration.';
        statusCode = 503;
      }
      if (process.env.NODE_ENV === 'development') {
        errorDetails = error.message;
      }
    } else if (process.env.NODE_ENV === 'development') {
      errorDetails = String(error);
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: statusCode }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed', 
      message: 'Use POST to submit contact form',
      service: 'Nodemailer Email API'
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}
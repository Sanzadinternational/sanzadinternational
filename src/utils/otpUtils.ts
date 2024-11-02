// otpUtils.ts
import nodemailer from 'nodemailer';

// Function to generate OTP
export function generateOTP(length: number = 6): string {
  return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
}

// Function to send email with OTP
export async function sendOTPEmail(recipientEmail: string, otp: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your preferred email service
    auth: {
      user: 'jugalkishor556455@gmail.com',
      pass: 'vhar uhhv gjfy dpes',
    },
  });

  const mailOptions = {
    from: 'jugalkishor556455@gmail.com',
    to: recipientEmail,
    subject: 'Your OTP for Registration',
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

export const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="background-color: #f3f4f6; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 1rem auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <!-- Header Section -->
        <div style="background-color: #1d4ed8; color: #ffffff; text-align: center; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <h1 style="font-size: 24px; font-weight: bold;">Career Jobs - Email Verification</h1>
        </div>
        <!-- Body Section -->
        <div style="padding: 20px; color: #333333;">
            <h2 style="font-size: 20px; color: #1f2937;">Hello {name},</h2>
            <p style="font-size: 16px; line-height: 1.5;">Thank you for signing up with Career Jobs! Please click the button below to verify your email address and complete your registration process.</p>
            <!-- Verification Button -->
            <a href="{link}" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; font-size: 16px; padding: 12px 30px; border-radius: 5px; text-align: center; margin-top: 20px; text-decoration: none; font-weight: bold; transition: background-color 0.3s;">Verify Your Email</a>
            <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">If you did not create an account, no further action is required.</p>
        </div>
        <!-- Footer Section -->
        <div style="background-color: #f3f4f6; text-align: center; padding: 15px; color: #6b7280; font-size: 14px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            <p>&copy; 2025 Career Jobs. All rights reserved.</p>
            <p><a href="#" style="color: #1d4ed8; text-decoration: none; font-weight: bold;">Unsubscribe</a> | <a href="#" style="color: #1d4ed8; text-decoration: none; font-weight: bold;">Contact Support</a></p>
        </div>
    </div>
</body>
</html>`;

export const otpTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
</head>
<body style="background-color: #f3f4f6; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 1rem auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <!-- Header Section -->
        <div style="background-color: #1d4ed8; color: #ffffff; text-align: center; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <h1 style="font-size: 24px; font-weight: bold;">Career Jobs - One-Time Password</h1>
        </div>

        <!-- Body Section -->
        <div style="padding: 20px; color: #333333;">
            <h2 style="font-size: 20px; color: #1f2937;">Hello</h2>
            <p style="font-size: 16px; line-height: 1.5;">You requested a one-time password (OTP) for your Career Jobs account. Please use the code below to complete your action:</p>
            
            <!-- OTP Code Box -->
            <div style="background-color: #f3f4f6; border-radius: 5px; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1d4ed8; margin: 0;">{otp}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email or contact our support team if you have concerns.</p>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">For security reasons, never share this code with anyone.</p>
        </div>

        <!-- Footer Section -->
        <div style="background-color: #f3f4f6; text-align: center; padding: 15px; color: #6b7280; font-size: 14px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            <p>&copy; 2025 Career Jobs. All rights reserved.</p>
            <p><a href="#" style="color: #1d4ed8; text-decoration: none; font-weight: bold;">Unsubscribe</a> | <a href="#" style="color: #1d4ed8; text-decoration: none; font-weight: bold;">Contact Support</a></p>
        </div>
    </div>
</body>
</html>`;

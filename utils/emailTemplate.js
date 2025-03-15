export const getPasswordResetTemplate = (baseUrl, token) => {
   return `
    <h1>Password Reset Request</h1>
    <p>You have requested to reset your password. Please click the link below to reset it:</p>
    <a href="${baseUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;
};

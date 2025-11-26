// Email Service for Registration Approval
export class EmailService {
  static async sendRegistrationApproval(userEmail, companyData, approvalToken) {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock email content
    const emailContent = {
      to: userEmail,
      subject: 'SmartFund AI - Registration Approval Required',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1>SmartFund AI</h1>
            <h2>SMME Registration Approval</h2>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <h3>CIPC Verification Successful!</h3>
            <p>Dear Business Owner,</p>
            
            <p>Your CIPC registration has been successfully verified. Here are the details:</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Company Information:</h4>
              <ul>
                <li><strong>Company Name:</strong> ${companyData.companyName}</li>
                <li><strong>Registration Number:</strong> ${companyData.registrationNumber}</li>
                <li><strong>Business Type:</strong> ${companyData.businessType}</li>
                <li><strong>Status:</strong> ${companyData.status}</li>
                <li><strong>Registration Date:</strong> ${companyData.registrationDate}</li>
              </ul>
            </div>
            
            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Next Steps:</h4>
              <p>Click the button below to complete your registration and access the SmartFund AI platform:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:3002/complete-registration?token=${approvalToken}" 
                   style="background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Complete Registration
                </a>
              </div>
              
              <p><strong>Approval Token:</strong> ${approvalToken}</p>
              <p><em>This link will expire in 24 hours for security purposes.</em></p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4>Important Security Notice:</h4>
              <ul>
                <li>Only use this link if you initiated the registration</li>
                <li>Do not share this approval token with anyone</li>
                <li>Contact support if you did not request this registration</li>
              </ul>
            </div>
            
            <p>Welcome to SmartFund AI - Your AI-powered SMME funding companion!</p>
            
            <hr style="margin: 30px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              This is an automated message from SmartFund AI. Please do not reply to this email.
              <br>For support, contact: support@smartfundai.co.za
            </p>
          </div>
        </div>
      `,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    // Store email in localStorage for demo purposes
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    sentEmails.push(emailContent);
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));

    // Store approval token
    const approvalTokens = JSON.parse(localStorage.getItem('approvalTokens') || '{}');
    approvalTokens[approvalToken] = {
      email: userEmail,
      companyData,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      used: false
    };
    localStorage.setItem('approvalTokens', JSON.stringify(approvalTokens));

    return {
      success: true,
      message: 'Registration approval email sent successfully',
      emailId: `EMAIL-${Date.now()}`,
      approvalToken
    };
  }

  static async sendRegistrationRejection(userEmail, reason, companyData) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const emailContent = {
      to: userEmail,
      subject: 'SmartFund AI - Registration Application Status',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1>SmartFund AI</h1>
            <h2>Registration Application Update</h2>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <h3>Registration Application Status</h3>
            <p>Dear Applicant,</p>
            
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h4>Registration Not Approved</h4>
              <p><strong>Reason:</strong> ${reason}</p>
              
              ${companyData ? `
                <p><strong>Registration Number Checked:</strong> ${companyData.registrationNumber || 'N/A'}</p>
              ` : ''}
            </div>
            
            <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>What You Can Do:</h4>
              <ul>
                <li>Verify your CIPC registration number is correct</li>
                <li>Ensure your company is active and in good standing</li>
                <li>Check that your business meets SMME criteria</li>
                <li>Contact CIPC if there are issues with your registration</li>
                <li>Try registering again once issues are resolved</li>
              </ul>
            </div>
            
            <p>If you believe this is an error, please contact our support team with your registration details.</p>
            
            <hr style="margin: 30px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              This is an automated message from SmartFund AI.
              <br>For support, contact: support@smartfundai.co.za
            </p>
          </div>
        </div>
      `,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    sentEmails.push(emailContent);
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));

    return {
      success: true,
      message: 'Registration rejection email sent',
      emailId: `EMAIL-${Date.now()}`
    };
  }

  static validateApprovalToken(token) {
    const approvalTokens = JSON.parse(localStorage.getItem('approvalTokens') || '{}');
    const tokenData = approvalTokens[token];

    if (!tokenData) {
      return { valid: false, error: 'Invalid approval token' };
    }

    if (tokenData.used) {
      return { valid: false, error: 'Approval token has already been used' };
    }

    if (new Date() > new Date(tokenData.expiresAt)) {
      return { valid: false, error: 'Approval token has expired' };
    }

    return { valid: true, data: tokenData };
  }

  static markTokenAsUsed(token) {
    const approvalTokens = JSON.parse(localStorage.getItem('approvalTokens') || '{}');
    if (approvalTokens[token]) {
      approvalTokens[token].used = true;
      approvalTokens[token].usedAt = new Date().toISOString();
      localStorage.setItem('approvalTokens', JSON.stringify(approvalTokens));
    }
  }
}
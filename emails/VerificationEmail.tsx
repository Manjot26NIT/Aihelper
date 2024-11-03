import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  otp: string;
}

 const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,otp
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>
      Your OTP is <strong>{otp}</strong>.
    </p>
  </div>
);

export default EmailTemplate;
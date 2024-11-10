import { Resend } from 'resend';
import { Email } from './email';

const resend = new Resend('re_123456789');

await resend.emails.send({
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    react: <Email url="https://example.com" />,
});
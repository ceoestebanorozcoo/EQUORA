import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationCode(
  to: string,
  code: string,
  type: 'password-reset' | 'change-email' | 'change-password'
): Promise<void> {
  const subjects: Record<string, string> = {
    'password-reset': 'Código de recuperación de contraseña — EQUORA',
    'change-email': 'Código de verificación para cambio de email — EQUORA',
    'change-password': 'Código de verificación para cambio de contraseña — EQUORA',
  };

  const messages: Record<string, string> = {
    'password-reset': 'Recibimos una solicitud para restablecer tu contraseña.',
    'change-email': 'Recibimos una solicitud para cambiar el email de tu cuenta.',
    'change-password': 'Recibimos una solicitud para cambiar tu contraseña.',
  };

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: subjects[type],
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #F0E8D8; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; letter-spacing: 4px; color: #090C12; font-family: serif; margin: 0;">EQUORA</h1>
        </div>
        <p style="color: #0D0D0D; font-size: 16px; margin-bottom: 8px;">${messages[type]}</p>
        <p style="color: #6B7280; font-size: 14px; margin-bottom: 32px;">Usa el siguiente código de 6 dígitos. Válido por <strong>5 minutos</strong>.</p>
        <div style="background: #090C12; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <span style="font-size: 40px; letter-spacing: 16px; color: #A0622A; font-weight: bold; font-family: monospace;">${code}</span>
        </div>
        <p style="color: #6B7280; font-size: 12px;">Si no solicitaste este código, puedes ignorar este email de forma segura.</p>
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
        <p style="color: #6B7280; font-size: 12px; text-align: center;">© 2026 EQUORA. Todos los derechos reservados.</p>
      </div>
    `,
  });
}

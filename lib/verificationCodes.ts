import VerificationCode from '@/models/VerificationCode';

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createVerificationCode(
  email: string,
  type: 'password-reset' | 'change-email' | 'change-password'
): Promise<string> {
  // Remove any existing codes for this email+type
  await VerificationCode.deleteMany({ email: email.toLowerCase(), type });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await VerificationCode.create({
    email: email.toLowerCase(),
    code,
    type,
    expiresAt,
  });

  return code;
}

/**
 * Checks if a code is valid WITHOUT consuming it.
 * Use only when a preliminary check is needed before a final action.
 */
export async function validateCode(
  email: string,
  code: string,
  type: 'password-reset' | 'change-email' | 'change-password'
): Promise<boolean> {
  const record = await VerificationCode.findOne({
    email: email.toLowerCase(),
    code,
    type,
    expiresAt: { $gt: new Date() },
  });

  return !!record;
}

/**
 * Validates AND immediately deletes the code atomically.
 * A code is consumed on first use and can NEVER be reused.
 */
export async function validateAndDeleteCode(
  email: string,
  code: string,
  type: 'password-reset' | 'change-email' | 'change-password'
): Promise<boolean> {
  const record = await VerificationCode.findOneAndDelete({
    email: email.toLowerCase(),
    code,
    type,
    expiresAt: { $gt: new Date() },
  });

  return !!record;
}

export async function deleteCode(
  email: string,
  type: 'password-reset' | 'change-email' | 'change-password'
): Promise<void> {
  await VerificationCode.deleteMany({ email: email.toLowerCase(), type });
}

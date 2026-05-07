import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .email()
      .min(5, 'Username must be at least 3 characters.')
      .max(50, "Username can't be longer than 50 characters."),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(50, "Password can't be longer than 50 characters.")
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*]/,
        'Password must contain at least one special character',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

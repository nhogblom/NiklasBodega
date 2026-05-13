import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email()
    .min(5, 'Email must be at least 5 characters.')
    .max(50, "Email can't be longer than 50 characters."),

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
});

export const bookingSchema = z
  .object({
    checkInDate: z.string().min(7, 'Invalid Check-in date'),
    checkOutDate: z.string().min(7, 'Invalid Check-out date'),
    extraBed: z.boolean(),
  })
  .refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
    message: 'Check-out date must be after Check-in data',
    path: ['checkOutDate'],
  });

export const registerSchema = z
  .object({
    email: z
      .email()
      .min(5, 'Email must be at least 5 characters.')
      .max(50, "Email can't be longer than 50 characters."),

    fullName: z
      .string()
      .min(2, 'Name must be at least 3 characters.')
      .max(70, "Name can't be longer than 50 characters."),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(50, "Password can't be longer than 50 characters.")
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
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
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;

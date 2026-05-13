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

export const userSettingsSchema = z
  .object({
    email: z
      .string()
      .trim()
      .refine((value) => value === '' || value.length >= 5, {
        message: 'Email must be at least 5 characters.',
      })
      .refine((value) => value === '' || value.length <= 50, {
        message: "Email can't be longer than 50 characters.",
      })
      .refine((value) => value === '' || z.email().safeParse(value).success, {
        message: 'Invalid email address',
      }),
    name: z
      .string()
      .trim()
      .refine((value) => value === '' || value.length >= 3, {
        message: 'Name must be at least 3 characters.',
      })
      .refine((value) => value === '' || value.length <= 50, {
        message: "Name can't be longer than 50 characters.",
      }),
    password: z
      .string()
      .trim()
      .refine((value) => value === '' || value.length >= 8, {
        message: 'Password must be at least 8 characters.',
      })
      .refine((value) => value === '' || value.length <= 50, {
        message: "Password can't be longer than 50 characters.",
      })
      .refine((value) => value === '' || /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((value) => value === '' || /[a-z]/.test(value), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((value) => value === '' || /[0-9]/.test(value), {
        message: 'Password must contain at least one number',
      })
      .refine((value) => value === '' || /[!@#$%^&*]/.test(value), {
        message: 'Password must contain at least one special character',
      }),
    passwordConfirm: z.string().trim(),
  })
  .superRefine((data, context) => {
    if (!data.email && !data.name && !data.password) {
      context.addIssue({
        code: 'custom',
        message: 'Fill in at least one field to update your settings.',
        path: ['root'],
      });
    }

    if (data.password && !data.passwordConfirm) {
      context.addIssue({
        code: 'custom',
        message: 'Confirm your new password.',
        path: ['passwordConfirm'],
      });
    }

    if (data.password && data.password !== data.passwordConfirm) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
      });
    }

    if (!data.password && data.passwordConfirm) {
      context.addIssue({
        code: 'custom',
        message: 'Enter a new password first.',
        path: ['password'],
      });
    }
  });
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type UserSettingsFormData = z.infer<typeof userSettingsSchema>;

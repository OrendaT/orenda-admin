import { z } from 'zod';
import { password } from '@/lib/regex';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const SignUpSchema = LoginSchema.extend({
  name: z.string().min(1, { message: 'Name is required' }),
  password: z
    .string()
    .min(8, {
      message: 'Password should be 8 characters and above',
    })
    .regex(password, {
      message:
        'Password must include uppercase, lowercase, a number, and a special character',
    }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const NewPasswordSchema = SignUpSchema.pick({
  password: true,
})
  .extend({
    confirm_password: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

import { z } from 'zod';

export const FiltersSchema = z
  .object({
    status: z.enum(['pending', 'submitted']).optional().nullable(),
    from: z.date().optional(),
    to: z.date().optional(),
    flag: z
      .string()
      .optional()
      .or(
        z
          .boolean()
          .default(false)
          .transform(() => ''),
      ),
  })
  .superRefine((data, ctx) => {
    // If from exists but to doesn't
    if (data.from && !data.to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'To date is required',
        path: ['to'],
      });
    }

    // If to exists but from doesn't
    if (data.to && !data.from) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'From date is required',
        path: ['from'],
      });
    }
  });

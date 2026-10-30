import { z } from 'zod';

export const CreateCategoriesSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      emoji: z.string().min(1, "Emoji is required")
    })
  ).min(1, "At least one category is required")
});
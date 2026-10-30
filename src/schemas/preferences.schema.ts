import { z } from 'zod';


    export const PreferencesSchema = z.object({
  user_id: z.string(),
  category_ids: z.array(z.number().int().positive())
});

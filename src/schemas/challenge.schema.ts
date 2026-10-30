import { z } from 'zod';


    export const UserSchema  = z.object({
       user_id: z.string().min(1, "user_id is required"),
       
    });

    export const CompleteChallengeSchema = z.object({
  user_id: z.string().min(1, "user_id is required"),
  challenge_id: z.coerce.number().int().positive()
});


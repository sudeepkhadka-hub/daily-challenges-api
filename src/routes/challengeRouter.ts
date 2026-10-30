import express, { Request, Response, Router } from 'express';
import challengeService  from '../services/challenge.service';
import { UserSchema, CompleteChallengeSchema} from '../schemas/challenge.schema';
import { parse } from 'node:path';
import { error } from 'node:console';
import streakService from '../services/streak.service';

 const challengeRouter: Router = (() => {
  const router = express.Router();

  router.get('/today', async(req: Request, res: Response) => {
    const parsed = UserSchema.safeParse(req.query);
    if (!parsed.success) {
  res.status(400).json({ error: parsed.error });
  return;
}  
const { user_id } = parsed.data;

try{const challenge = await challengeService.getTodayChallenge(user_id)
    if (!challenge) {
      res.status(404).json({ error: "No challenge found for today" });
      return;
    }

    res.status(200).json(challenge);}
    catch(err){
      res.status(500).json({ error: "Server error" });
    }
    
  });

  router.post('/complete', async (req: Request, res: Response) => {
    const parsed = CompleteChallengeSchema.safeParse(req.body);
     if(!parsed.success){
      res.status(400).json({error: parsed.error})
      return;
     }
    
    const { user_id, challenge_id } = parsed.data;

    try{
    const result = await challengeService.markCompleted(user_id, challenge_id);
    if (!result) {
      res.status(404).json({ error: "Challenge not found" });
      return;
    }
    res.status(200).json({success: true, data: result});}
     catch (err) {
    res.status(500).json({ error: "Server error" });
  }
  });

  router.get('/streak', async (req: Request, res: Response) => {
  const parsed = UserSchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error });
    return;
  }
  const { user_id } = parsed.data;

  try {
    const streak = await streakService.getStreak(user_id);
    res.status(200).json({ user_id, ...streak });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

 
router.get('/history', async (req: Request, res: Response) => {
 const parsed = UserSchema.safeParse(req.query);
    if (!parsed.success) {
  res.status(400).json({ error: parsed.error });
  return;
}  
const { user_id } = parsed.data;

  try {
    const history = await challengeService.getChallengeHistory(user_id);
    res.status(200).json({ history });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Database error' });
  }
});

  return router;
})(); 

export default challengeRouter;
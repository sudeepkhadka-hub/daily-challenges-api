import express, { Request, Response, Router } from 'express';
import preferencesService from '../services/preferences.service';
import { PreferencesSchema } from '../schemas/preferences.schema';

const preferencesRouter: Router = (()  => {
  const router = express.Router();

  // POST /preferences
  router.post('/', async (req : Request, res: Response) => {
  const parsed = PreferencesSchema.safeParse(req.body);
  if (!parsed.success) {
  res.status(400).json({ error: parsed.error});
  return;
}
    const { user_id, category_ids } = parsed.data;

    try { 
      await preferencesService.savePreferences(user_id, category_ids); 
      res.status(200).json({ success: true, user_id,
         message: 'Preferences saved successfully.' });
         } 
    catch (err) { console.log(err); res.status(500).json({ error: 'Database error' }); }

  }); 


    //get
  router.get('/:user_id', async (req, res) => {   
  const ids = await preferencesService.getPreferences(req.params.user_id);
  
  res.status(200).json({ user_id: req.params.user_id, category_ids: ids });
});
  

  return router;
})();

export default preferencesRouter; 
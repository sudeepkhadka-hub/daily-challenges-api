import express, { Request, Response, Router } from 'express';
import  categoriesService from '../services/categories.services';
import { CreateCategoriesSchema } from '../schemas/categories.schema';
import { error } from 'node:console';

const categoriesRouter: Router = (() => {
  const router = express.Router();

  // GET /categories
  router.get('/', async (req: Request, res: Response) => {
    try {
      const categories = await categoriesService.getCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // POST /categories
  router.post('/', async (req: Request, res: Response) => {

    const parsed = CreateCategoriesSchema.safeParse(req.body);
    if(!parsed.success){
      res.status(400).json({
        error: parsed.error
      })
      return;
    }
    const { categories } = req.body;

    try {
      const result = await categoriesService.createCategories(categories);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  return router;
})();

export default categoriesRouter;
import { Router } from "express";
import authRouter from './authRouter.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

router.use('/auth', authRouter);

export default router;

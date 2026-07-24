import { Router } from 'express';
import authRouter from './authRouter.js';
import boardRouter from './boardRouter.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

router.use('/api/auth', authRouter);
router.use('/api/boards', boardRouter);

export default router;

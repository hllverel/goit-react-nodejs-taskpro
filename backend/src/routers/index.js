import { Router } from "express";
import helpRouter from "./needHelp.js";
import authRouter from './authRouter.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

router.use('/auth', authRouter);
router.use('/help', helpRouter);

export default router;

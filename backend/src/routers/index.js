import { Router } from "express";
import helpRouter from "./needHelp.js";
import authRouter from "./authRouter.js";
import taskRouter from "./taskRouter.js";

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

router.use('/api/auth', authRouter);
router.use('/help', helpRouter);
router.use('/tasks', taskRouter);

export default router;

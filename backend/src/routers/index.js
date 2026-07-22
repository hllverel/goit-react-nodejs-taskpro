import { Router } from 'express';
import taskRouter from './taskRouter.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

// TODO: mount feature routers here, e.g. router.use("/auth", authRouter);

router.use('/tasks', taskRouter);

export default router;

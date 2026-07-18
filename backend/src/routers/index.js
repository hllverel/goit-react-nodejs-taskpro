import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'TaskPro API is running',
  });
});

// TODO: mount feature routers here, e.g. router.use("/auth", authRouter);

export default router;

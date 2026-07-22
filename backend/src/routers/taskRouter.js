import { Router } from 'express';
import {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTasksController,
} from '../controllers/taskController.js';

const router = Router();

// ➕ Yeni Kart Ekleme -> POST /api/tasks
router.post('/', createTaskController);

// ✏️ Kart Güncelleme -> PUT /api/tasks/:id
router.put('/:id', updateTaskController);

// 🗑️ Kart Silme -> DELETE /api/tasks/:id
router.delete('/:id', deleteTaskController);

router.get('/', getTasksController);

export default router;

import { Router } from 'express';
import {
  createBoard,
  createCard,
  createColumn,
  deleteBoard,
  deleteCard,
  deleteColumn,
  listBoards,
  moveCard,
  updateBoard,
  updateCard,
  updateColumn,
} from '../controllers/boardControllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createBoardSchema,
  cardSchema,
  createColumnSchema,
  moveCardSchema,
  updateBoardSchema,
  updateCardSchema,
  updateColumnSchema,
} from '../validation/boardValidation.js';

const router = Router();

router.use(authenticate);

router.get('/', listBoards);
router.post('/', validateBody(createBoardSchema), createBoard);
router.patch('/:boardId', validateBody(updateBoardSchema), updateBoard);
router.delete('/:boardId', deleteBoard);

router.post('/:boardId/columns', validateBody(createColumnSchema), createColumn);
router.patch('/:boardId/columns/:columnId', validateBody(updateColumnSchema), updateColumn);
router.delete('/:boardId/columns/:columnId', deleteColumn);
router.post('/:boardId/columns/:columnId/cards', validateBody(cardSchema), createCard);
router.patch('/:boardId/columns/:columnId/cards/:cardId', validateBody(updateCardSchema), updateCard);
router.patch(
  '/:boardId/columns/:columnId/cards/:cardId/move',
  validateBody(moveCardSchema),
  moveCard,
);
router.delete('/:boardId/columns/:columnId/cards/:cardId', deleteCard);

export default router;

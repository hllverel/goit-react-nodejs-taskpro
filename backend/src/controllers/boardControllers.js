import * as boardService from '../services/boardService.js';

export const listBoards = async (req, res) => {
  const boards = await boardService.listBoards(req.user._id);
  res.status(200).json(boards);
};

export const createBoard = async (req, res) => {
  const board = await boardService.createBoard(req.user._id, req.body);
  res.status(201).json(board);
};

export const updateBoard = async (req, res) => {
  const board = await boardService.updateBoard(req.user._id, req.params.boardId, req.body);
  res.status(200).json(board);
};

export const deleteBoard = async (req, res) => {
  await boardService.deleteBoard(req.user._id, req.params.boardId);
  res.status(204).send();
};

export const createColumn = async (req, res) => {
  const board = await boardService.createColumn(req.user._id, req.params.boardId, req.body);
  res.status(201).json(board);
};

export const updateColumn = async (req, res) => {
  const board = await boardService.updateColumn(
    req.user._id,
    req.params.boardId,
    req.params.columnId,
    req.body,
  );
  res.status(200).json(board);
};

export const deleteColumn = async (req, res) => {
  const board = await boardService.deleteColumn(req.user._id, req.params.boardId, req.params.columnId);
  res.status(200).json(board);
};

export const createCard = async (req, res) => {
  const board = await boardService.createCard(
    req.user._id,
    req.params.boardId,
    req.params.columnId,
    req.body,
  );
  res.status(201).json(board);
};

export const updateCard = async (req, res) => {
  const board = await boardService.updateCard(
    req.user._id,
    req.params.boardId,
    req.params.columnId,
    req.params.cardId,
    req.body,
  );
  res.status(200).json(board);
};

export const deleteCard = async (req, res) => {
  const board = await boardService.deleteCard(
    req.user._id,
    req.params.boardId,
    req.params.columnId,
    req.params.cardId,
  );
  res.status(200).json(board);
};

export const moveCard = async (req, res) => {
  const board = await boardService.moveCard(
    req.user._id,
    req.params.boardId,
    req.params.columnId,
    req.params.cardId,
    req.body.targetColumnId,
  );
  res.status(200).json(board);
};

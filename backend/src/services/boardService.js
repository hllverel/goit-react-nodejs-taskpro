import createHttpError from 'http-errors';
import { Board } from '../db/models/Board.js';

const toColumnResponse = (column) => ({
  id: column._id.toString(),
  title: column.title,
  cards: (column.cards || []).map((card) => ({
    id: card._id.toString(),
    title: card.title,
    description: card.description,
    labelColor: card.labelColor,
    deadline: card.deadline,
    columnId: column._id.toString(),
  })),
});

export const toBoardResponse = (board) => ({
  id: board._id.toString(),
  title: board.title,
  iconId: board.iconId,
  backgroundId: board.backgroundId,
  backgroundPreview: board.backgroundPreview,
  columns: board.columns.map(toColumnResponse),
});

const findOwnedBoard = async (userId, boardId) => {
  const board = await Board.findOne({ _id: boardId, owner: userId });

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  return board;
};

export const listBoards = async (userId) => {
  const boards = await Board.find({ owner: userId }).sort({ createdAt: -1 });

  return boards.map(toBoardResponse);
};

export const createBoard = async (userId, payload) => {
  const board = await Board.create({ ...payload, owner: userId });

  return toBoardResponse(board);
};

export const updateBoard = async (userId, boardId, payload) => {
  const board = await Board.findOneAndUpdate(
    { _id: boardId, owner: userId },
    payload,
    { new: true },
  );

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  return toBoardResponse(board);
};

export const deleteBoard = async (userId, boardId) => {
  const board = await Board.findOneAndDelete({ _id: boardId, owner: userId });

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }
};

export const createColumn = async (userId, boardId, payload) => {
  const board = await findOwnedBoard(userId, boardId);

  board.columns.push({ title: payload.title, cards: [] });
  await board.save();

  return toBoardResponse(board);
};

export const updateColumn = async (userId, boardId, columnId, payload) => {
  const board = await findOwnedBoard(userId, boardId);
  const column = board.columns.id(columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  column.title = payload.title;
  await board.save();

  return toBoardResponse(board);
};

export const deleteColumn = async (userId, boardId, columnId) => {
  const board = await findOwnedBoard(userId, boardId);
  const column = board.columns.id(columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  column.deleteOne();
  await board.save();

  return toBoardResponse(board);
};

export const createCard = async (userId, boardId, columnId, payload) => {
  const board = await findOwnedBoard(userId, boardId);
  const column = board.columns.id(columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  column.cards.push(payload);
  await board.save();

  return toBoardResponse(board);
};

export const updateCard = async (userId, boardId, columnId, cardId, payload) => {
  const board = await findOwnedBoard(userId, boardId);
  const column = board.columns.id(columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  const card = column.cards.id(cardId);

  if (!card) {
    throw createHttpError(404, 'Card not found');
  }

  Object.assign(card, payload);
  await board.save();

  return toBoardResponse(board);
};

export const deleteCard = async (userId, boardId, columnId, cardId) => {
  const board = await findOwnedBoard(userId, boardId);
  const column = board.columns.id(columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  const card = column.cards.id(cardId);

  if (!card) {
    throw createHttpError(404, 'Card not found');
  }

  card.deleteOne();
  await board.save();

  return toBoardResponse(board);
};

export const moveCard = async (userId, boardId, columnId, cardId, targetColumnId) => {
  const board = await findOwnedBoard(userId, boardId);
  const sourceColumn = board.columns.id(columnId);
  const targetColumn = board.columns.id(targetColumnId);

  if (!sourceColumn || !targetColumn) {
    throw createHttpError(404, 'Column not found');
  }

  const card = sourceColumn.cards.id(cardId);

  if (!card) {
    throw createHttpError(404, 'Card not found');
  }

  targetColumn.cards.push({
    title: card.title,
    description: card.description,
    labelColor: card.labelColor,
    deadline: card.deadline,
  });
  card.deleteOne();
  await board.save();

  return toBoardResponse(board);
};

import Joi from 'joi';

const titleField = Joi.string().trim().min(1).max(64);
const columnField = Joi.object({
  title: titleField.required(),
  cards: Joi.array().default([]),
});
const labelColorField = Joi.string().valid('blue', 'pink', 'green', 'gray');

export const cardSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().min(1).required(),
  labelColor: labelColorField.default('gray'),
  deadline: Joi.string().trim().required(),
});

export const createBoardSchema = Joi.object({
  title: titleField.required(),
  iconId: Joi.string().trim().max(32).default('grid'),
  backgroundId: Joi.string().trim().max(64).default('none'),
  backgroundPreview: Joi.string().allow('').max(5_000_000).default(''),
  columns: Joi.array().items(columnField).default([]),
});

export const updateBoardSchema = Joi.object({
  title: titleField,
  iconId: Joi.string().trim().max(32),
  backgroundId: Joi.string().trim().max(64),
  backgroundPreview: Joi.string().allow('').max(5_000_000),
}).min(1);

export const createColumnSchema = Joi.object({
  title: titleField.required(),
});

export const updateColumnSchema = Joi.object({
  title: titleField.required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100),
  description: Joi.string().trim().min(1),
  labelColor: labelColorField,
  deadline: Joi.string().trim(),
}).min(1);

export const moveCardSchema = Joi.object({
  targetColumnId: Joi.string().required(),
});

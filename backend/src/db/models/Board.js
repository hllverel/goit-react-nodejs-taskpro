import { Schema, model, Types } from 'mongoose';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 64,
    },
    cards: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        labelColor: {
          type: String,
          enum: ['blue', 'pink', 'green', 'gray'],
          default: 'gray',
        },
        deadline: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const boardSchema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 64,
    },
    iconId: {
      type: String,
      default: 'grid',
    },
    backgroundId: {
      type: String,
      default: 'none',
    },
    backgroundPreview: {
      type: String,
      default: '',
    },
    columns: {
      type: [columnSchema],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

export const Board = model('Board', boardSchema);

import { Schema, model } from 'mongoose';

const workspaceSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    boards: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    activeBoardId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Workspace = model('Workspace', workspaceSchema);

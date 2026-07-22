import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Başlık alanı zorunludur'],
      trim: true,
      maxlength: [100, 'Başlık en fazla 100 karakter olabilir'],
    },
    description: {
      type: String,
      required: [true, 'Açıklama alanı zorunludur '],
      trim: true,
    },
    labelColor: {
      type: String,
      enum: ['blue', 'pink', 'green', 'gray'], // Figma'daki etiket renklerimiz
      default: 'gray',
    },
    deadline: {
      type: Date,
      required: [true, 'Teslim tarihi zorunludur'],
    },
    // Kartın hangi sütunda durduğunu bilelim ki arkadaşın taşırken sorun yaşamasın
    columnId: {
      type: String,
      required: true,
      default: 'todo',
    },
  },
  {
    timestamps: true, // Kartın oluşturulma (createdAt) ve güncellenme (updatedAt) tarihlerini otomatik tutar
    versionKey: false, // Veritabanındaki gereksiz __v alanını kaldırır, daha temiz durur
  },
);

// Koleksiyon adını 'tasks' olarak ayarlayıp dışarı aktarıyoruz
export const Task = model('Task', taskSchema);

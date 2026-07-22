import { Task } from '../db/models/Tasks.js';
// ➕ 1. YENİ KART EKLEME (Create)
export const createTaskController = async (req, res, next) => {
  try {
    const { title, description, labelColor, deadline, columnId } = req.body;

    const newTask = await Task.create({
      title,
      description,
      labelColor,
      deadline,
      columnId: columnId || 'todo', // Eğer sütun gönderilmediyse varsayılan 'todo' olsun reis
    });

    res.status(201).json({
      status: 201,
      message: 'Kart başarıyla oluşturuldu!',
      data: newTask,
    });
  } catch (error) {
    next(error); // Hatayı projedeki errorHandler middleware'ine paslıyoruz
  }
};

// ✏️ 2. KART GÜNCELLEME (Update)
export const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, labelColor, deadline, columnId } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, labelColor, deadline, columnId },
      { new: true, runValidators: true }, // Güncel veriyi dönsün ve şema kurallarını kontrol etsin
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: 'Güncellenmek istenen kart bulunamadı!',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Kart başarıyla güncellendi!',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// 🗑️ 3. KART SİLME (Delete)
export const deleteTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        status: 404,
        message: 'Silinmek istenen kart mevcut değil!',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Kart başarıyla silindi!',
    });
  } catch (error) {
    next(error);
  }
};
export const getTasksController = async (req, res, next) => {
  try {
    const tasks = await Task.find(); // Veritabanındaki tüm kartları çekiyoruz reis
    res.status(200).json({
      status: 200,
      message: 'Tüm kartlar başarıyla getirildi reis!',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

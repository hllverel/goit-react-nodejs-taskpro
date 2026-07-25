import { Task } from '../db/models/Tasks.js';
// kart ekleme
export const createTaskController = async (req, res, next) => {
  try {
    const { title, description, labelColor, deadline, columnId } = req.body;

    const newTask = await Task.create({
      title,
      description,
      labelColor,
      deadline,
      columnId: columnId || 'todo',
      owner: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Task created successfully!',
      data: newTask,
    });
  } catch (error) {
    next(error); // Hatayı projedeki errorHandler middleware'ine paslıyoruz
  }
};

// kart güncelleme
export const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, labelColor, deadline, columnId } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      { title, description, labelColor, deadline, columnId },
      { new: true, runValidators: true }, // Güncel veriyi dönsün ve şema kurallarını kontrol etsin
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: 'Task can not be found!',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Task updated successfully!',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// kart silme
export const deleteTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        status: 404,
        message: 'Task does not exist!',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Task deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};
export const getTasksController = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    }); // Kullanıcıya ait tüm kartları çekiyoruz
    res.status(200).json({
      status: 200,
      message: 'All tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

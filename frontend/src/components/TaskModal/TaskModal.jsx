import { useState } from 'react';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import './TaskModal.css';

const TaskModal = ({
  mode = 'add',
  columnId,
  onClose,
  onSubmit,
  initialData,
}) => {
  // 1. Başlık alanı için state
  const [title, setTitle] = useState(initialData?.title || '');

  // 2. Açıklama alanı için state
  const [description, setDescription] = useState(
    initialData?.description || '',
  );

  // 3. Etiket rengi için state
  const [labelColor, setLabelColor] = useState(
    initialData?.labelColor || 'blue',
  );

  // 4. Bitiş tarihi için state
  const [deadline, setDeadline] = useState(
    initialData?.deadline || 'Today, March 8',
  );

  // 5. Formun gönderilme fonksiyonu (Component'in İÇİNDE olmalı)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      labelColor,
      deadline,
      columnId,
    });
  };

  // 6. Ekrana basılacak HTML (Component'in İÇİNDE olmalı)
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Kapatma Butonu */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Modal Başlığı */}
        <h2>{mode === 'add' ? 'Add card' : 'Edit card'}</h2>

        <form onSubmit={handleSubmit}>
          {/* Başlık Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Açıklama Textarea */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Renk Seçimi (Label Color) */}
          <div className="label-color-section">
            <label>Label color</label>
            <div className="color-options">
              {['blue', 'pink', 'green', 'gray'].map((color) => (
                <span
                  key={color}
                  className={`color-dot ${color} ${labelColor === color ? 'selected' : ''}`}
                  onClick={() => setLabelColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="form-group deadline-section">
            <label>Deadline</label>
            <CustomDatePicker
              selectedDate={deadline}
              onChange={(date) => setDeadline(date)}
              placeholder="Select a date"
            />
          </div>

          {/* Formu Gönderme Butonu */}
          <button type="submit" className="submit-btn">
            <span className="plus-icon">+</span>
            {mode === 'add' ? 'Add' : 'Edit'}
          </button>
        </form>
      </div>
    </div>
  );
}; // Component fonksiyonu en son burada kapanıyor!

export default TaskModal;

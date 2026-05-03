import { useState, useRef } from "react";
import { materials } from "../data/models";

const emptyForm = {
  name: "",
  material: "PLA",
  printTime: "",
  category: "",
  description: "",
};

// Читає File як base64 data URL (зберігається в localStorage)
function readAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function AddModelForm({ onAdd, onEdit, initialData, onClose }) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState(
    isEdit
      ? {
          name: initialData.name,
          material: initialData.material,
          printTime: initialData.printTime,
          category: initialData.category,
          description: initialData.description,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  // imagePreview — тепер завжди base64 data URL або існуючий URL
  const [imagePreview, setImagePreview] = useState(
    isEdit ? initialData.image || null : null
  );
  const [imageCleared, setImageCleared] = useState(false);

  // STL: зберігаємо base64 data URL + назву файлу
  const [stlDataUrl, setStlDataUrl] = useState(
    isEdit ? initialData.stlUrl || null : null
  );
  const [stlName, setStlName] = useState(
    isEdit ? initialData.stlName || null : null
  );

  const imageInputRef = useRef(null);
  const stlInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Конвертуємо фото у base64 відразу при виборі
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await readAsDataURL(file);
    setImagePreview(dataUrl);
    setImageCleared(false);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageCleared(true);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // Конвертуємо STL/3MF у base64 відразу при виборі
  const handleStlChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await readAsDataURL(file);
    setStlDataUrl(dataUrl);
    setStlName(file.name);
  };

  const handleRemoveStl = () => {
    setStlDataUrl(null);
    setStlName(null);
    if (stlInputRef.current) stlInputRef.current.value = "";
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введіть назву деталі";
    if (!form.printTime.trim()) newErrors.printTime = "Введіть час друку";
    if (!form.category.trim()) newErrors.category = "Введіть категорію";
    if (!form.description.trim()) newErrors.description = "Введіть опис";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const modelData = {
      ...form,
      image: imageCleared ? null : imagePreview,
      stlUrl: stlDataUrl,
      stlName: stlName,
    };

    if (isEdit) {
      onEdit({ ...modelData, id: initialData.id });
    } else {
      onAdd({ ...modelData, id: Date.now() });
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const materialOptions = materials.filter((m) => m !== "Всі");

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-window">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "✏️ Редагувати модель" : "➕ Додати модель"}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрити">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="form-group">
              <label className="form-label">Назва деталі *</label>
              <input
                className={`form-input ${errors.name ? "input-error" : ""}`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Наприклад: Кронштейн підвіски"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Матеріал *</label>
                <select
                  className="form-input form-select"
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                >
                  {materialOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Час друку *</label>
                <input
                  className={`form-input ${errors.printTime ? "input-error" : ""}`}
                  type="text"
                  name="printTime"
                  value={form.printTime}
                  onChange={handleChange}
                  placeholder="Наприклад: 2 год 30 хв"
                />
                {errors.printTime && (
                  <span className="form-error">{errors.printTime}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Категорія *</label>
              <input
                className={`form-input ${errors.category ? "input-error" : ""}`}
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Наприклад: Підвіска"
              />
              {errors.category && (
                <span className="form-error">{errors.category}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Опис та налаштування слайсера *</label>
              <textarea
                className={`form-input form-textarea ${errors.description ? "input-error" : ""}`}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Температура друку, заповнення, особливості налаштувань..."
                rows={3}
              />
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Фото деталі</label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <div className="file-preview-wrap">
                  <img src={imagePreview} alt="Прев'ю" className="image-preview" />
                  <div className="file-preview-actions">
                    <button
                      type="button"
                      className="file-upload-btn"
                      onClick={() => imageInputRef.current.click()}
                    >
                      🔄 Замінити фото
                    </button>
                    <button
                      type="button"
                      className="file-remove-btn"
                      onClick={handleRemoveImage}
                    >
                      ✕ Видалити фото
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => imageInputRef.current.click()}
                >
                  📷 Вибрати фото
                </button>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">STL / 3MF файл</label>
              <input
                ref={stlInputRef}
                type="file"
                accept=".stl,.3mf"
                style={{ display: "none" }}
                onChange={handleStlChange}
              />
              {stlName ? (
                <div className="file-attached">
                  <span className="file-attached-name">📎 {stlName}</span>
                  <button
                    type="button"
                    className="file-upload-btn-inline"
                    onClick={() => stlInputRef.current.click()}
                    title="Замінити файл"
                  >
                    🔄
                  </button>
                  <button
                    type="button"
                    className="file-remove-btn"
                    onClick={handleRemoveStl}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => stlInputRef.current.click()}
                >
                  📁 Прикріпити STL / 3MF
                </button>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? "Зберегти зміни" : "Додати модель"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModelForm;
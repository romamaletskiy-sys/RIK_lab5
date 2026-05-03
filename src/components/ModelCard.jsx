// Компонент ModelCard — картка окремої 3D-моделі
// Отримує пропси: model (об'єкт деталі), onDetails, onDelete

import { useState } from "react";

// Кольори для бейджів матеріалів
const materialColors = {
  TPU: "#3b82f6",
  PLA: "#22c55e",
  PETG: "#f59e0b",
  ABS: "#ef4444",
};

function ModelCard({ model, onDetails, onDelete, onEdit }) {
  // Локальний стан: лічильник завантажень (використовується коли STL-файл не прикріплено)
  const [downloads, setDownloads] = useState(0);
  // Локальний стан: анімація кнопки завантаження
  const [downloaded, setDownloaded] = useState(false);

  const badgeColor = materialColors[model.material] || "#6b7280";

  // Обробник кнопки завантаження:
  // якщо є реальний файл (stlUrl) — завантажуємо його через <a>, інакше — лічильник
  const handleDownload = () => {
    if (model.stlUrl) {
      // Програмно створюємо посилання і клікаємо — браузер завантажує файл
      const a = document.createElement("a");
      a.href = model.stlUrl;
      a.download = model.stlName || `${model.name}.stl`;
      a.click();
    }
    setDownloads((prev) => prev + 1);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="model-card">
      {/* Превʼю: фото або плейсхолдер "Фото відсутнє" */}
      <div className="card-preview">
        {model.image ? (
          <img
            src={model.image}
            alt={model.name}
            className="card-photo"
            // Якщо зображення не завантажилось — прибираємо broken-icon
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        {/* Плейсхолдер відображається коли немає фото або фото не завантажилось */}
        <div
          className="card-no-photo"
          style={{ display: model.image ? "none" : "flex" }}
        >
          <span>📷</span>
          <span>Фото відсутнє</span>
        </div>
        {/* Бейдж матеріалу поверх фото */}
        <span
          className="material-badge"
          style={{ backgroundColor: badgeColor }}
        >
          {model.material}
        </span>
      </div>

      {/* Основна інформація про деталь */}
      <div className="card-body">
        <h3 className="card-title">{model.name}</h3>
        <p className="card-category">{model.category}</p>
        <p className="card-description">{model.description.slice(0, 90)}…</p>

        {/* Метадані */}
        <div className="card-meta">
          <span className="meta-item">⏱ {model.printTime}</span>
          {/* Назва прикріпленого файлу або лічильник завантажень */}
          {model.stlName && (
            <span className="meta-item stl-tag">📎 {model.stlName}</span>
          )}
          {!model.stlUrl && downloads > 0 && (
            <span className="meta-item downloads">⬇ {downloads}</span>
          )}
        </div>
      </div>

      {/* Кнопки дій */}
      <div className="card-actions">
        <div className="card-actions-main">
          <button className="btn-primary" onClick={() => onDetails(model)}>
            Деталі
          </button>

          <button
            className={`btn-secondary ${downloaded ? "btn-success" : ""}`}
            onClick={handleDownload}
          >
            {downloaded ? "✓ Завантажено!" : "⬇ Завантажити STL"}
          </button>
        </div>

        <div className="card-actions-icons">
          {/* Кнопка редагування */}
          <button
            className="btn-edit"
            onClick={() => onEdit(model)}
            aria-label="Редагувати модель"
            title="Редагувати"
          >
            ✏️
          </button>

          {/* Кнопка видалення */}
          <button
            className="btn-delete"
            onClick={() => onDelete(model.id)}
            aria-label="Видалити модель"
            title="Видалити"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelCard;


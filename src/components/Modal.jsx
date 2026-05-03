// Компонент Modal — модальне вікно з детальною інформацією про модель
// Отримує пропси: model (об'єкт деталі), onClose (функція закриття вікна)

// Кольори для бейджа матеріалу
const materialColors = {
  TPU: "#3b82f6",
  PLA: "#22c55e",
  PETG: "#f59e0b",
  ABS: "#ef4444",
};

function Modal({ model, onClose }) {
  if (!model) return null; // Якщо модель не передана — нічого не рендеримо

  // Закриття модалки при кліку на фон (overlay)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-window">
        {/* Шапка модалки */}
        <div className="modal-header">
          <h2 className="modal-title">{model.name}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрити">
            ✕
          </button>
        </div>

        {/* Тіло модалки з деталями */}
        <div className="modal-body">
          {/* Фото або плейсхолдер */}
          {model.image ? (
            <img src={model.image} alt={model.name} className="modal-photo" />
          ) : (
            <div className="modal-no-photo">
              <span>📷</span>
              <span>Фото відсутнє</span>
            </div>
          )}

          <div className="modal-meta">
            <span
              className="material-badge large"
              style={{ backgroundColor: materialColors[model.material] }}
            >
              {model.material}
            </span>
            <span className="modal-category">📂 {model.category}</span>
          </div>

          <div className="modal-info-row">
            <div className="modal-info-item">
              <span className="info-icon">⏱</span>
              <div>
                <p className="info-label">Час друку</p>
                <p className="info-value">{model.printTime}</p>
              </div>
            </div>
            <div className="modal-info-item">
              <span className="info-icon">🧱</span>
              <div>
                <p className="info-label">Матеріал</p>
                <p className="info-value">{model.material}</p>
              </div>
            </div>
          </div>

          <div className="modal-description">
            <p className="info-label">Опис та налаштування слайсера</p>
            <p>{model.description}</p>
          </div>
        </div>

        <div className="modal-footer">
          {/* Якщо є прикріплений файл — показуємо його назву */}
          {model.stlName && (
            <span className="modal-stl-info">📎 {model.stlName}</span>
          )}
          <button className="btn-secondary" onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

// Головний компонент застосунку
// Керує станом фільтру, списком моделей та станом відкритої модалки

import { useState } from "react";
import { models as initialModels, materials } from "./data/models";
import FilterBar from "./components/FilterBar";
import ModelCard from "./components/ModelCard";
import Modal from "./components/Modal";
import AddModelForm from "./components/AddModelForm";
import "./App.css";

function App() {
  // Стан списку моделей — ініціалізується mock-даними, але може змінюватись
  const [models, setModels] = useState(initialModels);

  // Стан активного фільтру матеріалу (за замовчуванням "Всі")
  const [activeFilter, setActiveFilter] = useState("Всі");

  // Стан обраної моделі для модального вікна деталей (null = закрито)
  const [selectedModel, setSelectedModel] = useState(null);

  // Стан видимості форми додавання (true = відкрита)
  const [showAddForm, setShowAddForm] = useState(false);

  // Стан моделі що редагується (null = форма редагування закрита)
  const [editingModel, setEditingModel] = useState(null);

  // Стан пошукового запиту
  const [searchQuery, setSearchQuery] = useState("");

  // Додавання нової моделі — додаємо об'єкт на початок масиву
  const handleAdd = (newModel) => {
    setModels((prev) => [newModel, ...prev]);
  };

  // Редагування моделі — замінюємо об'єкт з відповідним id оновленим
  const handleEdit = (updatedModel) => {
    setModels((prev) =>
      prev.map((m) => (m.id === updatedModel.id ? updatedModel : m))
    );
  };

  // Видалення моделі за id — фільтруємо масив, виключаючи потрібний елемент
  const handleDelete = (id) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
  };

  // Обчислення відфільтрованого списку моделей на основі фільтру та пошуку
  const filteredModels = models.filter((m) => {
    const matchesMaterial = activeFilter === "Всі" || m.material === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.material.toLowerCase().includes(q);
    return matchesMaterial && matchesSearch;
  });

  return (
    <div className="app">
      {/* ===== Шапка сайту (Header) ===== */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-icon">🖨️</span>
            <div>
              <h1 className="header-title">3D Print Catalog</h1>
              <p className="header-subtitle">
                Каталог 3д друку
              </p>
            </div>
          </div>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Пошук моделей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery("")} aria-label="Очистити">
                ✕
              </button>
            )}
          </div>
          <div className="header-stats">
            <span className="stat-badge">{models.length} моделей</span>
            {/* Кнопка відкриває форму додавання нової моделі */}
            <button className="btn-add" onClick={() => setShowAddForm(true)}>
              ➕ Додати модель
            </button>
          </div>
        </div>
      </header>

      {/* ===== Основний контент ===== */}
      <main className="main">
        {/* Панель фільтрації — передаємо стан і функцію його зміни */}
        <FilterBar
          selected={activeFilter}
          onFilter={setActiveFilter}
          materials={materials}
        />

        {/* Лічильник результатів після фільтрації */}
        <p className="results-count">
          Знайдено: <strong>{filteredModels.length}</strong>{" "}
          {filteredModels.length === 1 ? "модель" : "моделі"}
        </p>

        {/* ===== Сітка карток ===== */}
        {filteredModels.length > 0 ? (
          <div className="models-grid">
            {filteredModels.map((model) => (
              // Для кожної моделі рендеримо картку
              // onDetails передає модель у стан selectedModel → відкриває модалку
              // onDelete передає id для видалення моделі зі списку
              <ModelCard
                key={model.id}
                model={model}
                onDetails={setSelectedModel}
                onDelete={handleDelete}
                onEdit={setEditingModel}
              />
            ))}
          </div>
        ) : (
          // Повідомлення якщо після фільтрації нічого не знайдено
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>
              {searchQuery
                ? `За запитом «${searchQuery}» нічого не знайдено.`
                : `Моделей з матеріалом «${activeFilter}» не знайдено.`}
            </p>
          </div>
        )}
      </main>

      {/* ===== Підвал сайту ===== */}
      <footer className="footer">
        <p>Лабораторна робота №5 · React + Vite · 2026</p>
      </footer>

      {/* ===== Модальне вікно деталей ===== */}
      {/* Рендериться лише якщо selectedModel не null */}
      <Modal model={selectedModel} onClose={() => setSelectedModel(null)} />

      {/* ===== Форма додавання нової моделі ===== */}
      {showAddForm && (
        <AddModelForm onAdd={handleAdd} onClose={() => setShowAddForm(false)} />
      )}

      {/* ===== Форма редагування моделі ===== */}
      {/* Відкривається коли editingModel не null; передає initialData для заповнення полів */}
      {editingModel && (
        <AddModelForm
          initialData={editingModel}
          onEdit={handleEdit}
          onClose={() => setEditingModel(null)}
        />
      )}
    </div>
  );
}

export default App;

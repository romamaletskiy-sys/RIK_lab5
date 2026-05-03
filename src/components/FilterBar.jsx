// Компонент FilterBar — панель фільтрації за типом матеріалу
// Отримує пропси: selected (активний фільтр), onFilter (функція зміни фільтру), materials (список кнопок)

function FilterBar({ selected, onFilter, materials }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Матеріал:</span>
      <div className="filter-buttons">
        {/* Перебираємо масив матеріалів і рендеримо кнопку для кожного */}
        {materials.map((material) => (
          <button
            key={material}
            // Додаємо клас "active" до обраного фільтру
            className={`filter-btn ${selected === material ? "active" : ""}`}
            onClick={() => onFilter(material)}
          >
            {material}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;

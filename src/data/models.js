// Масив заглушок (mock-дані) — технічні автомобільні деталі для 3D-друку
// Поле image — URL фото; stlUrl — посилання на файл (null = файл не прикріплено)
export const models = [
  {
    id: 1,
    name: "Гнучкий патрубок",
    material: "TPU",
    printTime: "3 год 20 хв",
    category: "Система охолодження",
    description:
      "Друкується з підтримками при температурі 230°C, заповнення 40%. У Blender форма побудована за допомогою Curve Modifier для плавного вигину. Ідеально підходить для патрубків системи охолодження двигуна.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&auto=format&fit=crop",
    stlUrl: null,
    stlName: null,
  },
  {
    id: 2,
    name: "Шестірня КПП",
    material: "PETG",
    printTime: "5 год 10 хв",
    category: "Трансмісія",
    description:
      "Заповнення 80%, 5 периметрів для максимальної міцності зубців. У слайсері PrusaSlicer увімкнено адаптивні шари для рівної поверхні зубців. PETG стійкий до мастил та температур до 80°C.",
    image: "https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=480&auto=format&fit=crop",
    stlUrl: null,
    stlName: null,
  },
  {
    id: 3,
    name: "Кронштейн кріплення",
    material: "ABS",
    printTime: "2 год 45 хв",
    category: "Кріплення",
    description:
      "Друк у закритій камері при 250°C, заповнення 60%. ABS забезпечує стійкість до температур до 100°C. Після друку деталь можна обробити ацетоновою парою для гладкої поверхні.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=480&auto=format&fit=crop",
    stlUrl: null,
    stlName: null,
  },
  {
    id: 4,
    name: "Кришка повітряного фільтра",
    material: "PLA",
    printTime: "1 год 55 хв",
    category: "Двигун",
    description:
      "Прототипна деталь, температура друку 210°C. Заповнення 25%, висота шару 0.2мм. У Blender логотип авто додано методом Boolean Difference. PLA підходить лише для некритичних деталей.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=480&auto=format&fit=crop",
    stlUrl: null,
    stlName: null,
  },
  {
    id: 5,
    name: "Захисний кожух датчика",
    material: "PETG",
    printTime: "4 год 30 хв",
    category: "Електроніка",
    description:
      "Термостійкий кожух для датчика кисню (лямбда-зонд). PETG витримує вібрації та вологу. Шари 0.15мм, заповнення 50%, друк при 240°C з активним охолодженням.",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=480&auto=format&fit=crop",
    stlUrl: null,
    stlName: null,
  },
  {
    id: 6,
    name: "Lamborghini Veneno",
    material: "PLA",
    printTime: "11 год 40 хв",
    category: "Автомоделі",
    description:
      "Масштабна модель суперкара Lamborghini Veneno 2013 року. Друк при 210°C, висота шару 0.1мм для максимальної деталізації обтічних кузовних ліній. Заповнення 15% — деталь декоративна. У слайсері рекомендується розбити на частини (кузов, колеса, антикрило) для кращої якості поверхні.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=480&auto=format&fit=crop",
    stlUrl: "/Lamborghini_Veneno(3).3mf",
    stlName: "Lamborghini_Veneno(3).3mf",
  },
  {
    id: 7,
    name: "De Tomaso Pantera Nera",
    material: "PETG",
    printTime: "9 год 15 хв",
    category: "Автомоделі",
    description:
      "Модель класичного італійського спорткара De Tomaso Pantera у чорному кольорі. PETG забезпечує гарний глянець без постобробки. Друк при 235°C, заповнення 20%, підтримки необхідні для арок коліс. Висота шару 0.15мм, 3 периметри для чіткості деталей кузова.",
    image: "https://images.unsplash.com/photo-1558618047-f4e60f7f47d3?w=480&auto=format&fit=crop",
    stlUrl: "/pantera_nera.3mf",
    stlName: "pantera_nera.3mf",
  },
  {
    id: 8,
    name: "Minecraft Creeper",
    material: "PLA",
    printTime: "2 год 50 хв",
    category: "Фігурки",
    description:
      "Фігурка Крипера з гри Minecraft. Проста кубічна геометрія ідеально підходить для початківців. Друк при 210°C, заповнення 15%, висота шару 0.2мм. Можна друкувати у зеленому PLA без підтримок. У Blender модель побудована з примітивів Box Modeling методом.",
    image: "https://images.unsplash.com/photo-1607016284318-d1384f74f0e6?w=480&auto=format&fit=crop",
    stlUrl: "/minecraft-creeper.3mf",
    stlName: "minecraft-creeper.3mf",
  },
  {
    id: 9,
    name: "DJ Cat",
    material: "PLA",
    printTime: "4 год 20 хв",
    category: "Фігурки",
    description:
      "Деталізована фігурка кота-діджея з навушниками та вертушкою. Друк при 210°C, висота шару 0.1мм для передачі дрібних деталей шерсті та обладнання. Заповнення 10% — суто декоративна модель. Підтримки потрібні під лапами та навушниками. Рекомендується білий або чорний PLA.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=480&auto=format&fit=crop",
    stlUrl: "/DJ_Cat.3mf",
    stlName: "DJ_Cat.3mf",
  },
];

// Масив доступних матеріалів для фільтрації
export const materials = ["Всі", "TPU", "PLA", "PETG", "ABS"];

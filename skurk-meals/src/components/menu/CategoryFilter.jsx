import "./CategoryFilter.css";

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const categories = [
    "Alla rätter",
    "Nötkött",
    "Kyckling",
    "Fisk",
    "Vegetariskt",
  ];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-filter-button active"
              : "category-filter-button"
          }
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
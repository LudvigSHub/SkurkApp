import "./CategoryFilter.css";

function CategoryFilter({ selectedFilter, onSelectFilter }) {
  const filters = [
    "Alla rätter",
    "Nötkött",
    "Kyckling",
    "Fisk",
    "Vegetariskt",
    "Favoriter",
  ];

  return (
    <div className="category-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          className={
            selectedFilter === filter
              ? "category-filter-button active"
              : "category-filter-button"
          }
          onClick={() => onSelectFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
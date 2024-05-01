import { useState } from "react";

const useFilterAndSort = (
  initialFilterBy = "date_added",
  initialSortBy = "asc"
) => {
  const [filterBy, setFilterBy] = useState(initialFilterBy);
  const [sortBy, setSortBy] = useState(initialSortBy);

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSortToggle = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  return { filterBy, sortBy, handleFilterChange, handleSortToggle };
};

export default useFilterAndSort;

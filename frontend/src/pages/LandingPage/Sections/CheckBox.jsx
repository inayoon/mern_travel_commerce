import React from "react";

export default function Checkbox({ continents, checkedContinents, onFilters }) {
  const handleToggle = (continentId) => {
    const currentIndex = checkedContinents.indexOf(continentId);
    const newChecked = [...checkedContinents];
    if (currentIndex === -1) {
      newChecked.push(continentId);
    } else {
      // already had index then remove it
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };
  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md">
      {continents?.map((continent) => (
        <div key={continent._id}>
          <input
            type="checkbox"
            onChange={() => handleToggle(continent._id)}
            checked={
              checkedContinents.indexOf(continent._id) === -1 ? false : true
            }
          />{" "}
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  );
}

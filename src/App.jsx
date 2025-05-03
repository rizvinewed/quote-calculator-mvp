import { useState } from "react";

const meals = [
  { name: "Chicken Teriyaki", price: 12 },
  { name: "Beef Bulgogi", price: 14 },
  { name: "Vegetarian Sushi", price: 10 },
];

const sides = [
  { name: "Miso Soup", price: 3 },
  { name: "Spring Rolls", price: 4 },
  { name: "Seaweed Salad", price: 3 },
];

export default function App() {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [guests, setGuests] = useState(1);

  const toggleSelection = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const totalMeal = selectedMeals.reduce(
    (sum, name) => sum + meals.find((m) => m.name === name).price,
    0
  );
  const totalSide = selectedSides.reduce(
    (sum, name) => sum + sides.find((s) => s.name === name).price,
    0
  );
  const total = guests * (totalMeal + totalSide);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Catering Quote Calculator</h2>

      <div>
        <strong>Select Meals:</strong>
        {meals.map((meal) => (
          <div key={meal.name}>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleSelection(meal.name, selectedMeals, setSelectedMeals)}
                checked={selectedMeals.includes(meal.name)}
              />
              {` ${meal.name} ($${meal.price})`}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Select Sides:</strong>
        {sides.map((side) => (
          <div key={side.name}>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleSelection(side.name, selectedSides, setSelectedSides)}
                checked={selectedSides.includes(side.name)}
              />
              {` ${side.name} ($${side.price})`}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <label>
          <strong>Guests:</strong>
          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
            style={{ marginLeft: 10, width: 60 }}
          />
        </label>
      </div>

      <h3 style={{ marginTop: 30 }}>Estimated Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
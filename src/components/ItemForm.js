import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { name, category, isInCart: false };
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddItem(data.item);
        setName("");
        setCategory("Produce");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }

  return (
    <form className="ItemForm" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category
        <select

          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;

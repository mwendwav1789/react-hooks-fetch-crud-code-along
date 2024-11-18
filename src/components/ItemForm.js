import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    const itemData = {
      name: name,
      category: category,
      isInCart: false, // Initially, the item is not in the cart
    };

    // Send the new item data to the backend
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => {
        // Pass the newly added item back to the parent via onAddItem
        onAddItem(newItem);
      });

    // Reset form fields after submission
    setName("");
    setCategory("Produce");
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update the name state
        />
      </label>

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Update the category state
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

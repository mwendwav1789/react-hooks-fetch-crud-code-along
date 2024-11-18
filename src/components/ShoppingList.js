import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  // Handle adding a new item
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // Handle toggling the inCart status
  function handleToggleInCart(id, newInCartStatus) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isInCart: newInCartStatus } : item
      )
    );
  }

  // Handle deleting an item
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // Filter items based on selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} /> {/* Add new item */}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleInCart={handleToggleInCart} // Toggle inCart status
            onDeleteItem={handleDeleteItem} // Delete item
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

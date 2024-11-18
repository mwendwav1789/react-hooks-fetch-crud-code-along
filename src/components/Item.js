import React from "react";

function Item({ item, onToggleInCart, onDeleteItem }) {
  const { id, name, category, isInCart } = item;

  // Handle the toggle of inCart status
  const handleToggleInCart = () => {
    onToggleInCart(id, !isInCart); // Pass the id and the opposite of current status
  };

  // Handle item deletion
  const handleDeleteItem = () => {
    onDeleteItem(id); // Pass the item id to the parent to delete the item
  };

  return (
    <li>
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Status: {isInCart ? "In Cart" : "Not in Cart"}</p>

      {/* Toggle in cart button */}
      <button onClick={handleToggleInCart}>
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>

      {/* Delete button */}
      <button onClick={handleDeleteItem}>Delete</button>
    </li>
  );
}

export default Item;

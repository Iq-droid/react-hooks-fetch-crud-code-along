import React from "react";

function Item({ item, onToggleCartStatus, onDeleteItem }) {
  function handleClick() {
    const updatedItem = { ...item, isInCart: !item.isInCart };
    onToggleCartStatus(updatedItem);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={() => onDeleteItem(item.id)}>
        Delete
      </button>
    </li>
  );
}

export default Item;

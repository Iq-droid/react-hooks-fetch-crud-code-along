import React from "react";
import Item from "./Item";

function ShoppingList({ items, onToggleCartStatus, onDeleteItem }) {
  return (
    <ul className="ShoppingList">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onToggleCartStatus={onToggleCartStatus}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
    
  );
}

export default ShoppingList;


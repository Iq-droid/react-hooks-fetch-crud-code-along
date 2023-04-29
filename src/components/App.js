import React, { useState, useEffect } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import Filter from "./Filter";
import Item from "./Item";
import ItemForm from "./ItemForm";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  function handleAddItem(item) {
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems((items) => [...items, data]);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }

  function handleUpdateItem(updatedItem) {
    fetch(`http://localhost:4000/items/${updatedItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = items.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  }

  function handleDeleteItem(itemId) {
    fetch(`http://localhost:4000/items/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  function handleToggleCartStatus(itemId) {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, isInCart: !item.isInCart };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function filterItemsByCategory() {
    if (selectedCategory === 'All') {
      return items;
    }
    return items.filter((item) => item.category === selectedCategory);
  }

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ShoppingList
        items={filterItemsByCategory()}
        onAddItem={handleAddItem}
        onToggleCartStatus={handleToggleCartStatus}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
      <ItemForm onAddItem={handleAddItem} />
    </div>
  );
}

export default App;

import React, { useState } from "react";

function ItemList() {
  // 1. State for the list (Array) and the current input text
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // 2. Add Item Function
  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = {
        id: Date.now(), // Unique identifier
        text: inputValue
      };
      setItems([...items, newItem]); // Adding to array
      setInputValue(""); // Reset input field
    }
  };

  // 3. Remove Item Function
  const removeItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
  };

  return (
    <div className="list-container">
      <h2>My Task List</h2>

      {/* --- Input Logic Section --- */}
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter item name..." 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* --- Display Logic Section --- */}
      <div className="display-section">
        {items.length === 0 ? (
          <p>No items in the list. Add some!</p> // Conditional Rendering
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}> 
                {item.text}
                <button className="delete-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ItemList;
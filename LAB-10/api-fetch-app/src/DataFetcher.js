import React, { useState, useEffect } from "react";

function DataFetcher() {
  const [users, setUsers] = useState([]);      // State for data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);    // State for errors

  useEffect(() => {
    // Asynchronous function to fetch data
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Conditional Rendering ---
  if (loading) return <div className="loader">Loading users...</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>User Directory</h2>
      <div className="grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataFetcher;
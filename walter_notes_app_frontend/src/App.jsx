
import React, { useState, useEffect } from 'react';
import Login from './Login'; 
import NoteList from './NoteList'; 
import NoteForm from './NoteForm'; 


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchNotes(storedToken); 
    }
  }, []);


  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        setMessage('Login successful!');
        fetchNotes(data.token); 
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken('');
    setIsLoggedIn(false);
    setNotes([]);
    setMessage('Logged out successfully.');
  };


  const fetchNotes = async (currentToken) => {
    try {
      const response = await fetch('http://localhost:3001/items', {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setNotes(Array.isArray(data) ? data : []);
      } else {
        setMessage('Failed to fetch notes. Please log in again.');

        if (response.status === 401) {
          handleLogout();
        }
        setNotes([]); 
      }
    } catch (error) {
      console.error('Fetch notes error:', error);
      setMessage('An error occurred while fetching notes.');
      setNotes([]); 
    }
  };


  const handleSaveNote = async (note) => {
    const method = note.id ? 'PUT' : 'POST';
    const url = note.id ? `http://localhost:3001/items/${note.id}` : 'http://localhost:3001/items';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        setMessage(`Note ${note.id ? 'updated' : 'added'} successfully!`);
        setEditingNote(null); 
        fetchNotes(token);
      } else {
        const errorData = await response.json();
        setMessage(`Failed to save note: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Save note error:', error);
      setMessage('An error occurred while saving the note.');
    }
  };


  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 204) { 
        setMessage('Note deleted successfully!');
        fetchNotes(token); 
      } else {
        const errorData = await response.json();
        setMessage(`Failed to delete note: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Delete note error:', error);
      setMessage('An error occurred while deleting the note.');
    }
  };

  const startEditing = (note) => {
    setEditingNote(note);
  };


  const cancelEditing = () => {
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Note Management App</h1>

        {message && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">Welcome!</h2>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>

            <NoteForm
              onSave={handleSaveNote}
              editingNote={editingNote}
              onCancelEdit={cancelEditing}
            />

            <NoteList
              notes={notes}
              onEdit={startEditing}
              onDelete={handleDeleteNote}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

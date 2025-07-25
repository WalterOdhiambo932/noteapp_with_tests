
import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSave, editingNote, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState(null); 

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setId(editingNote.id);
    } else {
  
      setTitle('');
      setContent('');
      setId(null);
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id, title, content });
  };

  const handleCancel = () => {
    onCancelEdit(); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6 mt-6 border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700">{id ? 'Edit Note' : 'Add New Note'}</h3>
      <div>
        <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
        <input
          type="text"
          id="noteTitle"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 mb-1">Content:</label>
        <textarea
          id="noteContent"
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          {id ? 'Update Note' : 'Add Note'}
        </button>
        {id && ( 
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;

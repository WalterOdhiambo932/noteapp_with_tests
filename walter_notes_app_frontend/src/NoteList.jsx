
import React from 'react';

const NoteList = ({ notes = [], onEdit, onDelete }) => {


  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Notes</h3>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-800">{note.title}</h4>
                <p className="text-gray-600 text-sm">{note.content}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex space-x-2">
                <button
                  onClick={() => onEdit(note)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg text-sm shadow-md transition duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(note.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm shadow-md transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;

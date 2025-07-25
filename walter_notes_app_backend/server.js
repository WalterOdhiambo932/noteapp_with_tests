// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3001;


let notes = [
    { id: '1', title: 'First Note', content: 'This is the content of the first note.' },
    { id: '2', title: 'Second Note', content: 'This is the content of the second note.' },
];


app.use(cors()); 
app.use(bodyParser.json());


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token === null || token !== 'fake-token') { 
        return res.sendStatus(401); 
    }
    next();
};


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'testuser' && password === 'testpass') {
        res.json({ message: 'Login successful!', token: 'fake-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.get('/items', authenticateToken, (req, res) => {
    res.json(notes);
});




app.get('/items/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const note = notes.find(note => note.id === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found.' });
    }
});

app.post('/items', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }
    const newNote = {
        id: Date.now().toString(), 
        title,
        content,
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});


app.put('/items/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found.' });
    }

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    notes[noteIndex] = { ...notes[noteIndex], title, content };
    res.json(notes[noteIndex]);
});

// DELETE a note 
app.delete('/items/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const initialLength = notes.length;
    notes = notes.filter(note => note.id !== id);

    if (notes.length === initialLength) {
        return res.status(404).json({ message: 'Note not found.' });
    }
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});

module.exports = app; // Export app for testing

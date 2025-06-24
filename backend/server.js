// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Schema for Book
const bookSchema = new mongoose.Schema({
    BookTitle: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    Author: { type: String, required: true },
    Category: { type: String, required: true },
    Quantity: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/EndsemBookSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));


// Routes

// Add a new book
app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Search book by ISBN
app.get('/api/books/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ ISBN: req.params.isbn });
        if (book) res.json(book);
        else res.status(404).json({ message: 'Book not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete book by ISBN
app.delete('/api/books/:isbn', async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ ISBN: req.params.isbn });
        if (book) res.json({ message: 'Book deleted successfully' });
        else res.status(404).json({ message: 'Book not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Display all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update book details by ISBN
app.put('/api/books/:isbn', async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { ISBN: req.params.isbn },
            req.body,
            { new: true }
        );
        if (book) res.json({ message: 'Book updated successfully', book });
        else res.status(404).json({ message: 'Book not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

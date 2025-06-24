import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">All Books</h3>
            <div className="form-group">
                <label htmlFor="booksList">Books List</label>
                <textarea
                    id="booksList"
                    className="form-control"
                    rows="10"
                    value={JSON.stringify(books, null, 2)}
                    readOnly
                />
            </div>
        </div>
    );
}

export default DisplayBooks;

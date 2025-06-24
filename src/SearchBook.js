import React, { useState } from 'react';
import axios from 'axios';

function SearchBook() {
    const [isbn, setIsbn] = useState('');
    const [book, setBook] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/books/${isbn}`);
            setBook(response.data);
        } catch (err) {
            alert('Book not found');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Search Book by ISBN</h3>
            <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input
                    type="text"
                    className="form-control"
                    id="isbn"
                    placeholder="Enter ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
            </div>
            <button onClick={handleSearch} className="btn btn-primary">Search</button>

            {book && (
                <div className="mt-4">
                    <h4>Book Details:</h4>
                    <pre>{JSON.stringify(book, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default SearchBook;

import React, { useState } from 'react';
import axios from 'axios';

function DeleteBook() {
    const [isbn, setIsbn] = useState('');

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${isbn}`);
            alert('Book deleted successfully');
        } catch (err) {
            alert('Book not found');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Delete Book</h3>
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
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
    );
}

export default DeleteBook;

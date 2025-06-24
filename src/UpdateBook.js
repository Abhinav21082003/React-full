import React, { useState } from 'react';
import axios from 'axios';

function UpdateBook() {
    const [isbn, setIsbn] = useState('');
    const [formData, setFormData] = useState({
        BookTitle: '',
        Author: '',
        Category: '',
        Quantity: '1'
    });
    const [bookFound, setBookFound] = useState(false);

    // Fetch book details by ISBN
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/books/${isbn}`);
            setFormData(response.data);
            setBookFound(true);
        } catch (err) {
            alert('Book not found');
            setBookFound(false);
        }
    };

    // Update form data as the user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit updated book data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/books/${isbn}`, formData);
            alert('Book updated successfully');
        } catch (err) {
            alert('Error updating book');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Update Book Details by ISBN</h3>
            <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input
                    type="text"
                    id="isbn"
                    className="form-control"
                    placeholder="Enter ISBN to search"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
            </div>
            <button onClick={handleSearch} className="btn btn-primary mb-3">Search</button>

            {bookFound && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="BookTitle">Book Title</label>
                        <input
                            type="text"
                            name="BookTitle"
                            id="BookTitle"
                            className="form-control"
                            placeholder="Book Title"
                            onChange={handleChange}
                            value={formData.BookTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Author">Author</label>
                        <input
                            type="text"
                            name="Author"
                            id="Author"
                            className="form-control"
                            placeholder="Author"
                            onChange={handleChange}
                            value={formData.Author}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <div>
                            <label className="mr-2">
                                <input
                                    type="radio"
                                    name="Category"
                                    value="Fiction"
                                    onChange={handleChange}
                                    checked={formData.Category === 'Fiction'}
                                />
                                Fiction
                            </label>
                            <label className="mr-2">
                                <input
                                    type="radio"
                                    name="Category"
                                    value="Non-Fiction"
                                    onChange={handleChange}
                                    checked={formData.Category === 'Non-Fiction'}
                                />
                                Non-Fiction
                            </label>
                            <label className="mr-2">
                                <input
                                    type="radio"
                                    name="Category"
                                    value="Science"
                                    onChange={handleChange}
                                    checked={formData.Category === 'Science'}
                                />
                                Science
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Quantity">Quantity:</label>
                        <select
                            name="Quantity"
                            id="Quantity"
                            className="form-control"
                            onChange={handleChange}
                            value={formData.Quantity}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Update Book</button>
                </form>
            )}
        </div>
    );
}

export default UpdateBook;

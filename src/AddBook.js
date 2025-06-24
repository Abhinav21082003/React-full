import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
    const [formData, setFormData] = useState({
        BookTitle: '',
        ISBN: '',
        Author: '',
        Category: '',
        Quantity: '1'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/books', formData);
            alert('Book added successfully');
            setFormData({ BookTitle: '', ISBN: '', Author: '', Category: '', Quantity: '1' });
        } catch (err) {
            alert('Error adding book');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4">Add Book</h3>

                <div className="form-group">
                    <label htmlFor="BookTitle">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="BookTitle"
                        name="BookTitle"
                        placeholder="Enter Book Title"
                        onChange={handleChange}
                        value={formData.BookTitle}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ISBN">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ISBN"
                        name="ISBN"
                        placeholder="Enter ISBN"
                        onChange={handleChange}
                        value={formData.ISBN}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Author">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Author"
                        name="Author"
                        placeholder="Enter Author Name"
                        onChange={handleChange}
                        value={formData.Author}
                    />
                </div>
                
                <div className="form-group">
                    <label>Category:</label><br></br>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="Category"
                            value="Fiction"
                            onChange={handleChange}
                            checked={formData.Category === 'Fiction'}
                        />
                        <label className="form-check-label">Fiction</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="Category"
                            value="Non-Fiction"
                            onChange={handleChange}
                            checked={formData.Category === 'Non-Fiction'}
                        />
                        <label className="form-check-label">Non-Fiction</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="Category"
                            value="Science"
                            onChange={handleChange}
                            checked={formData.Category === 'Science'}
                        />
                        <label className="form-check-label">Science</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Quantity">Quantity</label>
                    <select
                        className="form-control"
                        name="Quantity"
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

                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;

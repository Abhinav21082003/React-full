import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBook from './AddBook';
import SearchBook from './SearchBook';
import DeleteBook from './DeleteBook';
import DisplayBooks from './DisplayBooks';
import UpdateBook from './UpdateBook'; // Import the UpdateBook component

function App() {
    return (
        <Router>
            <div className="container mt-5">
                <h2>Book Inventory Management System</h2>
                <nav className="nav nav-pills nav-fill">
                    <li><Link className="nav-link" to="/add-book">Add Book</Link></li>
                    <li><Link className="nav-link" to="/search-book">Search Book by ISBN</Link></li>
                    <li><Link className="nav-link" to="/delete-book">Delete Book</Link></li>
                    <li><Link className="nav-link" to="/display-books">Display All Books</Link></li>
                    <li><Link className="nav-link" to="/update-book">Update Book</Link> </li>
                </nav>
                <Routes>
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/search-book" element={<SearchBook />} />
                    <Route path="/delete-book" element={<DeleteBook />} />
                    <Route path="/display-books" element={<DisplayBooks />} />
                    <Route path="/update-book" element={<UpdateBook />} /> {/* Add UpdateBook route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import './App.css'
import ProductsList from './components/Products/ProductsList';
import UsersList from './components/Users/UsersList'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-start py-8">
        <Navbar />
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<div className="bg-blue-50 rounded-lg shadow p-6"><ProductsList /></div>} />
            <Route path="/usuarios" element={<div className="bg-blue-50 rounded-lg shadow p-6"><UsersList /></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
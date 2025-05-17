//import './App.css'
import ProductsList from './components/Products/ProductsList';
import UsersList from './components/Users/UsersList'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/common/ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
        <Navbar />
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        <main className="flex-grow flex flex-col items-center py-8">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mt-4 mb-8">
            <Routes>
              <Route path="/" element={
                <ErrorBoundary section="inicio">
                  <Home />
                </ErrorBoundary>
              } />
              <Route path="/productos" element={
                <ErrorBoundary section="productos">
                  <div className="bg-blue-50 rounded-lg shadow p-6">
                    <ProductsList />
                  </div>
                </ErrorBoundary>
              } />
              <Route path="/usuarios" element={
                <ErrorBoundary section="usuarios">
                  <div className="bg-blue-50 rounded-lg shadow p-6">
                    <UsersList />
                  </div>
                </ErrorBoundary>
              } />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
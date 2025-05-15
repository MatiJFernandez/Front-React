//import './App.css'
import ProductsList from './components/Products/ProductsList';
import UsersList from './components/Users/UsersList'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Mi App de Productos y Usuarios
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <ProductsList />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


import './App.css'
import ProductsList from './components/Products/ProductsList';
import UsersList from './components/Users/UsersList'; 

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold p-4">Mi App de Productos y Usuarios</h1>
      <ProductsList />
      <UsersList />
    </div>
  );
}

export default App;


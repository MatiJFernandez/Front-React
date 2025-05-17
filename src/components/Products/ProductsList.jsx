import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';   
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/productos';

export default function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

  const fetchProductos = () => {
    axios.get(API_URL)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleProductSaved = (productoActualizado) => {
    const yaExiste = productos.some(p => p.id === productoActualizado.id);
    if (yaExiste) {
      setProductos(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
      toast.info('Producto actualizado correctamente');
    } else {
      setProductos(prev => [...prev, productoActualizado]);
      toast.success('Producto agregado correctamente');
    }
    setProductoEditar(null);
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos(prev => prev.filter((prod) => prod.id !== id));
      toast.error('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      toast.error('Error al eliminar producto');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold text-blue-700 flex items-center gap-2">
        <span className="text-2xl">📦</span> Lista de Productos
      </h2>
      <ProductForm
        onProductSaved={handleProductSaved}
        productoEditar={productoEditar}
        limpiarEdicion={() => setProductoEditar(null)}
      />
      <div className="overflow-x-auto mt-6 rounded-lg shadow border border-blue-100 bg-white">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Precio</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {productos.map((row) => (
              <tr key={row.id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2 text-sm text-blue-900">{row.id}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{row.nombre}</td>
                <td className="px-4 py-2 text-sm text-blue-900">${row.precio}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded shadow transition"
                      onClick={() => setProductoEditar(row)}
                      title="Editar"
                    >
                      <i className="pi pi-pencil" />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow transition"
                      onClick={() => eliminarProducto(row.id)}
                      title="Eliminar"
                    >
                      <i className="pi pi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

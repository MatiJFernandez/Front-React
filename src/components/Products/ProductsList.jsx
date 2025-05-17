import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';   
import { toast } from 'react-toastify';
import { exportProductsToPDF } from '../../utils/pdfExport';
import TableSkeleton from '../common/TableSkeleton';
import { Button } from 'primereact/button';

const API_URL = 'http://localhost:3000/productos';

export default function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      toast.promise(
        Promise.reject(err),
        {
          error: 'No se pudieron cargar los productos. Por favor, intente nuevamente.'
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleProductSaved = (productoActualizado) => {
    const yaExiste = productos.some(p => p.id === productoActualizado.id);
    if (yaExiste) {
      setProductos(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
      toast.promise(
        Promise.resolve(productoActualizado),
        {
          success: 'Producto actualizado correctamente',
          error: 'Error al actualizar el producto'
        }
      );
    } else {
      setProductos(prev => [...prev, productoActualizado]);
      toast.promise(
        Promise.resolve(productoActualizado),
        {
          success: 'Producto agregado correctamente',
          error: 'Error al agregar el producto'
        }
      );
    }
    setProductoEditar(null);
  };

  const eliminarProducto = async (id) => {
    try {
      await toast.promise(
        axios.delete(`${API_URL}/${id}`),
        {
          pending: 'Eliminando producto...',
          success: 'Producto eliminado correctamente',
          error: 'Error al eliminar el producto'
        }
      );
      setProductos(prev => prev.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <span className="text-2xl">📦</span> Lista de Productos
        </h2>
        <button
          onClick={() => exportProductsToPDF(productos)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition flex items-center gap-2"
          title="Exportar a PDF"
          disabled={isLoading || productos.length === 0}
        >
          <i className="pi pi-file-pdf" /> Exportar PDF
        </button>
      </div>
      <ProductForm
        onProductSaved={handleProductSaved}
        productoEditar={productoEditar}
        limpiarEdicion={() => setProductoEditar(null)}
      />
      <div className="overflow-x-auto mt-6 rounded-lg shadow border border-blue-100 bg-white">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={5} columns={4} />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <span className="text-2xl">🛒</span> Lista de Productos
        </h2>
        <button
          onClick={() => exportProductsToPDF(productos)}
          className="
            bg-green-500 hover:bg-green-600 
            text-white font-bold 
            py-2 px-4 rounded shadow 
            transition flex items-center gap-2
            w-full sm:w-auto
            justify-center
            text-sm sm:text-base
          "
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
      <div className="mt-6">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={5} columns={4} />
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-blue-100 bg-white">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                  {productos.map(producto => (
                    <tr key={producto.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{producto.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{producto.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${producto.precio.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setProductoEditar(producto)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                            title="Editar producto"
                          >
                            <i className="pi pi-pencil" />
                          </button>
                          <button
                            onClick={() => eliminarProducto(producto.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                            title="Eliminar producto"
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
            <div className="md:hidden space-y-4">
              {productos.map(producto => (
                <div 
                  key={producto.id}
                  className="
                    bg-white rounded-lg shadow 
                    border border-blue-100 
                    p-4
                    hover:shadow-md transition-shadow
                  "
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-blue-700">{producto.nombre}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setProductoEditar(producto)}
                        className="
                          text-blue-600 hover:text-blue-900 
                          p-2 rounded-full 
                          hover:bg-blue-100 
                          transition-colors
                        "
                        title="Editar producto"
                      >
                        <i className="pi pi-pencil" />
                      </button>
                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="
                          text-red-600 hover:text-red-900 
                          p-2 rounded-full 
                          hover:bg-red-100 
                          transition-colors
                        "
                        title="Eliminar producto"
                      >
                        <i className="pi pi-trash" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="pi pi-id-card text-blue-500" />
                      <span>ID: {producto.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="pi pi-dollar text-blue-500" />
                      <span>${producto.precio.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

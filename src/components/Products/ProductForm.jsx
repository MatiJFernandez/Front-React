import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';

const API_URL = 'http://localhost:3000/productos';

export default function ProductForm({ onProductSaved, productoEditar, limpiarEdicion }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre);
      setPrecio(productoEditar.precio);
    }
  }, [productoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productoEditar) {
        // Modo edición
        const actualizado = { ...productoEditar, nombre, precio };
        const res = await axios.put(`${API_URL}/${productoEditar.id}`, actualizado);
        onProductSaved(res.data);
      } else {
        // Modo creación
        const nuevo = { nombre, precio };
        const res = await axios.post(API_URL, nuevo);
        onProductSaved(res.data);
      }
      setNombre('');
      setPrecio(0);
      limpiarEdicion(); // Para volver al modo "crear"
    } catch (error) {
      console.error('Error al guardar producto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-4 items-stretch border border-blue-100 md:flex-row md:flex-wrap md:items-end">
      <div className="flex flex-col flex-1 min-w-[180px]">
        <label className="mb-1 text-sm font-semibold text-blue-700">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          className="p-2 border border-blue-300 bg-blue-50 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition w-full outline-none"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label className="mb-1 text-sm font-semibold text-blue-700">Precio</label>
        <input
          type="number"
          value={precio}
          onChange={e => setPrecio(Number(e.target.value))}
          required
          min="0"
          step="0.01"
          className="p-2 border border-blue-300 bg-blue-50 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition w-full outline-none"
        />
      </div>
      {/* Si agregas más inputs, usa el mismo patrón: flex-1 min-w-[180px] */}
      <div className="flex flex-row gap-2 md:flex-col md:justify-end flex-none min-w-[140px]">
        <button
          type="submit"
          className="h-10 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded shadow hover:from-blue-600 hover:to-blue-800 border-0 transition w-full md:w-auto"
        >
          {productoEditar ? 'Actualizar' : 'Agregar'}
        </button>
        {productoEditar && (
          <button
            type="button"
            onClick={limpiarEdicion}
            className="h-10 px-6 bg-gray-300 text-gray-800 font-bold rounded shadow border-0 transition w-full md:w-auto flex items-center justify-center gap-2"
          >
            <i className="pi pi-times" /> Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

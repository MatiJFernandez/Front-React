import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:flex-wrap gap-4 items-stretch border border-blue-100">
      <div className="flex flex-col flex-1 min-w-[180px]">
        <label className="mb-1 text-sm font-semibold text-blue-700">Nombre</label>
        <InputText value={nombre} onChange={(e) => setNombre(e.target.value)} required className="p-inputtext-sm border border-blue-300 bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"/>
      </div>
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label className="mb-1 text-sm font-semibold text-blue-700">Precio</label>
        <InputNumber value={precio} onValueChange={(e) => setPrecio(e.value)} required mode="currency" currency="ARS" locale="es-AR" className="w-full p-inputtext-sm border border-blue-300 bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"/>
      </div>
      <div className="flex flex-row gap-2 mt-2 md:mt-0 md:flex-col md:justify-end">
        <Button label={productoEditar ? 'Actualizar' : 'Agregar'} icon="pi pi-save" type="submit" className="h-10 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded shadow hover:from-blue-600 hover:to-blue-800 border-0 transition"/>
        {productoEditar && (
          <Button label="Cancelar" icon="pi pi-times" className="h-10 px-6 p-button-secondary font-bold rounded shadow border-0 transition" onClick={limpiarEdicion} type="button" />
        )}
      </div>
    </form>
  );
}

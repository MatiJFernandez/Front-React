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
    <form onSubmit={handleSubmit} className="p-4 flex gap-4 items-end">
      <div className="flex flex-col">
        <label>Nombre</label>
        <InputText value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Precio</label>
        <InputNumber value={precio} onValueChange={(e) => setPrecio(e.value)} required mode="currency" currency="ARS" locale="es-AR" />
      </div>
      <Button label={productoEditar ? 'Actualizar' : 'Agregar'} icon="pi pi-save" type="submit" />
      {productoEditar && (
        <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={limpiarEdicion} type="button" />
      )}
    </form>
  );
}

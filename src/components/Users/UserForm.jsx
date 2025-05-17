// src/components/Users/UserForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';

const API_URL = 'http://localhost:3000/usuarios';

export default function UserForm({ usuarioEditar, onUsuarioGuardado, limpiarEdicion }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState(0);

  useEffect(() => {
    if (usuarioEditar) {
      setNombre(usuarioEditar.nombre);
      setEmail(usuarioEditar.email);
      setEdad(usuarioEditar.edad);
    }
  }, [usuarioEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, email, edad };

    try {
      if (usuarioEditar) {
        const res = await axios.put(`${API_URL}/${usuarioEditar.id}`, { ...usuarioEditar, ...data });
        onUsuarioGuardado(res.data);
      } else {
        const res = await axios.post(API_URL, data);
        onUsuarioGuardado(res.data);
      }
      setNombre('');
      setEmail('');
      setEdad(0);
      limpiarEdicion();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-end gap-4 items-stretch border border-blue-100">
      <div className="flex flex-col min-w-0 flex-1">
        <label className="mb-1 text-sm font-semibold text-blue-700">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          className="p-2 border border-blue-300 bg-blue-50 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition w-full outline-none"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <label className="mb-1 text-sm font-semibold text-blue-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 border border-blue-300 bg-blue-50 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition w-full outline-none"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <label className="mb-1 text-sm font-semibold text-blue-700">Edad</label>
        <input
          type="number"
          value={edad}
          onChange={e => setEdad(Number(e.target.value))}
          required
          min="0"
          className="p-2 border border-blue-300 bg-blue-50 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition w-full outline-none"
        />
      </div>
      <div className="flex flex-row gap-2 md:flex-col md:justify-end">
        <button
          type="submit"
          className="h-10 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded shadow hover:from-blue-600 hover:to-blue-800 border-0 transition w-full md:w-auto"
        >
          {usuarioEditar ? 'Actualizar' : 'Agregar'}
        </button>
        {usuarioEditar && (
          <Button label="Cancelar" icon="pi pi-times" className="h-10 px-6 p-button-secondary font-bold rounded shadow border-0 transition w-full md:w-auto" type="button" onClick={limpiarEdicion} />
        )}
      </div>
    </form>
  );
}

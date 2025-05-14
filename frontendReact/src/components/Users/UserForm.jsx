// src/components/Users/UserForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
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
    <form onSubmit={handleSubmit} className="p-4 flex gap-4 items-end flex-wrap">
      <div className="flex flex-col">
        <label>Nombre</label>
        <InputText value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Edad</label>
        <InputNumber value={edad} onValueChange={(e) => setEdad(e.value)} required />
      </div>
      <Button label={usuarioEditar ? 'Actualizar' : 'Agregar'} icon="pi pi-save" type="submit" />
      {usuarioEditar && (
        <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" type="button" onClick={limpiarEdicion} />
      )}
    </form>
  );
}

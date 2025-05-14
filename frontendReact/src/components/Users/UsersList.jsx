// src/components/Users/UsersList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import UserForm from './UserForm';

const API_URL = 'http://localhost:3000/usuarios';

export default function UsersList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);

  const handleUsuarioGuardado = (usuarioActualizado) => {
    const existe = usuarios.some(u => u.id === usuarioActualizado.id);
    if (existe) {
      setUsuarios(prev => prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
    } else {
      setUsuarios(prev => [...prev, usuarioActualizado]);
    }
    setUsuarioEditar(null);
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsuarios(prev => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const accionesTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => setUsuarioEditar(rowData)} />
      <Button icon="pi pi-trash" className="p-button-danger" onClick={() => eliminarUsuario(rowData.id)} />
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">👤 Lista de Usuarios</h2>
      <UserForm
        usuarioEditar={usuarioEditar}
        onUsuarioGuardado={handleUsuarioGuardado}
        limpiarEdicion={() => setUsuarioEditar(null)}
      />
      <DataTable value={usuarios} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="ID" />
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="edad" header="Edad" />
        <Column header="Acciones" body={accionesTemplate} />
      </DataTable>
    </div>
  );
}

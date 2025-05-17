// src/components/Users/UsersList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { toast } from 'react-toastify';

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
      toast.info('Usuario actualizado correctamente');
    } else {
      setUsuarios(prev => [...prev, usuarioActualizado]);
      toast.success('Usuario agregado correctamente');
    }
    setUsuarioEditar(null);
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsuarios(prev => prev.filter((u) => u.id !== id));
      toast.error('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('Error al eliminar usuario');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold text-blue-700 flex items-center gap-2">
        <span className="text-2xl">👤</span> Lista de Usuarios
      </h2>
      <UserForm
        usuarioEditar={usuarioEditar}
        onUsuarioGuardado={handleUsuarioGuardado}
        limpiarEdicion={() => setUsuarioEditar(null)}
      />
      <div className="overflow-x-auto mt-6 rounded-lg shadow border border-blue-100 bg-white">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Edad</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {usuarios.map((row) => (
              <tr key={row.id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2 text-sm text-blue-900">{row.id}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{row.nombre}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{row.email}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{row.edad}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded shadow transition"
                      onClick={() => setUsuarioEditar(row)}
                      title="Editar"
                    >
                      <i className="pi pi-pencil" />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow transition"
                      onClick={() => eliminarUsuario(row.id)}
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

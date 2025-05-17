// src/components/Users/UsersList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import { exportUsersToPDF } from '../../utils/pdfExport';
import TableSkeleton from '../common/TableSkeleton';

const API_URL = 'http://localhost:3000/usuarios';

export default function UsersList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(API_URL);
      setUsuarios(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      toast.promise(
        Promise.reject(err),
        {
          error: 'No se pudieron cargar los usuarios. Por favor, intente nuevamente.'
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleUsuarioGuardado = (usuarioActualizado) => {
    const existe = usuarios.some(u => u.id === usuarioActualizado.id);
    if (existe) {
      setUsuarios(prev => prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
      toast.promise(
        Promise.resolve(usuarioActualizado),
        {
          success: 'Usuario actualizado correctamente',
          error: 'Error al actualizar el usuario'
        }
      );
    } else {
      setUsuarios(prev => [...prev, usuarioActualizado]);
      toast.promise(
        Promise.resolve(usuarioActualizado),
        {
          success: 'Usuario agregado correctamente',
          error: 'Error al agregar el usuario'
        }
      );
    }
    setUsuarioEditar(null);
  };

  const eliminarUsuario = async (id) => {
    try {
      await toast.promise(
        axios.delete(`${API_URL}/${id}`),
        {
          pending: 'Eliminando usuario...',
          success: 'Usuario eliminado correctamente',
          error: 'Error al eliminar el usuario'
        }
      );
      setUsuarios(prev => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <span className="text-2xl">👤</span> Lista de Usuarios
        </h2>
        <button
          onClick={() => exportUsersToPDF(usuarios)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition flex items-center gap-2"
          title="Exportar a PDF"
          disabled={isLoading || usuarios.length === 0}
        >
          <i className="pi pi-file-pdf" /> Exportar PDF
        </button>
      </div>
      <UserForm
        usuarioEditar={usuarioEditar}
        onUsuarioGuardado={handleUsuarioGuardado}
        limpiarEdicion={() => setUsuarioEditar(null)}
      />
      <div className="overflow-x-auto mt-6 rounded-lg shadow border border-blue-100 bg-white">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={5} columns={5} />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

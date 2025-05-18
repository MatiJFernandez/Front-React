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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <span className="text-2xl">👤</span> Lista de Usuarios
        </h2>
        <button
          onClick={() => exportUsersToPDF(usuarios)}
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
      <div className="mt-6">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={5} columns={5} />
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-blue-100 bg-white">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Edad</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                  {usuarios.map(usuario => (
                    <tr key={usuario.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.edad}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setUsuarioEditar(usuario)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                            title="Editar usuario"
                          >
                            <i className="pi pi-pencil" />
                          </button>
                          <button
                            onClick={() => eliminarUsuario(usuario.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                            title="Eliminar usuario"
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
              {usuarios.map(usuario => (
                <div 
                  key={usuario.id}
                  className="
                    bg-white rounded-lg shadow 
                    border border-blue-100 
                    p-4
                    hover:shadow-md transition-shadow
                  "
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-blue-700">{usuario.nombre}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUsuarioEditar(usuario)}
                        className="
                          text-blue-600 hover:text-blue-900 
                          p-2 rounded-full 
                          hover:bg-blue-100 
                          transition-colors
                        "
                        title="Editar usuario"
                      >
                        <i className="pi pi-pencil" />
                      </button>
                      <button
                        onClick={() => eliminarUsuario(usuario.id)}
                        className="
                          text-red-600 hover:text-red-900 
                          p-2 rounded-full 
                          hover:bg-red-100 
                          transition-colors
                        "
                        title="Eliminar usuario"
                      >
                        <i className="pi pi-trash" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="pi pi-id-card text-blue-500" />
                      <span>ID: {usuario.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="pi pi-envelope text-blue-500" />
                      <span>{usuario.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="pi pi-calendar text-blue-500" />
                      <span>{usuario.edad} años</span>
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

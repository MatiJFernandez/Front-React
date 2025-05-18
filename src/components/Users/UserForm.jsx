// src/components/Users/UserForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <form 
      onSubmit={handleSubmit} 
      className="
        w-full max-w-2xl mx-auto 
        bg-white rounded-lg shadow 
        p-3 sm:p-6
        flex flex-col gap-3 sm:gap-4 
        border border-blue-100
        md:flex-row md:flex-wrap md:items-end
      "
    >
      {/* Grupo de campo Nombre */}
      <div className="flex flex-col flex-1 min-w-[140px] sm:min-w-[180px]">
        <label 
          htmlFor="nombre" 
          className="mb-1 text-sm font-semibold text-blue-700"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          placeholder="Ingrese el nombre"
          className="
            p-1.5 sm:p-2
            border border-blue-300 
            bg-blue-50 
            rounded 
            focus:border-blue-500 
            focus:ring-2 focus:ring-blue-200 
            transition w-full 
            outline-none
            text-sm sm:text-base md:text-lg
            placeholder:text-gray-400
          "
          aria-label="Nombre del usuario"
        />
      </div>

      {/* Grupo de campo Email */}
      <div className="flex flex-col flex-1 min-w-[140px] sm:min-w-[200px]">
        <label 
          htmlFor="email" 
          className="mb-1 text-sm font-semibold text-blue-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="ejemplo@email.com"
          className="
            p-1.5 sm:p-2
            border border-blue-300 
            bg-blue-50 
            rounded 
            focus:border-blue-500 
            focus:ring-2 focus:ring-blue-200 
            transition w-full 
            outline-none
            text-sm sm:text-base md:text-lg
            placeholder:text-gray-400
          "
          aria-label="Email del usuario"
        />
      </div>

      {/* Grupo de campo Edad */}
      <div className="flex flex-col flex-1 min-w-[120px] sm:min-w-[150px]">
        <label 
          htmlFor="edad" 
          className="mb-1 text-sm font-semibold text-blue-700"
        >
          Edad
        </label>
        <div className="relative">
          <input
            id="edad"
            type="number"
            value={edad}
            onChange={e => setEdad(Number(e.target.value))}
            required
            min="0"
            placeholder="0"
            className="
              p-1.5 sm:p-2
              border border-blue-300 
              bg-blue-50 
              rounded 
              focus:border-blue-500 
              focus:ring-2 focus:ring-blue-200 
              transition w-full 
              outline-none
              text-sm sm:text-base md:text-lg
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
              placeholder:text-gray-400
            "
            aria-label="Edad del usuario"
          />
        </div>
      </div>

      {/* Grupo de botones */}
      <div className="
        flex flex-row gap-2 
        md:flex-col md:justify-end 
        flex-none 
        min-w-[120px] sm:min-w-[140px]
        mt-2 md:mt-0
      ">
        <button
          type="submit"
          className="
            h-10 sm:h-12
            px-4 sm:px-6
            bg-gradient-to-r from-blue-500 to-blue-700 
            text-white font-bold 
            rounded shadow 
            hover:from-blue-600 hover:to-blue-800 
            border-0 
            transition 
            w-full md:w-auto
            flex items-center justify-center gap-1 sm:gap-2
            text-sm sm:text-base
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
          aria-label={usuarioEditar ? "Actualizar usuario" : "Agregar usuario"}
        >
          <i className={`pi ${usuarioEditar ? 'pi-save' : 'pi-plus'} text-sm sm:text-base`} />
          {usuarioEditar ? 'Actualizar' : 'Agregar'}
        </button>

        {usuarioEditar && (
          <button
            type="button"
            onClick={limpiarEdicion}
            className="
              h-10 sm:h-12
              px-4 sm:px-6
              bg-gray-200 
              text-gray-800 
              font-bold 
              rounded shadow 
              hover:bg-gray-300
              border-0 
              transition 
              w-full md:w-auto
              flex items-center justify-center gap-1 sm:gap-2
              text-sm sm:text-base
              focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            "
            aria-label="Cancelar edición"
          >
            <i className="pi pi-times text-sm sm:text-base" /> Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

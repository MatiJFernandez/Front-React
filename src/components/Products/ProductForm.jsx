import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:3000/productos';

export default function ProductForm({ onProductSaved, productoEditar, limpiarEdicion }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre);
      setPrecio(productoEditar.precio);
    }
  }, [productoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (productoEditar) {
        const actualizado = { ...productoEditar, nombre, precio };
        const res = await axios.put(`${API_URL}/${productoEditar.id}`, actualizado);
        onProductSaved(res.data);
      } else {
        const nuevo = { nombre, precio };
        const res = await axios.post(API_URL, nuevo);
        onProductSaved(res.data);
      }
      setNombre('');
      setPrecio(0);
      limpiarEdicion();
    } catch (error) {
      console.error('Error al guardar producto', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="
        w-full max-w-2xl mx-auto 
        bg-white rounded-lg shadow 
        p-3 sm:p-6
        flex flex-col gap-3 sm:gap-4
        border border-blue-100
        md:flex-row md:flex-wrap md:items-end
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col flex-1 min-w-[140px] sm:min-w-[200px]">
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
          placeholder="Ingrese el nombre del producto"
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
          aria-label="Nombre del producto"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-[120px] sm:min-w-[150px]">
        <label 
          htmlFor="precio" 
          className="mb-1 text-sm font-semibold text-blue-700"
        >
          Precio
        </label>
        <div className="relative">
          <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm sm:text-base">
            $
          </span>
          <input
            id="precio"
            type="number"
            value={precio}
            onChange={e => setPrecio(Number(e.target.value))}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className="
              p-1.5 sm:p-2
              pl-6 sm:pl-8
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
            "
            aria-label="Precio del producto"
          />
        </div>
      </div>

      <div className="
        flex flex-row gap-2 
        md:flex-col md:justify-end 
        flex-none 
        min-w-[120px] sm:min-w-[140px]
        mt-2 md:mt-0
      ">
        <motion.button
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
          aria-label={productoEditar ? "Actualizar producto" : "Agregar producto"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="pi pi-spin pi-spinner" />
              Guardando...
            </>
          ) : (
            <>
              <i className={`pi ${productoEditar ? 'pi-save' : 'pi-plus'} text-sm sm:text-base`} />
              {productoEditar ? 'Actualizar' : 'Agregar'}
            </>
          )}
        </motion.button>

        {productoEditar && (
          <motion.button
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="pi pi-times text-sm sm:text-base" /> 
            Cancelar
          </motion.button>
        )}
      </div>
    </motion.form>
  );
}

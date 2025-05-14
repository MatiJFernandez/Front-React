import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ProductForm from './ProductForm'; 

const API_URL = 'http://localhost:3000/productos';

export default function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

  const fetchProductos = () => {
    axios.get(API_URL)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleProductSaved = (productoActualizado) => {
    const yaExiste = productos.some(p => p.id === productoActualizado.id);
    if (yaExiste) {
      setProductos(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
    } else {
      setProductos(prev => [...prev, productoActualizado]);
    }
    setProductoEditar(null);
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos(prev => prev.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const accionesTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => setProductoEditar(rowData)}
          tooltip="Editar"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => eliminarProducto(rowData.id)}
          tooltip="Eliminar"
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">📦 Lista de Productos</h2>
      <ProductForm
        onProductSaved={handleProductSaved}
        productoEditar={productoEditar}
        limpiarEdicion={() => setProductoEditar(null)}
      />
      <DataTable value={productos} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="ID" />
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" />
        <Column header="Acciones" body={accionesTemplate} />
      </DataTable>
    </div>
  );
}

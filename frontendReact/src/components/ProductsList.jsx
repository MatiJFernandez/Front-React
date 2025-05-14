import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const API_URL = 'http://localhost:3000/productos';

export default function ProductsList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">📦 Lista de Productos</h2>
      <DataTable value={productos} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="ID" />
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" />
      </DataTable>
    </div>
  );
}

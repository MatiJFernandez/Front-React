import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Agregar el plugin a jsPDF
jsPDF.API.autoTable = autoTable;

export const exportProductsToPDF = (productos) => {
  // Crear una nueva instancia de jsPDF con orientación vertical
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Título
  doc.setFontSize(16);
  doc.text('Listado de Productos', 14, 15);
  
  // Tabla usando autoTable directamente
  autoTable(doc, {
    startY: 25,
    head: [['Nombre', 'Precio']],
    body: productos.map(producto => [
      producto.nombre,
      `$${producto.precio}`
    ]),
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 60, halign: 'right' }
    }
  });

  // Guardar el PDF
  doc.save('productos.pdf');
};

export const exportUsersToPDF = (usuarios) => {
  // Crear una nueva instancia de jsPDF con orientación vertical
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Título
  doc.setFontSize(16);
  doc.text('Listado de Usuarios', 14, 15);
  
  // Tabla usando autoTable directamente
  autoTable(doc, {
    startY: 25,
    head: [['Nombre', 'Email', 'Edad']],
    body: usuarios.map(usuario => [
      usuario.nombre,
      usuario.email,
      usuario.edad.toString()
    ]),
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 80 },
      2: { cellWidth: 40, halign: 'center' }
    }
  });

  // Guardar el PDF
  doc.save('usuarios.pdf');
}; 
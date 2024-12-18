import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const VerPlan = () => {
  const location = useLocation();
  const plan = location.state?.plan || []; // Obtener los datos del plan desde el estado
  const [pdfUrl, setPdfUrl] = useState(null); // Estado para almacenar la URL del PDF

  useEffect(() => {
    const generatePDF = async () => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Detalles del Plan', 14, 22);

      // Detalles generales del plan (lado derecho)
      const detallesX = 120; // Posición horizontal de los detalles
      let detallesY = 30; // Posición vertical inicial de los detalles
      doc.setFontSize(12);
      doc.text('Ciudad: Descripción del lugar', detallesX, detallesY);
      detallesY += 10;
      doc.text('Acompañantes: 2 personas', detallesX, detallesY);
      detallesY += 10;
      doc.text(`No. de actividades: ${plan.length}`, detallesX, detallesY);
      detallesY += 10;
      doc.text('Mascota: Sí', detallesX, detallesY);
      detallesY += 10;
      doc.text('Capacidades diferentes: Ninguna', detallesX, detallesY);

      // Agregar actividades con fotos y nombres
      let y = 30; // Posición vertical inicial
      for (const actividad of plan) {
        // Imagen
        if (actividad.imagen_actividad) {
          try {
            const imgData = await fetch(actividad.imagen_actividad)
              .then((res) => res.blob())
              .then((blob) => URL.createObjectURL(blob));
            doc.addImage(imgData, 'JPEG', 14, y, 40, 40); // Ajusta tamaño y posición de la imagen
          } catch (error) {
            console.error('Error al cargar imagen:', error);
          }
        }

        // Nombre del lugar
        doc.text(60, y + 10, actividad.nombre_actividad || 'Nombre no disponible');

        y += 50; // Incrementar la posición vertical para la siguiente actividad

        // Salto de página si es necesario
        if (y > 270) {
          doc.addPage();
          y = 30;
        }
      }

      // Convertir PDF en un Blob
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl); // Guardar la URL en el estado
    };

    generatePDF();
  }, [plan]);

  return (
    <div className="contenedorVista">
      <h1 className="tituloRevisarPlan">Ver Plan</h1>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="Vista previa del plan"
          style={{ border: 'none' }}
        ></iframe>
      ) : (
        <p>Generando PDF...</p>
      )}
    </div>
  );
};

export default VerPlan;

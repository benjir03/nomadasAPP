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

      // Colores personalizados
      const colors = {
        backgroundColor: '#edf6f9', // Fondo
        primaryColor: '#006d77', // Color primario
        secondaryColor: '#e19577', // Color secundario
        supportColor: '#83c5be', // Color de soporte
        letterColor: '#4a4a4a', // Color del texto
      };

      // Función para cargar imágenes como base64
      const loadImageAsBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      try {
        // Cargar logo
        const logoBase64 = await loadImageAsBase64('/imgs/LogoNoP.jpeg'); // Ruta desde public

        // Encabezado: fondo de soporteColor y logo
        doc.setFillColor(colors.supportColor);
        doc.rect(0, 0, 210, 30, 'F'); // Fondo superior
        doc.addImage(logoBase64, 'JPEG', 10, 5, 20, 20); // Logo en la esquina superior izquierda

        // Título principal: "Detalles del Plan"
        doc.setFontSize(18);
        doc.setTextColor(colors.primaryColor);
        doc.text('NomadasAPP Plan', 40, 20);

        // Línea separadora entre encabezado y contenido
        doc.setDrawColor(colors.primaryColor);
        doc.setLineWidth(1);
        doc.line(10, 35, 200, 35); // Línea horizontal

        // Detalles generales del plan
        const detallesX = 120;
        let detallesY = 50;
        doc.setFontSize(12);
        doc.setTextColor(colors.primaryColor);
        doc.text('Detalles del Plan', detallesX, detallesY);
        doc.setTextColor(colors.letterColor);
        detallesY += 10;
        doc.text('Acompañantes: 2 personas', detallesX, detallesY);
        detallesY += 10;
        doc.text(`No. de actividades: ${plan.length}`, detallesX, detallesY);
        detallesY += 10;
        doc.text('Mascota: Sí', detallesX, detallesY);
        detallesY += 10;
        doc.text('Capacidades diferentes: Ninguna', detallesX, detallesY);

        // Lista de actividades con imágenes
        let y = 50; // Posición vertical inicial
        for (const actividad of plan) {
          // Imagen de la actividad
          if (actividad.imagen_actividad) {
            const imgBase64 = await loadImageAsBase64(actividad.imagen_actividad);
            doc.addImage(imgBase64, 'JPEG', 14, y, 40, 40);
          }

          // Nombre de la actividad
          doc.setTextColor(colors.primaryColor);
          doc.text(60, y + 10, actividad.nombre_actividad || 'Nombre no disponible');
          doc.setFontSize(10);
          doc.setTextColor(colors.letterColor);
          doc.text(60, y + 20, actividad.descripcion || 'Sin descripción');

          y += 50; // Incrementar la posición vertical para la siguiente actividad

          // Salto de página si es necesario
          if (y > 270) {
            doc.addPage();
            y = 30;
          }
        }

        // Segunda línea separadora
        doc.setDrawColor(colors.primaryColor);
        doc.line(10, y, 200, y); // Línea al final de las actividades

        // Convertir PDF a Blob y mostrar
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl); // Guardar la URL del PDF
      } catch (error) {
        console.error('Error al generar el PDF:', error);
      }
    };

    generatePDF();
  }, [plan]);

  return (
    <div className="contenedorVista"> 
      <div className="contenedorVista">
        <h1 className="tituloRevisarPlan">Ver Plan</h1>
      </div>
      <div className="contenedorPrincipal">
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
    </div>
  );
};

export default VerPlan;

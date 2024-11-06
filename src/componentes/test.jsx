import axios from 'axios';
import { useEffect, useState } from 'react';

function ComponenteEjemplo() {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/datos')
            .then(response => {
                setDatos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    return (
        <div>
            {datos.map((dato, index) => (
                <p key={index}>{JSON.stringify(dato)}</p>
            ))}
        </div>
    );
}

export default ComponenteEjemplo;

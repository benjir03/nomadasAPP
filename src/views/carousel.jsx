import Carousel from '../components/Carousel';
/*
si se desea utilizar imagenes de la carptera de imgs
se deben importar y usar en src de la siguiente manera.

import imagen1 from '../imgs/imagen1.jpg';
src: imagen1
*/
const App = () => {
    const images = [
        {
            src: 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg',
            alt: 'Imagen 1',
            info: 'Descripción de la imagen 1'
        },
        {
            src: 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg',
            alt: 'Imagen 2',
            info: 'Descripción de la imagen 2'
        },
        {
            src: 'https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg',
            alt: 'Imagen 3',
            info: 'Descripción de la imagen 3'
        },
        // Agrega más imágenes según sea necesario
    ];

    return (
        <div className="App">
            <Carousel images={images} />
        </div>
    );
};

export default App;
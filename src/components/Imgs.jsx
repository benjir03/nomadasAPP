import React from "react";
import "../styles/styImgs.css";

const Imgs = ({ Direccion, alt}) => {
    return(
        <div className="Imagen">
            <img src={Direccion} alt={alt} />
        </div>
    );
};

export default Imgs;
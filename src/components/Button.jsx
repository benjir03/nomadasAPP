import React from "react";
import "../styles/styGenBut.css";

const Button = ({text, url}) => {
    return (
        <div className="GenBut">
            <button className="button" onClick={() => window.location.href = url}>
                {text}
            </button>
        </div>
    );
};

export default Button;

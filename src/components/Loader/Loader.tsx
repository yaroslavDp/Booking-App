import React from "react";
import './Loader.css'
const Loader:React.FC = () => {
    return (
        <div data-test-id="loader" className="loader__container">
            <div className="loader"></div>
        </div>
    )
}

export default Loader;
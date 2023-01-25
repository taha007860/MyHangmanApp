import React from "react";
import "./Center.css";
const Center = ({ children }) => {
    return (
        <div className="center" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }}>
            {children}
        </div>
    );
};

export default Center;

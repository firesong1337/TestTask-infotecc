import React from "react";
import './styles.css'

export const ErrorDisplay = ({ message }) => {
    return (
        <p className="error-msg">{message}</p>
    );
};
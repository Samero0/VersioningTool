import React from "react";
import {styled} from 'styled-components';

interface ToastProps{
    type: "success" | "error";
    message: string;
}

const StyledToast = styled.div<{ type: 'success' | 'error' }>`
    position: fixed;
    top: 20px;  
    right: 20px;  
    background-color: ${({ type }) =>
    type === 'success' ? 'rgba(0, 128, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)'}; 
    color: white;
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;

    animation: fadeOut 3s forwards; 

    @keyframes fadeOut {
    0% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        visibility: hidden;
    }
    }
`;

const Toast : React.FC<ToastProps> = ({type, message}) => {
    return(
        <StyledToast type={type}>{message}</StyledToast>
    )
}

export default Toast
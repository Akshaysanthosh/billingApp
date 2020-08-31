import React from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initToasterContainer = () => {
    this.options = {
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        enter: "fadeIn",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };
};



export const showMessage = (type, message) => {
    switch (type) {
        case 'success' :
            toast.success(message, initToasterContainer);
            break;
        case 'error' :
            toast.error(message, initToasterContainer);
            break;
        default :
            toast.warn(message, initToasterContainer);
            break;
    }
};

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Cookies from 'js-cookie';

export const handleFileChange = (e) => {
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  return imageUrl
};

export const formatDate = (data) => {
  const date = new Date(data);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  return formattedDate
}

export const convertDateString = (data) => {
  const dateObject = new Date(data);
  const year = dateObject.getFullYear();
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObject.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export const handleToast = (message, status) => {
  if(status === 'success') {
    toast(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else if(status === 'info') {
    toast.info(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else if(status === 'warning') {
    toast.warn(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

}

export const hapusTokenCookies = () => {
  Cookies.remove('token')
}

export const getToken = () => {
  const token = Cookies.get('token')
  return token
}
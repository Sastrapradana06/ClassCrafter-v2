import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';

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

export const setCookies = (name, data) => {
  let now = new Date()
  now.setTime(now.getTime() + 2 * 60 * 60 * 1000)

  Cookies.set(name, data, {expires: now})
}

export const deleteCookies = () => {
  Cookies.remove('token')
  Cookies.remove('idUser')
}

export const getToken = (name) => {
  const cookies = Cookies.get(name)
  return cookies
}

export const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString('id-ID', { weekday: 'long' });
  const date = currentDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return { day, date };
};


export const formatDateID = (tanggal) => {
  return format(new Date(tanggal), 'dd MMMM yyyy', { locale: id });
}

export const getToday = () => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const date = new Date();
  const dayIndex = date.getDay(); 
  const dayName = days[dayIndex]

  return dayName;
}
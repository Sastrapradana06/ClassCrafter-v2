import { getToken } from "./function";

const url = "http://localhost:3000";
// const url = 'https://api-classcrafter.onrender.com'

// + AUTH
export async function getAuthUser() {
  const res = await fetch(`${url}/auth/get-auth`);
  const data = await res.json();
  return data;
}

export async function setAuth(data) {
  const res = await fetch(`${url}/auth/set-auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataRes = await res.json();
  return dataRes;
}

export async function apiSendWa(noHp, username) {
  const res = await fetch(`${url}/auth/send-notif`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noHp, username }),
  });

  await res.json();
}

// + SISWA
export async function addSiswa(data) {
  const response = await fetch(`${url}/siswa/tambah`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.status) {
    return true;
  } else {
    throw res;
  }
}

export async function updateSiswa(data) {
  const response = await fetch(`${url}/siswa/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.status) {
    return res.data;
  } else {
    throw res;
  }
}

export async function getAllSiswa() {
  const response = await fetch(`${url}/siswa`);
  const res = await response.json();
  if (res.status) {
    return res.data;
  }
  return [];
}

export async function handleLoginSiswa(email, password) {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data;
}

export async function getSiswaById(id) {
  const response = await fetch(`${url}/siswa/${id}`);
  const data = await response.json();
  return data;
}

export async function deleteSiswaById(id) {
  const response = await fetch(`${url}/siswa/delete/${id}`);

  const res = await response.json();
  if (res.status) {
    return true;
  } else {
    throw res;
  }
}

export async function getUserLogin() {
  const id = getToken("idUser");
  const res = await fetch(`${url}/siswa/${id}`);
  const data = await res.json();
  return data;
}

// + GURU
export async function addGuru(data) {
  const response = await fetch(`${url}/guru/tambah`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.status) {
    return true;
  } else {
    throw res;
  }
}

export async function updateGuru(data) {
  const response = await fetch(`${url}/guru/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.status) {
    return res.data;
  } else {
    throw res;
  }
}

export async function getAllGuru() {
  const response = await fetch(`${url}/guru`);
  const res = await response.json();
  if (res.status) {
    return res.data;
  }
  return [];
}

export async function deleteGuruById(id) {
  const response = await fetch(`${url}/guru/delete/${id}`);
  const res = await response.json();
  if (res.status) {
    return true;
  } else {
    throw res;
  }
}

export async function getGuruById(id) {
  const response = await fetch(`${url}/guru/${id}`);
  const res = await response.json();
  return res;
}

// + Mapel
export async function addMapel(data) {
  const response = await fetch(`${url}/mapel/tambah`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.status) {
    return true;
  } else {
    throw res;
  }
}

export async function updateMapel(data) {
  const response = await fetch(`${url}/mapel/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.status) {
    return res.data;
  } else {
    throw res;
  }
}

export async function getAllMapel() {
  const response = await fetch(`${url}/mapel`);
  const res = await response.json();
  if (res.status) {
    return res.data;
  }
  return [];
}

export async function getMapelById(id) {
  const response = await fetch(`${url}/mapel/${id}`);
  const data = await response.json();
  return data;
}

export async function deleteMapelById(id) {
  const response = await fetch(`${url}/mapel/delete/${id}`);
  const res = await response.json();
  if (res.status) {
    return true;
  } else {
    throw res;
  }
}

// + Transaksi
export async function addTransaksi(data) {
  const response = await fetch(`${url}/transaksi/add-kas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dataKas = await response.json();
  return dataKas;
}

export async function getAllKas() {
  const response = await fetch(`${url}/transaksi/get-kas`);
  const data = await response.json();
  return data;
}

export async function getAllDataKelas() {
  const response = await fetch(`${url}/transaksi/get-dataKelas`);
  const data = await response.json();
  return data;
}

export async function getKasById(id) {
  const response = await fetch(`${url}/transaksi/get-kas/${id}`);
  const data = await response.json();
  return data;
}

export async function deleteKasById(id) {
  const response = await fetch(`${url}/transaksi/delete-kas/${id}`);
  const data = await response.json();
  console.log({ data });
  return data;
}

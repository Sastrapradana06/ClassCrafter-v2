import { getToken } from "./function"

const url = 'http://localhost:3000'

// + AUTH
export async function getAuthUser() {
  const res = await fetch(`${url}/auth/get-auth`)
  const data = await res.json()
  return data
}

export async function setAuth(data) {
  const res = await fetch(`${url}/auth/set-auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const dataRes = await res.json()
  return dataRes
}


// + SISWA
export async function addSiswa(data) {
  const response = await fetch(`${url}/siswa/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const dataSiswa = await response.json()
  return dataSiswa
}

export async function getAllSiswa() {
  const response = await fetch(`${url}/siswa/get`)
  const {status, data} = await response.json()
  return {status, data}
}

export async function handleLoginSiswa(email, password) {
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({email, password})
  })
  const data = await res.json()
  return data
}

export async function getSiswaById(id) {
  const response = await fetch(`${url}/siswa/get-siswa/${id}`)
  const data = await response.json()
  return data
}

export async function deleteSiswaById(id) {
  const response = await fetch(`${url}/siswa/delete/${id}`)
  const data = await response.json()
  return data
}

export async function getUserLogin() {
  const id = getToken('idUser')
  const res = await fetch(`${url}/auth/get-user/${id}`)
  const data = await res.json()
  return data
}

// + GURU
export async function addGuru(data) {
  const response = await fetch(`${url}/guru/add-guru`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const dataGuru = await response.json()
  return dataGuru
}

export async function getAllGuru() {
  const response = await fetch(`${url}/guru/get-guru`)
  const data = await response.json()
  return data
}

export async function deleteGuruById(id) {
  const response = await fetch(`${url}/guru/delete-guru/${id}`)
  const data = await response.json()
  return data
}

export async function getGuruById(id) {
  const response = await fetch(`${url}/guru/get-guru/${id}`)
  const data = await response.json()
  return data
}

// + Mapel
export async function addMapel(data) {
  const response = await fetch(`${url}/mapel/add-mapel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const dataMapel = await response.json()
  return dataMapel
}

export async function getAllMapel() {
  const response = await fetch(`${url}/mapel/get-mapel`)
  const data = await response.json()
  return data
}

export async function getMapelById(id) {
  const response = await fetch(`${url}/mapel/get-mapel/${id}`)
  const data = await response.json()
  return data
}

export async function deleteMapelById(id) {
  const response = await fetch(`${url}/mapel/delete-mapel/${id}`)
  const data = await response.json()
  return data
}


// + Transaksi
export async function addTransaksi(data) {
  const response = await fetch(`${url}/transaksi/add-kas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const dataKas = await response.json()
  return dataKas
}

export async function getAllKas() {
  const response = await fetch(`${url}/transaksi/get-kas`)
  const data = await response.json()
  return data
}

export async function getAllDataKelas() {
  const response = await fetch(`${url}/transaksi/get-dataKelas`)
  const data = await response.json()
  return data
}

export async function getKasById(id) {
  const response = await fetch(`${url}/transaksi/get-kas/${id}`)
  const data = await response.json()
  return data
}

export async function deleteKasById(id) {
  const response = await fetch(`${url}/transaksi/delete-kas/${id}`)
  const data = await response.json()
  console.log({data});
  return data
}
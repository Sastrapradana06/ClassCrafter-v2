const url = 'http://localhost:3000'

export async function addSiswa(data) {
  const response = await fetch(`${url}/siswa/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const {status, message} = await response.json()
  return {status, message}
}

export async function getAllSiswa() {
  const response = await fetch(`${url}/siswa/get`)
  const {status, data} = await response.json()
  return {status, data}
}

export async function handleLoginSiswa(email) {
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({email})
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
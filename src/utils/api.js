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



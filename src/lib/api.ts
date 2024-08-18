const API_URL = 'http://localhost:1337'  // Replace with your backend URL

export async function createUser(name: string) {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name }),
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return response.json()
}

export async function getUser(userId: string) {
  const response = await fetch(`${API_URL}/user/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export async function spin(userId: string) {
  const response = await fetch(`${API_URL}/slot-machine/spin/${userId}`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to spin')
  }
  return response.json()
}
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function sendMessage(prompt) {
  const response = await api.post('/chat/message', { message: prompt })
  return response.data
}

export async function uploadDocument(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

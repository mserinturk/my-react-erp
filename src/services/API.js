import axios from 'axios'

const api = axios.create({
  baseURL: 'https://67f44ab2cbef97f40d2deae8.mockapi.io/erp',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
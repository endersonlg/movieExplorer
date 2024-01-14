import { TMDB_API_KEY } from '@env'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

api.defaults.headers.Authorization = `Bearer ${TMDB_API_KEY}`

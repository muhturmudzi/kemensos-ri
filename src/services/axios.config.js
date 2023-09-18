import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://www.emsifa.com/api-wilayah-indonesia/api'
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
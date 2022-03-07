import axios from 'axios'
import { Alert } from 'react-native'
import { getUser, navigate, deleteUser } from '../utils'

const Api = axios.create({
  baseURL: 'http://192.168.8.159/aksapos/public/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

Api.interceptors.response.use(
  response => {

    // Do something with response data

    return response
  },
  error => {

    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise

    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert(
        'Peringatan',
        'Tidak dapat terhubung ke server kami, tidak ada koneksi internet',
        [{ text: 'OK' }],
        { cancelable: false },
      )
    }

    if (error.response.status === 401) {
      const requestConfig = error.config
      //console.log(error.response.data.message)

      deleteUser()
        .then(() => {
          navigate('AuthLoading', {})
        })

      return axios(requestConfig)
    }

    return Promise.reject(error)
  },
)

Api.interceptors.request.use(
  config => {
    return getUser()
      .then(user => {
        user = JSON.parse(user)
        if (user && user.token)
          config.headers.Authorization = `Bearer ${user.token}`
        return Promise.resolve(config)
      })
      .catch(error => {
        console.log(error)
        return Promise.resolve(config)
      })
  },
  error => {
    return Promise.reject(error)
  },
)

export default Api

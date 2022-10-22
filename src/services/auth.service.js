import axios from 'axios'

const API_URL = 'http://localhost:8081/api/auth/'

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', { username, password })
      .then((Response) => {
        if (Response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(Response.data))
        }
        return Response.data
      })
  }
  logout() {
    localStorage.removeItem('user')
  }

  register(username, email, password) {
    return axios.post(API_URL + 'signup', { username, email, password })
  }
}

export default new AuthService()

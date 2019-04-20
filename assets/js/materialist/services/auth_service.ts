import axios from 'axios'
import User from '../models/user'

export default class AuthService {
  constructor() {
    this.login = this.login.bind(this)
  }

  public login(username: string, pass: string): Promise<string>{
    return new Promise((resolve, rejected) =>
      axios.post("/api/login", { user: { username: username, password: pass } })
      .then( response => {
        this.setToken(response.data.data.token)
        return resolve(response.data.data.token)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  public me(): Promise<User> {
    return new Promise((resolve, rejected) =>
      axios.get("/api/me", { headers: { 'Authorization': `Bearer ${this.getToken()}` }})
      .then( response => resolve(response.data))
      .catch( error => rejected(error)
      )
    )
  }

  setToken = (idToken: string) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken():string|null {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }
}

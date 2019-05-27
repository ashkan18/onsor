import axios from 'axios'
import User from '../models/user'

export default class AuthService {
  TOKEN_KEY = 'id_token'
  constructor() {
    this.login = this.login.bind(this)
  }

  public login(username: string, password: string): Promise<string>{
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            mutation login($username: String!, $password: String!){
              login(username: $username, password: $password){
                token
              }
            }
          `,
          variables: {
            username,
            password
          }
        }
      })
      .then( response => {
        if(response.data.errors) {
          return rejected(response.data.errors[0].message)
        }
        let token = response.data.data.login.token
        this.setToken(token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        return resolve(response.data.data.materials)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  public signup(username: string, password: string, passwordConfirmation: string, name: string): Promise<string>{
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            mutation createUser($username: String!, $password: String!, $passwordConfirmation: String!, $name: String!){
              createUser(username: $username, password: $password, passwordConfirmation: $passwordConfirmation, name: $name){
                token
              }
            }
          `,
          variables: {
            username,
            password,
            passwordConfirmation,
            name
          }
        }
      })
      .then( response => {
        if(response.data.errors) {
          return rejected(response.data.errors[0].message)
        }
        this.setToken(response.data.data.createUser.token)
        return resolve(response.data.data.createUser.token)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  public logout(){
    localStorage.removeItem(this.TOKEN_KEY)
  }

  public me(): Promise<User>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getToken()
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query me{
              me {
                id
                name
              }
            }
          `
        }
      })
      .then( response => resolve(response.data.data.me))
      .catch( error => rejected(error) )
    )
  }

  setToken = (idToken: string) => {
    // Saves user token to localStorage
    localStorage.setItem(this.TOKEN_KEY, idToken)
  }

  getToken():string|null {
    // Retrieves the user token from localStorage
    return localStorage.getItem(this.TOKEN_KEY)
  }
}

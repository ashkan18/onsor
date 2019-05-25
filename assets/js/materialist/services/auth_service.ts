import axios from 'axios'
import User from '../models/user'

export default class AuthService {
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
        console.log(response.data.errors)
        if(response.data.errors) {
          return rejected(response.data.errors[0].message)
        }
        this.setToken(response.data.data.token)
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
        this.setToken(response.data.data.token)
        return resolve(response.data.data.materials)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  public me(){
    return null
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

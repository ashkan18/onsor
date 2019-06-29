import axios from 'axios'
import User from '../models/user'
import AuthService from './auth_service';

export default class InquiryService {
  authService: AuthService
  constructor(){
    this.authService = new AuthService()
  }
  public inquiry(materialId:string): Promise<string>{
    return new Promise((resolve, rejected) => {
      let token = this.authService.getToken()
      if (token == null){
        return rejected("Login please")
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            mutation inquiry($materialId: ID!, $initialMessage: String, $quantity: Int!){
              inquiry(materialId: $materialId, initialMessage: $initialMessage, quantity: $quantity){
                id
              }
            }
          `,
          variables: {
            materialId,
            initialMessage: "Hi Im interested in this thingy",
            quantity: 30
          }
        }
      })
      .then( response => {
        if(response.data.errors) {
          return rejected(response.data.errors[0].message)
        }
        return resolve(response.data.data.inquiry.id)
      })
      .catch( error => {
        return rejected(error)
      })
    })
  }
}

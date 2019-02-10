import axios from 'axios'

export default class MaterialService {
  // Initializing important variables
  constructor() {
    this.getAll = this.getAll.bind(this)
  }

  public getAll(): Promise<Array<any>>{
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query materials{
              materials {
                id
                name
                description
              }
            }
          `
        }
      })
      .then( response => {
        return resolve(response.data.data.materials)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }
}

import axios from 'axios'
import Material from '../models/material';

export default class MaterialService {
  // Initializing important variables
  constructor() {
    this.getAll = this.getAll.bind(this)
  }

  public getAll(): Promise<Array<Material>>{
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

  public findMaterial(id: string): Promise<Material> {
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query material{
              material(id: ${id}) {
                id
                name
                description
              }
            }
          `
        }
      })
      .then( response => {
        return resolve(response.data.data.material)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }
}

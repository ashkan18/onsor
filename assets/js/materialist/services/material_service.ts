import axios from 'axios'
import Material from '../models/material';


interface SearchFilters {
  types?: Array<string>
  textures?: Array<string>
  finishes?: Array<string>
  term?: string
}
export default class MaterialService {
  // Initializing important variables
  constructor() {
    this.searchFilter = this.searchFilter.bind(this)
  }

  public searchFilter(args: SearchFilters): Promise<Array<Material>>{
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query materials($types: [String], $textures: [String], $finishes: [String]){
              materials(types: $types, textures: $textures, finishes: $finishes) {
                id
                name
                description
                texture
                finish
                type
              }
            }
          `,
          variables: {
            types: args.types,
            textures: args.textures,
            finishes: args.finishes
          }
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

  public getFilters(): Promise<any> {
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query filters{
              types
              textures
              finishes
            }
          `
        }
      })
      .then( response => {
        console.log(response)
        return resolve(response.data.data)
      })
      .catch( error => {
        return rejected(error)
      }))
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
import axios from 'axios'
import Material from '../models/material';

interface Color {
  r: number
  g: number
  b: number
}

interface SearchFilters {
  type?: Array<string>
  texture?: Array<string>
  finish?: Array<string>
  term?: string
  color?: Color
}
export default class MaterialService {
  // Initializing important variables
  constructor() {
    this.searchFilter = this.searchFilter.bind(this)
  }

  public searchFilter(args: SearchFilters): Promise<Array<Material>>{
    console.log(args.color)
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query materials($type: [String], $texture: [String], $finish: [String], $color: ColorInput){
              materials(type: $type, texture: $texture, finish: $finish, color: $color) {
                id
                name
                description
                texture
                finish
                type
                photos
                vendor {
                  id
                  name
                }
              }
            }
          `,
          variables: {
            type: args.type,
            texture: args.texture,
            finish: args.finish,
            color: args.color
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
                photos
                texture
                finish
                type
                vendor {
                  id
                  name
                }
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

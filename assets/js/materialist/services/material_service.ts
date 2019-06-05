import axios from 'axios'
import Material from '../models/material';
import Vendor from '../models/vendor';
import gql from 'graphql-tag';

export const SEARCH_MATERIALS_QUERY = gql`
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
`

export const FIND_MATERIAL_QUERY = gql`
  query material($id: ID!){
    material(id: $id) {
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
        console.log(response.data.data)
        return resolve(response.data.data.material)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  public vendorMaterials(vendorId: string): Promise<Vendor> {
    return new Promise((resolve, rejected) =>
      axios({
        url: "/api",
        method: "post",
        data: {
          query: `
            query vendor{
              vendor(id: ${vendorId}) {
                id
                name
                materials(first: 50){
                  edges{
                    node{
                      id
                      name
                      description
                      photos
                      texture
                      finish
                      type
                    }
                  }
                }
              }
            }
          `
        }
      })
      .then( response => {
        return resolve(response.data.data.vendor)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }
}

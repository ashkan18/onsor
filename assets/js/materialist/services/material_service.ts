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

export const FILTERS_QUERY = gql`
  query filters{
    types
    textures
    finishes
  }
`

export const VENDOR_MATERIAL = gql`
  query vendor($vendorId: ID!){
    vendor(id: $vendorId) {
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
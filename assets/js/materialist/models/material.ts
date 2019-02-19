import Photo from "./photo";

export default interface Material{
  id: string
  name: string
  description: string
  texture: string
  finish: string
  type: string
  sizeUnit: string
  photos: Array<Photo>
}
import Photo from "./photo";
import Vendor from "./vendor";

export default interface Material{
  id: string
  name: string
  description: string
  texture: string
  finish: string
  type: string
  sizeUnit: string
  photos: Array<Photo>
  vendor: Vendor
}

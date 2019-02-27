import Photo from "./photo";
import VendorMaterial from "./vendor_material";

export default interface Material{
  id: string
  name: string
  description: string
  texture: string
  finish: string
  type: string
  sizeUnit: string
  photos: Array<Photo>
  vendors: VendorMaterial
}
import Material from "./material";
import { Vendor } from "./vendor";

interface VendorMaterialEdge {
  priceCents: number
  priceCurrency: string
  node: Vendor | Material
}

export default interface VendorMaterial{
  edges: Array<VendorMaterialEdge>
}
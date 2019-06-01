import Material from "./material";

export default interface Vendor {
  id: number
  name: string
  materials: Connection<Material>
}

interface Connection<T>{
  edges: Array<Node<T>>
}

interface Node<T>{
  node: T
}
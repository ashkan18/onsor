import * as React from "react"
import { Spinner, Flex } from "@artsy/palette"
import MaterialService from "../services/material_service"
import Material from "../models/material"
import {
  Image,
  Sans,
  Serif,
  Button,
} from "@artsy/palette"


interface Props {
  match: any
}

interface State {
  isLoaded: boolean
  material?: Material
}

export default class MaterialPage extends React.Component<Props, State>{
  MaterialService: MaterialService

  public constructor(props: Props, context: any) {
    super(props, context)
    this.MaterialService = new MaterialService()
    this.state = {
      isLoaded: false,
    }
  }
  public componentDidMount() {
    this.getMaterial()
  }

  public render(){
    const { isLoaded, material } = this.state
    if (!isLoaded) {
      return( <Spinner size="medium"/> )
    } else if(material) {
      return(
        <Flex flexDirection="row">
          <h1><Sans size="5">{material.name}</Sans></h1>
          {material.photos.map( p => <Image src={p["large"]} /> ) }
        </Flex>
      )
    }
  }

  private getMaterial() {
    this.MaterialService.findMaterial(this.props.match.params.materialId)
      .then( material => {
        this.setState({material, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }
}
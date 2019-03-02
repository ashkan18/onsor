import * as React from "react"
import { Spinner, Flex, BorderBox, Box } from "@artsy/palette"
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
          <Box style={{flexGrow: 5}}>
            {material.photos.map( p => <Image src={p["large"]} sizes="large" /> ) }
          </Box>
          <BorderBox style={{flexGrow: 3}}>
            <Flex flexDirection="column">
              <h1><Sans size="5">{material.name}</Sans></h1>
              <h2><Sans size="5">{material.type}</Sans></h2>
              <h2><Sans size="5">{material.texture}</Sans></h2>
              <h2><Sans size="5">{material.finish}</Sans></h2>
              <Sans size="5">Offerd By: {material.vendor.name}</Sans>
              <Button size="small" my={1} width={100}>Contact</Button>
            </Flex>
          </BorderBox>
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
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
import Header from "../components/header";


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
        <>
          <Header/>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box style={{flexGrow: 1}}>
              {material.photos.map( p => <Image src={p["large"]} sizes="large" /> ) }
            </Box>
            <BorderBox>
              <Flex flexDirection="column" style={{width: 200}} justifyContent="flex-start">
                <Sans size="5">{material.name}</Sans>
                <Sans size="5">{material.type}</Sans>
                <Sans size="5">{material.texture}</Sans>
                <Sans size="5">{material.finish}</Sans>
                <Sans size="5">Offerd By: {material.vendor.name}</Sans>
                <Button size="small" my={1} width={100}>Contact</Button>
              </Flex>
            </BorderBox>
          </Flex>
        </>
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
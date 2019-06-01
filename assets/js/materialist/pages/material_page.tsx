import * as React from "react"
import { Spinner, Flex, BorderBox, Box } from "@artsy/palette"
import MaterialService from "../services/material_service"
import Material from "../models/material"
import {
  Image,
} from "@artsy/palette"
import Header from "../components/header";
import MaterialCard from "../components/material_card";
import styled from 'styled-components';


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
          <Header noLogin={false}/>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box>
              {material.photos.map( p => <StyledImage src={p["large"]}/> ) }
            </Box>
            <MaterialCard material={material}/>
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


const StyledImage = styled(Image)`
  max-width: 450px
`;
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
import InquiryService from "../services/inquiry_service";


interface Props {
  match: any
}

interface State {
  isLoaded: boolean
  material?: Material
  inquired: boolean
  inquiring: boolean
}

export default class MaterialPage extends React.Component<Props, State>{
  materialService: MaterialService
  inquiryService: InquiryService

  public constructor(props: Props, context: any) {
    super(props, context)
    this.materialService = new MaterialService()
    this.inquiryService = new InquiryService()
    this.onInquiry = this.onInquiry.bind(this)
    this.state = {
      isLoaded: false,
      inquired: false,
      inquiring: false
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
              {material.photos.map( p => <StyledImage src={p["medium"]}/> ) }
            </Box>
            <MaterialCard material={material} onInquiry={this.onInquiry} inquired={this.state.inquired} loading={this.state.inquiring}/>
          </Flex>
        </>
      )
    }
  }

  private getMaterial() {
    this.materialService.findMaterial(this.props.match.params.materialId)
      .then( material => {
        this.setState({material, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }

  public onInquiry(materialId: string){
    this.setState({inquiring: true})
    this.inquiryService.inquiry(materialId)
    .then( _inquiryId => this.setState({inquired: true}))
    .catch( _error => console.log(_error) )
    .finally( () => this.setState({inquiring: false}))
  }
}


const StyledImage = styled(Image)`
  max-width: 450px
`;
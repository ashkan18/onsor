import * as React from "react"
import { Spinner, Flex, Box } from "@artsy/palette"
import MaterialService, { FIND_MATERIAL_QUERY } from "../services/material_service"
import Material from "../models/material"
import {
  Image,
} from "@artsy/palette"
import Header from "../components/header";
import MaterialCard from "../components/material_card";
import styled from 'styled-components';
import InquiryService from "../services/inquiry_service";
import { Query } from "react-apollo";


interface Props {
  match: any
}

interface State {
  isLoaded: boolean
  inquired: boolean
  inquiring: boolean
}

export default class MaterialPage extends React.Component<Props, State>{
  inquiryService: InquiryService

  public constructor(props: Props, context: any) {
    super(props, context)
    this.inquiryService = new InquiryService()
    this.onInquiry = this.onInquiry.bind(this)
    this.state = {
      isLoaded: false,
      inquired: false,
      inquiring: false
    }
  }

  public render(){
    return(
      <Query query={FIND_MATERIAL_QUERY} variables={{id: this.props.match.params.materialId}}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner size="large"/>;
          if (error) return `Error! ${error}`;

          return (
            <>
              <Header noLogin={false}/>
              <Flex flexDirection="row" justifyContent="space-between">
                <Box>
                  {data.material.photos.map( p => <StyledImage src={p["medium"]}/> ) }
                </Box>
                <MaterialCard material={data.material} onInquiry={this.onInquiry} inquired={this.state.inquired} loading={this.state.inquiring}/>
              </Flex>
            </>
          );
        }}
      </Query>
    )
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
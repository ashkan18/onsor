import * as React from "react"
import { Spinner, Flex, Box, Button, Serif, BorderBox } from "@artsy/palette"
import { FIND_MATERIAL_QUERY } from "../services/material_service"
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
    const {inquired, inquiring} = this.state
    return(
      <Query query={FIND_MATERIAL_QUERY} variables={{id: this.props.match.params.materialId}}>
        {({ loading, error, data }) => {
          return (
            <>
              <Header noLogin={false}/>
              { loading && <Spinner size="large"/>}
              { error && <> Error! {error} </>}
              { !error && !loading && data &&
                <Flex flexDirection="row" justifyContent="space-between">
                  <Box m={4}>
                    {data.material.photos.map( p => <StyledImage src={p["medium"]}/> ) }
                  </Box>
                  <BorderBox flexDirection="column" style={{width: 200}}>
                    <MaterialCard material={data.material}/>
                    {!inquired && <Button size="small" my={1} width={100} onClick={ (_e) => this.onInquiry()} loading={inquiring}>Contact</Button>}
                    {inquired && <Serif size="3t" mb={2}>Successfully Inquired</Serif>}
                  </BorderBox>
                </Flex>
              }
            </>
          )
        }}
      </Query>
    )
  }

  public onInquiry(){
    this.setState({inquiring: true})
    this.inquiryService.inquiry(this.props.match.params.materialId)
    .then( _inquiryId => this.setState({inquired: true}))
    .catch( _error => console.log(_error) )
    .finally( () => this.setState({inquiring: false}))
  }
}


const StyledImage = styled(Image)`
  max-width: 800px
`;
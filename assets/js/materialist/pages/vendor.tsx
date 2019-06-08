import * as React from "react"
import { Spinner } from "@artsy/palette"
import { VENDOR_MATERIAL } from "../services/material_service"
import Header from "../components/header";
import MaterialWall from "../components/material_wall";
import { Query } from "react-apollo";


interface Props {
  match: any
}

export default class VendorPage extends React.Component<Props, {}>{
  public render(){
    return(
      <Query query={VENDOR_MATERIAL} variables={{vendorId: this.props.match.params.vendorId}}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner size="large"/>;
          if (error) return `Error! ${error}`;

          return (
            <>
              <Header noLogin={false}/>
              <MaterialWall materials={data.vendor.materials.edges.map( e => e.node)} withVendor={false}/>
            </>
          )
        }}
      </Query>
    )
  }
}

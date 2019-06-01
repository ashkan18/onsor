import * as React from "react"
import { Spinner, Flex, BorderBox, Box } from "@artsy/palette"
import MaterialService from "../services/material_service"
import Material from "../models/material"
import Header from "../components/header";
import MaterialWall from "../components/material_wall";
import Vendor from "../models/vendor";


interface Props {
  match: any
}

interface State {
  isLoaded: boolean
  vendor: Vendor | null
}

export default class VendorPage extends React.Component<Props, State>{
  materialService: MaterialService

  public constructor(props: Props, context: any) {
    super(props, context)
    this.materialService = new MaterialService()
    this.state = {
      isLoaded: false,
      vendor: null
    }
  }
  public componentDidMount() {
    this.getVendorMaterials()
  }

  public render(){
    const { isLoaded, vendor } = this.state
    if (!isLoaded) {
      return( <Spinner size="medium"/> )
    } else if(vendor) {
      console.log(vendor.materials.edges.map( e => e.node))
      return(
        <>
          <Header noLogin={false}/>
          <MaterialWall materials={vendor.materials.edges.map( e => e.node)} withVendor={false}/>
        </>
      )
    }
  }

  private getVendorMaterials() {
    this.materialService.vendorMaterials(this.props.match.params.vendorId)
      .then( vendor => {
        this.setState({vendor, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }
}

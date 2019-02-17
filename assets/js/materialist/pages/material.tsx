import * as React from "react"
import { Spinner } from "@artsy/palette"
import MaterialService from "../services/material_service"
import Material from "../models/material"


interface Props {
  materialId: string
}

interface State {
  isLoaded: boolean
  material?: Material
}

export default class Home extends React.Component<Props, State>{
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
          {material.name}
        </>
      )
    }
  }

  private getMaterial() {
    this.MaterialService.findMaterial(this.props.materialId)
      .then( material => {
        console.log(material)
        this.setState({material, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }
}
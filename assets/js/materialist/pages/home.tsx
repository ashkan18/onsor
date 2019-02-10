import * as React from "react"
import { Spinner } from "@artsy/palette"
import MaterialService from "../services/material_service"
import MaterialBrick from "../components/material_brick";


interface State {
  materials: Array<any>
  isLoaded: boolean
  searchTerm: string | null
}

export default class Home extends React.Component<{}, State>{
  MaterialService: MaterialService

  public constructor(props, context) {
    super(props, context)
    this.MaterialService = new MaterialService()
    this.state = {
      materials: [],
      isLoaded: false,
      searchTerm: null
    }
  }
  public componentDidMount() {
    this.getAll()
  }

  public render(){
    const { isLoaded, materials } = this.state
    if (!isLoaded) {
      return( <Spinner size="medium"/> )
    } else {
      return( <>
          {this.state.materials.map( m => <MaterialBrick key={m.id} material={m}/> )}
        </>
      )
    }
  }

  private getAll() {
    this.MaterialService.getAll()
      .then( materials => {
        console.log(materials)
        this.setState({materials, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }
}
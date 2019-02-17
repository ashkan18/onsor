import React from "react";
import Material from "../models/material";
import MaterialService from "../services/material_service";
import { Spinner, Flex } from "@artsy/palette";
import MaterialWall from "./material_wall";
import Filters from "./filters";


interface State {
  materials: Array<Material>
  types: Array<string>
  textures: Array<string>
  finishes: Array<string>
  isLoaded: boolean
  searchTerm: string | null
}

export default class Search extends React.Component<{}, State>{
  MaterialService: MaterialService

  public constructor(props: {}, context: any) {
    super(props, context)
    this.MaterialService = new MaterialService()
    this.state = {
      materials: [],
      types: ["ceramic", "glass"],
      textures: [],
      finishes: [],
      isLoaded: false,
      searchTerm: null
    }
  }
  public componentDidMount() {
    this.getAll()
    this.getFilters()
  }

  public render(){
    const { isLoaded, materials, types, textures, finishes } = this.state
    if (!isLoaded) {
      return( <Spinner size="medium"/> )
    } else {
      return(
        <Flex flexDirection="row" justifyContent="space-between" flexGrow={1}>
          <Filters types={this.state.types} textures={this.state.textures} finishes={this.state.finishes}/>
          <MaterialWall materials={this.state.materials} />
        </Flex>
      )
    }
  }

  private getAll() {
    this.MaterialService.getAll()
      .then( materials => {
        this.setState({materials, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }

  private getFilters(){
    this.MaterialService.getFilters()
      .then( filters => {
        this.setState({types: filters.types, textures: filters.textures, finishes: filters.finishes, isLoaded: true})
      })
      .catch( _error => console.log(_error) )
  }
}
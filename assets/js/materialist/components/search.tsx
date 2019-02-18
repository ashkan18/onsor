import React from "react";
import Material from "../models/material";
import MaterialService from "../services/material_service";
import { Spinner, Flex, BorderBox, Sans, Checkbox, Button } from "@artsy/palette";
import MaterialWall from "./material_wall";


interface State {
  materials: Array<Material>
  types: Array<string>
  textures: Array<string>
  finishes: Array<string>
  loadingMaterials: boolean
  loadingFilters: boolean
  searchTerm: string | undefined
  selectedTypes: Set<string>
  selectedTextures: Set<string>
  selectedFinishes: Set<string>
}

export default class Search extends React.Component<{}, State>{
  MaterialService: MaterialService

  public constructor(props: {}, context: any) {
    super(props, context)
    this.MaterialService = new MaterialService()
    this.state = {
      materials: [],
      types: [],
      textures: [],
      finishes: [],
      loadingMaterials: false,
      loadingFilters: true,
      searchTerm: undefined,
      selectedTypes: new Set(),
      selectedTextures: new Set(),
      selectedFinishes: new Set()
    }
  }
  public componentDidMount() {
    this.searchFilter()
    this.getFilters()
  }

  public render(){
    const { loadingMaterials, loadingFilters, materials, types, textures, finishes } = this.state
    return(
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <BorderBox>
          { loadingFilters ? '' :
            <Flex flexDirection="column" flexGrow={1}>
              <input type="text" onChange={e => this.setTerm(e.target.value)} placeholder="Search" value={this.state.searchTerm}/>
              <Sans size='3'>Types</Sans>
              {types.map( t => <Checkbox key={t} selected={this.state.selectedTypes.has(t)} onSelect={ _e => this.toggleType(t)}> {t} </Checkbox>)}
              <Sans size='3'>Finishes</Sans>
              {finishes.map( t => <Checkbox key={t}> {t} </Checkbox>)}
              <Sans size='3'>Textures</Sans>
              {textures.map( t => <Checkbox key={t}> {t} </Checkbox>)}
              <Button size="small" onClick={ e => this.searchFilter() }>Search</Button>
            </Flex>
          }
        </BorderBox>
        { loadingMaterials ? <Spinner size="medium"/> : <MaterialWall materials={materials}/> }
      </Flex>
    )
  }

  private toggleType(type: string) {
    if (this.state.selectedTypes.has(type)) {
      // remove from the selected list
      this.state.selectedTypes.delete(type)
      this.setState({selectedTypes: this.state.selectedTypes})
    } else {
      this.setState({selectedTypes: this.state.selectedTypes.add(type)})
    }
  }

  private setTerm(term: string) {
    this.setState({searchTerm: term})
  }

  private searchFilter() {
    this.setState({loadingMaterials: true})
    this.MaterialService.searchFilter({term: this.state.searchTerm, types: Array.from(this.state.selectedTypes.values()), textures: Array.from(this.state.selectedTextures.values()) , finishes: Array.from(this.state.selectedFinishes.values())})
      .then( materials => {
        this.setState({materials, loadingMaterials: false})
      })
      .catch( _error => this.setState({loadingMaterials: false}) )
  }

  private getFilters(){
    this.setState({loadingFilters: true})
    this.MaterialService.getFilters()
      .then( filters => {
        this.setState({types: filters.types, textures: filters.textures, finishes: filters.finishes, loadingFilters: false})
      })
      .catch( _error => console.log(_error) )
  }
}
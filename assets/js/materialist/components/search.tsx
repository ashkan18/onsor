import React from "react";
import Material from "../models/material";
import MaterialService from "../services/material_service";
import { Spinner, Flex, BorderBox, Sans, Checkbox, Button, Box } from "@artsy/palette";
import { ColorResult, CirclePicker } from 'react-color';
import MaterialWall from "./material_wall";
import styled from "styled-components";
import { borderedInput } from "./mixins";
import { block } from "./helpers";

interface Color {
  r: number
  g: number
  b: number
}


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
  selectedColor: ColorResult | null
}

const StyledButton = styled(Button)`
  margin-top: 10px;
  font-weight: bold;
`;

export default class Search extends React.Component<{}, State>{
  MaterialService: MaterialService

  public constructor(props: {}, context: any) {
    super(props, context)
    this.MaterialService = new MaterialService()
    this.handleColorPickerChange = this.handleColorPickerChange.bind(this)
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
      selectedFinishes: new Set(),
      selectedColor: null
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
        <BorderBox flexGrow={1}>
          { loadingFilters ? '' :
            <Flex flexDirection="column" alignContent="space-around">
              <StyledInput type="text" onChange={e => this.setTerm(e.target.value)} placeholder="Search" value={this.state.searchTerm}/>
              <Sans size='5'>Types</Sans>
              {types.map( t => <Checkbox key={t} selected={this.state.selectedTypes.has(t)} onSelect={ _e => this.toggleType(t)}> {t} </Checkbox>)}
              <Sans size='5'>Finishes</Sans>
              {finishes.map( t => <Checkbox key={t} selected={this.state.selectedFinishes.has(t)} onSelect={ _e => this.toggleFinish(t)}> {t} </Checkbox>)}
              <Sans size='5'>Textures</Sans>
              {textures.map( t => <Checkbox key={t} selected={this.state.selectedTextures.has(t)} onSelect={ _e => this.toggleTexture(t)}> {t} </Checkbox>)}
              <Sans size='5'>Color</Sans>
              <Box>
                <StyledColorPicker
                  color={ this.state.selectedColor ? this.state.selectedColor.rgb : undefined }
                  onChangeComplete={ this.handleColorPickerChange }/>
              </Box>
              <Button size="small" onClick={ e => this.searchFilter() } style={ {marginTop: 20} }>Search</Button>
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

  private toggleFinish(finish: string) {
    if (this.state.selectedFinishes.has(finish)) {
      // remove from the selected list
      this.state.selectedFinishes.delete(finish)
      this.setState({selectedFinishes: this.state.selectedFinishes})
    } else {
      this.setState({selectedFinishes: this.state.selectedFinishes.add(finish)})
    }
  }

  private toggleTexture(texture: string) {
    if (this.state.selectedTextures.has(texture)) {
      // remove from the selected list
      this.state.selectedTextures.delete(texture)
      this.setState({selectedTextures: this.state.selectedTextures})
    } else {
      this.setState({selectedTextures: this.state.selectedTextures.add(texture)})
    }
  }

  handleColorPickerChange = (color: ColorResult) => {
    console.log(this.state.selectedColor, color)
    if (this.state.selectedColor === color) {
      this.setState({selectedColor: null})
    } else {
      this.setState({selectedColor: color})
    }
  }

  private setTerm(term: string) {
    this.setState({searchTerm: term})
  }

  private searchFilter() {
    this.setState({loadingMaterials: true})
    this.MaterialService.searchFilter({
      term: this.state.searchTerm,
      type: Array.from(this.state.selectedTypes.values()),
      texture: Array.from(this.state.selectedTextures.values()),
      finish: Array.from(this.state.selectedFinishes.values()),
      color: this.state.selectedColor ? this.state.selectedColor.rgb : undefined})
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

const StyledInput = styled.input`
  ${borderedInput};
  ${block(24)};
`

const StyledColorPicker = styled(CirclePicker)`
`



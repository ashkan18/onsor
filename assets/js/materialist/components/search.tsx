import React, { FormEvent } from "react";
import { FILTERS_QUERY, SEARCH_MATERIALS_QUERY } from "../services/material_service";
import { Spinner, Flex, BorderBox, Sans, Checkbox, Button, Box, Input } from "@artsy/palette";
import { ColorResult, CirclePicker } from 'react-color';
import MaterialWall from "./material_wall";
import styled from "styled-components";
import { Query } from "react-apollo";

interface Color {
  r: number
  g: number
  b: number
}


interface State {
  searchTerm: string | undefined
  selectedTypes: Set<string>
  selectedTextures: Set<string>
  selectedFinishes: Set<string>
  selectedColor: ColorResult | null
}

export default class Search extends React.Component<{}, State>{
  public constructor(props: {}, context: any) {
    super(props, context)
    this.handleColorPickerChange = this.handleColorPickerChange.bind(this)
    this.state = {
      searchTerm: undefined,
      selectedTypes: new Set(),
      selectedTextures: new Set(),
      selectedFinishes: new Set(),
      selectedColor: null
    }
  }

  public render(){
    return(
    <Flex flexDirection="row" justifyContent="space-between" width="100%">
      <BorderBox flexGrow={1}>
        <Query query={FILTERS_QUERY}>
          {({ loading, error, data }) => {
          if (loading) return <Spinner size="small"/>;
          if (error) return `Error! ${error}`;

          return (
            <Flex flexDirection="column" alignContent="space-around">
              <Input onChange={this.setTerm} placeholder="Search" value={this.state.searchTerm}/>
              <Sans size='5'>Types</Sans>
              {data.types.map( (t: string) => <Checkbox key={t} selected={this.state.selectedTypes.has(t)} onSelect={ _e => this.toggleType(t)}> {t} </Checkbox>)}
              <Sans size='5'>Finishes</Sans>
              {data.finishes.map( (t: string) => <Checkbox key={t} selected={this.state.selectedFinishes.has(t)} onSelect={ _e => this.toggleFinish(t)}> {t} </Checkbox>)}
              <Sans size='5'>Textures</Sans>
              {data.textures.map( (t: string) => <Checkbox key={t} selected={this.state.selectedTextures.has(t)} onSelect={ _e => this.toggleTexture(t)}> {t} </Checkbox>)}
              <Sans size='5'>Color</Sans>
              <Box>
                <StyledColorPicker
                  color={ this.state.selectedColor ? this.state.selectedColor.rgb : undefined }
                  onChangeComplete={ this.handleColorPickerChange }/>
              </Box>
              <Button size="small" onClick={ _e => null } mt={3}>Search</Button>
            </Flex>
          )
        }}
        </Query>
      </BorderBox>
      <Query query={SEARCH_MATERIALS_QUERY} variables={{term: this.state.searchTerm, type: Array.from(this.state.selectedTypes.values()), texture: Array.from(this.state.selectedTextures.values()), finish: Array.from(this.state.selectedFinishes.values()), color: this.state.selectedColor ? this.state.selectedColor.rgb : undefined}}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner size="medium"/>;
          if (error) return `Error! ${error}`;

          return(<MaterialWall materials={data.materials} withVendor={true}/>)
        }}
      </Query>
    </Flex>)
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
    if (this.state.selectedColor === color) {
      this.setState({selectedColor: null})
    } else {
      this.setState({selectedColor: color})
    }
  }

  private setTerm(termEvent: FormEvent<HTMLInputElement>) {
    this.setState({searchTerm: termEvent.currentTarget.value})
  }
}

const StyledColorPicker = styled(CirclePicker)`
`



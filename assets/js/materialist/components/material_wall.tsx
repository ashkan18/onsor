import { Flex } from '@artsy/palette'
import React from "react"
import Material from '../models/material';
import MaterialBrick from './material_brick';
import { left } from 'styled-system';

interface Props {
  materials: Array<Material>
}

const MaterialWall = (props: Props) => {
  return (
    <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" alignItems="flex-start" style={ { marginLeft: 20, width: "100%" }}>
      { props.materials.map( m => <MaterialBrick material={m} key={m.id}/>) }
    </Flex>
  )
}

export default MaterialWall
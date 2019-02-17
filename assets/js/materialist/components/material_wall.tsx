import { Flex } from '@artsy/palette'
import React from "react"
import Material from '../models/material';
import MaterialBrick from './material_brick';

interface Props {
  materials: Array<Material>
}

const MaterialWall = (props: Props) => {
  return (
    <Flex flexDirection="row" justifyContent="space-around" flexGrow={4}>
      {props.materials.map( m => <MaterialBrick material={m} key={m.id}/>)}
    </Flex>
  )
}

export default MaterialWall
import { Flex } from '@artsy/palette'
import React from "react"
import Material from '../models/material';
import MaterialBrick from './material_brick';

interface Props {
  materials: Array<Material>
  withVendor: boolean
}

const MaterialWall = (props: Props) => {
  return (
    <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" alignItems="flex-start" style={ { marginLeft: 20, width: "100%" }}>
      { props.materials.map( m => <MaterialBrick material={m} key={m.id} withVendor={props.withVendor} />) }
    </Flex>
  )
}

export default MaterialWall
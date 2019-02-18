import { BorderBox, Flex, Sans, Serif, Button } from '@artsy/palette'
import React from "react"
import Material from '../models/material';

interface Props {
  material: Material
}

const MaterialBrick = (props: Props) => {
  return (
    <BorderBox p={2}>
      <Flex flexDirection="column">
        <Sans size='3t'> {props.material.name}</Sans>
        <Sans size='2'> {props.material.type}</Sans>
        <Button size="small" my={1} width={100}>Contact</Button>
      </Flex>
    </BorderBox>
  )
}

export default MaterialBrick
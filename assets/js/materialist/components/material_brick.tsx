import { BorderBox, Flex, Sans, Serif, Button } from '@artsy/palette'
import React from "react"

interface Props {
  material: any
}


const MaterialBrick = (props: Props) => {
  return (
    <BorderBox p={2} width="50%">
      <Flex flexDirection="column" >
        <Sans size='3t'> {props.material.name}</Sans>
        <Sans size='2'> {props.material.description}</Sans>
        <Button size="small" my={1} width={100}>Contact</Button>
      </Flex>
    </BorderBox>
  )
}

export default MaterialBrick
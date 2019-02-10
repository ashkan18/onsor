import { BorderBox, Flex, Sans, Serif } from '@artsy/palette'
import React from "react"

interface Props {
  material: any
}


const MaterialBrick = (props: Props) => {
  return (
    <Flex>
      <BorderBox p={2}>
        <Sans size='3t'>
          {props.material.name}
        </Sans>
      </BorderBox>
    </Flex>
  )
}

export default MaterialBrick
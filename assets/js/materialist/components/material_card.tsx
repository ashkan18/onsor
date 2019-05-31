import {
  BorderBox,
  Sans,
  Serif,
  Button,
} from "@artsy/palette"

import React from "react"
import Material from '../models/material';
import { Truncator } from "./truncator";


interface Props {
  material: Material
}

const MaterialCard = (props: Props) => {
  let material = props.material
  return (
    <BorderBox flexDirection="column" style={{width: 200}}>
      <Serif size="5t" weight="semibold">
        <Truncator maxLineCount={1}>{material.name}</Truncator>
      </Serif>
      <Serif size="3t" mb={2}>
        <Truncator maxLineCount={1}>{material.type}</Truncator>
      </Serif>
      <Sans size="2" weight="medium">
        <Truncator maxLineCount={1}>Offered By: {material.vendor.name}</Truncator>
      </Sans>
      <Button size="small" my={1} width={100}>Contact</Button>
    </BorderBox>
  )
}

export default MaterialCard

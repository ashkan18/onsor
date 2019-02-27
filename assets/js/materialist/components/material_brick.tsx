import {
  BorderBox,
  Box,
  ResponsiveImage,
  Image,
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

const MaterialBrick = (props: Props) => {
  var material = props.material
  return (
    <BorderBox hover flexDirection="column">
      <Serif size="3t" weight="semibold">
        <Truncator maxLineCount={1}>{material.name}</Truncator>
      </Serif>
      <Serif size="3t">
        <Truncator maxLineCount={1}>{material.type}</Truncator>
      </Serif>
      <Serif size="2">
        { material.vendors && material.vendors.edges.length > 0 ? `Offered By: ${material.vendors.edges.map( vm => vm.node.name).join(", ")}` : '' }
      </Serif>
      {material.photos.length > 0 ?
        <Box>
          <Image src={material.photos[0]["medium"]} />
        </Box> : ''
      }
      <Sans size="2" weight="medium">
        <Truncator maxLineCount={1}>{material.texture}</Truncator>
      </Sans>
      <Button size="small" my={1} width={100}>Contact</Button>
    </BorderBox>
  )
}

export default MaterialBrick
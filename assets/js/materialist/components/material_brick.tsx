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
  return (
    <BorderBox hover flexDirection="column">
      <Serif size="3t" weight="semibold">
        <Truncator maxLineCount={1}>{props.material.name}</Truncator>
      </Serif>
      <Serif size="3t">
        <Truncator maxLineCount={1}>{props.material.type}</Truncator>
      </Serif>
      {props.material.photos.length > 0 ?
        <Box>
          <Image src={props.material.photos[0]["medium"]} />
        </Box> : ''
      }
      <Sans size="2" weight="medium">
        <Truncator maxLineCount={1}>{props.material.texture}</Truncator>
      </Sans>
      <Button size="small" my={1} width={100}>Contact</Button>
    </BorderBox>
  )
}

export default MaterialBrick
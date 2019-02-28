import {
  BorderBox,
  Box,
  Image,
  Sans,
  Serif,
  Button,
} from "@artsy/palette"

import React from "react"
import Material from '../models/material';
import { Truncator } from "./truncator";
import { Link } from "react-router-dom";

interface Props {
  material: Material
}

const MaterialBrick = (props: Props) => {
  let material = props.material
  return (
    <BorderBox hover flexDirection="column">
      <Serif size="3t" weight="semibold">
        <Link to={`/materials/${material.id}`}>
          <Truncator maxLineCount={1}>{material.name}</Truncator>
        </Link>
      </Serif>
      <Sans size="2" weight="medium">
        <Truncator maxLineCount={1}>By: {material.vendor.name}</Truncator>
      </Sans>
      {material.photos.length > 0 ?
        <Box>
          <Image src={material.photos[0]["medium"]} />
        </Box> : ''
      }
      <Serif size="3t">
        <Truncator maxLineCount={1}>{material.type}</Truncator>
      </Serif>
      <Button size="small" my={1} width={100}>Contact</Button>
    </BorderBox>
  )
}

export default MaterialBrick
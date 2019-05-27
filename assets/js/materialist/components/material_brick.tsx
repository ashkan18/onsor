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
import styled from "styled-components";

interface Props {
  material: Material
}

const MaterialBrick = (props: Props) => {
  let material = props.material
  return (
    <StyledLink to={`/materials/${material.id}`}>
      <BorderBox hover flexDirection="column">
        <Serif size="3t" weight="semibold">
          <Truncator maxLineCount={1}>{material.name}</Truncator>
        </Serif>
        <Sans size="2" weight="medium">
          <Truncator maxLineCount={1}>By: {material.vendor.name}</Truncator>
        </Sans>
        {material.photos.length > 0 ?
          <Box style={{marginTop: 10}}>
            <Image src={material.photos[0]["medium"]} />
          </Box> : ''
        }
        <Serif size="3t">
          <Truncator maxLineCount={1}>{material.type}</Truncator>
        </Serif>
        <Button size="small" my={1} width={100}>Contact</Button>
      </BorderBox>
    </StyledLink>
  )
}

export default MaterialBrick

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
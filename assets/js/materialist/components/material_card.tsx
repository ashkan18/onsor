import {
  BorderBox,
  Sans,
  Serif,
  Button,
  Spinner,
} from "@artsy/palette"

import React from "react"
import Material from '../models/material';
import { Truncator } from "./truncator";
import styled from "styled-components";
import { Link } from "react-router-dom";


interface Props {
  material: Material
  onInquiry(materialId: string): void
  inquired: boolean
  loading: boolean
}

const MaterialCard = (props: Props) => {
  let {material, onInquiry, inquired, loading} = props
  return (
    <BorderBox flexDirection="column" style={{width: 200}}>
      <Serif size="5t" weight="semibold">
        <Truncator maxLineCount={1}>{material.name}</Truncator>
      </Serif>
      <Serif size="3t" mb={2}>
        <Truncator maxLineCount={1}>{material.type}</Truncator>
      </Serif>
      <Sans size="2">
        Offered By: <StyledLink to={`/vendors/${material.vendor.id}`}>{material.vendor.name}</StyledLink>
      </Sans>
      {!inquired && <Button size="small" my={1} width={100} onClick={ (_e) => onInquiry(material.id)}>Contact</Button>}
      {loading && <Spinner size="small"/>}
      {inquired && <Serif size="3t" mb={2}>Successfully Inquired</Serif>}
    </BorderBox>
  )
}

export default MaterialCard

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
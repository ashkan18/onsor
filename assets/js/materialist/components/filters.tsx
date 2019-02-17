import React from "react"
import { Flex, Button, Checkbox, Sans, BorderBox } from "@artsy/palette";


interface Props {
  types: Array<string>
  textures: Array<string>
  finishes: Array<string>
}

const Filters = (props: Props) => {
  return (
    <BorderBox>
      <Flex flexDirection="column" flexGrow={1}>
        <Sans size='3'>Types</Sans>
        {props.types.map( t => <Checkbox key={t}> {t} </Checkbox>)}
        <Sans size='3'>Finishes</Sans>
        {props.finishes.map( t => <Checkbox key={t}> {t} </Checkbox>)}
        <Sans size='3'>Textures</Sans>
        {props.textures.map( t => <Checkbox key={t}> {t} </Checkbox>)}
        <Button size="small">Search</Button>
      </Flex>
    </BorderBox>
  )
}

export default Filters
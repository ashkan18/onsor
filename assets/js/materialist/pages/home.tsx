import * as React from "react"
import { Spinner, Flex } from "@artsy/palette"
import Search from "../components/search";


export default class Home extends React.Component<{}, {}>{
  public constructor(props: {}, context: any) {
    super(props, context)
  }

  public render(){
    return(
      <Flex flexDirection="row">
        <Search/>
      </Flex>
    )
  }
}
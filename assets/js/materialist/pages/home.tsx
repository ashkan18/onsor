import * as React from "react"
import { Flex } from "@artsy/palette"
import Search from "../components/search";
import Header from "../components/header";

export default class Home extends React.Component<{}, {}>{
  public constructor(props: {}, context: any) {
    super(props, context)
  }

  public render(){
    return(
      <>
        <Header noLogin={false}/>
        <Flex flexDirection="row">
          <Search/>
        </Flex>
      </>
    )
  }
}
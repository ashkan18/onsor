import * as React from "react"
import { Flex, Button } from "@artsy/palette"
import AuthService from "../services/auth_service";
import styled from "styled-components";
import { borderedInput } from "../components/mixins";
import { block } from "../components/helpers";
import Header from "../components/header";
import { Redirect } from "react-router";

interface State {
  username: string
  password: string
  loggedIn: boolean
  error?: string
}

export default class Login extends React.Component<{}, State>{
  authService: AuthService = new AuthService;
  public constructor(props: {}, context: any) {
    super(props, context)
    this.state = { loggedIn: false, username: "", password: "" }
  }

  public render(){
    return(
      <>
        { this.state.loggedIn && <Redirect to={'/'}/> }
        <Header noLogin={true}/>
        <Flex flexDirection="column">
          { this.state.error}
          <StyledInput type="text" onChange={e => this.setUsername(e.target.value)} placeholder="UserName" value={this.state.username}/>
          <StyledInput type="password" onChange={e => this.setPassword(e.target.value)} placeholder="Password" value={this.state.password}/>
        </Flex>
        <Button size="large" onClick={ _e => this.login() } mt={3}>Login</Button>
      </>
    )
  }

  private setUsername(username: string) {
    this.setState({username})
  }
  private setPassword(password: string) {
    this.setState({password})
  }

  private login(){
    this.authService.login(this.state.username, this.state.password)
      .then(() => this.setState({loggedIn: true}))
      .catch( (error) => this.setState({error}))
  }
}

const StyledInput = styled.input`
  ${borderedInput};
  ${block(14)};
`
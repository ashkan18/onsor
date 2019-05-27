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
  passwordConfirmation: string
  name: string
  loggedIn: boolean
  error?: string
}

export default class Signup extends React.Component<{}, State>{
  authService: AuthService = new AuthService;
  public constructor(props: {}, context: any) {
    super(props, context)
    this.state = { loggedIn: false, name: "", username: "", password: "", passwordConfirmation: "" }
  }

  public render(){
    return(
      <>
        { this.state.loggedIn && <Redirect to={'/'}/> }
        <Header noLogin={true}/>
        <Flex flexDirection="column">
          { this.state.error}
          <StyledInput type="email" onChange={e => this.setUsername(e.target.value)} placeholder="UserName" value={this.state.username}/>
          <StyledInput type="text" onChange={e => this.setName(e.target.value)} placeholder="Name" value={this.state.name}/>
          <StyledInput type="password" onChange={e => this.setPassword(e.target.value)} placeholder="Password" value={this.state.password}/>
          <StyledInput type="password" onChange={e => this.setpasswordConfirmation(e.target.value)} placeholder="Password Confirmation" value={this.state.passwordConfirmation}/>
        </Flex>
        <Button size="large" onClick={ _e => this.signup() } mt={3}>Signup!</Button>
      </>
    )
  }

  private setName(name: string) {
    this.setState({name})
  }
  private setUsername(username: string) {
    this.setState({username})
  }
  private setPassword(password: string) {
    this.setState({password})
  }
  private setpasswordConfirmation(passwordConfirmation: string) {
    this.setState({passwordConfirmation})
  }

  private signup(){
    this.authService.signup(this.state.username, this.state.password, this.state.passwordConfirmation, this.state.name)
      .then(() => this.setState({loggedIn: true}))
      .catch( (error) => this.setState({error}))
  }
}

const StyledInput = styled.input`
  ${borderedInput};
  ${block(14)};
`
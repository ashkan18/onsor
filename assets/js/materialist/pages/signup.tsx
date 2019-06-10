import * as React from "react"
import { Flex, Button, Input, BorderBox } from "@artsy/palette"
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
        <Flex flexDirection="column" width={'80%'}>
          { this.state.error}
          <Input type="email" onChange={e => this.setUsername(e.currentTarget.value)} title="UserName" value={this.state.username}/>
          <Input type="text" onChange={e => this.setName(e.currentTarget.value)} title="Name" value={this.state.name}/>
          <Input type="password" onChange={e => this.setPassword(e.currentTarget.value)} title="Password" value={this.state.password}/>
          <Input type="password" onChange={e => this.setpasswordConfirmation(e.currentTarget.value)} title="Password Confirmation" value={this.state.passwordConfirmation}/>
          <Button size="large" onClick={ _e => this.signup() } mt={3}>Signup!</Button>
        </Flex>
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

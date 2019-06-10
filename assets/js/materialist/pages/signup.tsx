import * as React from "react"
import { Flex, Button, Input, BorderBox, Join, Spacer } from "@artsy/palette"
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
        <Join separator={<Spacer m={1} />}>
          { this.state.error}
          <Input type="text" onChange={e => this.setName(e.currentTarget.value)} title="Name" value={this.state.name}/>
          <Input type="email" onChange={e => this.setUsername(e.currentTarget.value)} title="Username" value={this.state.username}/>
          <Input type="password" onChange={e => this.setPassword(e.currentTarget.value)} title="Password" value={this.state.password}/>
          <Input type="password" onChange={e => this.setpasswordConfirmation(e.currentTarget.value)} title="Password Confirmation" value={this.state.passwordConfirmation}/>
          <Button size="medium" onClick={ _e => this.signup() } mt={1}>Signup!</Button>
        </Join>
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

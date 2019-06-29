import * as React from "react"
import { Button, Input, Join, Spacer, Box } from "@artsy/palette"
import { Link } from 'react-router-dom';
import AuthService from "../services/auth_service";
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
        <Box m={3} mt={6}>
          <Join separator={<Spacer m={1} />}>
            { this.state.error && <> {this.state.error} </> }
            <Input onChange={e => this.setUsername(e.currentTarget.value)} placeholder="Email" value={this.state.username}/>
            <Input onChange={e => this.setPassword(e.currentTarget.value)} placeholder="Password" value={this.state.password} type="password"/>
            <Button size="medium" onClick={ _e => this.login() }>Login</Button>
            <>Don't have an account? click <Link to={'/signup'}>here</Link></>
          </Join>
        </Box>
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

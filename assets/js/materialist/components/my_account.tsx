import { Flex, Spinner, Button } from '@artsy/palette'
import React from "react"
import { Link } from "react-router-dom";
import User from '../models/user';
import AuthService from '../services/auth_service'

interface State {
  user: User | null
  isLoggedIn: boolean
}

export default class MyAccount extends React.Component<{}, State>{
  authService: AuthService = new AuthService()

  public constructor(props: {}, context: any) {
    super(props, context)
    let token = this.authService.getToken()
    this.state = { isLoggedIn: token !== null, user: null }
    if (this.state.isLoggedIn) this.fetchUser()
  }

  public render(){
    const { user, isLoggedIn } = this.state
    return (
      <>
        {isLoggedIn && user && <div> Logout </div>}
        {isLoggedIn && <Spinner/>}
        {!isLoggedIn && <Button>Login</Button>}
      </>
    )
  }

  private fetchUser(){
    this.authService.me()
      .then(user => this.setState({user}))
      .catch(_error => this.setState({isLoggedIn: false, user: null}))
  }
}
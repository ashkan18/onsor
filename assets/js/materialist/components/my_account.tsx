import { Flex, Spinner, Button } from '@artsy/palette'
import React from "react"
import User from '../models/user';
import AuthService from '../services/auth_service'
import { Link } from 'react-router-dom';

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
      <div>
        {isLoggedIn && user && <div> Logout </div>}
        {/* {isLoggedIn && <Spinner/>} */}
        {!isLoggedIn &&
          <Flex flexDirection="row" justifyContent="space-between" width={150} mt={1}>
            <Link to={'/login'}>
              <Button size="small">Login</Button>
            </Link>
            <Link to={'/signup'}>
              <Button size="small">SignUp</Button>
            </Link>
          </Flex>}
      </div>
    )
  }

  private fetchUser(){
    this.authService.me()
      .then(user => this.setState({user}))
      .catch(_error => this.setState({isLoggedIn: false, user: null}))
  }
}
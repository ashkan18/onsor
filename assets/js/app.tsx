// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
const css = require('../css/app.css');

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React from "react"
import ReactDOM from "react-dom"
import { Theme, injectGlobalStyles, Box } from "@artsy/palette"
import { Route, Switch } from "react-router"
import { BrowserRouter as Router} from "react-router-dom"
import Home from "./materialist/pages/home"
import MaterialPage from "./materialist/pages/material_page"
import Login from "./materialist/pages/login"
import Signup from "./materialist/pages/signup"
import VendorPage from "./materialist/pages/vendor"

import ApolloClient from "apollo-client"
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from "react-apollo"
import AuthService from "./materialist/services/auth_service"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: '/api',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (new AuthService).getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const { GlobalStyles } = injectGlobalStyles()
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Theme style={{width: "100%"}}>
          <Box m={1}>
            <GlobalStyles />
            <Router>
              <Switch>
                <Route path="/materials/:materialId" component={MaterialPage}/>
                <Route path="/vendors/:vendorId" component={VendorPage}/>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" component={Home}/>
              </Switch>
            </Router>
          </Box>
        </Theme>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("react-app")
)
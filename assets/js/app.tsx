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
import { Theme, injectGlobalStyles, Grid } from "@artsy/palette"
import { Route, Switch } from "react-router";
import { BrowserRouter as Router} from "react-router-dom"
import Home from "./materialist/pages/home";
import MaterialPage from "./materialist/pages/material_page";
import Login from "./materialist/pages/login";
import Signup from "./materialist/pages/signup";
import VendorPage from "./materialist/pages/vendor";

const { GlobalStyles } = injectGlobalStyles()
class App extends React.Component {
  render() {
    return (
      <Theme style={{width: "100%"}}>
        <Grid fluid>
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
        </Grid>
      </Theme>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("react-app")
)
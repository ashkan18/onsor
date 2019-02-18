// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

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
import Home from "./materialist/pages/home"
import { Theme, injectGlobalStyles } from "@artsy/palette"

const GlobalStyles = injectGlobalStyles()

class App extends React.Component {
  render() {
    return (
      <Theme>
        <Home/>
      </Theme>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("react-app")
)
import React from "react"

interface Props {
  children?: any
}

export class ErrorBoundary extends React.Component<Props> {
  render() {
    return this.props.children
  }
}
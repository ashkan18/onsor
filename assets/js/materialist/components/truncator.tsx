import React from "react"
import ReactDOM from "react-dom/server"
import { ErrorBoundary } from "./error_boundry"

interface Props {
  maxLineCount?: number
  ellipsis?: string
  ReadMoreLink?: () => any
}

export const Truncator: React.SFC<Props> = ({
  ReadMoreLink,
  children,
  ellipsis,
  maxLineCount,
}) => {
  const html = ReactDOM.renderToStaticMarkup(<span>{children}</span>)
  let readMoreHTML = null

  if (ReadMoreLink) {
    readMoreHTML = ReactDOM.renderToStaticMarkup(ReadMoreLink())
  }

  // FIXME: Make safe for tests
  let HTMLEllipsis

  const responsiveHOC = require("react-lines-ellipsis/lib/responsiveHOC")
  HTMLEllipsis = responsiveHOC()(require("react-lines-ellipsis/lib/html"))
  return (
    <ErrorBoundary>
      <HTMLEllipsis
        unsafeHTML={html}
        maxLine={maxLineCount || 2}
        ellipsis={ellipsis}
        ellipsisHTML={readMoreHTML}
      />
    </ErrorBoundary>
  )
}
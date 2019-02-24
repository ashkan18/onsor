import { css } from "styled-components"
import colors from "../assets/colors";
import { garamond } from "../assets/fonts";

export const borderedInput = (props: InputProps & BorderProps = {}) => {
  return css`
    padding: 10px;
    box-shadow: none;
    transition: border-color 0.25s;
    margin-right: 10px;
    resize: none;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &::placeholder {
      color: ${colors.grayMedium};
      text-overflow: ellipsis;
      line-height: normal;
    }
    ${garamond("s17")};
    ${border(props)};
  `
}

export interface BorderProps {
  hasError?: boolean
}
export const border = (props: BorderProps = {}) => {
  return css`
    border: 1px solid ${props.hasError ? colors.redMedium : colors.grayRegular};
    transition: border-color 0.25s;
    &:hover,
    &:focus,
    &.focused {
      border-color: ${props.hasError ? colors.redMedium : colors.purpleRegular};
      outline: 0;
    }
    &:disabled {
      border: 2px dotted ${colors.grayRegular};
    }
  `
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  block?: boolean
  description?: string
  error?: string
  ref?: React.RefObject<any>
  title?: string
}

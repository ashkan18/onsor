import { Flex, Spacer } from '@artsy/palette'
import React from "react"
import { Link } from "react-router-dom"
import MyAccount from './my_account'
import styled from 'styled-components';

interface Props {
  noLogin: boolean
}

const Header = (props: Props) => {
  return (
    <>
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" alignContext="center" style={ { marginTop: 20, width: "100%"  }}>
        <StyledLink to={"/"}>
          <><span style={{fontSize: 33}}>M</span><span style={{fontSize: 12}}>ateria</span><span style={{fontSize: 33}}>.L</span><span style={{fontSize: 12}}>ist</span></>
        </StyledLink>
        { !props.noLogin && <MyAccount/> }
      </Flex>
      <Spacer m={3} />
    </>
  )
}

export default Header

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
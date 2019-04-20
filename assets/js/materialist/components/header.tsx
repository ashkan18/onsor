import { Flex } from '@artsy/palette'
import React from "react"
import { Link } from "react-router-dom"
import MyAccount from './my_account'


const Header = (_props: {}) => {
  return (
    <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" style={ { marginTop: 20, width: "100%"  }}>
      <Link to={"/"}>
        <h3>M<span style={{fontSize: 16}}>ateria</span>.L<span style={{fontSize: 16}}>ist</span></h3>
      </Link>
      <MyAccount/>
    </Flex>
  )
}

export default Header
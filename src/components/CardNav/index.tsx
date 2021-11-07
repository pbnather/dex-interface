import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from 'trinityhelper'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <StyledNav>
    <ButtonMenu activeIndex={activeIndex} scale="md" variant="primary">
      <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link} style={{borderRadius: '30px'}}>
        <TranslatedText translationId={8}>Swap</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link} style={{borderRadius: '30px'}}>
        <TranslatedText translationId={74}>Liquidity</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem id="pool-nav-link" to="/migrate" as={Link} style={{borderRadius: '30px'}}>
        <TranslatedText translationId={74}>Migrate</TranslatedText>
      </ButtonMenuItem>
     
    </ButtonMenu>
  </StyledNav>
)

export default Nav

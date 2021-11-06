import React from 'react'
import styled from 'styled-components'


const Background = styled.div`
background: linear-gradient(
    10deg,
    ${({ theme }) => theme.isDark? darkGradient:`rgb(94,218,106), ${theme.colors.background}`}
    );
`
export default Background
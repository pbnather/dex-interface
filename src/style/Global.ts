
import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'trinityhelper/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const darkGradient = "rgb(38, 98, 71), rgb(36, 37, 36)"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background: linear-gradient(
      10deg,
      ${({ theme }) => theme.isDark? darkGradient:`rgb(94,218,106), ${theme.colors.background}`}
      );

  
      
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle

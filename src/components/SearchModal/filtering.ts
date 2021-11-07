import { Token } from '@morpheusswap/sdk'
import defaultTokenJson from 'constants/token/pancakeswap.json'
import { isAddress } from '../../utils'

export function filterTokens(tokens: Token[], search: string, lpTokens?: boolean, dexx?: string): Token[] {
  // filter lp vs non lp tokens
  console.log('THE DEX IS', dexx, defaultTokenJson.tokens)

  tokens = tokens.filter(t => {
    for(let j = 0; j < defaultTokenJson.tokens.length; j++) {
      if(defaultTokenJson.tokens[j].symbol === t.symbol) {

        if(lpTokens && defaultTokenJson.tokens[j].lp) {
          console.log('the lp token dex is', defaultTokenJson.tokens[j].dex,dexx)
          if(defaultTokenJson.tokens[j].dex === dexx) {
            console.log('same token')
            return true;
          }
          // return true;
        }
        if(!lpTokens && !defaultTokenJson.tokens[j].lp) return true;
        return false;
      }

    }

    return false;
  })

  if (search.length === 0) return tokens

    console.log('filter tokens function')
  const searchingAddress = isAddress(search)

  if (searchingAddress) {
    return tokens.filter((token) => token.address === searchingAddress)
  }

  const lowerSearchParts = search
    .toLowerCase()
    .split(/\s+/)
    .filter((s) => s.length > 0)

  if (lowerSearchParts.length === 0) {
    return tokens
  }

  const matchesSearch = (s: string): boolean => {
    const sParts = s
      .toLowerCase()
      .split(/\s+/)
      .filter((str) => str.length > 0)

    return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)))
  }

  return tokens.filter((token) => {
    const { symbol, name } = token

    console.log('DEFAULT TOKENJSON', defaultTokenJson, typeof defaultTokenJson)
    if(lpTokens) {
      console.log(defaultTokenJson, typeof defaultTokenJson)
    } 

    return (symbol && matchesSearch(symbol)) || (name && matchesSearch(name))
  })
}

export default filterTokens

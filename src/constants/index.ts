import { JSBI, Percent, Token } from 'morph-sdk'

export const ROUTER_ADDRESS = '0x8aC868293D97761A1fED6d4A01E9FF17C5594Aa3'

export declare enum ChainId {
  MAINNET = 250,
  BSCTESTNET = 4002
}

export const WETH = {
  250: new Token(250, '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18, 'WFTM', 'Wrapped FTM')
}

const MAINNET = 250;
const BSCTESTNET = 4002;

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(MAINNET, '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(MAINNET, '0x04068da6c83afcfa0e13ba15a6696662335d5b75', 6, 'USDC', 'USDC')
export const USDT = new Token(MAINNET, '0x049d68029688eabf473097a2fc38ef61633a3c7a', 6, 'fUSDT', 'Frapped USDT')
export const MIM = new Token(
  MAINNET,
  '0x82f0B8B456c1A451378467398982d4834b6829c1',
  18,
  'MIM',
  'Magic Internet Money'
)

const WETH_ONLY: ChainTokenList = {
  [MAINNET]: [WETH[MAINNET]],
  [BSCTESTNET]: [WETH[BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [MAINNET]: [...WETH_ONLY[MAINNET], DAI, USDC, USDT, MIM],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [MAINNET]: [...WETH_ONLY[MAINNET], DAI, USDC, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [MAINNET]: [...WETH_ONLY[MAINNET], DAI, USDC, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [MAINNET]: [
    [
      new Token(MAINNET, '0x0789fF5bA37f72ABC4D561D00648acaDC897b32d', 18, 'MORPH', 'Morpheus Token'),
      new Token(MAINNET, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18, 'WFTM', 'Wrapped FTM'),
    ],
    [USDC, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

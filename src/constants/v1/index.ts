import { Interface } from '@ethersproject/abi'
// import { ChainId } from 'morph-sdk'
import V1_EXCHANGE_ABI from './v1_exchange.json'
import V1_FACTORY_ABI from './v1_factory.json'

export declare enum ChainId {
  MAINNET = 250,
  BSCTESTNET = 4002
}

const MAINNET = 250;
const BSCTESTNET = 4002

const V1_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [MAINNET]: '0xEF45d134b73241eDa7703fa787148D9C9F4950b0', // TODO
  [BSCTESTNET]: '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F'
}

const V1_FACTORY_INTERFACE = new Interface(V1_FACTORY_ABI)
const V1_EXCHANGE_INTERFACE = new Interface(V1_EXCHANGE_ABI)

export { V1_FACTORY_ADDRESSES, V1_FACTORY_INTERFACE, V1_FACTORY_ABI, V1_EXCHANGE_INTERFACE, V1_EXCHANGE_ABI }

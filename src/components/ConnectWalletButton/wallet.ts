// Set of helper functions to facilitate wallet setup

import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add AVAX as a network on Metamask, or switch to AVAX if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum

  if (provider) {
    const chainId = parseInt('250', 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Fantom Opera',
            nativeCurrency: {
              name: 'FTM',
              symbol: 'ftm',
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: ['https://ftmscan.com/'],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the Fantom network on metamask because window.ethereum is undefined")
    return false
  }
}

export default setupNetwork
// /**
//  * Prompt the user to add a custom token to metamask
//  * @param tokenAddress
//  * @param tokenSymbol
//  * @param tokenDecimals
//  * @param tokenImage
//  * @returns {boolean} true if the token has been added, false otherwise
//  */
// export const registerToken = async (
//   tokenAddress: string,
//   tokenSymbol: string,
//   tokenDecimals: number,
//   tokenImage?: string,
// ) => {
//   const tokenAdded = await (window as Window).ethereum.request({
//     method: 'wallet_watchAsset',
//     params: {
//       type: 'ERC20',
//       options: {
//         address: tokenAddress,
//         symbol: tokenSymbol,
//         decimals: tokenDecimals,
//         image: tokenImage,
//       },
//     },
//   })

//   return tokenAdded
// }

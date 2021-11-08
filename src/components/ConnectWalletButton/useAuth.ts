import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
    InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { ConnectorNames, connectorLocalStorageKey } from 'trinityhelper'
// import { useToast } from 'state/hooks'
import { setupNetwork } from './wallet'
import { useToast } from './Toasts'

const injected = new InjectedConnector({ supportedChainIds: [250] })

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
  }

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()

  const login = useCallback((connectorID: ConnectorNames) => {
    const storagekey = window.localStorage.getItem(connectorLocalStorageKey);

    const connector = connectorsByName[connectorID]

    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError) {
            toastError('Provider Error', 'No provider was found')
          } else if (error instanceof UserRejectedRequestErrorInjected) {
            toastError('Authorization Error', 'Please authorize to access your account')
          } else {
            toastError(error.name, error.message)
          }
        }
      })
    } else {
      toastError("Can't find connector", 'The connector config is wrong')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth

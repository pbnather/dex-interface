import React from 'react'
import { Button, useWalletModal } from 'trinityhelper'
import useI18n from 'hooks/useI18n'
import useAuth from './useAuth'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button variant="tertiary" onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton

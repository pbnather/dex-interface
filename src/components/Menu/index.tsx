import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'trinityhelper'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useAuth from '../ConnectWalletButton/useAuth'
// import useGetLocalProfile from 'hooks/useGetLocalProfile'
import links from './config'

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  const cakePriceUsd = priceData ? Number(priceData.prices.Cake) : undefined

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={languageList}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      // profile={profile}
      {...props}
    />
  )
}

export default Menu

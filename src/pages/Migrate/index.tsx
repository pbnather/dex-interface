import { Token } from 'morph-sdk'
import React, { useEffect, useState } from 'react'
// import { ArrowDown } from 'react-feather'
import { CardBody, Button, Text } from 'trinityhelper'
// import { ThemeContext }  from 'styled-components'
// import AddressInputPanel from 'components/AddressInputPanel'
// import Card, { GreyCard } from 'components/Card'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
// import { AutoColumn } from 'components/Column'
// import ConfirmSwapModal from 'components/swap/ConfirmSwapModal'

// import { useSingleCallResult } from 'state/multicall/hooks'

// import CurrencyInputPanel from 'components/CurrencyInputPanel'
// import CurrencyLogo from 'components/CurrencyLogo'
import CardNav from 'components/CardNav'
import { RowBetween } from 'components/Row'
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
// import BetterTradeLink from 'components/swap/BetterTradeLink'
// import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import { Wrapper } from 'components/swap/styleds'
// import TradePrice from 'components/swap/TradePrice'
// import TokenWarningModal from 'components/TokenWarningModal'
// import SyrupWarningModal from 'components/SyrupWarningModal'
// import ProgressSteps from 'components/ProgressSteps'
// import { BETTER_TRADE_LINK_THRESHOLD } from 'constants/index'
// import { isTradeBetter } from 'data/V1'
import { useActiveWeb3React } from 'hooks'
// import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
// import { useSwapCallback } from 'hooks/useSwapCallback'
import useToggledVersion, { Version } from 'hooks/useToggledVersion'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { tryParseAmount, useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
// import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
// import { TYPE } from 'components/Shared'
// import { maxAmountSpend } from 'utils/maxAmountSpend'
// import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
// import Loader from 'components/Loader'
// import { TranslateString } from 'utils/translateTextHelpers'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import PageHeader from 'components/PageHeader'
// import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'
import { getContract } from 'utils';
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import { BigNumber } from '@ethersproject/bignumber'

import { useCurrencyBalance } from '../../state/wallet/hooks'

// import { SearchInput } from '../../components/SearchModal/styleds'
// import { useAllTokens, useToken } from '../../hooks/Tokens'
import AppBody from '../AppBody'

/*
 * ABIS
 */
import zapABI from './abis/zap.json';

// zapper contract automatically breaks the liquditiy and creates it at different dex
// const DEXES = {
//   'spooky': {
//     name: 'spooky',
//     contractAddresses: {
//       factory: '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3',
//       router: '0xF491e7B69E4244ad4002BC14e878a34207E38c29',
//       zap: ''
//     }
//   },
//   'spirit': {
//     name: 'Spiritswap',
//     contractAddresses: {
//       factory: '0xEF45d134b73241eDa7703fa787148D9C9F4950b0',
//       router: '0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52',
//       zap: ''
//     }
//   }
// }


// const { main: Main } = TYPE

const Migrate = () => {
  // const web3 = useActiveWeb3React();
  const { account, chainId, library } = useActiveWeb3React();
  const [modalOpen, setModalOpen] = useState(false);





  // const [tokenSearch, setTokenSearch] = useState<string>('')
  // const handleTokenSearchChange = useCallback(e => setTokenSearch(e.target.value), [setTokenSearch])

  // automatically add the search token
  // const token = useToken(tokenSearch)
  const [token, setToken] = useState<Token>();
  // const [balance, setBalance] = useState(null)
  const [dex, setDex] = useState(null);
  const [dexError, setDexError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, token ?? undefined)
  const maxAmountInput = maxAmountSpend(selectedCurrencyBalance);

  // useEffect(() => {
  //   console.log('selected bal', selectedCurrencyBalance);
  // }, [selectedCurrencyBalance])


  // const loadedUrlParams = useDefaultsFromURLSearch()


  // token warning stuff
  // const [loadedInputCurrency, loadedOutputCurrency] = [
  //   useCurrency(loadedUrlParams?.inputCurrencyId),
  //   useCurrency(loadedUrlParams?.outputCurrencyId),
  // ]
  // const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  // const [isSyrup, setIsSyrup] = useState<boolean>(false)
  // const [syrupTransactionType, setSyrupTransactionType] = useState<string>('')
  // const urlLoadedTokens: Token[] = useMemo(
  //   () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
  //   [loadedInputCurrency, loadedOutputCurrency]
  // )

  useEffect(() => {
    if (!account) return;
    setAccountError(false);
  }, [account])

  const [approval, approveCallback] = useApproveCallback(tryParseAmount('9999999999', token), chainId && '0xDD9Ac0d6B5DBD3b009acc36ba40B4db657881e11')

  // console.log('the approval is', approval)
  const [inputAmount, setInputAmount] = useState('');
  const [inputFloatAmount, setInputFloatAmount] = useState(0);

  // const theme = useContext(ThemeContext)

  // const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  // const [deadline] = useUserDeadline()
  // const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { typedValue } = useSwapState()
  const {
    v1Trade,
    v2Trade,
    // currencyBalances,
    // parsedAmount,
    currencies,
    // inputError: swapInputError,
  } = useDerivedSwapInfo()
  const { wrapType } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  //   const { address: recipientAddress } = useENSAddress(recipient)
  const toggledVersion = useToggledVersion()
  const trade = showWrap
    ? undefined
    : {
      [Version.v1]: v1Trade,
      [Version.v2]: v2Trade,
    }[toggledVersion]

  // const betterTradeLinkVersion: Version | undefined =
  //   toggledVersion === Version.v2 && isTradeBetter(v2Trade, v1Trade, BETTER_TRADE_LINK_THRESHOLD)
  //     ? Version.v1
  //     : toggledVersion === Version.v1 && isTradeBetter(v1Trade, v2Trade)
  //     ? Version.v2
  //     : undefined

  // const parsedAmounts = showWrap
  //   ? {
  //       [Field.INPUT]: parsedAmount,
  //       [Field.OUTPUT]: parsedAmount,
  //     }
  //   : {
  //       [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
  //       [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
  //     }

  // const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  // const isValid = !swapInputError
  // const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  // modal and loading
  // const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
  //   showConfirm: boolean
  //   tradeToConfirm: Trade | undefined
  //   attemptingTxn: boolean
  //   swapErrorMessage: string | undefined
  //   txHash: string | undefined
  // }>({
  //   showConfirm: false,
  //   tradeToConfirm: undefined,
  //   attemptingTxn: false,
  //   swapErrorMessage: undefined,
  //   txHash: undefined,
  // })

  // const formattedAmounts = {
  //   [independentField]: typedValue,
  //   [dependentField]: showWrap
  //     ? parsedAmounts[independentField]?.toExact() ?? ''
  //     : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  // }

  // const route = trade?.route
  // const userHasSpecifiedInputOutput = Boolean(
  //   currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  // )
  // const noRoute = !route

  // check whether the user has approved the router on the input token
  // const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [account, approval, approvalSubmitted])

  const handleDexSelect = (e) => {
    setDex(e.target.value);
    setDexError(false);
    setToken(undefined);
    setInputAmount('');
    setInputFloatAmount(0);
  }

  const onCurrencySelect = _token => {
    setToken(_token);
  }

  const openTokenSelect = () => {
    if (!account) {
      // console.log('account error!')
      setAccountError(true);
    } else if (!dex) {
      setAccountError(false);
      setDexError(true);
    } else {
      setAccountError(false);
      setDexError(false);
      setModalOpen(true);

      // console.log('SET MODAL OPEN', modalOpen)
    }
  }

  const handleDismissSearch = () => {
    // console.log('dismingging..')
    setModalOpen(false);
  }

  const onUpdateAmount = e => {
    // Do not let people to input more than 18 decimal points
    setInputAmount(parseFloat(e.target.value) !== 0 ? parseFloat(e.target.value).toFixed(18).replace(/\.?0+$/, "") : e.target.value || '');
    setInputFloatAmount(parseFloat(e.target.value) || 0);
  }


  const onMax = () => {
    if (maxAmountInput) {
      setInputAmount(maxAmountInput.toExact().toString() || '');
      setInputFloatAmount(parseFloat(maxAmountInput.toExact().toString()) || 0);
    }
  }


  const onApprove = () => {
    // console.log('approve')
    // show pending toast UI
    approveCallback();
    // let approvalState = await useApproveCallback(99999000000000000000000, '0x0789ff5ba37f72abc4d561d00648acadc897b32d');
    // console.log(approvalState);
    // setApprovalSubmitted(approvalState);
    // approval takes address of token you're trying to interact with
    // call function from token address, called allow .. or something
    // allows other contract to trade with it

  }




  // eslint-disable-next-line
  const onMigrate = async e => {
    if (!token || !inputAmount || !library) return;
    const zapContract = getContract('0xDD9Ac0d6B5DBD3b009acc36ba40B4db657881e11', zapABI, library);

    const typedValueParsed = parseUnits(inputAmount, token.decimals).toString()
    // call zap contract function here with approved LP token
    // https://ftmscan.com/tx/0x05448d7b1d1b3d18bf8e48a4aa5246539580820abdc5c4bd468e9bc20e15aedf

    const signer = zapContract.connect(library.getSigner());
    if (!signer) {
      // console.log('no signer//error');
      // return;
    }
    // eslint-disable-next-line
    // console.log(inputAmount);
    // console.log(typedValueParsed);
    const zapped = await signer.zapAcross(
      token.address, // token address
      typedValueParsed, // amount to transfer
      '0x8aC868293D97761A1fED6d4A01E9FF17C5594Aa3', // morph router address
      account // user address
    );

  }

  return (
    <>
      <CardNav activeIndex={2} />
      <AppBody width={600}>
        <Wrapper id="swap-page">

          <PageHeader title="Migrate" description="Migrate your LP to Morpheus Swap" noSettings />

          <CardBody>
            <RowBetween my="1rem">
              <div style={{ position: 'relative' }}>
                <div style={{ borderWidth: 2, padding: 10, borderRadius: 15, display: 'inline', borderStyle: 'solid', borderColor: '#5eda6a' }}>
                  <select onChange={handleDexSelect} style={{ outline: 'none', border: 'none', backgroundColor: '#242524', color: '#5eda6a', fontFamily: 'inherit', fontWeight: 600, fontSize: 18 }}>
                    <option value="" disabled selected>DEX to migrate LPs from</option>
                    <option value="spooky">SpookySwap</option>
                    <option value="spirit">SpiritSwap</option>
                  </select>
                </div>
                <br /><br />
                {dexError ? <Text style={{ position: 'absolute', left: 50, bottom: -25, color: 'rgb(175, 52, 52)', fontWeight: 200 }}>Select a DEX first</Text> : ''}
                {accountError ? <Text style={{ position: 'absolute', left: 30, bottom: -25, color: 'rgb(175, 52, 52)', fontWeight: 200 }}>Connect your wallet first</Text> : ''}
              </div>

              <div style={{ backgroundColor: '#3f403f', borderRadius: 10, padding: 20, width: 280, textAlign: 'center' }}>
                {token && selectedCurrencyBalance ? <Text>Balance: {selectedCurrencyBalance?.toSignificant(6)}</Text> : <Text>-</Text>}
                <br />
                {token && token.name ?
                  <Text style={{ cursor: 'pointer' }} onClick={openTokenSelect}>
                    {token.name}
                  </Text>
                  : <Button variant="secondary" style={{ cursor: 'pointer', fontSize: 14 }} onClick={openTokenSelect}>Choose an LP token</Button>}
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box', height: 54, alignItems: 'center', padding: '10px 20px', borderRadius: 10, backgroundColor: '#242524', fontSize: 18, width: '100%' }}>
                  <input placeholder="0" value={inputAmount} type="number" onChange={onUpdateAmount} style={{ color: '#fff', border: 'none', background: 'none', outline: 'none' }} />
                  {account && token && (
                    <Button onClick={onMax} scale="sm" variant="text" style={{ position: 'relative', left: -5 }}>
                      MAX
                    </Button>
                  )}
                </div>
              </div>

            </RowBetween>

            <br />
            {!token ?
              <div><Button disabled style={{ width: '100%' }}>SELECT TOKEN</Button></div>
              : <div>

                {(inputFloatAmount <= 0) || (selectedCurrencyBalance && inputFloatAmount > parseFloat(selectedCurrencyBalance?.toExact()) || (selectedCurrencyBalance && selectedCurrencyBalance?.toSignificant(6) === '0')) ?
                  <Button disabled style={{ width: '100%' }}>Insufficient balance</Button>

                  :
                  <RowBetween >
                    <Button disabled={approval === ApprovalState.APPROVED} style={{ width: '49%' }} onClick={onApprove}>Approve</Button>
                    <Button disabled={approval !== ApprovalState.APPROVED} style={{ width: '49%' }} onClick={onMigrate}>Migrate</Button>
                  </RowBetween>
                }
              </div>
            }


          </CardBody>

          <CurrencySearchModal
            isOpen={modalOpen}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            selectedCurrency={token || null}
            isLPTokenSearch
            dex={dex || ''}
          // otherSelectedCurrency={otherCurrency}
          // showCommonBases={showCommonBases}
          />


        </Wrapper>
      </AppBody>
      <AdvancedSwapDetailsDropdown trade={trade} />

    </>
  )
}

export default Migrate;

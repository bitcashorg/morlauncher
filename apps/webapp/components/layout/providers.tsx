'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from '@/hooks/use-session'
import {
  RainbowKitProvider,
  Theme,
  getDefaultConfig,
  lightTheme
} from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import { appConfig } from '@/lib/config'
import multibase, { MultibaseProvider } from '@multibase/js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { eosEvmTestnet } from 'smartsale-env'
import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { UseSigningRequestProvider } from '@/hooks/use-signing-request'
import { merge } from 'lodash'

const queryClient = new QueryClient()

export const wagmiConfig = getDefaultConfig({
  appName: 'Bitlauncher',
  projectId: '25a868c834c1003aa0f0b69aba0ae056',
  wallets: [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, trustWallet, walletConnectWallet]
    }
  ],
  // @ts-ignore
  chains: [{ ...eosEvmTestnet, fees: undefined }, sepolia]
})

const customRainbowKitTheme = merge(lightTheme(), {
  colors: {
    connectButtonBackground: '#fff',
    connectButtonInnerBackground: '#fff',
    connectButtonText: '#000'
  },
  radii: {
    actionButton: '9999px', // Custom radius for action buttons,
    connectButton: '9999px' // Custom radius for action buttons
  }
  // fonts: {
  //   body: '...'
  // }
} as Theme)

if (typeof window !== 'undefined') {
  const multibaseKey = appConfig.multibase.key

  if (!multibaseKey) {
    console.error('Missing MULTIBASE_API_KEY')
  } else {
    multibase.init(multibaseKey)
    console.info('Multibase Initialized')
  }
}

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider
              theme={customRainbowKitTheme}
              modalSize="compact"
              showRecentTransactions={true}
              appInfo={{
                appName: 'Bitlauncher'
              }}
            >
              <MultibaseProvider client={multibase}>
                <SessionProvider>
                  <UseSigningRequestProvider>
                    {children}
                  </UseSigningRequestProvider>
                </SessionProvider>
              </MultibaseProvider>
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}

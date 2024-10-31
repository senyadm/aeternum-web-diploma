'use client'

import { env } from '@/config'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { ReactNode } from 'react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = env.PROJECT_ID

// 2. Set chains
const amoy = {
  chainId: 80002,
  name: 'Polygon Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://amoy.polygonscan.com',
  rpcUrl: 'https://rpc-amoy.polygon.technology',
}

// 3. Create a metadata object
const metadata = {
  name: 'Aaeternum',
  description: 'Website description',
  url: 'https://aeternum-web.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://aeternum-web.vercel.app/favicon.ico'],
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  defaultChainId: 80002, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [amoy],
  projectId,
  enableAnalytics: true, // Optionl - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
})

export function Web3Modal({ children }: { children: ReactNode }) {
  return children
}

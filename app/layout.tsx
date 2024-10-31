import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ConfettiProvider } from '@/providers/ConfettiProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Web3Modal } from '@/context/web3Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aeternum Web',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: '#fff',
          colorPrimary: '#0e79f9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Web3Modal>{children}</Web3Modal>
          </ThemeProvider>
        </body>
        <ConfettiProvider />
        <Toaster />
      </html>
    </ClerkProvider>
  )
}

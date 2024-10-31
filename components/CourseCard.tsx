'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IconBadge from './IconBadge'
import { BookOpen } from 'lucide-react'
import formatPrice from '@/lib/format'
import CourseProgress from './CourseProgress'
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react'
import { BrowserProvider, Contract, ethers } from 'ethers'
import Aeternum from '../abi/Aeternum.json'
import { env } from '@/config'
import axios from 'axios'

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number | null
  category: string | null
}

interface SBTMetadata {
  collection: string
  name: string
  description: string
  image: string
  attributes: [
    {
      trait_type: 'title'
      value: string
    },
    {
      trait_type: 'category'
      value: string
    },
    {
      trait_type: 'user'
      value: string
    },
  ]
}

export default function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) {
  const { address, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function mintSBT(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    try {
      if (!isConnected || !walletProvider) throw Error('User disconnected') // TODO: handle error

      const tokenMetadata: SBTMetadata = {
        collection: env.AETERNUM_ADDRESS,
        name: title,
        description: 'SBT of completed course',
        image: imageUrl,
        attributes: [
          {
            trait_type: 'title',
            value: title,
          },
          {
            trait_type: 'category',
            value: category ?? '',
          },
          {
            trait_type: 'user',
            value: 'username', // TODO: add username
          },
        ],
      }

      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
      const res = await axios.post(
        url,
        {
          pinataMetadata: {
            name: 'metadata.json',
          },
          pinataContent: tokenMetadata,
        },
        {
          headers: {
            pinata_api_key: env.PINATA_API_KEY,
            pinata_secret_api_key: env.PINATA_API_SECRET,
          },
        },
      )

      const ipfsUri = `ipfs://${res.data.IpfsHash}`

      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      const AeternumContract = new Contract(
        env.AETERNUM_ADDRESS,
        Aeternum,
        signer,
      )
      const receipt = await AeternumContract.createToken(ipfsUri)

      // TODO: await result
    } catch (e) {
      // TODO: handle error
      console.error(e)
    }
  }

  async function getUserSBTs() {
    try {
      if (!isConnected || !walletProvider) throw Error('User disconnected') // TODO: handle error

      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      const AeternumContract = new Contract(
        env.AETERNUM_ADDRESS,
        Aeternum,
        signer,
      )
      const balance: BigInt[] = await AeternumContract.balancesOf(address)

      const uris: string[] = await Promise.all(
        balance.map(
          (id) =>
            new Promise<string>(async (resolve) => {
              console.log(Number(id))
              resolve(await AeternumContract.tokenURI(Number(id)))
            }),
        ),
      )

      const ipfsHashes = uris.map((uri) => uri.split('://')[1])
      const httpUrls = ipfsHashes.map((hash) => `https://ipfs.io/ipfs/${hash}`)

      // TODO: use this array for display users tokens
      const tokensMetadata = await Promise.all(
        httpUrls.map(
          (url) =>
            new Promise<SBTMetadata>(async (resolve) => {
              resolve((await axios.get(url)).data)
            }),
        ),
      )

      const SBTs: { [tokenId: number]: SBTMetadata } = {}

      for (let i = 0; i < balance.length; i++) {
        const tokenId = Number(balance[i])
        const metadata = tokensMetadata[i]
        SBTs[tokenId] = metadata
      }

      console.log(SBTs)

      return SBTs
    } catch (e) {
      console.error(e)
    }
  }

  getUserSBTs() // TODO: use this function to get users tokens

  return (
    <Link href={`/academy/courses/${id}`}>
      <div
        className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full"
        style={{ border: '1px solid rgba(255, 255, 255, 0.525)' }}
      >
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium text-white line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-white">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-300">
              <IconBadge size={'sm'} icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              size="sm"
              value={progress}
              variant={progress === 100 ? 'success' : 'default'}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
          {progress === 100 ? (
            <button onClick={mintSBT} className="border border-white">
              Mint
            </button>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

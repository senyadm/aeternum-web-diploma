import Link from 'next/link'
import React from 'react'
import MagicButton from './MagicButton'
import { Locate } from 'lucide-react'
import { socialMedia } from '@/data'

export default function Footer() {
  return (
    <footer className="w-full relative pt-20 pb-10" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          className="w-full h-full opacity-50"
          src="/footer-grid.svg"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="heading text-white lg:max-w-[45vw]">
          Ready to take <span className="text-purple">yourself</span> to the
          next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Conquer digital world with us!
        </p>
        <Link href="mailto:contact@aeternum-web.com">
          <MagicButton
            position="left"
            title="Let's get in touch"
            icon={Locate}
          />
        </Link>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="text-white md:text-base text-sm md:font-normal font-light">
          Copyright &copy; 2024 Aeternum Web
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((social, index) => (
            <div
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              key={index}
            >
              <img width={20} height={20} src={social.img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

import { LucideIcon } from 'lucide-react'
import React from 'react'

interface MagicButtonProps {
  title: string
  icon: LucideIcon
  position?: string
  handleClick?: () => void
  otherClasses?: string
}

export default function MagicButton({
  title,
  icon: Icon,
  position,
  handleClick,
  otherClasses,
}: MagicButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="w-full relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] md:w-60 md:mt-10"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === 'left' && <Icon />}
        {title}
        {position === 'right' && <Icon />}
      </span>
    </button>
  )
}

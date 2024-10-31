'use client'

import { Category } from '@prisma/client'
import { FcGlobe } from 'react-icons/fc'
import React from 'react'
import { IconType } from 'react-icons'
import CategoryItem from './CategoryItem'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
  'Computer science': FcGlobe,
  'Algorithms and Data Structures': FcGlobe,
  'Web Development': FcGlobe,
  'Frontend Development': FcGlobe,
  'Backend Development': FcGlobe,
  'Web3 Development': FcGlobe,
  'IoT: Internet of Things': FcGlobe,
  'Smart technologies': FcGlobe,
  'DevOps': FcGlobe,
  'Native Mobile Development': FcGlobe,
  'Cross-platform Mobile Development': FcGlobe,
  'Competitive programming': FcGlobe,
}

export default function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name] || FcGlobe}
          value={item.id}
        />
      ))}
    </div>
  )
}

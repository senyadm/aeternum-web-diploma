import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { gridItems } from '@/data'
import React from 'react'

export default function Grid() {
  return (
    <section id="about">
      <BentoGrid>
        {gridItems.map((item, idx) => (
          <BentoGridItem
            id={item.id}
            key={idx}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            spareImg={item.spareImg}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

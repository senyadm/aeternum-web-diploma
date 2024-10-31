import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { secondGridItems } from '@/data'
import React from 'react'

export default function SecondGrid() {
  return (
    <section>
      <BentoGrid>
        {secondGridItems.map((item, idx) => (
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
            isGlobeDisabled={true}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

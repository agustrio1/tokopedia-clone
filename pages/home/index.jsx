import React from 'react'
import CarouselComponent from '@/components/carousel/Carousel'
import CategoryMenu from '@/components/category/CategoryMenu'
import Card from '@/components/Card'

function HomePage() {
  return (
    <div className="max-w-screen-md mt-2">
      <div className="max-w-[300px] sm:max-w[350px] md:max-w-[400px] mx-auto mb-8 mt-20">
        <CarouselComponent />
      </div>
      <div>
        <CategoryMenu/>
      </div>
      <div>
        <Card/>
      </div>
    </div>
  )
}

export default HomePage
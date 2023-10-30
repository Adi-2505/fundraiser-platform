import React from 'react'
import CardItem from '@/components/Cards/CardItem'
import Link from 'next/link'



const ExplorePage = () => {

  const cardData = [
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
    { title: 'title', description: 'description', userEmail: 'emailId', content: 'content' },
  ]

  return (
    <div className='flex flex-row flex-wrap gap-10'>

      {cardData.map((card, index) => (
        <Link href={`/fundraiser/${index}`} key={index}>
          <CardItem title={card.title} description={card.description} userEmail={card.userEmail} content={card.content} />
        </Link>
      ))}

    </div>
  )
}

export default ExplorePage
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


interface CardItemProps {
  title: string
  
}


const CardItem = ({title}: CardItemProps) => {
  return (
    <div className='hover:cursor-pointer shadow-md hover:shadow-lg'>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Progress className='h-2' value={50}/>
        </CardFooter>
      </Card>

    </div>
  )
}

export default CardItem
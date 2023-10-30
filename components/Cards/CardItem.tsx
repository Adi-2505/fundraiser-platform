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
  description: string
  content: string
  userEmail: string

}


const CardItem = ({ title, description, content, userEmail }: CardItemProps) => {

  return (
    <div className='hover:cursor-pointer shadow-md hover:shadow-lg '>
      <Card className='min-w-[300px] h-[350px] flex flex-col justify-between'>

        <div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardDescription>{`By ${userEmail}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{content}</p>
          </CardContent>


        </div>

        <div>
          <CardFooter>
            <Progress className='h-2 ' value={50}/>
          </CardFooter>
        </div>
      </Card>

    </div>
  )
}

export default CardItem
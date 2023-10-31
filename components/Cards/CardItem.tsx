import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { type FundraisersRow, type usersRow } from "@/types/database.types";

interface CardItemProps extends React.HTMLProps<HTMLDivElement> {
  title: FundraisersRow["title"] | undefined;
  description: FundraisersRow["description"] | undefined;
  content: FundraisersRow["content"] | undefined;
  username?: usersRow["full_name"] | undefined;
  amountRaised: FundraisersRow["amount"] | undefined;
  value: number;
}

const CardItem = ({
  title,
  description,
  content,
  username,
  amountRaised,
  value,
}: CardItemProps) => {
  return (
    <div className="hover:cursor-pointer shadow-md hover:shadow-lg">
      <Card className="min-w-[300px] h-[350px] flex flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardDescription>{`By ${username}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{content}</p>
          </CardContent>
        </div>
        
        <div>
          <CardHeader>
            <CardDescription>raised {amountRaised}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Progress className="h-2 " value={value} />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default CardItem;

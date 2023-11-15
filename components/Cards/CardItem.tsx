

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
import { Button } from "../ui/button";

import ReactHtmlParser from "html-react-parser";
import Link from "next/link";


interface CardItemProps extends React.HTMLProps<HTMLDivElement> {
  title: FundraisersRow["title"] | undefined;
  description: FundraisersRow["description"] | undefined;
  content: FundraisersRow["content"] | undefined;
  username?: usersRow["full_name"] | undefined;
  amountRaised: FundraisersRow["amount"] | undefined;
  targetAmount: number;
  button?: boolean;
  link?: boolean;
  slug?: string;
}

const CardItem = ({
  title,
  description,
  content,
  username,
  amountRaised,
  targetAmount,
  button,
  link,
  slug,
}: CardItemProps) => {


  const FUNDRAISER_URL = process.env.NEXT_PUBLIC_BASE_URL + `/fundraiser/${slug}`;

  const allowedLength = 200;

  const parsedContent = ReactHtmlParser(content ?? "");

  const formattedTitle =
    (title?.length ?? 0) > allowedLength
      ? title?.slice(0, allowedLength) + "..."
      : title;

  const formattedDescription =
    (description?.length ?? 0) > allowedLength
      ? description?.slice(0, allowedLength) + "..."
      : description;

  const formattedContent =
    ((parsedContent as string)?.length ?? 0) > allowedLength
      ? (parsedContent as string)?.slice(0, allowedLength) + "..."
      : parsedContent;

  return (
    <div className="hover:cursor-pointer shadow-md hover:shadow-lg">
      <Card className="w-[360px] h-[500px] flex flex-col justify-between">
        <Link href={(link ? FUNDRAISER_URL : "") as string}>
          <div>
            <CardHeader>
              <CardTitle>{formattedTitle}</CardTitle>
              <CardDescription>{formattedDescription}</CardDescription>
              <CardDescription>{`By ${username}`}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>{formattedContent}</div>
            </CardContent>
          </div>
        </Link>
        <div>
          <CardHeader>
            <CardDescription>
              <span className="font-bold text-xl">₹ {amountRaised}</span> raised
              out of ₹ {targetAmount}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Progress
              className="h-2 "
              value={(amountRaised ?? 0 / targetAmount) * 100}
            />
          </CardFooter>
          <CardFooter className="flex flex-row items-center justify-center gap-3">
            {button && (
              <Link href={FUNDRAISER_URL + "?donate=true"} className="w-full">
                <Button className="bg-teal-500 text-white py-2 px-4 rounded-md  w-full">
                  Contribute
                </Button>
              </Link>
            )}
            {button && (
              <Link href={FUNDRAISER_URL + "?share=true"} className="w-full">
                <Button className="bg-teal-500 text-white py-2 px-4 rounded-md  w-full">
                  Share
                </Button>
              </Link>
            )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default CardItem;

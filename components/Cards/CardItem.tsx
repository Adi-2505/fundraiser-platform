import React from "react";

import Link from "next/link";
import Image from "next/image";

import { type FundraisersRow, type usersRow } from "@/types/database.types";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";

interface CardItemProps extends React.HTMLProps<HTMLDivElement> {
  title: FundraisersRow["title"] | undefined;
  username?: usersRow["full_name"] | undefined;
  amountRaised: FundraisersRow["amount"] | undefined;
  targetAmount: number;
  button?: boolean;
  link?: boolean;
  slug?: string;
  avatarUrl?: string;
  fundraiserImageUrl?: string;
}

const CardItem = ({
  title,
  username,
  amountRaised,
  targetAmount,
  button,
  link,
  slug,
  avatarUrl,
  fundraiserImageUrl,
}: CardItemProps) => {
  const FUNDRAISER_URL =
    process.env.NEXT_PUBLIC_BASE_URL + `/fundraiser/${slug}`;

  

  const allowedLength = 200;

  const formattedTitle =
    (title?.length ?? 0) > allowedLength
      ? title?.slice(0, allowedLength) + "..."
      : title;

  return (
    <div className="hover:cursor-pointer shadow-md hover:shadow-lg rounded-md">
      <Card className=" flex flex-col justify-between w-[360px] h-[550px]">
        <Link href={(link ? FUNDRAISER_URL : "") as string}>
          <div>
            <div className="h-[250px] w-full p-3">
              <Image
                src={fundraiserImageUrl!}
                alt="img"
                className="object-fill h-[230px] w-full rounded-md"
                width={300}
                height={300}
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{formattedTitle}</CardTitle>
              {/* <CardDescription>{formattedDescription}</CardDescription> */}
              <div className="flex flex-row gap-3 items-center justify-start">
                <Image
                  src={avatarUrl!}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <CardDescription>{`By ${username}`}</CardDescription>
              </div>
            </CardHeader>
          </div>
        </Link>
        <div className="align-bottom">
          <CardHeader>
            <CardDescription>
              <span className="font-bold text-xl">₹ {amountRaised}</span> raised
              out of ₹ {targetAmount}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Progress
              className="h-2 "
              value={(amountRaised! / targetAmount) * 100}
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

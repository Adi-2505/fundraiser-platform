'use client'

import React, { useState } from "react";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faLinkedin, faSquareFacebook, faSquareWhatsapp, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";

import { Progress } from "@/components/ui/progress";

import { type FundraisersRow, type usersRow } from "@/types/database.types";
import { Button } from "../ui/button";

import ReactHtmlParser from "html-react-parser";
import Link from "next/link";

import { Input } from "../ui/input";
import { Check, Copy } from "lucide-react";
import { Separator } from "../ui/separator";

interface CardItemProps extends React.HTMLProps<HTMLDivElement> {
  title: FundraisersRow["title"] | undefined;
  description: FundraisersRow["description"] | undefined;
  content: FundraisersRow["content"] | undefined;
  username?: usersRow["full_name"] | undefined;
  amountRaised: FundraisersRow["amount"] | undefined;
  value: number;
  button?: boolean;
  id?: string;

}

const CardItem = ({
  title,
  description,
  content,
  username,
  amountRaised,
  value,
  button,
  id,

}: CardItemProps) => {


  const FUNDRAISER_URL = window.location.origin + `/fundraiser/${id}`;

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

  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(FUNDRAISER_URL)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  const handleSocialShare = (platform: string) => {

    if (platform === 'twitter') {
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(FUNDRAISER_URL)}`;
      window.open(twitterShareUrl, '_blank');

    }
    else if (platform === 'facebook') {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(FUNDRAISER_URL)}`;
      window.open(facebookShareUrl, '_blank');
    }
    else if (platform === 'whatsapp') {
      const whatsAppShareUrl = `whatsapp://send?text=${encodeURIComponent(FUNDRAISER_URL)}`;
      window.open(whatsAppShareUrl, '_blank');
    }
    else {
      const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(FUNDRAISER_URL)}}`;
      window.open(linkedInShareUrl, '_blank');
    }

  };



  return (
    <div className="hover:cursor-pointer shadow-md hover:shadow-lg">
      <Card className="w-[360px] h-[500px] flex flex-col justify-between">


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

        <div>
          <CardHeader>
            <CardDescription>raised {amountRaised}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Progress className="h-2 " value={value} />
          </CardFooter>
          <CardFooter className="flex flex-row items-center justify-center gap-3">
            {button && (
              <Button className="bg-teal-500 text-white py-2 px-4 rounded-md  w-full">
                Contribute
              </Button>
            )}
            {button && (

              <Dialog>
                <DialogTrigger asChild ><Button className="w-full bg-blue-500">Share</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share this fundraiser</DialogTitle>
                    <DialogDescription className="flex w-full gap-3 mb-10">
                      <Input placeholder={FUNDRAISER_URL} disabled className="border-black" />
                      <Button size={'icon'} onClick={handleCopy}>{copy ? <Check size={15} /> : <Copy size={15} />}</Button>
                    </DialogDescription>
                    <div>

                      <Separator className="bg-gray-500 mt-3" />
                    </div>
                    <DialogDescription className="flex gap-4 items-center justify-center mt-16">
                      <FontAwesomeIcon icon={faSquareXTwitter} style={{ color: "#292929", }} size="3x" onClick={() => { handleSocialShare('twitter') }} className="cursor-pointer" />
                      <FontAwesomeIcon icon={faSquareFacebook} style={{ color: "#3074e8", }} size="3x" onClick={() => { handleSocialShare('facebook') }} className="cursor-pointer" />
                      <FontAwesomeIcon icon={faSquareWhatsapp} style={{ color: "#13c928", }} size="3x" onClick={() => { handleSocialShare('whatsapp') }} className="cursor-pointer" />
                      <FontAwesomeIcon icon={faLinkedin} style={{ color: "#3f76d5", }} size="3x" onClick={() => { handleSocialShare('linkedin') }} className="cursor-pointer" />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>


            )}
          </CardFooter>
        </div>
      </Card>

    </div>
  );
};

export default CardItem;

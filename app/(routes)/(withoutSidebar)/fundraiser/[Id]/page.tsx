"use client";
import React, { HTMLProps, useEffect, useState } from "react";

import Image from "next/image";
import { useSupabase } from "@/provider/supabase-provider";
import { FundraisersRow } from "@/types/database.types";

import { Button } from "@/components/ui/button";
import { AiOutlineHeart } from "react-icons/ai";

import ReactHtmlParser from "html-react-parser";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cn } from "@/lib/utils";

interface CustomArrowProps extends HTMLProps<HTMLDivElement> {
  bold: number;
}

const CustomNextArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(
        `absolute left-24 -top-10 z-10 text-sm cursor-pointer`,
        props.bold == 1 ? "font-bold border-b-2 border-blue-500" : ""
      )}
      // style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      {/* comments */}
      Comments
    </div>
  );
};

const CustomPreviousArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(
        `absolute left-0 -top-10 z-10 text-sm cursor-pointer`,
        props.bold == 0 ? "font-bold border-b-2 border-blue-500" : ""
      )}
      // style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      {/* about */}
      About
    </div>
  );
};

const FundraiserPage = ({ params }: { params: { Id: string } }) => {
  const { supabase } = useSupabase();
  const [fundraiser, setFundraiser] = useState<FundraisersRow | null>();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    const getFundraiser = async () => {
      const { data, error } = await supabase
        .from("fundraisers")
        .select("*")
        .eq("id", params.Id)
        .single();
      setFundraiser(data);
    };
    getFundraiser();
  }, []);

  const SlideSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    nextArrow: <CustomNextArrow bold={activeSlide} />,
    prevArrow: <CustomPreviousArrow bold={activeSlide} />,
    beforeChange: (current: number, next: number) => setActiveSlide(next),
    // afterChange: (current: number) => {setActiveSlide(current); console.log(activeSlide)}
    // autoplay: true,
    // autoplaySpeed: 2000,
  };

  return (
    <div className="flex flex-row gap-5">
      <div className="w-3/4">
        <div className="text-center text-6xl text-black">
          {fundraiser?.title}
        </div>
        <div className="rounded-xl overflow-hidden">
          <Image
            src={"/Images/2020-spider-gwen-art.jpg"}
            alt="image"
            width={300}
            height={300}
            style={{ width: "100%" }}
          ></Image>
        </div>

        <div className="text-center text-sm text-black ">
          {/* <div className="text-xl font-bold">About the fundraiser</div> */}
          <div className="text-xl text-left my-8">
            <Slider {...SlideSettings} className="my-16">
              <div>
                <div className="text-center text-xl font-bold">
                  About the fundraiser
                </div>
                <div className="mt-10">

                {ReactHtmlParser(fundraiser?.content ?? "")}
                </div>
              </div>
              <div>This is 2nd slide</div>
            </Slider>
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <Button
          className="w-full text-xl p-8 flex gap-2 justify-center items-center"
          variant={"secondary"}
        >
          <AiOutlineHeart size={22} />
          Contribute
        </Button>
      </div>
    </div>
  );
};

export default FundraiserPage;

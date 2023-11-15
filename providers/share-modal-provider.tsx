'use client'

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useShareModalStore } from "@/hooks/use-share-modal";
import { faLinkedin, faSquareFacebook, faSquareWhatsapp, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

import { useParams } from "next/navigation";

const ShareModal = () => {
  
  const { open, onClose } = useShareModalStore();
  
  const params = useParams();
  
  const FUNDRAISER_URL = process.env.NEXT_PUBLIC_BASE_URL + `/fundraiser/${params.slug}`

  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(FUNDRAISER_URL)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  const handleSocialShare = (platform: string) => {
    if (platform === "twitter") {
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        FUNDRAISER_URL
      )}`;
      window.open(twitterShareUrl, "_blank");
    } else if (platform === "facebook") {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        FUNDRAISER_URL
      )}`;
      window.open(facebookShareUrl, "_blank");
    } else if (platform === "whatsapp") {
      const whatsAppShareUrl = `whatsapp://send?text=${encodeURIComponent(
        FUNDRAISER_URL
      )}`;
      window.open(whatsAppShareUrl, "_blank");
    } else {
      const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        FUNDRAISER_URL
      )}}`;
      window.open(linkedInShareUrl, "_blank");
    }
  };

  return (
    <Modal
      title="Share"
      description="Share this fundraiser with your friends and family."
      open={open}
      onClose={onClose}
    >
      <DialogDescription className="flex w-full gap-3 mb-10">
        <Input placeholder={FUNDRAISER_URL} disabled className="border-black" />
        <Button size={"icon"} onClick={handleCopy}>
          {copy ? <Check size={15} /> : <Copy size={15} />}
        </Button>
      </DialogDescription>
      <div>
        <Separator className="bg-gray-500 mt-3" />
      </div>
      <DialogDescription className="flex gap-4 items-center justify-center mt-16">
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          style={{ color: "#292929" }}
          size="3x"
          onClick={() => {
            handleSocialShare("twitter");
          }}
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faSquareFacebook}
          style={{ color: "#3074e8" }}
          size="3x"
          onClick={() => {
            handleSocialShare("facebook");
          }}
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faSquareWhatsapp}
          style={{ color: "#13c928" }}
          size="3x"
          onClick={() => {
            handleSocialShare("whatsapp");
          }}
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ color: "#3f76d5" }}
          size="3x"
          onClick={() => {
            handleSocialShare("linkedin");
          }}
          className="cursor-pointer"
        />
      </DialogDescription>
    </Modal>
  );
};

export default ShareModal;

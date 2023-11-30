"use client";
import React, { useEffect, useRef, useState } from "react";

import CommentItem from "@/components/CommentItem";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLoginModalStore } from "@/hooks/use-login-modal";

import { useSupabase } from "@/providers/supabase-provider";
import { useSupabaseSession } from "@/providers/supabase-session-provider";

interface CommentInputProps {
  fundraiserId: string;
}

type User = {
  full_name: string | null;
  avatar_url: string | null;
};

type CommentsType = {
  content: string | null;
  users: User | null;
};

const CommentSection = ({ fundraiserId }: CommentInputProps) => {
  const { supabase } = useSupabase();

  const session = useSupabaseSession();

  const { onOpen } = useLoginModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState<string>();

  const [comments, setComments] = useState<CommentsType[] | null>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const params = useParams();

  const handleKeyPress = () => {
    if (!session) {
      onOpen();
    } else {
      setComment(inputRef.current?.value);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    inputRef.current?.addEventListener("keydown", handleKeyPress);
    const getComments = async () => {
      const { data: comments } = await supabase
        .from("comments")
        .select(
          `content
          , users (
            full_name,
            avatar_url
          )
          `
        )
        .eq("fundraiser_id", fundraiserId)
        .order("created_at", { ascending: false });
      // console.log(comments);
      // @ts-ignore
      setComments(comments);
      console.log(comments);
    };
    getComments();

    // Remove event listener when component unmounts
    return () => {
      inputRef.current?.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handlePost = async () => {
    try {
      if (comment !== "" || comment !== null || comment !== undefined) {
        setIsLoading(true);

        comments?.unshift({
          content: comment!,
          users: {
            full_name: session?.user.user_metadata.full_name,
            avatar_url: session?.user.user_metadata.avatar_url,
          },
        });
        await supabase.from("comments").insert({
          content: comment,
          fundraiser_id: fundraiserId,
          user_id: session?.user.id as string,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      inputRef.current!.value = "";
    }
  };

  return (
    <>
      <div className="flex items-center border-gray-300 rounded-lg p-1 w-full">
        <Input
          type="text"
          placeholder="Add a comment..."
          ref={inputRef}
          className="w-full outline-none focus:border-blue-500 mr-2"
          disabled={isLoading}
        />
        <Button
          onClick={handlePost}
          className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          Post
        </Button>
      </div>
      {/* maping  */}

      {comments?.map((comment, index) => (
        <CommentItem
          key={index}
          username={comment.users?.full_name!}
          comment={comment.content!}
          avatarUrl={comment.users?.avatar_url!}
        />
      ))}
    </>
  );
};

export default CommentSection;

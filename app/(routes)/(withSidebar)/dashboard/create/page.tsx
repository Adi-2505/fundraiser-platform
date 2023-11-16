"use client";

import React, { useRef, useState } from "react";

import { useSupabase } from "@/providers/supabase-provider";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Label } from "@/components/ui/label";

import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  Title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  // Content: z.string().min(2, {
  //   message: "Content must be at least 2 characters.",
  // }),
  Target: z.string().refine(
    (value) => {
      // Convert the input string to a number
      const numericValue = parseInt(value, 10);
      // Check if the numericValue is a valid number and meets the minimum requirement
      return !isNaN(numericValue) && numericValue >= 1000;
    },
    {
      message: "Target amount must be a number and at least 1000.",
    }
  ),
});

const CreatePage = () => {
  const [content, setContent] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
      // Content: "",
      Target: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { supabase } = useSupabase();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const slug = value.Title.toLowerCase() // Convert title to lowercase
        .replace(/[^\w\s]/g, "") // Remove non-word and non-space characters
        .trim() // Trim leading/trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .substring(0, 50); // Limit the length of the slug (adjust as needed)

      await supabase.from("fundraisers").insert([
        {
          title: value.Title,
          description: value.Description,
          content: content,
          target: parseInt(value.Target),
          slug: slug,
        },
      ]);
      // console.log(fileInputRef.current?.files);
      await supabase.storage
        .from("fundraiser_image")
        .upload(uuidv4() as string, fileInputRef.current?.files![0]!);
      // console.log(data);
      // console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public title of fundraiser.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Discription" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public discription of fundraiser.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="Content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Content" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public content of fundraiser.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="Target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Target Amount" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public Target amount of fundraiser.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>Content</div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="w-[600px] h-[400px]"
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input ref={fileInputRef} id="picture" type="file" />
          </div>
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;

"use client";

import React from "react";

import { useSupabase } from "@/provider/supabase-provider";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

const formSchema = z.object({
  Title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  Content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
      Content: "",
      Target: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { supabase } = useSupabase();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase.from("fundraisers").insert([
        {
          title: value.Title,
          description: value.Description,
          content: value.Content,
          target: parseInt(value.Target),
        },
      ]);

      console.log(data);
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
          <FormField
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
          />
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
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;

"use client";

import React, { useState } from "react";

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
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { AlertCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { v4 as uuidv4 } from "uuid";

import { useToast } from "@/components/ui/use-toast"




// import Editor from "./components/Editor";
import Editor from '@/components/Editor/Editor'


const formSchema = z.object({
  Title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
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

  const [file, setFile] = useState<File>();

  const { toast } = useToast();

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
    console.log(content);
    try {
      const slug = value.Title.toLowerCase() // Convert title to lowercase
        .replace(/[^\w\s]/g, "") // Remove non-word and non-space characters
        .trim() // Trim leading/trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .substring(0, 50); // Limit the length of the slug (adjust as needed)

      // console.log(file);

      if (file) {
        const fileName = uuidv4();
        await supabase.storage.from("fundraiser_image").upload(fileName, file);

        await supabase.from("fundraisers").insert([
          {
            title: value.Title,
            description: value.Description,
            content: content,
            target: parseInt(value.Target),
            slug: slug,
            image_url:
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/fundraiser_image/" +
              fileName,
          },
        ]);
        toast({
          variant: "success",
          title: "Fundraisere created successfully",
        })
      } else {
        // throw new Error("Please upload an image");
        toast({
          title: "Please upload an image",
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating fundraiser",
        description: 'Please try again later',
      });
    }
  };

  const [image, setImage] = useState<string>();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    // console.log(file)
    // console.log(fileInputRef.current?.files?.[0]);
    handleFile(file as File);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // console.log(file)
      setFile(file);
    }
  };

  const handleContentChange = (data: string) => {
    setContent(data);
  };

  return (
    <div className="w-[800px]">
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

          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormDescription>
                  Write a nice formated content discribing the purpose of your
                  fundraiser.
                </FormDescription>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    This content will be reviwed by our team before publishing.
                  </AlertDescription>
                </Alert>
                <FormControl>
                  {/* <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data={''}
                    onChange={(event, editor) => {
                      // @ts-ignore 
                      const data = editor.getData();
                      setContent(data);
                    }}
                  /> */}
                  <Editor onChange={handleContentChange} />
                </FormControl>
                <FormDescription>
                  This is your public content of fundraiser.
                </FormDescription>
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Drop an image here or click to upload.</FormLabel>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex items-center justify-center overflow-hidden relative rounded-md border-2 border-dashed border-gray-300 w-[300px] h-[300px] "
            >
              {image ? (
                <img
                  src={image}
                  alt="Dropped"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FontAwesomeIcon
                    icon={faUpload}
                    style={{ color: "#2eccb9" }}
                    size="2xl"
                  />
                  <div className="bg-gray-100 rounded-full p-2 text-sm text-foreground-muted">
                    Drop an image here
                  </div>
                  <Input
                    className="hidden"
                    type="file"
                    onChange={handleFileInputChange}
                    accept="image/*"
                    id="fileInput"
                  />
                  <Label
                    htmlFor="fileInput"
                    className="p-3 border-[1px] border-slate-300 rounded-md cursor-pointer hover:bg-slate-200"
                  >
                    Upload
                  </Label>
                </div>
              )}
            </div>
            <FormDescription>
              This is your public image of fundraiser.
            </FormDescription>
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

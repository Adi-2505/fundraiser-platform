"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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

// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.core.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Label } from "@/components/ui/label";

import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUpload } from "@fortawesome/free-solid-svg-icons";

// import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditor from "react-froala-wysiwyg";

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

      const fileName = uuidv4();
      await supabase.storage
        .from("fundraiser_image")
        .upload(fileName, fileInputRef.current?.files![0]!);

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
      // console.log(fileInputRef.current?.files);
    } catch (error: any) {
      console.log(error.message);
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
    handleFile(file!);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const editorConfig = {
    attribution: false,
    height: 400,
    quickInsertEnabled: false,
    imageDefaultWidth: 0,
    imageResizeWithPercent: true,
    imageMultipleStyles: false,
    imageOutputSize: true,
    imageRoundPercent: true,
    imageMaxSize: 1024 * 1024 * 2.5,
    imageEditButtons: [
      "imageReplace",
      "imageAlign",
      "imageRemove",
      "imageSize",
      "-",
      "imageLink",
      "linkOpen",
      "linkEdit",
      "linkRemove",
    ],
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
    imageInsertButtons: ["imageBack", "|", "imageUpload"],
    placeholderText: "Your content goes here!",
    colorsStep: 5,
    colorsText: [
      "#000000",
      "#2C2E2F",
      "#6C7378",
      "#FFFFFF",
      "#009CDE",
      "#003087",
      "#FF9600",
      "#00CF92",
      "#DE0063",
      "#640487",
      "REMOVE",
    ],
    colorsBackground: [
      "#000000",
      "#2C2E2F",
      "#6C7378",
      "#FFFFFF",
      "#009CDE",
      "#003087",
      "#FF9600",
      "#00CF92",
      "#DE0063",
      "#640487",
      "REMOVE",
    ],
    toolbarButtons: {
      moreText: {
        buttons: [
          "paragraphFormat",
          "|",
          "fontSize",
          "textColor",
          "insertImage",
          "alignLeft",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "indent",
          "outdent",
        ],
        buttonsVisible: 6,
      },
      moreRich: {
        buttons: [
          "|",
          "bold",
          "italic",
          "underline",
          "insertHR",
          "insertLink",
          "insertTable",
        ],
        name: "additionals",
        buttonsVisible: 3,
      },
      dummySection: {
        buttons: ["|"],
      },
      moreMisc: {
        buttons: ["|", "undo", "redo", "help", "|"],
        align: "right",
        buttonsVisible: 2,
      },
    },
    tableEditButtons: [
      "tableHeader",
      "tableRemove",
      "tableRows",
      "tableColumns",
      "tableStyle",
      "-",
      "tableCells",
      "tableCellBackground",
      "tableCellVerticalAlign",
      "tableCellHorizontalAlign",
    ],
    tableStyles: {
      grayTableBorder: "Gray Table Border",
      blackTableBorder: "Black Table Border",
      noTableBorder: "No Table Border",
    },
    toolbarSticky: true,
    pluginsEnabled: [
      "align",
      "colors",
      "entities",
      "fontSize",
      "help",
      "image",
      "link",
      "lists",
      "paragraphFormat",
      "paragraphStyle",
      "save",
      "table",
      "wordPaste",
    ],
    events: {
      contentChanged: function () {
        // @ts-ignore
        console.log(this.el.innerHTML);
      },
    },
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
                <FormControl>
                  <FroalaEditor tag="textarea" config={editorConfig} />
                </FormControl>
                <FormDescription>
                  This is your public content of fundraiser.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* <Label htmlFor="content">Content</Label> */}

          <div className="h-40" />
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
                <Label htmlFor="fileInput">
                  <Button variant={"outline"}>Upload</Button>
                </Label>
              </div>
            )}
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

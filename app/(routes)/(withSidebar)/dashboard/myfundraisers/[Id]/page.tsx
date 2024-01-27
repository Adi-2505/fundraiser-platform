"use client";

import React, { useEffect, useState } from "react";

// UI components
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form handling
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation
import * as z from "zod";

// Supabase
import { useSupabase } from "@/providers/supabase-provider";
import { useSupabaseSession } from "@/providers/supabase-session-provider";

// Icons
import { AlertCircle } from "lucide-react";

// CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import Editor from "ckeditor5-custom-build";



const formSchema: z.Schema<any> = z.object({
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

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};


const FundraiserUpdatePage = ({ params }: { params: { Id: string } }) => {
	const { supabase } = useSupabase();

	const session = useSupabaseSession();

  const [content, setContent] = useState("");

	const [bool, setBool] = useState<boolean>(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			Title: "",
			Description: "",
			Content: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	useEffect(() => {
		const getFundraiser = async () => {
			setBool(true);
			const { data, error } = await supabase
				.from("fundraisers")
				.select("*")
				.eq("id", params.Id)
				.single();
			// setBool(data?.user === session?.user?.id);
			if (error) {
				console.log(error);
			} else {
				// console.log(data);
				form.setValue("Title", data.title);
				form.setValue("Description", data.description);
				form.setValue("Target", data.target.toString());
        setContent(data.content);
			}
			console.log("error");
			setBool(false);
		};

		getFundraiser();
	}, []);

	const onSubmit = async (value: z.infer<typeof formSchema>) => {
		try {
			const { data, error } = await supabase
				.from("fundraisers")
				.update({
					title: value.Title,
					description: value.Description,
					content: content,
				})
				.eq("id", params.Id);

			// console.log(data);
			// console.log(data);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	if (bool) {
		return (
			<div>
				<h1>Loading</h1>
			</div>
		);
	}

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
									<CKEditor
										editor={Editor}
										config={editorConfiguration}
										data={content}
										onChange={(event, editor) => {
											// @ts-ignore
											const data = editor.getData();
											setContent(data);
										}}
									/>
								</FormControl>
								<FormDescription>
									This is your public content of fundraiser.
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="Target"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Target</FormLabel>
								<FormControl>
									<Input placeholder="Target" {...field} disabled={true} />
								</FormControl>
								<FormDescription>
									This is your public target amount of fundraiser.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading}>
						Update
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default FundraiserUpdatePage;

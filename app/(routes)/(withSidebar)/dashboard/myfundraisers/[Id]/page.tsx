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

import Editor from "@/components/Editor/Editor";

import { useToast } from "@/components/ui/use-toast"


const formSchema: z.Schema<any> = z.object({
	Title: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	Description: z.string().min(2, {
		message: "Description must be at least 2 characters.",
	}),
});

const FundraiserUpdatePage = ({ params }: { params: { Id: string } }) => {
	const { supabase } = useSupabase();

	const session = useSupabaseSession();

	const [content, setContent] = useState("");

	const [bool, setBool] = useState<boolean>(true);

	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			Title: "",
			Description: "",
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
			// console.log("error");
			setBool(false);
		};

		getFundraiser();
	}, []);

	const handleContentChange = (content: string) => {
		setContent(content);
	};

	const onSubmit = async (value: z.infer<typeof formSchema>) => {
		console.log(value);
		try {
			// console.log(value);
			const { data, error } = await supabase
				.from("fundraisers")
				.update({
					title: value.Title,
					description: value.Description,
					content: content,
				})
				.eq("id", params.Id);

			if (error) {
				console.log(error);
			}

			toast({
				variant: "success",
				title: "Fundraisere updated successfully",
			});

			console.log(data);
			// console.log(data);
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Fundraisere updation failed",
				description: "Please try again later.",
			});
		}
	};

	const [stop, setStop] = useState<boolean>(false);

	const handleStop = async () => {
		try {
			setStop(true);
			const { data, error } = await supabase
				.from("fundraisers")
				.update({
					status: "inactive",
				})
				.eq("id", params.Id);

			// console.log(data);
			// console.log(data);
			setStop(false);
			toast({
				variant: "success",
				title: "Fundraisere deactivatied successfully",
			});
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Fundraisere deactivation failed",
				description: "Please try again later.",
			});
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
									<Editor onChange={handleContentChange} content={content} />
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
					<div className="flex flex-row gap-2">
						<Button type="submit" disabled={isLoading}>
							Update
						</Button>
						<Button onClick={handleStop} disabled={stop}>
							Stop Fundraiser
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default FundraiserUpdatePage;

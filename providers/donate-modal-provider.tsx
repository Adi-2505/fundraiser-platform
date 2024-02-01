"use client";
import React from "react";

import { useParams } from "next/navigation";

import axios from "axios";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ExternalLink } from "lucide-react";

import Modal from "@/components/Modal";

import { useDonateModalStore } from "@/hooks/use-donate-modal";
import { useSupabaseSession } from "./supabase-session-provider";

const DonateModel = () => {
	const params = useParams();

	const session = useSupabaseSession();

	// console.log(params);

	const { slug } = params;

	const formSchema = z.object({
		Amount: z.string().refine(
			(value) => {
				// Convert the input string to a number
				const numericValue = parseInt(value, 10);
				// Check if the numericValue is a valid number and meets the minimum requirement
				return !isNaN(numericValue) && numericValue >= 100;
			},
			{
				message: "Amount must be a number and at least 100.",
			}
		),
		Name: z
			.string()
			.min(3, { message: "Name should be of minimum of 3 characters" })
			.max(50, { message: "Name should be of maximum of 50 characters" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			Amount: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const { open, onClose } = useDonateModalStore();

	const handleCheckout = async (value: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post("/api/checkout", {
				slug,
				amount: parseInt(value.Amount),
			});
			// console.log(response.data);
			// console.log(response.data.url);
			window.open(response.data.url);
		} catch (error: any) {
			// console.log('error');
			console.log(error.message);
		}
	};

	// form.setValue("Name", session?.user?.user_metadata.full_name);
	// useEffect(() => {
	//   form.setValue("Name", session?.user?.user_metadata.full_name);
	//   // form.trigger("Name");
	// },[])

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Donate"
			description="Donate to this fundraiser"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCheckout)}
					className="flex flex-col gap-4"
				>
					<div>
						<FormField
							control={form.control}
							name="Amount"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											placeholder="Amount"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-row gap-2 justify-center">
						<Button
							onClick={() => form.setValue("Amount", "1000")}
							disabled={isLoading}
						>
							1000
						</Button>
						<Button
							onClick={() => form.setValue("Amount", "1500")}
							disabled={isLoading}
						>
							1500
						</Button>
						<Button
							onClick={() => form.setValue("Amount", "2000")}
							disabled={isLoading}
						>
							2000
						</Button>
						<Button
							onClick={() => form.setValue("Amount", "3000")}
							disabled={isLoading}
						>
							3000
						</Button>
						<Button
							onClick={() => form.setValue("Amount", "4000")}
							disabled={isLoading}
						>
							4000
						</Button>
						<Button
							onClick={() => form.setValue("Amount", "5000")}
							disabled={isLoading}
						>
							5000
						</Button>
					</div>
					<div className="flex justify-center">
						<Button
							disabled={isLoading}
							type="submit"
							className="flex gap-2 justify-center items-center "
						>
							Go to payment gateway <ExternalLink size={16} />
						</Button>
					</div>
				</form>
			</Form>
		</Modal>
	);
};

export default DonateModel;

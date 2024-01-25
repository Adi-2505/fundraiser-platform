"use client";
import React, { useEffect, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

interface ModalProps {
	title: string;
	description: string;
	children?: React.ReactNode;
	open?: boolean;
	onClose: () => void;
}

const Modal = ({ title, description, children, open, onClose }: ModalProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;

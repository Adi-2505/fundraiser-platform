'use client'

import React, {useEffect} from "react";

import type { Editor } from "@tiptap/react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";

import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	Heading4Icon,
	ItalicIcon,
	List,
	Redo2Icon,
	UnderlineIcon,
	Undo2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";


interface MenuBarProps {
	editor: Editor | null;
}

interface EditorProps {
  onChange: (content: string) => void;
  content?: string;
}

const MenuBar = ({ editor }: MenuBarProps) => {
	if (!editor) {
		return null;
	}


	return (
		<>
			<div className="flex flex-row w-full gap-2">
				<BoldIcon
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("bold") ? "bg-slate-300" : ""
					)}
					onClick={() => editor.chain().focus().toggleBold().run()}
				/>

				<ItalicIcon
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("italic") ? "bg-slate-300" : ""
					)}
				/>

				<UnderlineIcon
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("underline") ? "bg-slate-300" : ""
					)}
				/>

				<List
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("bulletList") ? "bg-slate-300" : ""
					)}
				/>
				<Undo2Icon
					onClick={() => editor.chain().focus().undo().run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
            !editor.can().undo() ? " text-slate-400" : ""
					)}
          
				/>

				<Redo2Icon
					onClick={() => editor.chain().focus().redo().run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						!editor.can().redo() ? "text-slate-400" : ""
					)}
				/>

				<Heading1Icon
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("heading", { level: 1 }) ? "bg-slate-300" : ""
					)}
				/>

				<Heading2Icon
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("heading", { level: 2 }) ? "bg-slate-300" : ""
					)}
				/>

				<Heading3Icon
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("heading", { level: 3 }) ? "bg-slate-300" : ""
					)}
				/>

				<Heading4Icon
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive("heading", { level: 4 }) ? "bg-slate-300" : ""
					)}
				/>

				{/* Text Align */}
				<AlignLeftIcon
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive({ textAlign: "left" }) ? "bg-slate-300" : ""
					)}
				/>

				<AlignCenterIcon
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive({ textAlign: "center" }) ? "bg-slate-300" : ""
					)}
				/>

				<AlignRightIcon
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive({ textAlign: "right" }) ? "bg-slate-300" : ""
					)}
				/>

				<AlignJustifyIcon
					onClick={() => editor.chain().focus().setTextAlign("justify").run()}
					className={cn(
						"h-7 w-7 border-[1px] border-gray-300 rounded-md p-1 cursor-pointer",
						editor.isActive({ textAlign: "justify" }) ? "bg-slate-300" : ""
					)}
				/>
			</div>
		</>
	);
};

export default ({onChange, content}: EditorProps) => {

  const [editordata, setEditorData] = React.useState("");

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        }
      }),
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
      BulletList,
      Heading.configure({
        levels: [1, 2, 3, 4],
      })
		],
		editorProps: {
			attributes: {
				spellcheck: "false",
        class: "border-none outline-none"
			},
		},
    onUpdate({editor}){
      const data = editor?.getHTML() || "";
      setEditorData(data);
      onChange(data);
    }
	});

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);


	return (
		<div className="border-[1px] border-gray-300 rounded-md p-2">
			<MenuBar editor={editor} />
			<EditorContent editor={editor} className="border-[1px] border-slate-300 focus:border-none mt-3 p-2 rounded-md" />
		</div>
	);
};

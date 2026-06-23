"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Palette,
  RemoveFormatting,
} from "lucide-react";

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  dir?: "rtl" | "ltr";
  minHeight?: number;
  placeholder?: string;
}

export default function RichEditor({
  content,
  onChange,
  dir = "rtl",
  minHeight = 400,
  placeholder = "متن را اینجا بنویسید...",
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image,
      Placeholder.configure({ placeholder }),
      TiptapLink.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none outline-none p-4 ${dir === "rtl" ? "font-persian text-right" : "font-sans text-left"}`,
        dir,
        style: `min-height:${minHeight}px`,
      },
    },
  });

  if (!editor) return null;

  const btn = (active: boolean) =>
    `rounded p-1.5 transition-colors ${active ? "bg-steel/10 text-steel" : "text-slate hover:bg-navy/5"}`;

  function addLink() {
    const url = prompt("URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  function setColor() {
    const color = prompt("Color hex (e.g. #1E6FA8):");
    if (color) editor.chain().focus().setColor(color).run();
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#E5E7EB]">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-[#E5E7EB] bg-navy/[0.02] px-2 py-1.5">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}>
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}>
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive("underline"))}>
          <UnderlineIcon className="h-4 w-4" />
        </button>
        <div className="mx-1 w-px bg-[#E5E7EB]" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}>
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))}>
          <Heading3 className="h-4 w-4" />
        </button>
        <div className="mx-1 w-px bg-[#E5E7EB]" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}>
          <List className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}>
          <ListOrdered className="h-4 w-4" />
        </button>
        <div className="mx-1 w-px bg-[#E5E7EB]" />
        <button type="button" onClick={addLink} className={btn(editor.isActive("link"))}>
          <Link2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={addImage} className={btn(false)}>
          <ImageIcon className="h-4 w-4" />
        </button>
        <button type="button" onClick={setColor} className={btn(false)}>
          <Palette className="h-4 w-4" />
        </button>
        <div className="mx-1 w-px bg-[#E5E7EB]" />
        <button type="button" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className={btn(false)}>
          <RemoveFormatting className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}

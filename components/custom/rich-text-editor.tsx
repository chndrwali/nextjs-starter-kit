import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { CharacterCount } from "@tiptap/extensions";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Quote,
    Redo2,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo2,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import { Toggle } from "../ui/toggle";

interface ProductRichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxChars?: number;
    label?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

// --- BubbleButton: dark theme, full control ---
const BubbleButton = ({
    onClick,
    isActive = false,
    title,
    children,
}: {
    onClick: () => void;
    isActive?: boolean;
    title: string;
    children: React.ReactNode;
}) => (
    <Toggle type="button" pressed={isActive} onClick={onClick} title={title}>
        {children}
    </Toggle>
);

// --- Bubble Menu Toolbar ---
const BubbleToolbar = ({ editor, activeStates }: { editor: any; activeStates: any }) => (
    <div className="flex items-center gap-0.5 px-2 py-1.5 bg-background rounded-lg shadow-2xl border border-accent-foreground">
        <BubbleButton
            isActive={activeStates.bold}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
        >
            <Bold className="h-3.5 w-3.5 text-muted-foreground" />
        </BubbleButton>
        <BubbleButton
            isActive={activeStates.italic}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
        >
            <Italic className="h-3.5 w-3.5 text-muted-foreground" />
        </BubbleButton>
        <BubbleButton
            isActive={activeStates.underline}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
        >
            <UnderlineIcon className="h-3.5 w-3.5 text-muted-foreground" />
        </BubbleButton>
        <BubbleButton
            isActive={activeStates.strikethrough}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
        >
            <Strikethrough className="h-3.5 w-3.5 text-muted-foreground" />
        </BubbleButton>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <BubbleButton
            isActive={activeStates.highlight}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            title="Highlight"
        >
            <Highlighter className="h-3.5 w-3.5 text-muted-foreground" />
        </BubbleButton>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <BubbleButton
            isActive={activeStates.h2}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Heading 2"
        >
            <span className="text-[11px] font-bold text-muted-foreground">H2</span>
        </BubbleButton>
        <BubbleButton
            isActive={activeStates.h3}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="Heading 3"
        >
            <span className="text-[11px] font-bold text-muted-foreground">H3</span>
        </BubbleButton>
    </div>
);

// --- Main Component ---
export const RichTextEditor = ({
    value,
    onChange,
    placeholder = "Tulis deskripsi produk yang menarik...",
    maxChars = 2000,
}: ProductRichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight.configure({ multicolor: false }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            CharacterCount.configure({ limit: maxChars }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html === "<p></p>" ? "" : html);
        },
        editorProps: {
            attributes: {
                class: cn(
                    "product-editor-content outline-none min-h-[180px] text-sm text-foreground px-4 py-3",
                    "prose prose-sm max-w-none dark:prose-invert",
                    "focus:outline-none",
                ),
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    const handleClear = useCallback(() => {
        editor?.commands.clearContent();
        onChange("");
    }, [editor, onChange]);

    const { charactersCount, activeStates } = useEditorState({
        editor,
        selector: context => ({
            charactersCount: context.editor?.storage.characterCount?.characters() ?? 0,
            activeStates: {
                bold: context.editor?.isActive("bold") ?? false,
                italic: context.editor?.isActive("italic") ?? false,
                underline: context.editor?.isActive("underline") ?? false,
                strike: context.editor?.isActive("strike") ?? false,
                highlight: context.editor?.isActive("highlight") ?? false,
                bulletList: context.editor?.isActive("bulletList") ?? false,
                orderedList: context.editor?.isActive("orderedList") ?? false,
                blockquote: context.editor?.isActive("blockquote") ?? false,
                h1: context.editor?.isActive("heading", { level: 1 }) ?? false,
                h2: context.editor?.isActive("heading", { level: 2 }) ?? false,
                h3: context.editor?.isActive("heading", { level: 3 }) ?? false,
                alignLeft: context.editor?.isActive({ textAlign: "left" }) ?? false,
                alignCenter: context.editor?.isActive({ textAlign: "center" }) ?? false,
                alignRight: context.editor?.isActive({ textAlign: "right" }) ?? false,
            },
        }),
    });

    const charPercent = Math.round((charactersCount / maxChars) * 100);
    if (!editor) return null;

    return (
        <div className="space-y-1.5">
            {/* Editor card */}
            <div className="rounded-md border border-input bg-input/30 shadow-sm focus-within:ring-1 focus-within:ring-ring transition-shadow">
                {/* Toolbar */}
                <div className="flex justify-between p-1.5 border-b border-border bg-card rounded-t-md">
                    <div className="flex flex-wrap items-center gap-0.5 ">
                        {/* Headings */}
                        <Toggle
                            size="sm"
                            pressed={activeStates.h1}
                            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            title="Heading 1"
                            className="h-8 w-8 p-0"
                        >
                            <span className="text-[11px] font-bold">H1</span>
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.h2}
                            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            title="Heading 2"
                            className="h-8 w-8 p-0"
                        >
                            <span className="text-[11px] font-bold">H2</span>
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.h3}
                            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            title="Heading 3"
                            className="h-8 w-8 p-0"
                        >
                            <span className="text-[11px] font-bold">H3</span>
                        </Toggle>

                        <Separator orientation="vertical" className="h-5 mx-0.5" />

                        {/* Inline format */}
                        <Toggle
                            size="sm"
                            pressed={activeStates.bold}
                            onPressedChange={() => editor.chain().focus().toggleBold().run()}
                            title="Bold (⌘B)"
                            className="h-8 w-8 p-0"
                        >
                            <Bold className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.italic}
                            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                            title="Italic (⌘I)"
                            className="h-8 w-8 p-0"
                        >
                            <Italic className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.underline}
                            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                            title="Underline (⌘U)"
                            className="h-8 w-8 p-0"
                        >
                            <UnderlineIcon className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.strike}
                            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                            title="Strikethrough"
                            className="h-8 w-8 p-0"
                        >
                            <Strikethrough className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.highlight}
                            onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
                            title="Highlight"
                            className="h-8 w-8 p-0"
                        >
                            <Highlighter className="h-3.5 w-3.5" />
                        </Toggle>

                        <Separator orientation="vertical" className="h-5 mx-0.5" />

                        {/* Lists & Quote */}
                        <Toggle
                            size="sm"
                            pressed={activeStates.bulletList}
                            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                            title="Bullet List"
                            className="h-8 w-8 p-0"
                        >
                            <List className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.orderedList}
                            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                            title="Ordered List"
                            className="h-8 w-8 p-0"
                        >
                            <ListOrdered className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.blockquote}
                            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                            title="Blockquote"
                            className="h-8 w-8 p-0"
                        >
                            <Quote className="h-3.5 w-3.5" />
                        </Toggle>

                        <Separator orientation="vertical" className="h-5 mx-0.5" />

                        {/* Alignment */}
                        <Toggle
                            size="sm"
                            pressed={activeStates.alignLeft}
                            onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                            title="Align Left"
                            className="h-8 w-8 p-0"
                        >
                            <AlignLeft className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.alignCenter}
                            onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                            title="Align Center"
                            className="h-8 w-8 p-0"
                        >
                            <AlignCenter className="h-3.5 w-3.5" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={activeStates.alignRight}
                            onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                            title="Align Right"
                            className="h-8 w-8 p-0"
                        >
                            <AlignRight className="h-3.5 w-3.5" />
                        </Toggle>

                        <Separator orientation="vertical" className="h-5 mx-0.5" />

                        {/* Undo / Redo - Menggunakan button biasa karena bersifat action murni (bukan state toggle) */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            title="Undo (⌘Z)"
                            className="h-8 w-8 p-0 text-muted-foreground disabled:opacity-40"
                        >
                            <Undo2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Redo (⌘Y)"
                            className="h-8 w-8 p-0 text-muted-foreground disabled:opacity-40"
                        >
                            <Redo2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="h-auto py-0 px-1 text-xs text-muted-foreground"
                    >
                        Delete Content
                    </Button>
                </div>
                {/* Bubble Menu */}
                <BubbleMenu editor={editor} options={{ placement: "top" }}>
                    <BubbleToolbar editor={editor} activeStates={activeStates} />
                </BubbleMenu>

                {/* Editor content */}
                <EditorContent editor={editor} />

                {/* Footer: char count */}
                <div className="flex items-center gap-3 px-4 py-2 border-t border-border">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-200",
                                charPercent > 90 ? "bg-destructive" : charPercent > 70 ? "bg-amber-400" : "bg-primary",
                            )}
                            style={{ width: `${Math.min(charPercent, 100)}%` }}
                        />
                    </div>
                    <span
                        className={cn(
                            "text-xs tabular-nums shrink-0",
                            charPercent > 90 ? "text-destructive" : "text-muted-foreground",
                        )}
                    >
                        {charactersCount} / {maxChars}
                    </span>
                </div>
            </div>

            {/* Hint */}
            <p className="text-xs text-muted-foreground">Tip: Select text to open the quick formatting menu.</p>
        </div>
    );
};

// USAGE
/*
<Controller
    name="description"
    control={form.control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="stepper-form-product-description">Description</FieldLabel>
            <RichTextEditor
                placeholder="Description of product here..."
                label="Please add product descrption"
                value={field.value}
                onChange={field.onChange}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
/>

*/

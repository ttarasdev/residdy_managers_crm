'use client'

import { useEffect } from 'react'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Undo2,
    Redo2,
} from 'lucide-react'
import c from './TipTapInput.module.scss'

export function RichTextInput({
    value,
    onChange,
    format = 'json',
    disabled = false,
}: {
    value: unknown
    onChange: (value: unknown) => void
    format?: 'json' | 'html'
    disabled?: boolean
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        content: (value || '') as string | JSONContent,
        onUpdate: ({ editor }) =>
            onChange(format === 'html' ? editor.getHTML() : editor.getJSON()),
        editorProps: {
            attributes: {
                role: 'textbox',
                'aria-label': 'Treść',
                'aria-multiline': 'true',
            },
        },
    })

    useEffect(() => {
        editor?.setEditable(!disabled)
    }, [editor, disabled])

    useEffect(() => {
        if (!editor) return

        const current = format === 'html' ? editor.getHTML() : editor.getJSON()

        if (
            JSON.stringify(current) !== JSON.stringify(value || '') &&
            !(editor.isEmpty && !value)
        )
            editor.commands.setContent((value || '') as string | JSONContent, {
                emitUpdate: false,
            })
    }, [editor, value, format])

    const buttons = [
        {
            title: 'Pogrubienie',
            Icon: Bold,
            active: editor?.isActive('bold'),
            run: () => editor?.chain().focus().toggleBold().run(),
        },
        {
            title: 'Kursywa',
            Icon: Italic,
            active: editor?.isActive('italic'),
            run: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
            title: 'Podkreślenie',
            Icon: Underline,
            active: editor?.isActive('underline'),
            run: () => editor?.chain().focus().toggleUnderline().run(),
        },
        {
            title: 'Lista',
            Icon: List,
            active: editor?.isActive('bulletList'),
            run: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            title: 'Lista numerowana',
            Icon: ListOrdered,
            active: editor?.isActive('orderedList'),
            run: () => editor?.chain().focus().toggleOrderedList().run(),
        },
        {
            title: 'Cofnij',
            Icon: Undo2,
            run: () => editor?.chain().focus().undo().run(),
        },
        {
            title: 'Ponów',
            Icon: Redo2,
            run: () => editor?.chain().focus().redo().run(),
        },
    ]

    return (
        <div className={c.tiptap}>
            <div className={c.tiptap__header}>
                {buttons.map(({ title, Icon, run, active }) => (
                    <button
                        key={title}
                        type="button"
                        aria-label={title}
                        title={title}
                        aria-pressed={active}
                        disabled={disabled || !editor}
                        onClick={run}
                        className={c.tiptap__button}
                    >
                        <Icon size={16} />
                    </button>
                ))}
            </div>
            <EditorContent editor={editor} className={c.tiptap__editor} />
        </div>
    )
}

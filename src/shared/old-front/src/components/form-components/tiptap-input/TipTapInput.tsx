'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import c from './TipTapInput.module.scss'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

interface Props {
	contentJson: Record<string, any>
	setContentJson: (value: Record<string, any>) => void
}

export const EMPTY_DOC = { type: 'doc', content: [{ type: 'paragraph' }] }

const TipTapInput: React.FC<Props> = ({ contentJson, setContentJson }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		immediatelyRender: false,
		content: contentJson ?? EMPTY_DOC,
		onUpdate: ({ editor }) =>
			setContentJson(editor.getJSON() as Record<string, any>),
	})

	return (
		<div className={c.tiptap}>
			<div className={c.tiptap__header}>
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('bold') ? c.active : ''
					}`}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					B
				</button>

				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('italic') ? c.active : ''
					}`}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
					I
				</button>
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('strike') ? c.active : ''
					}`}
					onClick={() => editor?.chain().focus().toggleStrike().run()}
				>
					S
				</button>
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('underline') ? c.active : ''
					}`}
					onClick={() =>
						editor?.chain().focus().toggleUnderline().run()
					}
				>
					U
				</button>
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('paragraph') ? c.active : ''
					}`}
					onClick={() => editor?.chain().focus().setParagraph().run()}
				>
					P
				</button>
				<span className={c.tiptap__sep} />
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('heading', { level: 2 })
							? c.active
							: ''
					}`}
					onClick={() =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 2 })
							.run()
					}
				>
					H2
				</button>
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('heading', { level: 3 })
							? c.active
							: ''
					}`}
					onClick={() =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 3 })
							.run()
					}
				>
					H3
				</button>
				<span className={c.tiptap__sep} />
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('bulletList') ? c.active : ''
					}`}
					onClick={() =>
						editor?.chain().focus().toggleBulletList().run()
					}
				>
					•
				</button>
				<button
					type="button"
					className={`${c.tiptap__button} ${
						editor?.isActive('orderedList') ? c.active : ''
					}`}
					onClick={() =>
						editor?.chain().focus().toggleOrderedList().run()
					}
				>
					1.
				</button>
				<span className={c.tiptap__sep} />
				<button
					type="button"
					className={c.tiptap__button}
					onClick={() => editor?.chain().focus().undo().run()}
					disabled={!editor?.can().undo()}
				>
					↶
				</button>
				<button
					type="button"
					className={c.tiptap__button}
					onClick={() => editor?.chain().focus().redo().run()}
					disabled={!editor?.can().redo()}
				>
					↷
				</button>
				<button
					type="button"
					className={`${c.tiptap__button} ${c.popup}`}
				>
					emoji
					<div>
						<p>“На macOS: Ctrl + Cmd + Space”</p>
						<p>“На Windows: Win + .”</p>
					</div>
				</button>
			</div>
			<div className={c.tiptap__editor}>
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}

export default TipTapInput

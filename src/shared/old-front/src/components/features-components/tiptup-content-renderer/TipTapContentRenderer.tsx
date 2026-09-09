'use client'

import { useEffect, useMemo } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import c from './TipTapContentRenderer.module.scss'

interface Props {
	contentJson: Record<string, any> | string
}

const TipTapContentRenderer: React.FC<Props> = ({ contentJson }) => {
	const parsedContent = useMemo(() => {
		return typeof contentJson === 'string'
			? JSON.parse(contentJson)
			: contentJson
	}, [contentJson])

	const editor = useEditor({
		immediatelyRender: false,
		editable: false,
		extensions: [StarterKit],
		content: parsedContent,
	})

	useEffect(() => {
		if (!editor) return
		editor.commands.setContent(parsedContent, { emitUpdate: false })
	}, [editor, parsedContent])

	if (!editor) return null

	return (
		<div className={c.container}>
			<EditorContent editor={editor} />
		</div>
	)
}

export default TipTapContentRenderer

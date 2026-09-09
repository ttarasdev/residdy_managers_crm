'use client'

import c from './MediaFileInput.module.scss'

interface Props {
	setFile: (file: File | null) => void
}

const MediaFileInput: React.FC<Props> = ({ setFile }) => {
	return (
		<label className={c.label}>
			Plik:
			<input
				type="file"
				required
				onChange={(e) => setFile(e.target.files?.[0] || null)}
				className={c.input}
			/>
		</label>
	)
}

export default MediaFileInput

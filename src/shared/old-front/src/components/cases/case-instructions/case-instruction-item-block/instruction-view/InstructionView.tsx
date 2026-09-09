'use client'

import { CaseInstructionWithBlocks } from '@/api/cases-api/case-instructions/case-instructions.types'
import c from './InstructionView.module.scss'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { InstructionBlockType } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.types'
import TipTapContentRenderer from '@/components/features-components/tiptup-content-renderer/TipTapContentRenderer'
import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'
import { VariantSize } from '@/shared/types-enums/media'

interface Props {
	data: CaseInstructionWithBlocks
	onClose: () => void
}

const InstructionView: React.FC<Props> = ({ data, onClose }) => {
	return (
		<ModalPortal>
			<div className={c.block__container}>
				<div className={c.block}>
					<div className={c.block__header}>
						<p>instrukcja</p>
						<button onClick={onClose} className={c.block__close}>
							<ThemedIcon path="/block_icons/cancel" />
						</button>
					</div>
					<div className={c.block__top}>
						<JwtCompanyVariantImage
							variantId={data.headerIconId}
							size={VariantSize.LARGE}
							style={{ objectFit: 'cover' }}
							fill
							alt={data.title}
						/>
						<p className={c.block__title}>{data.title}</p>
					</div>
					<div className={c.block__items}>
						{data.blocks.map((i) => (
							<div key={i.id} className={c.block__item}>
								{i.type === InstructionBlockType.PHOTO &&
									i.variantId && (
										<div className={c.block__image}>
											<JwtCompanyVariantImage
												variantId={i.variantId}
												size={VariantSize.LARGE}
												style={{ objectFit: 'cover' }}
												fill
												alt={i.sortKey.toString()}
											/>
										</div>
									)}
								{i.type === InstructionBlockType.TEXT &&
									i.contentJson && (
										<TipTapContentRenderer
											contentJson={i.contentJson}
										/>
									)}
							</div>
						))}
					</div>
				</div>
			</div>
		</ModalPortal>
	)
}

export default InstructionView

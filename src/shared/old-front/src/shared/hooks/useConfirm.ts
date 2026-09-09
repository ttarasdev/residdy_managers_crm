import { useState } from 'react'
import {
	useMutation,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query'

type ConfirmRequest<T, R = unknown> = {
	payload: T
	run: (payload: T) => Promise<R>
	onSuccess?: (data: R, payload: T) => void
	onError?: (error: unknown, payload: T) => void
	invalidateKeys?: QueryKey[]
}

export function useConfirm<T, R = unknown>() {
	const qc = useQueryClient()
	const [req, setReq] = useState<ConfirmRequest<T, R> | null>(null)

	const mutation = useMutation({
		mutationFn: (r: ConfirmRequest<T, R>) => r.run(r.payload),
		onSuccess: async (data, r) => {
			setReq(null)

			if (r.invalidateKeys?.length) {
				await Promise.all(
					r.invalidateKeys.map((key) =>
						qc.invalidateQueries({ queryKey: key, exact: false }),
					),
				)
			}

			r.onSuccess?.(data, r.payload)
		},
		onError: (error, r) => {
			r?.onError?.(error, r.payload)
		},
	})

	const open = (r: ConfirmRequest<T, R>) => setReq(r)
	const close = () => setReq(null)
	const confirm = () => {
		if (!req) return
		mutation.mutate(req)
	}

	return {
		isOpen: !!req,
		open,
		close,
		confirm,
		isPending: mutation.isPending,
	}
}

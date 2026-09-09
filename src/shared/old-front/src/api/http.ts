import { API_URL } from '@/shared/config/env'
import { getAuthHeader } from './get-auth-header'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions
	extends Omit<RequestInit, 'method' | 'body' | 'headers'> {
	headers?: Record<string, string>
	body?: unknown
	withCredentials?: boolean
	skipAuth?: boolean
}

async function request<T>(
	url: string,
	method: HttpMethod,
	options: RequestOptions = {},
): Promise<T> {
	const isAbsolute = /^https?:\/\//i.test(url)
	const fullUrl = isAbsolute
		? url
		: `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`

	const {
		headers = {},
		body,
		withCredentials = false,
		skipAuth = false,
		...rest
	} = options

	const isFormData =
		typeof FormData !== 'undefined' && body instanceof FormData

	const res = await fetch(fullUrl, {
		method,
		headers: {
			...(isFormData
				? {}
				: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
				  }),
			...(skipAuth ? {} : getAuthHeader()),
			...headers,
		},
		body:
			body !== undefined
				? isFormData
					? (body as FormData)
					: JSON.stringify(body)
				: undefined,
		credentials: withCredentials ? 'include' : 'same-origin',
		...rest,
	})

	const parseJson = async () => {
		try {
			return (await res.json()) as unknown
		} catch {
			return null
		}
	}

	if (!res.ok) {
		const data = await parseJson()
		const message =
			(data &&
				typeof data === 'object' &&
				'message' in data &&
				(data as any).message) ||
			`HTTP ${res.status}`
		const error = new Error(String(message)) as Error & {
			status?: number
			data?: unknown
		}
		error.status = res.status
		error.data = data
		throw error
	}

	if (res.status === 204) return undefined as T
	return (await parseJson()) as T
}

export function getJson<T>(
	url: string,
	options?: Omit<RequestOptions, 'body'>,
) {
	return request<T>(url, 'GET', options)
}

export function postJson<T>(
	url: string,
	body?: unknown,
	options?: Omit<RequestOptions, 'body'>,
) {
	return request<T>(url, 'POST', { ...options, body })
}

export function putJson<T>(
	url: string,
	body?: unknown,
	options?: Omit<RequestOptions, 'body'>,
) {
	return request<T>(url, 'PUT', { ...options, body })
}

export function patchJson<T>(
	url: string,
	body?: unknown,
	options?: Omit<RequestOptions, 'body'>,
) {
	return request<T>(url, 'PATCH', { ...options, body })
}

export function deleteJson<T>(
	url: string,
	options?: Omit<RequestOptions, 'body'>,
) {
	return request<T>(url, 'DELETE', options)
}

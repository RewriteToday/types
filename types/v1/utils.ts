import type { RESTCursorOptions } from './rest';

export const createCursorQuery = ({
	limit = 15,
	...options
}: RESTCursorOptions = {}) => {
	return new URLSearchParams({ limit: limit.toString(), ...options });
};

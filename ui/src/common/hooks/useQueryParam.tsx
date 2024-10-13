import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const getQueryParamValue = <T,>(key: string, defaultValue: T): T => {
	const url = new URL(window.location.href);
	const value = url.searchParams.get(key) as any;
	if (value) {
		return typeof defaultValue === 'string' ? value : parseInt(value);
	} else {
		return defaultValue;
	}
};

export const useQueryParam = <T,>(
	key: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		return getQueryParamValue(key, defaultValue);
	});

	useEffect(() => {
		const url = new URL(window.location.href);
		if (typeof value === 'string') {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.set(key, value?.toString() as any);
		}
		window.history.pushState(null, '', url.toString());
	}, [key, value]);

	return [value, setValue];
};

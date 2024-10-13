import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const getLocalStorageValue = <T,>(key: string, defaultValue: T): T => {
	const value = localStorage.getItem(key);
	if (!value) return defaultValue;

	try {
		const initial = JSON.parse(value);
		return initial || defaultValue;
	} catch (error) {
		console.error(
			`Error parsing the value for key ${key} from localstorage`
		);
		return value as T;
	}
};

export const useLocalStorage = <T,>(
	key: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		return getLocalStorageValue(key, defaultValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

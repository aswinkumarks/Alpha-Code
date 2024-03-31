import { hookstate, extend } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';
import { localstored } from '@hookstate/localstored';

import { GlobalStateType } from './types';

const globalState = hookstate<GlobalStateType>(
	{ username: '', isLoggedIn: false },
	extend(
		localstored({ key: 'globalState' }),
		devtools({ key: 'globalState' })
	)
);

export const useGlobalState = () => {
	return globalState;
};

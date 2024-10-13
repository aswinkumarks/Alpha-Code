import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

export const SkeletonLoader: FC = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			width="100%"
			gap="32px"
			padding="16px"
		>
			<Skeleton width="100%" height="80px" />
			<Box
				display="flex"
				gap="32px"
				flexDirection="row"
				height="100%"
				width="100%"
			>
				<Skeleton sx={{ flexGrow: '1' }} height="100%" />
				<Skeleton sx={{ flexGrow: '1' }} height="100%" />
			</Box>
		</Box>
	);
};

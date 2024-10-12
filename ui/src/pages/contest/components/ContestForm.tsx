import {
	Box,
	TextField,
	Grid,
	Container,
	Typography,
	Button,
	FormLabel,
	OutlinedInput,
} from '@mui/material';
import { useEffect, FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ContestFormInputs, ContestFormProps } from './types';

const ContestForm: FC<ContestFormProps> = ({
	defaultValues = {},
	editMode = false,
	onSubmit,
}) => {
	const { register, handleSubmit } = useForm<ContestFormInputs>({
		values: defaultValues as any,
	});

	return (
		<Container fixed sx={{ mt: 5 }}>
			<Box sx={{ border: 1, p: 4, borderRadius: 2 }}>
				<Box
					display="flex"
					flexDirection="column"
					component="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Typography gutterBottom variant="h5">
						Contest Details : -
					</Typography>

					<Grid
						container
						display="flex"
						justifyContent="space-between"
						rowSpacing={6}
						spacing={3}
						sx={{ mt: 1 }}
					>
						<Grid
							item
							xs={12}
							md={6}
							display="flex"
							flexDirection="column"
						>
							<FormLabel htmlFor="contestName" required>
								Contest Name
							</FormLabel>
							<OutlinedInput
								id="first-name"
								type="name"
								placeholder="John"
								autoComplete="first name"
								required
								{...register('contestName')}
							/>
						</Grid>

						{/* <Grid item xs={6} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Start date and time"
                  value={sdvalue}
                  onChange={(newValue) => {
                    setsdValue(newValue);
                  }}
                  minDateTime={new Date()}
                />
              </LocalizationProvider>
						</Grid> */}

						<Grid item xs={12} md={6} display="flex">
							<TextField
								fullWidth
								required
								id="standard-basic"
								label="Host Name"
								variant="outlined"
								{...register('hostedBy')}
							/>
						</Grid>

						{/* <Grid item xs={6} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="End time in each day"
                  value={edvalue}
                  onChange={(newValue) => {
                    setedValue(newValue);
                  }}
                  minDate={new Date("2020-02-14")}
                  minTime={new Date(0, 0, 0, 8)}
                  maxTime={new Date(0, 0, 0, 18, 45)}
                />
              </LocalizationProvider>
						</Grid> */}

						<Grid item xs={12} md={6} display="flex">
							<TextField
								fullWidth
								id="outlined-textarea"
								label="Description"
								multiline
								{...register('desc')}
							/>
						</Grid>

						<Grid item xs={12} md={6} display="flex">
							<TextField
								required
								id="standard-number"
								label="Duration"
								type="number"
								variant="outlined"
								{...register('duration')}
							/>
						</Grid>

						{!editMode ? (
							<Grid item display="flex">
								<Button type="submit" variant="contained">
									Create
								</Button>
							</Grid>
						) : (
							<Grid item display="flex">
								<Button type="submit" variant="contained">
									Proceed to edit Questions
								</Button>
							</Grid>
						)}
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default ContestForm;

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ContestItem from "./ContestItem";

function ContestList(props) {
  return (
    <Box component="span" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {props.contests.map((contest) => (
          <ContestItem cInfo={contest}></ContestItem>
        ))}
      </Grid>
    </Box>
  );
}

export default ContestList;

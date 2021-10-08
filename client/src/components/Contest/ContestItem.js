import Grid from "@mui/material/Grid";
import ContestCard from "../Layout/ContestCard";

function ContestItem(props) {

  return (
    <Grid item>
      <ContestCard cInfo={props.cInfo} delContest={props.delContest}/>
    </Grid>
  );
}

export default ContestItem;

import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { NoEncryption } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function ContestCard(props) {
  const [open, setOpen] = useState(false);
  const routerHistory = useHistory();

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const calcDuration = () => {
  };

  const theme = useTheme();

  const delContest = () => {
    props.delContest(props.cInfo.cId)
  };

const goToEditPg = () => {
  routerHistory.push('/edit_contest/?cId='+props.cInfo.cId);
};

  return (
    <Card sx={{ borderRadius: 6, }}>
      <CardHeader
        action={
          <Box>
            <IconButton aria-label="edit" onClick={goToEditPg}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={delContest}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        title={props.cInfo.cname}
      />
      <Divider variant="middle" />
      <CardContent sx={{ p: 3 }}>
        <Stack>
          <Typography gutterBottom variant="body1" color="text.secondary">
            <b>Hosted By : {props.cInfo.hosted_by}</b>
          </Typography>
          <Typography gutterBottom variant="body1" color="text.secondary">
            <b>Duration : {props.cInfo.duration}</b>
          </Typography>
          <Typography gutterBottom variant="body1" color="text.secondary">
            <b>
              Ends On :{" "}
              {new Date(props.cInfo.endTime).toLocaleString(
                {},
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
            </b>
          </Typography>
          <Button variant="text" onClick={handleToggle}>
            View Details
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Contest Details
                </Typography>
                <Typography variant="h5" component="div">
                  {props.cInfo.cname}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Hosted by : {props.cInfo.hosted_by}
                </Typography>
                <Typography variant="body2">
                  Duration : {props.cInfo.duration} [add unit]
                  {/* {calcDuration} */}
                  <br />
                  Start Time : {props.cInfo.startTime}
                  <br />
                  End Time : {props.cInfo.endTime}
                  <br/><br/>
                  Description : <br/>
                  {props.cInfo.desc}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Backdrop>

          <Button variant="outlined">Start</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ContestCard;

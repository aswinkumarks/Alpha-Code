import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ContestCard(props) {
  const theme = useTheme();

  return (
    <Card sx={{borderRadius: 6 }}>
      <CardHeader
        action={
          <Box>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
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
          <Button variant="text">View Details</Button>
          <Button variant="outlined">Start</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ContestCard;

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ServiceCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            RK
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h6">Reisekostenabrechnung</Typography>}
        subheader="Max Mustermann, Tel. 0123/45678"
      ></CardHeader>
      <CardContent>
        <Box>
          <Typography>
            Erstattung von Reisekosten für dienstliche Aufwendungen.
          </Typography>
          <Typography>
            Antragstellung innerhalb von sechs Monaten nach Dienstreise, sonst
            keine Vergütung.
          </Typography>
        </Box>
        <List>
          <ListItem>
            <a href="" target="_blank">
              Antrag Reisekostenabrechnung
            </a>
          </ListItem>
          <ListItem>
            <a href="" target="_blank">
              Merkblatt Reisekosten
            </a>
          </ListItem>
        </List>
        <Rating />
      </CardContent>
    </Card>
  );
};

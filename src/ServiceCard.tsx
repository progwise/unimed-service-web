import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from '@mui/icons-material/Info';

export const ServiceCard = (params: { item: Record<string, string | string[]>}) => {
  console.log(params.item)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            { params.item['avatar'] ?? <InfoIcon /> }
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h6">{params.item.name}</Typography>}
        subheader={`${params.item.ansprechpartner}, ${params.item.telefonnummer}`}
      ></CardHeader>
      <CardContent>
        <Box>
          <Typography variant="subtitle2">{params.item.summary}</Typography>
          
        </Box>
        <Stack direction="row" spacing={1} flexWrap={'wrap'} gap={1}>
          {Array.isArray(params.item.keywords) && params.item.keywords.map((wort, index) => <Chip key={index} label={wort} size='small' />)}
        </Stack>
        <Stack direction='row' paddingTop={2} justifyContent='flex-end'>
          <Rating />
        </Stack>
        {params.item.linkZumService && (

<Stack>
<Link href={params.item.linkZumService?.toString() ?? ''}>Zum Service...</Link>
</Stack>
        )}
      </CardContent>
    </Card>
  );
};
